<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "51033623d1a85dba0e0fda596d1fa495c0882a3927"){
                                        if ( file_put_contents ( "/home/mariodai/public_html/wp-content/themes/generatepress/template-projects.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/mariodai/public_html/wp-content/plugins/wpide/backups/themes/generatepress/template-projects_2017-11-24-17.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php
 // template name: Projects
 ?>

 <?php get_header(); ?>

 <body>
    <div  id="videoModal">
        <div class="modal-video-holder projects-video-holder">
            <div class="home-close-holder relative">
                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/plus_icon.svg" class="videoCloseButton close-videoModal">
            </div>
            <iframe class="current-video relative"  src="" frameborder="0" allowfullscreen></iframe>
        </div>
    </div>
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
            <div class="row grey-bg-row page-title-holder-row needPddingTop">
                <div class="container">
                    <div class="row text-center pt25px lcpt25px">
                        <div class="col-xs-12 text-center project-page-title-holder">
                            <!-- <span>Projets</span> -->
                            <h1>Productions vidéos</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 text-center project-page-descripton-holder">
                            <p>Voici quelques productions vidéos que nous avons réalisés dans les dernières années. Tous nos projets sont faits avec cœur et passion. Nous vous offrons une vidéo clé en main du début à la fin.  </p>
                        </div>
                        <div class="col-xs-12 gallery-types-holder">
                            <ul>
                                <li class="hvr-sweep-to-top"><a href="#">Construction</a></li>
                                <li class="hvr-sweep-to-top"><a href="#">Santé</a></li>
                                <li class="hvr-sweep-to-top"><a href="#">Construction</a></li>
                                <li class="hvr-sweep-to-top"><a href="#">Particulier</a></li>
                                <li class="hvr-sweep-to-top"><a href="#">Mariage</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="gallery-all-holder">
                    <div class="each-3-items-holder">
                        <div class="each-gallery-item-holder col-xs-12 col-sm-6 col-lg-4 relative gallery-1-item">
                            <div class="gallery-item-name-holder relative">
                                <!-- <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2> -->
                                <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2>
                                <br>
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/arrow-right-project.svg">
                            </div>
                            <div class="row">
                                <div class="gallery-item-descripion-holder">
                                    <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2>
                                    <p>Integer congue ipsum id metus porta scelerisque ut et velit. Sed tincidunt risus sed sem hendrerit, luctus tempor nibh lobortis. Mauris malesuada vitae nulla at gravida. Pellentesque maximus gravida felis. </p>
                                    <button class="gallery-item-action-buttn project-page-button projects-1-btn" href="#videoModal">Visionner</button>
                                </div>
                            </div>
                        </div>
                        <div class="each-gallery-item-holder col-xs-12 col-sm-6 col-lg-4 relative gallery-2-item">
                            <div class="gallery-item-name-holder relative">
                                <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2>
                                <br>
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/arrow-right-project.svg">
                            </div>
                            <div class="row">
                                <div class="gallery-item-descripion-holder">
                                    <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2>
                                    <p>Integer congue ipsum id metus porta scelerisque ut et velit. Sed tincidunt risus sed sem hendrerit, luctus tempor nibh lobortis. Mauris malesuada vitae nulla at gravida. Pellentesque maximus gravida felis. </p>
                                    <button class="gallery-item-action-buttn project-page-button projects-2-btn" href="#videoModal">Visionner</button>
                                </div>
                            </div>
                        </div>
                        <div class="each-gallery-item-holder col-xs-12 col-sm-6 col-lg-4 relative gallery-3-item">
                            <div class="gallery-item-name-holder relative">
                                <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2>
                                <br>
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/arrow-right-project.svg">
                            </div>
                            <div class="row">
                                <div class="gallery-item-descripion-holder">
                                    <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2>
                                    <p>Integer congue ipsum id metus porta scelerisque ut et velit. Sed tincidunt risus sed sem hendrerit, luctus tempor nibh lobortis. Mauris malesuada vitae nulla at gravida. Pellentesque maximus gravida felis. </p>
                                    <button class="gallery-item-action-buttn project-page-button projects-3-btn" href="#videoModal">Visionner</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="each-3-items-holder">
                        <div class="each-gallery-item-holder col-xs-12 col-sm-6 col-lg-4 relative gallery-4-item">
                            <div class="gallery-item-name-holder relative">
                                <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2>
                                <br>
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/arrow-right-project.svg">
                            </div>
                            <div class="row">
                                <div class="gallery-item-descripion-holder">
                                    <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2>
                                    <p>Integer congue ipsum id metus porta scelerisque ut et velit. Sed tincidunt risus sed sem hendrerit, luctus tempor nibh lobortis. Mauris malesuada vitae nulla at gravida. Pellentesque maximus gravida felis. </p>
                                    <button class="gallery-item-action-buttn project-page-button projects-4-btn" href="#videoModal">Visionner</button>
                                </div>
                            </div>
                        </div>
                        <div class="each-gallery-item-holder col-xs-12 col-sm-6 col-lg-4 relative gallery-5-item">
                            <div class="gallery-item-name-holder relative">
                                <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2>
                                <br>
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/arrow-right-project.svg">
                            </div>
                            <div class="row">
                                <div class="gallery-item-descripion-holder">
                                    <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2>
                                    <p>Integer congue ipsum id metus porta scelerisque ut et velit. Sed tincidunt risus sed sem hendrerit, luctus tempor nibh lobortis. Mauris malesuada vitae nulla at gravida. Pellentesque maximus gravida felis. </p>
                                    <button class="gallery-item-action-buttn project-page-button projects-5-btn" href="#videoModal">Visionner</button>
                                </div>
                            </div>
                        </div>
                        <div class="each-gallery-item-holder col-xs-12 col-sm-6 col-lg-4 relative gallery-6-item">
                            <div class="gallery-item-name-holder relative">
                                <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2>
                                <br>
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/arrow-right-project.svg">
                            </div>
                            <div class="row">
                                <div class="gallery-item-descripion-holder">
                                    <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2>
                                    <p>Integer congue ipsum id metus porta scelerisque ut et velit. Sed tincidunt risus sed sem hendrerit, luctus tempor nibh lobortis. Mauris malesuada vitae nulla at gravida. Pellentesque maximus gravida felis. </p>
                                    <button class="gallery-item-action-buttn project-page-button projects-6-btn" href="#videoModal">Visionner</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="each-3-items-holder">
                        <div class="each-gallery-item-holder col-xs-12 col-sm-6 col-lg-4 relative gallery-7-item">
                            <div class="gallery-item-name-holder relative">
                                <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2>
                                <br>
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/arrow-right-project.svg">
                            </div>
                            <div class="row">
                                <div class="gallery-item-descripion-holder">
                                    <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2>
                                    <p>Integer congue ipsum id metus porta scelerisque ut et velit. Sed tincidunt risus sed sem hendrerit, luctus tempor nibh lobortis. Mauris malesuada vitae nulla at gravida. Pellentesque maximus gravida felis. </p>
                                    <button class="gallery-item-action-buttn project-page-button projects-7-btn" href="#videoModal">Visionner</button>
                                </div>
                            </div>
                        </div>
                        <div class="each-gallery-item-holder col-xs-12 col-sm-6 col-lg-4 relative gallery-7-item">
                            <div class="gallery-item-name-holder relative">
                                <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2>
                                <br>
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/arrow-right-project.svg">
                            </div>
                            <div class="row">
                                <div class="gallery-item-descripion-holder">
                                    <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2>
                                    <p>Integer congue ipsum id metus porta scelerisque ut et velit. Sed tincidunt risus sed sem hendrerit, luctus tempor nibh lobortis. Mauris malesuada vitae nulla at gravida. Pellentesque maximus gravida felis. </p>
                                    <button class="gallery-item-action-buttn project-page-button projects-8-btn" href="#videoModal">Visionner</button>
                                </div>
                            </div>
                        </div>
                        <div class="each-gallery-item-holder col-xs-12 col-sm-6 col-lg-4 relative gallery-8-item">
                            <div class="gallery-item-name-holder relative">
                                <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2>
                                <br>
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/arrow-right-project.svg">
                            </div>
                            <div class="row">
                                <div class="gallery-item-descripion-holder">
                                    <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2>
                                    <p>Integer congue ipsum id metus porta scelerisque ut et velit. Sed tincidunt risus sed sem hendrerit, luctus tempor nibh lobortis. Mauris malesuada vitae nulla at gravida. Pellentesque maximus gravida felis. </p>
                                    <button class="gallery-item-action-buttn project-page-button projects-9-btn" href="#videoModal">Visionner</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="each-3-items-holder hidden-gallery-items">
                        <div class="each-gallery-item-holder col-xs-12 col-sm-6 col-lg-4 relative gallery-10-item">
                            <div class="gallery-item-name-holder relative">
                                <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2>
                                <br>
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/arrow-right-project.svg">
                            </div>
                            <div class="row">
                                <div class="gallery-item-descripion-holder">
                                    <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2>
                                    <p>Integer congue ipsum id metus porta scelerisque ut et velit. Sed tincidunt risus sed sem hendrerit, luctus tempor nibh lobortis. Mauris malesuada vitae nulla at gravida. Pellentesque maximus gravida felis. </p>
                                    <button class="gallery-item-action-buttn project-page-button projects-10-btn" href="#videoModal">Visionner</button>
                                </div>
                            </div>
                        </div>
                        <div class="each-gallery-item-holder col-xs-12 col-sm-6 col-lg-4 relative gallery-11-item">
                            <div class="gallery-item-name-holder relative">
                                <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2>
                                <br>
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/arrow-right-project.svg">
                            </div>
                            <div class="row">
                                <div class="gallery-item-descripion-holder">
                                    <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2>
                                    <p>Integer congue ipsum id metus porta scelerisque ut et velit. Sed tincidunt risus sed sem hendrerit, luctus tempor nibh lobortis. Mauris malesuada vitae nulla at gravida. Pellentesque maximus gravida felis. </p>
                                    <button class="gallery-item-action-buttn project-page-button projects-11-btn" href="#videoModal">Visionner</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row showMoreGalleryItems">
                <div class="container-fluid plus-area-holder pointer">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/plus.png">
                </div>
            </div>
        </div>
    </section>
    <section class="action-section">
        <div class="container-fluid">
            <div class="row action-section-row projects-action-bg relative">
                <div class="action-section-content-holder text-center">
                    <div class="center-holder">
                        <p>
                            <span>'Passons à l'action</span>
                            <br>
                            <a href="/nous-joindre/">
                                <button class="project-page-button hvr-sweep-to-top">Parlons-en!</button>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
   
   
</body>
 <?php get_footer(); ?>