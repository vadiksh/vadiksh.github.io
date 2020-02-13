

var Plugins = {

	// Set if the connexion has been established
	Connexion : false,
		
	// Port
	Port : null,

	// Dans le cas de Google Chrome, Id du client.
	IdClient : null,

	// Type de plugin
	Type : null,

	// Version du plugin
	VersionPlugin : 1,

	// Version de d�monstration
	Demo : false,

	// Ensemble des paragraphes modifi�s (indices)
	SetPModifies : new Set(),

	// Ensemble des P intacts. Utilis� pour calculer les PModifies
	SetPIntacts : new Set(),

	// Liste des langues pouvant �tre traduites.
	MapLanguesTraduction : new Map(),

	// First identification
	FirstIdentification : false,

	// Map des paragraphes des slides. cl� : indice P . valeur : PowerPoint numSlide, Excel numRow_numColumn
	MapIndicateurP : new Map(),

	// Variable pour le focus
	FocusLock : false,

	// Fenetre gris�e
	FenetreGrise : false,

	RegisterHwndWindow : false,

	// Indique s'il y a un probl�me de remplacement.
	PbRemplacement : false,

	// Window opener
	WindowOpener : null,

	// Focus on MainWindow
	Focus_MainWindow : true,

	// Focus on TextEditor
	Focus_TextEditor : true,

	// Blur total after hiding the 2 windows : Main window and TinyMce window.
	Blur_Total : false,

	// Lance le client, en relation avec le plugin (serveur)
	LaunchClient : function()
	{
		// If OOWriter or Firefox, then resize.
		// Seems to work only if window.open is called.
		/*if(Plugins.Type == 'OOWriter' || Plugins.Type == 'Firefox')
		{
			var w = 1220;
			var h = 700;
			var leftW = (screen.width/2)-(w/2);
			var topW = (screen.height/2)-(h/2);
			
			window.moveTo(leftW, topW);
			window.resizeTo(w, h);
		}*/
		
		// Non en IE
		//if(Cor.IsIE == false && Cor.IsIE11 == false)
		{
			// Evenement blur window
			if(Plugins.Type != 'Integration' &&
			(!(Plugins.Type == 'Chrome' && Plugins.VersionPlugin == 2)) &&
			(!(Plugins.Type == 'Firefox' && Plugins.VersionPlugin == 2)) &&
			(Plugins.Type != 'OOWriter') &&
			(Plugins.Type != 'MSWordOSX') && (Plugins.Type != 'MSPowerPointOSX') && (Plugins.Type != 'MSExcelOSX') &&
			(Plugins.Type != 'Safari') &&
			(Plugins.Type != 'MSWordWeb') && (Plugins.Type != 'MSExcelWeb') &&
			(Plugins.Type != 'Wysiwyg')/* &&
			(Plugins.Type != 'GoogleDocs') && (Plugins.Type != 'GoogleSheets')*/)
			{
				window.onblur = function()
				{
					if((Plugins.Type == 'GoogleDocs' || Plugins.Type == 'GoogleSheets') && Plugins.VersionPlugin == 2)
					{
						Plugins.Focus_MainWindow = false;
						
						window.setTimeout(function(){
							if(Plugins.Focus_TextEditor == false && Plugins.Focus_MainWindow == false)
							{
								Plugins.Blur_Total = true;
							}
						}
						, 200);
					}
					else
					{
						Plugins.BlurWindow();
					}
				};
			}
			
			// Event on IE Window close
			if((Cor.IsMSOfficeWinForDesktop == true)/* ||
			(Cor.IsMac && !Cor.IsSafari)*/)	// Excel Mac 2016. Doesn't work.
			{
				window.onbeforeunload = function()
				{
					Plugins.SendToPlugin("REMOVE_CLIENT");
				};
			}
			
			if((Plugins.Type == 'Integration') ||
			(Plugins.Type == 'Chrome' && Plugins.VersionPlugin == 2) ||
			(Plugins.Type == 'Firefox' && Plugins.VersionPlugin == 2) ||
			(Plugins.Type == 'MSWordWeb' && Cor.IsMSOfficeWinForDesktop == false) ||
			(Plugins.Type == 'MSExcelWeb' && Cor.IsMSOfficeWinForDesktop == false) ||
			(Plugins.Type == 'GoogleDocs') || (Plugins.Type == 'GoogleSheets') ||
			(Plugins.Type == 'Wysiwyg'))
			{
				Plugins.WindowOpener = window.opener;
				Plugins.Connexion = true;
				
				window.onmessage = function(event)
				{
					Plugins.Receive(event.data);
				};
			}
			
		}
		
		//$wnd.onclick = function() {
		//	Plugins.ClickWindow()();
		//};
		
		//$wnd.tinyMCE.activeEditor.on('focus', function(e) {
		//     Plugins.FocusWindow()();
		//});
		
		//$wnd.onresize = function() {
			//Plugins.BlurWindow()();
			//e.preventDefault();
			//$wnd.resizeto(300, 300);
			//alert($wnd.outerWidth);
		//};
		
		conn = {}, window.WebSocket = window.WebSocket || window.MozWebSocket;
		
		// uses global 'conn' object
		if ((conn.readyState === undefined || conn.readyState > 1) &&
			Plugins.Type != 'Integration' &&
			(!(Plugins.Type == 'Chrome' && Plugins.VersionPlugin == 2)) &&
			(!(Plugins.Type == 'Firefox' && Plugins.VersionPlugin == 2)) &&
			(!(Plugins.Type == 'MSWordWeb' && Cor.IsMSOfficeWinForDesktop == false)) &&
			(!(Plugins.Type == 'MSExcelWeb' && Cor.IsMSOfficeWinForDesktop == false)) &&
			(Plugins.Type != 'GoogleDocs') && (Plugins.Type != 'GoogleSheets') &&
			(Plugins.Type != 'Wysiwyg'))
		{
			var port = Plugins.Port;
			var adresseSocket = 'ws://' + '127.0.0.1' + ':' + port;
			
			//var url = window.location.href;
			//if(url != null && url.indexOf("https") == 0) adresseSocket = 'wss://' + '127.0.0.1' + ':' + port;
			
			if((Cor.IsMSOfficeWinForDesktop == true) ||
			(Plugins.Type == 'Safari'))
			{
				adresseSocket = 'wss://www.scribens.com/WebSocket2Clients/wsserver';
			}
			
			// Int�gration : on fait appel au serveur websocket.
			//if(Plugins.Type == 'Integration')
			//{
			//	adresseSocket = 'ws://www.scribens.fr:27775';
			//}

			conn = new WebSocket(adresseSocket);

			// A la connexion avec le serveur.
			conn.onopen = function () {
				// Sur Chrome, la websocket en C++ necessite que l'on mette un 1 devant.
				// On enregistre l'identifiant du client.
				if(Plugins.Type == 'Chrome')
				{
					conn.send("1CONNEXION_CLIENT" + Plugins.IdClient);
				}
				else if(Plugins.Type == 'Firefox')
				{
					conn.send("CONNEXION_CLIENT" + Plugins.IdClient);
				}
				else if((Plugins.Type == 'MSWordOSX') || 
						(Plugins.Type == 'MSPowerPointOSX') ||
						(Plugins.Type == 'MSExcelOSX') ||
						(Plugins.Type == 'OOWriter'&& Plugins.VersionPlugin == 2) ||
						(Plugins.Type == 'MSWord' && Plugins.VersionPlugin == 3) ||
						(Plugins.Type == 'MSOutlook' && Plugins.VersionPlugin == 3) ||
						(Plugins.Type == 'MSPowerPoint' && Plugins.VersionPlugin == 3) ||
						(Plugins.Type == 'MSExcel' && Plugins.VersionPlugin == 3))
				{
					conn.send(Plugins.IdClient + "_" + "CONNEXION_CLIENT");
				}
				else if(Plugins.Type == 'Integration')
				{
					//WindowOpener.postMessage("CONNEXION_CLIENT" + Plugins.Idsk, "*");
					//conn.send("CONNEXION_CLIENT" + Plugins.Idsk);
				}
				else if((Cor.IsMSOfficeWinForDesktop == true) ||
						(Plugins.Type == 'Safari'))
				{
					Plugins.Connexion = true;
				}
				else conn.send("INIT_CONNEXION");
			};

			conn.onmessage = function (event) {
				Plugins.Receive(event.data);
			};

			conn.onerror = function (event) {
				//alert("Web Socket Error");
			};


			conn.onclose = function (event) {
				//alert("Web Socket Closed");
			};
		}
	},

	// Initialisation termin�e
	InitFinished : function()
	{
		var timer = setInterval(function(){

			if(Plugins.Connexion == true &&
			TextEditor.Ready == true &&
				Cor.Window_Loaded == true &&	// Window must be loaded
			(Cor.ModeAbonnePremium == true || Cor.Demo == true))	// Apr�s identification
			{
				// Eclabousse les yeux
				//PresentationCor.EnableAll(false, false, false, true);
				/*PresentationCor.PanelProgress.setVisible(true);
				Cor.TinyMcePanel.TinyMce.setVisible(false);
				PresentationCor.PanelProgress.AffPanelAttente();*/
				
				Plugins.SendToPlugin("INIT_FINISHED");
				
				clearInterval(timer);
			}
		}, 100);
		
	},

		
	// Reception des donn�es
	Receive : function(datas)
	{
		// Pour Chrome, le websocket C++ place un chiffre devant
		if((Plugins.Type == "Chrome") && Plugins.VersionPlugin == 1) datas = datas.substring(1);
		
		// Etablissement de la connexion
		if(datas.indexOf("CONNEXION_OK") == 0)
		{
			Plugins.Connexion = true;
		}
		// Active la fen�tre
		else if(datas.indexOf("TEXT_PLUGIN_CHANGED") == 0)
		{
			// Le texte n'a pas chang� -> on active la fen�tre
			if(datas.indexOf("0") >= 0/* && PresentationCor.TextPluginChanged == false*/)
			{
				if(Plugins.FenetreGrise == true)
				{
					Plugins.FenetreGrise = false;
					//PresentationCor.EnableAll(true, true, true, true);	TODO. Not necessary
				}
			}
			// Le texte a chang�. On le note. Cas contraire : rev�rification si : clientSentence.contains("0") || PresentationCor.TextPluginChanged == true
			else
			{
				//PresentationCor.TextPluginChanged = true;
				
				// 2 cas : si on est en mode gris� ou si on est en cours de v�rification
				// Cas ou on est en mode gris�.
				if(Plugins.FenetreGrise == true)
				{
					Plugins.FenetreGrise = false;
					//PresentationCor.TextPluginChanged = false;
					
					/*PresentationCor.TextAreaComp.setVisible(false);	// TODO. Not necessary.
					PresentationCor.PanelProgress.setVisible(true);
					PresentationCor.PanelProgress.AffPanelAttente();*/
					
					// Demande une v�rification de texte car le texte a chang�.
					Plugins.SendToPlugin("PRE_SEND_TEXT_OK");
				}
			}
		}
		// D�sactive toutes la fen�tre
		else if(datas.indexOf("DISABLE_TEXT") == 0)
		{
			// Le message renseigne aussi que le focus est mis sur le plugin.
			//if(Cor.TabPanel.isEnabled())	// TODO. Not necessary.
			{
				Plugins.FenetreGrise = true;
				
				Plugins.FocusLock = false;
				
				// Cache tout les composants
				//PresentationCor.EnableAll(false, true, true, true);	// TODO. Not necessary.
			}
		}
		// D�composition du texte pour la traduction
		else if(datas.indexOf("TRANSLATE_DECOMPOSITION_TEXT:") == 0)
		{
			Plugins.DecompositionTexteTranslation(datas);
		}
		// Message alertant de la fin d'une traduction
		/*else if(datas.indexOf("FIN_TRADUCTION") == 0)
		{
			FinTraduction();
		}*/
		// Message avertissant que la fen�tre actuelle est en Focus. Surveill� par le plugin. (Probl�me de Focus avec TinyMce sous IE et Chrome).
		else if(datas.indexOf("FOCUS_WINDOW") == 0)
		{
			// Pas pendant un ordre manuel de v�rification (click)
			Plugins.FocusWindow(true);
		}
		// Probl�me de remplacement dans le plugin : Affiche un message � l'User lui expliquant que le remplacement peut �tre d�faillant.
		else if(datas.indexOf("PB_REMPLACEMENT") == 0)
		{
			Plugins.AffichagePbRemplacement();
		}
		// R�ception d'un texte
		else if(datas.indexOf("CHECK_TEXT:") == 0)
		{
			datas = datas.substring(11);
			
			var indP = datas.indexOf("[[[p]]]");
			if(indP >= 0)
			{
				// Requ�te non possible si en cours de v�rification
				if(Cor.IsChecking == false || Plugins.PbRemplacement)
				{
					Cor.IsChecking = true;
					
					if(Plugins.PbRemplacement == true) Plugins.PbRemplacement = false;
					
					if(indP > 0)
					{
						datas = datas.substring(indP);
						indP = 0;
						//clientSentence = clientSentence.replace("<Br />", "\n");	
					}
						
					if(indP >= 0)
					{
						// Fusion des textes
						Plugins.FusionTextePlugin(datas);
						
						// Plusieurs paragraphes modifi�s
						if(Plugins.SetPModifies.size > 0)
						{
							Cor.SendCorRequest(false);
						}
						// Texte inchang�
						else
						{
							// Rends visible tout les composants

							Cor.IsChecking = false;
							
							//PresentationCor.TextAreaComp.setVisible(true);	// TODO
							
							//PresentationCor.EnableAll(true, true, true, true);	// TODO
							
							// Si on est dans le panel 1er avec le texte
							//PresentationCor.PanelProgress.setVisible(false);		// TODO
							
							// Recalcule de nouveau les Transf, car il se peux que tout les paragraphes PWord ait �t� trouv� dans celui d'origine et que le texte soit modifi�.  
							// Construit la liste des �l�ments (optimisation)
							/*PresentationCorUtil.ConstruitMapElements();
							PresentationTransf.FillTransf();
							PresentationTransf.PanelMarques.removeAll();
							
							// Surligne la 1ere rep
							if(PresentationCor.TabPanel.getSelectedIndex() == 1)
							{
								PresentationTransfUtil.DeSurligne();
								PresentationTransf.SurligneFirstRep();
							}
							else if(PresentationCor.TabPanel.getSelectedIndex() == 2)
							{
								PresentationTransfUtil.DeSurligne();
								//PresentationStat.RbNonAffichage.Rb.setSelected(true);
							}*/
						}
					}
				}
			}
		}
	},

	// Envoi des informations au plugin
	SendToPlugin : function(datas)
	{
		if(Cor.ModeAbonnePremium || Cor.Demo)
		{
			if(Plugins.Type == 'Integration') Plugins.WindowOpener.postMessage(datas, "*");
			else if((Plugins.Type == 'Chrome' && Plugins.VersionPlugin == 2) ||
					(Plugins.Type == 'MSWordWeb' && Cor.IsMSOfficeWinForDesktop == false) ||
					(Plugins.Type == 'MSExcelWeb' && Cor.IsMSOfficeWinForDesktop == false) ||
					(Plugins.Type == 'GoogleDocs') || (Plugins.Type == 'GoogleSheets') ||
					(Plugins.Type == 'Wysiwyg'))
			{
				Plugins.WindowOpener.postMessage(Plugins.IdClient + '_' + datas, "*");
			}
			else if(Plugins.Type == 'Firefox' && Plugins.VersionPlugin == 2)
			{
				window.postMessage(Plugins.IdClient + '_' + datas, "*");
			}
			// Sur Chrome, la websocket en C++ necessite que l'on mette un 1 devant.
			else if(Plugins.Type == 'Chrome') conn.send('1' + datas);
			else if((Plugins.Type == 'MSWordOSX') ||
					(Plugins.Type == 'MSPowerPointOSX') ||
					(Plugins.Type == 'MSExcelOSX') ||
					(Plugins.Type == 'Safari') ||
					(Plugins.Type == 'OOWriter' && Plugins.VersionPlugin == 2) ||
					(Plugins.Type == 'MSWord' && Plugins.VersionPlugin == 3) ||
					(Plugins.Type == 'MSOutlook' && Plugins.VersionPlugin == 3) ||
					(Plugins.Type == 'MSPowerPoint' && Plugins.VersionPlugin == 3) ||
					(Plugins.Type == 'MSExcel' && Plugins.VersionPlugin == 3) ||
					(Cor.IsMSOfficeWinForDesktop == true))
			{
				conn.send(Plugins.IdClient + '_' + datas);
			}
			else conn.send(datas);
		}
	},

	// D�compose le texte format� de Word et le 
	GetPFromPlugin : function(textWord)
	{
		var vectP = [];
		
		var ind = textWord.indexOf("[[[p]]]");
		var cntP = 0;
			
		while(ind >= 0)
		{
			var pararagraphSt = "";
			var indPnext = textWord.indexOf("[[[p]]]", ind + 7);
			if(indPnext >= 0)
			{
				pararagraphSt = textWord.substring(ind + 7, indPnext);
			}
			// Fin de texte
			else
			{
				pararagraphSt = textWord.substring(ind + 7);
			}
			
			if((Plugins.Type == "MSPowerPoint") || (Plugins.Type == "MSExcel") || (Plugins.Type == "MSPowerPointOSX") || (Plugins.Type == "MSExcelOSX") || (Plugins.Type == "MSExcelWeb") || (Plugins.Type == "GoogleSheets"))
			{
				var ind2p = pararagraphSt.indexOf(":");
				if(ind2p >= 0)
				{
					var indicateur = pararagraphSt.substring(0, ind2p);
					Plugins.MapIndicateurP.set(cntP, indicateur);
					pararagraphSt = pararagraphSt.substring(ind2p + 1);
				}
			}
			
			// Il peut y avoir des < ou >. Ils ne sont pas accept�s au setText. On les remplace par des "graphics" character. Pas terrible.
			pararagraphSt = pararagraphSt.replace(new RegExp(String.fromCharCode(60), 'g'), String.fromCharCode(164));
			pararagraphSt = pararagraphSt.replace(new RegExp(String.fromCharCode(62), 'g'), String.fromCharCode(164));
			
			// Il peut y avoir des \. Ils ne passent pas dans la requ�te rpc. On les remplace par des "graphics" character. Pas terrible.
			pararagraphSt = pararagraphSt.replace(/\\/g, String.fromCharCode(164));
			//pararagraphSt = pararagraphSt.replace(new RegExp(String.fromCharCode(92), 'g'), String.fromCharCode(164));
			
			// Il peut y avoir des &gt;  (tr�s rare). On les remplace par 4 charact�res "graphics" 164.
			pararagraphSt = pararagraphSt.replace(new RegExp("&gt;", "g"), String.fromCharCode(164) + String.fromCharCode(164) + String.fromCharCode(164) + String.fromCharCode(164));
			
			// 1. Les espaces "32" en chaine sont ot�s au setText. Tous les autres types d'espaces sont conserv�s.
			// On remplace donc les suites de 32 par des 160 "&nbsp;" (type d'espace le mieux appropri�).
			// Si on remplace chaque espace, il y a des probl�mess de sauts de ligne. 
			
			// 2. Il peut y avoir un \t (tab, (alin�ea), avant). Le setText ne le pr�sereve pas. On le remplace par un espace.
			pararagraphSt = Util.ReplaceSeqSpaces32(pararagraphSt);
			
			vectP.push(pararagraphSt);
			//nvText = nvText.replace("<Br /></p>", "</p>");
			//nvText = nvText.replace("<p> </p>", "<p>" + "&nbsp;" + "</p>");
			
			ind = indPnext;
			cntP++;
		}
		
		return vectP;
	},

	// Focus on main window
	FocusMainWindow : function()
	{
		if(Plugins.Type == 'Integration' ||
		(Plugins.Type == 'Chrome' && Plugins.VersionPlugin == 2) ||
		(Plugins.Type == 'OOWriter') ||
		(Plugins.Type == 'MSWordOSX') || (Plugins.Type == 'MSPowerPointOSX') || (Plugins.Type == 'MSExcelOSX') ||
		(Plugins.Type == 'MSWord' && Plugins.VersionPlugin == 3) ||
		(Plugins.Type == 'Safari') ||
		(Plugins.Type == 'MSWordWeb') || (Plugins.Type == 'MSExcelWeb') ||
		(Plugins.Type == 'GoogleDocs') || (Plugins.Type == 'GoogleSheets') ||
		(Plugins.Type == 'Wysiwyg'))
		{
			if((Plugins.Type == 'GoogleDocs' || Plugins.Type == 'GoogleSheets') && Plugins.VersionPlugin == 2)
			{	
				Plugins.Focus_MainWindow = true;
				
				if(Plugins.Blur_Total == true)
				{
					Plugins.Blur_Total = false;
					Plugins.SendToPlugin("FOCUS_AFTER_HIDING");
				}
			}
			else
			{
				Plugins.Focus();
			}
		}
		else Plugins.FocusWindow(false);
	},

	// Blur Windows
	BlurWindow : function()
	{
		// Apr�s avoir eu la WindowsHandle, on d�sactive l'ancien syst�me de Focus
		if(Plugins.RegisterHwndWindow == false && (Cor.IsIE || Cor.IsIE11)) Plugins.FocusLock = false;
	},

	// Focus window
	FocusWindow : function(withoutLock)
	{
		// Le Handle de la fen�tre doit �tre connu
		if(Plugins.Type != null/* && 
		(Plugins.Type.equals("OOWriter") || Cor.IsMozillaF || Cor.IsIE || Cor.IsIE11)*/)
		{
			// Thunderbird
			if(Plugins.Type == "Thunderbird")
			{
				Plugins.SendToPlugin("FOCUS_WINDOW");
			}
		}
		
		if(Plugins.FocusLock == false || withoutLock == true)
		{
			Plugins.FocusLock = true;
				
			// Au focus, quand la fen�tre est gris�e, demande � Word defaire la comparaison entre le nouveau et l'ancien texte.
			// Pas pendant un ordre manuel de v�rification (click)
			//if(!PresentationCor.PanelProgress.isVisible())	// TODO
			{
				Plugins.SendToPlugin("CMP_TEXT_ACTIVE_WINDOW");
			}
		}
	},

	// Focus sur la window (nouvelle g�n�ration)
	Focus : function()
	{
		Plugins.SendToPlugin("FOCUS");
	},

	// Permet de capturer le Handle de la window.
	RegisterWindowHandle : function()
	{
		// Permet � OOWriter de connaitre la Whnd de la window du navigateur.
		if(Plugins.Connexion == true && Plugins.RegisterHwndWindow == false)
		{
			Plugins.RegisterHwndWindow = true;
			if(!((Plugins.Type == "Firefox") && Plugins.VersionPlugin == 2))
			{
				Plugins.SendToPlugin("REGISTER_HWND_WINDOW");
			}
		}
	},

	// Init du mode Plugin part 1.
	// Rend l'interface minimaliste
	InitModePluginPart1 : function()
	{
		if(Plugins.Demo == false)
		{
			//RootPanel.get("LogoTitre").setVisible(false);
			
			var newVersion = false;
			
			var url = window.location.href;
			
			if(url != null)
			{
				if(url.indexOf("plugin.html") >= 0 || url.indexOf("plugin-new.html") >= 0) newVersion = true;
			}
			
			// Old version
			if(newVersion == false)
			{
				// Desaffiche en priorit� la publicit�.
				if(Cor.IdLangue == "fr")
				{
					/*RootPanel.get("pub1").setVisible(false);	// TODO. Not necessary.
					RootPanel.get("pub2").setVisible(false);
					RootPanel.get("pub3").setVisible(false);*/
				}
				
				//RootPanel.get("Titre").setVisible(false);
				//RootPanel.get("Titre").getElement().getStyle().setZIndex(-70);
				
				/*RootPanel.get("integration").setVisible(false);	// TODO. Not necessary.
				RootPanel.get("services").setVisible(false);
				RootPanel.get("visits").setVisible(false);
				RootPanel.get("premsup").setVisible(false);
				RootPanel.get("presprem").setVisible(false);
				RootPanel.get("cont").setVisible(false);
				RootPanel.get("main-footer").setVisible(false);*/
				
				//RootPanel.get("ContPub2").getElement().getStyle().setPaddingTop(55, Unit.PX);
				//PresentationTransf.VPanelSyn.getElement().getStyle().setPaddingTop(55, Unit.PX);
				
				
				
				//RootPanel.get("window-resizer-tooltip").setVisible(false);
				
				//RootPanel.get("VersionPremium").setVisible(false);
				//RootPanel.get("DemoGoogleChrome").setVisible(false);
				//RootPanel.get("LienQuestionnaire").setVisible(false);
				//RootPanel.get("BoutonOptions").getElement().getStyle().setTop(95, Unit.PX);
				//RootPanel.get("TextArea").getElement().getStyle().setTop(82, Unit.PX);
				//RootPanel.get("Legende").getElement().getStyle().setTop(145, Unit.PX);
				//RootPanel.get("Legende").getElement().getStyle().setMarginTop(0, Unit.PX);
				//RootPanel.get("Legende").getElement().getStyle().setMarginTop(-24, Unit.PX);
			}
			
			// Show ad for En
			if(Cor.IdLangue == "en")
			{
				document.getElementById("pub1").style.display = "block";
			}
				
		}
		
		Plugins.InitFinished();
	},

	// Init du mode Plugin part 2
	InitModePluginPart2 : function()
	{
		/*HorizontalPanel hp = new HorizontalPanel();
		Image image = new Image("Images/logoEsc.png");
		image.setPixelSize(57, 85);
		//image.getElement().getStyle().setMarginLeft(30, Unit.PX);
		hp.add(image);
		PresentationCor.ButtonOptionCor.getElement().getStyle().setMarginTop(60, Unit.PX);
		PresentationCor.ButtonOptionCor.getElement().getStyle().setMarginLeft(4, Unit.PX);
		hp.add(PresentationCor.ButtonOptionCor);
		RootPanel.get("LogoEsc").add(hp);*/
		
		//RootPanel.get("LogoEsc").getElement().getStyle().setTop(10, Unit.PX);
		//RootPanel.get("LogoEsc").getElement().getStyle().setLeft(13, Unit.PX);
		
		//VerticalPanel vp = new VerticalPanel();
		/*HTML htmlTitre = new HTML("SCRIBENS");
		htmlTitre.setStyleName("Cor-TitreScribensPlugin");
		htmlTitre.getElement().getStyle().setMarginBottom(18, Unit.PX);*/
		
		//vp.add(htmlTitre);
		//PresentationCor.ButtonOptionCor.getElement().getStyle().setMarginTop(60, Unit.PX);
		//PresentationCor.ButtonOptionCor.getElement().getStyle().setMarginLeft(4, Unit.PX);
		//vp.add(PresentationCor.ButtonOptionCor);
		//RootPanel.get("LogoEsc").add(htmlTitre);
		
		//RootPanel.get("LogoEsc").setVisible(false);
		//RootPanel.get("LogoEsc").getWidget(0);
		//Image image = (Image)RootPanel.get("LogoEsc").getWidget(0);
		
		if(Plugins.Demo == true) return;
		
		//Cor.SimpleBasePanel.getElement().getStyle().setMarginTop(0, Unit.PX);
		
		//RootPanel.get("TransfTexte").getElement().getStyle().setTop(185, Unit.PX);
		//RootPanel.get("StatTexte").getElement().getStyle().setTop(185, Unit.PX);
		
		//RootPanel.get("TableMarques").getElement().getStyle().setTop(119, Unit.PX);
		//RootPanel.get("TableSyn").getElement().getStyle().setTop(119, Unit.PX);
		
		//Cor.VerticalPanel.getElement().getStyle().setMarginBottom(10, Unit.PX);
		
		//RootPanel.get("RightPanel").getElement().getStyle().setWidth(0, Unit.PX);
		
		//RootPanel.get("Wrapper").getElement().getStyle().setWidth(900, Unit.PX);
		
		//RootPanel.get("BlankHight").getElement().getStyle().setPaddingLeft(647, Unit.PX);
		
		//Cor.SimpleBasePanel.getElement().getStyle().setHeight(1020, Unit.PX);
		
		// Si la fen�tre d'identification est visible au d�but, il faut tout griser.
		/*if(Plugins.FirstIdentification == true)	// TODO. Not necessary.
		{
			var timer = setInterval(function(){

				if(TextEditor.Ready == true)
				{
					//PresentationCor.EnableAll(false, true, true, true);	TODO
					clearInterval(timer);
				}
			}, 100);
		}*/
	},

	// D�composition d'un texte
	DecompositionTexteTranslation : function(datas)
	{
		if(Cor.IsChecking == false)
		{
			Cor.IsChecking = true;
			
			// D�sactive des composants IHM du panel cor.
			/*PresentationCor.EnableAll(false, true, true, true);	// TODO
			
			PresentationCor.TextAreaComp.setVisible(false);		
			PresentationCor.PanelProgress.setVisible(true);
			PresentationCor.PanelProgress.AffPanelAttente();*/
			
			var indSl1 = datas.indexOf("_", 29);
			var idlangueP = datas.substring(29, indSl1);
			
			var indSl2 = datas.indexOf("_", indSl1 + 1);
			var idlangueTraductionMsg = datas.substring(indSl1 + 1, indSl2);
			
			var indSl3 = datas.indexOf("_", indSl2 + 1);
			var listnumPar = datas.substring(indSl2 + 1, indSl3);
			
			var texte = datas.substring(indSl3 + 1);
			//if(texte.startsWith("[[[p]]]")) texte = texte.substring(7);
			
			var vectParSt = GetPFromPlugin(texte);
			
			var texteHTML = "";
			for(var i = 0; i < vectParSt.length; i++)
			{
				var parSt = vectParSt[i];
				//parSt = StringEscapeUtils.escapeHtml(parSt);
				texteHTML = texteHTML + "<p>" + parSt + "</p>";
			}
			//texteHTML = StringEscapeUtils.escapeHtml(texteHTML);
			
			var vectParameters = [];
			vectParameters.push(texteHTML);
			vectParameters.push(idlangueP);
			vectParameters.push(idlangueTraductionMsg);
			vectParameters.push(listnumPar);
			
			//Cor.rpcTranslation.DecompositionTexte(vectParameters, new AuthenticationHandlerDecompositionTexte<String>());		// TODO. Not nessesary.
		}
	},

// Fin de la traduction. D�grise les composants.
/*FinTraduction : function()
{
	Cor.IsChecking = false;
	
	PresentationCor.TextAreaComp.setVisible(true);
	
	PresentationCor.EnableAll(true, true, true, true);
	
	// Si on est dans le panel 1er avec le texte
	PresentationCor.PanelProgress.setVisible(false);
},*/

// D�composition du texte pour la traduction
/*@SuppressWarnings("unused")	// TODO. Not necessary.
public static class AuthenticationHandlerDecompositionTexte<T> implements AsyncCallback<String> {
	
	public void onFailure(Throwable ex) {
		System.out.println("FAILURE");
	}

	public void onSuccess(String result) {
		SendToPlugin("DECOMPOSITION_TEXTE_RES:" + result);
	}
}*/

	// Pour une v�rification avec le bouton de v�rification, les P modifies sont ceux modifies manuellement
	// Traite �galement les paragraphes modifi�s manuellement.
	// Ces derniers ont p�t changer de position (indice) entre-temps dans le texte Word. On compare donc avec le texte.
	// On prends donc les paragraphes des phrases modifi�es, car les id ne changent pas.
	DefinePModifiesWithPhModifies : function()
	{
		Cor.SetIdPhModifies.forEach(function(id)
		{
			var indP = Util.GetIndPWithPhraseId(id);
			if(indP > -1)
			{
				Plugins.SetPModifies.add(indP);
			}
		});
		Cor.SetIdPhModifies.clear();
	},

	// Affichage d'un popup expliquant � l'User que la modification est impossible.
	AffichagePbRemplacement : function()
	{
		// Met en attente la fen�tre. Pour les textes longs, il y a un certain d�lai pour rev�rifier.
		//Plugins.PbRemplacement = true;	Utile ? Pas s�r. On souhait juste afficher un panneau.
		
		//Cor.SetVisible_PanelWait(true, false);
		
		/*PresentationCor.EnableAll(false, false, false, true);		TODO. Not necessary.
		PresentationCor.PanelProgress.setVisible(true);
		PresentationCor.TextAreaComp.setVisible(false);
		PresentationCor.PanelProgress.AffPanelAttente();*/
		
		var message = "Impossible d'effectuer la modification. Le texte a " + String.fromCharCode(233) + "t" + String.fromCharCode(233) + " rev" + String.fromCharCode(233) + "rifi" + String.fromCharCode(233) + ".";
		
		if(Cor.IdLangue == "en") message = "Unable to replace the text. The text has been rechecked.";
		
		var popup = new Util.MessageWindowConfirmation(message, 0, "Avertissement");
		popup.SetVisible(true);
	},

	// Remplissage de la map des langues de traduction
	CreateListeLanguesTraduction : function()
{
	MapLanguesTraduction.set("en", "Anglais");
	MapLanguesTraduction.set("es", "Espagnol");
	MapLanguesTraduction.set("fr", "Fran" + cc + "ais");
	MapLanguesTraduction.set("de", "Allemand");
	MapLanguesTraduction.set("pt", "Portugais");
	MapLanguesTraduction.set("ar", "Arabe");
	MapLanguesTraduction.set("zh-hans", "Chinois (simplifi" + ea + ")");
	MapLanguesTraduction.set("af", "Afrikaans");
	MapLanguesTraduction.set("sq", "Albanais");
	MapLanguesTraduction.set("hy", "Arm" + ea + "nien");
	MapLanguesTraduction.set("az", "Az" + ea + "ri");
	MapLanguesTraduction.set("eu", "Basque");
	MapLanguesTraduction.set("bn", "Bengal" + ic);
	MapLanguesTraduction.set("be", "Bi" + ea + "lorusse");
	MapLanguesTraduction.set("my", "Birman");
	MapLanguesTraduction.set("bs", "Bosnien");
	MapLanguesTraduction.set("br", "Breton");
	MapLanguesTraduction.set("bg", "Bulgare");
	MapLanguesTraduction.set("ca", "Catalan");
	MapLanguesTraduction.set("zh-hant", "Chinois (traditionnel)");
	MapLanguesTraduction.set("si", "Cingalais");
	MapLanguesTraduction.set("ko", "Cor" + ea + "en");
	MapLanguesTraduction.set("hr", "Croate");
	MapLanguesTraduction.set("ht", "Cr" + ea + "ole");
	MapLanguesTraduction.set("da", "Danois");
	MapLanguesTraduction.set("eo", "Esp" + ea + "ranto");
	MapLanguesTraduction.set("et", "Estonien");
	MapLanguesTraduction.set("fo", "F" + ea + "ringien");
	MapLanguesTraduction.set("fi", "Finnois");
	MapLanguesTraduction.set("gl", "Galicien");
	MapLanguesTraduction.set("el", "Grec");
	MapLanguesTraduction.set("gu", "Gujar" + ac + "t" + ic);
	MapLanguesTraduction.set("ka", "G" + ea + "orgien");
	MapLanguesTraduction.set("haw", "Hawaiien");
	MapLanguesTraduction.set("hi", "Hind" + ic);
	MapLanguesTraduction.set("hu", "Hongrois");
	MapLanguesTraduction.set("he", "H" + ea + "breu");
	MapLanguesTraduction.set("id", "Indon" + ea + "sien");
	MapLanguesTraduction.set("ga", "Irlandais");
	MapLanguesTraduction.set("is", "Islandais");
	MapLanguesTraduction.set("it", "Italien");
	MapLanguesTraduction.set("jam", "Jamaican Creole English");
	MapLanguesTraduction.set("ja", "Japonais");
	MapLanguesTraduction.set("jv", "Javanais");
	MapLanguesTraduction.set("kk", "Kazakh");
	MapLanguesTraduction.set("km", "Khmer");
	MapLanguesTraduction.set("rn", "Kirundi");
	MapLanguesTraduction.set("ku", "Kurde");
	MapLanguesTraduction.set("la", "Latin");
	MapLanguesTraduction.set("lv", "Latin");
	MapLanguesTraduction.set("lt", "Lituanien");
	MapLanguesTraduction.set("mk", "Mac" + ea + "donien");
	MapLanguesTraduction.set("mt", "Maltais");
	MapLanguesTraduction.set("mi", "Maori");
	MapLanguesTraduction.set("mn", "Mongol");
	MapLanguesTraduction.set("nb", "Norv" + ea + "gien");
	MapLanguesTraduction.set("nl", "N" + ea + "erlandais");
	MapLanguesTraduction.set("ne", "N" + ea + "palais");
	MapLanguesTraduction.set("ps", "Pachto");
	MapLanguesTraduction.set("ur", "Ourdou");
	MapLanguesTraduction.set("fa", "Persan");
	MapLanguesTraduction.set("pl", "Polonais");
	MapLanguesTraduction.set("pa", "Panj" + ac + "b" + ic);
	MapLanguesTraduction.set("qu", "Quechua");
	MapLanguesTraduction.set("ro", "Roumain");
	MapLanguesTraduction.set("ru", "Russe");
	MapLanguesTraduction.set("sr", "Serbe");
	MapLanguesTraduction.set("sk", "Slovaque");
	MapLanguesTraduction.set("sl", "Slov" + eg + "ne");
	MapLanguesTraduction.set("so", "Somali");
	MapLanguesTraduction.set("sv", "Su" + ea + "dois");
	MapLanguesTraduction.set("sw", "Swahili");
	MapLanguesTraduction.set("tl", "Tagalog");
	MapLanguesTraduction.set("tg", "Tadjik");
	MapLanguesTraduction.set("ta", "Tamoul");
	MapLanguesTraduction.set("cs", "Tch" + eg + "que");
	MapLanguesTraduction.set("te", "T" + ea + "lougou");
	MapLanguesTraduction.set("th", "Tha" + i2p);
	MapLanguesTraduction.set("bo", "Tib" + ea + "tain");
	MapLanguesTraduction.set("ti", "Tigrinya");
	MapLanguesTraduction.set("tr", "Turc");
	MapLanguesTraduction.set("uk", "Ukrainien");
	MapLanguesTraduction.set("vi", "Vietnamien");
	MapLanguesTraduction.set("cy", "Gallois");
	MapLanguesTraduction.set("yi", "Yiddish");	
},

	// Fait la fusion avec le texte du plugin. Compare le texte des paragraphes.
	// Les paragraphes du plugin ayant le m�me texte que celui du TextArea sont consid�r�s comme no,n modifi�s. Tout les autres le sont.
	// En d�duit les paragraphes modifi�s
	FusionTextePlugin : function(datas)
	{
		// 1ere v�rification
		var vectPPluginSt = Plugins.GetPFromPlugin(datas);
		
		// R�initialise l'ensemble des paragraphes modifi�s
		Plugins.SetPIntacts.clear();
		Plugins.SetPModifies.clear();
		
		// Ensemble des paragraphes du texte
		Cor.VectPSt = [];
		Util.GetVectPSt();
		
		var nvText = "";
		
		// Un paragraphe intact est un paragraphe :
		// - Dont le texte existait d�j�.
		// - Ses paragraphes autour (calcul�s avec EcartRep), existaient d�j� 
		// et respectait le m�me ordre d'indice par rapport � n (ancien indice du paragraphe). n-2, n-1, n, n + 1, n + 2.
		
		// Trouve les paragraphes intacts
		// Ensemble des paragraphes ou l'on a pris le code HTML.
		// Il ne faut pas deux fois reprendre le m�me code HTML car il ne faut pas avoir des mots d'id identiques.
		var setPPris = new Set();
		
		// Nombre de P sans texte.
		var nbPVide = 0;
		
		// Construit le nouveau texte
		for(var i = 0; i < vectPPluginSt.length; i++)
		{
			var PPluginSt = vectPPluginSt[i];
			var indPPlugin = i;
			var nvTexteP = "";
			
			// Cas particulier d'un P avec un texte vide -> on prends le texte <p></p> et on le consid�re comme intact.
			if(PPluginSt.length == 0)
			{
				nvTexteP = "<p></p>";
				nvText = nvText + nvTexteP;
				Plugins.SetPIntacts.add(indPPlugin);
				nbPVide++;
				continue;
			}
			
			// Cherche les correspondances possibles dans vectPSt
			var indP = Cor.VectPSt.indexOf(PPluginSt);
			while(indP != -1)
			{
				// Pour une correspondance possible, cherche si les textes aux alentours correspondent.
				var pIndParagraphsAlentour = Util.GetIndParagraphsAlentour(indP, false);
				var indPDebut = pIndParagraphsAlentour[0];
				var indPFin = pIndParagraphsAlentour[1];
				
				// Comparaion du bas
				var deb = false;
				var cnt = 0;
				if(indPPlugin >= (indP - indPDebut))
				{
					for(var u = indPDebut; u < indP; u++)
					{
						var PStU = Cor.VectPSt[u];
						var PPluginStU = vectPPluginSt[indPPlugin + (u - indP)];
						if(PStU == PPluginStU) cnt++;
					}
				}
				
				if(cnt > 0 && cnt == (indP - indPDebut)) deb = true;
				
				// Extremite
				if(indP == 0) deb = true;
				
				// Comparaison du haut
				var fin = false;
				cnt = 0;
				if((indPPlugin + (indPFin - indP)) < vectPPluginSt.length)
				{
					for(var u = indP + 1; u <= indPFin; u++)
					{
						var PStU = Cor.VectPSt[u];
						var PPluginStU = vectPPluginSt[indPPlugin + (u - indP)];
						if(PStU == PPluginStU) cnt++;
					}
				}
				
				if(cnt > 0 && cnt == (indPFin - indP)) fin = true;
				
				// Extremite
				if(indP == (Cor.VectPSt.length - 1)) fin = true;
				
				// Le P est intact. On utilise donc l'ancien code HTML du P, celui du document existant avant fusion.
				if(deb && fin)
				{
					// Il ne faut pas deux fois reprendre le m�me code HTML car il ne faut pas avoir des mots d'id identiques.
					if(!setPPris.has(indP))
					{
						setPPris.add(indP);
						Plugins.SetPIntacts.add(indPPlugin);
						
						nvTexteP = Util.GetHTMLP(indP);
						
						break;
					}
				}
				
				// Recherche une nouvelle occurrence du texte.
				indP =  Cor.VectPSt.indexOf(PPluginSt, indP + 1);
			}
			
			// Si on a trouv� aucune correspondance ou que le P n'est pas intact, alors on utilise le texte du P.
			if(nvTexteP.length == 0)
			{
				// Cr�er une phrase artificielle.
				var idMax = parseInt(Cor.IdMax);
				idMax = idMax + 1;
				Cor.IdMax = idMax;
				PPluginSt = "<span id=\"p" + idMax + "\">" + PPluginSt + "</span>";
				nvTexteP = "<p>" + PPluginSt + "</p>";	
			}
			
			nvText = nvText + nvTexteP;
		}
		
		// Texte entier intact. Aucun paragraphe modifi� au clavier.
		if((Plugins.SetPIntacts.length == vectPPluginSt.length) && Cor.SetIdPhModifies.length == 0)
		{
			// Cas particulier ou le texte arrivant n'a que des P vides. On assigne le texte.
			if(nbPVide == vectPPluginSt.length) TextEditor.SetTextHTML(nvText);
			
			return;
		}
		
		// Assignement du texte
		TextEditor.SetTextHTML(nvText);
		
		// 3. Les paragraphes qui ne sont pas intacts sont ceux qui sont modifi�s
		var nbP = Util.GetNbP();
		
		for(var i = 0; i < nbP; i++)
		{
			if(!Plugins.SetPIntacts.has(i))
			{
				Plugins.SetPModifies.add(i);
			}
		}
		
		// 4. Traite �galement les paragraphes modifi�s manuellement.
		// Ces derniers ont p�t changer de position (indice) entre-temps dans le texte Word. On compare donc avec le texte.
		// On prends donc les paragraphes des phrases modifi�es, car les id ne changent pas.
		Plugins.DefinePModifiesWithPhModifies();
		
		// 4. En d�duit les phrases modifi�es : les pharses du P.
		/*PresentationCorUtil.SetIdPhModifies.clear();
		for(Iterator<Integer> it = SetPModifies.iterator(); it.hasNext();)
		{
			int indPModifie = it.next();
			PresentationCorUtil.SetPhModifies(indPModifie);
		}*/
	}


}