
// Once the document is loaded
document.addEventListener("DOMContentLoaded", function()
{	
	// Init
	
	// UserAgent
	Cor.UserAgent = navigator.userAgent.toLowerCase();

	if(Cor.UserAgent.indexOf("firefox") >= 0) Cor.IsMozillaF = true;
	else if(Cor.UserAgent.indexOf("chrome") && !!window.chrome && !!window.chrome.webstore) Cor.IsChrome = true;
	else if(Cor.UserAgent.indexOf("msie 1.0") >= 0 || Cor.UserAgent.indexOf("msie 2.0") >= 0 || Cor.UserAgent.indexOf("msie 3.0") >= 0 ||
			Cor.UserAgent.indexOf("msie 4.0") >= 0 || Cor.UserAgent.indexOf("msie 5.0") >= 0 || Cor.UserAgent.indexOf("msie 6.0") >= 0 ||
			Cor.UserAgent.indexOf("msie 7.0") >= 0 || Cor.UserAgent.indexOf("msie 8.0") >= 0 || Cor.UserAgent.indexOf("msie 9.0") >= 0)
	{
		Cor.IsIEBefore10 = true;
	}
	else if(Cor.UserAgent.indexOf("safari") >= 0) Cor.IsSafari = true;

	// IE autre que 11.0
	if(Cor.UserAgent.indexOf("msie") >= 0) Cor.IsIE = true;

	if(Cor.UserAgent.indexOf("msie 8.0") >= 0) Cor.IsIE8 = true;
	if(Cor.UserAgent.indexOf("msie 9.0") >= 0) Cor.IsIE9 = true;
	if(Cor.UserAgent.indexOf("msie 10.0") >= 0) Cor.IsIE10 = true;

	// IE11 : user agent change from "MSIE 10.0" to "rv:11.0"
	if(Cor.UserAgent.indexOf("mozilla/5.0") >= 0 &&
	   Cor.UserAgent.indexOf("windows nt") >= 0 &&
	   Cor.UserAgent.indexOf("trident") >= 0 &&
	   Cor.UserAgent.indexOf("rv:11.0") >= 0)
	{
		Cor.IsIE11 = true;
	}
	
	// Edge
	if(Cor.UserAgent.indexOf("Edge") >= 0 || Cor.UserAgent.indexOf("edge") >= 0) Cor.IsEdge = true;

	if(Cor.UserAgent.indexOf("OS X") >= 0 || Cor.UserAgent.indexOf("os x") >= 0 || 
	   Cor.UserAgent.indexOf("Macintosh") >= 0 || Cor.UserAgent.indexOf("macintosh") >= 0) Cor.IsMac = true;
	
	// iOS. iPhone and iPad.
	if(Cor.UserAgent.indexOf("iphone") >= 0 || Cor.UserAgent.indexOf("ipad") >= 0) Cor.IsIOS = true;
	
	var url = window.location.href;

	if(url != null)
	{
		// Language
		if(url.indexOf("scribens.com") >= 0 || url.indexOf("index_en.html") >= 0 || url.indexOf("Cor-En.html") >= 0 || url.indexOf("Cor-en-new.html") >= 0 || url.indexOf("plugin-new-en.html") >= 0 || url.indexOf("mobile_en") >= 0 || url.indexOf("tablet_en") >= 0) Cor.IdLangue = "en";
	
		// Desktop.
		if(url.indexOf("index.html") >= 0) Cor.IsDesktop = true;
	
		// Smartphone mode.
		if(url.indexOf("mobile") >= 0) Cor.IsMobile = true;
		
		// Tablet mode.
		if(Cor.UserAgent.indexOf("android") >= 0 && Cor.UserAgent.indexOf("mobile") == -1) Cor.IsTablet = true;
	}
	
	// Warn the user the website doesn't worrk anymore with IE.
	if(Cor.IsIE == true || Cor.IsIE11 == true)
	{
		var txtFr = "Bonjour. Le nouveau site de Scribens n'est pas compatible avec Internet Explorer. Veuillez utiliser un autre navigateur.";
		if(Cor.IdLangue == "en") txtFr = "Hello. The new website of Scribens is not available for Internet Explorer. Please use another browser.";
		
		alert(txtFr);
	}
	
	
	// Type Plugin
	Plugins.Type = Util.GetQueryVariable("plugin");

	// Port du dialogue client/server en Websocket
	Plugins.Port = Util.GetQueryVariable("port");
	
	// Desktop mode
	Cor.IsDesktop = (!Cor.IsTablet && !Cor.IsMobile && (Plugins.Type == null));
	
	// Tomcat Id
	// Ramdomly separate the requests to suport charges. There are 2 instances of Tomcat.
	var nb = Math.ceil(Math.random()*4);
	
	if(nb == 2) Cor.Id_Tomcat = "X2";
	else if(nb == 3) Cor.Id_Tomcat = "X4";
	else if(nb == 4) Cor.Id_Tomcat = "X6";
	
	// Mode Plugin. Lancement de la connexion avec le plugin
	if(Plugins.Type != null)
	{
		// Version du plugin
		var versionPluginSt = Util.GetQueryVariable("version");
		if(versionPluginSt != null) Plugins.VersionPlugin = parseInt(versionPluginSt);
		
		// Plugin Chrome : instances
		Plugins.IdClient = Util.GetQueryVariable("idclient");
		
		// Microsoft Office Windows for desktop.
		if(Cor.IsIE11 && (Plugins.Type == "MSWordWeb" || Plugins.Type == "MSExcelWeb")) Cor.IsMSOfficeWinForDesktop = true;
		
		// Identifiant et mot de passe dans le cas d'un plugin d'intégration.
		var website = Util.GetQueryVariable("website");
		var motDepasse = Util.GetQueryVariable("id");
		
		if(website != null && motDepasse != null)
		{
			Cor.User.Identifiant = "[WEBSITE]" + website;
			Cor.User.MotDePasse = motDepasse;
		}
		
		// Demonstration
		var type = Util.GetQueryVariable("type");
		if(type != null && type == "demo" && Plugins.Type == "Chrome") Plugins.Demo = true;
		
		//PresentationModePlugin.CreateListeLanguesTraduction();
		Plugins.InitModePluginPart1();
		Plugins.LaunchClient();
	}

	Cor.ParameterUrl = Util.GetQueryVariable("key");
	
	Cor.User = new Cor.User();
	
	// Load settings from cookies.
	Options.LoadSettings_FromCookies();
	
	// Init TextArea
	TextEditor.Init_TextArea();

	// Create the panel of solutions
	Cor.PopupPanelSol = new Cor.PopupPanelSol();

	// Create the waiting panel.
	Cor.CreateWaitingPanel();
	
	// Options
	var eltSettingsLabel = document.getElementById('settingsLabel');
	if(eltSettingsLabel != null)
	{
		eltSettingsLabel.addEventListener('click', function()
		{
			if(Cor.WindowOptions == null) Cor.WindowOptions = new Options.WindowOptions();
			
			Cor.WindowOptions.Show();
		});
	}

	// Function Check
	var eltBtnCheck = document.getElementById('check');
	eltBtnCheck.addEventListener('click', function(){Cor.Check(false);});

	// Function indication
	var eltBtnIndications = document.getElementById('indications');
	if(eltBtnIndications != null)
	{
		eltBtnIndications.addEventListener('click', function()
		{
			if(Cor.MessageIndication == null) Cor.MessageIndication = new Util.MessageWindowConfirmation("", 4, "Avertissement");
			Cor.MessageIndication.SetVisible(true);
		});
	}
	
	// Function Sample text
	var eltSampleText = document.getElementById('SampleText');
	if(eltSampleText != null)
	{
		eltSampleText.addEventListener('click', function(){
			Cor.LoadSampleText();
		});
	}
	
	// Register click handlers of buttons.
	Cor.Register_ClickHandlerBtn();
	
	// In english version, show stat and redaction tabs.
	if(Cor.IdLangue == "en")
	{
		// Initialise le mode abonne
		//Cor.InitModeAbonnePremium();
		Cor.InitModeEn();
	}
	
	// Version demo : pas plus loin.
	if(Plugins.Demo == true)
	{
		Cor.User.Identifiant = "DemoChrome";
		return;
	}
	
	// In tablet mode and French, show the button "Copy" and "Paste".
	if(Cor.IsTablet == true || $(window).width() < 768)
	{
		$('#copy-tablet').removeClass('hidden');
		$('#copy-tablet').click(function(){Cor.CopyClipboard();});
		
		$('#paste-tablet').removeClass('hidden');
		$('#paste-tablet').click(function(){Cor.Paste();});
		
		$('#SampleText').addClass('hidden');
		$('#importing-files').addClass('hidden');
		
		if(Cor.IdLangue == "en")
		{
			$('#copy-clipboard').addClass('hidden');
			$('#paste-clipboard').addClass('hidden');
		}
	}
	
	// Confirmation de mail par paramètre passé à l'URL (le mail)
	// Affiche la confirmation de mail
	if(Cor.ParameterUrl != null && Cor.ParameterUrl.length > 0)
	{
		if((Cor.ParameterUrl.indexOf("@") > 0) && (Cor.ParameterUrl.indexOf(".") > 0) &&
		   !(Cor.ParameterUrl.indexOf("@") == 0) && !(Cor.ParameterUrl.indexOf(".") == 0) &&
		   (Cor.ParameterUrl.indexOf("@") != (Cor.ParameterUrl.length - 1)) && (Cor.ParameterUrl.indexOf(".") != (Cor.ParameterUrl.length - 1)))
		{
			// R�initialisation du mot de passe.
			if(Cor.ParameterUrl.indexOf("ReinitMdp_") == 0)
			{
				Cor.User.Identifiant = Cor.ParameterUrl.substring(10);
				
				if(Premium.PopupShiftPasswordI == null) Premium.PopupShiftPasswordI = new Premium.PopupShiftPassword();
				
				Premium.PopupShiftPasswordI.SetVisible(true);
			}
			// Ne plus recevoir d'Email
			else if(Cor.ParameterUrl.indexOf("NoReceiveEmailPremium_") == 0)
			{
				Cor.User.Identifiant = Cor.ParameterUrl.substring(22);
				
				var popup = new Util.MessageWindowConfirmation("<p>Votre demande a bien " + String.fromCharCode(233) + "t" + String.fromCharCode(233) + " prise en compte.</p><p>Vous ne recevrez plus de messages.</p>", 0, "Avertissement");
				popup.SetVisible(true);
				
				Cor.ParameterUrl = null;
				
				// Met à jour la base de données.
				Util.SendHttpRequest('Identification_Servlet',
						[['FunctionName', 'MajData'],
						 ['DataName', 'InfEvolutions'],
						 ['DataValue', '0'],
						 ['TableName', 'abonnement_client'],
						 ['Id', Cor.User.Identifiant]],
						 null);
			}
			// Met � jour la base de donn�es en ajoutant un �l�ment dans la table abonnement.
			else
			{
				// Envoi de l'email de confirmation � l'utilisateur.
				Util.SendHttpRequest('Identification_Servlet',
						[['FunctionName', 'NvInscription'],
						 ['Id', Cor.ParameterUrl]],
						 function(response)
						 {
							var id = response[0];
							var password = response[1];
							
							Util.SendHttpRequest('Identification_Servlet',
									[['FunctionName', 'EstAbonne'],
									 ['Id', id],
									 ['Password', password]],
									 Premium.ResultIdentification);
							
						 });
			}
		}
		// Lien vers mon compte.
		else if(Cor.ParameterUrl == "MonCompte") Cor.MonCompte = true;
	}
		
	// Identification automatique avec les cookies.
	// Attention : on peut charger un cookie uniquement sur le site que l'on charge. Ici, il y a 2 "domaines" : www.scribens.fr et scribens.fr qui ont tout deux 2 cookies IdentificationScribens.  
	// Ici, on consid�re que le cookie IdentificationScribens est uniquement sur www.scribens.fr et non scribens.fr. Dans apache, on redirige donc scribens.fr vers www.scribens.fr
	if(Cor.IdLangue == "fr")
	{
		var valueCookieSt = Util.GetCookie("IdentificationScribens");
		if(valueCookieSt != null && valueCookieSt.length > 0)
		{
			var formerCookies = decodeURIComponent(valueCookieSt);
			var tabSt = formerCookies.split(";");
			// Old version
			if(tabSt.length == 2)
			{
				if(Cor.User.Identifiant.length == 0) Cor.User.Identifiant = tabSt[0];
				if(Cor.User.MotDePasse.length == 0) Cor.User.MotDePasse = tabSt[1];
			}
			// New version
			else
			{
				tabSt = valueCookieSt.split("|");
				if(tabSt.length == 2)
				{
					if(Cor.User.Identifiant.length == 0) Cor.User.Identifiant = tabSt[0];
					if(Cor.User.MotDePasse.length == 0) Cor.User.MotDePasse = tabSt[1];
				}
			}
		}
		
		// To delete
		//Cor.User.Identifiant = "barca34@mail.com";
		//Cor.User.MotDePasse = "geDr:78!F";
		
		//Cor.MonCompte = true;
		
		//Cor.User.Identifiant = "alban.thiebaut@live.fr";
		//Cor.User.MotDePasse = "123456";
		
		//Cor.User.Identifiant = "cc.vv@live.fr";
		//Cor.User.MotDePasse = "abcedf";
	
		// Identification
		if(Cor.User.Identifiant.length > 0 && Cor.User.MotDePasse.length > 0)
		{
			if(Cor.IsMobile == false)
			{
				Cor.CheckConnexion(Cor.User.Identifiant, Cor.User.MotDePasse);
			}
		}
		else
		{
			if(Plugins.Type != null)
			{
				Plugins.FirstIdentification = true;
				
				// Affichage de la fen�tre d'identification
				if(Premium.PopupIdentificationI == null) Premium.PopupIdentificationI = new Premium.PopupIdentification();
				
				Premium.PopupIdentificationI.SetVisible(true);
			}
			
			var pub1 = document.getElementById("pub1");
			if(pub1 != null) pub1.style.display = "block";
			
			if(Cor.IdLangue == "fr")
			{
				var pub2 = document.getElementById("pub2");
				if(pub2 != null) pub2.style.display = "block";
				
				var pub3 = document.getElementById("pub3");
				if(pub3 != null) pub3.style.display = "block";
			}
			
			// Publicite Full Page SublimSkinz.
			// On place le script SublimSkinz dans le body. Dans le passback du script, qui s'execute quand aucune pub fullpage n'est disponible, on affiche la pub haute et droite.
			/*if(Cor.IdLangue == "en" ||
			  (Cor.IdLangue == "fr" && !Cor.IsDesktop))
			{
				var pub1 = document.getElementById("pub1");
				if(pub1 != null) pub1.style.display = "block";
			}
			
			if(Cor.IdLangue == "fr")
			{
				var pub2 = document.getElementById("pub2");
				if(pub2 != null) pub2.style.display = "block";
			
				// Adskin only for desktop
				if(Cor.IsDesktop)
				{
					var scriptAdSkin = document.createElement('script');
					scriptAdSkin.setAttribute('src','https://ads.ayads.co/ajs.php?zid=4525');
					document.body.insertBefore(scriptAdSkin, document.body.firstChild);
					//document.body.appendChild(scriptAdSkin);
				}
				else
				{
					var pub3 = document.getElementById("pub3");
					if(pub3 != null) pub3.style.display = "block";
				}
			}*/
		}
	}
	
	// En mode plugin, � la fin de l'initialisation des Panel, envoie un message au plugin
	if(Plugins.Type != null) Plugins.InitModePluginPart2();

	// Si l'User clqiue sur une publicit� Adword, il est renvoy� � la page de la version premium
	if(Cor.ParameterUrl != null && (Cor.ParameterUrl == "VersionPremium"))
	{
		Cor.Handler_VersionPremium(true, "");
	}
	
	// Redirect to Grammar Rule
	var ref_rule = Util.GetQueryVariable("rule");
	if(ref_rule != null)
	{
		Cor.Handler_Rules(ref_rule);
	}
	
	// Message try our sample.
	if(Cor.IdLangue == "en" && (Plugins.Type == null) && (Cor.IsMobile == false) && (Cor.IsTablet == false))
	{
		var valueCookieSt = Util.GetCookie("PopupEnSampleShown");
		if(valueCookieSt == null || valueCookieSt.length == 0)
		{
			Util.SetCookie("PopupEnSampleShown", "True", 5000);
			
			var msgw = new Cor.PopupMessageEnglish("<p>Welcome to Scribens</p><p>Try our sample text now!</p>", 0);		// Active later with cookies.
			msgw.SetVisible(true);	// https for not disturb in development mode.
		}
		// API message (to enable sometime)
		else
		{
			/*var valueCookieSt = Util.GetCookie("PopupEnAPIMessage");
			if(valueCookieSt == null || valueCookieSt.length == 0)
			{
				Util.SetCookie("PopupEnAPIMessage", "True", 5000);
				
				if(url.indexOf('https') == 0)
				{
					var msgw = new Cor.PopupMessageEnglish("<p>New!</p><p>Add Scribens to your website in 10 minutes with our API!</p>", 1);		// Active later with cookies.
					msgw.SetVisible(true);	// https for not disturb in development mode.
				}
			}*/
		}
	}
	
	// Pub on scribens.fr
	if(Cor.IdLangue == "fr" && (Plugins.Type == null) && (Cor.IsMobile == false) && (Cor.IsTablet == false))
	{
		//if(Cor.IsChrome == true)
		//if(!Cor.IsMozillaF && !Cor.IsEdge)
		//{
			var valueCookieSt = Util.GetCookie("PopupFrPub1");
			if(valueCookieSt == null || valueCookieSt.length == 0)
			{
				Util.SetCookie("PopupFrPub1", "True", 5000);
				
				var msgw = new Cor.PopupFrPub(1);
				msgw.SetVisible(true);
			}
		//}
	}
	
	// Windows load event.
	window.onload = function()
	{
		Cor.Window_Loaded = true;
		
		// MSEdge. Must blur before.
		if(Cor.IsEdge)
		{
			TextEditor.Document.body.blur();
			
			TextEditor.Document.body.addEventListener('focus', function(){
				if((this.innerHTML == TextEditor.TextPlaceHolder_Fr && Cor.IdLangue == "fr") ||
				   (this.innerHTML == TextEditor.TextPlaceHolder_En && Cor.IdLangue == "en"))
				{
					this.innerHTML = "<p></p>";
				}
			});
		}
	}
	
	// Window focus event
	window.onfocus =  function()
	{
		// Hide sol popups
		if(Cor.MouseOverItemSolution == false)
		{
			Cor.PopupPanelSol.SetVisible(false, false, false, true);
		}
		
		// Focus event for plugins
		if(Plugins.Type != null) Plugins.FocusMainWindow();
	}
	
	// Tablet: autocorrect by default.
	if(Cor.IsTablet == true) Cor.AutoCorrect_AfterPaste = true;
	
	// Test Mac extension
	if(Cor.IdLangue == "fr")
	{
		var pub3 = document.getElementById("pub3");
		if(pub3 != null)
		{
			pub3.style.cursor = "pointer";
			pub3.onclick = function()
			{
				if(Cor.ModeAbonnePremium == false)
				{
					//Cor.Handler_Test_Ext();	// Test extensions
					Cor.Handler_Proofreading();		// Proofreading
				}
			}
		}
	}
	
	// Import file button.
	var importButton = document.getElementById("Input_ImportFile");
	if(importButton)
	{
		importButton.onchange = function(){Cor.ImportFile();}
	}
	
	// Copy button
	var copyButton = document.getElementById("copy-clipboard");
	if(copyButton)
	{
		copyButton.onclick = function()
		{
			Cor.CopyClipboard();
			//$('#actions').addClass('hidden');
			//var elt = document.getElementById("ListActions");
			//elt.style.visibility = "hidden";
			//elt.style.display = "none";
			
		}
	}
	
	// Paste button
	var pasteButton = document.getElementById("paste-clipboard");
	if(pasteButton)
	{
		pasteButton.onclick = function(){Cor.Paste();};
	}
	
	// Print button
	var printButton = document.getElementById("print-textarea");
	if(printButton)
	{
		printButton.onclick = function(){Cor.Print();}
	}
	
	// Download button
	var downloadButton = document.getElementById("download");
	if(downloadButton)
	{
		downloadButton.onclick = function()
		{
			if(Cor.DownloadPopupI == null) Cor.DownloadPopupI = new Cor.DownloadPopup();
			
			document.querySelector('.popaction.download-popup').classList.add("openpop");
			
			var downloadSelector = document.querySelector('.popaction.download-popup .closer');
			if(downloadSelector)
			{
				downloadSelector.onclick = function() {document.querySelector('.popaction.download-popup').classList.remove("openpop");}; 
			}
		}
	}
	
	// Share button
	var printButton = document.getElementById("print-textarea");
	if(printButton)
	{
		printButton.onclick = function(){Cor.Print();}
	}
	
	// Share button
	var shareButton = document.getElementById("share");
	if(shareButton)
	{
		shareButton.onclick = function()
		{
			if(Cor.SharePopupI == null) Cor.SharePopupI = new Cor.SharePopup();
			
			var shareCloser = document.querySelector('.popaction.share-pop .closer');
			if(shareCloser)
			{
				shareCloser.onclick = function() {document.querySelector('.popaction.share-pop').classList.remove("openpop");}; 
			}
			
			Cor.Share();
		}
	}
	
	//////////////////////////////////////////
	// Panneaux pour l'affichage des groupes
	//////////////////////////////////////////
	
	if(Cor.ModeDebug == true)
	{
		// Resize TinyMce
		var frameTx = document.getElementById("FrameTx");
		frameTx.style.height = "200px";
		
		//var tdTaInc = document.createElement("td");
		var taInc = document.createElement("textarea");
		taInc.style.width = "600px";
		taInc.style.height = "100px";
		taInc.style.fontSize = "12px";
		taInc.id = "TaInc";
		//tdTaInc.appendChild(taInc);
		var table1 = document.createElement("table");
	
		var tdTaGN = document.createElement("td");
		var taGN = document.createElement("textarea");
		taGN.style.width = "300px";
		taGN.style.height = "100px";
		taGN.style.fontSize = "12px";
		taGN.id = "TaGN";
		tdTaGN.appendChild(taGN);
		table1.appendChild(tdTaGN);
		
		var tdTaGV = document.createElement("td");
		var taGV = document.createElement("textarea");
		taGV.style.width = "300px";
		taGV.style.height = "100px";
		taGV.style.fontSize = "12px";
		taGV.id = "TaGV";
		tdTaGV.appendChild(taGV);
		table1.appendChild(tdTaGV);
	
		var table2 = document.createElement("table");
	
		var tdTaGA = document.createElement("td");
		var taGA = document.createElement("textarea");
		taGA.style.width = "300px";
		taGA.style.height = "100px";
		taGA.style.fontSize = "12px";
		taGA.id = "TaGA";
		tdTaGA.appendChild(taGA);
		table2.appendChild(tdTaGA);
		
		var tdTaSub = document.createElement("td");
		var taSub = document.createElement("textarea");
		taSub.style.width = "300px";
		taSub.style.height = "100px";
		taSub.style.fontSize = "12px";
		taSub.id = "TaSub";
		tdTaSub.appendChild(taSub);
		table2.appendChild(tdTaSub);
		
		var textAreaDiv = document.getElementById("TextArea");
		textAreaDiv.style.verticalAlign = "top";
		textAreaDiv.align = "center";
		
		textAreaDiv.appendChild(taInc);
		textAreaDiv.appendChild(table1);
		textAreaDiv.appendChild(table2);
	}

	var actionsHovered = false;
	$('#actions p, #actions-list').mouseenter(function() {
		actionsHovered = true;
		$('#actions-list').css({"display": "block"});
	});
	$('#actions p, #actions-list').mouseleave(function() {
		actionsHovered = false;
		setTimeout(function() {
			if(!actionsHovered) {
				$('#actions-list').css({"display": "none"})
			} 
		}, 50)
	});

	$('#actions-list li').click(function() {
		$('#actions-list').css({"display": "none"});
	})
	
});
	
	

