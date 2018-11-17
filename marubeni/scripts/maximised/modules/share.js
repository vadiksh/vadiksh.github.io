/*
 * Construct Share v3.0 // 08 10 2016
 * constructShare([div:Node, options:Object]);
 * -> div:Node.chilNodes([a:Node, ...]);
 */

const createShareElement = function(){

	let networkUrls = {
		linkedin 	: "http://www.linkedin.com/shareArticle?mini=true&url={articleUrl}",
		facebook 	: "https://www.facebook.com/sharer/sharer.php?u={articleUrl}",
		twitter 	: "https://twitter.com/home?status={articleUrl}",
		email	 	: "mailto:?subject={subject}&body={articleUrl}",
		googleplus 	: "https://plus.google.com/share?url={articleUrl}"
	};
	
	return function shareElements({
		url = location.href,
		type = 'a',
		className = 'share__',
		networks = [ 'facebook' , 'twitter' , 'email', 'linkedin' ],
		title = encodeURIComponent( 'Shared: ' + document.title ),
		wrapper = 'div',
		urls = networkUrls
	}){
	
		return networks.reduce( (wrapper, network) => {
			let link = document.createElement( type );
			link.className = className + network;
			link.href = urls[ network ].replace('{articleUrl}', url).replace('{subject}', title);
			link.target = "_blank";
			link.textContent = 'share on ' + network;
			wrapper.appendChild( link );
			return wrapper;
		}, typeof wrapper === 'string' ? document.createElement( wrapper ) : wrapper )
	
	}
	
}();