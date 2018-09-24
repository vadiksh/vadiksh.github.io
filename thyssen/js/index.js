$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
  	loop:true,
  	margin:0,
  	nav:true,
  	center:true,
  	responsive:{
  	    0:{
  	        items:1.5
  	    },
  	    350:{
  	        items:1.6
  	    },
  	    400:{
  	        items:1.8
  	    },
  	    470:{
  	        items:2
  	    },
  	    520:{
  	        items:2.2
  	    },
  	    767:{
  	        items:4
  	    }
  	}
  });
});

$('.mob-menu-open').click(function() {
	if ($('.mob-menu').hasClass('revealed')) {
		$('.mob-menu').removeClass('revealed');
	}
	else {
		$('.mob-menu').addClass('revealed');
	}
	if ($('.mob-logo').hasClass('revealed')) {
		$('.mob-logo').removeClass('revealed');
	}
	else {
		$('.mob-logo').addClass('revealed');
	}
});

// .main-item-$ or .carousel-item-$  click --- show .popup-item-$ and reveal .popup
$('.main-item, .carousel-item').click(function() {
	var popupId = $(this).attr('item-num');

	$('.popup').addClass('revealed');
	$('.popup-' + popupId + '').addClass('active');
});
$('.popup').click(function() {
	$(this).removeClass('revealed');
	if ($('.popup-item').hasClass('active')) {
		 setTimeout(function() {
        	$('.popup-item').removeClass('active');
    	}, 300);
	}
});
