// document.addEventListener("DOMContentLoaded", function() {

	// HOMEPAGE
	if (document.querySelector('.homepage')) {
		var reviews = new Glide('.reviews__glide', {
		  type: 'slider',
		  rewind: false,
		  startAt: 0,
		  perView: 1,
		  focusAt: 'center',
		  gap: 0
		})
		reviews.mount();

		var blog = new Glide('.blog__glide', {
		  type: 'slider',
		  rewind: false,
		  startAt: 0,
		  perView: 2.9,
		  gap: 40
		})
		blog.mount();
	}
	

	
		
	let x = -100,
		y = -100,
		move = 0;
	const cursor = document.querySelector('.cursor'),
		  perks = document.querySelector('.perks__space'),
		  perksList = document.querySelector('.perks__list'),
		  leftBoundary = window.innerWidth / 3,
		  rightBoundary = window.innerWidth * 2 / 3;

	const initCursor = () => {
		perks.addEventListener("mousemove", e => {
			x = e.clientX;
			y = e.clientY;
		});
		perks.addEventListener("mouseleave", e => {
			x = window.innerWidth / 2;
		});
	  
		const render = () => {
			if (x < leftBoundary) {
				move -= 1;
				if (move / 10 == -50) {
					move = 0;
				}
				perksList.style.transform = "translateX(" + move / 10 + "%)";

			} else if (x > rightBoundary) {
				// cursor.style.transform = `translate(${x}px, ${y}px)`;
				move += 1;
				if (move / 10 == 0) {
					move = -500;
				}
				perksList.style.transform = "translateX(" + move / 10 + "%)";
			} else {
				// move += 1;
				// perksList.style.transform = "translateX(" + move / 10 + "%)";
			}

			requestAnimationFrame(render);
		};
		requestAnimationFrame(render);
	};
	initCursor();
	

	// REQUEST ANIMATION FRAME

	let anim = window.requestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60)},
		els = document.querySelectorAll('.lines-block'),
		faded = document.querySelectorAll('.faded'),
		winOffset, 
		diff, 
		lines = [];
	els.forEach(function (el) {
		lines.push(el.querySelector('.lines'));
	})
	const header = document.querySelector('.header'),
		homepageHead = document.querySelector('.head-homepage') || false,
		reviewsBlock = document.querySelector('.reviews') || false;

	function loop() {
	  winOffset = window.pageYOffset;
	  els.forEach(function (el, i) {	
	  	diff = winOffset - el.offsetTop;  	
	    if (isInViewport(el)) {
	      lines[i].style.transform = "rotateX(" + diff / 15 + "deg)";
	    } else {
    	  lines[i].style.transform = "rotateX(0deg)";
	    }
  	  });

  	  faded.forEach(function(el, i) {
  	  	if (inView(el)) {
	      el.classList.add("animated");
	    }
  	  })

	  if (winOffset > window.innerHeight/2) {
	  	header.classList.add("sticky");
	  } else {
	  	header.classList.remove("sticky");
	  }

	  if (homepageHead) {
	  	isInViewport(homepageHead) || coversViewport(reviewsBlock) ? header.classList.add("homepage") : header.classList.remove("homepage");
	  }

	  anim(loop);
	}
	loop();


	function isInViewport(el) {
	  var rect = el.getBoundingClientRect();
	  return (
	    (rect.top <= 0 && rect.bottom >= 0)
	    ||
	    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
	      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
	    ||
	    (rect.top >= 0 &&
	      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
	  );
	}
	function coversViewport(el) {
	  var rect = el.getBoundingClientRect();
	  return rect.top <= 50 && rect.bottom >= 50;
	}
	function inView(el) {
	  var rect = el.getBoundingClientRect();
	  return rect.top - window.innerHeight <= -200;
	}
	

	// HAMBURGER
	const hamb = document.querySelector('.hamburger'),
		overlay = document.querySelector('.overlay'),
		overlayScroll = document.querySelector('.overlay__scroll');

	hamb.addEventListener("click", (e) => {
		if (!overlay.classList.contains("active")) {
			header.classList.add("overlayed");
			overlay.classList.add("active");
			document.body.style.overflowY = 'hidden';
		} else {
			overlay.classList.remove("active");
			header.classList.remove("overlayed");
			document.body.style.overflowY = 'scroll';
			overlayScroll.scrollTop = 0;
		}
	});

	// SERVICES
	document.querySelectorAll(".services__title").forEach(el => { 
		el.addEventListener("click", (e) => {
			let content = el.nextElementSibling;
			if (el.classList.contains("active")) {
				el.classList.remove("active");
				content.style.height = "0px";
			} else {
				el.classList.add("active");
				content.style.height = content.scrollHeight + "px";
			}	
		});	
	});
	
	// CONTACT
	if (document.querySelector('.contact')) {
		let inputs = document.querySelectorAll('.contact input, .contact textarea');
		inputs.forEach(function (el) {
			el.addEventListener("input", (e) => {
				if (el.value.length) {
					el.classList.add("active");
				} else {
					el.classList.remove("active");
				}
			});
		})
		let select = document.querySelector('.contact select');
		select.addEventListener("input", (e) => {
			if (select.selectedIndex !== 0) {
				select.classList.add("active");
			} else {
				select.classList.remove("active");
			}
		});
	}
	




// });
