document.addEventListener("DOMContentLoaded", function() {

	var headSlider = new Glide('.head__slider', {
	  type: 'carousel',
	  rewind: false,
	  startAt: 0,
	  perView: 1,
	  focusAt: 'center',
	  animationDuration: 800,
	  dragThreshold: 30,
	  swipeThreshold: 20,
	  gap: 0
	})
	headSlider.mount();

	document.querySelectorAll('.slider').forEach(function(el) {
		new Glide(el, {
		  type: 'slider',
		  bound: true,
		  rewind: false,
		  dragThreshold: 30,
		  swipeThreshold: 20,
		  startAt: 0,
		  perView: 1.8,
		  gap: 30
		}).mount();
	})
});
