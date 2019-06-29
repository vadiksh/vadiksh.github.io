$(function() {

	$('.header .hamburger').click(function(){
		$('.header__mob').addClass('active');
	})
	$('.header__mob .close').click(function(){
		$('.header__mob').removeClass('active');
	})
	$('.faq__list-question').click(function(){
		if ($(this).next('.faq__list-answer').hasClass('opened')) {
			$(this).next('.faq__list-answer').slideUp(400).removeClass('opened');
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
			$('.faq__list-answer').slideUp(400).removeClass('opened');
			$(this).next('.faq__list-answer').slideDown(400).addClass('opened');
		}
	})
	$('.form-input').focus(function() {
		if ($(this).val().length == 0) {
			var cleave = new Cleave($(this), {
			    numericOnly: true,
		        blocks: [10]
			});
		}
		
	})

	$('form').submit(function(e) {
		var form = $(this);
		var button = $(this).find('button');

		$('form input').attr('disabled', '');
		form.addClass( "onclic");
		validate();
		function validate() {
		  setTimeout(function() {
		    window.location.href = url;
		    
		  }, 2250 );
		}
		e.preventDefault();

		var mobile = $(this).find('input').val(),
			url = 'https://kund.reducero.se?mobile=' + mobile;
		$.ajax({
		    url: url,
		    method: "GET",
		    dataType: "json",
		    data: form.serialize(),
		    success: function(response) {
		    	window.location.href = url;
		    	return true
		    }
		})
	});
	

	


	
	
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
	$('.header__reviews-list').owlCarousel({
	    loop:false,
	    nav: false,
	    margin: -100,
	    responsiveClass:true,
	    responsive:{
	        0:{
	            items:1,
	            margin: -30,
	            startPosition: 1,
	            center: true
	        },
	        630: {
	        	items: 2
	        },
	        767:{
	            items:2

	        },
	        950:{
	            items:3
	        },
	        1250:{
	            items:4
	        }
	    }
	})
	$('.partners__list').owlCarousel({
	    loop:false,
	    nav: false,
	    margin: -100,
	    responsiveClass:true,
	    responsive:{
	        0:{
	            items:2,
	            margin: -30,
	            startPosition: 1,
	            center: true
	        },
	        630: {
	        	items: 3
	        },
	        767:{
	            items:3

	        },
	        850:{
	        	items: 4
	        },
	        1250:{
	        	items:5
	        }
	    }
	})
	if(window.innerWidth <= 767) {
		$('.works__steps').addClass('owl-carousel owl-theme');
		$('.works__steps').owlCarousel({
			items:1,
			margin: -40,
			center: true,
		    loop:false,
		    dots: true,
		    center: true
		})		
	}
	$(window).on('resize', function(){
		if(window.innerWidth <= 767) {
			$('.works__steps').addClass('owl-carousel owl-theme');
			$('.works__steps').owlCarousel({
				items:1,
				margin: -40,
				center: true,
			    loop:false,
			    dots: true,
			    center: true
			})		
		} else {
			$('.works__steps').removeClass('owl-carousel owl-theme');
			$('.works__steps').trigger('destroy.owl.carousel');
		}
	})
});
