<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "5f1b740db7d13198fa0080628ebec6372931e080e7"){
                                        if ( file_put_contents ( "/home/routeart/public_html/wp-content/themes/generatepress/template-map.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/routeart/public_html/wp-content/plugins/wpide/backups/themes/generatepress/template-map_2017-05-05-21.php") )  ) ){
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
<?php   
        /*ARTISTS*/
        $artists = array();
        $index = 0;
        $terms = get_terms( 'artist_cat', array(
    					'hide_empty' => false,
    					'parent' => 0  
    				) );				
		//var_dump($terms);
        foreach ( $terms as $term ) {	
            echo '</br>' . $term->name . '</br>';
		    $term_children = get_term_children( $term->term_id, 'artist_cat' ) ; 
    		foreach ( $term_children as $child ) {
            		$child_term = get_term_by( 'id', $child,'artist_cat');
            		//var_dump($child_term);
            		echo '</br>' . $child_term->name . '</br>';
            		$posts = get_posts(array(
                      'post_type' => 'artist',
                      'numberposts' => -1,
                      'tax_query' => array(
                        array(
                          'taxonomy' => 'artist_cat',
                          'field' => 'id',
                          'terms' => $child_term->term_id, // Where term_id of Term 1 is "1".
                          'include_children' => false
                            )
                        )
                    ));
            //var_dump($artists);
        	foreach ($posts as $post) {
        	$index++;
            setup_postdata( $post );
            //var_dump($artist);
            $artists[$index]['name'] = get_the_title();
            $artists[$index]['number'] = get_field('number');
            $artists[$index]['address'] = get_field('address');
            $artists[$index]['featuredImage'] = get_field('artist_featured_work');
            $aritsts[$index]['email'] = get_field('artist_email');
            $artists[$index]['phone'] = get_field('phone_first');
            $artists[$index]['page'] =  get_the_permalink();
            $artists[$index]['subcategory'] = $child_term->name;
            $artists[$index]['category'] = $term->name;
            //echo get_field('artist_town') . ' ';
            //echo $child_term->name . ' ';
            //echo $artist->post_title;
            //echo $term->name;  
        	wp_reset_postdata();
        }
	}
} 
//var_dump($artists);

/*Saveurs*/
        $saveurs = array();
        $index = 0;
        $terms = get_terms( 'saveur_cat', array(
    					'hide_empty' => false,
    					'parent' => 0  
    				) );				
		//var_dump($terms);
        foreach ( $terms as $term ) {	
            echo '</br>' . $term->name . '</br>';
		    $term_children = get_term_children( $term->term_id, 'saveur_cat' ) ; 
    		foreach ( $term_children as $child ) {
            		$child_term = get_term_by( 'id', $child,'saveur_cat');
            		//var_dump($child_term);
            		echo '</br>' . $child_term->name . '</br>';
            		$posts = get_posts(array(
                      'post_type' => 'saveur',
                      'numberposts' => -1,
                      'tax_query' => array(
                        array(
                          'taxonomy' => 'saveur_cat',
                          'field' => 'id',
                          'terms' => $child_term->term_id, // Where term_id of Term 1 is "1".
                          'include_children' => false
                            )
                        )
                    ));
        	foreach ($posts as $post) {
        	$index++;
            setup_postdata( $post );
            $saveurs[$index]['name'] = get_the_title();
            $saveurs[$index]['number'] = get_field('number');
            $saveurs[$index]['address'] = get_field('address');
            $saveurs[$index]['featuredImage'] = get_field('artist_featured_work');
            $saveurs[$index]['email'] = get_field('artist_email');
            $saveurs[$index]['phone'] = get_field('phone_first');
            $saveurs[$index]['page'] =  get_the_permalink();
            $saveurs[$index]['subcategory'] = $child_term->name;
            $saveurs[$index]['category'] = $term->name;
            //echo get_field('artist_town') . ' ';
            //echo $child_term->name . ' ';
            //echo $artist->post_title;
            //echo $term->name;

        	wp_reset_postdata();
        }
	}
}
$saveursJson = json_encode($saveurs);
var_dump($saveursJson);


?>


							
<?php get_footer(); ?>
											
						