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
	$map = get_option( 'folio3_media', [] );
	$out = [];
	foreach ( $keys as $key ) {
		if ( isset( $map[ $key ] ) && get_post( $map[ $key ] ) ) {
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
		$map[ $key ] = $id;
		$out[ $key ] = $id;
	}
	update_option( 'folio3_media', $map, false );
	return $out;
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
		return preg_replace_callback( '/@@(url|link):([^"\'\s<>]+?)(?=$|["\'\s<>])/', function ( $m ) use ( $map, &$missing ) {
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

function folio3_import_page( $ref, $path, $slug, $title, $parent_path = '' ) {
	$json = folio3_fetch( FOLIO3_REPO_RAW . $ref . '/wordpress/data/' . $path );
	if ( is_wp_error( $json ) ) {
		return $json->get_error_message();
	}
	$data   = json_decode( $json, true );
	$parent = 0;
	if ( $parent_path ) {
		$p      = get_page_by_path( $parent_path );
		$parent = $p ? $p->ID : 0;
	}
	$existing = get_page_by_path( $parent_path ? $parent_path . '/' . $slug : $slug );
	$args     = [
		'post_type'   => 'page',
		'post_status' => 'publish',
		'post_title'  => $title,
		'post_name'   => $slug,
		'post_parent' => $parent,
	];
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
	$id = (int) get_option( $option );
	if ( ! $id || ! get_post( $id ) ) {
		$id = wp_insert_post( [ 'post_type' => 'elementor_library', 'post_status' => 'publish', 'post_title' => $title ] );
		update_post_meta( $id, '_elementor_template_type', 'section' );
		wp_set_object_terms( $id, 'section', 'elementor_library_type' );
		update_option( $option, $id );
	}
	$missing = folio3_save_elementor( $id, json_decode( $json, true ) );
	return [ 'id' => $id, 'missing' => $missing ];
}

/** Copy this plugin's own files from the repo (used to ship CSS/JS/PHP changes). */
function folio3_sync_plugin( $ref, array $files ) {
	$out = [];
	foreach ( $files as $f ) {
		$body = folio3_fetch( FOLIO3_REPO_RAW . $ref . '/wordpress/plugin/folio3-site/' . $f );
		if ( is_wp_error( $body ) ) {
			$out[ $f ] = $body->get_error_message();
			continue;
		}
		$dest = FOLIO3_SITE_DIR . '/' . $f;
		wp_mkdir_p( dirname( $dest ) );
		$out[ $f ] = false !== file_put_contents( $dest, $body ) ? strlen( $body ) : 'write failed';
	}
	update_option( 'folio3_assets_version', substr( $ref, 0, 8 ) );
	return $out;
}
