<?php /* start WPide restore code */
                                    if ($_POST["restorewpnonce"] === "51033623d1a85dba0e0fda596d1fa495d4de46db12"){
                                        if ( file_put_contents ( "/home/routeart/public_html/wp-content/plugins/Custom-Elementor/testelement.php" ,  preg_replace("#<\?php /\* start WPide(.*)end WPide restore code \*/ \?>#s", "", file_get_contents("/home/routeart/public_html/wp-content/plugins/wpide/backups/plugins/Custom-Elementor/testelement_2017-03-22-22.php") )  ) ){
                                            echo "Your file has been restored, overwritting the recently edited file! \n\n The active editor still contains the broken or unwanted code. If you no longer need that content then close the tab and start fresh with the restored file.";
                                        }
                                    }else{
                                        echo "-1";
                                    }
                                    die();
                            /* end WPide restore code */ ?>