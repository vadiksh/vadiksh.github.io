<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "5f1b740db7d13198fa0080628ebec63752ff68d487"){
                                        if ( file_put_contents ( "/home/routeart/public_html/wp-content/themes/generatepress/search.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/routeart/public_html/wp-content/plugins/wpide/backups/themes/generatepress/search_2017-04-19-10.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php
/**
 * The template for displaying Search Results pages.
 *
 * @package GeneratePress
 */
 
// No direct access, please
if ( ! defined( 'ABSPATH' ) ) exit;

get_header(); ?>
	    <div id = "search">
	    <?php $number = 0; ?>
		<?php if ( have_posts() ) : ?>
			<?php while ( have_posts() ) : the_post(); $number = $number+1; ?>	
			        <a style="" href ="<?php echo get_the_permalink(); ?>" <h3><span> <?php echo $number; ?>  </span> <?php the_title(); ?> </h3> </a>
			<?php endwhile; ?>
		    <?php else : echo 'No results found'; ?>
		<?php endif; ?>
	    </div>

<?php get_footer(); ?>