$(function() {
	$(".header__mob .hamburger").click(function() {
		$(".header__mob-menu").addClass("active");
	});
	$(".header__mob .close").click(function() {
		$(".header__mob-menu").removeClass("active");
	});
	var player;
	$(".header__banner .button").click(function() {
		$(".header, .video-popup").addClass("active");
		player = new Plyr("#player", {
		    autoplay: true,
		    controls: false
		});
		player.poster = "";
	});
	$(".video-popup .close").click(function () {
		player.destroy();
		$(".video-popup, .header").removeClass("active");
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

	$(".info").mouseenter(function() {
		linkTabViewed = true;
		infoIndex = $(this).attr("data-id");
		$($(".info-links")[infoIndex]).addClass("visible");
	});

	$(".info").mouseleave(function() {
		infoIndex = $(this).attr("data-id");
		linkTabViewed = false;

		setTimeout(function () {
			if (!linkTabViewed) {
				$(".info-links").removeClass("visible")
			}
		}, 200)
	});
	$(".info-links").mouseenter(function () {
		linkTabViewed = true;
	});
	$(".info-links").mouseleave(function () {
		linkTabViewed = false;
		setTimeout(function () {
			 $(".info-links").removeClass("visible")
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

	$(".options__list ul li").click(function() {
		$(this).addClass("active").siblings().removeClass("active");
		$(".options__screens > li").eq($(this).index()).addClass("active").siblings().removeClass("active");
	});
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
		
	var scene,
		scrolled,
		scrolledFraction,
		deviceHeight = $(window).outerHeight();
	$(window).scroll(function() {
		if ($(window).width() < 1024) {
			scrolled = $(window).scrollTop() - $("#scroll-pin").offset().top;
			scrolledFraction = scrolled / 500;

			$(".design").css({"height": deviceHeight + "px"});
			$("#scroll-pin").css({"height":   deviceHeight + 500 + "px"})

			if ($(window).scrollTop() > $("#scroll-pin").offset().top) {
				$('#scroll-pin').addClass('active');
			} else {
				$('#scroll-pin').removeClass('active');
			}
			if ($(window).scrollTop() > $("#scroll-pin").offset().top && $(window).scrollTop() < $("#scroll-pin").offset().top + 500) {
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
		}
		
	})

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

		// if ($(window).width() < 1024) {
		// 	var controller = new ScrollMagic.Controller();
		// 	var deviceHeight = $(window).height();

		// 	$(".design").css({"height": deviceHeight + "px"});
		// 	$("#scroll-pin").css({"height": deviceHeight + 300 + "px"})


			// if (e.progress > 0 && e.progress < 1/9) {
			// 	$(".design__features li:nth-of-type(1)").addClass("active").siblings().removeClass("active")
			// } else if (e.progress > 1/9 && e.progress < 2/9) {
			// 	$(".design__features li:nth-of-type(2)").addClass("active").siblings().removeClass("active")
			// } else if (e.progress > 2/9 && e.progress < 3/9) {
			// 	$(".design__features li:nth-of-type(3)").addClass("active").siblings().removeClass("active")
			// } else if (e.progress > 3/9 && e.progress < 4/9) {
			// 	$(".design__features li:nth-of-type(4)").addClass("active").siblings().removeClass("active")
			// } else if (e.progress > 4/9 && e.progress < 5/9) {
			// 	$(".design__features li:nth-of-type(5)").addClass("active").siblings().removeClass("active")
			// } else if (e.progress > 5/9 && e.progress < 6/9) {
			// 	$(".design__features li:nth-of-type(6)").addClass("active").siblings().removeClass("active")
			// } else if (e.progress > 6/9 && e.progress < 7/9) {
			// 	$(".design__features li:nth-of-type(7)").addClass("active").siblings().removeClass("active")
			// } else if (e.progress > 7/9 && e.progress < 8/9) {
			// 	$(".design__features li:nth-of-type(8)").addClass("active").siblings().removeClass("active")
			// } else if (e.progress > 8/9 && e.progress < 1) {
			// 	$(".design__features li:nth-of-type(9)").addClass("active").siblings().removeClass("active")
			// }


			// scene = new ScrollMagic.Scene({
			// 	offset: 0,
			// 	duration: 100,
			// 	triggerElement: "#trigger-pin",
			// 	triggerHook: 0
			// })
			// .setPin("#scroll-pin")
			// .addTo(controller)
			// .on("progress", function(e) {
			// 	if (e.progress > 0 && e.progress < 1/9) {
			// 		$(".design__features li:nth-of-type(1)").addClass("active").siblings().removeClass("active")
			// 	} else if (e.progress > 1/9 && e.progress < 2/9) {
			// 		$(".design__features li:nth-of-type(2)").addClass("active").siblings().removeClass("active")
			// 	} else if (e.progress > 2/9 && e.progress < 3/9) {
			// 		$(".design__features li:nth-of-type(3)").addClass("active").siblings().removeClass("active")
			// 	} else if (e.progress > 3/9 && e.progress < 4/9) {
			// 		$(".design__features li:nth-of-type(4)").addClass("active").siblings().removeClass("active")
			// 	} else if (e.progress > 4/9 && e.progress < 5/9) {
			// 		$(".design__features li:nth-of-type(5)").addClass("active").siblings().removeClass("active")
			// 	} else if (e.progress > 5/9 && e.progress < 6/9) {
			// 		$(".design__features li:nth-of-type(6)").addClass("active").siblings().removeClass("active")
			// 	} else if (e.progress > 6/9 && e.progress < 7/9) {
			// 		$(".design__features li:nth-of-type(7)").addClass("active").siblings().removeClass("active")
			// 	} else if (e.progress > 7/9 && e.progress < 8/9) {
			// 		$(".design__features li:nth-of-type(8)").addClass("active").siblings().removeClass("active")
			// 	} else if (e.progress > 8/9 && e.progress < 1) {
			// 		$(".design__features li:nth-of-type(9)").addClass("active").siblings().removeClass("active")
			// 	}
			// });
		// } else {
			// scene.destroy(true);
		// }
	});

	$(window).trigger("resize");
	
	$(".footer__list h3").click(function() {
		$(this).toggleClass("active").next().slideToggle();
	});

});