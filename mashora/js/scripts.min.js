$(function() {
	var textWrapper = document.querySelector('.mashora');
	textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

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
	  
	  setTimeout(function() {
	  	 $('.loader').hide();
	  },3000)
	  setTimeout(function() {
	  	$('.header .first-screen').addClass('active');
	  },1200)
	  $('.loader .bg').addClass('hidden');
	


	$('.header.animated').addClass('visible');
	

	var i = 1;
	setInterval(function () {
		$('.header .screen').eq(i).addClass('active').siblings().removeClass('active');
		if (i == 1) {
			i = 0;
		} else {
			i++;
		}
	},6000)

	$('.how-we-work__sidebar li').click(function() {
		$(this).addClass('active').siblings().removeClass('active');
		$('.how-we-work__list li').eq($(this).index()).addClass('active').siblings().removeClass('active');
	});

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
