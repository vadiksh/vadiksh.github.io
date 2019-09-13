$(function() {
	var navLineTransform,
		navLinePosition;
	$('.header__top nav li, .mob-nav li').mouseenter(function() {
		if ($(window).width() < 768) {
			navLinePosition = $(this).index() + '00';
			navLineTransform = (100 * $(this).index() / 3) + +navLinePosition;
			$('.nav-line').css({'opacity': 1, 'transform': 'translateX(' + navLineTransform + '%)'});
		} else {
			$('.nav-line').css({'opacity': 1, 'transform': 'translateX(' + $(this).index() + '00%)'});
		}
		
		$(this).addClass('active').siblings().removeClass('active');
		$('.header__links-list').addClass('active').siblings().removeClass('active');
		$('.header__links-list > li').eq($(this).index()).addClass('active').siblings().removeClass('active');
		
	})
	$('.leagues-list a').click(function(e) {
		e.preventDefault();

		$('.header__links-leagues').addClass('active').siblings().removeClass('active');
		$('.header__links-leagues > li').eq($(this).parent().index()).addClass('active').siblings().removeClass('active');
	})
});
