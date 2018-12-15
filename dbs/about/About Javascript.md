# Javascript 

## include

### Including scripts on demand

	include( path:String[, callback:Function] );

There is a script available called `include.js`, which will allow including javascript files one by one without needing to declare the script tags yourself. This allows you to load certain files only when certain test are true. For example, using the `DEVELOPMENT` test will allow you to check for standard development URLs and load source files instead.
	
	if( myTest ){
		
		// ... include something
		include('my_uncompiled_script.js');
		
	} else {
	
		// ... include something else
		include('my_compiled_script.js');
		
	}

This way you could also only load tracking scripts on production servers or easily test your script when compilation would take longer.

Include takes a callback function as a second argument, which will be fired after loading the script and before loading the next one. If include fails it will throw an error but continue loading any script requested afterwards. This might create more errors, but at least they are obvious.

### Tests

The `include.js` file includes a dirty polyfill for `Array.prototype.find` (IE11-) and uses it to provide a couple of simple tests. The following tests are executed by default:

	var DEVELOPMENT:Bool

Contains either `true` or `false` depending on whether the site seems to be ran from `localhost` domains or the `file://` protocol, or if `development=true` was detected in the URL arguments. Will always be `false` if the keyword `production` is detected in the URL arguments.

	var ES6:Bool

Contains either `true` or `false` depending on whether a quick test of some key ES6 features has thrown an error or not. Because the source files are written in ES6, it might be useful for testing purposes to only use the source files for debugging if the browser can actually read ES6.

	var IE:Bool
	
Everybody's favourite browser gets sniffed out in a userAgent test. That's not ideal, but works for most cases and for the general purpose of detecting IE. If IE is detected. ES6 should also be `false`.

## Included features

### Core

Contains a couple of useful functions. See the JS file for comments and instructions.

	userAgent( [...String] ) -> Bool

Return `true` if any of the strings are matched in the userAgent. Not case sensitive.

	select( query:String[, root:HTMLElement ]) -> [HTMLElement...]
	
Select elements in the DOM. Uses `querySelectorAll` and does not throw errors if nothing is found. Returns an array of `HTMLElements`. The root element defaults to `document`.

	clamp( value:Number, min:Number, max:Number ) -> Number

Clamp a value between the Min and Max. Defaults to clamping between 0 and 1.

	scrollTo( options = {} ) -> Function

Scroll an element to a certain position (animated). Returns a function to call and cancel the animation and scrolling.

	scrollToElement( element: HTMLElement ) -> Function

Uses `scrollTo` but automatically calculates the position it needs to scroll to for the passed element.

	getBounds( element:HTMLElement[, bounds:{ top:Number, left:Number, bottom:Number, right:Number }]) -> BoundingClientRect

Returns the `boundingClientRect` of the element with an added key: `visible`. If the elements bounding client rectangle overlaps with the passed in `bounds`, `.visible` will be set to `true`. The bounds default to the viewports bounds.

	var scrollBody

Contains the default body element that can be scrolled. This differs from browser to browser, so this should be available in here.

### AnimationFrame Controller

	const AF;

Use the animation frame controller instead of calling `requestAnimationFrame` directly. See the JS file for comments and instructions.

### Event Throttler
	
	new EventThrottler

Throttle events to animation frames. See the JS file for comments and instructions.

### DOM Parallax

	applyParallax( [ HTMLElement, ... ] );

Apply parallax effects while scrolling on DOM nodes that have the `data-parallax` attribute. See the JS file for comments and instructions.

### Share
	
	createShareElement( options = {} );

Create a share element with the current link and title. See the JS file for comments and instructions.

### Vimeo
	
	initVimeoPlayer( iframe ) -> Promise

Create a customised vimeo element with CNN styled controls. This also comes with built-in video tracking. See the JS file for comments and instructions.