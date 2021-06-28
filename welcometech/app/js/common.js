history.scrollRestoration = "manual";
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

	document.addEventListener('lazybeforeunveil', function(e){
	    var bg = e.target.getAttribute('data-bg');
	    if (window.outerWidth < 768) bg = e.target.getAttribute('data-mob-bg');
	    if(bg){
	        e.target.style.backgroundImage = 'url(' + bg + ')';
	    }
	});

	let head_slides = document.querySelectorAll('.head__slider-item');
	head_slides[0].classList.add('active');
	setInterval(function() {
		head_slides.forEach((el) => {
			el.classList.toggle('active');
		})
	}, 5000)

	let hamb = document.querySelector('.hamburger'),
		menu = document.querySelector('.header__nav'),
		close = document.querySelector('.header__nav .close');

	hamb.addEventListener('click', (e)=>{
		menu.classList.add('active');
	})
	close.addEventListener('click', (e)=>{
		menu.classList.remove('active');
	})

	let scrollTo;
	document.querySelectorAll('a[href*="#"]').forEach((el)=>{
		el.addEventListener('click', (e)=>{
			e.preventDefault();

			if (window.outerWidth < 768) menu.classList.remove('active');
			let scrollTo = document.querySelector(el.attributes.href.value).offsetTop;

			animateScroll(scrollTo);
			
		})
	})
	
	function animateScroll(scrollTo) {
		document.querySelector('html').scrollTop = scrollTo;
	}

	
	let parallax = document.querySelectorAll('.parallax'),
		parallaxY,
		graphs = document.querySelector('.services__graphs'),
		graphsContent = document.querySelectorAll('.services__graph-content'),
		slider = document.querySelector('.slider__wrap'),
		sliderCont = document.querySelector('.slider'),
		sliderNav = document.querySelectorAll('.slider__nav li'),
		community = document.querySelector('.community'),
		impact = document.querySelector('.impact__list'),
		tech = document.querySelector('.tech'),
		services = document.querySelector('.services'),
		start = false,
		sliderIndex = 0,
		interval = 5000,
		autoplay;
	
	isTouchDevice ? autoplay = false : autoplay = true;

	function loop() {
		let winOffset = window.pageYOffset,
			winHeight = window.innerHeight,
			timeFraction;

		if (!start) start = performance.now();

		parallax.forEach((el)=>{
			let img = el.querySelector('img')
				elOffset = el.offsetTop;
			if (isInViewport(el)) {
				parallaxY = (winOffset + winHeight - elOffset) / 7;

				img.style.transform = "translate3d(0," + parallaxY + "px,0)";
			}
		})

		graphsContent.forEach((el) => {
			if (isInViewport(el)) {
				el.classList.add('active');
			} else {
				el.classList.remove('active');
			}
		})

		if(winOffset + window.innerHeight/2 > impact.offsetTop) {
			impact.classList.add('animated');
		}
		if(isInViewport(tech)) {
			tech.classList.add('active');
		}
		if(isInViewport(services)) {
			services.classList.add('active');
		}
		if(isInViewport(community)) {
			community.classList.add('active');
		}
		if(isInViewport(impact)) {
			impact.classList.add('active');
		}


		

		// if (!isTouchDevice && isInViewport(slider)) {
		// 	window.addEventListener('mousemove', checkIfSliderHovered);
		// } else {
		// 	window.removeEventListener('mousemove', checkIfSliderHovered);
		// }

		// function checkIfSliderHovered(e) {
		// 	let rect = sliderCont.getBoundingClientRect();

		// 	if(e.clientX >= rect.left &&
		// 		e.clientX <= rect.right &&
		// 		e.clientY >= rect.top &&
		// 		e.clientY <= rect.bottom) {

		// 		autoplay = false;
		// 		start = performance.now();
				
		// 	} else {
		// 		autoplay = true;
		// 	}
		// }

		sliderNav.forEach((el) => { 
			if (isTouchDevice) {
				el.addEventListener('click', (e) => {				
					sliderIndex = Array.from(sliderNav).indexOf(e.target);
					// if (!autoplay) autoplay = true;
					// start = performance.now();
					// interval = 1;

					activateMenuItem();
					
				});
			} else {
				el.addEventListener('mouseenter', (e) => {				
					sliderIndex = Array.from(sliderNav).indexOf(e.target);
					// if (!autoplay) autoplay = true;
					// start = performance.now();
					// interval = 1;

					activateMenuItem();
					
				});
			}
			
		});


		let raf = requestAnimationFrame(function loop(time) {
			timeFraction = (time - start) / interval;

			draw(timeFraction);
			if (timeFraction >= 1) {
			    // start = performance.now();

			    // if (sliderIndex == 2) {
			    // 	sliderIndex = 0;
			    // } else {
			    // 	sliderIndex++;
			    // }
			}
		});
		

		raf = requestAnimationFrame(loop);
	}
	
	loop();

	function draw(timeFraction) {
  		if (timeFraction >= 1) {
  		// if (timeFraction >= 1 && autoplay) {
  			slider.style.transform = 'translate3d(-' + sliderIndex * (100 / 3) + '%, 0, 0)';
  			
  			activateMenuItem();

  	// 		if (interval == 1) {
			// 	interval = 5000;
			// }
			// if (isTouchDevice) autoplay = false;
		}


	}
	
	function activateMenuItem(e){
		sliderNav.forEach((el) => { 
			if (el.classList.contains('active')) el.classList.remove('active'); 
		})
		sliderNav[sliderIndex].classList.add('active');
	}

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

	let tech_index = 0,
		items = document.querySelectorAll('.tech__steps li');
	setInterval(function() {
		if (tech_index == 3) {
			tech_index = 0;
		}
		if (tech_index <= 2) {
			tech_index ? items[tech_index - 1].classList.remove('active') : items[2].classList.remove('active');
			items[tech_index].classList.add('active');
			tech_index++;
		} 
		
	}, 3000);




});


