<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "51033623d1a85dba0e0fda596d1fa49532a5f3624f"){
                                        if ( file_put_contents ( "/home/routeart/public_html/wp-content/themes/generatepress/archive-artist.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/routeart/public_html/wp-content/plugins/wpide/backups/themes/generatepress/archive-artist_2017-04-07-20.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php
	/*template name: Artistes Category*/ 
 ?>
 
 <?php  get_header(); ?>
                <div id="arts_saveurs_category">
                    <div class="wrapper">
                        <div id="category_research" class="clear_both">
                            <form id="searchForm" action="/arts/" method="get" class="clear_both">
                                <div class="form_block select artist">
                                    <select name="artist_select">
									<option value="all">All</option>
										<?php 										
										
										$posts = get_posts(array(
														'post_type' => 'artist',
														'numberposts' => -1,		
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
							
									<select name="category_select[]" multiple="multiple">
										<?php 
										$terms = get_terms( 'artist_cat', array(
												'hide_empty' => false,
												'parent' => 0  
											) );
										
										if ( ! empty( $terms ) && ! is_wp_error( $terms ) ){  foreach ( $terms as $term ) {		
												$term_children = get_term_children( $term->term_id, 'artist_cat' ) ; 
												$taxonomy_name = 'artist_cat';
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
							'post_type' => 'artist',
							'numberposts' => -1,
							'meta_key'=> 'number',
							'orderby'=> 'meta_value',
							'order'	=> 'ASC',
							'tax_query' => array(
							array(
							  'taxonomy' => 'artist_cat',
							  'field' => 'id',
							  'terms' => $category_array,
							  'include_children' => false
								)
							)
						));
						
					}else{
						$posts = get_posts(array(
							'post_type' => 'artist',
							'numberposts' => -1,
							'meta_key'=> 'number',
							'orderby'=> 'meta_value',
							'order'	=> 'ASC',
						));
					}
					
				}
				
			}else{
				
				$posts = get_posts(array(
					'post_type' => 'artist',
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
							<div class="name"><?php the_title(); ?></div>
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
                            <div id="paging_count">12 – 22 sur 22 artistes</div>
                            <ul class="clear_both">
                                <li class="prev"></li>
                                <li class="active">1</li>
                                <li><a href="#">2</a></li>
                                <li class="next"><a href="#"></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
           
<?php get_footer(); ?>