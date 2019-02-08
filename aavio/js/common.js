$(document).ready(function() {
	$(window).trigger('scroll');
	$('.header__top, h1, .header__interactive').addClass('in-view')

	for (var i = 0; i <= $('.people-mob li').length - 1; i++) {
		var index = i + 1;
		$($($('.people-mob li .photo'))[i]).css({
			"background": "url('img/person" + index + ".jpg') no-repeat center top/cover"
		})
	}
	for (var i = 0; i <= $('.people-advisors li').length - 1; i++) {
		var index = i + 1;
		$($($('.people-advisors li .photo'))[i]).css({
			"background": "url('img/advisor" + index + ".jpg') no-repeat center top/cover"
		})
	}
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
		$('.header').css({
			"background": "url('img/banner" + index + ".jpg') no-repeat center bottom/cover"
		})
		$('.mask' + index).addClass('active').siblings().removeClass('active');

	})
	$($('.owl-item.active')[0]).css({
		"opacity": ".3",
		"transition": ".3s ease-out"
	})
	
	
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
			  margin: -230
			},
			1200:{
			  items:4,
			  margin: -100
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
		if (isInView($('.team'))) {
			$('.people.no-owl').addClass('in-view');
		}
		if (isInView($('.people-mob'))) {
			$('.people-mob').addClass('in-view');
		}
		if (scrolled + $(window).height()/1.5 > $('.people-advisors').offset().top) {
			$('.people-advisors').addClass('in-view');
		}
	})

	function isInView(el) {
		if (scrolled + $(window).height()/2 > $(el).offset().top) {
		  return true;
		}
	}

});
