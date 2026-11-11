<?php
/**
 * Case Studies: a post type with its own admin menu. Each case study is edited with Elementor like a
 * page (its detail page lives at /success-stories/<slug>/; the old /case-studies/ addresses redirect). The tile grid on the Case Studies page is
 * filled from published case studies at render time; the first tile in the grid is the design every
 * tile copies, so editing that tile in Elementor restyles them all.
 *
 * Tile content per case study: card title (falls back to the post title), excerpt (summary),
 * featured image (tile image), client logo, industry label, Case Study Tags (chips), and an optional
 * button link for a case study that has no detail page of its own.
 */

defined( 'ABSPATH' ) || exit;

add_action( 'init', 'folio3_cs_register' );

function folio3_cs_register() {
	register_post_type(
		'case_study',
		[
			'labels'        => [
				'name'               => 'Case Studies',
				'singular_name'      => 'Case Study',
				'add_new'            => 'Add Case Study',
				'add_new_item'       => 'Add Case Study',
				'edit_item'          => 'Edit Case Study',
				'new_item'           => 'New Case Study',
				'view_item'          => 'View Case Study',
				'search_items'       => 'Search Case Studies',
				'not_found'          => 'No case studies found',
				'not_found_in_trash' => 'No case studies in Trash',
				'all_items'          => 'All Case Studies',
				'menu_name'          => 'Case Studies',
			],
			'public'        => true,
			'show_in_rest'  => true,
			'menu_position' => 6,
			'menu_icon'     => 'dashicons-portfolio',
			'has_archive'   => false,
			'hierarchical'  => false,
			'rewrite'       => [ 'slug' => 'success-stories', 'with_front' => false ],
			'supports'      => [ 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'page-attributes', 'elementor' ],
		]
	);
	register_taxonomy(
		'case_study_tag',
		'case_study',
		[
			'labels'            => [
				'name'          => 'Case Study Tags',
				'singular_name' => 'Case Study Tag',
				'menu_name'     => 'Tags',
				'add_new_item'  => 'Add Tag',
			],
			'public'            => false,
			'show_ui'           => true,
			'show_in_rest'      => true,
			'show_admin_column' => true,
			'hierarchical'      => false,
			'sort'              => true, // chips keep the order they were added in.
		]
	);
	foreach ( [ '_f3_card_title', '_f3_industry', '_f3_card_link' ] as $k ) {
		register_post_meta( 'case_study', $k, [ 'type' => 'string', 'single' => true, 'show_in_rest' => true, 'auth_callback' => 'folio3_cs_can_edit' ] );
	}
	register_post_meta( 'case_study', '_f3_client_logo', [ 'type' => 'integer', 'single' => true, 'show_in_rest' => true, 'auth_callback' => 'folio3_cs_can_edit' ] );
}

function folio3_cs_can_edit( $allowed, $key, $post_id ) {
	return current_user_can( 'edit_post', $post_id );
}

/* ---- Admin: "Card on the Case Studies page" box ---- */

add_action( 'add_meta_boxes_case_study', function () {
	add_meta_box( 'folio3_cs_card', 'Card on the Case Studies page', 'folio3_cs_box', 'case_study', 'normal', 'high' );
} );

