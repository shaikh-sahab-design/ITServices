<?php
/**
 * One-off import of the blog at manageditservices.folio3.com/blogs/ into Posts (run from the server
 * with folio3_old_blog_import()). Brings each post's title, slug, date, excerpt, category, author,
 * featured image and content. Content images are copied into the media library, links to the old
 * site are pointed at the matching pages here, and the FAQ and CTA blocks are rewritten as plain
 * HTML that the Classic editor can edit (see blog-post.php for how the FAQ block is shown).
 * Posts that already exist (same slug) are skipped unless $force is true.
 */

defined( 'ABSPATH' ) || exit;

const FOLIO3_OLD_BLOG = 'https://manageditservices.folio3.com';

/** Old site path => path here. */
function folio3_old_blog_paths() {
	return [
		'/contact-us/'                                                  => '/contact/',
		'/services/'                                                    => '/services/',
		'/services'                                                     => '/services/',
		'/services/ai-security-consutling/'                             => '/ai-security-services/',
		'/services/ai-security-consutling/agentic-ai-security/'         => '/ai-agent-security/',
		'/services/ai-security-consutling/ai-governance-consulting/'    => '/ai-governance-risk/',
		'/services/ai-security-consutling/ai-red-team/'                 => '/ai-red-teaming/',
		'/services/ai-security-consutling/ai-security-assessment/'      => '/ai-security-assessment/',
		'/services/ai-security-consutling/real-time-security-monitoring/' => '/ai-security-monitoring/',
		'/services/managed-it/'                                         => '/managed-it-services/',
		'/services/managed-it/identity-and-access-management/'          => '/identity-access-management/',
		'/services/managed-it/it-migration/'                            => '/migration-services/',
		'/services/managed-it/network-and-infrastructure/'              => '/network-design/',
		'/services/managed-security/'                                   => '/managed-security-services/',
		'/services/managed-security/cloud-security/'                    => '/cloud-security/',
		'/services/managed-security/endpoint-security/'                 => '/endpoint-security/',
		'/services/managed-security/mdr-service/'                       => '/threat-detection-incident-response/',
		'/services/managed-security/soc-services/'                      => '/soc-services/',
		'/services/managed-security/vulnerability-management/'          => '/vulnerability-assessment/',
	];
}

function folio3_old_blog_link( $url ) {
	$u     = html_entity_decode( $url );
	$parts = wp_parse_url( $u );
	if ( ! $parts || ( isset( $parts['host'] ) && 'manageditservices.folio3.com' !== $parts['host'] ) || ( ! isset( $parts['host'] ) && '/' !== ( $u[0] ?? '' ) ) ) {
		return $url; // another site, an anchor or a mailto link
	}
	$path = $parts['path'] ?? '/';
	if ( preg_match( '#^/blogs/([^/]+)/?$#', $path, $b ) ) {
		return home_url( '/blogs/' . $b[1] . '/' );
	}
	$map = folio3_old_blog_paths();
	if ( isset( $map[ $path ] ) ) {
		return home_url( $map[ $path ] );
	}
	return '/' === $path || '' === $path ? home_url( '/' ) : $url;
}

/** Copy an image from the old site into the media library once (keyed by its URL). */
function folio3_old_blog_media( $url, $alt = '', $post_id = 0 ) {
	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/media.php';
	require_once ABSPATH . 'wp-admin/includes/image.php';
	$url  = html_entity_decode( $url );
	$full = preg_replace( '#-\d+x\d+(\.[a-z0-9]+)$#i', '$1', $url );
	$hit  = get_posts( [ 'post_type' => 'attachment', 'post_status' => 'inherit', 'numberposts' => 1, 'fields' => 'ids', 'meta_key' => '_folio3_old_url', 'meta_value' => $full ] );
	if ( $hit ) {
		return (int) $hit[0];
	}
	foreach ( array_unique( [ $full, $url ] ) as $try ) {
		$tmp = download_url( $try, 60 );
		if ( is_wp_error( $tmp ) ) {
			continue;
		}
		$id = media_handle_sideload( [ 'name' => wp_basename( wp_parse_url( $try, PHP_URL_PATH ) ), 'tmp_name' => $tmp ], $post_id );
		if ( is_wp_error( $id ) ) {
			@unlink( $tmp ); // phpcs:ignore
			continue;
		}
		update_post_meta( $id, '_folio3_old_url', $full );
		if ( '' !== trim( $alt ) ) {
			update_post_meta( $id, '_wp_attachment_image_alt', sanitize_text_field( $alt ) );
		}
		return (int) $id;
	}
	return 0;
}

