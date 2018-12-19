
$(document).ready(function() {

	var scrolled;
	$('.btn-messenger, .btn-outline-messenger').click(function() {
		scrolled = $('body,html').scrollTop();
		
		$('.modal-block form').addClass('modal-active').siblings().removeClass('modal-active');
		$('.modal-block').fadeIn(300);
		
	})
	$('.btn-browse').click(function() {
		$('body,html').animate({
			scrollTop: $('.jobs-block').offset().top - 30
		}, 400);
	})
	// <iframe src="" width="570" height="370" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
	$('.btn-video').click(function() {
		console.log('click');
		scrolled = $('body,html').scrollTop();
		var videoId = $(this).attr('id'),
			videoSrc = this.dataset.src;
			
		$('<iframe>').attr('src', videoSrc) 
			.attr('height', 370)
			.attr('width', 570)
			.attr('frameborder', 0)
			.appendTo('.modal-video.' + videoId);

		$('.modal-video.' + videoId).addClass('modal-active').siblings().removeClass('modal-active');
		$('.modal-block').fadeIn(300);
	})

	$('.modal-close').click(function () {
		$('.modal-block').fadeOut(300);
		$('body, html').scrollTop(scrolled);
		setTimeout(function () {
			$('.modal-video iframe').remove();
		},300)
		$('.modal-block').children().removeClass('modal-active');	
	})

	var requestURL = 'https://portal.adway.ai/api/feed/indeed?token=449a2cb6-b7f6-11e8-96f8-529269fb1459';
	var request = new XMLHttpRequest();

	request.open('GET', requestURL, true);
	request.send();
	request.onload = function() {
		var xml = request.responseXML;
		var jobs = xml.getElementsByTagName('job');
		var jobsArray = Array.prototype.slice.call(jobs);

		var filteredJobs = jobsArray.filter(function(job){
		  if(job.childNodes[7] && job.childNodes[9] && job.childNodes[11]) {
		  	return job.childNodes[11].textContent == "Kista" ||
		           job.childNodes[11].textContent == "Solna" || 
		           job.childNodes[11].textContent == "Stockholm" &&
		           job.childNodes[7].textContent == "Data & IT" &&
		           job.childNodes[9].textContent == "SE";
		  }
		})
		var rowsNum = Math.ceil(filteredJobs.length / 3);
		var jobsRow = $($('.jobs-row')[0]).clone();
		
		for (var i = 0; i < rowsNum - 2; i++) {
			jobsRow.clone().appendTo('.more-jobs');
		}
		if (filteredJobs.length % 3 == 1) {
			$('.jobs-row').last().children('a:nth-child(2), a:nth-child(3)').remove();
		} else if (filteredJobs.length % 3 == 2) {
			$('.jobs-row').last().children().last().remove();
		}
		var days = [],
				months = [],
				years = [],
				titles = [],
				descriptions = [],
				cities = [],
				urls = [];

		for(i = filteredJobs.length - 1; i >= 0; i--) {
			var date = moment(filteredJobs[i].childNodes[1].textContent, 'dddd, MMMM Do YYYY, hh:mm:ss a'),
				day = date.format('DD'),
				month = date.format('MMMM'),
				year = date.format('YYYY'),
				title = filteredJobs[i].childNodes[0].textContent,
				description = filteredJobs[i].childNodes[5].textContent,
				city = filteredJobs[i].childNodes[11].textContent;
				url = filteredJobs[i].childNodes[2].textContent;
			days.push(day);
			months.push(month);
			years.push(year);
			titles.push(title);
			descriptions.push(description);
			cities.push(city);
			urls.push(url);
		}

		for (var j = 0; j < $('.job-link').length; j++) {
			$($('.job-day')[j]).html(days[j]);
			$($('.job-month')[j]).html(months[j]);
			$($('.job-year')[j]).html(years[j]);
			$($('.job-title')[j]).html(titles[j]);
			$($('.job-description')[j]).html(descriptions[j]);
			$($('.job-city')[j]).html(cities[j]);
			$($('.job-link')[j]).attr('href', urls[j]);

		}
		$('.job-description').shave(150);
		if ($(window).innerWidth() > 767) {
			$('.job-title').shave(60);
		}
		$('.load-jobs').click(function() {
			if ($('.more-jobs').hasClass('is-open')) {
				$(this).html('Load all job openings');
				$('body, html').animate({
					scrollTop: scrolled
				}, 1000);
				$('.more-jobs').removeClass('is-open').slideUp(1000);
				$('.more-jobs .job-link').css({
					"opacity": 0,
					"transition": ".3s ease-in"
				})
			} else {
				scrolled = $('body,html').scrollTop();
				$(this).html('Show less');
				$('.more-jobs').addClass('is-open').slideDown(500);
				$('.more-jobs .job-link').css({
					"opacity": 1,
					"transition": ".5s ease-out"
				})
				console.log('scrolled:' + scrolled);
			}
			$('.job-description').shave(150);
			if ($(window).width() > 767) {
				$('.job-title').shave(60);
			}
		});
	    var slideUpShort = {
            distance: '100%',
            origin: 'bottom',
            easing: 'cubic-bezier(0.4,0,0.4,1)',
            opacity: 0,
            delay: 200
        };
		var slideRight = {
	      distance: '100%',
	      origin: 'left',
	      easing: 'cubic-bezier(0.4,0,0.4,1)',
	      opacity: 0,
	      delay: 200
	  	};
	    var slideLeft = {
	      distance: '100%',
	      origin: 'right',
	      easing: 'cubic-bezier(0.4,0,0.4,1)',
	      opacity: 0,
	      delay: 200
	    };
	    ScrollReveal().reveal('.slideUpShort', slideUpShort);
		ScrollReveal().reveal('.slideRight', slideRight);
		ScrollReveal().reveal('.slideLeft', slideLeft);
	}
	var mySwiper = new Swiper ('.swiper-container', {
	    // Optional parameters
	    loop: true,

	    // If we need pagination
	    pagination: {
	      el: '.swiper-pagination',
	    },

	    // Navigation arrows
	    navigation: {
	      nextEl: '.swiper-button-next',
	      prevEl: '.swiper-button-prev',
	    },

	    // And if we need scrollbar
	    scrollbar: {
	      el: '.swiper-scrollbar',
	    },
	})
	
	// $('.modal-block button').on('click', function(e) {
	// 	console.log('clicked');
	// 	var form = $('.modal-block form'),
	//     	url = 'https://script.google.com/macros/s/AKfycbw9nryhh0Kgzm6qlLPb3ILAtQ6oDw70X7E-TkJjRnnqkRgYA9wY/exec';
	// 	e.preventDefault();
	// 	var jqxhr = $.ajax({
	// 	    url: url,
	// 	    method: "GET",
	// 	    dataType: "json",
	// 	    data: form.serializeObject(),
	// 	    success: function(){
	// 	    	console.log('success');
	// 	    	console.log($(this));
	// 	    }
 //  		})	
	// });
	// <form name="contact">  
	//   <input name="email" type="email" placeholder="Email" required>  
	//   <button type="submit">Send</button>  
	//  </form>  
	   
	  // const scriptURL = 'https://script.google.com/macros/s/AKfycbw9nryhh0Kgzm6qlLPb3ILAtQ6oDw70X7E-TkJjRnnqkRgYA9wY/exec'  
	  // const form = $('.modal-block form');  
	  // $('.modal-block button').click(e => {  
	  //  e.preventDefault()  
	  //  fetch(scriptURL, { method: 'POST', body: new FormData(form)})  
	  //   .then(response => console.log('Success!', response))  
	  //   .catch(error => console.error('Error!', error.message))  
	  // }); 
});

