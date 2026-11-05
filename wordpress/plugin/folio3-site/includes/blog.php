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
	$end   = strrpos( $content, '</article>' );
	if ( false === $start || false === $end || $end < $start ) {
		return $content;
	}
	$end     += strlen( '</article>' );
	$first_end = strpos( $content, '</article>', $start ) + strlen( '</article>' );
	$template  = substr( $content, $start, $first_end - $start );

	$posts = get_posts(
		[
			'post_type'      => 'post',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'orderby'        => 'date',
			'order'          => 'DESC',
		]
	);
	$cards = '';
	foreach ( $posts as $post ) {
		$cards .= folio3_blog_card( $template, $post );
	}
	return substr( $content, 0, $start ) . $cards . substr( $content, $end );
}

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

	$html = '';
	foreach ( $xp->query( '//div[@id="f3-root"]' )->item( 0 )->childNodes as $n ) {
		$html .= $doc->saveHTML( $n );
	}
	return $html;
}