/** Old content (rendered block HTML) => clean HTML for this site. */
function folio3_old_blog_content( $html, $post_id ) {
	[ $doc, $root ] = folio3_post_dom( $html );
	$xp  = new DOMXPath( $doc );
	$has = function ( $cls ) {
		return "contains(concat(' ', normalize-space(@class), ' '), ' $cls ')";
	};
	$q   = function ( $path, $ctx = null ) use ( $xp ) {
		return iterator_to_array( $xp->query( $path, $ctx ) );
	};
	$replace = function ( DOMNode $old, $html ) use ( $doc ) {
		[ $src, $r ] = folio3_post_dom( $html );
		foreach ( iterator_to_array( $r->childNodes ) as $n ) {
			$old->parentNode->insertBefore( $doc->importNode( $n, true ), $old );
		}
		$old->parentNode->removeChild( $old );
	};

	// FAQ: accordion => H2 + H3 question / answer pairs.
	foreach ( $q( '//*[' . $has( 'faq-section' ) . ']' ) as $box ) {
		$head = $q( './/h2', $box )[0] ?? null;
		$out  = '<h2>' . esc_html( $head ? trim( $head->textContent ) : 'Frequently Asked Questions' ) . '</h2>';
		foreach ( $q( './/*[' . $has( 'wp-block-accordion-item' ) . ']', $box ) as $item ) {
			$t = $q( './/*[' . $has( 'wp-block-accordion-heading__toggle-title' ) . ']', $item )[0] ?? null;
			$p = $q( './/*[' . $has( 'wp-block-accordion-panel' ) . ']', $item )[0] ?? null;
			if ( ! $t ) {
				continue;
			}
			$a = '';
			if ( $p ) {
				foreach ( $p->childNodes as $n ) {
					$a .= $doc->saveHTML( $n );
				}
			}
			$out .= '<h3>' . esc_html( trim( preg_replace( '/\s+/', ' ', $t->textContent ) ) ) . '</h3>' . $a;
		}
		$replace( $box, '<div class="faq-section">' . $out . '</div>' );
	}
	// In-article CTA: heading, text and button.
	foreach ( $q( '//*[' . $has( 'cta-banner' ) . ']' ) as $box ) {
		$h   = $q( './/h2|.//h3', $box )[0] ?? null;
		$out = $h ? '<h2>' . esc_html( trim( $h->textContent ) ) . '</h2>' : '';
		foreach ( $q( './/p', $box ) as $p ) {
			if ( '' !== trim( $p->textContent ) ) {
				$out .= '<p>' . esc_html( trim( $p->textContent ) ) . '</p>';
			}
		}
		foreach ( $q( './/a', $box ) as $a ) {
			$out .= '<p class="cta-banner__action"><a class="cta-banner__button" href="' . esc_url( $a->getAttribute( 'href' ) ) . '">' . esc_html( trim( $a->textContent ) ) . '</a></p>';
		}
		$replace( $box, '<div class="cta-banner">' . $out . '</div>' );
	}
	// Unwrap layout-only groups.
	foreach ( array_reverse( $q( '//div[' . $has( 'wp-block-group' ) . ' or ' . $has( 'wp-block-group__inner-container' ) . ']' ) ) as $g ) {
		while ( $g->firstChild ) {
			$g->parentNode->insertBefore( $g->firstChild, $g );
		}
		$g->parentNode->removeChild( $g );
	}
	// Empty headings and paragraphs.
	foreach ( $q( '//h1|//h2|//h3|//h4|//p' ) as $el ) {
		if ( '' === trim( str_replace( "\xc2\xa0", '', $el->textContent ) ) && ! $q( './/img', $el ) ) {
			$el->parentNode->removeChild( $el );
		}
	}
	// Images into the media library.
	foreach ( $q( '//img' ) as $img ) {
		$src = $img->getAttribute( 'src' );
		if ( ! str_contains( $src, 'manageditservices.folio3.com' ) ) {
			continue;
		}
		$id = folio3_old_blog_media( $src, $img->getAttribute( 'alt' ), $post_id );
		if ( ! $id ) {
			continue;
		}
		$big = wp_get_attachment_image_src( $id, 'large' ) ?: wp_get_attachment_image_src( $id, 'full' );
		$img->setAttribute( 'src', $big[0] );
		$img->setAttribute( 'width', (string) $big[1] );
		$img->setAttribute( 'height', (string) $big[2] );
		$img->setAttribute( 'class', 'wp-image-' . $id );
		$img->setAttribute( 'alt', trim( $img->getAttribute( 'alt' ) ) );
		foreach ( [ 'srcset', 'sizes', 'fetchpriority', 'decoding' ] as $at ) {
			$img->removeAttribute( $at );
		}
	}
	// Links.
	foreach ( $q( '//a[@href]' ) as $a ) {
		$a->setAttribute( 'href', folio3_old_blog_link( $a->getAttribute( 'href' ) ) );
	}
	// Block-editor classes and the interactivity attributes mean nothing here.
	foreach ( $q( '//*[@class]' ) as $el ) {
		$keep = array_filter( preg_split( '/\s+/', $el->getAttribute( 'class' ) ), function ( $c ) {
			return '' !== $c && ! preg_match( '/^(wp-block-(paragraph|heading|list|list-item)|is-layout-.*|wp-block-.*-is-layout-.*|wp-element-button)$/', $c );
		} );
		$keep ? $el->setAttribute( 'class', implode( ' ', $keep ) ) : $el->removeAttribute( 'class' );
	}
	foreach ( $q( '//*[@*[starts-with(name(), "data-wp-")]]' ) as $el ) {
		foreach ( iterator_to_array( $el->attributes ) as $at ) {
			if ( str_starts_with( $at->name, 'data-wp-' ) ) {
				$el->removeAttribute( $at->name );
			}
		}
	}

	$html = '';
	foreach ( $root->childNodes as $n ) {
		$html .= $doc->saveHTML( $n );
	}
	// One block per line keeps the Classic editor tidy.
	$html = preg_replace( "/\n{2,}/", "\n", $html );
	return trim( $html );
}

