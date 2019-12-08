$(function() {

	$('a[href*="#"]').click(function(e) {
		e.preventDefault();
		var href = $(this).attr('href');

		$('.header__nav').removeClass('active');
		$('body, html').animate({
			scrollTop: $(href).offset().top - 80
		}, 500)
	})
	var scrolled;
	$(window).scroll(function() {
		scrolled = $(window).scrollTop();
		if (scrolled + $(window).height() - 200 > $('.achievements').offset().top) {
			for (var i = 0; i < $('.achievements .number').length; i++) {
				$($('.achievements .number')[i]).html($($('.achievements .number')[i]).attr('data-number'));
			}
		}

		if (scrolled > $('.fixed-menu-anchor').offset().top) {
			$('.header__bottom.fixed').addClass('active');
		} else {
			$('.header__bottom.fixed').removeClass('active');
		}
	})

	$('.cards__list > li').mouseenter(function() {
		for (var i = 0; i < $(this).find('.cards__flip-num').length; i++) {
			$($(this).find('.cards__flip-num')[i]).html($($(this).find('.cards__flip-num')[i]).attr('data-number'));
		}
		
	})
	$('.cards__list > li').mouseleave(function() {
		for (var i = 0; i < $(this).find('.cards__flip-num').length; i++) {
			$($(this).find('.cards__flip-num')[i]).html('0');
		}
	})
	$('.hamburger').click(function() {
		$('.header__nav').addClass('active');
	})
	$('.close').click(function() {
		$('.header__nav').removeClass('active');
	})
	var total = $('.cards__chart li:first-of-type span').attr('data-chart');
	var resolved = $('.cards__chart li:nth-of-type(2) span').attr('data-chart') * 100 / total;
	var pending = $('.cards__chart li:nth-of-type(3) span').attr('data-chart') * 100 / total;

	$('.cards__chart li:nth-of-type(2) span').css({
		"height": resolved + "%"
	})
	$('.cards__chart li:nth-of-type(3) span').css({
		"height": pending + "%"
	})

	$(window).trigger('scroll');
});
