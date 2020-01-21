var Rules = {

	PanelRulesI : null,
	
	ExercChecked : false,
	
	// Component Rule
	ComponentRule : function(title, fileName, height, exerciceId, nbExercices)
	{
		this.Title = title;
		this.FileName = fileName;
		this.Height = height;
		this.ExerciceId = exerciceId;
		this.NbExercices = nbExercices;
	},
	
	// Create a chater of a rule
	CreateChapterRule : function(number, title, tabTitleRules)
	{
		var divChapterRule = document.createElement("div");
	
		var divTitle = document.createElement("div");
		divTitle.className = "Regles-SousTitreSommaire";
		divTitle.innerHTML = number + ". " + title;
		divTitle.style.marginBottom = "20px";
		divChapterRule.appendChild(divTitle);
		
		// Table Rules
		var tableRules = document.createElement("table");
		
		for(var i = 0; i < tabTitleRules.length; i++)
		{
			var componentRule = tabTitleRules[i];
		
			var tr = document.createElement("tr");
			//tr.style.paddingTop = "20px";
			
			// Label
			var divLabelRule = document.createElement("div");
			var tdRule = document.createElement("td");
			tdRule.className = "Regles-TitreRegleSommaire c-underline";
			tdRule.style.color = "#ff636e";
			//tdRule.style.marginBottom = "2px";
			tdRule.style.cursor = "pointer";
			tdRule.innerHTML = componentRule.Title;
			tdRule.FileName = componentRule.FileName;
			tdRule.Height = componentRule.Height;
			//var fileName = componentRule.FileName;
			tdRule.onclick = function()
			{
				window.scrollTo(0, 0);	// Scroll to top
				Rules.ShowRule(this.FileName, this.Height, null, null);
			};
			divLabelRule.appendChild(tdRule);
		
			tr.appendChild(divLabelRule);
			
			// Button for exercices
			if(componentRule.ExerciceId.length > 0)
			{
				var tdButtonExerc = document.createElement("td");
				tdButtonExerc.style.verticalAlign = "top";
				tdButtonExerc.className = "TdButtonExerc";
				
				var divButtonExerc = document.createElement("div");
				divButtonExerc.className = "Cor-RedButton";
				divButtonExerc.style.marginLeft = "20px";
				divButtonExerc.innerHTML = "Exercices";
				//divButtonExerc.style.marginBottom = "2px";
				divButtonExerc.style.width = "100px";
				
				if(Cor.ModeAbonnePremium == true) divButtonExerc.style.display = "block";
				else divButtonExerc.style.display = "none";
				
				//divButtonExerc.style.visibility = "hidden";
				divButtonExerc.ExerciceId = componentRule.ExerciceId;
				divButtonExerc.NbExercices = componentRule.NbExercices;
				divButtonExerc.TitleRule = componentRule.Title;
				
				divButtonExerc.onclick = function()
				{
					Rules.ShowSerieExerc(this.TitleRule, this.ExerciceId, this.NbExercices);
				};
				
				tdButtonExerc.appendChild(divButtonExerc);
			
				tr.appendChild(tdButtonExerc);
			}
			
			tableRules.appendChild(tr);
		}
		
		divChapterRule.appendChild(tableRules);
		
		return divChapterRule;
	},
	
	PanelRules : function()
	{
		var divRules = document.createElement("div");
		divRules.className = "Regles-Panel";
		//divRules.style.padding = "20px";
		divRules.id = "DivRules";
		//divRules.align = "center";
		
		// Title
		var labelTitle = document.createElement("div");
		var label = "R" + String.fromCharCode(232) + "gles d'orthographe et de grammaire";
		if(Cor.IdLangue == "en") label = "Grammar rules";
		labelTitle.innerHTML = label;
		labelTitle.className = "Regles-TitreSommaire";
		labelTitle.style.fontSize = "18px";
		labelTitle.align = "center";
		
		divRules.appendChild(labelTitle);
		
		// Rules
		var tablesChapterRules = document.createElement("table");
		//tablesChapterRules.style.marginTop = "25px";
		tablesChapterRules.style.padding = "35px 15px";
		 
		
		var td0 = document.createElement("td");
		td0.className = "td-rules col-xs-12 col-md-4 col-sm-6 c-border";
		// td0.style.paddingRight = "40px";
		//td0.style.width = "1000px";
	
		// French
		if(Cor.IdLangue == "fr")
		{
			td0.appendChild(Rules.CreateChapterRule(1, "R" + String.fromCharCode(200) + "GLES D'ACCORD DU VERBE AVEC LE SUJET",
													[new Rules.ComponentRule("Accord du verbe avec le sujet", "AccordVerbe/Accord_General_f.html", 1700, "accords_verbe_sujet", 20),
													 new Rules.ComponentRule("Participe pass" + String.fromCharCode(232), "AccordVerbe/Participe_passe_f.html", 1900, "accords_verbe_participe_passe", 20),
													 new Rules.ComponentRule("Emploi du subjonctif", "AccordVerbe/Emploi_subjonctif_f.html", 1430, "accords_verbe_subjonctif", 5)]));
	
													 
			td0.appendChild(Rules.CreateChapterRule(2, "ACCORDS",
													[new Rules.ComponentRule("Accord g" + String.fromCharCode(233) + "n" + String.fromCharCode(233) + "ral du nom et de l'adjectif", "Accords/AccordGeneralNomAdj_f.html", 1100, "accords_nom_adjectif", 5),
													 new Rules.ComponentRule("Adjectifs de couleurs", "Accords/AdjCouleur_f.html", 1100, "accords_adjectif_couleur", 3),
													 new Rules.ComponentRule("R" + String.fromCharCode(233) + "gle d'accord des nombres", "Accords/Nombres_f.html", 1100, "accords_nombre", 3),
													 new Rules.ComponentRule("Accord de \"quel que\"", "Accords/Quel_que_f.html", 1100, "accords_quel_que", 3),
													 new Rules.ComponentRule("Accord des noms de fruits et de l" + String.fromCharCode(233) + "gumes", "Accords/Ac_Fruits_Legumes_f.html", 1100, "", -1),
													 new Rules.ComponentRule("Accord de tel", "Accords/Tel_f.html", 1100, "accords_tel", 3)]));
		}
		// English
		else if(Cor.IdLangue == "en")
		{
			td0.appendChild(Rules.CreateChapterRule(1, "VERBS",
													[new Rules.ComponentRule("General verb introduction", "Verbs/General_verb_introduction_f.html", 1700, "", 0),
													 new Rules.ComponentRule("Verb-subject agreement", "Verbs/Verb_subject_agreement_f.html", 1300, "", 0),
													 new Rules.ComponentRule("Affirmative, interrogative and negative form", "Verbs/Affirmative_interrogative_negative_f.html", 900, "", 0),
													 new Rules.ComponentRule("Simple present", "Verbs/Simple_present_f.html", 2450, "", 0),
													 new Rules.ComponentRule("Simple past", "Verbs/Simple_past_f.html", 2450, "", 0),
													 new Rules.ComponentRule("Present perfect", "Verbs/Present_perfect_f.html", 2200, "", 0),
													 new Rules.ComponentRule("Past perfect", "Verbs/Past_perfect_f.html", 1000, "", 0),
													 new Rules.ComponentRule("Future", "Verbs/Future_f.html", 2300, "", 0),
													 new Rules.ComponentRule("Conditional", "Verbs/Conditional_f.html", 900, "", 0),
													 new Rules.ComponentRule("Infinitive", "Verbs/Infinitive_f.html", 1100, "", 0),
													 new Rules.ComponentRule("Gerund", "Verbs/Gerund_f.html", 800, "", 0),
													 new Rules.ComponentRule("Imperative", "Verbs/Imperative_f.html", 600, "", 0),
													 new Rules.ComponentRule("Subjunctive", "Verbs/Subjunctive_f.html", 1000, "", 0),
													 new Rules.ComponentRule("Irregular verbs", "Verbs/Irregular_verbs_f.html", 900, "", 0),
													 new Rules.ComponentRule("Question tags", "Verbs/Question_tags_f.html", 1100, "", 0),
													 new Rules.ComponentRule("Conditional sentences", "Verbs/Conditional_sentences_f.html", 900, "", 0),
													 new Rules.ComponentRule("Sequence of tenses", "Verbs/Sequence_of_tenses_f.html", 700, "", 0),
													 new Rules.ComponentRule("Reported questions", "Verbs/Reported_questions_f.html", 700, "", 0)]));
	
			td0.appendChild(Rules.CreateChapterRule(2, "PART OF SPEECH",
													 [new Rules.ComponentRule("Nouns", "PartOfSpeech/Nouns_f.html", 6500, "", 0),
													  new Rules.ComponentRule("Determiners", "PartOfSpeech/Determiners_f.html", 6300, "", 0),
													  new Rules.ComponentRule("Pronouns", "PartOfSpeech/Pronouns_f.html", 5200, "", 0),
													  new Rules.ComponentRule("Adverbs", "PartOfSpeech/Adverbs_f.html", 2800, "", 0),
													  new Rules.ComponentRule("Adjectives", "PartOfSpeech/Adjectives_f.html", 5100, "", 0),
													  new Rules.ComponentRule("Prepositions", "PartOfSpeech/Prepositions_f.html", 6200, "", 0),
													  new Rules.ComponentRule("Conjunctions", "PartOfSpeech/Conjunctions_f.html", 2850, "", 0)]));
	
		}
		
		tablesChapterRules.appendChild(td0);
		
		// Later.
		/*if(Cor.ModeAbonnePremium)
		{
			td1.appendChild(Rules.CreateChapterRule(6, "Conjugaison",
												   [new Rules.ComponentRule("Indicatif pr" + ea + "sent", "", 1100, "conjugaison_indicatif_present_simple", 4),
													new Rules.ComponentRule("Indicatif imparfait", "", 1100, "conjugaison_indicatif_imparfait", 4),
													new Rules.ComponentRule("Indicatif futur", "", 1100, "conjugaison_indicatif_futur_simple", 4),
													new Rules.ComponentRule("Pass" + ea + " simple", "", 1100, "conjugaison_indicatif_passe_simple", 3),
													new Rules.ComponentRule("Subjonctif pr" + ea + "sent", "", 1100, "conjugaison_subjonctif_present", 4),
													new Rules.ComponentRule("Conditionnel pr" + ea + "sent", "", 1100, "conjugaison_conditionnel_present", 3),
													new Rules.ComponentRule("Imp" + ea + "ratif pr" + ea + "sent", "", 1100, "conjugaison_imperatif_present", 2),
													new Rules.ComponentRule("Pass" + ea + " compos" + ea, "", 1100, "conjugaison_indicatif_passe_compose", 4),
													new Rules.ComponentRule("Plus-que-parfait", "", 1100, "conjugaison_indicatif_plus-que-parfait", 2)]));
		}*/
		
		var td2 = document.createElement("td");
		td2.className = "td-rules col-xs-12 col-md-4 col-sm-6 c-border";
		// td2.style.paddingRight = "40px";
		//td2.style.width = "1000px";
		
		// French
		if(Cor.IdLangue == "fr")
		{
			td2.appendChild(Rules.CreateChapterRule(3, "HOMONYMES",									
													[new Rules.ComponentRule("La/l" + String.fromCharCode(224) + "/l'a", "Homonymes/La_f.html", 1100, "homonymes_la_l_a", 2),
													new Rules.ComponentRule("A/" + String.fromCharCode(224), "Homonymes/A_f.html", 1100, "homonymes_homa_a", 2),
													new Rules.ComponentRule("Son/sont", "Homonymes/Son_f.html", 1100, "homonymes_son_sont", 1),
													new Rules.ComponentRule("Notre/n" + String.fromCharCode(244) + "tres", "Homonymes/Notre_f.html", 1100, "homonymes_notre_notres_votre_votres", 1),
													new Rules.ComponentRule("Ce/se", "Homonymes/Ce_f.html", 1100, "homonymes_ce_se", 1),
													new Rules.ComponentRule("C'est/s'est", "Homonymes/Cest_f.html", 1100, "homonymes_c_est_s_est_ces_ses", 1),
													new Rules.ComponentRule("Er/" + String.fromCharCode(233), "Homonymes/Eer_f.html", 1100, "homonymes_e_er", 2),
													new Rules.ComponentRule("Leur/leurs", "Homonymes/Leur_f.html", 1100, "homonymes_leur_leurs", 2),
													new Rules.ComponentRule("M" + String.fromCharCode(234) + "me/m" + String.fromCharCode(234) + "mes", "Homonymes/Meme_f.html", 1100, "homonymes_meme_memes", 1),
													new Rules.ComponentRule("On/ont", "Homonymes/On_f.html", 1100, "homonymes_on_ont", 1),
													new Rules.ComponentRule("Ou/o" + String.fromCharCode(249), "Homonymes/Ou_f.html", 1100, "homonymes_ou", 1),
													new Rules.ComponentRule("Quand/quant", "Homonymes/Quand_f.html", 1100, "homonymes_quand_quant", 1),
													new Rules.ComponentRule("Quelque/quel que", "Homonymes/Quel_que_f.html", 1100, "homonymes_quelque_quel_que", 1),
													new Rules.ComponentRule("Quelle/qu'elle", "Homonymes/Quelle_f.html", 1100, "homonymes_quelle_qu_elle", 1),
													new Rules.ComponentRule("Quelque/quelques", "Homonymes/Quelque_f.html", 1100, "homonymes_quelque_quelques", 1),
													new Rules.ComponentRule("Sa/" + String.fromCharCode(231) + "a/" + String.fromCharCode(231) + String.fromCharCode(224), "Homonymes/Sa_f.html", 1100, "homonymes_sa_ca", 2),
													new Rules.ComponentRule("Tout/toutes/tous", "Homonymes/Tout_f.html", 1100, "homonymes_tout_tous_toute_toutes", 2),
													new Rules.ComponentRule("Contre/contres", "Homonymes/Contre_f.html", 1100, "homonymes_contre_contres", 1)]));
		}
		// English
		else if(Cor.IdLangue == "en")
		{
			td2.appendChild(Rules.CreateChapterRule(3, "HOMONYMS",
													[new Rules.ComponentRule("Most commonly confused words", "Homonyms/Most_commonly_confused_words_f.html", 1600, "", 0),
													 new Rules.ComponentRule("There, their, they" + String.fromCharCode(39) + "re", "Homonyms/There_f.html", 600, "", 0),
													 new Rules.ComponentRule("Its, it" + String.fromCharCode(39) + "s", "Homonyms/Its_f.html", 500, "", 0),
													 new Rules.ComponentRule("Yours, your" + String.fromCharCode(39) + "s", "Homonyms/Yours_f.html", 400, "", 0),
													 new Rules.ComponentRule("Your, you" + String.fromCharCode(39) + "re", "Homonyms/Your_f.html", 400, "", 0),
													 new Rules.ComponentRule("For, four", "Homonyms/For_f.html", 400, "", 0),
													 new Rules.ComponentRule("To, too, two", "Homonyms/Two_f.html", 600, "", 0),
													 new Rules.ComponentRule("Whose, who" + String.fromCharCode(39) + "s", "Homonyms/Whose_f.html", 500, "", 0),
													 new Rules.ComponentRule("Then, than", "Homonyms/Then_f.html", 300, "", 0),
													 new Rules.ComponentRule("Further, farther", "Homonyms/Further_f.html", 500, "", 0),
													 new Rules.ComponentRule("Where, wear, were", "Homonyms/Where_f.html", 500, "", 0),
													 new Rules.ComponentRule("Though, thought, tough, through, throughout", "Homonyms/Though_f.html", 500, "", 0)]));
			
		}
		
		tablesChapterRules.appendChild(td2);
	
		var td3 = document.createElement("td");
		td3.className = "td-rules col-xs-12 col-md-4 col-sm-6 c-border";
		// td3.style.paddingRight = "40px";
		//td3.style.width = "1000px";
		
		// French
		if(Cor.IdLangue == "fr")
		{
			td3.appendChild(Rules.CreateChapterRule(4, "R" + String.fromCharCode(200) + "GLES D'ORTHOGRAPHE",
													[new Rules.ComponentRule("Emploi des majuscules", "Orthographe/Majuscule_f.html", 2180, "regles_ortho_majuscules", 10),
													 new Rules.ComponentRule("Pluriel des mots en ou, au, eu, eau", "Orthographe/PlurielOuAu_f.html", 1100, "regles_ortho_pluriel_mots_en_ou_au_eau_eu", 2),
													 new Rules.ComponentRule("Pluriel des mots en al et ail", "Orthographe/PlurielAlAil_f.html", 1100, "regles_ortho_pluriel_mots_en_al_ail", 2),
													 new Rules.ComponentRule("Traits d'union", "Orthographe/TraitUnion_f.html", 2140, "regles_ortho_traits_d_union", 10),
													 new Rules.ComponentRule("R" + String.fromCharCode(233) + "gles avec les accents", "Orthographe/Accents_f.html", 1100, "regles_ortho_accents", 2),
													 new Rules.ComponentRule("Accord de aucun", "Orthographe/Aucun_f.html", 1100, "regles_ortho_aucun_aucune_aucuns_aucunes", 1),
													 new Rules.ComponentRule("Accord de chacun", "Orthographe/Chacun_f.html", 1100, "regles_ortho_chacun_chacune_chacuns_chacunes", 1),
													 new Rules.ComponentRule("Ecriture de On/ On n'", "Orthographe/Onn_f.html", 1100, "regles_ortho_on_on_n", 1)]));
			
			td3.appendChild(Rules.CreateChapterRule(5, "DIVERS",	
												   [new Rules.ComponentRule("Ma/ta/sa", "Divers/MaTaSa_f.html", 1100, "divers_ma_ta_sa", 2),
												   new Rules.ComponentRule("Locutions verbales", "Divers/LocutionsVerbales_f.html", 1100, "", -1),
												   new Rules.ComponentRule("R" + String.fromCharCode(232) + "gles de typographie", "Divers/Typographie_f.html", 1100, "", -1),
												   new Rules.ComponentRule("R" + String.fromCharCode(232) + "gles de typographie pour les nombres", "Divers/Typographie_nombres_f.html", 1100, "", -1),
												   new Rules.ComponentRule("R" + String.fromCharCode(233) + "forme de l'orthographe de 1990", "Divers/Regles1990_f.html", 1950, "", -1),
												   new Rules.ComponentRule("Lexique", "Divers/Lexique_f.html", 4300, "", -1)]));
		
		}
		// English
		else if(Cor.IdLangue == "en")
		{
			td3.appendChild(Rules.CreateChapterRule(4, "MISCELLANEOUS",
													[new Rules.ComponentRule("Capitalization", "Miscellaneous/Capitalization_f.html", 4350, "", 0),
													 new Rules.ComponentRule("Punctuation", "Miscellaneous/Punctuation_f.html", 13100, "", 0),
													 new Rules.ComponentRule("The genitive case", "Miscellaneous/Genitive_case_f.html", 800, "", 0),
													 new Rules.ComponentRule("American/British English", "Miscellaneous/American_british_english_f.html", 1000, "", 0)]));
			
			td3.appendChild(Rules.CreateChapterRule(5, "TYPOGRAPHY",
													[new Rules.ComponentRule("Spacing", "Typography/Spacing_f.html", 2800, "", 0),
													 new Rules.ComponentRule("Periods", "Typography/Periods_f.html", 500, "", 0),
													 new Rules.ComponentRule("Semicolon use", "Typography/Semicolons_f.html", 900, "", 0),
													 new Rules.ComponentRule("Question mark", "Typography/Question_mark_f.html", 700, "", 0),
													 new Rules.ComponentRule("Multiple punctuation marks", "Typography/Multiple_punctuation_marks_f.html", 300, "", 0),
													 new Rules.ComponentRule("Hyphens", "Typography/Hyphens_f.html", 1500, "", 0),
													 new Rules.ComponentRule("Number format", "Typography/Number_format_f.html", 1400, "", 0),
													 new Rules.ComponentRule("Currency format", "Typography/Currency_format_f.html", 850, "", 0),
													 new Rules.ComponentRule("Writing dates", "Typography/Writing_dates_f.html", 800, "", 0),
													 new Rules.ComponentRule("Writing times", "Typography/Writing_times_f.html", 600, "", 0),
													 new Rules.ComponentRule("Use of Et cetera", "Typography/Etc_f.html", 500, "", 0),
													 new Rules.ComponentRule("Em dash and en dash", "Typography/Em_dash_en_dash_f.html", 1200, "", 0),
													 new Rules.ComponentRule("Parentheses and brackets", "Typography/Parentheses_and_brackets_f.html", 700, "", 0)]));
			
		}
		
		tablesChapterRules.appendChild(td3);
		
		divRules.appendChild(tablesChapterRules);
		
		return divRules;
	},
	


	
	// Show a rule
	ShowRule : function(fileName, height, panelRules, refPar)
	{
		var divRules = document.getElementById("DivRules");
		if(divRules == null) divRules = panelRules;
		
		// Hide panel Cor
		divRules.childNodes[0].style.display = "none";
		divRules.childNodes[1].style.display = "none";
		
		//if(divRules.childNodes.length == 3) divRules.remove(divRules.childNodes[2]);
		
		//mainDiv.style.width = "718px";
		
		// Hide the ad
		//var partRight = document.getElementById("partRight");
		//partRight.style.display = "none";
		
		// Remove the possible other panels
		//if(mainDiv.childNodes.length == 6) mainDiv.removeChild(mainDiv.childNodes[5]);
		
		// Create the panel of dictionary then add it
		var divRule = document.createElement("div");
		//divRule.className = "Regles-Panel";
		divRule.style.padding = "5px";
		
		// Button return to summary
		var buttonReturnSummary = document.createElement("div");
		buttonReturnSummary.className = "back-btn";
		var labelRetSum = "Retour au sommaire";
		if(Cor.IdLangue == "en") labelRetSum = "Back to summary";
		buttonReturnSummary.innerHTML = labelRetSum;
		buttonReturnSummary.onclick = function()
		{
			divRules.childNodes[0].style.display = "block";
			divRules.childNodes[1].style.display = "block";
			
			divRules.removeChild(divRules.childNodes[2]);
		};
		divRule.appendChild(buttonReturnSummary);
		
		// Rule frame
		var iframe = document.createElement("iframe");
		iframe.className = "Regles-FrameRegle";
		iframe.id = "XX";
		iframe.style.height = "100%";		// Doesn't work in HTML 5. must define a size.
		iframe.style.height =  height + "px";						
		iframe.src = "Exp/" + fileName;
		//if(refPar != null) iframe.src += "Exp/" + fileName + "#" + refPar;
		divRule.appendChild(iframe);
		
		divRules.appendChild(divRule);
		
		// Once the iframe is loaded, defined iframe height.
		// iframe.onload = function()
		// {
		// 	$(iframe).css('height', iframe.contentDocument.body.scrollHeight);
		// }
	
		// Once the iframe is loaded, scroll to the matching anchor.
		// if(refPar != null)
		// {
		// 	iframe.onload = function()
		// 	{
		// 		console.log('2',iframe.contentDocument);
		// 		var doc = iframe.contentDocument;
				
		// 		var els = doc.getElementsByTagName("a");
		// 		for (var i = 0, l = els.length; i < l; i++) {
		// 			var el = els[i];
		// 			if (el.name === refPar)
		// 			{
		// 				window.scrollTo(0, el.offsetTop + 130);
		// 				return;
		// 			}
		// 		}
		// 	}
		// }
		
	},
	
	// If a rule must be shown with a url parameter
	Show_SpecificRule_OnStart : function(ref_rule, panelRules)
	{
		// Rule can contaisn reference to the paragraph. Ex : Others/Punctuation_f.html#4
		var fileName = ref_rule;
		var refPar = null;
		
		var indexLastSl = ref_rule.lastIndexOf("_");
		if(indexLastSl > 0)
		{
			if(fileName.indexOf('.html') == (indexLastSl - 5))
			{
				fileName = ref_rule.substring(0, indexLastSl);
				refPar = ref_rule.substring(indexLastSl + 1, ref_rule.length);
			}
		}
		
		// Search the Component rule object matching to the file.
		var tableRules = panelRules.childNodes[1];
		
		for(var i = 0; i < tableRules.childNodes.length; i++)
		{
			var td = tableRules.childNodes[i]
			for(var u = 0; u < td.childNodes.length; u++)
			{
				var ensRules = td.childNodes[u].childNodes[1];
				for(var v = 0; v < ensRules.childNodes.length; v++)
				{
					var trRule = ensRules.childNodes[v];
					var compRule = trRule.childNodes[0].childNodes[0];
					
					// If file found, then show the rule.
					if(compRule.FileName == fileName)
					{
						Rules.ShowRule(compRule.FileName, compRule.Height, panelRules, refPar);
						return;
					}
				}
			}
		}
	},
	
	// Show an exercice
	RequestSerieExercice : function(exerciceId, nbExercices)
	{
		Util.SendHttpRequest('Exerc_Servlet',
			[['FunctionName', 'GetSerieExerc'],
			 ['IdSerieExerc', exerciceId  + "_" + nbExercices]],
			 Rules.ShowExerc);
	},
	
	// Show exercice panel
	ShowSerieExerc : function(titleRule, exerciceId, nbExercices)
	{
		var divRules = document.getElementById("DivRules");
		//divRules.style.width = "1000px";
		
		// Hide panel Cor
		divRules.childNodes[0].style.display = "none";
		divRules.childNodes[1].style.display = "none";
		
		var divSerieExerc = document.createElement("div");
		divSerieExerc.className = "Regles-Panel";
		divSerieExerc.id = "PanelExerc";
		divSerieExerc.style.position = "relative";
		
		// Title rule
		var labelTitleRule = document.createElement("div");
		labelTitleRule.className = "Regles-TitreSommaire";	
		labelTitleRule.style.marginBottom = "15px";
		labelTitleRule.style.width = "100%";
		labelTitleRule.style.textAlign = "center";
		labelTitleRule.style.fontSize = "30px";
		
		divSerieExerc.appendChild(labelTitleRule);
		labelTitleRule.innerHTML = titleRule;
		
		// Button return to summary
		var buttonReturnSummary = document.createElement("div");
		
		buttonReturnSummary.className = "back-btn c-regles-button-retour";
		buttonReturnSummary.innerHTML = " Retour au sommaire";
		buttonReturnSummary.onclick = function()
		{
			divRules.childNodes[0].style.display = "block";
			divRules.childNodes[1].style.display = "block";
			
			divRules.removeChild(divRules.childNodes[2]);
		}
		divSerieExerc.appendChild(buttonReturnSummary);
			
		
		//SELECT (select d'exercices)
		var selectExerc = document.createElement("select");	
		//selectExerc.className ="";
		selectExerc.ExerciceId = exerciceId;

		selectExerc.onchange = function()
		{
			var number = this.selectedIndex;
			if(number > 0)
			{
				Rules.RequestSerieExercice(this.ExerciceId, number);
			}
		};
		
		//liste des options
		var option = document.createElement("option");
		option.innerHTML = "-";
		selectExerc.appendChild(option);
		
		for(var i = 0; i < nbExercices; i++)
		{
			var option = document.createElement("option");
			option.innerHTML = "Exercice n" + String.fromCharCode(176) + (i + 1);
			
			selectExerc.appendChild(option);
		}
	
	
		//placements
	
		
		divSerieExerc.appendChild(selectExerc);
		
		divRules.appendChild(divSerieExerc);

		$('select').each(function(){
			var $this = $(this), numberOfOptions = $(this).children('option').length;
		
			$this.addClass('select-hidden'); 
			$this.wrap('<div class="select"></div>');
			$this.after('<div class="select-styled"></div>');

			var $styledSelect = $this.next('div.select-styled');
			$styledSelect.text($this.children('option').eq(0).text());
		
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
				$this.change();
				$list.hide();
				//console.log($this.val());
			});
		
			$(document).click(function() {
				$styledSelect.removeClass('active');
				$list.hide();
			});

		});


	},
	
	
	// Represent an exercice line
	LineExerc : function(numberLine, exercice)
	{
		var tableLineExerc = document.createElement("table");
		tableLineExerc.style.marginBottom = "5px";
		tableLineExerc.Exercice = exercice;
		
		var cntWidget = 0;
		
		// First td : number
		var td0 = document.createElement("td");
		td0.innerHTML = numberLine + ".";
		td0.className = "Exerc-ParEx";
		td0.style.paddingRight = "8px";
		tableLineExerc.appendChild(td0);
		
		for(var i = 0; i < exercice.VectTexts.length; i++)
		{
			var text = exercice.VectTexts[i];
			var td = document.createElement("td");
			
			// Add a widget
			if(text == "%X")
			{
				var vectEnsProp = exercice.VectEnsProp[cntWidget];
				
				// TextField
				if(vectEnsProp.length == 0)
				{
					var input = document.createElement("input");
					input.setAttribute("type", "text");
					if(i > 0) input.style.marginLeft = "10px";
					if(i < (exercice.VectTexts.length - 1)) input.style.marginRight = "10px";
					input.style.width = "120px";
					
					td.appendChild(input);
				
				}
				// Combo box
				else
				{
					var select = document.createElement("select");
					if(i > 0) select.style.marginLeft = "10px";
					if(i < (exercice.VectTexts.length - 1))select.style.marginRight = "10px";
					
					for(var u = 0; u < vectEnsProp.length; u++)
					{
						var option = document.createElement("option");
						
						option.innerHTML = vectEnsProp[u];
						
						select.appendChild(option);
					}
					
					td.appendChild(select);
				}
				
				cntWidget++;
			}
			// Simple text
			else
			{
				td.innerHTML = text;
			}
			
			tableLineExerc.appendChild(td);
		}
		
		return tableLineExerc;
	},
	
	// Show an exercice
	ShowExerc : function(serieExercice)
	{
		var panelExerc = document.getElementById("PanelExerc");
		
		if(panelExerc.childNodes.length >= 4)
		{
			var lg = panelExerc.childNodes.length;
			for(var i = 4; i <= lg; i++) panelExerc.removeChild(panelExerc.childNodes[3]);
		}
		// Description
		var divDescription = document.createElement("div");
		divDescription.className = "Exerc-DescExerc";
		divDescription.innerHTML = serieExercice.Description;
		divDescription.id = "DescriptionExerc";
		
		panelExerc.appendChild(divDescription);
		
		// Exemple
		if(serieExercice.Example != null)
		{
			var divExemple = document.createElement("div");
			divExemple.style.marginLeft = "30px";
			divExemple.style.marginRight = "30px";
			divExemple.style.marginBottom = "15px";
			divExemple.innerHTML ="<b>Exemple : </b>" + serieExercice.Example;
		
			panelExerc.appendChild(divExemple);
		}
		
		// Lines of exercices
		var divExerc = document.createElement("div");
		divExerc.id = "DivExerc";
		
		for(var i = 0; i < serieExercice.VectExercice.length; i++)
		{
			var lineExerc = Rules.LineExerc(i, serieExercice.VectExercice[i]);
		
			divExerc.appendChild(lineExerc);
		}
		
		panelExerc.appendChild(divExerc);
		
		// Check Button
		var divButtonCheck = document.createElement("div");
		divButtonCheck.className = "Cor-RedButton";
		divButtonCheck.id = "regles-check-button";	
		divButtonCheck.innerHTML = "Validation";
		divButtonCheck.onclick = function()
		{
			if(Rules.ExercChecked == false)
			{
				Rules.ExercChecked = true;
			
				Rules.CheckResultsExerc();
			}
		};
		
		panelExerc.appendChild(divButtonCheck);
		
		// Affichage du résultat
		var divResultat = document.createElement("div");
		divResultat.className = "Exerc-ResultatExerc";
		divResultat.style.display = "none";
		divResultat.id = "DivResultExerc";
		panelExerc.appendChild(divResultat);
		
		Rules.ExercChecked = false;
	},
	
	// Check results of the exercice.
	CheckResultsExerc : function()
	{
		var resultatNote = 0.0;
		
		// Set if the exercice concerns maj.
		var majuscule = false;
		var descExerc = document.getElementById("DescriptionExerc");
		if(descExerc.innerHTML.indexOf("pourvus ou non de majuscule.") >= 0) majuscule = true;
		
		var divExerc = document.getElementById("DivExerc");
		
		var panelExerc = document.getElementById("PanelExerc");
		
		for(var i = 0; i < divExerc.childNodes.length; i++)
		{
			var lineExerc = divExerc.childNodes[i];
			
			// Lecture de la valeur des widgets.
			var vectValues = [];
			
			for(var u = 0; u < lineExerc.childNodes.length; u++)
			{
				var element = lineExerc.childNodes[u].firstChild;
				if(element != null)
				{
					// TextField
					if(element.nodeName == "INPUT")
					{
						vectValues.push(element.value);
						element.disabled = true;
					}
					// Select
					else if(element.nodeName == "SELECT")
					{
						vectValues.push(element.value);
						element.disabled = true;
					}
				}
			}
			
			// Comparison with the values of the exercice
			var exercice = lineExerc.Exercice;
			var bonneRep = "";
					
			for(var u = 0; u < vectValues.length; u++)
			{
				var value = vectValues[u];
				var vectSol = exercice.VectEnsSol[u];
				
				var eq = false;
							
				for(var v = 0; v < vectSol.length; v++)
				{
					// On se fiche de la casse, sauf pour les exercices sur les majuscules
					if(majuscule == false)
					{
						if(vectSol[v].toUpperCase() == value.toUpperCase())
						{
							eq = true;
						}
					}
					else
					{
						if(vectSol[v] == value)
						{
							eq = true;
						}
					}
				}
					
				// Bonne réponse : on augmente d'un point ou d'un demi. 
				if(eq == true)
				{
					// Mettre en vert la comboBox afin d'avertir l'utilisateur de la bonne réponse.
					var cntBox = 0;
					for(var v = 0; v < lineExerc.childNodes.length; v++)
					{
						var element = lineExerc.childNodes[v].firstChild;
						if(element != null)
						{
							// TextField
							if(element.nodeName == "INPUT")
							{
								cntBox++;
								if((cntBox - 1) == u)
								{
									element.style.backgroundColor = "#62c174";
								}
							}
							// Select
							else if(element.nodeName == "SELECT")
							{
								cntBox++;
								if((cntBox - 1) == u)
								{
									element.style.backgroundColor = "#62c174";
								}
							}
						}
					}
					
					if(vectValues.length == 2) resultatNote = resultatNote + 0.5;
					else resultatNote = resultatNote + 1.0;
				}
				// Mauvaise réponse : On affiche la réponse.
				else
				{
					// Mettre en rouge la comboBox afin d'avertir l'utilisateur de la mauvaise réponse.
					var cntBox = 0;
					for(var v = 0; v < lineExerc.childNodes.length; v++)
					{
						var element = lineExerc.childNodes[v].firstChild;
						if(element != null)
						{
							// TextField
							if(element.nodeName == "INPUT")
							{
								cntBox++;
								if((cntBox - 1) == u)
								{
									element.style.backgroundColor = "#ee6e73";
								}
							}
							// Select
							else if(element.nodeName == "SELECT")
							{
								cntBox++;
								if((cntBox - 1) == u)
								{
									element.style.backgroundColor = "#ee6e73";
								}
							}
						}
					}
					
					for(var v = 0; v < vectSol.length; v++)
					{
						bonneRep += vectSol[v];
						if(v != (vectSol.length - 1)) bonneRep += "/";
					}
					
					if(u != (vectValues.length - 1))
					{
						bonneRep += " - ";
					}
				}
			}
			
			if(bonneRep.length > 0)
			{
				var divBonneRep = document.createElement("td");
				divBonneRep.className = "Exerc-AffReponse";
				divBonneRep.style.paddingLeft = "10px";
				divBonneRep.innerHTML = bonneRep;
				lineExerc.appendChild(divBonneRep);
			}
		}
			
		// Grise le bouton de vérification
		/*Widget wButton = verticalPanel.getWidget(verticalPanel.getWidgetCount() - 1);
		if(wButton instanceof TextButton)
		{
			TextButton button = (TextButton)wButton;
			button.setEnabled(false);
		}*/
		
		// Affichage du résultat
		var divResultat = document.getElementById("DivResultExerc");
		divResultat.style.display = "block";
		divResultat.innerHTML = "R" + String.fromCharCode(233) + "sultat : " + resultatNote + "/10";
	},
	
	// Hide exercices button in rules panel.
	ShowExercicesButton : function(visible)
	{
		if(Rules.PanelRulesI != null)
		{
			var elements = Rules.PanelRulesI.getElementsByClassName("TdButtonExerc");
			for(var i = 0; i < elements.length; i++)
			{
				var element = elements[i];
				if(visible) element.firstChild.style.display = "block";
				else element.firstChild.style.display = "none";
			}
		}
	}
	
	
	};