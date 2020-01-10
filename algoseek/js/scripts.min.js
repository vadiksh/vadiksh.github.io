$(function() {
	$(window).scroll(function() {
		var scrolled = $(window).scrollTop();
		if (scrolled > 0) {
			$('.header__top').addClass('sticky')
		} else {
			$('.header__top').removeClass('sticky')
		}
	})
	if ($(window).width() > 1023) {
		var mouseEntered;
		$('.header__link.dropdown').mouseenter(function(){
			$(this).addClass('active').siblings().addClass('active');
		})
		$('.header__link.dropdown, .header__dropdown').mouseleave(function(){
			var that = $(this);
			mouseEntered = false;
			setTimeout(function() {
				if (!mouseEntered) {
					that.removeClass('active').siblings().removeClass('active');
				}
			},50)
		})
		$('.header__dropdown').mouseenter(function() {
			mouseEntered = true;
		})
	} else {
		$('.header__link.dropdown').click(function(e){
			e.preventDefault();
			if ($(this).hasClass('active')) {
				$(this).removeClass('active').siblings().removeClass('slided').height(0);
			} else {
				var height = $(this).siblings()[0].scrollHeight;
				console.log(height)
				$(this).addClass('active').siblings().addClass('slided').height(height);
			}
			

		})
	}
	
	if ($(window).width() > 1250) {
		var mouseEntered;
		$('.products__list li').mouseenter(function(){
			$(this).addClass('active').find('.products__tooltip').addClass('active');
		})
		$('.products__list li').mouseleave(function(){
			var that = $(this);
			mouseEntered = false;
			setTimeout(function() {
				if (!mouseEntered) {
					that.find('.products__tooltip').removeClass('active');
				}
			},50)
		})
		$('.products__tooltip').mouseenter(function() {
			mouseEntered = true;
		});
	} else {
		
		$('.products__list li').click(function(){
			$(this).addClass('active').find('.products__tooltip').addClass('active');
			$(this).siblings().find('.products__tooltip').removeClass('active');
		})
		$(window).click(function(e) {
			console.log(e.target);
			if (!$(e.target).is('.products__list li, .products__list li *')) {
				$('.products__tooltip').removeClass('active');
			}
		})
	}
	

	$('.header__menu-hamburger').click(function() {
		$('.header__menu').addClass('active');
	})
	$('.header__menu-close').click(function() {
		$('.header__menu').removeClass('active');
	})


	window._wq = window._wq || [];
    _wq.push({
        id: "lumhojodre", onReady: function (video) {
            video.bind("play", function() {
              $('.delivery').addClass('played');
              $("#play").fadeOut(300)
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
    		$("#play").fadeIn(300)
			_wq.push({
			    id: "lumhojodre", onReady: function (video) {
	    			video.pause();
			    }
			});
    	}
    })
     

    $('.clients-carousel').owlCarousel({
    	loop:true,
    	items: 1,
    	nav: true
    });


  	$('.contact__form input').change(function() {
  		console.log('dad')
  		if ($(this).val().length !== 0) {
			$(this).addClass('input-active');
  		} else {
  			$(this).removeClass('input-active');
  		}
  	})
  	
    

});
