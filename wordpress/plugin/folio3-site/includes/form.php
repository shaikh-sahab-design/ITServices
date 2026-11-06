<?php
/**
 * [folio3_contact_form] shortcode: the "Tell Us About Your IT Environment" form.
 * Entries are saved under Inquiries in wp-admin and emailed to the site admin, then the visitor lands on /thank-you/.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const FOLIO3_SIZES = [ '1–50 Employees', '51–200 Employees', '201–500 Employees', '501–1,000 Employees', '1,000+ Employees' ];
const FOLIO3_NEEDS = [ 'Managed IT Support', 'Endpoint Protection', 'Migration Services', 'Network Design', 'Disaster Recovery', 'IT Consulting / vCTO', 'Cybersecurity', 'Other' ];

add_action( 'init', function () {
	register_post_type( 'folio3_inquiry', [
		'label'           => 'Inquiries',
		'labels'          => [ 'name' => 'Inquiries', 'singular_name' => 'Inquiry' ],
		'public'          => false,
		'show_ui'         => true,
		'menu_icon'       => 'dashicons-email-alt',
		'supports'        => [ 'title', 'editor' ],
		// Own capabilities so only administrators can read the visitor details (see folio3_inquiry_caps).
		'capability_type' => [ 'folio3_inquiry', 'folio3_inquiries' ],
		'capabilities'    => [ 'create_posts' => 'do_not_allow' ],
		'map_meta_cap'    => true,
	] );
	folio3_inquiry_caps();
} );

/** Give administrators the Inquiry capabilities once (stored in the role, so this is a no-op after the first run). */
function folio3_inquiry_caps() {
	$role = get_role( 'administrator' );
	if ( ! $role || $role->has_cap( 'edit_folio3_inquiries' ) ) {
		return;
	}
	foreach ( [ 'edit_folio3_inquiries', 'edit_others_folio3_inquiries', 'edit_private_folio3_inquiries', 'read_private_folio3_inquiries', 'delete_folio3_inquiries', 'delete_others_folio3_inquiries', 'delete_private_folio3_inquiries', 'publish_folio3_inquiries', 'edit_published_folio3_inquiries', 'delete_published_folio3_inquiries' ] as $cap ) {
		$role->add_cap( $cap );
	}
}

// HubSpot form (portal 45888346) used for every contact block since 2026-11-05. [folio3_contact_form native="1"] brings back the built-in form.
const FOLIO3_HS_PORTAL = '45888346';
const FOLIO3_HS_FORM   = 'e1ecd3af-e383-4abc-bc36-d992f6ef1caa';

