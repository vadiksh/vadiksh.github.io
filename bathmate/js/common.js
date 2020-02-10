$(function() {
	var scrolled;
	$(window).scroll(function() {
		scrolled = $(window).scrollTop();
		if (scrolled > 10) {
			$('.header').addClass('sticky');
		} else {
			$('.header').removeClass('sticky');
		}
	})
	$('.hamburger').click(function() {
		$('.header__nav').addClass('active');
	})
	$('.close').click(function() {
		$('.header__nav').removeClass('active');
	})
	$('a[href*="#"]').click(function(e) {
		e.preventDefault();
		var href = $(this).attr('href');
		if ($(window).width() < 1024) {
			$('.header__nav').removeClass('active');
			$('html,body').animate({
				scrollTop: $(href).offset().top - 60
			},500)
		} else {
			$('html,body').animate({
				scrollTop: $(href).offset().top - 70
			},500)
		}
	})
	$('.banner .owl-carousel').owlCarousel({
		loop:true,
		items: 1,
		nav: false,
		dots: false,
		navSpeed: 700,
		autoplay: true,
		autoplayTimeout: 3500,
		autoplayHoverPause: true,
		autoplaySpeed: 700,
		dragEndSpeed: 700,
		onChanged: changeLogo
	});
	function changeLogo(e) {
		var i = e.item.index;
		if ($($('.owl-item')[i]).children('.slide1').length || $($('.owl-item')[i]).children('.slide2').length) {
			$('.header').removeClass('white');
		} else {
			$('.header').addClass('white');
		}
	}
	$('.orders input').on("input change", function() {
		let clicks = $(this).val();
		let comissions = ["$1,890.00","$3,780.00","$5,670.00","$7,560.00","$9,450.00","$11,340.00","$13,230.00","$15,120.00","$17,010.00","$18,900.00"]

		

		if (clicks >= 100 && clicks < 200) {
			$('.orders__comission span').html(comissions[0])
		} else if (clicks >= 200 && clicks < 300) {
			$('.orders__comission span').html(comissions[1])
		} else if (clicks >= 300 && clicks < 400) {
			$('.orders__comission span').html(comissions[2])
		} else if (clicks >= 400 && clicks < 500) {
			$('.orders__comission span').html(comissions[3])
		} else if (clicks >= 500 && clicks < 600) {
			$('.orders__comission span').html(comissions[4])
		} else if (clicks >= 600 && clicks < 700) {
			$('.orders__comission span').html(comissions[5])
		} else if (clicks >= 700 && clicks < 800) {
			$('.orders__comission span').html(comissions[6])
		} else if (clicks >= 800 && clicks < 900) {
			$('.orders__comission span').html(comissions[7])
		} else if (clicks >= 900 && clicks < 1000) {
			$('.orders__comission span').html(comissions[8])
		} else {
			$('.orders__comission span').html(comissions[9])
		}
	})
});
