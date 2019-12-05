$(function() {
	var utilityEntered;
	$('.headerMenu__utility-link').mouseenter(function(){
		$(this).addClass('active').siblings().addClass('active');
	})
	$('.headerMenu__utility-link, .headerMenu__utility-dropdown').mouseleave(function(){
		var that = $(this);
		utilityEntered = false;
		setTimeout(function() {
			if (!utilityEntered) {
				that.removeClass('active').siblings().removeClass('active');
			}
		},50)
	})
	$('.headerMenu__utility-dropdown').mouseenter(function() {
		utilityEntered = true;
	})

	var mouseEntered = false;
	$('.headerMenu__nav-link').mouseenter(function(){
		$(this).addClass('active').siblings().addClass('active');
	})
	$('.headerMenu__nav-link, .headerMenu__nav-dropdown').mouseleave(function(){
		var that = $(this);
		mouseEntered = false;
		setTimeout(function() {
			if (!mouseEntered) {
				that.removeClass('active').siblings().removeClass('active');
			}
		},50)
	})
	$('.headerMenu__nav-dropdown').mouseenter(function() {
		mouseEntered = true;
	})
	var subEntered = false;
	$('.headerMenu__nav-sublink').mouseenter(function(){
		subEntered = true;
		$('.headerMenu__nav-submenu').addClass('visible');
		$('.headerMenu__nav-submenu > li').eq($(this).index('.headerMenu__nav-sublink')).addClass('active').siblings().removeClass('active');
	})
	$('.headerMenu__nav-sublink').mouseleave(function(){
		var that = $(this);
		subEntered = false;
		setTimeout(function() {
			if (!subEntered) {
				$('.headerMenu__nav-submenu').removeClass('visible');
				$('.headerMenu__nav-submenu > li').eq(that.index('.headerMenu__nav-sublink')).removeClass('active')
			}
		},50)
	})
	$('.headerMenu__nav-submenu').mouseenter(function() {
		subEntered = true;
	})
	$('.headerMenu__nav-submenu').mouseleave(function() {
		subEntered = false;
		setTimeout(function() {
			if (!subEntered) {
				$('.headerMenu__nav-submenu').removeClass('visible');
				$('.headerMenu__nav-submenu > li').removeClass('active')
			}
		},50)
	})

	$('.headerMenu .hamburger').click(function() {
		if (!$(this).hasClass('active')) {
			$(this).addClass('active');
			$('.headerMenu-mob__search, .headerMenu-mob').addClass('active');
		} else {
			$(this).removeClass('active');
			$('.headerMenu-mob__search, .headerMenu-mob').removeClass('active');
			// $('.headerMenu-mob, .headerMenu-mob__main, .headerMenu-mob__subfunds, .headerMenu-mob__submenus').removeClass('active hidden');
			// $('.headerMenu-mob__submenus > li, .headerMenu-mob__subfunds > li').removeClass('active');
		}
		
	})
	$('.headerMenu-mob__nav li').click(function() {
		$('.headerMenu-mob__submenus > li').eq($(this).index()).addClass('active').siblings().removeClass('active');
		$('.headerMenu-mob__submenus').addClass('active');
		$('.headerMenu-mob__main').addClass('hidden');
	})
	$('.headerMenu-mob__sublink').click(function(e) {
		e.preventDefault();
		$('.headerMenu-mob__subfunds > li').eq($(this).index('.headerMenu-mob__sublink')).addClass('active').siblings().removeClass('active');
		$('.headerMenu-mob__subfunds').addClass('active');
		$('.headerMenu-mob__submenus').addClass('hidden');
	})
	$('.headerMenu-mob__back').click(function() {
		if($(this).parents('.headerMenu-mob__submenus').length) {
			$('.headerMenu-mob__submenus').removeClass('active');
			$('.headerMenu-mob__main').removeClass('hidden');
		} else {
			$('.headerMenu-mob__subfunds').removeClass('active');
			$('.headerMenu-mob__submenus').removeClass('hidden');
		}
	})
	var	offset,
		width,
		index;
	$('.strategies__nav li').click(function() {
		index = $(this).index() - 1;
		$(this).addClass('active').siblings().removeClass('active');
		offset = $(this).offset().left;
		$('.strategies__nav .button-bg').css({
			"transform": "translate3d(" + offset + "px,0,0)"
		});

		width = $(this).outerWidth();
		$('.strategies__nav .button-bg').css({
			"width": width
		});
		$('.strategies__container > div').eq(index).addClass('active').siblings().removeClass('active');

	})
	$('.open-form').click(function() {
		$('.engage form').addClass('active');
	})
	$('.engage .close').click(function () {
		$('.engage form').removeClass('active');
	})
	$('.mob-title').click(function() {
		if (!$(this).hasClass('active')) {
			$('.mob-wrapper').slideUp(500);
			$('.mob-title').removeClass('active');
			$(this).addClass('active').next('.mob-wrapper').slideDown(500);
		} else {
			$(this).removeClass('active').next('.mob-wrapper').slideUp(500);
		}
		$('body, html').animate({
			scrollTop: 0
		},500)
	})
});
