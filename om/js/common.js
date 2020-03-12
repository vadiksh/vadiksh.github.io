$(function() {

	$('.perks__list').owlCarousel({
		center: true,
		items: 2,
		// margin: 50,
		startPosition: 1
	})
	$('.reviews__list').owlCarousel({
		center: true,
		items: 1,
		dots: true
	})
	$('.blog__list').owlCarousel({
		items: 3,
		dots: false,
		nav: true,
		margin: 40
	})
	$('.cases-page__slider').owlCarousel({
		center: true,
		items: 2.5,
		margin: 20,
		startPosition: 1
	})

	var scrolled;
	$(window).scroll(function() {
		scrolled = $(window).scrollTop();
		if (scrolled >= 0) {
			var dif = scrolled;
			$('.head-homepage__lines').css({'transform': 'rotateX(' + dif/8 + 'deg)'})
			$('.head-about__lines').css({'transform': 'rotateX(' + dif/16 + 'deg)'})
		}

		if (scrolled + $(window).height() > $('.action').offset().top) {
			var dif = scrolled + $(window).height() - $('.action').offset().top
			$('.action .lines').css({'transform': 'rotateX(' + dif / 18 + 'deg)'})
		}
	})


});
