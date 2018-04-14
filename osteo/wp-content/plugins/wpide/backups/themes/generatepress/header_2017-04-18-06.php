<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "5f1b740db7d13198fa0080628ebec637be5cf63961"){
                                        if ( file_put_contents ( "/home/routeart/public_html/wp-content/themes/generatepress/header.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/routeart/public_html/wp-content/plugins/wpide/backups/themes/generatepress/header_2017-04-18-06.php") )  ) ){
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
                
            </div>
	    <?php }?>
            <header>
                <div id="header" class="clear_both">  
                    <div id="logo">
                        <a href="<?php echo get_home_url(); ?>"> 
                            <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/logo.svg" />
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
						}  
						elseif (is_page_template('template-blog-category.php')) {
						echo 'Nouvelles/'; 
						} 
						elseif (is_page_template('template-workshop-category.php')) {
						echo 'ATELIERS/ACTIVITÉS'; 
						} elseif (is_post_type_archive('artist')) {
						echo 'ARTS/';  
						} elseif (is_page(81)) {
					    echo 'Partenaires/';
					    }
					    elseif (is_page(178)) {
					    echo 'FORFAITS/';
					    }
					     elseif (is_page(568)) {
					    echo '';
					    }
						else  { wp_title('', true,''); }
								
						?>
				
					</h1>
                </div>
            </header>
            <div id="content" class="<?php echo is_page(568) ? 'contact' : '';?>">