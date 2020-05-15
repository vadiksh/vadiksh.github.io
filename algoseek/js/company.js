$(function() {
	$('.company__nav li').click(function() {
	    $(this).addClass('active').siblings().removeClass('active');
	    $('.company__container > li').eq($(this).index()).addClass('active').siblings().removeClass('active');
	})
	
	$('.career__categ li').click(function() {
	    $(this).addClass('active').siblings().removeClass('active');
	    $('.career__list > li').eq($(this).index()).addClass('active').siblings().removeClass('active');
	    
	    if ($(window).width() < 1024) {
	    	$('body,html').animate({
	    		scrollTop: $('.career__list').offset().top - 40
	    	}, 500)
	    } else {
	    	$('body,html').animate({
	    		scrollTop: $('.career__list').offset().top - 90
	    	}, 500)
	    }
	})
	if (window.location.hash) {
	    var href = window.location.hash;
	    $('a[data-id=' + '"' + href.slice(1) + '"]').parent().trigger('click');
	}
	if (window.location.search) {
		console.log('dasda')
		$('.career').addClass('active').siblings().removeClass('active');
		console.log($('.career').index());
		$('.company__nav li').eq($('.career').index()).addClass('active').siblings().removeClass('active');
	}
	if (window.location.search == '?dev') $('.career-dev').trigger('click');
	if (window.location.search == '?marketing') $('.career-marketing').trigger('click');
	if (window.location.search == '?sales') $('.career-sales').trigger('click');
	if (window.location.search == '?financial') $('.career-financial').trigger('click');
});
