<?php
/**
 * Plugin Name: Folio3 Site Helper
 * Description: Shared header and footer for Elementor Canvas pages, the contact form shortcode, site CSS/JS, and the importer used to sync pages from the ITServices repo.
 * Version: 1.0.0
 * Author: Folio3
 * Requires at least: 6.3
 * Requires PHP: 8.0
 * Requires Plugins: elementor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'FOLIO3_SITE_DIR', __DIR__ );
define( 'FOLIO3_SITE_URL', plugin_dir_url( __FILE__ ) );

require_once __DIR__ . '/includes/form.php';
require_once __DIR__ . '/includes/import.php';
require_once __DIR__ . '/includes/blog.php';

/* SVG uploads for admins (icons are SVG files). */
add_filter( 'upload_mimes', function ( $m ) {
	if ( current_user_can( 'manage_options' ) ) {
		$m['svg'] = 'image/svg+xml';
	}
	return $m;
} );
add_filter( 'wp_check_filetype_and_ext', function ( $data, $file, $filename, $mimes ) {
	// Admins only, and only files that are clean SVG markup (no script, event handlers, entities or character references).
	if ( ! str_ends_with( strtolower( $filename ), '.svg' ) || ! current_user_can( 'manage_options' ) ) {
		return $data;
	}
	$svg = is_readable( $file ) ? (string) file_get_contents( $file ) : '';
	// Tags may carry any namespace prefix (<svg:script>), and &#..; references could hide "javascript:".
	$bad = '/<(?:[a-z0-9_.-]+:)?(?:script|foreignObject|iframe|embed|object|handler|listener)\b'
		. '|\son[a-z]+\s*='
		. '|javascript:'
		. '|<!ENTITY'
		. '|&#/i';
	if ( false === stripos( $svg, '<svg' ) || preg_match( $bad, $svg ) ) {
		// Not a clean SVG: reject it (core would otherwise accept any .svg for admins via upload_mimes).
		return [ 'ext' => false, 'type' => false, 'proper_filename' => false ];
	}
	$data['ext']  = 'svg';
	$data['type'] = 'image/svg+xml';
	return $data;
}, 99, 4 ); // After Elementor's own filter (priority 10), which would otherwise re-allow any .svg for admins.

/* Site header and footer: Elementor library templates printed around every Canvas page. */
function folio3_render_template( $option ) {
	$id = (int) get_option( $option );
	if ( ! $id || ! class_exists( '\Elementor\Plugin' ) ) {
		return;
	}
	echo \Elementor\Plugin::instance()->frontend->get_builder_content_for_display( $id, true ); // phpcs:ignore
}
add_action( 'elementor/page_templates/canvas/before_content', function () {
	// Wrapper is the sticky element: sticky on the inner nav is clamped to the template's own height.
	echo '<div class="f3-site-header">';
	folio3_render_template( 'folio3_header_template' );
	echo '</div>';
} );
add_action( 'elementor/page_templates/canvas/after_content', function () {
	echo '<div class="f3-site-footer">';
	folio3_render_template( 'folio3_footer_template' );
	echo '</div>';
} );

/* Site CSS and JS. */
add_action( 'wp_enqueue_scripts', function () {
	$v = get_option( 'folio3_assets_version', '1' );
	wp_enqueue_style( 'folio3-site', FOLIO3_SITE_URL . 'assets/site.css', [], $v );
	wp_enqueue_style( 'folio3-effects', FOLIO3_SITE_URL . 'assets/effects.css', [ 'folio3-site' ], $v );
	if ( file_exists( FOLIO3_SITE_DIR . '/assets/generated.css' ) ) {
		wp_enqueue_style( 'folio3-generated', FOLIO3_SITE_URL . 'assets/generated.css', [ 'folio3-site' ], $v );
	}
	wp_enqueue_style( 'folio3-fonts', 'https://fonts.googleapis.com/css2?family=Bakbak+One&family=Geist:wght@600&family=Inter:wght@400;500;600;700;800&display=swap', [], null );
	wp_enqueue_script( 'folio3-site', FOLIO3_SITE_URL . 'assets/site.js', [], $v, true );
	wp_localize_script( 'folio3-site', 'folio3Site', [ 'home' => home_url( '/' ) ] );
}, 20 );

/* Brand fonts (Bakbak One, Inter, Geist) are enqueued above; preconnect to Google Fonts early. */
add_filter( 'wp_resource_hints', function ( $urls, $type ) {
	if ( 'preconnect' === $type ) {
		$urls[] = 'https://fonts.googleapis.com';
		$urls[] = [ 'href' => 'https://fonts.gstatic.com', 'crossorigin' ];
	}
	return $urls;
}, 10, 2 );

add_action( 'wp_head', function () {
	// Lets the motion CSS hide elements before they animate in; skipped inside the Elementor editor.
	if ( ! isset( $_GET['elementor-preview'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
		wp_print_inline_script_tag( "document.documentElement.classList.add('f3-js')" );
	}
}, 1 );
