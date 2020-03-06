$(function() {
	// revealing elements
	$(window).scroll(function() {
		

		for (var i = 0; i < $('.hidden').length; i++) {
			revealOnScroll($($('.hidden')[i]));
		}
		// if (scrolled + $(window).height() / 1.5 > $('.hidden').offset().top) {
		//     $('.hidden').addClass('revealed');
		// }
		// if (scrolled + $(window).height() / 1.5 > $('.products').offset().top) {
		//     $('.products').addClass('revealed');
		// }
		// if (scrolled + $(window).height() / 1.5 > $('.products').offset().top) {
		//     $('.products').addClass('revealed');
		// }
	})
	function revealOnScroll(el) {
		var scrolled = $(window).scrollTop();
		if (scrolled + $(window).height() / 1.5 > el.offset().top) {
		   el.addClass('revealed');
		}
	}
	$(window).trigger('scroll');
	// particles
	if ($(window).width() > 767) {
		$.getScript("./js/particles.js", function() {
			particlesJS.load('particles-js', './js/particles-config.json', function() {
			    console.log('callback - particles.js config loaded');
			});
		});
	}
	$('.products__list li').mouseenter(function() {
		var that = $(this);
		// var tooltip = $(this);
		// setTimeout(function() {
			// console.log(tooltip.scrollHeight);
			$($(this).find('.products__tooltip')[0]).css({'height': $(this).find('.products__tooltip')[0].scrollHeight + 'px'})
		// }, 300)
		
	})
	$('.products__list li').mouseleave(function() {
		var that = $(this);
		// setTimeout(function() {
			
			$(that.find('.products__tooltip')[0]).css({'height': 0})
		// }, 0)
	
	})
	// flip words
	setInterval(function() {
		$('.letters:not(.active)').addClass('active').siblings().removeClass('active');
	}, 3500)

	// videos
    $('.header__play').click(function() {
        $('.video').addClass('active').find('iframe').attr('src', 'https://www.youtube.com/embed/CnQzCrZFsDg?autoplay=1&showinfo=0&rel=0&iv_load_policy=3');
        $('body').css({'height': '100vh', 'overflow-y': 'hidden'})
    })
    $('.video .close').click(function() {
        $('.video').removeClass('active').find('iframe').attr('src', '');
        $('body').css({'height': '100%', 'overflow-y': 'auto'})
    });

	window._wq = window._wq || [];
    _wq.push({
        id: "lumhojodre", onReady: function (video) {
            video.bind("play", function() {
              $('.delivery').addClass('played');
              $("#play").fadeOut(300)
              $('body').css({'height': '100vh', 'overflow-y': 'hidden'})
              
              setTimeout(function() {
                var screen = document.querySelector('.delivery__screen'),
                    screenH = screen.offsetHeight,
                    calcOffset = ($(window).height() - screenH) / 2;
                    console.log(calcOffset)
                    console.log(screenH)
                    console.log($(window).height())
                  $('body,html').animate({
                      scrollTop: $('.delivery__screen').offset().top - calcOffset
                  }, 500)
              },600)
              
            });
        }
    });
	$("#play").click(function () {
		_wq.push({
		    id: "lumhojodre", onReady: function (video) {
    			video.play();
		        
		    }
		});
    })
    $(document).click(function(e) {
    	if ($('.delivery').hasClass('played') && !$(e.target).is('.w-vulcan--background')) {
    		$('.delivery').removeClass('played');
    		$("#play").fadeIn(300);
            $('body').css({'height': '100%', 'overflow-y': 'auto'});
			_wq.push({
			    id: "lumhojodre", onReady: function (video) {
	    			video.pause();
			    }
			});
    	}
    })

	// carousel
	$('.clients-carousel').owlCarousel({
		loop:true,
		items: 1,
		nav: true,
		navSpeed: 1000,
		autoplay: true,
		autoplaySpeed: 1000,
		autoplayHoverPause: true
	});

	// form
	grecaptcha.ready(function() {
	    $(".contact__form").submit(function(e) {
	        e.preventDefault();
	        grecaptcha.execute("6Ld-TNMUAAAAAOXOkYdmjDQNLuBYtiLS6nS6rEVS", {action:"validate_captcha"})
	              .then(function(token) {
	            $("#recaptcha").val(token);
	            var data = $(".contact__form").serialize();
	            $.ajax({
	                type: "POST",
	                url: "/backend/contacts",
	                data: data,
	                // dataType: "json",
	                success: function(data) {
	                    $('.submitted').addClass('active');
	                    $(".contact__form").trigger("reset");
	                    $(document).on('click', function(){
	                        $('.submitted').removeClass('active');
	                    })
	                },
	                error: function(data) {
	                    alert(data.statusText);
	                }
	            });
	        });
	    });
	});	

	var textarea = document.querySelector('.string-message');
	$('.string-message').on('input', function() {
		
		if (textarea.scrollHeight > textarea.offsetHeight) {
			// console.log('hjgkhj');
			// $('.string-message').css({'height': '250px'});
			$('.string-message').css({'height': textarea.scrollHeight + 'px', 'transition': '.3s'})
		}
	});
	
	
})