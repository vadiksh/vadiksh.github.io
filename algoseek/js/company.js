$(function() {
	$('.company__nav a').click(function() {
	    $(this).addClass('active').parent().siblings().find('a').removeClass('active');
	    $('.company__container > li').eq($(this).parent().index()).addClass('active').siblings().removeClass('active');
	})
	if (window.location.hash) {
	    var href = window.location.hash;
	    $('a[data-id=' + '"' + href.slice(1) + '"]').trigger('click');
	}
	$('.career__categ li').click(function() {
	    $(this).addClass('active').siblings().removeClass('active');
	    $('.career__list > li').eq($(this).index()).addClass('active').siblings().removeClass('active');
	})
});
