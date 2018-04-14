<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "a5c80f57cd5936729f178713154f414bc0194eeb33"){
                                        if ( file_put_contents ( "/hermes/bosnacweb01/bosnacweb01bp/b1555/ipg.cassettenationcom/videoprod/wp-content/themes/Orthopedic/template-about.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/hermes/bosnacweb01/bosnacweb01bp/b1555/ipg.cassettenationcom/videoprod/wp-content/plugins/wpide/backups/themes/Orthopedic/template-about_2018-03-11-10.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php 
//template name: About
?>

<?php get_header(); ?>

<div class="container-fluid about-container">

		<div class="row">
			
			<div class="col-md-6">
				<section class="about-featuredImage">
					<div><img src="<?php echo get_stylesheet_directory_uri(); ?>/img/about-featured.png"></div>
				</section>
			</div>
			<div class="col-md-6 about-content">
				<h1>Marie-Eve Tanguay</h1>
				<span class="blue"> Ostéopathe D.O.</span>
				<span class="content">Diplômée en ostéopathie et membre d'Ostéopathie Québec, Marie-Eve Tanguay a obtenu son baccalauréat en ostéopathie au Collège 	d’Études Ostéopathiques de Montréal, programme validé de l’Université de Wales. <br>
					Elle a poursuivi son parcours en complétant son deuxième cycle sur les fractures du bassin. <br>
					Elle pratique l’ostéopathie dans ses bureaux de Mont-Saint-Hilaire depuis 9 ans.  <br> <br>
					Sa clientèle est très variée :
				</span>
				<div class="list">
					Nouveaux-nés<br>
					Enfants<br>
					Adultes<br>
					Sportifs<br>
					Femmes enceintes<br>
					Personnes âgées<br>
					Travailleurs<br>
				</div>
			</div>

		</div>

		<div class="row bottom-content">
			
			<div class="col-md-6 button-wrapper">
				<button type="button" class="btn btn-primary">
					<span class="top">J’aimerais prendre un</span><br>
					<span class="bottom">rendez-vous en ligne</span>
				</button>
			</div>
			<div class="col-md-6">
				<span class="about-button-content">
					ou téléphonez-lui (ou SMS)<br>au <span class="blue">450 341-2555</span><br>
					Vous pouvez suivre Marie-Eve sur <a class="social-button" href="https://www.facebook.com/Ostéopathie-Marie-Eve-Tanguay-127379053983461/"><i class="fab fa-facebook-f"></i></a>
				</span>
			</div>

		</div>

	</div>


<?php get_footer(); ?>