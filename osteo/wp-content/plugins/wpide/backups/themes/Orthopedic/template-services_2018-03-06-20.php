<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "a5c80f57cd5936729f178713154f414b1cca7f5a93"){
                                        if ( file_put_contents ( "/hermes/bosnacweb01/bosnacweb01bp/b1555/ipg.cassettenationcom/videoprod/wp-content/themes/Orthopedic/template-services.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/hermes/bosnacweb01/bosnacweb01bp/b1555/ipg.cassettenationcom/videoprod/wp-content/plugins/wpide/backups/themes/Orthopedic/template-services_2018-03-06-20.php") )  ) ){
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
			<div><img src="<?php echo get_stylesheet_directory_uri(); ?>/img/serviceImage.png"></div>
		</section>
		<section class="service-content">
			<div class="">
			<h2 class="page-title">Mes services</h2>
			<div class="service-title">	
				<span class="grayline"></span>		
				<h1 class="service-title-blue">Ostéopathie</h2>
				<h1 class="service-title">auprès des femmes enceintes</h2>
			</div>
			<div class="service-content-text">
				Bienfaits de l’ostéopathie durant la grossesse
				L’ostéopathe peut, en manipulant les structures du corps, aider la femme enceinte durant sa grossesse en diminuant les troubles gastriques, les nausées, les maux de dos, les contractions prématurées et peut vraiment être utile pour les troubles du sommeil et la préparation du plancher pelvien en vue de l’accouchement. La douleur au nerf sciatique de la femme enceinte est souvent résolue grâce à l’ostéopathie ou bien l’acupuncture. L’ostéopathie spécialisée pour femme enceinte peut même aider un bébé à se tourner dans l’utérus lors des situations de présentation du siège en premier.

				Chaque intervenant en ostéopathie s’ajuste à la personne en face de lui. C’est une pratique adaptative compte tenu que chaque personne est unique et que les symptômes ressentis ne sont pas nécessairement au lieu de l’atteinte.

				Au départ, un examen de la tête aux pieds est nécessaire pour sentir les zones fragilisées qui touchent l’anatomie et le fonctionnement des structures. L’ostéopathe viendra ensuite les libérer, ce qui aidera grandement les ressentis malaisants du départ. On appelle ce phénomène les douleurs référencées. La douleur que la personne exprime à un endroit précis n’est pas directement le site problématique à la base. Puisqu’il peut y avoir une mobilité restreinte à quelque part, cette situation peut se répercuter ailleurs dans le corps, sur une autre structure. C’est pourquoi, il faut voir la personne dans son ensemble, dans sa globalité pour l’aider.

				Lorem ipsum dolor amit
				Je sais que ce n’est pas habituel d’entendre une infirmière ou un médecin parler des méthodes alternatives comme celle-là durant les cours prénataux ou en clinique mais j’ai vu tellement de bons résultats avec les années que je vous transmets en toute sécurité les informations sur le sujet. Même en postnatal, les nouvelles mamans auraient avantage à avoir un bon traitement en ostéopathie après l’accouchement, pour déloger le site de l’épidurale s’il y a lieu, replacer le coccyx et le bassin et pour soulager plusieurs inconforts chez les nouvelles accouchées. C’est un beau cadeau à recevoir pour vous les mamans.

			</div>

		</section>
		<section class="service-social">
			<i class="facebook-icon fab fa-facebook-f"></i><br>
			<i class="fab fa-twitter"></i><br>
			<i class="fas fa-paperclip"></i><br>
			<i class="fas fa-envelope"></i><br>
			<span class="text">
				PARTAGER
			</span>
		</section>
	</div>

	<div class="container-fluid">
		<section class="service-contacts">
			<div class="button-holder"><!-- Button -->
				<button type="button" class="btn btn-primary">
					<div class="first">J’aimerais prendre un</div>
					<div class="second">RENDEZ-VOUS EN LIGNE</div>
				</button>
			</div>
			<div class="text-right contacts-holder"><!-- Phone -->
				<span class="normal">ou appelez-moi/SMS au</span><span class="blue">450 341-2555</span>
			</div>
		</section>
	</div>

	<div class="container-fluid service-topfooter">

		<section class="top-footer">
			<h1 class="top-footer-title">Prenez le temps de lire mes articles sur les femmes enceintes. </h1>
			<div class="arrow-left-holder">
				<span class="arrow-left"></span>
			</div>

			<div class="row list">
				<div class="col">
					<h1 class="title">Lorem ipsum dolor
							femme enceinte
					</h1>
					<span class="text">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae ultrices justo. In id vestibulum diam. Donec vitae sagittis leo. Vestibulum at magna sed quam.
						Lire la suite 
					</span>
				</div>
				<div class="col">
					<h1 class="title">Lorem ipsum dolor
							femme enceinte
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

	<div class="container-fluid service-footertabs">
		<section class="footer-tabs">
			<div class="list">
				<div class="tab">
					<span>Je suis un adulte</span>
				</div>
				<div class="tab active">
					<span>Je suis une femme enceinte</span>
				</div>
				<div class="tab">
					<span>Je suis un nouveau-né</span>
				</div>
				<div class="tab">
					<span>Je suis un enfant</span>
				</div>
			</div>
		</section>
	</div>
	
	<div class="backgrounMountain" style="background-image: url(<?php echo get_stylesheet_directory_uri(); ?>/img/contact-mountain.png);"></div>



<?php get_footer(); ?>