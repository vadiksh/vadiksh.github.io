const Utilities = {
	// DOM classes
	addClass( element, className ){
		this.removeClass( element, className );
		element.className = (element.className + ' ' + className).trim();
		this.createDispatchEvent( element, 'classadd', { name: className } );
	},
	removeClass( element, className ){
		element.className = ((' ' + element.className + ' ').replace(new RegExp(' ' + className + ' ', 'g'), ' ')).trim();
		this.createDispatchEvent( element, 'classremove', { name: className } );
	},
	toggleClass( element, className ){
		if( this.hasClass( element, className ) ){
			this.removeClass( element, className );
		} else {
			this.addClass( element, className );
		}
	},
	hasClass( element, className ){
		return ((' ' + element.className + ' ').indexOf(' ' + className + ' ') >= 0);
	},
	// DOM selection to Array
	querySelectorArray( query, root ){
		return Array.prototype.slice.call((root || document).querySelectorAll(query));
	},
	// Request data
	// Maybe use Promise?
	XMLHttpRequest( url, success, failure, params ){
		if(!success) return;
		if(!failure) failure = function( msg, req, data){
			console.warn(msg);
			console.log(req);
		}
		var request = new XMLHttpRequest();
		request.addEventListener("error", function(e){
			failure('Error', e);
		});
		request.addEventListener("load", function(){
			if(this.status === 200)
				success(this.responseText);
			else
				failure('Unexptected status: ' + this.status, request);
		});
		request.open(params ? "POST" : "GET", url);
		request.send(params);
	},
	// takes a list of values and returns the first defined one
	isset( value, defaultsMultiple ){
		var defaults = Array.prototype.slice.call(arguments);
		for(var i = 0; i < defaults.length; i++){
			if(typeof defaults[i] !== 'undefined') return defaults[i];
		}
		return false;
	},
	// Scroll an DOM node
	scrollTo( options ){
		if(typeof options !== 'object') return false;
		var element = options.element || this.scrollBodyElement(),
			x = this.isset(options.startX, element.scrollLeft),
			x = this.isset(options.x, options.left, x) - x,
			y = this.isset(options.startY, element.scrollTop),
			y = this.isset(options.y, options.top, y) - y,
			e = this.isset(options.easing, n => n),
			d = this.isset(options.duration, 400);
			
		this.createDispatchEvent( e, 'scrollstart' );
		var animation = AnimationFrameController.add(( delta, progress ) => {
			if( x ) element.scrollLeft += delta / d * x;
			if( y ) element.scrollTop += delta / d * y;
			if( progress >= d ){
				if(options.callback) options.callback();
				this.createDispatchEvent( element, 'scrollend' );
				return false;
			} else {
				this.createDispatchEvent( element, 'scrollmove' );
			}
		});
		return { cancel(){
			AnimationFrameController.remove( animation );
			this.createDispatchEvent( element, 'scrollend' );
			this.id = false;
		}, id: animation }
	},
	// FAQs
	scrollBodyElement(){
		return this.isInternetExplorer() || this.isFireFox()
			? document.documentElement 
			: document.body;
	},
	isInternetExplorer(){
		return !!(
			navigator.userAgent.toLowerCase().indexOf('msie') >= 0
			|| navigator.userAgent.toLowerCase().indexOf('trident') >= 0
		);
	},
	isFireFox(){
		return !!(navigator.userAgent.toLowerCase().indexOf('firefox') >= 0);
	},
	inViewport( element ){
		var bb = element.getBoundingClientRect();
		return bb.top >= -bb.height && bb.top <= window.innerHeight ? bb : false; 
	},
	// Events
	createDispatchEvent( object, type, detail = {}){
		this.dispatchEvent( object, this.createCustomEvent( type, detail ) );
	},
	createCustomEvent( type, detail = {} ){
		try { 
			return new CustomEvent( type, { detail } );
		} catch( e ){
			var event = document.createEvent("CustomEvent");
			event.initCustomEvent( type, true, true, { detail } );
			return event;
		}
	},
	dispatchEvent( object, event ){
		if( object.dispatchEvent ){
			object.dispatchEvent( event );
		} else if( object.fireEvent ){
			object.fireEvent("on" + event.type, event);
		}
	}
}