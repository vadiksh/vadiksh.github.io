<?php //netteCache[01]000547a:2:{s:4:"time";s:21:"0.16323900 1489855353";s:9:"callbacks";a:4:{i:0;a:3:{i:0;a:2:{i:0;s:6:"NCache";i:1;s:9:"checkFile";}i:1;s:61:"D:\xampp\htdocs\rsar1\wp-content\themes\directory2\footer.php";i:2;i:1451322000;}i:1;a:3:{i:0;a:2:{i:0;s:6:"NCache";i:1;s:10:"checkConst";}i:1;s:20:"NFramework::REVISION";i:2;s:22:"released on 2014-08-28";}i:2;a:3:{i:0;a:2:{i:0;s:6:"NCache";i:1;s:10:"checkConst";}i:1;s:15:"WPLATTE_VERSION";i:2;s:5:"2.9.0";}i:3;a:3:{i:0;a:2:{i:0;s:6:"NCache";i:1;s:10:"checkConst";}i:1;s:17:"AIT_THEME_VERSION";i:2;s:4:"1.28";}}}?><?php

// source file: D:\xampp\htdocs\rsar1\wp-content\themes\directory2\footer.php

?><?php
// prolog NCoreMacros
list($_l, $_g) = NCoreMacros::initRuntime($template, 'yviwcukbeq')
;
// prolog NUIMacros

// snippets support
if (!empty($_control->snippetMode)) {
	return NUIMacros::renderSnippets($_control, $_l, get_defined_vars());
}

//
// main template
//
?>


	<footer id="footer" class="footer" role="contentinfo">

<?php if ($options->layout->general->enableWidgetAreas) { ?>
		<div class="footer-widgets">
			<div class="footer-widgets-wrap grid-main">
				<div class="footer-widgets-container">


<?php $iterations = 0; foreach ($iterator = $_l->its[] = new NSmartCachingIterator($wp->widgetAreas('footer')) as $widgetArea) { ?>
																		<div class="widget-area <?php echo NTemplateHelpers::escapeHtml($widgetArea, ENT_COMPAT) ?>
 widget-area-<?php echo NTemplateHelpers::escapeHtml($iterator->counter, ENT_COMPAT) ?>">
<?php dynamic_sidebar($widgetArea) ?>
						</div>
<?php $iterations++; } array_pop($_l->its); $iterator = end($_l->its) ?>

				</div>
			</div>
		</div>
<?php } ?>

		<div class="site-footer">
			<div class="site-footer-wrap grid-main">
<?php WpLatteMacros::menu("footer", array('depth' => 1)) ?>
				<div class="footer-text"><?php echo $options->theme->footer->text ?></div>
			</div>
		</div>

	</footer><!-- /#footer -->
</div><!-- /#page -->

<?php wp_footer() ?>

<?php echo $options->theme->footer->customJsCode ?>


</body>
</html>
