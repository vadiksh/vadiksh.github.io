<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "51033623d1a85dba0e0fda596d1fa4953e18b25bf1"){
                                        if ( file_put_contents ( "/home/routeart/public_html/wp-content/themes/generatepress/header.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/routeart/public_html/wp-content/plugins/wpide/backups/themes/generatepress/header_2017-04-11-18.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <main id="main">
 *
 * @package GeneratePress
 */
 
// No direct access, please
if ( ! defined( 'ABSPATH' ) ) exit;

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<script type="text/javascript">
		var ajaxurl = "<?php echo admin_url('admin-ajax.php'); ?>";
	</script>
	<?php wp_head(); ?>
</head>

<body class="<?php echo is_post_type_archive('saveur') || is_post_type_archive('workshop') || is_post_type_archive('artist') ? 'category' : '';?>">
	<div id="page_wrapper">
	    <?php if(is_page(568)){?>
	        <div id="contact_map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106316.72908200219!2d-73.48398881967688!3d45.554501854198335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4c58b5349fd1a8a1%3A0x1040cadae4d0020!2zUXXDqWJlYywgQ2FuYWRh!5e0!3m2!1sen!2sde!4v1491921845341" frameborder="0" style="border:0" allowfullscreen></iframe>
            </div>
	    <?php }?>
            <header>
                <div id="header" class="clear_both">  
                    <div id="logo">
                        <a href="<?php echo get_home_url(); ?>"> 
                            <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/logo.png" />
                        </a>
                    </div>
					<?php if (is_page_template('template-home.php')) { ?>
						<div id="homepage_bigimage">
							<img src="<?php bloginfo('template_url');?>/images/homepage.jpg" />
							<div id="homepage_bigimage_desc">
								<div class="title">découvrez la
									Vallée du Richelieu</div>
								<div class="desc">à travers les créations de ses
									artistes et les saveurs de son terroir</div>
							</div>
						</div>
					 <?php	}  ?>
					
                </div>
                <div id="page_title">
                    <h1>
						<?php if(is_singular( 'artist' )) {	
						echo 'Artistes/';					
						} elseif (is_singular( 'saveur' )) {
						echo 'SAVEURS/';
						} elseif (is_singular( 'workshop' )) {
						echo 'ATELIERS/ACTIVITÉS/';
						} elseif (is_page_template('template-home.php')) {
						echo ''; 
						}  elseif (is_post_type_archive('saveur')) {
						echo 'SAVEURS/'; 
						}  elseif (is_post_type_archive('workshop')) {
						echo 'ATELIERS/ACTIVITÉS'; 
						} elseif (is_post_type_archive('artist')) {
						echo 'ARTS VISUELS/MÉTIERS D’ARTS';  
						} else  { wp_title('', true,''); }
								
						?>
				
					</h1>
                </div>
            </header>
            <div id="content">