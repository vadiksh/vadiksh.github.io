$(function() {
	$('a[href*="#"]').click(function(e) {
		e.preventDefault();
		var src = $(this).attr('href')
		$('body,html').animate({
			scrollTop: $(src).offset().top
		},500)
	})
	var height
	$('.clothes__categories li').click(function() {
		height = $('.categories > li').eq($(this).index()).css('height');
		console.log(height);
		$('.categories > li').eq($(this).index()).addClass('active').siblings().removeClass('active');
		$('.clothes__categories').removeClass('active');
		$('.categories').addClass('active');
		$('.clothes .container').css({
			"height": height
		})
	})

	$('.back-to-category').click(function() {
		height = $('.clothes__categories').css("height");
		$('.clothes__categories').addClass('active')
		$('.categories, .categories > li, .items, .items li').removeClass('active');
		$('.clothes .container').css({
			"height": height
		})
	})
	var itemIndex,
		categIndex;
	$('.categories .flex-category li').click(function() {
		itemIndex = $(this).index();
		categIndex = $(this).parents('li').index();
		height = $('.items > li').eq(categIndex).find('.items__list > li').eq(itemIndex).css('height');

		$('.clothes__categories, .categories').removeClass('active');
		$('.items').addClass('active');
		$('.items > li').eq(categIndex).addClass('active').siblings().removeClass('active');
		$('.items > li').eq(categIndex).find('.items__list > li').eq(itemIndex).addClass('active').siblings().removeClass('active');
		$('.clothes .container').css({
			"height": height
		})
	})
	$('.back').click(function() {
		height = $('.categories > li').eq(categIndex).css('height');
		$('.items, .items li').removeClass('active');
		$('.categories').addClass('active');
		$('.categories > li').eq(categIndex).addClass('active').siblings().removeClass('active');
		$('.clothes .container').css({
			"height": height
		})
	});


	$('.items1, .items2').owlCarousel({
	    loop:true,
	    autoplay: true,
	    nav: true,
	    dots: false,
	    center: true,
	    items: 1,
	    autoplayHoverPause: true,
	    responsiveClass:true,
	    responsive:{
	    	0: {
	    		items: 1,
	    		autoplay: false
	    	},
	    	768: {
	    		autoplay: true
	    	}
	    }
	});
	
	$('.reviews ul').owlCarousel({
	    loop:true,
	    autoplay: true,
	    nav: true,
	    center: true,
	    items: 4,
	    responsiveClass:true,
	    autoplayHoverPause: true,
	    responsive:{
	    	0: {
	    		items: 1,
	    		autoplay: false
	    	},
	    	768: {
	    		items: 3,
	    		autoplay: true
	    	}
	    }
	});
	$( ".tel-input, .tel-input1").keypress(function(evt) {
	  var charCode = (evt.which) ? evt.which : event.keyCode
	      if (charCode > 31 && (charCode < 48 || charCode > 57))
	          return false;
	      return true;
	});
	var cleave = new Cleave('.tel-input', {
	    blocks: [3, 3, 3, 2, 2],
	  	prefix: '+38',
	    delimeters: [' ', ' ', '-', '-'],
	   
	});
	// var cleave = new Cleave('.tel-input1', {
	//     blocks: [3, 3, 3, 2, 2],
	//     prefix: '+38',
	//     delimeters: [' ', ' ', '-', '-']
	// });
	$('form').submit(function(e) {
 		// e.preventDefault();
 		// formSubmit($(this));
 	});

 	function formSubmit(form) {
			var $form = form,
	    	url = 'https://script.google.com/macros/s/AKfycbw2kTmyvLUy-TqYxaNKS2z8IGxJKzrsCH7BIgFcG-DXFh_4-zs/exec';
			$.ajax({
			    url: url,
			    method: "GET",
			    dataType: "json",
			    data: $form.serialize(),
			    success: function(response) {
			    	console.log('form submitted');
 					// window.location.href = 'https://kvadrat.store/thanks.html';
			    }
			})	
 	}
});
