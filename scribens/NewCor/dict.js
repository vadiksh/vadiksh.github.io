
var Dict = {

PanelDictI : null,

// Under panel of the citations
UnderPanel_Citations : null,

// Nombre de citations maximum par panel
NbMaxCitationsPanel : 50,

// Panel of citation themes
PanelCitationThemes : null,

// Panel of citation authors
PanelCitationAuthors : null,

// Array of letters
ArrayLetters : ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],

GetAffType : function(typeSt)
{
	if(Cor.IdLangue == "en")
	{
		if(typeSt == "noun") typeSt = "Noun";
		else if((typeSt == "verb") || (typeSt == "ppre") || (typeSt == "ppas")) typeSt = "Verb";
		else if(typeSt == "adj") typeSt = "Adjective";
		else if(typeSt == "adv") typeSt = "Adverb";
		else if((typeSt == "conj") || (typeSt == "conj_coord") || (typeSt == "conj_coorl")) typeSt = "Conjunction";
		else if((typeSt == "pro") || (typeSt == "pro_rel")) typeSt = "Pronoun";
		else if(typeSt == "prep") typeSt = "Preposition";
		else if(typeSt == "det") typeSt = "Determiner";
		else if(typeSt == "aux") typeSt = "Modal";
		else if(typeSt == "intj") typeSt = "Interjection";
		else if(typeSt == "exp") typeSt = "Phrase";
	} else {
		if(typeSt == "noun") typeSt = "Nom";
		else if((typeSt == "verb") || (typeSt == "ppre") || (typeSt == "ppas")) typeSt = "Verbe";
		else if(typeSt == "adj") typeSt = "Adjectif";
		else if(typeSt == "adv") typeSt = "Adverbe";
		else if((typeSt == "conj") || (typeSt == "conj_coord") || (typeSt == "conj_coorl")) typeSt = "Conjonction";
		else if((typeSt == "pro") || (typeSt == "pro_rel")) typeSt = "Pronom";
		else if(typeSt == "prep") typeSt = "Préposition";
		else if(typeSt == "det") typeSt = "Détérminer";
		else if(typeSt == "aux") typeSt = "Modal";
		else if(typeSt == "intj") typeSt = "Interjection";
		else if(typeSt == "exp") typeSt = "Phrase";
	}
	
	return typeSt;
},

// Panel of the dictionary
PanelDict : function()
{
	this.Node = document.createElement("div");
	this.Node.id = "PanelDict";
	this.Node.style.borderStyle = "solid";
	this.Node.style.borderColor = "#d0d0d0";
	this.Node.style.borderWidth = "1px";
	this.Node.style.padding = "10px";
	this.Node.style.paddingLeft = "14px";
	
	var table = document.createElement("div");
	table.style.margin = "0px";
	
	var td0 = document.createElement("td");
	var inputWord = document.createElement("input");
	inputWord.type = "text";
	if(Cor.IdLangue == 'en') inputWord.setAttribute("placeholder", "Search");
	else inputWord.setAttribute("placeholder", "Rechercher");
	inputWord.id = "InputDict";
	td0.appendChild(inputWord);
	table.appendChild(td0);
	
	//BUTTON DEFINITION
	var td1 = document.createElement("td");
	var buttonDef = document.createElement("div");
	buttonDef.className = "Cor-RedButton button-definition";
	buttonDef.width = "150px";
	buttonDef.style.marginLeft = "35px";
	var label = "D" + String.fromCharCode(233) + "finition";
	if(Cor.IdLangue == 'en') label = "Definition";
	buttonDef.innerHTML = label;
	buttonDef.onclick = function()
	{
		var inputWord = document.getElementById("InputDict");
	
		var wordSt = inputWord.value;
		//inputWord.value = "";
		
		Dict.ClickOnDef(wordSt);
	};
	td1.appendChild(buttonDef);
	table.appendChild(td1);
	
	//BUTTON CONJUGAISON
	var td2 = document.createElement("td");
	var buttonConj = document.createElement("div");
	buttonConj.className = "Cor-RedButton button-conjugaison";
	buttonConj.width = "150px";
	buttonConj.style.marginLeft = "15px";
	var label = "Conjugaison";
	if(Cor.IdLangue == 'en') label = "Conjugation";
	buttonConj.innerHTML = label;
	buttonConj.onclick = function()
	{
		var inputWord = document.getElementById("InputDict");
	
		var wordSt = inputWord.value.toLowerCase();
		//inputWord.value = "";
	
		Dict.ClickOnConj(wordSt);
	};
	td2.appendChild(buttonConj);
	table.appendChild(td2);
	
	//BUTTON SYNONYMS
	var td3 = document.createElement("td");
	var buttonSyn = document.createElement("div");
	buttonSyn.className = "Cor-RedButton button-synonyms";
	buttonSyn.width = "150px";
	buttonSyn.style.marginLeft = "15px";
	var label = "Synonyme/Antonyme";
	if(Cor.IdLangue == 'en') label = "Synonyms";
	buttonSyn.innerHTML = label;
	buttonSyn.onclick = function()
	{
		var inputWord = document.getElementById("InputDict");
	
		var wordSt = inputWord.value.toLowerCase();
		//inputWord.value = "";
	
		Dict.ClickOnSynonyms(wordSt);
	};
	td3.appendChild(buttonSyn);
	table.appendChild(td3);
	
	if(Cor.IdLangue == 'fr')
	{
		var td4 = document.createElement("td");
		var buttonAcr = document.createElement("div");
		buttonAcr.className = "Cor-RedButton";
		buttonAcr.width = "150px";
		buttonAcr.style.marginLeft = "15px";
		buttonAcr.innerHTML = "Acronyme";
		buttonAcr.onclick = function()
		{
			var inputWord = document.getElementById("InputDict");
		
			var wordSt = inputWord.value;
			//inputWord.value = "";
		
			Dict.ClickOnAcr(wordSt);
		};
		td4.appendChild(buttonAcr);
		table.appendChild(td4);
		
		var td5 = document.createElement("td");
		var buttonCit = document.createElement("div");
		buttonCit.className = "Cor-RedButton";
		buttonCit.width = "150px";
		buttonCit.style.marginLeft = "15px";
		buttonCit.innerHTML = "Citations";
		buttonCit.id = "ButtonCit";
		buttonCit.onclick = function(){Dict.ClickOnCit();};
		
		if(Cor.ModeAbonnePremium == true) buttonCit.style.display = "block";
		else buttonCit.style.display = "none";
		
		td5.appendChild(buttonCit);
		table.appendChild(td5);
	}
	
	this.Node.appendChild(table);
	
	// Blank panel. Indicates how to use the dictionaries.
	var blankPanel = document.createElement("div");
	blankPanel.style.height = "800px";
	
	// Loupe images
	var imgLoupe = document.createElement("img");
	imgLoupe.src = "images/Loupe.png";
	imgLoupe.style.marginTop = "200px";
	blankPanel.appendChild(imgLoupe);
	
	// Label indications
	var labelInd = document.createElement("div");
	labelInd.style.marginTop = "50px";
	labelInd.style.fontSize = "24px";
	labelInd.style.color = "#9c9c9c";
	if(Cor.IdLangue == "fr") labelInd.innerHTML = "<p>Tapez votre mot dans la zone de recherche, puis cliquez sur les différents onglets.</p>";
	else if(Cor.IdLangue == "en") labelInd.innerHTML = "<p>Enter a word in the search box, then click on the tabs.</p>";
	blankPanel.appendChild(labelInd);
	
	this.Node.appendChild(blankPanel);
	
	document.getElementById('MainDiv').appendChild(this.Node);
},

