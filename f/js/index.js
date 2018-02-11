var item_title = $('.article-title');
var item_text = $('.article-text');
var requestURL = 'https://github.com/vadiksh/vadiksh.github.io/blob/master/h/example-rss.json';
var request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  var items_data = request.response;
  showTitle(items_data);
  // showText(items_data);
}

function showTitle(jsonObj) {
	var title = jsonObj['items'][1]['title'];
	item_title.text(title);
}