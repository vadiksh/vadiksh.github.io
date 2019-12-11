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
		mouseEntered = true;
		$(this).addClass('active').siblings().addClass('active').parent().siblings().children().removeClass('active');
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
		$(this).addClass('active').siblings().removeClass('active');
		$('.headerMenu__nav-submenu').addClass('visible');
		$('.headerMenu__nav-submenu > li').eq($(this).index('.headerMenu__nav-sublink')).addClass('active').siblings().removeClass('active');
	})
	$('.headerMenu__nav-sublink').mouseleave(function(){
		var that = $(this);
		subEntered = false;
		setTimeout(function() {
			if (!subEntered) {
				that.removeClass('active');
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
				$('.headerMenu__nav-sublink').removeClass('active');
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
		
	if ($('.strategies__nav .button-bg').length) {
		setTimeout(function() {
			offset = $('.strategies__nav li.active').position().left;
			width = $('.strategies__nav li.active').outerWidth();
			$('.strategies__nav .button-bg').css({
				"width": width,
				"transform": "translate3d(" + offset + "px,0,0)"
			});
		}, 100)
		
	}
	
	
	$('.strategies__nav li').click(function() {
		index = $(this).index() - 1;
		$(this).addClass('active').siblings().removeClass('active');
		offset = $(this).position().left;
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
		$('.engage__form-wrapper').addClass('active');
	})
	$('.engage .close').click(function () {
		$('.engage__form-wrapper').removeClass('active');
	})
	$('.mob-title').click(function() {
		if (!$(this).hasClass('active')) {
			$('.mob-title').removeClass('active');
			$(this).parent().siblings().find('.mob-wrapper').removeClass('active').css({"height": 0});

			var height = $(this).next('.mob-wrapper')[0].scrollHeight;
			$(this).addClass('active').next('.mob-wrapper').addClass('active').css({"height": height});
		} else {
			$(this).removeClass('active').next('.mob-wrapper').removeClass('active').css({"height": 0});
		}
		$('body, html').animate({
			scrollTop: 0
		},500)
	})
	$('.headerMenu__search input').keydown(function(e) {
	    if(e.keyCode === 13) {
	    	$('.search-final-item a')[0].click();
	    }
	  });
	$('.headerMenu__search-button').click(function() {
		$('.search-final-item a')[0].click();
	})
	$('.headerMenu-mob__utility-personalize').click(function(e) {
		e.preventDefault();
		$('.headerMenu-mob__personalize').addClass('active');
	})
	$('.headerMenu-mob__personalize .close').click(function() {
		$('.headerMenu-mob__personalize').removeClass('active');
	})
});
