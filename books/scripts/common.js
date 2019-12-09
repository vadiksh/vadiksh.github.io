document.addEventListener('DOMContentLoaded', function(){
	var isTouchDevice = (('ontouchstart' in window)
	         || (navigator.MaxTouchPoints > 0)
	         || (navigator.msMaxTouchPoints > 0));
	if (isTouchDevice) {
		var links = Array.from(document.getElementsByTagName('a'));
		var linksArr = [];
		for (var i = 0; i < links.length; i++) {
			var linkObj = {};
			Object.defineProperties(linkObj, {
			  'clicked': {
			    value: false,
			    writable: true
			  }
			});
			linksArr.push(linkObj)
		}
		for (var j = 0; j < links.length; j++) {
			links[j].addEventListener('click', function(e) {
				if (!linksArr[links.indexOf(this)].clicked) {
					e.preventDefault();	
					linksArr[links.indexOf(this)].clicked = true;
				}
			})
		}
	}
});