add_shortcode( 'folio3_contact_form', function ( $atts ) {
	$atts = shortcode_atts( [ 'native' => '' ], $atts );
	if ( ! $atts['native'] ) {
		wp_enqueue_script( 'folio3-hubspot-forms', 'https://js.hsforms.net/forms/embed/developer/' . FOLIO3_HS_PORTAL . '.js', [], null, [ 'strategy' => 'defer', 'in_footer' => true ] );
		return '<div class="f3-form f3-form--hubspot"><div class="hs-form-html" data-region="na1" data-form-id="' . esc_attr( FOLIO3_HS_FORM ) . '" data-portal-id="' . esc_attr( FOLIO3_HS_PORTAL ) . '"></div></div>';
	}
	$action = esc_url( admin_url( 'admin-post.php' ) );
	// Set by folio3_handle_inquiry() when it sends the visitor back.
	$errors = [
		'expired' => 'Your session expired. Please submit the form again.',
		'invalid' => 'Please fill in your name, a valid business email and your company name.',
		'limit'   => 'Too many submissions from your network. Please try again in an hour or email us directly.',
	];
	$err = isset( $_GET['f3err'] ) ? sanitize_key( wp_unslash( $_GET['f3err'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification
	ob_start();
	?>
	<form class="f3-form" method="post" action="<?php echo $action; ?>">
		<?php if ( isset( $errors[ $err ] ) ) : ?>
			<p class="f3-form__error" role="alert"><?php echo esc_html( $errors[ $err ] ); ?></p>
		<?php endif; ?>
		<input type="hidden" name="action" value="folio3_inquiry">
		<?php wp_nonce_field( 'folio3_inquiry', '_f3nonce' ); ?>
		<input type="text" name="website" value="" tabindex="-1" autocomplete="off" class="f3-form__trap" aria-hidden="true">
		<div class="f3-form__row">
			<label class="f3-field"><span class="f3-field__label">Full Name *</span>
				<input class="f3-field__input" name="name" placeholder="Enter Name" required autocomplete="name"></label>
			<label class="f3-field"><span class="f3-field__label">Business Email *</span>
				<input class="f3-field__input" name="email" type="email" placeholder="Enter business email" required autocomplete="email"></label>
		</div>
		<div class="f3-form__row">
			<label class="f3-field"><span class="f3-field__label">Company Name *</span>
				<input class="f3-field__input" name="company" placeholder="Enter company name" required autocomplete="organization"></label>
			<label class="f3-field"><span class="f3-field__label">Phone Number</span>
				<input class="f3-field__input" name="phone" type="tel" placeholder="Enter phone number" autocomplete="tel"></label>
		</div>
		<fieldset class="f3-field f3-field--set">
			<legend class="f3-field__label">Company Size</legend>
			<div class="f3-chips">
				<?php foreach ( FOLIO3_SIZES as $i => $s ) : ?>
					<label class="f3-chip"><input type="radio" name="size" value="<?php echo esc_attr( $s ); ?>" <?php checked( 1, $i ); ?>><span><?php echo esc_html( $s ); ?></span></label>
				<?php endforeach; ?>
			</div>
		</fieldset>
		<fieldset class="f3-field f3-field--set">
			<legend class="f3-field__label">What Do You Need Help With?</legend>
			<div class="f3-options">
				<?php foreach ( FOLIO3_NEEDS as $i => $n ) : ?>
					<label class="f3-option"><input type="checkbox" name="needs[]" value="<?php echo esc_attr( $n ); ?>" <?php checked( 0, $i ); ?>><span class="f3-option__box" aria-hidden="true"><span class="f3-option__check">✓</span></span><span><?php echo esc_html( $n ); ?></span></label>
				<?php endforeach; ?>
			</div>
		</fieldset>
		<label class="f3-field"><span class="f3-field__label">Tell Us About Your Current IT Challenges</span>
			<textarea class="f3-field__input f3-field__input--area" name="challenges" placeholder="Tell us what you’re looking to improve, migrate, secure, or manage."></textarea></label>
		<div class="f3-form__footer">
			<p class="f3-form__micro">Our team will review your request and connect you with the appropriate Managed IT specialist.</p>
			<button type="submit" class="f3-form__submit"><span class="f3-form__submit-label">Submit Inquiry</span></button>
		</div>
	</form>
	<?php
	return ob_get_clean();
} );

function folio3_handle_inquiry() {
	$back = remove_query_arg( 'f3err', wp_get_referer() ?: home_url( '/' ) );
	if ( ! isset( $_POST['_f3nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['_f3nonce'] ) ), 'folio3_inquiry' ) ) {
		wp_safe_redirect( add_query_arg( 'f3err', 'expired', $back ) );
		exit;
	}
	if ( ! empty( $_POST['website'] ) ) { // bot trap
		wp_safe_redirect( home_url( '/thank-you/' ) );
		exit;
	}
	// At most 5 submissions per IP per hour.
	$ip_key = 'folio3_inq_' . md5( isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '' );
	$count  = (int) get_transient( $ip_key );
	if ( $count >= 5 ) {
		wp_safe_redirect( add_query_arg( 'f3err', 'limit', $back ) );
		exit;
	}
	set_transient( $ip_key, $count + 1, HOUR_IN_SECONDS );

	$cut  = function ( $s, $n ) {
		return mb_substr( $s, 0, $n );
	};
	$size = sanitize_text_field( wp_unslash( $_POST['size'] ?? '' ) );
	$f    = [
		'Full Name'      => $cut( sanitize_text_field( wp_unslash( $_POST['name'] ?? '' ) ), 100 ),
		'Business Email' => $cut( sanitize_email( wp_unslash( $_POST['email'] ?? '' ) ), 200 ),
		'Company Name'   => $cut( sanitize_text_field( wp_unslash( $_POST['company'] ?? '' ) ), 150 ),
		'Phone Number'   => $cut( sanitize_text_field( wp_unslash( $_POST['phone'] ?? '' ) ), 40 ),
		'Company Size'   => in_array( $size, FOLIO3_SIZES, true ) ? $size : '',
		'Needs'          => implode( ', ', array_intersect( array_map( 'sanitize_text_field', (array) wp_unslash( $_POST['needs'] ?? [] ) ), FOLIO3_NEEDS ) ),
		'Challenges'     => $cut( sanitize_textarea_field( wp_unslash( $_POST['challenges'] ?? '' ) ), 5000 ),
		'Page'           => esc_url_raw( $back ),
	];
	if ( ! $f['Full Name'] || ! is_email( $f['Business Email'] ) || ! $f['Company Name'] ) {
		wp_safe_redirect( add_query_arg( 'f3err', 'invalid', $back ) );
		exit;
	}
	$body = '';
	foreach ( $f as $k => $v ) {
		$body .= $k . ': ' . $v . "\n";
	}
	$inquiry_id = wp_insert_post( [
		'post_type'    => 'folio3_inquiry',
		'post_status'  => 'private',
		'post_title'   => $f['Full Name'] . ' – ' . $f['Company Name'],
		'post_content' => $body,
	] );
	if ( $inquiry_id && ! is_wp_error( $inquiry_id ) ) {
		// Lets the privacy exporter and eraser find this visitor's inquiries.
		update_post_meta( $inquiry_id, '_folio3_email', strtolower( $f['Business Email'] ) );
	}
	// wp_mail splits Reply-To on commas, so strip them (and quoting characters) from the name.
	$reply_name = trim( str_replace( [ ',', '"', '<', '>', ';' ], ' ', $f['Full Name'] ) );
	wp_mail( get_option( 'admin_email' ), 'New inquiry: ' . $f['Company Name'], $body, [ 'Reply-To: "' . $reply_name . '" <' . $f['Business Email'] . '>' ] );
	wp_safe_redirect( home_url( '/thank-you/' ) );
	exit;
}
add_action( 'admin_post_folio3_inquiry', 'folio3_handle_inquiry' );
add_action( 'admin_post_nopriv_folio3_inquiry', 'folio3_handle_inquiry' );

/* Privacy: Tools > Export / Erase Personal Data find inquiries by the visitor's email. */
function folio3_inquiries_for_email( $email, $page ) {
	return get_posts( [
		'post_type'      => 'folio3_inquiry',
		'post_status'    => 'any',
		'posts_per_page' => 50,
		'paged'          => max( 1, (int) $page ),
		'meta_key'       => '_folio3_email', // phpcs:ignore WordPress.DB.SlowDBQuery
		'meta_value'     => strtolower( $email ), // phpcs:ignore WordPress.DB.SlowDBQuery
	] );
}

add_filter( 'wp_privacy_personal_data_exporters', function ( $exporters ) {
	$exporters['folio3-inquiries'] = [
		'exporter_friendly_name' => 'Contact form inquiries',
		'callback'               => function ( $email, $page = 1 ) {
			$posts = folio3_inquiries_for_email( $email, $page );
			$items = [];
			foreach ( $posts as $post ) {
				$items[] = [
					'group_id'    => 'folio3-inquiries',
					'group_label' => 'Contact form inquiries',
					'item_id'     => 'folio3-inquiry-' . $post->ID,
					'data'        => [
						[ 'name' => 'Submitted', 'value' => get_the_date( 'Y-m-d H:i', $post ) ],
						[ 'name' => 'Details', 'value' => $post->post_content ],
					],
				];
			}
			return [ 'data' => $items, 'done' => count( $posts ) < 50 ];
		},
	];
	return $exporters;
} );

add_filter( 'wp_privacy_personal_data_erasers', function ( $erasers ) {
	$erasers['folio3-inquiries'] = [
		'eraser_friendly_name' => 'Contact form inquiries',
		'callback'             => function ( $email, $page = 1 ) {
			// Deleting shifts the result set, so always read the first page.
			$posts   = folio3_inquiries_for_email( $email, 1 );
			$removed = false;
			foreach ( $posts as $post ) {
				$removed = (bool) wp_delete_post( $post->ID, true ) || $removed;
			}
			return [ 'items_removed' => $removed, 'items_retained' => false, 'messages' => [], 'done' => count( $posts ) < 50 ];
		},
	];
	return $erasers;
} );

add_action( 'admin_init', function () {
	if ( function_exists( 'wp_add_privacy_policy_content' ) ) {
		wp_add_privacy_policy_content(
			'Folio3 Site Helper',
			wp_kses_post( '<p>The contact form is provided by HubSpot. When you send it, HubSpot receives your name, business email, company, phone number, company size, the services you picked and your message, and passes them to our team. Page fonts load from Google Fonts, which receives your IP address.</p>' )
		);
	}
} );
