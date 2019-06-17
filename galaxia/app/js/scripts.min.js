$(function() {

	$('.header .hamburger').click(function(){
		$('.header__mob').addClass('active');
	})
	$('.header__mob .close').click(function(){
		$('.header__mob').removeClass('active');
	})

	$('a[href^="#"]').click(function(e) {
		e.preventDefault();
		var elementId = $(this).attr('href');
		$('.overflow-wrapper').animate({
			scrollTop: $(elementId)[0].offsetTop
		},1000)
		if ($(this).hasClass('mob-link')) {
			$('.header__mob').removeClass('active');
		}
	})

	$('.awaits__options li').click(function() {
		if (!$(this).hasClass('active')) {
			var option = $(this).attr('data-option');
			$(this).addClass('active').siblings().removeClass('active');
			$('.' + option).addClass('active').siblings().removeClass('active');
		}
	})

	$('.mode').click(function() {
		if ($(this).hasClass('dark')) {
			$('.overflow-wrapper').addClass('light-mode');
			$(this).removeClass('dark');
		} else {
			$('.overflow-wrapper').removeClass('light-mode');
			$(this).addClass('dark');
		}
	})
});
