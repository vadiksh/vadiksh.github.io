<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "ea109afb0fb4c6d39f889bfb7cfd42ea5ca58904b1"){
                                        if ( file_put_contents ( "/home/mariodai/public_html/wp-content/themes/generatepress/template-about.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/mariodai/public_html/wp-content/plugins/wpide/backups/themes/generatepress/template-about_2017-11-30-08.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php
	// template name: About

 ?>

<?php get_header(); ?>
<body>
    <div class="overlay fullHeightMenuAllHolder modal-content" id="animatedModal">
        <div class="fullHeightMenuCloseButton relative close-animatedModal">
            <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/plus_icon.svg">
        </div>
        <div class="fullMenuInnerHolder">
            <ul>
                <li class="openDropdownMenu"><a href="/a-propos">À propos</a></li>
                <li class="dropDownMenuHolder relative"><a>Services</a></li>
                <li class="dropdownMenuParent">
                    <ul class="dropDownMenu">
                        <li class="dividingLines" ></li>
                        <li><a href="/production-video">Production vidéo</a></li>
                        <li><a href="/production-video#post-production">Post-production</a></li>
                        <li><a href="/transfert-de-video">Transfert vidéo</a></li>
                        <li><a href="/service-confidentiel">Service de confidentialité</a></li>
                        <li class="dividingLines"></li>
                    </ul>
                </li>
                <li><a href="/projects">Projets</a></li>
                <li><a href="/FAQ">F.A.Q</a></li>
                <li><a href="/nous-joindre">Nous joindre</a></li>
            </ul>
        </div>
    </div>
    <div class="scroll-up-holder">
        <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/top-button_03.svg">
    </div>
    <section class="projects-first-section">
        <div class="container-fluid">
            <div class="row top-navigation-row project-page-top-navigation-row TopNavHolder">
                <div class="logo-holder-div ib">
                    <div class="row flex">
                        <a href="/">
                            <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/main-logo.svg">
                        </a>
                        <div class="ib logo-name-holder">
                        </div>
                    </div>
                </div>
                <div class="ib top-navigation-social-row">
                    <ul id="menu">
                        <!-- <li class="collapseIconHolder"><a id="menuBtn" href="#animatedModal"><img src="assets/images/icons/menu.svg" class="menuCollapseButton"></a></li> -->
                        <li class="collapseIconHolder"><a id="menuBtn" href="#animatedModal"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/menu.svg" class="menuCollapseButton"></a></li>
                        <li class="seperator-verical-line">|</li>
                        <li class="top-menu-social-item"><a href="https://www.facebook.com/productionsmariodaigle/" class="each-social-holder"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/social/fb_icon.svg"></a></li>
                        <li class="top-menu-social-item"><a href="#" class="each-social-holder"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/social/google+_icon.svg"></a></li>
                        <li class="top-menu-social-item"><a href="https://www.linkedin.com/in/mario-daigle-780b7786/" class="each-social-holder"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/social/linkedin_icon.svg"></a></li>
                        <li class="top-menu-social-item"><a href="https://www.youtube.com/channel/UC3nsqlydoEiQJgU5gRFWJ5A/videos" class="each-social-holder"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/social/youtube_icon.svg"></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    <section class="contact-section firstSectionAboutPage">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12 col-sm-6"></div>
                <div class="col-xs-12 col-sm-6 contact-main-part-image-holder">
                    <div class="row not-mobile">
                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/about/image-about.jpg">
                    </div>
                </div>
                <div class="container">
                    <div class="row mobile">
                        <div class="col-xs-12 width100%l">
                            <div class="row mobile">
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/about/image-about.jpg" style="width: 100%">
                            </div>
                        </div>
                    </div>
                    <div class="row relative pushBottomRow mrg-btm-150px">
                        <div class="col-xs-12 col-sm-6 contact-page-main-text-holder about-contact-page-main-text-holder">
                            <div class="centerTextHolderDiv About-centerTextHolderDiv">
                                <h1>Une équipe aguerrie </h1> <br>
                                <h1>un résultat au-delà des attentes.</h1>
                            </div>
                            <div class="about-page-main-information-holder">
                                <h5>Productions Mario Daigle est l’entreprise de production vidéo par excellence à St-Hyacinthe, reconnue depuis plus de 35 ans pour ses concepts artistiques cohérents, sa maîtrise complète de la chaîne de production, ainsi que son savoir-faire dans le transfert de cassettes vidéo.</h5>
                                <h5>Au fil du temps, Mario Daigle a su s’entourer d’une équipe de spécialistes aguerris en multimédia ayant toujours pour objectif premier de définir vos besoins à travers une réflexion créative et avec le soucis de respecter les budgets alloués.</h5>
                                <h5>À chaque étape de votre projet, nous nous engageons à offrir le meilleur de nous-mêmes afin de vous remettre un projet au-delà de vos attentes, que ce soit pour votre vidéo promotionnelle, corporative ou événementielle.</h5>
                                <h5>Cette qualité sera reflétée tant au niveau de la qualité des images, des plans de cadrage, de la luminosité ainsi que des trames sonores proposées.</h5>
                                <h5>Faites-nous confiance et vous en retirerez une expérience passionnante et une valeur ajoutée pour votre entreprise.</h5>
                            </div>
                            <div class="about-page-buttons-holder mobile">
                                <div class="col-xs-4 about-action-button about-action-button-production-video hvr-sweep-to-top">
                                    <span>Production vidéo</span>
                                    <br>
                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/about-arrow.svg">
                                </div>
                                <div class="col-xs-4 about-action-button about-action-button-transfert-video hvr-sweep-to-top">
                                    <span>Transfert de vidéo</span>
                                    <br>
                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/about-arrow.svg">
                                </div>
                                <div class="col-xs-4 about-action-button about-action-button-confidental hvr-sweep-to-top">
                                    <span>Service de confidentialité</span>
                                    <br>
                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/about-arrow.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="about-page-buttons-holder not-mobile">
                        <div class="col-xs-4 about-action-button about-action-button-production-video hvr-sweep-to-top">
                            <span>Production vidéo</span>
                            <br>
                            <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/about-arrow.svg">
                        </div>
                        <div class="col-xs-4 about-action-button about-action-button-transfert-video hvr-sweep-to-top">
                            <span>Transfert de vidéo</span>
                            <br>
                            <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/about-arrow.svg">
                        </div>
                        <div class="col-xs-4 about-action-button about-action-button-confidental hvr-sweep-to-top">
                            <span>Service de confidentialité</span>
                            <br>
                            <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/about-arrow.svg">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="action-section">
        <div class="container-fluid">
            <div class="row action-section-row relative contact-page-background">
                <div class="action-section-content-holder text-center">
                    <div class="center-holder">
                        <p>
                            <span>C'est maintenant le temps</span>
                            <br>
                            <span>de nous faire confiance</span>
                            <br>
                            <a href="/nous-joindre">
                                <button class="project-page-button hvr-sweep-to-top">Contactez-nous</button>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</body>
<?php get_footer(); ?>