const initVimeoPlayer = function(){
	
	var READY = new Promise(function(resolve,reject){
		var API_SRC = 'https://player.vimeo.com/api/player.js';
		if( !document.querySelector(`script[src="${API_SRC}"]`) ){
			let tag = document.createElement('script');
			tag.setAttribute('type','text/javascript');
			tag.addEventListener('load', resolve);
			tag.addEventListener('error', reject);
			tag.src = API_SRC;
			document.body.appendChild( tag );
		} else {
			resolve();
		}
	});
	
	return function( element ){
	
		return new Promise(function(resolve, reject){
		
			READY.then(function(){
	
				var parent = element.parentNode;
				var wrapper = document.createElement('div');
				var controls = document.createElement('ul');
				wrapper.className = 'vimeo player';
				var player = new Vimeo.Player( element );
				var duration = 1;
				var src = element.getAttribute('src');
				var title = src;
				
				player.getVideoTitle().then(t => title = `${t}`);
				
				player.on('ended', function( event ){
					Utilities.createDispatchEvent( window, 'adobetagevent', {
						source: src,
						title: title,
						action: 'ended'
					});
				});

				player.getDuration().then(function(v){ duration = v; });
				player.getVolume().then(function(v){
					volume_bar.style.width = (v * 100) + '%';
					volume_bar.style.height = (v * 100) + '%';
				});

				var play = document.createElement('li');
				play.className = 'play';
				play.addEventListener('click', function(){
					if( play.className === 'play' ) player.play();
					else player.pause();
				});
				player.ready().then(function(){
					player.on('play', function(){ 
						play.className = 'pause';
						Utilities.createDispatchEvent( window, 'adobetagevent', {
							source: src,
							title: title,
							action: 'play'
						});
					});
					player.on('pause', function(){ 
						play.className = 'play';
						Utilities.createDispatchEvent( window, 'adobetagevent', {
							source: src,
							title: title,
							action: 'pause'
						});
					});
				});

				function setProgress( amount ){
					amount = amount < 0 ? 0 : (amount > 1 ? 1 : amount);
					progress_bar.style.width = (amount * 100) + '%';
					progress_bar.style.height = (amount * 100) + '%';
					player.setCurrentTime( amount * duration );
					progress_marker = Math.floor( amount / .25 ) * .25;
				}

				var progress = document.createElement('li');
				var progress_bar = document.createElement('span');
				var progress_bar_load = document.createElement('span');
				var progress_mousedown = false;
				var progress_marker = 0;
				progress_bar.className = 'progress-bar';
				progress_bar_load.className = 'progress-bar-load';
				progress.className = 'progress';
				progress.appendChild( progress_bar );
				progress.appendChild( progress_bar_load );
				progress.addEventListener('mousedown', function( event ){
					if( !progress_mousedown ) setProgress( event.offsetX / progress.clientWidth );
					progress_mousedown = true;
				});
				progress.addEventListener('mousemove', function( event ){
					if( progress_mousedown ) setProgress( event.offsetX / progress.clientWidth );
				});
				progress.addEventListener('mouseup', function( event ){
					progress_mousedown = false;
				});
				progress.addEventListener('mouseleave', function( event ){
					progress_mousedown = false;
				});
				player.ready().then(function(){
					player.on('progress', function( event ){
						progress_bar_load.style.width = event.percent * 100 + '%';
						progress_bar_load.style.height = event.percent * 100 + '%';
					});
					player.on('timeupdate', function( event ){
						progress_bar.style.width = event.percent * 100 + '%';
						progress_bar.style.height = event.percent * 100 + '%';
						var milestone = false;
						if( event.percent >= progress_marker + .25 ){
							milestone = true;
							progress_marker += .25;
						}
						Utilities.createDispatchEvent( window, 'adobetagevent', {
							source: src, 
							title: title,
							action: 'time',
							milestone: ((event.percent - (event.percent % .25)) || 0),
							isMilestone: milestone,
							value: event.percent,
							duration
						});
					});
				});

				function setVolume( amount ){
					console.log( amount );
					amount = amount < 0 ? 0 : (amount > 1 ? 1 : amount);
					volume_bar.style.width = (amount * 100) + '%';
					volume_bar.style.height = (amount * 100) + '%';
					player.setVolume( amount );
				}

				var volume = document.createElement('li');
				var volume_bar = document.createElement('span');
				var volume_mousedown = false;
				volume.className = 'volume';
				volume.appendChild( volume_bar );
				volume.addEventListener('mousedown', function( event ){
					setVolume( event.offsetX / volume.clientWidth );
					volume_mousedown = true;
				});
				volume.addEventListener('mousemove', function( event ){
					if( volume_mousedown ) setVolume( event.offsetX / volume.clientWidth )
				});
				volume.addEventListener('mouseup', function( event ){ volume_mousedown = false; });
				volume.addEventListener('mouseleave', function( event ){ volume_mousedown = false; });

				controls.appendChild( play  );
				controls.appendChild( progress );
				controls.appendChild( volume );

				element.parentNode.insertBefore( wrapper, element );
				wrapper.appendChild( element );
				wrapper.appendChild( controls );
				
				resolve({ player, element });
	
			});
	
		});
	
	}

}();