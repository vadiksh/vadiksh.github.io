
// Namespace
var TextEditor = {

// The document
Document : null,

// The window
Window : null,

TimeTimer : 500,

TimeTimerAfterPaste : 500,

KeyPress : false,

PosRelativeCursorAdd : -1,

PosAbsCursorAdd : "",

PosAbsEndSel : "",

PosAbsStartSel : "",

// Font size
FontSize : 17,

StoredNodeIE : null,

SetKeyDown : new Set(),

// Explanation text to paste
ExplanationPasteText : true,

// TextArea enti�rement initialis�
Ready : false,	

// Ensemble des touches clavier alphaNum
SetKeybAlphaNum : new Set(),

// Ensemble des touches sp�ciales pour Firefox (celles qui se se diff�rencient des autres).
SetKeybAlphaNumFirefox : new Set(),

// Ensemble des touches sp�ciales pour Chrome (celles qui se se diff�rencient des autres).
SetKeybAlphaNumChrome : new Set(),

// Ensemble des touches sp�ciales pour IE (celles qui se se diff�rencient des autres).
SetKeybAlphaNumIE : new Set(),
	
// Ensemble des touches sp�ciales pour Safari (celles qui se se diff�rencient des autres).
SetKeybAlphaNumSafari : new Set(),

// Set text pur
// Extract the node Body element and put the HTML text.
SetTextHTML : function(textHTML)
{	
	var html = document.createElement("html");
	html.innerHTML = textHTML;
	
	var nodeBody = null;
	for(var i = 0; i < html.childNodes.length; i++)
	{
		var node = html.childNodes[i];
		if(node.nodeName == 'BODY')
		{
			nodeBody = node;
			
			// Remove the all the textNodes. There must be only <p>.
			var tabTextNodeSupp = [];
			for(var u = 0; u < nodeBody.childNodes.length; u++)
			{
				if(nodeBody.childNodes[u].nodeName == '#text') tabTextNodeSupp.push(nodeBody.childNodes[u]);
			}
			for(var u = 0; u < tabTextNodeSupp.length; u++) nodeBody.removeChild(tabTextNodeSupp[u]);
			
			break;
		}
	}
	
	if(nodeBody != null)
	{
		TextEditor.Document.body.innerHTML = nodeBody.innerHTML;
	}
},
	
// Comme SetTextHTML mais ne provoque pas de focus.
// Exclusivement r�serv� � un bug de FF. Le setContent provoque un focus. La position du range de la s�lection est mauvaise une fois le focus apparu.
SetTextHTMLFirstFF : function(text)
{
	TextEditor.Document.body.innerHTML = text;
},

// Get total content.
GetTotalContent : function(firstRequest)
{
	var nodeBody = TextEditor.Document.body;
	
	var textHtml = '';
	
	for(var i = 0; i < nodeBody.childNodes.length; i++)		// Parcours des <p>
	{
		var nodeP = nodeBody.childNodes[i];
		
		for(var u = 0; u < nodeP.childNodes.length; u++)
		{
			var nodePhrase = nodeP.childNodes[u];
			if(nodePhrase.nodeName == 'BR') textHtml = textHtml + '<br>';
			else
			{
				if(Cor.IsIEBefore10) textHtml = textHtml + nodePhrase.nodeValue; 	// Node de type text
				else textHtml = textHtml + nodePhrase.textContent;
			}
		}
	}
	
	// Bug : lors de la 1ere requête, lorsque la frame n'est pas encore charg�e, le textHTML peut �tre vide. On alors TextEditor.Document.body = text + <p></p>
	if(textHtml.length == 0 && firstRequest == true)
	{
		var txtRestIn = nodeBody.innerHTML;
		if(txtRestIn !== "<br>") {
			if(txtRestIn.endsWith('<p></p>'))
			{
				textHtml = txtRestIn.substring(0, txtRestIn.length - 7);
			}
		}
	}

	textHtml = '<p>' + textHtml + '</p>';
	
	return textHtml;
},

// Get total content HTML (for plugin)
GetTotalContentPlugin : function()
{
	var nodeBody = TextEditor.Document.body;
	
	var textHtml = "";
	
	for(var i = 0; i < nodeBody.childNodes.length; i++)		// Parcours des <p>
	{
		var nodeP = nodeBody.childNodes[i];
		textHtml = textHtml + '<p>' + nodeP.textContent + '</p>';
	}
	
	return textHtml;
},

// Get total HTML content
GetTotalContentHTML : function()
{
	var nodeBody = TextEditor.Document.body;
	return nodeBody.innerHTML;
},

// Get Brut Text
GetBrutText : function()
{
	return TextEditor.Document.body.textContent;
},

Enable : function(enable)
{
	var nodeBody = TextEditor.Document.body;
	
	//document.designMode = 'Off';
	if(enable == false) nodeBody.setAttribute('contenteditable', 'false');
	else nodeBody.setAttribute('contenteditable', 'true');
},

// Vérifie si le texte a changé. Quand on déclanche la fonctioN, il y a de très fortes chances.
CheckTexte : function()
{
	// Ancien système, très gourmand en ressources processeurs.
	if(Cor.IsIE && !Cor.IsIE11)
	{
		Util.CheckNoeudPhrase();
	}
	else
	{
		// Déduit simplement les phrases modifiés à partir du curseur.
		TextEditor.SetPhModifieByCursor();
	}
},

// Event on click on the textArea
ClickOnText : function(pos_X, pos_Y)
{
	var motSol = false;
	//String pos = PresentationTransfUtil.GetSynMot();

	// En mode plugin, pour IE, cela corresponds à un focus
	if(Plugins.Type != null)
	{
		// Enregistre la window handle.
		Plugins.RegisterWindowHandle();
		
		if(Cor.IsIE || Cor.IsIE11)
		{
			Plugins.FocusWindow(false);
		}
	}
	
	// iPhone and iPad. Remove the explanation paste text (auto spellcheck problem).
	if(Cor.IsIOS == true && (Cor.IsMobile == true || Cor.IsTablet == true))
	{
		if(TextEditor.ExplanationPasteText == true)
		{
			TextEditor.ExplanationPasteText = false;
			TextEditor.Document.body.innerHTML = "<p></p>";
			
			return;
		}
	}
	
	try{
	
		var motSol_Cor = false;
		var motSol_Style = false;
	
		// Cor
		var nodeSel = TextEditor.GetNode_Selected();
		if(nodeSel != null)
		{
			var id = nodeSel.getAttribute("id");
			if(id != null && id.length > 0)
			{
				var tabId = id.split("-");
				for(var i = 0; i < tabId.length; i++)
				{
					var idPart = tabId[i];
				
					var motSolution = Cor.MapMotsSolution.get(tabId[i]);
					if(motSolution != null)
					{
						motSol_Cor = true;
						Cor.PopupPanelSol.SetSolutions_Cor(motSolution.vectSolution, motSolution.ExplicationSolution, nodeSel, idPart, pos_X, pos_Y);
						if (motSolution.ExplicationSolution != "<p>Mot inconnu du dictionnaire.</p>" && motSolution.ExplicationSolution != "<p>Cet ensemble de mot est incorrect.</p>" ) {
							if ($('.Cor-PopupPanelListeSol.open').is(':visible')) {
								$('.Cor-PopupPanelExpSol.open').css('top', $('.Cor-PopupPanelListeSol.open').offset().top + $('.Cor-PopupPanelListeSol.open').outerHeight() + 15 );
							} else {
								$('.Cor-PopupPanelExpSol.open').css('top', pos_Y + $('.Cor-PopupPanelListeSol.open').outerHeight() + 15 );
							}
						} else {
							if ($('.Cor-PopupPanelListeSol.open').is(':visible')) {
								$('.Cor-PopupPanelExpSol.open').css('top', $('.Cor-PopupPanelListeSol.open').offset().top + $('.Cor-PopupPanelListeSol.open').outerHeight() + 15 );
							} else {
								$('.Cor-PopupPanelExpSol.open').css('top',  $('.Cor-PopupPanelExpSol.open').offset().top);
							}
						}
						break;
					}
				}
			}
		}
		
		if(motSol_Cor == false)
		{
			Cor.PopupPanelSol.SetVisible(false, true, true, false);
		}
		
		// Synonyms
		var checkBoxSyn = document.getElementById("checkBoxSyn");
		if(checkBoxSyn != null && checkBoxSyn.checked == true)
		{
			var idSyn = Util.GetIdSynCursor();
				
			if(idSyn != null && idSyn.length > 0)
			{
				var ensSolutionExp = Style.StyleText.Map_ExpressionSol[idSyn];
				if(ensSolutionExp != null)
				{
					Style.PanelSynI.SetVisible_LabelNoSyn(false);
					Style.PanelSynI.FillSyn(ensSolutionExp);
				}
			}
			else
			{
				Style.PanelSynI.SetVisible_LabelNoSyn(true);
			}
		}
		
		// Style
		var nodeSel = TextEditor.GetNode_Selected();
		if(nodeSel != null)
		{
			var id = nodeSel.getAttribute("id");
			var tabId = id.split("-");
			for(var i = 0; i < tabId.length; i++)
			{
				var idPart = tabId[i];
				
				var ensSolutionExp = Style.StyleText.Map_ExpressionSol[idPart];
				if(ensSolutionExp != null)
				{
					var className = nodeSel.className;
					if(className != null)
					{
						if((className.indexOf("s-ja") >= 0) ||
						   (className.indexOf("u-bl") >= 0))
						{
							// IHM Control. We must do an IHM control because an underlined word or expression can have several style solutions (Ex : register)
							if(Style.Control_StyleSol(ensSolutionExp))
							{
								motSol_Style = true;
								Cor.PopupPanelSol.SetSolutions_Style(ensSolutionExp.VectSolutionExp, ensSolutionExp.Type, ensSolutionExp.Explication, nodeSel, idPart, pos_X, pos_Y);
								if($('.Cor-PopupPanelExpSol.open').is(':visible')) {
									$('.Cor-PopupPanelListeSol.second-infobulle').css('top', $('.Cor-PopupPanelExpSol.open').offset().top + $('.Cor-PopupPanelExpSol.open').outerHeight() -  2 );
								}
								if ($('.Cor-PopupPanelListeSol.second-infobulle').is(':visible')) {
									$('.Cor-PopupPanelExpSol.second-infobulle').css('top', $('.Cor-PopupPanelListeSol.second-infobulle').offset().top + $('.Cor-PopupPanelListeSol.second-infobulle').outerHeight() + 15 );
								} else if ($('.Cor-PopupPanelListeSol.open').is(':visible')) {
									$('.Cor-PopupPanelExpSol.second-infobulle').css('top', $('.Cor-PopupPanelListeSol.open').offset().top + $('.Cor-PopupPanelListeSol.open').outerHeight() + 15 );
								}
							}
						}
					}
				}
			}
		}
		
		// Style sentence.
		var nodeSentenceSel = TextEditor.GetNodeSentence_Selected();
		if(nodeSentenceSel != null)
		{
			var idPh = nodeSentenceSel.getAttribute("id");
			
			var ensSolutionExp = null;
			for(var id in Style.StyleText.Map_ExpressionSol)
			{
				if(id.indexOf(idPh) == 0)
				{
					var ensSolutionExpId = Style.StyleText.Map_ExpressionSol[id];
					// IHM Control. We must do an IHM control because an underlined word or expression can have several style solutions (Ex : register)
					if(Style.Control_StyleSol(ensSolutionExpId))
					{
						ensSolutionExp = ensSolutionExpId;
						break;
					}
				}
			}
			
			if(ensSolutionExp != null)
			{
				var className = nodeSentenceSel.className;
				if(className != null)
				{
					if((className.indexOf("s-ja") >= 0) ||
					   (className.indexOf("u-bl") >= 0))
					{
						motSol_Style = true;
						Cor.PopupPanelSol.SetSolutions_Style(ensSolutionExp.VectSolutionExp, "Sentence", ensSolutionExp.Explication, nodeSentenceSel, idPh, pos_X, pos_Y);
						if ($('.Cor-PopupPanelExpSol.open').is(':visible') && !$('.Cor-PopupPanelListeSol.open').is(':visible')) {
							$('.Cor-PopupPanelExpSol.open').css('top', $('.Cor-PopupPanelExpSol.second-infobulle').offset().top + $('.Cor-PopupPanelExpSol.second-infobulle').outerHeight() + 15 );
						}
						$('.Cor-PopupPanelExpSol.second-infobulle').css('top', $('.Cor-PopupPanelExpSol.open').offset().top + $('.Cor-PopupPanelExpSol.open').outerHeight() + 15);
					}
				}
			}
		}
		
		if(motSol_Style == false)
		{
			Cor.PopupPanelSol.SetVisible(false, false, true, false);
		}
		
		/*if((motSol_Style == false) && (motSol_Cor == false))
		{
			Cor.PopupPanelSol.SetVisible(false, false, false, true);
		}*/
	}
	catch(ex){}
},

// Get the selected node
GetNode_Selected : function()
{
	var document = TextEditor.Document;
	var window = TextEditor.Window;
	
	if(Cor.IsIE == false)
	{
		if(window.getSelection)
		{
			var selection = window.getSelection();
			var node = selection.anchorNode.parentNode;
			return node;
		}
	}
	// IE
	else
	{
		if(document.selection)
		{
			var selection = document.selection;
			var node = selection.createRange().parentElement();
			return node;
		}
	}
},

// Get the sentence node
GetNodeSentence_Selected : function()
{
	var document = TextEditor.Document;
	var window = TextEditor.Window;
	var node = null;
	if(Cor.IsIE == false)
	{
		if(window.getSelection)
		{
			var selection = window.getSelection();
			node = selection.anchorNode.parentNode;
		}
	}
	// IE
	else
	{
		if(document.selection)
		{
			var selection = document.selection;
			node = selection.createRange().parentElement();
		}
	}
	
	for(var i = 0; i < 4; i++)
	{
		if(node)
		{
			if(node.nodeName == 'SPAN')
			{
				var id = node.getAttribute("id");
				if(id)
				{
					if(id.indexOf("p") == 0)
					{
						return node;
					}
				}
			}
			node = node.parentNode;
		}
	}
			
	return null;
},

// Remplacement d'un mot dans le texte
ReplaceWord : function(solution, node, id, estTransf, estSyn)
{	
	var window = TextEditor.Window;
	var doc = TextEditor.Document;
	
	var nodePhrase = null;
	var textNode = null;
	var setIdClass = new Set();
	
	var firstNode = null;
	var lastNode = null;
	
	if(!estSyn && id.indexOf('p') == -1)
	{
		// Put ids of the node into setIdClass
		var nodeId = node.getAttribute("id");
		var tabMainId = nodeId.split("-");
		for(var v = 0; v < tabMainId.length; v++) setIdClass.add(tabMainId[v]);
		
		textNode = doc.createTextNode (solution);
		nodePhrase = node.parentNode;

		// IE
		/*else
		{
			if ((doc.selection && Cor.IsIE == true) ||
				(window.getSelection && Cor.IsIE11))
			{
				node = TextEditor.StoredNodeIE;
				if(node)
				{
					textNode = doc.createTextNode (solution);
		
					nodePhrase = node.parentNode;
				}
			}
		}*/
		
		if(textNode && node && nodePhrase)
		{
			// En mode Plugin, envoie l'information de remplacement au plugin, avant que le node disparaisse.
			
			
			// Remplacement dans le texte
			
			// 1. Get the previous sibling with the same id.
			firstNode = node;
			
			var hasId = true;
			while(hasId)
			{
				hasId = false;
				
				var previousNode = firstNode.previousSibling;
				if(previousNode != null)
				{
					if(previousNode.nodeName == 'SPAN')
					{
						var idPreviousNode = previousNode.getAttribute("id");
						if(idPreviousNode != null)
						{
							var tabIdPreviousNode = idPreviousNode.split("-");
							if(tabIdPreviousNode.indexOf(id) >= 0)
							{
								for(var v = 0; v < tabIdPreviousNode.length; v++) setIdClass.add(tabIdPreviousNode[v]);
						
								firstNode = previousNode;
								hasId = true;
							}
						}
					}
					else if(previousNode.nodeName == '#text' && previousNode.nodeValue == "")
					{
						firstNode = previousNode;
						hasId = true;
					}
				}
			}
			
			// 2. Remove the next node with the same id.
			var tabNodesSupp = [];
			
			var lastNode = firstNode;
			tabNodesSupp.push(lastNode);
				
			var hasId = true;
			while(hasId)
			{
				hasId = false;
				
				var nextNode = lastNode.nextSibling;
				if(nextNode != null)
				{
					if(nextNode.nodeName == 'SPAN')
					{
						var idNextNode = nextNode.getAttribute("id");
						if(idNextNode != null)
						{
							var tabIdNextNode = idNextNode.split("-");
							if(tabIdNextNode.indexOf(id) >= 0)
							{
								for(var v = 0; v < tabIdNextNode.length; v++) setIdClass.add(tabIdNextNode[v]);
							
								lastNode = nextNode;
								tabNodesSupp.push(nextNode);
								hasId = true;
							}
						}
					}
					else if(nextNode.nodeName == '#text' && nextNode.nodeValue == "")
					{
						lastNode = nextNode;
						tabNodesSupp.push(nextNode);
						hasId = true;
					}
				}
			}
			
			// Send to plugin information of replacement before substitution.
			TextEditor.SendPlugin_Replacement(firstNode, lastNode, solution);
			
			// 2. Put the text node before the firstNode.
			firstNode.parentNode.insertBefore(textNode, firstNode);
			
			// 3. Remove the next nodes.
			for(var i = 0; i < tabNodesSupp.length; i++)
			{
				lastNode.parentNode.removeChild(tabNodesSupp[i]);
			}
		}
	}
	// Replacement of sentence
	else if(id != null && id.indexOf('p') == 0)
	{
		node.innerHTML = solution;
		nodePhrase = node;
	}
	// Remplacement de synonyme : se fait sur un range et non un node
	else
	{
		if (window.getSelection)
		{
			// 1. NodeSel
			var selection = window.getSelection();
			
			var rangeSel = null;

			if(!Cor.IsIE11) rangeSel = selection.getRangeAt(0);
			else rangeSel = TextEditor.StoredRangeIE;
			
			var nodeSel = rangeSel.startContainer;
			if(nodeSel)
			{
				// Trouve le nodePhrase pour pouvoir la mettre comme indiqu�e
				var nodeParentNodeSel = nodeSel;
				
				for(var i = 0; i < 4; i++)
				{
					if(nodeParentNodeSel && nodeParentNodeSel.nodeName == 'SPAN')
					{
						var idNodeParent = nodeParentNodeSel.getAttribute("id");
						if(idNodeParent)
						{
							if(idNodeParent.indexOf("p") != -1)
							{
								nodePhrase = nodeParentNodeSel;
								break;
							}
							// Register for updating style
							else
							{
								var tabIdNode = idNodeParent.split("-");
								for(var v = 0; v < tabIdNode.length; v++) setIdClass.add(tabIdNode[v]);
							}
						}
					}
					nodeParentNodeSel = nodeParentNodeSel.parentNode;
				}
				
				// La marque comme modifi�e
				if(nodePhrase)
				{
					var idPhModifie = nodePhrase.getAttribute("id");
					Cor.SetIdPhModifies.add(idPhModifie);
				}
				
				// Send to plugin information of replacement before substitution.
				TextEditor.SendPlugin_Replacement_Syn(nodeSel, rangeSel, solution);
				
				// 3. Remplacement. Il doit �tre effectu� apr�s l'information car celui-ci modifie le noeud.
				if(!Cor.IsIE11)
				{
					TextEditor.Document.execCommand('insertHTML', false, solution);
				}
				
				// IE11
				if(Cor.IsIE11)
				{
					rangeSel.deleteContents();
					var newNode = rangeSel.createContextualFragment(solution);
					rangeSel.insertNode(newNode);
				}
			
			}
		}
	}
	
	// Note la phrase comme modifi�e
	if(nodePhrase)
	{
		// Si parenth�se, prends, la phrase derriere la parenth�se.
		var idPhModifie = nodePhrase.getAttribute('id');
		
		var parentNode = nodePhrase.parentNode;
		if(parentNode)
		{
			var idParentNode = parentNode.getAttribute('id');
			if(idParentNode && idParentNode.indexOf("p") != -1)
			{
				idPhModifie = idParentNode;
			}
		}
		
		if(idPhModifie)
		{
			Cor.SetIdPhModifies.add(idPhModifie);
		}
	}
	
	// Il faut aussi v�rifier s'il reste des mots � corriger dans la phrase
	if(!estTransf && !estSyn)
	{
		var motResteCorrige = false;
		if(nodePhrase)
		{
			for(var v = 0; v < nodePhrase.childNodes.length; v++)
			{
				var element = nodePhrase.childNodes[v];
				if(element.nodeName == 'SPAN')
				{		
					var att = element.getAttribute('class');
					var valAtt = 's-';
					if(Cor.IsIE8)
					{
						if(element.style) att = element.style.color;
						valAtt = '#';
					}
					
					if(att && att.length > 0)
					{
						if(att.indexOf(valAtt) != -1)
						{
							motResteCorrige = true;
							break;
						}
					}
				}
			}
			
			// S'il ne reste plus de mots � corriger, il faut refaire une v�rification g�n�rales
			if(motResteCorrige == false)
			{
				var idPhrase = nodePhrase.getAttribute('id');
				var textNodePhrase = null;
				if(!Cor.IsIE) textNodePhrase = nodePhrase.textContent;
				else textNodePhrase = nodePhrase.innerText;
				
				// Dernier caract�re de la phrase pr�c�dente.
				var textNodePhrasePrec = "";
				var nodePhrasePrec = null;
				var parentNode = nodePhrase.parentNode;
				for(var w = 0; w < parentNode.childNodes.length; w++)
				{
					var element = parentNode.childNodes[w];
					if(element == nodePhrase)
					{
						if(w > 0)
						{
							var elementPrec = parentNode.childNodes[w - 1];
							if(elementPrec.nodeName == 'SPAN')
							{
								if(elementPrec.getAttribute("id"))
								{
									nodePhrasePrec = elementPrec;
								}
							}
						}
					}
				}
				
				if(nodePhrasePrec)
				{
					if(!Cor.IsIE) textNodePhrasePrec = nodePhrasePrec.textContent;
					else textNodePhrasePrec = nodePhrasePrec.innerText;
				}
				
				//Cor.Check(false);	// Test. A faire ? Normalement, oui, pour remmetre � jour la partie style. Mais si plusieurs paragraphes sont modifi�s, peut �tre long, et �nervant.
				Cor.VerifierCorrectionPhrase(textNodePhrase, idPhrase, textNodePhrasePrec);
			}
		}
	}
	
	// Remove style nodes of the sentences with "s-ja" and update style pan.
	
	// Update style.
	// The upadte must cover all the id of the nodes with the same id of id.
	// Ex : Il montes en haut   . Ids of "montes", Ids of "en". Ids of "haut" (which imply Id of "  ").
	if(nodePhrase)
	{
		TextEditor.RemoveNode_Style(nodePhrase, setIdClass);
		
		// Udpate style of phrase Id.
		Style.UpdateStyle(nodePhrase.id);
	}
	
	// If syn, after replacement, show the label.
	var checkBoxSyn = document.getElementById("checkBoxSyn");
	if(checkBoxSyn != null && checkBoxSyn.checked == true)
	{
		Style.PanelSynI.SetVisible_LabelNoSyn(true);
	}
},

// Send to plugin information of replacement.
SendPlugin_Replacement : function(firstNode, lastNode, solution)
{
	if(Plugins.Type != null)
	{
		var doc = TextEditor.Document;
		
		// Trouve le nodeP
		var nodeP = null;

		var parentNode = firstNode;
		for(var i = 0; i < 8; i++)
		{
			if(parentNode)
			{
				if(parentNode.nodeName == 'P')
				{
					nodeP = parentNode;
					break;
				}
				parentNode = parentNode.parentNode;	
			}
		}
		// Cas particulier : Si selection en fin de texte, parfois nodeSel = Body
		if(firstNode.nodeName == 'BODY')
		{
			var lastChild = firstNode.childNodes[firstNode.childNodes.length - 1];
			if(lastChild && lastChild.nodeName == 'P') nodeP = lastChild;
		}
		
		if(nodeP == null) return "";
		
		// Num�ro de paragraphe
		var parentP = nodeP.parentNode;
		if(parentP == null) parentP = TextEditor.Document.body;	// Bug Excel Online. C'est bien le P normal. Mais n'a pas de parentNode (body).
		
		var indP = -1;
		for(var i = 0; i < parentP.childNodes.length; i++)
		{
			if(nodeP == parentP.childNodes[i])
			{
				indP = i;
				break;
			}
		}
		
		// Position in paragraph.
		var newRange = doc.createRange();
		newRange.selectNode(nodeP);
		newRange.setEndBefore(firstNode);
		var posInP = newRange.toString().length;
		
		// Longueur du range
		newRange.selectNode(firstNode);
		newRange.setEndAfter(lastNode);
		var lgtRange = newRange.toString().length;
		var wordToReplaceSt = newRange.toString();
		
		TextEditor.SendToPluginReplace(indP, posInP, lgtRange, solution, wordToReplaceSt);
	}
},

// Send to plugin information of replacement for synonyms.
SendPlugin_Replacement_Syn : function(nodeSel, rangeSel, solution)
{
	if(Plugins.Type != null)
	{
		var doc = TextEditor.Document;
		
		// Trouve le nodeP
		var nodeP = null;

		var parentNode = nodeSel;
		for(var i = 0; i < 8; i++)
		{
			if(parentNode)
			{
				if(parentNode.nodeName == 'P')
				{
					nodeP = parentNode;
					break;
				}
				parentNode = parentNode.parentNode;	
			}
		}
		// Cas particulier : Si selection en fin de texte, parfois nodeSel = Body
		if(nodeSel.nodeName == 'BODY')
		{
			var lastChild = nodeSel.childNodes[nodeSel.childNodes.length - 1];
			if(lastChild && lastChild.nodeName == 'P') nodeP = lastChild;
		}
		
		if(nodeP == null) return "";
		
		// Bug de Firefox. pour le reproduire. Add char plusieurs fois, espace entre temps. Un <Br> se met � la fin.
		// Supprression au milieu. Ajout � la fin. 
		/*if(nodeP == nodeSel)
		{
			newRange = doc.createRange();
			newRange.setStartBefore(nodeP);
			newRange.setEndAfter(nodeP);
			
			posInP = newRange.toString().length;
		}*/
		
		// Num�ro de paragraphe
		var parentP = nodeP.parentNode;
		var indP = -1;
		for(var i = 0; i < parentP.childNodes.length; i++)
		{
			if(nodeP == parentP.childNodes[i])
			{
				indP = i;
				break;
			}
		}
		
		// Position in paragraph.
		var newRange = doc.createRange();
		newRange.selectNode(nodeP);
		newRange.setEndBefore(nodeSel);
		var posInP = newRange.toString().length + rangeSel.startOffset;
		
		var lgtRange = rangeSel.toString().length;
		var wordToReplaceSt = rangeSel.toString();
		
		TextEditor.SendToPluginReplace(indP, posInP, lgtRange, solution, wordToReplaceSt);
	}
},

// Remove style nodes of the sentences with "s-ja" and update style pan.
// Update style.
// The upadte must cover all the id of the nodes with the same id of id.
// Ex : Il montes en haut   . Ids of "montes", Ids of "en". Ids of "haut" (which imply Id of "  ").
RemoveNode_Style : function(nodePhrase, setIdClass)
{
	// Remove s-ja of the same id.
	for(var i = 0; i < nodePhrase.childNodes.length; i++)
	{
		var node = nodePhrase.childNodes[i];
		if(node.nodeName == "SPAN")
		{
			var chId = node.getAttribute("id");
			if(chId != null)
			{
				chId = chId.split("-");
				
				for(var u = 0; u < chId.length; u++)
				{
					var idU = chId[u];
					if(setIdClass.has(idU))
					{
						var className = node.className;
						
						// If from Cor, remove only s- from cor.
						// Remove s-ja and also s-bl, s-tg, etc. Ex : "Il monte en haut   ." (pl�onasme + typographie.
						var fromCor = Cor.MapMotsSolution.get(idU);
						if(fromCor)
						{
							var indSja = className.indexOf("s-ja");
							var indUbl = className.indexOf("u-bl");
							if(indSja >= 0) node.className = "s-ja";
							else if(indUbl >= 0) node.className = "u-bl";
							else node.removeAttribute("class");
							
							// Remove the element in MapMotsSolution
							Cor.MapMotsSolution.delete(idU);
						}
						// If from style, remove only s-ja
						else
						{
							var indSja = className.indexOf("s-ja");
							var indUbl = className.indexOf("u-bl");
							if(indSja > 0) node.className = className.substring(0, indSja - 1);
							else if(indUbl > 0) node.className = className.substring(0, indUbl - 1);
							else if((indSja == 0) || (indUbl == 0)) node.removeAttribute("class");
						}
					};
				}
			}
		}
	}
	
	// Update style with the id.
	setIdClass.forEach(function(id)
	{
		Style.UpdateStyle(id);
	});
	
},

SelectMotFormer : function()
{
	var document = TextEditor.Document;
	var window = TextEditor.Window;
	var selection = null;
	var node = null;
	
	if(Cor.IsIE == false)
	{
		if(window.getSelection)
		{
			selection = window.getSelection();
			node = selection.anchorNode.parentNode;
			
			if(Cor.IsIE11) TextEditor.StoredNodeIE = node;
		}
	}
	// IE
	else
	{
		if(document.selection)
		{
			selection = document.selection;
			node = selection.createRange().parentElement();
		}
	}
	
	if(node)
	{
		if(Cor.IsIE == false)
		{
			var range = document.createRange();
			range.selectNode(node);
			selection.removeAllRanges();
			selection.addRange(range);
		}
		else
		{
			//var textRange = selection.createRange();
			//range.moveToBookmark (node);
			
			var range = document.createRange();
			range.selectNode(node);
			range.select();
			
			//textRange.selectNode(node);
			
			//var storedRange = $wnd.storedNodeIE;
		
			//var range = document.body.createTextRange ();
			//range.moveToBookmark (storedRange);
			//range.select ();
			
			//alert(node.textContent);
			//textRange.select();
			
		}
	}
},

// S�lectionne un synonyme
SelectMot : function()
{
	var window = TextEditor.Window;

	if(window.getSelection)
	{
		var selection = window.getSelection();
			
		var rangeSel = selection.getRangeAt(0);
		
		//var node = selection.anchorNode.parentNode;
		//var nodeSel = selection.anchorNode.parentNode;
		var nodeSel = rangeSel.startContainer;
		
		// Ecarter la s�lection � gauche et � droite.
		var startOffset = rangeSel.startOffset;
		//alert(startOffset);
		var posNewStart = startOffset - Style.OffsetGSyn;
		//alert(posNewStart);
		rangeSel.setStart(nodeSel, posNewStart);
		
		var posNewEnd = startOffset + Style.OffsetDSyn;
		//alert(posNewEnd);
		rangeSel.setEnd(nodeSel, posNewEnd);
		
		// Select
		selection.removeAllRanges();
		selection.addRange(rangeSel);
		
		// IE11
		if(Cor.IsIE11)
		{
			TextEditor.StoredRangeIE = rangeSel;
			
			//alert('aa');
			//var textRange = selection.createRange();
			//alert('aa');
			//textRange.collapse(true);
			//textRange.moveStart('character', - 1);
			//textRange.moveEnd('character', 1);
			
			//$wnd.storedTextRangeIE = textRange.getBookmark();
			//$wnd.storedTextRangeIE = textRange;
			//alert('aa');
		}
	}
},


// D�duit les phrases modifi�s sur le curseur.
SetPhModifieByCursor : function()
{	
	var window = TextEditor.Window;
	var document = TextEditor.Document;
	
	var nodePhraseStart = null;
	var nodePhraseEnd = null;
	var node = null;
	
	var id_NodeStart = "";
	var id_NodeEnd = "";
	
	if (window.getSelection)
	{
		var selection = window.getSelection();
		var rangeSelection = selection.getRangeAt(0);
		
		// Node du d�but de la s�lection
		var nodeStart = rangeSelection.startContainer;
		
		// Cas particulier : Si l'on tape � la fin d'une phrase et � la fin d'un paragraphe. Ex : <p><span id="p7">Je change</span></p> (on tape apr�s </span>).
		// La denri�re phrase du paragraphe est modifi�e.
		if(nodeStart && nodeStart.nodeName == 'P')
		{
			if(nodeStart.childNodes.length > 0)
			{
				var lastChildNode = nodeStart.childNodes[nodeStart.childNodes.length - 1];
				
				if(lastChildNode && lastChildNode.nodeName == 'SPAN')
				{
					var id = lastChildNode.getAttribute("id");
					if(id && id.indexOf("p") != -1)
					{
						nodePhraseStart = lastChildNode;
						nodePhraseEnd = lastChildNode;
					}
				}
			}
		}
	
		// La s�lection peut �tre dans une expression, un mot, ou une parenth�se.
		if(nodePhraseStart == null)
		{
			for(var i = 0; i < 4; i++)
			{
				if(nodeStart)
				{
					if(nodeStart.nodeName == 'SPAN')
					{
						var id = nodeStart.getAttribute("id");
						if(id)
						{
							if(id.indexOf("p") != -1)
							{
								nodePhraseStart = nodeStart;
								break;
							}
							else id_NodeStart = id;
						}
					}
					nodeStart = nodeStart.parentNode;
				}
			}
			
			// Node de la fin de la s�lection
			var nodeEnd = rangeSelection.endContainer;
			
			// La s�lection peut �tre dans une expression, un mot, ou une parenth�se.
			for(var i = 0; i < 4; i++)
			{
				if(nodeEnd)
				{
					if(nodeEnd.nodeName == 'SPAN')
					{
						var id = nodeEnd.getAttribute("id");
						if(id)
						{
							if(id.indexOf("p") != -1)
							{
								nodePhraseEnd = nodeEnd;
								break;
							}
							else id_NodeEnd = id;
						}
					}
					nodeEnd = nodeEnd.parentNode;
				}
			}
		}
	}
	
	// Note la phrase comme modifi�e
	if(nodePhraseStart && nodePhraseEnd)
	{
		var sameNode = (nodePhraseStart == nodePhraseEnd);
		
		// Si parenth�se, prends, la phrase derriere la parenth�se.
		var parentNodePhraseStart = nodePhraseStart.parentNode;
		if(parentNodePhraseStart && parentNodePhraseStart.nodeName == 'SPAN')
		{
			var idParentNodePhraseStart = parentNodePhraseStart.getAttribute("id");
			if(idParentNodePhraseStart && idParentNodePhraseStart.indexOf("p") != -1)
			{
				nodePhraseStart = parentNodePhraseStart;
			}
		}
		
		var idPhModifieStart = nodePhraseStart.getAttribute('id');
		Cor.SetIdPhModifies.add(idPhModifieStart);
		
		// NodePhraseEnd : pour �conomiser du traitement.
		if(!sameNode)
		{
			var parentNodePhraseEnd = nodePhraseEnd.parentNode;
			if(parentNodePhraseEnd && parentNodePhraseEnd.nodeName == 'SPAN')
			{
				var idParentNodePhraseEnd = parentNodePhraseEnd.getAttribute("id");
				if(idParentNodePhraseEnd && idParentNodePhraseEnd.indexOf("p") != -1)
				{
					nodePhraseEnd = parentNodePhraseEnd;
				}
			}

			var idPhModifieEnd = nodePhraseEnd.getAttribute('id');
			Cor.SetIdPhModifies.add(idPhModifieEnd);
		}
		
		// D�surligne la phrase. N'app�le pas la fonction afin d'optimiser les traitments.
		var listId = [];
		
		for(var u = 0; u < nodePhraseStart.childNodes.length; u++)
		{
			var node = nodePhraseStart.childNodes[u];
			if(node.nodeName == 'SPAN')
			{
				// Mot
				var idM = node.getAttribute('id');
				var classM = node.getAttribute('class');
				
				if(idM && idM.indexOf('p') == -1)
				{
					node.removeAttribute('class');
					listId.push(idM);
				}
				// Expression
				/*else if((idM == null) && (classM != null) && (classM.length > 0) && (classM.indexOf(valAtt) != -1))
				{
					for (var w = 0; w < node.childNodes.length; w++)
					{
						nodePhraseStart.insertBefore(node.childNodes[w].cloneNode(true), node);
					}
					nodePhraseStart.removeChild(node);
				}*/
				// D�surligne aussi les mots de la parenth�se
				else if(idM && idM.indexOf('p') != -1)
				{
					for(var w = 0; w < node.childNodes.length; w++)
					{
						var nodePar = node.childNodes[w];
						if(nodePar.nodeName == 'SPAN')
						{
							// Mot
							var idMPar = nodePar.getAttribute('id');
							var classMPar = nodePar.getAttribute('class');
							
							if(idMPar && idMPar.indexOf('p') == -1)
							{
								nodePar.removeAttribute('class');
								listId.push(idMPar);
							}
							// Expression
							else if((idMPar == null) && (classMPar != null) && (classMPar.length > 0) && (classMPar.indexOf(valAtt) != -1))
							{
								for (var v = 0; v < nodePar.childNodes.length; v++)
								{
									node.insertBefore(nodePar.childNodes[v].cloneNode(true), nodePar);
								}
								node.removeChild(nodePar);
							}
						}
					}
					
					// Update style
					//Style.UpdateStyle_BySentence(node);
				}
			}
		}
		
		// Update style
		//Style.UpdateStyle_BySentence(nodePhraseStart);
		
		// NodePhraseEnd : pour �conomiser du traitement.
		if(!sameNode)
		{
			for(var u = 0; u < nodePhraseEnd.childNodes.length; u++)
			{
				var node = nodePhraseEnd.childNodes[u];
				if(node.nodeName == 'SPAN')
				{
					// Mot
					var idM = node.getAttribute('id');
					
					var valAtt = 's-';
					
					var classM = node.getAttribute('class');
					
					if(idM && idM.indexOf('p') == -1)
					{
						node.removeAttribute('class');
						listId.push(idM);
					}
					// Expression
					/*else if((idM == null) && (classM != null) && (classM.length > 0) && (classM.indexOf(valAtt) != -1))
					{
						for (var w = 0; w < node.childNodes.length; w++)
						{
							nodePhraseEnd.insertBefore(node.childNodes[w].cloneNode(true), node);
						}
						nodePhraseEnd.removeChild(node);
					}*/
					// D�surligne aussi les mots de la parenth�se
					else if(idM && idM.indexOf('p') != -1)
					{
						for(var w = 0; w < node.childNodes.length; w++)
						{
							var nodePar = node.childNodes[w];
							if(nodePar.nodeName == 'SPAN')
							{
								// Mot
								var idMPar = nodePar.getAttribute('id');
								var classMPar = nodePar.getAttribute('class');
								
								if(idMPar && idMPar.indexOf('p') == -1)
								{
									nodePar.removeAttribute('class');
									listId.push(idMPar);
								}
								// Expression
								else if((idMPar == null) && (classMPar != null) && (classMPar.length > 0) && (classMPar.indexOf(valAtt) != -1))
								{
									for (var v = 0; v < nodePar.childNodes.length; v++)
									{
										node.insertBefore(nodePar.childNodes[v].cloneNode(true), nodePar);
									}
									node.removeChild(nodePar);
								}
							}
						}
					}
				}
			}
			
			// Update style
			//Style.UpdateStyle_BySentence(nodePhraseEnd);
		}
		
		// Update cor map.
		for(var i = 0; i < listId.length; i++)
		{
			var chId = listId[i].split("-");
			for(var u = 0; u < chId.length; u++)
			{
				Cor.MapMotsSolution.delete(chId[u]);
				
				// Update panel marque
				Style.UpdatePanelMarques(chId[u]);
			}
		}
		
		// Update style of start word and end word.
		Style.UpdateStyle(id_NodeStart);
		Style.UpdateStyle(id_NodeEnd);
	}
},

// Doit passer par une fonction JAVA
CopyToClipBoardT : function()
{
	TextEditor.CopyToClipBoard();
},

// Doit passer par une fonction JAVA
CutToClipBoardT : function()
{
	TextEditor.CopyToClipBoard();
},

// Appel�e lorsque l'on fait un copier coller et que celui ci ne change pas le texte.
// L'�venement est appel� avant que les noeuds soient chang�s
Paste : function()
{
	// V�rifie le texte -> note les phrases qui ont change�
	TextEditor.CheckTexte();
		
	// Un des 3 moyens modifiant un texte
	if(Cor.FirstRequest == false)
	{
		Cor.TexteModified = true;
		Stat.CheckedStat = false;
	}
	
	// Hide the popups
	Cor.PopupPanelSol.SetVisible(false, false, false, true);
},

// Evenement KeyDown
// Return true normalement, false si on doit annuler l'�venement.
KeyDown : function(keyCode)
{
	// Trop compliqu� de modifier les caract�res avec le clavier sous MSPowerPoint, MSExcel, OOWriter et LOWriter.
	if(Plugins.Type != null)
	{
		// Retourne les conditions pour annuler une touche clavier.
		if(TextEditor.CondCancelable(keyCode, true))
		{
			return;
		}
	}

	// V�rifie le texte -> note les phrases qui ont change�
	if(TextEditor.SetKeybAlphaNum.has(keyCode) ||
	  (TextEditor.SetKeybAlphaNumFirefox.has(keyCode) && Cor.IsMozillaF) ||
	  (TextEditor.SetKeybAlphaNumChrome.has(keyCode) && Cor.IsChrome) ||
	  (TextEditor.SetKeybAlphaNumIE.has(keyCode) && Cor.IsIE11) ||
	  (TextEditor.SetKeybAlphaNumSafari.has(keyCode) && Cor.IsSafari))
	{
		TextEditor.CheckTexte();		
	}
	
	// Un des 3 moyens modifiant un texte
	if(Cor.FirstRequest == false)
	{
		Cor.TexteModified = true;
		Stat.CheckedStat = false;
	}
	
	// Hide the popups
	Cor.PopupPanelSol.SetVisible(false, false, false, true);
	
	// Cas de la connexion avec le plugin
	if(Plugins.Type != null)
	{
		// Sur les claviers clavier Mac, la touche MAJ, une fois appuy�e puis relach�e, n'est consid�r�e que comme enfonc�e, et non relach�e.
		if((keyCode == 20 || keyCode == 219 || keyCode == 229 || keyCode == 192) && (Cor.IsMac == true)) return;
		
		// Note toutes les touches qui sont enfonc�es.
		TextEditor.SetKeyDown.add(keyCode);
		
		if(TextEditor.KeyPress == false)
		{
			TextEditor.KeyPress = true;

			// Charact�res alphanum�riques
			if(TextEditor.SetKeybAlphaNum.has(keyCode) ||
			  (TextEditor.SetKeybAlphaNumFirefox.has(keyCode) && Cor.IsMozillaF) ||
			  (TextEditor.SetKeybAlphaNumChrome.has(keyCode) && Cor.IsChrome) ||
			  (TextEditor.SetKeybAlphaNumIE.has(keyCode) && Cor.IsIE11) ||
			  (TextEditor.SetKeybAlphaNumSafari.has(keyCode) && Cor.IsSafari) ||
				keyCode == 16 ||	// Maj : peux �tre utiliser pour faire une majuscule.
				keyCode == 17)	// AltGr
			{
				// Position de la fin de la s�lection
				TextEditor.PosAbsEndSel = TextEditor.GetPosAbsolute(false);
				
				// Position du d�but de la s�lection
				TextEditor.PosAbsStartSel = TextEditor.GetPosAbsolute(true);
				
				// Position relative du curseur par rapport au noeud de la s�lection
				TextEditor.PosRelativeCursorAdd = TextEditor.GetPosRelativeCursor();
			}
		}
	}
},

// Evenement KeyDown
// Return true normalement, false si on doit annuler l'�venement.
KeyUp : function (keyCode)
{
	// Trop compliqu� de modifier les caract�res avec le clavier sous MSPowerPoint, MSExcel, OOWriter et LOWriter.
	if(Plugins.Type != null)
	{
		// Retourne les conditions pour annuler une touche clavier.
		if(TextEditor.CondCancelable(keyCode, false))
		{
			TextEditor.PosAbsStartSel = "";
			TextEditor.PosAbsEndSel = "";
			return;
		}
	}
	
	// Cas de la connexion avec le plugin
	if(Plugins.Type != null)
	{
		// Sur les claviers clavier Mac, la touche MAJ, une fois appuy�e puis relach�e, n'est consid�r�e que comme enfonc�e, et non relach�e.
		if((keyCode == 20 || keyCode == 219 || keyCode == 229 || keyCode == 192) && (Cor.IsMac == true)) return;	
		
		TextEditor.SetKeyDown.delete(keyCode);
		
		// On agit une fois que TOUTES les touches sont rel�ch�es.
		if(TextEditor.SetKeyDown.length > 0) return;
		
		TextEditor.KeyPress = false;
		
		// Charact�res alphanum�riques
		if(TextEditor.SetKeybAlphaNum.has(keyCode) ||
		  (TextEditor.SetKeybAlphaNumFirefox.has(keyCode) && Cor.IsMozillaF) ||
		  (TextEditor.SetKeybAlphaNumChrome.has(keyCode) && Cor.IsChrome) ||
		  (TextEditor.SetKeybAlphaNumIE.has(keyCode) && Cor.IsIE11) ||
		  (TextEditor.SetKeybAlphaNumSafari.has(keyCode) && Cor.IsSafari) ||
			keyCode == 16 ||	// Maj : peux �tre utiliser pour faire une majuscule.
			keyCode == 17 || keyCode == 18)	// AltGr
		{
			// Suppression
			// 1er cas : pour la suppresion avec la touche Delete.
			// 2�me cas : � l'ajout, si une s�lection est en cours, on la supprime si on tape quelque chose.
			var indexPDeb = -1;
			var posCPDeb = -1;
			
			// Position relative du curseur par rapport � P.
			TextEditor.PosAbsCursorAdd = TextEditor.GetPosAbsolute(true);
			
			var tabSt = TextEditor.PosAbsCursorAdd.split(":");
			if(tabSt.length == 2)
			{
				indexPDeb = parseInt(tabSt[0]);
				posCPDeb = parseInt(tabSt[1]);
			}
			
			var indexPStartSel = -1;
			var posCPStartSel = -1;
			
			tabSt = TextEditor.PosAbsStartSel.split(":");
			if(tabSt.length == 2)
			{
				indexPStartSel = parseInt(tabSt[0]);
				posCPStartSel = parseInt(tabSt[1]);
			}
			
			var indexPEndSel = -1;
			var posCPEndSel = -1;
			
			tabSt = TextEditor.PosAbsEndSel.split(":");
			if(tabSt.length == 2)
			{
				indexPEndSel = parseInt(tabSt[0]);
				posCPEndSel = parseInt(tabSt[1]);
			}
			
			// Remplacement
			if(keyCode != 8)
			{
				// On peux dans un cas extr�me, presser 2 touches en m�me temps, ce qui pose probl�me.
				// Ainsi, on attend bien que les touches ont bien fini d'�tre pr�ss�es.
				//Timer timer = new Timer() {
					
					//public void run()
					{
						var posAbsCursorSt = TextEditor.GetPosAbsolute(false);
						tabSt = posAbsCursorSt.split(":");
						
						var posAbsCursor = -1;
						if(tabSt.length == 2)
						{
							posAbsCursor = parseInt(tabSt[1]);
						}
						
						if(posAbsCursor == -1) posAbsCursor = 2;
						
						// Texte ajout�
						var posRelativeCursor = TextEditor.GetPosRelativeCursor();
						
						//String texteAdd = GetTextBetweenPos(PosRelativeCursorAdd, posRelativeCursor, false, false, false);
						var texteAdd = TextEditor.GetTextBetweenPos(posCPStartSel, posAbsCursor);
						texteAdd = texteAdd.replace(new RegExp(";", "g"), "___pv___");	// Le s�parateur �tant ;, on le remplace par ___pv___
						
						// Position � l'ajout
						/*tabSt = PosRelativeCursorAddToP.split(":");
						int indexP = -1;
						int posCAddinP = -1;
						if(tabSt.length == 2)
						{
							indexP = Integer.parseInt(tabSt[0]);
							posCAddinP = Integer.parseInt(tabSt[1]);
						}*/
						
						
						/*int indexPEndSel = -1;
						int posCPEndSel = -1;
						
						tabSt = PosEndSelDell.split(":");
						if(tabSt.length == 2)
						{
							indexPEndSel = Integer.parseInt(tabSt[0]);
							posCPEndSel = Integer.parseInt(tabSt[1]);
						}*/
						
						if(indexPStartSel > -1 && posCPStartSel > -1 && indexPEndSel > -1 && posCPEndSel > -1)
						{
							// Envoi au serveur la commande d'ajout de caract�re
							// 1. Indicateur d'action
							var messageRep = "rep" + ";";
							// 2. Num�ro de paragraphe du d�but de la s�lection.
							messageRep = messageRep + indexPStartSel + ";";
							// 3. Start position
							messageRep = messageRep + posCPStartSel + ";";
							// 4. Num�ro de paragraphe de la fin de la s�lection.
							messageRep = messageRep + indexPEndSel + ";";
							// 5. End position
							messageRep = messageRep + posCPEndSel + ";";
							// 5. Nouveau texte
							messageRep = messageRep + texteAdd;
							
							// 6. Pour powerpoint : numSlide. Pour Excel : numRow_numColumn
							if((Plugins.Type == "MSPowerPoint") || (Plugins.Type == "MSExcel") || (Plugins.Type == "MSPowerPointOSX") || (Plugins.Type == "MSExcelOSX") || (Plugins.Type == "MSExcelWeb") || (Plugins.Type == "GoogleSheets"))
							{
								messageRep = messageRep +";";
								messageRep = messageRep + Plugins.MapIndicateurP.get(indexPEndSel);
							}
							
							// Temporaire : envoi l'ancien message pour �tre compatible.
							if((Plugins.Type != "Firefox") && (Plugins.Type != "Thunderbird") && (Plugins.Type != "Chrome") && 
							   (Plugins.Type != "OOWriter") &&
							   (Plugins.Type != "MSWordOSX") && (Plugins.Type != "MSPowerPointOSX") && (Plugins.Type != "MSExcelOSX") && (Plugins.Type != "Integration") && (Plugins.Type != "Safari") &&
							   (Plugins.Type != "MSWordWeb") && (Plugins.Type != "MSExcelWeb") &&
							   (Plugins.Type != "GoogleDocs") && (Plugins.Type != "GoogleSheets") &&
							   (Plugins.Type != "Wysiwyg"))
							{
								Plugins.SendToPlugin(messageRep);
							}
							
							// 6. OpenOffice. Envoi du nouveau message pour �tre compatible.
							//if(Plugins.Type.equals("OOWriter"))
							{
								messageRep = messageRep.replace("rep;", "REP:");
								messageRep = messageRep + ";";
								messageRep = messageRep + "_";
								Plugins.SendToPlugin(messageRep);
							}
						}
						
						/*int indexPStartSel = -1;
						int posCPStartSel = -1;
						
						tabSt = PosStartSelDell.split(":");
						if(tabSt.length == 2)
						{
							indexPStartSel = Integer.parseInt(tabSt[0]);
							posCPStartSel = Integer.parseInt(tabSt[1]);
						}
						
						// Ajout simple sans supression avant
						if(!((PosStartSelDell == PosEndSelDell) && (PosStartSelDell == PosEndSelDell)))
						{
							PresentationModePlugin.SendToPlugin(messageAdd);
						}
						// Avec supprresion avant
						else
						{
							// 1. Indicateur d'action
							String messageSupp = "rem" + ";";
							// 2. Num�ro de paragraphe. Pour le remplacement, il ne peux y avoir qu'un seul paragraphe.
							messageSupp = messageSupp + indexPStartSel + ";";
							// 3. Start position
							messageSupp = messageSupp + posCPStartSel + ";";
							// 4. End position
							messageSupp = messageSupp + indexPEndSel + ";";
							// 5. Nouveau texte
							messageSupp = messageSupp + posCPEndSel;
							
							String messageSuppAdd = "remrep;" + messageSupp + ";" + messageAdd;
							PresentationModePlugin.SendToPlugin(messageSuppAdd);
						}*/
					}
				//};
				
				// Lance le timer. A 10ms, on ne voit pas le raffraichissement.
				//timer.schedule(100);
			}
			// Cas de la suppression
			else
			{
				if(indexPDeb > -1 && posCPDeb > -1 && indexPEndSel > -1 && posCPEndSel > -1 &&
				  !(indexPDeb == indexPEndSel && posCPDeb == posCPEndSel))
				{
					/*if(Cor.IsMozillaF && (indexPDeb == (indexPEndSel - 1)) && posCPEndSel == 1)
					{
						indexPDeb = indexPEndSel;
						posCPDeb = 0;
					}*/
					
					// Envoi au serveur la commande d'ajout de caract�re
					// 1. Indicateur d'action
					var messageSupp = "rem" + ";";
					// 2. Num�ro de paragraphe. Pour le remplacement, il ne peux y avoir qu'un seul paragraphe.
					messageSupp = messageSupp + indexPDeb + ";";
					// 3. Start position
					messageSupp = messageSupp + posCPDeb + ";";
					// 4. End position
					messageSupp = messageSupp + indexPEndSel + ";";
					// 5. Nouveau texte
					messageSupp = messageSupp + posCPEndSel;
					// Num�ro de slide pour PowerPoint
					if(Plugins.Type != null && ((Plugins.Type == "MSPowerPoint") || (Plugins.Type == "MSExcel") || (Plugins.Type == "MSPowerPointOSX") || (Plugins.Type == "MSExcelOSX") || (Plugins.Type == "MSExcelWeb") || (Plugins.Type == "GoogleSheets")))
					{
						messageSupp = messageSupp +";";
				
						messageSupp = messageSupp + Plugins.MapIndicateurP.get(indexPEndSel);
					}
					
					// Envoi le message de suppression (pour rester compatible) (ancien message)
					if((Plugins.Type != "Firefox") && (Plugins.Type != "Thunderbird") && (Plugins.Type != "Chrome") && 
					   (Plugins.Type != "OOWriter") &&
					   (Plugins.Type != "MSWordOSX") && (Plugins.Type != "MSPowerPointOSX") && (Plugins.Type != "MSExcelOSX") && (Plugins.Type != "Integration") && (Plugins.Type != "Safari") &&
					   (Plugins.Type != "MSWordWeb") && (Plugins.Type != "MSExcelWeb") &&
					   (Plugins.Type != "GoogleDocs") && (Plugins.Type != "GoogleSheets") &&
					   (Plugins.Type != "Wysiwyg"))
					{
						Plugins.SendToPlugin(messageSupp);
					}
					
					// Envoi le nouveau message de suppression
					messageSupp = messageSupp.replace("rem;", "REM:");
					Plugins.SendToPlugin(messageSupp);
				}			
			}
			
		}
		
		TextEditor.PosAbsStartSel = "";
		TextEditor.PosAbsEndSel = "";
	}
},


// Retourne le couple : indice P : posCursor
GetPosAbsolute : function(startSel)
{
	var document = TextEditor.Document;
	var window = TextEditor.Window;
	var nodeSel = null;
	var rangeSel = null;

	// IE 11 et autre que IE
	if(Cor.IsIE == false || Cor.IsIE11 == true)
	{
		if(window.getSelection)
		{
			var selection = window.getSelection();
			rangeSel = selection.getRangeAt(0);
			// Node actuel de la s�lection
			if(startSel) nodeSel = rangeSel.startContainer;
			//if(startSel) nodeSel = rangeSel.commonAncestorContainer;
			//if(startSel) nodeSel = selection.anchorNode;
			//if(startSel) nodeSel = selection.focusNode;
			else nodeSel = rangeSel.endContainer;
			//nodeSel = selection.anchorNode;
		}
	}
	else
	{
		if(document.selection)
		{
			var selection = document.selection;
			rangeSel = selection.createRange();
			// Node actuel de la s�lection
			if(startSel) nodeSel = rangeSel.startContainer;
			else nodeSel = rangeSel.endContainer;
		}
	}
	
	if(nodeSel)
	{
		// Trouve le nodeP
		var nodeP = null;
		
		var parentNode = nodeSel;

		for(var i = 0; i < 8; i++)
		{
			if(parentNode)
			{
				if(parentNode.nodeName == 'P')
				{
					nodeP = parentNode;
					break;
				}
				parentNode = parentNode.parentNode;
			}	
		}
		// Cas particulier : Si selection en fin de texte, parfois nodeSel = Body
		if(nodeSel.nodeName == 'BODY')
		{
			var lastChild = nodeSel.childNodes[nodeSel.childNodes.length - 1];
			if(lastChild && lastChild.nodeName == 'P')
			{
				nodeP = lastChild;
				var pos = (nodeSel.childNodes.length - 1) + ":" + nodeP.textContent.length;
				return pos;
			}
		}
		
		if(nodeP == null) return "";
		
		// Num�ro de paragraphe
		var parentP = nodeP.parentNode;
		var indP = -1;
		for(var i = 0; i < parentP.childNodes.length; i++)
		{
			//if(parentP.childNodes[i].nodeName == 'P')
			//{
				//alert(parentP.childNodes[i].innerHTML);
				if(nodeP == parentP.childNodes[i])
				{
					indP = i;
					break;
				}
			//}
		}
		
		// Bug de Firefox. pour le reproduire. Add char plusieurs fois, espace entre temps. Un <Br> se met � la fin.
		// Supprression au milieu. Ajout � la fin. 
		if(Cor.IsMozillaF == true)
		{
			if(nodeP == nodeSel)
			{
				var newRange = document.createRange();
				//newRange.selectNode(nodeP);
				
				newRange.setStartBefore(nodeP);
				newRange.setEndAfter(nodeP);
				
				var pos = indP + ":" + newRange.toString().length;
				
				return pos;
			}
			
			// Bug 2 sur Firefox : startContainer ne repr�sente pas forc�ment le deepestNode. Meme au milieu d'un paragraphe.
			// Ex : Comme quoi les p�niches que les industriels ont d�cid�es d�exploiter, sont en effet tr�s sollicit� -> on commence par supprimer la fin de exploiter. jusqu'au "d" de "d�cid�es".
			if(nodeSel.nodeName == 'SPAN' && rangeSel.startOffset > 0)	// Non au d�but d'un paragraphe
			{
				if(rangeSel.startOffset < nodeSel.childNodes.length)
				{
					var chilNodeNodeSel = nodeSel.childNodes[rangeSel.startOffset];
					if(chilNodeNodeSel)
					{
						var newRange = document.createRange();
						newRange.selectNode(nodeP);
						newRange.setEndBefore(chilNodeNodeSel);
						
						var pos = indP + ":" + newRange.toString().length;
					
						return pos;
					}
				}
				else if(rangeSel.startOffset == nodeSel.childNodes.length)
				{
					var chilNodeNodeSel = nodeSel.childNodes[rangeSel.startOffset - 1];
					if(chilNodeNodeSel)
					{
						var newRange = document.createRange();
						newRange.selectNode(nodeP);
						newRange.setEndAfter(chilNodeNodeSel);
						
						var pos = indP + ":" + newRange.toString().length;
					
						return pos;
					}
				}
			}
		}
		
		//alert('a');
		var posInPar = 0;
		
		var newRange = document.createRange();
				
		newRange.selectNode(nodeP);
		newRange.setEndBefore(nodeSel);
		
		if(startSel) posInPar = (newRange.toString().length + rangeSel.startOffset);
		else posInPar = (newRange.toString().length + rangeSel.endOffset);
		
		// Cas particulier : en fin de paragraphe. Ex : on corrige un mot qjui couvre tout le paragraphe, on va � la fin et on fait supp.
		if(nodeSel.nodeName == 'P')
		{
			if(/*!startSel || */(rangeSel.startOffset == rangeSel.endOffset))
			{
				posInPar = nodeSel.textContent.length;
			}
		}
		// Cas particulier : Remplacement du dernier mot et taper un caract�re apr�s. Le nodeSel est le span de la phrase
		else if(/*!startSel && */nodeSel.nodeName == 'SPAN')
		{
			// startOffset en endOffset should represent the index of the child node of nodeSel
			if(rangeSel.startOffset == rangeSel.endOffset)
			{
				var childNodeI = nodeSel.childNodes[rangeSel.startOffset - 1];
				
				newRange.selectNode(nodeP);
				newRange.setEndAfter(childNodeI);
		
				posInPar = newRange.toString().length;
		
				//if(rangeSel.endOffset == nodeSel.childNodes.length)
					//posInPar = newRange.toString().length + nodeSel.textContent.length;
				//}
			}
		}
		
		var pos = indP + ":" + posInPar;
		
		return pos;
		//return "0:" + rangeSel.startOffSet;
	}
},

// Retourne la position relative au noeud de" la s�lection
GetPosRelativeCursor : function()
{
	var document = TextEditor.Document;
	var window = TextEditor.Window;
	var nodeSel = null;
	var rangeSel = null;
	
	if(Cor.IsIE == false)
	{
		if(window.getSelection)
		{
			var selection = window.getSelection();
			rangeSel = selection.getRangeAt(0);
			
			// Node actuel de la s�lection
			nodeSel = rangeSel.startContainer;
		}
	}
	else
	{
		if(document.selection)
		{
			var selection = document.selection;
			rangeSel = selection.createRange();
			nodeSel = rangeSel.startContainer;
		}
	}
	
	//var pos = 
	//alert(nodeSel);
	
	// Bug de Firefox. pour le reproduire. Add char plusieurs fois, espace entre temps. Un <Br> se met � la fin.
	// Supprression au milieu. Ajout � la fin. 
	if(nodeSel.nodeName == 'P')
	{
		var nodeP = nodeSel;
		var newRange = document.createRange();
		newRange.setStartBefore(nodeP);
		newRange.setEndAfter(nodeP);
		return newRange.toString().length;
	}
	
	if(rangeSel) return rangeSel.startOffset;
	else return -1;
},

GetTextBetweenPos : function(pos1, pos2)
{
	var document = TextEditor.Document;
	var window = TextEditor.Window;
	var nodeSel = null;
	var rangeSel = null;
	
	if(Cor.IsIE == false)
	{
		if(window.getSelection)
		{
			var selection = window.getSelection();
			rangeSel = selection.getRangeAt(0);
			
			// Node actuel de la s�lection
			nodeSel = rangeSel.startContainer;
		}
	}
	else
	{
		if(document.selection)
		{
			var selection = document.selection;
			rangeSel = selection.createRange();
			nodeSel = rangeSel.startContainer;
		}
	}
	
	if(nodeSel)
	{
		var range = document.createRange();
		var diff = pos2 - pos1;
		
		var rsOffset = rangeSel.startOffset;
		//alert(pos1 + ":" + pos2);
		range.setStart(nodeSel, rsOffset - diff);
		range.setEnd(nodeSel, rsOffset);
		
		return range.toString();
	}
	
	return "";
},

GetIndP : function(idSt)
{
	
	var document = TextEditor.Document;
	var elt = document.getElementById(idSt);
	
	if(elt)
	{
		// Trouve le nodeP
		var nodeP = null;
		
		var parentNode = elt;
		for(var i = 0; i < 8; i++)
		{
			if(parentNode)
			{
				if(parentNode.nodeName == 'P')
				{
					nodeP = parentNode;
					break;
				}
				parentNode = parentNode.parentNode;
			}	
		}
		// Cas particulier : Si selection en fin de texte, parfois nodeSel = Body
		if(elt.nodeName == 'BODY')
		{
			var lastChild = elt.childNodes[elt.childNodes.length - 1];
			if(lastChild && lastChild.nodeName == 'P') nodeP = lastChild;
		}
		
		
		// Num�ro de paragraphe
		if(nodeP)
		{
			var parentP = nodeP.parentNode;
			for(var i = 0; i < parentP.childNodes.length; i++)
			{
				if(nodeP == parentP.childNodes[i])
				{
					return i;
				}
			}
		}
	}
	
	return 0;
},


// Si une des extremiti� de la s�lection fait partie d'une expression. Sur TinyMce, l'ajout ou la suprresion font n'importe quoi.
SelectionOfExpression : function ()
{
	var document = TextEditor.Document;
	var window = TextEditor.Window;
	
	//alert(document.body.innerHTML);
	
	if (window.getSelection)
	{
		var selection = window.getSelection();
		var rangeSelection = selection.getRangeAt(0);
		
		// Node du d�but de la s�lection
		var nodeStart = rangeSelection.startContainer;
		//alert(nodeStart.nodeName);
		var parentNodeStart = nodeStart;
		//alert(parentNodeStart.innerHTML);
		//alert(parentNodeStart.nodeName);
		//alert(parentNodeStart.parentNode.nodeName);
		
		for(var i = 0; i < 3; i++)
		{
			if(parentNodeStart && parentNodeStart.nodeName == 'SPAN')
			{
				//alert(parentNodeStart.getAttribute('id'));
				
				if(parentNodeStart.getAttribute('class') != null && 
				   parentNodeStart.getAttribute('id') == null)
				{
					return true;
				}
			}
			parentNodeStart = parentNodeStart.parentNode;	
		}
		
		// Node de la fin de la s�lection
		var nodeEnd = rangeSelection.endContainer;
		var parentNodeEnd = nodeEnd;
		
		for(var i = 0; i < 3; i++)
		{
			if(parentNodeEnd && parentNodeEnd.nodeName == 'SPAN')
			{
				if(parentNodeEnd.getAttribute('class') != null && 
				   parentNodeEnd.getAttribute('id') == null)
				{
					return true;
				}
			}
			parentNodeEnd = parentNodeEnd.parentNode;	
		}
	}
	
	return false;
},


// S�lection longue
SelectionLg : function ()
{
	var document = TextEditor.Document;
	var window = TextEditor.Window;
		
	if (window.getSelection)
	{
		var selection = window.getSelection();
		var rangeSelection = selection.getRangeAt(0);
		if(rangeSelection.toString().length > 0) return true;
	}
	
	return false;
},

// S�lection sur plusieurs paragraphes
SelectionMultiPar : function()
{
	var document = TextEditor.Document;
	var window = TextEditor.Window;
		
	if (window.getSelection)
	{
		var selection = window.getSelection();
		var rangeSelection = selection.getRangeAt(0);
		
		// Node de debut
		var indPStart = -1;
		var nodePStart = null;
		var nodeStart = rangeSelection.startContainer;
		
		var parentNodeStart = nodeStart;
		for(var i = 0; i < 8; i++)
		{
			if(parentNodeStart)
			{
				if(parentNodeStart.nodeName == 'P')
				{
					nodePStart = parentNodeStart;
					break;
				}
				parentNodeStart = parentNodeStart.parentNode;	
			}
		}
		// Cas particulier : Si selection en fin de texte, parfois nodeSel = Body
		if(nodeStart.nodeName == 'BODY')
		{
			var lastChild = nodeStart.childNodes[nodeStart.childNodes.length - 1];
			if(lastChild && lastChild.nodeName == 'P') nodePStart = lastChild;
		}
		
		// Node de fin
		var indPEnd = -1;
		var nodePEnd = null;
		var nodeEnd = rangeSelection.endContainer;
		
		var parentNodeEnd = nodeEnd;
		for(var i = 0; i < 8; i++)
		{
			if(parentNodeEnd)
			{
				if(parentNodeEnd.nodeName == 'P')
				{
					nodePEnd = parentNodeEnd;
					break;
				}
				parentNodeEnd = parentNodeEnd.parentNode;
			}	
		}
		// Cas particulier : Si selection en fin de texte, parfois nodeSel = Body
		if(nodeEnd.nodeName == 'BODY')
		{
			var lastChild = nodeEnd.childNodes[nodeEnd.childNodes.length - 1];
			if(lastChild && lastChild.nodeName == 'P') nodePEnd = lastChild;
		}
		
		if(nodePStart && nodePEnd)
		{
			var parentP = nodePStart.parentNode;
			for(var i = 0; i < parentP.childNodes.length; i++)
			{
				if(nodePStart == parentP.childNodes[i])
				{
					indPStart = i;
				}
				if(nodePEnd == parentP.childNodes[i])
				{
					if(indPStart >= 0 && indPStart != i)
					{
						return true;
					}
				}
			}
			
			// Cas particulier : on selectionne tout et on efface tout. Au debut de cette fonction, il ne reste qu'un seul paragraphe dans le node (?).
			// if(parentP.childNodes.length == 1 && parentP.textContent.length == 0) return true;
		}
	}
	//alert('x');
	return false;
},

// S�lection sur plusieurs paragraphes
SuppDebPar : function()
{
	var document = TextEditor.Document;
	var window = TextEditor.Window;
			
	if (window.getSelection)
	{
		var selection = window.getSelection();
		var rangeSel = selection.getRangeAt(0);
		var nodeSel = rangeSel.startContainer;
		
		// Trouve le nodeP
		var nodeP = null;
		var parentNode = nodeSel;
		for(var i = 0; i < 8; i++)
		{
			if(parentNode)
			{
				if(parentNode.nodeName == 'P')
				{
					nodeP = parentNode;
					break;
				}
				parentNode = parentNode.parentNode;
			}	
		}
		// Cas particulier : Si selection en fin de texte, parfois nodeSel = Body
		if(nodeSel.nodeName == 'BODY')
		{
			var lastChild = nodeSel.childNodes[nodeSel.childNodes.length - 1];
			if(lastChild && lastChild.nodeName == 'P') nodeP = lastChild;
		}
		
		if(nodeP)
		{
			
			// Bug sous Firefox : Un phrase contient 2 SPAN. On supprime le mot du 1er (on obtient un span vide). On place le cursuer au milieu du 2nd span, et on maintient la touche de suppression enfonc�e.
			// Un SPAN vide au d�but d'une SPAN phrase provoque l'erreur. Il faut donc supprimer ce PSAN vide.
			// -> Le curseur se retrouve sur le paragraphe pr�c�dent. Cause : le SPAN vide avant. Il faut donc les supprimer.
			if(Cor.IsMozillaF == true)
			{
				// Bidouillage. A revoir eventuellement.
				if(nodeP.childNodes.length > 0)
				{
					var childNodePh0 = nodeP.childNodes[0];
					if(childNodePh0.childNodes.length > 0)
					{
						var childNode0 = childNodePh0.childNodes[0];
						//if(childNode0.textContent.length == 0) childNodePh0.removeChild(childNode0);
						if(childNode0.nodeName == 'SPAN' && childNode0.textContent.length == 0)
						{
							childNodePh0.removeChild(childNode0);
							return true;
						}
					}
				}
				
				// Suppression des SPAN vides
				for(var i = 0; i < nodeP.childNodes.length; i++)
				{
					var childNodePh = nodeP.childNodes[i];
					
					var tabNodeSupp = [];
					for(var u = 0; u < childNodePh.childNodes.length; u++)
					{
						var childNodeSpan1 = childNodePh.childNodes[u];
						if(childNodeSpan1.nodeName == 'SPAN')
						{
							if(childNodeSpan1.textContent.length == 0) tabNodeSupp.push(childNodeSpan1);
							
							// Traite les �ventuelles parenth�ses.
							var tabNodeSuppPar = [];
							for(var v = 0; v < childNodeSpan1.childNodes.length; v++)
							{
								var childNodeSpanPar = childNodeSpan1.childNodes[v];
								if(childNodeSpanPar.nodeName == 'SPAN' && childNodeSpanPar.textContent.length == 0) tabNodeSuppPar.push(childNodeSpanPar);	
							}
							for(var v = 0; v < tabNodeSuppPar.length; v++) childNodeSpan1.removeChild(tabNodeSuppPar[v]);
						}
					}
					
					for(var u = 0; u < tabNodeSupp.length; u++) childNodePh.removeChild(tabNodeSupp[u]);
				}
			}
			
			// Bug de Firefox. pour le reproduire. Add char plusieurs fois, espace entre temps. Un <Br> se met � la fin.
			
			// Supprression au milieu. Ajout � la fin. 
			if(Cor.IsMozillaF == true)
			{
				// Bug 2 sur Firefox : startContainer ne repr�sente pas forc�ment le deepestNode. Meme au milieu d'un paragraphe.
				// Ex : Comme quoi les p�niches que les industriels ont d�cid�es d�exploiter, sont en effet tr�s sollicit� -> on commence par supprimer la fin de exploiter. jusqu'au "d" de "d�cid�es".
				if(nodeSel.nodeName == 'SPAN' && rangeSel.startOffset > 0)	// Non au d�but d'un paragraphe
				{
					if(rangeSel.startOffset < nodeSel.childNodes.length)
					{
						var chilNodeNodeSel = nodeSel.childNodes[rangeSel.startOffset];
						if(chilNodeNodeSel)
						{
							var newRange = document.createRange();
							newRange.selectNode(nodeP);
							newRange.setEndBefore(chilNodeNodeSel);
							
							//if(newRange.toString().length == 0) return true;
							
							//if(chilNodeNodeSel.textContent.length == 0) return true;
							
							//var pos = indP + ":" + newRange.toString().length;
						
							//return pos;
						}
					}
					else if(rangeSel.startOffset == nodeSel.childNodes.length)
					{
						var chilNodeNodeSel = nodeSel.childNodes[rangeSel.startOffset - 1];
						if(chilNodeNodeSel)
						{
							//var newRange = document.createRange();
							//newRange.selectNode(nodeP);
							//newRange.setEndAfter(chilNodeNodeSel);
							
							//var pos = indP + ":" + newRange.toString().length;
						
							//return pos;
						}
					}
				}
			}
			
			//alert(nodeP.textContent);
			var newRange = document.createRange();
			newRange.selectNode(nodeP);
			newRange.setEndBefore(nodeSel);
			posInPar = (newRange.toString().length + rangeSel.startOffset);
			
			if(posInPar == 0) return true;
			
			// Firefox : P vide
			if(nodeP.textContent.length == 0) return true;
		}
	}
	return false;
},

// Envoi le remplacement du texte au plugin
SendToPluginReplace : function(indP, posRepInP, longueur, solutionSt, motToReplaceSt)
{
	// 1. Indicateur d'action
	var messageRep = "rep" + ";";
	// 2. Num�ro de paragraphe du d�but de la s�lection.
	messageRep = messageRep + indP + ";";
	// 3. Start position
	messageRep = messageRep + posRepInP + ";";
	// 4. Num�ro de paragraphe de la fin de la s�lection.
	messageRep = messageRep + indP + ";";
	// 5. End position
	var endPos = posRepInP + longueur;
	messageRep = messageRep + endPos + ";";
	// 5. Nouveau texte
	solutionSt = solutionSt.replace(new RegExp(";", "g"), "___pv___");	// Le s�parateur �tant ;, on le remplace par ___pv___
	messageRep = messageRep + solutionSt;
	
	// 6. pour powerpoint : numSlide pour Excel : numRow_numColumn
	if((Plugins.Type == "MSPowerPoint") || (Plugins.Type == "MSExcel") || (Plugins.Type == "MSPowerPointOSX") || (Plugins.Type == "MSExcelOSX") || (Plugins.Type == "MSExcelWeb") || (Plugins.Type == "GoogleSheets"))
	{
		messageRep = messageRep +";";
		messageRep = messageRep + Plugins.MapIndicateurP.get(indP);
	}
	
	// Envoi l'ancien message
	if((Plugins.Type != "Firefox") && (Plugins.Type != "Thunderbird") && (Plugins.Type != "Chrome") && (Plugins.Type != "OOWriter") &&
	   (Plugins.Type != "MSWordOSX") && (Plugins.Type != "MSPowerPointOSX") && (Plugins.Type != "MSExcelOSX") && (Plugins.Type != "Integration") && (Plugins.Type != "Safari") &&
	   (Plugins.Type != "MSWordWeb") && (Plugins.Type != "MSExcelWeb") && (Plugins.Type != "GoogleDocs") && (Plugins.Type != "GoogleSheets") && (Plugins.Type != "Wysiwyg"))
	{
		Plugins.SendToPlugin(messageRep);
	}
	
	// 7. Pour OpenOffice, le mot � remplacer comme gage de contr�le.
	// Envoi le message avant pour rester compatible.
	// TEMPORAIRE : il faudra d'envoyer qu'un seul message
	//if(Plugins.Type.equals("OOWriter"))
	{
		messageRep = messageRep.replace("rep;", "REP:");	// Replace the first occurrence only.
		messageRep = messageRep +";";
		if(motToReplaceSt.length == 0) motToReplaceSt = "_";
		motToReplaceSt = motToReplaceSt.replace(new RegExp(";", "g"), "___pv___");	// Le s�parateur �tant ;, on le remplace par ___pv___
		
		messageRep = messageRep + motToReplaceSt;
		
		Plugins.SendToPlugin(messageRep);
	}
},

// 2 cas ou l'�v�nement click est annul� :
// - ENTER car la modification dans Word est trop complexe.
// - SUPPR � la position 0 du 1er paragraphe sinon cela le supprime.
KeyCancelable : function(keyCode, down)
{
	if(Plugins.Type != null)
	{
		// Retourne les conditions pour annuler une touche clavier.
		if(TextEditor.CondCancelable(keyCode, down)) return true;
		
		// Touche entree
		if(keyCode == 13) return true;
	}
	
	// Touche suppression
	if(keyCode == 8)
	{
		try
		{
			var posAbsCursorSt = TextEditor.GetPosAbsolute(false);
			var tabSt = posAbsCursorSt.split(":");
			
			var indP = -1;
			var posAbsCursor = -1;
			if(tabSt.length == 2)
			{
				indP = parseInt(tabSt[0]);
				posAbsCursor = parseInt(tabSt[1]);
			}
			
			if(indP == 0 && posAbsCursor == 0) return true;
		}
		catch(ex){}
	}
	
	return false;
},

// Retourne les conditions pour annuler une touche clavier.
CondCancelable : function(keyCode, down)
{
	// Plus abonn�
	if(Cor.InitModeAbonne == false && Cor.Demo == false) return true;
	
	// Trop compliqu� de modifier les caract�res avec le clavier sous MSPowerPoint, OpenOffice et MSExcel
	if(((Plugins.Type == "MSPowerPoint") && Plugins.VersionPlugin == 1) ||
	   ((Plugins.Type == "MSExcel") && Plugins.VersionPlugin == 1) ||
	   ((Plugins.Type == "MSExcelWeb")) || 	// MSExcelWeb : instable.
	   (Cor.IsMSOfficeWinForDesktop && (Plugins.Type == "MSWordWeb")) ||		// Instable with IE11.
	   (Cor.IsMac && (Plugins.Type == "MSWordWeb")))	// Instable with the pseudo browser of Mac with Word and Excel 2016
	   /* || Plugins.Type.equals("OOWriter")*/
	   // Chrome : trop complexe pour l'instant.
	   /*Plugins.Type.equals("Chrome") || Plugins.Type.equals("Firefox") || Plugins.Type.equals("Thunderbird"))*/
	{
		return true;
	}
	
	// Si une des extremiti� de la s�lection fait partie d'une expression. Sur TinyMce, l'ajout ou la suprresion font n'importe quoi.
	if(TextEditor.SelectionOfExpression()) return true;
	
	// Touche < et > . Compliqu�.
	if((keyCode == 60 && Cor.IsMozillaF) ||
	   (keyCode == 226 && (Cor.IsChrome || Cor.IsIE11)) ||
	   ((keyCode == 186 || keyCode == 188 || keyCode == 220 || keyCode == 190 || keyCode == 219 || keyCode == 229 || keyCode == 192) && Cor.IsSafari))
	{
		return true;
	}
	
	// Pour OpenOffice et LibreOffice, pas de modification sur une s�lection de longueur > 0
	if(Plugins.Type == "OOWriter")
	{
		if(TextEditor.SelectionLg()) return true;
	}
	
	if((Plugins.Type == "MSPowerPoint") || (Plugins.Type == "MSExcel") || (Plugins.Type == "MSPowerPointOSX") || (Plugins.Type == "MSExcelOSX") || (Plugins.Type == "MSWordOSX") || // MSXWordOSX ajout� car plugin pas enti�rement stable.
	   (Plugins.Type == "Chrome") || (Plugins.Type == "Firefox") || (Plugins.Type == "Thunderbird") || (Plugins.Type == "Integration") || (Plugins.Type == "Safari") || (Plugins.Type == "OOWriter") ||
	   (Plugins.Type == "MSWordWeb") || (Plugins.Type == "MSExcelWeb") || (Plugins.Type == "GoogleDocs") || (Plugins.Type == "GoogleSheets") || (Plugins.Type == "MSWord") || (Plugins.Type == "Wysiwyg") ||
	   Cor.IsMozillaF)
	{
		// Si la selection recouvre plusieurs paragraphe.
		if(TextEditor.SelectionMultiPar()) return true;

		// Pas de suppression en d�but de paragraphe (suppression de ligne impossible).
		if(keyCode == 8 && TextEditor.SuppDebPar())
		{
			/*if(down) bb = true;
		
			// Si up et avant down bb == true.
			if(down == false && bb == true)
			{
				if(nb == 2) bb = false;
				return true;
			}
			
			if(down) return true;*/
			
			if(down) return true;
		}
	}
	
	return false;
},

// Evenement cut
Cut : function()
{
	// V�rifie le texte -> note les phrases qui ont change�
	TextEditor.CheckTexte();
	
	// Un des 3 moyens modifiant un texte
	if(Cor.FirstRequest == false)
	{
		Cor.TexteModified = true;
		Stat.CheckedStat = false;
	}
	
	TextEditor.CopyToClipBoard();
	
	// Hide the popups
	Cor.PopupPanelSol.SetVisible(false, false, false, true);
},

// Remplace l'attribut class des mots de la selection, pour qu'ils n'aient plus de forme pour la copie.
CopyToClipBoard : function()
{
	var document = TextEditor.Document;

	var elements = document.getElementsByTagName('SPAN');
	for (var i = 0; i < elements.length; i++)
	{
		var element = elements[i];
		var idClass = element.getAttribute('class');
		if(idClass && idClass.indexOf('s-') != -1)
		{
			idClass = idClass + '-t';
			element.setAttribute('class', idClass);
		}
	}			

	TextEditor.TimerReputClassNode();
	
},

// Apr�s n ms, on remet l'id class des node de mots comme avant.
TimerReputClassNode : function()
{
	setTimeout(function()
	{
		// Remet les attrubts class des nodes des mots normalement
		TextEditor.ReputClassNode();
		
	}, 10);		// Lance le timer. A 10ms, on ne voit pas le raffraichissement.
},

// Parcours l'ensemble des documents pour remmetre l'id class des node de mots comme avant.
ReputClassNode : function()
{
	var document = TextEditor.Document;

	var elements = document.getElementsByTagName('SPAN');
	for (var i = 0; i < elements.length; i++)
	{
		var element = elements[i];
		var idClass = element.getAttribute('class');
		if(idClass && idClass.indexOf('-t') != -1)
		{
			idClass = idClass.substring(0, idClass.length - 2);
			element.setAttribute('class', idClass);
		}
	}		

},

// Handler paste. Used for smartphones.
// Not possible.
Handler_Paste : function()
{
	//var clipboardData = TextEditor.Window.clipboardData;
	//alert(clipboardData);
	
	TextEditor.Document.execCommand('paste');
},

// Handler copy allt the text.
Handler_Copy : function()
{
	TextEditor.Document.execCommand('selectAll');
	TextEditor.Document.execCommand('copy');
},

// Init TextArea
Init_TextArea : function()
{
	var textFrame = document.getElementById("FrameTx");
	TextEditor.Document = textFrame.contentDocument;
	TextEditor.Window = textFrame.contentWindow;
	
	var body = TextEditor.Document.body;

	// Set document editable
	body.setAttribute("contenteditable", "true");
	// Deactivate spellchecker
	body.setAttribute("spellcheck", "false");
	
	// Set the font size from the options
	body.style.fontSize = TextEditor.FontSize + "px";
	body.style.fontFamily = "Segoe-UI";
	
	// iOS. iPhone and iPad. Set the frame scrollable.
	if(Cor.IsIOS == true && (Cor.IsMobile == true || Cor.IsTablet == true))
	{
		var textArea = document.getElementById("TextArea");
		textArea.style.overflow = "scroll";
		textArea.style.webkitOverflowScrolling = "touch";
	}
	
	// Set a specific css to the text editor.
	var cssLink = document.createElement("link") 
	cssLink.href = "Css/TextEditor2.css"; 
	if(Cor.IsMobile == true)
	{
		if(!(Cor.IsIOS == true && (Cor.IsMobile == true || Cor.IsTablet == true))) cssLink.href = "Css/TextEditor_mobile.css";
		else cssLink.href = "Css/TextEditor_mobile_ios.css";
	}
	else if(Cor.IsTablet == true)
	{
		if(!(Cor.IsIOS == true && (Cor.IsMobile == true || Cor.IsTablet == true))) cssLink.href = "Css/TextEditor_tablet.css";
		else cssLink.href = "Css/TextEditor_tablet_ios.css";
	}
	cssLink.rel = "stylesheet"; 
	cssLink.type = "text/css"; 
	TextEditor.Document.childNodes[0].childNodes[0].appendChild(cssLink);
	
	if(!(Cor.IsIOS == true && (Cor.IsMobile == true || Cor.IsTablet == true)))
	{
		// Init the document with an empty paragraph.
		TextEditor.Document.body.innerHTML = "<p></p>";
	}
	// iPhone and iPad. Ask to the user to paste
	else
	{
		if(Cor.IdLangue == 'fr') TextEditor.Document.body.innerHTML = "<p>Collez votre texte ici.</p>";
		else if(Cor.IdLangue == 'en') TextEditor.Document.body.innerHTML = "<p>Paste your text here.</p>";
	}
	
	// Set Paste event. Plain Text.
	var elementFocusable = TextEditor.Document;
	if(Cor.IsIE || Cor.IsIE10 || Cor.IsIE11 || Cor.IsEdge) elementFocusable = TextEditor.Document.body;
	
	elementFocusable.onpaste = function(event)
	{
		if(!(Cor.IsIOS == false && (Cor.IsMobile == true || Cor.IsTablet == true)))
		{
			// Cancel event
			event.preventDefault();
				
			// Bloque l'�venement paste en mode plugin
			if(Plugins.Type == null)
			{
				if(!(Cor.IsIE || Cor.IsIE10 || Cor.IsIE11))
				{
					// iPhone and iPad. Remove the explanation paste text (auto spellcheck problem).
					if(Cor.IsIOS == true && (Cor.IsMobile == true || Cor.IsTablet == true))
					{
						if(TextEditor.ExplanationPasteText == true)
						{
							TextEditor.ExplanationPasteText = false;
							TextEditor.Document.body.innerHTML = "<p></p>";
						}
					}
					
					var clipboardData = event.clipboardData;
					var plainText = clipboardData.getData("text/plain");

					// Replace carriage returns by <br>
					plainText = plainText.replace(/(\r\n|\n|\r)/g, "<br>");
					
					// Set Text as a paragraph
					plainText = '<p>' + plainText + '</p>';
					
					// Insert HTML text at the cursor.
					TextEditor.Document.execCommand("insertHTML", false, plainText);
					
					// iPhone and iPad. Set the content not editable (auto spellcheck problem).
					if(Cor.IsIOS == true && (Cor.IsMobile == true || Cor.IsTablet == true))
					{
						body.setAttribute("contenteditable", "false");
						body.style.cursor = "default";
					}
				}
				else
				{
					var clipboardData = TextEditor.Window.clipboardData;
					var plainText = clipboardData.getData("Text");

					// Replace carriage returns by <br>
					plainText = plainText.replace(/(\r\n|\n|\r)/g, "<br>");
					
					// Set Text as a paragraph
					// plainText = '<p>' + plainText + '</p>';
					
					// Insert HTML text at the cursor.
					// IE11
					if(Cor.IsIE11)
					{
						var range = TextEditor.Document.getSelection().getRangeAt(0);
						var contextualFragment = range.createContextualFragment(plainText);
						range.insertNode(contextualFragment);
					}
					// IE10
					else if(Cor.IsIE10)
					{
						var range = TextEditor.Document.selection.createRange();
						if (range.pasteHTML) {
							range.pasteHTML(plainText);
						}
					}
				}
				
				// Apply modifications
				TextEditor.Paste();
				
				// Setting autocorrect when pasting
				if(Cor.AutoCorrect_AfterPaste == true ||
				// Mode smarthone. Very usefull
				   Cor.IsMobile == true)
				{
					Cor.Check(false);
				}
			}
		}
		// Android. Smartphone && tablet. Problem: clipboardData is inacessible.
		else
		{
			// Empty the text
			//TextEditor.Document.body.innerHTML = "<p></p>";
				
			// Wait for the text paste.
			setTimeout(function() {
				
				// Get the text of the textArea
				var body = TextEditor.Document.body;
				var plainText = body.innerText;
				
				plainText = plainText.replace(/(\r\n|\n|\r)/g, "<br>");
				
				// Set Text as a paragraph
				plainText = '<p>' + plainText + '</p>';
					
				// Insert HTML text at the cursor.
				TextEditor.Document.body.innerHTML = plainText;
				
				//TextEditor.Document.execCommand("insertHTML", false, plainText);
				
				if(Plugins.Type == null)
				{
					// Apply modifications
					TextEditor.Paste();
					
					// Setting autocorrect when pasting
					if(Cor.AutoCorrect_AfterPaste == true ||
					// Mode smarthone. Very usefull
					   Cor.IsMobile == true)
					{
						Cor.Check(false);
					}
				}
				
			}, 100);
		}
	};
	
	// Clik event
	TextEditor.Document.onclick = function(evt)
	{
		if(evt.which == 1 || navigator.appName.indexOf('Internet Explorer') != -1)
		{
			var pos_x = evt.clientX;
			var pos_y = evt.clientY;
			TextEditor.ClickOnText(pos_x, pos_y);
		}
	};
	
	// Evenement keydown
    TextEditor.Document.onkeydown = function(evt) 
    { 
		// iPhone and iPad. Cancel any action on the keyboard because the textarea musn't editable. (auto spellcheck problem)
		if(Cor.IsIOS == true && (Cor.IsMobile == true || Cor.IsTablet == true))
		{
			evt.preventDefault();
			return;
		}
		
		// Evenements que l'on dois annuler
		if(TextEditor.KeyCancelable(evt.keyCode, true) == true)
		{
			evt.preventDefault();
		}
		//else
		//{
			TextEditor.KeyDown(evt.keyCode);
		//}
    };
   
    // Evenement keyup
    TextEditor.Document.onkeyup = function(evt)
    {
		// iPhone and iPad. Cancel any action on the keyboard because the textarea musn't editable. (auto spellcheck problem)
		if(Cor.IsIOS == true && (Cor.IsMobile == true || Cor.IsTablet == true))
		{
			evt.preventDefault();
			return;
		}
		
		// Evenements que l'on dois annuler
		if(TextEditor.KeyCancelable(evt.keyCode, false) == true)
		{
			evt.preventDefault();
		}
		//else
		//{
			TextEditor.KeyUp(evt.keyCode);
		//}
    };
	
	// Copy event
	if(Cor.IsChrome || Cor.IsSafari || Cor.IsIE9 || Cor.IsIE10 || Cor.IsIE11)
    {
		// Copy Event
	    TextEditor.Document.oncopy = function(evt)
	    {
		    TextEditor.CopyToClipBoardT();
	    };
    }
	
	// Cut event
	TextEditor.Document.oncut = function(evt)
    {
	    // Bloque l'�venement paste en mode plugin
	    if(Plugins.Type == null)
	    {
		    TextEditor.Cut();
	    }
	    else evt.preventDefault();
    };
	
	// En mode plugin, cache le contextmenu
    if(Plugins.Type)
    {
	    TextEditor.Document.oncontextmenu = function(evt)
	    {
		   evt.preventDefault();
	    }
    }
	
	// Set focus
    if(Plugins.Type == null)
    {
	    //ed.execCommand('mceFocus', true);
		TextEditor.Window.focus();
    }
	
    if(Plugins.Type == 'Integration' ||
	  (Plugins.Type == 'Chrome' && Plugins.VersionPlugin == 2) ||
	  (Plugins.Type == 'Firefox' && Plugins.VersionPlugin == 2) ||
	  (Plugins.Type == 'OOWriter') ||
	  (Plugins.Type == 'Safari') ||
	  (Plugins.Type == 'MSWord' && Plugins.VersionPlugin == 3) ||
	  (Plugins.Type == 'MSWordOSX') || (Plugins.Type == 'MSPowerPointOSX') || (Plugins.Type == 'MSExcelOSX') ||
	  (Plugins.Type == 'MSWordWeb') || (Plugins.Type == 'MSExcelWeb') ||
	  (Plugins.Type == 'GoogleDocs') || (Plugins.Type == 'GoogleSheets') ||
	  (Plugins.Type == 'Wysiwyg'))
    {
	    // Evenement de focous sur la fen�tre du TextEditor
	    TextEditor.Window.onfocus = function(evt)
	    {
			// Non en IE.
			if(Cor.IsIE == false && Cor.IsIE11 == false)
		    {
				Plugins.FocusWindow(false);
		    }
		
			if((Plugins.Type == 'GoogleDocs' || Plugins.Type == 'GoogleSheets') && Plugins.VersionPlugin == 2)
			{
				Plugins.Focus_TextEditor = true;

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
	    };
	   
	    // Evenement de blur sur la fen�tre du TextEditor
	    if((Plugins.Type == 'GoogleDocs' || Plugins.Type == 'GoogleSheets') && Plugins.VersionPlugin == 2)
	    {
			TextEditor.Window.onblur = function()
			{
				Plugins.Focus_TextEditor = false;
				
				window.setTimeout(function()
				{
					if(Plugins.Focus_TextEditor == false && Plugins.Focus_MainWindow == false)
					{
						Plugins.Blur_Total = true;
					}
				}
				, 200);
			}
	    };
   }
   
   TextEditor.Ready = true;
	
	// Test
	//TextEditor.Document.write("<p>il est la</p>");
}

}


// Ensembles des touches clavier alphanum�riques
for(var i = 48; i < 60; i++) TextEditor.SetKeybAlphaNum.add(i);
for(var i = 65; i < 91; i++) TextEditor.SetKeybAlphaNum.add(i);
for(var i = 97; i < 123; i++) TextEditor.SetKeybAlphaNum.add(i);
TextEditor.SetKeybAlphaNum.add(0);TextEditor.SetKeybAlphaNum.add(32);/*SetKeybAlphaNum.add(13);*/TextEditor.SetKeybAlphaNum.add(8);TextEditor.SetKeybAlphaNum.add(190);TextEditor.SetKeybAlphaNum.add(191);TextEditor.SetKeybAlphaNum.add(223);
TextEditor.SetKeybAlphaNum.add(219);TextEditor.SetKeybAlphaNum.add(187);TextEditor.SetKeybAlphaNum.add(188);TextEditor.SetKeybAlphaNum.add(161);

TextEditor.SetKeybAlphaNumFirefox.add(169);TextEditor.SetKeybAlphaNumFirefox.add(61);TextEditor.SetKeybAlphaNumFirefox.add(160);TextEditor.SetKeybAlphaNumFirefox.add(164);TextEditor.SetKeybAlphaNumFirefox.add(165);TextEditor.SetKeybAlphaNumFirefox.add(170);

TextEditor.SetKeybAlphaNumChrome.add(221);TextEditor.SetKeybAlphaNumChrome.add(222);TextEditor.SetKeybAlphaNumChrome.add(186);TextEditor.SetKeybAlphaNumChrome.add(192);TextEditor.SetKeybAlphaNumChrome.add(220);

TextEditor.SetKeybAlphaNumIE.add(221);TextEditor.SetKeybAlphaNumIE.add(222);TextEditor.SetKeybAlphaNumIE.add(186);TextEditor.SetKeybAlphaNumIE.add(192);TextEditor.SetKeybAlphaNumIE.add(220);

TextEditor.SetKeybAlphaNumSafari.add(221);TextEditor.SetKeybAlphaNumSafari.add(222);TextEditor.SetKeybAlphaNumSafari.add(189);TextEditor.SetKeybAlphaNumSafari.add(220);
