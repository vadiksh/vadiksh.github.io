# About Banners

In order to add banners to websites, you can add the following code to the js include scripts:

	include( 'scripts/_cnn_ais.js' );
	include( 'http://i.cdn.turner.com/ads/cnn_international/adfuel.js' );
	include( 'scripts/_cnn_epicspec.js', function(){
		
		setEpicSpec( window, [advertiser], 'cnni_adfeature' );
		delete setEpicSpec; // Make inaccessible
		
	});
	include( 'http://i.cdn.turner.com/ads/cnni/cnni_adfeature.js' );
	
These scripts must be loaded and executed in that order for it to work. Ensure that `[advertiser]` is filled in with the advertiser name that our traffic team uses to identify which banners to display.

In the HTML, you will need to add a `div` element with an ID for the banner to be inserted into. It will look something like this:

	<div id="bnr_btf_01"></div>
	
This will insert a Banner Below The Fold. Ask our traffic team for info on targeting `id`s.