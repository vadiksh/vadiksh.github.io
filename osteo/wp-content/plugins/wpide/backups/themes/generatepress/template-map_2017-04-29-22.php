<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "5f1b740db7d13198fa0080628ebec6377817470704"){
                                        if ( file_put_contents ( "/home/routeart/public_html/wp-content/themes/generatepress/template-map.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/routeart/public_html/wp-content/plugins/wpide/backups/themes/generatepress/template-map_2017-04-29-22.php") )  ) ){
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


<div class="map-content"> 
<?php $posts = get_posts(array(
						'post_type' => 'artist',
						'numberposts' => -1,
						 'order'          => 'ASC',
                        'orderby'        => 'title'
					));
					
					foreach($posts as $post){?>
					    <div class="post">
					   <?php var_dump($post); ?>
					   </div>
				<?php	    }
					
					
					?>
</div>
							
<?php get_footer(); ?>
											
						