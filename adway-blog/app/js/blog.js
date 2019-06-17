$(function() {
	$('.blog__main-description').shave(70);

	

	$('.grid').masonry({
	  	columnWidth: '.grid-item',
	  	gutter: '.gutter-sizer',
	  	itemSelector: '.grid-item',
	  	percentPosition: true
	});
	if ($(window).width() < 768) {
		var src;
		for (var i = 0; i < $('.grid-item:not(.no-image)').length; i++) {
			src = $('.grid-item:not(.no-image)')[i].dataset.src;
			$('.grid-item:not(.no-image)')[i].style.background = "url('../" + src + "')";
		}
	}
})