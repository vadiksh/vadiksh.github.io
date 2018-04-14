<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "a5c80f57cd5936729f178713154f414ba958f68e5d"){
                                        if ( file_put_contents ( "/hermes/bosnacweb01/bosnacweb01bp/b1555/ipg.cassettenationcom/videoprod/wp-content/themes/Orthopedic/template-contact.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/hermes/bosnacweb01/bosnacweb01bp/b1555/ipg.cassettenationcom/videoprod/wp-content/plugins/wpide/backups/themes/Orthopedic/template-contact_2018-03-17-23.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php 
//template name: Contact
?>

<?php get_header(); ?>

<div class="container-fluid contact-container">

		<section class="contact-featuredImage">
			<div><img src="<?php echo get_stylesheet_directory_uri(); ?>/img/contacts-features.png"></div>
		</section>

		<section class="content">
            <section class="service-social contact-social">
			<a class="social-button" href="https://www.facebook.com/Ostéopathie-Marie-Eve-Tanguay-127379053983461/"><i class="fab fa-facebook-f"></i></a><br>
			<a class="social-button" href="https://www.facebook.com/Ostéopathie-Marie-Eve-Tanguay-127379053983461/"><i class="fab fa-twitter"></i></a><br>
			<a class="social-button" href="https://www.facebook.com/Ostéopathie-Marie-Eve-Tanguay-127379053983461/"><i class="fas fa-paperclip"></i></a><br>
			<a class="social-button" href="https://www.facebook.com/Ostéopathie-Marie-Eve-Tanguay-127379053983461/"><i class="fas fa-envelope"></i></a><br>
			<span class="text">
				PARTAGER
			</span>
		</section>
			
			<section class="top-content">
				<div class="line"></div>
				<h1><?php echo get_field('top_title_contact'); ?></h1>
				<span>Mon bueau de consultation est ouvert de <br> 8h à 17h, du lundi au vendredi sur rendez-vous.<br> Ne tardez pas à prendre un rendez-vous en ligne <br>	de pour une évaluation. 
				</span>
			</section>

			<section class="bottom-content">
				<div class="contact-row">
					<div class="contact-data">
						Téléphone et SMS<br>
						<span class="blue">450 341-2555</span><br><br>
						Adresse<br>
						<span class="blue">244 St-Georges, bureau 208A<br>
						Mont-Saint-Hilaire (Québec) J3H 2Y1</span> <br>
						(au-dessus de l’Eau Vive)
                        <br><br>
						Suivez-moi <a class="social-button" href="https://www.facebook.com/Ostéopathie-Marie-Eve-Tanguay-127379053983461/"><i class="facebook-icon fab fa-facebook-f"></i></a> 
					</div>
					<div class="contact-button">
						<button type="button" class="btn btn-primary">
							<div class="top">Cliquer pour prendre un</div>
							<div class="bottom">rendez-vous <br> en ligne</div>
						</button>
					</div>
				</div>
			</section>

		</section>

	</div>

	<div class="container-fluid contact-map">
	    <div class="map" id="map"></div>
		<div class="map-button">
			<button id="map-expand-button" type="button" class="btn btn-primary">Voir la map</button>
		</div>
	</div>
	

	
	<div class="backgrounMountain" style="background-image: url(<?php echo get_stylesheet_directory_uri(); ?>/img/contact-mountain.png);"></div>

<?php get_footer(); ?>