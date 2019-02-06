$(function() {
	$(window).trigger('scroll');

	$('a[href^="#"]').click(function(e) {
		e.preventDefault();
		var elementId = $(this).attr('href');
		$('body,html').animate({
			scrollTop: $(elementId).offset().top
		},1000)
	})
	$('.open-mob').click(function(){
		$('nav.mob').addClass('opened');
	})
	$('.close-mob').click(function(){
		$('nav.mob').removeClass('opened');
	})
	$('nav.mob a').click(function(){
		$('nav.mob').removeClass('opened');
	})
	$('.header__interactive-list li').click(function() {
		var index = $(this).index();
		$('.line').css({
			"transform": "translate3d(" + index + "00%,0,0)"
		})
		$('.header__interactive-phone span').css({
			"background": "url('../img/phone-screen" + 1 + ".jpg') no-repeat center center/auto 100%;"
		})
	})
	$($('.owl-item.active')[0]).css({
		"opacity": ".3",
		"transition": ".3s ease-out"
	})
	
	// if ($(window).width() > 1200) {
		$('.people.owl-carousel').owlCarousel({
			items: 4,
			margin: -250,
			dots: false,
			nav: false,
			responsive:{
				0:{
 				 items: 1,
 				 margin: -130
				},
				375:{
				  items:1,
				  margin:-170
				},
				450:{
				  items:1,
				  margin:-250
				},
				600:{
				  items:2,
				  margin:-200
				},
				767: {
				  items:3,
				  margin: -170
				},
				1200:{
				  items:4,
				  margin: -250
				}
			}
		})
	$('.mob-list .owl-carousel').owlCarousel({
		items: 2.5,
		margin: 20,
		center: true,
		loop: true,
		dots: false,
		nav: false,
		responsive:{
			0:{
			  items:1.5,
			  margin: 20
			},
			500: {
			  items:2.5,
			  margin: 20
			}
		}
	})

	var scrolled;
	$(window).scroll(function() {
		scrolled = $(window).scrollTop();

		if (isInView($('.works'))) {
			$('.works').addClass('in-view');
		}
		if (isInView($('.who-for'))) {
			$('.who-for').addClass('in-view');
		}
	})

	function isInView(el) {
		if (scrolled + $(window).height()/2 > $(el).offset().top) {
		  return true;
		}
	}

});
