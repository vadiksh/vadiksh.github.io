$(function() {
	var isTouchDevice = (('ontouchstart' in window)
	         || (navigator.MaxTouchPoints > 0)
	         || (navigator.msMaxTouchPoints > 0));
	 if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
	   || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
	  isTouchDevice = true;
	 } else {
	  isTouchDevice = false;
	 }

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
    if (isTouchDevice) {
	    $('.products__carousel').owlCarousel({
	    	items: 1,
	    	dots: false,
	    	navSpeed: 1000,
	    	onInitialized: setHeight,
	    	loop: false,
	    	autoplay: false,
	    	nav: false
	    });
    } else {
	    $('.products__carousel').owlCarousel({
	    	items: 1,
	    	dots: false,
	    	navSpeed: 1000,
	    	onInitialized: setHeight,
			loop: true,
			autoplay: true,
			nav: true,
			autoplaySpeed: 1000,
	    	autoplayHoverPause: true,
	    	autoplayTimeout: 6000
	    });
    }
    
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
        if (isTouchDevice || $(window).width() < 1251) {
        	stageHeight = $('.products__carousel .owl-item').eq(event.item.index).height();
        	stage.css({'height': stageHeight + 'px'})

        	$('.products__mob-nav li').eq(event.item.index % 2).addClass('active').siblings().removeClass('active');
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

    	if (isTouchDevice || $(window).width() < 1251) {
    		stageHeight = $('.products__carousel .owl-item').eq(0).height();
    		stage.css({'height': stageHeight + 'px'})
    	}
    }


    if (!isTouchDevice) {
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