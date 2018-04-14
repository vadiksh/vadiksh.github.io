<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "51033623d1a85dba0e0fda596d1fa495b5ee36e9f1"){
                                        if ( file_put_contents ( "/home/routeart/public_html/wp-content/themes/generatepress/template-category.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/routeart/public_html/wp-content/plugins/wpide/backups/themes/generatepress/template-category_2017-03-28-11.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php
	/*template name: Category*/
 ?>
 
 <?php  get_header(); ?>
	
<div class="testing" style="margin:200px;"> Debugger </div>





 <div id="page_wrapper">
            <header>
                <div id="header">
                    <div id="logo">
                        <a href="">
                            <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/logo.png" />
                        </a>
                    </div>
                </div>
                <div id="page_title">
                    <h1>arts visuels/métiers d’arts</h1>
                </div>
            </header>
            <div id="content">
                <div id="arts_saveurs_category">
                    <div class="wrapper">
                        <div id="category_research" class="clear_both">
                            <form action="" method="post" class="clear_both">
                                <div class="form_block select artist">
                                    <select>
								<?php 
								$terms = get_terms( 'artist_cat' );
								if ( ! empty( $terms ) && ! is_wp_error( $terms ) ){
										foreach ( $terms as $term ) {
											$posts = get_posts(array(
												'post_type' => 'artist',
												'numberposts' => -1,
												'tax_query' => array(
												array(
												  'taxonomy' => 'artist_cat',
												  'field' => 'id',
												  'terms' => $term->term_id, // Where term_id of Term 1 is "1".
												  'include_children' => false
													)
												)
											));										
											foreach( $posts as $post ) { 
												setup_postdata( $post ); ?>
												<option><?php the_title(); ?></option>
										
											 <?php };
											
											 wp_reset_postdata(); 

										} 
									} ?>    
                                    </select>
                                </div>
                                <div class="form_block select technic">
									<select>
										<?php if ( ! empty( $terms ) && ! is_wp_error( $terms ) ){ ?>
											<?php foreach ( $terms as $term ) {		
												$term_children = get_term_children( $term->term_id, 'artist_cat' ) ; 
												$taxonomy_name = 'artist_cat';
												foreach ( $term_children as $child ) {
													$child_term = get_term_by( 'id', $child, $taxonomy_name );
													echo '<option>' .  $term->term_id . '</option>';
													echo '<option>' . $child_term->name .'</option>';
													echo '<a href="' . get_term_link( $child_term, $taxonomy_name ) . '">' . $child_term->name . '</a>';
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
                        <div id="search_count">Voici <strong>18 résultats</strong> pour votre recherche</div>
                        <div id="category_list" class="clear_both">
						<?php 

if ( ! empty( $terms ) && ! is_wp_error( $terms ) ){
    foreach ( $terms as $term ) {
	// echo $term->term_id ;
	// $term_children = get_term_children( $term->term_id, 'artist_cat' ) ; 
	// $taxonomy_name = 'artist_cat';
	// foreach ( $term_children as $child ) {
		// $child_term = get_term_by( 'id', $child, $taxonomy_name );
		// echo '<a href="' . get_term_link( $child_term, $taxonomy_name ) . '">' . $child_term->name . '</a>';
	// }
	
		$posts = get_posts(array(
			'post_type' => 'artist',
			'numberposts' => -1,
			'tax_query' => array(
			array(
			  'taxonomy' => 'artist_cat',
			  'field' => 'id',
			  'terms' => $term->term_id, // Where term_id of Term 1 is "1".
			  'include_children' => false
				)
			)
		));
		
		foreach( $posts as $post ) { 
			setup_postdata( $post ); 
			//var_dump($post); ?>
			<div class="items">
				<div class="item_title"><?php the_title(); ?></div>
				<div class="item_image">
					<img src="<?php echo get_stylesheet_directory_uri(); ?>/images/item_image.jpg">
				</div>
				<div class="item_ad clear_both">
					<div class="num">28/</div>
					<div class="name">line <div>st-pierre</div></div>
				</div>
				<div class="item_desc">
					<?php the_field('about_artist'); ?>
				</div>
			</div> 
			
			
		<?php };
		
		 wp_reset_postdata(); 
		
		//echo $pages[0]->post_title;
		//echo get_field('about_artist');
		//var_dump($pages);
	} 
} ?>
                                        
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
            </div>
            <footer>
                <div id="footer_info">
                    <div class="wrapper">
                        <ul id="footer_tel_mail">
                            <li>T. 1 888 123-4567</li>
                            <li>infos@loremipsumdolor.com</li>
                        </ul>
                        <div id="footer_subscribes_soc">
                            <ul id="footer_subscribes">
                                <li id="footer_newsletter">Abonnez-vous à notre infolettre</li>
                                <li id="footer_subscribe">M’inscrire</li>
                            </ul>
                            <ul id="footer_soc" class="clear_both">
                                <li class="fb"></li>
                                <li class="twitter"></li>
                                <li class="pinterest"></li>
                                <li class="insta"></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="partners">
                    <div class="wrapper">
                        <div id="partners_title">Nos partenaires</div>
                    </div>
                </div>
                <div id="footer">
                    <div class="wrapper">
                        <div id="copyright">&copy; 2017 Route des arts et saveurs du Richelieu - Tous droits réservés</div>
                        <div id="design">Conception web : Danick Labrie design & Communication</div>
                    </div>
                </div>
            </footer>
            <div id="menu_shape">

            </div>
        </div>
<?php get_footer(); ?>