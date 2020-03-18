document.addEventListener("DOMContentLoaded", function() {
	// DETECT TOUCH
	var isTouchDevice = (('ontouchstart' in window)
	         || (navigator.MaxTouchPoints > 0)
	         || (navigator.msMaxTouchPoints > 0));
	 if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
	   || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
	  isTouchDevice = true;
	 } else {
	  isTouchDevice = false;
	 }

	// HOMEPAGE
	if (document.querySelector('.homepage')) {
		var reviews = new Glide('.reviews__glide', {
		  type: 'carousel',
		  rewind: false,
		  startAt: 0,
		  perView: 1,
		  focusAt: 'center',
		  animationDuration: 800,
		  dragThreshold: 10,
		  gap: 0
		})
		reviews.mount();

		var blog = new Glide('.blog__glide', {
		  type: 'slider',
		  bound: true,
		  rewind: false,
		  dragThreshold: 10,
		  startAt: 0,
		  perView: 2.4,
		  gap: 40,
		  breakpoints: {
		  	768: {
		  	    perView: 1
		  	  }
		  }
		})
		blog.mount();

		// HOVER SCROLLER
		if (!isTouchDevice) {
			let x = -100; 
			let y = -100;
			let move = -75;
			let outside = true;
			let start = null;
			let end = null;
			let duration = 450;
			let startMove = 0;
			let endMove = 0;
			let stop = false;
			let direction = true;
			const cursor = document.querySelector('.cursor');
			const sides = document.querySelectorAll('.perks .left, .perks .right');
			const perksList = document.querySelector('.perks__list');
			const leftBoundary = window.innerWidth / 3;
			const rightBoundary = window.innerWidth * 2 / 3;
				  

			const init = () => {
				document.addEventListener("mousemove", e => {
					x = e.clientX;
					y = e.clientY;
				});

				sides.forEach(function(el) {
					el.addEventListener("mouseleave", e => {
						outside = true;
						startEasing();
					});
					el.addEventListener("mouseenter", e => {
						outside = stop = false;
					});
				})

				
				function startEasing() {
					
					function start(timeStamp) {
						startMove = move;
						endMove = direction ? (startMove + 8) : (startMove - 8);
						start = timeStamp;

						draw(timeStamp);
					}

					function draw(now) {
						if (stop) return;
						if (now - start >= duration) stop = true;

						let a = (now - start) / duration;
						let easingMove = move = startMove + (endMove - startMove) * easing(a);

		         		perksList.style.transform = "translate3d(" + easingMove / 10 + "%,0,0)";
						requestAnimationFrame(draw);
					}
					requestAnimationFrame(start);
				}
				
				const render = (timeStamp) => {

					if (!outside) {
						cursor.style.display = "block";
						sides.forEach((el) => el.style.cursor = "none")
						cursor.style.transform = `translate3d(${x - 10}px, ${y - 30}px,0)`;

						if (x < leftBoundary) {
							direction = false;
							move --;
							cursor.classList.add("left");
							perksList.style.transform = "translate3d(" + move / 10 + "%,0,0)";
							if (Math.round(move) / 10 == -50) move = 0;

						} else if (x > rightBoundary) {
							direction = true;
							move ++;
							cursor.classList.remove("left");
							perksList.style.transform = "translate3d(" + move / 10 + "%,0,0)";
							if (Math.round(move) / 10 == 0) move = -500
						} 
					}  else {
						cursor.style.display = "none";
						sides.forEach((el) => el.style.cursor = "initial")
						// sides.style.cursor = "initial";
					}
					

					requestAnimationFrame(render);
				};
				requestAnimationFrame(render);
			};
			init();

			
			function easing(n){
			    return n*(2-n)
			};
		}
		// HOVER SCROLLER //
	}


	

	// REQUEST ANIMATION FRAME

	let anim = window.requestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60)},
		lines = document.querySelectorAll('.lines-block'),
		parallax = document.querySelectorAll('.parallax'),
		faded = document.querySelectorAll('.faded'),
		cases = document.querySelector('.cases'),
		winOffset, 
		diff, 
		parallaxY = [];
		line = [];
	lines.forEach(function (el) {
		line.push(el.querySelector('.lines'));
	})
	const header = document.querySelectorAll('.header'),
		homepageHead = document.querySelector('.head-homepage') || false,
		reviewsBlock = document.querySelector('.reviews') || false;

	// parallax.forEach(function (el, i) {
	// 	el.addEventListener("animationend", parallax);
 // // || el.addEventListener("webkitAnimationEnd", parallax);
	// 	function parallax() {
	// 		el.classList.add("init")
	// 	}  	  	
	// });
	// el.classList.contains("init") && 

	function loop() {
	  winOffset = window.pageYOffset;

	  lines.forEach(function (el, i) {	
	  	diff = winOffset - el.offsetTop;  	
	    if (isInViewport(el)) {
	      line[i].style.transform = "rotate3d(1,0,0," + diff / 17 + "deg)";
	    } else {
    	  line[i].style.transform = "rotate3d(0,0,0,0deg)";
	    }
  	  });

  	  faded.forEach(function(el, i) {
  	  	if (inView(el)) {
  	  		// if (el.classList.contains()) {}
  	  		console.log()
	      el.classList.add("animated");
	    }
  	  })

  	  parallax.forEach(function (el, i) {
	  	if(isInViewport(cases)) {
	  		parallaxY[i] = (winOffset - cases.offsetTop) * (i + 1) / 15;
	  		el.style.transform = "translate3d(0," + parallaxY[i] + "px,0)";
	  	}
  	  });
  	  

	  if (winOffset > window.innerHeight/2) {
	  	header.forEach((el) => el.classList.add("sticky"))
	  } else {
	  	header.forEach((el) => el.classList.remove("sticky"))
	  }

	  if (homepageHead) {
	  	isInViewport(homepageHead) || coversViewport(reviewsBlock) ? header[0].classList.add("homepage") : header[0].classList.remove("homepage");
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
			header[0].classList.add("overlayed");
			overlay.classList.add("active");
			document.body.style.overflowY = 'hidden';
		} else {
			overlay.classList.remove("active");
			header[0].classList.remove("overlayed");
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
				content.style.height = content.scrollHeight + 85 + "px";
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

		if (isTouchDevice) {
			let contact = document.querySelector('.contact');
			contact.classList.add("simple");
		}
	}


});
