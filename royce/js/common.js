$(function() {
	var mouseEntered = false;
	$('.header__nav-link').mouseenter(function(){
		$(this).addClass('active').siblings().addClass('active');
	})
	$('.header__nav-link, .header__nav-dropdown').mouseleave(function(){
		var that = $(this);
		mouseEntered = false;
		setTimeout(function() {
			if (!mouseEntered) {
				that.removeClass('active').siblings().removeClass('active');
			}
		},100)
	})
	$('.header__nav-dropdown').mouseenter(function() {
		mouseEntered = true;
	})
	var subEntered = false;
	$('.header__nav-sublink').mouseenter(function(){
		subEntered = true;
		$('.header__nav-submenu > li').eq($(this).index('.header__nav-sublink')).addClass('active').siblings().removeClass('active');
	})
	$('.header__nav-sublink').mouseleave(function(){
		var that = $(this);
		subEntered = false;
		setTimeout(function() {
			if (!subEntered) {
				$('.header__nav-submenu > li').eq(that.index('.header__nav-sublink')).removeClass('active')
			}
		},100)
	})
	$('.header__nav-submenu').mouseenter(function() {
		subEntered = true;
	})
	$('.header__nav-submenu').mouseleave(function() {
		subEntered = false;
		setTimeout(function() {
			if (!subEntered) {
				$('.header__nav-submenu > li').removeClass('active')
			}
		},200)
	})
});
