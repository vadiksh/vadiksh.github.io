<?php 
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
			<a targer="_blank" href="https://www.gorendezvous.com/fr/marieevetanguay/">
				<button type="button" class="btn btn-primary hvr-grow">
					<span class="top">J’aimerais prendre un</span><br>
					<span class="bottom">RENDEZ-VOUS EN LIGNE</span>
				</button>
				</a>
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