<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "51033623d1a85dba0e0fda596d1fa495df9b83081b"){
                                        if ( file_put_contents ( "/home/mariodai/public_html/wp-content/themes/generatepress/template-home.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/mariodai/public_html/wp-content/plugins/wpide/backups/themes/generatepress/template-home_2017-10-31-22.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php
	/*template name: Home */
 ?>
 
<?php  get_header(); ?>

                
<body>
    <div class="overlay fullHeightMenuAllHolder modal-content" id="animatedModal">
        <div class="fullHeightMenuCloseButton relative close-animatedModal">
            <img src="assets/images/icons/plus_icon.svg">
        </div>
        <div class="fullMenuInnerHolder">
            <ul>
                <li class="openDropdownMenu"><a href="a-propos">À propos</a></li>
                <li class="relative dropDownMenuHolder"><a>Services</a></li>
                <li class="dropdownMenuParent ">
                    <ul class="dropDownMenu dropDownMenuHolder">
                        <li class="dividingLines"></li>
                        <li><a href="production-video">Production vidéo</a></li>
                        <li><a href="production-video#post-production">Post-production</a></li>
                        <li><a href="transfert-de-video">Transfert vidéo</a></li>
                        <li><a href="service-confidental">Service de confidentialité</a></li>
                        <li class="dividingLines"></li>
                    </ul>
                </li>
                <li><a href="projects">Projets</a></li>
                <li><a href="FAQ">F.A.Q</a></li>
                <li><a href="nous-joindre">Nous joindre</a></li>
            </ul>
        </div>
    </div>
    <div  id="videoModal">
        <!-- <div class="fullHeightMenuCloseButton relative close-animatedModal videoCloseButton home-page-modal-close-btn">
            <img src="assets/images/icons/plus_icon.svg">
        </div> -->
        <div class="modal-video-holder projects-video-holder">
            <div class="home-close-holder relative">
                <img src="assets/images/icons/plus_icon.svg" class="videoCloseButton close-videoModal">
            </div>
            <iframe class="current-video relative"  src="" frameborder="0" allowfullscreen></iframe>
        </div>
    </div>
    <div class="scroll-up-holder">
        <img src="assets/images/icons/top-button_03.svg">
    </div>
    <section class="fullheightSection relative">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12 logo-holder-div">
                    <div class="row flex homepageLogoHolder">
                        <a href="index.html">
                            <img src="assets/images/icons/main-logo.svg">
                        </a>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="row lozung-holder-row main-container">
                        <div class="each-lozung home-page-services-link">
                            <h1>
                                <a class="modalOpener" href="#animatedModal">Services</a>
                                <div class="homepage-link-animated-border"></div>
                            </h1>
                        </div>
                        <div class="each-lozung">
                            <h1>
                                <a href="projects">Projets</a>
                                <div class="homepage-link-animated-border"></div>
                            </h1>
                        </div>
                        <div class="each-lozung">
                            <h1>
                                <a href="/a-propos">À propos</a>
                                <div class="homepage-link-animated-border"></div>
                            </h1>
                        </div>
                        <div class="each-lozung">
                            <h1>
                                <a href="FAQ">F.A.Q.</a>
                                <div class="homepage-link-animated-border"></div>
                            </h1>
                        </div>
                        <div class="each-lozung">
                            <h1>
                                <a href="contact">Nous joindre</a>
                                <div class="homepage-link-animated-border"></div>
                            </h1>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="row social-row main-container">
                        <div class="all-social-networks-holder if">
                            <a href="https://www.facebook.com/productionsmariodaigle/" class="each-social-network-holder if hvr-sweep-to-top">Facebook</a>
                            <a href="#" class="each-social-network-holder if hvr-sweep-to-top">Google +</a>
                            <a href="https://www.linkedin.com/in/mario-daigle-780b7786/" class="each-social-network-holder if hvr-sweep-to-top">Linked in</a>
                            <a href="https://www.youtube.com/channel/UC3nsqlydoEiQJgU5gRFWJ5A/videos" class="each-social-network-holder if hvr-sweep-to-top">Youtube</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- <div style="width: 100%; height: 100vh;" data-vide-bg="http://ebve.ca/wp-content/uploads/2017/05/ebve-video.mp4" data-vide-options="loop: true, muted: true, position: 0% 0%" class="videoBG">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12 logo-holder-div">
                    <div class="row flex homepageLogoHolder">
                        <a href="index">
                            <img src="assets/images/icons/main-logo.svg">
                        </a>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="row lozung-holder-row main-container">
                        <div class="each-lozung"><h1><a class="modalOpener" href="#animatedModal">Services</a></h1></div>
                        <div class="each-lozung"><h1><a href="projects">Projets</a></h1></div>
                        <div class="each-lozung"><h1><a href="#">À propos</a></h1></div>
                        <div class="each-lozung"><h1><a href="#">Nous joindre</a></h1></div>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="row social-row main-container">
                        <div class="all-social-networks-holder if">
                            <a href="https://www.facebook.com/productionsmariodaigle/" class="each-social-network-holder if hvr-sweep-to-top">Facebook</a>
                            <a href="#" class="each-social-network-holder if hvr-sweep-to-top">Google +</a>
                            <a href="https://www.linkedin.com/in/mario-daigle-780b7786/" class="each-social-network-holder if hvr-sweep-to-top">Linked in</a>
                            <a href="https://www.youtube.com/channel/UC3nsqlydoEiQJgU5gRFWJ5A/videos" class="each-social-network-holder if hvr-sweep-to-top">Youtube</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
    <section class="dividing-section">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12">
                    <div class="row">
                        <div class="main-container sections-dividing-part text-center">
                            <h1>Entreprise de production vidéo St-Hyacinthe</h1>
                            <!-- Entreprise de production vidéo St-Hyacinthe -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="main-text-info-section">
        <div class="container-fluid">
            <div class="row main-text-info-row">
                <div class="container text-center">
                    <div class="row">
                        <div class="col-xs-12">
                            <p class="main-text-info-p">
                                <span class="operator-name">Productions Mario Daigle</span>
                                est une entreprise solidement établie depuis plus de
                                30 ans, s’étant fait connaître dans la MRC des Maskoutains pour la qualité de ses
                                services audiovisuels. Mario collabore avec une équipe aguerrie de spécialistes
                                en multimédia qui comptent plusieurs années d’expérience dans le domaine de
                                la production vidéo à St-Hyacinthe.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="services-section">
        <div class="container-fluid">
            <div class="row all-services-row">
                <div class="col-xs-12 col-sm-4">
                    <div class="row relative parent-div">
                        <div class="service-bottom-border"></div>
                        <div class="table each-service-content-holder video-production-service">
                            <span class="service-name text-center"><i><h2>PRODUCTION VIDÉO</h2></i></span>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-4">
                    <div class="row relative parent-div">
                        <div class="service-bottom-border"></div>
                        <div class="table each-service-content-holder post-production-service">
                            <span class="service-name text-center"><i><h2>POST-PRODUCTION</h2></i></span>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-4">
                    <div class="row relative parent-div">
                        <div class="service-bottom-border"></div>
                        <div class="table each-service-content-holder transfert-service">
                            <span class="service-name text-center"><i><h2>TRANSFERT VIDÉO</h2></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="partners-section">
        <div class="container-fluid">
            <div class="row partners-holdin-row">
                <a class="each-partner-holder-link" href="#videoModal">
                    <div class="col-xs-12 col-sm-6 each-partner-holder subaru-partner relative">
                        <div class="row">
                            <div class="partner-text-holder relative">
                                <span class="partner-name"><h3>Subaru St-Hyacinthe</h3></span>
                                <img src="assets/images/homepage/arrow-right-project.svg">
                            </div>
                        </div>
                        <div class="row">
                            <div class="info-holder">
                                <div class="partner-text-holder relative">
                                    <button class="gallery-item-action-buttn project-page-button projects-1-btn" href="#videoModal">Visionner</button>
                                    <span class="partner-name"><h3>Subaru St-Hyacinthe</h3></span>
                                    <p>Integer congue ipsum id metus porta scelerisque ut et velit. Sed tincidunt risus sed sem hendrerit, luctus tempor nibh lobortis. Mauris malesuada vitae nulla at gravida. Pellentesque maximus gravida felis. </p>
                                    <!-- <img src="assets/images/homepage/arrow-right-project.svg"> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
                <a class="each-partner-holder-link">
                    <div class="col-xs-12 col-sm-6 each-partner-holder auvents-partner">
                        <div class="row">
                            <div class="partner-text-holder relative">
                                <span class="partner-name"><h3>Subaru St-Hyacinthe</h3></span>
                                <img src="assets/images/homepage/arrow-right-project.svg">
                            </div>
                        </div>
                        <div class="row">
                            <div class="info-holder">
                                <div class="partner-text-holder relative">
                                    <button class="gallery-item-action-buttn project-page-button projects-1-btn" href="#videoModal">Visionner</button>
                                    <span class="partner-name"><h3>Subaru St-Hyacinthe</h3></span>
                                    <p>Integer congue ipsum id metus porta scelerisque ut et velit. Sed tincidunt risus sed sem hendrerit, luctus tempor nibh lobortis. Mauris malesuada vitae nulla at gravida. Pellentesque maximus gravida felis. </p>
                                    <!-- <img src="assets/images/homepage/arrow-right-project.svg"> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
                <a class="each-partner-holder-link">
                    <div class="col-xs-12 col-sm-6 each-partner-holder cidrerie-partner">
                        <div class="row">
                            <div class="partner-text-holder relative">
                                <span class="partner-name"><h3>Subaru St-Hyacinthe</h3></span>
                                <img src="assets/images/homepage/arrow-right-project.svg">
                            </div>
                        </div>
                        <div class="row">
                            <div class="info-holder">
                                <div class="partner-text-holder relative">
                                    <button class="gallery-item-action-buttn project-page-button projects-1-btn" href="#videoModal">Visionner</button>
                                    <span class="partner-name"><h3>Subaru St-Hyacinthe</h3></span>
                                    <p>Integer congue ipsum id metus porta scelerisque ut et velit. Sed tincidunt risus sed sem hendrerit, luctus tempor nibh lobortis. Mauris malesuada vitae nulla at gravida. Pellentesque maximus gravida felis. </p>
                                    <!-- <img src="assets/images/homepage/arrow-right-project.svg"> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
                <a class="each-partner-holder-link">
                    <div class="col-xs-12 col-sm-6 each-partner-holder autres-partner">
                        <div class="row">
                            <div class="partner-text-holder relative">
                                <span class="partner-name no-underline"><h3>Autres projets</h3></span>
                                <img src="assets/images/homepage/arrow-right-project.svg">
                            </div>

                        </div>
                        <div class="row">
                            <div class="info-holder">
                                <div class="partner-text-holder relative">
                                    <button class="gallery-item-action-buttn project-page-button projects-1-btn" href="#videoModal">Visionner</button>
                                    <span class="partner-name"><h3>Autres projets</h3></span>
                                    <p>Integer congue ipsum id metus porta scelerisque ut et velit. Sed tincidunt risus sed sem hendrerit, luctus tempor nibh lobortis. Mauris malesuada vitae nulla at gravida. Pellentesque maximus gravida felis. </p>
                                    <!-- <img src="assets/images/homepage/arrow-right-project.svg"> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </section>
    <section class="vous-avez-section">
        <div class="container-fluid">
            <div class="row text-center">
                <div class="table center-content-parent">
                    <div class="center-content-holder text-center">
                        <!-- <a href="index">
                            <img src="assets/images/icons/main-logo.svg">
                        </a> -->
                        <p class="homePageActionText">VOUS AVEZ UN PROJET?</p>
                        <a href="/nous-joindre">
                            <button class="hvr-sweep-to-top">Passons à l'action</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>           
<?php get_footer(); ?>