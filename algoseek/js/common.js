$(function() {
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
