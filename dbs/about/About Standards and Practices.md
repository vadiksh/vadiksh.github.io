# About Standards & Practices

## Code

The following header must be included on every page:

	<div id="cnn-header">
		<a href="http://cnn.com" id="CNN-content" class="cnn-back">Back to CNN</a>
		<a href="... exit link ..." id="CNN-sponsor" class="cnn-sponsor">Sponsor Content From ... Sponsor Name ...</a>
		<div class="cnn-menu">
			<a href="#">&copy; 2017 Cable News Network. Turner Broadcasting System Europe, limited. All Rights Reserved.</a>
			<a href="http://edition.cnn.com/terms">Terms of service</a>
			<a href="http://edition.cnn.com/privacy">Privacy guidelines</a>
			<a href="http://edition.cnn.com/#">Ad choices</a>
			<a href="http://edition.cnn.com/about">About us</a>
			<a href="http://edition.cnn.com/feedback">Contact us</a>
			<a href="http://www.turner.com/careers">Work for us</a>
			<a href="http://edition.cnn.com/help">Help</a>
		</div>
		<script type="text/javascript">(function(){if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,'');};} var add = function(n,c){ return (n.className = (rem(n,c) + ' ' + c).trim()); }, rem = function(n,c){ return (n.className = (' ' + n.className + ' ').replace(' ' + c + ' ', ' ').trim()); }, header = document.getElementById('cnn-header'), menu = header.querySelector('.cnn-menu'), isset = false, issetMenu = false; window.addEventListener('scroll', function(){ var toBeSet = (pageYOffset ? pageYOffset : (document.documentElement.clientHeight ? document.documentElement.scrollTop : document.body.scrollTop)) > header.clientHeight / 2; if( !isset && toBeSet ){ add(header,'fixed'), isset = true; } else if( isset && !toBeSet ){ rem(header,'fixed'), isset = false; } }), menu.addEventListener('click', function( event ){ if( event.target === menu ){ if( !issetMenu ){ menu.className = add(menu,'active'), issetMenu = true; } else { menu.className = rem(menu,'active'), issetMenu = false; }} }); })();</script>
	</div>

The related css for this can be found in `_cnn.scss`, and is included in the default `style.scss` file. If you use another file, be sure to include the CNN css.

The javascript should not interfere with your javascript as it is set up in an anonymous function with its own scope. All the javascript does is add a fixed class to the header when scroll from the top is more than 30px.

## Size

The size of the CNN header will always be:

	width: 100%
	height: 60px

Even when the sponsor bar gets fixed after scroll it will still take up that amount. However, for the viewport it will effectively be

	width: 100%
	height: 30px

## Wording and Visual
	
- The wording on the gold bar must always be: "Sponsor Content From [ Sponsor Name ]".
- If alternative wording is to be used, make sure to inquire with us so we can check whether this will be allowed under the guidelines set out by S&P.
- The gold bar must always be gold and cannot be tampered with.
- It is also possible to use a cnn-money scheme inspired bar by adding the class `money` to the `cnn-content` div.