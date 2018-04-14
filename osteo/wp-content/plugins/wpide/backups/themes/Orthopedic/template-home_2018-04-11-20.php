<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "a5c80f57cd5936729f178713154f414b4eadd500a3"){
                                        if ( file_put_contents ( "/hermes/bosnacweb01/bosnacweb01bp/b1555/ipg.cassettenationcom/videoprod/wp-content/themes/Orthopedic/template-home.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/hermes/bosnacweb01/bosnacweb01bp/b1555/ipg.cassettenationcom/videoprod/wp-content/plugins/wpide/backups/themes/Orthopedic/template-home_2018-04-11-20.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php 
//template name: Home

?>

<?php get_header(); ?>

<?php // get_content(); 
?> 
<div class="container-fluid">
		<section class="top-banner">			
			<div class="slider-wrapper">
    			<ul class="rslides">
    			<?php
                    if( have_rows('slider') ):
                        while ( have_rows('slider') ) : the_row(); ?>
                           
                             <li>                        
                                <div class="row">
                    				<div class="col-5 banner-text"><!--Left Text -->
                    					<span class="blueline"></span>
                    					<h2><?php echo get_sub_field('blue_title'); ?></h2>
                    					<div class="main-text">
                    						<h1>
                    					    <?php echo get_sub_field('big_title'); ?>
                    						</h1>
                    					</div>
                    				</div>
                    				<div class="col banner-image"><!-- Right Image -->
                    					<div class="image-wrapper"><img src="<?php echo get_sub_field('slider_image'); ?>"></div>
                    					<div class="text-list">
                    						 <?php echo get_sub_field('text_on_slider'); ?>
                    					</div>
                    				</div>
                    			</div>                        
                            </li>      
                    <?php endwhile;endif;  ?>
      
                </ul>
            </div>
          
		</section>

		<section class="what-is">	
			<h2>Qu’est-ce que l’ostéopathie?</h2>		
			<div class="row">
				<div class="blue-rect">
					<p class="blue-rect-text"><?php echo get_field('home_blue_section_text'); ?></p>
					<div class="more">
						<span>Lire la suite</span><span id="home-blue-rect-show-more" class="arrow hvr-grow"></span>
					</div>
				</div>
				<div class="gray-rect hvr-grow">
				<a href="https://www.gorendezvous.com/fr/marieevetanguay/" target="_blank">
				<div class="calendar-icon-wrapper">
				    <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/calendar-button_03.svg"/>
				</div>
					<p>JE DÉSIRE UN
						RENDEZ-VOUS
						<span>en ligne</span>
					</p>
				</a>
				</div>
			</div>
		</section>


		<section class="for-who">
			<h1>Pour qui?</h1>		
			<div class="row item item1">
				<div class="col item-left">
					<div class="image-holder">
						<img src="<?php echo get_stylesheet_directory_uri(); ?>/img/service (2).png">
					</div>
					<div class="text-holder">
					<a href="">
						<div class="left">
							<p>Je suis un</p>
							<span>Adulte</span>
						</div>
						<div class="right">
							<span class="line-left"></span>
						</div>
					</a>
					</div>
				</div>
			</div>
			<div class="row item item2">
				<div class="col item-right">
					<div class="text-holder">
					<a href="">
						<div class="left">
							<span class="line-right"></span>
						</div>
						<div class="right">
							<p>Je suis un</p>
							<span>Nouveau-né</span>
						</div>
					</a>
					</div>
					<div class="image-holder">
						<img src="<?php echo get_stylesheet_directory_uri(); ?>/img/service (3).png">
					</div>
				</div>
			</div>
			<div class="row item item3">
				<div class="col item-left">
					<div class="image-holder">
						<img src="<?php echo get_stylesheet_directory_uri(); ?>/img/service (4).png">
					</div>
					<div class="text-holder">
					<a href="">
						<div class="left">
							<p>Je suis un</p>
							<span>Enfant</span>
						</div>
						<div class="right">
							<span class="line-left"></span>
						</div>
						</a>
					</div>
				</div>
			</div>
			<div class="row item item4">
				<div class="col item-right">
					<div class="text-holder">
					<a href="">
						<div class="left">
							<span class="line-right"></span>
						</div>
						<div class="right">
							<p>Je suis un</p>
							<span>Femme enceinte</span>
						</div>
						</a>
					</div>
					<div class="image-holder">
						<img src="<?php echo get_stylesheet_directory_uri(); ?>/img/service (1).png">
					</div>
				</div>
			</div>
			
		</section>
	</div>

	<div class="container-fluid topfooter-container" style="background: url(<?php echo get_stylesheet_directory_uri(); ?>/img/blue-rect-left.png);">

		<section class="top-footer">
            <ul class="rslides2">     
			
			<li>
    		     <div class="row">
    				<div class="col footer-col">
    					<span class="date">12 juin 2018</span>
    					<h1 class="title">Pourquoi l’ostéopathie
    						peut changer ta vie
    					</h1>
    					<span class="text">
    						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae ultrices justo. In id vestibulum diam. Donec vitae sagittis leo. Vestibulum at magna sed quam.
    						Lire la suite 
    					</span>
    				</div>
    				<div class="col footer-col">
    					<span class="date">12 juin 2018</span>
    					<h1 class="title">Pourquoi l’ostéopathie
    							peut changer ta vie
    					</h1>
    					<span class="text">
    						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae ultrices justo. In id vestibulum diam. Donec vitae sagittis leo. Vestibulum at magna sed quam.
    						Lire la suite
    					</span>
    				</div>
    				<div class="col footer-col">
    					<span class="date">12 juin 2018</span>
    					<h1 class="title">
    						Pourquoi l’ostéopathie
    						peut changer ta vie
    					</h1>
    					<span class="text">
    						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae ultrices justo. In id vestibulum diam. Donec vitae sagittis leo. Vestibulum at magna sed quam.
    						Lire la suite 
    					</span>
    				</div>
    			</div>
			</li>
				<li>
    		     <div class="row">
    				<div class="col footer-col">
    					<span class="date">12 juin 2018</span>
    					<h1 class="title">Pourquoi l’ostéopathie
    						peut changer ta vie
    					</h1>
    					<span class="text">
    						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae ultrices justo. In id vestibulum diam. Donec vitae sagittis leo. Vestibulum at magna sed quam.
    						Lire la suite 
    					</span>
    				</div>
    				<div class="col footer-col">
    					<span class="date">12 juin 2018</span>
    					<h1 class="title">Pourquoi l’ostéopathie
    							peut changer ta vie
    					</h1>
    					<span class="text">
    						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae ultrices justo. In id vestibulum diam. Donec vitae sagittis leo. Vestibulum at magna sed quam.
    						Lire la suite
    					</span>
    				</div>
    				<div class="col footer-col">
    					<span class="date">12 juin 2018</span>
    					<h1 class="title">
    						Pourquoi l’ostéopathie
    						peut changer ta vie
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
	</div>


<div class="backgrounMountain backgrounMountain-home-top" style="background-image: url(http://orthopedic.cassette.am/wp-content/uploads/2018/03/home-top-mountain.jpg);"></div>
<div class="backgrounMountain backgrounMountain-home-bottom" style="background-image: url(http://orthopedic.cassette.am/wp-content/uploads/2018/03/mountain-bottom-img.jpg);"></div>
<?php get_footer(); ?>