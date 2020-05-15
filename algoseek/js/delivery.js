$(function() {
	if ($(window).width() > 767) {
		$('.delivery__list a').click(function (e) {
		    e.preventDefault();
		    var href = $(this).attr('href');
		    $('body,html').animate({
		        scrollTop: $(href).offset().top - 140
		    }, 500)
		})
		if (window.location.hash) {
		    var href = window.location.hash;
		    $('body,html').animate({
		        scrollTop: $(href).offset().top - 170
		    }, 500)
		}
	} else {
		$('.delivery__list a').click(function (e) {
		    e.preventDefault();
		    var href = $(this).attr('href');
		    $('body,html').animate({
		        scrollTop: $(href).offset().top - 90
		    }, 500)
		})
		if (window.location.hash) {
		    var href = window.location.hash;
		    $('body,html').animate({
		        scrollTop: $(href).offset().top - 90
		    }, 500)
		}
	}
	   
   $(window).scroll(function() {
     var scrolled = $(window).scrollTop();
     if ($(window).width() >= 768) {
       if (scrolled > 200) {
         $('.delivery-sticky').addClass('fixed');
       }
       if (scrolled <= 200) {
         $('.delivery-sticky').removeClass('fixed');
       }
     } else {
       if (scrolled > 225) {
         $('.delivery-sticky').addClass('fixed');
       }
       if (scrolled <= 225) {
         $('.delivery-sticky').removeClass('fixed');
       }
     }
   }); 
})