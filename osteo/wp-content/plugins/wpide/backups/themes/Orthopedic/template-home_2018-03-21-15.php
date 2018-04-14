<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "a5c80f57cd5936729f178713154f414b5ca45ac063"){
                                        if ( file_put_contents ( "/hermes/bosnacweb01/bosnacweb01bp/b1555/ipg.cassettenationcom/videoprod/wp-content/themes/Orthopedic/template-home.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/hermes/bosnacweb01/bosnacweb01bp/b1555/ipg.cassettenationcom/videoprod/wp-content/plugins/wpide/backups/themes/Orthopedic/template-home_2018-03-21-15.php") )  ) ){
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
                    <li>
                        <div class="row">
                            <div class="col banner-image"><!-- Right Image -->
                                <div class="image-wrapper">	
                                    <img src="http://orthopedic.cassette.am/wp-content/uploads/2018/03/atle-mo-209964.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </li>
                   <li>
                        <div class="row">
                            <div class="col banner-image"><!-- Right Image -->
                                <div class="image-wrapper">	
                                    <img src="http://orthopedic.cassette.am/wp-content/uploads/2018/03/alexey-okhrimenko-221374.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </li>
                     <li>
                        <div class="row">
                            <div class="col banner-image"><!-- Right Image -->
                                <div class="image-wrapper">	
                                    <img src="http://orthopedic.cassette.am/wp-content/uploads/2018/03/atle-mo-209964.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
           
		</section>

		<section class="what-is">	
			<h1>Qu’est-ce que l’ostéopathie?</h1>		
			<div class="row">
				<div class="blue-rect"   style="background: url(<?php echo get_stylesheet_directory_uri(); ?>/img/blue-rect.png)">
					<p class="blue-rect-text">L’ostéopathie est une approche manuelle qui vise à rétablir la fonctionnalité de toutes les structures et systèmes du corps humain afin de favoriser sa capacité d’autorégulation.
Cette approche est basée sur des connaissances approfondies des sciences de la santé et des interactions propres à l’équilibre de l’organisme (homéostasie).

Grâce à sa palpation fine et précise, l’ostéopathe effectue une évaluation globale de la personne afin de trouver la cause de ses dysfonctions neuro-musculo-squelettiques, viscérales et crâniennes.

Dans sa pratique clinique, l’ostéopathe utilise des techniques précises d’ajustement manuel afin de redonner une mobilité optimale aux os, aux muscles, aux fascias, aux nerfs et aux organes. Cette mobilité aidera à rétablir l’équilibre de l’organisme et soulagera ainsi les symptômes du patient.

En tout temps, lorsque la condition du patient le requiert, l’ostéopathe n’hésitera pas à le référer à un autre professionnel de la santé.</p>
					<div class="more">
						<span>Lire la suite</span><span id="home-blue-rect-show-more" class="arrow"></span>
					</div>
				</div>
				<div class="gray-rect">
					<p>JE DÉSIRE UN
						RENDEZ-VOUS
						<span>en ligne</span>
					</p>
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
						<div class="left">
							<p>Je suis un</p>
							<span>Adulte</span>
						</div>
						<div class="right">
							<span class="line-left"></span>
						</div>
					</div>
				</div>
			</div>
			<div class="row item item2">
				<div class="col item-right">
					<div class="text-holder">
						<div class="left">
							<span class="line-right"></span>
						</div>
						<div class="right">
							<p>Je suis un</p>
							<span>Nouveau-né</span>
						</div>
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
						<div class="left">
							<p>Je suis un</p>
							<span>Enfant</span>
						</div>
						<div class="right">
							<span class="line-left"></span>
						</div>
					</div>
				</div>
			</div>
			<div class="row item item4">
				<div class="col item-right">
					<div class="text-holder">
						<div class="left">
							<span class="line-right"></span>
						</div>
						<div class="right">
							<p>Je suis un</p>
							<span>Femme enceinte</span>
						</div>
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
			<div class="arrow-left-holder">
				<span class="arrow-left"></span>
			</div>

			<div class="row">
				<div class="col">
					<span class="date">12 juin 2018</span>
					<h1 class="title">Pourquoi l’ostéopathie
						peut changer ta vie
					</h1>
					<span class="text">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae ultrices justo. In id vestibulum diam. Donec vitae sagittis leo. Vestibulum at magna sed quam.
						Lire la suite 
					</span>
				</div>
				<div class="col">
					<span class="date">12 juin 2018</span>
					<h1 class="title">Pourquoi l’ostéopathie
							peut changer ta vie
					</h1>
					<span class="text">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae ultrices justo. In id vestibulum diam. Donec vitae sagittis leo. Vestibulum at magna sed quam.
						Lire la suite
					</span>
				</div>
				<div class="col">
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

			<div class="arrow-right-holder">				
				<span class="arrow-right"></span>
			</div>
		</section>

	</div>
	</div>



<?php get_footer(); ?>