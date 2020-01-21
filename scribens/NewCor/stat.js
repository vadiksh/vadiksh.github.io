
var Stat = {

StatText : null,

CheckedStat : true,

PanelStat : null,

TableStat : null,

// Set if the stat has been updated
UpdatedStat : false,

// Map of PanelRb
Map_PanelRb : new Map(),

// Phrases
TableSentences : null,

// Non Affichage
RbNonAffichage : null,

// Table of occurrence
TableOccurrence1 : null,
TableOccurrence2 : null,
TableOccurrence3 : null,

// Table of number of syllable per word
TableSyllablePerWord : null,

// Init
Init : function()
{
	if(Cor.IsMobile == true) return;
	
	Stat.PanelStat = document.createElement("div");
	Stat.PanelStat.className = "Stat-StatTextePanel";
	Stat.PanelStat.style.display = "none";
	// Stat.PanelStat.style.width = "236px";
	
	// Add table stat
	Stat.AddTableStat();
	
	// Add phrase Panel
	Stat.AddPhraseStat();
	
	// Add counter Occurrence tables
	Stat.AddCounterOccStat();
	
	// Add NbSyllabeMots tables
	Stat.AddNbSyllabeMots();
	
	// var divStatSyn = document.getElementById("DivStyleSyn");
	var divStatSyn = document.getElementById("StyleTexte");
	if(Cor.IsTablet == true) divStatSyn = document.getElementById("stat-syn");
	
	// divStatSyn.appendChild(Stat.PanelStat);
	// divStatSyn.prepend(Stat.PanelStat);
	divStatSyn.insertBefore(Stat.PanelStat,null);
},

AddTableStat : function()
{
	var div = document.createElement("div");
	div.className = "Stat-PanelStat";
	div.style.paddingTop = "5px";
	div.style.marginTop = "7px";
	div.style.paddingBottom = "15px";


	var nbLines = 11;
	Stat.TableStat = new Util.TableType(nbLines, "MainTableStat");
	
	var label = "Mots";
	if(Cor.IdLangue == "en") label = "Words";
	Stat.TableStat.SetText(label, 0, 0);
	Stat.TableStat.SetText("0", 0, 1);
	var label = "Phrases";
	if(Cor.IdLangue == "en") label = "Sentences";
	Stat.TableStat.SetText(label, 1, 0);
	Stat.TableStat.SetText("0", 1, 1);
	var label = "Paragraphes";
	if(Cor.IdLangue == "en") label = "Paragraphs";
	Stat.TableStat.SetText(label, 2, 0);
	Stat.TableStat.SetText("0", 2, 1);
	var label = "Caract" + String.fromCharCode(233) + "res (avec espaces)";
	if(Cor.IdLangue == "en") label = "Characters (with spaces)";
	Stat.TableStat.SetText(label, 3, 0);
	Stat.TableStat.SetText("0", 3, 1);
	var label = "Caract" + String.fromCharCode(233) + "res (sans espaces)";
	if(Cor.IdLangue == "en") label = "Characters (without spaces)";
	Stat.TableStat.SetText(label, 4, 0);
	Stat.TableStat.SetText("0", 4, 1);
	var label = "Nombre moyen de mots par phrase";
	if(Cor.IdLangue == "en") label = "Average words per sentence";
	Stat.TableStat.SetText(label, 5, 0);
	Stat.TableStat.SetText("0", 5, 1);
	var label = "Nombre moyen de syllabes par mot";
	if(Cor.IdLangue == "en") label = "Average syllables per word";
	Stat.TableStat.SetText(label, 6, 0);
	Stat.TableStat.SetText("0", 6, 1);
	
	// Readability
	var divL0 = document.createElement("table");
	var tr = document.createElement("tr");
	var td0 = document.createElement("td");
	var label = "Lisibilit" + String.fromCharCode(232) + " : indice Flesch";
	if(Cor.IdLangue == "en") label = "Readability: Flesch index";
	td0.innerHTML = label;
	tr.appendChild(td0);
	var td1 = document.createElement("td");
	var label = Stat.ExpLisibiliteFlesch;
	if(Cor.IdLangue == 'en') label = Stat.ExpLisibiliteFlesch_En;
	var infoBulleFlesch = Util.InfoBulle(label);
	infoBulleFlesch.style.marginLeft = "8px";
	infoBulleFlesch.style.marginRight = "5px";
	td1.appendChild(infoBulleFlesch);
	tr.appendChild(td1);
	divL0.appendChild(tr);
	
	Stat.TableStat.SetNode(divL0, 7, 0);
	Stat.TableStat.SetText("0", 7, 1);
	
	var divL1 = document.createElement("table");
	var tr = document.createElement("tr");
	var td0 = document.createElement("td");
	var label = "Lisibilit" + String.fromCharCode(232) + " : indice Gunning Fog";
	if(Cor.IdLangue == 'en') label = "Readability: Gunning Fog index";
	td0.innerHTML = label;
	tr.appendChild(td0);
	var td1 = document.createElement("td");
	var label = Stat.ExpLisibiliteGF;
	if(Cor.IdLangue == 'en') label = Stat.ExpLisibiliteGF_En;
	var infoBulleGF = Util.InfoBulle(label);
	infoBulleGF.style.marginLeft = "8px";
	infoBulleGF.style.marginRight = "5px";
	td1.appendChild(infoBulleGF);
	tr.appendChild(td1);
	divL1.appendChild(tr);
	
	Stat.TableStat.SetNode(divL1, 8, 0);
	Stat.TableStat.SetText("0", 8, 1);
	
	// Time to read and time to speech
	var divTTR = document.createElement("table");
	var tr = document.createElement("tr");
	var td0 = document.createElement("td");
	var label = "Temps de lecture";
	if(Cor.IdLangue == 'en') label = "Reading time";
	td0.innerHTML = label;
	tr.appendChild(td0);
	var td1 = document.createElement("td");
	var label = Stat.ExpReadingTime_Fr;
	if(Cor.IdLangue == 'en') label = Stat.ExpReadingTime_En;
	var infoBulleGF = Util.InfoBulle(label);
	infoBulleGF.style.marginLeft = "8px";
	infoBulleGF.style.marginRight = "5px";
	td1.appendChild(infoBulleGF);
	tr.appendChild(td1);
	divTTR.appendChild(tr);
	
	Stat.TableStat.SetNode(divTTR, 9, 0);
	Stat.TableStat.SetText("0", 9, 1);
	
	var divTTS = document.createElement("table");
	var tr = document.createElement("tr");
	var td0 = document.createElement("td");
	var label = "Temps d'" + String.fromCharCode(233) + "locution";
	if(Cor.IdLangue == 'en') label = "Speaking time";
	td0.innerHTML = label;
	tr.appendChild(td0);
	var td1 = document.createElement("td");
	var label = Stat.ExpSpeakingTime_Fr;
	if(Cor.IdLangue == 'en') label = Stat.ExpSpeakingTime_En;
	var infoBulleGF = Util.InfoBulle(label);
	infoBulleGF.style.marginLeft = "8px";
	infoBulleGF.style.marginRight = "5px";
	td1.appendChild(infoBulleGF);
	tr.appendChild(td1);
	divTTS.appendChild(tr);
	
	Stat.TableStat.SetNode(divTTS, 10, 0);
	Stat.TableStat.SetText("0", 10, 1);
	div.appendChild(Stat.TableStat.Node)
	Stat.PanelStat.appendChild(div);
},

// Add phrase Panel
AddPhraseStat :  function()
{
	var div = document.createElement("div");
	div.className = "Stat-PanelStat";
	div.style.paddingTop = "5px";
	div.style.marginTop = "7px";
	div.style.paddingBottom = "15px";
	
	// Title.
	var divTitle = document.createElement("div");
	divTitle.className = "Stat-AnalyseTitre";
	var label = "Phrases";
	if(Cor.IdLangue == "en") label = "Sentences";
	divTitle.innerHTML = label;
	divTitle.style.fontWeight = "bold";
	divTitle.style.marginBottom = "5px";
	divTitle.align = "center";
	div.appendChild(divTitle);
	
	Stat.TableSentences = new Util.TableType(3, "Sentences");
	Stat.TableSentences.Node.align = "center";
	
	var labelLongS = "Longues";
	if(Cor.IdLangue == "en") labelLongS = "Long";
	Stat.TableSentences.SetText(labelLongS, 0, 0);
	Stat.TableSentences.SetText(0, 0, 1);
	
	var labelShortS = "Courtes";
	if(Cor.IdLangue == "en") labelShortS = "Short";
	Stat.TableSentences.SetText(labelShortS, 1, 0);
	Stat.TableSentences.SetText(0, 1, 1);
	
	var labelIntS = "Interrogatives";
	if(Cor.IdLangue == "en") labelIntS = "Interrogative";
	Stat.TableSentences.SetText(labelIntS, 2, 0);
	Stat.TableSentences.SetText(0, 2, 1);
	
	div.appendChild(Stat.TableSentences.Node);
	
	// No showing
	/*var table = document.createElement("table");
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
	radioBox.style.marginLeft = "20px";
	radioBox.id = "NoShowing_Stat";
	radioBox.onclick = function()
	{
		Stat.DeactivateDisplay();
	};
	
	tdRadioBox.appendChild(radioBox);
	table.appendChild(tdRadioBox);
	table.style.display = "none";		// Note. Not possible, because the request to get Stat get the total Text without tags and return tags id of sentences.
	
	div.appendChild(table);
	
	/*Stat.RbNonAffichage = new Util.PanelRb(labelNoAff, 'GPStat', '');
	Stat.RbNonAffichage.Node.style.display = "block";
	Stat.RbNonAffichage.Node.style.marginBottom = "7px";
	Stat.RbNonAffichage.Input.disabled = false;
	Stat.RbNonAffichage.Input.onclick = function()
	{
		Util.DeSurligne();
	}
	div.appendChild(Stat.RbNonAffichage.Node);*/
	
	Stat.PanelStat.appendChild(div);
},

// Funciton of deactive display
DeactivateDisplay : function()
{
	// Scroll to Pos 0
	Util.ScrollToPos(0);
	
	// Empty the mark panel
	if(Style.DivMarques != null) Style.DivMarques.innerHTML = "";

	// D�souligne les mots.
	Util.DesouligneStyle();
	
	// Hide popups.
	Cor.PopupPanelSol.SetVisible(false, false, false, true);
},

// Add counter Occurrence tables
AddCounterOccStat : function()
{
	var div = document.createElement("div");
	div.className = "Stat-PanelStat";
	div.style.paddingTop = "7px";
	div.style.marginTop = "7px";
	
	// Occ 1.
	var divTitle1 = document.createElement("div");
	divTitle1.className = "Stat-AnalyseTitre";
	var label = "Fr" + String.fromCharCode(232) + "quence de mots";
	if(Cor.IdLangue == 'en') label = "Word Pattern Occurrence";
	divTitle1.innerHTML = label;
	divTitle1.style.fontWeight = "bold";
	divTitle1.style.marginBottom = "12px";
	divTitle1.align = "center";
	div.appendChild(divTitle1);

	// divTableRep.setAttribute("id", "scrollbar");
	// divTableRep.setAttribute('data-simplebar', '');
	// divTableRep.appendChild(Style.TableRep.Node);		
	// divRepetitions.appendChild(divTableRep);

	
	var divCont1 = document.createElement("div");
	divCont1.setAttribute("id", "scrollbar");
	divCont1.setAttribute("class", "scrollbar");
	divCont1.setAttribute('data-simplebar', '');
	divCont1.style.overflow = "auto";
	divCont1.style.height = "180px";
	divCont1.style.width = "220px";
	// divCont1.style.display = 'none';
	divCont1.align = "center";
	
	Stat.TableOccurrence1 = new Util.TableType(0, "Occurrence");
	divCont1.appendChild(Stat.TableOccurrence1.Node);
	
	div.appendChild(divCont1);
	
	// Occ 2.
	var divTitle2 = document.createElement("div");
	divTitle2.className = "Stat-AnalyseTitre";
	var label = "Suite de 2 mots";
	if(Cor.IdLangue == 'en') label = "Dual-word phrase frequency";
	divTitle2.innerHTML = label;
	divTitle2.style.fontWeight = "bold";
	divTitle2.style.marginTop = "5px";
	divTitle2.style.marginBottom = "12px";
	divTitle2.align = "center";
	div.appendChild(divTitle2);
	
	var divCont2 = document.createElement("div");
	divCont2.setAttribute("id", "scrollbar");
	divCont2.setAttribute("class", "scrollbar");
	divCont2.setAttribute('data-simplebar', '');
	divCont2.style.overflow = "auto";
	divCont2.style.height = "180px";
	divCont2.style.width = "220px";
	// divCont2.style.display = 'none';
	divCont2.align = "center";
	
	Stat.TableOccurrence2 = new Util.TableType(0, "Occurrence");
	divCont2.appendChild(Stat.TableOccurrence2.Node);
	
	div.appendChild(divCont2);
	
	// Occ 3.
	var divTitle3 = document.createElement("div");
	divTitle3.className = "Stat-AnalyseTitre";
	var label = "Suite de 3 mots";
	if(Cor.IdLangue == 'en') label = "Triple-word phrase frequency";
	divTitle3.innerHTML = label;
	divTitle3.style.fontWeight = "bold";
	divTitle3.style.marginTop = "5px";
	divTitle3.style.marginBottom = "12px";
	divTitle3.align = "center";
	div.appendChild(divTitle3);
	
	var divCont3 = document.createElement("div");
	divCont3.setAttribute("id", "scrollbar");
	divCont3.setAttribute("class", "scrollbar");
	divCont3.setAttribute('data-simplebar', '');
	divCont3.style.overflow = "auto";
	divCont3.style.height = "180px";
	divCont3.style.width = "220px";
	// divCont3.style.display = 'none';
	divCont3.align = "center";
	
	Stat.TableOccurrence3 = new Util.TableType(0, "Occurrence");
	divCont3.appendChild(Stat.TableOccurrence3.Node);

	div.appendChild(divCont3);
	
	Stat.PanelStat.appendChild(div);
},

// Add NbSyllabeMots tables
AddNbSyllabeMots : function()
{
	var div = document.createElement("div");
	div.className = "Stat-PanelStat";
	div.style.paddingTop = "7px";
	div.style.marginTop = "7px";


	// Title.
	var divTitle = document.createElement("div");
	divTitle.className = "Stat-AnalyseTitre";
	var label = "Nombre de syllabes par mot";
	if(Cor.IdLangue == 'en') label = "Average syllables per word";
	divTitle.innerHTML = label;
	divTitle.style.fontWeight = "bold";
	divTitle.style.marginTop = "5px";
	divTitle.style.marginBottom = "12px";
	divTitle.align = "center";
	
	div.appendChild(divTitle);
	
	// Table of number of syllable per word
	var divCont = document.createElement("div");
	divCont.setAttribute("id", "scrollbar");
	divCont.setAttribute("class", "scrollbar");
	divCont.setAttribute('data-simplebar', '');
	divCont.style.overflow = "auto";
	divCont.style.height = "180px";
	divCont.style.width = "220px";
	divCont.align = "center";
	
	Stat.TableSyllablePerWord = new Util.TableType(0, "NbSyllablePerWords");
	divCont.appendChild(Stat.TableSyllablePerWord.Node);

	div.appendChild(divCont);
	Stat.PanelStat.appendChild(div);
},

// Unselect all radioButtons
UnselectAllRadioButtons : function()
{
	Stat.Map_PanelRb.forEach(function(panelRb)
	{
		panelRb.Input.checked = false;
	});
	
},

// Fill stats
OnSuccessStat : function(statText)
{
	if(Cor.IsMobile == true) return;
	
	if(statText != null)
	{
		Stat.StatText = statText;

		// General stats
		
		// Nombre de mots
		Stat.TableStat.SetText(statText.NbWords, 0, 1);
		// Nombre de phrases
		Stat.TableStat.SetText(statText.NbSentences, 1, 1);
		// Nombre de paragraphes
		Stat.TableStat.SetText(statText.NbParagraphs, 2, 1);
		// Nombre de caract�res
		Stat.TableStat.SetText(statText.NbCharacters, 3, 1);
		// Nombre de caract�res sans espaces
		Stat.TableStat.SetText(statText.NbCharacters_WithoutSpace, 4, 1);
		// Nombre moyen de mots par phrase
		Stat.TableStat.SetText(Math.floor(statText.AverageNbWords_PerS * 100)/100, 5, 1);
		// Nombre moyen de syllabes par mot
		Stat.TableStat.SetText(Math.floor(statText.AverageNbSyllables_PerW * 100)/100, 6, 1);
		// Indice de lisibilit� : Flesch
		Stat.TableStat.SetText(Math.floor(statText.Readability_Flesch * 100)/100 + "&nbsp%", 7, 1);	// % is more comprehensible.
		// Indice de lisibilit� : Gunning Fox.
		Stat.TableStat.SetText(Math.floor(statText.Readability_GunningFog * 100)/100, 8, 1);
		
		// Time to read. Show in minutes.
		var timeToShow = Stat.GetTimeInMinutes(statText.TimeToRead);
		Stat.TableStat.SetText(timeToShow, 9, 1);
		
		// Time to speech.
		timeToShow = Stat.GetTimeInMinutes(statText.TimeToSpeech);
		Stat.TableStat.SetText(timeToShow, 10, 1);
		
		// Densit� lexicale
		/*double nbMotLexPMot = Math.floor((((float)StatText.NbMotsLex/(float)StatText.NbMots) * 100) * 100)/100;
		GridStatNb.setHTML(7, 1, String.valueOf(nbMotLexPMot) + " %");*/
		
		// Phrases longues, phrases courtes et phrases interrogative
		var nbPhrasesLongues = 0;
		var nbPhrasesCourtes = 0;
		var nbPhrasesInt = 0;
		//Cor.AffTrace(StatText.Map_Sentences.firstKey());
		
		// Note. Not possible, because the request to get Stat get the total Text without tags and return tags id of sentences.
		for(var idPh in Stat.StatText.Map_Sentences)
		{
			var set = statText.Map_Sentences[idPh];
			if(set != null)
			{
				if(set.indexOf("pl") >= 0) nbPhrasesLongues++;
				if(set.indexOf("pc") >= 0) nbPhrasesCourtes++;
				if(set.indexOf("pi") >= 0) nbPhrasesInt++;
			}
		};
		
		Stat.TableSentences.SetText(nbPhrasesLongues, 0, 1);
		Stat.TableSentences.SetText(nbPhrasesCourtes, 1, 1);
		Stat.TableSentences.SetText(nbPhrasesInt, 2, 1);
		
		// Occurrences
		
		// Suite � 1 mot
		Stat.TableOccurrence1.BuildRows(statText.VectExpOccurrence1.length);
		
		if(statText.VectExpOccurrence1.length > 0)
		{
			for(var i = 0; i < statText.VectExpOccurrence1.length; i++)
			{
				var expOccurrence = statText.VectExpOccurrence1[i];
				
				Stat.TableOccurrence1.SetText(expOccurrence.ExpressionSt, i, 0);
				Stat.TableOccurrence1.SetText(expOccurrence.NbOccurrence, i, 1);
			}
			
			Stat.TableOccurrence1.Node.parentNode.style.display = 'block';
		}
		else
		{
			Stat.TableOccurrence1.Node.parentNode.style.display = 'none';
		}
		
		// Suite � 2 mots
		Stat.TableOccurrence2.BuildRows(statText.VectExpOccurrence2.length);
		
		if(statText.VectExpOccurrence2.length > 0)
		{
			for(var i = 0; i < statText.VectExpOccurrence2.length; i++)
			{
				var expOccurrence = statText.VectExpOccurrence2[i];
				
				Stat.TableOccurrence2.SetText(expOccurrence.ExpressionSt, i, 0);
				Stat.TableOccurrence2.SetText(expOccurrence.NbOccurrence, i, 1);
			}
			
			Stat.TableOccurrence2.Node.parentNode.style.display = 'block';
		}
		else
		{
			Stat.TableOccurrence2.Node.parentNode.style.display = 'none';
		}
		
		// Suite � 3 mots
		Stat.TableOccurrence3.BuildRows(statText.VectExpOccurrence3.length);
		
		if(statText.VectExpOccurrence3.length > 0)
		{
			for(var i = 0; i < statText.VectExpOccurrence3.length; i++)
			{
				var expOccurrence = statText.VectExpOccurrence3[i];
				
				Stat.TableOccurrence3.SetText(expOccurrence.ExpressionSt, i, 0);
				Stat.TableOccurrence3.SetText(expOccurrence.NbOccurrence, i, 1);
			}
			
			Stat.TableOccurrence3.Node.parentNode.style.display = 'block';
		}
		else
		{
			Stat.TableOccurrence3.Node.parentNode.style.display = 'none';
		}
		
		// Nombre de syllabes par mot
		Stat.TableSyllablePerWord.BuildRows(statText.VectSyllableNbWords.length);
		
		if(statText.VectSyllableNbWords.length > 0)
		{
			for(var i = 0; i < statText.VectSyllableNbWords.length; i++)
			{
				var syllabeNbMots = statText.VectSyllableNbWords[i];
				
				var nbSyllabeSt = "";
				if(syllabeNbMots.NbSyllables < 4) nbSyllabeSt = syllabeNbMots.NbSyllables;
				else nbSyllabeSt = ">= 4";
				
				Stat.TableSyllablePerWord.SetText(nbSyllabeSt, i, 0);
				Stat.TableSyllablePerWord.SetText(syllabeNbMots.NbWords, i, 1);
				Stat.TableSyllablePerWord.SetText(Math.floor(((syllabeNbMots.NbWords/statText.NbWords) * 100) * 100)/100 + " %", i, 2);
			}
			
			Stat.TableSyllablePerWord.Node.parentNode.style.display = 'block';
		}
		else
		{
			Stat.TableSyllablePerWord.Node.parentNode.style.display = 'none';
		}
		
		// Set UpdatedStat to true.
		Stat.UpdatedStat = true;
	}
},

// Show the time in minutes
GetTimeInMinutes : function(timeInSecond)
{
	var rest = timeInSecond % 60;
	var nbMin = (timeInSecond - rest)/60;
	
	if(nbMin > 0)
	{
		return nbMin + "min" + rest + "s";
	}
	else
	{
		return rest + "s";
	}
},

ExpLisibiliteFlesch : "<p>L'indice Flesch est la m" + String.fromCharCode(233) + "thode de calcul de lisibilit" + String.fromCharCode(233) + " la plus c" + String.fromCharCode(233) + "l" + String.fromCharCode(232) + "bre.</p>" +
					  "<p>Plus l'indice tend vers 100, plus le texte est lisible.</p>" +
					  "<p>" + String.fromCharCode(192) + " l'inverse, plus l'indice tend vers 0, moins il l'est.</p>" +
					  "<p>Pour la plupart des textes, une valeur entre 60 et 70 est conseill" + String.fromCharCode(233) + "e.</p>",

ExpLisibiliteFlesch_En : "<p>The Flesch algorithm is the most commonly used readeablity test.</p>" +
						 "<p>The closer the index is to 100, the easier it is to read.</p>" +
						 "<p>The closer to 0, the more difficult it is to read.</p>" +
						 "<p>For most texts, a value of around 60 or 70 is ideal.</p>",

ExpLisibiliteGF : "<p>L'indice Gunning Fog est une m" + String.fromCharCode(233) + "thode pour " + String.fromCharCode(233) +"valuer la lisibilit" + String.fromCharCode(233) + " d'un texte.</p>" +
				  "<p>Plus l'indice tend vers 0, plus le texte est lisible.</p>" +
				  "<p>" + String.fromCharCode(192) + " l'inverse, plus l'indice tend vers 20, moins il l'est.</p>",

ExpLisibiliteGF_En : "<p>The Gunning Fog algorithm is another famous method to evaluate readablity of a text.</p>" +
					 "<p>The closer the index is to 0, the easier it is to read.</p>" +
					 "<p>The closer to 20, the more difficult it is to read.</p>",

ExpReadingTime_Fr : "<p>Le temps de lecture mesure le temps pour lire le texte.</p>" +
					"<p>La moyenne de vitesse de lecture est de 250 mots par minute pour un adulte.</p>",

ExpReadingTime_En : "<p>The reading time mesures the time to read the text.</p>" +
					"<p>The average reading time speed is 300 words per minute for an adult.</p>",

ExpSpeakingTime_Fr : "<p>Le temps d'" + String.fromCharCode(233) + "locution mesure le temps pour lire " + String.fromCharCode(224) + " haute voix le texte.</p>" +
					 "<p>Le temps moyen d'" + String.fromCharCode(233) + "locution est de 150 mots par minute pour un adulte.</p>",

ExpSpeakingTime_En : "<p>The speaking time mesures the time to speak the text.</p>" +
					  "<p>The average speaking time speed is 130 words per minute for an adult.</p>"

};
