$( window ).load(function() {
  $('.loader').fadeOut(400);
  setTimeout(function(){
  	$(window).trigger('scroll');
  },400)
});
$(document).ready(function() {
	/* Footer Share Animation */
    $('.share-click-ico').on('click', function() {
        $('.foot-social').slideToggle();
        $('.foot-social').toggleClass("active");
    });

    /* Scroll Up */
    $('.scroll-top').on('click', function() {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 1000);
    });

	$('.nav__list li').click(function() {
		let partHref = $(this).attr('href');
		$('html, body').animate({
       		scrollTop: $('#' + partHref).offset().top
   		}, 500);
	});
	$('.nav-mob__list li').click(function() {
		let partHref = $(this).attr('href');

		$('body,html').scrollTop($('#' + partHref).offset().top + 1);
		$('.hamburger').removeClass('is-active');
		$('.nav-mob').css({
			"transform": "translate3d(100vw, 0, 0)"
		})
	});
	$('.hamburger').click(function() {
		$(this).toggleClass('is-active');

		if ($(this).hasClass('is-active')) {
			$('.nav-mob').css({
				"transform": "translate3d(0, 0, 0)"
			})
		} else {
			$('.nav-mob').css({
				"transform": "translate3d(100vw, 0, 0)"
			})
		}
	})


	$('.hero-7').parallax({
		imageSrc: 'images/hero7.svg',
		speed: 0.8,
		zIndex: -90
	});
	$('.hero-6').parallax({
		imageSrc: 'images/hero6.svg',
		speed: 0.25,
		zIndex: -91
	});
		$('.hero-5').parallax({
		imageSrc: 'images/hero5.svg',
		speed: 0.4,
		zIndex: -92
	});
	
	$('.hero-4').parallax({
		imageSrc: 'images/hero4.svg',
		speed: 0.3,
		zIndex: -93
	});
	$('.hero-3').parallax({
		imageSrc: 'images/hero3.svg',
		speed: 0.3,
		zIndex: -94,
		naturalWidth: 1647,
		naturalHeight: 808
	});
	$('.hero-2').parallax({
		imageSrc: 'images/hero2.svg',
		speed: -0.1,
		zIndex: -97
	});	
	$('.hero-1').parallax({
		imageSrc: 'images/hero1.svg',
		speed: 0.3,
		zIndex: -100
	});
	
	var scrolled;

	$(window).scroll(function() {
		scrolled = $(window).scrollTop();

		if (scrolled > $('#part-1').offset().top - ($(window).height() - 320)/2) {
			$('.nav__list').addClass('tdFadeInRight').removeClass('tdFadeOutLeft');
			$('.hamburger').addClass('tdFadeInLeft').removeClass('tdFadeOutRight');
			if ($(window).width() < 1350 && $(window).width() > 1023) {
				$('.part-1').css({
					"padding-left": "180px",
					"transition": ".25s ease"
				})
			}
		} else {
			$('.nav__list').addClass('tdFadeOutLeft').removeClass('tdFadeInRight');
			$('.hamburger').addClass('tdFadeOutRight').removeClass('tdFadeInLeft');
			if ($(window).width() < 1350 && $(window).width() > 1023) {
				$('.part-1').css({
					"padding-left": "0px",
					"transition": ".25s ease"
				})
			}
		}
		if(scrolled > $('.part-2').offset().top - $(window).height()/2) {
			$('.footer_btm').addClass('tdFadeInLeft').removeClass('tdFadeOutRight');
		} else {
			$('.footer_btm').addClass('tdFadeOutRight').removeClass('tdFadeInLeft');
		}

		for (var i = 1; i <= $('[id*="part"]').length; i++) {
			if (isInView($('#part-' + i))) {
				$('.nav__list .nav-part-' + i).addClass('active').siblings().removeClass('active');
			}
		}
		if (scrolled + $(window).height() > $('.footer').offset().top + $(window).height()/3) {
			$('.nav__list .nav-part-4').addClass('alternative');
		} else {
			$('.nav__list .nav-part-4').removeClass('alternative');
		}

		if (scrolled >= $('.part-2').offset().top && scrolled + 100 < $('.part-2').offset().top + $('.part-2').innerHeight() ||
			scrolled >= $('.part-4').offset().top && scrolled + 100 < $('.part-4').offset().top + $('.part-4').innerHeight()) {
			$('.hamburger').addClass('alternative');
		} else {
			$('.hamburger').removeClass('alternative');
		}

		if(isInView($('.main-title')) || scrolled > $('.main-title').offset().top - $(window).height()/2) {
			$('.main-title').addClass('tdShrinkIn');
		}
		var tdFadeInElements = $('.text-block, .description, .overview__countries li');
		for (var i = 0; i < tdFadeInElements.length; i++) {
			if (scrolled > $(tdFadeInElements[i]).offset().top - $(window).height()/2) {
				$(tdFadeInElements[i]).addClass('tdFadeInUp');
			}
		}

		if (isInView($('.map'))) {
			$('.map li').addClass('tdFadeIn');
		}

		/*$('.animated-picture').each(function(){
			var elem = $(this);
			// if(isInView(elem)) {
				elem.css({'transform': 'translate3d(0,'+ (scrolled - elem.offset().top) +'px,0)'})
			// }	
		})*/

		//animated illustrations
		/*$('.animated-picture').each(function(){
			var elem = $(this);
			// if(isInView(elem)) {
				elem.css({'transform': 'translate3d(0,'+ (scrolled - elem.offset().top) +'px,0)'})
			// }	
		})*/

	});

	function isInView(el) {
		if (scrolled + $(window).height()/1.5 > $(el).offset().top &&
			  scrolled + $(window).height()/1.5 < $(el).offset().top + $(el).innerHeight()) {
		  return true;
		}
	}

	$('.landscape-graph__toggle button').click(function() {
		$('.landscape-graph__content').removeClass('tdFadeIn').addClass('tdFadeOut');
		$(this).addClass('active').siblings().removeClass('active');
		var graphIndex = $(this).attr("graph");
		setTimeout(function() {
			$('.landscape-graph__content img').attr('src', 'images/graph' + graphIndex + '.svg');
			$('.landscape-graph__content').removeClass('tdFadeOut').addClass('tdFadeIn');
		}, 200)
	});

	//on scroll animations

	var controller1 = new ScrollMagic.Controller();
	var controller2 = new ScrollMagic.Controller();

	var scene = new ScrollMagic.Scene({offset: 435, triggerElement: '#factors-trigger', duration: 1500})
	.setPin('#factors')
	.addTo(controller1);

	var scene1 = new ScrollMagic.Scene({triggerElement: '#factors-trigger', offset: 700})
	.setVelocity('.factors #pyramid2', {opacity: 1}, {delay: 0, duration: 800})
	.addTo(controller2); 

	var scene2 = new ScrollMagic.Scene({triggerElement: '#factors-trigger', offset: 700})
	.setVelocity('.factors li:first-child', {opacity: 0}, {delay: 0, duration: 600})
	.addTo(controller2);    

	var scene3 = new ScrollMagic.Scene({triggerElement: '#factors-trigger', offset: 1450})
	.setVelocity('.factors #pyramid3', {opacity: 1}, {delay: 0, duration: 600})
	.addTo(controller2); 

	// var scene4 = new ScrollMagic.Scene({triggerElement: '#factors-trigger', offset: 1450})
	// .setVelocity('.factors #pyramid2', {opacity: 0}, {delay: 0, duration: 600})
	// .addTo(controller2);

	// var scene = new ScrollMagic.Scene({offset: 435, triggerElement: '#factors-trigger', duration: 2000})
	// .setPin('#factors')
	// .addTo(controller1);  

	// var scene0 = new ScrollMagic.Scene({triggerElement: '#factors-trigger', offset: 200})
	// .setClassToggle('.factors', 'active')
	// .addTo(controller1); 

	// var scene1 = new ScrollMagic.Scene({triggerElement: '#trigger1', offset: 1800})
	// .setVelocity('#pin1 .billionaire .shoot.view1', {opacity: 1}, {delay: 200, duration: 200})
	// .addTo(controller3); 

	//graph animation

	var controller3 = new ScrollMagic.Controller();

	var scene = new ScrollMagic.Scene({offset: 297, triggerElement: '#graph-trigger', duration: 1500})
	.setPin('#graph-pin')
	.addTo(controller3);

	var scene5 = new ScrollMagic.Scene({triggerElement: '#graph-trigger', offset: 400})
	.setVelocity('.graph-2', {opacity: 1}, {delay: 0, duration: 400})
	.addTo(controller3); 

	var scene6 = new ScrollMagic.Scene({triggerElement: '#graph-trigger', offset: 550})
	.setVelocity('.graph-3', {opacity: 1}, {delay: 0, duration: 400})
	.addTo(controller3); 

	var scene7 = new ScrollMagic.Scene({triggerElement: '#graph-trigger', offset: 700})
	.setVelocity('.graph-4', {opacity: 1}, {delay: 0, duration: 400})
	.addTo(controller3); 

	var scene8 = new ScrollMagic.Scene({triggerElement: '#graph-trigger', offset: 850})
	.setVelocity('.graph-5', {opacity: 1}, {delay: 0, duration: 400})
	.addTo(controller3); 

	var scene9 = new ScrollMagic.Scene({triggerElement: '#graph-trigger', offset: 1000})
	.setVelocity('.graph-6', {opacity: 1}, {delay: 0, duration: 400})
	.addTo(controller3); 

	var scene10 = new ScrollMagic.Scene({triggerElement: '#graph-trigger', offset: 1150})
	.setVelocity('.graph-7', {opacity: 1}, {delay: 0, duration: 400})
	.addTo(controller3); 

	var scene11 = new ScrollMagic.Scene({triggerElement: '#graph-trigger', offset: 1300})
	.setVelocity('.graph-8', {opacity: 1}, {delay: 0, duration: 400})
	.addTo(controller3); 

	var scene12 = new ScrollMagic.Scene({triggerElement: '#graph-trigger', offset: 1450})
	.setVelocity('.graph-9', {opacity: 1}, {delay: 0, duration: 400})
	.addTo(controller3); 

	var scene13 = new ScrollMagic.Scene({triggerElement: '#graph-trigger', offset: 1600})
	.setVelocity('.graph-10', {opacity: 1}, {delay: 0, duration: 400})
	.addTo(controller3); 



	//paralaxed illustrations

	$(".animated-picture").paroller({
        factor: 0.15,            // multiplier for scrolling speed and offset
        type: 'foreground',     // background, foreground
        direction: 'vertical' // vertical, horizontal
    });

});

