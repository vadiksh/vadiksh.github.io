<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "51033623d1a85dba0e0fda596d1fa495d4de46db12"){
                                        if ( file_put_contents ( "/home/routeart/public_html/wp-content/themes/generatepress/plugins/elementor/my-widget.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/routeart/public_html/wp-content/plugins/wpide/backups/themes/generatepress/plugins/elementor/my-widget_2017-03-22-23.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php
namespace Elementor;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Widget_My_Custom_Elementor_Thing extends Widget_Base {

   public function get_id() {
      return 'my-blog-posts';
   }

   public function get_title() {
      return __( 'My Custom Widget', 'elementor-custom-element' );
   }
   
   public function get_name() {
      return __( 'My Custom Widget', 'elementor-custom-element' );
   }

   public function get_icon() {
      // Icon name from the Elementor font file, as per http://dtbaker.net/web-development/creating-your-own-custom-elementor-widgets/
      return 'post-list';
   }

   protected function _register_controls() {

      $this->add_control(
         'section_blog_posts',
         [
            'label' => __( 'Blog Posts', 'elementor-custom-element' ),
            'type' => Controls_Manager::SECTION,
         ]
      );

      $this->add_control(
         'some_text',
         [
            'label' => __( 'Text', 'elementor-custom-element' ),
            'type' => Controls_Manager::TEXT,
            'default' => '',
            'title' => __( 'Enter some text', 'elementor-custom-element' ),
            'section' => 'section_blog_posts',
         ]
      );

      $this->add_control(
         'posts_per_page',
         [
            'label' => __( 'Number of Posts', 'elementor-custom-element' ),
            'type' => Controls_Manager::SELECT,
            'default' => 5,
            'section' => 'section_blog_posts',
            'options' => [
               1 => __( 'One', 'elementor-custom-element' ),
               2 => __( 'Two', 'elementor-custom-element' ),
               5 => __( 'Five', 'elementor-custom-element' ),
               10 => __( 'Ten', 'elementor-custom-element' ),
            ]
         ]
      );

   }

   protected function render( $instance = [] ) {

      // get our input from the widget settings.

      $custom_text = ! empty( $instance['some_text'] ) ? $instance['some_text'] : ' (no text was entered ) ';
      $post_count = ! empty( $instance['posts_per_page'] ) ? (int)$instance['posts_per_page'] : 5;

      ?>

      <h3>My Example Elementor Widget</h3>
      <p>My text was: <?php echo esc_html( $custom_text );?> </p>
      <h3>Some Recent Posts Here:</h3>
      <ul>
         <?php
         $args = array( 'numberposts' => $post_count );
         $recent_posts = wp_get_recent_posts( $args );
         foreach( $recent_posts as $recent ){
            echo '<li><a href="' . esc_url( get_permalink( $recent["ID"] ) ). '">' .   esc_html( $recent["post_title"] ).'</a> </li> ';
         }
         wp_reset_query();
         ?>
      </ul>

      <?php

   }

   protected function content_template() {}

   public function render_plain_content( $instance = [] ) {}

}

Plugin::instance()->widgets_manager->register_widget_type( new Widget_My_Widget );
