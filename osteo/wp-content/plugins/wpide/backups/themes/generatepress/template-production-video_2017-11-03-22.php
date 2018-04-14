<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "51033623d1a85dba0e0fda596d1fa49569242ab28b"){
                                        if ( file_put_contents ( "/home/mariodai/public_html/wp-content/themes/generatepress/template-production-video.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/mariodai/public_html/wp-content/plugins/wpide/backups/themes/generatepress/template-production-video_2017-11-03-22.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php
 // template name: Production Video
 ?>

 <?php get_header(); ?>

<body>
    <div class="overlay fullHeightMenuAllHolder modal-content" id="animatedModal">
        <div class="fullHeightMenuCloseButton relative close-animatedModal">
            <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/plus_icon.svg">
        </div>
        <div class="fullMenuInnerHolder">
            <ul>
                <li class="openDropdownMenu"><a href="a-propos">À propos</a></li>
                <li class="dropDownMenuHolder relative"><a>Services</a></li>
                <li class="dropdownMenuParent">
                    <ul class="dropDownMenu">
                        <li class="dividingLines" ></li>
                        <li><a href="production-video">Production vidéo</a></li>
                        <li><a href="production-video#post-production">Post-production</a></li>
                        <li><a href="transfert-de-video">Transfert vidéo</a></li>
                        <li><a href="servicee-confidental">Service de confidentialité</a></li>
                        <li class="dividingLines"></li>
                    </ul>
                </li>
                <li><a href="projects">Projets</a></li>
                <li><a href="FAQ">F.A.Q</a></li>
                <li><a href="nous-joindre">Nous joindre</a></li>
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
    <section class="page-title-holder-section bodyHolder">
        <div class="container-fluid">
            <div class="row grey-bg-row page-title-holder-row needPddingTop ppdtop25px">
                <div class="container">
                    <div class="row text-center pt25px" id="mobLPdng">
                        <div class="col-xs-12 text-center project-page-title-holder">
                            <!-- <span>Production vidéo</span> -->
                            <h1>Production vidéo</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 text-center project-page-descripton-holder dmtop-30px">
                            <p>Comment permettre à votre entreprise de vous démarquer et d’ajouter à celle-ci une valeur ajoutée? La vidéo connaît un boom sans précédent sur internet et est l’une des façons les plus efficaces afin d’atteindre le client. Il est à noter que 58% des consommateurs croient qu’une entreprise utilisant des vidéos pour promouvoir ses produits/services est plus fiable. Ne croyez-vous pas alors qu’il est temps de repenser à votre stratégie?
                            </p>
                        </div>
                        <div class="col-xs-12 each-production-holder big-right-production-holder">
                            <div class="col-xs-12 col-sm-5">
                                <div class="row">
                                    <div class="col-xs-12 relative production-optionText">
                                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/arrow-black_03.svg" class="production-big-arrow">
                                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/white-arrow-bullet.svg" class="production-right-arrow">
                                        <h2 class="production-title">Vidéo promotionnelle</h2>
                                        <span class="production-details">La vidéo promotionnelle est le levier par excellence afin de mettre de l’avant vos produits et services. Chez nous, natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur posuere laoreet dictum. Aliquam semper iaculis augue et vulputate.</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-7 relative production-image-holder">
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/production-video/video-promo.jpg" class="production-one-of-images">
                                <div class="shadowImitation production-shadow"></div>
                            </div>
                        </div>
                        <div class="col-xs-12 each-production-holder big-right-production-holder">
                            <div class="col-xs-12 col-sm-7 relative production-image-holder nfmb">
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/production-video/video-corporate.jpg" class="production-one-of-images">
                                <div class="shadowImitation production-shadow"></div>
                            </div>
                            <div class="col-xs-12 col-sm-5">
                                <div class="row">
                                    <div class="col-xs-12 relative production-optionText">
                                        <!-- <img src="assets/images/icons/arrow-black_03.svg" class="production-big-arrow"> -->
                                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/white-arrow-bullet.svg" class="production-right-arrow">
                                        <!-- <p class="production-title">
                                            Vidéo corporative
                                        </p> -->
                                        <h2 class="production-title">Vidéo corporative</h2>
                                        <span class="production-details">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut maximus nulla erat, accumsan sodales enim dapibus eu. Nullam pretium tellus orci, a consequat nunc facilisis sed. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur posuere laoreet dictum. Aliquam semper iaculis augue et vulputate.</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-7 relative production-image-holder nfbs">
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/production-video/video-corporate.jpg" class="production-one-of-images">
                                <div class="shadowImitation production-shadow"></div>
                            </div>
                        </div>
                        <div class="col-xs-12 each-production-holder big-right-production-holder pushDown pdwnDan">
                            <div class="col-xs-12 col-sm-5">
                                <div class="row">
                                    <div class="col-xs-12 relative production-optionText">
                                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/arrow-black_03.svg" class="production-big-arrow" >
                                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/white-arrow-bullet.svg" class="production-right-arrow">
                                        <!-- <p class="production-title">
                                            Vidéo événementielle
                                        </p> -->
                                        <h2 class="production-title">Vidéo événementielle</h2>
                                        <span class="production-details">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut maximus nulla erat, accumsan sodales enim dapibus eu. Nullam pretium tellus orci, a consequat nunc facilisis sed. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur posuere laoreet dictum. Aliquam semper iaculis augue et vulputate.</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-7 relative production-image-holder">
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/production-video/wedding-video.jpg" class="production-one-of-images">
                                <div class="shadowImitation production-shadow"></div>
                            </div>
                        </div>
                        <div class="col-xs-12 text-center" id="post-production" style="padding-top: 200px; margin-top: -200px;" >
                            <div class="col-xs-12 text-center project-page-title-holder gtc">
                                <!-- <span>Post-production</span> -->
                                <h3 class="production3h">Post-production</h3>
                            </div>
                        </div>
                        <div class="col-xs-12 text-center project-page-descripton-holder dmtop-30px">
                            <p>Chez PMD, nous offrons à la suite du tournage de votre vidéo (préproduction, captation visuelle et sonore, scénarisation, direction visuelle et artistique) la dernière étape de production qui mène à l’aboutissement du projet final, soit la post-production qui est des plus importante et qui implique un ensemble de technique et d’éléments comme le montage des images captées, le bruitage, la post-synchronisation, le montage de son, le doublage, le mixage et les effets spéciaux si votre projet en comporte. Tout ceci afin d’offrir un résultat au-dessus de vos attentes!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="action-section production-action-section">
        <div class="container-fluid">
            <div class="row action-section-row relative">
                <div class="action-section-content-holder text-center">
                    <div class="center-holder">
                        <p>
                            <span>Quel type de production vidéo </span>
                            <br>
                            <span>avez-vous besoin?</span>
                            <a href="/nous-joindre">
                                <button class="project-page-button hvr-sweep-to-top">CDiscutons-en!</button>    
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="transfert-page-horisonal-dividing-part">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-6 transfert-tabs hrbrdr leftTab production-leftTab">
                    <span">
                        Service précédent
                    </span>
                </div>
                <div class="col-xs-6 transfert-tabs rightTab production-rightTab">
                    <span>
                        Service suivant
                    </span>
                </div>

            </div>
        </div>
    </section>
</body>

 <?php get_footer(); ?>