<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "51033623d1a85dba0e0fda596d1fa495e40afa324e"){
                                        if ( file_put_contents ( "/home/routeart/public_html/wp-content/themes/generatepress/single-artist.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/routeart/public_html/wp-content/plugins/wpide/backups/themes/generatepress/single-artist_2017-04-05-17.php") )  ) ){
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
								<div id="artist_number"> <?php echo get_field('number');   ?> </div> 
                                <h3 id="artist_prof">
									<?php 
										//var_dump($terms); die;   
										foreach($terms as $termObject) :
											if($termObject->parent == 0) {
												echo $termObject->name;
											}
										endforeach;
										
										foreach($terms as $termObject) :
											if($termObject->parent !=0) {
												echo  ' / ' .$termObject->name;
											}
										endforeach
										
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
										<li class="mail"><?php  echo get_field('artist_email'); ?> </li>
									<?php endif; ?>
									
									<?php if( get_field('website') ): ?>
										<li class="website"> <?php echo get_field('website'); ?> </li>
									<?php endif; ?>
									<?php if(get_field('facebook_link') || get_field('twitter_link') || get_field('pinterest_link') || get_field('instagram_link')) :  ?>
                                    <li class="share">Me suivre
                                        <span class="share_soc clear_both">
										<?php if( get_field('facebook_link') ): ?>
                                                <a href="<?php echo get_field('facebook_link'); ?> " target="_blank" class="fb"></a>
										<?php endif; ?>
										
										<?php if( get_field('twitter_link') ): ?>
                                                <a href="<?php echo get_field('twitter_link'); ?> " target="_blank" class="twitter"></a>
										<?php endif; ?>
										
										<?php if( get_field('pinterest_link') ): ?>
                                                <a href="<?php echo get_field('pinterest_link'); ?>" target="_blank" class="pinterest"></a> 
										<?php endif; ?>
										
										<?php if( get_field('instagram_link') ): ?>
                                                <a href="<?php echo get_field('instagram_link');?>" target="_blank" class="insta"></a>
										<?php endif; ?>
                                            </span>
                                        </li>
									<?php endif; ?>
                                    </ul>
                                </div>
                                <div id="artist_item_description">
                                    <div class="apropos">
									<?php if( get_field('about_artist') ): ?>
                                        <h4 class="apropos_title">/À propos</h4>
                                        <div class="apropos_desc"><?php echo get_field('about_artist'); ?></div>
									<?php endif; ?>
                                    </div>
                                    <div class="apropos">
									<?php if( get_field('about_second') ): ?>
                                        <h4 class="apropos_title">/heures d’ouverture</h4>
                                        <div class="apropos_desc"><?php echo get_field('about_second'); ?></div>
                                    <?php endif; ?>
									</div>
                                </div> 
								<?php if( get_field('artist_featured_work') ): ?>
                                <div id="artist_item_image">
                                    <img src="<?php echo get_field('artist_featured_work'); ?>" />
                                </div>
								<?php endif; ?>
                            </div>
                        </div>
                    </div>
                    <div id="arts_participant_gallery">
                        <div class="wrapper">
                            <!-- <h3>/mes œuvres</h3> -->
                            <ul class="owl-carousel">
							<?php if(get_field('gallery')): ?>
							<?php $images = get_field('gallery'); ?>
							 <?php foreach( $images as $image ): ?>
                                <li><img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" /></li>
							<?php endforeach; ?>
							<?php endif; ?>
                            </ul>
                        </div>
                    </div>
                </div>
           
<?php get_footer();?>