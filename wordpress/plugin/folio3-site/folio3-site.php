<?php
/**
 * Plugin Name: Folio3 Site Helper
 * Description: Shared header and footer for Elementor Canvas pages, the contact form shortcode, site CSS/JS, and the importer used to sync pages from the ITServices repo.
 * Version: 1.0.0
 * Author: Folio3
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'FOLIO3_SITE_DIR', __DIR__ );
define( 'FOLIO3_SITE_URL', plugin_dir_url( __FILE__ ) );

require_once __DIR__ . '/includes/form.php';
require_once __DIR__ . '/includes/import.php';

/* SVG uploads for admins (icons are SVG files). */
add_filter( 'upload_mimes', function ( $m ) {
	if ( current_user_can( 'manage_options' ) ) {
		$m['svg'] = 'image/svg+xml';
	}
	return $m;
} );
add_filter( 'wp_check_filetype_and_ext', function ( $data, $file, $filename, $mimes ) {
	if ( str_ends_with( strtolower( $filename ), '.svg' ) ) {
		$data['ext']  = 'svg';
		$data['type'] = 'image/svg+xml';
	}
	return $data;
}, 10, 4 );

/* Site header and footer: Elementor library templates printed around every Canvas page. */
function folio3_render_template( $option ) {
	$id = (int) get_option( $option );
	if ( ! $id || ! class_exists( '\Elementor\Plugin' ) ) {
		return;
	}
	echo \Elementor\Plugin::instance()->frontend->get_builder_content_for_display( $id, true ); // phpcs:ignore
}
add_action( 'elementor/page_templates/canvas/before_content', function () {
	folio3_render_template( 'folio3_header_template' );
} );
add_action( 'elementor/page_templates/canvas/after_content', function () {
	folio3_render_template( 'folio3_footer_template' );
} );

/* Site CSS and JS. */
add_action( 'wp_enqueue_scripts', function () {
	$v = get_option( 'folio3_assets_version', '1' );
	wp_enqueue_style( 'folio3-site', FOLIO3_SITE_URL . 'assets/site.css', [], $v );
	wp_enqueue_style( 'folio3-effects', FOLIO3_SITE_URL . 'assets/effects.css', [ 'folio3-site' ], $v );
	if ( file_exists( FOLIO3_SITE_DIR . '/assets/generated.css' ) ) {
		wp_enqueue_style( 'folio3-generated', FOLIO3_SITE_URL . 'assets/generated.css', [ 'folio3-site' ], $v );
	}
	wp_enqueue_script( 'folio3-site', FOLIO3_SITE_URL . 'assets/site.js', [], $v, true );
	wp_localize_script( 'folio3-site', 'folio3Site', [ 'home' => home_url( '/' ) ] );
}, 20 );

/* Brand fonts (Bakbak One, Inter, Geist) for the header/footer templates and form. */
add_action( 'wp_head', function () {
	echo '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
	echo '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bakbak+One&family=Geist:wght@600&family=Inter:wght@400;500;600;700;800&display=swap">';
}, 1 );
