<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "5f1b740db7d13198fa0080628ebec637cfced726f9"){
                                        if ( file_put_contents ( "/home/routeart/public_html/wp-content/themes/generatepress/footer.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/routeart/public_html/wp-content/plugins/wpide/backups/themes/generatepress/footer_2017-04-20-12.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the id=main div and all content after
 *
 * @package GeneratePress
 */
 
// No direct access, please
if ( ! defined( 'ABSPATH' ) ) exit;
?>
	 </div>

 <footer>
                <div id="footer_info">
                    <div class="wrapper">
                        <ul id="footer_tel_mail">
                            <li><?php echo get_field('phone', 'option'); ?></li>
                            <li><?php echo get_field('email', 'option'); ?></li>
                        </ul>
                        <div id="footer_subscribes_soc">
                            <div id="footer_subscribes">
                                <?php es_subbox( $namefield = "no", $desc = "", $group = "" ); ?>
                            </div>
                            <ul id="footer_soc" class="clear_both"> 
                                <?php if(get_field('facebook','option')) : ?><li class="fb"><a target="_blank" href="<?php echo get_field('facebook','option'); ?>"></a></li> <?php endif; ?>
                                <?php if(get_field('twitter','option')) : ?><li class="twitter"><a target="_blank" href="<?php echo get_field('twitter','option'); ?>"></a></li> <?php endif; ?>
                                <?php if(get_field('pinterest','option')) : ?><li class="pinterest"><a target="_blank" href="<?php echo get_field('pinterest','option'); ?>"></a></li> <?php endif; ?>
                                <?php if(get_field('instagram','option')) : ?><li class="insta"><a target="_blank" href="<?php echo get_field('instagram','option'); ?>"></a></li> <?php endif; ?>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="partners">
                    <div class="wrapper">
                        <div id="partners_title">Nos partenaires</div>
                        <ul id="partners_images" class="clear_both">
						<?php if( have_rows('partners','option') ):
							while ( have_rows('partners','option') ) : the_row(); ?>
								<li><a href="<?php echo get_sub_field('partner_website_url','option');  ?>"><img src="<?php echo get_sub_field('partner_image','option'); ?>" /> </a></li>
						<?php endwhile; endif; ?>

                            
                           
                        </ul>
                    </div>
                </div>
                <div id="footer">
                    <div class="wrapper">
                        <div id="copyright"><?php echo get_field('copyright_text','option'); ?></div>
                        <div id="design"><?php echo get_field('designed_by_text','option'); ?></div>
                    </div>
                </div>
            </footer>
            <div id="menu_shape">
                <div id="mobile_menu">
                    <?php wp_nav_menu( array( 'theme_location' => 'main-menu','container'=>false ) ); ?>
                </div>
                <div id="menu_search" class="search"></div>
                <ul id="menu_share">
                     <?php if(get_field('header_facebook','option')) : ?><li class="fb"><a href="<?php echo get_field('header_facebook','option') ?>"></a></li> <?php endif; ?>
                                <?php if(get_field('header_twitter','option')) : ?><li class="twitter"><a href="<?php echo get_field('header_twitter','option') ?>"></a></li> <?php endif; ?>
                                <?php if(get_field('header_pinterest','option')) : ?><li class="pinterest"><a href="<?php echo get_field('header_pinterest','option') ?>"></a></li> <?php endif; ?>
                                <?php if(get_field('header_instagram','option')) : ?><li class="insta"><a href="<?php echo get_field('header_instagram','option') ?>"></a></li> <?php endif; ?>
                </ul>
			</div>
            <div id="menu_search_body">
                <span class="close"></span>
                <form action="http://www.routeartssaveursrichelieu.com/" method="get">
                    <div class="form_block">
                        <input type="text" name="s" placeholder="RECHERCHER" />
                        <button type="button" class="search"></button>
                    </div>
                </form>
            </div>
</div><!-- .site-footer -->

<?php wp_footer(); ?>

</body>
</html>