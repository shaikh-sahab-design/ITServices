<?php
/**
 * Blog: articles are WordPress Posts. The Blog page keeps its Elementor design, and its card grid
 * is filled from published posts at render time. The first card in the grid is the design every
 * post card copies, so editing that card in Elementor restyles them all.
 */

defined( 'ABSPATH' ) || exit;

add_filter( 'elementor/frontend/the_content', 'folio3_blog_fill_grid' );

function folio3_blog_fill_grid( $content ) {
	if ( false === strpos( $content, 'f3-blog-grid__inner' ) ) {
		return $content;
	}
	$start = strpos( $content, '<article', strpos( $content, 'f3-blog-grid__inner' ) );
	if ( false === $start ) {
		return $content;
	}
	$close     = strpos( $content, '</article>', $start );
	if ( false === $close ) {
		return $content;
	}
	$first_end = $close + strlen( '</article>' );
	$template  = substr( $content, $start, $first_end - $start );
	// The grid's cards sit next to each other, so the grid ends at the first </article> not followed by another <article.
	$end = $first_end;
	while ( preg_match( '/\G\s*<article\b/', $content, $m, 0, $end ) ) {
		$next = strpos( $content, '</article>', $end );
		if ( false === $next ) {
			break;
		}
		$end = $next + strlen( '</article>' );
	}

	// Built cards are cached until a post changes or the Blog page template does.
	$key   = 'folio3_blog_cards_' . md5( $template );
	$cards = get_transient( $key );
	if ( false === $cards ) {
		$posts = get_posts(
			[
				'post_type'      => 'post',
				'post_status'    => 'publish',
				'posts_per_page' => 200,
				'no_found_rows'  => true,
				'orderby'        => 'date',
				'order'          => 'DESC',
			]
		);
		$cards = '';
		foreach ( $posts as $post ) {
			$cards .= folio3_blog_card( $template, $post );
		}
		set_transient( $key, $cards, DAY_IN_SECONDS );
		$keys = (array) get_option( 'folio3_blog_card_keys', [] );
		if ( ! in_array( $key, $keys, true ) ) {
			$keys[] = $key;
			update_option( 'folio3_blog_card_keys', array_slice( $keys, -10 ), false );
		}
	}
	return substr( $content, 0, $start ) . folio3_blog_tabs() . $cards . '<nav class="f3-blog-pager" aria-label="Blog pages" hidden></nav>' . substr( $content, $end );
}

/**
 * Category tabs above the grid. site.js filters the cards by category and splits them into pages of
 * nine; the links still work without JavaScript (?category=slug).
 */
function folio3_blog_tabs() {
	$cats = get_categories( [ 'hide_empty' => true, 'orderby' => 'count', 'order' => 'DESC' ] );
	if ( count( $cats ) < 2 ) {
		return '';
	}
	$base = get_permalink( get_page_by_path( 'blogs' ) ) ?: home_url( '/blogs/' );
	$item = function ( $slug, $label ) use ( $base ) {
		$href = $slug ? add_query_arg( 'category', $slug, $base ) : $base;
		return '<li><a class="f3-pill" href="' . esc_url( $href ) . '" data-cat="' . esc_attr( $slug ) . '">'
			. '<span class="f3-pill__circle" aria-hidden="true"></span>'
			. '<span class="f3-pill__stack"><span class="f3-pill__label">' . esc_html( $label ) . '</span>'
			. '<span class="f3-pill__label f3-pill__label--hover" aria-hidden="true">' . esc_html( $label ) . '</span></span></a></li>';
	};
	$out = $item( '', 'All' );
	foreach ( $cats as $c ) {
		$out .= $item( $c->slug, html_entity_decode( $c->name, ENT_QUOTES, 'UTF-8' ) );
	}
	return '<nav class="f3-blog-tabs" aria-label="Blog categories"><ul class="f3-pill-nav">' . $out . '</ul></nav>';
}

