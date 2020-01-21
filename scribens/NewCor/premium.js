var Premium = {

	// Indicateur de progression en cours.
	IdentificationProgress : false,
	
	// Popup of identification.
	PopupIdentificationI : null,
	
	// Popup of reinit password
	PopupReinitPasswordI : null,
	
	// Popup of shift password
	PopupShiftPasswordI : null,
	
	// Popup of confirmation inscription.
	PopupConfirmationInscriptionI : null,
	
	// Panel de pr�sentation du Premium
	PresentationPremiumI : null,
	
	// Popup de d�sinscription
	PopupDesinscriptionI : null,
	
	// Popup on CGV.
	PopupCGV : null,
	
	// Panel Mon compte
	PanelMonCompteI : null,
	
	// Panel of extension & API English
	PanelExtensionAPIEnI : null,
	
	// Indicator of password reinit.
	ReinitMdp : false,
	
	// Subescribed : set if the user has suscribed
	Subscribed : false,

	ResultIdentification : function(vectResult)
	{
		Premium.IdentificationProgress = false;
				
		var result = vectResult[0];
		
		// 5 résultats possibles
		// 1. Abonnement premium non expiré
		if((result == "True") ||
		   // 2. Abonnement premium expiré
		   (result == "TimeExpired") ||
		   // 3. Inscription simple sans abonnement premium
		   (result == "InscriptionSimple"))
		{
			// Donn�es Users.
			Cor.User.UserName = vectResult[2];
			Cor.User.Identifiant = vectResult[7];
			Cor.User.MotDePasse = vectResult[8];
			Cor.User.TypeAbonnement = vectResult[9];
			Cor.User.DateExpiration = vectResult[10];
			Cor.User.DateExpirationDernierAbn = vectResult[11];
			// D�termine si l'User dispose de l'ancien tarif.
			Cor.User.AncienTarif = JSON.parse(vectResult[12]);
			Cor.User.InfEvolutions = JSON.parse(vectResult[13]);
			
			// Cache la fen�tre d'identification
			if(Premium.PopupIdentificationI != null)
			{
				Premium.PopupIdentificationI.SetVisible(false);
			}
	
			if(Plugins.Type == null && Cor.IsMobile == false)
			{		
				var flag = false;		
				Premium.SetLabelBtnVersionPremium("Mon compte", flag);
				Premium.SetLabelBtnConnexion("Se D" + String.fromCharCode(233) + "connecter");
			}
			
			Cor.Connexion = true;
			
			if(result == "InscriptionSimple")
			{
				if(Plugins.Type != null)
				{
					/*PresentationCor.EnableAll(false, true, false, true);*/		// TODO. Not necessary.
					
					// Affichage de la fen�tre d'identification
					if(Premium.PopupIdentificationI == null) Premium.PopupIdentificationI = new Premium.PopupIdentification();
				
					Premium.PopupIdentificationI.SetVisible(true);
				}
			}
			
			// Avertit l'User que son abonnement est expir�
			if(result == "TimeExpired")
			{
				// Mode plugin
				/*if(Plugins.Type != null) PresentationCor.EnableAll(false, true, false, true);	// TODO*/
				
				var popupMsgExpiration = new Util.MessageWindowConfirmation("Votre abonnement Premium est expir" + String.fromCharCode(233) + ".", 0);
				popupMsgExpiration.SetVisible(true);
				
				// Envoie une requ�te pour r�ininitialiser la date d'expiration � NULL.
				Util.SendHttpRequest('Identification_Servlet',
							[['FunctionName', 'MajData'],
							 ['DataName', 'Expiration'],
							 ['DataValue', 'NULL'],
							 ['TableName', 'abonnement_client'],
							 ['Id', Cor.User.Identifiant]],
							 null);
				
				// Envoie une requ�te pour r�ininitialiser le type d'abonnement � NULL.
				Util.SendHttpRequest('Identification_Servlet',
							[['FunctionName', 'MajData'],
							 ['DataName', 'TypeAbonnement'],
							 ['DataValue', 'NULL'],
							 ['TableName', 'abonnement_client'],
							 ['Id', Cor.User.Identifiant]],
							 null);
			}
			
			// Enregistre dans un cookie. La date d'expiration est 2050.
			if(!(Cor.User.Identifiant.indexOf("[WEBSITE]") == 0))
			{
				var chCookie = Cor.User.Identifiant + "|" + Cor.User.MotDePasse;
				Util.SetCookie("IdentificationScribens", chCookie, 5000);
			}
			
			// Met � jour les informations sur l'User
			//UpdateInformationsCompte();
			
			// Se met en mode abonn�
			if(result == "True")
			{
				// Se place en mode abonn�
				Cor.ModeAbonnePremium = true;
				
				// Initialise le mode abonne
				Premium.InitModeAbonnePremium();
				
				//RootPanel.get("ImagesGauches").getElement().getStyle().setTop(205, Unit.PX);
				//RootPanel.get("VersionPremium").setVisible(false);
				//RootPanel.get("DemoGoogleChrome").setVisible(false);
				//RootPanel.get("LienQuestionnaire").setVisible(false);
				
				// En mode plugin, d�grise tout apr�s la 1ere identification.
				/*if(PresentationModePlugin.FirstIdentification == true)	// TODO. Not necessary.
				{
					PresentationCor.EnableAll(true, true, true, true);
				}*/
			}
			
			// Panneau d'identification d�j� inscrit (� c�t� du formulaire d'inscription).
			// Identification r�ussie -> transpose � la page du compte.
			if((result == "InscriptionSimple") || (result == "True"))
			{
				if(Premium.PopupIdentificationI != null &&
				   Premium.PopupIdentificationI.IsVisible())
				{
					var labelError = document.getElementById("LabelErrorId2");
					labelError.style.display = "none";
				}
			}
			
			// Instructions pour utiliser le compte Premium : dans l'email de confirmation de la cr�ation du compte Premium.
			if((result == "True") && (Cor.MonCompte == true))
			{
				Cor.Handler_VersionPremium(false);
			}
			
			// Confirmation d'inscription
			if(Cor.ParameterUrl != null && (Cor.ParameterUrl.indexOf("@") >= 0)) Premium.ConfirmationInscription();

			//change number of tabs option when login
			$('.Cor-TabOptions').removeClass('tabs-number-1').addClass('tabs-number-3');

			//show tabs Options_Slider on login
			$('#Options_Slider').show();

			//Show sidebar when login
			$('.sidebar').show();
			
		}
		// 4. Il ne faut pas qu'un autre User utilise la session.
		else if(result == "SessionActive")
		{
			if(Premium.PopupIdentificationI != null &&
			   Premium.PopupIdentificationI.IsVisible())
			{
				var labelError = document.getElementById("LabelErrorId2");
				labelError.innerHTML = "<p><b>Scribens est en cours d'utilisation</b></p><p><b>par un autre utilisateur.</b></p>";
				labelError.style.display = "block";
			}
			// Au d�marrage du site
			else
			{
				var messageWndConf = new Util.MessageWindowConfirmation("<p>Scribens est en cours d'utilisation par un autre utilisateur.</p>", 0);
				messageWndConf.SetVisible(true);
			}
			
			// Mode plugin
			/*if(Plugins.Type != null) PresentationCor.EnableAll(false, true, false, true);*/	// TODO
		}
		// 5. Identification invalide : message d'erreur.
		else
		{
			// Panneau d'identification
			if(Premium.PopupIdentificationI != null &&
			   Premium.PopupIdentificationI.IsVisible())
			{
				var labelError = document.getElementById("LabelErrorId2");
				labelError.innerHTML = "<b>Identification invalide</b>";
				labelError.style.display = "block";
			}
			
			// Panneau d'identification d�j� inscrit (� c�t� du formulaire d'inscription)
			var mainDiv = document.getElementById("MainDiv");
			if(mainDiv.childNodes[5] == Premium.CompteConnexionPremiumI)
			{
				var labelErrorIdInv = document.getElementById("LabelErrorId1");
				if(labelErrorIdInv != null)
				{
					labelErrorIdInv.style.visibility = "visible";
				}
			}
			
			// Mode plugin
			/*if(Plugins.Type != null)
			{
				PresentationCor.EnableAll(false, true, false, true);
				// Affichage de la fen�tre d'identification
				if(PresentationPremium.PopupIdentification == null)
				{
					PresentationPremium.PopupIdentification = new PopupIdentification();
				}
				if(!PresentationPremium.PopupIdentification.isVisible()) PresentationPremium.PopupIdentification.Show();
			}*/
		}
		
		// Non abonn� : Affichage de la publicit� Habillage.
		if(result != "True")
		{
			document.getElementById("pub1").style.display = "block";
			if(Cor.IdLangue == "fr")
			{
				document.getElementById("pub2").style.display = "block";
				document.getElementById("pub3").style.display = "block";
			}
		
			// On place le script SublimSkinz dans le body. Dans le passback du script, qui s'execute quand aucune pub fullpage n'est disponible, on affiche la pub haute et droite.
			/*if(Cor.IdLangue == "en" ||
			  (Cor.IdLangue == "fr" && !Cor.IsDesktop))
			{
				document.getElementById("pub1").style.display = "block";
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
					//document.body.appendChild(scriptAdSkin);
					document.body.insertBefore(scriptAdSkin, document.body.firstChild);
				}
				else
				{
					var pub3 = document.getElementById("pub3");
					if(pub3 != null) pub3.style.display = "block";
				}
			}*/
		}
	},
	
	// Init the premium mode.
	InitModeAbonnePremium : function()
	{
		if(Cor.IsMobile == true) return;
	
		if(Cor.InitModeAbonne == false)
		{
			Cor.InitModeAbonne = true;
			
			// Initialisation du panneau des transformations
			if(Style.Initialized == false) Style.Init();
			
			// Initialisation du panneau de statistique de gauche
			if(Stat.PanelStat == null) Stat.Init();
		}

		//DISPLAY "OUTILS" MENU
		$('.menuprem').removeClass('menuprem');

		//HIDE ADs IF PREMIUM
		$('.side-pub').hide();
		if ($('body').is('#ortographe')) {
			$('.container-interface .sidebar').show();
		}

		//SHOW ACTIONS BUTTONS IF PREMIUM
		$('#actions').removeClass('hidden');

		// Show Style panel
		var divStyle = document.getElementById("StyleTexte");
		if(Cor.IsTablet == true) divStyle = document.getElementById("DivStyleStat");
		
		if(Plugins.Type == null) divStyle.style.display = "block";		// For plugin, show only after first check.
	
		// Show Panel Stat and syn.
		if(Cor.IsTablet == false) document.getElementById("InfSup").style.display = "block";
		
		// Non affichage de la partie "Titre".
		var titreLabel = document.getElementById("TitreLabel");
		if(titreLabel) titreLabel.style.display = "none";
		
		// Non affichage de la pub
		document.getElementById("pub1").style.display = "none";
		if(Cor.IdLangue == "fr") $("#pub2").css('display', 'none');
		if(Cor.IdLangue == "fr")
		{
			var pub3 = document.getElementById("pub3");
			if(pub3 != null) pub3.style.display = "none";
		}
		
		// Affichage du menu outil.
		// document.getElementById("btnout").style.visibility = "visible";
		//document.getElementById("sub-btnout").style.visibility = "visible";
		document.getElementById("sub-btnout").style.display = "none";
		document.getElementById("sub-btnout").style.visibility = "visible";
		
		// Affichage de l'ic�ne d'importation.
		// if(Cor.IdLangue == "fr") document.getElementById("LabelInput_ImportFile").style.display = "block";
		
		if(Cor.IsTablet == true) document.getElementById("Titre").style.paddingTop = "30px";
		
		// Register handle des boutons du menu outils.
		Premium.Register_ClickHandlerBtn_Outils();
		
		// Hide citation button.
		Dict.ShowButtonCit(true);
		
		// Show exercices button in rules panel.
		Rules.ShowExercicesButton(true);
		
		// Set options Premium
		Options.SetModeAbonne(true);
		
	
		// Lance un timer qui envoie un signal toutes les 10s pour avertir que la session est bien active.
		Cor.TimerIdentification = setInterval(function()
		{
			Util.SendHttpRequest('Identification_Servlet',
							[['FunctionName', 'SignalSessionActive'],
							 ['Id', Cor.User.Identifiant]],
							 null);
			
		}, 10000);
	
	},
	
	
	// Confirmation d'inscription
	ConfirmationInscription : function()
	{
		// Show a popup of confirmation inscription.
		if(Premium.PopupConfirmationInscriptionI == null) Premium.PopupConfirmationInscriptionI = new Premium.PopupConfirmationInscription();
		
		Cor.Handler_VersionPremium();
		
		if(Cor.ModeAbonnePremium == false)
		{
			document.getElementById("pub3").style.display = "block";
		}
		
		Premium.PopupConfirmationInscriptionI.SetVisible(true);
		
		// Affiche le nouveau compte de l'User
		// Premium.UpdateInformationsCompte();
	},
	
	// Popup of confirmation inscription
	PopupConfirmationInscription : function()
	{
		this.PopupBase = new Util.PopupBase();
		this.PopupBase.Node.style.padding = "5px";
		
		var divMessage = document.createElement("div");
		divMessage.className = "Prem-TexteBasePremium";
		divMessage.style.fontSize = "16px";
		
		var confirmationInscription = "";
		confirmationInscription += "<p><b>Merci. Votre inscription a " + String.fromCharCode(233) + "t" + String.fromCharCode(233) + " valid" + String.fromCharCode(233) + "e</b>.<Br><Br>";
		confirmationInscription += "Vous devez maintenant proc" + String.fromCharCode(233) + "der au <b>paiement de votre abonnement</b> :<Br><Br>";
		confirmationInscription += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + String.fromCharCode(8226) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V" + String.fromCharCode(233) + "rifiez que l'abonnement s" + String.fromCharCode(233) + "lectionn" + String.fromCharCode(233) + " est bien celui que vous souhaitez.<Br>"; 
		confirmationInscription += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + String.fromCharCode(8226) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cochez la case des <b>CGV</b> si les conditions de vente vous conviennent.<Br>";
		confirmationInscription += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + String.fromCharCode(8226) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cliquez sur <b>Acheter</b>.<Br><Br>";
		confirmationInscription += "Vous serez alors dirig" + String.fromCharCode(233) + " vers notre plate-forme de paiement 100 % s" + String.fromCharCode(233) + "curis" + String.fromCharCode(233) + "e.</p>";
		
		divMessage.innerHTML = confirmationInscription;
		
		this.PopupBase.Node.childNodes[1].appendChild(divMessage);
		
		// Button OK
		var divButton = document.createElement('div');
		divButton.setAttribute("align", "center");
		
		var buttonOK = document.createElement('div');
		buttonOK.className = "Cor-RedButton";
		buttonOK.innerHTML = "OK";
		buttonOK.setAttribute("align", "center");
		buttonOK.style.fontSize = "16px";
		buttonOK.style.width = "120px";
		buttonOK.style.marginTop = "20px";
		buttonOK.style.textAlign = "center";
		
		//buttonOK.style.marginLeft = "275px";
		var th = this;
		buttonOK.onclick = function()
		{
			th.SetVisible(false);
		};
		
		divButton.appendChild(buttonOK);
		
		this.PopupBase.Node.childNodes[1].appendChild(divButton);
		
		this.SetVisible = function(visible)
		{
			this.PopupBase.SetVisible(visible);
		};
		
		document.body.appendChild(this.PopupBase.Node);
	},
	
	// Met � jour le label du bouton de Version premium. True: label "version premium", False: "Mon compte". 
	SetLabelBtnVersionPremium : function(labelSt, flag)
	{
		if(flag==false){ // si le flag est a false on affichera l'icone associéee a mon compte
			// icone
			var iconeCompte = document.createElement("div");
			iconeCompte.id = "compte";
			// Bouton connexion
			var btnConnexion = document.getElementById('btnvp');
			// btnConnexion.style.width = "170px";
			btnConnexion.appendChild(iconeCompte);
			btnConnexion.childNodes[0].nodeValue = labelSt;
		}else{ // sinon le label sera seul
			var btnConnexion = document.getElementById('btnvp');
			btnConnexion.childNodes[0].nodeValue = labelSt;
		}
	},
	
	// Met � jour le label du bouton de connexion. True : label "Se connecter". False : label "Se d�connecter".
	SetLabelBtnConnexion : function(labelSt)
	{
		// Bouton connexion
		var btnConnexion = document.getElementById('btncn');
		
		btnConnexion.childNodes[0].nodeValue = labelSt;
		
	},
	
	
	// IHM
	
	PopupIdentification : function()
	{
		this.PopupBase = new Util.PopupBase();
	
		// Title Id Premium
		if(Plugins.Type != null)
		{
			var divCont = document.createElement('div');
			divCont.setAttribute("align", "center");
		
			var divIdPremiumTitle = document.createElement('div');
			
			divIdPremiumTitle.className = "Prem-TexteBasePremium";
			divIdPremiumTitle.style.marginBottom = "15px";
			divIdPremiumTitle.style.fontWeight = "bold";
			divIdPremiumTitle.innerHTML = "Identifiant Premium :";
		
			divCont.appendChild(divIdPremiumTitle);
		
			this.PopupBase.Node.childNodes[1].appendChild(divCont);
		}
		
		var trConnexion = document.createElement("tr");
		trConnexion.style.width = "100%";
	
		// Left part :Connexion
		
		//création d'une div qui contiendra le tout afin d'effectuer un centrage
		var divConnexion = document.createElement("td");
		divConnexion.style.borderRight = "1px solid #d6d9df";
		divConnexion.style.paddingRight = "105px";
		
		//-----------------------------------------------------------------------------------------------------
		//Header de popup connexion
		
		var title = document.createElement("div");
		title.className = "titre";
		title.innerHTML = "Se connecter";
		
		//ajout du header dans la popup
		this.PopupBase.Node.childNodes[1].appendChild(title);
		//-----------------------------------------------------------------------------------------------------
		
		// Titre "déjà inscrit".
		var divTitle_DejaInscrit = document.createElement('div');
		divTitle_DejaInscrit.className = "Prem-SeConnecter-Heading";
		divTitle_DejaInscrit.innerHTML = "D" + String.fromCharCode(233) + "j" + String.fromCharCode(224) + " inscrit ?";	
		divConnexion.appendChild(divTitle_DejaInscrit);
	
		var divInputsConnexion = document.createElement('div');
		divInputsConnexion.style.marginLeft = "60px";
		//divInputsConnexion.style.marginRight = "70px";
		
		// input identifiant
		
		var divInput1 = document.createElement('div');
		divInput1.className = "Prem-SeConnecter-Input";
		divInput1.style.marginBottom = "10px";
		
		var divIcon1 = document.createElement('div');
		divIcon1.className = "Prem-SeConnecter-Input-Icon";
		
		var divIconImage1 = document.createElement('i');
		divIconImage1.className = "fa fa-envelope";
		divIcon1.appendChild(divIconImage1);
		
		divInput1.appendChild(divIcon1);
		
		var input1 = document.createElement('input');
		input1.className = "Prem-TexteBasePremium";
		input1.placeholder = "Adresse Email";
		input1.type = "email";
		input1.autocomplete = "username";
		input1.id = "inputIdC";
		divInput1.appendChild(input1);
		
		divInputsConnexion.appendChild(divInput1);
		
		// input mot de passe

		var divInput2 = document.createElement('div');
		divInput2.className = "Prem-SeConnecter-Input";
		divInput2.style.marginBottom = "10px";
		
		var divIcon2 = document.createElement('div');
		divIcon2.className = "Prem-SeConnecter-Input-Icon";
		
		var divIconImage2 = document.createElement('i');
		divIconImage2.className = "fa fa-lock";
		divIcon2.appendChild(divIconImage2);
		
		divInput2.appendChild(divIcon2);
		
		var input2 = document.createElement('input');
		input2.className = "Prem-TexteBasePremium";
		input2.placeholder = "Mot de passe";
		input2.type = "password";
		input2.autocomplete = "current-password";
		input2.id = "inputMdpC";
		divInput2.appendChild(input2);
		
		divInputsConnexion.appendChild(divInput2);
		
		
		divConnexion.appendChild(divInputsConnexion);
		//placement de la table dans la popup
		//this.PopupBase.Node.childNodes[1].appendChild(table);
		
		//---------------------------------------------------------------------//---------------------------------------------------------------------
			
		// Mot de passe oublié
		// elelment div pour le mot de passe oublié
		var divMdpOublie_cont = document.createElement('div');
		var divMdpOublie = document.createElement('div');
	
		divMdpOublie.className = "Prem-TexteBasePremium Regles-TitreRegleSommaire";
		//divMdpOublie.style.display = "block";
		divMdpOublie.style.marginTop = "15px";
		divMdpOublie.style.marginLeft = "50px";
		divMdpOublie.style.color = "#ee5e62"
		divMdpOublie.style.cursor = "pointer";
		divMdpOublie.innerHTML = "Mot de passe oubli" + String.fromCharCode(233) + " ?";
		
		var th = this;
		// fonction onclick pour la requete du mot de passe
		divMdpOublie.onclick = function()
		{
			th.SetVisible(false);
		
			if(Premium.PopupReinitPasswordI == null) Premium.PopupReinitPasswordI = new Premium.PopupReinitPassword();
			
			Premium.PopupReinitPasswordI.SetVisible(true);
		};
		
		divMdpOublie_cont.appendChild(divMdpOublie);
		divConnexion.appendChild(divMdpOublie_cont);
		//---------------------------------------------------------------------//---------------------------------------------------------------------
		
		
		//création d'une row qui contiendra les 2 boutons (connexion et ouvrir un compte)
		var trbtns = document.createElement('tr');
		trbtns.style.width = "100%";
	
		// Bouton de connexion	
		// création du bouton en question
		var divButtonConnexion = document.createElement('div'); 
		divButtonConnexion.className = "Cor-RedButton";
		divButtonConnexion.innerHTML = "Se connecter";
		divButtonConnexion.style.marginLeft = "58px";
		divButtonConnexion.style.marginTop = "30px";
		divButtonConnexion.style.display = "inline-block";
		divButtonConnexion.onclick = function()
		{
			// Ne pas cliquer tant que l'identification n'a pas �t� finalis�e.
			if(Premium.IdentificationProgress == false)
			{
				Premium.IdentificationProgress = true;
				
				var email = document.getElementById("inputIdC").value;
				var mdp = document.getElementById("inputMdpC").value;
				
				if(email.length > 0 && mdp.length > 0)
				{
					Cor.CheckConnexion(email, mdp);
				}
				else
				{
					document.getElementById("LabelErrorId2").style.display = "block";
				}
			}
		};
		
		divConnexion.appendChild(divButtonConnexion);
	
		//---------------------------------------------------------------------//---------------------------------------------------------------------
	
		// R�sultat de la connexion
		//création d'un div qui contient le message d'erreur
		var divLabelErrorCnx = document.createElement('div');
		divLabelErrorCnx.className = "Prem-TexteBasePremium";
		divLabelErrorCnx.style.fontSize = "14px";
		divLabelErrorCnx.style.fontWeight = "bold";
		divLabelErrorCnx.style.marginTop = "20px";
		divLabelErrorCnx.style.display = "none";
		divLabelErrorCnx.id = "LabelErrorId2";
		divLabelErrorCnx.innerHTML = "<b>Identification invalide</b>";
		
		//placement de la div dans la popup de base
		//this.PopupBase.Node.childNodes[1].appendChild(divLabelErrorCnx);
		divConnexion.appendChild(divLabelErrorCnx);
		
		trConnexion.appendChild(divConnexion);
		
		//---------------------------------------------------------------------//---------------------------------------------------------------------
	
		// Ouvrir un compte
		
		var tdOuvrirCompte = document.createElement('td');
		
		var divOuvrirCompte = document.createElement('div');
		//divOuvrirCompte.style.marginRight = "40px";
		
		// Titre "Créez votre compte".
		var divTitle_CreerCompte = document.createElement('div');
		divTitle_CreerCompte.className = "Prem-SeConnecter-Heading";
		divTitle_CreerCompte.style.marginLeft = "50px";
		divTitle_CreerCompte.innerHTML = "Cr" + String.fromCharCode(233) + "ez votre compte";	
		divOuvrirCompte.appendChild(divTitle_CreerCompte);
		
		// Inputs
		
		var divInputsOuvrirCompte = document.createElement('div');
		divInputsOuvrirCompte.style.marginLeft = "90px";
		divInputsOuvrirCompte.style.marginRight = "55px";
		
		// input Nom d'utilisateur.

		var divInputNomUtil = document.createElement('div');
		divInputNomUtil.className = "Prem-SeConnecter-Input";
		divInputNomUtil.style.marginBottom = "10px";
		divInputNomUtil.style.marginLeft = "25px";
		
		var divIconNomUtil = document.createElement('div');
		divIconNomUtil.className = "Prem-SeConnecter-Input-Icon";
		
		var divIconImageNomUtil = document.createElement('i');
		divIconImageNomUtil.className = "fa fa-user";
		divIconNomUtil.appendChild(divIconImageNomUtil);
		
		divInputNomUtil.appendChild(divIconNomUtil);
		
		var inputNomUtil = document.createElement('input');
		inputNomUtil.className = "Prem-TexteBasePremium";
		inputNomUtil.placeholder = "Nom d'utilisateur";
		inputNomUtil.type = "text";
		//inputNomUtil.autocomplete = "off";
		inputNomUtil.id = "inputNoO";
		divInputNomUtil.appendChild(inputNomUtil);
		
		divInputsOuvrirCompte.appendChild(divInputNomUtil);
		
		// input Adresse Email.

		var divInputEmail = document.createElement('div');
		divInputEmail.className = "Prem-SeConnecter-Input";
		divInputEmail.style.marginBottom = "10px";
		divInputEmail.style.marginLeft = "25px";
		
		var divIconEmail = document.createElement('div');
		divIconEmail.className = "Prem-SeConnecter-Input-Icon";
		
		var divIconImageEmail = document.createElement('i');
		divIconImageEmail.className = "fa fa-envelope";
		divIconEmail.appendChild(divIconImageEmail);
		
		divInputEmail.appendChild(divIconEmail);
		
		var inputEmail = document.createElement('input');
		inputEmail.className = "Prem-TexteBasePremium";
		inputEmail.placeholder = "Adresse Email";
		inputEmail.type = "text";
		//inputEmail.autocomplete = "email";
		inputEmail.id = "inputIdO";
		divInputEmail.appendChild(inputEmail);
		
		divInputsOuvrirCompte.appendChild(divInputEmail);
		
		// input Mot de passe.

		var divInputMdp = document.createElement('div');
		divInputMdp.className = "Prem-SeConnecter-Input";
		divInputMdp.style.marginBottom = "10px";
		divInputMdp.style.marginLeft = "25px";
		
		var divIconMdp = document.createElement('div');
		divIconMdp.className = "Prem-SeConnecter-Input-Icon";
		
		var divIconImageMdp = document.createElement('i');
		divIconImageMdp.className = "fa fa-lock";
		divIconMdp.appendChild(divIconImageMdp);
		
		divInputMdp.appendChild(divIconMdp);
		
		var inputMdp = document.createElement('input');
		inputMdp.className = "Prem-TexteBasePremium";
		inputMdp.placeholder = "Mot de passe";
		inputMdp.type = "password";
		inputMdp.id = "inputPwdO";
		
		inputMdp.onfocus = function()
		{
			document.getElementById('register_rule').style.display = 'block';
			document.getElementById('Suscribe_MessageWarning').style.display = 'none';
		};

		inputMdp.onblur = function()
		{
			document.getElementById('register_rule').style.display = 'none';
		};

		inputMdp.onkeyup = function()
		{
			Premium.ValidatePassword();
		};
		
		divInputMdp.appendChild(inputMdp);
		
		divInputsOuvrirCompte.appendChild(divInputMdp);
		
		divOuvrirCompte.appendChild(divInputsOuvrirCompte);
		
		// Bouton ouvrir un compte
		
		var divButtonOuvrirCompte = document.createElement('div'); 
		divButtonOuvrirCompte.className = "Cor-RedButton";
		divButtonOuvrirCompte.innerHTML = "Ouvrir un compte";
		divButtonOuvrirCompte.style.marginLeft = "87px";
		divButtonOuvrirCompte.style.marginTop = "25px";
		divButtonOuvrirCompte.style.display = "inline-block";
		divButtonOuvrirCompte.onclick = function()
		{
			Premium.Subscribe();
		};
		
		divOuvrirCompte.appendChild(divButtonOuvrirCompte);
		
		// Boite de dialogue de contrôle de password.
		
		var divSecRegisterIncorrectRule = document.createElement('div'); 
		divSecRegisterIncorrectRule.className = "Prem-SeConnecter-Register-IncorrectRule";
		divSecRegisterIncorrectRule.id = "register_rule";
		divSecRegisterIncorrectRule.style.marginLeft = "50px";
		
		var divLabelIncorrectPwd = document.createElement('div'); 
		divLabelIncorrectPwd.innerHTML = "<div>Le mot de passe est invalide. Il doit :</div>";
		divSecRegisterIncorrectRule.appendChild(divLabelIncorrectPwd);
		
		var divSecRegisterIncorrectRule_length = document.createElement('div'); 
		divSecRegisterIncorrectRule_length.className = "Prem-SeConnecter-Register-IncorrectRule-Item invalid-rule";
		divSecRegisterIncorrectRule_length.id = "register-rule-length";
		divSecRegisterIncorrectRule_length.innerHTML = "Avoir une taille minimale de 6 caractères.";
		divSecRegisterIncorrectRule.appendChild(divSecRegisterIncorrectRule_length);
		
		var divSecRegisterIncorrectRule_letter = document.createElement('div'); 
		divSecRegisterIncorrectRule_letter.className = "Prem-SeConnecter-Register-IncorrectRule-Item invalid-rule";
		divSecRegisterIncorrectRule_letter.id = "register-rule-letter";
		divSecRegisterIncorrectRule_letter.innerHTML = "Doit contenir au moins 1 caractère en minuscule.";
		divSecRegisterIncorrectRule.appendChild(divSecRegisterIncorrectRule_letter);
		
		var divSecRegisterIncorrectRule_capital = document.createElement('div'); 
		divSecRegisterIncorrectRule_capital.className = "Prem-SeConnecter-Register-IncorrectRule-Item invalid-rule";
		divSecRegisterIncorrectRule_capital.id = "register-rule-capital";
		divSecRegisterIncorrectRule_capital.innerHTML = "Doit contenir au moins 1 caractère en majuscule.";
		divSecRegisterIncorrectRule.appendChild(divSecRegisterIncorrectRule_capital);
		
		var divSecRegisterIncorrectRule_special = document.createElement('div'); 
		divSecRegisterIncorrectRule_special.className = "Prem-SeConnecter-Register-IncorrectRule-Item invalid-rule";
		divSecRegisterIncorrectRule_special.id = "register-rule-special";
		divSecRegisterIncorrectRule_special.innerHTML = "Doit contenir au moins 1 caractère spécial (!, @,</br> #, $, etc.)";
		divSecRegisterIncorrectRule.appendChild(divSecRegisterIncorrectRule_special);
		
		divOuvrirCompte.appendChild(divSecRegisterIncorrectRule);
		
		// Message d'avertissement
		var divLabelWarning = document.createElement('div');
		divLabelWarning.className = "Prem-TexteBasePremium";
		divLabelWarning.style.color = "#2e2e2e";
		divLabelWarning.style.fontSize = "14px";
		divLabelWarning.style.marginLeft = "85px";
		divLabelWarning.style.marginTop = "20px";
		divLabelWarning.style.paddingTop = "0px";
		divLabelWarning.style.marginBottom = "5px";
		divLabelWarning.style.width = "250px";
		divLabelWarning.id = "Suscribe_MessageWarning";
		divOuvrirCompte.appendChild(divLabelWarning);
		
		tdOuvrirCompte.appendChild(divOuvrirCompte);
		
		trConnexion.appendChild(tdOuvrirCompte);
		
		this.PopupBase.Node.childNodes[1].appendChild(trConnexion);
		
		// En mode plugin, bouton pour tester. Limite � 200 caract�res.
		if(Plugins.Type != null)
		{
			// Message identifiants entr�s.
			var divLabelIdEntres = document.createElement('div');
			divLabelIdEntres.className = "Prem-TexteBasePremium";
			divLabelIdEntres.style.fontSize = "12px";
			divLabelIdEntres.style.marginTop = "10px";
			divLabelIdEntres.innerHTML = "* Une fois vos identifiants entr" + String.fromCharCode(233) + "s, cette fen" + String.fromCharCode(234) + "tre<br> ne s'affichera plus.";
			
			this.PopupBase.Node.childNodes[1].appendChild(divLabelIdEntres);
		
			// Bouton tester l'extension
			var divCont2 = document.createElement('div');
			divCont2.setAttribute("align", "center");
			divCont2.style.borderTop = "1px solid #AEAEAE";
			divCont2.style.marginTop = "15px";
			divCont2.style.paddingTop = "15px";
			
			var divButtonTest = document.createElement('div');
			divButtonTest.className = "Cor-RedButton";
			divButtonTest.innerHTML = "Tester l'extension >";
			//divButtonTest.style.paddingLeft = "10px";
			//divButtonTest.style.paddingRight = "10px";
			divButtonTest.style.width = "180px";
			divButtonTest.onclick = function()
			{
				th.SetVisible(false);
			
				Cor.Demo = true;
			}
			
			divCont2.appendChild(divButtonTest);
			
			this.PopupBase.Node.childNodes[1].appendChild(divCont2);
		}
		
		document.body.appendChild(this.PopupBase.Node);
		
		// Show function
		this.SetVisible = function(visible)
		{
			this.PopupBase.SetVisible(visible);
		};
		
		// Is visible function
		this.IsVisible = function()
		{
			return (this.PopupBase.Node.style.visibility == "visible");
		};
		
	},
	
	ValidatePassword : function()
	{
		var inputPwd = document.getElementById('inputPwdO');
		var letter = document.getElementById('register-rule-letter');
		var capital = document.getElementById('register-rule-capital');
		var special = document.getElementById('register-rule-special');
		var length = document.getElementById('register-rule-length');

		let result = true;
		// Validate lowercase letters
		var lowerCaseLetters = /[a-z]/g;
		if (inputPwd.value.match(lowerCaseLetters)) {
			letter.classList.remove('invalid-rule');
			letter.classList.add('valid-rule');
		} else {
			letter.classList.remove('valid-rule');
			letter.classList.add('invalid-rule');
			result = false;
		}

		// Validate capital letters
		var upperCaseLetters = /[A-Z]/g;
		if (inputPwd.value.match(upperCaseLetters)) {
			capital.classList.remove('invalid-rule');
			capital.classList.add('valid-rule');
		} else {
			capital.classList.remove('valid-rule');
			capital.classList.add('invalid-rule');
			result = false;
		}

		// Validate Special characters
		var specials = /[!@#$%^&*(),.?":{}|<>]/g;
		if (inputPwd.value.match(specials)) {
			special.classList.remove('invalid-rule');
			special.classList.add('valid-rule');
		} else {
			special.classList.remove('valid-rule');
			special.classList.add('invalid-rule');
			result = false;
		}

		// Validate length
		if (inputPwd.value.length >= 6) {
			length.classList.remove('invalid-rule');
			length.classList.add('valid-rule');
		} else {
			length.classList.remove('valid-rule');
			length.classList.add('invalid-rule');
			result = false;
		}
		return result;
    },
	
	// Check the controls
	Subscribe : function()
	{
		// Get the values
		var userName = document.getElementById("inputNoO").value;
		var email = document.getElementById("inputIdO").value;
		var pwd = document.getElementById("inputPwdO").value;
	
		// Check the datas validity
		var condUsername = Util.Condition_Username(userName);
		var condEmail = Util.Condition_Email(email);
		var condPassword = (Premium.ValidatePassword() && pwd.indexOf(",") == -1);	// Musn't contain comma because of the database query.
		
		// Donn�es non valide. Avertissement � l'utilisateur
		if(condUsername == false ||
		   condEmail == false ||
		   condPassword == false)
		{
			var divMessageWarning = document.getElementById("Suscribe_MessageWarning");
			document.getElementById('register_rule').style.display = 'none';
			divMessageWarning.style.display = 'block';
			divMessageWarning.innerHTML = "<p><b>Donn" + String.fromCharCode(233) + "es invalides ou manquantes</b>.</p><p><b>Remarque : </b>les champs ne doivent pas comporter</p><p>les caract" + String.fromCharCode(232) + "res \" <b>'</b> \", \"<b>|</b>\" et \"<b>,</b>\" .</p>";
		}
		// Données valides : V�rification si l'identifiant (email) existe d�j�.
		else
		{
			Util.SendHttpRequest('Identification_Servlet',
							[['FunctionName', 'IdentifiantExiste'],
							 ['Email', email]],
			 function(response)
			 {
				var divMessageWarning = document.getElementById("Suscribe_MessageWarning");
		
				// L'identifiant existe d�j�
				if(response == true)
				{
					var message = "<b>L'adresse mail existe d" + String.fromCharCode(233) + "j" + String.fromCharCode(224) + ".</b>";
					divMessageWarning.style.display = 'block';
					divMessageWarning.innerHTML = message;
					
					var inputPassword = document.getElementById("inputPwdO");
					inputPassword.innerHTML = "";
				}
				// Nouveau compte
				else
				{
					Premium.Subscribed = true;
					
					// Donn�es valides : envoi d'un email � l'utilisateur
					var message = "<p><b>Merci. Votre compte a " + String.fromCharCode(233) + "t" + String.fromCharCode(233) + " cr" + String.fromCharCode(233) + String.fromCharCode(233) + ".</b></p><p><b>Un message vient de vous " + String.fromCharCode(234) + "tre envoy" + String.fromCharCode(233) + " pour vous permettre de valider votre inscription.</b></p>";
					divMessageWarning.style.display = 'block';
					divMessageWarning.innerHTML = message;
					
					// Update the database.

					// User Name
					userName = userName.replace(new RegExp(",", "g"), "");
					userName = userName.replace(new RegExp("'", "g"), "");
					
					Util.SendHttpRequest('Identification_Servlet',
						[['FunctionName', 'NewSubscription'],
						 ['Identifiant', email],
						 ['MotDePasse', pwd],
						 ['Prenom', userName]],
						 null);
					
					// Grise les champs.
					document.getElementById("inputNoO").disabled = true;
					document.getElementById("inputIdO").disabled = true;
					document.getElementById("inputPwdO").disabled = true;
					
					// Envoi de l'email de confirmation � l'utilisateur.
					Util.SendHttpRequest('Identification_Servlet',
						[['FunctionName', 'SendMessageEmail'],
						 ['IdMail', 'CONFIRMATION_INSCRIPTION'],
						 ['LangId', Cor.IdLangue],
						 ['EMail', email],
						 ['MotDePasse', pwd],
						 ['Prenom', userName]],
						 null);
						 
				}
			 });
		}
	},
	
	// Popup of reinit password
	PopupReinitPassword : function()
	{
		this.PopupBase = new Util.PopupBase();
	
		// Label
		var divLabel = document.createElement('div');
		divLabel.style.marginBottom = "20px";
		divLabel.innerHTML = "Veuillez fournir l'adresse email utilis" + String.fromCharCode(233) + "e lors de votre inscription " + String.fromCharCode(224) + " Scribens.";
		
		this.PopupBase.Node.childNodes[1].appendChild(divLabel);
		
		// Input
		var divTable = document.createElement('div');
		divTable.setAttribute("align", "center");
		divTable.style.marginBottom = "20px";
		
		var table = document.createElement('div');
		//titre
		var titre = document.createElement('div');
		titre.innerHTML = "R" + String.fromCharCode(233) +"cup" + String.fromCharCode(233) + "ration de mot de passe";
		titre.className = "titre";
		table.appendChild(titre);
	
		var td0 = document.createElement('td');
		
		td0.className = "Prem-TexteBasePremium";
		td0.innerHTML = "Email :";
		td0.style.fontWeight = "bold";
		
		table.appendChild(td0);
		
		var td1 = document.createElement('td');
		
		var input = document.createElement('input');
		input.type = "text";
		input.style.width = "260px";
		input.style.marginLeft = "10px";
		input.id = "EmailReinitPwd";
		
		td1.appendChild(input);
		
		table.appendChild(td1);
		
		divTable.appendChild(table);
		
		this.PopupBase.Node.childNodes[1].appendChild(divTable);
		
		// Reinit button
		var divCont = document.createElement('div');
		divCont.setAttribute("align", "center");
		
		var divButtonConnexion = document.createElement('div');
		divButtonConnexion.className = "Cor-RedButton";
		divButtonConnexion.innerHTML = "R" + String.fromCharCode(233) + "initialiser";
		//divButtonConnexion.paddingLeft = "10px";
		//divButtonConnexion.paddingRight = "10px";
		divButtonConnexion.style.width = "200px";
		divButtonConnexion.onclick = function()
		{
			var email = document.getElementById("EmailReinitPwd").value;
		
			// V�rifie si le compte associ� � l'email existe.
			Util.SendHttpRequest('Identification_Servlet',
							[['FunctionName', 'IdentifiantExiste'],
							 ['Email', email]],
							 function(response)
							 {
								var idExist = response;
						
								// L'identifiant existe. Envoi de mail pour r�initialiser le mot de passe.
								if(idExist == true)
								{
									if(Premium.ReinitMdp == false)
									{
										Premium.ReinitMdp = true;
										
										var divLabelError = document.getElementById("IdLabelErrorReinitPwd");
										divLabelError.innerHTML = "<b>Un email de v" + String.fromCharCode(233) + "rification vous a " + String.fromCharCode(233) + "t" + String.fromCharCode(233) + " envoy" + String.fromCharCode(233) + ".</b>";
										
										// Envoi de l'email de confirmation � l'utilisateur.
										Util.SendHttpRequest('Identification_Servlet',
											[['FunctionName', 'SendMessageEmail'],
											 ['IdMail', 'REINIT_MDP'],
											 ['LangId', Cor.IdLangue],
											 ['EMail', email],
											 ['MotDePasse', ''],
											 ['Prenom', '']],
											 null);
									}
								}
								else
								{
									var divLabelError = document.getElementById("IdLabelErrorReinitPwd");
									divLabelError.innerHTML = "<b>Cet email n'est associ" + String.fromCharCode(233) + " " + String.fromCharCode(224) + " aucun compte.</b>";
								}
							 });
		};
		
		divCont.appendChild(divButtonConnexion);
		
		this.PopupBase.Node.childNodes[1].appendChild(divCont);
		
		// Label error
		var divLabelError = document.createElement('div');
		divLabelError.className = "Prem-TexteBasePremium";
		divLabelError.style.fontSize = "14px";
		divLabelError.style.fontWeight = "bold";
		divLabelError.style.marginTop = "15px";
		divLabelError.align = "center";
		divLabelError.id = "IdLabelErrorReinitPwd";
		
		this.PopupBase.Node.childNodes[1].appendChild(divLabelError);
		
		document.body.appendChild(this.PopupBase.Node);
		
		// Show function
		this.SetVisible = function(visible)
		{
			this.PopupBase.SetVisible(visible);
		};
	},
	
	// Shift of password popup
	PopupShiftPassword : function()
	{
		this.PopupBase = new Util.PopupBase();
	
		// Label titre
		var lableTitle = document.createElement('div');
		lableTitle.className = "Prem-TexteBasePremium titre newpass";
		lableTitle.style.fontSize = "14px";
		lableTitle.style.fontWeight = "bold";
		lableTitle.style.marginBottom = "20px";
		lableTitle.setAttribute("align", "center");
		
		lableTitle.innerHTML = "Veuillez entrer votre nouveau mot de passe.";
		
		this.PopupBase.Node.childNodes[1].appendChild(lableTitle);
		
		// Table
		var table = document.createElement('table');
		table.className = "Prem-TexteBasePremium";
		table.style.marginTop = "10px";
		table.style.fontSize = "14px";
		table.style.fontWeight = "bold";
		
		var tr0 = document.createElement('tr');
		var td0 = document.createElement('td');
		td0.innerHTML = "<p style='margin-bottom: 0 !important; margin-top: 5px;'>Nouveau mot de passe :</p><p>(6 caract" + String.fromCharCode(232) + "res min.)</p>";
		tr0.appendChild(td0);
		
		var td1 = document.createElement('td');
		var inputNewPassword = document.createElement('input');
		inputNewPassword.type = "password";
		inputNewPassword.style.width = "150px";
		inputNewPassword.style.marginLeft = "10px";
		inputNewPassword.id = "InputNewPassword";
		td1.appendChild(inputNewPassword);
		tr0.appendChild(td1);
		
		table.appendChild(tr0);
		
		var tr1 = document.createElement('tr');
		var td2 = document.createElement('td');
		td2.innerHTML = "Confirmation :";
		tr1.appendChild(td2);
		
		var td3 = document.createElement('td');
		var inputConfPassword = document.createElement('input');
		inputConfPassword.type = "password";
		inputConfPassword.style.width = "150px";
		inputConfPassword.style.marginLeft = "10px";
		inputConfPassword.id = "InputConfPassword";
		td3.appendChild(inputConfPassword);
		tr1.appendChild(td3);
		
		table.appendChild(tr1);
		
		this.PopupBase.Node.childNodes[1].appendChild(table);
		
		var th = this;
		
		// Buttons
		var tableButtons = document.createElement('table');
		tableButtons.setAttribute("align", "center");
		tableButtons.style.marginTop = "25px";
		
		var tdButtonOK = document.createElement('td');
		var buttonOK = document.createElement('div');
		buttonOK.className = "Cor-RedButton";
		buttonOK.innerHTML = "OK";
		buttonOK.style.fontSize = "16px";
		buttonOK.style.textAlign = "center";
		//buttonOK.style.marginLeft = "275px";
		buttonOK.onclick = function()
		{
			var newPassword = document.getElementById("InputNewPassword").value;
			var confPassword = document.getElementById("InputConfPassword").value;
			var errorLabel = document.getElementById("ShiftPwdErrorLabel");
			
			var message = "";
			if(newPassword.length == 0 || confPassword.length == 0) message = "Veuillez entrer un mot de passe.";
			else if(newPassword.length < 6 || confPassword.length < 6) message = "Le mot de passe est trop court.";
			
			if(newPassword != confPassword) message = "Les deux entr" + String.fromCharCode(233) + "es sont diff" + String.fromCharCode(233) + "rentes."; 
			
			// Prohibited caracters
			if((newPassword.indexOf(",") >= 0) || (newPassword.indexOf("'") >= 0) || (newPassword.indexOf("|") >= 0)) message = "Les champs ne doivent pas comporter</p><p>les caract" + String.fromCharCode(232) + "res \" <b>'</b> \", \"<b>|</b>\" et \"<b>,</b>\" .";
			
			if(message.length > 0)
			{
				errorLabel.style.display = "block";
				errorLabel.innerHTML = message;
			}
			// Mot de passe valide. Reinitialisation du mot de passe.
			else
			{
				// Utilisateur
				Cor.User.MotDePasse = newPassword;
				
				// Enregistre dans les cookies.
				var chCookie = Cor.User.Identifiant + "|" + Cor.User.MotDePasse;
				Util.SetCookie("IdentificationScribens", chCookie, 5000);
				
				// Update password in panel Mon compte.
				var labelPassword = document.getElementById("Info_Password");
				if(labelPassword != null)
				{
					var mdpEt = "";
					for(var i = 0; i < Cor.User.MotDePasse.length; i++) mdpEt += "*";	
					
					labelPassword.innerHTML = mdpEt;
				}
				
				// Envoi de l'email de confirmation � l'utilisateur.
				Util.SendHttpRequest('Identification_Servlet',
							[['FunctionName', 'SendMessageEmail'],
							 ['IdMail', 'CONFIRMATION_REINIT_MDP'],
							 ['LangId', Cor.IdLangue],
							 ['EMail', Cor.User.Identifiant],
							 ['MotDePasse', Cor.User.MotDePasse],
							 ['Prenom', Cor.User.UserName]],
							 null);
				
				// Reinitialise le mot de passe dans la base de donn�es.
				Util.SendHttpRequest('Identification_Servlet',
							[['FunctionName', 'MajData'],
							 ['DataName', 'MotDePasse'],
							 ['DataValue', Cor.User.MotDePasse],
							 ['TableName', 'abonnement_client'],
							 ['Id', Cor.User.Identifiant]],
							 null);
				
				// Close the popup
				th.SetVisible(false);
			}
		};
		tdButtonOK.appendChild(buttonOK);
		tableButtons.appendChild(tdButtonOK);
		
		var tdButtonCancel = document.createElement('td');
		var buttonCancel = document.createElement('div');
		buttonCancel.className = "Cor-RedButton";
		buttonCancel.innerHTML = "Annuler";
		buttonCancel.style.fontSize = "16px";
		buttonCancel.style.marginLeft = "15px";
		buttonCancel.style.textAlign = "center";
		
		buttonCancel.onclick = function()
		{
			th.SetVisible(false);
		};
		
		//buttonOK.style.marginLeft = "275px";
		tdButtonCancel.appendChild(buttonCancel);
		tableButtons.appendChild(tdButtonCancel);
		
		this.PopupBase.Node.childNodes[1].appendChild(tableButtons);
		
		// Message warning
		var divErrorLabel = document.createElement('div');
		divErrorLabel.className = "Prem-TexteBasePremium";
		divErrorLabel.style.fontSize = "14px";
		divErrorLabel.style.fontWeight = "bold";
		divErrorLabel.style.marginTop = "10px";
		divErrorLabel.style.marginBottom = "10px";
		divErrorLabel.setAttribute("align", "center");
		divErrorLabel.style.display = "none";
		divErrorLabel.id = "ShiftPwdErrorLabel";
		
		this.PopupBase.Node.childNodes[1].appendChild(divErrorLabel);
		
		document.body.appendChild(this.PopupBase.Node);
		
		// Show function
		this.SetVisible = function(visible)
		{
			this.PopupBase.SetVisible(visible);
		};
	},
	
	// Panel of presentatio Premium.
	PresentationPremium : function()
	{
		var th = this;
		
		// Line premium presentation
		this.CreateLineVPremium = function(text, chgratuit, background)
		{
			var tr = document.createElement('tr');
			
			var td0 = document.createElement('td');
			if(background) td0.className = "Prem-RowStylePremiumSurl";
			else td0.className = "Prem-RowStylePremium";
			td0.style.paddingLeft = "20px";
			td0.innerHTML = text;
			td0.style.borderRight = "solid 1px #d0d0d0";
			td0.style.borderBottom = "solid 1px #d0d0d0";
			tr.appendChild(td0);
			
			var td1 = document.createElement('td');
			if(background) td1.className = "Prem-RowStylePremiumSurl";
			else td1.className = "Prem-RowStylePremium";
			td1.style.textAlign = "center";
			td1.style.borderRight = "solid 1px #d0d0d0";
			td1.style.borderBottom = "solid 1px #d0d0d0";
			td1.style.width = "15%"; 
	
			if(chgratuit)
			{
				var icon = document.createElement('i');
				icon.className = "fa fa-check";
				// icon.style.marginLeft = "45%";
				td1.appendChild(icon);
			}
			tr.appendChild(td1);
			
			var td2 = document.createElement('td');
			if(background) td2.className = "Prem-RowStylePremiumSurl";
			else td2.className = "Prem-RowStylePremium";
			td2.style.textAlign = "center";
			var icon = document.createElement('i');
			icon.className = "fa fa-check";
			icon.style.color = "#ee5e62";
			// icon.style.marginLeft = "45%";
			// icon.style.marginLeft = "90px";
			// icon.style.marginRight = "30px";
			td2.style.borderRight = "solid 1px #d0d0d0";
			td2.style.borderBottom = "solid 1px #d0d0d0";
			td2.style.width = "15%";
			td2.appendChild(icon);
			tr.appendChild(td2);
			
			return tr;
		}
	
	
		// Tab of the div premium.
		this.CreateDivResumPremium = function()
		{
			var table = document.createElement('table');
			table.className = "Prem-TexteBasePremium open";
			table.id = "tableauVP";
			table.style.marginTop = "25px";
			table.style.marginTop = "25px";
			table.style.marginBottom = "25px";
			table.width = "95%";
			table.style.borderTop = "solid 1px #d0d0d0";
			table.style.borderLeft = "solid 1px #d0d0d0";
	
			// Title
			var trTitle = document.createElement('tr');
			
			var td00 = document.createElement('td');
			//td00.className = "Prem-TexteBasePremium";
			td00.style.fontWeight = "bold";
			td00.style.marginTop = "10px";
			td00.style.paddingLeft = "20px";
			td00.style.borderRight = "solid 1px #d0d0d0";
			td00.style.borderBottom = "solid 1px #d0d0d0";
			td00.innerHTML = "FONCTIONNALIT" + String.fromCharCode(201) + "S";
			trTitle.appendChild(td00);
			
			var td01 = document.createElement('td');
			//td01.style.paddingRight = "25px";
			td01.style.width = "20%";
			td01.style.fontWeight = "bold";
			td01.style.textAlign = "center";
			td01.innerHTML = "GRATUIT";
			// td01.style.paddingLeft = "5%";
			td01.style.marginTop = "10px";
			td01.style.borderRight = "solid 1px #d0d0d0";
			td01.style.borderBottom = "solid 1px #d0d0d0";
			
			trTitle.appendChild(td01);
			
			var td02 = document.createElement('td');
			td02.innerHTML = "COMPTE PREMIUM";
			td02.style.width = "20%";
			td02.style.color = "#ee5e62";
			td02.style.textAlign = "center";
			td02.style.marginTop = "10px";
			td02.style.fontWeight = "bold";
			// td02.style.paddingLeft = "35px";
			td02.style.borderRight = "solid 1px #d0d0d0";
			td02.style.borderBottom = "solid 1px #d0d0d0";
			//td02.style.marginRight = "30px";
	
			trTitle.className = "c-descritptionPremiumTitre";
			trTitle.style.height = "70px";
			trTitle.appendChild(td02);
			
			table.appendChild(trTitle);
			
			// Line 1
			var tr1 = this.CreateLineVPremium("Correction de l'orthographe et de la grammaire", true, false);
			table.appendChild(tr1);
			
			// Line 2
			var tr2 = this.CreateLineVPremium("Acc" + String.fromCharCode(232) + "s aux dictionnaires", true, true);
			table.appendChild(tr2);
			
			// Line 3
			var tr3 = this.CreateLineVPremium("R" + String.fromCharCode(232) + "gles de grammaire", true, false);
			table.appendChild(tr3);
			
			// Line 4
			/*var tr4 = this.CreateLineVPremium("<p>60 nouveaux types de fautes corrig" + String.fromCharCode(233) + "es</p>", false, false);
			tr4.childNodes[0].append(new Util.TextInfoBulle("<p><u>Exemples</u></p>",
															"<p>- Mathilde mange une tarte -> Mathilde mange une tarte<b>.</b> (oubli du point dans une phrase d" + String.fromCharCode(233) + "clarative)</p>" +
															"<p>- Je <b>lui la</b> donne. -> Je <b>la lui</b> donne.</p>" +
															"<p>- Il est <b>14h54</b>. -> Il est <b>14 h 54</b>.</p>" +
															"<p>- Liza iras-tu " + String.fromCharCode(224) + " la piscine ? -> Liza<b>,</b> iras-tu " + String.fromCharCode(224) + " la piscine ?</p>" +
															"<p>- Monsieur Toussaint -> Monsieur Toussaint<b>,</b></p>" +
															"<p>- Il mange <b>poire</b>. -> Il mange <b>la poire/une poire/cette poire</b>.</p>" +
															"<p>- Je ne sais pas comment <b>y es-tu arriv" + String.fromCharCode(233) + "</b>. -> Je ne sais pas comment <b>tu y es arriv" + String.fromCharCode(233) + "</b>.</p>" +
															"<p>- Je vais souvent sur <b>ww.abcd.com</b>. -> Je vais souvent sur <b>www.abcd.com</b>.</p>" +
															"<p>- Il arrive <b>en</b> Chili. -> Il arrive <b>au</b> Chili.</p>" +
															"<p>- Il envisage <b>" + String.fromCharCode(224) + "</b> concevoir un nouveau produit. -> Il envisage <b>de</b> concevoir un nouveau produit.</p>"));
			table.appendChild(tr4);*/
			
			// Line 4
			var tr4 = this.CreateLineVPremium("<p>V" + String.fromCharCode(233) + "rifications de texte jusqu'" + String.fromCharCode(224) + " <b>200 000</b> caract" + String.fromCharCode(232) + "res (env. <b>50</b> pages)</p>" +
										  "<p>V" + String.fromCharCode(233) + "rifications <b>2 fois plus rapide</b> pour les textes moyens et longs.</p>", false, true);
			table.appendChild(tr4);
			
			// Line 5
			var tr5 = this.CreateLineVPremium("Plugins Scribens pour <b>Microsoft Word</b>, <b>OpenOffice</b> et <b>LibreOffice</b>.", false, false);
			table.appendChild(tr5);
			
			// Line 6
			var tr6 = this.CreateLineVPremium("<p>Correction directe de vos e-mails sans copier-coller :</p>" +
										  "<p>- Messagerie : <b>Gmail</b>, <b>Hotmail</b>, <b>Yahoo</b>, <b>Orange</b>, etc.</p>" +
										  "- 90 % des zones de texte sur Internet : <b>Facebook</b>, <b>Twitter</b>, <b>LinkedIn</b>, <b>LeBonCoin.fr</b>, <b>sites de blogs</b>, <b>forums</b>, <b>formulaires</b>, etc.", false, true);
			table.appendChild(tr6);
			
			// Line 7
			var tr7 = this.CreateLineVPremium("<p>D" + String.fromCharCode(233) + "tections de probl" + String.fromCharCode(232) + "mes dans la r" + String.fromCharCode(233) + "daction :</p>" +
									      "<p><b>R" + String.fromCharCode(233) + "p" + String.fromCharCode(233) + "titions</b>, <b>phrases longues</b>, <b>pl" + String.fromCharCode(233) + "onasmes</b>, <b>mots de registres particuliers</b> (populaire, vulgaire, etc.)</p>", false, false);
			table.appendChild(tr7);
			
			// Line 8
			var tr8 = this.CreateLineVPremium("<p>Propositions d'am" + String.fromCharCode(233) + "lioration de la r" + String.fromCharCode(233) + "daction :</p>" + 
										  "<p><b>15 types de reformulation</b>, <b>am" + String.fromCharCode(233) + "lioration de vocabulaire</b>.</p>", false, true);
			table.appendChild(tr8);
			
			// Line 8
			var tr9 = this.CreateLineVPremium("<p>Fonction pour rendre un texte <b>positif</b> ou <b>n" + String.fromCharCode(233) + "gatif</b>.</p>", false, false);
			table.appendChild(tr9);
			
			// Line 9
			var tr9 = this.CreateLineVPremium("Statistiques sur le texte : <b>nombre de mots, de phrases, de paragraphes, indice de lisibilit" + String.fromCharCode(233) + ", etc.</b>", false, true);
			table.appendChild(tr9);
			
			// Line 10
			var tr10 = this.CreateLineVPremium("Fonctions <b>copier</b>, <b>t" + String.fromCharCode(233) + "l" + String.fromCharCode(233) + "charger</b> et <b>imprimer</b> le texte.", false, false);
			table.appendChild(tr10);
			
			// Line 11
			var tr11 = this.CreateLineVPremium("<b>150</b> s" + String.fromCharCode(233) + "ries d'exercices d'orthographe, un dictionnaire des citations tr" + String.fromCharCode(232) + "s complet", false, true);
			table.appendChild(tr11);
			
			// Line 12
			var tr12 = this.CreateLineVPremium("Aucune publicit" + String.fromCharCode(233), false, false);
			table.appendChild(tr12);
			
			this.MainDiv.appendChild(table);
		}
		
		// Create table extensions
		this.CreateTableExtension = function(tabImgSrc)
		{
			var table = document.createElement("table");
			
			for(var i = 0; i < tabImgSrc.length; i++)
			{
				var tr = document.createElement("tr");
				
				var td0 = document.createElement("td");
				if(tabImgSrc[i][0].length > 0)
				{
					var img0 = document.createElement("img");
					img0.src = tabImgSrc[i][0];
					img0.style.paddingBottom = "20px";
					img0.style.paddingRight = "60px";
					td0.appendChild(img0);
				}
				tr.appendChild(td0);
			
				var td1 = document.createElement("td");
				if(tabImgSrc[i][1].length > 0)
				{
					var img1 = document.createElement("img");
					img1.src = tabImgSrc[i][1];
					img1.style.paddingBottom = "20px";
					td1.appendChild(img1);
				}
				tr.appendChild(td1);
				
				table.appendChild(tr);
			}
			
			return table;
		}
		
		// Rpr�sente un cadre avec l'image.
		this.ImgScreenShot = function(src)
		{
			this.PopupBase = new Util.PopupBase('popin-img');
			
			this.Img = document.createElement("img");
			this.Img.src = src;
			
			this.PopupBase.Node.childNodes[1].appendChild(this.Img);
		
			var th = this;
			this.Img.addEventListener("load", function()
			{
				th.PopupBase.SetVisible(true);
			});
			
			document.body.appendChild(this.PopupBase.Node);
		}
		
		// Table Screenshot
		this.CreateTableScreenShot = function(tabImgSrc)
		{
			var table = document.createElement("table");
			table.setAttribute("align", "center");
			
			for(var i = 0; i < tabImgSrc.length; i++)
			{
				var td = document.createElement("td");
				var img = document.createElement("img");
				img.src = tabImgSrc[i];
				img.setAttribute("width", "110px");
				img.setAttribute("height", "55px");
				img.style.cursor = "pointer";
				
				if(i > 0)
				{
					img.style.marginLeft = "10px";
				}
				
				img.onclick = function()
				{
					th.ImgScreenShot(this.src);
				}
				
				td.appendChild(img);
				table.appendChild(td);
			}
			
			return table;
		}
		
		// Instruction installation of plugin.
		this.InstructionInst1 = Premium.Exp_Setup_GoogleChrome;
		this.InstructionInst2 = Premium.Exp_Setup_GoogleDocs;
		this.LabelActualBrowser = "";
		
		// Select webplugins
		this.SelectPluginsWeb = function(index, table, th)
		{
			if(index == 0)
			{
				table.childNodes[1].childNodes[0].src = "images/Plugins_logo/logo_chrome2.png";
				table.childNodes[2].childNodes[0].href = "https://chrome.google.com/webstore/detail/scribens-correcteur-dorth/djpeecijcbigpoijldkimmkilekocdao?hl=fr";
				th.InstructionInst1 = Premium.Exp_Setup_GoogleChrome;
				
				if(Cor.IsChrome == true) this.LabelActualBrowser.innerHTML = "<p>Le navigateur que vous utilisez actuellement est Google Chrome.</p>";
				else this.LabelActualBrowser.innerHTML = "";
			}
			else if(index == 1)
			{
				table.childNodes[1].childNodes[0].src = "images/Plugins_logo/logo_firefox2.png";
				table.childNodes[2].childNodes[0].href = "https://addons.mozilla.org/fr/firefox/addon/plugin-scribens-english";
				th.InstructionInst1 = Premium.Exp_Setup_MozillaFirefox;
				
				if(Cor.IsMozillaF == true) this.LabelActualBrowser.innerHTML = "<p>Le navigateur que vous utilisez actuellement est Mozilla Firefox.</p>";
				else this.LabelActualBrowser.innerHTML = "";
			}
			else if(index == 2)
			{
				table.childNodes[1].childNodes[0].src = "images/Plugins_logo/logo_Safari2.png";
				table.childNodes[2].childNodes[0].href = "https://www.scribens.com/download/Scribens.safariextz";
				th.InstructionInst1 = Premium.Exp_Setup_Safari;
				
				if(Cor.IsSafari == true) this.LabelActualBrowser.innerHTML = "<p>Le navigateur que vous utilisez actuellement est Safari.</p>";
				else this.LabelActualBrowser.innerHTML = "";
			}
		}
		
		// Tab of the div ext premium.
		this.CreateDivExtPremium = function()
		{
			var divExtPremiums = document.createElement("div");
			divExtPremiums.className = "Prem-TexteBasePremium";
			divExtPremiums.setAttribute("align", "left");
			divExtPremiums.style.display = "none";
			divExtPremiums.style.padding = "30px";
			divExtPremiums.style.paddingTop = "15px";
		
			// Label 0
			var label0 = document.createElement("div");
			label0.innerHTML = "Une utilisation simple et efficace dans vos applications";
			label0.style.fontWeight = "bold";
			label0.style.fontSize = "16px";
			label0.style.color = "#565656";
			label0.style.paddingBottom = "15px";
			divExtPremiums.appendChild(label0);
			
			// Label 1
			var label1 = document.createElement("div");
			label1.innerHTML = String.fromCharCode(8226) + " <b><u>Les extensions n" + String.fromCharCode(233) + "cessitent une connexion Internet pour pouvoir fonctionner.</u></b>";
			label1.style.fontSize = "16px";
			label1.style.color = "#565656";
			label1.style.paddingBottom = "15px";
			divExtPremiums.appendChild(label1);
			
			// Label 1
			var labelMultiposte = document.createElement("div");
			labelMultiposte.innerHTML = String.fromCharCode(8226) + " <b><u>Les extensions peuvent " + String.fromCharCode(234) + "tre install" + String.fromCharCode(233) + "es sur un nombre illimit" + String.fromCharCode(233) + " de postes, mais deux connexions simultan" + String.fromCharCode(233) + "es au m" + String.fromCharCode(234) + "me compte n'est pas possible.</u></b>";
			labelMultiposte.style.fontWeight = "bold";
			labelMultiposte.style.fontSize = "16px";
			labelMultiposte.style.color = "#565656";
			labelMultiposte.style.paddingBottom = "15px";
			divExtPremiums.appendChild(labelMultiposte);
			
			// Label 3
			var label3 = document.createElement("div");
			label3.style.fontWeight = "bold";
			label3.style.fontSize = "16px";
			label3.style.paddingTop = "10px";
			label3.style.paddingBottom = "20px";
			label3.innerHTML = "Corrigez directement vos e-mails sans copier-coller :";
			divExtPremiums.appendChild(label3);
			
			// Label 4
			var label4 = document.createElement("div");
			label4.style.paddingBottom = "15px";
			label4.style.fontSize = "16px";
			label4.innerHTML = "- Messagerie : Gmail, Hotmail, Yahoo, Orange, etc.";
			divExtPremiums.appendChild(label4);
			
			// Label 5
			var label5 = document.createElement("div");
			label5.style.paddingBottom = "20px";
			label5.style.fontSize = "16px";
			label5.innerHTML = "- 90 % des zones de texte sur Internet : Facebook, Twitter, LinkedIn, LeBonCoin.fr, sites de blogs, forums, formulaires, etc.";
			divExtPremiums.appendChild(label5);
			
			// Table extension web 1
			var tableExtWeb = this.CreateTableExtension([["images/Conf_PluginGoogleChrome.png", "images/Conf_PluginMozillaFirefox.png"], ["images/Conf_PluginSafari.png", ""]]);
			
			divExtPremiums.appendChild(tableExtWeb);
			
			// Title test
			var divTest1 = document.createElement("div");
			divTest1.style.backgroundColor = "#f5f3f3";
			divTest1.style.paddingBottom = "10px";
			
			var labelTest1 = document.createElement("div");
			labelTest1.setAttribute("align", "center");
			labelTest1.style.fontWeight = "bold";
			labelTest1.style.fontSize = "16px";
			labelTest1.style.paddingTop = "10px";
			labelTest1.style.paddingBottom = "20px";
			labelTest1.style.color = "#e04343";
			labelTest1.innerHTML = "Testez des plugins gratuitement et sans compte !";
			divTest1.appendChild(labelTest1);
			
			// Table of test
			var tableTestExtTt1 = document.createElement("table");
			tableTestExtTt1.setAttribute("align", "center");
			//tableTestExtTt.style.backgroundColor = "#f5f3f3";
			tableTestExtTt1.style.border = "1px solid #ffffff";
			
			// Select plugins
			var tdSelectPlugins1 = document.createElement("td");
			tdSelectPlugins1.style.width = "180px";
			
			var selectPlugins1 = document.createElement("select");
			selectPlugins1.style.marginLeft = "35px";
			var optionGoogleChrome = document.createElement("option");
			optionGoogleChrome.innerHTML = "Google Chrome";
			selectPlugins1.appendChild(optionGoogleChrome);
			var optionMozillaFirefox = document.createElement("option");
			optionMozillaFirefox.innerHTML = "Mozilla Firefox";
			selectPlugins1.appendChild(optionMozillaFirefox);
			var optionSafari = document.createElement("option");
			optionSafari.innerHTML = "Safari (Mac)";
			selectPlugins1.appendChild(optionSafari);
			
			var th = this;
			selectPlugins1.onchange = function()
			{
				var index = this.selectedIndex;
				var table = this.parentNode.parentNode;
				
				th.SelectPluginsWeb(index, table, th);
				
			};
			
			tdSelectPlugins1.appendChild(selectPlugins1);
			
			// Label actual browser
			this.LabelActualBrowser = document.createElement("div");
			this.LabelActualBrowser.style.fontWeight = "bold";
			this.LabelActualBrowser.style.fontSize = "12px";
			this.LabelActualBrowser.align = "center";
			this.LabelActualBrowser.style.paddingTop = "10px";
			this.LabelActualBrowser.style.paddingLeft = "15px";
			//this.LabelActualBrowser.style.paddingBottom = "20px";
			this.LabelActualBrowser.style.color = "#e04343";
			
			tdSelectPlugins1.appendChild(this.LabelActualBrowser);
			
			
			tableTestExtTt1.appendChild(tdSelectPlugins1);
			
			// Logo
			var tdImgLogo1 = document.createElement("td");
			tdImgLogo1.style.borderRight = "2px solid #ffffff";
			var imgLogo1 = document.createElement("img");
			imgLogo1.src = "images/Plugins_logo/logo_chrome2.png";
			imgLogo1.style.marginLeft = "30px";
			imgLogo1.style.marginRight = "20px";
			imgLogo1.style.marginTop = "5px";
			imgLogo1.style.marginBottom = "5px";
			tdImgLogo1.appendChild(imgLogo1);
			tableTestExtTt1.appendChild(tdImgLogo1);
			
			// Button tester
			var tdDownload1 = document.createElement("td");
			
			var aDownload1 = document.createElement("a");
			aDownload1.style.textDecoration = "underline";
			aDownload1.innerHTML = "T" + String.fromCharCode(233) + "l" + String.fromCharCode(233) + "charger";
			aDownload1.href = "https://chrome.google.com/webstore/detail/scribens-correcteur-dorth/djpeecijcbigpoijldkimmkilekocdao?hl=fr";
			aDownload1.target = "_blank";
			aDownload1.style.marginLeft = "30px";
			aDownload1.style.marginRight = "30px";
			aDownload1.style.marginTop = "15px";
			aDownload1.style.marginBottom = "15px";
			
			tdDownload1.appendChild(aDownload1);
			
			/*var buttonTester = document.createElement("a");
			buttonTester.setAttribute("class", "Cor-RedButton");
			//buttonTester.style.width = "120px";
			buttonTester.style.paddingLeft = "40px";
			buttonTester.style.paddingRight = "40px";
			buttonTester.style.marginLeft = "30px";
			buttonTester.style.marginRight = "30px";
			buttonTester.style.marginTop = "15px";
			buttonTester.style.marginBottom = "15px";
			//buttonTester.style.borderTop = "1px solid #ffffff";
			//buttonTester.style.borderRight = "1px solid #ffffff";
			window.location.href = web;
			buttonTester.innerHTML = "Tester";*/
			//buttonTester.setAttribute("href", "https://www.lemonde.fr");
			//tdButtonTester.appendChild(buttonTester);
			
			tableTestExtTt1.appendChild(tdDownload1);
			
			// Instructions d'installation
			var tdLabelInstructionsInst = document.createElement("td");
			tdLabelInstructionsInst.style.borderLeft = "2px solid #ffffff";
			var labelInstructionsInst = document.createElement("div");
			labelInstructionsInst.style.fontSize = "18px";
			labelInstructionsInst.style.paddingLeft = "20px";
			labelInstructionsInst.style.paddingRight = "20px";
			labelInstructionsInst.style.textDecoration = "underline";
			labelInstructionsInst.style.cursor = "pointer";
			labelInstructionsInst.innerHTML = "Instructions d'installation";
			
			var th = this;
			
			labelInstructionsInst.onclick = function()
			{
				var popup = new Util.MessageWindowConfirmation(th.InstructionInst1, 0);
				popup.PopupBase.Node.childNodes[1].childNodes[0].childNodes[0].setAttribute("align", "left");
				popup.PopupBase.Node.childNodes[1].childNodes[0].childNodes[0].style.fontWeight = "normal";
				popup.SetVisible(true);
			}	
			
			tdLabelInstructionsInst.appendChild(labelInstructionsInst);
			tableTestExtTt1.appendChild(tdLabelInstructionsInst);
			
			divTest1.appendChild(tableTestExtTt1);
			divExtPremiums.appendChild(divTest1);
			
			// Select plugins by detecting the browser.
			if(Cor.IsChrome == true) th.SelectPluginsWeb(0, tableTestExtTt1, th);
			else if(Cor.IsMozillaF == true)
			{
				selectPlugins1.selectedIndex = 1;
				
				th.SelectPluginsWeb(1, tableTestExtTt1, th);
			}
			else if(Cor.IsSafari == true)
			{
				selectPlugins1.selectedIndex = 2;
				
				th.SelectPluginsWeb(2, tableTestExtTt1, th);
			}
			
			// Separator
			var divSep = document.createElement("div");
			divSep.style.marginTop = "20px";
			divSep.style.borderTop = "2px solid red";
			divExtPremiums.appendChild(divSep);
			
			// Label Title
			var label3 = document.createElement("div");
			label3.style.fontWeight = "bold";
			label3.style.fontSize = "18px";
			label3.style.paddingTop = "20px";
			label3.style.paddingBottom = "20px";
			label3.innerHTML = "Corrigez directement vos documents dans les outils de bureautique sans copier-coller :";
			divExtPremiums.appendChild(label3);
			
			// Table extension 1
			var tableDoc = this.CreateTableExtension([["images/Conf_PluginWord2.png", "images/Conf_PluginOutlook.png"],
													  ["images/Conf_PluginPowerPoint.png", "images/Conf_PluginExcel2.png"],
													  ["images/Conf_PluginOpenOffice.png", "images/Conf_PluginLibreOffice.png"],
													  ["images/Conf_GoogleDocs.png", "images/Conf_WordOnline.png"]]);
			
			divExtPremiums.appendChild(tableDoc);
		
			// Title test
			var divTest2 = document.createElement("div");
			divTest2.style.backgroundColor = "#f5f3f3";
			divTest2.style.paddingBottom = "10px";
			
			var labelTest2 = document.createElement("div");
			labelTest2.setAttribute("align", "center");
			labelTest2.style.fontWeight = "bold";
			labelTest2.style.fontSize = "18px";
			labelTest2.style.paddingTop = "10px";
			labelTest2.style.paddingBottom = "20px";
			labelTest2.style.color = "#e04343";
			labelTest2.innerHTML = "Testez des plugins gratuitement et sans compte !";
			divTest2.appendChild(labelTest2);
			
			// Table of test
			var tableTestExtTt2 = document.createElement("table");
			tableTestExtTt2.setAttribute("align", "center");
			//tableTestExtTt.style.backgroundColor = "#f5f3f3";
			tableTestExtTt2.style.border = "1px solid #ffffff";
			
			// Select plugins
			var tdSelectPlugins = document.createElement("td");
			
			var selectPlugins2 = document.createElement("select");
			selectPlugins2.style.marginLeft = "20px";
			var optionGoogleDocs = document.createElement("option");
			optionGoogleDocs.innerHTML = "Google Docs";
			selectPlugins2.appendChild(optionGoogleDocs);
			var optionGoogleSheets = document.createElement("option");
			optionGoogleSheets.innerHTML = "Google Sheets";
			selectPlugins2.appendChild(optionGoogleSheets);
			var optionLibreOffice = document.createElement("option");
			optionLibreOffice.innerHTML = "LibreOffice";
			selectPlugins2.appendChild(optionLibreOffice);
			var optionOpenOffice = document.createElement("option");
			optionOpenOffice.innerHTML = "OpenOffice";
			selectPlugins2.appendChild(optionOpenOffice);
			var optionWordOnline = document.createElement("option");
			optionWordOnline.innerHTML = "Word Online";
			selectPlugins2.appendChild(optionWordOnline);
			var optionExcelOnline = document.createElement("option");
			optionExcelOnline.innerHTML = "Excel Online";
			selectPlugins2.appendChild(optionExcelOnline);
			var optionWord2016 = document.createElement("option");
			optionWord2016.innerHTML = "Word 2016 - Windows et Mac";
			selectPlugins2.appendChild(optionWord2016);
			var optionExcel2016 = document.createElement("option");
			optionExcel2016.innerHTML = "Excel 2016 - Windows et Mac";
			selectPlugins2.appendChild(optionExcel2016);
			tdSelectPlugins.appendChild(selectPlugins2);
			
			selectPlugins2.onchange = function()
			{
				var index = this.selectedIndex;
				var table = this.parentNode.parentNode;
				
				if(index == 0)
				{
					table.childNodes[1].childNodes[0].src = "images/Plugins_logo/logo_GoogleDocs2.png";
					th.InstructionInst2 = Premium.Exp_Setup_GoogleDocs;
					
					var aDownloadGd = table.childNodes[2].childNodes[0];
					aDownloadGd.href = "https://chrome.google.com/webstore/detail/spell-checker-and-grammar/kpopjaeamijjhcgcodlbnoelgihljjkl";
					aDownloadGd.onclick = null;
				}
				else if(index == 1)
				{
					table.childNodes[1].childNodes[0].src = "images/Plugins_logo/logo_GoogleSheets2.png";
					th.InstructionInst2 = Premium.Exp_Setup_GoogleSheets;
					
					var aDownloadGd = table.childNodes[2].childNodes[0];
					aDownloadGd.href = "https://chrome.google.com/webstore/detail/spell-checker-and-grammar/jenfkmingepgdhdbcmdlgfnhogifjcgh";
					aDownloadGd.onclick = null;
				}
				else if(index == 2)
				{
					table.childNodes[1].childNodes[0].src = "images/Plugins_logo/logo_Libreoffice2.png";
					th.InstructionInst2 = Premium.Exp_Setup_LibreOffice;
					
					// Bug. Microsoft Edge download an .zip file instead of .oxt. Warn the user to do not use Microsoft Edge.
					var aDownloadLo = table.childNodes[2].childNodes[0];
					if(Cor.IsEdge == true)
					{
						var msgOtherEdge = "Utilisez un navigateur autre que Microsoft Edge pour t" + String.fromCharCode(233) + "l" + String.fromCharCode(233) + "charger l'extension sous LibreOffice ou OpenOffice : Google Chrome, Mozilla Firefox, Safari, Internet Explorer, etc.";
						aDownloadLo.removeAttribute("href");
						aDownloadLo.style.cursor = "pointer";
						aDownloadLo.onclick = function()
						{
							var popup = new Util.MessageWindowConfirmation(msgOtherEdge, 0);
							popup.SetVisible(true); 
						};
						
						th.InstructionInst2 = msgOtherEdge;
					}
					else aDownloadLo.href = "https://extensions.libreoffice.org/extensions/spell-checker-and-grammar-checker-by-scribens";
				}
				else if(index == 3)
				{
					table.childNodes[1].childNodes[0].src = "images/Plugins_logo/logo_Openoffice2.png";
					th.InstructionInst2 = Premium.Exp_Setup_OpenOffice;
					
					// Bug. Microsoft Edge download an .zip file instead of .oxt. Warn the user to do not use Microsoft Edge.
					var aDownloadOo = table.childNodes[2].childNodes[0];
					if(Cor.IsEdge == true)
					{
						var msgOtherEdge = "Utilisez un navigateur autre que Microsoft Edge pour t" + String.fromCharCode(233) + "l" + String.fromCharCode(233) + "charger l'extension sous LibreOffice ou OpenOffice : Google Chrome, Mozilla Firefox, Safari, Internet Explorer, etc.";
						aDownloadOo.removeAttribute("href");
						aDownloadOo.onclick = function()
						{
							var popup = new Util.MessageWindowConfirmation(msgOtherEdge, 0);
							popup.SetVisible(true); 
						};
						
						th.InstructionInst2 = msgOtherEdge;
					}
					else aDownloadOo.href = "http://extensions.openoffice.org/fr/node/18542";
				}
				else if(index == 4)
				{
					table.childNodes[1].childNodes[0].src = "images/Plugins_logo/logo_WordOnline2.png";
					th.InstructionInst2 = Premium.Exp_Setup_WordExcelOnline;
					
					var aDownloadGd = table.childNodes[2].childNodes[0];
					aDownloadGd.href = "https://store.office.com/en-ca/app.aspx?assetid=WA104380587";
					aDownloadGd.onclick = null;
				}
				else if(index == 5)
				{
					table.childNodes[1].childNodes[0].src = "images/Plugins_logo/logo_ExcelOnline2.png";
					th.InstructionInst2 = Premium.Exp_Setup_WordExcelOnline;
					
					var aDownloadGd = table.childNodes[2].childNodes[0];
					aDownloadGd.href = "https://store.office.com/en-ca/app.aspx?assetid=WA104380587";
					aDownloadGd.onclick = null;
				}
				else if(index == 6)
				{
					table.childNodes[1].childNodes[0].src = "images/Plugins_logo/logo_WordOnline2.png";
					th.InstructionInst2 = Premium.Exp_Setup_WordExcel_2016;
					
					var aDownloadGd = table.childNodes[2].childNodes[0];
					aDownloadGd.href = "https://store.office.com/en-ca/app.aspx?assetid=WA104380587";
					aDownloadGd.onclick = null;
				}
				else if(index == 7)
				{
					table.childNodes[1].childNodes[0].src = "images/Plugins_logo/logo_ExcelOnline2.png";
					th.InstructionInst2 = Premium.Exp_Setup_WordExcel_2016;
					
					var aDownloadGd = table.childNodes[2].childNodes[0];
					aDownloadGd.href = "https://store.office.com/en-ca/app.aspx?assetid=WA104380587";
					aDownloadGd.onclick = null;
				}
			};
			
			
			tableTestExtTt2.appendChild(tdSelectPlugins);
			
			// Logo
			var tdImgLogo2 = document.createElement("td");
			tdImgLogo2.style.borderRight = "2px solid #ffffff";
			var imgLogo2 = document.createElement("img");
			imgLogo2.src = "images/Plugins_logo/logo_GoogleDocs2.png";
			imgLogo2.style.marginLeft = "30px";
			imgLogo2.style.marginRight = "20px";
			imgLogo2.style.marginTop = "5px";
			imgLogo2.style.marginBottom = "5px";
			tdImgLogo2.appendChild(imgLogo2);
			tableTestExtTt2.appendChild(tdImgLogo2);
			
			// Button tester
			var tdDownload2 = document.createElement("td");
			
			var aDownload2 = document.createElement("a");
			aDownload2.style.textDecoration = "underline";
			aDownload2.innerHTML = "T" + String.fromCharCode(233) + "l" + String.fromCharCode(233) + "charger";
			aDownload2.href = "https://chrome.google.com/webstore/detail/scribens-correcteur-dorth/djpeecijcbigpoijldkimmkilekocdao?hl=fr";
			aDownload2.target = "_blank";
			aDownload2.style.marginLeft = "30px";
			aDownload2.style.marginRight = "30px";
			aDownload2.style.marginTop = "15px";
			aDownload2.style.marginBottom = "15px";
			
			tdDownload2.appendChild(aDownload2);
			tableTestExtTt2.appendChild(tdDownload2);
			
			// Instructions d'installation
			var tdLabelInstructionsInst2 = document.createElement("td");
			tdLabelInstructionsInst2.style.borderLeft = "2px solid #ffffff";
			var labelInstructionsInst2 = document.createElement("div");
			labelInstructionsInst2.style.fontSize = "18px";
			labelInstructionsInst2.style.paddingLeft = "10px";
			labelInstructionsInst2.style.paddingRight = "10px";
			labelInstructionsInst2.style.textDecoration = "underline";
			labelInstructionsInst2.style.cursor = "pointer";
			labelInstructionsInst2.innerHTML = "Instructions d'installation";
			labelInstructionsInst2.onclick = function()
			{
				var popup = new Util.MessageWindowConfirmation(th.InstructionInst2, 0);
				popup.PopupBase.Node.childNodes[1].childNodes[0].childNodes[0].setAttribute("align", "left");
				popup.PopupBase.Node.childNodes[1].childNodes[0].childNodes[0].style.fontWeight = "normal";
				popup.SetVisible(true);
			}	
			tdLabelInstructionsInst2.appendChild(labelInstructionsInst2);
			tableTestExtTt2.appendChild(tdLabelInstructionsInst2);
			
			divTest2.appendChild(tableTestExtTt2);
			divExtPremiums.appendChild(divTest2);
			
			// Separator
			var divSep = document.createElement("div");
			divSep.style.marginTop = "20px";
			divSep.style.borderTop = "2px solid #f5f3f3";
			divExtPremiums.appendChild(divSep);
			
			// Label Others
			var label3 = document.createElement("div");
			label3.style.fontWeight = "bold";
			label3.style.fontSize = "18px";
			label3.style.paddingTop = "10px";
			label3.style.paddingBottom = "20px";
			label3.innerHTML = "Autres :";
			divExtPremiums.appendChild(label3);
			
			// Table extension web 2
			var tableExtWeb = this.CreateTableExtension([["images/Conf_PluginMozillaThunderbird.png", ""]]);
			
			divExtPremiums.appendChild(tableExtWeb);
			
			// Separator
			var divSep = document.createElement("div");
			divSep.style.marginTop = "20px";
			divSep.style.borderTop = "2px solid #f5f3f3";
			divExtPremiums.appendChild(divSep);
			
			// Label 6
			var label6 = document.createElement("div");
			label6.style.fontWeight = "bold";
			label6.style.paddingTop = "20px";
			label6.style.paddingBottom = "20px";
			label6.style.fontSize = "18px";
			label6.innerHTML = "Comment utiliser Scribens ?";
			divExtPremiums.appendChild(label6);
			
			// Video 1
			var divFrame0 = document.createElement("div");
			divFrame0.setAttribute("align", "center");
			var iframe0 = document.createElement("iframe");
			iframe0.setAttribute("width", 600);
			iframe0.setAttribute("height", 360);
			iframe0.style.marginBottom = "20px";
			//iframe0.style.verticalAlign = "center";
			//iframe0.setAttribute("align", "center");
			iframe0.src = "https://www.youtube.com/embed/b4ZspAD0MSo?;vq=hd720";
			divFrame0.appendChild(iframe0);
			divExtPremiums.appendChild(divFrame0);
			
			// Label 7
			var label7 = document.createElement("div");
			label7.style.fontWeight = "bold";
			label7.style.paddingBottom = "20px";
			label7.style.fontSize = "18px";
			label7.innerHTML = "Scribens sur Mozilla Firefox et Google Chrome.";
			divExtPremiums.appendChild(label7);
			
			// Video 2
			var divFrame1 = document.createElement("div");
			divFrame1.setAttribute("align", "center");
			var iframe1 = document.createElement("iframe");
			iframe1.setAttribute("width", 600);
			iframe1.setAttribute("height", 360);
			iframe1.style.marginBottom = "20px";
			iframe1.src = "https://www.youtube.com/embed/EO9HJFWZoS0?;vq=hd720";
			divFrame1.appendChild(iframe1);
			divExtPremiums.appendChild(divFrame1);
			
			// Screenshots
			var tableScreenShots = this.CreateTableScreenShot(["images/ScreenShots/scPluginsScribens1.png",
															   "images/ScreenShots/scPluginsScribens2.png",
															   "images/ScreenShots/scPluginsScribens3.png",
															   "images/ScreenShots/scPluginsScribens4.png",
															   "images/ScreenShots/scPluginsScribens5.png"]);
			
			//tableScreenShots.style.marginLeft = "5px";
			divExtPremiums.appendChild(tableScreenShots);
			
			this.MainDiv.appendChild(divExtPremiums);
		}
		
		// Create div style premium
		this.CreateDivStylePremium = function()
		{
			var divStylePremium = document.createElement("div");
			divStylePremium.className = "Prem-TexteBasePremium";
			divStylePremium.setAttribute("align", "left");
			divStylePremium.style.display = "none";
			divStylePremium.style.padding = "30px";
			/* divStylePremium.style.paddingTop = "15px"; */
			
			// Label 0
			var label0 = document.createElement("div");
			label0.innerHTML = String.fromCharCode(8208) + " D" + String.fromCharCode(233) + "tection des r" + String.fromCharCode(233) + "p" + String.fromCharCode(233) + "titions.";
			label0.style.marginTop = "5px";
			label0.style.marginBottom = "10px";
			divStylePremium.appendChild(label0);
			
			// Label 1
			var label1 = document.createElement("div");
			label1.innerHTML = String.fromCharCode(8208) + " D" + String.fromCharCode(233) + "tection des phrases longues et des phrases comportant un trop grand nombre de virgules.";
			label1.style.marginTop = "5px";
			label1.style.marginBottom = "10px";
			divStylePremium.appendChild(label1);
			
			// Label 2
			var label2 = document.createElement("div");
			label2.innerHTML = String.fromCharCode(8208) + " D" + String.fromCharCode(233) + "tection des mots et expressions appartenant " + String.fromCharCode(224) + " des registres particuliers : vulgaire, p" + String.fromCharCode(233) + "joratif, familier, anglicisme, etc.";
			label2.style.marginTop = "5px";
			label2.style.marginBottom = "10px";
			divStylePremium.appendChild(label2);
			
			// Label 3
			var label3 = document.createElement("div");
			label3.innerHTML = String.fromCharCode(8208) + " Usage des verbes tr" + String.fromCharCode(232) + "s fr" + String.fromCharCode(233) + "quents tels que avoir, faire, mettre, etc. dans certaines expressions et propositions de remplacement de son verbe par un autre.";
			label3.style.marginTop = "5px";
			label3.style.marginBottom = "10px";
			divStylePremium.appendChild(label3);
			
			// Label 4
			var label4 = document.createElement("div");
			label4.innerHTML = String.fromCharCode(8208) + " D" + String.fromCharCode(233) + "tection de pl" + String.fromCharCode(233) + "onasmes et propositions de solutions.";
			label4.style.marginTop = "5px";
			label4.style.marginBottom = "10px";
			divStylePremium.appendChild(label4);
			
			// Label 5
			var label5 = document.createElement("div");
			label5.innerHTML = String.fromCharCode(8208) + " Propositions de synonymes d'un mot.";
			label5.style.marginTop = "5px";
			label5.style.marginBottom = "10px";
			divStylePremium.appendChild(label5);
			
			// Label 6
			var label6 = document.createElement("div");
			label6.innerHTML = String.fromCharCode(8208) + " D" + String.fromCharCode(233) + "tection de tournures de phrases erron" + String.fromCharCode(233) + "es ou in" + String.fromCharCode(233) + "l" + String.fromCharCode(233) + "gantes (15 types) et propositions de reformulations.";
			label6.style.marginTop = "5px";
			label6.style.marginBottom = "15px";
			divStylePremium.appendChild(label6);
			
			// Video
			var divFrame = document.createElement("div");
			divFrame.setAttribute("align", "center");
			var iframe = document.createElement("iframe");
			iframe.setAttribute("width", 600);
			iframe.setAttribute("height", 360);
			iframe.style.marginBottom = "20px";
			iframe.src = "https://www.youtube.com/embed/wcBBd2zCCmM?;vq=hd720";
			divFrame.appendChild(iframe);
			divStylePremium.appendChild(divFrame);
			
			// Screenshots
			var tableScreenShots = this.CreateTableScreenShot(["images/ScreenShots/scRedaction1.png",
															   "images/ScreenShots/scRedaction2.png",
															   "images/ScreenShots/scRedaction3.png",
															   "images/ScreenShots/scRedaction4.png"]);
			
			//tableScreenShots.style.marginLeft = "5px";
			divStylePremium.appendChild(tableScreenShots);
			
			this.MainDiv.appendChild(divStylePremium);
		}
		
		// Create div divers premium
		this.CreateDivDiversPremium = function()
		{
			var divDiversPremium = document.createElement("div");
			divDiversPremium.className = "Prem-TexteBasePremium";
			divDiversPremium.setAttribute("align", "left");
			divDiversPremium.style.display = "none";
			divDiversPremium.style.padding = "30px";
			//divDiversPremium.style.paddingTop = "15px";
			
			// Label 0
			var label0 = document.createElement("div");
			label0.innerHTML = String.fromCharCode(8208) + " Statistiques sur le texte : nombre de paragraphes, de phrases, lisibilit" + String.fromCharCode(233) + ", etc.";
			label0.style.marginTop = "5px";
			label0.style.marginBottom = "10px";
			divDiversPremium.appendChild(label0);
			
			// Label 1
			var label1 = document.createElement("div");
			label1.innerHTML = String.fromCharCode(8208) + " 150 s" + String.fromCharCode(233) + "ries d'exercices d'orthographe.";
			label1.style.marginTop = "5px";
			label1.style.marginBottom = "10px";
			divDiversPremium.appendChild(label1);
			
			// Label 2
			var label2 = document.createElement("div");
			label2.innerHTML = String.fromCharCode(8208) + " Un dictionnaire des citations tr" + String.fromCharCode(232) + "s complet.";
			label2.style.marginTop = "5px";
			label2.style.marginBottom = "10px";
			divDiversPremium.appendChild(label2);
			
			// Label 3
			var label3 = document.createElement("div");
			label3.innerHTML = String.fromCharCode(8208) + " R" + String.fromCharCode(233) + "glages des param" + String.fromCharCode(232) + "tres de la d" + String.fromCharCode(233) + "tection.";
			label3.style.marginTop = "5px";
			label3.style.marginBottom = "20px";
			divDiversPremium.appendChild(label3);
			
			// Video
			var divFrame = document.createElement("div");
			divFrame.setAttribute("align", "center");
			var iframe = document.createElement("iframe");
			iframe.setAttribute("width", 600);
			iframe.setAttribute("height", 360);
			iframe.style.marginBottom = "20px";
			iframe.src = "https://www.youtube.com/embed/RvC2WQWIky8?;vq=hd720";
			divFrame.appendChild(iframe);
			divDiversPremium.appendChild(divFrame);
			
			// Screenshots
			var tableScreenShots = this.CreateTableScreenShot(["images/ScreenShots/scFctDivers1.png",
															   "images/ScreenShots/scFctDivers2.png",
															   "images/ScreenShots/scFctDivers3.png",
															   "images/ScreenShots/scFctDivers3.png"]);
			
			//tableScreenShots.style.marginLeft = "5px";
			divDiversPremium.appendChild(tableScreenShots);
			
			this.MainDiv.appendChild(divDiversPremium);
		}
		
	
		this.MainDiv = document.createElement('div');
		this.MainDiv.className = "c-noBorder";
		this.MainDiv.style.backgroundColor = "white";
		this.MainDiv.style.borderStyle = "solid";
		this.MainDiv.style.borderColor = "#d0d0d0";
		this.MainDiv.style.borderWidth = "1px";
		this.MainDiv.setAttribute("align", "center");
		
		// Label 1.
		var label1 = document.createElement('div');
		label1.className = "Prem-TexteBasePremium c-background";
		label1.innerHTML = "Vous souhaitez acc" + String.fromCharCode(233) + "der " + String.fromCharCode(224) + " toutes les fonctionnalit" + String.fromCharCode(233) + "s de Scribens ?";
		label1.style.fontSize = "24px";
		label1.style.color = "#2E2E2E";
		label1.style.marginBottom = "10px";
		
		this.MainDiv.appendChild(label1);
		
		// Label 2.
		var label2 = document.createElement('div');
		label2.className = "Prem-TexteBasePremium";
		label2.innerHTML = "Avec la version Premium, profitez de tous les avantages en illimit" + String.fromCharCode(233) + " !";
		label2.style.fontSize = "18px";
		label2.style.color = "#64676e";
		
		label1.appendChild(label2);
		
	
	
	
		// Offers
		// création de la ligne ("pseudo tableau") qui contiendra toutes les offres
		var tableOffers = document.createElement('table');
		tableOffers.id = "tableauOffres";
	
	 
		// Offer 0(vignette0)
		//bandeau de titre
		var bandeau0 = document.createElement('div');
		bandeau0.innerHTML = "1 MOIS";
		bandeau0.className = "c-bandeau";
		bandeau0.id = "bandeau";
		bandeau0.className = "bandeau";
		
		// icon du panier
		var iconPanier = document.createElement("i");
		iconPanier.className = "caddie";
		iconPanier.style.color = "000";
		
		// bouton Commander
		var button0 = document.createElement('button');
		button0.style.cursor = "pointer";
		button0.className = "buttonPremium Cor-RedButton";
		button0.innerText = " Commander";
		button0.appendChild(iconPanier); // pour ajouter l'icone au bouton
		button0.onclick = function()
		{
			if(Cor.Connexion == false) Cor.Handler_Connexion();
			// Si connecté, se met au panneau MonCompte
			else Cor.Handler_VersionPremium(false);
		}
	
		// Contenu de la vignette
		var wrapper0 = document.createElement('div');
		wrapper0.className = "wrapper underline";
		var contenu0 = document.createElement('div');
		contenu0.id = "contenu0";
		contenu0.className = "contenu0";
		contenu0.innerHTML = "5,90 €";
		wrapper0.appendChild(contenu0);
			
		//création de la vignette
		var div0 = document.createElement('td'); 
		div0.className = " vignette zoomIn ZoomOut bckgnd-white";
		// def de la taille 
		div0.style.border = "solid 1px #d0d0d0";
	
		// Ajout du bandeau dans la vignette
		div0.appendChild(bandeau0); 
	
		// ajout du contenu
		div0.appendChild(wrapper0);
	
		//ajout du bouton dans la vignette
		div0.appendChild(button0);
	
		// ajout vignette0 dans le "pseudo-tableau"
		tableOffers.appendChild(div0);
	
	
	
		// Offer 1(vignette1)
		//bandeau de titre
		var bandeau1 = document.createElement('div');
		bandeau1.innerHTML = "3 MOIS";
		bandeau1.className = "c-bandeau";
		bandeau1.id = "bandeau";
		bandeau1.className = "bandeau";
		
	
		// icon du panier
		var iconPanier = document.createElement("i");
		iconPanier.className = "caddie";
		iconPanier.style.color = "000";
		
	
		// bouton Commander
		var button1 = document.createElement('button');
		button1.style.cursor = "pointer";
		button1.className = "buttonPremium Cor-RedButton";
		button1.innerText = " Commander";
		button1.appendChild(iconPanier); // pour ajouter l'icone au bouton
		button1.onclick = function()
		{
			if(Cor.Connexion == false) Cor.Handler_Connexion();
			// Si connecté, se met au panneau MonCompte
			else Cor.Handler_VersionPremium(false);
		}
	
		// Contenu de la vignette
		var wrapper1 = document.createElement('div');
		wrapper1.className = "wrapper underline";
		var contenu1 = document.createElement('div');
		contenu1.id = "contenu0";
		contenu1.className = "contenu0 red";
		contenu1.innerHTML = "14,90 €";
		wrapper1.appendChild(contenu1);
		
		//sousContenu
		var sous_contenu1 = document.createElement('div');
		sous_contenu1.id = "sousContenu";
		sous_contenu1.className = "sousContenu ";
		sous_contenu1.innerHTML = "4,97 € / mois (-16%)";
		wrapper1.appendChild(sous_contenu1);

		
		//création de la vignette
		var div1 = document.createElement('td');
		div1.id = "vignette1";
		div1.className = "zoomIn ZoomOut bckgnd-white vignette";
		// def de la taille 
		div1.style.border = "solid 1px #d0d0d0";
	
		// Ajout du bandeau dans la vignette
		div1.appendChild(bandeau1); 
		
		// ajout du contenu
		div1.appendChild(wrapper1);
	 
	
		//ajout du bouton dans la vignette
		div1.appendChild(button1);
	
		// ajout vignette0 dans le "pseudo-tableau"
		tableOffers.appendChild(div1);
	
	
	
		// Offer 2(vignette2)
		//bandeau de titre
		var bandeau2 = document.createElement('div');
		bandeau2.innerHTML = "1 AN";
		bandeau2.className = "c-bandeau";
		bandeau2.id = "bandeau";
		bandeau2.className = "bandeau";
		
	
		// icon du panier
		var iconPanier = document.createElement("i");
		iconPanier.className = "caddie";
		iconPanier.style.color = "000";
		
	
		// bouton Commander
		var button2 = document.createElement('button');
		button2.style.cursor = "pointer";
		button2.className = "buttonPremium Cor-RedButton";
		button2.innerText = " Commander";
		button2.appendChild(iconPanier); // pour ajouter l'icone au bouton
		button2.onclick = function()
		{
			if(Cor.Connexion == false) Cor.Handler_Connexion();
			// Si connecté, se met au panneau MonCompte
			else Cor.Handler_VersionPremium(false);
		}
	
	
		// Contenu de la vignette
		var wrapper2 = document.createElement('div');
		wrapper2.className = "wrapper underline";
		var contenu2 = document.createElement('div');
		contenu2.id = "contenu0";
		contenu2.className = "contenu0";
		contenu2.innerHTML = "39,90 €";
		wrapper2.appendChild(contenu2);
	
		//sousContenu
		var sous_contenu2 = document.createElement('div');
		sous_contenu2.id = "sousContenu";
		sous_contenu2.className = "sousContenu";
		sous_contenu2.innerHTML = "4,33 € / mois (-44%)";
		wrapper2.appendChild(sous_contenu2);
		
	
		//création de la vignette
		var div2 = document.createElement('td');
		div2.id = "vignette2";
		div2.className = "zoomIn ZoomOut bckgnd-white vignette";
		// def de la taille 
		div2.style.border = "solid 1px #d0d0d0";
	
		// Ajout du bandeau dans la vignette
		div2.appendChild(bandeau2); 
		
		
		// ajout du contenu
		div2.appendChild(wrapper2);
	
		//ajout du bouton dans la vignette
		div2.appendChild(button2);
	
		// ajout vignette0 dans le "pseudo-tableau"
		tableOffers.appendChild(div2);
		
		//placement dans la vue de la ligne (ou du "pseudo tableaus")
		this.MainDiv.appendChild(tableOffers);
		 
	
	
	/////////////////////////////////////////////////////////
	//       Commenté car non présent sur le mockUp        //
	/////////////////////////////////////////////////////////
	
		/* // Bouton groupes
		// création div qui contiendra le bouton
		var divGrp = document.createElement('div');
		divGrp.style.marginTop = "10px";
		
		//création du bouton
		var imgButtonGroup = document.createElement('img');
		imgButtonGroup.src = "images/OffresSpecEntreprise.png";
		imgButtonGroup.style.cursor = "pointer";
		imgButtonGroup.style.marginBottom = "10px";
		imgButtonGroup.onclick = function()
		{
			var imgButtonGroupCom = document.getElementById("imgButtonGroupCom");
			if(imgButtonGroupCom.style.display == "none") imgButtonGroupCom.style.display = "block";
			else imgButtonGroupCom.style.display = "none";
		}
		
		//ajout du bouton dans la div
		divGrp.appendChild(imgButtonGroup);
		
		//création du 2 eme bouton suite à la condition
		var imgButtonGroupCom = document.createElement('img');
		imgButtonGroupCom.src = "images/AbonnementAchatsGroupes.png";
		imgButtonGroupCom.style.display = "none";
		imgButtonGroupCom.id = "imgButtonGroupCom";
		
	
		//placement du bouton dans la div
		divGrp.appendChild(imgButtonGroupCom);
		
		//placement dans la vue
		this.MainDiv.appendChild(divGrp);
		
	*/
	
		function addActive(elem){
			$('.wrappTabs .Cor-TabOptions li').removeClass('active');
			$(elem).addClass('active')
		}
		
		// Tab advantages.
		var wrappUl = document.createElement("div");
		wrappUl.className = "wrappTabs";
	
		var ul = document.createElement("ul");
		ul.className = "Cor-TabOptions Tabs tabs-number-4";
		ul.style.marginTop = '10px';
		ul.id = "TabPrem";
		
	
		var li_VPrem = document.createElement("li");
		li_VPrem.className = "Cor-LiOptions Tabs__tab Tab active ";
		li_VPrem.onclick = function(event){
			th.OpenDiv(0);
			addActive(event.target.parentNode)
		};
		var a_VPrem = document.createElement("a");
		a_VPrem.innerHTML = "Version Premium";
		li_VPrem.appendChild(a_VPrem);
		ul.appendChild(li_VPrem);
		
	
		var li_Plugins = document.createElement("li");
		li_Plugins.className = "Cor-LiOptions Tabs__tab Tab";
		li_Plugins.onclick = function(event){
			th.OpenDiv(1);
			addActive(event.target.parentNode)
		};
		var a_Plugins = document.createElement("a");
		a_Plugins.innerHTML = "Extensions";
		li_Plugins.appendChild(a_Plugins);
		ul.appendChild(li_Plugins);
		
	
		var li_Style = document.createElement("li");
		li_Style.className = "Cor-LiOptions Tabs__tab Tab";
		li_Style.onclick = function(event){
			th.OpenDiv(2);
			addActive(event.target.parentNode)
		};
		var a_Style = document.createElement("a");
		var labelOthers = "Autres";
		if(Cor.IdLangue == "en") labelOthers = "Others";
		a_Style.innerHTML = "Style";
		li_Style.appendChild(a_Style);
		ul.appendChild(li_Style);
		
	
		var li_Divers = document.createElement("li");
		li_Divers.className = "Cor-LiOptions Tabs__tab Tab";
		li_Divers.onclick = function(event){
			th.OpenDiv(3);
			addActive(event.target.parentNode)
		};
		var a_Divers = document.createElement("a");
		var labelOthers = "Divers";
		if(Cor.IdLangue == "en") labelOthers = "Others";
		a_Divers.innerHTML = "Divers";
		li_Divers.appendChild(a_Divers);
		ul.appendChild(li_Divers);
	
	
		var li_slider = document.createElement("li");
		li_slider.className = "Cor-LiSlider Tabs__tab Tab Tabs__presentation-slider";
		ul.appendChild(li_slider);
	
		wrappUl.appendChild(ul);
		
		this.MainDiv.appendChild(wrappUl);
		
		// Create div resum premium
		this.CreateDivResumPremium();
		
		// Create div ext premium
		this.CreateDivExtPremium();
		
		// Create div style premium
		this.CreateDivStylePremium();
		
		// Create div divers premium
		this.CreateDivDiversPremium();
		
		// Open div event
		this.OpenDiv = function(index)
		{
	
			$('.Prem-TexteBasePremium').removeClass('open');
			this.MainDiv.childNodes[index + 3].classList.add('open'); 
	
			// var ulPrem = document.getElementById("TabPrem");
			
			// for(var i = 5; i < mainDiv.childNodes.length; i++)
			// {
			// 	var tab = mainDiv.childNodes[i];
			// 	if(i == (index + 5))
			// 	{
			// 		tab.style.display = 'block';
			// 		var panel = ulPrem.childNodes[i - 5];
			// 		//panel.style.backgroundColor = "#434343";
			// 		panel.firstChild.style.color = "#0085ca";
			// 	} else {
			// 		tab.style.display = 'none';
			// 		//ulPrem.childNodes[i].className = "Prem-LiTab a";
			// 		//ulPrem.childNodes[i - 5].style.backgroundColor = "red";
			// 		var panel = ulPrem.childNodes[i - 5];
			// 		//panel.style.backgroundColor = "f1f1f1";
			// 		/* panel.style.backgroundColor = "#f1f1f1"; */
			// 		panel.firstChild.style.color = "#888c96";
			// 	}
			// }
		}
	},
	
	// Update account informations
	UpdateInformationsCompte : function()
	{
		// Name
		var label_UserName = document.getElementById("Info_UserName");
		label_UserName.innerHTML = Cor.User.UserName;
		
		// Email
		var label_Email = document.getElementById("Info_Email");
		label_Email.innerHTML = Cor.User.Identifiant;
		
		// Password
		var label_Password = document.getElementById("Info_Password");
		var password = Cor.User.MotDePasse;
		var passwordEt = "";
		for(var i = 0; i < password.length; i++) passwordEt += "*";
		label_Password.innerHTML = passwordEt;
		
		// InfEvolution
		var cb_infoEvolutions = document.getElementById("Info_InfEvol");
		if(cb_infoEvolutions != null)
		{
			cb_infoEvolutions.checked = Cor.User.InfEvolutions;
		}
		
		// Type d'abonnement
		var label_TypeAbn = document.getElementById("Info_TypeAbonneemnt");
		if(label_TypeAbn != null)
		{
			//label_TypeAbn.style.fontWeight = "bold";
			
			var typeAbonnementLabel = "-";
			if(Cor.User.TypeAbonnement != null)
			{
				if(Cor.User.TypeAbonnement.indexOf("P1M") == 0) typeAbonnementLabel = "Premium 1 mois";
				else if(Cor.User.TypeAbonnement.indexOf("P3M") == 0) typeAbonnementLabel = "Premium 3 mois";
				else if(Cor.User.TypeAbonnement.indexOf("P1A") == 0) typeAbonnementLabel = "Premium 1 an";
			}
			
			label_TypeAbn.innerHTML = typeAbonnementLabel;
		}
		
		// Date d'expiration
		var label_DateExpiration = document.getElementById("Info_DateExpiration");
		if(label_DateExpiration != null)
		{
			var dateExpirationLabel = "-";
			if(Cor.User.DateExpiration.length > 0)
			{
				if(!(Cor.User.TypeAbonnement != null && Cor.User.TypeAbonnement == "TRIAL"))
				{
					dateExpirationLabel = Util.GetDateSt(Cor.User.DateExpiration);
				}
			}
			
			label_DateExpiration.innerHTML = dateExpirationLabel;
		}
	
		Premium.MajButtonPayPal();
	},
	
	BlockInfo : function(title)
	{
		var td = document.createElement("td");
		var divCont = document.createElement("div");
		divCont.className = "Prem-GridInformationsCompte";
		td.style.verticalAlign = "top";
		td.className = "td-rules";
		
		if(Cor.ModeAbonnePremium == true)
		{
			var divTitle = document.createElement("div");
			divTitle.innerHTML = title;		
			divTitle.id = "titleBlockinfo";
			divTitle.className = "Regles-TitreSommaire";
	
			divCont.appendChild(divTitle);
		}
	
		td.appendChild(divCont);
		
		return td;
	},
	
	// Panel of personal information
	PanelInfoPerso : function(panelIntermediate)
	{
		var blockInfo = Premium.BlockInfo("MES INFORMATIONS");
		blockInfo.style.padding = "30px 10px 0 20px";
		blockInfo.style.width = "676px";
		
		// Table of personal info
		var tablePersonalInfo = document.createElement("table");
		tablePersonalInfo.style.marginTop= "40px";
		
		
		// User name
		var trUserName = document.createElement("tr");
		var tdLabelUserName = document.createElement("td");
		tdLabelUserName.className = "info-labels-persos";
		tdLabelUserName.innerHTML = "Nom d'utilisateur :";
		trUserName.appendChild(tdLabelUserName);
		
		var tdUserName = document.createElement("td");
		tdUserName.id = "Info_UserName";
		tdUserName.className = "info-persos";
		trUserName.appendChild(tdUserName);
		
		tablePersonalInfo.appendChild(trUserName);
		
		// E-mail (identifiant)
		var trEmail = document.createElement("tr");
		var tdLabelEmail = document.createElement("td");
		tdLabelEmail.className = "info-labels-persos";
		tdLabelEmail.innerHTML = "E-mail";
		trEmail.appendChild(tdLabelEmail);
		
		var tdEmail = document.createElement("td");
		tdEmail.id = "Info_Email";
		tdEmail.className = "info-persos";
		trEmail.appendChild(tdEmail);
		
		tablePersonalInfo.appendChild(trEmail);
		
		// Password
		var trPassword = document.createElement("tr");
		
		var tdLabelPassword = document.createElement("td");	
		tdLabelPassword.className = "info-labels-persos";
		tdLabelPassword.innerHTML = "Mot de passe";
		trPassword.appendChild(tdLabelPassword);
		
		var tdPassword = document.createElement("td");
		tdPassword.id = "Info_Password";
		tdPassword.className = "info-persos";
		trPassword.appendChild(tdPassword);//placement dans la ligne
		tablePersonalInfo.appendChild(trPassword);//placement dans la table
		
		blockInfo.firstChild.appendChild(tablePersonalInfo);//placement dans le block info
	
	
		var compteMdpOublie = document.createElement("div");
		compteMdpOublie.id = "compteMdpOublie"; 
		blockInfo.firstChild.appendChild(compteMdpOublie);
		// Lost Password
		var labelLostPassword = document.createElement("div");
		labelLostPassword.style.fontSize = "17px";
		labelLostPassword.innerHTML = "Mot de oublié ?";
		compteMdpOublie.appendChild(labelLostPassword);
		
		// R�cup�ration du password
		var labelRecPassword = document.createElement("div");
		labelRecPassword.className = "Regles-TitreRegleSommaire";
		labelRecPassword.style.fontSize = "17px";
		labelRecPassword.style.cursor = "pointer";
		labelRecPassword.style.color = "#ff636e"
		labelRecPassword.innerHTML = "R" + String.fromCharCode(233) + "cup" + String.fromCharCode(233) + "rer le mot de passe.";
		compteMdpOublie.appendChild(labelRecPassword);
		
		labelRecPassword.onmouseover = function()
		{
			this.style.textDecoration = "underline";
		}
		labelRecPassword.onmouseout = function()
		{
			this.style.textDecoration = "none";
		}
		labelRecPassword.onclick = function()
		{
			if(Premium.PopupShiftPasswordI == null) Premium.PopupShiftPasswordI = new Premium.PopupShiftPassword();
					
			Premium.PopupShiftPasswordI.SetVisible(true);
		}
		
		// Infos r�guli�re
		var tableReg = document.createElement("table");
		tableReg.className = "grey-border-top";
		tableReg.style.marginBottom = "19px";
		
		var tdCheckBox = document.createElement("td");
		var checkBox = document.createElement("input");
		checkBox.setAttribute("type", "checkbox");
		checkBox.checked = true;		// Checked by default
		checkBox.id = "Info_InfEvol";
		checkBox.onclick = function()
		{
			Premium.MajButtonPayPal();
			
			Cor.User.InfEvolutions = this.checked;
		
			// Mise � jour dans la base de donn�es.
			Util.SendHttpRequest('Identification_Servlet',
								[['FunctionName', 'MajData'],
								 ['DataName', 'InfEvolutions'],
								 ['DataValue', ((this.checked) ? 1 : 0)],
								 ['TableName', 'abonnement_client'],
								 ['Id', Cor.User.Identifiant]],
								 null);
		}
		var tdLabelCheckBox3 = document.createElement("label"); 
		tdLabelCheckBox3.htmlFor = "Info_InfEvol";

		tdCheckBox.appendChild(checkBox);
		tdCheckBox.appendChild(tdLabelCheckBox3);
		tableReg.appendChild(tdCheckBox);
		
		var tdLabelReceiveInfo = document.createElement("td");
		tdLabelReceiveInfo.style.paddingLeft = "10px";
		tdLabelReceiveInfo.innerHTML = "Je souhaite recevoir des informations sur l'offre Premium et ses " + String.fromCharCode(233) + "volutions.";
		tableReg.appendChild(tdLabelReceiveInfo);
		
		blockInfo.firstChild.appendChild(tableReg);
		
	
		//div pour aligner les deux boutons
		var boutonsInfo = document.createElement("div");
		boutonsInfo.className = "btn-inline"
	
		// Contacter le service client.
		var divContactSvcClient = document.createElement("div");
		divContactSvcClient.className = "Cor-RedButton2";
	
		var adivContactSvcClient = document.createElement("a");
		//adivContactSvcClient.className = "Cor-RedButton";
		adivContactSvcClient.href = "mailto:contact@scribens.fr";
		adivContactSvcClient.innerHTML = "<span class='picto-mail'></span> Contacter le service client";
		divContactSvcClient.appendChild(adivContactSvcClient);
		boutonsInfo.appendChild(divContactSvcClient);//placement dans boutonsInfo
		
	
		// Se d�sinscrire
		var divDesinscrire = document.createElement("div");
		divDesinscrire.className = "Cor-greyButton";
		
	
	
		divDesinscrire.innerHTML = "<span class='picto-cross'></span> Se d" + String.fromCharCode(233) + "sinscrire";
		divDesinscrire.onclick = function()
		{
			Premium.Desinscription();
		}		
 
		
		boutonsInfo.appendChild(divDesinscrire);//placement dans blockinfo
	
		blockInfo.firstChild.appendChild(boutonsInfo);//placement dans boutonsInfo
		
	
	
		return blockInfo;
	},
	
	// Panel mon abonnement
	PanelMonAbonnement : function()
	{
		var blockInfo = Premium.BlockInfo("MON ABONNEMENT");
		blockInfo.style.padding = "30px 20px 0 10px";
		
		// Table of personal info
		var tableInfoAbn = document.createElement("table");
		tableInfoAbn.style.marginTop= "40px";
		
		// Type abonnement
		var trTypeAbonnement = document.createElement("tr");
		var tdLabelTypeAbonnement = document.createElement("td");
		tdLabelTypeAbonnement.className = "info-labels-persos";
		tdLabelTypeAbonnement.innerHTML = "Type d'abonnement :";
		trTypeAbonnement.appendChild(tdLabelTypeAbonnement);
		
		var tdTypeAbonnement = document.createElement("td");
		tdTypeAbonnement.id = "Info_TypeAbonneemnt";
		tdTypeAbonnement.className = "info-persos";
		trTypeAbonnement.appendChild(tdTypeAbonnement);
		
		tableInfoAbn.appendChild(trTypeAbonnement);
		
		// Date d'expiration
		var trDateExpiration = document.createElement("tr");
		var tdLabelDateExpiration = document.createElement("td");
		tdLabelDateExpiration.className = "info-labels-persos";
		tdLabelDateExpiration.innerHTML = "Date d'expiration :";
		trDateExpiration.appendChild(tdLabelDateExpiration);
		
		var tdDateExpiration = document.createElement("td");
		tdDateExpiration.id = "Info_DateExpiration";
		tdDateExpiration.className = "info-persos";
		trDateExpiration.appendChild(tdDateExpiration);
		
		tableInfoAbn.appendChild(trDateExpiration);
		
		blockInfo.firstChild.appendChild(tableInfoAbn);
		
		// Renouvellement abonnement
		var labelRenouvAbonnement = document.createElement("div");
		labelRenouvAbonnement.className = "renouvel-abo grey-border-top";
		labelRenouvAbonnement.style.marginBottom = "20px";
		labelRenouvAbonnement.innerHTML = "JE VEUX RENOUVELER MON ABONNEMENT";	
		blockInfo.firstChild.appendChild(labelRenouvAbonnement);
		
		// Choix de l'abonnement.
		var tableChoiceAbonnement = document.createElement("div");
		
		// 1 an
		var tr1An = document.createElement("tr");
		tr1An.style.position = "relative";
		var td1AnCb = document.createElement("input");
		td1AnCb.setAttribute("type", "radio");
		td1AnCb.setAttribute("name", "Abn");
		td1AnCb.id = "Radio1An";
		td1AnCb.onclick = function()
		{
			Premium.MajButtonPayPal();
		}
		var td1Label = document.createElement("label");
		td1Label.htmlFor = "Radio1An";
		tr1An.appendChild(td1AnCb);
		tr1An.appendChild(td1Label);
		
		var td1AnLabel = document.createElement("td");
		td1AnLabel.className = "duree";
		td1AnLabel.innerHTML = "<span>1 an</span> - 39.90 " + String.fromCharCode(8364) + " TTC (3.33 " + String.fromCharCode(8364) + " / mois)";
		tr1An.appendChild(td1AnLabel);
		
		tableChoiceAbonnement.appendChild(tr1An);


		
		// 3 mois
		var tr3Mois = document.createElement("tr");
		var td3MoisCb = document.createElement("input");
		tr3Mois.style.position = "relative";
		td3MoisCb.setAttribute("type", "radio");
		td3MoisCb.setAttribute("name", "Abn");
		td3MoisCb.id = "Radio3Mois";
		td3MoisCb.onclick = function()
		{
			Premium.MajButtonPayPal();
		}
		var td2Label = document.createElement("label");
		td2Label.htmlFor = "Radio3Mois";
		tr3Mois.appendChild(td3MoisCb);
		tr3Mois.appendChild(td2Label);
		
		var td3MoisLabel = document.createElement("td");
		td3MoisLabel.className = "duree";
		td3MoisLabel.innerHTML = "<span>3 mois</span> - 14.90 " + String.fromCharCode(8364) + " TTC (4.97 " + String.fromCharCode(8364) + " / mois)";
		tr3Mois.appendChild(td3MoisLabel);
		
		tableChoiceAbonnement.appendChild(tr3Mois);



		
		// 1 mois
		var tr1Mois = document.createElement("tr");
		tr1Mois.style.position = "relative";
		var td1MoisCb = document.createElement("input");
		td1MoisCb.setAttribute("type", "radio");
		td1MoisCb.setAttribute("name", "Abn");
		td1MoisCb.checked = true;
		td1MoisCb.id = "Radio1Mois";
		td1MoisCb.onclick = function()
		{
			Premium.MajButtonPayPal();
		}
		var td3Label = document.createElement("label");
		td3Label.htmlFor = "Radio1Mois";
		tr1Mois.appendChild(td1MoisCb);
		tr1Mois.appendChild(td3Label);
		
		var td1MoisLabel = document.createElement("td");
		td1MoisLabel.className = "duree";
		td1MoisLabel.innerHTML = "<span>1 mois</span> - 5.90 " + String.fromCharCode(8364) + " TTC";
		tr1Mois.appendChild(td1MoisLabel);
		
		tableChoiceAbonnement.appendChild(tr1Mois);
		
		blockInfo.firstChild.appendChild(tableChoiceAbonnement);
		


		
		// Accord renouvellement automatique
		var tableAccordAut = document.createElement("table");
		tableAccordAut.className = "grey-border-top";
		tableAccordAut.style.marginTop = "15px";
		tableAccordAut.style.marginBottom = "22px";
		//tableAccordAut.style.marginLeft = "13px";
		
		var tdCheckBox = document.createElement("td");
		var checkBox = document.createElement("input");
		checkBox.setAttribute("type", "checkbox");
		checkBox.id = "CbRenouvAut";
		checkBox.onclick = function()
		{
			Premium.MajButtonPayPal();
		}
		var tdSpanCheckBox = document.createElement("label"); 
		tdSpanCheckBox.htmlFor = "CbRenouvAut";
		
		tdCheckBox.appendChild(checkBox);
		tdCheckBox.appendChild(tdSpanCheckBox);
		tableAccordAut.appendChild(tdCheckBox);
		
		var tdLabelReceiveInfo = document.createElement("td");
		tdLabelReceiveInfo.style.paddingLeft = "10px";
		tdLabelReceiveInfo.innerHTML = "Je souhaite renouveler automatiquement mon abonnement (n" + String.fromCharCode(233) + "cessite un compte PayPal).";
		tableAccordAut.appendChild(tdLabelReceiveInfo);
		
		blockInfo.firstChild.appendChild(tableAccordAut);
		
		// Accord conditions g�n�rales
		var tableAccordCondGen = document.createElement("table");
		tableAccordCondGen.style.marginTop = "15px";
		tableAccordCondGen.style.marginBottom = "16px";
		
		var tdCheckBox = document.createElement("td");
		var checkBox = document.createElement("input");
		checkBox.setAttribute("type", "checkbox");
		checkBox.id = "CbCGV";
		checkBox.onclick = function()
		{
			Premium.MajButtonPayPal();
		}
		var tdLabelCheckBox2 = document.createElement("label"); 
		tdLabelCheckBox2.htmlFor = "CbCGV";
		tdCheckBox.appendChild(checkBox);
		tdCheckBox.appendChild(tdLabelCheckBox2);
		tableAccordCondGen.appendChild(tdCheckBox);
		
		var tdLabelReceiveInfo = document.createElement("td");
		tdLabelReceiveInfo.style.paddingLeft = "10px";
		tdLabelReceiveInfo.innerHTML = "Vous devez accepter les <a href='https://www.scribens.fr/download/CGV_Scribens.txt' target=\"_blank\">conditions g" + String.fromCharCode(233) + "n" + String.fromCharCode(233) + "rales de vente</a> pour continuer.";
		tableAccordCondGen.appendChild(tdLabelReceiveInfo);
		
		blockInfo.firstChild.appendChild(tableAccordCondGen);
		
		// Button PayPal
		var divButtonPayPal = document.createElement("div");
		divButtonPayPal.setAttribute("align", "center");
		//divButtonPayPal.style.marginLeft = "10px";
		divButtonPayPal.style.cursor = "pointer";
		divButtonPayPal.id = "IdButtonPayPal";
		divButtonPayPal.className = "Cor-RedButton2" ;
		divButtonPayPal.onclick = function()
		{
			var cbCGV = document.getElementById("CbCGV");
			if(cbCGV.checked == false)
			{
				if(Premium.PopupCGV == null) Premium.PopupCGV = new Util.MessageWindowConfirmation("Vous devez accepter les conditions g" + String.fromCharCode(233) + "n" + String.fromCharCode(233) + "rales pour continuer.", 0);
			
				Premium.PopupCGV.SetVisible(true);
			}
		};
		
		divButtonPayPal.innerHTML = "<span class='picto-caddie'></span> Acheter";
		blockInfo.firstChild.appendChild(divButtonPayPal);
		

		//partie Logo Paiement
		var encartLogo = document.createElement("div");
		encartLogo.id ="encartLogo";
		imgPaiement = document.createElement("img");
		imgPaiement.src = "images/paiements.jpg";
		

		//placements 
		encartLogo.appendChild(imgPaiement);
		blockInfo.firstChild.appendChild(encartLogo);

		
		return blockInfo;
	},
	
	// Row of a plugin
	TrPlugins : function(utilisation, instructionInst, title, imgSrc, imgSrc_Supp, linkDownload)
	{
		var trPlugin = document.createElement("tr");
		
		// Utilisation
		var tdUtilisation = document.createElement("td");
		tdUtilisation.className = "td";
		tdUtilisation.innerHTML = utilisation;
		
		if(title == "Google Chrome")
		{
			tdUtilisation.style.borderbottom = "1px solid #d6d9df";
			tdUtilisation.style.borderRight = "1px solid #d6d9df";
		}
		if(title == "Mozilla Firefox")
		{
			tdUtilisation.style.borderbottom = "1px solid #d6d9df";
			tdUtilisation.style.borderRight = "1px solid #d6d9df";
		}
		else if(title == "Safari (Mac)")
		{
			tdUtilisation.style.borderbottom = "1px solid #d6d9df";
			tdUtilisation.style.borderRight = "1px solid #d6d9df";
			
		}
		else{
			tdUtilisation.style.borderBottom = "1px solid #d6d9df";
			tdUtilisation.style.borderRight = "1px solid #d6d9df";
		}

		
		trPlugin.appendChild(tdUtilisation);
		
		// Title
		var tdTitle = document.createElement("td");
		tdTitle.className = "tdTitle";		
		
		var divTitle = document.createElement("div");
		divTitle.innerHTML = title;
		divTitle.style.fontSize = "16px";
		divTitle.style.marginBottom = "10px";

	
		var img = document.createElement("img");
		img.src = imgSrc;

		
		
		tdTitle.appendChild(img);
		tdTitle.appendChild(divTitle);
		
		// Bug. Microsoft Edge download an .zip file instead of .oxt. Warn the user to do not use Microsoft Edge.
		if(((title == "LibreOffice Writer" ) || (title == "OpenOffice Writer" )) && (Cor.IsEdge == true)) {
			var aDownload = document.createElement("div");
				aDownload.style.textDecoration = "underline";
				aDownload.style.color = "#e04343";
				aDownload.style.cursor = "pointer";
				aDownload.innerHTML = "Télécharger";
				aDownload.onclick = function()
				{
					var popup = new Util.MessageWindowConfirmation("Utilisez un navigateur autre que Microsoft Edge pour t" + String.fromCharCode(233) + "l" + String.fromCharCode(233) + "charger l'extension sous LibreOffice ou OpenOffice : Google Chrome, Mozilla Firefox, Safari, Internet Explorer, etc.", 0);
					popup.SetVisible(true); 
				};
			tdTitle.appendChild(aDownload);
			}// Normal mode	
		else {
			var aDownload = document.createElement("a");
				aDownload.className = "Regles-TitreRegleSommaire margin-top-0"
				/*aDownload.style.backgroundImage = imgSrc_Supp;
				aDownload.style.backgroundImage = "no-repeat";
				aDownload.style.height = "90px"; */

				aDownload.innerHTML = "Télécharger";
				
				// 2 differents extensions for Google Chrome.
				if(title == "Google Chrome" && Cor.IdLangue == "fr") linkDownload = "https://chrome.google.com/webstore/detail/scribens-correcteur-dorth/djpeecijcbigpoijldkimmkilekocdao?hl=fr";
				
				aDownload.href = linkDownload;
				aDownload.target = "_blank";

			divTitle.appendChild(aDownload);
		}

		trPlugin.appendChild(tdTitle);	
		
		
		/* // Image supp
		if(imgSrc_Supp.length > 0)
		{
			var img_Supp = document.createElement("img");
			img_Supp.src = imgSrc_Supp;
			//tdLogo.appendChild(img_Supp);
		} */
		//trPlugin.appendChild(tdLogo);
		
		// Instructions d'installation
		var tdInstructionInst = document.createElement("td");
			tdInstructionInst.id = "tdInstructionInst";
			tdInstructionInst.style.borderRight = "1px solid #d6d9df";
			tdInstructionInst.style.borderBottom = "1px solid #d6d9df";			
		//link
		var divInstructionInst = document.createElement("div");
			divInstructionInst.className = "c-divInstructionInst Regles-TitreRegleSommaire";
			divInstructionInst.innerHTML = "Instructions d'installation";
			divInstructionInst.onclick = function()
			{
				// Bug. Microsoft Edge download an .zip file instead of .oxt. Warn the user to do not use Microsoft Edge.
				if(((title == "LibreOffice Writer" ) || (title == "OpenOffice Writer" )) && (Cor.IsEdge == true))
				{
					var popup = new Util.MessageWindowConfirmation("Utilisez un navigateur autre que Microsoft Edge pour t" + String.fromCharCode(233) + "l" + String.fromCharCode(233) + "charger l'extension sous LibreOffice ou OpenOffice : Google Chrome, Mozilla Firefox, Safari, Internet Explorer, etc.", 0);
					popup.SetVisible(true); 
				}
				// Normal mode
				else
				{
					var popup = new Util.MessageWindowConfirmation(instructionInst, 0);
					popup.PopupBase.Node.childNodes[1].childNodes[0].childNodes[0].setAttribute("align", "left");
					popup.PopupBase.Node.childNodes[1].childNodes[0].childNodes[0].style.fontWeight = "normal";
					popup.SetVisible(true);
				}
			};

		tdInstructionInst.appendChild(divInstructionInst);
		trPlugin.appendChild(tdInstructionInst);
		
		return trPlugin;
	},
	
	// Panel of extensions
	PanelExtensions : function()
	{
		var blockInfo = Premium.BlockInfo("T" + String.fromCharCode(233) + "l" + String.fromCharCode(233) + "chargements des extensions Scribens");
			blockInfo.id = "DLExtensions";
		var tablePlugins = document.createElement("table");
			tablePlugins.className = "tablePlugins";
			tablePlugins.style.width = "100%";
			tablePlugins.style.display = "table";
			tablePlugins.style.marginBottom = "25px";
			tablePlugins.style.borderLeft = "1px solid #d6d9df";
			
		// 1. Titles.
		var trTitles = document.createElement("tr");
		trTitles.style.backgroundColor = "#f6f6f6";
		trTitles.style.height = "65px";

		
		// Utilisation
		var tdUtilisation = document.createElement("td");
			tdUtilisation.innerHTML = "UTILISATION";
			tdUtilisation.style.width = "50%";
			tdUtilisation.style.textAlign = "center";
			tdUtilisation.style.fontWeight = "bold";
			tdUtilisation.style.borderRight = "1px solid #d6d9df";
			tdUtilisation.style.borderBottom = "1px solid #d6d9df";
		trTitles.appendChild(tdUtilisation);
		
		/* // Logo // cellule pour le logo

		var tdLogo = document.createElement("td");
		trTitles.appendChild(tdLogo); */
		
		// Titre
		var tdTitle = document.createElement("td");
			tdTitle.innerHTML = "EXTENSION";
			tdTitle.style.width = "25%";
			tdTitle.style.textAlign = "center";
			tdTitle.style.fontWeight = "bold";
			tdTitle.style.borderRight = "1px solid #d6d9df";
			tdTitle.style.borderBottom = "1px solid #d6d9df";
			trTitles.appendChild(tdTitle);
		
		
		// Instructions d'installations
		var tdInstructionInst = document.createElement("td");		
		tdInstructionInst.innerHTML = "INSTRUCTIONS D'INSTALLATION";
		tdInstructionInst.style.width = "25%";
		tdInstructionInst.style.textAlign = "center";
		tdInstructionInst.style.fontWeight = "bold";
		tdInstructionInst.style.borderRight = "1px solid #d6d9df";
		tdInstructionInst.style.borderBottom = "1px solid #d6d9df";


		trTitles.appendChild(tdInstructionInst);
		
		tablePlugins.appendChild(trTitles);
		
		// 1. Google Chrome
		tablePlugins.appendChild(Premium.TrPlugins("",
													Premium.Exp_Setup_GoogleChrome,
													"Google Chrome",
													"images/Plugins_logo/logo_chrome2.png",
													"",
													"https://chrome.google.com/webstore/detail/spell-checker-and-grammar/dmgkiikdlhmpikkhpiplldicbnicmboc"));
		
		// 2. Firefox
		tablePlugins.appendChild(Premium.TrPlugins("<p>Correction sur Internet</p>" +
													"<p>- Messagerie : Gmail, Hotmail, Outlook.com, Yahoo, Orange, etc.</p>" +
													"<p>- R" + String.fromCharCode(233) + "seaux sociaux : Facebook, Twitter, LinkedIn, Instagram, etc.</p>" +
													"<p>- Sites avec zones de texte : LeBonCoin.fr, sites de blogs, forums, formulaires, etc.</p>",
													Premium.Exp_Setup_MozillaFirefox,
													"Mozilla Firefox",
													"images/Plugins_logo/logo_firefox2.png",
													"",
													"https://addons.mozilla.org/fr/firefox/addon/plugin-scribens-english"));
		
		// 3. Safari
		tablePlugins.appendChild(Premium.TrPlugins("",
													Premium.Exp_Setup_Safari,
													"Safari (<b>Mac</b>)",
													"images/Plugins_logo/logo_Safari2.png",
													"",
													"https://www.scribens.com/download/Scribens.safariextz"));
												   
		// 4. Microsoft Office 2016 for Windows and Mac
		tablePlugins.appendChild(Premium.TrPlugins("<p>Correction de documents Word et de feuilles Excel sous Microsoft Word 2016 et Microsoft Excel 2016. Windows et Mac.</p>",
													Premium.Exp_Setup_WordExcel_2016,
													"Word 2016<br>Excel 2016<br><b>Windows</b> et <b>Mac</b>",
													"images/Plugins_logo/logo_WordOnline2.png",
													"images/Plugins_logo/logo_ExcelOnline2.png",
													"https://store.office.com/en-ca/app.aspx?assetid=WA104380587"));
		
		// 5. Microsoft Office
		tablePlugins.appendChild(Premium.TrPlugins("<p>Correction de documents Word, feuilles Excel, Pr" + String.fromCharCode(233) + "sentations PowerPoint, Emails sous Outlook.</p>",
													Premium.Exp_Setup_MicrosoftOffice,
													"Microsoft Office",
													"images/Plugins_logo/logo_MSOffice2.png",
													"",
													"https://www.scribens.com/download/Scribens_MicrosoftOffice.exe"));
		
		// 6. LibreOffice Writer
		tablePlugins.appendChild(Premium.TrPlugins("<p>Correction de documents sous LibreOffice Writer.</p>",
													Premium.Exp_Setup_LibreOffice,
													"LibreOffice Writer",
													"images/Plugins_logo/logo_LibreOffice2.png",
													"",
													"http://extensions.libreoffice.org/extensions/spell-checker-and-grammar-checker-by-scribens"));
		
		// 7. OpenOffice Writer
		tablePlugins.appendChild(Premium.TrPlugins("<p>Correction de documents sous OpenOffice Writer.</p>",
												   	Premium.Exp_Setup_OpenOffice,
												   	"OpenOffice Writer",
												   	"images/Plugins_logo/logo_OpenOffice2.png",
												   	"",
												   	"http://extensions.openoffice.org/fr/node/18542"));
												   
		// 8. Google Docs
		tablePlugins.appendChild(Premium.TrPlugins("<p>Correction de documents sous Google Docs.</p>",
												   	Premium.Exp_Setup_GoogleDocs,
												   	"Google Docs",
												   	"images/Plugins_logo/logo_GoogleDocs2.png",
												   	"",
												   	"https://chrome.google.com/webstore/detail/spell-checker-and-grammar/kpopjaeamijjhcgcodlbnoelgihljjkl"));
		
		// 9. Google Sheets
		tablePlugins.appendChild(Premium.TrPlugins("<p>Correction de feuilles sous Google Sheets.</p>",
												   	Premium.Exp_Setup_GoogleSheets,
												   	"Google Sheets",
												   	"images/Plugins_logo/logo_GoogleSheets2.png",
												   	"",
												   	"https://chrome.google.com/webstore/detail/spell-checker-and-grammar/jenfkmingepgdhdbcmdlgfnhogifjcgh"));
		
		// 10. Microsoft Word Online
		tablePlugins.appendChild(Premium.TrPlugins("<p>Correction de documents sous Microsoft Word Online et Microsoft Excel Online.</p>",
												   	Premium.Exp_Setup_WordExcelOnline,
												   	"Word Online<br>Excel Online",
												   	"images/Plugins_logo/logo_WordOnline2.png",
												   	"images/Plugins_logo/logo_ExcelOnline2.png",
												   	"https://store.office.com/en-ca/app.aspx?assetid=WA104380587"));
		
		// 11. Mozilla Thunderbird
		tablePlugins.appendChild(Premium.TrPlugins("<p>Correction d'emails sous Mozilla Thunderbird.</p>",
												   	Premium.Exp_Setup_MozillaThunderbird,
												   	"Mozilla Thunderbird",
												   	"images/Plugins_logo/logo_Thunderbird2.png",
												   	"",
												   	"https://www.scribens.com/download/Scribens_MozillaThunderbird.exe"));
		
		blockInfo.firstChild.appendChild(tablePlugins);

		// Bouton retour version Premium
		var btnRetourVPremium = document.createElement("div");
		btnRetourVPremium.className = "Cor-RedButton";
		btnRetourVPremium.style.margin = "20px";
		//btnRetourVPremium.style.verticalAlign = "right";
		//btnRetourVPremium.style.align = "right";
		btnRetourVPremium.innerHTML = "<span class='picto-star'></span> Version Premium";
		btnRetourVPremium.onclick = function(){Cor.Handler_VersionPremium(true);}
		btnRetourVPremium.style.width = "max-content";
		
		// this.Node.appendChild(btnRetourVPremium);
		blockInfo.firstChild.appendChild(btnRetourVPremium);
		
		return blockInfo;
	},
	
	// Panel aide
	PanelAide : function()
	{
		var blockInfo = Premium.BlockInfo("Besoin d'aide ?");
		blockInfo.style.width = "350px";
			
		return blockInfo;
	},
	
	// Creation of Panel Mon Compte.
	PanelMonCompte : function()
	{
		this.Node = document.createElement("div");
		this.Node.className = "Prem-TexteBasePremium";
		this.Node.style.borderStyle = "solid";
		this.Node.style.borderColor = "#d0d0d0";
		this.Node.style.borderWidth = "1px";
		//this.Node.style.padding = "10px";
		//this.Node.style.paddingLeft = "14px";
		
		// Title
		var divTitle = document.createElement("div");
		//divTitle.style.marginBottom = "15px";
		divTitle.style.textAlign = "center";
		divTitle.className = "Regles-TitreSommaire";
		divTitle.innerHTML = "Mon compte";
		divTitle.style.fontSize = "30px";
		this.Node.appendChild(divTitle);
		
		// table generale
		var table = document.createElement("table");
		//table.setAttribute("cellspacing", "10px");
		//table.setAttribute("cellpadding", "10px");
		
		// Mes informations
		var panelInfoPerso = Premium.PanelInfoPerso(false);
		table.appendChild(panelInfoPerso);
		
		// Mon abonnement
		var panelMonAbonnement = Premium.PanelMonAbonnement();
		table.appendChild(panelMonAbonnement);
		
		this.Node.appendChild(table);
		
		// Les extensions
		var panelExtensions = Premium.PanelExtensions();
		this.Node.appendChild(panelExtensions);
		
		
		
		document.getElementById('MainDiv').appendChild(this.Node);
		
		// Update information account
		Premium.UpdateInformationsCompte();
	},
	
	// D�sinscription
	Desinscription : function()
	{
		var message = "<p><b>Souhaitez-vous vraiment vous d" + String.fromCharCode(233) + "sinscrire ?</b></p>";
							
		// Si l'utilisateur a un abonnement premium, l'en avertir.
		var typeAbonnementSt = Cor.User.TypeAbonnement;
		if(typeAbonnementSt != null && typeAbonnementSt.length > 0)
		{
			message += "<p><b>Vous perdrez alors votre abonnement Premium.</b></p>";
		}
	
		if(Premium.PopupDesinscriptionI == null) Premium.PopupDesinscriptionI = new Util.MessageWindowConfirmation(message, 2);
		
		Premium.PopupDesinscriptionI.SetVisible(true);
	},
	
	// Mise � jour du bouton Paypal
	MajButtonPayPal : function()
	{
		var htmlButtonPayPal = "";
		
		// Mise � jour du bouton PayPal	
		var typeAbonnement = "";
		
		if(document.getElementById("Radio1Mois").checked == true) typeAbonnement = "P1M";
		else if(document.getElementById("Radio3Mois").checked == true) typeAbonnement = "P3M";
		else if(document.getElementById("Radio1An").checked == true) typeAbonnement = "P1A";
		
		// Renouvelement automatique
		var renouvAuto = false;
		var checkBoxRenouvAut = document.getElementById("CbRenouvAut");
		if(checkBoxRenouvAut != null && checkBoxRenouvAut.checked == true)
		{
			renouvAuto = true;
			typeAbonnement += "_RA";
		}
		
		// Inf evloution
		var infEvolutions = false;
		var cb_infoEvolutions = document.getElementById("Info_InfEvol");
		if(cb_infoEvolutions != null) infEvolutions = cb_infoEvolutions.checked;
		
		var sandBoxSt = "";
		
		// Valeur personnelle pour la transaction
		var vCustom = Cor.User.UserName + "||" + Cor.User.Identifiant + "||" + typeAbonnement + "||" + infEvolutions;
		
		// type d'abonnement
		var idButton = "";
	
		if(renouvAuto == false)
		{
			if(typeAbonnement == "P1M") idButton = "86GML6VPPDD7N";
			else if(typeAbonnement == "P3M") idButton = "NQBSJGRHJLPPN";
			else if(typeAbonnement == "P1A") idButton = "N25MUMZLJ9M78";
		}
		// Renouvellement automatique.
		else
		{
			/*if(typeAbonnement.startsWith("P1M"))  // Test SandBox. 8.90 EUR Tous les jours.
			{
				idButton = "RRM5P6W3ZF2HL";
				sandBoxSt = ".sandbox";
			}*/
			if(typeAbonnement.indexOf("P1M") == 0) idButton = "92BYM7AAVX45J";
			//else if(typeAbonnement.startsWith("P3M")) idButton = "2VRH2NHJNXGJ4";	// Test 2.90 EUR Tous les jours.
			else if(typeAbonnement.indexOf("P3M") == 0) idButton = "JNLFEEGAR42XN";
			else if(typeAbonnement.indexOf("P1A") == 0) idButton = "G6KT2FZF9UX36";
		}
	
		// Test Sandbox
		//if(typeAbonnement.equals("P3M")) idButton = "8PHUTQYVQFTNQ";
		//else if(typeAbonnement.equals("P1A")) idButton = "D53MEXK7HVNNG";
		
		var buttonPayPal = document.getElementById("IdButtonPayPal");
		
		var cb_CGV = document.getElementById("CbCGV");
		
		// Activation ou d�sactivation
		if(cb_CGV.checked == true)
		{
			$('#IdButtonPayPal').removeClass('Cor-RedButton2');
			// Live
			htmlButtonPayPal = "<form action=\"https://www" + sandBoxSt + ".paypal.com/cgi-bin/webscr\" method=\"post\" target=\"_top\">" +
			"<input type=\"hidden\" name=\"cmd\" value=\"_s-xclick\">" +
			"<input type=\"hidden\" name=\"charset\" value=\"utf-8\">" + 
			"<input type=\"hidden\" name=\"hosted_button_id\" value=\"" + idButton + "\">" +
			// Pratique pour pr�remplir les champs du paiment. Mais il ne faut pas les utiliser pour modifier la dur�e d'abonnement, car l'utilisateur peux changer l'adresse mail dans le champs. 
			// Paypal semble accepter tout type de format. Ex : ville = "(". L'utilisateur peut ensuite modifier ses coordonn�es dans la fen�tre de paiement Paypal.
			"<input type=\"hidden\" name=\"first_name\" value=\"" + Cor.User.UserName + "\">" +
			/*"<input type=\"hidden\" name=\"last_name\" value=\"" + Cor.User.Nom + "\">" +
			"<input type=\"hidden\" name=\"address1\" value=\"" + Cor.User.Adresse + "\">" +
			"<input type=\"hidden\" name=\"city\" value=\"" + Cor.User.Ville + "\">" +
			"<input type=\"hidden\" name=\"zip\" value=\"" + Cor.User.CodePostal + "\">" +
			"<input type=\"hidden\" name=\"night_phone_b\" value=\"" + Cor.User.Tel + "\">" +*/
			"<input type=\"hidden\" name=\"email\" value=\"" + Cor.User.Identifiant + "\">" +
			"<input type=\"hidden\" name=\"custom\" value=\"" + vCustom + "\">" +
			// Permet d'afficher en grand le paiement sans compte Paypal
			"<input type=\"hidden\" id=\"pageState\" name=\"pageState\" value=\"billing\">" +
			"<input id=\"btn-acheter-icon\" class=\"Cor-RedButton2\" type=\"image\" border=\"0\" name=\"submit\" alt=\"Acheter\" value=\"Acheter\">" +
			//"<input type=\"image\" src=\"images/BtnCommander.gif\" border=\"0\" name=\"submit\" alt=\"PayPal - la solution de paiement en ligne la plus simple et la plus sécurisée !\">" +
			"<img alt=\"\" border=\"0\" width=\"1\" height=\"1\">" +
			"</form>";
		}
		else
		{
			$('#IdButtonPayPal').addClass('Cor-RedButton2');
			// En mode disable
			htmlButtonPayPal = "<span class='picto-caddie'></span> Acheter";/* 		
					"<img alt=\"\" border=\"0\" src=\"https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_buynowCC_LG.gif\" border=\"0\" name=\"submit\" alt=\"PayPal - la solution de paiement en ligne la plus simple et la plus s�curis�e !\">" +
					//"<input type=\"image\" src=\"https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_buynowCC_LG.gif\" border=\"0\" name=\"submit\" alt=\"PayPal - la solution de paiement en ligne la plus simple et la plus s�curis�e !\">" +	
					//"<img alt=\"\" border=\"0\" src=\"images/BtnCommander.gif\" border=\"0\" name=\"submit\" alt=\"PayPal - la solution de paiement en ligne la plus simple et la plus s�curis�e !\">" +
					"<img alt=\"\" border=\"0\" src=\"https://www.paypalobjects.com/fr_FR/i/scr/pixel.gif\" width=\"1\" height=\"1\">"; */
		
			buttonPayPal.style.cursor = "pointer";
		}
		
		buttonPayPal.innerHTML = htmlButtonPayPal;
	},
	
	// Register handler of tools button
	Register_ClickHandlerBtn_Outils : function()
	{
		// Bouton connecteurs logiques
		var btnConnLog = document.getElementById('btnoutcon');
		
		btnConnLog.addEventListener("click", function()
		{
			Tools.Handler_Panel_ConnecteurLogiques();
		});
	
		// Bouton Formule de politesses
		var btnFormulePol = document.getElementById('btnoutpol');
		
		btnFormulePol.addEventListener("click", function()
		{
			Tools.Handler_Panel_FormulesPolitesse();
		});
		
		// Bouton pr�sentations de lettres
		var btnPresLettres = document.getElementById('btnoutlet');
		
		btnPresLettres.addEventListener("click", function()
		{
			Tools.Handler_Panel_PresentationLettres();
		});
	},
	
	// Panel of extension English
	PanelExtensionAPIEn : function()
	{
	
		// Extensions
		this.AddRow = function(imgSrc, imgSrc_Supp, label, link)
		{
			var tr = document.createElement("tr");
			
			// Image
			var tdImg = document.createElement("td");
			tdImg.setAttribute("align", "center");
			var divImg = document.createElement("div");
			var img = document.createElement("img");
			img.src = imgSrc;
			img.style.margin = "2px";
			img.width = "25";
			img.height = "25";
			divImg.appendChild(img);
			// Image supp
			if(imgSrc_Supp.length > 0)
			{
				var imgSupp = document.createElement("img");
				imgSupp.style.margin = "2px";
				imgSupp.width = "35";
				imgSupp.height = "35";
				imgSupp.src = imgSrc_Supp;
				divImg.appendChild(imgSupp);
			}
			tdImg.appendChild(divImg);
			tr.appendChild(tdImg);
			
			// Label
			var tdLabelExt = document.createElement("td");
			var labelExt = document.createElement("div");
			labelExt.style.fontSize = "16px";
			labelExt.style.marginLeft = "50px";
			labelExt.style.marginRight = "50px";
			labelExt.style.marginTop = "10px";
			labelExt.style.marginBottom = "10px";
			labelExt.style.textAlign = "center";
			labelExt.innerHTML = label;
			tdLabelExt.appendChild(labelExt);
			tr.appendChild(tdLabelExt);
			
			// Link
			var tdLink = document.createElement("td");
			var aLink = document.createElement("a");
			if(Cor.IdLangue == "fr")
				aLink.innerHTML = "Télécharger";
			else
				aLink.innerHTML = "Download";
			aLink.setAttribute("href", link);
			aLink.setAttribute("target", "_blank");
			aLink.setAttribute("class", "c-underline-D");
			aLink.style.padding = "15px";
			aLink.style.fontSize = "16px";
			aLink.style.fontStyle = "italic";
			aLink.style.textAlign = "center";
			tdLink.appendChild(aLink);
			tr.appendChild(tdLink);
			
			this.TableExt.appendChild(tr);
		}
	
		this.Node = document.createElement("div");
		this.Node.className = "Prem-TexteBasePremium extentions-api row";
		this.Node.setAttribute("align", "center");
		
		// Container
		var containerExtentions = document.createElement("div");
		containerExtentions.className = "col-xs-12 col-lg-6 item";
		var containerExtentionsWrapp = document.createElement("div");
		containerExtentionsWrapp.className = "side-extensions";
		containerExtentions.appendChild(containerExtentionsWrapp);
	
		// Title
		var labelTitleExt = document.createElement("div");
		labelTitleExt.innerHTML = "Extensions";
		labelTitleExt.className = "Regles-TitreSommaire"; 
		labelTitleExt.align = "center";
		containerExtentionsWrapp.appendChild(labelTitleExt);
	
		
		// Table
		this.TableExt = document.createElement("table");
	
		// Google Chrome
		this.AddRow('images/Plugins_logo/logo_chrome2.png', '', 'Google Chrome', 'https://chrome.google.com/webstore/detail/spell-checker-and-grammar/dmgkiikdlhmpikkhpiplldicbnicmboc');
		// Mozilla Firefox
		this.AddRow('images/Plugins_logo/logo_firefox2.png', '', 'Mozilla Firefox', 'https://addons.mozilla.org/fr/firefox/addon/plugin-scribens-english');
		// Safari
		this.AddRow('images/Plugins_logo/logo_Safari2.png', '' ,'Safari (Mac)', 'https://www.scribens.com/download/Scribens.safariextz');
		// Microsoft Word & Excel 2016
		this.AddRow('images/Plugins_logo/logo_WordOnline2.png', 'images/Plugins_logo/logo_ExcelOnline2.png', 'Word 2016 for Windows<br>Excel 2016 for Windows<br>Word 2106 for Mac<br>Excel 2016 for Mac<br>Word Online<br>Excel Online', 'https://store.office.com/en-ca/app.aspx?assetid=WA104380587');
		// Microsoft Office Suite
		this.AddRow('images/Plugins_logo/logo_MSOffice2.png', '', 'Microsoft Office Suite', 'https://www.scribens.com/download/Scribens_MicrosoftOffice.exe');
		// LibreOffice
		this.AddRow('images/Plugins_logo/logo_LibreOffice2.png', '', 'LibreOffice', 'http://extensions.libreoffice.org/extensions/spell-checker-and-grammar-checker-by-scribens');
		// OpenOffice
		this.AddRow('images/Plugins_logo/logo_OpenOffice2.png', '', 'OpenOffice', 'http://extensions.openoffice.org/fr/node/18542');
		// Google Docs
		this.AddRow('images/Plugins_logo/logo_GoogleDocs2.png', '', 'Google Docs', 'https://chrome.google.com/webstore/detail/spell-checker-and-grammar/kpopjaeamijjhcgcodlbnoelgihljjkl');
		// Google Sheets
		this.AddRow('images/Plugins_logo/logo_GoogleSheets2.png', '', 'Google Sheets', 'https://chrome.google.com/webstore/detail/spell-checker-and-grammar/jenfkmingepgdhdbcmdlgfnhogifjcgh');
		// Mozilla Thunderbird
		this.AddRow('images/Plugins_logo/logo_Thunderbird2.png', '', 'Mozilla Thunderbird', 'https://www.scribens.com/download/Scribens_MozillaThunderbird.exe');
		// CKEditor
		this.AddRow('images/Plugins_logo/logo_CKEditor2.png', '', '<p>CKEditor</p><p>Integrate Scribens to your website.</p>', 'https://ckeditor.com/addon/scribens');
		
		containerExtentionsWrapp.appendChild(this.TableExt);
		this.Node.appendChild(containerExtentions);
		
		// Split
		// var divSep = document.createElement("div");
		// divSep.style.marginTop = "20px";
		// divSep.style.borderTop = "1px solid #707070";
		// this.Node.appendChild(divSep);
		
	
	
	
		// API
	
		// Container
		var containerApi = document.createElement("div");
		containerApi.className = "col-xs-12 col-lg-6 item";
		var containerApiWrapp = document.createElement("div");
		containerApiWrapp.className = "side-api";
		containerApi.appendChild(containerApiWrapp);
		
		// Title
		var labelTitleAPI = document.createElement("div");
		labelTitleAPI.innerHTML = "API";
		labelTitleAPI.id = "LabelAPI";
		labelTitleAPI.className = "Regles-TitreSommaire";
		containerApiWrapp.appendChild(labelTitleAPI);
		
		// Under Title
		var underTitleAPI = document.createElement("div");
		underTitleAPI.className = "intro";
		underTitleAPI.innerHTML = "<p>Add Scribens to your website in 10 minutes!</p>";
		containerApiWrapp.appendChild(underTitleAPI);
		
		// Example desc
		var exempleDesc = document.createElement("div");
		exempleDesc.style.marginTop = "0px";
		exempleDesc.style.marginBottom = "10px";
		exempleDesc.innerHTML = "<p>This example shows a possible Scribens integration with a text area of a website.</p>";
		containerApiWrapp.appendChild(exempleDesc);
		
		// Buttons
		var divButtons = document.createElement("div");
		divButtons.setAttribute('float', 'left');
		divButtons.style.marginTop = "20px";
		divButtons.style.marginBottom = "10px";
		
		// Load the Scribens Integration script.
		var script = document.createElement('script');
		script.src = "https://www.scribens.com/scribens-integration.js";
		document.head.appendChild(script);
		
		// Button 1.
		var button1 = document.createElement("button");
		button1.className = "Cor-RedButton";
		if(Cor.IdLangue == "fr")
				button1.innerHTML = "Cliquer ici pour vérifier ce texte.";
			else
				button1.innerHTML = "Click here to check this text.";
		button1.onclick = function(){Scribens.Check('frame1');};
		divButtons.appendChild(button1);
		
		// Button 2.
		// var button2 = document.createElement("button");
		// button2.innerHTML = "<img src='images/favico-tr-32x32.png'/>";
		// button2.style.marginLeft = "10px";
		// button2.onclick = function(){Scribens.Check('frame1');};
		// divButtons.appendChild(button2);
		
		containerApiWrapp.appendChild(divButtons);
		
		// Text Area
		var frame = document.createElement("iframe");
		frame.id = 'frame1'; 
		frame.style.fontFamily = "'Segoe-UI'";
		frame.onload = function() {
			this.contentDocument.body.setAttribute('contenteditable', 'true');
			this.contentDocument.body.setAttribute('spellcheck', 'false');
			this.contentDocument.body.innerHTML = "<p>This is an editable text areas of your website<br/>" +
												  "Lets integrate Scribens.<br/>" +
												  "Now, users can to check much mistake directly from your website !</p>";
		}
		
		containerApiWrapp.appendChild(frame);
		
		// Steps
		
		// Title
		var titleSteps = document.createElement("div");
		titleSteps.className = "intro";
		titleSteps.innerHTML = "<p>How to add Scribens?</p>";
		containerApiWrapp.appendChild(titleSteps);
		
		var tableSteps = document.createElement("table");
		
		// Step 1
		var trStep1 = document.createElement("tr");
		
		var tdStep11 = document.createElement("td");
		tdStep11.style.verticalAlign = "top";
		tdStep11.innerHTML = "Step&nbsp1:";
		trStep1.appendChild(tdStep11);
		
		var tdStep12 = document.createElement("td");
		tdStep12.innerHTML = "<p>Import <b>&lt;script src='https://www.scribens.com/scribens-integration.js'>&lt;/script&gt;</b></p>";
		tdStep12.style.paddingLeft = "30px";
		trStep1.appendChild(tdStep12);
		
		tableSteps.appendChild(trStep1);
	
		// Step 2
		var trStep2 = document.createElement("tr");
		
		var tdStep21 = document.createElement("td");
		tdStep21.style.verticalAlign = "top";
		tdStep21.innerHTML = "Step&nbsp2:";
		trStep2.appendChild(tdStep21);
		
		var tdStep22 = document.createElement("td");
		tdStep22.innerHTML = "<p>Call the function: <b>Scribens.Check(id)</b></p>" +
							 "<p><b>id</b> represents the <b>text area element id</b>. Available HTML elements are: <b>&lt;iframe>, &lt;textarea>, &lt;div></b> and <b>&lt;input></b>.</p>" +
							 "<p>If there is no parameter, then the function applies to the first text area of the page.</p>";
		
		tdStep22.style.paddingLeft = "30px";
		trStep2.appendChild(tdStep22);
		
		tableSteps.appendChild(trStep2);
		
		// Exemple
		var trExample = document.createElement("tr");
		
		var tdExample1 = document.createElement("td");
		tdExample1.style.verticalAlign = "top";
		tdExample1.innerHTML = "Example:";
		trExample.appendChild(tdExample1);
		
		var tdExample2 = document.createElement("td");
		tdExample2.innerHTML = "<p>&lt;button onclick=\"Scribens.Check('id1')\">Check your text.&lt;/button></p>" +
							   "<p>&lt;textarea id='id1'>&lt;/textarea></p>";
		tdExample2.style.paddingLeft = "30px";
		trExample.appendChild(tdExample2);
		
		tableSteps.appendChild(trExample);
	
		containerApiWrapp.appendChild(tableSteps);
			
		// Notice.
		var textNotice = document.createElement("div");
		textNotice.className = "intro";
		textNotice.innerHTML = "<p>This plugin is totally free and it will remain free.<br>We generate our revenue entirely from advertising.</p>";
		containerApiWrapp.appendChild(textNotice);
		this.Node.appendChild(containerApi);
		
		document.getElementById('MainDiv').appendChild(this.Node);
	},
	
	// Deconnexion
	Deconnexion : function()
	{	
		//cache le logo du compte à la deco
		document.getElementById("compte").remove();
		// Met à jour les labels des menus
		Premium.SetLabelBtnVersionPremium("VERSION PREMIUM");
		Premium.SetLabelBtnConnexion("Se connecter");
		
		//HIDE ACTIONS BUTTONS IF PREMIUM
		$('#actions').addClass('hidden');

		// Désafficache du sous-menu outil.
		$('#btnout').addClass('menuprem');
		$('.container-interface .sidebar').hide();
		// document.getElementById("btnout").style.visibility = "hidden";
		// document.getElementById("sub-btnout").style.visibility = "hidden";
		// document.getElementById("sub-btnout").style.display = "none";

		//Change number of tabs displayed for options
		$('.Cor-TabOptions').removeClass('tabs-number-3').addClass('tabs-number-1');

		//hide tabs Options_Slider on logout
		$('#Options_Slider').hide();
		
		//hide tabs Options_Slider on logout
		$('#Options_Slider').hide();

		// Connexion false
		Cor.Connexion = false;
		
		// Reinit user id and password.
		Cor.User.Identifiant = "";
		Cor.User.MotDePasse = "";
		
		// Clear cookies of identifiaction
		Util.SetCookie("IdentificationScribens", ";", 5000);
			
		// Set options to normal
		Options.SetModeAbonne(false);
		
		// Hide exercices button in rules panel.
		Rules.ShowExercicesButton(false);
		
		// Hide citation button.
		Dict.ShowButtonCit(false);
		
		// Cache l'ic�ne d'importation.
		// if(Cor.IdLangue == "fr") document.getElementById("LabelInput_ImportFile").style.display = "none";
		
		// Show the panel cor.
		Cor.Handler_Orthographe();
		
		// Revenir en mode orthographe
		if(Cor.ModeAbonnePremium == true)
		{
			Cor.ModeAbonnePremium = false;
				
			// Stop le signal d'identification. Très important.
			clearInterval(Cor.TimerIdentification);
			
			// Hide Style panel
			var divStyle = document.getElementById("StyleTexte");
			if(Cor.IsTablet == true) divStyle = document.getElementById("DivStyleStat");
			divStyle.style.display = "none";
			
			// Hide synonym and stat panel
			if(Cor.IsTablet == false) document.getElementById("InfSup").style.display = "none";
			
			if(Cor.IsTablet == true) document.getElementById("Titre").style.paddingTop = "0px";
		}

		// Show ads
		document.getElementById("pub1").style.display = "block";
		$(".side-pub").css('display', 'block');
		if(Cor.IdLangue == "fr") $("#pub2").css('display', 'block');
		if(Cor.IdLangue == "fr" && Cor.IsTablet == false) $("#pub3").css('display', 'block');
		
		// Show  title// Non affichage de la partie "Titre".
		var titreLabel = document.getElementById("TitreLabel");
		if(titreLabel) titreLabel.style.display = "block";

		//HIDE LEFT SIDEBAR ON LOGOUT
		$('.interface .sidebar').hide();
	},
	
	// Explanation setup Google Chrome.
	Exp_Setup_GoogleChrome : "<p><b>1.</b> Allez sur <a href='https://chrome.google.com/webstore/detail/scribens-correcteur-dorth/djpeecijcbigpoijldkimmkilekocdao?hl=fr' target='_blank'>cette page</a>.</p>" +
							 "<p><b>2.</b> Cliquez sur <b>Ajouter " + String .fromCharCode(224) + " Chrome</b> puis sur <b>Ajouter l'extension.</b>" +
							 "<p><b>3.</b> Sur une zone d'un texte d'un site, faites un <b>clic droit</b> sur l'<b>ic" + String.fromCharCode(244) + "ne Scribens</b> situ" + String.fromCharCode(233) + "e en <b>haut " + String.fromCharCode(224) + " droite</b>.</p>" +
							 "<p><b>4.</b> Cliquez de nouveau sur l'<b>ic" + String.fromCharCode(244) + "ne Scribens</b> pour obtenir des propositions sur le <b>style</b>.</p>",
	
	// Explanation setup Mozilla Firefox.
	Exp_Setup_MozillaFirefox : "<p><b>1.</b> Allez sur <a href='https://addons.mozilla.org/fr/firefox/addon/plugin-scribens-english' target='_blank'>cette page</a>.</p>" +
							   "<p><b>2.</b> Cliquez sur <b>Ajouter " + String .fromCharCode(224) + " Firefox</b> puis sur <b>Installer</b>.</p>" +
							   "<p><b>3.</b> Sur une zone d'un texte d'un site, faites un <b>clic droit</b> -> <b>Scribens</b> -> <b>Fran" + String.fromCharCode(231) + "ais</b></p>",
	
	// Explanation setup Safari.
	Exp_Setup_Safari : "<p><b>1.</b> T" + String.fromCharCode(233) + "l" + String.fromCharCode(233) + "chargez le fichier d'installation <a href='https://www.scribens.com/download/Scribens.safariextz' target='_blank'>ici</a> puis ouvrez-le.</p>" +
					   "<p><b>2.</b> Cliquez sur le bouton <b>Se fier</b>.</p>" +
					   "<p><b>3.</b> Cliquez sur la zone de texte d'un site, sur le <b>bouton Scribens</b> en haut, dans la <b>barre des t" + String.fromCharCode(226) + "ches,</b> puis sur <b>Scribens - Fran" + String.fromCharCode(231) + "ais</b>.</p>",
	
							
	// Explanation setup Microsoft Office.
	Exp_Setup_MicrosoftOffice : "<p><b>1.</b> T" + String.fromCharCode(233) + "l" + String.fromCharCode(233) + "chargez le fichier d'installation <a href='https://www.scribens.fr/download/Scribens_MicrosoftOffice.exe' target='_blank'>ici</a> puis ouvrez-le.</p>" +
								"<p><b>2.</b> Suivez les instructions d'installation.</b>" +
								"<p><b>3.</b> Une fois l'installation termin" + String.fromCharCode(233) + "e, lancez Microsoft Office.</b></p>" +
								"<p><b>4.</b> Cliquez sur l'<b>onglet Scribens</b> puis sur le <b>bouton de correction</b>.</p>" +
								"<p><b>Note :</b></p>" +
								"<p>- Le navigateur <b>Google Chrome</b> est requis, et il n'a pas besoin d'" + String.fromCharCode(234) + "tre utilis" + String.fromCharCode(233) + " par d" + String.fromCharCode(233) + "faut.</p>" +
								"<p>- Si la fen" + String.fromCharCode(234) + "tre du pare-feu de Windows se lance, cliquez sur <b>Autoriser l'acc" + String.fromCharCode(232) + "s en priv" + String.fromCharCode(233) + "</b> et cliquez sur <b>Autoriser l'acc" + String.fromCharCode(232) + "s en public.</b>",
	
	// Explanation setup LibreOffice.
	Exp_Setup_LibreOffice : "<p><b>1.</b> Allez sur <a href='http://extensions.libreoffice.org/extensions/spell-checker-and-grammar-checker-by-scribens' target='_blank'>cette page</a> (avec un navigateur autre que Microsoft Edge)</p>" +
							"<p><b>2.</b> Cliquez sur <b>Get Spell checker and Grammar checker by Scribens for All platforms</b>, t" + String.fromCharCode(233) + "l" + String.fromCharCode(233) + "chargez le <b>fichier d'installation</b> puis <b>ouvrez-le</b>.</p>" +
							"<p><b>3.</b> LibreOffice se lance. Cliquez sur <b>OK</b> et une fois l'installation termin" + String.fromCharCode(233) + "e, cliquez sur <b>Fermer</b>.</p>" +
							"<p><b>4.</b> Relancez LibreOffice.</p>" +
							"<p><b>Note :</b></p>" +
							"<p>- Le navigateur <b>Google Chrome</b> est requis.</p>" +
							"<p>- Si la fen" + String.fromCharCode(234) + "tre du pare-feu de Windows se lance, cliquez sur <b>Autoriser l'acc" + String.fromCharCode(232) + "s en priv" + String.fromCharCode(233) + "</b> et cliquez sur <b>Autoriser l'acc" + String.fromCharCode(232) + "s en public.</b>",
	
	// Explanation setup OpenOffice.
	Exp_Setup_OpenOffice : "<p><b>1.</b> Allez sur <a href='http://extensions.openoffice.org/fr/node/18542' target='_blank'>cette page</a> (avec un navigateur autre que Microsoft Edge)</p>" +
						   "<p><b>2.</b> Cliquez sur <b>Download extension</b>, t" + String.fromCharCode(233) + "l" + String.fromCharCode(233) + "chargez le <b>fichier d'installation</b> puis <b>ouvrez-le</b>.</p>" +
						   "<p><b>3.</b> OpenOffice se lance. Cliquez sur <b>OK</b> et une fois l'installation termin" + String.fromCharCode(233) + "e, cliquez sur <b>Fermer</b>.</p>" +
						   "<p><b>4.</b> Relancez OpenOffice.</p>" +
						   "<p><b>5.</b> Cliquez sur l'<b>onglet Scribens</b> puis sur le <b>bouton de correction</b>.</p>" +
						   "<p><b>Note :</b></p>" +
						   "<p>- Le navigateur <b>Google Chrome</b> est requis.</p>" +
						   "<p>- Si la fen" + String.fromCharCode(234) + "tre du pare-feu de Windows se lance, cliquez sur <b>Autoriser l'acc" + String.fromCharCode(232) + "s en priv" + String.fromCharCode(233) + "</b> et cliquez sur <b>Autoriser l'acc" + String.fromCharCode(232) + "s en public.</b>",
	
	// Explanation setup GoogleDocs.
	Exp_Setup_GoogleDocs : "<p><b>1.</b> Allez sur <a href='https://chrome.google.com/webstore/detail/spell-checker-and-grammar/kpopjaeamijjhcgcodlbnoelgihljjkl' target='_blank'>cette page</a>.</p>" +
						   "<p><b>2.</b> Cliquez sur <b>GRATUIT</b>, sur <b>Continuer</b>, puis sur <b>Autoriser</b>.</p>" +
						   "<p><b>3.</b> Cliquez sur <b>Modules compl" + String.fromCharCode(233) + "mentaires</b> -> <b>Spell checker and Grammar checker by Scribens</b> -> <b>Start</b>.</p>" +
						   "<p><b>4.</b> Choisissez la <b>langue souhait" + String.fromCharCode(233) + "e</b> puis cliquez sur le <b>bouton de correction</b>.</p>",
							
	// Explanation setup GoogleSheets.
	Exp_Setup_GoogleSheets : "<p><b>1.</b> Allez sur <a href='https://chrome.google.com/webstore/detail/spell-checker-and-grammar/jenfkmingepgdhdbcmdlgfnhogifjcgh' target='_blank'>cette page</a>.</p>" +
							 "<p><b>2.</b> Cliquez sur <b>GRATUIT</b>, sur <b>Continuer</b>, puis sur <b>Autoriser</b>.</p>" +
							 "<p><b>3.</b> Cliquez sur <b>Modules compl" + String.fromCharCode(233) + "mentaires</b> -> <b>Spell checker and Grammar checker by Scribens</b> -> <b>Start</b>.</p>" +
							 "<p><b>4.</b> Choisissez la <b>langue souhait" + String.fromCharCode(233) + "e</b> puis cliquez sur le <b>bouton de correction</b>.</p>",
	
	// Explanation setup Microsoft Word 2016 and Excel 2016.
	Exp_Setup_WordExcel_2016 : "<p><b>1.</b> Cliquez sur <b>Insertion</b> -> <b>Mes compl" + String.fromCharCode(233) + "ments</b> -> <b>STORE</b>.</p>" +
							   "<p><b>2.</b> Entrez alors <b>Scribens</b> puis cliquez sur <b>Ajouter</b>.</p>" +
							   "<p><b>3.</b> S" + String.fromCharCode(233) + "lectionnez les paragraphes " + String.fromCharCode(224) + " corriger puis cliquez sur le <b>bouton de correction</b>.</p>" +
							   "<p><b>4.</b> Pour lancer Scribens, dans <b>Insertion</b>, cliquez sur la fl" + String.fromCharCode(232) + "che " + String.fromCharCode(224) + " droite du bouton <b>Mes compl" + String.fromCharCode(233) + "ments</b> puis s" + String.fromCharCode(233) + "lectionnez <b>Scribens</b>.</p>",
							   
	// Explanation setup Microsoft Word Online and Excel Online.
	Exp_Setup_WordExcelOnline : "<p><b>1.</b> Cliquez sur <b>Insertion</b> -> <b>Compl" + String.fromCharCode(233) + "ment office</b> -> <b>STORE</b>.</p>" +
								"<p><b>2.</b> Entrez alors <b>Scribens</b> puis cliquez sur <b>Ajouter</b>.</p>" +
								"<p><b>3.</b> Cliquez sur le nouveau bouton <b>Scribens</b> qui appara" + String.fromCharCode(238) + "t alors. S" + String.fromCharCode(233) + "lectionnez les paragraphes " + String.fromCharCode(224) + " corriger puis cliquez sur le <b>bouton de correction</b>.</p>" +
								"<p><b>4.</b> Pour lancer Scribens, cliquez sur <b>Insertion</b>, puis sur le bouton <b>Scribens</b>.</p>",
							  
	// Explanation setup Mozilla Thunderbird.
	Exp_Setup_MozillaThunderbird : "<p><b>1.</b> T" + String.fromCharCode(233) + "l" + String.fromCharCode(233) + "chargez le fichier d'installation <a href='https://www.scribens.com/download/Scribens_MozillaThunderbird.exe' target='_blank'>ici</a> puis ouvrez-le.</p>" +
								   "<p><b>2.</b> Suivez les instructions d'installation.</b>" +
								   "<p><b>3.</b> Une fois l'installation termin" + String.fromCharCode(233) + "e, lancez <b>Mozilla Thunderbird</b>.</b></p>" +
								   "<p><b>4.</b> Cliquez sur <b>Autoriser cette installation</b>, sur <b>Continuer</b>, puis sur <b>Red" + String.fromCharCode(233) + "marrer Thunderbird</b>.</p>" +
								   "<p><b>5.</b> Dans la zone de texte d'un message, faites un <b>clic droit</b> -> <b>Scribens</b> -> <b>Fran" + String.fromCharCode(231) + "ais</b></p>" +
								   "<p><b>Note :</b></p>" +
								   "<p>- Le navigateur <b>Google Chrome</b> est requis.</p>" +
								   "<p>- Si la fen" + String.fromCharCode(234) + "tre du pare-feu de Windows se lance, cliquez sur <b>Autoriser l'acc" + String.fromCharCode(232) + "s.</b>"
	
	};
