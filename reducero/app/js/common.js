$(function() {

	
	$('body').on('click', function() {
		if ($('.banner__form input').is(':focus') || $('.banner__form input').val()) {
			$('.banner__form label').fadeOut(200);
		} else {
			$('.banner__form label').fadeIn(200);
		}
	})
	$('.faq__list-question').click(function(){
		if ($(this).next('.faq__list-answer').hasClass('opened')) {
			$(this).next('.faq__list-answer').slideUp(400).removeClass('opened');
			$(this).removeClass('active');
		} else {
			$('.faq__list-question').removeClass('active');
			$(this).addClass('active');
			$('.faq__list-answer').slideUp(400).removeClass('opened');
			$(this).next('.faq__list-answer').slideDown(400).addClass('opened');
		}
	})


	$('.header .hamburger').click(function(){
		$('.header__mob').addClass('active');
	})
	$('.header__mob .close').click(function(){
		$('.header__mob').removeClass('active');
	})
	
	$('.footer__info-list.company h3').click(function(){
		if ($(this).hasClass('active')) {
			$('.footer__info-list.company ul').slideUp(400);
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
			$('.footer__info-list.company ul').slideDown(400);
		}
	})
	$('.footer__bottom-title').click(function(){
		if ($(this).hasClass('active')) {
			$('.footer__bottom-list').slideUp(400);
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
			$('.footer__bottom-list').slideDown(400).css({
				'display': 'flex'
			});
		}
	})


});
