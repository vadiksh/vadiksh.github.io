$(document).ready(function(){

	for (var i = 0; i < $('.welcome__saloon .welcome__activity-item span').length; i++) {
		var imgIndex = +i + 1;
		console.log(imgIndex)
		$($('.welcome__saloon .welcome__activity-item span')[i]).css({
			'background': 'url("../img/experience/saloon' + imgIndex + '.jpg") center center/cover'
		})
	}
	for (var i = 0; i < $('.welcome__activities .welcome__activity-item span').length; i++) {
		var imgIndex = +i + 1;
		console.log(imgIndex)
		$($('.welcome__activities .welcome__activity-item span')[i]).css({
			'background': 'url("../img/experience/activity' + imgIndex + '.jpg") center center/cover'
		})
	}
	for (var i = 0; i < $('.rooms__gallery-item span').length; i++) {
		var imgIndex = +i + 1;
		$($('.rooms__gallery-item span')[i]).css({
			'background': 'url("../img/camping/room' + imgIndex + '.jpg") center center/cover'
		})
	}
	for (var i = 0; i < $('.area__gallery-item span').length; i++) {
		var imgIndex = +i + 1;
		$($('.area__gallery-item span')[i]).css({
			'background': 'url("../img/camping/area' + imgIndex + '.jpg") center center/cover'
		})
	}
	for (var i = 0; i < $('.cabins-rates__holder-img span').length; i++) {
		var imgIndex = +i + 1;
		$($('.cabins-rates__holder-img span')[i]).css({
			'background': 'url("../img/rates/rates' + imgIndex + '.jpg") center bottom/cover'
		})
	}
	for (var i = 0; i < $('.cabins-rates__canoeing span').length; i++) {
		var imgIndex = +i + 1;
		$($('.cabins-rates__canoeing span')[i]).css({
			'background': 'url("../img/rates/canoeing' + imgIndex + '.jpg") center bottom/cover'
		})
	}
	for (var i = 0; i < $('.cabins-rates__horseback span').length; i++) {
		var imgIndex = +i + 1;
		$($('.cabins-rates__horseback span')[i]).css({
			'background': 'url("../img/rates/horseback' + imgIndex + '.jpg") center bottom/cover'
		})
	}
	for (var i = 0; i < $('.cabins-rates__sm-holder span').length; i++) {
		var imgIndex = +i + 1;
		$($('.cabins-rates__sm-holder span')[i]).css({
			'background': 'url("../img/rates/more' + imgIndex + '.jpg") center bottom/cover'
		})
	}

	$('.owl-carousel').owlCarousel({
		items: 1,
		lazyLoad:true,
		loop:true,
		nav:true
	})

	$('.ranch .slider li').click(function() {
		var imgSrc = $(this).find('img').attr('data-src');

		$('.ranch .gallery__screen').fadeOut(200, function() {
			$('.ranch .gallery__screen').css({"background": "url('../" + imgSrc + "') no-repeat center center/cover"})
			$('.ranch .gallery__screen').fadeIn(400);
		})
			
	})

	$('.video__wrapper button').click(function() {
		var videoSrc = 'https://www.youtube.com/embed/rvskMHn0sqQ?autoplay=1&autohide=1';
		$('.video__wrapper span').css({
			"background": "url('../img/experience/exp-video-clicked.jpg') center center/cover",
			"transition": "1s ease"
		})
		$(this).fadeOut(1000);
		setTimeout(function() {
			$('.video__wrapper span').fadeOut(2000, function() {
				$('.video__wrapper iframe').css({"z-index": 10})
			});
		}, 1000)
		$('.video__wrapper iframe').attr('src', videoSrc);
	})

	$('.questions__page ul li').click(function() {
		var pIndex = $(this).index() + 1;
		$(this).addClass('active').siblings().removeClass('active');
		$('.questions__page--right p:nth-of-type(' + pIndex + ')').addClass('active').siblings().removeClass('active')
	})

	$('.dropdown').click(function () {
		$(this).attr('tabindex', 1).focus();
		$(this).toggleClass('active');
		$(this).find('.dropdown-menu').slideToggle(300);
	})
	$('.dropdown').focusout(function () {
		$(this).removeClass('active');
		$(this).find('.dropdown-menu').slideUp(300);
	})
	$('.dropdown .dropdown-menu li').click(function () {
		$(this).parents('.dropdown').find('span').text($(this).text());
		$(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
 	})

 	$('.contact form').submit(function(e) {
 		// $('.form-loader').css({
 		// 	"display": "flex",
 		// 	"opacity": 1
 		// })
 		e.preventDefault();
 		formSubmit();
 	});
 	function formSubmit() {
 		var name = $('.input-name').val(),
 			email = $('.input-email').val(),
 			bookOrAsk = $('.input-book-ask').val();
 		console.log(name + email + bookOrAsk)
 		if (name && email && bookOrAsk) {
 			var $form = $('.contact form'),
 	    	url = 'https://script.google.com/macros/s/AKfycbyr7vYgLDf7icUhNMaT2MBKAbOjcuPy74NEJN57h9Pf6kH6zWk/exec';
 			$.ajax({
 			    url: url,
 			    method: "GET",
 			    dataType: "json",
 			    data: $form.serialize(),
 			    success: function(response) {
 			    	// $('.form-loader .circles').fadeOut(200, function() {
 			    	// 	$('.form-submitted').fadeIn(200);
 			    	// })
 			    	// $('.form-submitted button').click(function() {
 			    		
 			    	// 	$('body').removeClass('overflow-hidden');
 			    	// 	$('body, html').scrollTop(scrolled);
 			    	// })
 			    	console.log('sent')
 			    	return true
 			    	
 			    }
 			})	
 		} else {
 			console.log('failed')
 			return false
 			
 		}	
 	}

});


	