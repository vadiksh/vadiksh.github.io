$(function() {
	$('.login__pin input').keyup(function() {

		for (var i = 3; i >= 0; i--) {
			$($('.login__pin-field')[i]).html($(this).val().charAt(i))
			if (!$(this).val().charAt(i)) {
				$($('.login__pin-field')[i]).html('').addClass('active').siblings().removeClass('active');
			}
			if($(this).val().length == 4) {
				$('.login__pin-field').removeClass('active');
			}
		}
	})
	$('.predict button').click(function(e) {
		e.preventDefault();
		var val = $(this).siblings('input').val();
		if ($(this).hasClass('decrement') && val > 0) {
			val--;
		} else if ($(this).hasClass('increment')){
			val++;
		}
		$(this).siblings('input').val(val)
	})

});
