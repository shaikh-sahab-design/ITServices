<?php
/**
 * Importer: pulls media and Elementor page data from the ITServices GitHub repo.
 * Called from the command line or a one-off PHP run, never on page load.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const FOLIO3_REPO_RAW = 'https://raw.githubusercontent.com/shaikh-sahab-design/ITServices/';

function folio3_fetch( $url ) {
	$r = wp_remote_get( $url, [ 'timeout' => 60 ] );
	if ( is_wp_error( $r ) ) {
		return $r;
	}
	if ( 200 !== wp_remote_retrieve_response_code( $r ) ) {
		return new WP_Error( 'http', 'HTTP ' . wp_remote_retrieve_response_code( $r ) . ' for ' . $url );
	}
	return wp_remote_retrieve_body( $r );
}

/** Source path in the repo for a media key (images/x.webp, icons/x.svg, videos/x.mp4, svg/hash.svg). */
function folio3_media_repo_path( $key ) {
	return str_starts_with( $key, 'svg/' ) ? 'wordpress/assets/' . $key : 'public/' . $key;
}

/** Upload media keys that are not in the library yet. Returns [key => id]. */
function folio3_import_media( $ref, array $keys ) {
	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/media.php';
	require_once ABSPATH . 'wp-admin/includes/image.php';
	global $wpdb;
	$out = [];
	foreach ( $keys as $key ) {
		$found = (int) $wpdb->get_var( $wpdb->prepare( "SELECT post_id FROM $wpdb->postmeta WHERE meta_key='_folio3_media_key' AND meta_value=%s LIMIT 1", $key ) );
		if ( $found ) {
			continue;
		}
		$body = folio3_fetch( FOLIO3_REPO_RAW . $ref . '/' . folio3_media_repo_path( $key ) );
		if ( is_wp_error( $body ) ) {
			$out[ $key ] = $body->get_error_message();
			continue;
		}
		$name = str_replace( '/', '-', $key );
		$tmp  = wp_tempnam( $name );
		file_put_contents( $tmp, $body );
		$id = media_handle_sideload( [ 'name' => $name, 'tmp_name' => $tmp ], 0, pathinfo( $key, PATHINFO_FILENAME ) );
		if ( is_wp_error( $id ) ) {
			$out[ $key ] = $id->get_error_message();
			@unlink( $tmp );
			continue;
		}
		update_post_meta( $id, '_folio3_media_key', $key );
		$out[ $key ] = $id;
	}
	folio3_rebuild_media_map();
	return $out;
}

/** The key => attachment map, rebuilt from attachment meta so parallel imports can't lose entries. */
function folio3_rebuild_media_map() {
	global $wpdb;
	$map = [];
	foreach ( $wpdb->get_results( "SELECT post_id, meta_value FROM $wpdb->postmeta WHERE meta_key='_folio3_media_key' ORDER BY post_id" ) as $r ) {
		$map[ $r->meta_value ] = $map[ $r->meta_value ] ?? (int) $r->post_id;
	}
	update_option( 'folio3_media', $map, false );
	return $map;
}

/** Replace @@url:/@@id:/@@link: placeholders inside decoded Elementor data. */
function folio3_resolve( $data, &$missing = [] ) {
	$map = get_option( 'folio3_media', [] );
	$walk = function ( $v ) use ( &$walk, $map, &$missing ) {
		if ( is_array( $v ) ) {
			foreach ( $v as $k => $x ) {
				$v[ $k ] = $walk( $x );
			}
			return $v;
		}
		if ( ! is_string( $v ) || ! str_contains( $v, '@@' ) ) {
			return $v;
		}
		if ( preg_match( '/^@@id:(.+)$/', $v, $m ) ) {
			if ( empty( $map[ $m[1] ] ) ) {
				$missing[] = $m[1];
				return '';
			}
			return (int) $map[ $m[1] ];
		}
		return preg_replace_callback( '/@@(url|link):([^"\'\s<>]+?)(?=$|["\'\s<>)])/', function ( $m ) use ( $map, &$missing ) {
			if ( 'url' === $m[1] ) {
				if ( empty( $map[ $m[2] ] ) ) {
					$missing[] = $m[2];
					return '';
				}
				return wp_get_attachment_url( $map[ $m[2] ] );
			}
			$path = $m[2];
			$hash = '';
			if ( str_contains( $path, '#' ) ) {
				[ $path, $hash ] = explode( '#', $path, 2 );
				$hash = '#' . $hash;
			}
			return ( '/' === $path ? home_url( '/' ) : home_url( trailingslashit( $path ) ) ) . $hash;
		}, $v );
	};
	return $walk( $data );
}

/** Create or update a page (or library template) with Elementor data. */
function folio3_save_elementor( $post_id, array $data ) {
	$missing = [];
	$data    = folio3_resolve( $data, $missing );
	update_post_meta( $post_id, '_elementor_edit_mode', 'builder' );
	update_post_meta( $post_id, '_elementor_version', ELEMENTOR_VERSION );
	update_post_meta( $post_id, '_elementor_data', wp_slash( wp_json_encode( $data ) ) );
	delete_post_meta( $post_id, '_elementor_css' );
	delete_post_meta( $post_id, '_elementor_element_cache' );
	if ( class_exists( '\Elementor\Core\Files\CSS\Post' ) ) {
		$css = \Elementor\Core\Files\CSS\Post::create( $post_id );
		$css->update();
	}
	return array_values( array_unique( $missing ) );
}

