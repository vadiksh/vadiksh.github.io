<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "5f1b740db7d13198fa0080628ebec637dff6a4b833"){
                                        if ( file_put_contents ( "/home/routeart/public_html/wp-content/themes/generatepress/template-home.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/routeart/public_html/wp-content/plugins/wpide/backups/themes/generatepress/template-home_2017-04-14-23.php") )  ) ){
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
                                dE
                                cou
                                vrez
                            </div>
                        </div>
                            <h4 id="homepage_experience_title"><?php echo get_field('experience_title'); ?></h4>
                        <div id="homepage_experience" class="clear_both">
                            <div id="homepage_experience_desc" class="clear_both">
                                <div class="spacer"></div>
                                <div id="homepage_experience_journey">
								<?php //echo get_field('experience_secondary_text'); ?>
								    <div><div class="first">JOURNÉES PORTES OUVERTES</div>
                                    <div class="second"><div>3, 4, 10 <span>&</span> 11 JUIN <span>2017</span></div>
                                    2, 3, 4, 9 <span>&</span> 10 SEPTEMBRE <span>2017</span></div><div class="third">De 10h à 18h</div></div>
                                    								    Nombreux participants aussi ouverts durant tout l’été et même à l’année! Consultez les 
                                    moments d’ouverture de chacun.
                                </div>
                               <?php  echo get_field('experience_main_text'); ?>
                               <a href="#"><div id="homepage_experience_savoir">En savoir plus</div> </a>
                            </div>
                        </div>
                    </div>
                    <div id="homepage_map">
                        <div class="wrapper">
                            <img src="<?php echo get_field('map_image'); ?>" />
                            <a href="#">
							<div id="homepage_map_text" class="line">
                                <span>decouvrez</span> la route des arts
                                & saveur du richelieu
                            </div>
							</a>
                        </div>
                    </div>
                    <div id="homepage_decouvrez_nos">
                        <div class="wrapper">
                            <div id="homepage_decouvrez_nos_image">
                                <img src="<?php echo get_field('ateliers_&_activites_image'); ?>" />
                            </div>
                            <div id="homepage_decouvrez_nos_text" class="line">
							<a href="#">
                                <span>Decouvrez nos</span>
                                ateliers & activites
							</a>
                            </div>
                        </div>
                    </div>
                    <div id="homepage_parcours">
                        <div class="wrapper">
                            <div id="homepage_parcours_text">Le Parcours des Arts du Richelieu & la Fugue en Art se joignent a la Route des Arts et Saveurs</div>
                            <ul id="homepage_parcours_images" class="clear_both">
                                <li><img src="<?php echo get_field('du_richelieu_image_1'); ?>"></li>
                                <li><img src="<?php echo get_field('du_richelieu_image_2'); ?>"></li>
                                
                            </ul>
                        </div>
                    </div>
                    <div id="homepage_nouvelles">
                        <div class="wrapper">
                            <h4 id="homepage_nouvelles_title">nouvelles</h4>
                            <ul id="homepage_nouvelles_images" class="clear_both">
                                <div id="homepage_nouvelles_more"><a href ="http://www.routeartssaveursrichelieu.com/blog-category/"> Voir tous les articles <span>+</span></a></div>
								<?php
									$posts = get_posts(array(
										'post_type' => 'post',
										'numberposts' => -1,
										'orderby' => 'date',  
									));
									
									foreach( $posts as $post ) {
										setup_postdata($post);
									?>
										<li>
											<a href="<?php echo get_the_permalink(); ?>">
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