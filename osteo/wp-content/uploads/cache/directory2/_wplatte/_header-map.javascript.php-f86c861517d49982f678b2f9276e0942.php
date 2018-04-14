<?php //netteCache[01]000581a:2:{s:4:"time";s:21:"0.40113800 1489855351";s:9:"callbacks";a:4:{i:0;a:3:{i:0;a:2:{i:0;s:6:"NCache";i:1;s:9:"checkFile";}i:1;s:95:"D:\xampp\htdocs\rsar1\wp-content\themes\directory2\ait-theme\elements\header-map\javascript.php";i:2;i:1451322000;}i:1;a:3:{i:0;a:2:{i:0;s:6:"NCache";i:1;s:10:"checkConst";}i:1;s:20:"NFramework::REVISION";i:2;s:22:"released on 2014-08-28";}i:2;a:3:{i:0;a:2:{i:0;s:6:"NCache";i:1;s:10:"checkConst";}i:1;s:15:"WPLATTE_VERSION";i:2;s:5:"2.9.0";}i:3;a:3:{i:0;a:2:{i:0;s:6:"NCache";i:1;s:10:"checkConst";}i:1;s:17:"AIT_THEME_VERSION";i:2;s:4:"1.28";}}}?><?php

// source file: D:\xampp\htdocs\rsar1\wp-content\themes\directory2\ait-theme\elements\header-map\javascript.php

?><?php
// prolog NCoreMacros
list($_l, $_g) = NCoreMacros::initRuntime($template, 'f97ssp8p2c')
;
// prolog NUIMacros

// snippets support
if (!empty($_control->snippetMode)) {
	return NUIMacros::renderSnippets($_control, $_l, get_defined_vars());
}

//
// main template
//
$settings = $options->theme->items ;$noFeatured = $options->theme->item->noFeatured ?>

