function ApplyParallax( query = '*[data-parallax]', attribute = 'data-parallax' ){
	
	if( !Utilities || !Utilities.querySelectorArray ){
		return console.warn('Missing querySelectorArray');
	}
	if( typeof EventThrottler === 'undefined' ){
		return console.warn('Missing EventThrottler');
	}
	if( typeof AnimationFrameController === 'undefined' ){
		return console.warn('Missing AnimationFrameController');
	}
	
	let units = ['vw','vh','vmin','px','em','rem','%'];
	let unit = v => units.find(u => v.indexOf(u) >= 1);
	
	/* evaluate nodes
	 * Returns [{ node: <node>, x: [min,max,unit], y; [min,max,unit] }]
	 */
	let nodes = Utilities.querySelectorArray( query ).map(node => {
	
		let data = node.getAttribute( attribute ).split(',');
		
		let x = (data[0] || '0->0').split('->');
		let y = (data[1] || '0->0').split('->');
		
		x[1] = typeof x[1] === 'undefined' ? x[0] : x[1];
		x[2] = unit(x[0]) || unit(x[1]) || '%';
		x[0] = parseFloat(x[0]);
		x[1] = parseFloat(x[1]);
		
		y[1] = typeof y[1] === 'undefined' ? y[0] : y[1];
		y[2] = unit(y[0]) || unit(y[1]) || '%';
		y[0] = parseFloat(y[0]);
		y[1] = parseFloat(y[1]);
		
		return { node, x, y };
		
	});
	
	let throttler = new EventThrottler(window, 'scroll');
	
	console.log( nodes );
	
	let apply = event => {
		nodes.forEach(node => {
			let bb = node.node.getBoundingClientRect();
			if( bb.top + bb.height > 0 && bb.top < window.innerHeight ){
			
				let avg = 1 - (bb.top + bb.height) / (window.innerHeight + bb.height * 2);
				
				let x = node.x[0] + (node.x[1] - node.x[0]) * avg;
				let y = node.y[0] + (node.y[1] - node.y[0]) * avg;
				
				x = x.toFixed(3) + node.x[2];
				y = y.toFixed(3) + node.y[2];
				
				node.node.style.webkitTransform = `translate(${x},${y})`;
				node.node.style.mozTransform = `translate(${x},${y})`;
				node.node.style.msTransform = `translate(${x},${y})`;
				node.node.style.oTransform = `translate(${x},${y})`;
				node.node.style.transform = `translate(${x},${y})`;
				
			}
		});
	};
	
	throttler.addHandler( apply );
	throttler.fire( true );
	
	window.addEventListener('resize', e => apply());
	
}