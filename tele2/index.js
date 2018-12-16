$(document).ready(function() {

	$('.btn-messenger, .btn-outline-messenger').click(function() {
		$('.modal-form').fadeIn(500);
	})

	$('.btn-full-story').click(function() {
		// $('.')
	})
	$('.btn-video').click(function() {
		var videoSrc = this.dataset.src;
		$('.modal-video').fadeIn(500);
		$('.modal-video iframe')[0].src = videoSrc;
	})
	$('.modal-close').click(function () {
		$('.modal-block').fadeOut(400);
		setTimeout(function () {
			$('.modal-video iframe')[0].src = '';
		},400)
	})

	var requestURL = 'https://portal.adway.ai/api/feed/indeed?token=449a2cb6-b7f6-11e8-96f8-529269fb1459';
	var request = new XMLHttpRequest();

	request.open('GET', requestURL, true);
	request.responseType = 'json';
	request.onload = function() {
  	var feed = request.response;
  	console.log(feed);
	}
	request.send();
});