$(document).ready(function() { 

	$('a[href*="#"]').click(function(e) {
	e.preventDefault();
	
	var position = $($(this).attr('href')).offset().top;

		$("html, body").animate({
			scrollTop: position
		});
	});

	$(".portfolio-item__img").click(function(){	
	  	var img = $(this);	
		var src = img.attr('src');
		$("body").append("<div class='popup'>" + "<img src="+src+" class='popup-img' />" + "</div>"); 
		$(".popup").fadeIn(300); 
		$(".popup").click(function(){   
			$(".popup").fadeOut(200);
			setTimeout(function() {	//таймер
			  $(".popup").remove(); // Удаляем разметку
			}, 500);
		});
	});
});