// Remove panel dict elements
// Index : after this index, remove all.
RemovePanelDictElements : function(index)
{
	var panelDict = document.getElementById("PanelDict");
	
	var nbElements = panelDict.childNodes.length;
	
	for(var i = 0; i < (nbElements - index); i++)
	{
		panelDict.removeChild(panelDict.childNodes[index]);	
	}
},

// Show definitions.
ClickOnDef : function(wordSt)
{
	Util.SendHttpRequest('Dict_Servlet',
						[['FunctionName', 'GetObjDict'],
						 ['Word', wordSt],
						 ['Type', 'def'],
						 ['IdLang', Cor.IdLangue]],
						 Dict.ShowResultDef);
},

// Show result of definition request
ShowResultDef : function(objetDef)
{
	if((objetDef.VectCloseWords.length == 0) && (objetDef.WordExist == true))
	{
		Dict.RemovePanelDictElements(1);
		
		var mainDiv = document.createElement("div");
		// mainDiv.style.marginTop = "10px";
		// mainDiv.style.marginBottom = "10px";
		mainDiv.id = "MainDivConj";
		mainDiv.className = "definition-iframe";
		
		// Lien vers wikitionnary
		var url = "https://fr.wiktionary.org/wiki/" + objetDef.Word_Def;
		if(Cor.IdLangue == "en") url = "https://en.wiktionary.org/wiki/" + objetDef.Word_Def;
		
		var frame = document.createElement("iframe");
		frame.style.width = "850px";
		frame.style.height = "1020px";
		frame.style.marginTop = "30px";
		frame.style.borderWidth = "0px";
		frame.src = url;
		
		mainDiv.appendChild(frame);
		
		var panelDict = document.getElementById("PanelDict");
		panelDict.appendChild(mainDiv);
	}
	// Unknown words
	else
	{
		Dict.ShowCloseWords(objetDef.Word_Def, objetDef.VectCloseWords, "def");
	}
},

// Show synonyms.
ClickOnSynonyms : function(wordSt)
{
	Util.SendHttpRequest('Dict_Servlet',
						[['FunctionName', 'GetObjDict'],
						 ['Word', wordSt],
						 ['Type', 'syn'],
						 ['IdLang', Cor.IdLangue]],
						 Dict.ShowResultSyn);
},

