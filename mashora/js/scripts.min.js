$(function() {

	$('.header').addClass('visible');

	$('.header__banner.owl-carousel').owlCarousel({
	    loop: true,
	    nav: false,
	    dots: false,
	    autoplay: true,
	    autoplayTimeout: 7000,
	    autoplaySpeed: 1200,
	    items: 1
	});
	$('.how-we-work__sidebar li').click(function() {
		$(this).addClass('active').siblings().removeClass('active');
		$('.how-we-work__list li').eq($(this).index()).addClass('active').siblings().removeClass('active');
	})
	$('.team__list').owlCarousel({
	    loop:false,
	    nav: true,
	    dots: true,
	    center: true,
	    startPosition: 1,
	    items: 3,
	    responsiveClass:true,
	    responsive:{
	    }
	});

	var scrolled;
	$(window).scroll(function(){
		scrolled = $(this).scrollTop() + $(window).height();
		if ($('.why-us').length && scrolled - 300 > $('.why-us').offset().top) {
			$('.why-us').addClass('in-view');
		}
	})
});
