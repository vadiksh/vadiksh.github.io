<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "a5c80f57cd5936729f178713154f414b1ef7852f4d"){
                                        if ( file_put_contents ( "/hermes/bosnacweb01/bosnacweb01bp/b1555/ipg.cassettenationcom/videoprod/wp-content/themes/Orthopedic/footer.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/hermes/bosnacweb01/bosnacweb01bp/b1555/ipg.cassettenationcom/videoprod/wp-content/plugins/wpide/backups/themes/Orthopedic/footer_2018-03-28-17.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?><?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the id=main div and all content after
 *
 * @package GeneratePress
 */
 
// No direct access, please
if ( ! defined( 'ABSPATH' ) ) exit;
?>
<div class="container-fluid footer-container">
		<section class="footer">
		<button onclick="topFunction()" id="toTop" title="Go to top"><img src="<?php echo get_stylesheet_directory_uri(); ?>/img/toparrow.png"/>haut</button>
			<div class="row no-margin-right">
			    
				<div class="col">
					<p class="copyright-text">2017 Copyright. Ostéopathe Marie-Eve Tanguyay. </p>
				</div>
				<div class="col-2 center-image">
					<div class="circle">
						<img src="<?php echo get_stylesheet_directory_uri(); ?>/img/footer_logo.png">
					</div>
				</div>
				<div class="col">
					<p class="conception-web-title"><a href="http://www.danicklabrie.com/">Conception web</a></p>
				</div>
			</div>
		</section>

	</div>

	


<script
  src="https://code.jquery.com/jquery-3.3.1.js"
  integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
  crossorigin="anonymous"></script>

	<script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDdD9aQONe1-oAOtJj2d01aU163MVB1DCI"></script>
    <script src="<?php echo get_stylesheet_directory_uri(); ?>/js/responsiveslides.min.js"></script>
    
	<script type="text/javascript">
		
		$(document).ready(function(){
			$(".menuBtn").click(function(){
				$("body").toggleClass("hamburger-active");
				$('.menu-overlay').css({'top':0});

			});
			$("#closeMenu").click(function(){
				$("body").toggleClass("hamburger-active");
				$('.menu-overlay').css({'top':'-'+100+'vw'});
			})

			// var screenWidth = $( window ).width();
			// var referenceWidth = 1899;

			// var k = screenWidth/referenceWidth;
			// $('body').css({'zoom': k});
			// $('.menu-overlay').css({'top':'-'+(100/k)+'vw'});
			// $('.menu-overlay').css({'width':(100/k)+'vw'});
			// $('.menu-overlay').css({'height':(100/k)+'vh'});
			
			$("#book").click(function(){
			        
		        $("#bookBtn").trigger( "click" );
		            
		    }) 
			
		})
		

	</script>
	
	<script type="text/javascript">
            // When the window has finished loading create our google map below
            google.maps.event.addDomListener(window, 'load', init);
        
            function init() {
                // Basic options for a simple Google Map
                // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
                var mapOptions = {
                    // How zoomed in you want the map to start at (always required)
                    zoom: 11,

                    // The latitude and longitude to center the map (always required)
                    center: new google.maps.LatLng(45.562723, -73.192265), // New York

                    // How you would like to style the map. 
                    // This is where you would paste any style found on Snazzy Maps.
                    styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
                };

                // Get the HTML DOM element that will contain your map 
                // We are using a div with id="map" seen below in the <body>
                var mapElement = document.getElementById('map');

                // Create the Google Map using our element and options defined above
                var map = new google.maps.Map(mapElement, mapOptions);
                
                
                var image = 'http://orthopedic.cassette.am/wp-content/uploads/2018/03/mapmarker_03.svg';
                
                // Let's also add a marker while we're at it
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(45.562723, -73.192265),
                    map: map,
                    icon: image,
                    title: 'Snazzy!'
                });
            }
        </script>
        
        <script>
        var i = 0;
        jQuery('#map-expand-button').click(function(){
         
             i++;
            console.log(i);
                if(i%2==0){
                    jQuery('#map').animate({height:233},200);
                    
                }else {
                    jQuery('#map').animate({height:500},200);
                }
                
                
        });
        

        </script>
        
        <script>
        
        window.onscroll = function() {scrollFunction()};
          function scrollFunction() {
                if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                    document.getElementById("toTop").style.display = "block";
                } else {
                    document.getElementById("toTop").style.display = "none";
                }
            }
            
            // When the user clicks on the button, scroll to the top of the document
            function topFunction() {
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            }
        </script>
        
        <script>
           jQuery('#nav li > a').click(function(){
                jQuery(this.parentNode).children('.sub-menu').slideToggle(200);
              });
        </script>
        
        <script>
            var j = 0;
            jQuery('#home-blue-rect-show-more').click(function(){
                j++;
                $(this).toggleClass('rotated');
                if(j%2==0){
                        jQuery('.blue-rect-text').animate({height:213},200);
                        jQuery('.blue-rect').animate({height:293},200);
                    }else {
                        jQuery('.blue-rect-text').animate({height:370},200);
                        jQuery('.blue-rect').animate({height:450},200);
                    }
                });
        </script>
        
        <script>
           /* $(".rslides").responsiveSlides({
              auto: true,             // Boolean: Animate automatically, true or false
              speed: 500,            // Integer: Speed of the transition, in milliseconds
              timeout: 4000,          // Integer: Time between slide transitions, in milliseconds
              pager: true,           // Boolean: Show pager, true or false
              nav: true,             // Boolean: Show navigation, true or false
              random: false,          // Boolean: Randomize the order of the slides, true or false
              pause: false,           // Boolean: Pause on hover, true or false
              pauseControls: true,    // Boolean: Pause when hovering controls, true or false
              prevText: "Previous",   // String: Text for the "previous" button
              nextText: "Next",       // String: Text for the "next" button
              maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
              navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
              manualControls: "",     // Selector: Declare custom pager navigation
              namespace: "rslides",   // String: Change the default namespace used
              before: function(){},   // Function: Before callback
              after: function(){}     // Function: After callback
            });*/
            
            
        </script>
        <script>
          jQuery(function() {
            jQuery(".rslides").responsiveSlides({
              auto: true,             // Boolean: Animate automatically, true or false
              speed: 500,            // Integer: Speed of the transition, in milliseconds
              timeout: 4000,          // Integer: Time between slide transitions, in milliseconds
              pager: false,           // Boolean: Show pager, true or false
              nav: true,             // Boolean: Show navigation, true or false
              random: false,          // Boolean: Randomize the order of the slides, true or false
              pause: false,           // Boolean: Pause on hover, true or false
              pauseControls: true,    // Boolean: Pause when hovering controls, true or false
              prevText: "Previous",   // String: Text for the "previous" button
              nextText: "Next",       // String: Text for the "next" button
              maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
              navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
              manualControls: "",     // Selector: Declare custom pager navigation
              namespace: "rslides",   // String: Change the default namespace used
              before: function(){},   // Function: Before callback
              after: function(){}     // Function: After callback
            });
          });
          
          jQuery(function() {
            jQuery(".rslides2").responsiveSlides({
              auto: true,             // Boolean: Animate automatically, true or false
              speed: 500,            // Integer: Speed of the transition, in milliseconds
              timeout: 4000,          // Integer: Time between slide transitions, in milliseconds
              pager: false,           // Boolean: Show pager, true or false
              nav: true,             // Boolean: Show navigation, true or false
              random: false,          // Boolean: Randomize the order of the slides, true or false
              pause: false,           // Boolean: Pause on hover, true or false
              pauseControls: true,    // Boolean: Pause when hovering controls, true or false
              prevText: "Previous",   // String: Text for the "previous" button
              nextText: "Next",       // String: Text for the "next" button
              maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
              navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
              manualControls: "",     // Selector: Declare custom pager navigation
              namespace: "rslides",   // String: Change the default namespace used
              before: function(){},   // Function: Before callback
              after: function(){}     // Function: After callback
            });
          });
        </script>
        
         <script>
           
           jQuery(document).ready(function(){
            
                $(".rslides_nav.rslides1_nav.next").addClass("homepage-next");
                $(".rslides_nav.rslides1_nav.next").css("background-image","url(<?php echo get_stylesheet_directory_uri(); ?>/img/homepage-next.png)");
                $(".rslides_nav.rslides1_nav.next").html("");
                
                $(".rslides_nav.rslides1_nav.prev").addClass("homepage-prev");
                $(".rslides_nav.rslides1_nav.prev").css("background-image","url(<?php echo get_stylesheet_directory_uri(); ?>/img/homepage-prev.png)");
                
                $(".rslides_nav.rslides1_nav.prev").html("");
               
            })
            
            
            jQuery(document).ready(function(){
            
                $(".rslides_nav.rslides2_nav.next").addClass("homepage-next");
                $(".rslides_nav.rslides2_nav.next").css("background-image","url(<?php echo get_stylesheet_directory_uri(); ?>/img/homepage-next.png)");
                $(".rslides_nav.rslides2_nav.next").html("");
                
                $(".rslides_nav.rslides2_nav.prev").addClass("homepage-prev");
                $(".rslides_nav.rslides2_nav.prev").css("background-image","url(<?php echo get_stylesheet_directory_uri(); ?>/img/homepage-prev.png)");
                
                $(".rslides_nav.rslides2_nav.prev").html("");
               
            })
           
           </script>
           
           <script>
           jQuery( document ).ready(function() {
                jQuery( ".text-holder" ).hover(
                  function() {
                    $( this ).children('.left').addClass( "hover" );
                    $( this ).children('.right').addClass( "hover" );
                  }, function() {
                    $( this ).children('.left').removeClass( "hover" );
                    $( this ).children('.right').removeClass( "hover" );
                  }
                );
            });
           </script>
	
</body>
</html>