// Show result of synonym request
ShowResultSyn : function(resultSyn)
{
	if((resultSyn.VectCloseWords.length == 0) && (resultSyn.WordExist == true))
	{
		Dict.RemovePanelDictElements(1);
		
		var mainDiv = document.createElement("div");
		mainDiv.style.marginTop = "10px";
		mainDiv.style.marginBottom = "10px";
		mainDiv.className = "main-synonym";
		
		var divTitle = document.createElement("div");
		divTitle.setAttribute("align", "center");
		
		var labelTitle = document.createElement("div");
		labelTitle.className = "Syn-TitreSyn";
		labelTitle.innerHTML = resultSyn.Word_Def;
		labelTitle.style.paddingBottom = "20px";
		//labelTitle.style.paddingTop = "10px";
		divTitle.appendChild(labelTitle);
		
		mainDiv.appendChild(divTitle);
		
		// Synonyms.
		if(resultSyn.VectPos.length > 0)
		{
			var nbColumns = resultSyn.VectPos.length;
				
			var columnWidth = 0;
			if(nbColumns == 2) columnWidth = 430;	// Ex : change
			else if(nbColumns == 3) columnWidth = 285;	// Ex : lisse
			else if(nbColumns == 4) columnWidth = 200;

			var tableSyn = document.createElement("table");
			tableSyn.className = "row";
			
			if(Cor.IdLangue == 'fr')
			{
				tableSyn.style.borderBottomStyle = "solid";
				tableSyn.style.borderBottomWidth = "1px";
				tableSyn.style.borderBottomColor = "#d2d2d2";
				tableSyn.style.paddingBottom = "35px";
			}
			
			for(var i = 0; i < resultSyn.VectPos.length; i++)
			{
				var td = document.createElement("td");
				// if(columnWidth > 0) td.style.width = columnWidth + "px";
				td.className = "item col-xs-12 col-sm-6 col-md-4 col-lg-3";


				var pos = resultSyn.VectPos[i];
				
				var divPos = document.createElement("div");
				divPos.className = "wrapper";
				// if(i < (resultSyn.VectPos.length - 1)) divPos.style.marginRight = "10px";
				
				// Title pos
				var titlePos = document.createElement("div");
				titlePos.className = "Syn-SynType";
				titlePos.style.paddingBottom = "10px";
				
				var posSt = Dict.GetAffType(pos.Left);
				posSt = posSt.substring(0, 1).toUpperCase() + posSt.substring(1);
				
				titlePos.innerHTML = posSt;
				
				divPos.appendChild(titlePos);
				
				// Meanings
				var meanings = pos.Right;
				
				for(var u = 0; u < meanings.length; u++)
				{
					var meaning = meanings[u];
				
					if(meaning.VectSyn.length > 0) hasSyn = true;
				
					// Title
					var meaningTitle = document.createElement("div");
					meaningTitle.className = "Syn-SynSens";
					var label = "Sens n" + String.fromCharCode(176) + (u + 1);
					if(Cor.IdLangue == 'en') label = "Meaning n" + String.fromCharCode(176) + (u + 1);
					meaningTitle.innerHTML = label;
					divPos.appendChild(meaningTitle);
					
					// Synonyms
					var divSyns = document.createElement("div");
					divSyns.className = "wrapp-list";
					
					var htmlSyn = '';
					for(var v = 0; v < meaning.VectSyn.length; v++)
					{
						htmlSyn += '<span>' + meaning.VectSyn[v].SynSt + '</span>';
						// if(v < (meaning.VectSyn.length - 1)) htmlSyn += ", ";
					}
					
					divSyns.innerHTML = htmlSyn;
					divPos.appendChild(divSyns);
					
					// Antonym (en)
					if(Cor.IdLangue == 'en')
					{
						if(meaning.VectAnt.length > 0)
						{
							// Antonyms
							var divAnts = document.createElement("div");
							
							var htmlAnt = "<span class='antonyms'>Antonyms</span>";
							for(var v = 0; v < meaning.VectAnt.length; v++)
							{
								htmlAnt += '<span>' + meaning.VectAnt[v].SynSt + '</span>';
								// if(v < (meaning.VectAnt.length - 1)) htmlAnt += ", ";
							}
							
							divAnts.innerHTML = htmlAnt;
							divPos.appendChild(divAnts);
						}
					}
				}
				
				td.appendChild(divPos);
				
				tableSyn.appendChild(td);
				
			}
			
			mainDiv.appendChild(tableSyn);
			
			// Antonyms.
			if(Cor.IdLangue == 'fr')
			{
				var tableAnt = document.createElement("table");
				
				for(var i = 0; i < resultSyn.VectPos.length; i++)
				{
					var pos = resultSyn.VectPos[i];
				
					// Show only if the pos has antonyms.
					var hasAnt = false;
					
					var meanings = pos.Right;
					for(var u = 0; u < meanings.length; u++)
					{
						var meaning = meanings[u];
					
						if(meaning.VectAnt.length > 0)
						{
							hasAnt = true;
							break;
						}
					}
					
					if(hasAnt)
					{
						var td = document.createElement("td");
						td.className = "wrapper-syns";
						if(columnWidth > 0) td.style.width = columnWidth + "px";
				
						var pos = resultSyn.VectPos[i];
						
						var divPos = document.createElement("div");
						if(i < (resultSyn.VectPos.length - 1)) divPos.style.marginRight = "10px";
					
						// Title pos
						var titlePos = document.createElement("div");
						titlePos.className = "Syn-SynType";
						titlePos.style.paddingBottom = "10px";
						
						var posSt = Dict.GetAffType(pos.Left);
						posSt = posSt.substring(0, 1).toUpperCase() + posSt.substring(1);
						
						titlePos.innerHTML = posSt;
						
						divPos.appendChild(titlePos);
						
						// Meanings
						var meanings = pos.Right;
						
						for(var u = 0; u < meanings.length; u++)
						{
							var meaning = meanings[u];
							if(meaning.VectAnt.length > 0)
							{
								// Title
								var meaningTitle = document.createElement("div");
								meaningTitle.className = "Syn-SynSens";
								meaningTitle.innerHTML = "Sens n" + String.fromCharCode(176) + (u + 1);
								divPos.appendChild(meaningTitle);
								
								// Synonyms
								var divAnts = document.createElement("div");
								
								var htmlSyn = '';
								for(var v = 0; v < meaning.VectAnt.length; v++)
								{
									htmlSyn += meaning.VectAnt[v].SynSt;
									if(v < (meaning.VectAnt.length - 1)) htmlSyn += ", ";
								}
								
								divAnts.innerHTML = htmlSyn;
								divPos.appendChild(divAnts);
							}
						}
					
						td.appendChild(divPos);
						
						tableAnt.appendChild(td);
					}
					
				}
				
				if(tableAnt.childNodes.length > 0)
				{
					var labelTitleAnt = document.createElement("div");
					labelTitleAnt.className = "Syn-TitreAnt";
					labelTitleAnt.innerHTML = "Antonymes : ";
					labelTitleAnt.style.paddingTop = "10px";
					labelTitleAnt.style.paddingBottom = "10px";
					divTitle.appendChild(labelTitleAnt);
					
					mainDiv.appendChild(labelTitleAnt);
				
					mainDiv.appendChild(tableAnt);
				}
			}
			
			// Source. Only for US.
			if(resultSyn.Source.length > 0)
			{
				var divSource = document.createElement("div");
				divSource.style.fontSize = "12px";
				divSource.style.fontWeight = "bold";
				divSource.style.paddingTop = "20px";
				divSource.style.paddingBottom = "20px";
				
				
				var labelSource = "";
				if(resultSyn.Source == "Collins") labelSource = "Collins English Thesaurus - Complete and Unabridged " + String.fromCharCode(169) + " HarperCollins Publishers 2013";
				else if(resultSyn.Source == "WordNet3") labelSource = "WordNet 3.0. " + String.fromCharCode(169) + " 2003-2015 Princeton University, Farlex Inc.";
				
				divSource.innerHTML = labelSource;
				
				mainDiv.appendChild(divSource);
			}
			
			var panelDict = document.getElementById("PanelDict");
			panelDict.appendChild(mainDiv);
		}
		// Word existing but no synonym.
		else
		{
			var divLabelNoSyn = document.createElement("div");
			var label = "Aucun synonyme trouv" + String.fromCharCode(232) + " pour ce mot";
			if(Cor.IdLangue == "en") label = "No synonyms found.";
			divLabelNoSyn.className = "Syn-MessageSynInc";
			divLabelNoSyn.innerHTML = label;
			
			mainDiv.appendChild(divLabelNoSyn);
			
			var panelDict = document.getElementById("PanelDict");
			panelDict.appendChild(mainDiv);
		}
	}
	// Unknown words
	else
	{
		Dict.ShowCloseWords(resultSyn.Word_Def, resultSyn.VectCloseWords, "syn");
	}
},

