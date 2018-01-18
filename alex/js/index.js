$(document).ready(function() {
	
	$('.alt-nav-btn').click(function(e) {
		$('.alt-nav').slideToggle(300);
	})

	$('.news-contact__tel-input').mask('(000)-0000-000');

	$('.news-contact__form').submit(function (event) {
    name = $('.news-contact__name-input').val();
    tel = $('.news-contact__tel-input').val();
    message = $('.news-contact__message-input').val();
		error = $('.news-contact__error');
    
    if (name.length == 0 || tel.length !== 14 || message.length == 0) {
     event.preventDefault();
     error.slideUp(250, function() {  
      error.slideDown(500);
   	 });
   	}
  });
});