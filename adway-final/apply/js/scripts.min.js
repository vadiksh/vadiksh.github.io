$(function() {

	
	if ($('.job-screen').length) {
		$('.job-screen__description .shaved p').shave(100);
		if ($(window).width() < 350) {
			$('.job-screen__description .shaved p').shave(60);
		}
	}

	var condensedHeight = $('.shaved').height(),
		expandedHeight = document.getElementsByClassName('condensed')[0].scrollHeight;
	$('.condensed').css({
		'height': condensedHeight + 'px'
	})
	$('.show-more').click(function() {
		
		if ($('.job-screen').hasClass('revealed')) {
			$('.job-screen').removeClass('revealed');
			$('.overflow-wrapper').animate({
				scrollTop: 0
			}, 200)
			document.getElementsByClassName('condensed')[0].style.height = condensedHeight + "px"
		} else {
			$('.job-screen').addClass('revealed');
			document.getElementsByClassName('condensed')[0].style.height = expandedHeight + "px"
		}
	})
	$('.form-screen__button').click(function(e) {
		e.preventDefault();
		if (true) { // $('.screen.active').validate()
			var index = $('.screen.active').attr('data-index');
			
			$('.form-screen__progress').addClass('step-' + index);
			$('.screen:nth-of-type(' + index + ')').addClass('active').siblings().removeClass('active');
			$('.overflow-wrapper').animate({
				scrollTop: 0
			}, 200)
		}
					
			
	})
});
