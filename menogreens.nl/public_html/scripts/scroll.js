$(document).ready(function(){

	$('.faq-question').click(function(event) {
		$(event.target).next().slideToggle();
	});

	$('a[href*="#"]').click(function(e) {
		e.preventDefault();
		var position = $($(this).attr('href')).offset().top;
		$("html, body").animate({
			scrollTop: position
		});
	});
});