$(document).ready(function() {

	var src;
	$('.play-block').click(function() {
		src = $(this).attr('data-src');

		$('.popup').addClass('visible')
		$('.popup iframe').attr('src', src);
	})

	$('.close').click(function() {
		$('.popup iframe').attr('src', '');
		$('.popup').removeClass('visible');
	})

	$('.play-video').click(function() {
		src = $(this).attr('data-src');

		$('.popup').addClass('visible')
		$('.popup iframe').attr('src', src);
	})

	$('.close').click(function() {
		$('.popup iframe').attr('src', '');
		$('.popup').removeClass('visible');
	})

	 	$('.slick-slider').slick({
	 	  	slidesToShow:1,
	 	  	infinite: true,
	  	 	autoplay:true,
			autoplaySpeed:2000,
			arrows:false,
			fade:true,
			speed:2000
	 	});

	 	if ($(window).width() < 768) {
	 		$('.team ul').slick({
	 			centerMode: true,
	 		 	slidesToShow: 1,
	 			centerPadding: "80px",
		 	  	infinite: true,
				arrows:false,
	 		});
	 	}

	 	  var hamburger = document.getElementById('hamburger'),
	 		menu = document.querySelector('.header__top-nav');
	 		
	 		hamburger.addEventListener('click', function() {
	 			hamburger.classList.toggle('active');
	 			menu.classList.toggle('visible');
	 		})	
})
	
	$('a[href^="#"]').click(function() {
      // e.preventDefault();
      var id = $(this).attr('href');

      $('html, body').animate({
        scrollTop: $(id).offset().top - 50
      }, 1500);

      $('.header__top-nav').removeClass('visible');
      $('.hamburger').removeClass('active');
})


