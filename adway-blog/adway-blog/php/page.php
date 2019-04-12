

	<?php
		if($page->Template()!=""){
			
			$templateFile = THEME_DIR_PHP."templates/".$page->Template().".php";
			
			if(file_exists($templateFile)){
				include($templateFile);
			} else {
				echo "Oops, there is no such template in the theme!";
			}
			
		} else {
			include(THEME_DIR_PHP.'templates/default.php');
		}
	?>
	


