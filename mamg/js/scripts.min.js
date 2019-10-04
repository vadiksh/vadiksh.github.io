$(function() {
	var linkTabViewed = false;
	$(".dropdown").mouseenter(function() {
		linkTabViewed = true;
		$(".dropdown-list").addClass('visible').slideDown(400);
		$(this).addClass('visible');
	});
	$(".dropdown").mouseleave(function() {
		linkTabViewed = false;

		setTimeout(function () {
			if (!linkTabViewed) {
				$(".dropdown-list").removeClass('visible').slideUp(400);
				$(".dropdown").removeClass('visible');
			}
		}, 200)
	});
	$(".dropdown-list").mouseenter(function () {
		linkTabViewed = true;
	});
	$(".dropdown-list").mouseleave(function () {
		linkTabViewed = false;
		setTimeout(function () {
			 if (!linkTabViewed) {
 				$(".dropdown-list").removeClass('visible').slideUp(400);
 				$(".dropdown").removeClass('visible');
 			}
		}, 100)
	});

	$(".header__banner").owlCarousel({
	    loop:false,
	    nav: false,
	    dots: true,
	    items: 1
	});

	
	
	window._wq = window._wq || [];
	_wq.push({ id: "qcsdgxptqn", onReady: function(video) {
	  $(".play[data-src='qcsdgxptqn']").click(function(){
	  	video.play();
	  });
	}});


	_wq.push({ id: "2mkszsuh04", onReady: function(video) {
	  $(".play[data-src='2mkszsuh04']").click(function(){
	  	video.play();
	  	$(this).fadeOut(300);
	  });
	  video.bind("play", function() {
	    $(".play[data-src='2mkszsuh04']").fadeOut(300);
	  });
	  $('.fixer__nav li').click(function() {
	  	video.pause();
	  });
	}});

	_wq.push({ id: "wwiq0f6vee", onReady: function(video) {
	  $(".play[data-src='wwiq0f6vee']").click(function(){
	  	video.play();
	  	$(this).fadeOut(300);

	  });
	  video.bind("play", function() {
	    $(".play[data-src='wwiq0f6vee']").fadeOut(300);
	  });
	  $('.fixer__nav li').click(function() {
	  	video.pause();
	  });
	}});

	_wq.push({ id: "wss4n9ryu8", onReady: function(video) {
	  $(".play[data-src='wss4n9ryu8']").click(function(){
	  	video.play();
	  	$(this).fadeOut(300);

	  });
	  video.bind("play", function() {
	    $(".play[data-src='wss4n9ryu8']").fadeOut(300);
	  });
	  $('.fixer__nav li').click(function() {
	  	video.pause();
	  });
	}});


	_wq.push({ id: "6ufihat087", onReady: function(video) {
	  $(".play[data-src='6ufihat087']").click(function(){
	  	video.play();
	  	$(this).fadeOut(300);
	  });
	  video.bind("play", function() {
	    $(".play[data-src='6ufihat087']").fadeOut(300);
	  });
	  $('.plans__options li').click(function() {
	  	video.pause();
	  });
	}});

	_wq.push({ id: "ur6xo6mthd", onReady: function(video) {
	  $(".play[data-src='ur6xo6mthd']").click(function(){
	  	video.play();
	  	$(this).fadeOut(300);
	  });
	  video.bind("play", function() {
	    $(".play[data-src='ur6xo6mthd']").fadeOut(300);
	  });
	  $('.plans__options li').click(function() {
	  	video.pause();
	  });
	}});

	_wq.push({ id: "61djakkjde", onReady: function(video) {
	  $(".play[data-src='61djakkjde']").click(function(){
	  	video.play();
	  	$(this).fadeOut(300);
	  });
	  video.bind("play", function() {
	    $(".play[data-src='61djakkjde']").fadeOut(300);
	  });
	  $('.plans__options li').click(function() {
	  	video.pause();
	  });
	}});

	_wq.push({ id: "8zz8azq73o", onReady: function(video) {
	  $(".play[data-src='8zz8azq73o']").click(function(){
	  	video.play();
	  	$(this).fadeOut(300);
	  });
	  video.bind("play", function() {
	    $(".play[data-src='8zz8azq73o']").fadeOut(300);
	  });
	  $('.plans__options li').click(function() {
	  	video.pause();
	  });
	}});


	_wq.push({ id: "second-basics", onReady: function(video) {
	  $(".play[data-src='second-basics']").click(function(){
	  	video.play();
	  	$(this).fadeOut(300);
	  });
	  video.bind("play", function() {
	    $(".play[data-src='second-basics']").fadeOut(300);
	  });
	  $('.plans__options li').click(function() {
	  	video.pause();
	  });
	}});

	$('.quick span').click(function() {
		if ($('.quick').hasClass('active')) {
			$('.quick').removeClass('active');
		} else {
			$('.quick').addClass('active');
		}
	})

	$('.fixer__nav li').click(function() {

		$(this).addClass('active').siblings().removeClass('active');
		$('.fixer__container > li').eq($(this).index()).addClass('active').siblings().removeClass('active');

	});
	$('.plans__options li').click(function() {

		$(this).addClass('active').siblings().removeClass('active');
		$('.plans__list > li').eq($(this).index()).addClass('active').siblings().removeClass('active');

	});

	$('.members__list .more').click(function () {
		$(this).parents('.text').siblings('.arrow').trigger('click');
	})
	$('.members__list .arrow').click(function() {
		var height = $(this).siblings('.text').find('.original').height();
		if ($(this).hasClass('visible')) {
			$(this).removeClass('visible').siblings('.text').removeClass('visible').css({"height": "155px"});
		} else {
			$(this).addClass('visible').siblings('.text').addClass('visible').css({"height": height + "px"});
		}
	})
});
