<?php //netteCache[01]000583a:2:{s:4:"time";s:21:"0.28513100 1489855351";s:9:"callbacks";a:4:{i:0;a:3:{i:0;a:2:{i:0;s:6:"NCache";i:1;s:9:"checkFile";}i:1;s:97:"D:\xampp\htdocs\rsar1\wp-content\themes\directory2\ait-theme\elements\header-map\header-map.latte";i:2;i:1451322000;}i:1;a:3:{i:0;a:2:{i:0;s:6:"NCache";i:1;s:10:"checkConst";}i:1;s:20:"NFramework::REVISION";i:2;s:22:"released on 2014-08-28";}i:2;a:3:{i:0;a:2:{i:0;s:6:"NCache";i:1;s:10:"checkConst";}i:1;s:15:"WPLATTE_VERSION";i:2;s:5:"2.9.0";}i:3;a:3:{i:0;a:2:{i:0;s:6:"NCache";i:1;s:10:"checkConst";}i:1;s:17:"AIT_THEME_VERSION";i:2;s:4:"1.28";}}}?><?php

// source file: D:\xampp\htdocs\rsar1\wp-content\themes\directory2\ait-theme\elements\header-map\header-map.latte

?><?php
// prolog NCoreMacros
list($_l, $_g) = NCoreMacros::initRuntime($template, 'psjf01lql4')
;
// prolog NUIMacros

// snippets support
if (!empty($_control->snippetMode)) {
	return NUIMacros::renderSnippets($_control, $_l, get_defined_vars());
}

//
// main template
//
NCoreMacros::includeTemplate($element->common('header'), $template->getParameters(), $_l->templates['psjf01lql4'])->render() ?>

<?php $isAdvancedSearch = '' ;$geoLat = '' ;$geoLon = '' ?>

<?php $address = $el->option('address') ?>

<?php $clustering = $el->option('clusterEnable') ;$geoLocation = $el->option('geoLocationEnable') ;$scrollWheel = $el->option('mousewheelZoom') ? "true" : "false" ;$autoZoomAndFit = $el->option('autoZoomAndFit') ? 'autofit' : '' ?>

<?php $markerQuery = array(
	'post_type' => 'ait-item',
	'posts_per_page' => -1,
) ?>

<?php $enableFiltering = '' ;if ($wp->isSingular('item') or $wp->isTax('items') or $wp->isTax('locations')) { if ($wp->isSingular('item')) { ?>
				<?php $meta = $post->meta('item-data') ?>  

<?php $address = $meta->map ?>

<?php $markerQuery = array(
			'post_type' => 'ait-item',
			'posts_per_page' => -1,
			'p' => $post->id
		) ?>

<?php } elseif ($wp->isTax('items') or $wp->isTax('locations')) { $markerQuery = array(
			'post_type' => 'ait-item',
			'posts_per_page' => -1,
			'tax_query' => array(
				array(
					'taxonomy' => $taxonomyTerm->taxonomy,
					'field' => 'slug',
					'terms' => $taxonomyTerm->slug
				)
			)
		) ;} ?>

<?php } else { ?>

<?php $isAdvancedSearch = isset($_REQUEST['a']) && $_REQUEST['a'] == "true" ? true : false ?>

<?php if ($isAdvancedSearch) { $itemTaxQuery = array() ;$itemCategory = isset($_REQUEST['category']) && $_REQUEST['category'] != "" ? $_REQUEST['category'] : 0 ;$itemLocation = isset($_REQUEST['location']) && $_REQUEST['location'] != "" ? $_REQUEST['location'] : 0 ?>

		<?php $geoRadiusUnits = isset($_REQUEST['runits']) && $_REQUEST['runits'] != "" ? $_REQUEST['runits'] : 'km' ?>	
<?php $geoRadiusValue = isset($_REQUEST['rad']) && $_REQUEST['rad'] != "" ? $_REQUEST['rad'] * 1000 : 100 * 1000 ;$geoRadiusValue = $geoRadiusUnits == 'mi' ? $geoRadiusValue * 1.609344 : $geoRadiusValue ?>

<?php $geoLat = isset($_REQUEST['lat']) && $_REQUEST['lat'] != "" ? $_REQUEST['lat'] : "" ;$geoLon = isset($_REQUEST['lon']) && $_REQUEST['lon'] != "" ? $_REQUEST['lon'] : "" ?>

<?php if ($itemCategory != 0) { array_push($itemTaxQuery, array('taxonomy' => 'ait-items', 'field' => 'term_id', 'terms' => $itemCategory)) ;} ?>

<?php if ($itemLocation != 0) { array_push($itemTaxQuery, array('taxonomy' => 'ait-locations', 'field' => 'term_id', 'terms' => $itemLocation)) ;} ?>

<?php $markerQuery = array(
			'post_type' => 'ait-item',
			'posts_per_page' => -1,
			'tax_query' => $itemTaxQuery
		) ;if (isset($_REQUEST['s']) && $_REQUEST['s'] != "") { $markerQuery['s'] = $_REQUEST['s'] ;} ?>

<?php if ($geoRadiusValue && $geoLat && $geoLon) { $enableFiltering = true ;} ?>

<?php } } ?>

<div id="<?php echo NTemplateHelpers::escapeHtml($htmlId, ENT_COMPAT) ?>" class="<?php echo NTemplateHelpers::escapeHtml($htmlClass, ENT_COMPAT) ?> deactivated">

	<div id="<?php echo NTemplateHelpers::escapeHtml($htmlId, ENT_COMPAT) ?>-container" class="google-map-container" style="height: <?php echo NTemplateHelpers::escapeHtml(NTemplateHelpers::escapeCss($el->option('height')), ENT_COMPAT) ?>px;">

	</div>

<?php NCoreMacros::includeTemplate(WpLatteMacros::getTemplatePart("ait-theme/elements/header-map/javascript", ""), array() + get_defined_vars(), $_l->templates['psjf01lql4'])->render() ?>

</div>
