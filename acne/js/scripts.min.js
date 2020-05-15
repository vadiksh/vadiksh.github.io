document.addEventListener("DOMContentLoaded", function() {

	// var headSlider = new Glide('.head__slider', {
	//   type: 'carousel',
	//   rewind: false,
	//   startAt: 0,
	//   perView: 1,
	//   focusAt: 'center',
	//   animationDuration: 800,
	//   dragThreshold: 30,
	//   swipeThreshold: 20,
	//   gap: 0
	// })
	// headSlider.mount();

	// document.querySelectorAll('.slider').forEach(function(el) {
	// 	new Glide(el, {
	// 	  type: 'slider',
	// 	  bound: true,
	// 	  rewind: false,
	// 	  dragThreshold: 30,
	// 	  swipeThreshold: 20,
	// 	  startAt: 0,
	// 	  perView: 1.8,
	// 	  gap: 30
	// 	}).mount();
	// })
	let duration = 28,
		period = 5,
		period_length = 640 - (period * 640 / duration),
		step = 360 / duration,
		center_angle = (90 + period / 2 * step) * -1;
		i = 1,
		li = document.createElement('li');

	while(i <= duration) {
		
		let item = li.cloneNode();
		item.style.transform = "rotate(" + (step * i) + "deg)";
		document.querySelector('.diagram__dots').appendChild(item);
		i++;
	}
	document.querySelector('.diagram circle').style.strokeDashoffset = period_length;
	document.querySelectorAll('.diagram__centered').forEach(function function_name(el) {
		el.style.transform = "rotate(" + center_angle + "deg)";
	})

	document.querySelectorAll('.orders__slider').forEach(function(el) {
		new Glide(el, {
		  type: 'slider',
		  bound: true,
		  rewind: false,
		  dragThreshold: 30,
		  swipeThreshold: 20,
		  focusAt: 'center',
		  startAt: 0,
		  perView: 1.3,
		  gap: 26
		}).on('run', function(e) {
			console.log(e);
			if(el.index == 0) {
				el.querySelector('.glide__track').style.transform = 'translateX(-5%)'
			} else {
				el.querySelector('.glide__track').style.transform = 'translateX(0)'
			}
		}).mount();
	})
});