var Cor = {

// Mode debug
ModeDebug : false,
	
// Indique s'il s'agit de la 1ere requete ou non.
WriteRequest : true,
CntRequest30 : 1,

selectedItemTextPrev : "Orthographe",

TabSelectedTextPrev : 0,

AfterSucess : false,

// D�clare si le texte a �t� modifi�
TexteModified : false,

// Set if this is the first request
FirstRequest : true,

// Timer de progression.
TimerProgression : null,

// Type d'abonne
ModeAbonnePremium : false,

// Init Mode abonne
InitModeAbonne : false,

// Set if we must show the account first.
MonCompte : false,

// MaxId pour assigner des valeurs d'id aux mots et au phrases
IdMax : "0",

// Version de D�monstration.
Demo : false,

MsgIdInvalide : false,

// Indicator of window loaded
Window_Loaded : false,

// Timer qui envoie le signal d'identification � intervale r�gulier
TimerIdentification : null,

// Parametre de l'URL. Pour la confirmation des mails.
ParameterUrl : null,

// MSOffice for desktop on Windows.
IsMSOfficeWinForDesktop : false,

// UserAgent.
UserAgent : "",

// Desktop
IsDesktop : false,

// Mode smartphone
IsMobile : false,

// Mode tablet
IsTablet : false,

// D�termine si la connexion au compte est active.
Connexion : false,

// Set if it is checking
IsChecking : false,

// Informations User
User : null,

// Settings
WindowOptions : null,

// Option chain.
OptionsCorSt : 'Genre_Je:0|Genre_Tu:0|Genre_Nous:0|Genre_Vous:0|Genre_On:0|RefOrth:0|UsBr:-1',

// Option autocorrect after paste.
AutoCorrect_AfterPaste : false,

// Message indication
MessageIndication : null,

//// Cor variables.

// Id de la phrase à corriger
IdPhraseACorriger : "",

// Ensemble des solutions
MapMotsSolution : new Map(),

// Liste des Id du document
SetId : new Set(),

// Ensemble des éléments surlignés
SetElementsSurlignes : new Set(),

// Map des phrases
MapPhrases : new Map(),

// Map des phrases
VectIdPhrases : [],
VectIdPhrasesTmp : [],
	
// Ensemble des phrases modifiés
SetIdPhModifies : new Set(),

// Ensemble des phrases considérées non propres.
SetPhrasesNonPropres : new Set(),

// Ensemble des String des P
VectPSt : [],

// IHM

// Popup of solutions
PopupPanelSol : null,

// Panel of maximum character
PanelMaxCharI : null,

// Label of maximum character. Only for smartphone.
LabelMaxCharI : null,

// Set of on mouse ove rthe solution item
MouseOverItemSolution : false,

// Download popup
DownloadPopupI : null,

// Share popup
SharePopupI : null,

// Type of browsers
IsMozillaF : false,
IsChrome : false,
IsIE : false,		// IE autre que 11 
IsIEBefore10 : false,	// Set if navigator is IE before 10.
IsIE8 : false,
IsIE9 : false,
IsIE10 : false,
IsIE11 : false,
IsSafari : false,
IsEdge : false,
IsMac : false,
IsIOS : false,	// iPhone and iPad

// Langue de la page.
IdLangue : 'fr',

// Tomcat_Id
Id_Tomcat : 'Scribens',

// Check function
Check : function (isSample)
{
	// If place holder is here, then cancel.
	if((TextEditor.Document.body.innerHTML == TextEditor.TextPlaceHolder_Fr && Cor.IdLangue == "fr") ||
	   (TextEditor.Document.body.innerHTML == TextEditor.TextPlaceHolder_En && Cor.IdLangue == "en"))
	{
		return;
	}
	
	$('.sidebar').addClass("hidden");
	if(Cor.IsChecking == false)
	{
		Cor.IsChecking = true;
		
		// En mode plugin,,déduit les paragraphes modifiés gràce aux phrases modifiés.
		if(Plugins.Type != null) Plugins.DefinePModifiesWithPhModifies();
					
		Cor.SendCorRequest(isSample);

		// $("#ChoiceStatSyn").removeClass("hidden");

		// $("#DivDisplayStyle").addClass('open');
	}
},

// Send a correction request.
SendCorRequest : function(isSampleText)
{
	if(Plugins.Type != null && Cor.InitModeAbonne == false && Cor.Demo == false) return;
	
	// Désactive des composants IHM du panel cor.
	Cor.SetVisible_All(false, true);
	
	// Sauvegarde la position de la scrollBar
	//ScrollPosition = PresentationCorUtil.GetScrollPosition();
	
	var texteModified = "";
	// 1re requete : texte en entier
	if(Cor.FirstRequest == true)
	{
		if(Plugins.Type == null) texteModified = TextEditor.GetTotalContent(Cor.FirstRequest);
		else texteModified = TextEditor.GetTotalContentPlugin();
		
		//if(Plugins.Type == null) texteModified = Cor.TinyMcePanel.TinyMce.getTotalContent();
		//else texteModified = Cor.TinyMcePanel.TinyMce.getTotalContentHTML();
	}
	// Autress requetes : paragraphes modifiés entourés des (Ecart - 1) paragraphes.
	else
	{
		// Inf de debug très utile
		//SortedSet<String> set = PresentationCorUtil.SetIdPhModifies;
		if(Plugins.Type == null)
		{
			// En cas d'ajout de paragraphes, fusionne les paragraphes pour simplifier tout.
			// Creer des balises de phrases sur les textNode
			Util.HarmoniserTexte();
			
			// Ajoute par comparaison des id des phrases avant et après
			Util.SetPhrasesModifies();
		
			texteModified = Util.GetTexteTransf();
			
			//alert(texteModified);
		}
		else
		{
			// Dans le cas des plugins ou on ne peux pas faire de retour à la ligne, il peux y avoir des P vides, sans balise de phrase. Ils doivent être des P modifiés.
			// Ex : on crée 3 paragraphes -> correction -> sur la fenêtre du plugin -> suppression manuelle du 2nd paragraphe -> ajout de caractères, on a supprimé la balise de phrase.
			Util.PSansPhraseModifie();
			texteModified = Util.GetTexteTransfPlugin();
		}
	}
	
	// En dessous de 10 000, le simple panel d'attente suffit.
	var progression = false;
	if(texteModified.length < 10000 || !Cor.ModeAbonnePremium || Cor.IsMobile == true)
	{
		Cor.SetVisible_PanelWait(true, false);
	}
	// Après 10 000, on affiche le panel de progression
	else
	{
		progression = true;
		Cor.SetVisible_PanelWait(true, true);
		Cor.SetProgressBar_Value(0);
		
		// Initialisation de la progression
		Util.SendHttpRequest('Progression_Servlet',
						[['FunctionName', 'InitProgression']],
						 null);
		
		// Requete de demande de progression
		Cor.TimerProgression = setInterval(function()
		{
			Util.SendHttpRequest('Progression_Servlet',
						[['FunctionName', 'GetProgression']],
						 function(response)
						 {
							// Set the progression value.
							Cor.SetProgressBar_Value(response);
							$('.progress-bar-container .progress-bar').width(response + '%');
						 });
		}, 1000);
	
	}
	
	// TexteStat
	// At first request and each time the user click on stats radio box.
	var texteStat = "";
	if(Cor.ModeAbonnePremium == true)
	{
		if(Cor.FirstRequest == true ||
		   Stat.UpdatedStat == false ||
		  (Style.StatView == true && Cor.SetIdPhModifies.size > 0))		// Recheck in Stat View. If modified P, then recheck the stats.
		{
			texteStat = TextEditor.GetTotalContent(Cor.FirstRequest);
		}
		
		if(Cor.SetIdPhModifies.size > 0) Stat.UpdatedStat = false;
	}
	
	// Lance un timer au bout de 30min
	if(!Cor.ModeAbonnePremium)
	{
		if(Cor.WriteRequest == true)
		{
			Cor.WriteRequest = false;
			
			// Lance le timer
			setTimeout(function() {
					
				Cor.CntRequest30++;
				Cor.WriteRequest = true;	// On peut réécrire après 30min
				
			}, 1800000);
		}
	}
	
	// Launch the request
	if(Cor.User.Identifiant.indexOf("[WEBSITE]") == 0) Cor.User.MotDePasse = Cor.GenerationMotDePasseWebSite();
	
	Util.SendHttpRequest('TextSolution_Servlet',
						[['FunctionName', 'GetTextSolution'],
						 ['texteHTML', texteModified],
						 ['texteStat', texteStat],
						 ['IdMax', Cor.IdMax],
						 ['IdMaxSousGroupeRep', ((Style.StyleText == null) ? '0' : Style.StyleText.IdMaxSousGroupeRep)],
						 ['writeRequest', Cor.WriteRequest],
						 ['cntRequest30', Cor.CntRequest30],
						 ['firstRequest', Cor.FirstRequest],
						 ['progression', progression],
						 ['charPrecPh', -1],
						 ['optionsCor', Cor.OptionsCorSt],
						 ['optionsStyle', Style.OptionsStyleSt],
						 ['ensIdRepetitions', Style.GetIdRepetitions(false)],
						 ['ensIdRepetitions2mPh', Style.GetIdRepetitions(true)],
						 ['corSt', 'false'],
						 ['plugin', 'false'],
						 ['identifier', Cor.User.Identifiant],
						 ['password', Cor.User.MotDePasse],
						 ['langId', Cor.IdLangue],
						 ['isSampleText', isSampleText],
						 ['modePlugin', Plugins.Type]],
						 Cor.ApplySolution);
						 
},

// Au remplacment de la dernière solution de la phrase, on refait une vérification de la phrase
VerifierCorrectionPhrase : function(phraseSt, idPhrase, phrasePrecSt)
{
	Cor.IdPhraseACorriger = idPhrase;
	
	var cPrecPhrase = -1;
	if(phrasePrecSt.length > 0) cPrecPhrase = phrasePrecSt.charCodeAt(phrasePrecSt.length - 1);
	
	// Désactive des composants IHM du panel cor.
	Cor.SetVisible_All(false, false);
	
	phraseSt = "<p>" + phraseSt + "<p>";
	
	// Launch the request
	if(Cor.User.Identifiant.indexOf("[WEBSITE]") == 0) Cor.User.MotDePasse = Cor.GenerationMotDePasseWebSite();
	
	Util.SendHttpRequest('TextSolution_Servlet',
						[['FunctionName', 'GetTextSolution'],
						 ['texteHTML', phraseSt],
						 ['texteStat', ''],
						 ['IdMax', Cor.IdMax],
						 ['IdMaxSousGroupeRep', ((Style.StyleText == null) ? '0' : Style.StyleText.IdMaxSousGroupeRep)],
						 ['writeRequest', 'false'],
						 ['cntRequest30', '1'],
						 ['firstRequest', 'false'],
						 ['progression', 'false'],
						 ['charPrecPh', cPrecPhrase],
						 ['optionsCor', Cor.OptionsCorSt],
						 ['optionsStyle', Style.OptionsStyleSt],
						 ['ensIdRepetitions', Style.GetIdRepetitions(false)],
						 ['ensIdRepetitions2mPh', Style.GetIdRepetitions(true)],
						 ['corSt', 'true'],
						 ['plugin', 'false'],
						 ['identifier', Cor.User.Identifiant],
						 ['password', Cor.User.MotDePasse],
						 ['langId', Cor.IdLangue],
						 ['isSampleText', 'false'],
						 ['modePlugin', Plugins.Type]],
						 Cor.ApplySolution);

},

// Apply changes of the solution
ApplySolution : function(textSolution)
{
	if(Cor.ModeAbonnePremium == true || Cor.IdLangue == "en") {
		$('.sidebar').removeClass("hidden");
		$('.sidebar').show();
		if (!$('.Transf-CadreGridSyn').hasClass('open') && !$('.Stat-StatTextePanel').hasClass('open')) {
			$("#ChoiceStatSyn").removeClass("hidden");
			$('#DivDisplayStyle').show();
		}
	}
	if(textSolution.LimiteNbChar == -1)
	{
		// IdMax
		Cor.IdMax = textSolution.IdMax;
		
		// Problème de remplacement plugin. On ne vérifie pas. Le GetText le fait.
		if(Plugins.Type != null && Plugins.PbRemplacement == true)
		{
			Plugins.PbRemplacement = false;
			return;
		}
		
		// Progression. On annule le timer par sécurité.
		if(Cor.TimerProgression != null) window.clearInterval(Cor.TimerProgression);
		
		// Remplit la map des mots des solutions.
		for (var key in textSolution.SolutionCor.MapMotSolution)
		{
			Cor.MapMotsSolution.set(key, textSolution.SolutionCor.MapMotSolution[key]);
		}
		
		// Panneau de debug
		if(Cor.ModeDebug == true) Cor.FillTextAreaGroupe(textSolution);
		
		// Actives les composants IHM
		Cor.SetVisible_All(true, true);
		
		// Show the textArea.
		Cor.SetVisible_PanelWait(false, false);
		
		var allText = false;
					
		// Place le texte
		// 1re requete : place le texte en entier
		if(textSolution.VectPartText.length == 0)
		{
			// Correction normale
			if(Cor.IdPhraseACorriger.length == 0 && (Cor.FirstRequest || textSolution.IsSample))
			{
				//textSolution.TexteSolution = texteSolution.TexteSolution.replace(" ", "&nbsp;");
				
				// Comme SetTextHTML mais ne provoque pas de focus.
				// Exclusivement réservé à un bug de FF. Le setContent provoque un focus. La position du range de la sélection est mauvaise une fois le focus apparu.
				if(Plugins.Type != null && (Cor.IsMozillaF/* || Cor.IsIE || Cor.IsIE11*/))
				{
					textSolution.TexteSolution = textSolution.TexteSolution.replace("<html>\n <head></head>\n <body>\n  ", "");
					textSolution.TexteSolution = textSolution.TexteSolution.replace("\n </body>\n</html>", "");
					textSolution.TexteSolution = textSolution.TexteSolution.replace(new RegExp("\n  ", "g"), "");
					if((Plugins.Type != "MSWord") && (Plugins.Type != "MSWordOSX") && (Plugins.Type != "MSWordWeb") && (Plugins.Type != "GoogleDocs") && (Plugins.Type != "OOWriter")) textSolution.TexteSolution = Util.ReplacePVide(textSolution.TexteSolution);
					TextEditor.SetTextHTMLFirstFF(textSolution.TexteSolution);
				}
				else TextEditor.SetTextHTML(textSolution.TexteSolution);
				
				allText = true;
			}
			// Correction d'une phrase
			if(Cor.IdPhraseACorriger.length > 0)
			{
				// Formate le texte
				textSolution.TexteSolution = textSolution.TexteSolution.replace("<html>\n <head></head>\n <body>\n  <p>", "");
				textSolution.TexteSolution = textSolution.TexteSolution.replace("</p>\n  <p></p>\n </body>\n</html>", "");
				
				Util.ReplacePhraseACorriger(textSolution.TexteSolution, Cor.IdPhraseACorriger);
				
				// Remplit la map des éléments uniquement ceux de la nouvelle phrase ajoutée (et la phrase elle-même) par souci d'économie.
				var idNvPhrase = "";
				var indSpan = textSolution.TexteSolution.indexOf("span");
				if(indSpan > -1)
				{
					var indSpan2 = textSolution.TexteSolution.indexOf("\"", indSpan + 9);
					if(indSpan2 > -1) idNvPhrase = textSolution.TexteSolution.substring(indSpan + 9, indSpan2);
				}
				Util.ConstruitMapElementsPhrase(idNvPhrase);
				
				// Surligne les mots de solution
				//if(!Cor.ModeAbonnePremium || 
				//   (Cor.TabPanel.getWidgetIndex(Cor.TabPanel.getActiveWidget()) == 0))
				{
					Util.SurligneElts_Cor(textSolution.SolutionCor.MapMotSolution);
				}
				
				// Remplit la map des phrases avec la nouvelle phrase.
				Util.FillMapPhrasePh(idNvPhrase);
				// Remplace l'ancien id par le nouveau dans le vecteur des phrases
				Util.ReplaceIdVectIdPhrase(Cor.IdPhraseACorriger, idNvPhrase);
				
				Cor.IdPhraseACorriger = "";
			}
		}
		// Remplit les parties de paragraphes modifiés
		else
		{
			for(var i = 0; i < textSolution.VectPartText.length; i++)
			{
				var partText = textSolution.VectPartText[i];
				// partText.TexteHtML = "<p>" + partText.TexteHtML + "</p>"; 
				partText.TexteHtML = partText.TexteHtML.replace(new RegExp("\n  ", "g"), "");

				if(Plugins.Type == null) Util.ReplacePartText(partText.IdPhraseStart, partText.IdPhraseEnd, partText.TexteHtML);
				else
				{
					partText.TexteHtML = "<p>" + partText.TexteHtML + "</p>";
					if(Cor.IsMozillaF && (Plugins.Type != "MSWord") && (Plugins.Type != "MSWordOSX") && (Plugins.Type != "MSWordWeb") && (Plugins.Type != "GoogleDocs") && (Plugins.Type != "OOWriter")) partText.TexteHtML = Util.ReplacePVide(partText.TexteHtML);
					Util.ReplacePartTextPlugin(partText.IdPhraseStart, partText.IdPhraseEnd, partText.TexteHtML);
				}
			}
		
			allText = true;
		}
		
		// Pour IE, il faut cacher le focus du texte, car probl�mes de lignes.
		if(Plugins.Type != null && (Cor.IsIE || Cor.IsIE11))
		{
			window.focus();
		}
		
		// Remplit le set des phrases non propres
		textSolution.SetPhrasesNonPropres.forEach(function(phraseSt)
		{
			Cor.SetPhrasesNonPropres.add(phraseSt);
		});
		
		if(allText == true)
		{
			// D�surligne les mots de solution. Avant de construire le set des id, car la suprression des balises de surlignage simplifient la recherche des id.
			//if(!Cor.ModeAbonnePremium || (Cor.TabPanel.getWidgetIndex(Cor.TabPanel.getActiveWidget()) == 0))
			//{
			Util.DeSurligne();
			//}
			
			// Construit la liste des �l�ments (optimisation)
			Cor.SetId.clear();
			// Reconstruit la liste des Id en parsant le texte.
			Util.ConstruitMapElements();
			// Supprime les anciens id plus utilis�s. Optimisation pour la rapidit� et la m�moire.
			Util.SuppAncienCorId();
		
			// Underline word solutions.
			// Surligne les mots de solution
			//if(!Cor.ModeAbonnePremium || (Cor.TabPanel.getWidgetIndex(Cor.TabPanel.getActiveWidget()) == 0))
			//{
			Util.SurligneElts_Cor(null);
			//}
			
			// Scroll to Top. Ajouter du texte � TinyMce descends la scrollBar
			Util.ScrollToPos(0);
			
			// Remplit la map des phrases.
			Cor.VectIdPhrases = [];
			Util.FillMapPhrase();
		}
		
		// Vide certains set
		Cor.SetIdPhModifies.clear();
		if(Plugins.Type != null)
		{
			Plugins.SetPModifies.clear();
			Plugins.SetPIntacts.clear();
		}
		
		if(Cor.ModeAbonnePremium)
		{
			// 2. Complete le panel Style
			Style.OnSuccessStyle(textSolution.StyleText);
			
			// 3. Complete le panel Stat
			Stat.OnSuccessStat(textSolution.StatText);
			
			// If stat == null, hide the stat panel
			if(textSolution.StatText == null)
			{
				if(Cor.IsMobile == false)
				{
					// Hide the panel stat.
					Stat.PanelStat.style.display = "none";
					
					var checkBoxSyn = document.getElementById("checkBoxStat");
					checkBoxSyn.checked = false;
				}
			}
			
			// In plugin mode, show the style panel only after first check.
			if(Plugins.Type != null && Cor.FirstRequest == true)
			{
				var divStyle = document.getElementById("StyleTexte");
				divStyle.style.display = "block";
			}
		}
		
		// Hide the label of Max character (only for Smartphone)
		if(Cor.LabelMaxCharI != null) Cor.LabelMaxCharI.SetVisible(false);
		
		Cor.TexteModified = false;
		
		// Si le texte est correct, afficher un label pour le signaler.
		Util.VerificationErreurExiste();
	}
	// Limitation character exceeded
	else
	{
		// Show components
		Cor.SetVisible_All(true, true);
		
		if(Cor.IsMobile == false)
		{
			if(Cor.PanelMaxCharI == null) Cor.PanelMaxCharI = new Cor.PanelMaxChar();
			Cor.PanelMaxCharI.SetLimChar(textSolution.LimiteNbChar);
			Cor.PanelMaxCharI.SetVisible(true);
		}
		// Smartphone
		else
		{
			if(Cor.LabelMaxCharI == null) Cor.LabelMaxCharI = new Cor.LabelMaxChar();
			Cor.LabelMaxCharI.SetVisible(true);
			
			Cor.SetVisible_PanelWait(false, false);
		}
	}
	
	// FirstRequest
	Cor.FirstRequest = false;
	
	Cor.IsChecking = false;
	
},

// Load sample text
LoadSampleText : function()
{

	// Launch the request
	Util.SendHttpRequest('TextSolution_Servlet',
						[['FunctionName', 'GetTextSample'],
						 ['langId', Cor.IdLangue]],
						 function(response)
						 {
							TextEditor.SetTextHTML(response);
						
							// iPhone and iPad. Cancel any action on the keyboard because the textarea musn't editable. (auto spellcheck problem)
							if(Cor.IsIOS == true && (Cor.IsMobile == true || Cor.IsTablet == true))
							{
								TextEditor.ExplanationPasteText = false;
								TextEditor.Document.body.setAttribute("contenteditable", "false");
								TextEditor.Document.body.style.cursor = "default";
							}
							if(Cor.ModeAbonnePremium == false) {
								if($('#ChoiceStatSyn tr.active').length <= 0) {
									$('#DivDisplayStyle').addClass('open');
									$('#ChoiceStatSyn tr:first-child').addClass('active');
								}
								$("#ChoiceStatSyn").removeClass('hidden');
							}
							
							Cor.Check(true);
						 });
	
},

// Click on connexion button
Handler_Connexion : function()
{
	if(!Cor.IsChecking)
	{
		// Hide sol popups
		Cor.PopupPanelSol.SetVisible(false, false, false, true);
	
		// Connexion
		if(Cor.Connexion == false)
		{
			if(Premium.PopupIdentificationI == null) Premium.PopupIdentificationI = new Premium.PopupIdentification();
			
			Premium.PopupIdentificationI.SetVisible(true);
		}
		// D�connexion
		else
		{
			Premium.Deconnexion();
		}
	}
},

// Check the connexion
CheckConnexion : function(id, password)
{
	Util.SendHttpRequest('Identification_Servlet',
						[['FunctionName', 'EstAbonne'],
						 ['Id', id],
						 ['Password', password]],
						 Premium.ResultIdentification);

},

InitModeEn : function()
{
	// Se place en mode abonn�
	Cor.ModeAbonnePremium = true;
	Cor.InitModeAbonne = true;
	
	// Initialisation du panneau des transformations
	Style.Init();
	
	// Initialisation du panneau de statistique de gauche
	Stat.Init();
	
	// Show Style panel
	var divStyle = document.getElementById("StyleTexte");
	if(divStyle != null)
	{
		if(Plugins.Type == null) divStyle.style.display = "block";	// For plugin, show only after first check
	}
	
	// Show the pub1
	var pub1 = document.getElementById("pub1");
	if(pub1 != null)
	{
		pub1.style.display = "block";
	}
	
	//SHOW ACTIONS BUTTONS IF PREMIUM
	$('#actions').removeClass('hidden');
	
	//document.getElementById("pub3").style.visibility = "hidden";
},

// Informations g�n�rales sur le user
User : function()
{
	// UserName
	this.UserName = "";	
	// Identifiant (=Email)
	this.Identifiant = "";
	// Mot de passe (Mot de passe)
	this.MotDePasse = "";			
	// Type d'abonnement
	this.TypeAbonnement = "";
	// Date d'expiration de l'abonnement
	this.DateExpiration = "";
	// Date d'expiration du dernier d'abonnement
	this.DateExpirationDernierAbn = "";
	// Ancien Tarif
	this.AncienTarif = false;
	// InfEvolution
	this.InfEvolutions = false;
	// Settings of the user
	this.Settings = "";
	// RecurringPayment
	this.RecurringPayment = false;
	// Payment by card
	this.PaymentByCard = false;
	// Payment by Smartphone
	this.PaymentBySmartphone = false;
},

// G�n�re un mot de passe pour l'int�gration aux sites web.
GenerationMotDePasseWebSite : function()
{	
	var date = new Date();

	// Combinaison : (Hours + Day + Year + Month) * Minutes.
	var n = (date.getUTCHours() + date.getUTCDate() + date.getUTCFullYear() + date.getUTCMonth()) * date.getUTCMinutes();
	n = n * 17;
	
	return n.toString();
	
	// Combinaison : (Hours + Day + Year + Month) * Minutes en UTC.
	//Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
	//int n = (cal.get(Calendar.HOUR_OF_DAY) + cal.get(Calendar.DAY_OF_MONTH) + cal.get(Calendar.YEAR) + cal.get(Calendar.MONTH))*cal.get(Calendar.MINUTE)*17;
	
	//return String.valueOf(n);
},

// Replit les panneaux de texte avec les groupes
FillTextAreaGroupe : function(textSolution)
{
	var taInc = document.getElementById("TaInc");
	taInc.value = textSolution.SolutionCor.EnsGroupeSt.ChTypesMot;

	// Debugger
	var taGN = document.getElementById("TaGN");
	var listeGN = "GN";
	listeGN += "\n";
	
	for(var i = 0; i < textSolution.SolutionCor.EnsGroupeSt.VectGroupeNominalSt.length; i++)
	{
		listeGN += textSolution.SolutionCor.EnsGroupeSt.VectGroupeNominalSt[i];
		listeGN += "\n";
	}
		
	taGN.value = listeGN;
	
	var taGV = document.getElementById("TaGV");
	var listeGV = "GV";
	listeGV += "\n";
	
	for(var i = 0; i < textSolution.SolutionCor.EnsGroupeSt.VectGroupeVerbeSt.length; i++)
	{
		listeGV += textSolution.SolutionCor.EnsGroupeSt.VectGroupeVerbeSt[i];
		listeGV += "\n";
	}
	
	TaGV.value = listeGV;
		
	var taGA = document.getElementById("TaGA");
	var listeGA = "GA";
	listeGA += "\n";
	
	for(var i = 0; i < textSolution.SolutionCor.EnsGroupeSt.VectGroupeAdjectifSt.length; i++)
	{
		listeGA += textSolution.SolutionCor.EnsGroupeSt.VectGroupeAdjectifSt[i];
		listeGA += "\n";
	}
		
	taGA.value = listeGA;

	var taSub = document.getElementById("TaSub");
	var listeSub = "Prop";
	listeSub += "\n";
	
	for(var i = 0; i < textSolution.SolutionCor.EnsGroupeSt.VectGroupeSubSt.length; i++)
	{
		listeSub += textSolution.SolutionCor.EnsGroupeSt.VectGroupeSubSt[i];
		listeSub += "\n";
	}
		
	taSub.value = listeSub;
},

// IHM //

Register_ClickHandlerBtn : function()
{
	// Bouton orthographe
	var btnCor = document.getElementById('btnorth');
	if(btnCor != null)
	{
		btnCor.addEventListener("click", function()
		{
			Cor.Handler_Orthographe();
		});
	}

	// Bouton Dictionary
	var btnDictionnary = document.getElementById('btndict');
	if(btnDictionnary != null)
	{
		btnDictionnary.addEventListener("click", function()
		{
			Cor.Handler_Dictionnary();
		});
	}
	
	// Bouton Rules
	var btnRules = document.getElementById('btnreg');
	if(btnRules != null)
	{
		btnRules.addEventListener("click", function()
		{
			Cor.Handler_Rules(null);
		});
	}
	
	// Extension
	var btnExt = document.getElementById('btnext');
	if(btnExt != null)
	{
		btnExt.addEventListener("click", function()
		{
			Cor.Handler_ExtensionAPIEn();
		});
	}
	
	if((Cor.IdLangue == "fr") &&
	   (Plugins.Type == null))
	{
		// Bouton VersionPremium
		var btnVersionPremium = document.getElementById('btnvp');
		if(btnVersionPremium != null)
		{
			btnVersionPremium.addEventListener("click", function()
			{
				Cor.Handler_VersionPremium(false, "");
			});
		}
		
		// Bouton connexion
		var btnConnexion = document.getElementById('btncn');
		if(btnConnexion != null)
		{
			btnConnexion.addEventListener("click", function()
			{
				Cor.Handler_Connexion();
			});
		}
	}
	
	// Button of plugin test. Redirect to the page of plugin presentation.
	var btnPluginTest = document.getElementById('btnPluginTest');
	if(btnPluginTest)
	{
		btnPluginTest.addEventListener("click", function()
		{
			Cor.Handler_Test_Ext();
		});
	}
	
	// Button of plugin english. Redirect to the page of extensions presentation.
	var btnDownloadPluginEn = document.getElementById('btn-download-plugins');
	if(btnDownloadPluginEn)
	{
		btnDownloadPluginEn.addEventListener("click", function()
		{
			Cor.Handler_BtnExtensionsAPI(false);
		});
	}
	
	// Button of API english. Redirect to the page of extensions presentation.
	var btnAPIEn = document.getElementById('btn-download-api');
	if(btnAPIEn)
	{
		btnAPIEn.addEventListener("click", function()
		{
			Cor.Handler_BtnExtensionsAPI(true);
		});
	}
	
	// Bouton proofreading
	var btnProofreading = document.getElementById('btnpr');
	if(btnProofreading != null)
	{		
		btnProofreading.addEventListener("click", function()
		{
			Cor.Handler_Proofreading();
		});
	}
	
	// Mode smartphone
	var btn_paste = document.getElementById('btn_paste');
	if(btn_paste != null)
	{
		btn_paste.addEventListener("click", function()
		{
			TextEditor.Handler_Paste();
		});
	}
	var btn_copy = document.getElementById('btn_copy');
	if(btn_copy != null)
	{
		btn_copy.addEventListener("click", function()
		{
			TextEditor.Handler_Copy();
		});
	}
},

// Handler cor
Handler_Orthographe : function()
{
	//REMOVE CLASS FLEX WHEN NOT ON ORTOGRAPHE
	$('.ortho-flex').addClass('flex');

	var mainDiv = document.getElementById("MainDiv");

	//DISPLAY SIDEBAR WHEN ON GRAMMAR CHECK TABS
	if(Cor.ModeAbonnePremium == true) {
		$('.sidebar').show();
	}

	if(Cor.ModeAbonnePremium == false) {
		$('.side-pub').show();
	}
	//ADD CLASS TO BODY FOR DISTINCTION / USED IN CSS
	$('body').attr('id', 'ortographe');
	$('.menu-header .nav a').removeClass('selected');
	$('.menu-header .nav a#btnorth').addClass('selected');
	
	document.getElementById("PanelBtn").style.display = "block";
	document.getElementById("TextArea").style.display = "block";
	document.getElementById("Titre").style.display = "block";
	
	if(mainDiv.lastChild.id != null && mainDiv.lastChild.id != "PanelWait") mainDiv.removeChild(mainDiv.lastChild);
	
	mainDiv.style.width = "100%";

	// Show the div style
	var divStyle = document.getElementById("StyleTexte");
	divStyle.style.visibility = "visible";
	
	// Display the ad
	if(Cor.ModeAbonnePremium == false)
	{
		if(Cor.IdLangue == "fr") document.getElementById("InfSup").style.display = "none";
		document.getElementById("pub3").style.display = "block";
	}
	else
	{
		document.getElementById("InfSup").style.display = "block";
		var pub3 = document.getElementById("pub3");
		if(pub3 != null) pub3.style.display = "none";
	}
},

// Handler dictionary
Handler_Dictionnary : function()
{
	var mainDiv = document.getElementById("MainDiv");
	
	//REMOVE CLASS FLEX WHEN NOT ON ORTOGRAPHE
	$('.ortho-flex').removeClass('flex');

	//HIDE SIDEBAR WHEN ON OTHER TABS THAN GRAMMAR CHECK
	$('.sidebar').hide();
	$('.side-pub').hide();

	//ADD CLASS TO BODY FOR DISTINCTION / USED IN CSS
	$('body').attr('id', 'dictionnary');
	$('.menu-header .nav a').removeClass('selected');
	$('.menu-header .nav a#btndict').addClass('selected');

	// Hide sol popups
	Cor.PopupPanelSol.SetVisible(false, false, false, true);
	
	document.getElementById("PanelBtn").style.display = "none";
	document.getElementById("TextArea").style.display = "none";
	document.getElementById("Titre").style.display = "block";
	
	if(mainDiv.lastChild.id != null && mainDiv.lastChild.id != "PanelWait") mainDiv.removeChild(mainDiv.lastChild);
	
	// Hide the div style
	var divStyle = document.getElementById("StyleTexte");
	divStyle.style.visibility = "hidden";
	
	document.getElementById("InfSup").style.display = "none";
	
	var pub3 = document.getElementById("pub3");
	if(pub3 != null) pub3.style.display = "none";
	
	if(Cor.ModeAbonnePremium == false) $("#pub2").css('display', 'block');
	
	// Create the panel of dictionary then add it
	if(Dict.PanelDictI == null) Dict.PanelDictI = new Dict.PanelDict();
	
	mainDiv.appendChild(Dict.PanelDictI.Node);
},

// Handler rules
Handler_Rules : function(ref_rule)
{
	var mainDiv = document.getElementById("MainDiv");

	//REMOVE CLASS FLEX WHEN NOT ON ORTOGRAPHE
	$('.ortho-flex').removeClass('flex');

	//HIDE SIDEBAR WHEN ON OTHER TABS THAN GRAMMAR CHECK
	$('.sidebar').hide();
	$('.side-pub').hide();
	//ADD CLASS TO BODY FOR DISTINCTION / USED IN CSS
	$('body').attr('id', 'rules');
	$('.menu-header .nav a').removeClass('selected');
	$('.menu-header .nav a#btnreg').addClass('selected');
	
	// Hide sol popups
	Cor.PopupPanelSol.SetVisible(false, false, false, true);
	
	document.getElementById("PanelBtn").style.display = "none";
	document.getElementById("TextArea").style.display = "none";
	
	if(mainDiv.lastChild.id != null && mainDiv.lastChild.id != "PanelWait") mainDiv.removeChild(mainDiv.lastChild);
	
	mainDiv.style.width = "736px";
	
	// Hide the div style
	var divStyle = document.getElementById("StyleTexte");
	divStyle.style.visibility = "hidden";
	
	// Hide the div syn stat
	document.getElementById("InfSup").style.display = "none";
	
	if(Cor.ModeAbonnePremium == false)
	{
		var pub3 = document.getElementById("pub3");
		if(pub3 != null) pub3.style.display = "block";
	}
	
	if(Cor.ModeAbonnePremium == false)
	{
		$("#pub2").css('display', 'block');
	}
	
	// Create the panel then add it
	if(Rules.PanelRulesI == null) Rules.PanelRulesI = new Rules.PanelRules();
	/*else
	{
		Rules.PanelRulesI.childNodes[0].style.display = "block";
		Rules.PanelRulesI.childNodes[1].style.display = "block";
		
		if(Rules.PanelRulesI.childNodes.length > 2) Rules.PanelRulesI.removeChild(Rules.PanelRulesI.childNodes[2]);
	}*/
	
	// If a rule must be shown with a url parameter
	if(ref_rule != null)
	{
		Rules.Show_SpecificRule_OnStart(ref_rule, Rules.PanelRulesI);
	}
	
	mainDiv.appendChild(Rules.PanelRulesI);
},

// Handler of extensions. English
Handler_ExtensionAPIEn : function()
{
	var mainDiv = document.getElementById("MainDiv");

	//HIDE SIDEBAR WHEN ON OTHER TABS THAN GRAMMAR CHECK
	$('.sidebar').hide();
	$('.side-pub').hide();
	//ADD CLASS TO BODY FOR DISTINCTION / USED IN CSS
	$('body').attr('id', 'extensionapien');
	$('.menu-header .nav a').removeClass('selected');
	$('.menu-header .nav a#btnext').addClass('selected');
	
	// Hide sol popups
	Cor.PopupPanelSol.SetVisible(false, false, false, true);
	
	document.getElementById("PanelBtn").style.display = "none";
	document.getElementById("TextArea").style.display = "none";
	//document.getElementById("Titre").style.display = "none";
	//document.getElementById("pub1").style.display = "none";
	
	if(mainDiv.lastChild.id != null && mainDiv.lastChild.id != "PanelWait") mainDiv.removeChild(mainDiv.lastChild);
	
	mainDiv.style.width = "736px";
	
	// Hide the div style
	var divStyle = document.getElementById("StyleTexte");
	divStyle.style.visibility = "hidden";
	
	// Hide the div syn stat
	document.getElementById("InfSup").style.display = "none";
	
	// Create the panel then add it
	if(Premium.PanelExtensionAPIEnI == null) Premium.PanelExtensionAPIEnI = new Premium.PanelExtensionAPIEn();
	
	mainDiv.appendChild(Premium.PanelExtensionAPIEnI.Node);
},

// Handler version premium
Handler_VersionPremium : function(presentation, typeAbn)
{
	//REMOVE CLASS FLEX WHEN NOT ON ORTOGRAPHE
	$('.ortho-flex').removeClass('flex');
	
	var mainDiv = document.getElementById("MainDiv");

	//HIDE SIDEBAR WHEN ON OTHER TABS THAN GRAMMAR CHECK
	$('.sidebar').hide();
	$('.side-pub').hide();
	//ADD CLASS TO BODY FOR DISTINCTION / USED IN CSS
	$('body').attr('id', 'versionprenium');

	$('.menu-header .nav a').removeClass('selected');
	$('.navbar-nav #btnvp').addClass('selected');
	
	// Hide sol popups
	Cor.PopupPanelSol.SetVisible(false, false, false, true);
	
	document.getElementById("PanelBtn").style.display = "none";
	document.getElementById("TextArea").style.display = "none";
	
	if(mainDiv.lastChild.id != null && mainDiv.lastChild.id != "PanelWait") mainDiv.removeChild(mainDiv.lastChild);
	
	mainDiv.style.width = "100%";
	
	// Hide the div style
	var divStyle = document.getElementById("StyleTexte");
	divStyle.style.visibility = "hidden";
	
	// Hide the div syn stat
	document.getElementById("InfSup").style.display = "none";
	
	var pub3 = document.getElementById("pub3");
	if(pub3 != null) pub3.style.display = "none";
	
	if(Cor.ModeAbonnePremium == false)
	{
		//document.getElementById("pub2").style.display = "none";
	}
	
	// Create the panel then add it
	if(Cor.Connexion == false || presentation == true)
	{
		if(Premium.PresentationPremiumI == null) Premium.PresentationPremiumI = new Premium.PresentationPremium();
		
		mainDiv.appendChild(Premium.PresentationPremiumI.MainDiv);
	}
	// Panel mon compte
	else
	{
		if(!Cor.IsChecking)
		{
			if(Premium.PanelMonCompteI == null) Premium.PanelMonCompteI = new Premium.PanelMonCompte();
			
			mainDiv.appendChild(Premium.PanelMonCompteI.Node);
			
			// Update information account. DO it each time because we can change the account.
			Premium.UpdateInformationsCompte();
		}
	}
	
	// Type Abonnement selected
	if(typeAbn == "P1M") document.getElementById("Radio1Mois").checked = true;
	else if(typeAbn == "P3M") document.getElementById("Radio3Mois").checked = true;
	else if(typeAbn == "P1A") document.getElementById("Radio1An").checked = true;
},

// Handler for proofreading
Handler_Proofreading : function()
{
	var mainDiv = document.getElementById("MainDiv");

	//HIDE SIDEBAR WHEN ON OTHER TABS THAN GRAMMAR CHECK
	$('.sidebar').hide();
	$('.side-pub').hide();
	//ADD CLASS TO BODY FOR DISTINCTION / USED IN CSS
	$('body').attr('id', 'proofreading');
	
	// Hide sol popups
	Cor.PopupPanelSol.SetVisible(false, false, false, true);
	
	document.getElementById("PanelBtn").style.display = "none";
	document.getElementById("TextArea").style.display = "none";
	
	if(mainDiv.lastChild.id != null && mainDiv.lastChild.id != "PanelWait") mainDiv.removeChild(mainDiv.lastChild);
	
	mainDiv.style.width = "736px";
	
	// Hide the div style
	var divStyle = document.getElementById("StyleTexte");
	divStyle.style.visibility = "hidden";
	
	// Hide the div syn stat
	document.getElementById("InfSup").style.display = "none";
	
	var pub3 = document.getElementById("pub3");
	if(pub3 != null) pub3.style.display = "none";
	
	if(Cor.ModeAbonnePremium == false)
	{
		document.getElementById("pub2").style.display = "none";
	}
	
	// Create the panel then add it
	if(Proofreading.Presentation_ProofreadingI == null) Proofreading.Presentation_ProofreadingI = new Proofreading.Presentation_Proofreading();
	
	mainDiv.appendChild(Proofreading.Presentation_ProofreadingI.MainDiv);
},

// Handler of test extension
Handler_Test_Ext : function()
{
	Cor.Handler_VersionPremium(false, "");
	
	Premium.PresentationPremiumI.OpenDiv(1);
	
	var eltLabelMailPlugin = document.getElementById("TabPrem");
	window.scrollTo(0, eltLabelMailPlugin.offsetTop + 300);
},

// Handler of extensions
Handler_BtnExtensionsAPI : function(api)
{
	Cor.Handler_ExtensionAPIEn();
	
	if(api == false) window.scrollTo(0, 0);
	else
	{
		var eltLabelAPI = document.getElementById("LabelAPI");
		window.scrollTo(0, eltLabelAPI.offsetTop + 100);
	}
},

// Create the waiting panel.
CreateWaitingPanel : function()
{
	var elementDiv = document.createElement("div");
	elementDiv.hidden = true;
	elementDiv.id = "PanelWait";
	//if(Cor.IsMobile == true) elementDiv.style.marginBottom = "37px";
	
	// Wait panel
	this.TableWait = document.createElement("table");
	this.TableWait.setAttribute("align", "center");
	if(Cor.IsMobile == true || $(window).width() < 768) this.TableWait.style.paddingTop = "70px";
	else this.TableWait.style.paddingTop = "130px";
	
	this.TableWait.style.display = "block";
	if(Cor.IdLangue == "fr")
	{
		if(Cor.IsMobile == false) this.TableWait.style.width = "183px";
		else this.TableWait.style.width = "230px";
	}
	else if(Cor.IdLangue == "en") this.TableWait.style.width = "230px";
	
	// Icon
	var tdIcon = document.createElement("tr");
	
	tdIcon.setAttribute("align", "left");
	tdIcon.setAttribute("style", "vertical-align: top;");
	
	//ancien loader please wait
	/* var img = document.createElement("img");
	img.setAttribute("src", "images/progress.gif");
	img.style.marginRight = "37px";
	tdIcon.appendChild(img); */
	var loader = document.createElement("div");
	loader.id = "loader-1";
	loader.className = "loader";
	tdIcon.appendChild(loader);
	
	this.TableWait.appendChild(tdIcon);
	
	// Right Panel
	var tdLabel = document.createElement("tr");
	
	tdLabel.setAttribute("align", "left");
	tdLabel.setAttribute("style", "vertical-align: top;");
	
	var divTextWait = document.createElement("div");
	divTextWait.setAttribute("class", "Cor-LabelWait");
	if(Cor.IsMobile == true)
	{
		divTextWait.style.paddingTop = "5px";
		
	}

	var label = "Veuillez patienter...";
	if(Cor.IdLangue == "en") label = "Please wait...";
	
	divTextWait.innerHTML = label;
	
	tdLabel.appendChild(divTextWait);
	
	this.TableWait.appendChild(tdLabel);
	
	//divTable.appendChild(this.TableWait);
	elementDiv.appendChild(this.TableWait);
	
	// Panel with progress bar
	this.DivProgressBar = document.createElement("div");
	this.DivProgressBar.setAttribute("align", "center");
	this.DivProgressBar.className = "progress-bar-container";
	this.DivProgressBar.style.paddingTop = "130px";
	//this.DivProgressBar.style.display = "none";
	
	// Label
	var divTextWait = document.createElement("div");
	divTextWait.setAttribute("class", "Cor-LabelWait");
	divTextWait.style.marginBottom = "60px";
	
	var label = "Veuillez patienter...";
	if(Cor.IdLangue == "en") label = "Please wait...";
	
	divTextWait.innerHTML = label;
	
	this.DivProgressBar.appendChild(divTextWait);
	
	// Progress bar
	this.ProgressBar = document.createElement("div");
	this.ProgressBar.style.width = "350px";
	this.ProgressBar.style.height = "15px";
	this.ProgressBar.style.backgroundColor = "#f1f1f1";
	this.ProgressBar.style.borderRadius = "10px";
	this.ProgressBar.style.overflow = "hidden";
	this.ProgressBar.align = "left";
	
	// this.ProgressBar.style.borderColor = "#e6e6e6";
	// this.ProgressBar.style.borderWidth = "2px";
	// this.ProgressBar.style.borderStyle = "solid";
	
	// Div inside the progress bar
	var divInside = document.createElement("div");
	divInside.className = "progress-bar";
	
	divInside.style.width = "0px";
	divInside.style.height = "15px";
	
	this.ProgressBar.appendChild(divInside);
	
	this.DivProgressBar.appendChild(this.ProgressBar);

	elementDiv.appendChild(this.DivProgressBar);
	
	// Append to the main div
	var eltTextArea = document.getElementById('TextArea');
	
	eltTextArea.appendChild(elementDiv);
},

// Set Visible Panel Wait
SetVisible_PanelWait : function(visible, showProgressBar)
{
	// Append to the main div
	var eltTextArea = document.getElementById('MainDiv');
	
	var textArea = document.getElementById('FrameTx');
	
	var panelWait = document.getElementById("PanelWait");
	
	if(visible)
	{
		textArea.style.display = "none";
		panelWait.style.display = "block";
	}
	else
	{
		panelWait.style.display = "none";
		textArea.style.display = "block";
	}
	
	// Show progress bar or not
	if(visible == true)
	{
		if(showProgressBar)
		{
			this.TableWait.style.display = "none";
			this.DivProgressBar.style.display = "block";
		}
		else
		{
			this.TableWait.style.display = "block";
			this.DivProgressBar.style.display = "none";
		}
	}
},

// Set Visible the error label
SetVisible_ErrorLabel : function(visible)
{
	var eltErrorLabel = document.getElementById('errorLabel');
	if(eltErrorLabel != null)
	{
		if(visible == true) eltErrorLabel.style.visibility = "visible";
		else eltErrorLabel.style.visibility = "hidden";
	}
},

// Set the progress bar value
SetProgressBar_Value : function(percentage)
{
	var divInside = this.ProgressBar.firstChild;
	divInside.style.width = ((percentage/100)*300) + "px";
},

// Popup Panel of solutions
PopupPanelSol : function()
{
	////////////////////////////////////
	// Node explication of solution.  //
	////////////////////////////////////
	this.Node_ExpSol_Cor = document.createElement("div");
	this.Node_ExpSol_Cor.setAttribute("class", "Cor-PopupPanelExpSol");
	
	this.Node_ExpSol_Cor.style.overflow = 'visible';
	this.Node_ExpSol_Cor.style.position = 'absolute';
	this.Node_ExpSol_Cor.style.zIndex = '100';
	
	this.Node_ExpSol_Cor.onmouseover = function()
	{
		Cor.MouseOverItemSolution = true;
	}
	this.Node_ExpSol_Cor.onmouseout = function()
	{
		Cor.MouseOverItemSolution = false;
	}
	
	// Add to the body
	document.body.appendChild(this.Node_ExpSol_Cor);
	
	////////////////////////////////////
	// List of solutions Cor.  			  //
	////////////////////////////////////
	
	this.Node_ListSol_Cor = document.createElement("div");
	this.Node_ListSol_Cor.setAttribute("class", "Cor-PopupPanelListeSol");
	
	this.Node_ListSol_Cor.style.overflow = 'visible';
	this.Node_ListSol_Cor.style.position = 'absolute';
	this.Node_ListSol_Cor.style.zIndex = '100';
	
	this.Id_Cor = "";
	
	var divListSol = document.createElement("div");
	if(Cor.IsMobile == false) divListSol.style.fontSize = '16px';
	else divListSol.style.fontSize = '17px';
	
	this.Node_ListSol_Cor.appendChild(divListSol);
	
	// Add to the body
	document.body.appendChild(this.Node_ListSol_Cor);
	
	////////////////////////////////////
	// Function Set solutions         //
	////////////////////////////////////
	this.SetSolutions_Cor = function(vectSolution, expSol, node, id, posX, posY)
	{
		this.Id_Cor = id;
		
		// Set position
		var divTa = document.getElementById('FrameTx');
		var rect = divTa.getBoundingClientRect();
		var hGap = 24;
		if(Cor.IsMobile == true) hGap = 25;
		
		// High fontsize
		if(TextEditor.FontSize >= 20) hGap = hGap + 14;

		if(Cor.IsIE11 == false) {
			this.Node_ListSol_Cor.style.left = window.scrollX + rect.left + posX + 'px';
			this.Node_ListSol_Cor.style.top = window.scrollY + rect.top + posY + 30 + 'px';

			this.Node_ExpSol_Cor.style.left = window.scrollX + rect.left + posX + 'px';
			this.Node_ExpSol_Cor.style.top = window.scrollY + rect.top + posY + 30 + 22 + (20 * vectSolution.length) + (vectSolution.length*hGap) + 'px';
		} else {
			this.Node_ListSol_Cor.style.left = window.pageXOffset + rect.left + posX + 'px';
			this.Node_ListSol_Cor.style.top = window.pageYOffset + rect.top + posY + 30 + 'px';
		
			this.Node_ExpSol_Cor.style.left = window.pageXOffset + rect.left + posX + 'px';
			this.Node_ExpSol_Cor.style.top = window.pageYOffset + rect.top + posY + 30 + 22 + (20 * vectSolution.length) + (vectSolution.length*hGap) + 'px';
		}
		if ($(window).width() < 768) {
			console.log('mob');
			this.Node_ListSol_Cor.style.left = 'calc((100% - 310px) / 2)';
			this.Node_ExpSol_Cor.style.left = 'calc((100% - 310px) / 2)';
		}
		
		// High font size of ExpSol
		if(TextEditor.FontSize < 20) this.Node_ExpSol_Cor.style.fontSize = '10pt';
		else this.Node_ExpSol_Cor.style.fontSize = '17px';
		
		// Set explication.
		this.Node_ExpSol_Cor.innerHTML = expSol;
		
		// Set solutions. Max 5 solutions
		var divListSol = this.Node_ListSol_Cor.childNodes[0];
		
		// Clear elements.
		divListSol.innerHTML = '';
		
		var cntSol = 0;
		while(cntSol < vectSolution.length && cntSol < 5)
		{
			var solution = vectSolution[cntSol];
		
			var divSol = document.createElement("div");
			divSol.dataset.Sol = solution.Left;
			
			var div = document.createElement("div");
		
			div.innerHTML = solution.Right;
			div.setAttribute("class", "Cor-ListSolTr");
			
			// High Font size
			if(TextEditor.FontSize >= 20) div.style.fontSize = '19px';
			
			div.onmouseover = function()
			{
				Cor.MouseOverItemSolution = true;
			}
			div.onmouseout = function()
			{
				Cor.MouseOverItemSolution = false;
			}
			
			divSol.appendChild(div);
			
			// Click event
			divSol.onclick = function()
			{
				TextEditor.ReplaceWord(this.dataset.Sol, node, id, false, false);
			
				// Hide the popups
				Cor.PopupPanelSol.SetVisible(false, false, false, true);
			
				Cor.TexteModified = true;
				Stat.CheckedStat = false;
			}
			
			divListSol.appendChild(divSol);
			
			cntSol++;
		}
		
		// Show the popup
		this.SetVisible(true, true, false, false);
		
		// If no solution, hide the list sol panel.
		if(vectSolution.length == 0) this.Node_ListSol_Cor.hidden = true;
	}
	
	//////////////////////////////////////////
	// Node explication of style solution.  //
	//////////////////////////////////////////
	
	this.Node_ExpSol_Style = document.createElement("div");
	this.Node_ExpSol_Style.setAttribute("class", "Cor-PopupPanelExpSol");
	
	this.Node_ExpSol_Style.style.overflow = 'visible';
	this.Node_ExpSol_Style.style.position = 'absolute';
	this.Node_ExpSol_Style.style.zIndex = '100';
	// this.Node_ExpSol_Style.style.marginTop = "25px";
	// this.Node_ExpSol_Style.style.paddingBottom = "auto";
		
	this.Node_ExpSol_Style.onmouseover = function()
	{
		Cor.MouseOverItemSolution = true;
	}
	this.Node_ExpSol_Style.onmouseout = function()
	{
		Cor.MouseOverItemSolution = false;
	}
	
	// Add to the body
	document.body.appendChild(this.Node_ExpSol_Style);
	
	//////////////////////////////
	// List of style solutions. //
	//////////////////////////////
	/// 

	this.Node_ListSol_Style = document.createElement("div");
	this.Node_ListSol_Style.setAttribute("class", "Cor-PopupPanelListeSol");
	
	this.Node_ListSol_Style.style.overflow = 'visible';
	this.Node_ListSol_Style.style.position = 'absolute';
	this.Node_ListSol_Style.style.zIndex = '100';
	
	var divListSol = document.createElement("div");
	if(Cor.IsMobile == false) divListSol.style.fontSize = '16px';
	else divListSol.style.fontSize = '17px';
	
	this.Node_ListSol_Style.appendChild(divListSol);
	
	this.Id_Style = "";
	
	// Add to the body
	document.body.appendChild(this.Node_ListSol_Style);

	
	////////////////////////////////////
	// Function Set style solutions   //
	////////////////////////////////////
	this.SetSolutions_Style = function(vectSolution, type, expSol, node, id, posX, posY)
	{
		this.Id_Style = id;
		
		// Set position
		var divTa = document.getElementById('FrameTx');
	
		var rect = divTa.getBoundingClientRect();
		
		// The style popup is under the cor popup.
		var offSet = 0;
		// if(this.Node_ExpSol_Cor.hidden == false)
		// {
		// 	var topSt = this.Node_ExpSol_Cor.style.top;
		// 	offSet = parseInt(topSt.substr(0, topSt.length - 2)) + this.Node_ExpSol_Cor.clientHeight + 1;
		// }
		
		var hGap = 24;
		if(Cor.IsMobile == true) hGap = 25;
		
		// High fontsize
		if(TextEditor.FontSize >= 20) hGap = hGap + 4;
		
		var heightSol = vectSolution.length;
		if(vectSolution.length > 10) heightSol = 10;
		
		this.Node_ListSol_Style.classList.add("class", "second-infobulle");
		this.Node_ExpSol_Style.classList.add("class", "second-infobulle");
		if(Cor.IsIE11 == false)
		{
			this.Node_ListSol_Style.style.left = window.scrollX + rect.left + posX + 'px';
			
			if(offSet == 0) this.Node_ListSol_Style.style.top = window.scrollY + rect.top + posY + 30 + 'px';
			else this.Node_ListSol_Style.style.top = offSet + 'px';
		
			this.Node_ExpSol_Style.style.left = window.scrollX + rect.left + posX + 'px';
			
			if(offSet == 0) this.Node_ExpSol_Style.style.top = window.scrollY + rect.top + (posY + 30 + 11 + (heightSol*hGap)) + 'px';
			else
			{
				if(heightSol > 0) this.Node_ExpSol_Style.style.top = offSet + (11 + (heightSol*hGap)) + 'px';
				else this.Node_ExpSol_Style.style.top = offSet+ 'px';
			}
		}
		else
		{
			this.Node_ListSol_Style.style.left = window.pageXOffset + rect.left + posX + 'px';

			if(offSet == 0) this.Node_ListSol_Style.style.top = window.pageYOffset + rect.top + posY + 30 + 'px';
			else this.Node_ListSol_Style.style.top = offSet + 'px';
		
			this.Node_ExpSol_Style.style.left = window.pageXOffset + rect.left + posX + 'px';
			
			if(offSet == 0) this.Node_ExpSol_Style.style.top = window.pageYOffset + rect.top + (posY + 30 + 11 + (heightSol*hGap)) + 'px';
			else
			{
				if(heightSol > 0) this.Node_ExpSol_Style.style.top = offSet + (11 + (heightSol*hGap)) + 'px';
				else this.Node_ExpSol_Style.style.top = offSet + 'px';
			}
		}
		
		
		// High fontsize
		if(TextEditor.FontSize < 20) this.Node_ExpSol_Style.style.fontSize = '10pt';
		else this.Node_ExpSol_Style.style.fontSize = "17px";
		
		// Set solutions. Max 5 solutions
		var divListSol = this.Node_ListSol_Style.childNodes[0];
		
		// Clear elements.
		divListSol.innerHTML = '';
		
		if(vectSolution.length > 6)
		{
			divListSol.style.maxHeight = ((hGap + 19) * 6) + "px";
			//divListSol.style.maxHeight = "245px";
			divListSol.style.overflowY = "scroll";
		}
		else
		{
			divListSol.style.overflowY = "hidden";
		}
		
		var cntSol = 0;
		var instensitySolutions = false;
		
		if(vectSolution.length > 0)
		{
			while(cntSol < vectSolution.length)
			{
				var solution = vectSolution[cntSol];
			
				var divSol = document.createElement("div");
				divSol.dataset.Sol = solution.SolutionSt;
				
				var div = document.createElement("div");
			
				// High Font size
				if(TextEditor.FontSize >= 20) div.style.fontSize = '19px';
			
				div.innerHTML = solution.SolutionAffSt;
				
				var attributeSt = solution.AttributesSt;
				if(attributeSt == null)
				{
					if(type == 'Sentence') div.setAttribute("class", "Cor-ListSolTr_HighIntensity");	// Not necessary but logic.
					else div.setAttribute("class", "Cor-ListSolTr");
				}
				else
				{
					var fields = attributeSt.split(';');
					
					var fieldIntensity = fields[1];
					var indPv = fieldIntensity.indexOf(":");
					var intensity = fieldIntensity.substring(indPv + 1);
					var fieldNbOccurrences = fields[2];
					indPv = fieldNbOccurrences.indexOf(":");
					var nbOccurrences = parseInt(fieldNbOccurrences.substring(indPv + 1));
					
					// Vocabulary enhancement. Color by intensity.
					if(type == 'Vocabulary_enhancement')
					{
						if(intensity == '0') div.setAttribute("class", "Cor-ListSolTr_WeakIntensity");
						else if(intensity == '1' || intensity == '-1') div.setAttribute("class", "Cor-ListSolTr");
						else if(intensity == '2')
						{
							div.setAttribute("class", "Cor-ListSolTr_HighIntensity");
							instensitySolutions = true;
						}
					}
					// Repetitions. Color by nb occurrences.
					else if(type == 'WordRepetition' ||
					       (type.indexOf('Register_') == 0))
					{
						if(nbOccurrences > 0) div.setAttribute("class", "Cor-ListSolTr_HighIntensity");
						else div.setAttribute("class", "Cor-ListSolTr");
					}
					else div.setAttribute("class", "Cor-ListSolTr");
				}
				
				div.onmouseover = function()
				{
					Cor.MouseOverItemSolution = true;
				}
				div.onmouseout = function()
				{
					Cor.MouseOverItemSolution = false;
				}
				
				divSol.appendChild(div);
				
				// Click event
				divSol.onclick = function()
				{
					//TextEditor.ReplaceWord_Style(this.dataset.Sol);
					TextEditor.ReplaceWord(this.dataset.Sol, node, id, false, false);
				
					// Hide the popups
					Cor.PopupPanelSol.SetVisible(false, false, false, true);
				
					Cor.TexteModified = true;
					Stat.CheckedStat = false;
				}
				
				divListSol.appendChild(divSol);
				
				cntSol++;
			}
		}
		else
		{
			/*var labelNoSol = "Aucune suggestion";
			if(Cor.IdLangue == "en") labelNoSol = "No suggestion";
			
			var divSol = document.createElement("div");
			//divSol.innerHTML = labelNoSol;
			
			var div = document.createElement("div");
			
			div.innerHTML = labelNoSol;
			//div.setAttribute("class", "Cor-ListSolTr");
			
			divSol.appendChild(div);
				
			divListSol.appendChild(divSol);*/
			
		}
		
		// Set explication.
		this.Node_ExpSol_Style.innerHTML = expSol;
		
		if(instensitySolutions == true) this.Node_ExpSol_Style.innerHTML += Style.TexteComplementColorIntensity_EN;
		
		// Show the popup
		this.SetVisible(true, false, true, false);
		
		// If no solution, hide the list sol panel.
		if(vectSolution.length == 0) this.Node_ListSol_Style.hidden = true;
	}
	
	// Show or hide
	this.SetVisible = function(visible, cor, style, all)
	{
		if(cor == true && visible == true){
			$(this.Node_ExpSol_Cor).addClass('open');
			$(this.Node_ListSol_Cor).addClass('open');
		} else if(cor == true && visible == false) {
			$(this.Node_ExpSol_Cor).removeClass('open');
			$(this.Node_ListSol_Cor).removeClass('open');
		}
		if(cor == true || all == true)
		{
			this.Node_ExpSol_Cor.hidden = !visible;
			this.Node_ListSol_Cor.hidden = !visible;
		}
	
		if(style == true || all == true)
		{
			this.Node_ExpSol_Style.hidden = !visible;
			this.Node_ListSol_Style.hidden = !visible;
			this.Node_ListSol_Style.childNodes[0].scrollTop = "0px";
		}
	}
	
},

// Panel fo max character.
PanelMaxChar : function()
{
	this.PopupBase = new Util.PopupBase(0);
	
	// Title
	this.PopupBase.Node.style.padding = "5px";
	
	this.DivMessage = document.createElement("div");
	this.DivMessage.className = "Prem-TexteBasePremium";
	this.DivMessage.style.fontSize = "16px";
	this.DivMessage.style.fontWeight = "bold";
	this.DivMessage.align = "center";
	
	this.PopupBase.Node.childNodes[1].appendChild(this.DivMessage);
	
	// Button OK
	var divButton = document.createElement('div');
	divButton.setAttribute("align", "center");
	
	var tableButtons = document.createElement('table');
	tableButtons.style.marginTop = "40px";
	
	var tdButtonOK = document.createElement('td');
	var buttonOK = document.createElement('div');
	buttonOK.className = "Cor-RedButton";
	buttonOK.innerHTML = "OK";
	buttonOK.style.fontSize = "16px";
	buttonOK.style.width = "127px";
	buttonOK.style.textAlign = "center";
	buttonOK.style.marginLeft = "auto";
	buttonOK.style.marginRight = "auto";
	
	var th = this;
	buttonOK.onclick = function()
	{
		th.SetVisible(false);
		
		Cor.SetVisible_PanelWait(false, false);
		
		Cor.IsChecking = false;
		
		// Bug: When iframe is set to display = "none", and then set to display = "block", scrollbar disappears.
		// We must do a refresh on the text. In normal mode, refresh is made by underline elements, but here, we use a timer.
		
		//textArea.innerHTML = textArea.innerHTML + 'e';
		//textArea.contentDocument.body.style.display = "none";
		//textArea.contentDocument.body.style.display = "block";
		//var elt = document.getElementsByName('body');
		//elt[0].style.display = "block";
		//textArea.style.display = "initial";
		//textArea.style.width = "99%";
		//textArea.style.width = "100%";
		//textArea.style.border = "4px";
		
		// Refresh
		var textArea = document.getElementById('FrameTx');
		
		textArea.contentDocument.body.style.display = "none";
		setTimeout(function()
		{		
			var textArea = document.getElementById('FrameTx');
			textArea.contentDocument.body.style.display = "block";
		}, 10);
		
	}
	
	tdButtonOK.appendChild(buttonOK);
	tableButtons.appendChild(tdButtonOK);
	
	// Button discover Premium.
	var tdButtonVPremium = document.createElement('td');
	var buttonVPremium = document.createElement('div');
	buttonVPremium.className = "Cor-RedButton";
	buttonVPremium.innerHTML = "D" + String.fromCharCode(233) + "couvrir la version Premium >";
	//buttonVPremium.setAttribute("align", "center");
	buttonVPremium.style.fontSize = "16px";
	//buttonVPremium.style.width = "120px";
	buttonVPremium.style.marginLeft = "10px";
	buttonVPremium.style.textAlign = "center";
	buttonVPremium.style.display = "none";
	buttonVPremium.onclick = function()
	{
		th.SetVisible(false);
		
		Cor.SetVisible_PanelWait(false, false);
		
		Cor.IsChecking = false;
		
		Cor.Handler_VersionPremium(true, "");
	}
	
	tdButtonVPremium.appendChild(buttonVPremium);
		
	tableButtons.appendChild(tdButtonVPremium);
	
	divButton.appendChild(tableButtons);
	
	this.PopupBase.Node.childNodes[1].appendChild(divButton);

	// Update the message
	this.SetLimChar = function(limChar)
	{
		if(limChar == 200000) limChar = "200 000";
		var texteHTML = "<p>Le nombre de caract" + String.fromCharCode(232) + "res " + String.fromCharCode(224) + " traiter " + "ne doit pas exc" + String.fromCharCode(233) + "der " + limChar + ".</p>";
		
		if(Cor.ModeAbonnePremium == false) texteHTML = "<p>Merci d'utiliser Scribens. Votre texte d" + String.fromCharCode(233) + "passe le nombre de caract" + String.fromCharCode(232) + "res permis.</p>";
		
		// Demo.
		if(Cor.Demo && limChar == 200) texteHTML = "<p>La version de d" + String.fromCharCode(233) + "monstration est limit" + String.fromCharCode(233) + "e " + String.fromCharCode(224) + " " + limChar + " caract" + String.fromCharCode(232) + "res.</p>";
		
		// Informations commerciales suppl�mentaires.
		if(Cor.ModeAbonnePremium == false)
		{
			texteHTML += "<p>&nbsp;</p><p>Si vous souhaitez avoir une limite sup" + String.fromCharCode(233) + "rieure de caract" + String.fromCharCode(232) + "res (200 000) et b" + String.fromCharCode(233) + "n" + String.fromCharCode(233) + "ficier de toutes les autres fonctionnalit" + String.fromCharCode(233) + "s de Scribens, souscrivez d" + String.fromCharCode(232) + "s maintenant " + String.fromCharCode(224) + " la version Premium.</p>";
		}
		
		// English
		if(Cor.IdLangue == "en")
		{
			if(limChar == 20000) limChar = "20,000";	// just for ,
			texteHTML = "<p>Your text can't exceed the maximum number of " + limChar + " characters.</p>";
		}
		
		this.DivMessage.innerHTML = texteHTML;
		
		// Show the button doiscover Premium
		if((Cor.ModeAbonnePremium == false) && (Cor.IdLangue == "fr"))
		{
			buttonVPremium.style.display = "block";
		}
		else buttonVPremium.style.display = "none";
	}
	
	// Set visible
	this.SetVisible = function(visible)
	{
		this.PopupBase.SetVisible(visible);
	}
	
	document.body.appendChild(this.PopupBase.Node);
},

// Label of maximum character
LabelMaxChar : function()
{
	this.DivMessage = document.createElement("div");
	this.DivMessage.className = "Prem-TexteBasePremium";
	this.DivMessage.style.fontSize = "14px";
	this.DivMessage.style.fontWeight = "bold";
	this.DivMessage.style.display = "none";
	this.DivMessage.align = "center";
	
	// Show the message
	this.SetVisible = function(visible)
	{
		if(Cor.IdLangue == "fr")
		{
			this.DivMessage.innerHTML = "<p>Merci d'utiliser Scribens. Votre texte d" + String.fromCharCode(233) + "passe le nombre de caract" + String.fromCharCode(232) + "res permis.</p>";
		}
		else if(Cor.IdLangue == "en")
		{
			this.DivMessage.innerHTML = "<p>Your text can't exceed the maximum number of characters.</p>";
		}
		
		if(visible) this.DivMessage.style.display = "block";
		else this.DivMessage.style.display = "none";
	}
	
	var maindiv = document.getElementById("MainDiv");
	maindiv.appendChild(this.DivMessage);
},

// Popup of English sample
PopupMessageEnglish : function(text, type)
{
	this.PopupBase = new Util.PopupBase();
	
	var popup = document.createElement("div");
	
	// Message
	var divMessage = document.createElement("div");
	divMessage.className = "Prem-TexteBasePremium";
	divMessage.style.fontSize = "36px";
	divMessage.style.fontWeight = "bold";
	divMessage.style.marginBottom = "30px";
	divMessage.setAttribute("align", "center");
	divMessage.innerHTML = text;
	
	popup.appendChild(divMessage);
	
	// Red button
	var divTableButtons = document.createElement("div");
	divTableButtons.setAttribute("align", "center");
	divTableButtons.style.marginTop = "50px";
	divTableButtons.style.verticalAlign = "top";
	
	var tableButtons = document.createElement("table");
	var th = this;
	
	// Button OK
	var tdButtonOk = document.createElement("td");
	
	var buttonOK = document.createElement("div");
	buttonOK.setAttribute("class", "Cor-RedButton");
	buttonOK.style.width = "160px";
	buttonOK.style.textAlign = "center";
	buttonOK.style.marginLeft = "auto";
	buttonOK.style.marginRight = "auto";
	buttonOK.innerHTML = "OK";
	buttonOK.onclick = function()
	{
		// Show sample
		if(type == 0)
		{
			Cor.LoadSampleText();
		}
		// API
		else if(type == 1)
		{
			Cor.Handler_BtnExtensionsAPI(true);
		}
		
		th.SetVisible(false);
	}
	tdButtonOk.appendChild(buttonOK);
	tableButtons.appendChild(tdButtonOk);
	
	// Button Cancel
	var tdButtonCancel = document.createElement("td");
	
	var buttonCancel = document.createElement("div");
	buttonCancel.setAttribute("class", "Cor-RedButton");
	buttonCancel.style.width = "160px";
	buttonCancel.style.textAlign = "center";
	buttonCancel.style.marginLeft = "auto";
	buttonCancel.style.marginRight = "auto";
	buttonCancel.innerHTML = "Cancel";
	buttonCancel.onclick = function()
	{
		th.SetVisible(false);
	}
	tdButtonCancel.appendChild(buttonCancel);
	tableButtons.appendChild(tdButtonCancel);
	
	divTableButtons.appendChild(tableButtons);
	
	// Add the buttons
	popup.appendChild(divTableButtons);
	
	this.PopupBase.Node.childNodes[1].appendChild(popup);
	
	// Function show
	this.SetVisible = function(visible)
	{
		this.PopupBase.SetVisible(visible);
	}
	
	//popupBase.Node.style.visibility = "visible";
	document.body.appendChild(this.PopupBase.Node);
},

// Popup of French pub
PopupFrPub : function(type)
{
	this.PopupBase = new Util.PopupBase();
	
	var popup = document.createElement("div");
	popup.setAttribute("align", "center");
	
	// Title
	var title = document.createElement("div");
	title.className = "titre";
	title.style.fontSize = "20px";
	title.innerHTML = "Nouveau !";
	popup.appendChild(title);
	
	// Chrome extension
	if(type == 0)
	{
		// Message
		var divMessage = document.createElement("div");
		divMessage.className = "Prem-TexteBasePremium";
		divMessage.style.width = "500px";
		divMessage.style.fontSize = "17px";
		divMessage.style.fontWeight = "bold";
		divMessage.style.marginTop = "10px";
		divMessage.style.marginBottom = "45px";
		//divMessage.setAttribute("textAlign", "left");
		divMessage.innerHTML = "<p>Avec la nouvelle extension Google Chrome de Scribens, <br>vous pouvez désormais corriger vos textes en temps réel.</p><p></p><p>Pour l'installer, rendez-vous sur le chrome web store.</p>";
		
		popup.appendChild(divMessage);
		
		// Image
		var linkImg = document.createElement("a");
		linkImg.href = "https://chrome.google.com/webstore/detail/scribens-correcteur-dorth/djpeecijcbigpoijldkimmkilekocdao?hl=fr";
		linkImg.target = "_blank";
		var img = document.createElement("img");
		img.src = "images/pub/LinkPubFrExt.png";
		img.style.marginBottom = "50px";
		img.style.cursor = "pointer";
		linkImg.appendChild(img);
		popup.appendChild(linkImg);
		
		// Red button
		var divTableButtons = document.createElement("div");
		divTableButtons.setAttribute("align", "center");
		divTableButtons.style.verticalAlign = "top";
		
		var tableButtons = document.createElement("table");
		var th = this;
		
		// Button OK
		var buttonOK = document.createElement("div");
		buttonOK.setAttribute("class", "Cor-RedButton");
		buttonOK.style.width = "200px";
		buttonOK.style.paddingLeft = "40px";
		buttonOK.style.paddingRight = "40px";
		buttonOK.innerHTML = "FERMER";
		buttonOK.onclick = function()
		{
			th.SetVisible(false);
		}
		divTableButtons.appendChild(buttonOK);
		
		// Add the buttons
		popup.appendChild(divTableButtons);
	}
	// Scribens keyboard
	else if(type == 1)
	{
		this.PopupBase.Node.childNodes[1].style.padding = "70px";
		this.PopupBase.Node.childNodes[1].style.paddingLeft = "0px";
		this.PopupBase.Node.childNodes[1].style.paddingRight = "0px";
		this.PopupBase.Node.childNodes[1].style.paddingBottom = "0px";
		
		//this.PopupBase.Node.style.top = "100px";
		
		// Image
		var linkImg = document.createElement("a");
		linkImg.href = "https://play.google.com/store/apps/details?id=com.bleu122.scribens";
		linkImg.target = "_blank";
		var img = document.createElement("img");
		img.src = "images/pub/website_smartphone.gif";
		img.style.cursor = "pointer";
		linkImg.appendChild(img);
		popup.appendChild(linkImg);
	}
			
	this.PopupBase.Node.childNodes[1].appendChild(popup);
	
	// Function show
	this.SetVisible = function(visible)
	{
		this.PopupBase.SetVisible(visible);
		this.PopupBase.Node.style.top = "200px";
	}
	
	//popupBase.Node.style.visibility = "visible";
	document.body.appendChild(this.PopupBase.Node);
},


// Show or hide components of IHM
SetVisible_All : function(visible, stylePanel)
{
	
	// Hide popups
	if(visible == false)
	{
		if(Cor.PopupPanelSol != null) Cor.PopupPanelSol.SetVisible(false, false, false, true);
		
		// Hide the error label
		Cor.SetVisible_ErrorLabel(false);
	}
	
	// Hide the div style
	if(Cor.ModeAbonnePremium == true && stylePanel == true)
	{
		var divStyle = document.getElementById("StyleTexte");
		if(divStyle != null)
		{
			//if(visible == true) divStyle.style.visibility = "visible";
			//else divStyle.style.visibility = "hidden";
			
			if(visible == true)
			{
				//divStyle.style.display = "block";
				divStyle.style.visibility = "visible";
				document.getElementById("InfSup").style.display = "block";
			}
			else
			{
				//divStyle.style.display = "none";
				divStyle.style.visibility = "hidden";
				document.getElementById("InfSup").style.display = "none";
			}
		}
	}

},

// Import file
ImportFile : function()
{
	var inputFile = document.getElementById("Input_ImportFile");
	
	var nameFile = "";
    if ('files' in inputFile)
	{
		var file = inputFile.files[0];
		
		// Control of file type
		var fileType = file.type;
		var fileName = file.name;

		if((fileType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") ||	// Word (.docx)
		   (fileName.endsWith(".odt")) ||	// OpenOffice/LibreOffice
		   (fileType == "application/pdf") ||		// Pdf
		   (fileType == "application/vnd.openxmlformats-officedocument.presentationml.presentation") ||	// PowerPoint (.pptx)
		   (fileType == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") ||	// Excel (.xlsx)
		   (fileType == "text/plain") ||	// Text files
		   (fileType == "text/html"))
		{
			// Send the file to the server in order to calculate the devis.
			var xmlhttpRequest = new XMLHttpRequest();
			
			var urlWebSite = "https://www.scribens.fr";
			if(Cor.IdLangue == "en") urlWebSite = "https://www.scribens.com";
	
			xmlhttpRequest.open("POST", urlWebSite + "/Scribens/ImportDoc_Servlet", true);
			//xmlhttpRequest.open("POST", "http://localhost:8080/Scribens/ImportDoc_Servlet", true);

			xmlhttpRequest.onreadystatechange = function ()	 //Call a function when the state changes.
			{
				if (xmlhttpRequest.readyState == 4 && xmlhttpRequest.status == 200)
				{
					var response = xmlhttpRequest.response;
					if(response != null)
					{
						response = JSON.parse(response);
						
						if(response.indexOf("TEXT_LENGTH_LIMIT_EXCEEDED") != 0)
						{
							TextEditor.SetTextHTML(response);

							// iPhone and iPad. Cancel any action on the keyboard because the textarea musn't editable. (auto spellcheck problem)
							if(Cor.IsIOS == true && (Cor.IsMobile == true || Cor.IsTablet == true))
							{
								TextEditor.ExplanationPasteText = false;
								TextEditor.Document.body.setAttribute("contenteditable", "false");
								TextEditor.Document.body.style.cursor = "default";
							}
							
							Cor.Check(false);
						}
						// Text length limit exceeded.
						else
						{
							var labelMaxChar = response.substring(27);
						
							// Show components
							Cor.SetVisible_All(true, true);
							
							if(Cor.IsMobile == false)
							{
								if(Cor.PanelMaxCharI == null) Cor.PanelMaxCharI = new Cor.PanelMaxChar();
								Cor.PanelMaxCharI.SetLimChar(labelMaxChar);
								Cor.PanelMaxCharI.SetVisible(true);
							}
							// Smartphone
							else
							{
								if(Cor.LabelMaxCharI == null) Cor.LabelMaxCharI = new Cor.LabelMaxChar();
								Cor.LabelMaxCharI.SetVisible(true);
								
								Cor.SetVisible_PanelWait(false, false);
							}
						}
					}
					else Cor.SetVisible_PanelWait(false, false);
				}
				else Cor.SetVisible_PanelWait(false, false);
			};
			
			var formData = new FormData();
			formData.append("pf_file", file);
			
			if(Cor.IdLangue == "fr") formData.append(Cor.ModeAbonnePremium, "");
			else formData.append(false, "");
			
			formData.append(Cor.IdLangue, "");
			
			Cor.SetVisible_PanelWait(true, false);
		
			xmlhttpRequest.send(formData);
		}
		// File type not accepted
		else
		{
			if(Cor.IdLangue == "fr") alert("Le type de fichier n'est pas valide. Les fichiers autoris" + String.fromCharCode(233) + "s sont : docx, xlsx, pptx, odt, pdf, txt, html.");
			else if(Cor.IdLangue == "en") alert('This file type is not allowed. The supported files are: docx, xlsx, pptx, odt, pdf, txt, html.');
		}
       
	}
},

// Paste text
Paste : function()
{
	// Get the content of the clipboard. The browser asks an authorisation. execCommand doesn't work.
	navigator.clipboard.readText().then(text => {
		//alert(text);
		
		var textPaste = text.replace(/\r?\n/g, '<br>');
		textPaste = "<p>" +  textPaste + "</p>";
		
		TextEditor.Document.body.innerHTML = textPaste;
		
		// Setting autocorrect when pasting
		if(Cor.AutoCorrect_AfterPaste == true ||
		// Mode smarthone. Very usefull
		   Cor.IsMobile == true)
		{
			Cor.Check(false);
		}
	});
},

// Copy to clipboard
CopyClipboard : function()
{
	// var inputVal = document.getElementById('hidden-input');
	var copyText = document.getElementById("FrameTx").contentWindow.document.body.innerHTML;
	
	// Dont copy placeholder
	if((copyText == TextEditor.TextPlaceHolder_Fr && Cor.IdLangue == "fr") ||
	   (copyText == TextEditor.TextPlaceHolder_En && Cor.IdLangue == "en"))
	{
		return;
	}
	
	var StrippedString = copyText.replace(/<br>/g,"\r\n");
	StrippedString = StrippedString.replace(/\//g, ",");
	StrippedString = StrippedString.replace(/<,p><p>/g,"\r\n");
	StrippedString = StrippedString.replace(/(<([^>]+)>)/ig,"");
	// inputVal.value = StrippedString;
	// inputVal.select();
	// document.execCommand('copy');

	// Safari 3.0+ "[object HTMLElementConstructor]" 
	var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
	// Internet Explorer 6-11
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;
	
	if (isIE || isEdge || isSafari) {
		var aux = document.createElement("div");
		aux.setAttribute("contentEditable", true);
		aux.innerHTML = StrippedString;
		document.body.appendChild(aux);
		window.getSelection().selectAllChildren(aux);
		document.execCommand("copy");
		document.body.removeChild(aux);
	} else {
		navigator.clipboard.writeText(StrippedString).then(function () {
		}, function () {
		  alert('Votre navigateur n\'a pas accepté la copie dans le presse-papiers.');
		});
	}
},

// Print
Print : function()
{
	var inputText = document.getElementById("FrameTx").contentWindow.document.body.innerHTML; 
	childWindow = window.open('','childWindow','location=yes, menubar=yes, toolbar=yes');
	//childWindow.document.open();
	childWindow.document.write('<html><head></head><body>');
	childWindow.document.write(inputText.replace(/\n/gi,'<br>'));
	childWindow.document.write('</body></html>');
	// childWindow.document.close();
	childWindow.focus();
	childWindow.print();
	childWindow.close();
},

// Download popup
DownloadPopup : function()
{
	var divPremPopupVPremium = document.createElement('div');
	divPremPopupVPremium.setAttribute("class", "Prem-PopupVPremium popaction download-popup");
	
	// Div closer
	var divCloser = document.createElement('div');
	divCloser.setAttribute("class", "closer");
	var imgCloser = document.createElement('img');
	imgCloser.src = "images/CloseCrossWhite.png";
	imgCloser.style = "cursor: pointer; margin-right: 10px; margin-top: 10px;";
	divCloser.appendChild(imgCloser);
	divPremPopupVPremium.appendChild(divCloser);
	
	// Main div
	var mainDiv1 = document.createElement('div');
	mainDiv1.id = "checkboxs";
	mainDiv1.setAttribute("class", "maindiv");
	
	// Div téléchargement
	var div1 = document.createElement('div');
	var divLabelTel = document.createElement('div');
	divLabelTel.setAttribute("class", "titre");
	if(Cor.IdLangue == "fr") divLabelTel.innerHTML = "Téléchargement";
	else if(Cor.IdLangue == "en") divLabelTel.innerHTML = "Download";
	div1.appendChild(divLabelTel);
	mainDiv1.appendChild(div1);
	
	// pChoose
	var pChoose = document.createElement('p');
	pChoose.style = "margin-bottom:20px;";
	if(Cor.IdLangue == "fr") pChoose.innerHTML = "Veuillez choisir le format de téléchargement :";
	else if(Cor.IdLangue == "en") pChoose.innerHTML = "Choose the file format:";
	mainDiv1.appendChild(pChoose);
	
	// Form
	var formType = document.createElement('form');
	formType.setAttribute("class", "wrapp-checkbox");
	
	// Item 1
	var divItem1 = document.createElement('div');
	divItem1.setAttribute("class", "item");
	/*var divInput1 = document.createElement('input');
	divInput1.type = "radio";
	divInput1.name = "gStyle";
	divInput1.id = "txt";
	divInput1.value = "txt";
	divInput1.style = "cursor: pointer;";
	var label1 = document.createElement('label');
	label1.setAttribute("for", "txt");
	divInput1.appendChild(label1);
	divItem1.appendChild(divInput1);
	
	var pLabel1 = document.createElement('p');
	pLabel1.setAttribute("class", "label-checkbox");
	pLabel1.innerHTML = "txt (simple)";
	divItem1.appendChild(pLabel1);*/
	
	divItem1.innerHTML = "<input type='radio' name='gStyle' id='txt' value='txt' style='cursor: pointer;'><label for='txt'></label>" + 
						 "<p class='label-checkbox'>txt (simple)</p>";
	
	
	formType.appendChild(divItem1);
	
	// Txt selected by default
	divItem1.childNodes[0].checked = true;
	var labelCheckBox = divItem1.childNodes[2];
	labelCheckBox.style.cursor = "pointer";
	//labelCheckBox.setAttribute("userSelect", "none");
	labelCheckBox.onclick = function(){divItem1.childNodes[0].checked = true;};
	
	// Item 2
	var divItem2 = document.createElement('div');
	divItem2.setAttribute("class", "item");
	/*var divInput2 = document.createElement('input');
	divInput2.type = "radio";
	divInput2.name = "gStyle";
	divInput2.id = "doc";
	divInput2.value = "doc";
	divInput2.style = "cursor: pointer;";
	var label2 = document.createElement('label');
	label2.setAttribute("for", "doc");
	divInput2.appendChild(label2);
	divItem2.appendChild(divInput2);
	
	var pLabel2 = document.createElement('p');
	pLabel2.setAttribute("class", "label-checkbox");
	pLabel2.innerHTML = "doc (Word)";
	divItem2.appendChild(pLabel2);*/
	
	divItem2.innerHTML = "<input type='radio' name='gStyle' id='doc' value='doc' style='cursor: pointer;'><label for='doc'></label>" + 
						 "<p class='label-checkbox'>doc (Word)</p>";
	
	formType.appendChild(divItem2);
	
	labelCheckBox = divItem2.childNodes[2];
	labelCheckBox.style.cursor = "pointer";
	labelCheckBox.onclick = function(){divItem2.childNodes[0].checked = true;};
	
	// Item 3
	var divItem3 = document.createElement('div');
	divItem3.setAttribute("class", "item");
	/*var divInput3 = document.createElement('input');
	divInput3.type = "radio";
	divInput3.name = "gStyle";
	divInput3.id = "odt";
	divInput3.value = "odt";
	divInput3.style = "cursor: pointer;";
	var label3 = document.createElement('label');
	label3.setAttribute("for", "odt");
	divInput3.appendChild(label3);
	divItem3.appendChild(divInput3);
	
	var pLabel3 = document.createElement('p');
	pLabel3.setAttribute("class", "label-checkbox");
	pLabel3.innerHTML = "odt (Open Office/Libre Office)";
	divItem3.appendChild(pLabel3);*/
	
	divItem3.innerHTML = "<input type='radio' name='gStyle' id='odt' value='odt' style='cursor: pointer;'><label for='odt'></label>" + 
						 "<p class='label-checkbox'>odt (Open Office/Libre Office)</p>";
	
	formType.appendChild(divItem3);
	
	labelCheckBox = divItem3.childNodes[2];
	labelCheckBox.style.cursor = "pointer";
	labelCheckBox.onclick = function(){divItem3.childNodes[0].checked = true;};
	
	mainDiv1.appendChild(formType);
	
	divPremPopupVPremium.appendChild(mainDiv1);
	
	// Buttons
	var divButtons = document.createElement('div');
	divButtons.setAttribute("class", "buttons");
	var table = document.createElement('table');
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	var divB = document.createElement('div');
	divB.setAttribute("class", "Cor-RedButton");
	divB.id = "download-txt";
	divB.style = "padding-left: 40px; padding-right: 40px;";
	if(Cor.IdLangue == "fr") divB.innerHTML = "Télécharger";
	else if(Cor.IdLangue == "en") divB.innerHTML = "Download";
	td.appendChild(divB);
	tr.appendChild(td);
	table.appendChild(tr);
	divButtons.appendChild(table);
	
	divPremPopupVPremium.appendChild(divButtons);
	
	document.body.appendChild(divPremPopupVPremium);
},

// Download
Download : function()
{
	// Content
	var htmlString= document.getElementById("FrameTx").contentWindow.document.body.innerHTML;
	var stripedHtml_txt = htmlString.replace(/<br>/g, "\r\n");
	stripedHtml_txt = stripedHtml_txt.replace(/<[^>]+>/g, '');
	var stripedHtml = htmlString.replace(/<[^>]+>/g, '');

	// Specify format name
	var format = document.querySelector('input[name=gStyle]:checked').value;
	
	if(format == 'odt'){
		Cor.DownloadOdt('scribens.odt', stripedHtml_txt);
	} else if (format == 'doc'){
		Cor.DownloadDoc('scribens.doc', 'FrameTx');
	}else if (format == 'txt'){
		Cor.DownloadTxt('scribens.txt', stripedHtml_txt);
	} else {
		Cor.DownloadTxt('scribens.txt', stripedHtml_txt);
	}
	document.querySelector('.popaction').classList.remove("openpop"); 
},

// Download .txt
DownloadTxt : function(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
},

// Download .odt
DownloadOdt : function(filename, text) {
	var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Scribens</title></head><body>";
	var postHtml = "</body></html>";				
	var html = preHtml+text+postHtml;
	var blob = new Blob(['\ufeff', html], {
		type: 'application/msword'
	});
	// Specify link url
	var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
	// Create download link element
	var downloadLink = document.createElement("a");
	document.body.appendChild(downloadLink);
	if(navigator.msSaveOrOpenBlob ){
		navigator.msSaveOrOpenBlob(blob, filename);
	}else{
		// Create a link to the file
		downloadLink.href = url;
		// Setting the file name
		downloadLink.download = filename;
		//triggering the function
		downloadLink.click();
	}
},

// Download docx
DownloadDoc : function(filename, elId) {
	var elHtml = document.getElementById(elId).contentWindow.document.body.innerHTML;
	// var link = document.createElement('a');
	// link.setAttribute('download', filename);
	// link.setAttribute('href', 'data:' + 'text/doc' + ' content="text/html;' + ';charset=Windows-1252,' + encodeURIComponent(elHtml));
	// document.body.appendChild(link);
	// link.click(); 
	// document.body.removeChild(link);
	var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='UTF-8'><title>Export HTML To Doc</title></head><body>";
	var postHtml = "</body></html>";				
	var html = preHtml+elHtml+postHtml;
	var blob = new Blob(['\ufeff', html], {
		type: 'application/msword'
	});
	// Specify link url
	var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
	// Create download link element
	var downloadLink = document.createElement("a");
	document.body.appendChild(downloadLink);
	if(navigator.msSaveOrOpenBlob ){
		navigator.msSaveOrOpenBlob(blob, filename);
	}else{
		// Create a link to the file
		downloadLink.href = url;
		// Setting the file name
		downloadLink.download = filename;
		//triggering the function
		downloadLink.click();
	}
},

SharePopup : function()
{
	var divPremPopupVPremium = document.createElement('div');
	divPremPopupVPremium.setAttribute("class", "Prem-PopupVPremium popaction share-pop");
	
	// Div closer
	var divCloser = document.createElement('div');
	divCloser.setAttribute("class", "closer");
	var imgCloser = document.createElement('img');
	imgCloser.src = "images/CloseCrossWhite.png";
	imgCloser.style = "cursor: pointer; margin-right: 10px; margin-top: 10px;";
	divCloser.appendChild(imgCloser);
	divPremPopupVPremium.appendChild(divCloser);
	
	// Main div
	var mainDiv1 = document.createElement('div');
	mainDiv1.setAttribute("class", "maindiv");
	
	// Title
	var div1 = document.createElement('div');
	var divLabelTel = document.createElement('div');
	divLabelTel.setAttribute("class", "titre");
	if(Cor.IdLangue == "fr") divLabelTel.innerHTML = "Partager";
	else if(Cor.IdLangue == "en") divLabelTel.innerHTML = "Share";
	div1.appendChild(divLabelTel);
	mainDiv1.appendChild(div1);
	
	// Text description
	var pDesc = document.createElement('p');
	pDesc.style.marginBottom = "25px";
	pDesc.style.textAlign = "center";
	if(Cor.IdLangue == "fr") pDesc.innerHTML = "Choisissez une des applications suivantes :"
	else if(Cor.IdLangue == "en") pDesc.innerHTML = "Choose how you want to share:"
	mainDiv1.appendChild(pDesc);	
			
	// Message apps
	
	var ulMessageApp = document.createElement('ul');
	ulMessageApp.setAttribute("class", "social-share");
	
	// Outlook
	var liShareOutlook = document.createElement('li');
	liShareOutlook.id = "share-outlook";
	var divShareOutlook = document.createElement('div');
	divShareOutlook.setAttribute("class", "icon share-outlook");
	var imgShareOutlook = document.createElement('img');
	imgShareOutlook.src = "images/icone/outlook.svg";
	imgShareOutlook.alt = "";
	divShareOutlook.appendChild(imgShareOutlook);
	var labelShareOutlook = document.createTextNode(" Outlook");
	divShareOutlook.appendChild(labelShareOutlook);
	var pShareOutlook = document.createElement('p');
	if(Cor.IdLangue == "fr") pShareOutlook.innerHTML = "La taille d'exportation est limitée à 1500 caractères.";
	else if(Cor.IdLangue == "en") pShareOutlook.innerHTML = "Sorry, the limit for sharing is 1500 characters.";
	divShareOutlook.appendChild(pShareOutlook);
	liShareOutlook.appendChild(divShareOutlook);
	ulMessageApp.appendChild(liShareOutlook);
	
	// Gmail
	var liShareGmail = document.createElement('li');
	liShareGmail.id = "share-gmail";
	var divShareGmail = document.createElement('div');
	divShareGmail.setAttribute("class", "icon share-gmail");
	var imgShareGmail = document.createElement('img');
	imgShareGmail.src = "images/icone/gmail.svg";
	imgShareGmail.alt = "";
	divShareGmail.appendChild(imgShareGmail);
	var labelShareGmail = document.createTextNode(" Gmail");
	divShareGmail.appendChild(labelShareGmail);
	var pShareGmail = document.createElement('p');
	if(Cor.IdLangue == "fr") pShareGmail.innerHTML = "La taille d'exportation est limitée à 5500 caractères.";
	else if(Cor.IdLangue == "en") pShareGmail.innerHTML = "Sorry, the limit for sharing is 5500 characters.";
	divShareGmail.appendChild(pShareGmail);
	liShareGmail.appendChild(divShareGmail);
	ulMessageApp.appendChild(liShareGmail);
	
	// Yahoo
	var liShareYahoo = document.createElement('li');
	liShareYahoo.id = "share-yahoo";
	var divShareYahoo = document.createElement('div');
	divShareYahoo.setAttribute("class", "icon share-yahoo");
	var imgShareYahoo = document.createElement('img');
	imgShareYahoo.src = "images/icone/yahoo.svg";
	imgShareYahoo.alt = "";
	divShareYahoo.appendChild(imgShareYahoo);
	var labelShareYahoo = document.createTextNode(" Yahoo");
	divShareYahoo.appendChild(labelShareYahoo);
	var pShareYahoo = document.createElement('p');
	if(Cor.IdLangue == "fr") pShareYahoo.innerHTML = "La taille d'exportation est limitée à 2000 caractères.";
	else if(Cor.IdLangue == "en") pShareYahoo.innerHTML = "Sorry, the limit for sharing is 2000 characters.";
	divShareYahoo.appendChild(pShareYahoo);
	liShareYahoo.appendChild(divShareYahoo);
	ulMessageApp.appendChild(liShareYahoo);
	
	mainDiv1.appendChild(ulMessageApp);
	
	// Social networks
	
	var ulSocialNetworks = document.createElement('ul');
	ulSocialNetworks.setAttribute("class", "social-share");
	
	// Twitter
	var liShareTwitter = document.createElement('li');
	liShareTwitter.id = "share-twitter";
	var divShareTwitter = document.createElement('div');
	divShareTwitter.setAttribute("class", "icon share-twitter");
	var imgShareTwitter = document.createElement('img');
	imgShareTwitter.src = "images/icone/twitter.svg";
	imgShareTwitter.alt = "";
	divShareTwitter.appendChild(imgShareTwitter);
	var labelShareTwitter = document.createTextNode(" Twitter");
	divShareTwitter.appendChild(labelShareTwitter);
	var pShareTwitter = document.createElement('p');
	if(Cor.IdLangue == "fr") pShareTwitter.innerHTML = "La taille d'exportation est limitée à 280 caractères.";
	else if(Cor.IdLangue == "en") pShareTwitter.innerHTML = "Sorry, the limit for sharing is 280 characters.";
	divShareTwitter.appendChild(pShareTwitter);
	liShareTwitter.appendChild(divShareTwitter);
	ulSocialNetworks.appendChild(liShareTwitter);
	
	// LinkedIn
	var liShareLinkedIn = document.createElement('li');
	liShareLinkedIn.id = "share-linkedin";
	var divShareLinkedIn = document.createElement('div');
	divShareLinkedIn.setAttribute("class", "icon share-linkedin");
	var imgShareLinkedIn = document.createElement('img');
	imgShareLinkedIn.src = "images/icone/linkedin.svg";
	imgShareLinkedIn.alt = "";
	divShareLinkedIn.appendChild(imgShareLinkedIn);
	var labelShareLinkedIn = document.createTextNode(" LinkedIn");
	divShareLinkedIn.appendChild(labelShareLinkedIn);
	var pShareLinkedIn = document.createElement('p');
	if(Cor.IdLangue == "fr") pShareLinkedIn.innerHTML = "La taille d'exportation est limitée à 5000 caractères.";
	else if(Cor.IdLangue == "en") pShareLinkedIn.innerHTML = "Sorry, the limit for sharing is 5000 characters.";
	divShareLinkedIn.appendChild(pShareLinkedIn);
	liShareLinkedIn.appendChild(divShareLinkedIn);
	ulSocialNetworks.appendChild(liShareLinkedIn);
	
	mainDiv1.appendChild(ulSocialNetworks);
	
	divPremPopupVPremium.appendChild(mainDiv1);
	
	document.body.appendChild(divPremPopupVPremium);
},

// Share
Share : function()
{
	// Content
	var htmlString = document.getElementById("FrameTx").contentWindow.document.body.innerHTML;
	var compareString = htmlString.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, " ");

	if (document.getElementsByClassName('sidebar')[0].style.length) {
		var stripedHtml_txt = htmlString.replace(/<br>/g, "%0A");
	} else {
		var stripedHtml_txt = htmlString.replace(/<\/p><p>/g, "%0A").replace(/<br>/g, "%0A");
		// var stripedHtml_txt = htmlString.replace(/<\/p><p>/g, "<br>");
	}
	// console.log(decodeURIComponent(stripedHtml_txt));
	// 
	var stripedHtml = encodeURIComponent(stripedHtml_txt.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, " ")).replace(/%250A/g, '%0A');
	
	console.log(stripedHtml);
	
	// Outlook
	if (compareString.length > 1500) {
		$('.share-outlook').addClass('disabled');
		document.getElementById("share-outlook").onclick = function() {};
	} else {
		$('.share-outlook').removeClass('disabled');
		document.getElementById("share-outlook").onclick = function() {
			var link = 'http://outlook.live.com/mail/0/deeplink/compose?body=' + stripedHtml;
			window.open(link, '_blank');
		}; 
	}
	
	// Gmail
	if (compareString.length > 5500) {
		$('.share-gmail').addClass('disabled');
		document.getElementById("share-gmail").onclick = function() {};
	} else {
		$('.share-gmail').removeClass('disabled');
		document.getElementById("share-gmail").onclick = function() {
			var link = 'https://mail.google.com/mail/?view=cm&body=' + stripedHtml;
			window.open(link, '_blank');
		}; 
	}
	
	// Yahoo
	if (compareString.length > 2000) {
		$('.share-yahoo').addClass('disabled');
		document.getElementById("share-yahoo").onclick = function() {};
	} else {
		$('.share-yahoo').removeClass('disabled');
		document.getElementById("share-yahoo").onclick = function() {	
			var link = 'http://compose.mail.yahoo.com/?body=' + stripedHtml;
			window.open(link, '_blank');
		}; 
	}

	// Twitter
	if (compareString.length > 280) {
		$('.share-twitter').addClass('disabled');
		document.getElementById("share-twitter").onclick = function() {};
	} else {
		$('.share-twitter').removeClass('disabled');
		document.getElementById("share-twitter").onclick = function() {
			var link = 'https://twitter.com/intent/tweet?text=' + stripedHtml;
			window.open(link, '_blank');
		}; 
	}
	
	// LinkedIn
	if (compareString.length > 5000) {
		$('.share-linkedin').addClass('disabled');
		document.getElementById("share-linkedin").onclick = function() {};
	} else {
		$('.share-linkedin').removeClass('disabled');
		document.getElementById("share-linkedin").onclick = function() {
			var link = 'https://www.linkedin.com/messaging/thread/new/?body=' + stripedHtml;
			window.open(link, '_blank');
		}; 
	}
	
	document.querySelector('.popaction.share-pop').classList.add("openpop"); 

}



}
