
var Options = {

// Window of options.
WindowOptions : function()
{

	// Td with label and select
	this.CreateTrSelect = function(label, tabValue, info, id)
	{
		var tr = document.createElement("tr");
		
		var tdLabel = document.createElement("td");
		
		if(info.length == 0)
		{
			tdLabel.className = "Cor-LabelOption";
			tdLabel.innerHTML = label; 
		}
		// label with infobulles
		else
		{
			var tableI = document.createElement("table");
			
			var td0 = document.createElement("td");
			td0.className = "Cor-LabelOption";
			td0.innerHTML = label; 
			tableI.appendChild(td0);
			
			var td1 = document.createElement("td");
			var infInfoBulle = Util.InfoBulle(info);
			infInfoBulle.style.marginLeft = "10px";
			td1.appendChild(infInfoBulle);
			tableI.appendChild(td1);
			
			tdLabel.appendChild(tableI);
		}
		
		tr.appendChild(tdLabel);
		
		var tdSelect = document.createElement("td");
		tdSelect.style.paddingLeft = "40px";
		
		var select = document.createElement("select");
		select.id = id;
		
		for(var i = 0; i < tabValue.length; i++)
		{
			var option = document.createElement("option");
			option.innerHTML = tabValue[i][0];
			option.value = tabValue[i][1];
			select.appendChild(option);
		}
		
		tdSelect.appendChild(select);
		
		tr.appendChild(tdSelect);
		
		return tr;
	};

	// Td with label and select
	this.CreateTrRange = function(label, ValueMin, ValueMax, info, id, def)
	{
		var tr = document.createElement("tr");
		
		var tdLabel = document.createElement("td");
		
		if(info.length == 0)
		{
			tdLabel.className = "Cor-LabelOption";
			tdLabel.innerHTML = label; 
		}
		// label with infobulles
		else
		{
			var tableI = document.createElement("table");
			
			var td0 = document.createElement("td");
			td0.className = "Cor-LabelOption";
			td0.innerHTML = label; 
			tableI.appendChild(td0);
			
			var td1 = document.createElement("td");
			var infInfoBulle = Util.InfoBulle(info);
			infInfoBulle.style.marginLeft = "10px";
			td1.appendChild(infInfoBulle);
			tableI.appendChild(td1);
			
			tdLabel.appendChild(tableI);
		}
		
		tr.appendChild(tdLabel);
		
		var tdRange = document.createElement("td");
		tdRange.style.paddingLeft = "40px";
		
		var range = document.createElement("input");
		range.type = "range";
		range.id = id;
		range.className = "slider-range";
		range.setAttribute("min", ValueMin);
		range.setAttribute("max", ValueMax);
		if (def) {
			range.setAttribute("value", def);
		} else {
			tabSt = Style.OptionsStyleSt.split("|");
			range.setAttribute("value", this.GetValueOfOption(info, tabSt));
		}
		

		var number = document.createElement("p");
		number.className = "number-range";
		number.innerHTML = range.value;

		tdRange.appendChild(range);
		tdRange.appendChild(number);
		tr.appendChild(tdRange);
 

		range.oninput = function() {
		  number.innerHTML = this.value;
		}
		
		return tr;
	};
		
	// Div Cor
	this.CreateDivCor = function()
	{
		// Genre
		var div = document.createElement("div");
		//div.id = 'Cor';
		div.style.marginTop = '20px';
		div.style.width = '650px';
		
		var table = document.createElement("table");
			
		if(Cor.IdLangue == "fr")
		{
			table.appendChild(this.CreateTrSelect("Genre de 'Je' :", [["Ind" + String.fromCharCode(233) + "fini", 0], ["Masculin", 1], ["F" + String.fromCharCode(233) + "minin", 2]], "", "Genre_Je"));
			table.appendChild(this.CreateTrSelect("Genre de 'Tu' :", [["Ind" + String.fromCharCode(233) + "fini", 0], ["Masculin", 1], ["F" + String.fromCharCode(233) + "minin", 2]], "", "Genre_Tu"));
			table.appendChild(this.CreateTrSelect("Genre de 'Nous' :", [["Ind" + String.fromCharCode(233) + "fini", 0], ["Masculin", 1], ["F" + String.fromCharCode(233) + "minin", 2]], "", "Genre_Nous"));
			table.appendChild(this.CreateTrSelect("Genre de 'Vous' :", [["Ind" + String.fromCharCode(233) + "fini", 0], ["Masculin singulier", 1], ["F" + String.fromCharCode(233) + "minin singulier", 2], ["Masculin pluriel", 3], ["F" + String.fromCharCode(233) + "minin pluriel", 4], ["Masculin ou f" + String.fromCharCode(233) + "minin singulier", 5], ["Masculin ou f" + String.fromCharCode(233) + "minin pluriel", 6]], "", "Genre_Vous"));
			table.appendChild(this.CreateTrSelect("Genre de 'On' :", [["Ind" + String.fromCharCode(233) + "fini", 0], ["Masculin pluriel", 1], ["F" + String.fromCharCode(233) + "minin pluriel", 2], ["Masculin ou f" + String.fromCharCode(233) + "minin pluriel", 3]], "", "Genre_On"));
		}
		else
		{
			table.appendChild(this.CreateTrSelect("British English / American English vocabulary", [["All", -1], ["British English", 0], ["American English", 1]], "", "SettingsUsBr"));
			// Font size of the document

			var trSelectFontSize = this.CreateTrRange("Font size of the document", 15, 30, "", "SettingsFontSize", 17);
			trSelectFontSize.childNodes[0].style.paddingTop = "17px";
			trSelectFontSize.childNodes[1].style.paddingTop = "17px";
			table.appendChild(trSelectFontSize);
		}
		
		div.appendChild(table);
		
		var tableOpt = document.createElement("table");
		tableOpt.style.marginTop = "20px";


			
		if(Cor.IdLangue == "fr")
		{
			// Reforme
			//titre
			var tr0 = document.createElement("tr"); // creation d'un element TR
			tr0.id = "SettingsCorRef"; // donne un ID
			tr0.className = "switch switch--horizontal"; // donne une classe
			
			var td0 = document.createElement("td"); // créé un element td pour la ligne
			td0.className = "Cor-LabelOption"; // donne une classe
			td0.innerHTML = "* Prise en compte de la r" + String.fromCharCode(233) + "forme de l'orthographe de 1990"; // insere dans le html
			tr0.appendChild(td0); // place dans la ligne l'elemtn td(le contenu html)
						
			var td1 = document.createElement("td");
			td1.type = "radio";
			var input1 = document.createElement("input");
			// input1.setAttribute("value", "yes");
			input1.id = "I1-a";
			// input1.setAttribute("checked", "checked");
			input1.type = "radio";
			input1.setAttribute("name", "I1");
			td1.appendChild(input1);
			input1.onclick = function fun(e) {
				if (this.checked = true){
					$(this).parent().parent().find('.toggle-outside').removeClass('right');
					$(this).parent().parent().find('.toggle-outside').addClass('left');
				}  
			}
			tr0.appendChild(td1);
			
			var td2 = document.createElement("label");
			td2.setAttribute("for", "I1-a");
			td2.className = "Cor-LabelOption";
			var labelYes = "Oui";
			if(Cor.IdLangue == "en") labelYes = "Yes";
			td2.innerHTML = labelYes;
			tr0.appendChild(td2);
			
			var td3 = document.createElement("td");
			var input2 = document.createElement("input");
			input2.type = "radio";
			input2.setAttribute("name", "I1");
			// input2.setAttribute("value", "no");
			input2.id = "I1-b";
			td3.appendChild(input2);
			input2.onclick = function fun() {
				if (this.checked = true){
					$(this).parent().parent().find('.toggle-outside').removeClass('left');
					$(this).parent().parent().find('.toggle-outside').addClass('right');
				}  
			}
			tr0.appendChild(td3);
			
			var td4 = document.createElement("label");
			td4.setAttribute("for", "I1-b");
			td4.className = "Cor-LabelOption";
			var labelNo = "Non";
			if(Cor.IdLangue == "en") labelNo = "No";
			td4.innerHTML = labelNo;
			tr0.appendChild(td4);

			var span3 = document.createElement("span");
			span3.setAttribute("class", "toggle-outside");
			var span4 = document.createElement("span");
			span4.setAttribute("class", "toggle-inside");
			span3.appendChild(span4); 
			tr0.appendChild(span3);
		
		
			tableOpt.appendChild(tr0);
		}
		
		// Show solutions of unknown proper nouns.
		if(Cor.IdLangue == "en")
		{
			var tr1 = document.createElement("tr");
			tr1.id = "SettingsShowUPSol";
			tr1.className = "switch switch--horizontal";
			
			var td0 = document.createElement("td");
			td0.className = "Cor-LabelOption"; 
			var labelShowNpUnkSol = "Show solutions of unknown proper nouns.";
			td0.innerHTML = labelShowNpUnkSol;
			tr1.appendChild(td0);
			
			var td1 = document.createElement("td");
				
			var input1 = document.createElement("input");
			input1.type = "radio";
			input1.setAttribute("name", "L2");
			// input1.setAttribute("value", "yes");
			input1.id = "L2-a";
			// input1.setAttribute("checked", "checked");
			td1.appendChild(input1);
			input1.onclick = function fun(e) {
				if (this.checked = true){
					$(this).parent().parent().find('.toggle-outside').removeClass('right');
					$(this).parent().parent().find('.toggle-outside').addClass('left');
				}  
			}
			tr1.appendChild(td1);
			
			var td2 = document.createElement("label");
			td2.setAttribute("for", "L2-a");
			var labelYes = "Oui";
			if(Cor.IdLangue == "en") labelYes = "Yes";
			td2.innerHTML = labelYes;
			tr1.appendChild(td2);
			
			var td3 = document.createElement("td"); 
			var input2 = document.createElement("input");
			input2.type = "radio";
			input2.setAttribute("name", "L2");
			// input2.setAttribute("value", "no");
			input2.id = "L2-b";
			td3.appendChild(input2);
			input2.onclick = function fun() {
				if (this.checked = true){
					$(this).parent().parent().find('.toggle-outside').removeClass('left');
					$(this).parent().parent().find('.toggle-outside').addClass('right');
				}  
			}
			tr1.appendChild(td3);
			
			var td4 = document.createElement("label");
			td4.setAttribute("for", "L2-b");
			var labelNo = "Non";
			if(Cor.IdLangue == "en") labelNo = "No";
			td4.innerHTML = labelNo;
			tr1.appendChild(td4);
			
			var span1 = document.createElement("span");
			span1.setAttribute("class", "toggle-outside");
			var span2 = document.createElement("span");
			span2.setAttribute("class", "toggle-inside");
			span1.appendChild(span2); 

			tr1.appendChild(span1);
			tableOpt.appendChild(tr1);
		}
		
		// Auto correct when pasting.
		var tr1 = document.createElement("tr"); //création d'une ligne TR
		tr1.id = "SettingsAutoCorrectPaste"; // donne un id
		tr1.className = "switch switch--horizontal"; // donne une classe
		
		var td0 = document.createElement("td");
		td0.className = "Cor-LabelOption";
		var labelCorAut = "* Correction automatique suite au collage d'un texte.";
		if(Cor.IdLangue == "en") labelCorAut = "Autocorrect after pasting a text.";
		td0.innerHTML = labelCorAut;
		tr1.appendChild(td0);
		
		var td1 = document.createElement("td");
		td1.type = "radio";
		var input1 = document.createElement("input");
		// input1.setAttribute("value", "yes");
		input1.id = "I2-a";
		// input1.setAttribute("checked", "checked");
		input1.type = "radio";
		input1.setAttribute("name", "I2");
		td1.appendChild(input1);
		input1.onclick = function fun(e) {
			if (this.checked = true){
				$(this).parent().parent().find('.toggle-outside').removeClass('right');
				$(this).parent().parent().find('.toggle-outside').addClass('left');
			}  
		}
		
		tr1.appendChild(td1);
		
		var td2 = document.createElement("label");
		td2.setAttribute("for", "I2-a");
		td2.className = "Cor-LabelOption";
		var labelYes = "Oui";
		if(Cor.IdLangue == "en") labelYes = "Yes";
		td2.innerHTML = labelYes;
		tr1.appendChild(td2);
		
		var td3 = document.createElement("td");
		var input2 = document.createElement("input");
		input2.type = "radio";
		input2.setAttribute("name", "I2");
		// input2.setAttribute("value", "no");
		input2.id = "I2-b";
		td3.appendChild(input2);
		input2.onclick = function fun() {
			if (this.checked = true){
					$(this).parent().parent().find('.toggle-outside').removeClass('left');
					$(this).parent().parent().find('.toggle-outside').addClass('right');
			}  
		}
		tr1.appendChild(td3);
		
		var td4 = document.createElement("label");
		td4.setAttribute("for", "I2-b");
		td4.className = "Cor-LabelOption";
		var labelNo = "Non";
		if(Cor.IdLangue == "en") labelNo = "No";
		td4.innerHTML = labelNo;
		tr1.appendChild(td4);

		var span3 = document.createElement("span");
		span3.setAttribute("class", "toggle-outside");
		var span4 = document.createElement("span");
		span4.setAttribute("class", "toggle-inside");
		span3.appendChild(span4); 

		tr1.appendChild(span3);
		
		tableOpt.appendChild(tr1);
		
		div.appendChild(tableOpt);
		
		if(Cor.IdLangue == "fr")
		{
			// Informations save
			var divInf = document.createElement("div");
			divInf.className = "Cor-LabelOption";
			divInf.style.fontSize = '12px';
			divInf.innerHTML = "* Ces param" + String.fromCharCode(232) + "tre seront sauvegard" + String.fromCharCode(233) + "s lors des prochaines sessions.";
			div.appendChild(divInf);
		}
		
		this.MainDiv.appendChild(div);
	};
	
	// Div Style
	this.CreateDivStyle = function()
	{
		var div = document.createElement("div");
		//div.id = 'Style';
		div.style.marginTop = '20px';
		div.style.display = "none";
		div.style.width = '650px';
		
		var table = document.createElement("table");
		
		var labelMinRep = "Nombre minimal de mots r" + String.fromCharCode(233) + "p" + String.fromCharCode(233) + "t" + String.fromCharCode(233) + "s :";
		if(Cor.IdLangue == "en") labelMinRep = "Minimum word repeated";
		table.appendChild(this.CreateTrRange(labelMinRep, 2, 10, "", "OptionsStyleRepMin"));
		// table.appendChild(this.CreateTrSelect(labelMinRep, [["2", 2], ["3", 3], ["4", 4], ["5", 5], ["6", 6], ["7", 7], ["8", 8], ["9", 9], ["10", 10]], "", "OptionsStyleRepMin"));
		
		var labelGapRep = "Ecart maximal entre les r" + String.fromCharCode(233) + "p" + String.fromCharCode(233) + "titions (en nombre de phases)";
		var labelAllText = "Tout le texte";
		if(Cor.IdLangue == "en")
		{
			labelGapRep = "Maximum gap between repetitions (in number of sentences)";
			labelAllText = "All the text";
		}
		table.appendChild(this.CreateTrSelect(labelGapRep, [["1", 1], ["2", 2], ["3", 3], ["4", 4], ["5", 5], ["6", 6], ["7", 7], ["8", 8], ["9", 9], ["10", 10], ["20", 20], ["30", 30], ["40", 40], ["50", 50], [labelAllText, 100000]], "", "OptionStyleEcartRep"));
		
		var labelAllWordsRep = "Prise en compte de tous les types de mots (pronoms, d" + String.fromCharCode(233) + "terminants, etc.)";
		var tabValues = [["Non", 0], ["Oui", 1]];
		var info = Options.RensOptionTtMot;
		if(Cor.IdLangue == "en")
		{
			labelAllWordsRep = "All types of words checked (pronouns, determiners, etc.)";
			tabValues = [["No", 0], ["Yes", 1]];
			info = Options.RensOptionTtMot_En;
		}
		table.appendChild(this.CreateTrSelect(labelAllWordsRep, tabValues, info, "OptionsStyleAllWords"));
	
		if(Cor.IdLangue == "fr")
		{
			table.appendChild(this.CreateTrSelect("Prise en compte des familles de mots", [["Oui", 1], ["Non", 0]], Options.RensOptionFamMot, "OptionsStyleFamilyWords"));
		}
		
		div.appendChild(table);
		
		this.MainDiv.appendChild(div);
	};
	
	// Div Others
	this.selectCustom = function(){
		$('select').each(function(){
			var $this = $(this), numberOfOptions = $(this).children('option').length;
		
			$this.addClass('select-hidden'); 
			$this.wrap('<div class="select"></div>');
			$this.after('<div class="select-styled"></div>');

			var $styledSelect = $this.next('div.select-styled');
			$styledSelect.text($this.children('option:selected').text());
		
			var $list = $('<ul />', {
				'class': 'select-options'
			}).insertAfter($styledSelect);
		
			for (var i = 0; i < numberOfOptions; i++) {
				$('<li />', {
					text: $this.children('option').eq(i).text(),
					rel: $this.children('option').eq(i).val()
				}).appendTo($list);
			}
		
			var $listItems = $list.children('li');
		
			$styledSelect.click(function(e) {
				e.stopPropagation();
				$('div.select-styled.active').not(this).each(function(){
					$(this).removeClass('active').next('ul.select-options').hide();
				});
				$(this).toggleClass('active').next('ul.select-options').toggle();
			});
		
			$listItems.click(function(e) {
				e.stopPropagation();
				$styledSelect.text($(this).text()).removeClass('active');
				$this.val($(this).attr('rel'));
				$list.hide();
			});
		
			$(document).click(function() {
				$styledSelect.removeClass('active');
				$list.hide();
			});

		});
	}

	// Div Others
	this.CreateDivOthers = function()
	{
		var div = document.createElement("div");
		div.style.marginTop = '20px';
		div.style.display = "none";
		div.style.width = '650px';
		
		var table = document.createElement("table");
		
		var labelLgMinPh = "Longueur minimale des phrases longues (nombre de mots)";
		if(Cor.IdLangue == "en") labelLgMinPh = "Minimum number of words of run-on sentences.";
		table.appendChild(this.CreateTrRange(labelLgMinPh, 15, 100, "", "OptionsOtherMinPhLg"));
		// table.appendChild(this.CreateTrSelect(labelLgMinPh, [["15", 15], ["16", 16], ["17", 17], ["18", 18], ["19", 19], ["20", 20], ["21", 21], ["22", 22], ["23", 23], ["24", 24], ["25", 25], ["26", 26], ["27", 27], ["28", 28], ["29", 29], ["30", 30], ["31", 31], ["32", 32], ["33", 33], ["34", 34], ["35", 35], ["36", 36], ["37", 37], ["38", 38], ["39", 39], ["40", 40], ["45", 45], ["50", 50], ["55", 55], ["60", 60], ["65", 65], ["70", 70], ["75", 75], ["80", 80], ["85", 85], ["90", 90], ["95", 95], ["100", 100]], "", "OptionsOtherMinPhLg"));
		
		var labelLgMaxPh = "Longueur maximale des phrases courtes (nombre de mots)";
		if(Cor.IdLangue == "en") labelLgMaxPh = "Maximum number of words of short sentences.";
		table.appendChild(this.CreateTrRange(labelLgMaxPh, 1, 6, "", "OptionsOtherMinPhCt"));
		// table.appendChild(this.CreateTrSelect(labelLgMaxPh, [["1", 1], ["2", 2], ["3", 3], ["4", 4], ["5", 5], ["6", 6]], "", "OptionsOtherMinPhCt"));

		var labelTTR = "Temps de lecture (mots par minute)";
		if(Cor.IdLangue == "en") labelTTR = "Time to read (words per minutes)";
		var trSelect = this.CreateTrSelect(labelTTR, [["200 (lent, " + String.fromCharCode(233) + "tudiant en " + String.fromCharCode(233) + "cole primaire)", 200], ["250 (moyenne d'un adulte)", 250], ["350 (rapide, " + String.fromCharCode(233) + "tudiant en universit" + String.fromCharCode(233) + ")", 350]], "", "OptionsOtherTTR");
		if(Cor.IdLangue == "en") trSelect = this.CreateTrSelect(labelTTR, [["150 (third-grade students)", 150], ["250 (eight-grade students)", 250], ["300 (average adult)", 300], ["450 (average college student)", 450], ["575 (average \"high level exec\")", 575], ["675 (average college professor)", 675], ["1,500 (speed readers)", 1500]], "", "OptionsOtherTTR");
		trSelect.childNodes[0].style.paddingTop = "10px";
		trSelect.childNodes[1].style.paddingTop = "10px";
		
		table.appendChild(trSelect);
			
		var labelTTS = "Temps d'" + String.fromCharCode(233) + "locution (mots par minute)";
		if(Cor.IdLangue == "en") labelTTS = "Time to speak (words per minutes)";
		var trSelect = this.CreateTrSelect(labelTTS, [["100 (lent)", 100], ["150 (moyenne d'un adulte)", 150], ["200 (rapide, m" + String.fromCharCode(233) + "dias)", 200]], "", "OptionsOtherTTS");
		if(Cor.IdLangue == "en") trSelect = this.CreateTrSelect(labelTTS, [["100 (slow)", 100], ["130 (average adult)", 130], ["160 (fast)", 160]], "", "OptionsOtherTTS");
		trSelect.childNodes[0].style.paddingTop = "10px";
		trSelect.childNodes[1].style.paddingTop = "10px";
		
		table.appendChild(trSelect);
		
		div.appendChild(table);
		
		this.MainDiv.appendChild(div);
	};
	
	// Create buttons
	this.CreateButtons = function()
	{
		var divButtons = document.createElement("div");
		divButtons.setAttribute("align", "center");
		divButtons.setAttribute("class", "buttons");
		if(Cor.IdLangue == "fr") divButtons.style.marginTop = "150px";
		
		var table = document.createElement("div");
		
		var tr = document.createElement("tr");
		
		var td0 = document.createElement("td");
		
		var buttonOK = document.createElement("div");
		buttonOK.setAttribute("class", "Cor-RedButton");
		//buttonOK.style.width = "120px";
		buttonOK.style.paddingLeft = "40px";
		buttonOK.style.paddingRight = "40px";
		buttonOK.style.marginRight = "10px";
		buttonOK.innerHTML = "OK";
		
		var th = this;
		var popupBase = this.PopupBase;
		buttonOK.addEventListener('click', function()
		{
			th.SaveCookies();
			
			// Save also the EcartRep data
			var eltEcartMotRep = document.getElementById("OptionStyleEcartRep");
			if(eltEcartMotRep != null)
			{
				Style.EcartMotRep = eltEcartMotRep.value;
			}
		
			popupBase.SetVisible(false);
		});

		table.appendChild(buttonOK); 
		
		var td1 = document.createElement("td");
		
		var buttonCancel = document.createElement("div");
		buttonCancel.setAttribute("class", "Cor-RedButton cancel");
		//buttonOK.style.width = "120px";
		buttonCancel.style.paddingLeft = "24px";
		buttonCancel.style.paddingRight = "24px";
		
		if(Cor.IdLangue == 'fr') buttonCancel.innerHTML = "Annuler";
		else if(Cor.IdLangue == 'en') buttonCancel.innerHTML = "Cancel";
		
		buttonCancel.addEventListener('click', function()
		{
			// Hide the window
			popupBase.SetVisible(false);
		});
		
		table.appendChild(buttonCancel); 
	 
		
		divButtons.appendChild(table);
	
		//this.MainDiv.appendChild(divButtons);
		this.PopupBase.Node.appendChild(divButtons);
		// this.PopupBase.Node.childNodes[1].appendChild(divButtons);
	};
	
	// Fill values with cookies
	this.FillValues = function()
	{
		var tabSt = Cor.OptionsCorSt.split("|");
		
		// Options cor
		if(Cor.IdLangue == 'fr')
		{
			// Genres
			var eltGenre_Je = document.getElementById("Genre_Je");
			this.SetValueToSelect(eltGenre_Je, this.GetValueOfOption("Genre_Je", tabSt));	
			var eltGenre_Tu = document.getElementById("Genre_Tu");
			this.SetValueToSelect(eltGenre_Tu, this.GetValueOfOption("Genre_Tu", tabSt));	
			var eltGenre_Nous = document.getElementById("Genre_Nous");
			this.SetValueToSelect(eltGenre_Nous, this.GetValueOfOption("Genre_Nous", tabSt));
			var eltGenre_Vous = document.getElementById("Genre_Vous");
			this.SetValueToSelect(eltGenre_Vous, this.GetValueOfOption("Genre_Vous", tabSt));
			var eltGenre_On = document.getElementById("Genre_On");
			this.SetValueToSelect(eltGenre_On, this.GetValueOfOption("Genre_On", tabSt));
			
			// Autres options
			var valueCorRef = this.GetValueOfOption("RefOrth", tabSt);
			var elt1 = document.getElementById("SettingsCorRef");
			
			if(valueCorRef == "1")
			{
				$('#SettingsCorRef .toggle-outside').addClass('left');
				elt1.childNodes[1].firstChild.checked = true;
				elt1.childNodes[3].firstChild.checked = false;
			}
			else
			{
				$('#SettingsCorRef .toggle-outside').addClass('right');
				elt1.childNodes[1].firstChild.checked = false;
				elt1.childNodes[3].firstChild.checked = true;
			}
			
			// AutoCorrectPaste
			var elt2 = document.getElementById("SettingsAutoCorrectPaste");
			
			if(Cor.AutoCorrect_AfterPaste == true)
			{
				$('#SettingsAutoCorrectPaste .toggle-outside').addClass('left');
				elt2.childNodes[1].firstChild.checked = true;
				elt2.childNodes[3].firstChild.checked = false;
			}
			else
			{
				$('#SettingsAutoCorrectPaste .toggle-outside').addClass('right');
				elt2.childNodes[1].firstChild.checked = false;
				elt2.childNodes[3].firstChild.checked = true;
			}
		}
		// English
		else
		{
			// UsBr
			var eltUsBr = document.getElementById("SettingsUsBr");
			this.SetValueToSelect(eltUsBr, this.GetValueOfOption("UsBr", tabSt));
			
			// Font Size
			var eltFontSize = document.getElementById("SettingsFontSize");
			this.SetValueToSelect(eltFontSize, this.GetValueOfOption("FontSize", tabSt));
			
			// Show unknown proper nouns solutions
			var eltShowUNSol = document.getElementById("SettingsShowUPSol");
			var valueShowUNSol = this.GetValueOfOption("ShowUPSol", tabSt);
			
			if(valueShowUNSol == "1")
			{
				$('#SettingsShowUPSol .toggle-outside').addClass('left');
				eltShowUNSol.childNodes[1].firstChild.checked = true;
				eltShowUNSol.childNodes[3].firstChild.checked = false;
			}
			else
			{
				$('#SettingsShowUPSol .toggle-outside').addClass('right');
				eltShowUNSol.childNodes[1].firstChild.checked = false;
				eltShowUNSol.childNodes[3].firstChild.checked = true;
			}
			
			// AutoCorrectPaste
			var elt2 = document.getElementById("SettingsAutoCorrectPaste");
			
			if(Cor.AutoCorrect_AfterPaste == true)
			{
				$('#SettingsAutoCorrectPaste .toggle-outside').addClass('left');
				elt2.childNodes[1].firstChild.checked = true;
				elt2.childNodes[3].firstChild.checked = false;
			}
			else
			{
				$('#SettingsAutoCorrectPaste .toggle-outside').addClass('right');
				elt2.childNodes[1].firstChild.checked = false;
				elt2.childNodes[3].firstChild.checked = true;
			}
		}
		
		// Style
		tabSt = Style.OptionsStyleSt.split("|");
		
		var elt0 = document.getElementById("OptionsStyleRepMin");
		this.SetValueToSelect(elt0, this.GetValueOfOption("RepMin", tabSt));
		
		var elt1 = document.getElementById("OptionStyleEcartRep");
		this.SetValueToSelect(elt1, this.GetValueOfOption("GapRep", tabSt));
		
		var elt2 = document.getElementById("OptionsStyleAllWords");
		this.SetValueToSelect(elt2, this.GetValueOfOption("AllWords", tabSt));
		
		if(Cor.IdLangue == "fr")
		{
			var elt3 = document.getElementById("OptionsStyleFamilyWords");
			this.SetValueToSelect(elt3, this.GetValueOfOption("FamilyWords", tabSt));
		}
		
		// Others
		var elt0 = document.getElementById("OptionsOtherMinPhLg");
		this.SetValueToSelect(elt0, this.GetValueOfOption("MinPhLg", tabSt));
		
		var elt1 = document.getElementById("OptionsOtherMinPhCt");
		this.SetValueToSelect(elt1, this.GetValueOfOption("MinPhCt", tabSt));
		
		var elt2 = document.getElementById("OptionsOtherTTR");
		this.SetValueToSelect(elt2, this.GetValueOfOption("Ttr", tabSt));
		
		var elt3 = document.getElementById("OptionsOtherTTS");
		this.SetValueToSelect(elt3, this.GetValueOfOption("Tts", tabSt));
		
	}
	
	// Get value of options
	this.GetValueOfOption = function(optionTitle, tabSt)
	{
		for(var i = 0; i < tabSt.length; i++)
		{
			var option = tabSt[i];
			
			var ind2p = option.indexOf(":");
		
			var optionT = option.substring(0, ind2p);
			var value = option.substring(ind2p + 1, option.length);
			
			if(optionT == optionTitle)
			{
				return value;
			}
		}
		
		return "";
	}
	
	// Set value of a select element.
	this.SetValueToSelect = function(selectElt, value)
	{
		for(var i = 0; i < selectElt.childNodes.length; i++)		// .value = is prohibited by Edge.
		{
			var selectOption = selectElt.childNodes[i];
			if(selectOption.value == value) {
				$(selectOption).attr('selected', 'selected');
				selectElt.selectedIndex = i;
				return;
			}
		}
	}

	var th = this;

	// Create the main popup
	this.PopupBase = new Util.PopupBase(1);
	this.PopupBase.Node.style.zIndex = '200';
	
	this.MainDiv = document.createElement("div");
	if(Cor.IdLangue == 'fr') this.MainDiv.style.width = "100%";
	else if(Cor.IdLangue == 'en') this.MainDiv.style.width = "100%";
	this.MainDiv.style.height = "295px";

	// Create title
	var title = document.createElement("div");
	title.className = "titre";
	if(Cor.IdLangue == "en") title.innerHTML = "Options";
	else if(Cor.IdLangue == "fr") title.innerHTML = 'Options';
	
	// Create the tabs
	var ul = document.createElement("ul");
	if(Cor.ModeAbonnePremium == true) {
		ul.className = "Cor-TabOptions Tabs tabs-number-3";
	} else {
		ul.className = "Cor-TabOptions Tabs tabs-number-1";
	}
	ul.style.marginTop = '10px';
	
	// Cor
	var li_Cor = document.createElement("li");
	li_Cor.className = "Cor-LiOptions Tabs__tab Tab active";
	// li_Cor.style.backgroundColor = "#ccc";
	
	li_Cor.onclick = function(event){th.OpenDiv(event, 0);};
	var a_Cor = document.createElement("a");
	
	var labelCor = "Correcteur";
	if(Cor.IdLangue == "en") labelCor = "Spellcheck";
	a_Cor.innerHTML = labelCor;

	li_Cor.appendChild(a_Cor);
	ul.appendChild(li_Cor);
	
	// Style
	var li_Style = document.createElement("li");
	li_Style.className = "Cor-LiOptions Tabs__tab Tabs";
	li_Style.id = "Options_Style";
	li_Style.onclick = function(event){th.OpenDiv(event, 1);};
	var a_Style = document.createElement("a");
	a_Style.innerHTML = "Style";
	
	if(Cor.ModeAbonnePremium == true) li_Style.style.display = "block";
	else li_Style.style.display = "none";

	li_Style.appendChild(a_Style);
	ul.appendChild(li_Style);
	
	// Others
	var li_Others = document.createElement("li");
	li_Others.className = "Cor-LiOptions Tabs__tab Tab";
	li_Others.id = "Options_Others";
	li_Others.onclick = function(event){th.OpenDiv(event, 2);};
	var a_Others = document.createElement("a");
	var labelOthers = "Autres";
	if(Cor.IdLangue == "en") labelOthers = "Others";
	a_Others.innerHTML = labelOthers;
	
	if(Cor.ModeAbonnePremium == true) li_Others.style.display = "block";
	else li_Others.style.display = "none";

	li_Others.appendChild(a_Others);
	ul.appendChild(li_Others);

	// slider
	var li_Slider = document.createElement("li");
	li_Slider.className = "Cor-LiSlider Tabs__tab Tab Tabs__presentation-slider";
	li_Slider.id = "Options_Slider";
	li_Slider.onclick = function(event){th.OpenDiv(event, 2);};
	var a_Slider = document.createElement("a");
	var labelSlider = "Slider";
	if(Cor.IdLangue == "en") labelSlider = "Slider";
	a_Slider.innerHTML = labelSlider;
	
	if(Cor.ModeAbonnePremium == true) li_Slider.style.display = "block";
	else li_Slider.style.display = "none";

	li_Slider.appendChild(a_Slider);
	ul.appendChild(li_Slider);
	
	// this.MainDiv.appendChild(title);
	this.PopupBase.Node.appendChild(title);


	this.MainDiv.appendChild(ul);
	
	// Create the divs
	this.CreateDivCor();
	
	this.CreateDivStyle();
	
	this.CreateDivOthers();
	
	this.PopupBase.Node.childNodes[1].appendChild(this.MainDiv);
	
	// Buttons
	this.CreateButtons();

	
	
	document.body.appendChild(this.PopupBase.Node);
	
	// Function show
	this.Show = function()
	{
		// Fill values
		this.FillValues();
	
		// Show the popup
		this.PopupBase.SetVisible(true);
	};
	
	// Show the popup once it has been created
	this.Show();
	
	// Open div event
	this.OpenDiv = function(event, index)
	{
		var mainDiv = this.MainDiv;

		for(var i = 1; i < mainDiv.childNodes.length; i++)
		{
			var tab = mainDiv.childNodes[i];
			if(i == (index + 1)) tab.style.display = 'block';
			else tab.style.display = 'none';
		}
		
		var target = event.target;
		var parentNode = target.parentNode.parentNode;
		for(var i = 0; i < parentNode.childNodes.length; i++)
		{
			var li = parentNode.childNodes[i].firstChild;
			// if(li == target) li.parentNode.style.backgroundColor = "#ccc";

			$('Prem-PopupVPremium .Cor-LiOptions').removeClass('active');

			if(li == target) li.parentNode.classList.add('active');
			// else li.parentNode.style.backgroundColor = "#f1f1f1";
			else li.parentNode.classList.remove('active');
		}
	};
	
	this.selectCustom();

	// Validate the choice. Save values in the cookies.
	this.SaveCookies = function()
	{
		// Options Cor.
		var optionsCor_Prec = Cor.OptionsCorSt;
		
		if(Cor.IdLangue == "fr")
		{
			var optionsCookiesSt = "AffExp:1" + "|";
			Cor.OptionsCorSt = "";
			
			// Genre
			var eltGenre_Je = document.getElementById("Genre_Je");
			Cor.OptionsCorSt += "Genre_Je:" + eltGenre_Je.value + "|";
			var eltGenre_Tu = document.getElementById("Genre_Tu");
			Cor.OptionsCorSt += "Genre_Tu:" + eltGenre_Tu.value + "|";
			var eltGenre_Nous = document.getElementById("Genre_Nous");
			Cor.OptionsCorSt += "Genre_Nous:" + eltGenre_Nous.value + "|";
			var eltGenre_Vous = document.getElementById("Genre_Vous");
			Cor.OptionsCorSt += "Genre_Vous:" + eltGenre_Vous.value + "|";
			var eltGenre_On = document.getElementById("Genre_On");
			Cor.OptionsCorSt += "Genre_On:" + eltGenre_On.value + "|";
			
			// Reforme Cor
			var elt1 = $("#SettingsCorRef .toggle-outside");
			
			if($(elt1).hasClass('left'))
			{
				optionsCookiesSt += "RefOrth:1";
				Cor.OptionsCorSt += "RefOrth:1";
			}
			else
			{
				optionsCookiesSt += "RefOrth:0";
				Cor.OptionsCorSt += "RefOrth:0";
			}
			
			// AutoCorrect after pasting
			var elt2 = $("#SettingsAutoCorrectPaste .toggle-outside");
			optionsCookiesSt += "|";
			
			if($(elt2).hasClass('left'))
			{
				optionsCookiesSt += "AutoCorrectPaste:1";
				Cor.AutoCorrect_AfterPaste = true;
			}
			else
			{
				optionsCookiesSt += "AutoCorrectPaste:0";
				Cor.AutoCorrect_AfterPaste = false;
			}
			
			Util.SetCookie("OptionCor", optionsCookiesSt, 5000);
		}
		else if(Cor.IdLangue == "en")
		{
			// UsBr
			var eltUsBr = document.getElementById("SettingsUsBr");
			var optionsCookiesSt = "UsBr:" + eltUsBr.value;
			Cor.OptionsCorSt = "UsBr:" + eltUsBr.value;
			
			// Font size
			var eltFontSize = document.getElementById("SettingsFontSize");
			optionsCookiesSt += "|" + "FontSize:" + eltFontSize.value;
			Cor.OptionsCorSt += "|" + "FontSize:" + eltFontSize.value;
			
			// Apply the new font size
			TextEditor.FontSize = eltFontSize.value;
			TextEditor.Document.body.style.fontSize = TextEditor.FontSize + "px";
			
			// Show solutions of unknown proper nouns.
			var eltShowUPSol = document.getElementById("SettingsShowUPSol");
			
			if(eltShowUPSol.childNodes[1].firstChild.checked == true)
			{
				optionsCookiesSt += "|" + "ShowUPSol:1";
				Cor.OptionsCorSt += "|" + "ShowUPSol:1";
			}
			else
			{
				optionsCookiesSt += "|" + "ShowUPSol:0";
				Cor.OptionsCorSt += "|" + "ShowUPSol:0";
			}
			
			// AutoCorrect after pasting
			var elt2 = document.getElementById("SettingsAutoCorrectPaste");
			optionsCookiesSt += "|";
			
			if(elt2.childNodes[1].firstChild.checked == true)
			{
				optionsCookiesSt += "AutoCorrectPaste:1";
				Cor.AutoCorrect_AfterPaste = true;
			}
			else
			{
				optionsCookiesSt += "AutoCorrectPaste:0";
				Cor.AutoCorrect_AfterPaste = false;
			}
			
			Util.SetCookie("OptionCor_En", optionsCookiesSt, 5000);
		}
		
		// Options Style
		var optionsStyle_Prec = Style.OptionsStyleSt;
		
		var optionsCookiesSt = "";
		Style.OptionsStyleSt = "";
			
		var elt0 = document.getElementById("OptionsStyleRepMin");
		optionsCookiesSt += "RepMin:" + elt0.value + "|";
		Style.OptionsStyleSt += "RepMin:" + elt0.value + "|";
		
		var elt1 = document.getElementById("OptionStyleEcartRep");
		optionsCookiesSt += "GapRep:" + elt1.value + "|";
		Style.OptionsStyleSt += "GapRep:" + elt1.value + "|";
		
		var elt2 = document.getElementById("OptionsStyleAllWords");
		optionsCookiesSt += "AllWords:" + elt2.value + "|";
		Style.OptionsStyleSt += "AllWords:" + elt2.value + "|";
		
		if(Cor.IdLangue == "fr")
		{
			var elt3 = document.getElementById("OptionsStyleFamilyWords");
			optionsCookiesSt += "FamilyWords:" + elt3.value;
			Style.OptionsStyleSt += "FamilyWords:" + elt3.value + "|";
		}
		else
		{
			optionsCookiesSt += "FamilyWords:" + "0";
			Style.OptionsStyleSt += "FamilyWords:" + "0" + "|";
		}
		
		Util.SetCookie("OptionStyle", optionsCookiesSt, 5000);	
		
		// Others
		var optionsCookiesSt = "";
		
		var elt0 = document.getElementById("OptionsOtherMinPhLg");
		optionsCookiesSt += "MinPhLg:" + elt0.value + "|";
		Style.OptionsStyleSt += "MinPhLg:" + elt0.value + "|";
		
		var elt1 = document.getElementById("OptionsOtherMinPhCt");
		optionsCookiesSt += "MinPhCt:" + elt1.value + "|";
		Style.OptionsStyleSt += "MinPhCt:" + elt1.value + "|";
		
		var elt2 = document.getElementById("OptionsOtherTTR");
		optionsCookiesSt += "Ttr:" + elt2.value + "|";
		Style.OptionsStyleSt += "Ttr:" + elt2.value + "|";
		
		var elt3 = document.getElementById("OptionsOtherTTS");
		optionsCookiesSt += "Tts:" + elt3.value;
		Style.OptionsStyleSt += "Tts:" + elt3.value;
		
		Util.SetCookie("OptionAutres", optionsCookiesSt, 5000);
		
		// If options changed, need to recheck all the text.
		if((optionsCor_Prec != Cor.OptionsCorSt) ||
		   (optionsStyle_Prec != Style.OptionsStyleSt))
		{
			Cor.FirstRequest = true;
		}
	};
	
	
},

// Set to abonne
SetModeAbonne : function(modeAbonnePremium)
{
	var optionsStyle = document.getElementById("Options_Style");
	var optionsOthers = document.getElementById("Options_Others");
	
	if(optionsStyle != null && optionsOthers != null)
	{
		if(modeAbonnePremium == false)
		{
			optionsStyle.style.display = "none";
			optionsOthers.style.display = "none";
		}
		else
		{
			optionsStyle.style.display = "block";
			optionsOthers.style.display = "block";
		}
	}
},

// Load Settings from Cookies
LoadSettings_FromCookies : function()
{
	// Option Cor
	
	// FM PL and AffExp by default.
	Cor.OptionsCorSt = 'Genre_Je:0|Genre_Tu:0|Genre_Nous:0|Genre_Vous:0|Genre_On:0';
	
	// Fran�ais
	if(Cor.IdLangue == 'fr')
	{
		// Autres options
		var valueCookieSt = Util.GetCookie("OptionCor");
		if(valueCookieSt == null || valueCookieSt.length == 0) valueCookieSt = "AffExp:1|RefOrth:0|AutoCorrectPaste:0";
	
		tabSt = valueCookieSt.split("|");
		
		// Reforme orthographe
		if(tabSt.length >= 2)
		{
			Cor.OptionsCorSt += '|' + valueCookieSt;
		}
		else Cor.OptionsCorSt += ";0";	// Former system
		
		// Autocorrect when pasting
		if(tabSt.length >= 3)
		{
			var valueAutoCPaste = tabSt[2].split(":")[1];
			if(valueAutoCPaste == '1') Cor.AutoCorrect_AfterPaste = true;
			else Cor.AutoCorrect_AfterPaste = false;
		}
	}
	// English
	else
	{
		// UsBr
		var valueCookieSt = Util.GetCookie("OptionCor_En");
		if(valueCookieSt == null || valueCookieSt.length == 0) valueCookieSt = "UsBr:-1|AutoCorrectPaste:0|FontSize:15|ShowUPSol:1";
		
		tabSt = valueCookieSt.split("|");
		if(tabSt.length >= 1)
		{
			// UsBr
			Cor.OptionsCorSt = valueCookieSt;
		}
		else Cor.OptionsCorSt += ";-1";	// Former system
		
		for(var optSt in tabSt)
		{
			// Autocorrect when pasting
			if(optSt.indexOf('AutoCorrectPaste:') == 0)
			{
				var valueAutoCPaste = optSt.split(":")[1];
				if(valueAutoCPaste == '1') Cor.AutoCorrect_AfterPaste = true;
				else Cor.AutoCorrect_AfterPaste = false;
			}
			// Fontsize
			else if(optSt.indexOf('FontSize:') == 0)
			{
				TextEditor.FontSize = optSt.split(":")[1];
			}
		}
	}
	
	// Options Style
	Style.OptionsStyleSt = "";
	
	var valueCookieSt = Util.GetCookie("OptionStyle");
	if(valueCookieSt == null || valueCookieSt.length == 0) valueCookieSt = "RepMin:3|GapRep:3|AllWords:0|FamilyWords:0";
	
	var tabSt = valueCookieSt.split("|");
	if(tabSt.length >= 4)
	{
		Style.OptionsStyleSt = valueCookieSt;
			
		// NMostUsedWords
		//Style.OptionsStyleSt += ";3000";
	}
	else Style.OptionsStyleSt += "3;3;0;0;3000";	// Former system
	
	// Others
	valueCookieSt = Util.GetCookie("OptionAutres");
	if(valueCookieSt == null || valueCookieSt.length == 0)
	{
		valueCookieSt = "MinPhLg:30|MinPhCt:5|Ttr:250|Tts:150";
		if(Cor.IdLangue == 'en') valueCookieSt = "MinPhLg:30|MinPhCt:5|Ttr:300|Tts:130";
	}
	
	var tabSt = valueCookieSt.split("|");
	if(tabSt.length >= 2)
	{
		Style.OptionsStyleSt += "|" + valueCookieSt;
	}
	else
	{
		// Former system
		if(Cor.IdLangue == 'fr') Style.OptionsStyleSt += ";30;5;250;150";
		else if(Cor.IdLangue == 'en') Style.OptionsStyleSt += ";30;5;300;130";
	}
	
},

// Renseignement pour les options
RensOptionTtMot : "<p>D" + String.fromCharCode(233) + "termine si la d" + String.fromCharCode(233) + "tection prend en compte tous les types de mots, </p>" +
				  "<p>c'est " + String.fromCharCode(224) + " dire " + String.fromCharCode(233) + "galement les mots tr" + String.fromCharCode(232) + "s utilis" + String.fromCharCode(233) + "s : d" + String.fromCharCode(233) + "terminant (le, les, etc.), pronoms (je, tu, il, etc), etc.</p>",

RensOptionTtMot_En : "<p>Set if the detection of repetitions applies to all types of words : conjunctions, determiners, etc.</p>",

RensOptionFamMot : "<p>D" + String.fromCharCode(233) + "termine si la d" + String.fromCharCode(233) + "tection prend en compte les mots r" + String.fromCharCode(233) + "p" + String.fromCharCode(233) + "t" + String.fromCharCode(233) + "s appartenant " + String.fromCharCode(224) + " une m" + String.fromCharCode(234) + "me famille.</p>" +
				   "<p>Par exemple : carillon, carilloneur, carilloner, carillonement, carilloniste, ect.</p>",

RensOptionFamMot_En : "<p>Set if the detection of repetitions applies to word families.</p>" +
			 		  "<p>For example : happy, happiness, unhappy, ect.</p>",

};