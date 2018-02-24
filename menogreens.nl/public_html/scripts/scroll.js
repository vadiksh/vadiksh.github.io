$(document).ready(function(){

	$('.faq-question').click(function(event) {
		if ($(event.target).siblings().hasClass('active')) {
			$('.active').next().slideUp();
			$(event.target).siblings().removeClass('active');
		}
		$(event.target).addClass('active').next().slideToggle();
	})


	$('a[href*=#]').bind("click", function(e){
	var anchor = $(this);
	$('html, body').stop().animate({
	scrollTop: $(anchor.attr('href')).offset().top
	}, 500);
	e.preventDefault();
	});
	return false;
});