<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "51033623d1a85dba0e0fda596d1fa49597cf3a9e68"){
                                        if ( file_put_contents ( "/home/routeart/public_html/wp-content/themes/generatepress/single-artist.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/routeart/public_html/wp-content/plugins/wpide/backups/themes/generatepress/single-artist_2017-03-29-17.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php get_header(); ?>
 
<?php 
	$post_id = get_the_ID();
	$taxonomy = get_post_taxonomies( $post_id ); 
	$args = array('orderby' => 'name', 'order' => 'ASC', 'fields' => 'all');
	$terms = wp_get_post_terms( $post_id, $taxonomy, $args ); 
	//var_dump ($terms);
	$length  = count($terms);
	echo $length;
 ?>
                <div id="arts-participant-detailed-page">
                    <div id="arts_participant_desc">
                        <div class="wrapper">
                        <div id="each_artist" class="clear_both">
                            <div id="artist_image">
                                <img src="<?php echo get_field('artist_image');  ?>" />
                            </div>
                            <div id="artist_description">
                                <h3 id="artist_prof">
									<?php 
										if($length == 1) {
											echo $terms[0]->name; 
										}
										else {
											echo $terms[1]->name; 
										}
									?>
								</h3>
                                <h2 id="artist_name"><?php echo get_the_title(); ?></h2>
                                <ul class="clear_both">
                                    <li class="mail">M’écrire</li>
                                    <li class="website">jocelynebilodeau.ca</li>
                                    <li class="address">5329 rue Faubert St-Denis-Sur-Richelieu J2S 3X4</li>
                                    <li class="share">Me suivre
                                        <span class="share_soc clear_both">
                                                <a href="" target="_blank" class="fb"></a>
                                                <a href="" target="_blank" class="twitter"></a>
                                                <a href="" target="_blank" class="pinterest"></a> 
                                                <a href="" target="_blank" class="insta"></a>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div id="artist_item_description">
                                    <div class="apropos">
                                        <h4 class="apropos_title">/À propos</h4>
                                        <div class="apropos_desc"><?php echo get_field('about_artist'); ?></div>
                                    </div>
                                    <div class="apropos">
                                        <h4 class="apropos_title">/heures d’ouverture</h4>
                                        <div class="apropos_desc"><?php echo get_field('about_second'); ?></div>
                                    </div>
                                </div> 
                                <div id="artist_item_image">
                                    <img src="<?php echo get_field('artist_featured_work'); ?>" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="arts_participant_gallery">
                        <div class="wrapper">
                            <h3>/mes œuvres</h3>
                            <ul class="owl-carousel">
                                <li><img src="<?php echo get_stylesheet_directory_uri(); ?>/images/item_image.jpg" /></li>
                                <li><img src="<?php echo get_stylesheet_directory_uri(); ?>/images/item_image.jpg" /></li>
                                <li><img src="<?php echo get_stylesheet_directory_uri(); ?>/images/item_image.jpg" /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <div id="footer_info">
                    <div class="wrapper">
                        <ul id="footer_tel_mail">
                            <li>T. 1 888 123-4567</li>
                            <li>infos@loremipsumdolor.com</li>
                        </ul>
                        <div id="footer_subscribes_soc">
                            <ul id="footer_subscribes">
                                <li id="footer_newsletter">Abonnez-vous à notre infolettre</li>
                                <li id="footer_subscribe">M’inscrire</li>
                            </ul>
                            <ul id="footer_soc" class="clear_both">
                                <li class="fb"></li>
                                <li class="twitter"></li>
                                <li class="pinterest"></li>
                                <li class="insta"></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="partners">
                    <div class="wrapper">
                        <div id="partners_title">Nos partenaires</div>
                    </div>
                </div>
                <div id="footer">
                    <div class="wrapper">
                        <div id="copyright">&copy; 2017 Route des arts et saveurs du Richelieu - Tous droits réservés</div>
                        <div id="design">Conception web : Danick Labrie design & Communication</div>
                    </div>
                </div>
            </footer>
            <div id="menu_shape">

            </div>
        </div>