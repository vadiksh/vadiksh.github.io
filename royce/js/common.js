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
		$('.header__nav-submenu').addClass('visible');
		$('.header__nav-submenu > li').eq($(this).index('.header__nav-sublink')).addClass('active').siblings().removeClass('active');
	})
	$('.header__nav-sublink').mouseleave(function(){
		var that = $(this);
		subEntered = false;
		setTimeout(function() {
			if (!subEntered) {
				$('.header__nav-submenu').removeClass('visible');
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
				$('.header__nav-submenu').removeClass('visible');
				$('.header__nav-submenu > li').removeClass('active')
			}
		},200)
	})

	$('.header .hamburger').click(function() {
		if (!$(this).hasClass('active')) {
			$(this).addClass('active');
			$('.header-mob__search, .header-mob__container').addClass('active');
		} else {
			$(this).removeClass('active');
			$('.header-mob__search, .header-mob__container').removeClass('active');
			// $('.header-mob, .header-mob__main, .header-mob__subfunds, .header-mob__submenus').removeClass('active hidden');
			// $('.header-mob__submenus > li, .header-mob__subfunds > li').removeClass('active');
		}
		
	})
	$('.header-mob__nav li').click(function() {
		$('.header-mob__submenus > li').eq($(this).index()).addClass('active').siblings().removeClass('active');
		$('.header-mob__submenus').addClass('active');
		$('.header-mob__main').addClass('hidden');
	})
	$('.header-mob__sublink').click(function(e) {
		e.preventDefault();
		$('.header-mob__subfunds > li').eq($(this).index('.header-mob__sublink')).addClass('active').siblings().removeClass('active');
		$('.header-mob__subfunds').addClass('active');
		$('.header-mob__submenus').addClass('hidden');
	})
	$('.header-mob__back').click(function() {
		if($(this).parents('.header-mob__submenus').length) {
			$('.header-mob__submenus').removeClass('active');
			$('.header-mob__main').removeClass('hidden');
		} else {
			$('.header-mob__subfunds').removeClass('active');
			$('.header-mob__submenus').removeClass('hidden');
		}
	})
});