// Show conj.
ClickOnConj : function(wordSt)
{
	Util.SendHttpRequest('Dict_Servlet',
						[['FunctionName', 'GetObjDict'],
						 ['Word', wordSt],
						 ['Type', 'conj'],
						 ['IdLang', Cor.IdLangue]],
						 Dict.ShowResultConj);
},

// Get panel of a tense conj
GetPanelTenseConj : function(tenseConj)
{
	var mainDiv = document.createElement("div");
	mainDiv.className = "Conj-BlockTemps";
	mainDiv.style.width = "210px";
	
	var divTitle = document.createElement("div");
	divTitle.innerHTML = tenseConj.Tense;
	divTitle.style.fontWeight = "bold";
	mainDiv.appendChild(divTitle);
	
	for(var i = 0; i < tenseConj.VectConj.length; i++)
	{
		var divConj = document.createElement("div");
		divConj.innerHTML = tenseConj.VectConj[i];
		mainDiv.appendChild(divConj);
	}

	return mainDiv;
},

// Conj panel
GetConjPanel : function(form)
{
	var mainDiv = document.createElement("div");
	mainDiv.style.marginTop = "10px";
	mainDiv.className = form.Title.replace(" ", '-').toLowerCase();
	
	var tableImp = null;
	
	for(var i = 0; i < form.VectModes.length; i++)
	{
		var mode = form.VectModes[i];
		var titleMode = mode.Left;
		
		var divMode = document.createElement("div");
	
		var labelTitleMode = document.createElement("div");
		labelTitleMode.className = "Conj-TitreCatTps";
		labelTitleMode.style.marginTop = "10px";
		labelTitleMode.innerHTML = titleMode;
		if(i > 0)
		{
			labelTitleMode.style.borderTopColor = "#348EBF";
			labelTitleMode.style.borderTopStyle = "solid";
			labelTitleMode.style.borderTopWidth = "4px";
			labelTitleMode.style.paddingTop = "10px";
		}
	
		divMode.appendChild(labelTitleMode);
		
		var table = document.createElement("table");
		
		var tr = null;
		for(var u = 0; u < mode.Right.length; u++)
		{
			var tenseConj = mode.Right[u];
		
			var td = document.createElement("td");
			
			td.style.verticalAlign = "top";
			
			var panelTenseConj = Dict.GetPanelTenseConj(tenseConj);
			td.appendChild(panelTenseConj);
			
			if((u % 4) == 0)
			{
				tr = document.createElement("tr");
				table.appendChild(tr);
			}
			
			tr.appendChild(td);	
		}
		
		divMode.appendChild(table);
		
		// For imperatie and participle, choose and other subdivision.
		if((titleMode == ("Imp" + String.fromCharCode(233) + "ratif")) ||
		   (titleMode == "Imperative"))
		{
			if(tableImp == null) tableImp = document.createElement("tr");
			var td = document.createElement("td");
			td.appendChild(divMode);
			tableImp.appendChild(td);
			
			mainDiv.appendChild(tableImp);
		}
		// For imperatie and participle, choose and other subdivision.
		else if((titleMode == "Participe") ||
				(titleMode == "Participle") ||
				(titleMode == "Infinitive"))
		{
			if(tableImp == null) tableImp = document.createElement("tr");
			
			var td = document.createElement("td");
			td.appendChild(divMode);
			tableImp.appendChild(td);
		}
		// Normal mode
		else mainDiv.appendChild(divMode);

	}

	return mainDiv;
},

