$(function() {

	$('.header__interactive-list li').click(function() {
		var index = $(this).index();
		$('.line').css({
			"transform": "translate3d(" + index + "00%,0,0)"
		})
		$('.header__interactive-phone span').css({
			"background": "url('../img/phone-screen" + 1 + ".jpg') no-repeat center center/auto 100%;"
		})
	})
	$($('.owl-item.active')[0]).css({
		"opacity": ".3",
		"transition": ".3s ease-out"
	})
	$('.owl-carousel').owlCarousel({
		items: 4,
		margin: -250,
		dots: false,
		nav: false
	})
});
