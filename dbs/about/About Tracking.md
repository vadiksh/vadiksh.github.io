#Tracking

## Basic Reporting Setup

The following information needs to be changed for every advertisement feature:

	<script type="text/javascript">
	window.digitalDataLayer = {
		'page_template': 'article',
		'sponsored_content': true,
		'sponsorship_type': 'adfeature',
		'advertiser_name': //... advertiser name,
		'ad_enabled': false
	}
	</script>
	<script type="text/javascript" src="http://assets.adobedtm.com/163d1096ee58e69f3c2853388c3bd41996e5fc4f/satelliteLib-d76d1730abb96687bfefdfdb53da02b40150601c.js"></script>
	<script type="text/javascript">_satellite.pageBottom();</script>

## AJAX

If using ajax, page changes should be indicated by hash changes.

	location.hash = 'myPageName';


## Custom Reporting

When using this repos `Utilities`, use the following to report a custom event:

	Utilities.createDispatchEvent( window, 'adobetagevent', {
		type: // ... event name,
		url: // ... the url,
		// ... any other required details
	});

- _Make sure the tracking for the custom event is also setup by our research team on their side_
- _This is used to report vimeo statistics, for example._

## Custom Link Tracking

Custom link tracking can be reported as follows where necessary:

	element.addEventListener( 'click', function( event ){
		
		if( s && s.tl ){
		
			// <element clicked>, 'e' (exit link) || 'o' (other), 'Reported Name'
			s.tl( event.target, 'e', 'Tracking Name' );
		
		}
		
	});

## External Video Services

Clients require different information on videos played on our advertisement features, some of which is available by default and some of which needs to be programmed in. When using vimeo and `initVimeoPlayer`, some events (like play/pause, progress updates, ...) will report some of those to Adobe Tag Manager by default. If implementing another service or more extensions to an existing service, use the following codestyle to report any data to research.


	Utilities.createDispatchEvent( window, 'adobetagevent', {
		source: // ... video source (iframe src), 
		title: // .. video title,
		action: // ... event name to record,
		value: // .. any passed data
	});

You can extend the object details with additional information as long as you inform Research of what data they need to capture.

## Additional Tracking

Any additional tracking codes and pixels should be placed before the closing `<body>` tag so the user experience remains as solid as possible and tracking scripts don't hold up the page on load.