$(function() {

	if ($(window).width() < 950) {
		$('.holdings__list').owlCarousel({
		    loop:false,
		    dots: true,
		    items: 2,
		    responsiveClass:true,
		    responsive:{
		        0:{
		            items:2,
		            margin: 20
		        },
		        630: {
		        	items: 3
		        },
		        767: {
		        	items: 4,
		        	margin: 50
		        }
		    }
		})
	}

	$(window).resize(function() {
		if ($(window).width() < 950) {
			$('.holdings__list').owlCarousel({
			    loop:false,
			    dots: true,
			    items: 2,
			    responsiveClass:true,
			    responsive:{
			        0:{
			            items:2,
			            margin: 20
			        },
			        630: {
			        	items: 3
			        },
			         767: {
    		        	items: 4,
    		        	margin: 50
    		        }
			    }
			})
		} else {
			$('.holdings__list').trigger('destroy.owl.carousel');
		}
	})
	
});
