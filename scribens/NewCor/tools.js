
var Tools = {

// The tools object
ToolsObject : null,

Panel_ConnecteurLogiquesI : null,

Panel_FormulesPolitesseI : null,

Panel_PresentationLettresI : null,

// Send the request.
SendRequest : function(type)
{
	var typeP = type;

	Util.SendHttpRequest('ToolsRedaction_Servlet',
						[['FunctionName', 'GetToolsRedaction']],
						 function(response)
						 {
							Tools.ToolsObject = response;
				
							if(typeP == 'connecteurs_logique') Tools.Handler_Panel_ConnecteurLogiques();
							else if(typeP == 'formules_politesse') Tools.Handler_Panel_FormulesPolitesse();
						 });
},

Handler_Panel_ConnecteurLogiques : function()
{
	// If object not existing then send a request
	if(Tools.ToolsObject == null)
	{
		Tools.SendRequest('connecteurs_logique');
		return;
	}


	$('body').attr('id', 'connecteur-logique');
	$('#MainDiv').css('width', '100%');

	$('ul.navbar-nav li a').removeClass('selected');
	$('#btnout').addClass('selected');
	
	//REMOVE CLASS FLEX WHEN NOT ON ORTOGRAPHE
	$('.ortho-flex').removeClass('flex');
	
	//HIDE SIDEBAR
	$('.sidebar').hide();

	document.getElementById("sub-btnout").style.display = "none";

	var mainDiv = document.getElementById("MainDiv");
	
	// Hide sol popups
	Cor.PopupPanelSol.SetVisible(false, false, false, true);
	
	document.getElementById("PanelBtn").style.display = "none";
	document.getElementById("TextArea").style.display = "none";
	
	if(mainDiv.lastChild.id != null && mainDiv.lastChild.id != "PanelWait") mainDiv.removeChild(mainDiv.lastChild);
	
	if(Cor.IsTablet == false)
	{
		// mainDiv.style.width = "736px";
		
		// Hide the div style
		var divStyle = document.getElementById("StyleTexte");
		divStyle.style.visibility = "hidden";
		
		// Hide the div syn stat panel
		document.getElementById("InfSup").style.display = "none";
		
		var pub3 = document.getElementById("pub3");
		if(pub3 != null) pub3.style.display = "none";
	}
	else
	{
		// Hide the div style
		var divStyle = document.getElementById("DivStyleStat");
		divStyle.style.display = "none";
	}
	
	// Create the panel then add it
	if(Tools.Panel_ConnecteurLogiquesI == null) Tools.Panel_ConnecteurLogiquesI = new Tools.Panel_ConnecteurLogiques();
	
	mainDiv.appendChild(Tools.Panel_ConnecteurLogiquesI.Node);
},

// Build Connecteur logique panel
Panel_ConnecteurLogiques : function()
{
	this.Node = document.createElement("div");
	this.Node.className = "connecteur-logiques";
	
 
	// var wrappTable = document.createElement("div");
	// 	wrappTable.className = "wrapp-table";

	var tableTitleExp = document.createElement("table");
	 	tableTitleExp.className = "tabs-colonne";
	
	var tableTitleExpressions = new Util.TableType(4, 'Tools_ConnecteurLogiques');
	var td = document.createElement("td");
	td.appendChild(tableTitleExpressions.Node);
	tableTitleExp.appendChild(td);
			
	var i_prec = 0;
	
	for(var i = 0; i < Tools.ToolsObject.VectThemeExpression.length; i++)
	{
		var themeExpression = Tools.ToolsObject.VectThemeExpression[i];
	
		if(i == 4 || i == 14)
		{
			i_prec = i;
			if(i == 4) tableTitleExpressions = new Util.TableType(10, 'Tools_ConnecteurLogiques');
			else if(i == 14) tableTitleExpressions = new Util.TableType(3, 'Tools_ConnecteurLogiques');
			
			var td = document.createElement("td");
			
			td.appendChild(tableTitleExpressions.Node);
			tableTitleExp.appendChild(td);
		}
		
		tableTitleExpressions.SetText(themeExpression.Theme, i - i_prec, 0);
		tableTitleExpressions.Node.childNodes[i - i_prec].ThemeExpression = themeExpression;
		tableTitleExpressions.Node.childNodes[i - i_prec].onclick = function()
		{
			// Select the new cell
			var ensTables = Tools.Panel_ConnecteurLogiquesI.Node.childNodes[0];
			for(var i = 0; i < ensTables.childNodes.length; i++)
			{
				var table = ensTables.childNodes[i].firstChild;
				for(var u = 0; u < table.childNodes.length; u++)
				{
					if(table.childNodes[u] == this)
					{
						this.firstChild.className = "Stat-CellStyleSelect";
					}
					else table.childNodes[u].firstChild.className = "Stat-CellStyle";
				}
			}
			Tools.ShowExpression(this.ThemeExpression, 'connecteurs_logique', -1);
		};
	}
	
	this.Node.appendChild(tableTitleExp);
	
	document.getElementById('MainDiv').appendChild(this.Node);
},

Handler_Panel_FormulesPolitesse : function()
{

	//REMOVE CLASS FLEX WHEN NOT ON ORTOGRAPHE
	$('.ortho-flex').removeClass('flex');

	//HIDE SIDEBAR
	$('.sidebar').hide();

	$('body').attr('id', 'formules-politesse');
	$('#MainDiv').css('width', '100%');

	$('ul.navbar-nav li a').removeClass('selected');
	$('#btnout').addClass('selected');

	// If object not existing then send a request
	if(Tools.ToolsObject == null)
	{
		Tools.SendRequest('formules_politesse');
		return;
	}

	document.getElementById("sub-btnout").style.display = "none";

	var mainDiv = document.getElementById("MainDiv");
	
	// Hide sol popups
	Cor.PopupPanelSol.SetVisible(false, false, false, true);
	
	document.getElementById("PanelBtn").style.display = "none";
	document.getElementById("TextArea").style.display = "none";
	
	if(mainDiv.lastChild.id != null && mainDiv.lastChild.id != "PanelWait") mainDiv.removeChild(mainDiv.lastChild);
	
	if(Cor.IsTablet == false)
	{
		// mainDiv.style.width = "736px";
		
		// Hide the div style
		var divStyle = document.getElementById("StyleTexte");
		divStyle.style.visibility = "hidden";
		
		// Hide the div syn stat panel
		document.getElementById("InfSup").style.display = "none";
		
		var pub3 = document.getElementById("pub3");
		if(pub3 != null) pub3.style.display = "none";
	}
	else
	{
		// Hide the div style
		var divStyle = document.getElementById("DivStyleStat");
		divStyle.style.display = "none";
	}
	
	// Create the panel then add it
	if(Tools.Panel_FormulesPolitesseI == null) Tools.Panel_FormulesPolitesseI = new Tools.Panel_FormulesPolitesse();
	
	mainDiv.appendChild(Tools.Panel_FormulesPolitesseI.Node);
},

// Build formule politesse panel
Panel_FormulesPolitesse : function()
{
	this.Node = document.createElement("div");
	this.Node.className = "formules-politesse";
	
	var tableTitleExp = document.createElement("table");
	tableTitleExp.className = "tabs-colonne";
	
	var tableTitleExpressions = new Util.TableType(10, 'Tools_FormulesPolitesse');
	var td = document.createElement("td");
	td.appendChild(tableTitleExpressions.Node);
	tableTitleExp.appendChild(td);
			
	var i_prec = 0;
	
	for(var i = 0; i < Tools.ToolsObject.VectFormulesPolitesse.length; i++)
	{
		var themeExpression = Tools.ToolsObject.VectFormulesPolitesse[i];
	
		if(i == 10)
		{
			i_prec = i;
			tableTitleExpressions = new Util.TableType(2, 'Tools_FormulesPolitesse');
			
			var td = document.createElement("td");
			
			td.appendChild(tableTitleExpressions.Node);
			tableTitleExp.appendChild(td);
		}
		
		tableTitleExpressions.SetText(themeExpression.Theme, i - i_prec, 0);
		tableTitleExpressions.Node.childNodes[i - i_prec].ThemeExpression = themeExpression;
		tableTitleExpressions.Node.childNodes[i - i_prec].onclick = function()
		{
			// Select the new cell
			var indexTable = -1;
			
			var ensTables = Tools.Panel_FormulesPolitesseI.Node.childNodes[0];
			for(var i = 0; i < ensTables.childNodes.length; i++)
			{
				var table = ensTables.childNodes[i].firstChild;
				if(table == this.parentNode) indexTable = i;
				
				for(var u = 0; u < table.childNodes.length; u++)
				{
					if(table.childNodes[u] == this)
					{
						this.firstChild.className = "Stat-CellStyleSelect";
					}
					else table.childNodes[u].firstChild.className = "Stat-CellStyle";
				}
			}

			Tools.ShowExpression(this.ThemeExpression, 'formules_politesse', indexTable);
		};
	}
	
	this.Node.appendChild(tableTitleExp);
	
	document.getElementById('MainDiv').appendChild(this.Node);
},


// Show an expression
ShowExpression : function(themeExpression, type, indexTable)
{
	// Create the table
	var tableExpressions = new Util.TableType(themeExpression.VectEnsExpressions.length + 1, 'Expression');
	tableExpressions.Node.style.marginTop = "20px";
	
	// Titles
	tableExpressions.Node.firstChild.setAttribute("align", "center");
	
	if(type == 'connecteurs_logique')
	{
		tableExpressions.SetText('<b>Description</b>', 0, 0);
		tableExpressions.SetText('<b>Expressions</b>', 0, 1);
		tableExpressions.SetText('<b>Exemple</b>', 0, 2);
	}
	else if(type == 'formules_politesse')
	{
		if(indexTable == 0)
		{
			tableExpressions.SetText('<b>Destinataire</b>', 0, 0);
			tableExpressions.SetText("<b>Formule d'appel</b>", 0, 1);
			tableExpressions.SetText('<b>Formule de politesse finale</b>', 0, 2);
		}
		else
		{
			tableExpressions.SetText('<b>Pr' + String.fromCharCode(233) + 'ambule</b>', 0, 0);
			tableExpressions.SetText('<b>Forme verbale</b>', 0, 1);
			tableExpressions.SetText('<b>Forme nominale</b>', 0, 2);
		}
	}
	
	// Datas
	for(var i = 0; i < themeExpression.VectEnsExpressions.length; i++)
	{
		var ensExpressions = themeExpression.VectEnsExpressions[i];
	
		// Description
		var divDescriptions = document.createElement("div");
		divDescriptions.style.margin = "2px";
		for(var u = 0; u < ensExpressions.VectDescriptions.length; u++)
		{
			var descriptionSt = ensExpressions.VectDescriptions[u];
			var divDescription = document.createElement("div");
			divDescription.style.marginBottom = "5px";
			divDescription.innerHTML = "<b>" + descriptionSt + "</b>";
			divDescriptions.appendChild(divDescription);
		}
		
		tableExpressions.SetNode(divDescriptions, i + 1, 0);
		
		// Expressions
		var divExpressions = document.createElement("div");
		divExpressions.style.margin = "2px";
		for(var u = 0; u < ensExpressions.VectExpressions.length; u++)
		{
			var expressionSt = ensExpressions.VectExpressions[u];
			var divExpression = document.createElement("div");
			divExpression.style.marginBottom = "5px";
			divExpression.innerHTML = expressionSt;
			divExpressions.appendChild(divExpression);
		}
		
		tableExpressions.SetNode(divExpressions, i + 1, 1);
		
		// Exemples
		var divExemples = document.createElement("div");
		divExemples.style.margin = "2px";
		for(var u = 0; u < ensExpressions.VectExemples.length; u++)
		{
			var exempleSt = ensExpressions.VectExemples[u];
			var divExemple = document.createElement("div");
			divExemple.style.marginBottom = "5px";
			divExemple.innerHTML = exempleSt;
			divExemples.appendChild(divExemple);
		}
		
		tableExpressions.SetNode(divExemples, i + 1, 2);
	}

	if(type == 'connecteurs_logique')
	{
		if(Tools.Panel_ConnecteurLogiquesI.Node.childNodes.length == 2)
		{
			Tools.Panel_ConnecteurLogiquesI.Node.removeChild(Tools.Panel_ConnecteurLogiquesI.Node.childNodes[1]);
		}
		
		Tools.Panel_ConnecteurLogiquesI.Node.appendChild(tableExpressions.Node);
	}
	else if(type == 'formules_politesse')
	{
		if(Tools.Panel_FormulesPolitesseI.Node.childNodes.length == 2)
		{
			Tools.Panel_FormulesPolitesseI.Node.removeChild(Tools.Panel_FormulesPolitesseI.Node.childNodes[1]);
		}
		
		Tools.Panel_FormulesPolitesseI.Node.appendChild(tableExpressions.Node);
	}
	
},

// Handler of presentation letter
Handler_Panel_PresentationLettres : function()
{

	//REMOVE CLASS FLEX WHEN NOT ON ORTOGRAPHE
	$('.ortho-flex').removeClass('flex');

	//HIDE SIDEBAR
	$('.sidebar').hide();
	
	document.getElementById("sub-btnout").style.display = "none";

	$('ul.navbar-nav li a').removeClass('selected');
	$('#btnout').addClass('selected');

	$('body').attr('id', 'presentation-lettres');
	$('#MainDiv').css('width', '100%');

	var mainDiv = document.getElementById("MainDiv");
	
	// Hide sol popups
	Cor.PopupPanelSol.SetVisible(false, false, false, true);
	
	document.getElementById("PanelBtn").style.display = "none";
	document.getElementById("TextArea").style.display = "none";
	
	if(mainDiv.lastChild.id != null && mainDiv.lastChild.id != "PanelWait") mainDiv.removeChild(mainDiv.lastChild);
	
	if(Cor.IsTablet == false)
	{
		// mainDiv.style.width = "736px";
			
		// Hide the div style
		var divStyle = document.getElementById("StyleTexte");
		divStyle.style.visibility = "hidden";
		
		// Hide the div syn stat panel
		document.getElementById("InfSup").style.display = "none";
		
		var pub3 = document.getElementById("pub3");
		if(pub3 != null) pub3.style.display = "none";
	}
	else
	{
		// Hide the div style
		var divStyle = document.getElementById("DivStyleStat");
		divStyle.style.display = "none";
	}
	
	// Create the panel then add it
	if(Tools.Panel_PresentationLettresI == null) Tools.Panel_PresentationLettresI = new Tools.Panel_PresentationLettres();
	
	mainDiv.appendChild(Tools.Panel_PresentationLettresI.Node);
},

// Presentation letter
PresentationLettre : function(date2ndModele, nom, numTelMail, adresse, ville,
							  nomDestinataire, adresseDestinataire, villeDestinataire,
							  date, formulePolitesse, corps, formulePolitesseFinale, signature, nomPrenomSignature)
{
	var divPresentationLetter = document.createElement("div");
	divPresentationLetter.className = "Ored-PanelPresentationLettre";
	divPresentationLetter.style.marginLeft = "30px";
	divPresentationLetter.style.paddingBottom = "150px";
	divPresentationLetter.style.width = "657px";
	
	// Date 2nd modèle.
	if(date2ndModele != null)
	{
		var divDate2ndModele = document.createElement("div");
		divDate2ndModele.innerHTML = date2ndModele;
		divDate2ndModele.style.marginBottom = "20px";
		divPresentationLetter.appendChild(divDate2ndModele);
	}
	
	// Identité
	var divIdentite = document.createElement("div");
	divIdentite.style.marginBottom = "30px";
	var divNom = document.createElement("div");
	divNom.innerHTML = nom;
	divIdentite.appendChild(divNom);
	var divTelMail = document.createElement("div");
	divTelMail.innerHTML = numTelMail;
	divIdentite.appendChild(divTelMail);
	var divAdress = document.createElement("div");
	divAdress.innerHTML = adresse;
	divIdentite.appendChild(divAdress);
	var divVille = document.createElement("div");
	divVille.innerHTML = ville;
	divIdentite.appendChild(divVille);
	divPresentationLetter.appendChild(divIdentite);
	
	// Destinataire
	/*var contDivDestinataire = document.createElement("div");
	contDivDestinataire.setAttribute("align", "right");
	
	var divDestinataire = document.createElement("div");
	divDestinataire.style.marginBottom = "30px";
	divDestinataire.setAttribute("align", "left");
	divDestinataire.style.width = "239px";
	
	var divNomDestinataire = document.createElement("div");
	divNomDestinataire.innerHTML = nomDestinataire;
	divDestinataire.appendChild(divNomDestinataire);
	var divAdresseDestinataire = document.createElement("div");
	divAdresseDestinataire.innerHTML = adresseDestinataire;
	divDestinataire.appendChild(divAdresseDestinataire);
	var divVilleDestinataire = document.createElement("div");
	divVilleDestinataire.innerHTML = villeDestinataire;
	divDestinataire.appendChild(divVilleDestinataire);
	
	contDivDestinataire.appendChild(divDestinataire);
	divPresentationLetter.appendChild(contDivDestinataire);*/
	
	var contDivDestinataire = document.createElement("div");
	contDivDestinataire.setAttribute("align", "right");
	contDivDestinataire.style.marginBottom = "30px";
	
	var tableDestinataire = document.createElement("table");
	var trNomDestinataire = document.createElement("tr");
	trNomDestinataire.innerHTML = nomDestinataire;
	tableDestinataire.appendChild(trNomDestinataire);
	var trAdresseDestinataire = document.createElement("tr");
	trAdresseDestinataire.innerHTML = adresseDestinataire;
	tableDestinataire.appendChild(trAdresseDestinataire);
	var trVilleDestinataire = document.createElement("tr");
	trVilleDestinataire.innerHTML = villeDestinataire;
	tableDestinataire.appendChild(trVilleDestinataire);
	
	contDivDestinataire.appendChild(tableDestinataire);
	divPresentationLetter.appendChild(contDivDestinataire);
	
	// Date ou objet
	var divDate = document.createElement("div");
	divDate.innerHTML = date;
	divDate.setAttribute("align", "center");
	divDate.style.marginBottom = "30px";
	if((date.indexOf("Objet") == 0) || (date.indexOf("[Objet") == 0)) divDate.style.textDecoration = "underline";
	divPresentationLetter.appendChild(divDate);
	
	// FormulePolitesse
	var divFormulePolitesse = document.createElement("div");
	divFormulePolitesse.innerHTML = formulePolitesse;
	divFormulePolitesse.style.marginBottom = "20px";
	divPresentationLetter.appendChild(divFormulePolitesse);
	
	// Corps
	var divCorps = document.createElement("div");
	divCorps.innerHTML = corps;
	divCorps.style.marginBottom = "20px";
	if(corps == "[Corps du message]")
	{
		var corpsSt = "[Corps du message<Br>...<Br>...<Br>...<Br>...<Br>...<Br>...<Br>...&nbsp;]";
		//for(int i = 0; i < 100; i++) corpsSt += "&nbsp;";
		//corpsSt += "]";
		divCorps.innerHTML = corpsSt;
	}
	divPresentationLetter.appendChild(divCorps);
	
	// FormulePolitesseFinale
	var divFormulePolitesseFinale = document.createElement("div");
	divFormulePolitesseFinale.innerHTML = formulePolitesseFinale;
	divFormulePolitesseFinale.style.marginBottom = "30px";
	divPresentationLetter.appendChild(divFormulePolitesseFinale);
	
	// Signature
	// Exemple
	if(signature == null)
	{
		var divSignature = document.createElement("div");
		divSignature.innerHTML = "Signature";
		divSignature.setAttribute("align", "right");
		divPresentationLetter.appendChild(divSignature);
	}
	else
	{
		var divContSignature = document.createElement("div");
		divContSignature.setAttribute("align", "right");
		divContSignature.style.marginBottom = "10px";
		divContSignature.appendChild(signature);
		
		divPresentationLetter.appendChild(divContSignature);
	}
	
	// Nom pr�nom de la signature.
	var divNomPrenomSignature = document.createElement("div");
	divNomPrenomSignature.innerHTML = nomPrenomSignature;
	divNomPrenomSignature.setAttribute("align", "right");
	
	if(!(nomPrenomSignature.indexOf("Votre") == 0))
	{
		divNomPrenomSignature.style.marginRight = "50px";
		divNomPrenomSignature.style.marginBottom = "10px";
	}
	
	divPresentationLetter.appendChild(divNomPrenomSignature);
	
	return divPresentationLetter;
},

// Panel of presentation letters
Panel_PresentationLettres : function()
{
	this.Node = document.createElement("div");
	this.Node.className = "presentation-lettres";
	// this.Node.style.borderStyle = "solid";
	// this.Node.style.borderColor = "#d0d0d0";
	// this.Node.style.borderWidth = "1px";
	//this.Node.style.padding = "15px";
	//this.Node.align = "center";

	var pills = document.createElement("div");
	pills.className = "nav flex-column nav-pills tabs-colonne";
	pills.setAttribute('id', 'v-pills-tab');
	pills.setAttribute('role', 'tablist');
	pills.setAttribute('aria-orientation', 'vertical');

	var pillsAModel1 = document.createElement("a");
	pillsAModel1.className = 'nav-link active';
	pillsAModel1.setAttribute('id', 'v-pills-model1-tab');
	pillsAModel1.setAttribute('data-toggle', 'pill');
	pillsAModel1.setAttribute('href', '#v-pills-model1');
	pillsAModel1.setAttribute('role', 'tab');
	pillsAModel1.setAttribute('aria-controls', 'v-pills-model1');
	pillsAModel1.setAttribute('aria-selected', 'true');
	if(Cor.IdLangue == "fr")
		pillsAModel1.innerHTML = "1er modèle";
	else 
		pillsAModel1.innerHTML = "1st model";
	pillsAModel1.onclick = function()
	{
		$('.nav-pills .nav-link').removeClass('active');
		$(this).addClass('active');
	};

	var pillsAModel2 = document.createElement("a");
	pillsAModel2.className = 'nav-link';
	pillsAModel2.setAttribute('id', 'v-pills-model2-tab');
	pillsAModel2.setAttribute('data-toggle', 'pill');
	pillsAModel2.setAttribute('href', '#v-pills-model2');
	pillsAModel2.setAttribute('role', 'tab');
	pillsAModel2.setAttribute('aria-controls', 'v-pills-model2');
	pillsAModel2.setAttribute('aria-selected', 'false');
	if(Cor.IdLangue == "fr")
		pillsAModel2.innerHTML = "2ème modèle";
	else 
		pillsAModel2.innerHTML = "2nd model";

	pillsAModel2.onclick = function()
	{
		$('.nav-pills .nav-link').removeClass('active');
		$(this).addClass('active');
	};

	pills.appendChild(pillsAModel1);
	pills.appendChild(pillsAModel2);
	this.Node.appendChild(pills);

	var tabsContent = document.createElement("div");
	tabsContent.setAttribute('id', 'v-pills-tabContent');
	tabsContent.className = "tab-content Stat-GridRep";

	var tabsContentModel1 = document.createElement("div");
	tabsContentModel1.className = 'tab-pane active';
	tabsContentModel1.setAttribute('id', 'v-pills-model1');
	tabsContentModel1.setAttribute('role', 'tabpanel');
	tabsContentModel1.setAttribute('aria-labelledby', 'v-pills-model1-tab');
	// Modele presentation 1
	var modelePresentation1 = Tools.PresentationLettre(
		null, "Votre Pr" + String.fromCharCode(233) + "nom, Nom", "N" + String.fromCharCode(176) + " de T" + String.fromCharCode(232) + "l. - mail", "Votre adresse", "Code Postal - Votre ville",
		"Destinataire", "Adresse du destinataire", "Code Postal - ville du destinataire",
		"[Ville au moment de r" + String.fromCharCode(233) + "diger le courrier], [Date]", "[Formule de politesse]", "[Corps du message]",
		"[Formule de politesse finale]", null, "Votre Pr" + String.fromCharCode(233) + "nom, Nom"
	);
	tabsContentModel1.appendChild(modelePresentation1);

	// Title exemle modele 1
	var titleSampleModel1 = document.createElement("div");
	titleSampleModel1.className = "Ored-TexteBasePresentationLettre";
	// titleSampleModel1.style.fontWeight = "bold";
	// titleSampleModel1.style.fontSize = "18px";
	// titleSampleModel1.style.marginLeft = "32px";
	titleSampleModel1.innerHTML = "Exemple :";
	tabsContentModel1.appendChild(titleSampleModel1);
	
	// Exemple modele presentation 1
	var formulePolitesse1 = "Madame le Maire,";
		
	var corpsMessage1 = "<p>En tant que membre d'une importante association de v" + String.fromCharCode(233) + "lo, je tenais " + String.fromCharCode(224) + " vous f" + String.fromCharCode(233) + "liciter pour la magnifique prestation du grand prix de Saint-Brieuc.</p>" +
	"<p>Celui-ci nous a " + String.fromCharCode(233) + "merveill" + String.fromCharCode(233) + ", moi et ma femme. J'ai soutenu mon cousin, qui a termin" + String.fromCharCode(233) + " " + String.fromCharCode(224) + " la 4e place ! L'organisation " + String.fromCharCode(233) + "tait parfaite et le commentateur " + String.fromCharCode(233) + "tait g" + String.fromCharCode(233) + "nial.</p>" + 
	"<p>Nous esp" + String.fromCharCode(233) + "rons que ce grand prix continuera " + String.fromCharCode(224) + " exister dans les prochaines ann" + String.fromCharCode(233) + "es et nous remercions pour tous les moments de plaisir que vous nous avez fait vivre.</p>";
	
	var formulePolitesseFinal1 = "Je vous prie d'agr" + String.fromCharCode(233) + "er, Madame le Maire, l'expression de ma consid" + String.fromCharCode(233) + "ration la plus distingu" + String.fromCharCode(233) + "e.";
	
	var imgSignature1 = document.createElement("img");
	imgSignature1.src = "images/Signature.png";
	
	var exempleModelePresentation1 = Tools.PresentationLettre(
		null, "Alain Toussaint", "06 56 78 45 34 - alain.toussaint@yahoo.fr", "9 rue des coquelicots", "22200 - Guingamp",
	    "Mairie de Saint-Brieuc", "1 place du G" + String.fromCharCode(233) + "n" + String.fromCharCode(233) + "ral de Gaulle", "22023 - Saint-Brieuc",
	    "Guingamp, le Lundi 28 Juillet 2014", formulePolitesse1, corpsMessage1,
	    formulePolitesseFinal1, imgSignature1, "Alain Toussaint"
	);
	
	tabsContentModel1.appendChild(exempleModelePresentation1);



	var tabsContentModel2 = document.createElement("div");
	tabsContentModel2.className = 'tab-pane fade';
	tabsContentModel2.setAttribute('id', 'v-pills-model2');
	tabsContentModel2.setAttribute('role', 'tabpanel');
	tabsContentModel2.setAttribute('aria-labelledby', 'v-pills-model2-tab');
	// Modele presentation 2
	var modelePresentation2 = Tools.PresentationLettre(
		"[Ville au moment de r" + String.fromCharCode(233) + "diger le courrier], [Date]", "Votre Pr" + String.fromCharCode(233) + "nom, Nom", "N" + String.fromCharCode(176) + " de T" + String.fromCharCode(232) + "l. - mail", "Votre adresse", "Code Postal - Votre ville",
	   "Destinataire", "Adresse du destinataire", "Code Postal - ville du destinataire",
	   "[Objet : description de l'objet]", "[Formule de politesse]", "[Corps du message]",
	   "[Formule de politesse finale]", null, "Votre Pr" + String.fromCharCode(233) + "nom, Nom"
	);
	tabsContentModel2.appendChild(modelePresentation2);

	// Title exemle modele 2
	var titleSampleModel2 = document.createElement("div");
	titleSampleModel2.className = "Ored-TexteBasePresentationLettre";
	// titleSampleModel2.style.fontWeight = "bold";
	// titleSampleModel2.style.fontSize = "18px";
	// titleSampleModel2.style.marginLeft = "31px";
	titleSampleModel2.innerHTML = "Exemple :";
	tabsContentModel2.appendChild(titleSampleModel2);
	
	// Exemple modele presentation 2
	
	var formulePolitesse2 = "Monsieur Boiteau,";
		
	var corpsMessage2 = "<p>J'ai l'honneur et la joie de vous informer de la naissance de mon enfant en date du 10 Janvier 2014.</p>" +
					   "<p>Aussi je souhaiterais b" + String.fromCharCode(233) + "n" + String.fromCharCode(233) + "ficier de mes 3 jours de cong" + String.fromCharCode(233) + "s du 11 Janvier 2014 au 13 Janvier 2014, conform" + String.fromCharCode(233) + "ment aux dispositions du Code du Travail relatif aux " + String.fromCharCode(233) + "v" + String.fromCharCode(232) + "nements familiaux.</p>";
				
	var formulePolitesseFinal2 = "<p>Je vous prie d'agr" + String.fromCharCode(233) + "er, Monsieur, l'expression de mes respectueuses salutations.</p>";
	
	var imgSignature2 = document.createElement("img");
	imgSignature2.src = "images/Signature.png";
	
	var modelePresentation2 = Tools.PresentationLettre(
		"Guingamp, le Lundi 28 Juillet 2014", "Alain Toussaint", "06 56 78 45 34 - alain.toussaint@yahoo.fr", "9 rue des coquelicots", "22200 - Guingamp",
		"Insitra Corp.", "52 rue Saint-Martin", "22303 - Lannion",
		"Objet : Demande de cong" + String.fromCharCode(233) + "s", formulePolitesse2, corpsMessage2,
		formulePolitesseFinal2, imgSignature2, "Alain Toussaint"
	);
	
	tabsContentModel2.appendChild(modelePresentation2);


	tabsContent.appendChild(tabsContentModel1);
	tabsContent.appendChild(tabsContentModel2);

	this.Node.appendChild(tabsContent);
	
	// Title modele 1
	// var titleModel1 = document.createElement("div");
	// titleModel1.className = "Ored-TexteBasePresentationLettre";
	// // titleModel1.style.fontWeight = "bold";
	// // titleModel1.style.textDecoration = "underline";
	// // titleModel1.style.fontSize = "18px";
	// // titleModel1.style.marginLeft = "31px";
	// // titleModel1.style.marginTop = "20px";
	// titleModel1.innerHTML = "1er mod" + String.fromCharCode(232) + "le :";
	// this.Node.appendChild(titleModel1);
	
	
	
	// this.Node.appendChild(modelePresentation1);
	
	// // Title exemle modele 1
	// var titleSampleModel1 = document.createElement("div");
	// titleSampleModel1.className = "Ored-TexteBasePresentationLettre";
	// // titleSampleModel1.style.fontWeight = "bold";
	// // titleSampleModel1.style.fontSize = "18px";
	// // titleSampleModel1.style.marginLeft = "32px";
	// titleSampleModel1.innerHTML = "Exemple :";
	// this.Node.appendChild(titleSampleModel1);
	
	// // Exemple modele presentation 1
	// var formulePolitesse = "Madame le Maire,";
		
	// var corpsMessage = "<p>En tant que membre d'une importante association de v" + String.fromCharCode(233) + "lo, je tenais " + String.fromCharCode(224) + " vous f" + String.fromCharCode(233) + "liciter pour la magnifique prestation du grand prix de Saint-Brieuc.</p>" +
	// "<p>Celui-ci nous a " + String.fromCharCode(233) + "merveill" + String.fromCharCode(233) + ", moi et ma femme. J'ai soutenu mon cousin, qui a termin" + String.fromCharCode(233) + " " + String.fromCharCode(224) + " la 4e place ! L'organisation " + String.fromCharCode(233) + "tait parfaite et le commentateur " + String.fromCharCode(233) + "tait g" + String.fromCharCode(233) + "nial.</p>" + 
	// "<p>Nous esp" + String.fromCharCode(233) + "rons que ce grand prix continuera " + String.fromCharCode(224) + " exister dans les prochaines ann" + String.fromCharCode(233) + "es et nous remercions pour tous les moments de plaisir que vous nous avez fait vivre.</p>";
	
	// var formulePolitesseFinal = "Je vous prie d'agr" + String.fromCharCode(233) + "er, Madame le Maire, l'expression de ma consid" + String.fromCharCode(233) + "ration la plus distingu" + String.fromCharCode(233) + "e.";
	
	// var imgSignature = document.createElement("img");
	// imgSignature.src = "images/Signature.png";
	
	// var exempleModelePresentation1 = Tools.PresentationLettre(
	// 	null, "Alain Toussaint", "06 56 78 45 34 - alain.toussaint@yahoo.fr", "9 rue des coquelicots", "22200 - Guingamp",
	//     "Mairie de Saint-Brieuc", "1 place du G" + String.fromCharCode(233) + "n" + String.fromCharCode(233) + "ral de Gaulle", "22023 - Saint-Brieuc",
	//     "Guingamp, le Lundi 28 Juillet 2014", formulePolitesse, corpsMessage,
	//     formulePolitesseFinal, imgSignature, "Alain Toussaint"
	// );
	
	// this.Node.appendChild(exempleModelePresentation1);
	
	// // Title modele 2
	// var titleModel2 = document.createElement("div");
	// titleModel2.className = "Ored-TexteBasePresentationLettre";
	// // titleModel2.style.fontWeight = "bold";
	// // titleModel2.style.textDecoration = "underline";
	// // titleModel2.style.fontSize = "18px";
	// // titleModel2.style.marginLeft = "31px";
	// titleModel2.innerHTML = "2nd mod" + String.fromCharCode(232) + "le :";
	// this.Node.appendChild(titleModel2);
	
	// // Modele presentation 2
	// var modelePresentation1 = Tools.PresentationLettre(
	// 	"[Ville au moment de r" + String.fromCharCode(233) + "diger le courrier], [Date]", "Votre Pr" + String.fromCharCode(233) + "nom, Nom", "N" + String.fromCharCode(176) + " de T" + String.fromCharCode(232) + "l. - mail", "Votre adresse", "Code Postal - Votre ville",
	//    "Destinataire", "Adresse du destinataire", "Code Postal - ville du destinataire",
	//    "[Objet : description de l'objet]", "[Formule de politesse]", "[Corps du message]",
	//    "[Formule de politesse finale]", null, "Votre Pr" + String.fromCharCode(233) + "nom, Nom"
	// );
	
	// this.Node.appendChild(modelePresentation1);
	
	// // Title exemle modele 2
	// var titleSampleModel2 = document.createElement("div");
	// titleSampleModel2.className = "Ored-TexteBasePresentationLettre";
	// // titleSampleModel2.style.fontWeight = "bold";
	// // titleSampleModel2.style.fontSize = "18px";
	// // titleSampleModel2.style.marginLeft = "31px";
	// titleSampleModel2.innerHTML = "Exemple :";
	// this.Node.appendChild(titleSampleModel2);
	
	// // Exemple modele presentation 2
	
	// var formulePolitesse = "Monsieur Boiteau,";
		
	// var corpsMessage = "<p>J'ai l'honneur et la joie de vous informer de la naissance de mon enfant en date du 10 Janvier 2014.</p>" +
	// 				   "<p>Aussi je souhaiterais b" + String.fromCharCode(233) + "n" + String.fromCharCode(233) + "ficier de mes 3 jours de cong" + String.fromCharCode(233) + "s du 11 Janvier 2014 au 13 Janvier 2014, conform" + String.fromCharCode(233) + "ment aux dispositions du Code du Travail relatif aux " + String.fromCharCode(233) + "v" + String.fromCharCode(232) + "nements familiaux.</p>";
				
	// var formulePolitesseFinal = "<p>Je vous prie d'agr" + String.fromCharCode(233) + "er, Monsieur, l'expression de mes respectueuses salutations.</p>";
	
	// var imgSignature = document.createElement("img");
	// imgSignature.src = "images/Signature.png";
	
	// var modelePresentation2 = Tools.PresentationLettre(
	// 	"Guingamp, le Lundi 28 Juillet 2014", "Alain Toussaint", "06 56 78 45 34 - alain.toussaint@yahoo.fr", "9 rue des coquelicots", "22200 - Guingamp",
	// 	"Insitra Corp.", "52 rue Saint-Martin", "22303 - Lannion",
	// 	"Objet : Demande de cong" + String.fromCharCode(233) + "s", formulePolitesse, corpsMessage,
	// 	formulePolitesseFinal, imgSignature, "Alain Toussaint"
	// );
	
	// this.Node.appendChild(modelePresentation2);
	
	document.getElementById('MainDiv').appendChild(this.Node);
}

};