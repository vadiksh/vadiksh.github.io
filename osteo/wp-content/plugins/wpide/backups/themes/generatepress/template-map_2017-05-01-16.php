<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "5f1b740db7d13198fa0080628ebec63755cc3eedb2"){
                                        if ( file_put_contents ( "/home/routeart/public_html/wp-content/themes/generatepress/template-map.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/routeart/public_html/wp-content/plugins/wpide/backups/themes/generatepress/template-map_2017-05-01-16.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?>   <?php
	/*template name: map*/
 ?>             
                
<?php get_header(); ?>

<div class="map-content-get-posts"> 
    <?php $posts = get_posts(array(
    						'post_type' => 'artist',
    						'numberposts' => -1,
    						 'order'          => 'ASC',
                            'orderby'        => 'title'
    					));
    					
    		$query = new WP_Query( array( 'post_type' => 'artist' ) );
    		var_dump($query); ?>						
</div>
<div class = "terms">
    <?php
        $terms = get_terms( 'artist_cat', array(
												'hide_empty' => false,
												'parent' => 0  
											) );				
		var_dump($terms);
    ?>

</div>

<div class= "term-children">
 <?php  foreach ( $terms as $term ) {	
        echo '</br>' . $term->name . '</br>';
		$term_children = get_term_children( $term->term_id, 'artist_cat' ) ; 
		foreach ( $term_children as $child ) {
    		$child_term = get_term_by( 'id', $child,'artist_cat');
    		echo '</br>' . $child_term->name . '</br>';
		}
	}
	var_dump($term_children);
	?>

</div>


<style>
    .map-content-get-posts {
        display:none;
        }
</style>
							
<?php get_footer(); ?>
											
						