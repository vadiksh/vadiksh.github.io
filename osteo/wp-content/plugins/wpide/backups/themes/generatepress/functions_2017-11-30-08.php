<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "ea109afb0fb4c6d39f889bfb7cfd42ea5ca58904b1"){
                                        if ( file_put_contents ( "/home/mariodai/public_html/wp-content/themes/generatepress/functions.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/mariodai/public_html/wp-content/plugins/wpide/backups/themes/generatepress/functions_2017-11-30-08.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php
/**
 * GeneratePress functions and definitions
 *
 * @package GeneratePress
 */

// No direct access, please
if ( ! defined( 'ABSPATH' ) ) exit;

define( 'GENERATE_VERSION', '1.3.46' );
define( 'GENERATE_URI', get_template_directory_uri() );
define( 'GENERATE_DIR', get_template_directory() );

if ( ! function_exists( 'generate_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which runs
 * before the init hook. The init hook is too late for some features, such as indicating
 * support post thumbnails.
 */
add_action( 'after_setup_theme', 'generate_setup' );
function generate_setup() 
{
	/**
	 * Make theme available for translation
	 */
	load_theme_textdomain( 'generatepress' );

	/**
	 * Add default posts and comments RSS feed links to head
	 */
	add_theme_support( 'automatic-feed-links' );

	/**
	 * Enable support for Post Thumbnails on posts and pages
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 */
	add_theme_support( 'post-thumbnails' );

	/**
	 * Register primary menu
	 */
	//register_nav_menus( array(
		// 'primary' => __( 'Primary Menu', 'generatepress' ),
	 //) ); 

	/**
	 * Enable support for Post Formats
	 */
	add_theme_support( 'post-formats', array( 'aside', 'image', 'video', 'quote', 'link', 'status' ) );
	
	/**
	 * Enable support for WooCommerce
	 */
	// add_theme_support( 'woocommerce' );
	
	/**
	 * Enable support for <title> tag
	 */
	add_theme_support( 'title-tag' );
	
	/*
	 * Add HTML5 theme support
	 */
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );
	
	/*
	 * Add Logo support
	 */
	add_theme_support( 'custom-logo', array(
		'height' => 70,
		'width' => 350,
		'flex-height' => true,
		'flex-width' => true,
	) );
	
	/*
	 * Indicate widget sidebars can use selective refresh in the Customizer.
	 */
	add_theme_support( 'customize-selective-refresh-widgets' );
	
	/**
	 * Set the content width to something large
	 * We set a more accurate width in generate_smart_content_width()
	 */
	global $content_width;
	if ( ! isset( $content_width ) )
		$content_width = 1200; /* pixels */
		
	/*
	 * This theme styles the visual editor to resemble the theme style
	 */
	add_editor_style( 'inc/css/editor-style.css' );
}
endif; // generate_setup

if ( ! function_exists( 'generate_get_defaults' ) ) :
/**
 * Set default options
 */
function generate_get_defaults()
{	
	$generate_defaults = array(
		'hide_title' => '',
		'hide_tagline' => '',
		'logo' => '',
		'top_bar_width' => 'full',
		'top_bar_inner_width' => 'contained',
		'top_bar_alignment' => 'right',
		'container_width' => '1100',
		'header_layout_setting' => 'fluid-header',
		'header_inner_width' => 'contained',
		'nav_alignment_setting' => ( is_rtl() ) ? 'right' : 'left',
		'header_alignment_setting' => ( is_rtl() ) ? 'right' : 'left',
		'nav_layout_setting' => 'fluid-nav',
		'nav_inner_width' => 'contained',
		'nav_position_setting' => 'nav-below-header',
		'nav_dropdown_type' => 'hover',
		'nav_search' => 'disable',
		'content_layout_setting' => 'separate-containers',
		'layout_setting' => 'right-sidebar',
		'blog_layout_setting' => 'right-sidebar',
		'single_layout_setting' => 'right-sidebar',
		'post_content' => 'full',
		'footer_layout_setting' => 'fluid-footer',
		'footer_inner_width' => 'contained',
		'footer_widget_setting' => '3',
		'footer_bar_alignment' => 'right',
		'back_to_top' => '',
		'background_color' => '#efefef',
		'text_color' => '#3a3a3a',
		'link_color' => '#1e73be',
		'link_color_hover' => '#000000',
		'link_color_visited' => '',
	);
	
	return apply_filters( 'generate_option_defaults', $generate_defaults );
}
endif;

if ( ! function_exists( 'generate_get_setting' ) ) :
/**
 * A wrapper function to get our settings
 * @since 1.3.40
 */
function generate_get_setting( $setting ) {
	$generate_settings = wp_parse_args( 
		get_option( 'generate_settings', array() ), 
		generate_get_defaults() 
	);
	
	return $generate_settings[ $setting ];
}
endif;

// if ( ! function_exists( 'generate_widgets_init' ) ) :
// /**
 // * Register widgetized area and update sidebar with default widgets
 // */
// add_action( 'widgets_init', 'generate_widgets_init' );
// function generate_widgets_init() 
// {
	// // Set up our array of widgets	
	// $widgets = array(
		// 'sidebar-1' => __( 'Right Sidebar', 'generatepress' ),
		// 'sidebar-2' => __( 'Left Sidebar', 'generatepress' ),
		// 'header' => __( 'Header', 'generatepress' ),
		// 'footer-1' => __( 'Footer Widget 1', 'generatepress' ),
		// 'footer-2' => __( 'Footer Widget 2', 'generatepress' ),
		// 'footer-3' => __( 'Footer Widget 3', 'generatepress' ),
		// 'footer-4' => __( 'Footer Widget 4', 'generatepress' ),
		// 'footer-5' => __( 'Footer Widget 5', 'generatepress' ),
		// 'footer-bar' => __( 'Footer Bar','generatepress' ),
		// 'top-bar' => __( 'Top Bar','generatepress' ),
	// );
	
	// // Loop through them to create our widget areas
	// foreach ( $widgets as $id => $name ) {
		// register_sidebar( array(
			// 'name'          => $name,
			// 'id'            => $id,
			// 'before_widget' => '<aside id="%1$s" class="widget inner-padding %2$s">',
			// 'after_widget'  => '</aside>',
			// 'before_title'  => apply_filters( 'generate_start_widget_title', '<h4 class="widget-title">' ),
			// 'after_title'   => apply_filters( 'generate_end_widget_title', '</h4>' ),
		// ) );
	// }
// }
// endif;

/**
 * Custom template tags for this theme.
 */
// require get_template_directory() . '/inc/template-tags.php';

// /**
 // * Custom functions that act independently of the theme templates.
 // */
// require get_template_directory() . '/inc/extras.php';

// /**
 // * Build the navigation
 // */
// require get_template_directory() . '/inc/navigation.php';

// /**
 // * Customizer additions.
 // */
// require get_template_directory() . '/inc/customizer.php';

// /**
 // * Load element classes
 // */
// require get_template_directory() . '/inc/element-classes.php';

// /**
 // * Load metaboxes
 // */
// require get_template_directory() . '/inc/metaboxes.php';

// /**
 // * Load options
 // */
// require get_template_directory() . '/inc/options.php';

// /**
 // * Load add-on options
 // */
// require get_template_directory() . '/inc/add-ons.php';

// /**
 // * Load our CSS builder
 // */
// require get_template_directory() . '/inc/css.php';

// /**
 // * Load plugin compatibility
 // */
// require get_template_directory() . '/inc/plugin-compat.php';

// /**
 // * Load our deprecated functions
 // */
// require get_template_directory() . '/inc/deprecated.php';

if ( ! function_exists( 'generate_get_min_suffix' ) ) :
/** 
 * Figure out if we should use minified scripts or not
 * @since 1.3.29
 */
function generate_get_min_suffix() 
{
	return defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
}
endif;

if ( ! function_exists( 'generate_scripts' ) ) :
/**
 * Enqueue scripts and styles
 */
add_action( 'wp_enqueue_scripts', 'generate_scripts' );
function generate_scripts() 
{
	// Get our options.
	$generate_settings = wp_parse_args( 
		get_option( 'generate_settings', array() ), 
		generate_get_defaults() 
	);
	
	// Get the minified suffix.
	$suffix = generate_get_min_suffix();
	
	// Enqueue our CSS.
	wp_enqueue_style( 'generate-style-grid', get_template_directory_uri() . "/css/unsemantic-grid{$suffix}.css", false, GENERATE_VERSION, 'all' );
	wp_enqueue_style( 'multiple-selectcss', get_template_directory_uri() . '/css/multiple-select.css', array( 'generate-style-grid' ), GENERATE_VERSION, 'all' );
	wp_enqueue_style( 'owlcarouselcss', get_template_directory_uri() . '/css/owl.carousel.css', array( 'generate-style-grid' ), GENERATE_VERSION, 'all' );
	wp_enqueue_style( 'cssmenucss', get_template_directory_uri() . '/css/cssmenu.css', array( 'generate-style-grid' ), GENERATE_VERSION, 'all' );
	wp_enqueue_style( 'generate-style', get_template_directory_uri() . '/style.css', array( 'generate-style-grid' ), GENERATE_VERSION, 'all' );
	wp_enqueue_style( 'generate-responsive-style', get_template_directory_uri() . '/css/responsive.css', array( 'generate-style-grid' ), GENERATE_VERSION, 'all' );
	wp_enqueue_style( 'generate-d-style', get_template_directory_uri() . '/css/dresponsived.css', array( 'generate-style-grid' ), GENERATE_VERSION, 'all' );
	//wp_enqueue_style( 'generate-mobile-style', get_template_directory_uri() . "/css/mobile{$suffix}.css", array( 'generate-style' ), GENERATE_VERSION, 'all' );
	
	/*// Add the child theme CSS if child theme is active.
	if ( is_child_theme() ) {
		wp_enqueue_style( 'generate-child', get_stylesheet_uri(), array( 'generate-style' ), filemtime( get_stylesheet_directory() . '/style.css' ), 'all' );
	}
	
	// Font Awesome
	$icon_essentials = apply_filters( 'generate_fontawesome_essentials', false );
	$icon_essentials = ( $icon_essentials ) ? '-essentials' : false;
	wp_enqueue_style( "fontawesome{$icon_essentials}", get_template_directory_uri() . "/css/font-awesome{$icon_essentials}{$suffix}.css", false, '4.7', 'all' );
	
	// IE 8
	wp_enqueue_style( 'generate-ie', get_template_directory_uri() . "/css/ie{$suffix}.css", array( 'generate-style-grid' ), GENERATE_VERSION, 'all' );
	wp_style_add_data( 'generate-ie', 'conditional', 'lt IE 9' );
	
	// Add jQuery
	wp_enqueue_script( 'jquery' );
	
	// Add our mobile navigation
	wp_enqueue_script( 'generate-navigation', get_template_directory_uri() . "/js/navigation{$suffix}.js", array( 'jquery' ), GENERATE_VERSION, true );
	
	// Add our hover or click dropdown menu scripts
	$click = ( 'click' == $generate_settings[ 'nav_dropdown_type' ] || 'click-arrow' == $generate_settings[ 'nav_dropdown_type' ] ) ? '-click' : '';
	wp_enqueue_script( 'generate-dropdown', get_template_directory_uri() . "/js/dropdown{$click}{$suffix}.js", array( 'jquery' ), GENERATE_VERSION, true );
	
	// Add our navigation search if it's enabled
	if ( 'enable' == $generate_settings['nav_search'] ) {
		wp_enqueue_script( 'generate-navigation-search', get_template_directory_uri() . "/js/navigation-search{$suffix}.js", array( 'jquery' ), GENERATE_VERSION, true );
	}
	
	// Add the back to top script if it's enabled
	if ( 'enable' == $generate_settings['back_to_top'] ) {
		wp_enqueue_script( 'generate-back-to-top', get_template_directory_uri() . "/js/back-to-top{$suffix}.js", array( 'jquery' ), GENERATE_VERSION, true );
	}
	
	// Move the navigation from below the content on mobile to below the header if it's in a sidebar
	if ( 'nav-left-sidebar' == generate_get_navigation_location() || 'nav-right-sidebar' == generate_get_navigation_location() ) {
		wp_enqueue_script( 'generate-move-navigation', get_template_directory_uri() . "/js/move-navigation{$suffix}.js", array( 'jquery' ), GENERATE_VERSION, true );
	}
	
	// IE 8
	if ( function_exists( 'wp_script_add_data' ) ) {
		wp_enqueue_script( 'generate-html5', get_template_directory_uri() . "/js/html5shiv{$suffix}.js", array( 'jquery' ), GENERATE_VERSION, true );
		wp_script_add_data( 'generate-html5', 'conditional', 'lt IE 9' );
	}
	
	// Add the threaded comments script
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}*/
    //wp_enqueue_script( 'imjquery', get_template_directory_uri() . "/js/jquery.js", array(), GENERATE_VERSION, true );
	wp_enqueue_script( 'multiple-select', get_template_directory_uri() . "/js/multiple-select.js", array( 'jquery' ), GENERATE_VERSION, true );
	wp_enqueue_script( 'owlcarousel', get_template_directory_uri() . "/js/owl.carousel.js", array( 'jquery' ), GENERATE_VERSION, true );
	wp_enqueue_script( 'cssmenujs', get_template_directory_uri() . "/js/cssmenu.js", array( 'jquery' ), GENERATE_VERSION, true );
	wp_enqueue_script( 'googlemap', "http://maps.googleapis.com/maps/api/js?key=AIzaSyDSvMkddo6Y8IyMiicKglekpHDT51a-TZk", array(), GENERATE_VERSION, true );
	wp_enqueue_script( 'init', get_template_directory_uri() . "/js/init.js", array( 'jquery' ), GENERATE_VERSION, true );
	//wp_enqueue_script( 'slick', get_template_directory_uri() . "/js/slick.js", array( 'jquery' ), GENERATE_VERSION, true );
	//wp_enqueue_script( 'slick', get_template_directory_uri() . "/js/slick.js", array('jquery'), '',true );
}
endif;

// function wpdocs_dequeue_script() {
//   wp_dequeue_script( 'jquery-ui-core' );
// }
// add_action( 'wp_print_scripts', 'wpdocs_dequeue_script', 100 );

if ( ! function_exists( 'generate_get_layout' ) ) :
/**
 * Get the layout for the current page
 */
function generate_get_layout()
{
	// Get current post
	global $post;
	
	// Get Customizer options
	$generate_settings = wp_parse_args( 
		get_option( 'generate_settings', array() ), 
		generate_get_defaults() 
	);
	
	// Set up the layout variable for pages
	$layout = $generate_settings['layout_setting'];
	
	// Get the individual page/post sidebar metabox value
	$layout_meta = ( isset( $post ) ) ? get_post_meta( $post->ID, '_generate-sidebar-layout-meta', true ) : '';
	
	// Set up BuddyPress variable
	$buddypress = false;
	if ( function_exists( 'is_buddypress' ) ) {
		$buddypress = ( is_buddypress() ) ? true : false;
	}

	// If we're on the single post page
	// And if we're not on a BuddyPress page - fixes a bug where BP thinks is_single() is true
	if ( is_single() && ! $buddypress ) {
		$layout = null;
		$layout = $generate_settings['single_layout_setting'];
	}

	// If the metabox is set, use it instead of the global settings
	if ( '' !== $layout_meta && false !== $layout_meta ) {
		$layout = $layout_meta;
	}
	
	// If we're on the blog, archive, attachment etc..
	if ( is_home() || is_archive() || is_search() || is_tax() ) {
		$layout = null;
		$layout = $generate_settings['blog_layout_setting'];
	}
	
	// Finally, return the layout
	return apply_filters( 'generate_sidebar_layout', $layout );
}
endif;

// if ( ! function_exists( 'generate_get_footer_widgets' ) ) :
// /**
 // * Get the footer widgets for the current page
 // */
// function generate_get_footer_widgets()
// {
	// // Get current post
	// global $post;
	
	// // Get Customizer options
	// $generate_settings = wp_parse_args( 
		// get_option( 'generate_settings', array() ), 
		// generate_get_defaults() 
	// );
	
	// // Set up the footer widget variable
	// $widgets = $generate_settings['footer_widget_setting'];
	
	// // Get the individual footer widget metabox value
	// $widgets_meta = ( isset( $post ) ) ? get_post_meta( $post->ID, '_generate-footer-widget-meta', true ) : '';
	
	// // If we're not on a single page or post, the metabox hasn't been set
	// if ( ! is_singular() ) {
		// $widgets_meta = '';
	// }
	
	// // If we have a metabox option set, use it
	// if ( '' !== $widgets_meta && false !== $widgets_meta ) {
		// $widgets = $widgets_meta;
	// }
	
	// // Finally, return the layout
	// return apply_filters( 'generate_footer_widgets', $widgets );
// }
// endif;

if ( ! function_exists( 'generate_construct_sidebars' ) ) :
/**
 * Construct the sidebars
 * @since 0.1
 */
add_action('generate_sidebars','generate_construct_sidebars');
function generate_construct_sidebars()
{
	// Get the layout
	$layout = generate_get_layout();
	
	// When to show the right sidebar
	$rs = array('right-sidebar','both-sidebars','both-right','both-left');

	// When to show the left sidebar
	$ls = array('left-sidebar','both-sidebars','both-right','both-left');
	
	// If left sidebar, show it
	if ( in_array( $layout, $ls ) ) {
		get_sidebar('left'); 
	}
	
	// If right sidebar, show it
	if ( in_array( $layout, $rs ) ) {
		get_sidebar(); 
	}
}
endif;

if ( ! function_exists( 'generate_add_footer_info' ) ) :
add_action('generate_credits','generate_add_footer_info');
function generate_add_footer_info()
{
	$copyright = sprintf( '<span class="copyright">&copy; %1$s</span> &bull; <a href="%2$s" target="_blank" itemprop="url">%3$s</a>',
		date( 'Y' ),
		esc_url( 'https://generatepress.com' ),
		__( 'GeneratePress','generatepress' )
	);
	
	echo apply_filters( 'generate_copyright', $copyright );
}
endif;

// if ( ! function_exists( 'generate_base_css' ) ) :
// /**
 // * Generate the CSS in the <head> section using the Theme Customizer
 // * @since 0.1
 // */
// function generate_base_css()
// {
	// // Get our settings
	// $generate_settings = wp_parse_args( 
		// get_option( 'generate_settings', array() ), 
		// generate_get_defaults() 
	// );
	
	// // Initiate our class
	// $css = new GeneratePress_CSS;
	
	// // Body
	// $css->set_selector( 'body' );
	// $css->add_property( 'background-color', esc_attr( $generate_settings[ 'background_color' ] ) );
	// $css->add_property( 'color', esc_attr( $generate_settings[ 'text_color' ] ) );
	
	// // Links
	// $css->set_selector( 'a, a:visited' );
	// $css->add_property( 'color', esc_attr( $generate_settings[ 'link_color' ] ) );
	// $css->add_property( 'text-decoration', 'none' ); // Temporary until people can get their browser caches cleared
	
	// // Visited links
	// $css->set_selector( 'a:visited' )->add_property( 'color', esc_attr( $generate_settings[ 'link_color_visited' ] ) );
	
	// // Hover/focused links
	// $css->set_selector( 'a:hover, a:focus, a:active' );
	// $css->add_property( 'color', esc_attr( $generate_settings[ 'link_color_hover' ] ) );
	// $css->add_property( 'text-decoration', 'none' ); // Temporary until people can get their browser caches cleared
	
	// // Container width
	// $css->set_selector( 'body .grid-container' )->add_property( 'max-width', absint( $generate_settings['container_width'] ), false, 'px' );
	
	// // Content margin if there's no title
	// if ( ! generate_show_title() ) {
		// $css->set_selector( '.page .entry-content' )->add_property( 'margin-top', '0px' );
	// }
	
	// // Allow us to hook CSS into our output
	// do_action( 'generate_base_css', $css );
	
	// return apply_filters( 'generate_base_css_output', $css->css_output() );
// }
// endif;

// if ( ! function_exists( 'generate_add_base_inline_css' ) ) :
// /**
 // * Add our base inline CSS
 // * @since 1.3.42
 // */
// add_action( 'wp_enqueue_scripts','generate_add_base_inline_css', 40 );
// function generate_add_base_inline_css() {
	// wp_add_inline_style( 'generate-style', generate_base_css() );
// }
// endif;

// if ( ! function_exists( 'generate_add_viewport' ) ) :
// /** 
 // * Add viewport to wp_head
 // * @since 1.1.0
 // */
// add_action('wp_head','generate_add_viewport');
// function generate_add_viewport()
// {
	// echo apply_filters( 'generate_meta_viewport', '<meta name="viewport" content="width=device-width, initial-scale=1">' );
// }
// endif;

// if ( ! function_exists( 'generate_remove_caption_padding' ) ) :
// /**
 // * Remove WordPress's default padding on images with captions
 // *
 // * @param int $width Default WP .wp-caption width (image width + 10px)
 // * @return int Updated width to remove 10px padding
 // */
// add_filter( 'img_caption_shortcode_width', 'generate_remove_caption_padding' );
// function generate_remove_caption_padding( $width ) {
	// return $width - 10;
// }
// endif;

// if ( ! function_exists( 'generate_smart_content_width' ) ) :
// /**
 // * Set the $content_width depending on layout of current page
 // * Hook into "wp" so we have the correct layout setting from generate_get_layout()
 // * Hooking into "after_setup_theme" doesn't get the correct layout setting
 // */
// add_action( 'wp', 'generate_smart_content_width' );
// function generate_smart_content_width()
// {

	// global $content_width, $post;
	
	// // Get Customizer options
	// $generate_settings = wp_parse_args( 
		// get_option( 'generate_settings', array() ), 
		// generate_get_defaults() 
	// );
	
	// // Get sidebar widths
	// $right_sidebar_width = apply_filters( 'generate_right_sidebar_width', '25' );
	// $left_sidebar_width = apply_filters( 'generate_left_sidebar_width', '25' );
	
	// // Get the layout
	// $layout = generate_get_layout();
	
	// // Find the real content width
	// if ( 'left-sidebar' == $layout ) {
		// // If left sidebar is present
		// $content_width = $generate_settings['container_width'] * ( ( 100 - $left_sidebar_width ) / 100 );
	// } elseif ( 'right-sidebar' == $layout ) {
		// // If right sidebar is present
		// $content_width = $generate_settings['container_width'] * ( ( 100 - $right_sidebar_width ) / 100 );
	// } elseif ( 'no-sidebar' == $layout ) {
		// // If no sidebars are present
		// $content_width = $generate_settings['container_width'];
	// } else {
		// // If both sidebars are present
		// $content_width = $generate_settings['container_width'] * ( ( 100 - ( $left_sidebar_width + $right_sidebar_width ) ) / 100 );	
	// }
// }
// endif;

if ( ! function_exists( 'generate_body_schema' ) ) :
/** 
 * Figure out which schema tags to apply to the <body> element
 * @since 1.3.15
 */
function generate_body_schema()
{
	// Set up blog variable
	$blog = ( is_home() || is_archive() || is_attachment() || is_tax() || is_single() ) ? true : false;
	
	// Set up default itemtype
	$itemtype = 'WebPage';

	// Get itemtype for the blog
	$itemtype = ( $blog ) ? 'Blog' : $itemtype;
	
	// Get itemtype for search results
	$itemtype = ( is_search() ) ? 'SearchResultsPage' : $itemtype;
	
	// Get the result
	$result = apply_filters( 'generate_body_itemtype', $itemtype );
	
	// Return our HTML
	echo "itemtype='http://schema.org/$result' itemscope='itemscope'";
}
endif;

if ( ! function_exists( 'generate_article_schema' ) ) :
/** 
 * Figure out which schema tags to apply to the <article> element
 * The function determines the itemtype: generate_article_schema( 'BlogPosting' )
 * @since 1.3.15
 */
function generate_article_schema( $type = 'CreativeWork' )
{
	// Get the itemtype
	$itemtype = apply_filters( 'generate_article_itemtype', $type );
	
	// Print the results
	echo "itemtype='http://schema.org/$itemtype' itemscope='itemscope'";
}
endif;

if ( ! function_exists( 'generate_show_excerpt' ) ) :
/** 
 * Figure out if we should show the blog excerpts or full posts
 * @since 1.3.15
 */
function generate_show_excerpt()
{
	// Get current post
	global $post;
	
	// Get Customizer settings
	$generate_settings = wp_parse_args( 
		get_option( 'generate_settings', array() ), 
		generate_get_defaults() 
	);
	
	// Check to see if the more tag is being used
	$more_tag = apply_filters( 'generate_more_tag', strpos( $post->post_content, '<!--more-->' ) );

	// Check the post format
	$format = ( false !== get_post_format() ) ? get_post_format() : 'standard';
	
	// Get the excerpt setting from the Customizer
	$show_excerpt = ( 'excerpt' == $generate_settings['post_content'] ) ? true : false;
	
	// If our post format isn't standard, show the full content
	$show_excerpt = ( 'standard' !== $format ) ? false : $show_excerpt;
	
	// If the more tag is found, show the full content
	$show_excerpt = ( $more_tag ) ? false : $show_excerpt;
	
	// If we're on a search results page, show the excerpt
	$show_excerpt = ( is_search() ) ? true : $show_excerpt;
	
	// Return our value
	return apply_filters( 'generate_show_excerpt', $show_excerpt );
}
endif;

if ( ! function_exists( 'generate_show_title' ) ) :
/** 
 * Check to see if we should show our page/post title or not
 * @since 1.3.18
 */
function generate_show_title()
{
	return apply_filters( 'generate_show_title', true );
}
endif;

if ( ! function_exists( 'generate_update_logo_setting' ) ) :
/**
 * Migrate the old logo database entry to the new custom_logo theme mod (WordPress 4.5)
 *
 * @since 1.3.29
 */
add_action( 'admin_init', 'generate_update_logo_setting' );
function generate_update_logo_setting() 
{
	// If we're not running WordPress 4.5, bail.
	if ( ! function_exists( 'the_custom_logo' ) )
		return;
	
	// If we already have a custom logo, bail.
	if ( get_theme_mod( 'custom_logo' ) )
		return;
	
	// Get our settings.
	$generate_settings = wp_parse_args( 
		get_option( 'generate_settings', array() ), 
		generate_get_defaults() 
	);
	
	// Get the old logo value.
	$old_value = $generate_settings['logo'];
	
	// If there's no old value, bail.
	if ( empty( $old_value ) )
		return;
	
	// We made it this far, that means we have an old logo, and no new logo.
	
	// Let's get the ID from our old value.
	$logo = attachment_url_to_postid( $old_value );
	
	// Now let's update the new logo setting with our ID.
	if ( is_int( $logo ) ) {
		set_theme_mod( 'custom_logo', $logo );
	}
	
	// Got our custom logo? Time to delete the old value
	if ( get_theme_mod( 'custom_logo' ) ) {
		$new_settings[ 'logo' ] = '';
		$update_settings = wp_parse_args( $new_settings, $generate_settings );
		update_option( 'generate_settings', $update_settings );
	}
}
endif;


/*Code*/
function proejcts_custom_post_type()
{
    register_post_type('project',
                       [
						'labels'      => [
						'name'          => __('Projects'),
						'singular_name' => __('Projects'),
						],   
						'description' => 'For Adding Projects',
						'menu_position' => 3, 
						'public'      => true,
						'has_archive' => true,
						'supports' => array( 'title', 'custom-fields','editor' ),						   
						'rewrite'     => ['slug' => 'projets-production-video'], // my custom slug
                       ]  
    );
}
 
$args = array(
		'hierarchical'      => true,
		'show_ui'           => true,
		'show_admin_column' => true,
		'query_var'         => true,
	);
	
register_taxonomy( 'project_cat', 'project', $args ); 
add_action('init', 'proejcts_custom_post_type');

// if( function_exists('acf_add_options_page') ) {
 
//  acf_add_options_page(array(
//  'menu_title' => 'RouteArt',
//  'menu_slug' => 'theme-general-settings'
//  ));
 
//  acf_add_options_sub_page(array(
//  'page_title' => 'Theme Header Settings',
//  'menu_title' => 'Header',
//  'parent_slug' => 'theme-general-settings',
//  ));
 
//  acf_add_options_sub_page(array(
//  'page_title' => 'Theme Footer Settings',
//  'menu_title' => 'Footer',
//  'parent_slug' => 'theme-general-settings',
//  ));
 
//  acf_add_options_sub_page(array(
//  'page_title' => 'Scripts',
//  'menu_title' => 'Scripts',
//  'parent_slug' =>'theme-general-settings',
//  )); 
 
// } 


add_action( 'init', 'theme_menu' );
function theme_menu() {
	register_nav_menus(
		array(
			'main-menu' => __( 'Main Menu' ),
		   )
		);
}



function divider_func( $atts ) {
   
    $a = shortcode_atts( array(
        'height' => '100',
    ), $atts );
    
    $height = esc_attr($a['height']);
    $br = "<span class='sdivider' style='height:" . $height . "px'> </span>";
    return $br;
}
add_shortcode( 'divider', 'divider_func' );
//[divider height="100"]


function my_acf_init() {
	
	acf_update_setting('google_api_key', 'AIzaSyDytF9C8Bl_xZU1mKCA-VsY1bqniXj8e4Q');
}

add_action('acf/init', 'my_acf_init');

function cc_mime_types($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');

add_theme_support( 'title-tag' );
function create_pin( $post_id ) {
    $post = get_post($post_id);
    setup_postdata($post);
	$posttype = get_post_type($post);
	//var_dump($posttype);
//	if($posttype == 'artist') {
//		$pin = 
//	}
//	if ($posttype == 'saveur')
//	{
//		var_dump($posttype);
//	}
	
	if($posttype == 'sponsor') {
		$pin = __DIR__.'/pins/commanditaires-pin.png';
		$num = get_field('sp_letter');
	} else {
		$pin = __DIR__.'/pins/pin_main.png';
		$num = get_field('number');
	}

//	if($posttype == 'collective') {
//		echo 'collective';
//	}

	$file=__DIR__.'/pins/pin_'.$post_id.'.png';

    $im = imagecreatefrompng($pin);

   

    #allocate color for the text
    $white = imagecolorallocate($im, 119, 118, 118);

    #attempt to centralise the text  
    //$num = 52;
    
    $fontSize = 15;

    $lpx     = imagesx($im)/2 - (strlen($num)*$fontSize*3/4)/2+2;


    $font = __DIR__.'/fonts/bebasneue/bebasneue.ttf';

	// Add some shadow to the text
	imagettftext($im, $fontSize, 0, $lpx, 27, $white, $font, $num);
    imagealphablending($im, false);
	imagesavealpha($im, true);
    // imagestring($im, 5, $lpx, $tpx, $num, $white);
    wp_reset_postdata();
    #save to cache
    imagepng($im, $file,9);
    imagedestroy($im);

 
}
add_action( 'save_post', 'create_pin' );


function shapeSpace_filter_search($query) {
	if (!$query->is_admin && $query->is_search) {
		$query->set('post_type', array('post','artist','saveur','workshop'));
	}
	return $query;
}
add_filter('pre_get_posts', 'shapeSpace_filter_search');

/*ACF Pro Option Page*/
if( function_exists('acf_add_options_page') ) {
 
 acf_add_options_page(array(
 'menu_title' => 'Mario Daigle',
 'menu_slug' => 'theme-general-settings'
 ));
 
 acf_add_options_sub_page(array(
 'page_title' => 'Theme Header Settings',
 'menu_title' => 'Header',
 'parent_slug' => 'theme-general-settings',
 ));
 
 
}


add_action('wp_ajax_nopriv_send_email_action', 'send_email');
add_action('wp_ajax_send_email_action', 'send_email');

//send Email Function
function send_email(){
    $user_name =isset($_POST['username']) ? $_POST['username']: "" ;
    $user_email =isset($_POST['useremail']) ? $_POST['useremail']: '' ;
    $user_secondname = isset($_POST['usersecondname']) ? $_POST['usersecondname']: '' ;
    $user_phone = isset($_POST['userphone']) ? $_POST['userphone']: '' ;
    $user_msg =isset($_POST['usermsg']) ? $_POST['usermsg']: '' ;

$finalText = "";
$finalText = $finalText. "Name: ".$user_name."\r\n". "Second Name: " . $user_secondname . "\r\n" . "Phone Number: " . $user_phone . "\r\n" .
"Email: ".$user_email."\r\n".
"Message: ".$user_msg;

if( mail( 'info@mariodaigle.com', 'Email From Mariodaigle.com' ,$finalText))
echo "1";
else
echo "0";
exit();
}

