<?php
/**
 * Removes the plugin's settings, caches and capabilities. Inquiry posts are kept so leads aren't lost.
 */

defined( 'WP_UNINSTALL_PLUGIN' ) || exit;

foreach ( (array) get_option( 'folio3_blog_card_keys', [] ) as $key ) {
	delete_transient( $key );
}
foreach ( [ 'folio3_blog_card_keys', 'folio3_media', 'folio3_assets_version', 'folio3_header_template', 'folio3_footer_template' ] as $option ) {
	delete_option( $option );
}

$role = get_role( 'administrator' );
if ( $role ) {
	foreach ( [ 'edit_folio3_inquiries', 'edit_others_folio3_inquiries', 'edit_private_folio3_inquiries', 'read_private_folio3_inquiries', 'delete_folio3_inquiries', 'delete_others_folio3_inquiries', 'delete_private_folio3_inquiries', 'publish_folio3_inquiries', 'edit_published_folio3_inquiries', 'delete_published_folio3_inquiries' ] as $cap ) {
		$role->remove_cap( $cap );
	}
}
