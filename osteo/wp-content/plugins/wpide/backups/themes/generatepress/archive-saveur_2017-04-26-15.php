<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "5f1b740db7d13198fa0080628ebec6378f184c69dd"){
                                        if ( file_put_contents ( "/home/routeart/public_html/wp-content/themes/generatepress/archive-saveur.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/routeart/public_html/wp-content/plugins/wpide/backups/themes/generatepress/archive-saveur_2017-04-26-15.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php
	/*template name: Saveur Category*/
 ?>
 
 <?php  get_header(); ?>
                <div id="arts_saveurs_category">
                    <div class="wrapper">
                        <div id="category_research" class="clear_both">
                            <form id="searchForm" action="/saveurs/" method="get" class="clear_both">
                                <div class="form_block select artist">
                                    <select name="artist_select">
									<option value="all">Qui recherchez-vous?</option>
										<?php 										
										
										$posts = get_posts(array(
														'post_type' => 'saveur',
														'numberposts' => -1,
														 'order'          => 'ASC',
                                                        'orderby'        => 'title'
													));		
										
										foreach( $posts as $post ) { 
											setup_postdata( $post ); ?>
											<option value="<?php echo get_the_ID(); ?>"><?php the_title(); ?></option>
									 
										<?php };
						 				
										wp_reset_postdata(); 

							
									 ?>    
                                    </select>
                                </div>
                                <div class="form_block select technic">
							
									<select name="category_select[]" data-placeholder="Que recherchez-vous?" data-allSelected="Tous sélectionnés" multiple="multiple">
									
										<?php 
										$terms = get_terms( 'saveur_cat', array(
												'hide_empty' => false,
												'parent' => 0  
											) );
										
										if ( ! empty( $terms ) && ! is_wp_error( $terms ) ){  foreach ( $terms as $term ) {		
												$term_children = get_term_children( $term->term_id, 'saveur_cat' ) ; 
												$taxonomy_name = 'saveur_cat';
												echo '<optgroup label="' .  $term->name . '">';
												foreach ( $term_children as $child ) {
													$child_term = get_term_by( 'id', $child, $taxonomy_name );
													
													echo '<option value="'.$child_term->term_id.'">' . $child_term->name .'</option>';

												};
												echo '</optgroup>';
											} 
										} ?>
									</select>
                                </div>
                                <div class="form_block button">
                                    <button type="submit">RECHERCHER</button>
                                </div>
                            </form>
                        </div>
						<?php 
							
			if(isset($_GET['artist_select'])){
				$artist_id = $_GET['artist_select'];
				if($artist_id != 'all'){
					
					$posts = get_post($artist_id);
					$posts = array($posts);
					
				}else{
					
					if(isset($_GET['category_select'])){
						
						$category_array = $_GET['category_select'];
						
						$posts = get_posts(array(
							'post_type' => 'saveur',
							'numberposts' => -1,
							'meta_key'=> 'number',
							'orderby'=> 'meta_value',
							'order'	=> 'ASC',
							'tax_query' => array(
							array(
							  'taxonomy' => 'saveur_cat',
							  'field' => 'id',
							  'terms' => $category_array,
							  'include_children' => false
								)
							)
						));
						
					}else{
						$posts = get_posts(array(
							'post_type' => 'saveur',
							'numberposts' => -1,
							'meta_key'=> 'number',
							'orderby'=> 'meta_value',
							'order'	=> 'ASC',
						));
					}
					
				}
				
			}else{
				
				$posts = get_posts(array(
					'post_type' => 'saveur',
					'numberposts' => -1,
					'meta_key'=> 'number',
					'orderby'=> 'meta_value',
					'order'	=> 'ASC',
				));

			}
			?>
			
			<div id="search_count">Voici <strong><?php echo count($posts); ?> résultats</strong> pour votre recherche</div>
			<div id="category_list" class="clear_both">
						
			
			<?php foreach( $posts as $post ) { 
				setup_postdata( $post );  ?>
				<div class="items">
				<a href="<?php echo get_the_permalink(); ?>">  
					<div class="item_title"><?php echo get_field('artist_town'); ?></div>
					<div class="item_image">
						<img src="<?php echo get_field('artist_featured_work'); ?>">
					</div>
					<div class="item_ad clear_both">
						<div class="num"><?php echo get_field('number'); ?>/</div>
						<div class="name"><?php the_title(); ?> </div>
					</div>
					<div class="item_desc">
						<?php the_field('about_artist'); ?>
					</div>
				</a>
				</div> 
				
				
			<?php };
			
			wp_reset_postdata(); 
			
			?>
                                        
                        </div>
                        <div id="paging">
                            <div id="paging_count"><span class="first">12</span> – <span class="second">22</span> sur <span class="all">22</span> participants</div>
                        </div>
                    </div>
                    <ul id="bottom_buttons">
                        <div class="wrapper">
                            <li class="saveurs-button">
                                <a href="http://www.routeartssaveursrichelieu.com/arts/" >Arts</a>
                            </li>
                            <li class="map-button">
                                <a href="http://www.routeartssaveursrichelieu.com/carte/">Tous les participants<img src="http://www.routeartssaveursrichelieu.com/wp-content/uploads/2017/04/mapmarkers-icon-button_03.svg" /></a>
                            </li>
                        </div>
                    </ul>
                </div>
           
<?php get_footer(); ?>