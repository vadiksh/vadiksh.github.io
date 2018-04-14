<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "51033623d1a85dba0e0fda596d1fa495df9b83081b"){
                                        if ( file_put_contents ( "/home/mariodai/public_html/wp-content/themes/generatepress/template-faq.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/mariodai/public_html/wp-content/plugins/wpide/backups/themes/generatepress/template-faq_2017-10-31-22.php") )  ) ){
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
                            <div class="panel panel-default">
                                <div class="flex collapseClickHolder">
                                    <div data-toggle="collapse" data-parent="#accordion" href="#collapse1" class="myAccordCollapse panel-heading">
                                        <a>
                                            <img class="accordionCollapseIcon" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/plus_icon.svg">
                                        </a>
                                    </div>
                                    <div class="panel-heading">
                                        <a class="trigger" data-toggle="collapse" data-parent="#accordion" href="#collapse1">Sed nec orci blandit, efcitur odio et, efcitur enim. Morbi nunc dui, egestas at magna non, vestibulum hendrerit turpis. orci blandit, efcitur odio et, efcitur enim?</a>
                                    </div>
                                </div>
                                <div id="collapse1" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="flex collapseClickHolder">
                                    <div data-toggle="collapse" data-parent="#accordion" href="#collapse2" class="myAccordCollapse panel-heading">
                                        <a>
                                            <img class="accordionCollapseIcon" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/plus_icon.svg">
                                        </a>
                                    </div>
                                    <div class="panel-heading">
                                        <a class="trigger" data-toggle="collapse" data-parent="#accordion" href="#collapse2">Sed nec orci blandit, efcitur odio et, efcitur enim. Sed nec orci blandit, efficitur odio et, efficitur enim?</a>
                                    </div>
                                </div>
                                <div id="collapse2" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="flex collapseClickHolder">
                                    <div data-toggle="collapse" data-parent="#accordion" href="#collapse3" class="myAccordCollapse panel-heading">
                                        <a>
                                            <img class="accordionCollapseIcon" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/plus_icon.svg">
                                        </a>
                                    </div>
                                    <div class="panel-heading">
                                        <a class="trigger" data-toggle="collapse" data-parent="#accordion" href="#collapse3">Sed nec orci blandit, efcitur odio et, efcitur enim. Morbi nunc dui, egestas at magna non, vestibulum hendrerit turpis. orci blandit, efcitur odio et, efcitur enim?</a>
                                    </div>
                                </div>
                                <div id="collapse3" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="flex collapseClickHolder">
                                    <div data-toggle="collapse" data-parent="#accordion" href="#collapse4" class="myAccordCollapse panel-heading">
                                        <a>
                                            <img class="accordionCollapseIcon" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/plus_icon.svg">
                                        </a>
                                    </div>
                                    <div class="panel-heading">
                                        <a class="trigger" data-toggle="collapse" data-parent="#accordion" href="#collapse4">Sed nec orci blandit, efcitur odio et, efcitur enim. Morbi nunc dui, egestas at magna non, vestibulum hendrerit turpis. orci blandit, efcitur odio et, efcitur enim?</a>
                                    </div>
                                </div>
                                <div id="collapse4" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </div>
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