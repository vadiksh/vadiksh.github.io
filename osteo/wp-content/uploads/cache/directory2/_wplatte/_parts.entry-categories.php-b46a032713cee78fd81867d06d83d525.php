<?php //netteCache[01]000563a:2:{s:4:"time";s:21:"0.21618500 1489855352";s:9:"callbacks";a:4:{i:0;a:3:{i:0;a:2:{i:0;s:6:"NCache";i:1;s:9:"checkFile";}i:1;s:77:"D:\xampp\htdocs\rsar1\wp-content\themes\directory2\parts\entry-categories.php";i:2;i:1451322000;}i:1;a:3:{i:0;a:2:{i:0;s:6:"NCache";i:1;s:10:"checkConst";}i:1;s:20:"NFramework::REVISION";i:2;s:22:"released on 2014-08-28";}i:2;a:3:{i:0;a:2:{i:0;s:6:"NCache";i:1;s:10:"checkConst";}i:1;s:15:"WPLATTE_VERSION";i:2;s:5:"2.9.0";}i:3;a:3:{i:0;a:2:{i:0;s:6:"NCache";i:1;s:10:"checkConst";}i:1;s:17:"AIT_THEME_VERSION";i:2;s:4:"1.28";}}}?><?php

// source file: D:\xampp\htdocs\rsar1\wp-content\themes\directory2\parts\entry-categories.php

?><?php
// prolog NCoreMacros
list($_l, $_g) = NCoreMacros::initRuntime($template, 'quri3zcjtd')
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
<span class="categories">
<?php if (isset($taxonomy)) { ?>
	<span class="cat-links"><?php echo $post->categoryList(', ', '', $taxonomy) ?></span>
<?php } else { ?>
	<span class="cat-links"><?php echo $post->categoryList(', ') ?></span>
<?php } ?>
</span>