<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "5f1b740db7d13198fa0080628ebec63755cc3eedb2"){
                                        if ( file_put_contents ( "/home/routeart/public_html/wp-content/themes/generatepress/single-saveur.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/routeart/public_html/wp-content/plugins/wpide/backups/themes/generatepress/single-saveur_2017-05-01-17.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php get_header(); ?>
 
<?php 
	$post_id = get_the_ID();
	//echo $post_id;
	$taxonomy = get_post_taxonomies( $post_id ); 
	$args = array('orderby' => 'name', 'order' => 'ASC', 'fields' => 'all');
	$terms = wp_get_post_terms( $post_id, $taxonomy, $args ); 
	//var_dump ($terms);
	$length  = count($terms);  
	//echo $length;
 ?>
                <div id="arts-participant-detailed-page">
                    <div id="arts_participant_desc">
                        <div class="wrapper">
                        <div id="each_artist" class="clear_both">
                            <div id="artist_image"> 
                                <img src="<?php echo get_field('artist_image');  ?>" />
                            </div>
                            <div id="artist_description">
							<h2 id="artist_number">/<?php echo get_field('number'); ?> </h2>
                                 <h3 id="artist_prof">
									<?php 
										//var_dump($terms); die;   
										// foreach($terms as $termObject) :
											// if($termObject->parent == 0) {
												// echo $termObject->name;
											// }
										// endforeach;
										
										// foreach($terms as $termObject) :
											// if($termObject->parent !=0) {
												// echo  ' / ' .$termObject->name;
											// }
										// endforeach
									echo get_field('artist_category'); 
									?>
								</h3>
                                <h2 id="artist_name"><?php echo get_the_title(); ?></h2>
                                <ul class="clear_both">
									<?php if( get_field('address') ): ?>
										<li class="address"><?php echo get_field('address'); ?> </li> 
									<?php endif; ?>
									<?php if( get_field('town') ): ?>
										<li class="town"><?php echo get_field('town'); ?> </li>
									<?php endif; ?>
									<?php if( get_field('phone_first') ): ?>
										<li class="phone"> <?php echo get_field('phone_first'); if( get_field('phone_second')) echo '/'; echo get_field('phone_second');?> </li> 
									<?php endif; ?> 
									<?php if( get_field('artist_email') ): ?>
										<li class="mail"><a class="fixunderline" href="mailto:<?php  echo get_field('artist_email'); ?>"><?php  echo get_field('artist_email'); ?></a> </li>
									<?php endif; ?>
									<?php if( get_field('website') ): ?>
										<li class="website"><a class="fixunderline" href="<?php echo 'http://'. get_field('website'); ?>"><?php echo get_field('website'); ?> </a> </li>
									<?php endif; ?>
								
								<?php if(get_field('facebook_link') || get_field('twitter_link') || get_field('pinterest_link') || get_field('instagram_link')) :  ?>
                                    <li class="share">Me suivre
                                        <span class="share_soc clear_both">
										<?php if( get_field('facebook_link') ): ?>
                                                <a href="<?php echo get_field('facebook_link'); ?> " target="_blank" class="fb fixunderline"></a>
										<?php endif; ?>
										
										<?php if( get_field('twitter_link') ): ?>
                                                <a href="<?php echo get_field('twitter_link'); ?> " target="_blank" class="twitter fixunderline"></a>
										<?php endif; ?>
										
										<?php if( get_field('pinterest_link') ): ?>
                                                <a href="<?php echo get_field('pinterest_link'); ?>" target="_blank" class="pinterest fixunderline"></a> 
										<?php endif; ?>
										
										<?php if( get_field('instagram_link') ): ?>
                                                <a href="<?php echo get_field('instagram_link');?>" target="_blank" class="insta fixunderline"></a>
										<?php endif; ?>
                                            </span>
                                        </li>
									<?php endif; ?>
                                    </ul>
                                </div>
                                <?php if( get_field('artist_featured_work') ): ?>
                                <div id="artist_item_image">
                                    <img src="<?php echo get_field('artist_featured_work'); ?>" />
                                </div>
								<?php endif; ?>
                                <div id="artist_item_description">
                                    <div class="apropos">
									<?php if( get_field('about_artist') ): ?>
                                        <h4 class="apropos_title">/À propos</h4>
                                        <div class="apropos_desc"><?php echo get_field('about_artist'); ?></div>
									<?php endif; ?>
                                    </div>
                                    <div class="apropos">
									<?php if( get_field('about_second') ): ?>
                                        <h4 class="apropos_title">/heures d'ouverture</h4>   
                                        <div class="apropos_desc"><?php echo get_field('about_second'); ?></div>
                                    <?php endif; ?>
									</div>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div id="arts_participant_gallery">
                        <div class="wrapper">
                            <!-- <h3>/mes ?uvres</h3> -->
                            <ul class="owl-carousel">
							<?php if(get_field('gallery')): ?>
							<?php $images = get_field('gallery'); ?>
							 <?php foreach( $images as $image ): ?>
                                <li data-id="<?php echo $image['id'];?>"><img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" /></li>
							<?php endforeach; ?>
							<?php endif; ?>
                            </ul>
                        </div>
                    </div>
					
					<div id="arts_participant_share">
                        <div class="wrapper"> 
                            <ul id="arts_participant_share_left">
                               <li class=""><a class="fixunderline" href="mailto:<?php  echo get_field('artist_email'); ?>"><?php  echo get_field('artist_email'); ?></a></li> 
								<?php if( get_field('website') ): ?>
									<li><a class="fixunderline" href="http://<?php echo get_field('website'); ?> "> <?php echo get_field('website'); ?> </a></li>
								<?php endif; ?>
                               <?php if( get_field('phone_first') ): ?>
										<li> <?php echo get_field('phone_first');?> </li> 
								<?php endif; ?>   
                               <?php  $location = get_field('location'); $lat = $location["lat"];  $lng = $location["lng"]; ?>
                                <li class="location"><a class="fixunderline" target="_blank" href="http://www.google.com/maps/place/<?php echo $lat; ?>,<?php echo $lng; ?>"> Obtenir l’itinéraire </a></li>
                            </ul>
                            <div id="arts_participant_share_right" class="shared">
                                Partager
                                 <ul>
									<li class="fb">	<a class="fixunderline" href="https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>" onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;"></a></li>
								    <li class="twitter"><a class="fixunderline" href="https://twitter.com/share?text=<?php the_title(); ?>&url=<?php the_permalink(); ?>" target="_blank"></a></li>
									<li class="pinterest"><a class="fixunderline" href="//pinterest.com/pin/create/button/?url=<?php echo get_permalink(); ?>&media=<?php echo wp_get_attachment_url( get_post_thumbnail_id() ); ?>&description=<?php the_title(); ?>"></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


<?php get_footer();?>