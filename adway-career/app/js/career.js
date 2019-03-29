$(function() {
	if (scrolled > $('.about').offset().top + $('.about').height() + $(window).height()) {
		$('.homepage-header__container, .about-description').css({
			"transform": "none"
		})
	}
})