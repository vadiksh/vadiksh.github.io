<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "5f1b740db7d13198fa0080628ebec63765b9a33735"){
                                        if ( file_put_contents ( "/home/routeart/public_html/wp-content/themes/generatepress/single-workshop.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/routeart/public_html/wp-content/plugins/wpide/backups/themes/generatepress/single-workshop_2017-04-15-11.php") )  ) ){
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
                <div id="workshop-detailed-page">
                    <div id="workshop_desc">
                        <div class="wrapper">
                            <div id="each_workshop" class="clear_both">
                                <div id="workshop_image">
                                    <img src="<?php echo get_field('activity_image'); ?>" />
                                </div>
                                <div id="workshop_description">
                                    <h3 id="workshop_prof">Technique : <?php echo get_field('technique'); ?></h3>
                                    <h2 id="workshop_name"><?php the_title();  ?></h2>
                                    <div id="workshop_animation">
                                        <span class="animation">Nom de l'animateur :</span><?php echo get_field('nom_de');  ?>
                                    </div>
                                </div>
									<div id="workshop_share">Partager
										<span class="share_soc clear_both">
											<a class="fb" href="https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>" onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;"></a>
											<a class="twitter" href="https://twitter.com/share?text=<?php the_title(); ?>&url=<?php the_permalink(); ?>" target="_blank"></a>
											<a class="pinterest" href="//pinterest.com/pin/create/button/?url=<?php echo get_permalink(); ?>&media=<?php echo wp_get_attachment_url( get_post_thumbnail_id() ); ?>&description=<?php the_title(); ?>"></a>
										</span>
									</div>
                                <div id="workshop_item_description">
									<?php if(get_field('description')) : ?>
										<div class="apropos">
											<?php echo get_field('description'); ?> 
										</div>
									<?php endif; ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
		<?php get_footer(); ?>