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
			scrollTop: $(elementId)[0].offsetTop
		},1000)
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
		$(".book-form button").addClass( "onclic");
		validate();
		function validate() {
		  setTimeout(function() {
		    $(".book-form button").removeClass( "onclic" );
		    $(".book-form button").addClass( "validate");
		    $('.book-form input, .book-form button').attr('disabled', '');
		    $('.book-form .received').addClass('visible');
		  }, 2250 );
		}
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

	var imgSrc;
	$('.images__list li').click(function(){
		
		imgSrc = this.dataset.src;
		$('.images__fullscreen').addClass('active');
		$('.images__fullscreen img').attr('src', imgSrc);
	})

	$('.images__fullscreen img').click(function() {
		var currentSrc = $(this).attr('src');
		$('.images__fullscreen img').fadeOut(200, function(){
			imgSrc = $('.images__list li[data-src="' + currentSrc + '"]').next().attr('data-src');
			if (currentSrc == $('.images__list li:last-child').attr('data-src')) {
				imgSrc =  $('.images__list li:first-child').attr('data-src');
			}
			$('.images__fullscreen img').attr('src', imgSrc);

			$(this).fadeIn(300);

		})
	})

	$('.images__fullscreen .close').click(function(){
		$('.images__fullscreen').removeClass('active');
	})
});
