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

		// $('.homepage-header__container').css({
		// 	"transform": "translate3d(0, -" + scrolled/3 + "px , 0)"
		// })
		// $('.about-description').css({
		// 	"transform": "translate3d(0, -" + scrolled/5 + "px , 0)"
		// })
		// $('.about-header .header__banner').css({
		// 	"transform": "translate3d(0, -" + scrolled/4 + "px , 0)"
		// })

		for (var i = 0; i < $('.fading').length; i++) {
			checkInView($($('.fading')[i]));
		}
		function checkInView(el) {
			if (scrolled + $(window).height() - 200 > el.offset().top && scrolled < el.offset().top + el.height()) {
				el.addClass('in-view')
			}
		}

		var diagrams = $('.seb__diagram');
		for (var i = 0; i < diagrams.length; i++) {
			var percent = $(diagrams[i]).find('.odometer');
			
			if (scrolled + $(window).height()/2 > $(diagrams[i]).offset().top && scrolled < $(diagrams[i]).offset().top + $(diagrams[i]).height()) {
				percent.html(percent.attr('data-percent'));
			}
		}
		// var diagram = $('.seb__diagram');
		// if (scrolled + $(window).height()/2 > diagram.offset().top && scrolled < diagram.offset().top + diagram.height()) {
		// 	$('.seb__diagram .odometer').html('347');
		// }
	})
	$(window).trigger('scroll')


	


	$('.tale__screen-thumbnail span').click(function() {
		var videoSrc = $('.tale__screen-container iframe').attr('data-src');
		
		$(this).fadeOut(1000);
		setTimeout(function() {
			$('.tale__screen-thumbnail').fadeOut(2000, function() {
				$('.tale__screen-container iframe').css({"z-index": 10})
			});
		}, 1000)
		$('.tale__screen-container iframe').attr('src', videoSrc);
	})

	for (var i = 0; i < $('.tale__screen-thumbnail').length; i++) {
		var imgSrc = $('.tale__screen-thumbnail')[i].dataset.src;
		$($('.tale__screen-thumbnail')[i]).css({
			'background': 'url(' + imgSrc + ') center center/cover'
		})
	}


	$('.form input').focus(function() {
		$(this).parent().addClass('active');
	})
	$('.form input').focusout(function() {
		if ($(this).val() == '') {
			$(this).parent().removeClass('active');
		}
	});
});