/** Authors on the old site (REST user ids) => local users, created on first use. */
function folio3_old_blog_author( $old_id ) {
	$people = [
		4 => [ 'login' => 'kamran-akbar', 'name' => 'Kamran Akbar', 'first' => 'Kamran', 'last' => 'Akbar', 'role' => 'Senior Manager IT', 'photo' => 'images/author-kamran.webp',
			'bio' => 'Kamran Akbar is a Senior IT leader with <strong>over 15 years of experience</strong> in Cybersecurity, Cloud Computing, AI Security, and Enterprise Infrastructure. An AWS Certified Solutions Architect, he specializes in cloud security, DevSecOps, Zero Trust, governance, risk and compliance, and enterprise IT transformation. Passionate about emerging technologies and secure innovation, Kamran shares practical insights and best practices to help organizations strengthen their security posture and embrace AI securely.' ],
		5 => [ 'login' => 'ali-shafiq', 'name' => 'Ali Shafiq', 'first' => 'Ali', 'last' => 'Shafiq', 'role' => 'Lead Systems Engineer', 'photo_url' => FOLIO3_OLD_BLOG . '/wp-content/uploads/2026/08/ali-shafq.png',
			'bio' => "Ali is a Lead Systems Engineer with <strong>over nine years of experience</strong> in IT infrastructure, cloud, and managed services, helping small and mid-sized businesses build technology that's secure, reliable, and built for growth. His work spans cloud migrations, infrastructure, security, and automation, always starting with a clear understanding of the business before deciding what it actually needs. He holds AWS certifications in Solutions Architect Associate and DevOps Professional, along with Microsoft's Azure Administrator certification, and brings a hands-on approach that keeps IT foundations solid and complexity-free." ],
	];
	$p = $people[ $old_id ] ?? null;
	if ( ! $p ) {
		return 0;
	}
	$user = get_user_by( 'login', $p['login'] );
	if ( $user ) {
		return $user->ID;
	}
	$id = wp_insert_user(
		[
			'user_login'   => $p['login'],
			'user_pass'    => wp_generate_password( 32 ),
			'display_name' => $p['name'],
			'nickname'     => $p['name'],
			'first_name'   => $p['first'],
			'last_name'    => $p['last'],
			'description'  => $p['bio'],
			'role'         => 'author',
		]
	);
	if ( is_wp_error( $id ) ) {
		return 0;
	}
	update_user_meta( $id, 'f3_role', $p['role'] );
	$map   = get_option( 'folio3_media', [] );
	$photo = isset( $p['photo'] ) ? (int) ( $map[ $p['photo'] ] ?? 0 ) : folio3_old_blog_media( $p['photo_url'], $p['name'] );
	if ( $photo ) {
		update_user_meta( $id, 'f3_photo', $photo );
	}
	return $id;
}

