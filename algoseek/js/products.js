$(function() {

	if ($(window).width() > 767) {
	    $(window).scroll(function() {
	        var scrolled = $(window).scrollTop();

	        if ($('.products-page__icons').length && $('.products-page__icons').offset().top + $('.products-page__icons').height() > $('.footer').offset().top - 60) {
	            $('.products-page__icons').addClass('sticky');
	        } else if ($('.products-page__icons').hasClass('sticky') && scrolled + ($(window).height() - $('.products-page__icons').height())/2 < $('.products-page__icons').offset().top) {
	            $('.products-page__icons').removeClass('sticky');
	        }

	        if (scrolled > 45) {
	            $('.products-page__menu').addClass('sticky-top');
	        } else {
	            $('.products-page__menu').removeClass('sticky-top');
	        }

	        if ($('.products-page__menu').offset().top + $('.products-page__menu').height() > $('.footer').offset().top - 60) {
	            $('.products-page__menu').addClass('sticky').removeClass('sticky-top');
	        } else if ($('.products-page__menu').hasClass('sticky') && scrolled + 145 < $('.products-page__menu').offset().top) {
	            $('.products-page__menu').removeClass('sticky').addClass('sticky-top');
	        }
	    })
	}
	if ($(window).width() < 1440) {
		$('.products-page__table-headings .docs').html('Docs');
	}
});