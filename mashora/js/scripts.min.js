$(function() {
	// var scrolled,
	// 	scrolledBottom;
	// $(window).scroll(function() {
	// 	scrolled = $(this).scrollTop() + $(window).height()/2 - 115;
	// 	scrolledBottom = scrolled + 230;

		
	// 	if (scrolled > $('.how-we-work__list').offset().top &&
	// 		scrolledBottom < $('.how-we-work .button').offset().top) {
	// 		$('.how-we-work__sidebar').addClass('visible');
	// 	} else {
	// 		$('.how-we-work__sidebar').removeClass('visible');
	// 	}

	// 	if (scrolled > $('.how-we-work__list').offset().top &&
	// 		scrolled < $('.how-we-work__list li:nth-of-type(2)').offset().top) {
	// 		$('.how-we-work__sidebar li').eq(0).addClass('active').siblings().removeClass('active');
	// 	} else if (scrolled > $('.how-we-work__list li:nth-of-type(2)').offset().top &&
	// 			   scrolled < $('.how-we-work__list li:nth-of-type(3)').offset().top) {
	// 		$('.how-we-work__sidebar li').eq(1).addClass('active').siblings().removeClass('active');
	// 	} else if (scrolled > $('.how-we-work__list li:nth-of-type(3)').offset().top && 
	// 			   scrolledBottom < $('.how-we-work__list li:nth-of-type(4)').offset().top) {
	// 		$('.how-we-work__sidebar li').eq(2).addClass('active').siblings().removeClass('active');
	// 	} else if (scrolled > $('.how-we-work__list li:nth-of-type(4)').offset().top) {
	// 		$('.how-we-work__sidebar li').eq(3).addClass('active').siblings().removeClass('active');
	// 	}
	// });

	$('.how-we-work__sidebar li').click(function() {
		$(this).addClass('active').siblings().removeClass('active');
		$('.how-we-work__list li').eq($(this).index()).addClass('active').siblings().removeClass('active');
	})
	$('.owl-carousel').owlCarousel({
	    loop:true,
	    nav: true,
	    dots: true,
	    center: true,
	    items: 3,
	    responsiveClass:true,
	    responsive:{
	    }
	});
});
