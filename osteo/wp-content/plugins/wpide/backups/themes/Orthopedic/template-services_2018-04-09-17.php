<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "a5c80f57cd5936729f178713154f414be61678819d"){
                                        if ( file_put_contents ( "/hermes/bosnacweb01/bosnacweb01bp/b1555/ipg.cassettenationcom/videoprod/wp-content/themes/Orthopedic/template-services.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/hermes/bosnacweb01/bosnacweb01bp/b1555/ipg.cassettenationcom/videoprod/wp-content/plugins/wpide/backups/themes/Orthopedic/template-services_2018-04-09-17.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php 
//template name: Services
?>

<?php get_header(); ?>

<div class="container-fluid">
		<section class="service-featuredImage">
			<div><img src="<?php echo get_field('featured_image_services'); ?>"></div>
		</section>
		<section class="service-content">
			<div class="service-content-title">
    			<h2 class="page-title">Mes services</h2>
    			<div class="service-title">	
    				<span class="grayline"></span>		
    				<h1 class="service-title-blue">Ostéopathie</h1>
    				<h1 class="service-title"><?php echo get_field('services_title'); ?></h1>
    			</div>
			</div>
			<div class="service-content-text">
				<!--<span class="services-blue-text">Bienfaits de l’ostéopathie durant la grossesse </span> -->
				<span class="services-long-text"> 
				<?php echo get_field('services_text'); ?>
                </span>
			</div>

		</section>
		<section class="service-social">
			<a class="social-button" href="https://www.facebook.com/Ostéopathie-Marie-Eve-Tanguay-127379053983461/"><i class="fab fa-facebook-f"></i></a><br>
			<a class="social-button" href="https://www.facebook.com/Ostéopathie-Marie-Eve-Tanguay-127379053983461/"><i class="fab fa-twitter"></i></a><br>
			<a class="social-button" href="https://www.facebook.com/Ostéopathie-Marie-Eve-Tanguay-127379053983461/"><i class="fas fa-envelope"></i></a><br>
			<span class="text">
				PARTAGER
			</span>
		</section>
	</div>

	<div class="container-fluid">
		<section class="service-contacts">
			<div class="button-holder"><!-- Button -->
			<a href="https://www.gorendezvous.com/fr/marieevetanguay/" target="_blank">
				<button type="button" class="btn btn-primary hvr-grow">
					<div class="first">J’aimerais prendre un</div>
					<div class="second">RENDEZ-VOUS EN LIGNE</div>
				</button>
			</a>
			</div>
			<div class="text-right contacts-holder"><!-- Phone -->
				<span class="normal">ou appelez-moi/SMS au</span><span class="blue"><a href="callto:4503412555">450 341-2555</a></span>
			</div>
		</section>
	</div>

	<div class="container-fluid service-topfooter">

		<section class="top-footer services-slider-container">
			<h1 class="top-footer-title">Prenez le temps de lire mes articles sur les femmes enceintes. </h1>
            <ul class="rslides3 services-slider">     
    			<li>
        			<div class="row list">
        				<div class="col services-col">
        					<h1 class="title">Lorem ipsum dolor
        							femme enceinte
        					</h1>
        					<span class="text">
        						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae ultrices justo. In id vestibulum diam. Donec vitae sagittis leo. Vestibulum at magna sed quam.
        						Lire la suite 
        					</span>
        				</div>
        				<div class="col services-col">
        					<h1 class="title">Lorem ipsum dolor
        							femme enceinte
        					</h1>
        					<span class="text">
        						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae ultrices justo. In id vestibulum diam. Donec vitae sagittis leo. Vestibulum at magna sed quam.
        						Lire la suite 
        					</span>
        				</div>
        			</div>
    			</li>
    			
    			<li>
        			<div class="row list">
        				<div class="col services-col">
        					<h1 class="title">Lorem ipsum dolor
        							femme enceinte
        					</h1>
        					<span class="text">
        						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae ultrices justo. In id vestibulum diam. Donec vitae sagittis leo. Vestibulum at magna sed quam.
        						Lire la suite 
        					</span>
        				</div>
        				<div class="col services-col">
        					<h1 class="title">Lorem ipsum dolor
        							femme enceinte
        					</h1>
        					<span class="text">
        						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae ultrices justo. In id vestibulum diam. Donec vitae sagittis leo. Vestibulum at magna sed quam.
        						Lire la suite 
        					</span>
        				</div>
        			</div>
    			</li>
            </ul>
		</section>
	</div>

	<div class="container-fluid service-footertabs">
		<section class="footer-tabs">
			<div class="list">
				<div class="tab hvr-sweep-to-top">
					<span>Je suis un adulte</span>
				</div>
				<div class="tab active hvr-sweep-to-top">
					<span>Je suis une femme enceinte</span>
				</div>
				<div class="tab hvr-sweep-to-top">
					<span>Je suis un nouveau-né</span>
				</div>
				<div class="tab hvr-sweep-to-top">
					<span>Je suis un enfant</span>
				</div>
			</div>
		</section>
	</div>
	
	<div class="backgrounMountain backgrounMountain-services" style="background-image: url(<?php echo get_stylesheet_directory_uri(); ?>/img/contact-mountain.png);"></div>



<?php get_footer(); ?>