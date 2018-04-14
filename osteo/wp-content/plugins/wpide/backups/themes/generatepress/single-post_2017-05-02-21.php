<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "5f1b740db7d13198fa0080628ebec63772e76a1045"){
                                        if ( file_put_contents ( "/home/routeart/public_html/wp-content/themes/generatepress/single-post.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/routeart/public_html/wp-content/plugins/wpide/backups/themes/generatepress/single-post_2017-05-02-21.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?> <?php get_header(); ?>
<div id="blog-detailed-page">
	<div id="blog_desc">
		<div class="wrapper">
			<div id="each_blog" class="clear_both">
				<div id="blog_image">
					<img src="<?php echo get_field('featured_image'); ?>" />
					<div id="category_desc">
						<div id="category_desc_article"><?php echo get_the_date();  ?></div>
						<div id="category_desc_title"><?php the_title(); ?></div>
					</div>
				</div>
				<div id="blog_item_description">
					<?php the_content(); ?>
				</div>
				<div id="blog_share">Partager
					<span class="share_soc clear_both">
						<a class="fb" href="https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>" onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;"></a>
						<a class="twitter" href="https://twitter.com/share?text=<?php the_title(); ?>&url=<?php the_permalink(); ?>" target="_blank"></a>
						<a class="pinterest" href="//pinterest.com/pin/create/button/?url=<?php echo get_permalink(); ?>&media=<?php echo wp_get_attachment_url( get_post_thumbnail_id() ); ?>&description=<?php the_title(); ?>"></a>
					</span>
				</div>
			</div>
		</div>
	</div>
</div>		
 <?php get_footer(); ?>