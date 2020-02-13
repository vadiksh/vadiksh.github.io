
var Style = {

// The StyleText element
StyleText : null,

// Element le plus haut dans le texte. Pour le rep�rage.
EltTopPos : 10000000,

VectPh : [],

MapIdMotsTmp : new Map(),

// Map d'id des synonymes. La clé est l'id de la phrase. La valeur est un ensemble de synonyme de la phrase.
MapIdSyn : new Map(),

// Set des séparateurs
SetSeparateur : new Set(),

// Offset gauche de la sélection du synomyme actuel
OffsetGSyn : 1,

// Offset droit de la sélection du synomyme actuel
OffsetDSyn : -1,

// Vector des IDSyn de la phrase contenant le synonyme actuel
VectIdSyn : null,

// IdSyn du synonyme actuel.
IdSynActuel : null,

// Focus on synonym
FocusTableSyn : false,

// Ensemble des IndicateurRep (mots de répétitions) de la zone modifiée et ses contours bas et haut.
VectIndicateurRep : [],

// Ensemble des IndicateurRep (mots de répétitions) à garder de la zone modifiée et ses contours bas et haut.
VectIndicateurRepAGarder : [],

// Panel of synonyms
PanelSynI : null,

// Ecart mot rep
EcartMotRep : 3,

// Table of repetitions
TableRep : null,

// Table of repetitions 2mPh
TableRep2mPh : null,

// Options of style
OptionsStyleSt : 'RepMin:3|GapRep:3|AllWords:0|FamilyWords:0|MinPhLg:30|MinPhCt:5|Ttr:250|Tts:150',

// DivMarques
DivMarques : null,

// Map of PanelRb
Map_PanelRb : new Map(),

// Table of registers
TableReg : null,

// Row selected prec
RowSelectedPrec : null,

// Vector of possible registers
Vect_PossibleRegisters : [],

// NonAffichage
AffPanNonAffichage : false,

// Stat view
StatView : false,

// Set if the panel has been initialized
Initialized : false,

// Init
Init : function()
{
	// Set the default options with the languege
	//if(Cor.IdLangue == 'en') Style.OptionsStyleSt = 'RepMin:3|GapRep:3|AllWords:0|FamilyWords:0|MinPhLg:30|MinPhCt:5|Ttr:300|Tts:130';

	if(Cor.IsMobile == true) return;

	// Hide the right panel
	if(Cor.IdLangue == 'fr') document.getElementById("InfSup").style.display = "none";
	
	var divStyle = document.getElementById("StyleTexte");
	//divStyle.style.display = "block";
	//divStyle.style.visibility = "visible";
	
	if(Cor.IdLangue == 'fr')
	{
		//if(Plugins.Type == null) divStyle.style.paddingTop = "136px";
		//else divStyle.style.paddingTop = "66px";
	}
	else if(Cor.IdLangue == 'en')
	{
		//if(Plugins.Type == null) divStyle.style.paddingTop = "124px";
		//else divStyle.style.paddingTop = "66px";
		
		// Descend la pub
		document.getElementById("pub3En").style.paddingTop = "0px";
	}
	
	// Panel marques
	Style.AddPanelMarques();
	
	// Choice Stat/Syn
	Style.AddChoiceStatSyn();
	
	// Create the syn panel
	Style.AddSynPanel();

	// Add Separateurs
	Style.AddSeparateurs();
	
	// Add choice style block
	Style.AddChoiceStyle();
	
	// Create the div display style.
	var divDisplayStyle = document.createElement("div");
	divDisplayStyle.id = "DivDisplayStyle";
	divDisplayStyle.style.padding = "7px";
	divDisplayStyle.style.border = "1px solid #EDEDED";
	document.getElementById("StyleTexte").appendChild(divDisplayStyle);
	
	// Add no remark block
	Style.AddNoRemarkBlock();
	
	// Add repetition block
	Style.AddRepetitionBlock();
	
	// Add rephrase block
	Style.AddRephraseBlock();
	
	// Add vocabulary enhancement block
	Style.AddVocabularyEnhancement();
	
	// Add Subjectivity block
	Style.AddSubjectivity();
	
	// Add suggestion solutions block
	Style.AddSuggestionSolBlock();
	
	// Add sentence block
	Style.AddSentenceBlock();
	
	// Add registre block
	Style.AddRegisterBlock();
	
	// Add no showing block
	Style.AddNoShowingBlock();
	
	// Init vector of possible registers.
	Style.Init_VectPossibleRegisters();
	
	Style.Initialized = true;
},

AddPanelMarques : function()
{
	Style.DivMarques = document.getElementById("DivMarques");
	Style.DivMarques.className = "Transf-PanelMarques";
	Style.DivMarques.style.paddingLeft = "0px";
	Style.DivMarques.style.paddingRight = "0px";
	Style.DivMarques.style.height = "1018px";
	Style.DivMarques.style.width = "13px";
	Style.DivMarques.style.position = "relative";
	//Style.DivMarques.style.overflow = "hidden";
	
	// Décale le div text Area
	/*var divTextArea = document.getElementById("TextArea");	// TODO X
	divTextArea.style.marginLeft = "8px";
	divTextArea.childNodes[3].style.marginLeft = "-8px";*/
},

AddChoiceStatSyn : function()
{
	var divChoiceStatSyn = document.getElementById("ChoiceStatSyn");
	divChoiceStatSyn.className = "Transf-CadreGridSyn hidden";
	divChoiceStatSyn.style.height = '48px';
	divChoiceStatSyn.style.zIndex = '5';
	
	// Choice
	var tableChoice = document.createElement("table");
	tableChoice.className = 'Cor-TabOptions Tabs tabs-number-3';
	var tr0 = document.createElement("tr");
	tr0.classList.add('Cor-LiOptions');
	tr0.classList.add('Tabs__tab');
	tr0.classList.add('Tab');
	tableChoice.appendChild(tr0);
	
	//  Label synonyms
	var td00 = document.createElement("td");
	var divTextSyn = document.createElement("div");
	divTextSyn.className = "Transf-LabelAffSyn";
	divTextSyn.style.cursor = "pointer";
	var label = "Synonymes";
	if(Cor.IdLangue == 'en') label = "Synonyms";
	divTextSyn.innerHTML = label;
	td00.appendChild(divTextSyn);
	tr0.appendChild(td00);
	
	// Check box Syn
	var td01 = document.createElement("td");
	var checkBoxSyn = document.createElement("input");
	checkBoxSyn.setAttribute("type", "checkbox");
	checkBoxSyn.style.cursor = "pointer";
	//checkBoxSyn.setAttribute("value", "on");
	//checkBoxSyn.style.zIndex = '5';
	checkBoxSyn.style.marginTop = "5px";
	checkBoxSyn.id = "checkBoxSyn";
	checkBoxSyn.onclick = function(){syn_fct();}
	
	td00.onclick = function()
	{
		Style.StatView = false;
		
		if(checkBoxSyn.checked == false)
		{	
			checkBoxSyn.checked = true;
			
			if(!this.parentNode.className.includes('active'))
			{
				syn_fct();
			}
		}
		else {
			checkBoxSyn.checked = false;
		}
	}
	
	
	var syn_fct = function()
	{
		if(checkBoxSyn.checked == true)
		{
			checkBoxSyn.parentNode.parentNode.classList.add('active');

			// Disable the stat check box
			var checkBoxStat = document.getElementById("checkBoxStat");
			checkBoxStat.checked = false;
			document.getElementById('style-checkbox').checked = false;
			document.getElementById('checkBoxStat').parentNode.parentNode.classList.remove('active');
			document.getElementById('style-checkbox').parentNode.parentNode.classList.remove('active');
			$('#StyleTexte .Stat-StatTextePanel').hide().removeClass('open');
			$('#StyleTexte #DivDisplayStyle').hide().removeClass('open');
			
			// Show the panel syn.
			// Style.PanelSynI.Node.style.display = "block";
			Style.PanelSynI.Node.classList.add('open');
			
			// Show the panel stat
			// Stat.PanelStat.style.display = "none";
			
			// Hide only popups.
			Cor.PopupPanelSol.SetVisible(false, false, false, true);
			Style.PanelSynI.SetVisible_LabelNoSyn(true);
			
			// Check radiobox od deactivate display.
			//var rbNoShowing = document.getElementById("NoShowing_Stat");
			//rbNoShowing.checked = true;
		}
		else
		{
			checkBoxSyn.parentNode.parentNode.classList.remove('active');
			// Hide the panel syn.
			Style.PanelSynI.Node.style.display = "none";
			
			// Show the ad
			if(Cor.IdLangue == "en") document.getElementById("pub3En").style.display = "block";
		}
	};
	
	//document.getElementById("MainDiv").appendChild(checkBoxSyn);
	
	td01.appendChild(checkBoxSyn);
	tr0.appendChild(td01);
	
	var tr1 = document.createElement("tr");
	tr1.classList.add('Cor-LiOptions');
	tr1.classList.add('Tabs__tab');
	tr1.classList.add('Tab');
	
	tableChoice.appendChild(tr1);
	
	//  Label Stats
	var td10 = document.createElement("td");
	var divTextStat = document.createElement("div");
	divTextStat.className = "Transf-LabelAffSyn";
	divTextStat.style.cursor = "pointer";
	var label = "Statistiques";
	if(Cor.IdLangue == 'en') label = "Statistics";
	divTextStat.innerHTML = label;
	//divTextStat.style.marginTop = "5px";
	td10.appendChild(divTextStat);
	tr1.appendChild(td10);
	
	// To simplify
	
	// Check box Stats
	var td11 = document.createElement("td");
	var checkBoxStat = document.createElement("input");
	checkBoxStat.setAttribute("type", "checkbox");
	checkBoxStat.style.cursor = "pointer";
	//checkBoxStat.setAttribute("value", "on");
	checkBoxStat.style.marginTop = "10px";
	checkBoxStat.id = "checkBoxStat";
	checkBoxStat.onclick = function(){stat_fct();}
	
	td10.onclick = function()
	{
		Style.StatView = true;
		
		if(checkBoxStat.checked == false)
		{
			checkBoxStat.checked = true;
			
			if(!this.parentNode.className.includes('active'))
			{
				stat_fct();
			}
		}
		else checkBoxStat.checked = false;
	}
	
	var stat_fct = function()
	{
		if(checkBoxStat.checked == true)
		{
			checkBoxStat.parentNode.parentNode.classList.add('active');
			// Disable the syn check box
			var checkBoxSyn = document.getElementById("checkBoxSyn");
			checkBoxSyn.checked = false;
			
			document.getElementById('style-checkbox').checked = false;
			document.getElementById('checkBoxSyn').parentNode.parentNode.classList.remove('active');
			document.getElementById('style-checkbox').parentNode.parentNode.classList.remove('active');
 
			$('#StyleTexte .Transf-CadreGridSyn').hide().removeClass('open');
			$('#StyleTexte .Transf-LabelNoSyn').hide().removeClass('open');
			$('#DivDisplayStyle').hide().removeClass('open');
			
			// Hide the panel syn.
			// Style.PanelSynI.Node.style.display = "none";
			
			// Show the panel stat
			// Stat.PanelStat.style.display = "block";
			Stat.PanelStat.classList.add('open');

			$('.Stat-StatTextePanel .scrollbar').removeAttr('data-simplebar');
				setTimeout(function(){
					$('.Stat-StatTextePanel .scrollbar').attr('data-simplebar', 'init');
			}, 100);

			// Launch the check if sentence changed.
			if(Cor.SetIdPhModifies.size > 0) Stat.UpdatedStat = false;
			
			if(Stat.UpdatedStat == false)
			{
				Cor.Check(false);
			}
		}
		else
		{
			checkBoxStat.parentNode.parentNode.classList.remove('active');
			// Hide the panel stat.
			Stat.PanelStat.style.display = "none";
			$('#DivDisplayStyle').show();
			
			// Deactivate display.
			Stat.DeactivateDisplay();
			
			// Show the ad
			if(Cor.IdLangue == "en") document.getElementById("pub3En").style.display = "block";
			
			// Check radiobox od deactivate display.
			//var rbNoShowing = document.getElementById("NoShowing_Stat");
			//rbNoShowing.checked = true;
		}
	};
	
	divChoiceStatSyn.appendChild(tableChoice);
	
	td11.appendChild(checkBoxStat);
	tr1.appendChild(td11);
},

AddSynPanel : function()
{
	Style.PanelSynI = new Style.PanelSyn();
	
	// var divStyleSyn = document.getElementById("DivStyleSyn");
	var divStyleSyn = document.getElementById("StyleTexte");
	divStyleSyn.appendChild(Style.PanelSynI.Node);
},

AddSeparateurs : function()
{
	// Set des séparateurs
	
	// Séparateur des sous textes
	Style.SetSeparateur.add(40);Style.SetSeparateur.add(41);	/*( )*/
	Style.SetSeparateur.add(91);Style.SetSeparateur.add(93);    /*[ ]*/
	Style.SetSeparateur.add(123);Style.SetSeparateur.add(125);    /*{ }*/
	Style.SetSeparateur.add(8212);    /*� �*/
	Style.SetSeparateur.add(8211);	/*� �*/
	
	// Séparateur entre les phrases
	Style.SetSeparateur.add(46);/* . */Style.SetSeparateur.add(59);/* ; */Style.SetSeparateur.add(33);/* ! */
	Style.SetSeparateur.add(63);/* ? */Style.SetSeparateur.add(8230);/* � */Style.SetSeparateur.add(58);/* : */
	Style.SetSeparateur.add(10); /* saut de ligne */ Style.SetSeparateur.add(13); /* retour chariot */
	
	// Séparateur placé den début de phrase. Puces, tirets etc.
	Style.SetSeparateur.add(8226); /* � */Style.SetSeparateur.add(45); /* - */
	
	// Ensemble dses caractères d'espace
	Style.SetSeparateur.add(32);Style.SetSeparateur.add(160);Style.SetSeparateur.add(8201);Style.SetSeparateur.add(12288);
	Style.SetSeparateur.add(8192);Style.SetSeparateur.add(8239);Style.SetSeparateur.add(8287);Style.SetSeparateur.add(8199);
	Style.SetSeparateur.add(8198);Style.SetSeparateur.add(8197);Style.SetSeparateur.add(8196);Style.SetSeparateur.add(8195);
	Style.SetSeparateur.add(8194);
	Style.SetSeparateur.add(9);	// T
	
	// Ponctuation
	Style.SetSeparateur.add(44);	// ,
	
	// Guillemets
	Style.SetSeparateur.add(171);Style.SetSeparateur.add(187);Style.SetSeparateur.add(8220);Style.SetSeparateur.add(8221);Style.SetSeparateur.add(8222);
	Style.SetSeparateur.add(8223);Style.SetSeparateur.add(750);
	Style.SetSeparateur.add(8216);Style.SetSeparateur.add(8217);Style.SetSeparateur.add(168);Style.SetSeparateur.add(34);Style.SetSeparateur.add(39);
},

// Add choice style block
AddChoiceStyle : function()
{
	var panelStyle = document.getElementById("StyleTexte");
	
	var divChoiceStyle = document.createElement("div");
	divChoiceStyle.className = "Transf-CadreGridSyn";
	divChoiceStyle.style.height = '30px';
	divChoiceStyle.style.zIndex = '5';
	divChoiceStyle.style.marginBottom = "10px";
	divChoiceStyle.style.marginLeft = "0px";
	//divChoiceStyle.style.verticalAlign = "top";
	
	/*var td = document.createElement("td");
	td.setAttribute("align", "left");
	td.style.verticalAlign = "top";*/
	
	// Choice
	var tableChoice = document.createElement("table");
	//tableChoice.style.verticalAlign = "top";
	
	//  Label style
	var tr = document.createElement("tr");
	tr.classList.add('Cor-LiOptions');
	tr.classList.add('Tabs__tab');
	tr.classList.add('Tab');
	var td0 = document.createElement("td");
	var divTextSyn = document.createElement("div");
	divTextSyn.className = "Transf-LabelAffSyn";
	//td0.style.verticalAlign = "top";
	//td0.style.paddingBottom = "10px";
	//td0.style.marginBottom = "10px";
	divTextSyn.innerHTML = "Style";
	td0.appendChild(divTextSyn);
	tr.appendChild(td0);
	//tableChoice.appendChild(td0);
	
	// Check box Syn
	var td1 = document.createElement("td");
	var checkBoxStyle = document.createElement("input");
	checkBoxStyle.setAttribute("type", "checkbox");
	checkBoxStyle.id = "style-checkbox";
	//checkBoxStyle.style.verticalAlign = "top";
	checkBoxStyle.checked = true;
	//checkBoxSyn.setAttribute("value", "on");
	//checkBoxSyn.style.zIndex = '5';
	//checkBoxStyle.style.paddingTop = "5px";
	
	checkBoxStyle.onclick = function(){
		StyleClickCheckboxfunction();
	}
	td0.onclick = function(){
		
		Style.StatView = false;
		
		if(checkBoxStyle.checked == false)
		{
			checkBoxStyle.checked = true;
			if(!this.parentNode.className.includes('active'))
			{
				StyleClickCheckboxfunction();
			}
		}
		else checkBoxStyle.checked = false;
	}
	
	var StyleClickCheckboxfunction = function()
	{
		var divDisplayStyle = document.getElementById("DivDisplayStyle");
		if(checkBoxStyle.checked == true)
		{
			checkBoxStyle.parentNode.parentNode.classList.add('active');
			// divDisplayStyle.style.display = "block";
			$('#DivDisplayStyle').addClass('open');
			document.getElementById('checkBoxSyn').parentNode.parentNode.classList.remove('active');
			document.getElementById('checkBoxStat').parentNode.parentNode.classList.remove('active');
			document.getElementById('checkBoxSyn').checked = false;
			document.getElementById('checkBoxStat').checked = false;
			$('#StyleTexte .Stat-StatTextePanel').hide().removeClass('open');
			$('#StyleTexte .Transf-CadreGridSyn').hide().removeClass('open');

			$('#DivDisplayStyle .scrollbar').removeAttr('data-simplebar');
				setTimeout(function(){
					$('#DivDisplayStyle .scrollbar').attr('data-simplebar', 'init');
			}, 100);
			
		}
		else
		{
			checkBoxStyle.parentNode.parentNode.classList.remove('active');
			$('#DivDisplayStyle').hide();
			// Scroll to Pos 0
			Util.ScrollToPos(0);
			
			// Empty the mark panel
			Style.DivMarques.innerHTML = "";
			
			// Désouligne.
			Util.DesouligneStyle();
			
			// Hide the popups
			Cor.PopupPanelSol.SetVisible(false, false, false, true);
			
			// Deselect the last row
			Style.DeselectRows(null);
			
			divDisplayStyle.style.display = "none";
			
			var radioNoShowing = document.getElementById("NoShowing_Style");
			radioNoShowing.checked = true;
		}
	};
	
	//document.getElementById("MainDiv").appendChild(checkBoxSyn);
	
	td1.appendChild(checkBoxStyle);
	tr.appendChild(td1);
	// tableChoice.appendChild(tr);

	var trBorder = document.createElement("tr");
	trBorder.classList.add('Tabs__presentation-slider');

	$("#ChoiceStatSyn table tr:first-child").before(tr);
	$("#ChoiceStatSyn table tr:last-child").after(trBorder);
	
	// divChoiceStyle.appendChild(tableChoice);
	// panelStyle.appendChild(divChoiceStyle);
},

// Add no remark block
AddNoRemarkBlock : function()
{
	var labelNoRemark = document.createElement("div");
	labelNoRemark.className = "Stat-AnalyseTitre";
	labelNoRemark.id = "LabelNoRemark";
	var label = "Aucune remarque";
	if(Cor.IdLangue == 'en') label = "No suggestion";
	setTimeout(function() {
		labelNoRemark.innerHTML = label;
	}, 5000);

	var panelStyle = document.getElementById("DivDisplayStyle");
	panelStyle.appendChild(labelNoRemark);
},

// Add repetition block
AddRepetitionBlock : function()
{
	var divRepetitions = document.createElement("div");
	divRepetitions.id = "DivRepetitions";
	divRepetitions.className = "Stat-PanelStat";
	divRepetitions.style.display = "none";
	
	// Title
	var divTitle = document.createElement("div");
	divTitle.className = "Stat-AnalyseTitre";
	divTitle.style.marginBottom = "10px";
	divTitle.style.marginTop = "5px";
	divTitle.style.fontWeight = "bold";
	divTitle.align = "center";
	var label = "R" + String.fromCharCode(233) + "p" + String.fromCharCode(233) + "titions";
	if(Cor.IdLangue == 'en') label = "Redundancies";
	divTitle.innerHTML = label;
	divRepetitions.appendChild(divTitle);
	
	// 1. Redundancies
	var label = "Redondances";
	if(Cor.IdLangue == 'en') label = "Redundancies";
	var rbRedundancies = new Util.PanelRb(label, "gStyle", "");
	rbRedundancies.Node.onclick = function()
	{
		rbRedundancies.Input.checked = true;
		Style.Show_Expressions("Redundancy");
	};
	
	Style.Map_PanelRb.set("RbRedundancy", rbRedundancies);
	
	divRepetitions.appendChild(rbRedundancies.Node);
	
	// 2. Normal repetitions
	var divWordRepetition = document.createElement("div");
	divWordRepetition.id = "DivWordRepetitions";
	divWordRepetition.style.marginBottom = "15px";
	
	var tableRep = document.createElement("table");
	tableRep.style.paddingBottom = "15px";

	// Explication
	var tdInfoBulle = document.createElement("td");
	var info = Style.TexteRep;
	if(Cor.IdLangue == 'en') info = Style.TexteRep_En;
	var infoBulle = new Util.InfoBulle(info);
	infoBulle.style.paddingRight = "5px";
	infoBulle.style.paddingBottom = "3px";
	infoBulle.style.cursor = "pointer";
	tdInfoBulle.appendChild(infoBulle);
	tableRep.appendChild(tdInfoBulle);
	
	var tdLabelRep = document.createElement("td");
	tdLabelRep.className = "Stat-AnalyseTitre";
	var label = "Mot R" + String.fromCharCode(233) + "p" + String.fromCharCode(233) + "t" + String.fromCharCode(233) + "s";
	if(Cor.IdLangue == 'en') label = "Words repetition";
	tdLabelRep.innerHTML = label;
	// tdLabelRep.style.cursor = "pointer";
	tableRep.appendChild(tdLabelRep);
	
	var tdNumber = document.createElement("td");
	tdNumber.className = "Stat-AnalyseTitre";
	tdNumber.style.paddingLeft = "3px";
	tdNumber.id = "NumberRep";
	tableRep.appendChild(tdNumber);
	
	divWordRepetition.appendChild(tableRep);
	
	divRepetitions.appendChild(divWordRepetition);
	
	// 3. Repetition inside a sentence.
	var divWordRepetition2 = document.createElement("div");
	divWordRepetition2.id = "DivWordRepetitions2";
	divWordRepetition2.style.marginBottom = "15px";
	
	var tableRep2 = document.createElement("table");
	tableRep2.style.paddingBottom = "15px";

	var tdInfoBulle2 = document.createElement("td");
	var info = Style.TexteRep2m;
	if(Cor.IdLangue == 'en') info = Style.TexteRep2m_En;
	var infoBulle2 = new Util.InfoBulle(info);
	infoBulle2.style.paddingRight = "5px";
	infoBulle2.style.paddingBottom = "3px";
	tdInfoBulle2.appendChild(infoBulle2);
	tableRep2.appendChild(tdInfoBulle2);
	
	var tdLabelRep2 = document.createElement("td");
	tdLabelRep2.className = "Stat-AnalyseTitre";
	var label = "Mot R" + String.fromCharCode(233) + "p" + String.fromCharCode(233) + "t" + String.fromCharCode(233) + "s dans une phrase";
	if(Cor.IdLangue == 'en') label = "Words repeated in a sentence.";
	tdLabelRep2.innerHTML = label;
	tableRep2.appendChild(tdLabelRep2);
	
	var tdNumber2 = document.createElement("td");
	tdNumber2.className = "Stat-AnalyseTitre";
	tdNumber2.style.paddingLeft = "3px";
	tableRep2.appendChild(tdNumber2);
	
	divWordRepetition2.appendChild(tableRep2);
	
	divRepetitions.appendChild(divWordRepetition2);
	
	var panelStyle = document.getElementById("DivDisplayStyle");
	panelStyle.appendChild(divRepetitions);
},

// Add rephrase block
AddRephraseBlock : function()
{
	var divRephrase = document.createElement("div");
	divRephrase.id = "DivRephrase";
	divRephrase.className = "Stat-PanelStat";
	divRephrase.style.display = "none";
	
	// Title
	var divTitle = document.createElement("div");
	divTitle.className = "Stat-AnalyseTitre";
	divTitle.style.marginBottom = "10px";
	divTitle.style.marginTop = "5px";
	divTitle.style.fontWeight = "bold";
	divTitle.align = "center";
	var label = "Reformulations";
	if(Cor.IdLangue == 'en') label = "Rephrases";
	divTitle.innerHTML = label;
	divRephrase.appendChild(divTitle);

	// Reformulations inélégance
	var label = "Tournures in" + String.fromCharCode(233) + "l" + String.fromCharCode(233) + "gantes";
	if(Cor.IdLangue == 'en') label = "Awkward sentences";
	var rbRephrase_InelegantForms = new Util.PanelRb(label, "gStyle", "");
	rbRephrase_InelegantForms.Node.onclick = function()
	{
		rbRephrase_InelegantForms.Input.checked = true;
		Style.Show_Expressions("Rephrase_inelegantforms");
	};
	Style.Map_PanelRb.set("RbRephrase_inelegantforms", rbRephrase_InelegantForms);
	divRephrase.appendChild(rbRephrase_InelegantForms.Node);
	
	// Reformulations reducing of words
	var label = "R" + String.fromCharCode(233) + "duction de mots";
	if(Cor.IdLangue == 'en') label = "Word reduction";
	var rbRephrase_ReducingWords = new Util.PanelRb(label, "gStyle", "");
	rbRephrase_ReducingWords.Node.onclick = function()
	{
		rbRephrase_ReducingWords.Input.checked = true;
		Style.Show_Expressions("Rephrase_wordreducing");
	};
	Style.Map_PanelRb.set("RbRephrase_wordreducing", rbRephrase_ReducingWords);
	divRephrase.appendChild(rbRephrase_ReducingWords.Node);
	
	var panelStyle = document.getElementById("DivDisplayStyle");
	panelStyle.appendChild(divRephrase);
},

// Add vocabulary enhancement block
AddVocabularyEnhancement : function()
{
	var divVocabularyEnhancement = document.createElement("div");
	divVocabularyEnhancement.id = "DivVocabularyEnhancement";
	divVocabularyEnhancement.className = "Stat-PanelStat";
	divVocabularyEnhancement.style.display = "none";
	
	// Title
	var divTitle = document.createElement("div");
	divTitle.className = "Stat-AnalyseTitre";
	divTitle.style.marginBottom = "10px";
	divTitle.style.marginTop = "5px";
	divTitle.style.fontWeight = "bold";
	divTitle.align = "center";
	var label = "Am" + String.fromCharCode(233) + "lioration de vocabulaire";
	if(Cor.IdLangue == 'en') label = "Vocabulary enhancement";
	divTitle.innerHTML = label;
	divVocabularyEnhancement.appendChild(divTitle);
	
	var label = "Mots";	// Temporary -> Professional & litteraire
	if(Cor.IdLangue == 'en') label = "Words and phrases";
	var rbVocabularyEnhancement = new Util.PanelRb(label, "gStyle", "");
	rbVocabularyEnhancement.Node.onclick = function()
	{
		rbVocabularyEnhancement.Input.checked = true;
		Style.Show_Expressions("Vocabulary_enhancement");
		
		// Set a tracker. Cancel for the moment.
		/*if(Cor.IdLangue == 'en')
		{
			Util.SendHttpRequest('Pr_Servlet',
						[['FunctionName', 'AddData'],
						 ['IdA', 'VocabularyEnhancement_En']],
						 null);
		}*/
	};
	Style.Map_PanelRb.set("RbVocabulary_enhancement", rbVocabularyEnhancement);
	divVocabularyEnhancement.appendChild(rbVocabularyEnhancement.Node);
	
	var panelStyle = document.getElementById("DivDisplayStyle");
	panelStyle.appendChild(divVocabularyEnhancement);
},

// Add Subjectivity block
AddSubjectivity : function()
{
	var divSubjectivity = document.createElement("div");
	divSubjectivity.id = "DivSubjectivity";
	divSubjectivity.className = "Stat-PanelStat";
	divSubjectivity.style.display = "none";
	
	// Title
	var divTitle = document.createElement("div");
	divTitle.className = "Stat-AnalyseTitre";
	divTitle.style.marginBottom = "10px";
	divTitle.style.marginTop = "5px";
	divTitle.style.fontWeight = "bold";
	divTitle.align = "center";
	var label = "Subjectivit" + String.fromCharCode(233);
	if(Cor.IdLangue == 'en') label = "Subjectivity";
	divTitle.innerHTML = label;
	divSubjectivity.appendChild(divTitle);
	
	var label = "Positif";
	var infoB = Style.TexteSubjectivity_Positive_Fr;
	if(Cor.IdLangue == 'en')
	{
		label = "Positive";
		infoB = Style.TexteSubjectivity_Positive_En;
	}
	var rbSubjectivity_Positive = new Util.PanelRb(label, "gStyle", infoB);
	rbSubjectivity_Positive.Node.onclick = function()
	{
		rbSubjectivity_Positive.Input.checked = true;
		Style.Show_Expressions("Subjectivity_Positive");
	};
	Style.Map_PanelRb.set("RbSubjectivity_Positive", rbSubjectivity_Positive);
	divSubjectivity.appendChild(rbSubjectivity_Positive.Node);
	
	label = "P" + String.fromCharCode(233) + "joratif";
	infoB = Style.TexteSubjectivity_Pejorative_Fr;
	if(Cor.IdLangue == 'en')
	{
		label = "Pejorative";
		infoB = Style.TexteSubjectivity_Pejorative_En;
	}
	var rbSubjectivity_Pejorative = new Util.PanelRb(label, "gStyle", infoB);
	rbSubjectivity_Pejorative.Node.onclick = function()
	{
		rbSubjectivity_Pejorative.Input.checked = true;
		Style.Show_Expressions("Subjectivity_Pejorative");
	};
	Style.Map_PanelRb.set("RbSubjectivity_Pejorative", rbSubjectivity_Pejorative);
	divSubjectivity.appendChild(rbSubjectivity_Pejorative.Node);
	
	var panelStyle = document.getElementById("DivDisplayStyle");
	panelStyle.appendChild(divSubjectivity);
},

// Add suggestion solutions block
AddSuggestionSolBlock : function()
{
	var divSuggestionSol = document.createElement("div");
	divSuggestionSol.id = "DivSuggestionSol";
	divSuggestionSol.className = "Stat-PanelStat";
	divSuggestionSol.style.display = "none";
	
	// Title
	var divTitle = document.createElement("div");
	divTitle.className = "Stat-AnalyseTitre";
	divTitle.style.marginBottom = "10px";
	divTitle.style.marginTop = "5px";
	divTitle.style.fontWeight = "bold";
	divTitle.align = "center";
	var label = "Suggestion de solutions";
	if(Cor.IdLangue == 'en') label = "Solution Suggestions";
	divTitle.innerHTML = label;
	divSuggestionSol.appendChild(divTitle);

	// Expressions
	
	if(Cor.IdLangue == 'fr')
	{
		// Verbes courants
		var label = "Verbes courants";
		var rbVerbeCourant = new Util.PanelRb(label, "gStyle", "");
		rbVerbeCourant.Node.onclick = function()
		{
			rbVerbeCourant.Input.checked = true;
			Style.Show_Expressions("VerbesCourants");
		};
	
		Style.Map_PanelRb.set("RbVerbeCourant", rbVerbeCourant);
		divSuggestionSol.appendChild(rbVerbeCourant.Node);
		
		// Expressions familières
		var label = "Expressions famili" + String.fromCharCode(232) + "res";
		var rbExpFamilieres = new Util.PanelRb(label, "gStyle", "");
		rbExpFamilieres.Node.onclick = function()
		{
			rbExpFamilieres.Input.checked = true;
			Style.Show_Expressions("ExpFamilieres");
		};
		Style.Map_PanelRb.set("RbExpFamilieres", rbExpFamilieres);
		divSuggestionSol.appendChild(rbExpFamilieres.Node);
		
		// Phonétique
		var label = "Phon" + String.fromCharCode(232) + "tique";
		var rbPhonetique = new Util.PanelRb(label, "gStyle", "");
		rbPhonetique.Node.onclick = function()
		{
			rbPhonetique.Input.checked = true;
			Style.Show_Expressions("ReformulationSonorite");
		};
		Style.Map_PanelRb.set("RbPhonetique", rbPhonetique);
		divSuggestionSol.appendChild(rbPhonetique.Node);
	}
	
	var panelStyle = document.getElementById("DivDisplayStyle");
	panelStyle.appendChild(divSuggestionSol);
},

// Add sentence block
AddSentenceBlock : function()
{
	var divSentences = document.createElement("div");
	divSentences.id = "DivSentences";
	divSentences.className = "Stat-PanelStat";
	divSentences.style.display = "none";
	
	// Title
	var divTitle = document.createElement("div");
	divTitle.className = "Stat-AnalyseTitre";
	divTitle.style.marginBottom = "10px";
	divTitle.style.marginTop = "5px";
	divTitle.style.fontWeight = "bold";
	divTitle.align = "center";
	var label = "Phrases";
	if(Cor.IdLangue == 'en') label = "Sentences";
	divTitle.innerHTML = label;
	divSentences.appendChild(divTitle);
	
	// Long sentence
	var label = "Phrases longues";
	var info = Style.TextePhLongues;
	if(Cor.IdLangue == "en")
	{
		label = "Run-on sentences";
		info = Style.TextePhLongues_En;
	}
	var rbLgSentence = new Util.PanelRb(label, "gStyle", info);
	rbLgSentence.Node.onclick = function()
	{
		rbLgSentence.Input.checked = true;
		Style.ShowSentences("pl", false);
	};
	Style.Map_PanelRb.set("RbLongSentence", rbLgSentence);
	divSentences.appendChild(rbLgSentence.Node);

	// Sentence with two many commas
	var label = "Phrase " + String.fromCharCode(224) + " virgules nombreuses";
	var info = Style.TexteNbVirg;
	if(Cor.IdLangue == "en")
	{
		label = "Comma overuse";
		info = Style.TexteNbVirg_En;
	}
	var rbPhComma = new Util.PanelRb(label, "gStyle", info);
	rbPhComma.Node.onclick = function()
	{
		rbPhComma.Input.checked = true;
		Style.ShowSentences("pv", false);
	};
	Style.Map_PanelRb.set("RbCommaSentence", rbPhComma);
	divSentences.appendChild(rbPhComma.Node);
	
	// Sentence with two many parenthesis
	var label = "Phrase " + String.fromCharCode(224) + " parenth" + String.fromCharCode(232) + "ses nombreuses";
	var info = Style.TexteNbPar;
	if(Cor.IdLangue == "en")
	{
		label = "Parenthesis overuse";
		info = Style.TexteNbPar_En;
	}
	var rbPhParenthesis = new Util.PanelRb(label, "gStyle", info);
	rbPhParenthesis.Node.onclick = function()
	{
		rbPhParenthesis.Input.checked = true;
		Style.ShowSentences("pp", false);
	};
	Style.Map_PanelRb.set("RbParenthesisSentence", rbPhParenthesis);
	divSentences.appendChild(rbPhParenthesis.Node);

	var panelStyle = document.getElementById("DivDisplayStyle");
	panelStyle.appendChild(divSentences);
},

// Add register block
AddRegisterBlock : function()
{
	var divRegistre = document.createElement("div");
	divRegistre.id = "DivRegister";
	divRegistre.className = "Stat-PanelStat";
	divRegistre.style.paddingBottom = "15px";
	divRegistre.style.display = "none";
	
	// Title
	var divTitle = document.createElement("div");
	divTitle.className = "Stat-AnalyseTitre";
	divTitle.style.marginBottom = "10px";
	divTitle.style.marginTop = "5px";
	divTitle.style.fontWeight = "bold";
	divTitle.align = "center";
	var label = "Registres";
	if(Cor.IdLangue == 'en') label = "Language registers";
	divTitle.innerHTML = label;
	divRegistre.appendChild(divTitle);
	
	// 1. Cliches
	var label = "Clich" + String.fromCharCode(233) + "s";
	if(Cor.IdLangue == 'en') label = "Cliches";
	var rbCliches = new Util.PanelRb(label, "gStyle", Style.TexteCliches_En);
	rbCliches.Node.onclick = function()
	{
		rbCliches.Input.checked = true;
		Style.Show_Expressions("Cliche");
	};
	
	Style.Map_PanelRb.set("RbCliche", rbCliches);
	
	divRegistre.appendChild(rbCliches.Node);
	
	var panelStyle = document.getElementById("DivDisplayStyle");
	panelStyle.appendChild(divRegistre);
},

// Add no showing block
AddNoShowingBlock : function()
{
	var divNoShowing = document.createElement("div");
	divNoShowing.id = "DivNoShowing";
	divNoShowing.style.display = "none";
	divNoShowing.style.cursor = "pointer";
	divNoShowing.className = "Stat-PanelStat";
	
	var table = document.createElement("table");
	table.style.marginTop = "10px";
	table.style.marginBottom = "10px";
	
	var tdLabel = document.createElement("td");
	tdLabel.className = "Stat-AnalyseTitre";
	//tdLabel.style.marginBottom = "100px";
	var label = "Aucun affichage";
	if(Cor.IdLangue == 'en') label = "Deactivate display";
	tdLabel.innerHTML = label;
	table.appendChild(tdLabel);
	
	var tdRadioBox = document.createElement("td");
	var radioBox = document.createElement("input");
	radioBox.setAttribute("type", "radio");
	radioBox.setAttribute("name", "gStyle");
	radioBox.setAttribute("value", "on");
	radioBox.style.marginLeft = "35px";
	radioBox.style.cursor = "pointer";
	radioBox.id = "NoShowing_Style";
	
	// pour créer un label pour un bouton
	var tdLabelRadioBox = document.createElement("label");
	tdLabelRadioBox.setAttribute("for", "NoShowing_Style");

	// Desurligne toutes les �lements surlign�s en jaune.
	divNoShowing.onclick = function()
	{
		// Check the radioBox
		radioBox.checked = true;
	
		// Scroll to Pos 0
		Util.ScrollToPos(0);
		
		// Empty the mark panel
		if(Style.DivMarques != null) Style.DivMarques.innerHTML = "";
	
		// D�souligne les mots.
		Util.DesouligneStyle();
		
		// Hide popups.
		Cor.PopupPanelSol.SetVisible(false, false, false, true);
		
		// Deselect the last row
		Style.DeselectRows(null);
	};
	
	//radioBox.style.paddingTop = "5px";
	//radioBox.style.marginTop = "100px";
	tdRadioBox.appendChild(radioBox);
	table.appendChild(tdRadioBox);
	tdRadioBox.appendChild(tdLabelRadioBox); // rajoute le radiobouton
	
	divNoShowing.appendChild(table);
	
	var panelStyle = document.getElementById("DivDisplayStyle");
	panelStyle.appendChild(divNoShowing);
},

// Deselect the last row
DeselectRows : function(row)
{
	// Registers
	if(Style.RowSelectedPrec != null && Style.RowSelectedPrec != row)
	{
		Style.RowSelectedPrec.childNodes[0].setAttribute("class", "Stat-CellStyle");
		Style.RowSelectedPrec.childNodes[1].setAttribute("class", "Stat-CellStyleNb");
	}
},

// Unselect all radioButtons
UnselectAllRadioButtons : function()
{
	Style.Map_PanelRb.forEach(function(panelRb)
	{
		panelRb.Input.checked = false;
	});

},

// Init vector of possible registers.
Init_VectPossibleRegisters : function()
{
	if(Cor.IdLangue == 'fr')
	{
		Style.Vect_PossibleRegisters.push("familier");
		Style.Vect_PossibleRegisters.push("vulgaire");
		Style.Vect_PossibleRegisters.push("argot");
		Style.Vect_PossibleRegisters.push("insulte");
		Style.Vect_PossibleRegisters.push("pejoratif");
		Style.Vect_PossibleRegisters.push("populaire");
		Style.Vect_PossibleRegisters.push("desuet");
		Style.Vect_PossibleRegisters.push("rare");
		Style.Vect_PossibleRegisters.push("vieilli");
		Style.Vect_PossibleRegisters.push("anglicisme");
	}
	else if(Cor.IdLangue == 'en')
	{
		Style.Vect_PossibleRegisters.push("slang");
		Style.Vect_PossibleRegisters.push("vulgar");
		Style.Vect_PossibleRegisters.push("informal");
		Style.Vect_PossibleRegisters.push("familiar");
		Style.Vect_PossibleRegisters.push("nonstandard");
		Style.Vect_PossibleRegisters.push("offensive");
		Style.Vect_PossibleRegisters.push("disapproving");
		Style.Vect_PossibleRegisters.push("proscribed");
		Style.Vect_PossibleRegisters.push("archaic");
		Style.Vect_PossibleRegisters.push("obsolete");
		Style.Vect_PossibleRegisters.push("old-fashioned");
		Style.Vect_PossibleRegisters.push("rare");
		Style.Vect_PossibleRegisters.push("dated");
		Style.Vect_PossibleRegisters.push("eye dialect");
		Style.Vect_PossibleRegisters.push("dialectal");
		Style.Vect_PossibleRegisters.push("historical");
		Style.Vect_PossibleRegisters.push("colloquial");
		Style.Vect_PossibleRegisters.push("formal");
		Style.Vect_PossibleRegisters.push("humorous");
		Style.Vect_PossibleRegisters.push("hyponym");
		Style.Vect_PossibleRegisters.push("euphemism");
		Style.Vect_PossibleRegisters.push("neologism");
	}

},

OnSuccessStyle : function(styleText)
{
	if(styleText != null)
	{
		// Supprime les anciens id plus utilisés. Optimisation pour la rapidité et la mémoire.
		Util.SuppAncienCorId_Style();
	
		// Fill for the first time the StyleText
		if(Style.StyleText == null) Style.StyleText = styleText;
		else Style.CompleteStyleText(styleText);
		
		// Fill the informations about the style
		Style.FillStyle(styleText);
	}
},

// Complete the style text
CompleteStyleText : function(styleText)
{
	// Synonyms
	for (var id in styleText.Map_Synonyms)
	{
		if(Style.StyleText.Map_Synonyms[id] == null) Style.StyleText.Map_Synonyms[id] = styleText.Map_Synonyms[id];
	}
	
	// Expressions
	for (var id in styleText.Map_ExpressionSol)
	{
		if(Style.StyleText.Map_ExpressionSol[id] == null) Style.StyleText.Map_ExpressionSol[id] = styleText.Map_ExpressionSol[id];
	}
	
	// Sentences
	for (var id in styleText.Map_Sentences)
	{
		if(Style.StyleText.Map_Sentences[id] == null) Style.StyleText.Map_Sentences[id] = styleText.Map_Sentences[id];
	}
	
	// Map of informations of sousgroupe
	for (var motIdRep in styleText.Map_InfSousGroupe)
	{
		var vectInfRepetition = styleText.Map_InfSousGroupe[motIdRep];
		
		var vectInfRepetitionExistant = Style.StyleText.Map_InfSousGroupe[motIdRep];
		if(vectInfRepetitionExistant == null)
		{
			Style.StyleText.Map_InfSousGroupe[motIdRep] = styleText.Map_InfSousGroupe[motIdRep];
		}
		else
		{
			for(var i = 0; i < vectInfRepetition.length; i++)
			{
				vectInfRepetitionExistant.push(vectInfRepetition[i]);
			}
		}
	}
	
	// Map of informations of sousgroup
	for (var motIdRep in styleText.Map_InfSousGroupe2mPh)
	{
		var vectInfRepetition = styleText.Map_InfSousGroupe2mPh[motIdRep];
		
		var vectInfRepetitionExistant = Style.StyleText.Map_InfSousGroupe2mPh[motIdRep];
		if(vectInfRepetitionExistant == null)
		{
			Style.StyleText.Map_InfSousGroupe2mPh[motIdRep] = styleText.Map_InfSousGroupe2mPh[motIdRep];
		}
		else
		{
			for(var i = 0; i < vectInfRepetition.length; i++)
			{
				vectInfRepetitionExistant.push(vectInfRepetition[i]);
			}
		}
	}
	
	// Repetitions
	for(var i = 0; i < styleText.Vect_Repetitions.length; i++)
	{
		var repetition = styleText.Vect_Repetitions[i];
		
		// if exist, set to 0.
		var exist = false;
		for(var u = 0; u < Style.StyleText.Vect_Repetitions.length; u++)
		{
			var repetitionU = Style.StyleText.Vect_Repetitions[u];
			if(repetitionU.Left == repetition.Left)
			{
				repetitionU.Right = 0;		// Le nombre n'a pas d'importance car la map va �tre recr��e.
				exist = true;
				break;
			}
		}
		
		// If not exist, add it.
		if(exist == false)
		{
			repetition.Right = 0;		// Le nombre n'a pas d'importance car la map va �tre recr��e.
			Style.StyleText.Vect_Repetitions.push(repetition);
		}
	}
	
	// Repetitions 2mPh
	for(var i = 0; i < styleText.Vect_Repetitions2mPh.length; i++)
	{
		var repetition = styleText.Vect_Repetitions2mPh[i];
		
		// if exist, set to 0.
		var exist = false;
		for(var u = 0; u < Style.StyleText.Vect_Repetitions2mPh.length; u++)
		{
			var repetitionU = Style.StyleText.Vect_Repetitions2mPh[u];
			if(repetitionU.Left == repetition.Left)
			{
				repetitionU.Right = 0;		// Le nombre n'a pas d'importance car la map va �tre recr��e.
				exist = true;
				break;
			}
		}
		
		// If not exist, add it.
		if(exist == false)
		{
			repetition.Right = 0;		// Le nombre n'a pas d'importance car la map va �tre recr��e.
			Style.StyleText.Vect_Repetitions2mPh.push(repetition);
		}
	}
	
	// Id max of the sous group of repetition.
	Style.StyleText.IdMaxSousGroupeRep = styleText.IdMaxSousGroupeRep;
	
},

// Retourne l'ensemble des id de r�p�titions sous forme de chaine
GetIdRepetitions : function(est2mPh)
{
	var ch = "";
	if(Style.StyleText != null)
	{
		if(est2mPh == false)
		{
			for(var i = 0; i < Style.StyleText.Vect_Repetitions.length; i++)
			{
				if(ch.length > 0) ch += ";";	// s�parateur
				ch += Style.StyleText.Vect_Repetitions[i].Left;
			}
		}
		else
		{
			for(var i = 0; i < Style.StyleText.Vect_Repetitions2mPh.length; i++)
			{
				if(ch.length > 0) ch += ";";	// s�parateur
				ch += Style.StyleText.Vect_Repetitions2mPh[i].Left;
			}
		}
	}
	return ch;
},

// Fill the informations about the style
FillStyle : function(styleText)
{
	if(Cor.IsMobile == true) return;

	Style.AffPanNonAffichage = false;

	// Unselet all radiobuttons
	Style.UnselectAllRadioButtons();
	Stat.UnselectAllRadioButtons();
	
	// Desurligne toutes les �lements surlign�s en jaune.
	Util.DesouligneStyle();
	
	// Set no label to syn.
	if(Style.PanelSynI != null) Style.PanelSynI.SetVisible_LabelNoSyn(true);
					
	// Fill map of synonyms
	Style.FillMapSyn(styleText);
	
	// Fill repetition table
	Style.FillRepetitions();
	
	// Fill rephrases
	Style.FillRephrases();
	
	// Fill Vocabulary enhancement
	Style.FillVocabularyEnhancement();
	
	// Fill Subjectivity
	Style.FillSubjectivity();
	
	// Fill suggestion solutions
	Style.FillSuggestionSol();
	
	// Fill special sentences
	Style.FillSentences();
	
	// Fill register
	Style.FillRegisters();
	
	// Show or hide the panel of non showing
	Style.ShowNonAffPanel();
},

// Synonymes : remplit la map de synonymes. Cl� : mot. Valeur ensemble de synId.
FillMapSyn : function(styleText)
{
	if(styleText.VectOtherResults.length > 0)
	{
		var tabIdSynSt = styleText.VectOtherResults[0].split(":");
		for(var i = 0; i < tabIdSynSt.length; i++)
		{
			var idSynSt = tabIdSynSt[i];
			var tabSt = idSynSt.split(";");
			
			var synSt = tabSt[0];
			var idPhrase = tabSt[2];
			
			var idsyn = new Util.IdSyn(tabSt[1], synSt, parseInt(tabSt[3]));
			
			var vectIdsyn = Style.MapIdSyn.get(idPhrase);
			if(vectIdsyn == null)
			{
				vectIdsyn = [];
				vectIdsyn.push(idsyn);
				Style.MapIdSyn.set(idPhrase, vectIdsyn);
			}
			else
			{
				vectIdsyn.push(idsyn);
			}
		}
	}
},

// Fill repetitions table
FillRepetitions : function()
{
	// Redundancies
	var nbRedundancies = 0;
	for(var idSt in Style.StyleText.Map_ExpressionSol)
	{
		var ensSolutionExp = Style.StyleText.Map_ExpressionSol[idSt];
		if(ensSolutionExp != null && (ensSolutionExp.Type == "Redundancy")) nbRedundancies++;
	};
	
	var rbRedundancy = Style.Map_PanelRb.get("RbRedundancy");
	if(nbRedundancies > 0)
	{
		rbRedundancy.Node.style.display = "block";
		rbRedundancy.SetNb(nbRedundancies);
	}
	else rbRedundancy.Node.style.display = "none";
	
	// Simple r�p�titions
	var divRepetitions = document.getElementById("DivWordRepetitions");
	if(Style.StyleText.Vect_Repetitions.length > 0)
	{
		// 1. Les id des mots relev�s d�finissent le nombre de r�p�titions.
		// On recr�� la map des r�p�titions � partir des Id relev�s
		// R�initialise la map des r�p�titions
		for(var i = 0; i < Style.StyleText.Vect_Repetitions.length; i++)
		{
			Style.StyleText.Vect_Repetitions[i].Right = 0;
		}
		
		var setRep = new Set();		// Set des r�p�titions existantes
		//Cor.SetId.forEach(function(id)
		for(var id in Style.StyleText.Map_InfSousGroupe)
		{
			var vectInfRepetition = Style.StyleText.Map_InfSousGroupe[id];	// For each word
			if(vectInfRepetition != null)
			{
				var setIdRep = new Set();
				for(var u = 0; u < vectInfRepetition.length; u++)	// For each sousgoupe of the word.
				{
					var infRepetition = vectInfRepetition[u];
					setIdRep.add(infRepetition.IdRepetition);
				}
				
				setIdRep.forEach(function(idRep)
				{
					for(var v = 0; v < Style.StyleText.Vect_Repetitions.length; v++)
					{
						var repetition = Style.StyleText.Vect_Repetitions[v];
						if(repetition.Left == idRep)
						{
							repetition.Right = repetition.Right + 1;
							setRep.add(idRep);
							break;
						}
					}
				});
			}
		}
		
		// 2. Supprime les r�p�titions d�su�tes de la map
		var setRepSupp = new Set();
		for(var v = 0; v < Style.StyleText.Vect_Repetitions.length; v++)
		{
			var repetition = Style.StyleText.Vect_Repetitions[v];
			if(!setRep.has(repetition.Left)) setRepSupp.add(repetition.Left);
		}
		setRepSupp.forEach(function(idRepSupp)
		{
			var indSupp = -1;
			for(var v = 0; v < Style.StyleText.Vect_Repetitions.length; v++)
			{
				var repetition = Style.StyleText.Vect_Repetitions[v];
				if(repetition.Left == idRepSupp)
				{
					indSupp = v;
					break;
				}
			}
			
			if(indSupp > -1) Style.StyleText.Vect_Repetitions.splice(indSupp, 1);
			//if(indSupp > -1) delete Style.StyleText.Vect_Repetitions[indSupp];
		});
		
		// 4. Nombre de r�p�titions
		var nbRep = Style.StyleText.Vect_Repetitions.length;
		
		if(nbRep > 0)
		{
			// Sort repetitions by values
			Style.StyleText.Vect_Repetitions.sort(function(repetitionA, repetitionB)
			{
				if(repetitionA.Right < repetitionB.Right) return 1;
				else if(repetitionA.Right > repetitionB.Right) return -1;
				
				return 0;
			});
		
			var labelNbRep = document.getElementById("NumberRep");
			labelNbRep.innerHTMl = "(" + nbRep + ")";
		
			divRepetitions.style.display = "block";
			
			// Cr�� la grille
			Style.TableRep = new Util.TableType(nbRep, 0);
			
			var cnt = 0;
			for(var v = 0; v < Style.StyleText.Vect_Repetitions.length; v++)
			{
				var repetition = Style.StyleText.Vect_Repetitions[v];
			
				Style.TableRep.SetText(repetition.Left, cnt, 0);
				Style.TableRep.SetText(repetition.Right, cnt, 1);
				
				// Style.TableRep.Node.childNodes[0].childNodes[cnt].onclick = function()
				Style.TableRep.Node.childNodes[cnt].onclick = function()
				{
					// Selecte the new row
					this.childNodes[0].setAttribute("class", "Stat-CellStyleSelect");
					this.childNodes[1].setAttribute("class", "Stat-CellStyleSelectNb");
					
					// Deselect rows.
					Style.DeselectRows(this);
					
					Style.RowSelectedPrec = this;
				
					// Unselect all radioButtons
					Style.UnselectAllRadioButtons();
					Stat.UnselectAllRadioButtons();
					
					// Desurligne toutes les �lements surlign�s en jaune.
					Util.DesouligneStyle();
					
					// Hide also popups
					Cor.PopupPanelSol.SetVisible(false, false, false, true);
		
					var wordRep = this.childNodes[0].innerHTML;
					
					// Underline the matching repetitions
					var setId = new Set();		// For not undelrine the same element.
					for(var id in Style.StyleText.Map_InfSousGroupe)	// Key : a word
					{
						var vectInfSousGroupe = Style.StyleText.Map_InfSousGroupe[id];
						
						//var rep = false;
						for(var u = 0; u < vectInfSousGroupe.length; u++)
						{
							var infSousGroupe = vectInfSousGroupe[u];
							var idRep = infSousGroupe.IdRepetition;
							if(idRep == wordRep)
							{
								setId.add(id);
							}
						}
					}
					
					// Surlignes
					Util.SurligneElts_Style(setId);
					
					var rbNoShowing = document.getElementById("NoShowing_Style");
					rbNoShowing.checked = false;
					
					// Show marques.
					Style.ShowMarques();
				}
				
				cnt++;
			}
			
			if(divRepetitions.childNodes.length > 1) divRepetitions.removeChild(divRepetitions.childNodes[1]);
			
			// If length > 5, put in a div with scrollbar.
			if(nbRep > 5)
			{
				var divTableRep = document.createElement("div");
				// divTableRep.style.overflow = "auto";
				// divTableRep.style.position = "relative";
				// divTableRep.style.height = "200px";
				divTableRep.setAttribute("id", "scrollbar");
				divTableRep.setAttribute("class", "scrollbar");
				divTableRep.setAttribute('data-simplebar', '');
				divTableRep.appendChild(Style.TableRep.Node);
		
				divRepetitions.appendChild(divTableRep);
			}
			else
			{
				divRepetitions.appendChild(Style.TableRep.Node);
			}
		}
		else divRepetitions.style.display = "none";
	}
	else divRepetitions.style.display = "none";
	
	// R�p�titions in one sentence
	var divRepetitions2 = document.getElementById("DivWordRepetitions2");
	if(Style.StyleText.Vect_Repetitions2mPh.length > 0)
	{
		// 1. Les id des mots relev�s d�finissent le nombre de r�p�titions.
		// On recr�� la map des r�p�titions � partir des Id relev�s
		// R�initialise la map des r�p�titions
		for(var i = 0; i < Style.StyleText.Vect_Repetitions2mPh.length; i++)
		{
			Style.StyleText.Vect_Repetitions2mPh[i].Right = 0;
		}
		
		var setRep = new Set();		// Set des r�p�titions existantes
		
		//Cor.SetId.forEach(function(id)
		for(var id in Style.StyleText.Map_InfSousGroupe2mPh)
		{
			var vectInfRepetition2mPh = Style.StyleText.Map_InfSousGroupe2mPh[id];
			if(vectInfRepetition2mPh != null)
			{
				var setIdRep = new Set();
				for(var u = 0; u < vectInfRepetition2mPh.length; u++)
				{
					var infRepetition2mPh = vectInfRepetition2mPh[u];
					setIdRep.add(infRepetition2mPh.IdRepetition);
				}
				
				setIdRep.forEach(function(idRep)
				{
					for(var v = 0; v < Style.StyleText.Vect_Repetitions2mPh.length; v++)
					{
						var repetition = Style.StyleText.Vect_Repetitions2mPh[v];
						if(repetition.Left == idRep)
						{
							repetition.Right = repetition.Right + 1;
							setRep.add(idRep);
							break;
						}
					}
				});
			}
		}
		
		// 2. Supprime les r�p�titions d�su�tes de la map
		var setRepSupp = new Set();
		for(var v = 0; v < Style.StyleText.Vect_Repetitions2mPh.length; v++)
		{
			var repetition = Style.StyleText.Vect_Repetitions2mPh[v];
			if(!setRep.has(repetition.Left)) setRepSupp.add(repetition.Left);
		}
		setRepSupp.forEach(function(idRepSupp)
		{
			var indSupp = -1;
			for(var v = 0; v < Style.StyleText.Vect_Repetitions2mPh.length; v++)
			{
				var repetition = Style.StyleText.Vect_Repetitions2mPh[v];
				if(repetition.Left == idRepSupp)
				{
					indSupp = v;
					break;
				}
			}
			
			if(indSupp > -1) Style.StyleText.Vect_Repetitions2mPh.splice(indSupp, 1);
			//if(indSupp > -1) delete Style.StyleText.Vect_Repetitions2mPh[indSupp];
		});
		
		// 4. Nombre de r�p�titions
		var nbRep = Style.StyleText.Vect_Repetitions2mPh.length;
		
		if(nbRep > 0)
		{
			// Sort repetitions by values
			Style.StyleText.Vect_Repetitions2mPh.sort(function(repetitionA, repetitionB)
			{
				if(repetitionA.Right < repetitionB.Right) return 1;
				else if(repetitionA.Right > repetitionB.Right) return -1;
				
				return 0;
			});
		
			var labelNbRep = document.getElementById("NumberRep");
			labelNbRep.innerHTMl = "(" + nbRep + ")";
		
			divRepetitions2.style.display = "block";
			
			// Cr�� la grille
			Style.TableRep2mPh = new Util.TableType(nbRep, 0);
			
			var cnt = 0;
			for(var v = 0; v < Style.StyleText.Vect_Repetitions2mPh.length; v++)
			{
				var repetition = Style.StyleText.Vect_Repetitions2mPh[v];
			
				Style.TableRep2mPh.SetText(repetition.Left, cnt, 0);
				Style.TableRep2mPh.SetText(repetition.Right, cnt, 1);
				
				Style.TableRep2mPh.Node.childNodes[cnt].onclick = function()
				{
					// Selecte the new row
					this.childNodes[0].setAttribute("class", "Stat-CellStyleSelect");
					this.childNodes[1].setAttribute("class", "Stat-CellStyleSelectNb");
					
					// Deselect rows
					Style.DeselectRows(this);
					
					Style.RowSelectedPrec = this;
				
					// Unselect all radioButtons
					Style.UnselectAllRadioButtons();
					Stat.UnselectAllRadioButtons();
					
					// Desurligne toutes les �lements surlign�s en jaune.
					Util.DesouligneStyle();
					
					// Hide also popups
					Cor.PopupPanelSol.SetVisible(false, false, false, true);
		
					var wordRep = this.childNodes[0].innerHTML;
					
					// Underline the matching repetitions
					var setId = new Set();		// For not undelrine the same element.
					
					for(var id in Style.StyleText.Map_InfSousGroupe2mPh)	// Key : a word
					{
						var vectInfSousGroupe = Style.StyleText.Map_InfSousGroupe2mPh[id];
						
						//var rep = false;
						for(var u = 0; u < vectInfSousGroupe.length; u++)
						{
							var infSousGroupe = vectInfSousGroupe[u];
							var idRep = infSousGroupe.IdRepetition;
							if(idRep == wordRep)
							{
								setId.add(id);
							}
						}
					}
					
					// Surlignes
					Util.SurligneElts_Style(setId);
					
					var rbNoShowing = document.getElementById("NoShowing_Style");
					rbNoShowing.checked = false;
					
					// Show marques.
					Style.ShowMarques();
				}
				
				cnt++;
			}
			
			if(divRepetitions2.childNodes.length > 1) divRepetitions2.removeChild(divRepetitions2.childNodes[1]);
			
			// If length > 5, put in a div with scrollbar.
			if(nbRep > 5)
			{
				var divTableRep = document.createElement("div");
				divTableRep.style.overflow = "auto";
				divTableRep.Id = "scrollbar";
				divTableRep.style.position = "relative";
				divTableRep.style.height = "200px";
				divTableRep.setAttribute("class", "scrollbar");
				divTableRep.appendChild(Style.TableRep2mPh.Node);
		
				divRepetitions2.appendChild(divTableRep);
			}
			else
			{
				divRepetitions2.appendChild(Style.TableRep2mPh.Node);
			}
		}
		else divRepetitions2.style.display = "none";
	}
	else divRepetitions2.style.display = "none";
	
	// Show or hide panel
	var divRepetitions = document.getElementById("DivRepetitions");
	
	if((nbRedundancies > 0) ||
	   (Style.StyleText.Vect_Repetitions.length > 0) ||
	   (Style.StyleText.Vect_Repetitions2mPh.length > 0))
	{
		divRepetitions.style.display = "block";
		Style.AffPanNonAffichage = true;
	}
	else divRepetitions.style.display = "none";
	
},

// Fill rephrases
FillRephrases : function()
{
	// Inelegant rephrase
	var nbRephrase_inelegantforms = 0;
	for(var idSt in Style.StyleText.Map_ExpressionSol)
	{
		var ensSolutionExp = Style.StyleText.Map_ExpressionSol[idSt];
		if(ensSolutionExp != null && (ensSolutionExp.Type == "Rephrase_inelegantforms")) nbRephrase_inelegantforms++;
	};
	
	var rbRephrase_inelegantforms = Style.Map_PanelRb.get("RbRephrase_inelegantforms");
	if(nbRephrase_inelegantforms > 0)
	{
		rbRephrase_inelegantforms.Node.style.display = "block";
		rbRephrase_inelegantforms.SetNb(nbRephrase_inelegantforms);
	}
	else rbRephrase_inelegantforms.Node.style.display = "none";
	
	// Reducing word rephrase
	var nbRephrase_wordreducing = 0;
	for(var idSt in Style.StyleText.Map_ExpressionSol)
	{
		var ensSolutionExp = Style.StyleText.Map_ExpressionSol[idSt];
		if(ensSolutionExp != null && (ensSolutionExp.Type == "Rephrase_wordreducing")) nbRephrase_wordreducing++;
	};
	
	var rbRephrase_wordreducing = Style.Map_PanelRb.get("RbRephrase_wordreducing");
	if(nbRephrase_wordreducing > 0)
	{
		rbRephrase_wordreducing.Node.style.display = "block";
		rbRephrase_wordreducing.SetNb(nbRephrase_wordreducing);
	}
	else rbRephrase_wordreducing.Node.style.display = "none";
	
	// Show or hide the panel
	var divRephrase = document.getElementById("DivRephrase");
	
	if((nbRephrase_inelegantforms > 0) ||
	   (nbRephrase_wordreducing > 0))
	{
		divRephrase.style.display =  "block";
		Style.AffPanNonAffichage = true;
	}
	else divRephrase.style.display =  "none";
},

// Fill Vocabulary enhancement
FillVocabularyEnhancement : function()
{
	var nbVocabularyEnhancement = 0;
	for(var idSt in Style.StyleText.Map_ExpressionSol)
	{
		var ensSolutionExp = Style.StyleText.Map_ExpressionSol[idSt];
		if(ensSolutionExp != null && (ensSolutionExp.Type == "Vocabulary_enhancement")) nbVocabularyEnhancement++;
	};
	
	var rbVocabulary_Enhancement = Style.Map_PanelRb.get("RbVocabulary_enhancement");
	if(nbVocabularyEnhancement > 0)
	{
		rbVocabulary_Enhancement.Node.style.display = "block";
		rbVocabulary_Enhancement.SetNb(nbVocabularyEnhancement);
	}
	else rbVocabulary_Enhancement.Node.style.display = "none";
	
	// Show or hide the panel
	var divVocabularyEnhancement = document.getElementById("DivVocabularyEnhancement");
	
	if(nbVocabularyEnhancement > 0)
	{
		divVocabularyEnhancement.style.display =  "block";
		Style.AffPanNonAffichage = true;
	}
	else divVocabularyEnhancement.style.display =  "none";
},

// Fill Subjectivity
FillSubjectivity : function()
{
	var nbSubjectivity_Positive = 0;
	var nbSubjectivity_Pejorative = 0;
	for(var idSt in Style.StyleText.Map_ExpressionSol)
	{
		var ensSolutionExp = Style.StyleText.Map_ExpressionSol[idSt];
		if(ensSolutionExp != null && (ensSolutionExp.Type == "Subjectivity_Positive")) nbSubjectivity_Positive++;
		if(ensSolutionExp != null && (ensSolutionExp.Type == "Subjectivity_Pejorative")) nbSubjectivity_Pejorative++;
	};
	
	var rbSubjectivity_Positive = Style.Map_PanelRb.get("RbSubjectivity_Positive");
	if(nbSubjectivity_Positive > 0)
	{
		rbSubjectivity_Positive.Node.style.display = "block";
		rbSubjectivity_Positive.SetNb(nbSubjectivity_Positive);
	}
	else rbSubjectivity_Positive.Node.style.display = "none";
	
	var rbSubjectivity_Pejorative = Style.Map_PanelRb.get("RbSubjectivity_Pejorative");
	if(nbSubjectivity_Pejorative > 0)
	{
		rbSubjectivity_Pejorative.Node.style.display = "block";
		rbSubjectivity_Pejorative.SetNb(nbSubjectivity_Pejorative);
	}
	else rbSubjectivity_Pejorative.Node.style.display = "none";
	
	// Show or hide the panel
	var divSubjectivity = document.getElementById("DivSubjectivity");
	
	if(nbSubjectivity_Positive > 0 ||
	   nbSubjectivity_Pejorative > 0)
	{
		divSubjectivity.style.display =  "block";
		Style.AffPanNonAffichage = true;
	}
	else divSubjectivity.style.display =  "none";
},

// Fill suggestion solutions
FillSuggestionSol : function()
{
	if(Cor.IdLangue == "fr")
	{
		// RbVerbeCourant
		var nbVerbeCourant = 0;
		for(var idSt in Style.StyleText.Map_ExpressionSol)
		{
			var ensSolutionExp = Style.StyleText.Map_ExpressionSol[idSt];
			if(ensSolutionExp != null && (ensSolutionExp.Type == "VerbesCourants")) nbVerbeCourant++;
		};
		var rbVerbeCourant = Style.Map_PanelRb.get("RbVerbeCourant");
		if(nbVerbeCourant > 0)
		{
			rbVerbeCourant.Node.style.display = "block";
			rbVerbeCourant.SetNb(nbVerbeCourant);
		}
		else rbVerbeCourant.Node.style.display = "none";
		
		// Expressions famili�res
		var nbExpFamilieres = 0;
		for(var idSt in Style.StyleText.Map_ExpressionSol)
		{
			var ensSolutionExp = Style.StyleText.Map_ExpressionSol[idSt];
			if(ensSolutionExp != null && (ensSolutionExp.Type == "ExpFamilieres")) nbExpFamilieres++;
		};
		
		var rbExpFamilieres = Style.Map_PanelRb.get("RbExpFamilieres");
		if(nbExpFamilieres > 0)
		{
			rbExpFamilieres.Node.style.display = "block";
			rbExpFamilieres.SetNb(nbExpFamilieres);
		}
		else rbExpFamilieres.Node.style.display = "none";
		
		// Phon�tique
		var nbPhonetique = 0;
		for(var idSt in Style.StyleText.Map_ExpressionSol)
		{
			var ensSolutionExp = Style.StyleText.Map_ExpressionSol[idSt];
			if(ensSolutionExp != null)
			{
				if((ensSolutionExp.VectOtherResults.length == 1) &&
				   (ensSolutionExp.VectOtherResults[0] == "ReformulationSonorite"))
				{
					nbPhonetique++;
				}
			}
		};
		
		var rbPhonetique = Style.Map_PanelRb.get("RbPhonetique");
		if(nbPhonetique > 0)
		{
			rbPhonetique.Node.style.display = "block";
			rbPhonetique.SetNb(nbPhonetique);
		}
		else rbPhonetique.Node.style.display = "none";
		
		var divSuggestionSol = document.getElementById("DivSuggestionSol");
		
		// Show or hide the panel
		if((nbVerbeCourant > 0) ||
		   (nbExpFamilieres > 0) ||
		   (rbPhonetique > 0))
		{
			divSuggestionSol.style.display =  "block";
			Style.AffPanNonAffichage = true;
		}
		else divSuggestionSol.style.display =  "none";
	}
},

// Fill special sentences
FillSentences : function()
{
	var nbLongSentences = 0;
	var nbCommaSentences = 0;
	var nbParenthesisSentences = 0;
	
	for(var idSt in Style.StyleText.Map_Sentences)
	{
		var set = Style.StyleText.Map_Sentences[idSt];
		if(set != null)
		{
			if(set.indexOf("pl") >= 0) nbLongSentences++;
			if(set.indexOf("pv") >= 0) nbCommaSentences++;
			if(set.indexOf("pp") >= 0) nbParenthesisSentences++;
		}
	}
	
	var rbLongSentence = Style.Map_PanelRb.get("RbLongSentence");
	if(nbLongSentences > 0)
	{
		rbLongSentence.Node.style.display = "block";
		rbLongSentence.SetNb(nbLongSentences);
		affPanNonAffichage = true;
	}
	else rbLongSentence.Node.style.display = "none";
	
	var rbCommaSentence = Style.Map_PanelRb.get("RbCommaSentence");
	if(nbCommaSentences > 0)
	{
		rbCommaSentence.Node.style.display = "block";
		rbCommaSentence.SetNb(nbCommaSentences);
		affPanNonAffichage = true;
	}
	else rbCommaSentence.Node.style.display = "none";
	
	var rbParenthesisSentence = Style.Map_PanelRb.get("RbParenthesisSentence");
	if(nbParenthesisSentences > 0)
	{
		rbParenthesisSentence.Node.style.display = "block";
		rbParenthesisSentence.SetNb(nbParenthesisSentences);
		affPanNonAffichage = true;
	}
	else rbParenthesisSentence.Node.style.display = "none";
	
	var divSentences = document.getElementById("DivSentences");
	if(nbLongSentences > 0 ||
	   nbCommaSentences > 0  ||
	   nbParenthesisSentences > 0)
	{
		divSentences.style.display = "block";
		Style.AffPanNonAffichage = true;
	}
	else divSentences.style.display = "none";
	
},

// Fill register
FillRegisters : function()
{
	// 1. Cliches
	var nbCliches = 0;
	for(var idSt in Style.StyleText.Map_ExpressionSol)
	{
		var ensSolutionExp = Style.StyleText.Map_ExpressionSol[idSt];
		if(ensSolutionExp != null && (ensSolutionExp.Type == "Cliche")) nbCliches++;
	};
	
	var rbCliche = Style.Map_PanelRb.get("RbCliche");
	if(nbCliches > 0)
	{
		rbCliche.Node.style.display = "block";
		rbCliche.SetNb(nbCliches);
	}
	else rbCliche.Node.style.display = "none";
	
	// 2. Registers
	
	// Map nbReg
	var mapReg = new Map();
	
	// Fill mapReg
	for(var id in Style.StyleText.Map_ExpressionSol)
	{
		var ensSolutionExp = Style.StyleText.Map_ExpressionSol[id];
	
		if(ensSolutionExp.Type.indexOf('Register_') == 0)
		{
			var register = ensSolutionExp.Type.substring(9, ensSolutionExp.Type.length);
			
			if(!mapReg.has(register)) mapReg.set(register, 1);
			else mapReg.set(register, mapReg.get(register) + 1);
		}
	}
	
	// Create the grid
	
	// Calculate the row number
	var divRegister = document.getElementById("DivRegister");
		
	var nbRows = mapReg.size;
	if(nbRows > 0)
	{
		Style.TableReg = new Util.TableType(nbRows, 0);
		Style.TableReg.Node.id = "TableReg";
		//Style.TableReg.Node.align = "center";		// A faire ?
		
		// Fill the grid
		var cnt = 0;
		mapReg.forEach(function(value, key)
		{
			Style.TableReg.SetText(key, cnt, 0);
			Style.TableReg.SetText(value, cnt, 1);
			
			// Style.TableReg.Node.childNodes[0].childNodes[cnt].onclick = function()
			Style.TableReg.Node.childNodes[cnt].onclick = function()
			{
				// Selecte the new row
				this.childNodes[0].setAttribute("class", "Stat-CellStyleSelect");
				this.childNodes[1].setAttribute("class", "Stat-CellStyleSelectNb");
				
				// Deselect the last row
				Style.DeselectRows(this);
				
				Style.RowSelectedPrec = this;
			
				// Unselect all radioButtons
				Style.UnselectAllRadioButtons();
				Stat.UnselectAllRadioButtons();
			
				var register = this.childNodes[0].innerHTML;

				// Desurligne toutes les �lements surlign�s en jaune.
				Util.DesouligneStyle();
				
				// Hide also popups
				Cor.PopupPanelSol.SetVisible(false, false, false, true);
	
				// Underline ensSolutionExp
				Style.Show_Expressions('Register' + '_' + register);
				
				var rbNoShowing = document.getElementById("NoShowing_Style");
				rbNoShowing.checked = false;
				
				// Show marques.
				Style.ShowMarques();
			}
			
			cnt++;
		});
		
		if(divRegister.childNodes.length > 2) divRegister.removeChild(divRegister.childNodes[2]);
		
		divRegister.appendChild(Style.TableReg.Node);
	}
	
	if(nbRows > 0 ||
	   nbCliches > 0)
	{
		divRegister.style.display = "block";
		
		Style.AffPanNonAffichage = true;
	}
	else divRegister.style.display = "none";
},

// Show or hide the panel of non showing
ShowNonAffPanel : function()
{
	var divNoShowing = document.getElementById("DivNoShowing");
	
	if(Style.AffPanNonAffichage == true)
	{
		divNoShowing.style.display = "block";
		LabelNoRemark.style.display = "none";
	}
	else
	{
		divNoShowing.style.display = "none";
		LabelNoRemark.style.display = "block";
	}
},

// Show the expressions
Show_Expressions : function(typeExp)
{
	// Deselect the last row
	if(typeExp.indexOf('Register') != 0) Style.DeselectRows(null);

	// Desurligne toutes les �lements surlign�s en jaune.
	Util.DesouligneStyle();
	
	// Hide also popups
	Cor.PopupPanelSol.SetVisible(false, false, false, true);
	
	// Surligne les expressions.
	var setId = new Set();
	for(var id in Style.StyleText.Map_ExpressionSol)
	{
		var ensSolutionExp = Style.StyleText.Map_ExpressionSol[id];
		if(ensSolutionExp != null && (ensSolutionExp.Type == typeExp))
		{
			setId.add(id);
		}
	}
	
	// Surlignes
	Util.SurligneElts_Style(setId);
	
	// Affiche les marques sur la droite
	Style.ShowMarques();
},

// Show the sentences
ShowSentences : function(sentenceType, stat)
{
	// Deselect the last row
	Style.DeselectRows(null);

	// Desurligne toutes les �lements surlign�s en jaune.
	Util.DesouligneStyle();
	
	// Hide also popups
	Cor.PopupPanelSol.SetVisible(false, false, false, true);
	
	var doc = TextEditor.Document;
	
	// Surligne les expressions.
	if(stat == false)
	{
		for(var idPh in Style.StyleText.Map_Sentences)
		{
			var setTypes = Style.StyleText.Map_Sentences[idPh];
			if(setTypes != null)
			{
				if(setTypes.indexOf(sentenceType) >= 0)
				{
					var nodeSentence = doc.getElementById(idPh);
					
					var color = "s-ja";
					
					// Possible solutions -> underline in blue.
					var ensSolutionExp = null;
					for(var id in Style.StyleText.Map_ExpressionSol)
					{
						if(id.indexOf(idPh) == 0)
						{
							var ensSolutionExpId = Style.StyleText.Map_ExpressionSol[id];
							if(ensSolutionExpId.Good_Suggestion == true)
							{
								color = "u-bl";
								break;
							}
						}
					}
					
					nodeSentence.className = " " + color;
				}
			}
		}
	}
	// Stat
	else
	{
		for(var idPh in Stat.StatText.Map_Sentences)
		{
			var setTypes = Stat.StatText.Map_Sentences[idPh];
			if(setTypes != null)
			{
				if(setTypes.indexOf(sentenceType) >= 0)
				{
					var nodeSentence = doc.getElementById(idPh);
					
					nodeSentence.className = " s-ja";
				}
			}
		}
	}
	
	// Affiche les marques sur la droite
	Style.ShowMarques();
},

// Update style
UpdateStyle : function(chId)
{
	var setSupp_SousGroupeRep = new Set();
	var setSupp_SousGroupeRep2mPh = new Set();
	
	// Update id in map and panel
	var tabId = chId.split("-");
	
	for(var u = 0; u < tabId.length; u++) 
	{
		var id = tabId[u];
		
		// Expressions sol
		if(Style.StyleText != null)
		{
			var expressionSol = Style.StyleText.Map_ExpressionSol[id];
			if(expressionSol != null)
			{
				if(expressionSol.Type == "Redundancy")
				{
					var rbRedundancies = Style.Map_PanelRb.get("RbRedundancy");
					rbRedundancies.SetNb(rbRedundancies.Counter - 1);
				}
				if(expressionSol.Type == "Rephrase_inelegantforms")
				{
					var rbRephrase = Style.Map_PanelRb.get("RbRephrase_inelegantforms");
					rbRephrase.SetNb(rbRephrase.Counter - 1);
				}
				if(expressionSol.Type == "Rephrase_wordreducing")
				{
					var rbRephrase = Style.Map_PanelRb.get("RbRephrase_wordreducing");
					rbRephrase.SetNb(rbRephrase.Counter - 1);
				}
				if(expressionSol.Type == "Vocabulary_enhancement")
				{
					var rbVocabularyEnhancement = Style.Map_PanelRb.get("RbVocabulary_enhancement");
					rbVocabularyEnhancement.SetNb(rbVocabularyEnhancement.Counter - 1);
				}
				if(expressionSol.Type == "Subjectivity_Positive")
				{
					var rbSubjectivity_Positive = Style.Map_PanelRb.get("RbSubjectivity_Positive");
					rbSubjectivity_Positive.SetNb(rbSubjectivity_Positive.Counter - 1);
				}
				if(expressionSol.Type == "Subjectivity_Pejorative")
				{
					var rbSubjectivity_Pejorative = Style.Map_PanelRb.get("RbSubjectivity_Pejorative");
					rbSubjectivity_Pejorative.SetNb(rbSubjectivity_Pejorative.Counter - 1);
				}
				if(expressionSol.Type == "VerbesCourants")
				{
					var rbVerbeCourant = Style.Map_PanelRb.get("RbVerbeCourant");
					rbVerbeCourant.SetNb(rbVerbeCourant.Counter - 1);
				}
				if(expressionSol.Type == "ExpFamilieres")
				{
					var rbExpFamilieres = Style.Map_PanelRb.get("RbExpFamilieres");
					rbExpFamilieres.SetNb(rbExpFamilieres.Counter - 1);
				}
				if(expressionSol.Type == "Cliche")
				{
					var rbCliches = Style.Map_PanelRb.get("RbCliche");
					rbCliches.SetNb(rbCliches.Counter - 1);
				}
				if(expressionSol.Type == "ReformulationSonorite")
				{
					var rbPhonetique = Style.Map_PanelRb.get("RbPhonetique");
					rbPhonetique.SetNb(rbPhonetique.Counter - 1);
				}
				if(expressionSol.Type.indexOf("Register") == 0)
				{
					Style.Update_Registers(expressionSol);
				}
				
				delete Style.StyleText.Map_ExpressionSol[id];
			}
			
			// Sentences
			var setTypes = Style.StyleText.Map_Sentences[id];
			
			if(setTypes != null)
			{
				if(setTypes.indexOf("pl") >= 0)
				{
					var rbSentencePl = Style.Map_PanelRb.get("RbLongSentence");
					rbSentencePl.Decrease();
				}
				if(setTypes.indexOf("pv") >= 0)
				{
					var rbSentencePv = Style.Map_PanelRb.get("RbCommaSentence");
					rbSentencePv.Decrease();
				}
				if(setTypes.indexOf("pp") >= 0)
				{
					var rbSentencePp = Style.Map_PanelRb.get("RbParenthesisSentence");
					rbSentencePp.Decrease();
				}
				
				delete Style.StyleText.Map_Sentences[id];
			}
		}
		
		// Sentences stat.
		if(Stat.StatText != null)
		{
			var setTypes = Stat.StatText.Map_Sentences[id];
			
			if(setTypes != null)
			{
				/*if(setTypes.indexOf("pl") >= 0)
				{
					var rbSentencePl = Stat.Map_PanelRb.get("RbPhrasesLongues_Stat");
					rbSentencePl.Decrease();
				}
				if(setTypes.indexOf("pc") >= 0)
				{
					var rbSentencePc = Stat.Map_PanelRb.get("RbPhrasesCourtes_Stat");
					rbSentencePc.Decrease();
				}
				if(setTypes.indexOf("pi") >= 0)
				{
					var rbSentencePi = Stat.Map_PanelRb.get("RbPhrasesInt_Stat");
					rbSentencePi.Decrease();
				}*/
				
				delete Stat.StatText.Map_Sentences[id];
			}
		}
		
		// Repetitions. Note sous groupes that we must remove.
		if(Style.StyleText != null)
		{
			var vectInfRepetitions = Style.StyleText.Map_InfSousGroupe[id];
			if(vectInfRepetitions != null)
			{
				for(var v = 0; v < vectInfRepetitions.length; v++)
				{
					var infRepetitions = vectInfRepetitions[v];
					setSupp_SousGroupeRep.add(infRepetitions.IdSousGroupe);
				}
			}
			
			vectInfRepetitions = Style.StyleText.Map_InfSousGroupe2mPh[id];
			if(vectInfRepetitions != null)
			{
				for(var v = 0; v < vectInfRepetitions.length; v++)
				{
					var infRepetitions = vectInfRepetitions[v];
					setSupp_SousGroupeRep2mPh.add(infRepetitions.IdSousGroupe);
				}
			}
		}
		
		// Remove marques in the panel of Marques.
		Style.UpdatePanelMarques(id);
	}
	
	// Update repetitions
	if(Style.StyleText != null)
	{
		Style.UpdateRep(setSupp_SousGroupeRep, setSupp_SousGroupeRep2mPh);
	}
},

// Update style with sentence
/*UpdateStyle_BySentence : function(nodePhrase)
{
	var idPh = nodePhrase.getAttribute("id");
	
	// Remove underlined s-ja
	nodePhrase.removeAttribute("class");
	
	var tabExpressionSol_Supp = [];
	var tabExpressionSolId_Supp = [];
	
	// Expression of soluton suggestion
	if(Style.StyleText != null)
	{
		for(var id in Style.StyleText.Map_ExpressionSol)
		{
			var expressionSol = Style.StyleText.Map_ExpressionSol[id];
			
			if(expressionSol.IdPhrase == idPh)
			{
				tabExpressionSol_Supp.push(expressionSol);
				tabExpressionSolId_Supp.push(id);
			}
		}
		// Expression of map register
		for(var id in Style.StyleText.Map_WordsReg)
		{
			var expressionSol = Style.StyleText.Map_WordsReg[id];
			
			if(expressionSol.IdPhrase == idPh)
			{
				tabExpressionSol_Supp.push(expressionSol);
				tabExpressionSolId_Supp.push(id);
			}
		}

		for(var i = 0; i < tabExpressionSol_Supp.length; i++)
		{
			var expressionSol = tabExpressionSol_Supp[i];
			
			if(expressionSol.Type == "Pleonasm")
			{
				var rbPleonasm = Style.Map_PanelRb.get("RbPleonasm");
				rbPleonasm.Decrease();
			}
			if(expressionSol.Type == "Rephrase")
			{
				var rbRephrase = Style.Map_PanelRb.get("RbRephrase");
				rbRephrase.Decrease();
			}
			if(expressionSol.Type == "VerbesCourants")
			{
				var rbPleonasm = Style.Map_PanelRb.get("RbVerbeCourant");
				rbPleonasm.Decrease();
			}
			if(expressionSol.Type == "ExpFamilieres")
			{
				var rbPleonasm = Style.Map_PanelRb.get("RbExpFamilieres");
				rbPleonasm.Decrease();
			}
			if(expressionSol.Type == "ReformulationSonorite")
			{
				var rbPleonasm = Style.Map_PanelRb.get("RbPhonetique");
				rbPleonasm.Decrease();
			}
			if(expressionSol.Set_Registers.length > 0)
			{
				expressionSol.Set_Registers.forEach(function(register)
				{
					for(var v = 0; v < Style.TableReg.Node.childNodes.length; v++)
					{
						var row = Style.TableReg.Node.childNodes[v];
					
						if(row.childNodes[0].innerHTML == register)
						{
							var number = parseInt(row.childNodes[1].innerHTML);
							
							row.childNodes[1].innerHTML = number - 1;
						}
					
					}
				});
			}
		}
		
		for(var i = 0; i < tabExpressionSolId_Supp.length; i++)
		{
			delete Style.StyleText.Map_WordsReg[tabExpressionSolId_Supp[i]];
		}
		
		for(var i = 0; i < tabExpressionSolId_Supp.length; i++)
		{
			delete Style.StyleText.Map_ExpressionSol[tabExpressionSolId_Supp[i]];
		}
	
		// Sentences
		var setTypes = Style.StyleText.Map_Sentences[idPh];
		
		if(setTypes != null)
		{
			if(setTypes.indexOf("pl") >= 0)
			{
				var rbSentencePl = Style.Map_PanelRb.get("RbLongSentence");
				rbSentencePl.Decrease();
			}
			if(setTypes.indexOf("pv") >= 0)
			{
				var rbSentencePv = Style.Map_PanelRb.get("RbCommaSentence");
				rbSentencePv.Decrease();
			}
			
			delete Style.StyleText.Map_Sentences[idPh];
		}
	}
	
	// Sentences stat.
	if(Style.StatText != null)
	{
		var setTypes = Stat.StatText.Map_Sentences[idPh];
		
		if(setTypes != null)
		{
			if(setTypes.indexOf("pl") >= 0)
			{
				var rbSentencePl = Stat.Map_PanelRb.get("RbPhrasesLongues_Stat");
				rbSentencePl.Decrease();
			}
			if(setTypes.indexOf("pc") >= 0)
			{
				var rbSentencePc = Stat.Map_PanelRb.get("RbPhrasesCourtes_Stat");
				rbSentencePc.Decrease();
			}
			if(setTypes.indexOf("pi") >= 0)
			{
				var rbSentencePi = Stat.Map_PanelRb.get("RbPhrasesInt_Stat");
				rbSentencePi.Decrease();
			}
			
			delete Stat.StatText.Map_Sentences[idPh];
		}
	}
	
	// Repetitions
	if(Style.StyleText != null)
	{
		// Get the sous groups to delete
		var setSupp_SousGroupeRep = new Set();
		
		for(var idWord in Style.StyleText.Map_InfSousGroupe)
		{
			var belongToSg = false;
			var vectInfRepetitions = Style.StyleText.Map_InfSousGroupe[idWord];
			if(vectInfRepetitions != null)
			{
				for(var v = 0; v < vectInfRepetitions.length; v++)
				{
					var infRepetitions = vectInfRepetitions[v];
					if(infRepetitions.IdPhrase == idPh)
					{
						setSupp_SousGroupeRep.add(infRepetitions.IdSousGroupe);
					}
				}
			}
		}
		
		var setSupp_SousGroupeRep2mPh = new Set();
		
		for(var idWord in Style.StyleText.Map_InfSousGroupe2mPh)
		{
			var belongToSg = false;
			var vectInfRepetitions = Style.StyleText.Map_InfSousGroupe2mPh[idWord];
			if(vectInfRepetitions != null)
			{
				for(var v = 0; v < vectInfRepetitions.length; v++)
				{
					var infRepetitions = vectInfRepetitions[v];
					if(infRepetitions.IdPhrase == idPh)
					{
						setSupp_SousGroupeRep2mPh.add(infRepetitions.IdSousGroupe);
					}
				}
			}
		}
	
	
		Style.UpdateRep(setSupp_SousGroupeRep, setSupp_SousGroupeRep2mPh);
	}
},*/

// Update repetitions
// Get id of words of the sentence. Get their sous groupe. Delete all these sous groupes in the map. Update Tab Rep
UpdateRep : function(setSupp_SousGroupeRep, setSupp_SousGroupeRep2mPh)
{
	// Normal

	// 1. Remove the sousgroups in Map_InfSousGroupe
	for(var idWord in Style.StyleText.Map_InfSousGroupe)
	{
		var vectInfRepetitions = Style.StyleText.Map_InfSousGroupe[idWord];
		if(vectInfRepetitions != null)
		{
			var vectInfRepetitions_Supp = [];
			for(var v = 0; v < vectInfRepetitions.length; v++)
			{
				var infRepetitions = vectInfRepetitions[v];
				if(setSupp_SousGroupeRep.has(infRepetitions.IdSousGroupe))
				{
					vectInfRepetitions_Supp.push(infRepetitions);
				}
			}
			
			for(var v = 0; v < vectInfRepetitions_Supp.length; v++)
			{
				var infRepetitions_Supp = vectInfRepetitions_Supp[v];
				var index = vectInfRepetitions.indexOf(infRepetitions_Supp);
				vectInfRepetitions.splice(index, 1);
			}
		}
	}
	
	// 2. Update IHM of repetitions
	// Reach the array of rep
	var tabIdWord_Supp = new Set();
	
	if(Style.TableRep != null)
	{
		for(var i = 0; i < Style.TableRep.Node.childNodes.length; i++)
		{
			var nodeRow = Style.TableRep.Node.childNodes[i];
			
			var wordSt = nodeRow.childNodes[0].innerHTML;

			// Calculate the new number of repetitions of the word.
			// If a word belongs to a sousgroup, then increase of one.
			var nbRep = 0;
			for(var idWord in Style.StyleText.Map_InfSousGroupe)
			{
				var belongToSg = false;
				var vectInfRepetitions = Style.StyleText.Map_InfSousGroupe[idWord];
				if(vectInfRepetitions != null)
				{
					for(var v = 0; v < vectInfRepetitions.length; v++)
					{
						var infRepetitions = vectInfRepetitions[v];
						if(infRepetitions.IdRepetition == wordSt)
						{
							belongToSg = true;
							break;
						}
					}
					
					if(vectInfRepetitions.length == 0) tabIdWord_Supp.add(idWord);
				}
				
				if(belongToSg) nbRep++;
			}
			
			nodeRow.childNodes[1].innerHTML = nbRep;
			
			// If no more repetitions, then hide the row.
			if(nbRep <= 0)
			{
				//nodeRow.style.display = "none";
				nodeRow.hidden = true;
			}
		}
		
		// If no more rows in the table, then hide the table.
		var cntRowShown = 0;
		for(var i = 0; i < Style.TableRep.Node.childNodes.length; i++)
		{
			var nodeRow = Style.TableRep.Node.childNodes[i];
			//if(nodeRow.style.display == "block")
			if(nodeRow.hidden == false)
			{
				cntRowShown++;
			}
		}
		
		if(cntRowShown == 0)
		{
			document.getElementById("DivWordRepetitions").style.display = "none";
			
			// If panelRb of Redundancy is not displayed, then hide all the repetitions block.
			var panelRbShown = false;
			var divRepetitions = document.getElementById("DivRepetitions");
			for(var i = 0; i < divRepetitions.childNodes.length; i++)
			{
				var childNodes = divRepetitions.childNodes[i];
				if(childNodes instanceof Util.PanelRb)
				{
					if(childNodes.style.display == "block")
					{
						panelRbShown = true;
					}
				}
			}
			
			if(panelRbShown == false)
			{
				divRepetitions.style.display = "none";
				
				// If no more panel in style panel, then hide it and show "no remarks".
				var divDisplayStyle = document.getElementById("DivDisplayStyle");
				var cntDivShown = 0;
				var divNoShowingShown = false;
				for(var i = 0; i < divDisplayStyle.childNodes.length; i++)
				{
					var divStyle = divDisplayStyle.childNodes[i];
					if(divStyle.style.display == "block")
					{
						cntDivShown++;
						if(divStyle.id == "DivNoShowing") divNoShowingShown = true;
					}
				}
				
				if(cntDivShown == 1 && divNoShowingShown)
				{
					document.getElementById("DivNoShowing").style.display = "none";
					document.getElementById("LabelNoRemark").style.display = "block";
				}
			}
		}
	}
	
	// 3. Remove underline on words which has no sous groupe.
	var doc = TextEditor.Document;
	var eltsU = [];

	var eltsJa = doc.getElementsByClassName("s-ja");
	for(var i = 0; i < eltsJa.length; i++) eltsU.push(eltsJa[i]);
	var eltsUbl = doc.getElementsByClassName("u-bl");
	for(var i = 0; i < eltsUbl.length; i++) eltsU.push(eltsUbl[i]);
	
	var tab_EltsU = [];
	
	for(var i = 0; i < eltsU.length; i++)
	{
		var eltU = eltsU[i];
		var id = eltU.getAttribute("id");
		var tabId = id.split("-");
		
		tabIdWord_Supp.forEach(function(idWord)
		{
			if(tabId.indexOf(idWord) >= 0) tab_EltsU.push(eltU);
		});
	}
	
	for(var i = 0; i < tab_EltsU.length; i++) tab_EltsU[i].removeAttribute("class");
	
	// 2mPh

	// 1. Remove the sousgroups in Map_InfSousGroupe
	for(var idWord in Style.StyleText.Map_InfSousGroupe2mPh)
	{
		var vectInfRepetitions = Style.StyleText.Map_InfSousGroupe2mPh[idWord];
		if(vectInfRepetitions != null)
		{
			var vectInfRepetitions_Supp = [];
			for(var v = 0; v < vectInfRepetitions.length; v++)
			{
				var infRepetitions = vectInfRepetitions[v];
				if(setSupp_SousGroupeRep2mPh.has(infRepetitions.IdSousGroupe))
				{
					vectInfRepetitions_Supp.push(infRepetitions);
				}
			}
			
			for(var v = 0; v < vectInfRepetitions_Supp.length; v++)
			{
				var infRepetitions_Supp = vectInfRepetitions_Supp[v];
				var index = vectInfRepetitions.indexOf(infRepetitions_Supp);
				vectInfRepetitions.splice(index, 1);
			}
		}
	}
	
	// 2. Update IHM of repetitions
	// Reach the array of rep
	var tabIdWord_Supp = new Set();
	
	if(Style.TableRep2mPh != null)
	{
		for(var i = 0; i < Style.TableRep2mPh.Node.childNodes.length; i++)
		{
			var nodeRow = Style.TableRep2mPh.Node.childNodes[i];
			
			var wordSt = nodeRow.childNodes[0].innerHTML;

			// Calculate the new number of repetitions of the word.
			// If a word belongs to a sousgroup, then increase of one.
			var nbRep = 0;
			for(var idWord in Style.StyleText.Map_InfSousGroupe2mPh)
			{
				var belongToSg = false;
				var vectInfRepetitions = Style.StyleText.Map_InfSousGroupe2mPh[idWord];
				if(vectInfRepetitions != null)
				{
					for(var v = 0; v < vectInfRepetitions.length; v++)
					{
						var infRepetitions = vectInfRepetitions[v];
						if(infRepetitions.IdRepetition == wordSt)
						{
							belongToSg = true;
							break;
						}
					}
					
					if(vectInfRepetitions.length == 0) tabIdWord_Supp.add(idWord);
				}
				
				if(belongToSg) nbRep++;
			}
			
			nodeRow.childNodes[1].innerHTML = nbRep;
		}
	}
	
	// 3. Remove underline on words which has no sous groupe.
	var doc = TextEditor.Document;
	var eltsU = [];

	var eltsJa = doc.getElementsByClassName("s-ja");
	for(var i = 0; i < eltsJa.length; i++) eltsU.push(eltsJa[i]);
	var eltsUbl = doc.getElementsByClassName("u-bl");
	for(var i = 0; i < eltsUbl.length; i++) eltsU.push(eltsUbl[i]);
	
	var tab_EltsU = [];
	
	for(var i = 0; i < eltsU.length; i++)
	{
		var eltU = eltsU[i];
		var id = eltU.getAttribute("id");
		var tabId = id.split("-");
		
		tabIdWord_Supp.forEach(function(idWord)
		{
			if(tabId.indexOf(idWord) >= 0) tab_EltsU.push(eltU);
		});
	}
	
	for(var i = 0; i < tab_EltsU.length; i++) tab_EltsU[i].removeAttribute("class");
	
},

// Update registers
Update_Registers : function(expressionSol)
{
	var registerTypeSt = expressionSol.Type.substring(9, expressionSol.Type.length);
	
	for(var v = 0; v < Style.TableReg.Node.childNodes.length; v++)
	{
		var row = Style.TableReg.Node.childNodes[v];
	
		if(row.childNodes[0].innerHTML == registerTypeSt)
		{
			var number = parseInt(row.childNodes[1].innerHTML);
			
			row.childNodes[1].innerHTML = number - 1;
			
			if((number - 1) <= 0)
			{
				row.hidden = true;
			}
			
		}
	}
	
	// If no more rows in the table, then hide the table.
	var cntRowShown = 0;
	for(var i = 0; i < Style.TableReg.Node.childNodes.length; i++)
	{
		var nodeRow = Style.TableReg.Node.childNodes[i];
		//if(nodeRow.style.display == "block")
		if(nodeRow.hidden == false)
		{
			cntRowShown++;
		}
	}
	
	if(cntRowShown == 0)
	{
		document.getElementById("TableReg").style.display = "none";
		
		// If no panelRb is not displayed, then hide all the register block.
		var panelRbShown = false;
		var divRegister = document.getElementById("DivRegister");
		for(var i = 0; i < divRegister.childNodes.length; i++)
		{
			var childNodes = divRegister.childNodes[i];
			if(childNodes instanceof Util.PanelRb)
			{
				if(childNodes.style.display == "block")
				{
					panelRbShown = true;
				}
			}
		}
		
		if(panelRbShown == false)
		{
			divRegister.style.display = "none";
			
			// If no more panel in style panel, then hide it and show "no remarks".
			var divDisplayStyle = document.getElementById("DivDisplayStyle");
			var cntDivShown = 0;
			var divNoShowingShown = false;
			for(var i = 0; i < divDisplayStyle.childNodes.length; i++)
			{
				var divStyle = divDisplayStyle.childNodes[i];
				if(divStyle.style.display == "block")
				{
					cntDivShown++;
					if(divStyle.id == "DivNoShowing") divNoShowingShown = true;
				}
			}
			
			if(cntDivShown == 1 && divNoShowingShown)
			{
				document.getElementById("DivNoShowing").style.display = "none";
				document.getElementById("LabelNoRemark").style.display = "block";
			}
		}
	}
},

// Affiche les marques sur la droite
ShowMarques : function(tabId)
{
	Style.EltTopPos = 1000000;

	// Clear marques.
	Style.DivMarques.innerHTML = "";
	
	// 1. Connaitre le dernier offset
	var doc = TextEditor.Document;
	
	var maxTopOffSet = doc.body.offsetHeight;
	
	// 2. Pour chaque �l�ment, dessiner sa marque
	var eltsU = [];

	var eltsJa = doc.getElementsByClassName("s-ja");
	for(var i = 0; i < eltsJa.length; i++) eltsU.push(eltsJa[i]);
	var eltsUbl = doc.getElementsByClassName("u-bl");
	for(var i = 0; i < eltsUbl.length; i++) eltsU.push(eltsUbl[i]);

	for(var i = 0; i < eltsU.length; i++)
	{
		var eltU = eltsU[i];
	
		// Get element offset
		var offSetTop = 0;	
		offSetTop = eltU.offsetTop;
		
		if(offSetTop < Style.EltTopPos)
		{
			Style.EltTopPos = offSetTop;
		}
		
		var posY = ((offSetTop/maxTopOffSet)*(1008));
	
		var indP = TextEditor.GetIndP(eltU.id);
		
		var marque = new Style.Marque(posY, offSetTop, indP, eltU.id);
		Style.DivMarques.appendChild(marque.DivMarque);
	}
	
	// Scroll to pos top
	Util.ScrollToPos(Style.EltTopPos)
},

// Remove marques in the panel of Marques.
UpdatePanelMarques : function(idU)
{
	var tabSuppMarques = [];
	
	if(Style.DivMarques != null)
	{
		for(var i = 0; i < Style.DivMarques.childNodes.length; i++)
		{
			var marque = Style.DivMarques.childNodes[i].Marque;
			if(marque != null)
			{
				var chId = marque.IdElt; 
			
				var tabId = chId.split("-");
				
				if(tabId.indexOf(idU) >= 0)
				{
					tabSuppMarques.push(marque);
				}
			}
		}
	}
	
	for(var i = 0; i < tabSuppMarques.length; i++)
	{
		var marque = tabSuppMarques[i];
		Style.DivMarques.removeChild(marque.DivMarque);
	}
},

// IHM Control. We must do an IHM control because an underlined word or expression can have several style solutions (Ex : register)
Control_StyleSol : function(ensSolutionExp)
{
	// Redundancy
	if(ensSolutionExp.Type == "Redundancy")
	{
		var rbRedundancy = Style.Map_PanelRb.get("RbRedundancy");
		if(rbRedundancy != null && rbRedundancy.Input.checked == true) return true;
	}
	// WordRepetition
	else if(ensSolutionExp.Type == "WordRepetition")
	{
		if(Style.RowSelectedPrec != null)
		{
			if((Style.RowSelectedPrec.childNodes[0].className == "Stat-CellStyleSelect") &&
			   (Style.RowSelectedPrec.childNodes[1].className == "Stat-CellStyleSelectNb"))
			{
				return true;
			}
		}
	}
	// Inelegantforms Rephrase
	else if(ensSolutionExp.Type == "Rephrase_inelegantforms")
	{	
		var rbRephrase_inelegantforms = Style.Map_PanelRb.get("RbRephrase_inelegantforms");
		if(rbRephrase_inelegantforms != null && rbRephrase_inelegantforms.Input.checked == true) return true;
	}
	// Reducting words Rephrase
	else if(ensSolutionExp.Type == "Rephrase_wordreducing")
	{	
		var rbRephrase_reductingwords = Style.Map_PanelRb.get("RbRephrase_wordreducing");
		if(rbRephrase_reductingwords != null && rbRephrase_reductingwords.Input.checked == true) return true;
	}
	// Vocabulary enhancement
	else if(ensSolutionExp.Type == "Vocabulary_enhancement")
	{	
		var rbVocabulary_enhancement = Style.Map_PanelRb.get("RbVocabulary_enhancement");
		if(rbVocabulary_enhancement != null && rbVocabulary_enhancement.Input.checked == true) return true;
	}
	// Subjectivity positive
	else if(ensSolutionExp.Type == "Subjectivity_Positive")
	{	
		var rbSubjectivity_Positive = Style.Map_PanelRb.get("RbSubjectivity_Positive");
		if(rbSubjectivity_Positive != null && rbSubjectivity_Positive.Input.checked == true) return true;
	}
	// Subjectivity pejorative
	else if(ensSolutionExp.Type == "Subjectivity_Pejorative")
	{	
		var rbSubjectivity_Pejorative = Style.Map_PanelRb.get("RbSubjectivity_Pejorative");
		if(rbSubjectivity_Pejorative != null && rbSubjectivity_Pejorative.Input.checked == true) return true;
	}
	// Verbes courants
	else if(ensSolutionExp.Type == "VerbesCourants")
	{
		var rbVerbeCourant = Style.Map_PanelRb.get("RbVerbeCourant");
		if(rbVerbeCourant != null && rbVerbeCourant.Input.checked == true) return true;
	}
	// Expressions famili�res
	else if(ensSolutionExp.Type == "ExpFamilieres")
	{
		var rbExpFamilieres = Style.Map_PanelRb.get("RbExpFamilieres");
		if(rbExpFamilieres != null && rbExpFamilieres.Input.checked == true) return true;
	}
	// Cliches
	else if(ensSolutionExp.Type == "Cliche")
	{
		var rbCliches = Style.Map_PanelRb.get("RbCliche");
		if(rbCliches != null && rbCliches.Input.checked == true) return true;
	}
	// Phon�tique
	else if((ensSolutionExp.VectOtherResults.length == 1) &&
			(ensSolutionExp.VectOtherResults[0] == "ReformulationSonorite"))
	{
		var rbPhonetique = Style.Map_PanelRb.get("RbPhonetique");
		if(rbPhonetique != null && rbPhonetique.Input.checked == true) return true;
	}
	// Run-on sentence
	else if(ensSolutionExp.Type == "pl")
	{
		var rbLongSentence = Style.Map_PanelRb.get("RbLongSentence");
		if(rbLongSentence != null && rbLongSentence.Input.checked == true) return true;
	}
	// Sentence with two many commas
	else if(ensSolutionExp.Type == "pv")
	{
		var rbCommaSentence = Style.Map_PanelRb.get("RbCommaSentence");
		if(rbCommaSentence != null && rbCommaSentence.Input.checked == true) return true;
	}
	// Sentence with two many parenthesis
	else if(ensSolutionExp.Type == "pp")
	{
		var rbParenthesisSentence = Style.Map_PanelRb.get("RbParenthesisSentence");
		if(rbParenthesisSentence != null && rbParenthesisSentence.Input.checked == true) return true;
	}
	// Registers
	else if(ensSolutionExp.Type.indexOf("Register") == 0)
	{
		if(Style.RowSelectedPrec != null)
		{
			if((Style.RowSelectedPrec.childNodes[0].className == "Stat-CellStyleSelect") &&
			   (Style.RowSelectedPrec.childNodes[1].className == "Stat-CellStyleSelectNb"))
			{
				var register = ensSolutionExp.Type.substring(9, ensSolutionExp.Type.length);
				if(register == Style.RowSelectedPrec.childNodes[0].innerHTML)
				{
					return true;
				}
			}
		}
	}
	
	return false;
},

// IHM

PanelSyn : function()
{
	this.Node = document.createElement("div");
	this.Node.className = "Transf-CadreGridSyn";
	this.Node.style.marginTop = "5px";
	if(Cor.IdLangue == "en") this.Node.style.height = "550px", this.Node.style.padding = "0";
	else this.Node.style.height = "512px";
	this.Node.style.width = "250px !important";
	this.Node.style.display = "none";
	//this.Node.style.paddingBottom = "50px";
	
	// Table syn
	var nodeTableSyn = document.createElement("div");
	nodeTableSyn.setAttribute("id", "scrollbar");
	nodeTableSyn.setAttribute("class", "scrollbar");
	nodeTableSyn.setAttribute('data-simplebar', '');
	nodeTableSyn.className = "Transf-GridSyn-wrapp"; 
	nodeTableSyn.style.height = "500px";
	nodeTableSyn.style.width = "230px";
	nodeTableSyn.style.overflow = "auto";
	//nodeTableSyn.style.paddingBottom = "50px";
	
	//nodeTableSyn.style.visibility = "hidden";
	nodeTableSyn.style.display = "none";
	
	this.Table =  document.createElement("table");
	this.Table.className = "Transf-GridSyn";
	
	this.Table.onmouseover = function()
	{
		if(Style.FocusTableSyn == false)
		{
			Style.FocusTableSyn = true;
			if(Cor.IsIE && !Cor.IsIE11) TextEditor.SelectMotFormer();
			else TextEditor.SelectMot();
		}
	}
	
	nodeTableSyn.appendChild(this.Table);
	
	this.Node.appendChild(nodeTableSyn);
	
	// Legend color
	var divLegendColor = document.createElement("div");
	divLegendColor.classList.add('suggestion');
	divLegendColor.id = "suggestion";
	
	var labelContextualSyn = "Contextuel";
	if(Cor.IdLangue == "en") labelContextualSyn = "Best suggestions";
	divLegendColor.style.backgroundColor = "#d5e4eb";
	divLegendColor.style.visibility = "hidden";
	divLegendColor.style.fontWeight = "bold";
	divLegendColor.style.fontSize = "20px";
	
	divLegendColor.innerHTML = labelContextualSyn;
	
	this.Node.appendChild(divLegendColor);
	
	// Labe Nosyn
	var divLabelNoSyn = document.createElement("div");
	divLabelNoSyn.className = "Transf-LabelNoSyn";
	//divLabelNoSyn.style.visibility = "visible";
	
	var divText = document.createElement("div");
	var label = "Aucune suggestion";
	if(Cor.IdLangue == "en") label = "No suggestion";
	divText.innerHTML = label;
	divText.classList.add('no-results');
	divLabelNoSyn.appendChild(divText);
	
	this.Node.appendChild(divLabelNoSyn);
	
	// Fill syn function
	this.FillSyn = function(ensSolutionExp)
	{
		Style.FocusTableSyn = false;
	
		// Clear all
		this.Table.innerHTML = "";
	
		// Fill
		var actualIndMeaning = -1;
		
		for(var i = 0; i < ensSolutionExp.VectSolutionExp.length; i++)
		{
			var solutionExp = ensSolutionExp.VectSolutionExp[i];
			
			var synSt = solutionExp.SolutionSt;
			var attributesSt = solutionExp.AttributesSt;
			
			var attributes = attributesSt.split(";");
			var meaningSt = attributes[0];
			var ind2p = meaningSt.indexOf(":");
			var indMeaning = parseInt(meaningSt.substr(ind2p + 1));
			var nbOccurrencesSt = attributes[2];
			ind2p = nbOccurrencesSt.indexOf(":");
			var nbOccurrences = parseInt(nbOccurrencesSt.substr(ind2p + 1));
			
			// Separation meanings between synonyms.
			
			if(indMeaning != actualIndMeaning)
			{
				actualIndMeaning = indMeaning;
				
				if(actualIndMeaning != 0)
				{
					var tr = document.createElement("tr");
					var div = document.createElement("div");
					div.className = "Transf-PanelSepSyn";
					div.style.height = "8px";
					
					tr.appendChild(div);
					this.Table.appendChild(tr);
				}
			}
			
			// Synonym
			
			var tr = document.createElement("tr");
			var div = document.createElement("div");
			
			if(nbOccurrences == -1) div.className = "Transf-RowNormal";
			// Put in color contextual synonyms.
			else div.className = "Transf-RowNormal-Contextual";
			
			div.innerHTML = synSt;
			
			// Click -> replace the word by the synonym.
			div.onclick = function()
			{
				var synSt = this.innerHTML;
				
				if(!(Cor.IsIE && !Cor.IsIE11))
				{
					TextEditor.ReplaceWord(synSt, null, null, false, true);
					// Marque le texte comme modifié
					Cor.TexteModified = true;
					
					// Décale les eventuels synonymes suivant par leur nombre d'occurrence.
					// Ex : Il mange du riz puis il mange de la dinde. Remplacement du 1er mange -> nième occurrence du 2ème mange devient la 1ère occurrence.
					if(Style.VectIdSyn != null && Style.IdSynActuel != null)
					{
						var indexSynActuel = -1;
						
						for(var w = 0; w < Style.VectIdSyn.length; w++)
						{
							var idSyn = Style.VectIdSyn[w];
							if(idSyn.SynSt == Style.IdSynActuel.SynSt)
							{
								if(idSyn.Id == Style.IdSynActuel.Id) indexSynActuel = w;
								
								if(idSyn.NiemeOccurence > Style.IdSynActuel.NiemeOccurence)
								{
									idSyn.NiemeOccurence = idSyn.NiemeOccurence - 1;
								}
							}
						}
						
						// Supprime le synonyme actuel de la liste des synonymes de la phrase
						if(indexSynActuel > -1) Style.VectIdSyn.splice(indexSynActuel, 1);
					}
				}
				
				// After replacement, show the label.
				Style.PanelSynI.SetVisible_LabelNoSyn(true);
				
				// Hide popups
				Cor.PopupPanelSol.SetVisible(false, false, false, true);
			}
			
			tr.appendChild(div);
			this.Table.appendChild(tr);
			
		}
		
		// Scroll to top.
		nodeTableSyn.scrollTop = 0;
	}
	
	// Set visible or not the label of no syn.
	this.SetVisible_LabelNoSyn = function(visible)
	{
		if(visible == true)
		{
			this.Node.childNodes[0].style.display = "none";
			this.Node.childNodes[1].style.display = "none";
			this.Node.childNodes[2].style.display = "block";
		}
		else
		{
			this.Node.childNodes[0].style.display = "block";
			if(Cor.IdLangue == "en") this.Node.childNodes[1].style.display = "block";
			this.Node.childNodes[2].style.display = "none";
		}
	}

},

// Marque
Marque : function(posY, offSetTop, numP, idElt)
{
	this.DivMarque = document.createElement("div");
	//this.DivMarque.style.border = "1px solid #EDEDED";
	this.DivMarque.style.top = posY + "px";
	//this.DivMarque.style.marginTop = posY + "px";
	this.DivMarque.style.margin = "1px";
	//this.DivMarque.style.marginLeft = "10px";
	this.DivMarque.style.height = "6px";
	this.DivMarque.style.width = "9px";
	//this.DivMarque.style.zIndex = "10000";
	//this.DivMarque.style.backgroundColor = "#90C3D4";
	this.DivMarque.style.backgroundColor = "#B5D9E6";
	this.DivMarque.style.position = "absolute";
	this.DivMarque.style.cursor = "pointer";
	
	this.PosY = posY;
	this.OffSetTop = offSetTop;
	this.NumP = numP;
	this.IdElt = idElt;
	
	this.DivMarque.onclick = function()
	{
		// Scoll to position
		Util.ScrollToPos(offSetTop);
		
		if(Plugins.Type != null)
		{
			// Envoi au plugin le signal pour Scroll to paragraph
			var indicateurSt = String.valueOf(this.NumP);
			if((Plugins.Type == "MSPowerPoint") || (Plugins.Type == "MSExcel") || (Plugins.Type == "MSPowerPointOSX") || (Plugins.Type == "MSExcelOSX") || (Plugins.Type == "MSExcelWeb") || (Plugins.Type == "GoogleSheets")) indicateurSt = Plugins.MapIndicateurP.get(this.NumP);
			
			Plugins.SendToPlugin("SCROLL_TO_P" + ";" + indicateurSt);
		}
	}
	
	this.DivMarque.Marque = this;
},

// Textes d'explication

// Texte pour la fonction de r�p�tition
TexteRep : "<p>Cette fonction " + "d" + String.fromCharCode(233) + "t" + String.fromCharCode(232) + "cte les mots r" + String.fromCharCode(233) + "p" + String.fromCharCode(233) + "t" + String.fromCharCode(233) + "s dans un texte.</p>" +
		   "<p>Par d" + String.fromCharCode(233) + "faut, le nombre minimal de r" + String.fromCharCode(233) + "p" + String.fromCharCode(233) + "titions est " + String.fromCharCode(233) + "gal " + String.fromCharCode(224) + " 3 et l'" + String.fromCharCode(233) + "cart maximum entre celles-ci est de 3 phrases.</p>",


TexteRep_En : "<p>This function detects repetitions in a text.</p>" +
			  "<p>By default, the minimum number of repetitions in a text is 3 and the maximum gap between those is 3 sentences.</p>",

TexteRep2m : "<p>Cette fonction " + "d" + String.fromCharCode(233) + "t" + String.fromCharCode(232) + "cte lorsque un mot est r" + String.fromCharCode(233) + "p" + String.fromCharCode(233) + "t" + String.fromCharCode(233) + " deux foix dans la m" + String.fromCharCode(234) + "me phrase.</p>",

TexteRep2m_En : "<p>This function detects repetitions of a word inside a sentence.</p>",

TextePhLongues : "<p>Cette fonction " + "d" + String.fromCharCode(233) + "t" + String.fromCharCode(232) + "cte les phrases longues pouvant ainsi nuire " + String.fromCharCode(224) + " la lisibilit" + String.fromCharCode(233) + ".</p>" +
				 "<p>Par d" + String.fromCharCode(233) + "faut, les phrases longues sont d" + String.fromCharCode(233) + "finies par un nombre de mots minimum de 30 mots.</p>",

TextePhLongues_En : "<p>This function detects run-on sentences, which can decrease readability.</p>" +
					"<p>By default, run-on sentences are defined by a minimum number of 30 words.</p>",

TexteNbVirg : "<p>Cette fonction " + "d" + String.fromCharCode(233) + "t" + String.fromCharCode(232) + "cte les phrases comportant un nombre trop important de virgules </p>" +
			  "<p>pouvant ainsi nuire " + String.fromCharCode(224) + " la lisibilit" + String.fromCharCode(233) + ".</p>" + 
			  "<p>Par d" + String.fromCharCode(233) + "faut, le nombre minimal de virgules est " + String.fromCharCode(233) + "gal " + String.fromCharCode(224) + " 3.</p>",

TexteNbVirg_En : "<p>This function detects comma overuse, which can decrease readability.</p>" +
				 "<p>By default, the minimal number of commas is 3.</p>",

TexteNbPar : "<p>Cette fonction " + "d" + String.fromCharCode(233) + "t" + String.fromCharCode(232) + "cte les phrases comportant un nombre trop important de parenth" + String.fromCharCode(232) + "ses </p>" +
			 "<p>pouvant ainsi nuire " + String.fromCharCode(224) + " la lisibilit" + String.fromCharCode(233) + ".</p>" + 
			 "<p>Par d" + String.fromCharCode(233) + "faut, le nombre minimal de parenth" + String.fromCharCode(232) + "ses est " + String.fromCharCode(233) + "gal " + String.fromCharCode(224) + " 2.</p>",

TexteNbPar_En : "<p>This function detects parenthesis overuse, which can decrease readability.</p>" +
				"<p>By default, the minimal number of parenthesis is 2.</p>",
 
TextePleonasme : "<p>Cette fonction " + "d" + String.fromCharCode(233) + "t" + String.fromCharCode(232) + "cte les pl" + String.fromCharCode(233) + "onasmes.</p>" +
				 "<p>Cliquez sur un pl" + String.fromCharCode(233) + "onasme pour obtenir sa solution.</p>",

TextePleonasme_En : "<p>This function detects pleonasms.</p>" +
					"<p>Click on the text to get the solution.</p>",

TexteReformulation : "<p>Cette fonction d" + String.fromCharCode(233) + "t" + String.fromCharCode(232) + "cte certaines phrases mal construites.</p>" + 
					 "<p>Cliquez sur le surlignage pour obtenir sa reformulation.</p>",

TexteSolVerbesCourants : "<p>Cette fonction d" + String.fromCharCode(233) + "t" + String.fromCharCode(232) + "cte l'usage de verbes tr" + String.fromCharCode(232) + "courants.</p>" + 
						 "<p>Cliquez sur le surlignage pour obtenir une solution.</p>",

TexteSolExpFamilieres : "<p>Cette fonction d" + String.fromCharCode(233) + "t" + String.fromCharCode(232) + "cte les expressions famili" + String.fromCharCode(232) + "res et propose une solution de remplacement.</p>" + 
					    "<p>Il est pr" + String.fromCharCode(233) + "f" + String.fromCharCode(233) + "rable d'omettre les expressions famili" + String.fromCharCode(232) + "res dans un contexte professionnel.</p>" + 
						"<p>Cliquez sur le surlignage pour obtenir une solution.</p>",

TexteSolSonorite : "<p>Cette fonction d" + String.fromCharCode(233) + "t" + String.fromCharCode(232) + "cte des ensembles de mots phon" + String.fromCharCode(233) + "tiquement in" + String.fromCharCode(233) + "l" + String.fromCharCode(233) + "gants.</p>" + 
				   "<p>Ex : Un gar" + String.fromCharCode(231) + "on intelligent et beau. -> <b>Un gar" + String.fromCharCode(231) + "on beau et intelligent.</b></p>",

TexteRegFamilier : "<p>Cette fonction " + "d" + String.fromCharCode(233) + "t" + String.fromCharCode(232) + "cte les termes et expressions faisant partie du registre familier.</p>" +
				   "<p>Cliquez sur le mot pour obtenir ses synonymes.</p>",

TexteRegArgot : "<p>Cette fonction " + "d" + String.fromCharCode(233) + "t" + String.fromCharCode(232) + "cte les termes et expressions faisant partie du registre argotique.</p>" +
				"<p>Cliquez sur le mot pour obtenir ses synonymes.</p>",

TexteRegVulgaire : "<p>Cette fonction " + "d" + String.fromCharCode(233) + "t" + String.fromCharCode(232) + "cte les termes et expressions faisant partie du registre vulgaire.</p>" +
				   "<p>Cliquez sur le mot pour obtenir ses synonymes.</p>",

TexteRegPejoratif : "<p>Cette fonction " + "d" + String.fromCharCode(233) + "t" + String.fromCharCode(232) + "cte les termes et expressions faisant partie du registre p" + String.fromCharCode(233) + "joratif.</p>" +
					"<p>Cliquez sur le mot pour obtenir ses synonymes.</p>",

TexteRegInsulte : "<p>Cette fonction " + "d" + String.fromCharCode(233) + "t" + String.fromCharCode(232) + "cte les termes et expressions faisant partie du registre de l'insulte.</p>" +
				  "<p>Cliquez sur le mot pour obtenir ses synonymes.</p>",

TexteRegPopulaire : "<p>Cette fonction " + "d" + String.fromCharCode(233) + "t" + String.fromCharCode(232) + "cte les termes et expressions faisant partie du registre populaire.</p>" +
					"<p>Cliquez sur le mot pour obtenir ses synonymes.</p>",

TexteRegAnglicisme : "<p>Cette fonction " + "d" + String.fromCharCode(233) + "t" + String.fromCharCode(232) + "cte les anglicismes.</p>" +
					 "<p>Cliquez sur le mot pour obtenir ses synonymes.</p>",

TexteCliches_En : "<p>This function detects cliches.</p><p>Cliches are words and phrases, once interesting, which have lost their original effect from overuse.<br>They are considered trite and stereotyped, and should be avoided in writing unless used purposely for effect.</p><p>Examples:</p><p>- All roads lead to Rome.</p><p>- The quiet before the storm</p>",

TexteSubjectivity_Positive_Fr : "<p>Cette fonction permet de rendre un texte avec une connotation <b>positive</b>.</p>",

TexteSubjectivity_Positive_En : "<p>This function allows to return a text with a <b>positive</b> connotation.</p>",

TexteSubjectivity_Pejorative_Fr : "<p>Cette fonction permet de rendre un texte avec une connotation <b>p" + String.fromCharCode(233) + "jorative</b>.</p>",

TexteSubjectivity_Pejorative_En : "<p>This function allows to return a text with a <b>pejorative</b> connotation.</p>",

TexteComplementColorIntensity_EN : "<p><div style='background-color:white;width:60px;height:25px;border:1px solid #515254;text-align:center;padding-top:2px;display:inline-block'>Normal</div><div style='background-color:#85cbfc;width:50px;height:25px;border:1px solid #515254;text-align:center;padding-top:2px;margin-left:10px;display:inline-block'>High</div></p>"

};