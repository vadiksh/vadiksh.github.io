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

	var gallery = $('.articles-item'),
		foldingPanel = $('.cd-folding-panel'),
		mainContent = $('.articles');
	/* open folding content */
	$('body').on('click', '.articles-item a', function(event){
		event.preventDefault();
		// openItemInfo($(this).attr('href'));
		toggleContent($(this).attr('href'), true);
	});

	/* close folding content */
	foldingPanel.on('click', '.cd-close', function(event){
		event.preventDefault();
		toggleContent('', false);
	});

	function toggleContent(url, bool) {
		console.log(112);
		if( bool ) {
			/* load and show new content */
			var foldingContent = foldingPanel.find('.cd-fold-content');
			foldingContent.removeClass('tdFadeIn').addClass('tdFadeOut');
			setTimeout(function() {
				foldingContent.load(url+' .cd-fold-content > *', function(event){
					setTimeout(function(){
						$('.cd-fold-content').scrollTop(0);
						foldingPanel.addClass('is-open');
						foldingContent.removeClass('tdFadeOut').addClass('tdFadeIn');
						mainContent.addClass('fold-is-open');

						var iframe = $('#video');
						console.log(iframe);
						var player = new Vimeo.Player(iframe);
						iframe.data('player', player);


						setTimeout(function(){
							var controller = new ScrollMagic.Controller();

							var scene = new ScrollMagic.Scene({
								triggerElement: '.cd-fold-content #video',
								triggerHook: 0,
								duration:"100%",
								offset:-100
							})
							.on('leave', function (e) {
								if (foldingPanel.hasClass('is-open')) {
									player.pause();
								}
							})
							.on('enter', function (e) {
								if (foldingPanel.hasClass('is-open')) {
									player.play();
								}
							})
							// .addIndicators()
							.addTo(controller)
						}, 520)
					}, 1);
				});
			}, 200);

			

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
			$('.cd-fold-content #video').data('player').pause();
			$('body').removeClass('overflow-hidden');
			foldingPanel.removeClass('is-open');
			mainContent.removeClass('fold-is-open');
			setTimeout(function() {
				$('html').scrollTop($('.main').offset().top - 30);
				$('body').scrollTop($('.main').offset().top - 30);
			},100);
			
		}
		
	}

});