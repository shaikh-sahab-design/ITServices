<?php
/**
 * Single blog posts written in the WordPress editor (not built with Elementor) are shown in the
 * "Blog Post Layout" Elementor template (library template, option folio3_post_layout_template).
 * The template is the design: hero, article head, prose column, author box, table of contents,
 * FAQ and CTA. At render time it is filled from the post:
 *
 * - hero and article titles: the post title
 * - meta row: author display name, publish date, reading time
 * - prose column: the post content; every H2 gets an id and a line in the table of contents
 * - FAQ: a block in the content with class "faq-section" (an H2, then H3 questions each followed by
 *   their answer) is moved into the FAQ accordion; without one, the FAQ section is left out
 * - author box: the author's display name, "Job title" and "Photo" (Users → Profile) and biography
 *
 * Posts built with Elementor keep their own design.
 */

defined( 'ABSPATH' ) || exit;

/* ---- Author profile: job title and photo for the author box ---- */

function folio3_author_fields( WP_User $user ) {
	if ( ! current_user_can( 'edit_user', $user->ID ) ) {
		return;
	}
	wp_enqueue_media();
	$role  = get_user_meta( $user->ID, 'f3_role', true );
	$photo = (int) get_user_meta( $user->ID, 'f3_photo', true );
	$src   = $photo ? wp_get_attachment_image_url( $photo, 'thumbnail' ) : '';
	wp_nonce_field( 'folio3_author_save', 'folio3_author_nonce' );
	?>
	<h2>Blog author box</h2>
	<table class="form-table" role="presentation">
		<tr>
			<th><label for="f3_role">Job title</label></th>
			<td><input type="text" class="regular-text" id="f3_role" name="f3_role" value="<?php echo esc_attr( $role ); ?>" placeholder="Senior Manager IT"></td>
		</tr>
		<tr>
			<th>Photo</th>
			<td>
				<img id="f3_photo_preview" src="<?php echo esc_url( $src ); ?>" style="width:64px;height:64px;border-radius:50%;object-fit:cover;<?php echo $src ? '' : 'display:none;'; ?>" alt=""><br>
				<input type="hidden" id="f3_photo" name="f3_photo" value="<?php echo esc_attr( $photo ?: '' ); ?>">
				<button type="button" class="button" id="f3_photo_pick">Choose photo</button>
				<p class="description">Shown with the biography above at the end of this author's blog posts.</p>
			</td>
		</tr>
	</table>
	<script>
	( function () {
		var pick = document.getElementById( 'f3_photo_pick' ), field = document.getElementById( 'f3_photo' ), img = document.getElementById( 'f3_photo_preview' ), frame;
		pick.addEventListener( 'click', function () {
			frame = frame || wp.media( { title: 'Author photo', library: { type: 'image' }, multiple: false } );
			frame.off( 'select' ).on( 'select', function () {
				var a = frame.state().get( 'selection' ).first().toJSON();
				field.value = a.id; img.src = ( a.sizes && a.sizes.thumbnail ? a.sizes.thumbnail.url : a.url ); img.style.display = '';
			} );
			frame.open();
		} );
	} )();
	</script>
	<?php
}
add_action( 'show_user_profile', 'folio3_author_fields' );
add_action( 'edit_user_profile', 'folio3_author_fields' );

