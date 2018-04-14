<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "51033623d1a85dba0e0fda596d1fa495df9b83081b"){
                                        if ( file_put_contents ( "/home/mariodai/public_html/wp-content/themes/generatepress/template-contact.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/mariodai/public_html/wp-content/plugins/wpide/backups/themes/generatepress/template-contact_2017-10-31-16.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php 
/*template name: Contact Us*/


?>

<?php get_header(); ?>

<body>
    <div class="overlay fullHeightMenuAllHolder modal-content" id="animatedModal">
        <div class="fullHeightMenuCloseButton relative close-animatedModal">
            <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/plus_icon.svg">
        </div>
        <div class="fullMenuInnerHolder">
            <ul>
                <li class="openDropdownMenu"><a href="about">À propos</a></li>
                <li class="dropDownMenuHolder relative"><a>Services</a></li>
                <li class="dropdownMenuParent">
                    <ul class="dropDownMenu">
                        <li class="dividingLines" ></li>
                        <li><a href="production-video">Production vidéo</a></li>
                        <li><a href="production-video#post-production">Post-production</a></li>
                        <li><a href="transfert-video">Transfert vidéo</a></li>
                        <li><a href="confidental">Service de confidentialité</a></li>
                        <li class="dividingLines"></li>
                    </ul>
                </li>
                <li><a href="projects">Projets</a></li>
                <li><a href="FAQ">F.A.Q</a></li>
                <li><a href="contact">Nous joindre</a></li>
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
    <section class="contact-section">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12 col-sm-6"></div>
                <div class="col-xs-12 col-sm-6 contact-main-part-image-holder">
                    <div class="row">
                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/contact/13.jpg">
                    </div>
                </div>
                <div class="container">
                    <div class="row relative pushBottomRow">
                        <div class="col-xs-12 col-sm-6 contact-page-main-text-holder">
                            <div class="centerTextHolderDiv lct-56px tptop60px">
                                <p>Notre équipe a pour objectif de locatisum lorem vos besoins</p>
                            </div>
                            <div class="row contact-row">
                                <div class="col-xs-3 each-contact-type-holder">
                                    <p class="contact-type-name">Téléphone</p>
                                    <p class="contact-type-info">450 501-1177</p>
                                </div>
                                <div class="col-xs-5 each-contact-type-holder">
                                    <p class="contact-type-name">Courriel</p>
                                    <p class="contact-type-info">info@mariodaigle.com</p>
                                </div>
                                <div class="col-xs-4 each-contact-type-holder">
                                    <p class="contact-type-name">Lieux</p>
                                    <p class="contact-type-info">St-Hyacinthe</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="form-section">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 form-name-holder mrminonMOB">
                    C’est l’heure des questions
                </div>
            </div>
            <div class="row main-form-holder relative">
                <div class="col-xs-12 col-sm-6 form-item-holder">
                    <p class="form-item-name">
                        Prénom
                    </p>
                    <input id="name" type="text" name="">
                </div>
                <div class="col-xs-12 col-sm-6 form-item-holder">
                    <p class="form-item-name">
                        Nom
                    </p>
                    <input id="secondname" type="text" name="">
                </div>
                <div class="col-xs-12 col-sm-6 form-item-holder">
                    <p class="form-item-name">
                        Courriel
                    </p>
                    <input id="email" type="text" name="">
                </div>
                <div class="col-xs-12 col-sm-6 form-item-holder">
                    <p class="form-item-name">
                        Téléphone
                    </p>
                    <input id="phone" type="text" name="">
                </div>
                <div class="col-xs-12 form-item-holder client-message-holder">
                    <p class="form-item-name">
                        Questions / Commentaires
                    </p>
                    <textarea id="message" ></textarea>
                </div>
                <div class="action-part">
                    <span id ="katun-contact-form">Envoyer</span>
                    <img src="assets/images/icons/arrow-black_03.svg">
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
                            <span>Avez-vous des cassettes VHS,</span>
                            <br>
                            <span>Bobines ou autre?</span>
                            <br>
                            <a href="/transfert-video">
                                <button class="project-page-button hvr-sweep-to-top">Transférons-les</button>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section class="last-section">
        <div class="container-fluid">
            <div class="row last-section-first-row">
                <div class="col-xs-12">
                    <div class="row danick-row">
                        <a href="http://www.danicklabrie.com">
                            <span>/ Conception web</span>
                            <img src="assets/images/icons/danick_logo_gold.svg">
                        </a>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="row copyright-row">
                        <div class="col-xs-12">
                            <ul>
                                <li>Copyright 2008-2017</li>
                                <span>|</span>
                                <li><a href="mailto:info@mariodaigle.com"></a>info@mariodaigle.com</li>
                                <span>|</span>
                                <li class="tel"><a href="tel:450 501-1177"></a>450 501-1177</li>
                            </ul>
                        </div>

                        <span>Entreprise de production vidéo St-Hyacinthe et de transfert de vidéo</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</body>

<?php get_footer(); ?>

<script type="text/javascript">
	

</script>