function folio3_import_page( $ref, $path, $slug, $title, $parent_path = '', $type = 'page' ) {
	$json = folio3_fetch( FOLIO3_REPO_RAW . $ref . '/wordpress/data/' . $path );
	if ( is_wp_error( $json ) ) {
		return $json->get_error_message();
	}
	$data = json_decode( $json, true );
	if ( ! is_array( $data ) ) {
		return 'Invalid JSON in ' . $path . ': ' . json_last_error_msg();
	}
	$parent = 0;
	if ( $parent_path ) {
		$p      = get_page_by_path( $parent_path );
		$parent = $p ? $p->ID : 0;
	}
	$existing = get_page_by_path( $parent_path ? $parent_path . '/' . $slug : $slug, OBJECT, $type );
	$args     = [
		'post_type'   => $type,
		'post_status' => 'publish',
		'post_title'  => $title,
		'post_name'   => $slug,
		'post_parent' => $parent,
	];
	if ( $existing && 'page' !== $type ) {
		// Blog posts and case studies are managed in their own admin menus once created: never overwrite an editor's work.
		return [ 'id' => $existing->ID, 'missing' => [] ];
	}
	if ( $existing ) {
		$args['ID'] = $existing->ID;
		$id         = wp_update_post( $args );
	} else {
		$id = wp_insert_post( $args );
	}
	update_post_meta( $id, '_wp_page_template', 'elementor_canvas' );
	$missing = folio3_save_elementor( $id, $data );
	return [ 'id' => $id, 'missing' => $missing ];
}

function folio3_import_template( $ref, $path, $title, $option ) {
	$json = folio3_fetch( FOLIO3_REPO_RAW . $ref . '/wordpress/data/' . $path );
	if ( is_wp_error( $json ) ) {
		return $json->get_error_message();
	}
	$data = json_decode( $json, true );
	if ( ! is_array( $data ) ) {
		return 'Invalid JSON in ' . $path . ': ' . json_last_error_msg();
	}
	$id = (int) get_option( $option );
	if ( ! $id || ! get_post( $id ) ) {
		$id = wp_insert_post( [ 'post_type' => 'elementor_library', 'post_status' => 'publish', 'post_title' => $title ] );
		update_post_meta( $id, '_elementor_template_type', 'section' );
		wp_set_object_terms( $id, 'section', 'elementor_library_type' );
		update_option( $option, $id );
	}
	$missing = folio3_save_elementor( $id, $data );
	return [ 'id' => $id, 'missing' => $missing ];
}

/** Copy this plugin's own files from the repo (used to ship CSS/JS/PHP changes). */
function folio3_sync_plugin( $ref, array $files ) {
	if ( ! preg_match( '/^[0-9a-f]{40}$/', $ref ) ) {
		return new WP_Error( 'ref', 'Pass a full 40-character commit SHA.' );
	}
	$out = [];
	foreach ( $files as $f ) {
		if ( ! preg_match( '#^(assets/[a-z0-9._-]+\.(css|js)|includes/[a-z0-9_-]+\.php|folio3-site\.php)$#', $f ) ) {
			$out[ $f ] = 'path not allowed';
			continue;
		}
		$body = folio3_fetch( FOLIO3_REPO_RAW . $ref . '/wordpress/plugin/folio3-site/' . $f );
		if ( is_wp_error( $body ) ) {
			$out[ $f ] = $body->get_error_message();
			continue;
		}
		if ( 'assets/generated.css' === $f ) {
			$body = folio3_resolve( $body );
		}
		$dest = FOLIO3_SITE_DIR . '/' . $f;
		wp_mkdir_p( dirname( $dest ) );
		$out[ $f ] = false !== file_put_contents( $dest, $body ) ? strlen( $body ) : 'write failed';
	}
	update_option( 'folio3_assets_version', substr( $ref, 0, 8 ) );
	return $out;
}

/**
 * Import everything listed in wordpress/data/pages.json, plus header and footer.
 * $only: optional list of page names to limit the run.
 */
function folio3_import_all( $ref, array $only = [] ) {
	$out   = [];
	$raw = folio3_fetch( FOLIO3_REPO_RAW . $ref . '/wordpress/data/pages.json' );
	if ( is_wp_error( $raw ) ) {
		return [ 'pages.json' => $raw->get_error_message() ];
	}
	$pages = json_decode( $raw, true );
	if ( ! $only || in_array( 'header', $only, true ) ) {
		$out['header'] = folio3_import_template( $ref, 'header.json', 'Site Header', 'folio3_header_template' );
	}
	if ( ! $only || in_array( 'footer', $only, true ) ) {
		$out['footer'] = folio3_import_template( $ref, 'footer.json', 'Site Footer', 'folio3_footer_template' );
	}
	foreach ( (array) $pages as $p ) {
		if ( $only && ! in_array( $p['name'], $only, true ) ) {
			continue;
		}
		$r = folio3_import_page( $ref, $p['name'] . '.json', $p['slug'], $p['title'], $p['parent'], $p['post_type'] ?? 'page' );
		$out[ $p['name'] ] = is_array( $r ) ? ( $r['missing'] ? [ 'id' => $r['id'], 'missing' => $r['missing'] ] : $r['id'] ) : $r;
		if ( 'home' === $p['name'] && is_array( $r ) ) {
			update_option( 'show_on_front', 'page' );
			update_option( 'page_on_front', $r['id'] );
		}
	}
	return $out;
}
