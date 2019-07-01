$(document).ready(function() {
	var scrolled;
		$(window).scroll(function(){
		  scrolled = $(this).scrollTop();	
		  if (scrolled + $(this).height() - 200 > $('.days').offset().top) {
		    $('.days li').addClass('active')
	 		 }
		  if (scrolled + $(this).height() - 200 > $('#text1').offset().top) {
		    $('#text1').addClass('visible')
	 		 } 
 		  if (scrolled + $(this).height() - 200 > $('#text4').offset().top) {
 		    $('#text4').addClass('visible')
	 		 }
 		  if (scrolled + $(this).height() - 200 > $('#text2').offset().top) {
 		    $('#text2').addClass('visible')
	 		 }  	 	
	 	  if (scrolled + $(this).height() - 200 > $('.slick-slider').offset().top) {
 		    $('.slick-slider').addClass('active')
	 		 }  	 	 	 
		  if (scrolled + $(this).height() - 200 > $('#text3').offset().top) {
 		    $('#text3').addClass('visible')
	 		 }  
	 	  if (scrolled + $(this).height() - 200 > $('.team .container ul').offset().top) {
 		    $('.team .container ul').addClass('active')
	 		 } 
 	 	  if (scrolled + $(this).height() > $('.contact .doubt h3').offset().top) {
 		    $('.contact .doubt h3').addClass('active')
	 		 }  	 
	 	  if (scrolled + $(this).height() - 200 > $('.possibilities').offset().top) {
		    $('.possibilities').addClass('active')
	 		 }	
	 	  if (scrolled + $(this).height() - 100 > $('.contact .doubt .here').offset().top) {
		    $('.contact .doubt .here').addClass('active')
	 		 } 	
})

	$('.header .logo').addClass('in-view');
	$('.header__top-nav li').addClass('in-view');
	$('.header').addClass('in-view');
	$('.header .container .left').addClass('in-view');

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
			speed:3000
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
	// var $select = $('#select');
	//  $select.select2();
	 
	//  $select.on('change', function () {
	//  	$select.val('two').trigger('change');
	//  }
