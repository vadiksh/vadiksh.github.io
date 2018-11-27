$(document).ready(function() {
	setTimeout(function() {
		$('.loader').fadeOut(300, function(){
			$('.hsocial_sec, .banner-title').addClass('tdFadeIn');
		});
	}, 300);
	
	
	var fadeElmnts = $('.navigation, .map-continents');
	var articlesHub = $('.articles-container .articles-item');

	$(window).scroll(function() {
		var scrolled = $(window).scrollTop();
		var elmntScrollTop = $('.main').offset().top;
		if(scrolled > elmntScrollTop - $(window).height() / 3) {
			fadeElmnts.addClass('tdFadeIn');
			$('.map-spots').addClass('tdFadeIn');
		}
		if (scrolled > elmntScrollTop - $(window).height() / 5) {
			articlesHub.addClass('fadeInUp');
		}


		if (scrolled > $('.banner-container').height() + 700) {
			$('.banner-container').css('opacity', 0);
		} else {
			$('.banner-container').css('opacity', 1);
		}
	});
	
	$('.map-spots-item, .navigation-item').click(function() {
	  var index = $(this).attr('continent');
	  var activeElmnts = $('.navigation-item-' + index + ', .continent-' + index + ', .spot-' + index + ', .articles-continent-' + index);

	  if (index !== $('.map-continents-item.active').attr('continent')) {
	  	fadeElmnts.removeClass('tdFadeIn').addClass('tdFadeOut');
		  articlesHub.removeClass('tdFadeInUp').addClass('tdFadeOutDown');
		  $('.spot-' + index).addClass('tdFadeOut');

		  setTimeout(function(){
		    activeElmnts.addClass('active').siblings().removeClass('active');
		    articlesHub.removeClass('tdFadeOutDown').addClass('tdFadeInUp');
		    fadeElmnts.removeClass('tdFadeOut').addClass('tdFadeIn');
		    $('.spot-' + index).removeClass('tdFadeOut');
		  }, 500);
	  }
	});

	articlesHub.mouseenter(function () {
		$(this).removeClass('tdFadeInUp movedown').addClass('moveup').css({"opacity" : 1});
	});
	articlesHub.mouseleave(function () {
		$(this).removeClass('moveup').addClass('movedown');
	});
	

	var owlIndex;
	$('.owl-carousel').on('dragged.owl.carousel', function() {
		setTimeout(function(){ 
		  owlIndex = $('.owl-item.active .articles-item')[0].attributes.continent.value; 
		  activeIndex = $('.map-continents-item.active').attr('continent');

		  if (owlIndex !== activeIndex) {
			  $('.map-continents').removeClass('tdFadeIn').addClass('tdFadeOut');
			  $('.spot-' + owlIndex).addClass('tdFadeOut');
			  setTimeout(function(){
			    $('.continent-' + owlIndex + ', .spot-' + owlIndex).addClass('active').siblings().removeClass('active');
			    
			    $('.map-continents').removeClass('tdFadeOut').addClass('tdFadeIn');
			    $('.spot-' + owlIndex).removeClass('tdFadeOut');
			  }, 300);
		  }
		},1);
	});

	var isTouchDevice = (('ontouchstart' in window)
	        || (navigator.MaxTouchPoints > 0)
	        || (navigator.msMaxTouchPoints > 0));

	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
	  || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
	  $('.banner-container').addClass('.touch-device');
	} else {
		$('.banner-container').removeClass('.touch-device');
	}


	var gallery = $('.articles-item'),
		foldingPanel = $('.cd-folding-panel'),
		mainContent = $('.articles');
	/* open folding content */
	gallery.on('click', 'a', function(event){
		event.preventDefault();
		// openItemInfo($(this).attr('href'));
		toggleContent($(this).attr('href'), true);
	});

	/* close folding content */
	foldingPanel.on('click', '.cd-close', function(event){
		event.preventDefault();
		toggleContent('', false);
	});

	// on menu open // 
// var pos;
// pos = $('body').attr( 'data-pos', $(window).scrollTop() ) ;
 // ... // on menu close // 
// $( window ).scrollTop( $('body').attr( 'data-pos' ) );

	// gallery.on('click', function(event){
	// 	/* detect click on .cd-gallery::before when the .cd-folding-panel is open */
	// 	if($(event.target).is('.cd-gallery') && $('.fold-is-open').length > 0 ) toggleContent('', false);
		
		
		
	// });
	

	// function openItemInfo(url) { 
	// 	var mq = viewportSize();
	// 	if( gallery.offset().top > $(window).scrollTop() && mq != 'mobile') {
	// 		/* if content is visible above the .cd-gallery - scroll before opening the folding panel */
	// 		$('body,html').animate({
	// 			'scrollTop': gallery.offset().top
	// 		}, 100, function(){ 
	//            	toggleContent(url, true);
	//         }); 
	//     } else if( gallery.offset().top + gallery.height() < $(window).scrollTop() + $(window).height()  && mq != 'mobile' ) {
	// 		/* if content is visible below the .cd-gallery - scroll before opening the folding panel */
	// 		$('body,html').animate({
	// 			'scrollTop': gallery.offset().top + gallery.height() - $(window).height()
	// 		}, 100, function(){ 
	//            	toggleContent(url, true);
	//         });
	// 	} else {
	// 		toggleContent(url, true);
	// 	}
	// }


	function toggleContent(url, bool) {
		if( bool ) {
			/* load and show new content */
			var foldingContent = foldingPanel.find('.cd-fold-content');
			foldingContent.load(url+' .cd-fold-content > *', function(event){
				setTimeout(function(){
					foldingPanel.addClass('is-open');
					mainContent.addClass('fold-is-open');

					var iframe = $('#video');
					var player = new Vimeo.Player(iframe);
					player.on('play', function() {
					});
				}, 100);
			});
			setTimeout(function() {
				$('body').addClass('overflow-hidden');
				$('.owl-carousel').owlCarousel({
				  loop:true,
				  margin:10,
				  nav:true,
				  responsiveClass:true,
				  responsive:{
			      0:{
			          items:1
			      },
			      480:{
			          items:2
			      },
			      600:{
			          items:3
			      },
			      950:{
			          items:4
			      },
			      1200:{
			          items:5
			      }
				  }
				});
			}, 1000);
			
		} else {
			/* close the folding panel */
			// var mq = viewportSize();
			$('body').removeClass('overflow-hidden');
			foldingPanel.removeClass('is-open');
			mainContent.removeClass('fold-is-open');
			setTimeout(function() {
				$('html').scrollTop($('.main').offset().top);
				$('body').scrollTop($('.main').offset().top);
			},100);
			
			
			
			// if (mq == 'mobile' || $('.no-csstransitions').length > 0 ) {
			// 	$('body').removeClass('overflow-hidden'); 
			// 	$('html').scrollTop($('.main').offset().top);
			// } else {
			// 	mainContent.find('.cd-item').eq(0).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			// 		$('body').removeClass('overflow-hidden');
			// 		$('html').scrollTop($('.main').offset().top);
			// 		mainContent.find('.cd-item').eq(0).off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
			// 	});
			// }
				/* according to the mq, immediately remove the .overflow-hidden or wait for the end of the animation */
		
		}
		
	}

	// function viewportSize() {
	// 	/* retrieve the content value of .cd-main::before to check the actua mq */
	// 	return window.getComputedStyle(document.querySelector('.articles'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
	// }
});