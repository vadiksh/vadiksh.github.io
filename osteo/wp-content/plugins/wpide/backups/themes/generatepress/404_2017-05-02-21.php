<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "5f1b740db7d13198fa0080628ebec63772e76a1045"){
                                        if ( file_put_contents ( "/home/routeart/public_html/wp-content/themes/generatepress/404.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/routeart/public_html/wp-content/plugins/wpide/backups/themes/generatepress/404_2017-05-02-21.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php
/**
 * The template for displaying 404 pages (Not Found).
 *
 * @package GeneratePress
 */
 
// No direct access, please
if ( ! defined( 'ABSPATH' ) ) exit;
get_header(); ?>

<div class="content-404 wrapper">
    <p>Nous avons cherché partout. Mais il semble que la page que vous cherchez n'existe plus. Vous pouvez     <a href="<?php echo get_home_url(); ?>">retourner vers l'accueil.</a></p>
    


</div>

<?php get_footer(); ?>