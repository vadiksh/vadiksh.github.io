$(function() {

	$('a[href*="#"]').click(function(e) {
		e.preventDefault();
		var href = $(this).attr('href');

		$('.header__nav').removeClass('active');
		$('body, html').animate({
			scrollTop: $(href).offset().top
		}, 500)
	})
	var scrolled;
	$(window).scroll(function() {
		scrolled = $('body, html').scrollTop() + $(window).height();
		console.log(scrolled);
		if (scrolled - 200 > $('.achievements').offset().top) {
			for (var i = 0; i < $('.achievements .number').length; i++) {
				$($('.achievements .number')[i]).html($($('.achievements .number')[i]).attr('data-number'));
			}
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
	$(window).trigger('scroll');
});
