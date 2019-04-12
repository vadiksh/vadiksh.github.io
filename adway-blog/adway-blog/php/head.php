<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="author" content="Adway">

<!-- Dynamic title tag -->
<?php echo Theme::metaTags('title'); ?>

<!-- Dynamic description tag -->
<?php echo Theme::metaTags('description'); ?>

<!-- Include Favicon -->
<link rel="shortcut icon" href="http://adway.ai/images/favicon/apple-touch-icon.png" type="image/png">
<!--  -->
<!-- Include fonts  -->
<link href="https://fonts.googleapis.com/css?family=Lora" rel="stylesheet">
<!-- Include Bootstrap CSS file bootstrap.css -->
<?php echo Theme::cssBootstrap(); ?>

<!-- Include CSS Styles from this theme -->
<?php echo Theme::css('css/styles.css'); ?>

<!-- Load Bludit Plugins: Site head -->
<?php Theme::plugins('siteHead'); ?>
