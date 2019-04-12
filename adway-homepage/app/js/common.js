$(function() {
	// $(window).trigger('scroll');

	$('.header .hamburger').click(function(){
		$('.header__mob').addClass('active');
	})
	$('.header__mob .close').click(function(){
		$('.header__mob').removeClass('active');
	})

	var scrolled;
	$(window).scroll(function() {
		scrolled = $(window).scrollTop();

		$('.homepage-header__container').css({
			"transform": "translate3d(0, -" + scrolled/6 + "px , 0)"
		})

		for (var i = 0; i < $('.fading').length; i++) {
			checkInView($($('.fading')[i]));
		}

		function checkInView(el) {
			if (scrolled + $(window).height() - 200 > el.offset().top && scrolled < el.offset().top + el.height()) {
				el.addClass('in-view')
			}
		}
	})
	$(window).trigger('scroll')
});
