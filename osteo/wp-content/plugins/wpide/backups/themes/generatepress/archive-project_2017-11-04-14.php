<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "51033623d1a85dba0e0fda596d1fa495d620909254"){
                                        if ( file_put_contents ( "/home/mariodai/public_html/wp-content/themes/generatepress/archive-project.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/mariodai/public_html/wp-content/plugins/wpide/backups/themes/generatepress/archive-project_2017-11-04-14.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php get_header(); ?>
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
                        <li><a href="/transfert-video">Transfert vidéo</a></li>
                        <li><a href="/confidental">Service de confidentialité</a></li>
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
    <section class="page-title-holder-section bodyHolder">
        <div class="container-fluid">
            <div class="row grey-bg-row page-title-holder-row needPddingTop">
                <div class="container">
                    <div class="row text-center pt25px lcpt25px">
                        <div class="col-xs-12 text-center project-page-title-holder">
                            <!-- <span>Projets</span> -->
                            <h1>Projets</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 text-center project-page-descripton-holder">
                            <p>Pellentesque laoreet sagittis tellus, at tempus neque laoreet ac. Proin at vehicula massa. Nunc nec urna sit amet risus condimentum interdum vel in lectus. Cras orci lorem, dignissim quis purus vitae, accumsan posuere libero. Aenean finibus mattis vehicula. </p>
                        </div>
                        <div class="col-xs-12 gallery-types-holder">
                            <ul>
                            <?php
                            if( have_rows('categories','option') ):
                                while ( have_rows('categories','option') ) : the_row();?>
                               <li class="hvr-sweep-to-top"><a class="category-selector"><?php the_sub_field('title'); ?></a></li>
                                <?php endwhile;
                            endif;
                            ?>

                            </ul>
                        </div>
                    </div>
                </div>
                <div class="gallery-all-holder">
                    <div class="each-3-items-holder">
                  <?php 
                  $i = 1;
                  if ( have_posts() ) : while ( have_posts() ) : the_post();
                  $counter++;
                   ?>
                        <div data-category="<?php echo get_field("category"); ?>" class="each-gallery-item-holder col-xs-12 col-sm-6 col-lg-4 relative gallery-1-item" style="background-image: url(<?php the_field('featured_image'); ?>")>
                            <div class="gallery-item-name-holder relative">
                                <!-- <h2 class="gallery-item-name">Subaru St-Hyacinthe</h2> -->
                                <h2 class="gallery-item-name"><?php the_title(); ?></h2>
                                <br>
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/arrow-right-project.svg">
                            </div>
                            <div class="row">
                                <div class="gallery-item-descripion-holder">
                                    <h2 class="gallery-item-name"><?php the_title(); ?></h2>
                                    <?php the_content(); ?>
                                    <button data-url="<?php echo get_field('video_url'); ?>" class="gallery-item-action-buttn project-page-button projects-1-btn" href="#videoModal">Visionner</button>
                                </div>
                            </div>
                        </div>
                        <?php if($i % 3 == 0) {?>
                          </div><div class="each-3-items-holder <?php if($i>7) { echo 'hidden-gallery-items' ; }?>">
                        <?php } 
                        $i++;
                        ?>
                      
                     <?php endwhile; endif; ?>
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
                            <span>RASSONS A LACTION</span>
                            <br>
                            <button class="project-page-button hvr-sweep-to-top">Parlons-en!</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</body>
<?php get_footer(); ?>