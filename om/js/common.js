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

		
		let x = -100,
			y = -100,
			move = -250,
			movedOut = false;
		const cursor = document.querySelector('.cursor'),
			  perks = document.querySelector('.perks__space'),
			  perksList = document.querySelector('.perks__list'),
			  leftBoundary = window.innerWidth / 3,
			  rightBoundary = window.innerWidth * 2 / 3;
			  

		const initCursor = () => {
			document.addEventListener("mousemove", e => {
				x = e.clientX;
				y = e.clientY;
				// console.log(e.target);
			});
			perksList.addEventListener("mouseenter", e => {
				movedOut = false;

			});
			perksList.addEventListener("mouseleave", e => {
				movedOut = true;
				console.log('movedOut');
				cursor.style.display = "none";
				cursor.style.cursor = "initial";
			});
			
		  
			const render = () => {
				if (!movedOut) {
					if (x < leftBoundary) {
						move --;
						cursor.classList.add("left");
						perksList.style.transform = "translateX(" + move / 10 + "%)";
						if (move / 10 == -50) move = 0;

					} else if (x > rightBoundary) {
						move ++;
						cursor.classList.remove("left");
						perksList.style.transform = "translateX(" + move / 10 + "%)";
						if (move / 10 == 0) move = -500
					} else {
						// move += 1;
						// perksList.style.transform = "translateX(" + move / 10 + "%)";
					}
					if (x < leftBoundary || x > rightBoundary) {
						cursor.style.transform = `translate(${x - 10}px, ${y - 30}px)`;
						cursor.style.display = "block";
						perksList.style.cursor = "none";
					} else {
						cursor.style.display = "none"
						perksList.style.cursor = "initial";
					}
				} else {

				}
				
				requestAnimationFrame(render);
			};
			requestAnimationFrame(render);
		};
		initCursor();
	}
	
	


	function inOutQuad(n){
	    n *= 2;
	    if (n < 1) return 0.5 * n * n;
	    return - 0.5 * (--n * (n - 2) - 1);
	};

	// function startAnimation(domEl){
	//     var stop = false;

	//     // animating x (margin-left) from 20 to 300, for example
	//     var startx = 20;
	//     var destx = 300;
	//     var duration = 1000;
	//     var start = null;
	//     var end = null;

	//     function startAnim(timeStamp) {
	//     	console.log(timeStamp);
	//         start = timeStamp;
	//         end = start + duration;
	//         draw(timeStamp);
	//     }

	//     function draw(now) {
	//         if (stop) return;
	//         if (now - start >= duration) stop = true;
	//         var p = (now - start) / duration;
	//         val = inOutQuad(p);
	//         x = startx + (destx - startx) * val;
	//         $(domEl).css('margin-left', `${x}px`);
	//         requestAnimationFrame(draw);
	//     }

	//     requestAnimationFrame(startAnim);
	// }

	// startAnimation($('#thing'))


	

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
