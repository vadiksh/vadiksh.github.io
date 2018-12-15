# Code Style Guide

## Resources and General Structure
	
	|- index.html
	|- article /
	|  |- index.html
	|  |- resources /
	|- resources
	|- images
	|- sass
	|- css
	|- scripts /
	|  |- _maximised /
	|  |  |- _scripts /
	
- Every article should be contained in its own folder that includes its own `resources` folder for unique resources.
- If only one article, the `index.html` and the `resources` folder at the root should be used.
- Images shared by pages (like logos or icons) should be stored in `images` at the root.
- Script should be written in ES6 and compiled to ES2015.

## HTML

### Style

	<section id="my-section" style="background=images:url(my/resource.ext)">
		
		<h1>My <strong>Bold</strong> title</h1>
		
		<a href="#home" class="home-button">Go Home</a>
		
	</section>

- Indentation with tabs (4 spaces)
- Indentation of nested nodes
- `<html>`,`<head>` and `<body>` tags are flush to the left. This is to prevent content from getting indented too much.
- Every node starts on a new line (except inline-block nodes like italics or bold in text content).
- Add additional line breaks if nodes get too compact to easily find.
- Content images are defined in HTML (using `style="background-image:url()"`), whereas layout images are linked through CSS.
- If a node contains just a single line of content, its tags will be wrapped around the line.
- If a node contains others nodes or a mix of content and nodes, new lines should be used for every node and piece of content
- Node IDs, classes and any non-content attributes are all lowercase.
- Any Node Attribute should be wrapped in double quotation marks `"`.
- Class Names should reflect the changes they perform or behaviour they group (`image-hover`, not `float-mouse-over-do`)
- ID's and Classnames should use `-` to connect words.
- `<script>` tags should be before the closing `</body>` tag, and not in the head.

## SASS

### Ordering

- The order of definition on the global SASS file should be:
- - Global Imports `@import`
- - Function Declarations `@function`
- - Variable Declarations `$variable`
- - Mixin Declarations `@mixin`
- - Keyframe Animation Declarations `@keyframes`
- - Nodes (in the order of nesting) `html, body, article, section, p, ...`
- - Classes `.className`
- - Attributes `[data-attribute]`
- - IDs `#identifier`

### Style

- Indentation with tabs
- Indentation of nested definitions
- Every declaration gets a new line
- Lonely (single) declarations can be on a single declarative line, as long as its clear this is a single deviation:

	.icon {
		background-image: url(default.svg);
		background-size: contain;
		background-repeat: no-repeat;
		background-position: 50% 50%;
		&.plus { background-image: url(plus.svg); }
		&.minus { background-image: url(minus.svg); }
	}


## JS

### Ordering

- The order of definition in a Javascript file should be:
- - Function Declarations
- - Constant Declarations
- - Constant (with variable properties) Declarations
- - Variable Declarations
- - Setup
- - Executables

### Style

In general, adhere to Mr Doob's Code Style™:
	
	https://github.com/mrdoob/three.js/wiki/Mr.doob%27s-Code-Style™

There are a couple of modifications we adhere to in our code style however:

Names of objects, variables and constants should follow consistent rules and should be as descriptive as possible.

- `const CAPITALISED` should be used for non-changing constants (like `RADIAN`)
- `const lowercased` should be used for changing constants (like `position_vector`)
- `var lowercased` used for any other variables
- `let lowercased` used for variables only available to the current block scope

Function names should be all lowercase for non-constructor or factories. Use `_` to connect unconnected words, use `camelCase` for connection words that are related and groupable.

	function event_video_click(){}
	function event_video_dragProgressBar(){}
	function MakeBackgroundGenerator(){}

_Clarification: `event` and `video` are unrelated (entirely seperate things that interact with each other), but in `drawProgressBar` the three words are most certainly related, and don't convey function if not packed together._

Any block declaration should be followed by a newline, and the closing brace should be preceded by one. The keyword is directly followed by the braces, while arguments are separated from them with a space. Any argument followed by a comma has no space before the comma, but does after. Continuing statements are separated by spaces:

	if( statement === true ){
	
		... My Statements
	
	} else {
		
		.. My Else Statements
		
	}

_Clarification: Our code prefers to omit spaces after keywords. Again, if the content that follows is related you should to omit spaces, to make the relationship clear. This is true for `switch`, `forEach`, `for` and `while`, ... loops._
	
Objects can be represented single line where it makes sense, and don't have to follow the extra newline declarations so they seem more like unified objects:

	var vector = { x: 0, y: 1, z: 0 };

But most of the time all keys and variables should be on newlines:

	var code_style = {
		newlines: true,
		commas: false
	}

Any declarations would preferably be sorted by similarity of lines, and preferably also by line-length (short to long) to make the code as legible as possible.
	
	this_is_similar.x = 1;
	this_is_similar.y = 75;
	this_is_similar.z = 22;
	this_is_similar.addEventListener(event => {})
	this_is_similar.addEventListener(event => {})

Trailing arrow functions can omit the space before being used as an argument, and this also removes the space after being used as an argument:

	a.add(event => myStuff);
	a.add(event => {
		return myStuff;
	});

Short hand ternary operators should be styled as follows if their line gets too long to easily read:

	statement === true
		? do this
		: do that;
	
