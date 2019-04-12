$(function() {

	$('.header .hamburger').click(function(){
		$('.header__mob').addClass('active');
	})
	$('.header__mob .close').click(function(){
		$('.header__mob').removeClass('active');
	})

	$('a[href^="#"]').click(function(e) {
		e.preventDefault();
		var elementId = $(this).attr('href');
		$('.overflow-wrapper').animate({
			scrollTop: $(elementId).offset().top
		},1000)
		console.log($(elementId).offset().top)
		if ($(this).hasClass('mob-link')) {
			$('.header__mob').removeClass('active');
		}
	})

	var checked;
	$('body').on('click', '.fields-label input', function() {
		console.log('click')
		if ($(this).is(':checked')) {
			var that = $(this);
			checked = $(this).val();
			$(this).parent().addClass('checked');
			$('.fields-list').append('<li>' + checked + '</li>');
			$('.fields-list li').slideDown(200);
		}
		$('.fields-list li').click(function() {
			checked = $(this).html();
			var that = $(this);
			$('.fields-label input[value="' + checked + '"]').prop('checked', false).parent().removeClass('checked');
			setTimeout(function() {
				that.slideUp(200, function(){
					that.remove()
				});
			},300)
		})
	})	
	if ($('textarea, input').val().length) {
		$('textarea, input').addClass('active');
	} else {
		$('textarea, input').removeClass('active');
	}
	$('textarea, input').on('keyup', function() {
		if ($(this).val().length) {
			$(this).addClass('active');
		} else {
			$(this).removeClass('active');
		}
	});

	$('.book-form').submit(function(e) {
		$('.loader').css({
			"display": "flex",
			"opacity": 1
		})
		e.preventDefault();
		formSubmit();
	});
	function formSubmit() {
		
		var $form = $('.book-form'),
 		  	url = 'https://hooks.zapier.com/hooks/catch/4793565/7sab83/';
		$.ajax({
		    url: url,
		    method: "POST",
		    dataType: "json",
		    data: $form.serialize(),
		    success: function(response) {
		    	$('.loader-ring').fadeOut(200, function() {
    				$('.loader-submitted').fadeIn(200, function(){
    					setTimeout(function(){
    						$('.loader').fadeOut(400);
    					}, 2000)
    				});
    			})
		    	return true
		    }
		})
	}

	if ($(window).width() < 768) {
		$('.images__list').owlCarousel({
		    loop:false,
		    dots: false,
		    center: true,
		    startPosition: 1,
		    margin: 0,
		    items: 2
		})
	}
	$(window).resize(function() {
		if ($(window).width() < 768) {
			$('.images__list').owlCarousel({
			    loop:false,
			    dots: false,
			    center: true,
			    startPosition: 1,
			    margin: 0,
			    items: 2
			})
		} else {
			$('.images__list').trigger('destroy.owl.carousel');
		}
	})

	var imgIndex;
	$('.images__list li').click(function(){
		
		imgSrc = this.dataset.src;
		$('.images__fullscreen').addClass('active');
		$('.images__fullscreen img').attr('src', imgSrc);

	})

	$('.images__fullscreen img').click(function() {

	})

	$('.images__fullscreen .close').click(function(){
		$('.images__fullscreen').removeClass('active');
	})
});
