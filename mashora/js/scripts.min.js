$(function() {
	var textWrapper = document.querySelector('.mashora');
	textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

	// setTimeout(function() {
		$('.mashora').css({"opacity": 1})
		anime.timeline({loop: false})
		  .add({
		    targets: '.mashora .letter',
		    translateY: [50,0],
		    easing: "easeOutExpo",
		    duration: 1400,
		    delay: (el, i) => 100 + 50 * i
		  }).add({
		    targets: '.mashora .letter',
		    duration: 200,
		    translateY: [0,-50],
		    easing: "easeInQuad",
		    delay: (el, i) => 500 + 50 * i
		  });
		  
		  $('.loader .bg').addClass('hidden');
	// },200)
	


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
