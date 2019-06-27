$(function() {
	setTimeout(function () {
		$('.loader-wrap').fadeOut(300, function () {
			$('.overflow-wrapper').trigger('scroll');
		});

	}, 800)
	$('.hamburger').click(function(){
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
		},800)
		if ($(this).hasClass('mob-link')) {
			$('.header__mob').removeClass('active');
		}
	})

	var scrolled;
	$('.overflow-wrapper').scroll(function() {
		scrolled = $('.overflow-wrapper').scrollTop();

		for (var i = 0; i < $('.fading').length; i++) {
			checkInView($($('.fading')[i]));
		}

		function checkInView(el) {
			if (scrolled + $(window).height() - 150 > el[0].offsetTop && scrolled < el[0].offsetTop + el.height()) {
				el.addClass('in-view')
			}
		}
	})
	// $('.overflow-wrapper').trigger('scroll');

	$('.awaits__options li').click(function() {
		if (!$(this).hasClass('active')) {
			var option = $(this).attr('data-option');
			$(this).addClass('active').siblings().removeClass('active');
			$('.' + option).addClass('active').siblings().removeClass('active');
		}
	})

	$('form').submit(function() {
		$(this).addClass('submitted');
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
