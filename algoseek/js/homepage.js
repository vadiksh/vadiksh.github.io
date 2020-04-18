$(function() {

	// revealing elements
	$(window).scroll(function() {
		for (var i = 0; i < $('.hidden').length; i++) {
			revealOnScroll($($('.hidden')[i]));
		}
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

    // carousel clients
    $('.products__carousel').owlCarousel({
    	items: 1,
    	dots: false,
    	navSpeed: 1000,
    	onInitialized: setHeight,
    	responsive: {
    		0: {
    			loop: false,
    			autoplay: false,
    			nav: false,
    			dotsContainer: '.products__mob-nav'
    		},
    		767: {
    			loop: true,
    			autoplay: true,
    			nav: true,
    			autoplaySpeed: 1000,
		    	autoplayHoverPause: true,
		    	autoplayTimeout: 6000,
    		}
    	}
    });
    // Listen to owl events:
    var stageHeight,
    	stage = $('.products__carousel .owl-stage-outer');
    	
    $('.products__carousel').on('changed.owl.carousel', function(event) {
    	var stage = $('.products__carousel .owl-stage-outer');

    	$('.products__list-title').addClass('hidden');
    	setTimeout(function() {
			if (event.item.index % 2) {
				$('.products__list-title b').html('Market ')
			} else {
				$('.products__list-title b').html('Reference ')
			}
    		$('.products__list-title').removeClass('hidden');
    	}, 250)
        if ($(window).width() < 768) {
        	stageHeight = $('.products__carousel .owl-item').eq(event.item.index).height();
        	stage.css({'height': stageHeight + 'px'})

        	$('.products__mob-nav li').eq(event.item.index).addClass('active').siblings().removeClass('active');
        }
    })
    $('.products__mob-nav li').click(function() {
    	console.log('hhujh')
    	$(this).addClass('active').siblings().removeClass('active');
    	var ind = $(this).index();
    	$('.products__carousel').trigger('to.owl.carousel', [ind,300]);
    })

    // products hover
    
    function setHeight() {
    	let stage = $('.products__carousel .owl-stage-outer');
    	stageHeight = stage.height();
    	stage.css({'height': stageHeight + 'px'});

    	if ($(window).width() < 768) {
    		stageHeight = $('.products__carousel .owl-item').eq(0).height();
    		stage.css({'height': stageHeight + 'px'})
    	}
    }

    if ($(window).width() > 1366) {
    	$(document).on('mouseenter', '.products__list li', function() {
    		var tooltip = $(this).find('.products__tooltip')[0];
    		$(this).addClass('active');
    		$(tooltip).css({'height': tooltip.scrollHeight + 'px'})
    		stage.css({'height': stageHeight + tooltip.scrollHeight + 10 + 'px'})
    	})
    	$(document).on('mouseleave', '.products__list li', function() {
    		var tooltip = $(this).find('.products__tooltip')[0];
    		$(tooltip).css({'height': 0})	
    		$(this).removeClass('active');
    		stage.css({'height': stageHeight + 'px'});
    	})
    } else {
    	$('.products__list li').on('click', function() {

    		if (!$(this).hasClass('active')) {
    			$('.products__list li.active .products__tooltip').css({'height': '0px'});
    			$('.products__list li.active').removeClass('active');
    			var that = $(this);
    			that.addClass('active');
    			that.find('.products__tooltip').css({'height': that.find('.products__tooltip')[0].scrollHeight + 'px'})

    			console.log(stageHeight);
    			stage.css({'height': stageHeight + that.find('.products__tooltip')[0].scrollHeight + 'px'})
    		} else {
    			$(this).removeClass('active');
    			$(this).find('.products__tooltip').css({'height': '0px'})
    			stage.css({'height': stageHeight + 'px'})
    		}
    	})
    	$(window).on('touchstart', function(e) {
    		if (!$(e.target).is('.products__list li.active, .products__list li.active *')) {
    			$('.products__list li').removeClass('active');
    			$('.products__tooltip').css({'height': '0px'})
    			stage.css({'height': stageHeight + 'px'})
    		}
    	})
    }

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

	// textarea resize
	var textarea = document.querySelector('.string-message');
	$('.string-message').on('input', function() {
		
		if (textarea.scrollHeight > textarea.offsetHeight) {
			$('.string-message').css({'height': textarea.scrollHeight + 'px', 'transition': '.3s'})
		}
	});
	
	
})