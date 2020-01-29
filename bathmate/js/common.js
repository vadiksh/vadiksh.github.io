$(function() {

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
		dragEndSpeed: 700
	});
	$('.orders input').on("input change", function() {
		let clicks = $(this).val();
		let comissions = [3780, 7560, 11340, 15120, 18900, 22680, 26460, 30240, 34020, 37800]
		console.log(clicks);
		
		if (clicks >= 100 && clicks < 200) {
			$('.orders__comission span').html('$' + comissions[0])
		} else if (clicks >= 200 && clicks < 300) {
			$('.orders__comission span').html('$' + comissions[1])
		} else if (clicks >= 300 && clicks < 400) {
			$('.orders__comission span').html('$' + comissions[2])
		} else if (clicks >= 400 && clicks < 500) {
			$('.orders__comission span').html('$' + comissions[3])
		} else if (clicks >= 500 && clicks < 600) {
			$('.orders__comission span').html('$' + comissions[4])
		} else if (clicks >= 600 && clicks < 700) {
			$('.orders__comission span').html('$' + comissions[5])
		} else if (clicks >= 700 && clicks < 800) {
			$('.orders__comission span').html('$' + comissions[6])
		} else if (clicks >= 800 && clicks < 900) {
			$('.orders__comission span').html('$' + comissions[7])
		} else if (clicks >= 900 && clicks < 1000) {
			$('.orders__comission span').html('$' + comissions[8])
		} else {
			$('.orders__comission span').html('$' + comissions[9])
		}
	})
});
