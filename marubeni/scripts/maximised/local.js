const onSCROLL = new EventThrottler( document, 'scroll' );
const onRESIZE = new EventThrottler( window, 'resize' );

var currentPage = '#';
const container = document.querySelector('#container');
const navigation = document.querySelector('nav');
const footer = document.querySelector('footer');
const article = document.querySelector('article');
const header = document.querySelector('header');
const scrollBody = Utilities.scrollBodyElement();

const addArticleResizeHandlers = function(){
	var resizeHandler = function(){};
	return function(){
		var divs = Utilities.querySelectorArray('article > div').reduce((r,d) => {
			if( r[r.length - 1] && r[r.length - 1].length !== 2 ){
				r[r.length - 1].push( d );
			} else {
				r.push([d]);
			}
			return r;
		}, []);
		onRESIZE.removeHandler( resizeHandler );
		if( divs.length ){
			resizeHandler = function(){
				divs.forEach(function( pair ){
					pair[0].style.height = '';
					pair[1].style.height = '';
					if( window.innerWidth > 800 ){
						var h = pair[0].clientHeight > pair[1].clientHeight
							? pair[0].clientHeight : pair[1].clientHeight;
						pair[0].style.height = h + 'px';
						pair[1].style.height = h + 'px';
					}
				})
			}
			onRESIZE.addHandler( resizeHandler );
			resizeHandler();
		}
	}
}();

function addArticleSocials(){
	var socials = createShareElement({
		url: location.href
	});
	socials.className = 'socials';
	article.appendChild( socials );
}

function becauseEverybodyLovesAutoplay(){ // \s
	var vimeo = Utilities.querySelectorArray('aside iframe[src*="vimeo"]');
	vimeo.forEach(frame => initVimeoPlayer(frame).then(function({ player } = {}){
		var aside = frame.parentNode;
		while( aside.parentNode && aside.tagName !== 'ASIDE' ){
			aside = aside.parentNode;
		}
		if( aside ){
			let playing = false, setting = false;
			player.on('play', function(){
				Utilities.addClass(aside, 'playing');
				playing = true;
				setting = false;
			});
			player.on('pause', function(){
				Utilities.removeClass(aside, 'playing');
				playing = false;
				setting = false;
			});
			aside.addEventListener('click', function( event ){
				if( event.target === aside ){
					event.preventDefault();
					player.play();
				}
			});
			onSCROLL.addHandler(() => {
				if( setting ) return;
				var inView = Utilities.inViewport( frame );
				if( inView && !playing ){
					setting = true;
					player.play();
				} else if( !inView && playing ){
					setting = true;
					player.pause();
				}
			});
		}
	}));
}

function addArticleLinks( parent = article ){
	Utilities.querySelectorArray('a', parent).forEach(a => {
		let url = a.getAttribute('href');
		let page = pages.find(p => {
			return '#' + p.href.split('.')[0] === url
		});
		if( page ){
			page = page.href.split('.')[0];
			a.addEventListener('click', function( event ){
				event.preventDefault();
				Utilities.scrollTo({ y: article.offsetTop + 60 })
				if( currentPage !== url ){
					loadPage( page );
				} else {
					Utilities.addClass( container, 'navigation-closed' );
				}
			});
		} else if( url.indexOf('http') === 0 ){
			a.setAttribute('target', '_blank');
		}
	});
}

function loadPage(url){
	if( url === '#' ) return;
	location.hash = url.replace('.html', '');
	Utilities.addClass( container, 'navigation-loading' );
	Utilities.XMLHttpRequest(url, function( success ){
		currentPage = url;
		var d = document.createElement('document');
		d.innerHTML = success;
		article.innerHTML = d.querySelector('article').innerHTML;
		Utilities.removeClass( container, 'navigation-loading' );
		Utilities.addClass( container, 'navigation-closed' );
		addArticleResizeHandlers();
		addArticleSocials();
		addArticleLinks();
		becauseEverybodyLovesAutoplay();
	}, function(){
		console.log('Error loading url: ' + url );
		Utilities.removeClass( container, 'navigation-loading' );
	});
}