function folio3_cs_box( WP_Post $post ) {
	wp_enqueue_media();
	wp_nonce_field( 'folio3_cs_save', 'folio3_cs_nonce' );
	$title    = get_post_meta( $post->ID, '_f3_card_title', true );
	$industry = get_post_meta( $post->ID, '_f3_industry', true );
	$link     = get_post_meta( $post->ID, '_f3_card_link', true );
	$logo     = (int) get_post_meta( $post->ID, '_f3_client_logo', true );
	$logo_src = $logo ? wp_get_attachment_image_url( $logo, 'medium' ) : '';
	?>
	<p style="margin-top:0">The card also uses the <strong>Excerpt</strong> (summary), the <strong>Featured image</strong> (card image), the <strong>Tags</strong> (chips) and <strong>Order</strong> under Page Attributes (lower numbers show first).</p>
	<p><label for="f3_card_title"><strong>Card title</strong></label><br>
		<input type="text" class="widefat" id="f3_card_title" name="f3_card_title" value="<?php echo esc_attr( $title ); ?>" placeholder="<?php echo esc_attr( get_the_title( $post ) ); ?>">
		<span class="description">Leave empty to use the case study title.</span></p>
	<p><label for="f3_industry"><strong>Industry label</strong></label><br>
		<input type="text" class="widefat" id="f3_industry" name="f3_industry" value="<?php echo esc_attr( $industry ); ?>" placeholder="IT Services"></p>
	<p><strong>Client logo</strong><br>
		<img id="f3_logo_preview" src="<?php echo esc_url( $logo_src ); ?>" style="max-height:48px;margin:6px 0;<?php echo $logo_src ? '' : 'display:none;'; ?>" alt=""><br>
		<input type="hidden" id="f3_client_logo" name="f3_client_logo" value="<?php echo esc_attr( $logo ?: '' ); ?>">
		<button type="button" class="button" id="f3_logo_pick">Choose logo</button>
		<button type="button" class="button-link" id="f3_logo_clear" style="margin-left:8px;<?php echo $logo ? '' : 'display:none;'; ?>">Remove</button></p>
	<p><label for="f3_card_link"><strong>Button link (optional)</strong></label><br>
		<input type="url" class="widefat" id="f3_card_link" name="f3_card_link" value="<?php echo esc_attr( $link ); ?>" placeholder="<?php echo esc_attr( get_permalink( $post ) ); ?>">
		<span class="description">Leave empty to open this case study. Only fill this in for a case study without its own page; its page then redirects here.</span></p>
	<script>
	( function () {
		var pick = document.getElementById( 'f3_logo_pick' ), clear = document.getElementById( 'f3_logo_clear' ),
			field = document.getElementById( 'f3_client_logo' ), img = document.getElementById( 'f3_logo_preview' ), frame;
		pick.addEventListener( 'click', function () {
			frame = frame || wp.media( { title: 'Client logo', library: { type: 'image' }, multiple: false } );
			frame.off( 'select' ).on( 'select', function () {
				var a = frame.state().get( 'selection' ).first().toJSON();
				field.value = a.id; img.src = ( a.sizes && a.sizes.medium ? a.sizes.medium.url : a.url ); img.style.display = ''; clear.style.display = '';
			} );
			frame.open();
		} );
		clear.addEventListener( 'click', function () { field.value = ''; img.style.display = 'none'; clear.style.display = 'none'; } );
	} )();
	</script>
	<?php
}

