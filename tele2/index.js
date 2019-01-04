
$(document).ready(function() {

	var scrolled;
	var h = location.hash;

	$('.btn-messenger, .btn-outline-messenger').click(function() {
		location.hash = '#subscribe';
		scrolled = $(window).scrollTop();
		$('.modal-block form').addClass('modal-active').siblings().removeClass('modal-active');
		$('.modal-block').fadeIn(300, function() {
			if ($(window).width() > 768) {
				$('body').addClass('overflow-hidden');
			}
		});
	})
	$('.nav-link').click(function() {
		var urlParam = this.dataset.id;
		// var newUrl = window.location + '?' + urlParam;
		var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + urlParam;
		console.log(urlParam)
		if (urlParam == 'people') {
			$('body,html').animate({
				scrollTop: $('#' + urlParam).offset().top
			}, 500, function() {
				history.pushState('', 'Join the Tech Community', newUrl);
			})
		} else if (urlParam == 'why' || urlParam == 'jobs') {
			$('body,html').animate({
				scrollTop: $('#' + urlParam).offset().top - 30
			}, 500, function() {
				history.pushState('', 'Join the Tech Community', newUrl);
			})
		}
	})
	// $('a[href^="#"]').click(function(e) {
	// 	e.preventDefault();

	// 	var elementId = $(this).attr('href');
	// 	if (elementId == '#people') {
	// 		$('body,html').animate({
	// 			scrollTop: $(elementId).offset().top
	// 		}, 500, function() {
	// 			location.hash = elementId;
	// 		})
	// 	} else if (elementId == '#why' || elementId == '#jobs') {
	// 		$('body,html').animate({
	// 			scrollTop: $(elementId).offset().top - 30
	// 		}, 500, function() {
	// 			location.hash = elementId;
	// 		})
	// 	}
		
	// })

	$('.btn-video').click(function(e) {
		scrolled = $(window).scrollTop();
		var videoSrc = this.dataset.src;
		e.preventDefault();

		if ($(this).hasClass('full-screen')) {
			$('<iframe>').attr('src', videoSrc)
				.attr('frameborder', 0)
				.appendTo('.modal-video-full');
			$('.modal-video-full').addClass('modal-active').siblings().removeClass('modal-active');
			$('.modal-block').fadeIn(300, function() {
				if ($(window).width() > 768) {
					$('body').addClass('overflow-hidden');
				}
				location.hash = '#video';
			});
		} else {
			var videoId = $(this).attr('id');

			$('.modal-video.' + videoId).addClass('modal-active').siblings().removeClass('modal-active');
			$('<iframe>').attr('src', videoSrc) 
				.attr('height', 370)
				.attr('width', 570)
				.attr('frameborder', 0)
				.appendTo('.modal-video.' + videoId + ' .video-content');
			$('.modal-block').fadeIn(300, function() {
				if ($(window).width() > 768) {
					$('body').addClass('overflow-hidden');
				}
				location.hash = '#' + videoId;
			});
		}
		
	})

	$('.btn-full-story').click(function(e) {
		var storyId = $(this).attr('id');
		scrolled = $(window).scrollTop();
		e.preventDefault();
		
		$('.modal-story.' + storyId).addClass('modal-active').siblings().removeClass('modal-active');
		$('.modal-block').fadeIn(300, function () {
			if ($(window).width() > 768) {
				$('body').addClass('overflow-hidden');
			}
			location.hash = '#' + storyId;
		});
	})

	closeModalOnBlankSpace('modal-story');
	closeModalOnBlankSpace('modal-video');
	
	function closeModalOnBlankSpace(modalClass) {
		$('.' + modalClass).click(function(event) {
			if ($(event.target).hasClass(modalClass)) {
				$('.modal-close').trigger('click');
			}	
		})
		$('.' + modalClass).mouseenter(function(){
			$(this).css({"cursor": "pointer"})
		})
		$('.modal-story-container').mouseenter(function(){
			$(this).css({"cursor": "default"})
		})
	}

	$('.modal-close, .form-close, .modal-back').click(function (e) {
		e.preventDefault();
		location.hash = '#'
		$('body').removeClass('overflow-hidden');
		$('.form-loader, .form-submitted').fadeOut(300);
		$('.modal-block').fadeOut(300);
		$('body, html').scrollTop(scrolled);
		setTimeout(function () {
			$('.modal-video iframe, .modal-video-full iframe').remove();
			$('.modal-block').children().removeClass('modal-active');
			$('.form-submitted').hide();
		},300)
	})


	$(window).on('hashchange', function() {
		h = location.hash;

		if (h == '') {
			$('.modal-close').trigger('click');
		}
		else if (h == '#why' || h == '#people' || h == '#jobs') {
			$('.modal-block').fadeOut(300);
			$('body').removeClass('overflow-hidden');
			$('body,html').animate({
				scrollTop: $(h).offset().top
			},400)
		} 
		else if ($('.modal-block .' + h.substr(1))) {
			if (!$('.body').hasClass('overflow-hidden')) {
				// $('body').addClass('overflow-hidden');
				$('.modal-block').fadeIn(300);
				$('.modal-story.' + h.substr(1)).addClass('modal-active').siblings().removeClass('modal-active');
			}
		}
	})
	$(window).scroll(function() {
		var scrollPosition = $(window).scrollTop();
		if (scrollPosition > $('.head-banner').height() + 100) {
			$('.head-banner video').hide();
		} else {
			$('.head-banner video').show();
		}
	})
	var requestURL = 'https://portal.adway.ai/api/feed/internal?token=3013c2e6-05cd-11e9-8eb2-f2801f1b9fd1';
	var request = new XMLHttpRequest();

	request.open('GET', requestURL, true);
	request.send();
	request.onload = function() {
		var xml = request.responseXML;
		var jobs = xml.getElementsByTagName('job');
		var jobsArray = Array.prototype.slice.call(jobs);
		filteredJobs = [];

		for (var i = 0; i < jobsArray.length; i++) {

			if (jobsArray[i].childNodes[16] && jobsArray[i].childNodes[9].textContent === "IT") {
				var string = jobsArray[i].childNodes[16].textContent;

				if (string.indexOf("Kista") ||
	  		        string.indexOf("Solna") || 
	  		        string === "Stockholm") {
					  filteredJobs.push(jobsArray[i]);
				}
			} else if (jobsArray[i].childNodes[9].textContent === "IT") {
				filteredJobs.push(jobsArray[i]);
			}
		}
		filteredJobs.sort(function(a, b) {
			return moment(a.childNodes[2].textContent, 'dddd, MMMM Do YYYY, hh:mm:ss a') - moment(b.childNodes[2].textContent, 'dddd, MMMM Do YYYY, hh:mm:ss a')
		})
		var days = [],
			months = [],
			years = [],
			titles = [],
			descriptions = [],
			cities = [],
			urls = [];
		for(i = filteredJobs.length - 1; i >= 0; i--) {
			var date = moment(filteredJobs[i].childNodes[2].textContent, 'dddd, MMMM Do YYYY, hh:mm:ss a'),
				day = date.format('DD'),
				month = date.format('MMMM'),
				year = date.format('YYYY'),
				title = filteredJobs[i].childNodes[0].textContent,
				description = filteredJobs[i].childNodes[7].textContent,
				city = '',
				url = filteredJobs[i].childNodes[4].textContent;
			if(!filteredJobs[i].childNodes[16]) {
				city = "Stockholm";
			} else {
				city = filteredJobs[i].childNodes[16].textContent;
			}
			days.push(day);
			months.push(month);
			years.push(year);
			titles.push(title);
			descriptions.push(description);
			cities.push(city);
			urls.push(url);
		}
		
		if ($(window).width() > 767) {
			var rowsNum = Math.ceil(filteredJobs.length / 3),
				jobsRow = $($('.jobs-row')[0]).clone(),
				otherJobs = filteredJobs.length - 6;


			for (var i = 0; i < rowsNum - 2; i++) {
				jobsRow.clone().appendTo('.more-jobs');
			}

			if (filteredJobs.length % 3 == 1) {
				$('.jobs-row').last().children('a:nth-child(2), a:nth-child(3)').remove();
			} else if (filteredJobs.length % 3 == 2) {
				$('.jobs-row').last().children().last().remove();
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
			$('.job-title').shave(60);
		} else {
			rowsNum = filteredJobs.length;
			jobsRow = $($('.jobs-row-mob')[0]).clone();
			otherJobs = filteredJobs.length - 4;

			for (var i = 0; i < rowsNum - 4; i++) {
				jobsRow.clone().appendTo('.more-jobs-mob');
			}
			for (var j = 0; j < $('.job-link-mob').length; j++) {
				$($('.job-link-mob .job-day')[j]).html(days[j]);
				$($('.job-link-mob .job-month')[j]).html(months[j]);
				$($('.job-link-mob .job-year')[j]).html(years[j]);
				$($('.job-link-mob .job-title')[j]).html(titles[j]);
				$($('.job-link-mob .job-description')[j]).html(descriptions[j]);
				$($('.job-link-mob .job-city')[j]).html(cities[j]);
				$($('.job-link-mob')[j]).attr('href', urls[j]);
			}
		}
		$('.jobs-quantity span').html(otherJobs);
		$('.job-description').shave(150);

		$('.load-jobs').click(function() {
			if ($('.more-jobs, .more-jobs-mob').hasClass('is-open')) {
				$(this).html('Load all job openings');
				$('body, html').animate({
					scrollTop: scrolled
				}, 1000);
				$('.more-jobs, .more-jobs-mob').removeClass('is-open').slideUp(1000);
				$('.more-jobs .job-link, .more-jobs-mob .job-link-mob').css({
					"opacity": 0,
					"transition": ".3s ease-in"
				})
				$('.jobs-quantity').show(300);
			} else {
				scrolled = $(window).scrollTop();
				$(this).html('Show less');
				$('.more-jobs, .more-jobs-mob').addClass('is-open').slideDown(500);
				$('.more-jobs .job-link, .more-jobs-mob .job-link-mob').css({
					"opacity": 1,
					"transition": ".5s ease-out"
				})
				$('.jobs-quantity').hide(300);
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
	    loop: true,
	    pagination: {
	      el: '.swiper-pagination',
	      type: 'bullets',
	      clickable: true,
	    },
	    navigation: {
	       nextEl: '.swiper-button-next',
	       prevEl: '.swiper-button-prev',
	    },
	})
	$('.story-people.owl-carousel').owlCarousel({
	  loop:true,
	  margin:0,
	  nav: true,
	  responsiveClass:true,
	  responsive:{
	      0:{
	          items:1
	      },
	      1025:{
	          items:2
	      }
	  }
	});

	var urlSearchString = window.location.search;
    if(urlSearchString) {
		setTimeout(function () {
			$('body, html').animate({
				scrollTop: $('#' + urlSearchString.substr(1)).offset().top
			})
		}, 2000)
	}

	$('.modal-block form').submit(function(e) {
		// ga('send', 'event', 'Subscribe', 'subscribed');
		dataLayer.push({'event': 'event-to-ga', 'eventCategory' : 'Subscribe', 'eventAction' : 'subcribed'});
		$('.form-loader').css({
			"display": "flex",
			"opacity": 1
		})
		e.preventDefault();
		formSubmit();
	});
	function formSubmit() {
		var name = $('.input-name').val(),
			phone = $('.input-phone').val(),
			email = $('.input-email').val();
		if (name && phone && email) {
			var $form = $('.modal-block form'),
	    	url = 'https://script.google.com/macros/s/AKfycbyABVoFRLxVaElk4yU9RoLeW6u0xBuCTguhOMx466L91BpYpA/exec';
			$.ajax({
			    url: url,
			    method: "GET",
			    dataType: "json",
			    data: $form.serialize(),
			    success: function(response) {
			    	$('.form-loader .circles').fadeOut(200, function() {
			    		$('.form-submitted').fadeIn(200);
			    	})
			    	$('.form-submitted button').click(function() {
			    		
			    		$('body').removeClass('overflow-hidden');
			    		$('body, html').scrollTop(scrolled);
			    	})
			    	return true
			    }
			})	
		} else {
			return false
		}	
	}
	$('.job-link').click(function() {
		// ga('send', 'event', 'Jobs', 'clicked');
		dataLayer.push({'event': 'event-to-ga', 'eventCategory' : 'Jobs', 'eventAction' : 'clicked'});
		console.log('clicked joblink')
	})
	$('.load-jobs').click(function() {
		if (!$('.more-jobs, .more-jobs-mob').hasClass('is-open')) {
			// ga('send', 'event', 'Jobs', 'expanded');
			dataLayer.push({'event': 'event-to-ga', 'eventCategory' : 'Jobs', 'eventAction' : 'expanded'});
			console.log('clicked morejobs')
		}
	})
	$('.btn-messenger, .btn-outline-messenger').click(function() {
		// ga('send', 'event', 'Subscribe', 'opened');
		dataLayer.push({'event': 'event-to-ga', 'eventCategory' : 'Subscribe', 'eventAction' : 'opened'});
		console.log('clicked subscribe open')
	})



});
