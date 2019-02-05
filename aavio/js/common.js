$(function() {
	$(window).trigger('scroll');

	$('a[href^="#"]').click(function(e) {
		e.preventDefault();
		var elementId = $(this).attr('href');
		$('body,html').animate({
			scrollTop: $(elementId).offset().top
		},1000)
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
	
	if ($(window).width() > 1200) {
		$('.owl-carousel').owlCarousel({
			items: 4,
			margin: -250,
			dots: false,
			nav: false
		})
	} else {
		console.log('fds')
		$('.owl-carousel').owlCarousel({
			items: 3,
			margin: -170,
			dots: false,
			nav: false
		})
	}

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
