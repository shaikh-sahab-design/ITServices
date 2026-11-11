<?php
/**
 * Old page addresses. The service, contact and thank-you pages moved to new URLs on 2026-11-10
 * (for example /network-design/ is now /services/managed-it/network-and-infrastructure/).
 * Links and bookmarks to the old addresses get a 301 to the page's current URL, looked up by id
 * so a later slug change keeps working.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function folio3_old_page_paths() {
	return [
		'managed-it-services'                => 454,
		'network-design'                     => 469,
		'migration-services'                 => 470,
		'disaster-recovery'                  => 471,
		'vcio-services'                      => 472,
		'database-management'                => 473,
		'identity-access-management'         => 474,
		'managed-security-services'          => 455,
		'vulnerability-assessment'           => 468,
		'soc-services'                       => 464,
		'threat-detection-incident-response' => 465,
		'cloud-security'                     => 466,
		'endpoint-security'                  => 467,
		'ai-security-services'               => 456,
		'ai-security-assessment'             => 457,
		'ai-governance-risk'                 => 463,
		'ai-data-security'                   => 458,
		'ai-application-llm-security'        => 459,
		'ai-agent-security'                  => 460,
		'ai-red-teaming'                     => 461,
		'ai-security-monitoring'             => 462,
		'contact'                            => 482,
		'thank-you'                          => 483,
	];
}

add_action( 'template_redirect', function () {
	if ( ! is_404() ) {
		return;
	}
	$path = trim( (string) wp_parse_url( $_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH ), '/' ); // phpcs:ignore
	$map  = folio3_old_page_paths();
	if ( ! isset( $map[ $path ] ) || 'publish' !== get_post_status( $map[ $path ] ) ) {
		return;
	}
	$to = get_permalink( $map[ $path ] );
	if ( ! $to || trim( (string) wp_parse_url( $to, PHP_URL_PATH ), '/' ) === $path ) {
		return;
	}
	$q = (string) wp_parse_url( $_SERVER['REQUEST_URI'] ?? '', PHP_URL_QUERY ); // phpcs:ignore
	wp_safe_redirect( $to . ( $q ? '?' . $q : '' ), 301 );
	exit;
}, 9 );