/**
 * Import posts $offset .. $offset+$limit-1 (newest first). Returns one line per post.
 */
function folio3_old_blog_import( $offset = 0, $limit = 5, $force = false ) {
	$res = wp_remote_get( FOLIO3_OLD_BLOG . '/wp-json/wp/v2/posts?per_page=' . (int) $limit . '&offset=' . (int) $offset . '&_embed=wp:featuredmedia,wp:term&_fields=id,slug,date,date_gmt,title,excerpt,content,author,_links,_embedded', [ 'timeout' => 60 ] );
	if ( is_wp_error( $res ) ) {
		return $res->get_error_message();
	}
	$posts = json_decode( wp_remote_retrieve_body( $res ), true );
	if ( ! is_array( $posts ) ) {
		return 'Bad response from the old blog.';
	}
	$out = [];
	foreach ( $posts as $p ) {
		$slug     = $p['slug'];
		$existing = get_page_by_path( $slug, OBJECT, 'post' );
		if ( $existing && ! $force ) {
			$out[ $slug ] = 'exists ' . $existing->ID;
			continue;
		}
		$cats = [];
		foreach ( (array) ( $p['_embedded']['wp:term'] ?? [] ) as $group ) {
			foreach ( (array) $group as $t ) {
				if ( 'category' !== ( $t['taxonomy'] ?? '' ) ) {
					continue;
				}
				$term = get_term_by( 'slug', $t['slug'], 'category' ) ?: get_term_by( 'name', html_entity_decode( $t['name'] ), 'category' );
				if ( ! $term ) {
					$made = wp_insert_term( html_entity_decode( $t['name'] ), 'category', [ 'slug' => $t['slug'] ] );
					$term = is_wp_error( $made ) ? null : get_term( $made['term_id'], 'category' );
				}
				if ( $term ) {
					$cats[] = (int) $term->term_id;
				}
			}
		}
		$args = [
			'post_type'     => 'post',
			'post_status'   => 'publish',
			'post_name'     => $slug,
			'post_title'    => html_entity_decode( wp_strip_all_tags( $p['title']['rendered'] ), ENT_QUOTES, 'UTF-8' ),
			'post_excerpt'  => trim( preg_replace( '/\s*\[(&hellip;|…)\]\s*$/u', '', html_entity_decode( wp_strip_all_tags( $p['excerpt']['rendered'] ), ENT_QUOTES, 'UTF-8' ) ) ),
			'post_date'     => str_replace( 'T', ' ', $p['date'] ),
			'post_date_gmt' => str_replace( 'T', ' ', $p['date_gmt'] ),
			'post_author'   => folio3_old_blog_author( (int) $p['author'] ) ?: get_current_user_id(),
			'post_content'  => '',
		];
		if ( $existing ) {
			$args['ID'] = $existing->ID;
		}
		$id = wp_insert_post( wp_slash( $args ), true );
		if ( is_wp_error( $id ) ) {
			$out[ $slug ] = $id->get_error_message();
			continue;
		}
		wp_set_post_categories( $id, $cats ?: [ (int) get_option( 'default_category' ) ] );
		update_post_meta( $id, '_wp_page_template', 'elementor_canvas' );
		update_post_meta( $id, '_folio3_old_id', (int) $p['id'] );
		$fm = $p['_embedded']['wp:featuredmedia'][0] ?? null;
		if ( ! empty( $fm['source_url'] ) ) {
			$thumb = folio3_old_blog_media( $fm['source_url'], $fm['alt_text'] ?? '', $id );
			if ( $thumb ) {
				set_post_thumbnail( $id, $thumb );
			}
		}
		$content = folio3_old_blog_content( $p['content']['rendered'], $id );
		wp_update_post( wp_slash( [ 'ID' => $id, 'post_content' => $content ] ) );
		$out[ $slug ] = 'ok ' . $id;
	}
	return $out;
}
