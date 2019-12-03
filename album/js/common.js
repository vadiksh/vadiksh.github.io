$(function() {

	$('.header__nav a[href*="#"]').click(function(e){
		e.preventDefault();
		var href = $(this).attr('href');
		$('html,body').animate({
			scrollTop: $(href).offset().top
		}, 500)
	})

	$(document).on('click', function() {
		console.log($(this));
	})
	$('.header__video-thumbnail').click(function() {
		$(this).addClass('hidden');
		$('.header__video iframe').attr('src', $(this).attr('data-src'));
	})

});
