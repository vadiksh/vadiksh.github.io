<?php
/**
 * 
 *
 * 
 */

// No direct access, please
if ( ! defined( 'ABSPATH' ) ) exit;

define( 'GENERATE_VERSION', '1.3.46' );
define( 'GENERATE_URI', get_template_directory_uri() );
define( 'GENERATE_DIR', get_template_directory() );

add_action( 'init', 'theme_menu' );
function theme_menu() {
	register_nav_menus(
		array(
			'main-menu' => __( 'Main Menu' ),
		   )
		);
}


function cc_mime_types($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');


/*ACF Pro Option Page*/
if( function_exists('acf_add_options_page') ) {
 
 acf_add_options_page(array(
 'menu_title' => 'Orthopedic',
 'menu_slug' => 'theme-general-settings'
 ));
 
 acf_add_options_sub_page(array(
 'page_title' => 'Theme Header Settings',
 'menu_title' => 'Header',
 'parent_slug' => 'theme-general-settings',
 ));
 
  acf_add_options_sub_page(array(
 'page_title' => 'Theme footer Settings',
 'menu_title' => 'Footer',
 'parent_slug' => 'theme-general-settings',
 ));
 
 
}


add_action('wp_ajax_nopriv_send_email_action', 'send_email');
add_action('wp_ajax_send_email_action', 'send_email');

//send Email Function
function send_email(){
    $user_name =isset($_POST['username']) ? $_POST['username']: "" ;
    $user_email =isset($_POST['useremail']) ? $_POST['useremail']: '' ;
    $user_secondname = isset($_POST['usersecondname']) ? $_POST['usersecondname']: '' ;
    $user_phone = isset($_POST['userphone']) ? $_POST['userphone']: '' ;
    $user_msg =isset($_POST['usermsg']) ? $_POST['usermsg']: '' ;

$finalText = "";
$finalText = $finalText. "Name: ".$user_name."\r\n". "Second Name: " . $user_secondname . "\r\n" . "Phone Number: " . $user_phone . "\r\n" .
"Email: ".$user_email."\r\n".
"Message: ".$user_msg;

if( mail( 'info@mariodaigle.com', 'Email From Mariodaigle.com' ,$finalText))
echo "1";
else
echo "0";
exit();
}