// Show result of conjugation request
ShowResultConj : function(verbDisplay)
{
	if((verbDisplay.VectCloseWords.length == 0) && (verbDisplay.WordExist == true))
	{
		Dict.RemovePanelDictElements(1);
		
		var mainDiv = document.createElement("div");
		mainDiv.style.marginTop = "10px";
		mainDiv.style.marginBottom = "10px";
		mainDiv.id = "MainDivConj";
		mainDiv.className = "main-conjugaison";
		
		var divTitle = document.createElement("div");
		divTitle.setAttribute("align", "center");
		
		var labelTitle = document.createElement("div");
		labelTitle.className = "Syn-TitreSyn";
		labelTitle.innerHTML = verbDisplay.Title;
		divTitle.appendChild(labelTitle);
		mainDiv.appendChild(divTitle);
		
		// Description of the verb
		var labelDescVerb = document.createElement("div");
		labelDescVerb.className = "Syn-TitreSyn";
		labelDescVerb.style.marginTop = "10px";
		labelDescVerb.className = "Conj-DescriptionVerbe";
		labelDescVerb.innerHTML = verbDisplay.Description;
		
		mainDiv.appendChild(labelDescVerb);
		
		var wrappUl = document.createElement("div");
		wrappUl.className = "wrapp-TabOptions";

		// If several forms, build a tab panel.
		if(verbDisplay.VectForms.length > 1)
		{
			// Create the tabs
			var ul = document.createElement("ul");
			ul.className = "Cor-TabOptions Tabs tabs-number-"+verbDisplay.VectForms.length;
			ul.style.marginTop = '10px';
			
		
			for(var i = 0; i < verbDisplay.VectForms.length; i++)
			{
				var form = verbDisplay.VectForms[i];
			
				var li = document.createElement("li");
				li.className = "Cor-LiOptions Tabs__tab Tab " + form.Title; 
				
				//var ind = i;
				li.onclick = function(event)
				{
					// Calculate the index.
					var index = -1;
					//var parentNode = 
					for(var u = 0; u < this.parentNode.childNodes.length; u++)
					{
						if(this.parentNode.childNodes[u] == this)
						{
							index = u;
							break;
						}
					}
					
					var mainDivConj = document.getElementById("MainDivConj");
		
					for(var i = 3; i < mainDivConj.childNodes.length; i++)
					{
						var form = mainDivConj.childNodes[i];
						if((i - 3) == index)
						{
							form.style.display = 'block';
							
							/*var panel = ulPrem.childNodes[i - 5];
							panel.style.backgroundColor = "#434343";
							panel.firstChild.style.color = "#ffffff";*/
						}
						else
						{
							form.style.display = 'none';
							//ulPrem.childNodes[i].className = "Prem-LiTab a";
							//ulPrem.childNodes[i - 5].style.backgroundColor = "red";
							
							/*var panel = ulPrem.childNodes[i - 5];
							//panel.style.backgroundColor = "f1f1f1";
							panel.style.backgroundColor = "#f1f1f1";
							panel.firstChild.style.color = "black";*/
						}
					}
					
					// Color the background
					var target = event.target;
					var parentNode = target.parentNode.parentNode;
					
					for(var i = 0; i < parentNode.childNodes.length; i++)
					{
						var li = parentNode.childNodes[i].firstChild;
						
						if(li == target) li.parentNode.classList.add('active');
						else li.parentNode.classList.remove('active');
					}
					
				};
				
				var a = document.createElement("a");
				
				var label = form.Title;
				a.innerHTML = label;
				
				li.appendChild(a);
				ul.appendChild(li);
			}

			var sliderBorder = document.createElement("li");
			sliderBorder.className = "Tabs__presentation-slider"; 

			ul.appendChild(sliderBorder);
			wrappUl.appendChild(ul);
			mainDiv.appendChild(wrappUl);

			mainDiv.appendChild(wrappUl);
		}
		
		// Add conjPanel
		for(var i = 0; i < verbDisplay.VectForms.length; i++)
		{
			var form = verbDisplay.VectForms[i];
			var conjPanel = Dict.GetConjPanel(form);
			
			if(i > 0) conjPanel.style.display = "none";
			
			mainDiv.appendChild(conjPanel);
		}
		
		var panelDict = document.getElementById("PanelDict");
		panelDict.appendChild(mainDiv);
	}
	// Unknown words
	else
	{
		Dict.ShowCloseWords(verbDisplay.Infinitive, verbDisplay.VectCloseWords, "conj");
	}
},

// Show acronyms.
ClickOnAcr : function(wordSt)
{
	Util.SendHttpRequest('Dict_Servlet',
						[['FunctionName', 'GetObjDict'],
						 ['Word', wordSt],
						 ['Type', 'acr'],
						 ['IdLang', Cor.IdLangue]],
						 Dict.ShowResultAcr);
},

// Show result of acronym request
ShowResultAcr : function(acronym)
{
	if((acronym.VectCloseWords.length == 0) && (acronym.WordExist == true) && (acronym.VectDefSt.length > 0))
	{
		Dict.RemovePanelDictElements(1);
		
		var mainDiv = document.createElement("div");
		mainDiv.style.marginTop = "10px";
		mainDiv.style.marginBottom = "10px";
		mainDiv.className = "main-acronym";

		// Title
		var divTitleAcr = document.createElement("div");
		divTitleAcr.className = "Syn-TitreSyn";
		divTitleAcr.style.paddingBottom = "20px";
		divTitleAcr.innerHTML = acronym.Word_Def.toUpperCase();
		mainDiv.appendChild(divTitleAcr);
		
		// Acronyms
		for(var i = 0; i < acronym.VectDefSt.length; i++)
		{
			var divAcr = document.createElement("div");
			divAcr.innerHTML = acronym.VectDefSt[i];
			
			mainDiv.appendChild(divAcr);
		}
		
		var panelDict = document.getElementById("PanelDict");
		panelDict.appendChild(mainDiv);
	}
	// Unknown words
	else
	{
		Dict.ShowCloseWords(acronym.Word_Def.toUpperCase(), acronym.VectCloseWords, "acr");
	}
},

