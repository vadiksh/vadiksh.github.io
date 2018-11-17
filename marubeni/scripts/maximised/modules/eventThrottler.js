class EventThrottler {
	
	constructor( object, eventName, {
		timing = 1000,
		firstEvent = false,
		autostart = true,
		preventDefault = false,
		stopImmediatePropagation = false
	} = {}){
	
		let event = function(){
			let E = false;
			return function( event = false ){
				if( event && preventDefault ) event.preventDefault();
				if( event && stopImmediatePropagation ) event.stopImmediatePropagation();
				if( event && ( !E || !firstEvent) ){
					if( typeof event.constructor === 'function'){
						E = new event.constructor( event.type, event );
					} else {
						E = event;
					}
					return E;
				} else if( event === false ){
					let EC = E;
					E = false;
					return EC;
				}
			}
		}();
		let timeout;
		let handlers = [];
		let self = this;
		let AFwrapper = typeof AnimationFrameController !== 'undefined'
			? () => this.fire()
			: false;
		
		object.addEventListener( eventName, event );
		
		this.fire = function( forced = false ){
			let e = event();
			if( forced || e ) handlers.forEach( handler => handler( forced || e ) );
		}
		this.start = function(){
			if( AFwrapper ){
				AnimationFrameController.add( AFwrapper );
			} else {
				timeout = setInterval(function(){
					self.fire();
				}, timing);
			}
		}
		this.stop = function(){
			if( AFwrapper ){
				animationFrameController.remove( AFwrapper );
			} else {
				clearInterval( timeout );
			}
		}
		this.removeHandler = function( handler ){
			let index = -1;
			while( (index = handlers.indexOf( handler )) >= 0 ){
				handlers.splice( index, 1 );
			}
			return handler;
		}
		this.addHandler = function( handler ){
			if( handlers.indexOf( handler ) < 0 ){
				handlers.push( handler );
			}
			return handler;
		}
		
		if( autostart ) this.start();
		
	}
}