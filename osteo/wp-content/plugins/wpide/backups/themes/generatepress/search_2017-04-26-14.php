<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "5f1b740db7d13198fa0080628ebec6378f184c69dd"){
                                        if ( file_put_contents ( "/home/routeart/public_html/wp-content/themes/generatepress/search.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/routeart/public_html/wp-content/plugins/wpide/backups/themes/generatepress/search_2017-04-26-14.php") )  ) ){
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
			        <a style="display:block;text-align:center;font-size:45px;margin-top:5px;font-family: 'poppins';color: #3c3c3b;" href ="<?php echo get_the_permalink(); ?>" <h3><span style="color: #706f6f;"> <?php echo $number; ?>. </span> <?php the_title(); ?> </h3> </a>
			<?php endwhile; ?>
		    <?php else : ?> 
		        <a style="display:block;font-family:'Poppins';text-align:center;font-size:45px;margin-top:5px;color: #3c3c3b; cursor:pointer;" onclick="history.go(-1)"> No Results Found, Click to go Back </a>
		<?php endif; ?>
	    </div>

<?php get_footer(); ?>