<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "51033623d1a85dba0e0fda596d1fa4953704abf618"){
                                        if ( file_put_contents ( "/home/mariodai/public_html/wp-content/themes/generatepress/footer.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/mariodai/public_html/wp-content/plugins/wpide/backups/themes/generatepress/footer_2017-11-01-21.php") )  ) ){
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
<section class="footer-social-section">
        <div class="container-fluid">
            <div class="row">
                <ul>
                    <li><a href="https://www.facebook.com/productionsmariodaigle/">Facebook</a></li>
                    <li><a href="#">Google +</a></li>
                    <li><a href="https://www.linkedin.com/in/mario-daigle-780b7786/">Linked in</a></li>
                    <li><a href="https://www.youtube.com/channel/UC3nsqlydoEiQJgU5gRFWJ5A/videos">Youtube</a></li>
                </ul>
            </div>
        </div>
    </section>
<section class="last-section">
        <div class="container-fluid">
            <div class="row last-section-first-row">
                <div class="col-xs-12">
                    <div class="row danick-row">
                        <a href="http://www.danicklabrie.com">
                            <span>/ Conception web</span>
                            <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/danick_logo_gold.svg">
                        </a>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="row copyright-row">
                        <div class="col-xs-12">
                            <ul>
                                <li>Copyright 2008-2017</li>
                                <span>|</span>
                                <li><a href="mailto:info@mariodaigle.com"></a>info@mariodaigle.com</li>
                                <span>|</span>
                                <li class="tel"><a href="tel:450 501-1177"></a>450 501-1177</li>
                            </ul>
                        </div>

                        <span>Entreprise de production vidéo St-Hyacinthe et de transfert de vidéo</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

</body>
<script>
 
</script>
<script>

</script>
</html>


<?php wp_footer(); ?>

</body>
</html>