<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "a5c80f57cd5936729f178713154f414b87f8bdf7c0"){
                                        if ( file_put_contents ( "/hermes/bosnacweb01/bosnacweb01bp/b1555/ipg.cassettenationcom/videoprod/wp-content/themes/Orthopedic/header.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/hermes/bosnacweb01/bosnacweb01bp/b1555/ipg.cassettenationcom/videoprod/wp-content/plugins/wpide/backups/themes/Orthopedic/header_2018-03-21-13.php") )  ) ){
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

?>
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="stylesheet" href=" <?php echo get_stylesheet_directory_uri(); ?>/css/bootstrap.min.css">
	<link rel="stylesheet" href=" <?php echo get_stylesheet_directory_uri(); ?>/css/bootstrap-reboot.min.css">
	<link rel="stylesheet" href=" <?php echo get_stylesheet_directory_uri(); ?>/css/bootstrap-grid.min.css">

	<link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
<?php wp_head(); ?>
	<link rel="stylesheet" href=" <?php echo get_stylesheet_directory_uri(); ?>/style.css">
</head>
<body>

<div class="container-fluid">
		
		<section class="top-header"><!-- Top Header -->
			<div class="row">
				<div class="col">
					<p class="text-right">Ostéopathe Beloeil, McMasterville, Mont-St-Hilaire, Otterburn Park et plus</p>
				</div>
			</div>
		</section>

		<section class="header">
			<div class="header-content">
				<div class="logo-holder"><!-- Logo -->
					<img src="<?php echo get_stylesheet_directory_uri(); ?>/img/Osteopathie-marie-eve-tanguay-logo_03.svg" alt="" class="img-logo">


				</div>
				<div class=" logo-hamburger-holder text-right" ><!-- Facebook, Hamburger -->
						<div class=" menuBtn hamburger-button">
							<span>MENU</span>
							<i class="fas fa-bars"></i>
						</div>
					</div>
				<div class="right-column"><!-- Header - Right -->
					<div class="row justify-content-between no-margin-right">
						<div class="text-right contacts-holder"><!-- Phone -->
							<span class="normal"><img src="<?php echo get_stylesheet_directory_uri(); ?>/img/phone-sms.svg"></span><span class="blue">450 341-2555</span>
						</div>
						<div class="button-holder"><!-- Button   <button type="button" class="btn btn-primary">PRENDRE UN RENDEZ-VOUS</button> -->
    
							<div data-professionalpagename="marieevetanguay" data-bookingWidgetUrlParams="companyId=101171" data-language="fr" data-stayOnPage="1" data-label="Prendre un rendez-vous" data-url="https://www.gorendezvous.com/" class="gorendezvous-button" data-buttoncolor="info" data-width="260px"><a href="https://www.gorendezvous.com/marieevetanguay?companyId=101171" target="GOrendezvous">PRENDRE UN RENDEZ-VOUS</a></div><a class="social-button" href="https://www.facebook.com/Ostéopathie-Marie-Eve-Tanguay-127379053983461/"><i class="facebook-icon fab fa-facebook-f"></i></a>
							<div class="mobile-contact"><a class="social-button" href="https://www.facebook.com/Ostéopathie-Marie-Eve-Tanguay-127379053983461/"><i class="facebook-icon fab fa-facebook-f"></i></a><span class="blue">450 341-2555</span></div>
						</div>
						<div class="hamburger-holder text-right" ><!-- Facebook, Hamburger -->
							<div class=" menuBtn hamburger-button">
								<span>MENU</span>
								<i class="fas fa-bars"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			
            <script>!function (d, s) { var js, sid = "gorendezvous-bookingwidget-script"; var sEl = d.getElementById(sid); if(sEl) { sEl.parentNode.removeChild(sEl); } js = d.createElement(s); js.id = sid; js.src = "https://www.gorendezvous.com/Scripts/gorendezvous.bookingWidgetV2.min.js"; d.body.appendChild(js); } (document, "script");</script>

			<div class="menu-overlay">
				<div class="close-button"><i class="fas fa-times"  id="closeMenu"></i></div>
				<div class="menu-content">
                    <?php wp_nav_menu( array(
                        'menu'   => 'Menu',
                        'menu_id'         => 'nav'
                    ) ); ?>
					<!--<a href="http://orthopedic.cassette.am">Home</a>
					<a href="http://orthopedic.cassette.am/services/">Services</a>
					<a href="http://orthopedic.cassette.am/about/">About</a>
					<a href="http://orthopedic.cassette.am/contact/">Contacts</a>-->
				</div>
			</div>
		</section>

	</div>