<script id="<?php echo NTemplateHelpers::escapeHtml($htmlId, ENT_COMPAT) ?>-container-script">

	jQuery(window).load(function($){
		var $mapDiv = jQuery("#<?php echo $htmlId ?>-container");

		var styles = [
			{
				stylers: [
					{ hue: "<?php echo $el->option('mapHue') ?>" },
					{ saturation: "<?php echo $el->option('mapSaturation') ?>" },
					{ lightness: "<?php echo $el->option('mapBrightness') ?>" },
				]
			},
			{ featureType: "landscape", stylers: [
					{ visibility: "<?php if ($el->option('landscapeShow') == false) { ?>off<?php } else { ?>
on<?php } ?>"},
					{ hue: "<?php echo $el->option('landscapeColor') ?>"},
					{ saturation: "<?php if ($el->option('landscapeColor') != '') { ?> <?php echo $el->option('objSaturation') ?>
 <?php } ?>"},
					{ lightness: "<?php if ($el->option('landscapeColor') != '') { ?> <?php echo $el->option('objBrightness') ?>
 <?php } ?>"},
				]
			},
			{ featureType: "administrative", stylers: [
					{ visibility: "<?php if ($el->option('administrativeShow') == false) { ?>off<?php } else { ?>
on<?php } ?>"},
					{ hue: "<?php echo $el->option('administrativeColor') ?>"},
					{ saturation: "<?php if ($el->option('administrativeColor') != '') { ?> <?php echo $el->option('objSaturation') ?>
 <?php } ?>"},
					{ lightness: "<?php if ($el->option('administrativeColor') != '') { ?> <?php echo $el->option('objBrightness') ?>
 <?php } ?>"},
				]
			},
			{ featureType: "road", stylers: [
					{ visibility: "<?php if ($el->option('roadsShow') == false) { ?>off<?php } else { ?>
on<?php } ?>"},
					{ hue: "<?php echo $el->option('roadsColor') ?>"},
					{ saturation: "<?php if ($el->option('roadsColor') != '') { ?> <?php echo $el->option('objSaturation') ?>
 <?php } ?>"},
					{ lightness: "<?php if ($el->option('roadsColor') != '') { ?> <?php echo $el->option('objBrightness') ?>
 <?php } ?>"},
				]
			},
			{ featureType: "water", stylers: [
					{ visibility: "<?php if ($el->option('waterShow') == false) { ?>off<?php } else { ?>
on<?php } ?>"},
					{ hue: "<?php echo $el->option('waterColor') ?>"},
					{ saturation: "<?php if ($el->option('waterColor') != '') { ?> <?php echo $el->option('objSaturation') ?>
 <?php } ?>"},
					{ lightness: "<?php if ($el->option('waterColor') != '') { ?> <?php echo $el->option('objBrightness') ?>
 <?php } ?>"},
				]
			},
			{ featureType: "poi", stylers: [
					{ visibility: "<?php if ($el->option('poiShow') == false) { ?>off<?php } else { ?>
on<?php } ?>"},
					{ hue: "<?php echo $el->option('poiColor') ?>"},
					{ saturation: "<?php if ($el->option('poiColor') != '') { ?> <?php echo $el->option('objSaturation') ?>
 <?php } ?>"},
					{ lightness: "<?php if ($el->option('poiColor') != '') { ?> <?php echo $el->option('objBrightness') ?>
 <?php } ?>"},
				]
			},
		];

		jQuery("#<?php echo $htmlId ?>-container").gmap3({

<?php $query = WpLatteMacros::prepareCustomWpQuery(array($markerQuery)); $filtered = array() ;if ($query->havePosts) { if ($enableFiltering) { foreach ($iterator = new WpLatteLoopIterator($query) as $post): $meta = $post->meta('item-data') ;if (isPointInRadius($geoRadiusValue, $geoLat, $geoLon, $meta->map['latitude'], $meta->map['longitude'])) { array_push($filtered, $post) ;} endforeach; wp_reset_postdata(); } else { foreach ($iterator = new WpLatteLoopIterator($query) as $post): array_push($filtered, $post) ;endforeach; wp_reset_postdata(); } } ?>

<?php if (defined("AIT_ADVANCED_FILTERS_ENABLED")) { if (isset($_REQUEST['filters']) && $_REQUEST['filters'] != "") { $defined_filters = explode(";",$_REQUEST['filters']) ;$valid = array() ?>

<?php $iterations = 0; foreach ($filtered as $post) { $meta = $post->meta('filters-options') ;if (isset($meta->filters) && is_array($meta->filters)) { $check = array_intersect($defined_filters, $meta->filters) ;if (is_array($check) && count($check) >= count($defined_filters)) { array_push($valid, $post) ;} } else { ?>

<?php } $iterations++; } ?>

<?php $filtered = $valid ;} } if ($wp->isSingular('item')) { $autoZoomAndFit = '' ;$oneItemMeta = $filtered[0]->meta('item-data') ;} ?>

<?php if ($isAdvancedSearch && $geoLat != "" && $geoLon != "") { ?>

			map:{
				options:{
					center: [<?php echo $geoLat ?>, <?php echo $geoLon ?>],
					mapTypeId: google.maps.MapTypeId.<?php echo $el->option('type') ?>,
					zoom: <?php echo $el->option('zoom') ?>,
					scrollwheel: <?php echo $scrollWheel ?>,
					styles: styles,
					zoomControl: true,
					zoomControlOptions: {
						position: google.maps.ControlPosition.RIGHT_TOP
					},
					scaleControl: true,
					streetViewControl: true,
					streetViewControlOptions: {
						position: google.maps.ControlPosition.RIGHT_TOP
					},
				}
			},
			circle:{
				options:{
					center: [<?php echo $geoLat ?>, <?php echo $geoLon ?>],
					radius : <?php echo $geoRadiusValue ?>,
					fillColor : "#008BB2",
					strokeColor : "#005BB7"
				},
			},

<?php } else { ?>

<?php if (count($filtered) == 1) { ?>
					map:{
						options:{
							center: [<?php echo $oneItemMeta->map['latitude'] ?>, <?php echo $oneItemMeta->map['longitude'] ?>],
							mapTypeId: google.maps.MapTypeId.<?php echo $el->option('type') ?>,
							zoom: <?php echo $el->option('zoom') ?>,
							scrollwheel: <?php echo $scrollWheel ?>,
							styles: styles,
							zoomControl: true,
							zoomControlOptions: {
								position: google.maps.ControlPosition.RIGHT_TOP
							},
							scaleControl: true,
							streetViewControl: true,
							streetViewControlOptions: {
								position: google.maps.ControlPosition.RIGHT_TOP
							},
						}
					},

<?php } else { ?>
					map:{
						options:{
							center: [<?php echo $address['latitude'] ?>,<?php echo $address['longitude'] ?>],
							mapTypeId: google.maps.MapTypeId.<?php echo $el->option('type') ?>,
							zoom: <?php echo $el->option('zoom') ?>,
							scrollwheel: <?php echo $scrollWheel ?>,
							styles: styles,
							zoomControl: true,
							zoomControlOptions: {
								position: google.maps.ControlPosition.RIGHT_TOP
							},
							scaleControl: true,
							streetViewControl: true,
							streetViewControlOptions: {
								position: google.maps.ControlPosition.RIGHT_TOP
							},
						}
					},
<?php } } ?>

			marker:{
				values:[
<?php if ($isAdvancedSearch && $geoLat != "" && $geoLon != "") { ?>
					{
						lat: <?php echo $geoLat ?>, lng: <?php echo $geoLon ?>,
						data: 'disabled',
						options:
						{
							icon: "<?php echo aitPaths()->url->img ?>/pins/geoloc_pin.png"
						}
					},
<?php } ?>

<?php if (count($filtered) > 0) { $iterations = 0; foreach ($filtered as $item) { $itemMeta = $item->meta('item-data') ;$itemCats = get_the_terms($item->id, 'ait-items') ;if ($itemCats != false) { $itemCat = array_shift($itemCats) ;$itemCatData = get_option('ait-items_category_'.$itemCat->term_id) ;$itemMarker = $settings->categoryDefaultPin ?>

<?php if (isset($itemCatData['map_icon']) && $itemCatData['map_icon'] != "") { $itemMarker = $itemCatData['map_icon'] ;} else { $parent = get_term($itemCat->parent, 'ait-items') ;if (isset($parent) && !($parent instanceof WP_Error)) { $parentCatData = get_option('ait-items_category_'.$parent->term_id) ;if (isset($parentCatData['map_icon']) && $parentCatData['map_icon'] != "") { $itemMarker = $parentCatData['map_icon'] ;} else { $itemMarker = $settings->categoryDefaultPin ;} } else { $itemMarker = $settings->categoryDefaultPin ;} } } ?>

							<?php ob_start() ;echo NTemplateHelpers::escapeJs(__('Show More', 'wplatte')) ;$buttonLabel = ob_get_clean() ?>


<?php $itemImage = $noFeatured ;if ($item->imageUrl) { $itemImage = $item->imageUrl ;} ?>

<?php if (($itemMeta->map['latitude'] === "1" && $itemMeta->map['longitude'] === "1") != true) { ?>

							{
								lat: <?php echo $itemMeta->map['latitude'] ?>, lng: <?php echo $itemMeta->map['longitude'] ?>,

<?php $itemMeta->map['address'] = str_replace("\xe2\x80\xa8", '', $itemMeta->map['address']) ;$itemMeta->map['address'] = str_replace("\xe2\x80\xa9", '', $itemMeta->map['address']) ;$itemTitle = str_replace("\xe2\x80\xa8", '', $item->title) ;$itemTitle = str_replace("\xe2\x80\xa9", '', $itemTitle) ;if ($el->option('infoboxEnableTelephoneNumbers') && $itemMeta->telephone) { ?>
								data: "<div class=\"headermap-infowindow-container\"><div class=\"item-data\"><h3><?php echo $itemTitle ?>
</h3><span class=\"item-address\"><?php echo $itemMeta->map['address'] ?></span><a href=\"<?php echo $item->permalink ?>
\"><span class=\"item-button\">"+<?php echo $buttonLabel ?>+"</span></a></div><div class=\"item-picture\"><img src=\"<?php echo aitResizeImage($itemImage, array('width' => 145, 'height' => 180, 'crop' => 1)) ?>
\" alt=\"image\"><a href=\"tel:<?php echo $itemMeta->telephone ?>\" class=\"phone\"><?php echo $itemMeta->telephone ?></a></div></div>",
<?php } else { ?>
								data: "<div class=\"headermap-infowindow-container\"><div class=\"item-data\"><h3><?php echo $itemTitle ?>
</h3><span class=\"item-address\"><?php echo $itemMeta->map['address'] ?></span><a href=\"<?php echo $item->permalink ?>
\"><span class=\"item-button\">"+<?php echo $buttonLabel ?>+"</span></a></div><div class=\"item-picture\"><img src=\"<?php echo aitResizeImage($itemImage, array('width' => 145, 'height' => 180, 'crop' => 1)) ?>\" alt=\"image\"></div></div>",
<?php } if (isset($itemMarker)) { ?>
								options:
								{
									icon: "<?php echo $itemMarker ?>"
								}
<?php } ?>
							},

<?php } ?>

<?php $iterations++; } } ?>
				],
<?php if ($clustering) { ?>
				cluster:{
					radius: parseInt(<?php echo NTemplateHelpers::escapeJs($el->option('clusterRadius')) ?>),
					5: {
						content: "<div class='cluster cluster-1'>CLUSTER_COUNT</div>",
						width: 53,
						height: 52
					},
					20: {
						content: "<div class='cluster cluster-2'>CLUSTER_COUNT</div>",
						width: 56,
						height: 55
					},
					50: {
						content: "<div class='cluster cluster-3'>CLUSTER_COUNT</div>",
						width: 66,
						height: 65
					},
					events: {
						click: function(cluster) {
							var map = jQuery(this).gmap3("get");
							map.panTo(cluster.main.getPosition());
							map.setZoom(map.getZoom() + 2);
						}
					}
				},
<?php } ?>
				options:{
					draggable: false
				},
				events:{
					click: function(marker, event, context){
						var map = jQuery(this).gmap3("get");

						/* Remove All previous infoboxes */
						jQuery("#<?php echo $htmlId ?>-container").find('.infoBox').remove();

						if(context.data != "disabled"){

							var infoBoxOptions = {
								content: context.data,
								disableAutoPan: false,
								maxWidth: 150,
								pixelOffset: new google.maps.Size(-145, -233),
								zIndex: 99,
								boxStyle: {
									background: "#FFFFFF",
									opacity: 1,
									width: "290px"
								},
								closeBoxMargin: "2px 2px 2px 2px",
								closeBoxURL: "<?php echo aitPaths()->url->img ?>/infobox_close.png",
								infoBoxClearance: new google.maps.Size(1, 1),
								position: marker.position
							};

							var infoBox = new InfoBox(infoBoxOptions);
							infoBox.open(map, marker);
						}

						map.panTo(marker.getPosition());

					},
				},
			},
<?php if ($geoLocation) { ?>
			getgeoloc:{
				callback : function(latLng){
					if (latLng){
						jQuery("#latitude-search").attr('value', latLng.lat());
						jQuery("#longitude-search").attr('value', latLng.lng());

						jQuery("#<?php echo $htmlId ?>-container").gmap3({
							marker:{
								values:[
									{ latLng: latLng, options: { icon: "<?php echo aitPaths()->url->img ?>/pins/geoloc_pin.png" }}
								]
							},
							map:{
								options:{
									center: latLng,
									zoom: <?php echo $el->option('zoom') ?>

								}
							}
						});
					}
				}
			},
<?php } if (is_array($address) and isset($address['streetview'])) { if ($address['streetview']) { ?>
			streetviewpanorama:{
				options:{
					container: jQuery("#<?php echo $htmlId ?>-container"),
					opts:{
						position: new google.maps.LatLng(<?php echo $address['latitude'] ?>,<?php echo $address['longitude'] ?>),
						pov: {
							heading: parseInt(<?php echo $address['swheading'] ?>),
							pitch: parseInt(<?php echo $address['swpitch'] ?>),
							zoom: parseInt(<?php echo $address['swzoom'] ?>)
						},
						scrollwheel: <?php echo $scrollWheel ?>,
						panControl: false,
						enableCloseButton: true
					}
				}
			},
<?php } } ?>
		}, <?php echo NTemplateHelpers::escapeJs($autoZoomAndFit) ?>);

		setTimeout(function(){
			checkTouchDevice();
		},4000);

		/* google earth test */
		if(typeof GoogleEarth != 'undefined'){
			var gmap = $mapDiv.gmap3("get");
			var googleEarth = new GoogleEarth(gmap);
		}
		/* google earth test */


<?php if ($options->theme->general->progressivePageLoading) { ?>
			if(!isResponsive(1024)){
				jQuery("#<?php echo $htmlId ?>").waypoint(function(){
					jQuery("#<?php echo $htmlId ?>").parent().parent().addClass('load-finished');
				}, { triggerOnce: true, offset: "95%" });
			} else {
				jQuery("#<?php echo $htmlId ?>").parent().parent().addClass('load-finished');
			}
<?php } else { ?>
			jQuery("#<?php echo $htmlId ?>").parent().parent().addClass('load-finished');
<?php } ?>



		var checkTouchDevice = function() {
			if (Modernizr.touch){
				map = $mapDiv.gmap3("get");
				var swPanorama = $mapDiv.gmap3({
					get: {
						name:"streetviewpanorama",
					}
				})
				if (typeof swPanorama !== "undefined") {
					var svBox = $mapDiv.children('.gm-style').get(1);
					jQuery(svBox).css({'pointer-events': 'none'});
				}
				map.setOptions({ draggable : false });
				var draggableClass = 'inactive', draggableTitle = <?php echo NTemplateHelpers::escapeJs(__('Activate map', 'wplatte')) ?>;
				var draggableButton = jQuery('<div class="draggable-toggle-button '+draggableClass+'">'+draggableTitle+'</div>').appendTo($mapDiv);

				draggableButton.click(function () {
					if(jQuery(this).hasClass('active')){
						jQuery(this).removeClass('active').addClass('inactive').text(<?php echo NTemplateHelpers::escapeJs(__('Activate map', 'wplatte')) ?>);
						if (typeof svBox !== "undefined") {
							jQuery(svBox).css({'pointer-events': 'none'});
						}
						map.setOptions({ draggable : false });
					} else {
						jQuery(this).removeClass('inactive').addClass('active').text(<?php echo NTemplateHelpers::escapeJs(__('Deactivate map', 'wplatte')) ?>);

						if (typeof svBox !== "undefined") {
							jQuery(svBox).css({'pointer-events': 'initial'});
						}
						map.setOptions({ draggable : true });
					}
				});
			}
		}

		// <?php if (isset($address['streetview'])) { ?>

		// 	<?php if ($address['streetview']) { ?>

		// 		if(isMobile() && !<?php echo $scrollWheel ?>){
		// 			jQuery("#<?php echo $htmlId ?>").css({'pointer-events': 'none'});
		// 		}
		// 	<?php } ?>

		// <?php } ?>


<?php if (!isset($_REQUEST['rad'])) { ?>
		google.maps.event.addListenerOnce($mapDiv.gmap3("get"), 'tilesloaded', function(){
			jQuery("#<?php echo $htmlId ?>").removeClass('deactivated');
		});
<?php } ?>

	});
</script>
