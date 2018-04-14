<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "5f1b740db7d13198fa0080628ebec6375e56e2f742"){
                                        if ( file_put_contents ( "/home/routeart/public_html/wp-content/themes/generatepress/template-home.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/routeart/public_html/wp-content/plugins/wpide/backups/themes/generatepress/template-home_2017-06-15-16.php") )  ) ){
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

                <div id="homepage">
                    <div class="wrapper">
                        <div id="homepage_decouvrez" class="clear_both">
                            <ul class="clear_both">
							<?php
								if( have_rows('home_categories') ):
									while ( have_rows('home_categories') ) : the_row(); ?>
									
										<li class="line">
										    <div class="homepage_decouvrez_image">
    											<a href="<?php echo get_sub_field('home_categories_page_url'); ?>">
    												<img src="<?php echo get_sub_field('home_categories_image'); ?>" /> 
    												<div class="title"><?php echo get_sub_field('home_categories_title'); ?></div>
    											</a>
											</div>
										</li> 
									
									<?php endwhile;
								endif;
							?>
                                
                            </ul>
                            <div id="homepage_decouvrez_title">
                               <img src="http://www.routeartssaveursrichelieu.com/wp-content/uploads/2017/04/words-animation-1-1.gif"/>
                            </div>
                        </div>
                            <h1 clas="home-page-main-new-title">La Route des Arst et Saveurs du Richelieu</h1>
                            <h4 id="homepage_experience_title"><?php echo get_field('experience_title'); ?></h4>
                        <div id="homepage_experience" class="clear_both">
                            <div id="homepage_experience_desc" class="clear_both">
                                <div class="spacer"></div>
                                <div id="homepage_experience_journey">
								<?php echo get_field('experience_secondary_text'); ?>
								   <!-- <div><div class="first">JOURNÉES PORTES OUVERTES</div>
                                    <div class="second"><div>3, 4, 10 <span>&</span> 11 JUIN <span>2017</span></div>
                                    2, 3, 4, 9 <span>&</span> 10 SEPTEMBRE <span>2017</span></div><div class="third">De 10h à 18h</div></div>
                                    								    Nombreux participants aussi ouverts durant tout l’été et même à l’année! Consultez les 
                                    moments d’ouverture de chacun. -->
                                </div>
                               <div class="homepage-main-text" > <?php  echo get_field('experience_main_text'); ?> </div>
                               <?php if(get_field('experience_button_url')) : ?><a href="<?php echo get_field('experience_button_url') ?>"><div id="homepage_experience_savoir"><?php echo get_field('experience_button_text'); ?></div> </a> <?php endif; ?>
                            </div>
                        </div>
                    </div>
                    <div id="homepage_decouvrez_nos">
                        <div class="wrapper">
                            <div id="homepage_decouvrez_nos_image">
                                <img src="<?php echo get_field('ateliers_&_activites_image'); ?>" />
                            </div>
							<a class="fixunderline" href="http://www.routeartssaveursrichelieu.com/ateliers-activites/">
                            <div id="homepage_decouvrez_nos_text" class="line">
							
                                <span>Découvrez nos</span>
                                ateliers & activités

                            </div>
								</a>
                            <ul id="homepage_parcours_images" class="clear_both">
                                <a class="fixunderline" href="<?php echo get_field('du_richelieu_url_1'); ?>"><li><img src="<?php echo get_field('du_richelieu_image_1'); ?>"></li> </a>
                                <a class="fixunderline" href="<?php echo get_field('du_richelieu_url_2'); ?>"><li><img src="<?php echo get_field('du_richelieu_image_2'); ?>"></li> </a>
                            </ul>
                        </div>
                    </div>
                    <div id="homepage_map">
                        <div class="wrapper">
                            <img src="<?php echo get_field('map_image'); ?>" />
                            <a  class="fixunderline" href="http://www.routeartssaveursrichelieu.com/carte/">
							<div id="homepage_map_text" class="line">
                                <span>Découvrez nos participants</span>
                                sur notre carte interactive
                            </div>
							</a>
                        </div>
                    </div>
                    <div id="homepage_nouvelles">
                        <div class="wrapper">
                            <h4 id="homepage_nouvelles_title">nouvelles</h4>
                            <ul id="homepage_nouvelles_images" class="clear_both">
                                <div id="homepage_nouvelles_more"><a class="fixunderline" href ="http://www.routeartssaveursrichelieu.com/nouvelles/"> Voir tous les articles <span>+</span></a></div>
								<?php
									$posts = get_posts(array(
										'post_type' => 'post',
										'numberposts' => 3,
										'orderby' => 'date',  
									));
									
									foreach( $posts as $post ) {
										setup_postdata($post);
									?>
										<li>
											<a class="fixunderline" href="<?php echo get_the_permalink(); ?>">
												<div class="homepage_nouvelles_image">
													<?php the_post_thumbnail(); ?>
												</div>
												<h5 class="homepage_nouvelles_text"><?php the_title(); ?></h5>
											</a>
										</li>
								
									<?php  wp_reset_postdata(); } ?>
                            </ul>
                        </div>
                    </div>
                </div>
           
<?php get_footer(); ?>