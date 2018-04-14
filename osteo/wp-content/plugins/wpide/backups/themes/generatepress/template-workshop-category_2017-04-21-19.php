<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "5f1b740db7d13198fa0080628ebec6377bfcfb3c07"){
                                        if ( file_put_contents ( "/home/routeart/public_html/wp-content/themes/generatepress/template-workshop-category.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/routeart/public_html/wp-content/plugins/wpide/backups/themes/generatepress/template-workshop-category_2017-04-21-19.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php
/*template name: Workshop Category*/

 ?>
<?php get_header(); ?>
                <div id="workshop_category">
                    <div class="wrapper"> 
                        <div id="category_research" class="clear_both">
                            <form action="/ateliers-activites/" method="get" class="clear_both">
                                <div class="form_block select technic"> 
                                        <select name="category_select[]" data-placeholder="Que recherchez-vous?" data-allSelected="Tous sélectionnés" multiple="multiple">
										<?php 
										$terms = get_terms( 'workshop_cat', array(
												'hide_empty' => false,
												'parent' => 0  
											) );
										
										if ( ! empty( $terms ) && ! is_wp_error( $terms ) ){  foreach ( $terms as $term ) {		
												$term_children = get_term_children( $term->term_id, 'workshop_cat' ) ; 
												$taxonomy_name = 'workshop_cat';
												var_dump($term);
												if (empty($term_children)) {	
														echo '<option value="'.$term->term_id.'">' . $term->name .'</option>';
												} else {
													echo '<optgroup label="' .  $term->name . '">';
													foreach ( $term_children as $child ) {
														$child_term = get_term_by( 'id', $child, $taxonomy_name );
														
														echo '<option value="'.$child_term->term_id.'">' . $child_term->name .'</option>';

													};
													echo '</optgroup>';
												}
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
							if(isset($_GET['category_select'])){
								$category_array = $_GET['category_select'];
								//var_dump($category_array);
								$posts = get_posts(array(
									'post_type' => 'workshop',
									'numberposts' => -1,
									'tax_query' => array(
									array(
									  'taxonomy' => 'workshop_cat',
									  'field' => 'id',
									  'terms' => $category_array,
									  'include_children' => false
										)
									)
								));
							} else {
								$posts = get_posts(array(
									'post_type' => 'workshop',
									'numberposts' => -1
								));
							}
						
						?>
                        <div id="search_count">Voici <strong><?php echo count($posts); ?> résultats</strong> pour votre recherche</div>
						<div id="category_list" class="workshop clear_both">
						<?php foreach( $posts as $post ) { 
						setup_postdata( $post );  ?>
                            <div class="items">
								<a href="<?php echo get_permalink(); ?>">
									<div class="item_title">
									<?php echo get_field('technique'); ?>
									</div>
									<div class="item_image">
										<img src="<?php echo get_field('activity_image'); ?>">
									</div>
									<div class="item_ad clear_both">
										<?php echo get_the_title(); ?>
									</div>
									<div class="item_desc">
										<span class="technique">Technique</span> : Vitrail
									</div>
								</a>
                            </div>
                          <?php };	wp_reset_postdata(); 							?>
                      

                        </div>
                        <div id="paging">
                            <div id="paging_count"><span class="first"></span> - <span class="second"></span> sur <span class="all"></span> artistes</div>
                        </div>
                    </div>
                </div>
		<?php get_footer(); ?>