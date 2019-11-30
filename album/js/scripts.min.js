$(function() {

	$('.header__nav a[href*="#"]').click(function(e){
		e.preventDefault();
		var href = $(this).attr('href');
		$('html,body').animate({
			scrollTop: $(href).offset().top
		}, 500)
	})

});
