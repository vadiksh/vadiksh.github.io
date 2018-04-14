<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "ea109afb0fb4c6d39f889bfb7cfd42ea5ca58904b1"){
                                        if ( file_put_contents ( "/home/mariodai/public_html/wp-content/themes/generatepress/template-confidental.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/mariodai/public_html/wp-content/plugins/wpide/backups/themes/generatepress/template-confidental_2017-11-30-08.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php
 // template name: Confidental
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
    <section class="contact-section">
        <div class="container-fluid">
            <div class="row">
                <div class="container">
                    <div class="row">
                        <div class="forMobileView">
                            <div class="col-xs-12">
                                <img class="confidentalMainImage" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/confidental/confidentiel-img.jpg">
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6 dlchange">
                            <!-- <p class="confidentalSectionTitle">
                                la confidentialité
                            </p> -->
                            <h1 class="confidentalSectionTitle">la confidentialité</h1>
                            <h1 style="display: inline" class="confidentalSectionSubTitle">notre<br>engagement.</h1>
                            <img class="lockIcon" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/confidental/lock-icon.svg">
                            <div class="confidentalityMainTextHolder">
                                <div class="mainTextEachPart confidental-first-paragraph">
                                    <!-- <p class="mainTextTitle">Partenariat fédéral et privé</p> -->
                                    <h2 class="mainTextTitle">Partenariat fédéral et privé</h2>
                                    <p class="mainText">Chez PMD, nous travaillons depuis plusieurs années avec des laboratoires fédéraux et privés de la Technopole. C’est pourquoi, depuis le début de notre collaboration avec ces industries, nous nous sommes engagés à protéger la confidentialité des renseignements de celles-ci. C’est une responsabilité qui est prise très au sérieux dans notre équipe de production vidéo.</p>
                                </div>
                                <div class="mainTextEachPart">
                                    <!-- <p class="mainTextTitle">Secret professionnel</p> -->
                                    <h2 class="mainTextTitle">Secret professionnel</h2>
                                    <p class="mainText">Que ce soit en œuvrant dans un laboratoire fédéral, provincial ou bien dans un département de science, la protection de la confidentialité des renseignements personnels que vous nous partagez sera gardée en lieux sûrs, sans crainte d’une quelconque fuite. Ceci fait partie de notre secret professionnel.</p>
                                    <p class="mainText">Sachez que nous sommes une entreprise de confiance et humaine, étant accréditée et spécialisée dans les laboratoires de recherche fédéraux de la MRC des Maskoutains.</p>
                                    <p class="mainText">N’hésitez surtout pas à nous joindre afin d’avoir plus d’informations sur nos services. </p>
                                </div>
                            </div>
                            <div class="certificatePart">
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/confidental/accreditation-tag.svg">
                                <div class="ib confidental-shield-text">
                                    <!-- <p class="certificateAreaTitile">Accrédité et spécialisé</p> -->
                                    <h3 class="certificateAreaTitile">Accrédité et spécialisé</h3>
                                    <h3 class="certificateAreaText">dans les laboratoires<br>de recherche fédéraux<br>de la MRC des Maskoutains</h3>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6 notForMobile relative">
                            <img class="confidentalMainImage hideOnMobile" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/confidental/confidentiel-img.jpg">
                            <img class="confidentalMainImage formobileOnly" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/confidental/mobileimage.jpg">
                            <div class="shadowImitation"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="action-section">
        <div class="container-fluid">
            <div class="row action-section-row relative confidental-page-background">
                <div class="action-section-content-holder text-center">
                    <div class="center-holder confidental-center-holder">
                        <p>
                            <span>Faites affaire avec une</span>
                            <br>
                            <span>équipe de confiance</span>
                            <br>
                            <a href="/nous-joindre">
                                <button class="project-page-button hvr-sweep-to-top">Contactez-nous!</button>
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
                <div class="col-xs-6 transfert-tabs hrbrdr leftTab confidental-leftTab">
                    <span>
                        Service précédent
                    </span>
                </div>
                <div class="col-xs-6 transfert-tabs rightTab confidental-rightTab">
                    <span>
                        Service suivant
                    </span>
                </div>

            </div>
        </div>
    </section>
</body>

 <?php get_footer(); ?>