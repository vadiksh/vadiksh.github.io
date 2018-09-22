$('.mob-menu-open').click(function() {
	if ($('.mob-menu').hasClass('revealed')) {
		$('.mob-menu').removeClass('revealed');
	}
	else {
		$('.mob-menu').addClass('revealed');
	}
	if ($('.mob-logo').hasClass('revealed')) {
		$('.mob-logo').removeClass('revealed');
	}
	else {
		$('.mob-logo').addClass('revealed');
	}
});