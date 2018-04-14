<?php 
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
			<a class="social-button" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>" onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;"><i class="fab fa-facebook-f"></i></a><br>
			<a class="social-button" href="https://twitter.com/share?text=<?php the_title(); ?>&url=<?php the_permalink(); ?>" target="_blank"><i class="fab fa-twitter"></i></a><br>
			<a class="social-button" href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site <?php the_permalink(); ?>"><i class="fas fa-envelope"></i></a><br>
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
		        <a href="/services/je-suis-un-adulte/">
				<div class="tab hvr-sweep-to-top">
					<span>Je suis un adulte</span>
				</div>
				</a>
				 <a href="/services/je-suis-un-enfant/">
				<div class="tab active hvr-sweep-to-top">
					<span>Je suis une femme enceinte</span>
				</div>
				</a>
				 <a href="/services/je-suis-un-nouveau-ne/">
				<div class="tab hvr-sweep-to-top">
					<span>Je suis un nouveau-né</span>
				</div>
				</a>
				 <a href="/services/je-suis-une-femme-enceinte/">
				<div class="tab hvr-sweep-to-top">
					<span>Je suis un enfant</span>
				</div>
				</a>
			</div>
		</section>
	</div>
	
	<div class="backgrounMountain backgrounMountain-services" style="background-image: url(<?php echo get_stylesheet_directory_uri(); ?>/img/contact-mountain.png);"></div>



<?php get_footer(); ?>