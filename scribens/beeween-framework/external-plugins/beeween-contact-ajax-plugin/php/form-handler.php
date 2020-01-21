<?php
if ( !isset( $_SESSION ) ) session_start();
if ( !$_POST ) exit;
if ( !defined( "PHP_EOL" ) ) define( "PHP_EOL", "\r\n" );

include("C:/php7/phpmailer/class.phpmailer.php");
include("C:/php7/phpmailer/class.smtp.php");

$to = "contact@scribens.com";
$subject = "Formular Contact of SCRIBENS.COM";



foreach ($_POST as $key => $value) {
    if (ini_get('magic_quotes_gpc'))
        $_POST[$key] = stripslashes($_POST[$key]);
    $_POST[$key] = htmlspecialchars(strip_tags($_POST[$key]));
}

// Assign the input values to variables for easy reference
$name      = @$_POST["name"];
$email     = @$_POST["email"];
$phone     = @$_POST["phone"];
$message   = @$_POST["comment"];
$verify    = @$_POST["verify"];


// Test input values for errors
$errors = array();
 //php verif name
if(isset($_POST["name"])){
 
        if (!$name) {
            $errors[] = "You must enter a name.";
        } elseif(strlen($name) < 2)  {
            $errors[] = "Name must be at least 2 characters.";
        }
 
}
    //php verif email
if(isset($_POST["email"])){
    if (!$email) {
        $errors[] = "You must enter an email.";
    } else if (!validEmail($email)) {
        $errors[] = "You must enter a valid email.";
    }
}
    //php verif phone
if(isset($_POST["phone"])){
    if (!$phone) {
        $errors[] = "You must enter a correct phone number.";
    }elseif ( !is_numeric( $phone ) ) {
        $errors[]= 'Your phone number can only contain digits.';
    }
}



//php verif comment
if(isset($_POST["comment"])){
    if (strlen($message) < 10) {
        if (!$message) {
            $errors[] = "You must enter a message.";
        } else {
            $errors[] = "Message must be at least 10 characters.";
        }
    }
}

    //php verif captcha
if(isset($_POST["verify"])){
    if (!$verify) {
        $errors[] = "You must enter the security code";
   
    } else if(empty($_SESSION['beeweenCheck']['verify'])){
    	$errors[] = "The security code you entered is incorrect ";

    } else if (md5($verify) != $_SESSION['beeweenCheck']['verify']) {
        $errors[] = "The security code you entered is incorrect ";
    }

    unset($_SESSION['beeweenCheck']['verify']);
}

if ($errors) {
        // Output errors and die with a failure message
    $errortext = "";
    foreach ($errors as $error) {
        $errortext .= '<li>'. $error . "</li>";
    }

    echo '<div class="alert alert-danger">The following errors occured:<br><ul>'. $errortext .'</ul></div>';

} 
else if(isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])){

    $secret = '6LeGixgUAAAAACF7TVV1_gxWP707YV5rqKB8UXv2';
    $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$_POST['g-recaptcha-response']);
    $responseData = json_decode($verifyResponse);
    if($responseData->success){
    	
    // Send the email
    $headers  = "From: $email" . PHP_EOL;
    $headers .= "Reply-To: $email" . PHP_EOL;
    $headers .= "MIME-Version: 1.0" . PHP_EOL;
    $headers .= "Content-type: text/plain; charset=utf-8" . PHP_EOL;
    $headers .= "Content-Transfer-Encoding: quoted-printable" . PHP_EOL;

    $mailBody  = "You have been contacted by $name" . PHP_EOL . PHP_EOL;
    $mailBody .= (!empty($company))?'Company: '. PHP_EOL.$company. PHP_EOL . PHP_EOL:'';
    $mailBody .= (!empty($quoteType))?'project Type: '. PHP_EOL.$quoteType. PHP_EOL . PHP_EOL:''; 
    $mailBody .= "Message :" . PHP_EOL;
    $mailBody .= $message . PHP_EOL . PHP_EOL;
    $mailBody .= "You can contact $name via email, $email.";
    $mailBody .= (isset($phone) && !empty($phone))?" Or via phone $phone." . PHP_EOL . PHP_EOL:'';
    $mailBody .= "-------------------------------------------------------------------------------------------" . PHP_EOL;


	// Use php mailer instead of mail function because of password authentification needed.

	$mail = new PHPMailer();
	
	$mail->SMTPAuth = true;     // turn on SMTP authentication
	$mail->IsSMTP();                                      // set mailer to use SMTP
	
	$mail->Host = "ssl0.ovh.net";  // specify main and backup server
	$mail->Port = 587;
	$mail->Username = "contact@scribens.com";  // SMTP username
	$mail->Password = "scr123!ibens"; // SMTP password
	$mail->SetFrom($email, '');
	$mail->Subject = $subject;
	$mail->Body = $mailBody;
	$mail->AddAddress("contact@scribens.com", "Scribens");
	
	$mail->SMTPOptions = array(
    		'ssl' => array(
        	'verify_peer' => false,
        	'verify_peer_name' => false,
        	'allow_self_signed' => true
    		)
	);
	
	if($mail->Send())
	{
		echo '<div class="alert alert-success">Your message was successfully delivered to the destination.</div>';
	}
    }
	
    //if(mail($to, $subject, $mailBody, $headers)){
    //    echo '<div class="alert alert-success">Success! Your message has been sent.</div>';
    //}
}

else{

	echo " Please check the Captcha. " ;

}

// FUNCTIONS 
function validEmail($email) {
    $isValid = true;
    $atIndex = strrpos($email, "@");
    if (is_bool($atIndex) && !$atIndex) {
        $isValid = false;
    } else {
        $domain = substr($email, $atIndex + 1);
        $local = substr($email, 0, $atIndex);
        $localLen = strlen($local);
        $domainLen = strlen($domain);
        if ($localLen < 1 || $localLen > 64) {
            // local part length exceeded
            $isValid = false;
        } else if ($domainLen < 1 || $domainLen > 255) {
            // domain part length exceeded
            $isValid = false;
        } else if ($local[0] == '.' || $local[$localLen - 1] == '.') {
            // local part starts or ends with '.'
            $isValid = false;
        } else if (preg_match('/\\.\\./', $local)) {
            // local part has two consecutive dots
            $isValid = false;
        } else if (!preg_match('/^[A-Za-z0-9\\-\\.]+$/', $domain)) {
            // character not valid in domain part
            $isValid = false;
        } else if (preg_match('/\\.\\./', $domain)) {
            // domain part has two consecutive dots
            $isValid = false;
        } else if (!preg_match('/^(\\\\.|[A-Za-z0-9!#%&`_=\\/$\'*+?^{}|~.-])+$/', str_replace("\\\\", "", $local))) {
            // character not valid in local part unless
            // local part is quoted
            if (!preg_match('/^"(\\\\"|[^"])+"$/', str_replace("\\\\", "", $local))) {
                $isValid = false;
            }
        }
        
        if(function_exists('checkdnsrr')){
	        if ($isValid && !(checkdnsrr($domain, "MX") || checkdnsrr($domain, "A"))) {
	            // domain not found in DNS
	            $isValid = false;
	        }
        }

    }
    return $isValid;
}

?>