// Click on citations
ClickOnCit : function()
{
	Dict.RemovePanelDictElements(1);
	
	// Create and show the UnderPanel_Citations
	if(Dict.UnderPanel_Citations == null)
	{
		Dict.UnderPanel_Citations = document.createElement("div");
		Dict.UnderPanel_Citations.className = "navDict";
		Dict.UnderPanel_Citations.style.marginTop = "20px";
		Dict.UnderPanel_Citations.style.paddingBottom = "20px";
		
		var table = document.createElement("div");
	
		// Key Word button
		var td0 = document.createElement("td");
		var buttonMotCle = document.createElement("div");
		buttonMotCle.className = "Cor-RedButton";
		buttonMotCle.width = "150px";
		buttonMotCle.innerHTML = "Mot cl" + String.fromCharCode(233);
		buttonMotCle.onclick = function()
		{
			Dict.RemovePanelDictElements(2);

			var inputWord = document.getElementById("CitInputKeyWord");
	
			var keyWordSt = inputWord.value.toLowerCase();
	
			Dict.ClickOnCitWithParam(keyWordSt, "keyWord");
		};
		td0.appendChild(buttonMotCle);
		table.appendChild(td0);
		
		// Key Word input
		var td1 = document.createElement("td");
		var inputKeyWord = document.createElement("input");
		inputKeyWord.setAttribute("type", "text");
		inputKeyWord.style.width = "142px";
		inputKeyWord.style.marginLeft = "10px";
		inputKeyWord.style.marginRight = "10px";
		inputKeyWord.id = "CitInputKeyWord";
		//inputKeyWord.style.paddingTop = "4px";
		//inputKeyWord.style.marginTop = "4px";
		td1.appendChild(inputKeyWord);
		table.appendChild(td1);
		
		// Thème
		var td2 = document.createElement("td");
		var buttonTheme = document.createElement("div");
		buttonTheme.className = "Cor-RedButton";
		buttonTheme.width = "150px";
		buttonTheme.style.marginLeft = "120px";
		buttonTheme.innerHTML = "Th" + String.fromCharCode(232) + "mes";
		buttonTheme.onclick = function(){Dict.ClickOnCitThemes();};
		td2.appendChild(buttonTheme);
		table.appendChild(td2);
		
		// Authors
		var td3 = document.createElement("td");
		var buttonAuthors = document.createElement("div");
		buttonAuthors.className = "Cor-RedButton auteurs";
		buttonAuthors.width = "150px";
		buttonAuthors.style.marginLeft = "20px";
		buttonAuthors.innerHTML = "Auteurs";
		buttonAuthors.onclick = function(){Dict.ClickOnCitAuthors();};
		td3.appendChild(buttonAuthors);
		table.appendChild(td3);
		
		Dict.UnderPanel_Citations.appendChild(table);
	}

	var panelDict = document.getElementById("PanelDict");
	panelDict.appendChild(Dict.UnderPanel_Citations);
},

// Show citations with parameters.
ClickOnCitWithParam : function(wordSt, param)
{
	Util.SendHttpRequest('Dict_Servlet',
						[['FunctionName', 'GetObjDict'],
						 ['Word', wordSt],
						 ['Type', 'cit'],
						 ['IdLang', Cor.IdLangue],
						 ['Param', param]],
						 Dict.ShowResultCitKeyWord, param, wordSt);
},

// Show citations by key words.
ShowResultCitKeyWord : function(citations, param, wordSt)
{
	Dict.RemovePanelDictElements(2);

	var panelDict = document.getElementById("PanelDict");
	
	// Title
	var titleKeyWord = document.createElement("div");
	titleKeyWord.style.fontSize = "20px";
	titleKeyWord.style.color = "#348EBF";
	titleKeyWord.style.marginTop = "10px";
	if(param == "keyWord") titleKeyWord.innerHTML = "Mot cl" + String.fromCharCode(233) + ": ";
	else if(param == "theme") titleKeyWord.innerHTML = "Th" + String.fromCharCode(232) + "me : ";
	else if(param == "author") titleKeyWord.innerHTML = "Auteur : ";
	
	titleKeyWord.innerHTML += wordSt;
	
	panelDict.appendChild(titleKeyWord);
	
	// Numbers
	var divCits = document.createElement("div");
	divCits.style.marginTop = "20px";
	divCits.setAttribute("align", "center");
	divCits.id = "ListDivCitations";
	
	var vectCitations = citations.VectCitationsSt;
	
	var numbers = Math.ceil(vectCitations.length / Dict.NbMaxCitationsPanel);
	
	if(numbers >= 2)	// With number == 1, don't show table of numbers
	{
		var tableNumbers = document.createElement("table");
		tableNumbers.style.marginBottom = "30px";
		tableNumbers.style.textAlign = "center";
		
		var tr = null;
		
		for(i = 0; i < numbers; i++)
		{
			if((i % 20) == 0)
			{
				tr = document.createElement("tr");
				tableNumbers.appendChild(tr);
			}
		
			var td = document.createElement("td");
			td.style.fontSize = "18px";
			td.style.color = "#348EBF";
			td.style.cursor = "pointer";
			td.style.paddingRight = "5px";
			td.innerHTML = (i + 1);
			if(i == 0) td.style.fontWeight = "bold";
			
			td.onmouseover = function()
			{
				this.style.textDecoration = "underline";
			};
			td.onmouseout = function()
			{
				this.style.textDecoration = "none";
			};
			td.onclick = function()
			{
				var index = parseInt(this.innerHTML);
			
				var tableNumbers = this.parentNode.parentNode;
			
				for(var i = 0; i < tableNumbers.childNodes.length; i++)
				{
					var tr = tableNumbers.childNodes[i];
					for(var u = 0; u < tr.childNodes.length; u++)
					{
						var td = tr.childNodes[u];
						if(td == this)
						{
							this.style.fontWeight = "bold";
						}
						else td.style.fontWeight = "normal";
					}
				}	
			
				var listDivCitations = document.getElementById("ListDivCitations");
				
				for(var i = 1; i < listDivCitations.childNodes.length; i++)
				{
					var divList = listDivCitations.childNodes[i];
					
					if(i == index)
					{
						divList.style.display = "block";
					}
					else
					{
						divList.style.display = "none";
					}
				}
			};
			
			tr.appendChild(td);
		}
	
		divCits.appendChild(tableNumbers);
	}
	
	// Citations lists
	
	var divList = null;
	
	for(var i = 0; i < vectCitations.length; i++)
	{
		if((i % Dict.NbMaxCitationsPanel) == 0)
		{
			divList = document.createElement("div");
			if(i >= Dict.NbMaxCitationsPanel) divList.style.display = "none";
	
			divCits.appendChild(divList);
		}
		
		var citationSt = vectCitations[i];
		
		var authorSt = "";
		var defSt = "";
		
		var indPipe = citationSt.indexOf("|");
		if(indPipe >= 0)
		{
			authorSt = citationSt.substring(0, indPipe);
			defSt = citationSt.substring(indPipe + 1);
		}
		
		var divCitationDef = document.createElement("div");
		divCitationDef.innerHTML = "\"" + defSt + "\"";
		divCitationDef.style.fontSize = "16px";
		divCitationDef.style.color = "#404040";
		
		divList.appendChild(divCitationDef);
		
		var divCitationAuthor = document.createElement("div");
		divCitationAuthor.className = "Syn-SynType";
		divCitationAuthor.style.marginTop = "10px";
		divCitationAuthor.style.paddingBottom = "10px";
		divCitationAuthor.style.marginBottom = "10px";
		divCitationAuthor.style.textDecoration = "none";
		divCitationAuthor.style.fontSize = "12px";
		
		if((((i + 1) % Dict.NbMaxCitationsPanel) != 0) &&
		   ((i < vectCitations.length - 1)))
		{
			divCitationAuthor.style.borderBottomColor = "#E6E6E6";
			divCitationAuthor.style.borderBottomStyle = "solid";
			divCitationAuthor.style.borderBottomWidth = "1px";
		}
		
		divCitationAuthor.innerHTML = authorSt;
		divList.appendChild(divCitationAuthor);
	}
	
	panelDict.appendChild(divCits);
},

