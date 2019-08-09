$(function() {

	// $('.hamburger').click(function(){
	// 	$('.header__mob').addClass('active');
	// })
	// $('.header__mob .close').click(function(){
	// 	$('.header__mob').removeClass('active');
	// })

	// $('a[href^="#"]').click(function(e) {
	// 	e.preventDefault();
	// 	var elementId = $(this).attr('href');
	// 	$('.overflow-wrapper').animate({
	// 		scrollTop: $(elementId)[0].offsetTop
	// 	},800)
	// 	if ($(this).hasClass('mob-link')) {
	// 		$('.header__mob').removeClass('active');
	// 	}
	// })
	var faq = $('.fixed-faq__block');
	$('.faq-button').click(function () {
		if (faq.hasClass('revealed')) {
			faq.removeClass('revealed');
			$('.fixed-faq__button').removeClass('rotate');
		} else {
			faq.addClass('revealed');
			$('.fixed-faq__button').addClass('rotate');
		}
	})

	var infoIndex;
	var linkTabViewed = false;

	$('.info').mouseenter(function() {
		linkTabViewed = true;
		infoIndex = $(this).attr('data-id');
		$($('.info-links')[infoIndex]).addClass('visible');
	})

	$('.info').mouseleave(function() {
		infoIndex = $(this).attr('data-id');
		linkTabViewed = false;

		setTimeout(function () {
			if (!linkTabViewed) {
				$('.info-links').removeClass('visible')
			}
		}, 200)
	})
	$('.info-links').mouseenter(function () {
		linkTabViewed = true;
		console.log('fsf')
	})
	$('.info-links').mouseleave(function () {
		linkTabViewed = false;
		setTimeout(function () {
			 $('.info-links').removeClass('visible')
		}, 100)
		
	})
});
