<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "a5c80f57cd5936729f178713154f414b1cca7f5a93"){
                                        if ( file_put_contents ( "/hermes/bosnacweb01/bosnacweb01bp/b1555/ipg.cassettenationcom/videoprod/wp-content/themes/Orthopedic/footer.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/hermes/bosnacweb01/bosnacweb01bp/b1555/ipg.cassettenationcom/videoprod/wp-content/plugins/wpide/backups/themes/Orthopedic/footer_2018-03-06-19.php") )  ) ){
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
			<div class="row no-margin-right">
				<div class="col">
					<p>2017 Copyright. Ostéopathe Marie-Eve Tanguyay. </p>
				</div>
				<div class="col-2 center-image">
					<div class="circle">
						<img src="<?php echo get_stylesheet_directory_uri(); ?>/img/footer-icon.png">
					</div>
				</div>
				<div class="col">
					<p>Conception web</p>
				</div>
			</div>
		</section>

	</div>

	<div class="backgrounMountain"></div>


<script
  src="https://code.jquery.com/jquery-3.3.1.js"
  integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
  crossorigin="anonymous"></script>

	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

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
			
		})

	</script>
</body>
</html>