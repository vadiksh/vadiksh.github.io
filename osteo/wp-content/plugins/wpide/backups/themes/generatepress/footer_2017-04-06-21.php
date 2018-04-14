<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "51033623d1a85dba0e0fda596d1fa49599b1c36559"){
                                        if ( file_put_contents ( "/home/routeart/public_html/wp-content/themes/generatepress/footer.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/routeart/public_html/wp-content/plugins/wpide/backups/themes/generatepress/footer_2017-04-06-21.php") )  ) ){
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
                            <ul id="footer_subscribes">
                                <form action="" method="post">
                                    <li id="footer_newsletter"><input type="text" placeholder="Abonnez-vous à notre infolettre" /></li>
                                    <li id="footer_subscribe"><button type="submit">M’inscrire</button></li>
                                </form>
                            </ul>
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
			</div>

</div><!-- .site-footer -->

<?php wp_footer(); ?>

</body>
</html>