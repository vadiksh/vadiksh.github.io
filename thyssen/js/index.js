$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
  	loop:true,
  	margin:0,
  	nav:true,
  	center:true,
  	responsive:{
  	    0:{
  	        items:1.4
  	    },
  	    400:{
  	        items:1.8
  	    },
  	    640:{
  	        items:3
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

