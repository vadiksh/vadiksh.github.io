	// $('.hamburger').click(function(){
	// 	$('.header__mob').addClass('active');
	// })
	// $('.header__mob .close').click(function(){
	// 	$('.header__mob').removeClass('active');
	// })

$(function() {
	$(".header__mob .hamburger").click(function() {
		$('.header__mob-menu').addClass('active');
	})
	$(".header__mob .close").click(function() {
		$('.header__mob-menu').removeClass('active');
	})

	$(".header__banner .button").click(function() {
		$(".header").addClass("active");
		setTimeout(function () {
			$(".video-popup").addClass("active");
			const player = new Plyr('#player-header', {
			    autoplay: true,
			    controls: false
			});
		},1000)
		
		// setTimeout(function() {
		// 	// $("#player-header").trigger("click");
		// },3000)
	})
	$(".video-popup .close").click(function () {

		$(".video-popup iframe").attr("src", "");
		$(".video-popup, .header").removeClass("active");
	})

	var faq = $('.fixed-faq__block');

	$("body").on("click", function(event) {
		if (faq.hasClass('revealed') &&
			!$(event.target).hasClass('faq-button') && 
			!$(event.target).hasClass("fixed-faq__block") && 
			!$(event.target).parents().hasClass('fixed-faq__block')) {
				faq.removeClass('revealed');
				$('.fixed-faq__button').removeClass('rotate');
		}
	})
	$('.faq-button').click(function () {
		if (faq.hasClass('revealed')) {
			faq.removeClass('revealed');
			$('.fixed-faq__button').removeClass('rotate');
		} else {
			faq.addClass('revealed');
			$('.fixed-faq__button').addClass('rotate');
		}
	})
	var infoIndex;
	var linkTabViewed = false;

	$('.info').mouseenter(function() {
		linkTabViewed = true;
		infoIndex = $(this).attr('data-id');
		$($('.info-links')[infoIndex]).addClass('visible');
	})

	$('.info').mouseleave(function() {
		infoIndex = $(this).attr('data-id');
		linkTabViewed = false;

		setTimeout(function () {
			if (!linkTabViewed) {
				$('.info-links').removeClass('visible')
			}
		}, 200)
	})
	$('.info-links').mouseenter(function () {
		linkTabViewed = true;
	})
	$('.info-links').mouseleave(function () {
		linkTabViewed = false;
		setTimeout(function () {
			 $('.info-links').removeClass('visible')
		}, 100)
		
	})
	$('.design__features li').click(function () {
		if (!$(this).hasClass('active')) {
			$(this).addClass('active').siblings().removeClass('active');
			$('.design__screen').css({"opacity": 1, "transition": ".3s"});
			$('.design__screen-list > li').eq($(this).index()).addClass('active').siblings().removeClass('active');
		} else {
			$('.design__screen .close').trigger('click');
		}
	})
	$('.design__screen .close').click(function() {
		$('.design__screen').css({"opacity": 0, "transition": ".3s"});
		$('.design__features li, .design__screen-list > li').removeClass('active');
	})

	$('.options__list ul li').click(function() {
		$(this).addClass('active').siblings().removeClass('active');
		$('.options__screens > li').eq($(this).index()).addClass('active').siblings().removeClass('active');
	})
	$(".mob-info .view").click(function(){
		$(this).next().slideToggle();
	})

	$('.reviews__list').owlCarousel({
	    loop:true,
	    nav: true,
	    dots: false,
	    items: 1,
	    responsiveClass:true,
	    responsive:{
	    }
	})
	if ($(window).width() < 768) {
		$('.social__mob').owlCarousel({
		    loop:true,
		    nav: true,
		    dots: false,
		    items: 1,
		    responsiveClass:true,
		    responsive:{
		    }
		})
	}
	$(window).resize(function() {
		if ($(window).width() < 768) {
			$('.social__mob').owlCarousel({
			    loop:true,
			    nav: true,
			    dots: false,
			    items: 1,
			    responsiveClass:true,
			    responsive:{
			    }
			})
		} else {
			$('.social__mob').trigger("destroy.owl.carousel");
		}
	})
	
	$(".footer__list h3").click(function() {
		$(this).toggleClass("active").next().slideToggle();
	})
});
