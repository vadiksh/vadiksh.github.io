<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "51033623d1a85dba0e0fda596d1fa495df9b83081b"){
                                        if ( file_put_contents ( "/home/mariodai/public_html/wp-content/themes/generatepress/template-transfert-video.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/mariodai/public_html/wp-content/plugins/wpide/backups/themes/generatepress/template-transfert-video_2017-10-31-22.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php
 // template name: Transfert Video
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
                        <a href="index.html">
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
    <section class="page-title-holder-section transfert-page-title-holder-section bodyHolder mrgTop50px">
        <div class="container-fluid">
            <div class="row grey-bg-row page-title-holder-row transfert-page-title-holder-row needPddingTop">
                <div class="container">
                    <div class="row text-center pt25px lcpt25px">
                        <div class="col-xs-12 text-center project-page-title-holder transfertMarginTop">
                            <!-- <span>Transfert de vidéo</span> -->
                            <h1>Transfert de vidéo</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 text-center project-page-descripton-holder">
                            <p>Vous possédez de vieilles bobines 8mm ou 16mm, des cassettes VHS ou des mix sur cassette audio et vous désirez les revoir et réentendre? Confiez-nous ces souvenirs précieux, nous en ferons la numérisation et le transfert pour vous.
                               <br> <span>Des heures de plaisir à vous replonger dans vos souvenirs!</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row transfert-page-main-image-row">
                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/transfert/transfert-vdo-image.png">
            </div>
            <div class="row subtitle-holder-row">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 col-sm-6 each-transfert-content-holder left-table">
                            <div class="transfert-type-title-holder relative">
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/arrow-black_03.svg" class="pixeled-big-arrow">
                                <!-- <span>Transfert de cassette vidéo</span> -->
                                <h2>Transfert de cassette vidéo</h2>
                            </div>
                            <p class="transfert-type-description">
                                <span>Nous transférons tous types de cassettes : Cassette VHS, VHS-C, sVHS, Hi8, Digital 8, miniDV, MicroMV, BetaMax, Beta SP, Mini DVD. Correction des couleurs et contraste. Réparation de cassette.</span>
                            </p>
                        </div>
                        <div class="col-xs-12 col-sm-6 each-transfert-content-holder right-table">
                            <div class="transfert-type-title-holder relative">
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/arrow-black_03.svg" class="pixeled-big-arrow">
                                <h2>Transfert de bobines</h2>
                                <!-- <span>Transfert de bobines</span> -->
                            </div>
                            <p class="transfert-type-description">
                                <span>Numérisation de bobine. Formats acceptés : Film argentique sur bobine : 8 mm, Single 8 et Super 8. Dépoussiérage et recollage de film. Correction des couleurs et contraste.</span>
                            </p>
                        </div>
                        <div class="col-xs-12 text-center">
                            <div class="row">
                                <div class="col-xs-12 transfertOptionHolder">
                                    <span><i>Choix 1</i></span>
                                </div>
                                <div class="col-xs-12 transfertOptionName">
                                    <!-- <span>Transfert simple vers DVD</span> -->
                                    <h3>Transfert simple vers DVD</h3>
                                </div>
                            </div>
                            <div class="row p15pxlr">
                                <div class="col-xs-4 transfertOptionsList">
                                    <span>Cassette ou bobine de 2 heures*</span>
                                </div>
                                <div class="col-xs-4 transfertOptionsList">
                                    <span>Frais pour copie additionnelle sur DVD</span>
                                </div>
                                <div class="col-xs-4 transfertOptionsList last-transfert">
                                    <span>Réparation de cassette et bobine</span>
                                </div>
                                <div class="col-xs-12 detailedRow text-left">
                                    <p>*Un DVD peut contenir une durée maximale de 2 heures  /  Le prix discuté inclurera les frais de traitement et le transfert sur un DVD.</p>
                                </div>
                            </div>
                            <div class="row p15pxlr">
                                <div class="col-xs-12 transfertOptionHolder secondOptions">
                                    <span><i>Choix 2</i></span>
                                </div>
                                <div class="col-xs-12 transfertOptionName">
                                    <!-- <span>Transfert en fichier numérique (MP4, AVI, Quicktime...)</span> -->
                                    <h3>Transfert en fichier numérique (MP4, AVI, Quicktime...)</h3>
                                </div>
                            </div>
                            <div class="row p15pxlr">
                                <div class="col-xs-6 transfertOptionsList">
                                    <span>Frais de 50$ par tranche de 2 heures pour <br> transférer en fichier MP4, AVI, Quicktime...</span>
                                </div>
                                <div class="col-xs-6 transfertOptionsList">
                                    <span>Transfert possible sur DVD, Clé USB, <br> Disque dure ou autre support</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12 arrowHolderDiv">
                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/arrow-black_03.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="action-section">
        <div class="container-fluid">
            <div class="row action-section-row relative transfertBackground">
                <div class="action-section-content-holder text-center">
                    <div class="center-holder">
                        <p>
                            <span>Vous avez un projet</span>
                            <br>
                            <span>de transfert vidéo?</span>
                            <br>
                            <a href="/nous-joindre">
                                <button class="project-page-button hvr-sweep-to-top">Parlons-en!</button>
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
                <div class="col-xs-6 transfert-tabs hrbrdr leftTab trasnfert-leftTab">
                    <span>
                        Service précédent
                    </span>
                </div>
                <div class="col-xs-6 transfert-tabs rightTab transfert-rightTab">
                    <span>
                        Service suivant
                    </span>
                </div>

            </div>
        </div>
    </section>
</body>

 <?php get_footer(); ?>