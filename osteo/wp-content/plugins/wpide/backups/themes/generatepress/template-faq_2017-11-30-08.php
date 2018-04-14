<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "ea109afb0fb4c6d39f889bfb7cfd42ea5ca58904b1"){
                                        if ( file_put_contents ( "/home/mariodai/public_html/wp-content/themes/generatepress/template-faq.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/mariodai/public_html/wp-content/plugins/wpide/backups/themes/generatepress/template-faq_2017-11-30-08.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php
//template name: FAQ
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
                    <div class="row flexasse">
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
            <div class="row grey-bg-row page-title-holder-row">
                <div class="container">
                    <div class="row text-center pt25px lcpt25px">
                        <div  class="col-xs-12 text-center project-page-title-holder">
                            <span>FAQ</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="panel-group" id="accordion">
                        <?php $i=0;
                        if( have_rows('faq') ):
                            while ( have_rows('faq') ) : the_row();
                            $i++;
                           ?>
                            <div class="panel panel-default">
                                <div class="flex collapseClickHolder">
                                    <div data-toggle="collapse" data-parent="#accordion" href="#collapse<?php echo $i; ?>" class="myAccordCollapse panel-heading">
                                        <a>
                                            <img class="accordionCollapseIcon" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/plus_icon.svg">
                                        </a>
                                    </div>
                                    <div class="panel-heading">
                                        <a class="trigger" data-toggle="collapse" data-parent="#accordion" href="#collapse1"><?php the_sub_field('short_text'); ?></a>
                                    </div>
                                </div>
                                <div id="collapse<?php echo $i; ?>" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        <?php the_sub_field('long_text'); ?>
                                    </div>
                                </div>
                            </div> 
                            <?php  endwhile;
                        endif;
                        ?>          
                          </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="action-section">
        <div class="container-fluid">
            <div class="row action-section-row faq-action-section relative">
                <div class="action-section-content-holder text-center">
                    <div class="center-holder">
                        <p>
                            <span>Avez-vous d'autres questions?</span>
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