/** Drop the cached cards whenever a post is saved, trashed or deleted. */
function folio3_blog_flush_cards() {
	global $wpdb;
	foreach ( (array) get_option( 'folio3_blog_card_keys', [] ) as $key ) {
		delete_transient( $key );
	}
	delete_option( 'folio3_blog_card_keys' );
	// A page built while a post was being saved can store its cards after the list above was read,
	// so also clear every cached card set by name.
	if ( ! wp_using_ext_object_cache() ) {
		$wpdb->query( $wpdb->prepare( "DELETE FROM {$wpdb->options} WHERE option_name LIKE %s OR option_name LIKE %s", $wpdb->esc_like( '_transient_folio3_blog_cards_' ) . '%', $wpdb->esc_like( '_transient_timeout_folio3_blog_cards_' ) . '%' ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
	}
}
add_action( 'save_post_post', 'folio3_blog_flush_cards' );
add_action( 'deleted_post', 'folio3_blog_flush_cards' );
add_action( 'trashed_post', 'folio3_blog_flush_cards' );

function folio3_blog_card( $template, WP_Post $post ) {
	$doc = new DOMDocument();
	libxml_use_internal_errors( true );
	$doc->loadHTML( '<?xml encoding="utf-8"?><div id="f3-root">' . $template . '</div>', LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD );
	libxml_clear_errors();
	$xp   = new DOMXPath( $doc );
	$has  = function ( $cls ) {
		return "contains(concat(' ', normalize-space(@class), ' '), ' $cls ')";
	};
	$link = get_permalink( $post );

	foreach ( $xp->query( '//a[@href]' ) as $a ) {
		$a->setAttribute( 'href', $link );
	}
	foreach ( $xp->query( '//*[' . $has( 'f3-blog-card__title' ) . ']//a' ) as $a ) {
		$a->nodeValue = '';
		$a->appendChild( $doc->createTextNode( html_entity_decode( get_the_title( $post ), ENT_QUOTES, 'UTF-8' ) ) );
	}
	foreach ( $xp->query( '//*[' . $has( 'f3-blog-card__excerpt' ) . ']' ) as $el ) {
		while ( $el->firstChild ) {
			$el->removeChild( $el->firstChild );
		}
		$el->appendChild( $doc->createTextNode( html_entity_decode( wp_strip_all_tags( get_the_excerpt( $post ) ), ENT_QUOTES, 'UTF-8' ) ) );
	}
	$thumb = get_post_thumbnail_id( $post );
	if ( $thumb ) {
		foreach ( $xp->query( '//*[' . $has( 'f3-blog-card__media' ) . ']//img' ) as $img ) {
			$src = wp_get_attachment_image_src( $thumb, 'full' );
			if ( $src ) {
				$img->setAttribute( 'src', $src[0] );
				$img->setAttribute( 'width', (string) $src[1] );
				$img->setAttribute( 'height', (string) $src[2] );
			}
			$set = wp_get_attachment_image_srcset( $thumb, 'full' );
			$set ? $img->setAttribute( 'srcset', $set ) : $img->removeAttribute( 'srcset' );
			$img->setAttribute( 'alt', (string) get_post_meta( $thumb, '_wp_attachment_image_alt', true ) );
			$img->setAttribute( 'class', 'attachment-full size-full wp-image-' . $thumb );
		}
	}
	// The date is the text widget in the meta row.
	foreach ( $xp->query( '//*[' . $has( 'f3-blog-meta' ) . ']//*[' . $has( 'elementor-widget-text-editor' ) . ']' ) as $el ) {
		while ( $el->firstChild ) {
			$el->removeChild( $el->firstChild );
		}
		$el->appendChild( $doc->createTextNode( get_the_date( 'F j, Y', $post ) ) );
	}

	// Categories for the tabs filter.
	$root = $xp->query( '//div[@id="f3-root"]/*' )->item( 0 );
	if ( $root ) {
		$slugs = wp_list_pluck( get_the_category( $post->ID ), 'slug' );
		$root->setAttribute( 'data-cats', implode( ' ', $slugs ) );
	}

	$html = '';
	foreach ( $xp->query( '//div[@id="f3-root"]' )->item( 0 )->childNodes as $n ) {
		$html .= $doc->saveHTML( $n );
	}
	return $html;
}

/* The blog moved from /blog/ to /blogs/ (2026-11-06): send old links to the new address. */
add_action( 'template_redirect', function () {
	if ( ! is_404() ) {
		return;
	}
	$path = (string) wp_parse_url( $_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH ); // phpcs:ignore
	if ( preg_match( '#^/blog(/.*)?$#', $path, $m ) ) {
		$q = (string) wp_parse_url( $_SERVER['REQUEST_URI'] ?? '', PHP_URL_QUERY ); // phpcs:ignore
		wp_safe_redirect( home_url( '/blogs' . ( $m[1] ?? '/' ) ) . ( $q ? '?' . $q : '' ), 301 );
		exit;
	}
} );