function folio3_author_save( $user_id ) {
	if ( ! isset( $_POST['folio3_author_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['folio3_author_nonce'] ), 'folio3_author_save' ) || ! current_user_can( 'edit_user', $user_id ) ) {
		return;
	}
	update_user_meta( $user_id, 'f3_role', sanitize_text_field( wp_unslash( $_POST['f3_role'] ?? '' ) ) );
	update_user_meta( $user_id, 'f3_photo', absint( $_POST['f3_photo'] ?? 0 ) );
}
add_action( 'personal_options_update', 'folio3_author_save' );
add_action( 'edit_user_profile_update', 'folio3_author_save' );

/* New posts open on the full-width Elementor Canvas template (site header and footer, no theme chrome). */
add_action( 'wp_insert_post', function ( $post_id, $post, $update ) {
	if ( ! $update && 'post' === $post->post_type && ! get_post_meta( $post_id, '_wp_page_template', true ) ) {
		update_post_meta( $post_id, '_wp_page_template', 'elementor_canvas' );
	}
}, 10, 3 );

/* ---- Render ---- */

function folio3_post_is_builder( $post_id ) {
	return 'builder' === get_post_meta( $post_id, '_elementor_edit_mode', true );
}

add_filter( 'the_content', 'folio3_post_layout', 99999 );

function folio3_post_layout( $html ) {
	static $busy = false;
	if ( $busy || ! is_singular( 'post' ) || ! in_the_loop() || ! is_main_query() || ! class_exists( '\Elementor\Plugin' ) ) {
		return $html;
	}
	$post = get_post();
	if ( ! $post || folio3_post_is_builder( $post->ID ) ) {
		return $html;
	}
	$tpl = (int) get_option( 'folio3_post_layout_template' );
	if ( ! $tpl || ! get_post( $tpl ) ) {
		return $html;
	}
	$busy   = true;
	$layout = \Elementor\Plugin::$instance->frontend->get_builder_content_for_display( $tpl, true );
	$busy   = false;
	if ( ! $layout ) {
		return $html;
	}
	$out = folio3_post_fill( $layout, $post, $html );
	return $out ?: $html;
}

/** Load an HTML fragment; returns [doc, root]. */
function folio3_post_dom( $html ) {
	$doc = new DOMDocument();
	libxml_use_internal_errors( true );
	$doc->loadHTML( '<?xml encoding="utf-8"?><div id="f3-root">' . $html . '</div>', LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD );
	libxml_clear_errors();
	return [ $doc, $doc->getElementById( 'f3-root' ) ?: ( new DOMXPath( $doc ) )->query( '//div[@id="f3-root"]' )->item( 0 ) ];
}

function folio3_post_text( DOMDocument $doc, DOMNode $el, $text ) {
	while ( $el->firstChild ) {
		$el->removeChild( $el->firstChild );
	}
	$el->appendChild( $doc->createTextNode( $text ) );
}

/** Replace an element's children with parsed HTML. */
function folio3_post_inner( DOMDocument $doc, DOMNode $el, $html ) {
	while ( $el->firstChild ) {
		$el->removeChild( $el->firstChild );
	}
	[ $src, $root ] = folio3_post_dom( $html );
	foreach ( iterator_to_array( $root->childNodes ) as $n ) {
		$el->appendChild( $doc->importNode( $n, true ) );
	}
}

function folio3_post_fill( $layout, WP_Post $post, $content ) {
	[ $doc, $root ] = folio3_post_dom( $layout );
	if ( ! $root ) {
		return '';
	}
	$xp  = new DOMXPath( $doc );
	$has = function ( $cls ) {
		return "contains(concat(' ', normalize-space(@class), ' '), ' $cls ')";
	};
	$q   = function ( $path, $ctx = null ) use ( $xp ) {
		return iterator_to_array( $xp->query( $path, $ctx ) );
	};
	$title = html_entity_decode( get_the_title( $post ), ENT_QUOTES, 'UTF-8' );

	// Hero title: second half in red, as in the design.
	foreach ( $q( '//*[' . $has( 'f3-page-hero__title' ) . ']//*[' . $has( 'elementor-heading-title' ) . ']' ) as $h ) {
		$words = preg_split( '/\s+/', $title );
		$cut   = (int) ceil( count( $words ) / 2 );
		folio3_post_text( $doc, $h, implode( ' ', array_slice( $words, 0, $cut ) ) . ' ' );
		if ( count( $words ) > 1 ) {
			$span = $doc->createElement( 'span' );
			$span->setAttribute( 'style', 'color:#ec2539' );
			$span->appendChild( $doc->createTextNode( implode( ' ', array_slice( $words, $cut ) ) ) );
			$h->appendChild( $span );
		}
	}
	foreach ( $q( '//*[' . $has( 'f3-article__title' ) . ']//*[' . $has( 'elementor-heading-title' ) . ']' ) as $h ) {
		folio3_post_text( $doc, $h, $title );
	}

	// Meta row: author, date, reading time.
	$author = get_userdata( (int) $post->post_author );
	$words  = str_word_count( wp_strip_all_tags( $post->post_content ) );
	$meta   = [
		$author ? $author->display_name : '',
		get_the_date( 'F j, Y', $post ),
		max( 1, (int) ceil( $words / 200 ) ) . ' Min Read',
	];
	foreach ( $q( '//*[' . $has( 'f3-article__meta' ) . ']//*[' . $has( 'f3-blog-meta' ) . ']' ) as $i => $row ) {
		foreach ( $q( './/*[' . $has( 'elementor-widget-text-editor' ) . ']', $row ) as $t ) {
			isset( $meta[ $i ] ) && '' !== $meta[ $i ] ? folio3_post_text( $doc, $t, $meta[ $i ] ) : $row->parentNode->removeChild( $row );
		}
	}

	// Content: pull out the FAQ block, give H2s ids for the table of contents.
	[ $cdoc, $croot ] = folio3_post_dom( $content );
	$cxp  = new DOMXPath( $cdoc );
	$faqs = [];
	foreach ( iterator_to_array( $cxp->query( '//*[' . $has( 'faq-section' ) . ']' ) ) as $box ) {
		$cur = null;
		foreach ( iterator_to_array( $cxp->query( './/h3|.//h4|.//p|.//ul|.//ol|.//table|.//figure', $box ) ) as $n ) {
			if ( in_array( $n->nodeName, [ 'h3', 'h4' ], true ) ) {
				if ( $cur ) {
					$faqs[] = $cur;
				}
				$cur = [ 'q' => trim( preg_replace( '/\s+/', ' ', $n->textContent ) ), 'a' => '' ];
			} elseif ( $cur && ! $cxp->query( 'ancestor::p|ancestor::ul|ancestor::ol|ancestor::table|ancestor::figure', $n )->length ) {
				$cur['a'] .= $cdoc->saveHTML( $n );
			}
		}
		if ( $cur ) {
			$faqs[] = $cur;
		}
		$box->parentNode->removeChild( $box );
	}
	$toc  = [];
	$used = [];
	foreach ( iterator_to_array( $cxp->query( '//h2' ) ) as $h2 ) {
		$label = trim( preg_replace( '/\s+/', ' ', $h2->textContent ) );
		if ( '' === $label || $cxp->query( 'ancestor::*[' . $has( 'cta-banner' ) . ']', $h2 )->length ) {
			continue;
		}
		$id = $h2->getAttribute( 'id' ) ?: sanitize_title( $label );
		$id = $id ?: 'section';
		$base = $id;
		for ( $n = 2; isset( $used[ $id ] ); $n++ ) {
			$id = $base . '-' . $n;
		}
		$used[ $id ] = true;
		$h2->setAttribute( 'id', $id );
		$toc[] = [ $id, $label ];
	}
	$body = '';
	foreach ( $croot->childNodes as $n ) {
		$body .= $cdoc->saveHTML( $n );
	}
	foreach ( $q( '//*[' . $has( 'f3-prose' ) . ']' ) as $prose ) {
		$prose->setAttribute( 'class', $prose->getAttribute( 'class' ) . ' f3-prose--post' );
		folio3_post_inner( $doc, $prose, $body );
	}

	// Table of contents: one row per H2, each a copy of the first row.
	foreach ( $q( '//*[' . $has( 'f3-toc__list' ) . ']' ) as $list ) {
		$rows = array_values( array_filter( iterator_to_array( $list->childNodes ), function ( $n ) {
			return $n instanceof DOMElement;
		} ) );
		if ( ! $rows ) {
			continue;
		}
		$proto = $rows[0]->cloneNode( true );
		foreach ( $rows as $r ) {
			$list->removeChild( $r );
		}
		foreach ( $toc as $i => [ $id, $label ] ) {
			$row = $proto->cloneNode( true );
			foreach ( $q( './/a', $row ) as $a ) {
				$a->setAttribute( 'href', '#' . $id );
				folio3_post_text( $doc, $a, $label );
			}
			if ( $i > 0 ) {
				foreach ( $q( './/*[' . $has( 'f3-toc__bar' ) . ']', $row ) as $bar ) {
					$bar->parentNode->removeChild( $bar );
				}
			}
			$list->appendChild( $row );
		}
		if ( ! $toc ) {
			$aside = $q( 'ancestor::*[' . $has( 'f3-toc' ) . ']', $list );
			if ( $aside ) {
				$aside[0]->parentNode->removeChild( $aside[0] );
			}
		}
	}

	// FAQ accordion: one item per question, each a copy of the first item; no FAQ, no section.
	foreach ( $q( '//*[' . $has( 'f3-faq' ) . ']' ) as $faq ) {
		$section = $faq->parentNode;
		if ( ! $faqs ) {
			$section->parentNode->removeChild( $section );
			continue;
		}
		$wrap  = $q( './/*[' . $has( 'e-n-accordion' ) . ']', $faq )[0] ?? null;
		$items = $wrap ? $q( './details', $wrap ) : [];
		if ( ! $items ) {
			continue;
		}
		$proto = $items[0]->cloneNode( true );
		foreach ( $items as $it ) {
			$wrap->removeChild( $it );
		}
		foreach ( $faqs as $i => $f ) {
			$it  = $proto->cloneNode( true );
			$iid = 'e-n-accordion-item-' . ( 1000 + $i );
			$it->setAttribute( 'id', $iid );
			$it->removeAttribute( 'open' );
			foreach ( $q( './summary', $it ) as $s ) {
				$s->setAttribute( 'data-accordion-index', (string) ( $i + 1 ) );
				$s->setAttribute( 'tabindex', 0 === $i ? '0' : '-1' );
				$s->setAttribute( 'aria-controls', $iid );
				$s->setAttribute( 'aria-expanded', 'false' );
				foreach ( $q( './/*[' . $has( 'e-n-accordion-item-title-text' ) . ']', $s ) as $t ) {
					folio3_post_text( $doc, $t, $f['q'] );
				}
			}
			foreach ( $q( './*[@role="region"]', $it ) as $r ) {
				$r->setAttribute( 'aria-labelledby', $iid );
				$w = $q( './/*[' . $has( 'elementor-widget-text-editor' ) . ']', $r )[0] ?? $r;
				folio3_post_inner( $doc, $w, $f['a'] );
			}
			$wrap->appendChild( $it );
		}
	}

	// Author box.
	if ( $author ) {
		foreach ( $q( '//*[' . $has( 'f3-author-box' ) . ']' ) as $box ) {
			$bio = (string) get_user_meta( $author->ID, 'description', true );
			if ( '' === trim( $bio ) ) {
				$box->parentNode->removeChild( $box );
				continue;
			}
			foreach ( $q( './/*[' . $has( 'f3-author-box__name' ) . ']', $box ) as $t ) {
				folio3_post_text( $doc, $t, $author->display_name );
			}
			$role = (string) get_user_meta( $author->ID, 'f3_role', true );
			foreach ( $q( './/*[' . $has( 'f3-author-box__role' ) . ']', $box ) as $t ) {
				'' !== $role ? folio3_post_text( $doc, $t, $role ) : $t->parentNode->removeChild( $t );
			}
			foreach ( $q( './/*[' . $has( 'f3-author-box__text' ) . ']', $box ) as $t ) {
				folio3_post_inner( $doc, $t, wp_kses_post( $bio ) );
			}
			$photo = (int) get_user_meta( $author->ID, 'f3_photo', true );
			foreach ( $q( './*[' . $has( 'elementor-widget-image' ) . ']//img', $box ) as $img ) {
				$src = $photo ? wp_get_attachment_image_src( $photo, 'medium' ) : false;
				$img->setAttribute( 'src', $src ? $src[0] : get_avatar_url( $author->ID, [ 'size' => 192 ] ) );
				$img->removeAttribute( 'srcset' );
				$img->removeAttribute( 'sizes' );
				$img->setAttribute( 'alt', $author->display_name );
			}
		}
	}

	$html = '';
	foreach ( $root->childNodes as $n ) {
		$html .= $doc->saveHTML( $n );
	}
	return $html;
}