// Create navigation here so every page gets a navigation without having the handcode each....
const pages = [
	{
		href:'energy.html',
		main:'resources/navigation/energy.jpg',
		thumb:'resources/navigation/energy-thumb.jpg',
		title:'SmartestEnergy',
		titleMobile:'Smartest Energy'
	},
	{
		href:'mertens.html',
		main:'resources/navigation/mertens.jpg',
		thumb:'resources/navigation/mertens-thumb.jpg',
		title:'Mertens'
	},
	{
		href:'seafood.html',
		main:'resources/navigation/seafood.jpg',
		thumb:'resources/navigation/seafood-thumb.jpg',
		title:'North Pacific Seafoods'
	},
	{
		href:'vietnam.html',
		main:'resources/navigation/vietnam.jpg',
		thumb:'resources/navigation/vietnam-thumb.jpg',
		title:'Educational Fund in Vietnam'
	},
	{
		href:'wagyu.html',
		main:'resources/navigation/wagyu.jpg',
		thumb:'resources/navigation/wagyu-thumb.jpg',
		title:'Rangers Valley'
	}
];

pages.forEach(type => {
	
	let item = document.createElement('a');
	let strong = document.createElement('strong');
	
	item.setAttribute('href', type.href || '#');
	item.style.backgroundImage = `url(${type.main})`;
	strong.textContent = type.title;
	
	item.appendChild( strong );
	
	let footerItem = item.cloneNode( true );
	footerItem.querySelector('strong').textContent = type.titleMobile || type.title
	footerItem.style.backgroundImage = `url(${type.thumb})`;
	
	footer.appendChild( footerItem );
	navigation.appendChild( item );
	
});

const navigationLinks = Utilities.querySelectorArray( 'a', navigation );
const footerNavLinks = Utilities.querySelectorArray( 'a', footer );

navigationLinks.forEach( a => {
	a.style.width = (100 / navigationLinks.length) + '%';
});
navigationLinks.concat( footerNavLinks ).forEach(a => {
	let url = a.getAttribute('href');
	a.addEventListener('click', function( event ){
		event.preventDefault();
		Utilities.scrollTo({ y: article.offsetTop + 60 })
		if( currentPage !== url ){
			loadPage( url );
		} else {
			Utilities.addClass( container, 'navigation-closed' );
		}
	});
});

navigation.addEventListener('click', function( event ){
	event.preventDefault();
	if( event.target === navigation ){
		Utilities.removeClass( container, 'navigation-closed' );
		Utilities.scrollTo({
			top: 0
		})
	}
});

onSCROLL.addHandler(function(){
	var isFixed = false;
	return function(){
		// Fixed the navigation in place
		var bb = article.getBoundingClientRect();
		var overTreshold = bb.top < 30;
		if( !isFixed && overTreshold ){
			Utilities.addClass( container, 'navigation-fixed' );
			isFixed = true;
		} else if( isFixed && !overTreshold ){
			Utilities.removeClass( container, 'navigation-fixed' );
			isFixed = false;
		}
		// Offset the navigation when scrolling past to reveal the footer
		if( bb.bottom < window.innerHeight ){
			navigation.style.top = 30 - (innerHeight - bb.bottom) + 'px';
		} else {
			navigation.style.top = '';
		}
	}
}());

document.addEventListener('DOMContentLoaded', function(){
	
	addArticleLinks( document.body );
	
	var socials = createShareElement({
		url: location.href.split('#')[0],
		wrapper: document.querySelector('#social')
	});
	
	let hash = location.hash.slice(1);
		hash = hash === '' ? 'energy' : hash;
	let page = pages.find(p => p.href === hash + '.html');
	
	if( page ){
		loadPage( hash + '.html' );
	} else {
		console.log('Page not found in listing: ' + hash + '.html');
	}
	
})