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
		'capability_type' => 'post',
		'capabilities'    => [ 'create_posts' => 'do_not_allow' ],
		'map_meta_cap'    => true,
	] );
} );

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
	ob_start();
	?>
	<form class="f3-form" method="post" action="<?php echo $action; ?>">
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
	$back = wp_get_referer() ?: home_url( '/' );
	if ( ! isset( $_POST['_f3nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['_f3nonce'] ) ), 'folio3_inquiry' ) ) {
		wp_safe_redirect( $back );
		exit;
	}
	if ( ! empty( $_POST['website'] ) ) { // bot trap
		wp_safe_redirect( home_url( '/thank-you/' ) );
		exit;
	}
	$f = [
		'Full Name'      => sanitize_text_field( wp_unslash( $_POST['name'] ?? '' ) ),
		'Business Email' => sanitize_email( wp_unslash( $_POST['email'] ?? '' ) ),
		'Company Name'   => sanitize_text_field( wp_unslash( $_POST['company'] ?? '' ) ),
		'Phone Number'   => sanitize_text_field( wp_unslash( $_POST['phone'] ?? '' ) ),
		'Company Size'   => sanitize_text_field( wp_unslash( $_POST['size'] ?? '' ) ),
		'Needs'          => implode( ', ', array_map( 'sanitize_text_field', (array) wp_unslash( $_POST['needs'] ?? [] ) ) ),
		'Challenges'     => sanitize_textarea_field( wp_unslash( $_POST['challenges'] ?? '' ) ),
		'Page'           => esc_url_raw( $back ),
	];
	if ( ! $f['Full Name'] || ! is_email( $f['Business Email'] ) || ! $f['Company Name'] ) {
		wp_safe_redirect( $back );
		exit;
	}
	$body = '';
	foreach ( $f as $k => $v ) {
		$body .= $k . ': ' . $v . "\n";
	}
	wp_insert_post( [
		'post_type'    => 'folio3_inquiry',
		'post_status'  => 'private',
		'post_title'   => $f['Full Name'] . ' – ' . $f['Company Name'],
		'post_content' => $body,
	] );
	wp_mail( get_option( 'admin_email' ), 'New inquiry: ' . $f['Company Name'], $body, [ 'Reply-To: ' . $f['Full Name'] . ' <' . $f['Business Email'] . '>' ] );
	wp_safe_redirect( home_url( '/thank-you/' ) );
	exit;
}
add_action( 'admin_post_folio3_inquiry', 'folio3_handle_inquiry' );
add_action( 'admin_post_nopriv_folio3_inquiry', 'folio3_handle_inquiry' );
