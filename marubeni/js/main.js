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
		if (scrolled > $('.banner-container').height() + 500) {
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
	


	$('.owl-carousel').owlCarousel({
	  loop:true,
	  margin:15,
	  nav:false, 
	  URLhashListener:true,
    startPosition: 'URLHash',
	  responsiveClass:true,
	  responsive:{
	  	0:{
	  			items: 1.25
	  	},
      350:{
          items:1.5
      },
      450:{
          items:1.7
      },
      670:{
          items:2
      },
      770:{
          items:2.2
      }
	  }
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
	gallery.on('click', 'a', function(event){
		event.preventDefault();
		openItemInfo($(this).attr('href'));
	});

	/* close folding content */
	foldingPanel.on('click', '.cd-close', function(event){
		event.preventDefault();
		toggleContent('', false);
	});
	gallery.on('click', function(event){
		/* detect click on .cd-gallery::before when the .cd-folding-panel is open */
		if($(event.target).is('.cd-gallery') && $('.fold-is-open').length > 0 ) toggleContent('', false);
		
		
		
	});
	

	function openItemInfo(url) { 
		var mq = viewportSize();
		if( gallery.offset().top > $(window).scrollTop() && mq != 'mobile') {
			/* if content is visible above the .cd-gallery - scroll before opening the folding panel */
			$('body,html').animate({
				'scrollTop': gallery.offset().top
			}, 100, function(){ 
	           	toggleContent(url, true);
	        }); 
	    } else if( gallery.offset().top + gallery.height() < $(window).scrollTop() + $(window).height()  && mq != 'mobile' ) {
			/* if content is visible below the .cd-gallery - scroll before opening the folding panel */
			$('body,html').animate({
				'scrollTop': gallery.offset().top + gallery.height() - $(window).height()
			}, 100, function(){ 
	           	toggleContent(url, true);
	        });
		} else {
			toggleContent(url, true);
		}
	}

	function toggleContent(url, bool) {
		if( bool ) {
			/* load and show new content */
			var foldingContent = foldingPanel.find('.cd-fold-content');
			foldingContent.load(url+' .cd-fold-content > *', function(event){
				setTimeout(function(){
					$('body').addClass('overflow-hidden');
					foldingPanel.addClass('is-open');
					mainContent.addClass('fold-is-open');
					var iframe = $('#video');
					var player = new Vimeo.Player(iframe);
					//player.play();
					player.on('play', function() {
						//console.log('played the video!');
					});

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
				}, 100);
				
			});
		} else {
			/* close the folding panel */
			var mq = viewportSize();
			foldingPanel.removeClass('is-open');
			mainContent.removeClass('fold-is-open');
			
			(mq == 'mobile' || $('.no-csstransitions').length > 0 ) 
				/* according to the mq, immediately remove the .overflow-hidden or wait for the end of the animation */
				? $('body').removeClass('overflow-hidden')
				
				: mainContent.find('.cd-item').eq(0).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					$('body').removeClass('overflow-hidden');
					mainContent.find('.cd-item').eq(0).off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
				});
		}
		
	}

	function viewportSize() {
		/* retrieve the content value of .cd-main::before to check the actua mq */
		return window.getComputedStyle(document.querySelector('.articles'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
	}
});