$(document).ready(function(){
	var imgSrc = $('.slider li:first-of-type img').attr('data-src');
	var fbSrc = 'https://www.facebook.com/sharer/sharer.php?u=' + location.origin + '/rancho/' + imgSrc;
	var mailSrc = 'mailto:?subject=Wells Gray Guest Ranch&body=' + location.origin + '/rancho/' + imgSrc;

	$('.foot-social .fb').attr('href', fbSrc);
	$('.foot-social .mail').attr('href', mailSrc);

	$('.share-click-ico').on('click', function() {
	    $('.foot-social').slideToggle();
	    $('.foot-social').toggleClass("active");
	});

	function setBackground(el, url, position) {
		for (var i = 0; i < el.length; i++) {
			var imgIndex = +i + 1;
			$(el[i]).css({
				'background': 'url("img/' + url + imgIndex + '.jpg") center ' + position
			})
		}
	}
	setBackground($('.cabins-rates__sm-holder span'), 'rates/more', 'bottom/cover');
	setBackground($('.cabins-rates__horseback .owl-carousel span'), 'rates/horseback', 'bottom/cover');
	setBackground($('.cabins-rates__canoeing .owl-carousel span'), 'rates/canoeing', 'bottom/cover');
	setBackground($('.cabins-rates__holder-img span'), 'rates/rates', 'bottom/cover');
	setBackground($('.area__gallery-item span'), 'camping/area', 'center/cover');
	setBackground($('.rooms__gallery-item span'), 'camping/room', 'center/cover');
	setBackground($('.welcome__activities .welcome__activity-item span'), 'experience/activity', 'center/cover');
	setBackground($('.welcome__saloon .welcome__activity-item span'), 'experience/saloon', 'center/cover');


	setTimeout(function() {
		if (location.hash) {
			$('body,html').animate({
				scrollTop: $(location.hash).offset().top + 80
			}, 500)
		}
	}, 1000)
	
	
	$('.slider .owl-carousel').owlCarousel({
		lazyLoad:true,
		loop:true,
		nav:true,
		responsive: {
			0: {
				items: 1,
				slideBy: 1
			},
			630: {
				items: 2, 
				slideBy: 2
			},
 			767: {
				items: 4,
				slideBy: 4
			}
		}
	})
	$('.activities-rates__more .owl-carousel').owlCarousel({
		lazyLoad:true,
		loop:true,
		nav:true,
		responsive: {
			0: {
				items: 1,
				slideBy: 1
			},
			630: {
				items: 2, 
				slideBy: 2
			},
			767: {
				items: 2,
				slideBy: 2
			},
			1023: {
				items: 4,
				slideBy: 4
			}
		}
	})
	$('.owl-carousel').owlCarousel({
		items: 1,
		lazyLoad:true,
		loop:true,
		nav:true
	})
	
	$('.ranch .slider li').click(function() {
		imgSrc = $(this).find('img').attr('data-src');
		fbSrc = 'https://www.facebook.com/sharer/sharer.php?u=' + location.origin + '/rancho/' + imgSrc;
		mailSrc = 'mailto:?subject=Wells Gray Guest Ranch&body=' + location.origin + '/rancho/' + imgSrc;
		$('.ranch .gallery__screen').fadeOut(200, function() {
			$('.ranch .gallery__screen').css({"background": "url('" + imgSrc + "') no-repeat center center/cover"})
			$('.ranch .gallery__screen').fadeIn(400);
		})
		$('.foot-social .fb').attr('href', fbSrc);
		$('.foot-social .mail').attr('href', mailSrc);
	})

	$('a[href^="#"]').click(function(e) {
		e.preventDefault();
		var elementId = $(this).attr('href');

		$('body,html').animate({
			scrollTop: $(elementId).offset().top
		}, 500)
	})

	$('.enlarge').click(function () {
		$('.gallery__popup img').attr('src', imgSrc)
		$('.gallery__popup').fadeIn(300);
	})
	$('.gallery__popup .close').click(function() {
		$('.gallery__popup').fadeOut(300);
	})

	$('.video__wrapper button').click(function() {
		var videoSrc = this.dataset.src;
		$('.video__wrapper span').css({
			"background": "url('img/experience/exp-video-clicked.jpg') center center/cover",
			"transition": "1s ease"
		})
		if ($(this).hasClass('getting-here__video-btn')) {
			$('.video__wrapper span').css({
				"background": "url('img/getting-here/video-clicked.jpg') center center/cover",
				"transition": "1s ease"
			})
		}
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
		if ($(window).width() < 1024) {
			$('.questions__page').css({'opacity': 0, 'transition': '.2s ease-in'})
			$('.questions__page--right').css({'opacity': 1, 'transition': '.4s .2s ease-out'})
			$('.questions__page--right p:nth-of-type(' + pIndex + ')').addClass('active').siblings().removeClass('active')
			$('.questions__back').click(function(){
				$('.questions__page').css({'opacity': 1, 'transition': '.4s .2s ease-out'})
				$('.questions__page--right').css({'opacity': 0, 'transition': '.2s ease-in'})
			})
		}
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
	$('.burger').click(function(){
		$('.mob-menu').addClass('active')
	})
	$('.mob-menu .close').click(function() {
		$('.mob-menu').removeClass('active')
	})
 	$('.contact form').submit(function(e) {
 		e.preventDefault();
 		$('.form-loader').css({
 			"display": "flex",
 			"opacity": 1
 		})

 		var today = new Date().toISOString().substr(0, 10);
 		$('#today').val(today);

 		formSubmit();
 	});

 	$('.form-reset').click(function(e){
 		e.preventDefault();
 		$('input, textarea').val('')
 		$('.select span').text('Choose to book or ask...')
 	})

 	function formSubmit() {
 		var name = $('.input-name').val(),
 			email = $('.input-email').val(),
 			bookOrAsk = $('.input-book-ask').val(),
 			date = $('.input-date').val();

 		if (name && email && bookOrAsk) {
 			var $form = $('.contact form'),
 	    	url = 'https://script.google.com/macros/s/AKfycbyVdhoLDvBY5EG5Rw_RKVj3NtVTlZZR-pInu6ygoYCXlepXBGJY/exec';
 			$.ajax({
 			    url: url,
 			    method: "GET",
 			    dataType: "json",
 			    data: $form.serialize(),
 			    success: function(response) {
 			    	console.log('form submitted');
 			    	$('.form-loader .circles').fadeOut(200, function() {
 			    		$('.form-submitted').fadeIn(200);
 			    	})
 			    	$('.form-submitted button').click(function(e) {
 			    		e.preventDefault();
 			    		$('.form-loader').fadeOut(200)
 			    	})
 			    }
 			})	
 		}
 	}
});
