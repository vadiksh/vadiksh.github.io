$(function() {

	$('.hamburger').click(function() {
		$('.header__main-menu').addClass('active');
	})
	$('.header .close').click(function() {
		$('.header__main-menu').removeClass('active');
	})
	for (var i = 0; i < $('.slider__list li').length; i++) {
		var index = i + 1;
		$($('.slider__list li')[i]).css({
			"background": "url('img/slide" + index + ".jpg') center center/cover"
		})
	}
	$(window).resize(function() {
		if ($(window).width() <= 992) {
			
			$('.slider__list').owlCarousel({
				items: 1,
				loop: true, 
				autoplay: true,
				nav: false
			})
		} else {
			$('.slider__list').trigger('destroy.owl.carousel');
		}
	})
	if ($(window).width() <= 992) {
		for (var i = 0; i < $('.slider__list li').length; i++) {
			var index = i + 1;
			$($('.slider__list li')[i]).find('.img').css({
				"background": "url('img/slide" + index + ".jpg') center top/cover"
			})
		}
		$('.slider__list').owlCarousel({
			items: 1,
			loop: true, 
			autoplay: true,
			nav: false
		})
		
	}
	$('.ui.accordion')
	  .accordion()
	;
	$('.ui.dropdown')
	  .dropdown()
	;
});
