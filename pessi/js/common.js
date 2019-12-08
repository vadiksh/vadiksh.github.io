$(function() {

	
	var scrolled;
	$(window).scroll(function() {
		scrolled = $('body, html').scrollTop() + $(window).height();
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
	
	$(window).trigger('scroll');
});
