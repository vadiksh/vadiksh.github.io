// $(function() {
	$(window).on('load', function() {
		$('.job-screen .container').css({
			"opacity": 1
		})
		$('.job-screen__description .shaved p').shave(100);
		if ($(window).width() < 350) {
			$('.job-screen__description .shaved p').shave(60);
		}

		var condensedHeight = $('.shaved').height();
		$('.condensed').css({
			'height': condensedHeight + 'px'
		})

		$('.show-more').click(function() {
			var condensedHeight = $('.shaved').height(),
				expandedHeight = document.getElementsByClassName('condensed')[0].scrollHeight;
			$('.condensed').css({
				'height': condensedHeight + 'px'
			})

			if ($('.job-screen').hasClass('revealed')) {
				$('.job-screen').removeClass('revealed');
				$('.overflow-wrapper').animate({
					scrollTop: 0
				}, 200)
				document.getElementsByClassName('condensed')[0].style.height = condensedHeight + "px";
				// document.getElementsByClassName('apply-button').style.animation = "bounce .8s forwards";
				for (var i = 0; i < document.getElementsByClassName('apply-button').length; i++) {
					document.getElementsByClassName('apply-button')[i].style.animation = "bounce .8s forwards";
				}
			} else {
				$('.job-screen').addClass('revealed');
				document.getElementsByClassName('condensed')[0].style.height = expandedHeight + "px"
			}
		})

		$('.screen1, .form-screen').addClass('active');
		$('.form-screen__button').click(function(e) {
			e.preventDefault();

			var index = $('.screen.active').attr('data-index');
			$('.form-screen__progress').addClass('step-' + index);
			$('.screen' + index).addClass('active').siblings().removeClass('active');

			$('.overflow-wrapper').animate({
				scrollTop: 0
			}, 200)
		})
		$('.change-photo button').click(function(e) {
			e.preventDefault();
			$('.change-photo-modal').addClass('visible');
		})

	})

	
	
// });
