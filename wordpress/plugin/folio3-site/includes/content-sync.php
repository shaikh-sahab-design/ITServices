<?php
/**
 * Admin helper for copying final page text into existing Elementor layouts (run through WP-CLI / execute-php).
 * The layout stays as built; only widget text, list items and FAQ entries change, and sections that the final
 * content does not have can be dropped.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * @param int   $post_id Page id.
 * @param array $spec    Keys (all optional):
 *   text     id => [setting, value]            set one widget setting
 *   list     container id => [html, ...]       rebuild a container's item widgets (first child is the template)
 *   bullets  container id => [html, ...]       spread items across the container's columns, row by row
 *   faq      accordion id => [[q, a], ...]     rebuild a nested accordion
 *   remove   [id, ...]                         drop elements
 *   links    id => page id                     point a widget's link at a page
 *   contact  true                              append the contact section from /services/ when missing
 * @return array|WP_Error Ids that were changed, and ids in the spec that were not found.
 */
function folio3_apply_content( $post_id, array $spec ) {
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return new WP_Error( 'folio3_cap', 'Not allowed.' );
	}
	$raw = get_post_meta( $post_id, '_elementor_data', true );
	$d   = json_decode( $raw, true );
	if ( ! is_array( $d ) ) {
		return new WP_Error( 'folio3_data', 'No Elementor data.' );
	}
	update_option( 'folio3_backup_' . $post_id . '_' . gmdate( 'Ymd_His' ), $raw, false );

	$nid  = function () { return substr( bin2hex( random_bytes( 4 ) ), 0, 7 ); };
	$done = [];
	// Fresh ids for a copied subtree.
	$reid = function ( $el ) use ( &$reid, $nid ) {
		$el['id'] = $nid();
		if ( ! empty( $el['elements'] ) ) {
			foreach ( $el['elements'] as $i => $c ) {
				$el['elements'][ $i ] = $reid( $c );
			}
		}
		return $el;
	};
	$set_text = function ( $el, $html ) use ( &$set_text ) {
		if ( 'text-editor' === ( $el['widgetType'] ?? '' ) ) {
			$el['settings']['editor'] = $html;
			return $el;
		}
		if ( 'heading' === ( $el['widgetType'] ?? '' ) ) {
			$el['settings']['title'] = $html;
			return $el;
		}
		foreach ( $el['elements'] ?? [] as $i => $c ) {
			$el['elements'][ $i ] = $set_text( $c, $html );
		}
		return $el;
	};
	$fill = function ( $el, array $items ) use ( $reid, $set_text ) {
		$tpl = $el['elements'][0] ?? null;
		if ( ! $tpl ) {
			return $el;
		}
		$new = [];
		foreach ( array_values( $items ) as $i => $t ) {
			$c     = isset( $el['elements'][ $i ] ) ? $el['elements'][ $i ] : $reid( $tpl );
			$new[] = $set_text( $c, $t );
		}
		$el['elements'] = $new;
		return $el;
	};

	$walk = function ( array $els ) use ( &$walk, $spec, $fill, $reid, $set_text, $nid, &$done ) {
		$out = [];
		foreach ( $els as $e ) {
			$id = $e['id'] ?? '';
			if ( in_array( $id, $spec['remove'] ?? [], true ) ) {
				$done[] = $id;
				continue;
			}
			if ( isset( $spec['text'][ $id ] ) ) {
				$e['settings'][ $spec['text'][ $id ][0] ] = $spec['text'][ $id ][1];
				$done[] = $id;
			}
			if ( isset( $spec['links'][ $id ] ) ) {
				$e['settings']['link']['url'] = wp_make_link_relative( get_permalink( (int) $spec['links'][ $id ] ) );
				$done[] = $id;
			}
			if ( isset( $spec['list'][ $id ] ) ) {
				$e      = $fill( $e, $spec['list'][ $id ] );
				$done[] = $id;
				$out[]  = $e;
				continue;
			}
			if ( isset( $spec['bullets'][ $id ] ) ) {
				$cols = count( $e['elements'] );
				$per  = array_fill( 0, $cols, [] );
				foreach ( array_values( $spec['bullets'][ $id ] ) as $i => $t ) {
					$per[ $i % $cols ][] = $t;
				}
				foreach ( $e['elements'] as $ci => $col ) {
					if ( $per[ $ci ] ) {
						$e['elements'][ $ci ] = $fill( $col, $per[ $ci ] );
					}
				}
				$e['elements'] = array_values( array_filter( $e['elements'], function ( $c, $ci ) use ( $per ) { return ! empty( $per[ $ci ] ); }, ARRAY_FILTER_USE_BOTH ) );
				$done[] = $id;
				$out[]  = $e;
				continue;
			}
			if ( isset( $spec['faq'][ $id ] ) ) {
				$items = $e['settings']['items'] ?? [];
				$kids  = $e['elements'] ?? [];
				$ni = []; $nk = [];
				foreach ( array_values( $spec['faq'][ $id ] ) as $i => $qa ) {
					$it = $items[ $i ] ?? $items[0];
					$it['_id'] = $nid();
					$it['item_title'] = $qa[0];
					$k = isset( $kids[ $i ] ) ? $kids[ $i ] : $reid( $kids[0] );
					$ni[] = $it;
					$nk[] = $set_text( $k, $qa[1] );
				}
				$e['settings']['items'] = $ni;
				$e['elements'] = $nk;
				$done[] = $id;
				$out[]  = $e;
				continue;
			}
			if ( ! empty( $e['elements'] ) ) {
				$e['elements'] = $walk( $e['elements'] );
			}
			$out[] = $e;
		}
		return $out;
	};
	$d = $walk( $d );

	if ( ! empty( $spec['contact'] ) && false === strpos( wp_json_encode( $d ), 'f3-contact__inner' ) ) {
		foreach ( json_decode( get_post_meta( 453, '_elementor_data', true ), true ) as $s ) {
			if ( false !== strpos( $s['settings']['css_classes'] ?? '', 'f3-contact' ) ) {
				$d[]    = $reid( $s );
				$done[] = 'contact';
			}
		}
	}

	update_post_meta( $post_id, '_elementor_data', wp_slash( wp_json_encode( $d ) ) );
	if ( class_exists( '\Elementor\Plugin' ) ) {
		\Elementor\Plugin::$instance->files_manager->clear_cache();
	}
	global $wpdb;
	$wpdb->query( "DELETE FROM {$wpdb->postmeta} WHERE meta_key = '_elementor_element_cache'" ); // phpcs:ignore

	$want = array_merge( array_keys( $spec['text'] ?? [] ), array_keys( $spec['list'] ?? [] ), array_keys( $spec['bullets'] ?? [] ), array_keys( $spec['faq'] ?? [] ), $spec['remove'] ?? [], array_keys( $spec['links'] ?? [] ) );
	return [ 'changed' => count( array_unique( $done ) ), 'missing' => array_values( array_diff( $want, $done ) ) ];
}
