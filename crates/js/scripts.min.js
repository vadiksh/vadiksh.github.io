$(function() {
	$(".header__mob .hamburger").click(function() {
		$(".header__mob-menu").addClass("active");
	});
	$(".header__mob .close").click(function() {
		$(".header__mob-menu").removeClass("active");
	});

	$(".search-icon").click(function(e) {
		e.preventDefault();
		$(".search-popup").addClass("active");
	});
	$(".search-popup .close").click(function() {
		$(".search-popup").removeClass("active");
	});

	var player;
	$(".header__banner .button").click(function() {
		$(".header, .video-popup").addClass("active");
		player = new Plyr("#player", {
		    autoplay: true,
		    controls: false
		});
		player.poster = "";
		setTimeout(function() {
			player.play();
		},2000)
	});
	$(".video-popup .close").click(function () {
		player.destroy();
		$(".video-popup, .header").removeClass("active");
	});

	var playerReady = false;
	var playerScroll = new Plyr("#features-player", {
	    loop: {active: true},
	    controls: false
	});
	
	playerScroll.on('ready', event => {
	    playerReady = true;
	    playerScroll.volume = 0;
	    playerScroll.play();
	});


	var scrolled;
	$(window).scroll(function() {
		if (playerReady) {
			scrolled = $(window).scrollTop();
			if (scrolled + $(window).height() > $(".features").offset().top &&
				scrolled < $('.stats').offset().top) {
				if (!playerScroll.playing) {
					console.log('play');
					playerScroll.play();
				}
			} else if (playerScroll.playing) {
				console.log('pause');
				playerScroll.pause();
			}
		}
		
	});

	var faq = $(".fixed-faq__block");

	$("body").on("click", function(event) {
		if (faq.hasClass("revealed") &&
			!$(event.target).hasClass("faq-button") && 
			!$(event.target).hasClass("fixed-faq__block") && 
			!$(event.target).parents().hasClass("fixed-faq__block")) {
				faq.removeClass("revealed");
				$(".fixed-faq__button").removeClass("rotate");
		}
	});
	$(".faq-button").click(function () {
		if (faq.hasClass("revealed")) {
			faq.removeClass("revealed");
			$(".fixed-faq__button").removeClass("rotate");
		} else {
			faq.addClass("revealed");
			$(".fixed-faq__button").addClass("rotate");
		}
	});
	var infoIndex;
	var linkTabViewed = false;

	$(".stats__list i").mouseenter(function() {
		linkTabViewed = true;
		// infoIndex = $(this).attr("data-id");
		// $($(".stats-popup")[infoIndex]).addClass("visible");
		$(".stats-popup").addClass("visible");
	});

	$(".stats__list i").mouseleave(function() {
		// infoIndex = $(this).attr("data-id");
		linkTabViewed = false;

		setTimeout(function () {
			if (!linkTabViewed) {
				$(".stats-popup").removeClass("visible")
			}
		}, 200)
	});
	$(".stats-popup").mouseenter(function () {
		linkTabViewed = true;
	});
	$(".stats-popup").mouseleave(function () {
		linkTabViewed = false;
		setTimeout(function () {
			 $(".stats-popup").removeClass("visible")
		}, 100)
	});


	$(".design__features li").click(function () {
		if (!$(this).hasClass("active")) {
			$(this).addClass("active").siblings().removeClass("active");
			$(".design__screen").css({"opacity": 1, "transition": ".3s"});
			$(".design__screen-list > li").eq($(this).index()).addClass("active").siblings().removeClass("active");
		} else {
			$(".design__screen .close").trigger("click");
		}
	});
	$(".design__screen .close").click(function() {
		$(".design__screen").css({"opacity": 0, "transition": ".3s"});
		$(".design__features li, .design__screen-list > li").removeClass("active");
	});
	$(".color-options").owlCarousel({
	    loop:true,
	    nav: true,
	    dots: false,
	    slideBy: 4,
	    items: 4,
	    responsiveClass:true,
	    responsive:{
	    }
	});

	var src,
		color;
	$(".color-options .owl-item").click(function() {
		src = $(this).find('img').attr("src");
		color = $(this).find('span').html();
		$(".color-demo").css({
			"opacity": 0,
			"transition": ".3s ease-in"
		})
		setTimeout(function () {
			$(".color-demo img").attr("src", src);
			$(".color-demo span").html(color);
			$(".color-demo").css({
				"opacity": 1,
				"transition": ".25s .2s ease-out"
			})
		}, 350)
	})

	var product;
	$(".options__list ul li").click(function() {
		product = $(".options__screens > li").eq($(this).index());
		src = product.find('.options__image > img').attr("data-src");
		color = product.find('select[name="color"] option:selected').attr("data-src");
		
		$(this).addClass("active").siblings().removeClass("active");
		product.addClass("active").siblings().removeClass("active");
		if (color) {
			src = color;
		}
		changeImg($(".options__image img, .mob-info > img"));		
	});

	$(".options__details .owl-carousel").owlCarousel({
	    loop:true,
	    nav: true,
	    dots: false,
	    slideBy: 4,
	    items: 4,
	    margin: 0,
	    responsiveClass:true,
	    responsive:{
	    }
	});
	$(".options__details li").click(function() {
		src = $(this).find('img').attr("src");
		changeImg($(".options__image img, .mob-info > img"))
	})

	$(".options__form select[name='color']").change(function () {
		src = $(this).find('option:selected').attr('data-src');
		if ($(this).parents('.form').find('select[name="size"] option:selected').hasClass('alt')) {
			src = $(this).find('option:selected').attr('data-src-alt');
		}
		changeImg($(".options__image img, .mob-info > img"))
	})
	$(".options__form .size-select").change(function () {
		src = $(this).parents('.form').find('select[name="color"] option:selected').attr('data-src');
		if ($(this).find('option:selected').hasClass('alt')) {
			src = $(this).parents('.form').find('select[name="color"] option:selected').attr('data-src-alt');
		}
		changeImg($(".options__image img, .mob-info > img"))
	})


	function changeImg(img) {
		img.css({
			"opacity": 0,
			"transition": ".3s ease-in"
		})
		setTimeout(function () {
			img.attr("src", src);
			img.css({
				"opacity": 1,
				"transition": ".25s .5s ease-out"
			})
		}, 350)
	}

	$(".mob-info .view").click(function(){
		$(this).next().slideToggle();
	});

	$(".reviews__list").owlCarousel({
	    loop:true,
	    nav: true,
	    dots: false,
	    items: 1,
	    responsiveClass:true,
	    responsive:{
	    }
	});
	
	$(".chart__mob .options li").click(function() {
		console.log($(this));
		src = $(this).attr("data-src");
		$(this).addClass('active').siblings().removeClass('active');
		changeImg($(".chart__mob .mob-img"));
	})

	var scene,
		scrollingArea = 500,
		scrolledFraction,
		deviceHeight = $(window).outerHeight();

	if ($(window).width() < 1024) {
		$(".design").css({"height": deviceHeight + "px"});
		$("#scroll-pin").css({"height":   deviceHeight + scrollingArea + "px"})

		$(window).scroll(function() {
			scrolled = $(window).scrollTop() - $("#scroll-pin").offset().top;
			scrolledFraction = scrolled / scrollingArea;
			if ($(window).outerHeight() > deviceHeight) {
				deviceHeight = $(window).outerHeight();
				$(".design").css({"height": deviceHeight + "px"});
				$("#scroll-pin").css({"height":   deviceHeight + scrollingArea + "px"})
			}

			if ($(window).scrollTop() > $("#scroll-pin").offset().top) {
				$('#scroll-pin').addClass('active');
			} else {
				$('#scroll-pin').removeClass('active');
			}
			if ($(window).scrollTop() > $("#scroll-pin").offset().top && $(window).scrollTop() < $("#scroll-pin").offset().top + scrollingArea) {
				$(".design.fixed-copy").addClass("visible");
			} else {
				$(".design.fixed-copy").removeClass("visible");
			}
			// if (scrolled) {}
			 if (scrolledFraction > 0 && scrolledFraction < 1/9) {
				$(".design__features li:nth-of-type(1)").addClass("active").siblings().removeClass("active")
			} else if (scrolledFraction > 1/9 && scrolledFraction < 2/9) {
				$(".design__features li:nth-of-type(2)").addClass("active").siblings().removeClass("active")
			} else if (scrolledFraction > 2/9 && scrolledFraction < 3/9) {
				$(".design__features li:nth-of-type(3)").addClass("active").siblings().removeClass("active")
			} else if (scrolledFraction > 3/9 && scrolledFraction < 4/9) {
				$(".design__features li:nth-of-type(4)").addClass("active").siblings().removeClass("active")
			} else if (scrolledFraction > 4/9 && scrolledFraction < 5/9) {
				$(".design__features li:nth-of-type(5)").addClass("active").siblings().removeClass("active")
			} else if (scrolledFraction > 5/9 && scrolledFraction < 6/9) {
				$(".design__features li:nth-of-type(6)").addClass("active").siblings().removeClass("active")
			} else if (scrolledFraction > 6/9 && scrolledFraction < 7/9) {
				$(".design__features li:nth-of-type(7)").addClass("active").siblings().removeClass("active")
			} else if (scrolledFraction > 7/9 && scrolledFraction < 8/9) {
				$(".design__features li:nth-of-type(8)").addClass("active").siblings().removeClass("active")
			} else if (scrolledFraction > 8/9 && scrolledFraction < 1) {
				$(".design__features li:nth-of-type(9)").addClass("active").siblings().removeClass("active")
			}
		});
	}

	$(window).resize(function() {
		if ($(window).width() < 768) {
			$(".social__mob").owlCarousel({
			    loop:true,
			    nav: true,
			    dots: false,
			    items: 1,
			    responsiveClass:true,
			    responsive:{
			    }
			});
		} else {
			$(".social__mob").trigger("destroy.owl.carousel");
		}
	});

	$(window).trigger("resize");
	
	if ($(window).width() < 768) {
		$(".footer__list h3").click(function() {
			$(this).toggleClass("active").next().slideToggle();
		});
	}

});