add_action( 'save_post_case_study', function ( $post_id ) {
	if ( ! isset( $_POST['folio3_cs_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['folio3_cs_nonce'] ), 'folio3_cs_save' ) ) {
		return;
	}
	if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}
	update_post_meta( $post_id, '_f3_card_title', sanitize_text_field( wp_unslash( $_POST['f3_card_title'] ?? '' ) ) );
	update_post_meta( $post_id, '_f3_industry', sanitize_text_field( wp_unslash( $_POST['f3_industry'] ?? '' ) ) );
	update_post_meta( $post_id, '_f3_card_link', esc_url_raw( wp_unslash( $_POST['f3_card_link'] ?? '' ) ) );
	update_post_meta( $post_id, '_f3_client_logo', absint( $_POST['f3_client_logo'] ?? 0 ) );
} );

/* New case studies open on the full-width Elementor Canvas template, like the existing ones. */
add_action( 'wp_insert_post', function ( $post_id, $post, $update ) {
	if ( ! $update && 'case_study' === $post->post_type && ! get_post_meta( $post_id, '_wp_page_template', true ) ) {
		update_post_meta( $post_id, '_wp_page_template', 'elementor_canvas' );
	}
}, 10, 3 );

/* A case study with a button link has no page of its own: send visitors to the link. */
add_action( 'template_redirect', function () {
	if ( is_singular( 'case_study' ) && ! is_preview() ) {
		$link = get_post_meta( get_queried_object_id(), '_f3_card_link', true );
		if ( $link ) {
			wp_redirect( $link, 302 ); // phpcs:ignore -- set by an editor, may be another site.
			exit;
		}
	}
} );

/* ---- Front end: fill the tile grid on the Case Studies page ---- */

add_filter( 'elementor/frontend/the_content', 'folio3_cs_fill_grid' );

function folio3_cs_fill_grid( $content ) {
	$grid = strpos( $content, 'f3-case-grid__inner' );
	if ( false === $grid ) {
		return $content;
	}
	$start = strpos( $content, '<article', $grid );
	if ( false === $start ) {
		return $content;
	}
	// The tiles are the run of <article> siblings after the grid opens; collect them in order.
	$tiles = [];
	$end   = null;
	$pos   = $start;
	while ( false !== $pos ) {
		$close = strpos( $content, '</article>', $pos );
		if ( false === $close ) {
			break;
		}
		$close  += strlen( '</article>' );
		$tiles[] = substr( $content, $pos, $close - $pos );
		$next    = strpos( $content, '<article', $close );
		// Stop at the first gap that holds anything other than whitespace (the grid has ended).
		if ( false === $next || '' !== trim( substr( $content, $close, $next - $close ) ) ) {
			$end = $close;
			break;
		}
		$pos = $next;
	}
	if ( ! $tiles || null === $end ) {
		return $content;
	}
	// Each design tile carries its own reveal delay class (f3m-*); tile N keeps tile N's delay.
	$delays = [];
	foreach ( $tiles as $t ) {
		$delays[] = preg_match( '/\bf3m-[0-9a-f]+\b/', $t, $m ) ? $m[0] : '';
	}

	$posts = get_posts(
		[
			'post_type'      => 'case_study',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'orderby'        => [ 'menu_order' => 'ASC', 'date' => 'DESC' ],
		]
	);
	$cards = '';
	foreach ( $posts as $i => $post ) {
		$card = folio3_cs_card( $tiles[0], $post );
		$want = $delays[ min( $i, count( $delays ) - 1 ) ];
		if ( $delays[0] && $want ) {
			$card = preg_replace( '/\b' . preg_quote( $delays[0], '/' ) . '\b/', $want, $card, 1 );
		}
		$cards .= $card;
	}
	return substr( $content, 0, $start ) . $cards . substr( $content, $end );
}

function folio3_cs_img( DOMElement $img, $id ) {
	$src = wp_get_attachment_image_src( $id, 'full' );
	if ( ! $src ) {
		return;
	}
	$img->setAttribute( 'src', $src[0] );
	$img->setAttribute( 'width', (string) $src[1] );
	$img->setAttribute( 'height', (string) $src[2] );
	$set = wp_get_attachment_image_srcset( $id, 'full' );
	$set ? $img->setAttribute( 'srcset', $set ) : $img->removeAttribute( 'srcset' );
	$sizes = wp_get_attachment_image_sizes( $id, 'full' );
	$sizes ? $img->setAttribute( 'sizes', $sizes ) : $img->removeAttribute( 'sizes' );
	$img->setAttribute( 'alt', (string) get_post_meta( $id, '_wp_attachment_image_alt', true ) );
	$img->setAttribute( 'class', 'attachment-full size-full wp-image-' . $id );
}

function folio3_cs_set_text( DOMDocument $doc, DOMElement $el, $text ) {
	while ( $el->firstChild ) {
		$el->removeChild( $el->firstChild );
	}
	$el->appendChild( $doc->createTextNode( html_entity_decode( $text, ENT_QUOTES, 'UTF-8' ) ) );
}

function folio3_cs_card( $template, WP_Post $post ) {
	$doc = new DOMDocument();
	libxml_use_internal_errors( true );
	$doc->loadHTML( '<?xml encoding="utf-8"?><div id="f3-root">' . $template . '</div>', LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD );
	libxml_clear_errors();
	$xp  = new DOMXPath( $doc );
	$has = function ( $cls ) {
		return "contains(concat(' ', normalize-space(@class), ' '), ' $cls ')";
	};
	$q   = function ( $path, $ctx = null ) use ( $xp ) {
		return iterator_to_array( $xp->query( $path, $ctx ) );
	};

	$link = get_post_meta( $post->ID, '_f3_card_link', true ) ?: get_permalink( $post );
	foreach ( $q( '//a[@href]' ) as $a ) {
		$a->setAttribute( 'href', $link );
	}

	$title = get_post_meta( $post->ID, '_f3_card_title', true ) ?: get_the_title( $post );
	foreach ( $q( '//*[' . $has( 'f3-case-tile__title' ) . ']//*[' . $has( 'elementor-heading-title' ) . ']' ) as $el ) {
		folio3_cs_set_text( $doc, $el, $title );
	}
	foreach ( $q( '//*[' . $has( 'f3-case-tile__text' ) . ']' ) as $el ) {
		folio3_cs_set_text( $doc, $el, wp_strip_all_tags( get_the_excerpt( $post ) ) );
	}

	// Head: client logo and industry label.
	$logo = (int) get_post_meta( $post->ID, '_f3_client_logo', true );
	foreach ( $q( '//*[' . $has( 'f3-case-tile__head' ) . ']//img' ) as $img ) {
		if ( $logo ) {
			folio3_cs_img( $img, $logo );
		} else {
			$w = $img->parentNode;
			$w->parentNode->removeChild( $w );
		}
	}
	$industry = get_post_meta( $post->ID, '_f3_industry', true );
	foreach ( $q( '//*[' . $has( 'f3-case-tile__head' ) . ']//*[' . $has( 'elementor-widget-text-editor' ) . ']' ) as $el ) {
		if ( $industry ) {
			folio3_cs_set_text( $doc, $el, $industry );
		} else {
			$el->parentNode->removeChild( $el );
		}
	}

	// Tile image: the featured image.
	$thumb = get_post_thumbnail_id( $post );
	foreach ( $q( '//*[' . $has( 'f3-case-tile__media' ) . ']//img' ) as $img ) {
		if ( $thumb ) {
			folio3_cs_img( $img, $thumb );
		} else {
			$m = $img->parentNode;
			$m->parentNode->removeChild( $m );
		}
	}

	// Tags: one chip per term, each a copy of the first chip.
	$terms = wp_get_object_terms( $post->ID, 'case_study_tag', [ 'orderby' => 'term_order' ] );
	$terms = is_array( $terms ) ? $terms : [];
	foreach ( $q( '//*[' . $has( 'f3-case-tile__tags' ) . ']' ) as $box ) {
		$chips = $q( './/*[' . $has( 'elementor-widget-text-editor' ) . ']', $box );
		$chips = array_values( array_filter( $chips, function ( $c ) use ( $box ) {
			return $c->parentNode->isSameNode( $box );
		} ) );
		if ( ! $chips ) {
			continue;
		}
		$proto = $chips[0]->cloneNode( true );
		foreach ( $chips as $c ) {
			$box->removeChild( $c );
		}
		foreach ( $terms as $t ) {
			$chip = $proto->cloneNode( true );
			folio3_cs_set_text( $doc, $chip, $t->name );
			$box->appendChild( $chip );
		}
		if ( ! $terms ) {
			$box->parentNode->removeChild( $box );
		}
	}

	$html = '';
	foreach ( $xp->query( '//div[@id="f3-root"]' )->item( 0 )->childNodes as $n ) {
		$html .= $doc->saveHTML( $n );
	}
	return $html;
}