// Show citations themes.
ClickOnCitThemes : function()
{
	Util.SendHttpRequest('Dict_Servlet',
						[['FunctionName', 'GetMapThemesCitations']],
						 Dict.ShowCitThemes);
},

CreateTableThemes : function(mapCitationThemes)
{
	var tableLetter = document.createElement("table");
	tableLetter.classList = "ListDivTheme";

	var td = null;
	
	for(var i = 0; i < 26; i++)
	{
		if(i == 0 || i == 2 || i == 4 || i == 8 || i == 13 || i == 16 || i == 19)
		{
			td = document.createElement("td");
			td.style.paddingRight = "20px";
			tableLetter.appendChild(td);
		}
		
		var letter = Dict.ArrayLetters[i];
	
		var letterDiv = document.createElement("div");
		
		letterDiv.innerHTML = letter;
		letterDiv.style.fontSize = "18px";
		letterDiv.style.color = "#348EBF";
		letterDiv.style.marginBottom = "10px";
		letterDiv.style.marginTop = "20px";
	
		td.appendChild(letterDiv);
		
		setThemes = mapCitationThemes[letter];
		
		if(setThemes != null)
		{
			for(var u = 0; u < setThemes.length; u++)
			{
				var divTheme = document.createElement("div");
				divTheme.innerHTML = setThemes[u];
				divTheme.style.cursor = "pointer";
				
				divTheme.onmouseover = function()
				{
					this.style.textDecoration = "underline";
				}
				divTheme.onmouseout = function()
				{
					this.style.textDecoration = "none";
				}
				divTheme.onclick = function()
				{
					Dict.ClickOnCitWithParam(this.innerHTML, "theme")
				}
				
				td.appendChild(divTheme);
			}
		}
	}
	
	return tableLetter;
},

// Show citation themes
ShowCitThemes : function(mapCitationThemes)
{
	Dict.RemovePanelDictElements(2);

	var panelDict = document.getElementById("PanelDict");
	
	if(Dict.PanelCitationThemes == null) Dict.PanelCitationThemes = Dict.CreateTableThemes(mapCitationThemes);
	
	panelDict.appendChild(Dict.PanelCitationThemes);
},

// Click on citation authors
ClickOnCitAuthors : function()
{
	Util.SendHttpRequest('Dict_Servlet',
						[['FunctionName', 'GetMapAuthors']],
						 Dict.ShowCitAuthors);

},

