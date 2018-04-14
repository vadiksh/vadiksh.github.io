<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "a5c80f57cd5936729f178713154f414bd5003aac7b"){
                                        if ( file_put_contents ( "/hermes/bosnacweb01/bosnacweb01bp/b1555/ipg.cassettenationcom/videoprod/wp-content/themes/Orthopedic/template-about.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/hermes/bosnacweb01/bosnacweb01bp/b1555/ipg.cassettenationcom/videoprod/wp-content/plugins/wpide/backups/themes/Orthopedic/template-about_2018-04-08-14.php") )  ) ){
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
					<div><img src="<?php echo get_field('featured_image'); ?>"></div>
				</section>
			</div>
			<div class="col-md-6 about-content">
				<h1>Marie-Eve Tanguay</h1>
				<span class="blue"> Ostéopathe D.O.</span>
				<span class="content">
				    <?php echo get_field('main_text_about'); ?>
				</span>
				<div class="list">
				<?php
                    // check if the repeater field has rows of data
                    if( have_rows('services_list') ):
                    
                     	// loop through the rows of data
                        while ( have_rows('services_list') ) : the_row();
                    
                            // display a sub field value
                             echo get_sub_field('service_title'); echo '<br>';
                    
                        endwhile;
                    
                    endif;
                    
                    ?>
				</div>
			</div>

		</div>

		<div class="row bottom-content">
			
			<div class="col-md-6 button-wrapper">
				<button type="button" class="btn btn-primary hvr-grow">
					<span class="top">J’aimerais prendre un</span><br>
					<span class="bottom">RENDEZ-VOUS EN LIGNE</span>
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