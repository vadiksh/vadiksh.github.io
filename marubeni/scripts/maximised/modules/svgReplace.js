function replaceSVG( query = '[data-svg]', callback = 'DISPATCH_EVENT' ){
	
	if( !!(document.createElementNS && document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect) ){
		
		var all = Utilities.querySelectorArray( query );
		var done = [];
		
		// Replace all placeholder with SVGs
		all.forEach( function( element ){

			// Make sure the important layout attributes are retained when changing the element
			var id = element.id;
			var classes = element.className;
			var source = element.getAttribute('data-svg');
			
			function end(){
				if( done.length === all.length && callback === 'DISPATCH_EVENT' ){
					if( window.dispatchEvent ){
						window.dispatchEvent(new CustomEvent('svgreplaced', {detail: {
							query: query, done: done, success: true
						}}));
					}
				} else if( done.length === all.length && typeof callback == 'function'){
					callback( done );
				}
			}
			
			Utilities.XMLHttpRequest( source, function( text ){
				let holder = document.createElement('div');
				holder.innerHTML = text;
				let svg = holder.querySelector('svg');
				if( svg ){
					svg.setAttribute('id', id);
					svg.setAttribute('class', classes);
					svg.setAttribute('data-svg-source', source);
					element.parentNode.insertBefore( svg, element );
					element.parentNode.removeChild( element );
					done.push( svg );
				} else {
					done.push( element );
				}
				end();
			}, function(){
				done.push( element );
				end();
			});

		});
	
	} else {
		window.dispatchEvent(new CustomEvent('svgreplaced', {detail: {
			query: query, done: [], success: false
		}}));
	}
	
}