// Create citation author
CreatePanelCitationAuthors : function(mapCitationAuthors)
{
	var mainDiv = document.createElement("div");
	mainDiv.id = "ListDivCitAuthors";
	
	// Letters
	var divLetters = document.createElement("div");
	divLetters.setAttribute("align", "center");
	divLetters.style.marginTop = "25px";
	divLetters.style.marginBottom = "25px";
	
	var tableLetters = document.createElement("table");
	
	for(var i = 0; i < Dict.ArrayLetters.length; i++)
	{
		var letter = Dict.ArrayLetters[i];
		var td = document.createElement("td");
		td.innerHTML = letter;
		
		td.style.fontSize = "18px";
		td.style.color = "#348EBF";
		td.style.cursor = "pointer";
		td.style.paddingRight = "5px";
		
		if(i == 0) td.style.fontWeight = "bold";
		
		td.onmouseover = function()
		{
			this.style.textDecoration = "underline";
		}
		td.onmouseout = function()
		{
			this.style.textDecoration = "none";
		}
		td.onclick = function()
		{
			var tableLetters = this.parentNode;
			
			var letter = this.innerHTML;
			var index = -1;
			for(var i = 0; i < tableLetters.childNodes.length; i++)
			{
				if(tableLetters.childNodes[i] == this)
				{
					index = i;
					this.style.fontWeight = "bold";
				}
				else tableLetters.childNodes[i].style.fontWeight = "normal";
			}
			
			var listDivCitations = document.getElementById("ListDivCitAuthors");
			
			for(var i = 1; i < listDivCitations.childNodes.length; i++)
			{
				var divList = listDivCitations.childNodes[i];
				var numberDiv = tableLetters.childNodes[i - 1];
			
				if(i == (index + 1))
				{
					divList.style.display = "block";
				}
				else
				{
					divList.style.display = "none";
				}
			}
		}
		
		tableLetters.appendChild(td);
	}
	
	divLetters.appendChild(tableLetters);
	
	mainDiv.appendChild(divLetters);
	
	// Author list
	for(var i = 0; i < Dict.ArrayLetters.length; i++)
	{
		var letter = Dict.ArrayLetters[i];
		
		var divAuthors = document.createElement("div");
		divAuthors.classList = "divAuthorList"
		divAuthors.style.marginBottom = "20px";;
		var arrayAuthors = mapCitationAuthors[letter];
	
		var table = document.createElement("table");
	
		var td = null;
		
		for(var u = 0; u < arrayAuthors.length; u++)
		{
			if((u % 215) == 0)
			{
				td = document.createElement("td");
				td.style.width = "200px";
				table.appendChild(td);
			}
			
			var divAuthor = document.createElement("div");
			divAuthor.innerHTML = arrayAuthors[u];
			divAuthor.style.cursor = "pointer";
			divAuthor.onmouseover = function()
			{
				this.style.textDecoration = "underline";
			}
			divAuthor.onmouseout = function()
			{
				this.style.textDecoration = "none";
			}
			divAuthor.onclick = function()
			{
				Dict.ClickOnCitWithParam(this.innerHTML, "author");
			}
		
			td.appendChild(divAuthor);
		
		}
		
		divAuthors.appendChild(table);
		
		if(i > 0) divAuthors.style.display = "none";
		
		mainDiv.appendChild(divAuthors);
	}
	
	return mainDiv;
},

// Show citation themes
ShowCitAuthors : function(mapCitationAuthors)
{
	Dict.RemovePanelDictElements(2);

	var panelDict = document.getElementById("PanelDict");
	
	if(Dict.PanelCitationAuthors == null) Dict.PanelCitationAuthors = Dict.CreatePanelCitationAuthors(mapCitationAuthors);
	
	panelDict.appendChild(Dict.PanelCitationAuthors);
},

// Show close words
ShowCloseWords : function(wordSt, vectCloseWords, typeW)
{
	Dict.RemovePanelDictElements(1);

	var panelDict = document.getElementById("PanelDict");
	
	var divTitle = document.createElement("div");
	divTitle.setAttribute("align", "center");
	
	var labelTitle = document.createElement("div");
	labelTitle.className = "Syn-TitreSyn";
	labelTitle.innerHTML = wordSt;
	labelTitle.style.paddingBottom = "10px";
	labelTitle.style.paddingTop = "10px";
	divTitle.appendChild(labelTitle);
	panelDict.appendChild(divTitle);
	
	// Table
	var table = document.createElement("table");
	table.style.marginBottom = "10px";
	table.style.width = "100%";
	table.style.textAlign = "center";
	
	// Label
	var tdTitle = document.createElement("td");
	tdTitle.className = "Syn-MessageSynInc";
	
	var divLabelWordUnknown = document.createElement("div");
	var label = "Mot inconnu";
	if(Cor.IdLangue == "en") label = "Word not found in dictionary.";
	divLabelWordUnknown.innerHTML = label;
	tdTitle.appendChild(divLabelWordUnknown);
	
	if(vectCloseWords.length > 0)
	{
		var divLabelSuggestion = document.createElement("div");
		divLabelSuggestion.style.marginTop = "10px";
		var label = "Suggestions :";
		if(Cor.IdLangue == "en") label = "Suggestions:";
		divLabelSuggestion.innerHTML = label;
		tdTitle.appendChild(divLabelSuggestion);
	}
	
	table.appendChild(tdTitle);
	
	// Suggestion
	if(vectCloseWords.length > 0)
	{
		var tdSuggestions = document.createElement("td");
		tdSuggestions.style.paddingLeft = "20px";
	
		for(var i = 0; i < vectCloseWords.length; i++)
		{
			var closeWord = vectCloseWords[i];
			
			var divCloseWord = document.createElement("div");
			divCloseWord.className = "Syn-MotProche";
			divCloseWord.innerHTML = closeWord;
			divCloseWord.onclick = function()
			{
				var wordSt = this.innerHTML;
				
				if(typeW == "def") Dict.ClickOnDef(wordSt);
				else if(typeW == "syn") Dict.ClickOnSynonyms(wordSt);
				else if(typeW == "conj") Dict.ClickOnConj(wordSt);
				else if(typeW == "acr") Dict.ClickOnAcr(wordSt);
			}
			
			tdSuggestions.appendChild(divCloseWord);
		}
	
		table.appendChild(tdSuggestions);
	}
	
	panelDict.appendChild(table);
},

// Hide citation button.
ShowButtonCit : function(visible)
{
	if(Dict.PanelDictI != null)
	{
		var buttonCit = Dict.PanelDictI.Node.childNodes[0].childNodes[5].childNodes[0];
		
		if(visible) buttonCit.style.display = "block";
		else buttonCit.style.display = "none";
	}
}

};
