<?php //netteCache[01]000579a:2:{s:4:"time";s:21:"0.47119900 1489855352";s:9:"callbacks";a:4:{i:0;a:3:{i:0;a:2:{i:0;s:6:"NCache";i:1;s:9:"checkFile";}i:1;s:93:"D:\xampp\htdocs\rsar1\wp-content\themes\directory2\ait-theme\elements\comments\comments.latte";i:2;i:1451322000;}i:1;a:3:{i:0;a:2:{i:0;s:6:"NCache";i:1;s:10:"checkConst";}i:1;s:20:"NFramework::REVISION";i:2;s:22:"released on 2014-08-28";}i:2;a:3:{i:0;a:2:{i:0;s:6:"NCache";i:1;s:10:"checkConst";}i:1;s:15:"WPLATTE_VERSION";i:2;s:5:"2.9.0";}i:3;a:3:{i:0;a:2:{i:0;s:6:"NCache";i:1;s:10:"checkConst";}i:1;s:17:"AIT_THEME_VERSION";i:2;s:4:"1.28";}}}?><?php

// source file: D:\xampp\htdocs\rsar1\wp-content\themes\directory2\ait-theme\elements\comments\comments.latte

?><?php
// prolog NCoreMacros
list($_l, $_g) = NCoreMacros::initRuntime($template, 'dwj9gzi1wt')
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
<div id="<?php echo NTemplateHelpers::escapeHtml($htmlId, ENT_COMPAT) ?>" class="<?php echo NTemplateHelpers::escapeHtml($htmlClass, ENT_COMPAT) ?>">
<?php if(comments_open() || get_comments_number() != '0'): comments_template(); endif ?>

<?php NCoreMacros::includeTemplate(WpLatteMacros::getTemplatePart("ait-theme/elements/comments/javascript", ""), array() + get_defined_vars(), $_l->templates['dwj9gzi1wt'])->render() ?>
</div>