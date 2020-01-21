
var Util = {

// Get value of a URL parameter.
GetQueryVariable : function(param)
{
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for(var i = 0; i < vars.length; i++)
	{
		var pair = vars[i].split("=");
		if(pair[0] == param){return pair[1];}
	}
	
	return null;
},

// Set cookies
SetCookie : function(cname, cvalue, exdays)
{
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
},

// Get cookies
GetCookie : function(cname)
{
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++)
	{
		var c = ca[i];
		while(c.charAt(0) == ' ')
		{
			c = c.substring(1);
		}
		if(c.indexOf(name) == 0)
		{
			return c.substring(name.length, c.length);
		}
	}
	return "";
},

// Send http request
SendHttpRequest : function(servletId, tab, fct, param1, param2)
{
	var xmlhttpRequest = new XMLHttpRequest();
	//xmlhttpRequest.open("POST", "http://localhost:8080/Scribens/" + servletId);
	
	var urlWebSite = "https://www.scribens.fr";
	if(Cor.IdLangue == "en") urlWebSite = "https://www.scribens.com";
	
	/*var tomcat_Instance = "Scribens";
	if((servletId == "TextSolution_Servlet") ||
	   (servletId == "Progression_Servlet"))
	{
		// Ramdomly separate the requests to suport charges. There are 2 instances of Tomcat.
		var nb = Math.floor(Math.random() * 10);
		if(nb % 2 == 1) tomcat_Instance = "X2";
		
		tomcat_Instance = "X2";
	}*/
	
	var tomcat_Instance = Cor.Id_Tomcat;
	
	if((servletId == "Identification_Servlet")/* ||
	   (servletId == "Pr_Servlet")*/)
	{
		tomcat_Instance = "Scribens";
	}
	
	xmlhttpRequest.open("POST", urlWebSite + "/" + tomcat_Instance + "/" + servletId);
	xmlhttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
	if(fct)
	{
		xmlhttpRequest.onreadystatechange = function ()	 //Call a function when the state changes.
		{
			if (xmlhttpRequest.readyState == 4 && xmlhttpRequest.status == 200)
			{
				if(xmlhttpRequest.response != null)
				{
					fct(JSON.parse(xmlhttpRequest.response), param1, param2);
				}
			}
		};
	}

	var request = '';
	for(var i = 0; i < tab.length; i++)
	{
		request += tab[i][0] + '=' + encodeURIComponent(tab[i][1]);		// Encode to avoid &= and % in parameter.
		if(i < (tab.length - 1)) request += '&&';
	}
	
	xmlhttpRequest.send(request);
},

// Send http request
SendHttpRequestX2 : function(servletId, tab, fct, param1, param2)
{
	var xmlhttpRequest = new XMLHttpRequest();
	//xmlhttpRequest.open("POST", "http://localhost:8080/Scribens/" + servletId);
	
	var urlWebSite = "https://www.scribens.fr";
	if(Cor.IdLangue == "en") urlWebSite = "https://www.scribens.com";
	
	xmlhttpRequest.open("POST", urlWebSite + "/X2/" + servletId);
	xmlhttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
	if(fct)
	{
		xmlhttpRequest.onreadystatechange = function ()	 //Call a function when the state changes.
		{
			if (xmlhttpRequest.readyState == 4 && xmlhttpRequest.status == 200)
			{
				if(xmlhttpRequest.response != null)
				{
					fct(JSON.parse(xmlhttpRequest.response), param1, param2);
				}
			}
		};
	}

	var request = '';
	for(var i = 0; i < tab.length; i++)
	{
		request += tab[i][0] + '=' + encodeURIComponent(tab[i][1]);		// Encode to avoid &= and % in parameter.
		if(i < (tab.length - 1)) request += '&&';
	}
	
	xmlhttpRequest.send(request);
},

// Tranforme une date de type : year + ";" + month + ";" + day en String lisible pour l'utilisateur.
GetDateSt : function(date)
{
	var dateSt = "";
	
	var indEsp = date.indexOf(" ");
	if(indEsp > 0)
	{
		date = date.substring(0, indEsp);
		var tabSt = date.split("-");
		if(tabSt.length == 3)
		{
			// Jour du mois
			var day = tabSt[2];
			if(day.indexOf("0") == 0) day = day.substring(1);
			
			dateSt += day + " ";
			
			// Mois
			if(tabSt[1] == "01") dateSt += "janvier";
			else if(tabSt[1] == "02") dateSt += "f" + String.fromCharCode(233) + "vrier";
			else if(tabSt[1] == "03") dateSt += "mars";
			else if(tabSt[1] == "04") dateSt += "avril";
			else if(tabSt[1] == "05") dateSt += "mai";
			else if(tabSt[1] == "06") dateSt += "juin";
			else if(tabSt[1] == "07") dateSt += "juillet";
			else if(tabSt[1] == "08") dateSt += "ao" + String.fromCharCode(251) + "t";
			else if(tabSt[1] == "09") dateSt += "septembre";
			else if(tabSt[1] == "10") dateSt += "octobre";
			else if(tabSt[1] == "11") dateSt += "novembre";
			else if(tabSt[1] == "12") dateSt += "d" + String.fromCharCode(233) + "cembre";
			
			dateSt += " ";
			
			// Ann�e
			dateSt += tabSt[0];
		}
	}
	
	return dateSt;
},

// Conditions on userName
Condition_Username : function(userName)
{
	if(userName != null)
	{
		if(userName.length > 0 && userName.length < 32 && !(userName.indexOf("|") >= 0))	// | Séparateur dans la requète IPN.
		{
			return true;
		}
	}
	
	return false;
},

// Conditions on email
Condition_Email : function(email)
{
	if(email != null)
	{
		/*if((email.indexOf("@") > 0) && (email.indexOf(".") > 0) &&
		  !(email.indexOf("@") == 0) && !(email.indexOf(".") == 0) &&
		  !(email.indexOf("@") == (email.length - 1)) && !(email.indexOf(".") == (email.length - 1)) &&
		  !(email.indexOf(",") >= 0) && !(email.indexOf("'") >= 0) &&	// Virgule prohib�e en MySql
		   // Condition Paypal et pas de |, s�parateur dans la requ�te IPN.
		   email.length < 127 && !(email.indexOf("|") >= 0))
		{
			return true;
		}*/
		
		// New conditions
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}
	
	return false;
},

// Conditions on comments
Condition_Comments : function(comments)
{
	if(comments != null && !(comments.indexOf("|") >= 0))
	{
		return true;
	}
	
	return false;
},

// Cor Util

// Remplace la phrase � corriger
ReplacePhraseACorriger : function(phraseCorrigeSt, idPhrase)
{	
	// Trouve la phrase
	var document = TextEditor.Document;

	var nodePhrase = document.getElementById(idPhrase);

	if(nodePhrase)
	{
		// Supprime les ids de l'ancienne phrase de la map
		for(var v = 0; v < nodePhrase.childNodes.length; v++)
		{	
			var nodeMot = nodePhrase.childNodes[v];
			
			if(nodeMot.nodeName == 'SPAN')
			{
				var idM = nodeMot.getAttribute('id');
				if(idM)
				{
					Cor.SetId.delete(idM);
					
					// Il s'agit d'une phrase entre parenth�se. Applique la m�me chose
					if(idM.indexOf('p') != -1)
					{
						Cor.SetId.delete(idM);
						
						// Parcours des mots.
						for(var w = 0; w < nodeMot.childNodes.length; w++)
						{	
							var nodeMotPar = nodeMot.childNodes[w];
							if(nodeMotPar.nodeName == 'SPAN')
							{
								var idMPar = nodeMotPar.getAttribute('id');
								if(idMPar)
								{
									Cor.SetId.delete(idMPar);
								}
							}
						}
					}
				}
			}
		}
		
		// Remplace par la nouvelle phrase
		nodePhrase.innerHTML = phraseCorrigeSt;
							
		// D�oplace les �l�ments avant
		var parentNode = nodePhrase.parentNode;
		for (var w = 0; w < nodePhrase.childNodes.length; w++) {
			parentNode.insertBefore(nodePhrase.childNodes[w].cloneNode(true), nodePhrase);
		}
		// Supprime l'ancienne phrase
		parentNode.removeChild(nodePhrase);
	}
},

// Si le texte est correct, afficher un label pour le signaler.
VerificationErreurExiste : function()
{
	// Par souci d'�conomie, on ne fait la v�rification que pour une taille limit�e.
	if(TextEditor.GetBrutText().length < 20000)
	{
		if(!Util.ErreursExiste()) Cor.SetVisible_ErrorLabel(true);
		else Cor.SetVisible_ErrorLabel(false);
	}
	else Cor.SetVisible_ErrorLabel(false);
},

// Set if errors exists
ErreursExiste : function()
{
	var nodeBody = TextEditor.Document.body;

	for(var i = 0; i < nodeBody.childNodes.length; i++)	// Parcours des <p>
	{
		var nodeP = nodeBody.childNodes[i];
		//alert(nodeP.nodeName);
		for(var u = 0; u < nodeP.childNodes.length; u++)
		{
			var nodePhrase = nodeP.childNodes[u];
			
			if(nodePhrase.nodeName == 'SPAN')
			{
				var idp = nodePhrase.getAttribute('id');
				if(idp)
				{
					if(idp.indexOf('p') != -1)
					{
						//alert(idp);
						for(var v = 0; v < nodePhrase.childNodes.length; v++)
						{
							var nodeMot = nodePhrase.childNodes[v];
							if(nodeMot.nodeName == 'SPAN')
							{
								// Expression
								var valAtt = 's-';
								if(Cor.IsIE8) valAtt = '#';
								
								var classM = nodeMot.getAttribute('class');
								if(Cor.IsIE8 && nodeMot.style) classM = nodeMot.style.color;
								
								if(classM && (classM.length > 0) && (classM.indexOf(valAtt) != -1))
								{
									return true;
								}
								
								// Mot
								var idMot = nodeMot.getAttribute('id');
								if(idMot)
								{
									// Erreur.
									var estSolCor = Cor.MapMotsSolution.has(idMot);
									
									if(estSolCor == true) return true;
									
									// Parenth�ses
									if(idMot.indexOf('p') != -1)
									{
										for(var w = 0; w < nodeMot.childNodes.length; w++)
										{
											var nodePar = nodeMot.childNodes[w];
											if(nodePar.nodeName == 'SPAN')
											{
												// Expression
												var classMPar = nodePar.getAttribute('class');
												if(Cor.IsIE8 && nodePar.style) classMPar = nodePar.style.color;
												
												if(classMPar && (classMPar.length > 0) && (classMPar.indexOf(valAtt) != -1))
												{
													return true;
												}
								
												// Mot
												var idmpar = nodePar.getAttribute('id');
												if(idmpar)
												{
													// Erreur.
													var estSolCor = Cor.MapMotsSolution.has(idmpar);
													
													if(estSolCor == true) return true;
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return false;

},

// Remplit la liste des id du document
ConstruitMapElements : function()
{
	var nodeBody = TextEditor.Document.body;
	
	for(var i = 0; i < nodeBody.childNodes.length; i++)		// Parcours des <p>
	{
		var nodeP = nodeBody.childNodes[i];
		
		for(var u = 0; u < nodeP.childNodes.length; u++)
		{
			var nodePhrase = nodeP.childNodes[u];
			if(nodePhrase.nodeName == 'SPAN')
			{
				var id = nodePhrase.getAttribute('id');
				if(id && id.indexOf('p') != -1)	// Phrase
				{
					Cor.SetId.add(id);
				
					//if(id.indexOf('p89') != -1)
					//{
					//	alert(id);
					//	alert(nodePhrase.innerHTML);
					//}
					
					// Parcours des mots de r�p�titions.
					for(var v = 0; v < nodePhrase.childNodes.length; v++)
					{	
						var nodeMot = nodePhrase.childNodes[v];
						
						if(nodeMot.nodeName == 'SPAN')
						{
							var idM = nodeMot.getAttribute('id');
							if(idM)
							{
								var tabIdM = idM.split("-");
								for(var z = 0; z < tabIdM.length; z++) Cor.SetId.add(tabIdM[z]);
								
								// Il s'agit d'une phrase entre parenth�se. Applique la m�me chose
								if(idM.indexOf('p') != -1)
								{
									Cor.SetId.add(idM);
									
									// Parcours des mots.
									for(var w = 0; w < nodeMot.childNodes.length; w++)
									{	
										var nodeMotPar = nodeMot.childNodes[w];
										if(nodeMotPar.nodeName == 'SPAN')
										{
											var idMPar = nodeMotPar.getAttribute('id');
											if(idMPar)
											{
												var tabIdMPar = idMPar.split("-");
												for(var e = 0; e < tabIdMPar.length; e++) Cor.SetId.add(tabIdMPar[e]);
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
},

// Remplit la liste des id d'une phrase.
ConstruitMapElementsPhrase : function(idPhrase)
{
	var document = TextEditor.Document;

	var nodePhrase = document.getElementById(idPhrase);
	if(nodePhrase)
	{
		Cor.SetId.add(idPhrase);
		
		// Parcours des mots de r�p�titions.
		for(var v = 0; v < nodePhrase.childNodes.length; v++)
		{	
			var nodeMot = nodePhrase.childNodes[v];
			
			if(nodeMot.nodeName == 'SPAN')
			{
				var idM = nodeMot.getAttribute('id');
				if(idM)
				{
					Cor.SetId.add(idM);
					
					// Il s'agit d'une phrase entre parenth�se. Applique la m�me chose
					if(idM.indexOf('p') != -1)
					{
						Cor.SetId.add(idM);
						
						// Parcours des mots.
						for(var w = 0; w < nodeMot.childNodes.length; w++)
						{	
							var nodeMotPar = nodeMot.childNodes[w];
							if(nodeMotPar.nodeName == 'SPAN')
							{
								var idMPar = nodeMotPar.getAttribute('id');
								if(idMPar)
								{
									Cor.SetId.add(idMPar);
								}
							}
						}
					}
				}
			}
		}
	}
},

// Retourne l'ndice du paragraphe d'une phrase
GetIndPWithPhraseId : function(idPhrase)
{
	var document = TextEditor.Document;
	var nodeBody = document.body;
	
	var nodePhrase = document.getElementById(idPhrase);

	var nodeP = null;
		
	if(nodePhrase)
	{
		var parentNode = nodePhrase.parentNode;
		if(parentNode != null)
		{
			if(parentNode.nodeName == 'P') nodeP = parentNode;
			else if(parentNode.parentNode != null)
			{
				if(parentNode.parentNode.nodeName == 'P')
				{
					nodeP = parentNode.parentNode;
				}
			}
		}
	}
	
	if(nodeP != null)
	{
		// Num�ro de paragraphe
		var parentP = nodeP.parentNode;
		var indP = -1;
		for(var i = 0; i < parentP.childNodes.length; i++)
		{
			if(nodeP == parentP.childNodes[i])
			{
				return i;
			}
		}
	}
	
	return -1;
},

// Parcours les diff�rentes phrases pour mettre � jour la map. 
FillMapPhrase : function()
{
	var window = TextEditor.Window;
	var document = TextEditor.Document;

	var nodeBody = document.body;

	for(var i = 0; i< nodeBody.childNodes.length; i++)	// Parcours des <p>
	{
		var nodeP = nodeBody.childNodes[i];

		for(var u = 0; u < nodeP.childNodes.length; u++)
		{
			var nodePhrase = nodeP.childNodes[u];
			
			if(nodePhrase.nodeName == 'SPAN')
			{
				var id = nodePhrase.getAttribute('id');
				if(id && id.indexOf('p') != -1)
				{
					var phraseSt = "";
					if(!Cor.IsIE) phraseSt = nodePhrase.textContent;
					else phraseSt = nodePhrase.innerText;
					
					if(phraseSt.length > 0)
					{
						Cor.VectIdPhrases.push(id);
					}
					
					Cor.MapPhrases.set(id, phraseSt);
					
					// Parenth�ses
					for(var v = 0; v < nodePhrase.childNodes.length; v++)
					{
						var node = nodePhrase.childNodes[v];
						
						var par = false;
						if(node.nodeName == 'SPAN')
						{
							var idPar = node.getAttribute('id');
							if(idPar)
							{
								if(idPar.indexOf('p') != -1)
								{
									var phraseStPar = "";
									if(!Cor.IsIE) phraseStPar = node.textContent;
									else phraseStPar = node.innerText;
									
									Cor.MapPhrases.set(idPar, phraseStPar);
								}
							}
						}
					}
				}
			}
		}
	}
	
},

FillMapPhrasePh : function(idPh)
{
	var document = TextEditor.Document;

	var nodePhrase = document.getElementById(idPh);

	if(nodePhrase)
	{
		var phraseSt = "";
		if(!Cor.IsIE) phraseSt = nodePhrase.textContent;
		else phraseSt = nodePhrase.innerText;
		
		Cor.MapPhrases.set(idPh, phraseSt);
		
		// Prendre le texte derri�re les parentheses ainsi que les phrases en parenth�ses.
		var texte = '';
		for(var v = 0; v < nodePhrase.childNodes.length; v++)
		{
			var node = nodePhrase.childNodes[v];
			//alert(node.textContent);
			var par = false;
			if(node.nodeName == 'SPAN')
			{
				var idPar = node.getAttribute('id');
				if(idPar)
				{
					if(idPar.indexOf('p') != -1)
					{
						par = true;
						var phrasePar = "";
						if(!Cor.IsIE) phrasePar = nodePhrase.textContent;
						else phrasePar = node.innerText;
						
						Cor.MapPhrases.set(idPar, phrasePar);
					}
				}
			}
		}
	}
},

ReplaceIdVectIdPhrase : function(idPhAnc, idPhNv)
{
	var ind = Cor.VectIdPhrases.indexOf(idPhAnc);
	if(ind > -1)
	{
		Cor.VectIdPhrases.splice(ind, 0, idPhNv);
	}
},

// Regarde si une phrase a chang�e
PhraseIsChanged : function (phraseSt, id)
{
	// Prendre uniquement avant le tiret. Ex : p275-o.
	var phraseStMap = Cor.MapPhrases.get(id);
	if(phraseStMap != null)
	{
		if(!phraseSt.contentEquals(phraseStMap)) return true;
	}
		
	return false;
},

// D�surligne les �l�ments de la phrase.
DesurltEltPhrase : function(numP, numPh)
{
	var nodePhrase = TextEditor.Document.body.childNodes[numP].childNodes[numPh];
	
	if(nodePhrase)
	{
		for(var u = 0; u < nodePhrase.childNodes.length; u++)
		{
			var node = nodePhrase.childNodes[u];
			if(node.nodeName == 'SPAN')
			{
				// Mot
				var idM = node.getAttribute('id');
				
				var valAtt = 's-';
				if(Cor.IsIE8) valAtt = '#';
				
				var classM = node.getAttribute('class');
				if(Cor.IsIE8 && node.style)
				{
					classM = node.style.color;
					if(idM != null && idM.length == 0) idM = null;
				}
				
				if(idM && idM.indexOf('p') == -1)
				{
					if(!Cor.IsIE8) node.removeAttribute('class');
					else node.removeAttribute('style');
					//else if(node.style) node.style = null;
					//else node.style = null;
				}
				// Expression
				else if((idM == null) && (classM != null) && (classM.length > 0) && (classM.indexOf(valAtt) != -1))
				{
					for (var w = 0; w < node.childNodes.length; w++)
					{
						nodePhrase.insertBefore(node.childNodes[w].cloneNode(true), node);
					}
					nodePhrase.removeChild(node);
				}
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
							if(Cor.IsIE8 && nodePar.style)
							{
								classMPar = nodePar.style.color;
								if(idMPar != null && idMPar.length == 0) idMPar = null;
							}
							
							if(idMPar && idMPar.indexOf('p') == -1)
							{
								if(!Cor.IsIE8) nodePar.removeAttribute('class');
								else nodePar.removeAttribute('style');
								//else if(nodePar.style) nodePar.style = null;
								//else nodePar.style = null;
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
	}
},

// V�rifie quelle phrase est chang�e et supprime le surlignage en rouge.
CheckNoeudPhrase : function()
{	
	// 1. Parcours des phrases.
	var nodeBody = TextEditor.Document.body;

	for(var i = 0; i < nodeBody.childNodes.length; i++)		// Parcours des <p>
	{
		var nodeP = nodeBody.childNodes[i];
		
		for(var u = 0; u < nodeP.childNodes.length; u++)
		{
			var nodePhrase = nodeP.childNodes[u];
			if(nodePhrase.nodeName == 'SPAN')
			{
				var id = nodePhrase.getAttribute('id');
				if(id && id.indexOf('p') != -1)
				{
					var phraseSt = "";
					if(!Cor.IsIE) phraseSt = nodePhrase.textContent;
					else phraseSt = nodePhrase.innerText;
					//alert(phraseSt);
					var isChanged = Util.PhraseIsChanged(phraseSt, id);
					// Si changement, supprime les surlignages rouges de la phrase.
					if(isChanged)
					{
						Util.DesurltEltPhrase(i, u);	// Desurlignage que en mode Cor
						
						Cor.SetIdPhModifies.add(id);
					
						// Il se peux que la phrase suivante ai le m�me id. Quand on fait une s�lection et qu'on l'a supprime, 2 phrases se rejoignent.
						if(u < (nodeP.childNodes.length - 1))
						{
							var nodePhraseSuiv = nodeP.childNodes[u + 1];
							if(nodePhraseSuiv.nodeName == 'SPAN')
							{
								var idSuiv = nodePhraseSuiv.getAttribute('id');
								if(idSuiv && idSuiv == id)
								{
									var phraseSuivSt = "";
									if(!Cor.IsIE) phraseSuivSt = nodePhraseSuiv.textContent;
									else phraseSuivSt = nodePhraseSuiv.innerText;
								
									isChanged = Util.PhraseIsChanged(phraseSuivSt, idSuiv);
									// Si changement, supprime les surlignages rouges de la phrase.
									if(isChanged)
									{
										Util.DesurltEltPhrase(i, u + 1);	// Desurlignage que en mode Cor
									}
								}
							}
						}
					}
				}
			}
		}
	}
},

FillVectIdPhraseTmp : function()
{
	// 1. Parcours des phrases.
	var nodeBody = TextEditor.Document.body;

	for(var i = 0; i < nodeBody.childNodes.length; i++)		// Parcours des <p>
	{
		var nodeP = nodeBody.childNodes[i];
		
		for(var u = 0; u < nodeP.childNodes.length; u++)
		{
			var nodePhrase = nodeP.childNodes[u];
			if(nodePhrase.nodeName == 'SPAN')
			{
				var id = nodePhrase.getAttribute('id');
				if(id && id.indexOf('p') != -1)
				{
					var phraseSt = "";
					if(!Cor.IsIE) phraseSt = nodePhrase.textContent;
					else phraseSt = nodePhrase.innerText;
					
					if(phraseSt.length > 0)
					{
						Cor.VectIdPhrasesTmp.push(id);
					}
				}
			}
		}
	}
},

SetPhrasesModifies : function()
{
	Cor.VectIdPhrasesTmp = [];
	// Remplit le nouveau vector de phrases
	Util.FillVectIdPhraseTmp();
	// Fait la diff�rence entr le nouveau et l'ancien vect de id de phrase.
	// Utile que pour savoir les phrases supprime. Les 2 phrases en p�riph�rie de la zone supprim�e sont consid�r�es comme supprim�es. 
	for(var i = 0; i < Cor.VectIdPhrasesTmp.length; i++)
	{
		var idPh = Cor.VectIdPhrasesTmp[i];
		var idPhSuiv = "";
		if(i < (Cor.VectIdPhrasesTmp.length - 1))
		{
			idPhSuiv = Cor.VectIdPhrasesTmp[i + 1];
			
			var ind = Cor.VectIdPhrases.indexOf(idPh);
			if(ind > -1 && ind < (Cor.VectIdPhrases.length - 1))
			{
				var idSuivAnc = Cor.VectIdPhrases[ind + 1];
				if(idSuivAnc != idPhSuiv)
				{
					Cor.SetIdPhModifies.add(idPh);
					Cor.SetIdPhModifies.add(idPhSuiv);
				}
			}
			else
			{
				Cor.SetIdPhModifies.add(idPh);
				Cor.SetIdPhModifies.add(idPhSuiv);
			}
		}
		// Dernier �l�ment
		else
		{
			var ind = Cor.VectIdPhrases.indexOf(idPh);
			if(ind > -1 && ind < (Cor.VectIdPhrases.length - 1))
			{
				Cor.SetIdPhModifies.add(idPh);
			}
		}
	}
	
	// Par s�curit�, pour une phrase modifi�e, sa pr�c�dente et sa suivante sont modifi�es
	for(var i = 0; i < Cor.VectIdPhrasesTmp.length; i++)
	{
		var idPh = Cor.VectIdPhrasesTmp[i];
		
		var idPhPrec = "";
		if(i > 0) idPhPrec = Cor.VectIdPhrasesTmp[i - 1];
		
		var idPhSuiv = "";
		if(i < (Cor.VectIdPhrasesTmp.length - 1)) idPhSuiv = Cor.VectIdPhrasesTmp[i + 1];
		
		if(Cor.SetIdPhModifies.has(idPh))
		{
			if(idPhPrec.length > 0) Cor.SetIdPhModifies.add(idPhPrec);
			if(idPhSuiv.length > 0 && !Cor.SetIdPhModifies.has(idPhSuiv))
			{
				Cor.SetIdPhModifies.add(idPhSuiv);
				i = i + 1;
			}
		}
		
	}
},

// Creer des phrases dans les noueaux paragraphes.
// Fusionne les paragraphes afin de n'avoir qu'un seul paragraphe. La fonction GetTextTransf fera le reste.
HarmoniserTexte : function()
{
	// Fusionne les P. Tous les �l�ments des P suivants sont d�plac�s vers le 1er.
	Util.FusionP();
	
	// Creer des balises de phrases pour tous les node de types textes, gilss�s entre les phrases
	Util.CreationPhraseNewP();
	
	//String txt = Cor.TinyMcePanel.TinyMce.getText();
	//int a = 1;
},

GetGenId : function()
{
	var id = Cor.IdMax;
	// R�affect l'id
	var newid = parseInt(Cor.IdMax) + 1;
	Cor.IdMax = newid;
	// Marque la phrase comme modifi�e
	Cor.SetIdPhModifies.add("p" + id);
	
	return "p" + id;
},

FusionP : function()
{
	var document = TextEditor.Document;
	var nodeBody = document.body;

	// Si plusieurs paragraphes
	if(nodeBody.childNodes.length > 1)
	{
		var nodeP0 = nodeBody.childNodes[0];
		
		for(var i = 1; i < nodeBody.childNodes.length; i++)		// Parcours des <p>
		{
			var nodeP = nodeBody.childNodes[i];
		
			var newElemBr = document.createElement ("br");
			nodeP0.appendChild(newElemBr);
		
			for(var u = 0; u < nodeP.childNodes.length; u++)
			{
				var nodeChild = nodeP.childNodes[u];
				
				nodeP0.appendChild(nodeChild.cloneNode(true));
			}
		}
		
		// Supprime les P suivants
		for(var i = (nodeBody.childNodes.length - 1); i > 0; i--)
		{
			var nodeP = nodeBody.childNodes[i];
			nodeBody.removeChild(nodeP);
		}
	}

},

CreationPhraseNewP : function()
{		
	var document = TextEditor.Document;
	var nodeBody = document.body;

	// Si plusieurs paragraphes
	for(var i = 0; i < nodeBody.childNodes.length; i++)		// Parcours des <p>
	{
		var nodeP = nodeBody.childNodes[i];
		
		for(var u = 0; u < nodeP.childNodes.length; u++)		// Parcours des nodes
		{
			var childNode = nodeP.childNodes[u];
		
			//alert(childNode.textContent);
			//alert(childNode.nodeName);
		
			// Cas tr�s particulier : Span tout seul. Dans certaines conditions. Ex : On ajoute la 1ere ligne.
			var childNodeId = null;
			if(childNode.nodeName == 'SPAN')
			{
				childNodeId = childNode.getAttribute('id');
				if(Cor.IsIE8 && (childNodeId != null) && childNodeId.length == 0) childNodeId = null;
			}
			
			if(childNode.nodeName == 'SPAN' && childNodeId == null)
			{
				// Il peut y avoir un Br � la fin du span
				if(childNode.childNodes.length == 2)
				{
					if(childNode.childNodes[1].nodeName == 'BR')
					{
						//childNode.remove(childNode.childNodes[1]);
						var textSt = "";
						if(Cor.IsIEBefore10) textSt = childNode.childNodes[0].nodeValue;
						else if(!Cor.IsIE) textSt = childNode.childNodes[0].textContent;
						else textSt = childNode.childNodes[0].innerText;
						
						// Efface le Br
						childNode.innerHTML = textSt;
					}
				}
						
				// Affecte l'id de phrase
				var idPh = Util.GetGenId();
				childNode.setAttribute('id', idPh);
						
				//var textNode = document.createTextNode(textSt);
						
				//childNode.
				//nodeP.insertBefore(textNode, childNode);
				//nodeP.remove(childNode);
				//nodeP.appendChild(textNode);
				//nodeP.remove(childNode);
				//childNode.innerHTML = textSt;
				//alert(childNode.nodeName);
			}
			// Node de type textNode : On cr�er une phrase.
			else if(childNode.nodeName == '#text')
			{
				var idPh = Util.GetGenId();
				// Texte Node : cr�� une balise de phrase.
				var newElem = document.createElement ("span");
				newElem.setAttribute('id', idPh);
					
				if(!Cor.IsIE8)
				{
					var range = document.createRange();
					range.setStartBefore(childNode);
					range.setEndAfter(childNode);
					
					range.surroundContents(newElem);
				}
				else
				{
					newElem.innerHTML = childNode.data;
					nodeP.replaceChild(newElem, childNode);
					
					//var spanDeb = '<span id="' + idPh + '">';
					//var htmlText = childNode.nodeValue;
					//var newValue = (spanDeb + htmlText + '</span>');
					
					//var containerRange = document.body.createTextRange ();
					//containerRange.moveToElementText (nodeP.childNodes[u]);
					//alert('a');
					
					//containerRange.pasteHTML(spanDeb + htmlText + '</span>');
					
					//newElem.nodeValue = childNode.data;
					
					//alert(containerRange.htmlText);
					//containerRange.moveToElementText(newElem);
					//alert(containerRange.htmlText);
					
					//newElem.nodeValue 
					//alert(newElem.nodeValue);
					//nodeP.insertBefore(newElem, childNode);
					
					
					//alert('a');
					// Supprime l'ancienne phrase
					//nodeP.removeChild(childNode);
					//alert(nodeP.nodeValue);
					//var textRangeElt = document.body.createTextRange ();
					//textRangeElt.moveToElementText (childNode);
					//alert('b');
					//containerRange.setEndPoint ("StartToStart", childNode);
					//containerRange.setEndPoint ("EndToEnd", childNode);
					//alert('b');
					//var htmlText = containerRange.htmlText;
					//alert(nodeP.nodeValue);
					//childNode.data = newValue;
					//alert(childNode.data);
					
					//var containerRange = document.body.createTextRange ();
					//alert(containerRange.htmlText);
					//containerRange.pasteHTML(spanDeb + htmlText + '</span>');
					
					//childNode.nodeValue = (spanDeb + htmlText + '</span>');
					
					//childNode.outerHTML = (spanDeb + htmlText + '</span>');
					//alert(spanDeb + htmlText + '</span>');
				}
			}
		}
	}
},

SuppAncienCorId : function()
{
	var setSupp = new Set();

	for (var key in Cor.MapMotsSolution)
	{
		if(!Cor.SetId.has(key)) setSupp.add(key);
	}

	setSupp.forEach(function(id)
	{
		Cor.MapMotsSolution.delete(id);
	});
	
	// SetPhrasesNonPropre
	setSupp.clear();
	Cor.SetPhrasesNonPropres.forEach(function(idPh)
	{
		if(!Cor.SetId.has(idPh)) setSupp.add(idPh);
	});
	
	setSupp.forEach(function(idPh)
	{
		Cor.SetPhrasesNonPropres.delete(idPh);
	});
},

GetVectPSt : function()
{	
	var nodeBody = TextEditor.Document.body;

	// Si plusieurs paragraphes
	for(var i = 0; i < nodeBody.childNodes.length; i++)		// Parcours des <p>
	{
		var nodeP = nodeBody.childNodes[i];
		var PSt = nodeP.textContent;
		Cor.VectPSt.push(PSt);
	}

},

// Retourne le nombre de paragraphes d'un document
GetNbP : function()
{
	var nodeBody = TextEditor.Document.body;

	return nodeBody.childNodes.length;
},

// Retourne le code HTML d'un document
GetHTMLP : function(indP)
{
	var nodeBody = TextEditor.Document.body;
	
	// Si plusieurs paragraphes
	var nodeP = nodeBody.childNodes[indP];
	var innerHTML = nodeP.innerHTML;
	innerHTML = '<p>' + innerHTML + '</p>';
	
	return innerHTML;
},

SetPhModifies : function(indP)
{		
	var nodeBody = TextEditor.Document.body;

	// Si plusieurs paragraphes
	var nodeP = nodeBody.childNodes[indP];
	
	for(var u = 0; u < nodeP.childNodes.length; u++)
	{
		var nodePhrase = nodeP.childNodes[u];
		if(nodePhrase.nodeName == 'SPAN')
		{
			var id = nodePhrase.getAttribute('id');
			if(id)
			{
				if(id.indexOf('p') != -1)	// Phrase
				{
					Cor.SetIdPhModifies.add(id);
				}
			}
		}
	}
	
},

// Retourne le nombre de phrases d'un paragraphe
NbPhrase : function(indP)
{
	var nodeBody = TextEditor.Document.body;

	var cnt = 0;

	// Si plusieurs paragraphes
	var nodeP = nodeBody.childNodes[indP];
	
	for(var u = 0; u < nodeP.childNodes.length; u++)
	{
		var nodePhrase = nodeP.childNodes[u];
		if(nodePhrase.nodeName == 'SPAN')
		{
			var id = nodePhrase.getAttribute('id');
			if(id)
			{
				if(id.indexOf('p') != -1)	// Phrase
				{
					cnt++;
				}
			}
		}
	}
	
	return cnt;
},

// Retourne l'indice minimum et maximum des paragraphes aux alentours, en fonction de EcartRep
GetIndParagraphsAlentour : function(indP, ecart2)
{
	var ecartMaxRep = Style.EcartMotRep;
	if(ecart2) ecartMaxRep = (2*ecartMaxRep);
	
	// Contour bas
	var indPDebut = indP;
	var nbhrasesTotal = 0;
	var cnt = 1;
	var nbPhrases = 0;
	
	while((nbhrasesTotal < (ecartMaxRep - 1)) && nbPhrases != -1 && ((indP - cnt) >= 0))
	{
		nbPhrases = Util.NbPhrase(indP - cnt);
		if(nbPhrases != -1)
		{
			nbhrasesTotal = nbhrasesTotal + nbPhrases;
			indPDebut = (indP - cnt);
		}
		cnt++;
	}
	
	// Si P est � l'indice 0, le indElementPDebut = 0
	if(indP == 0) indPDebut = 0;
	
	// Contour haut
	//Element elementPFin = vectElementP.get(indP);
	//int indElementPFin = -1;
	var nbP = Util.GetNbP();
	var indPFin = -1;
	nbhrasesTotal = 0;
	cnt = 1;
	
	while((nbhrasesTotal < (ecartMaxRep - 1)) && nbPhrases != -1 && ((indP + cnt) < nbP))
	{
		nbPhrases = Util.NbPhrase(indP + cnt);
		if(nbPhrases != -1)
		{
			nbhrasesTotal = nbhrasesTotal + nbPhrases;
			indPFin = indP + cnt;
		}
		cnt++;
	}
	
	// Si P est � l'indice vectElementP.size() - 1, le indElementPFin = (vectElementP.size() - 1)
	if(indP == (nbP - 1)) indPFin = (nbP - 1);
	
	return [indPDebut, indPFin];
},

// Replace une s�quence d'espaces par une s�rie de &nbsp;
ReplaceSeqSpaces32 : function(texte)
{
	var pos = (texte.length - 1);
	var posFin = -1;
	var posDeb = -1;
	var chRep = "";
	
	while(pos >= 0)
	{
		var c = texte.charAt(pos);
		if(c == 32 || c == 9)
		{
			posFin = pos;
			//chRep = "&nbsp;";
			chRep = String.fromCharCode(160);
			posDeb = -1;
			var space = true;
			while(space && pos > 0)
			{
				pos--;
				var cPrec = texte.charAt(pos);
				if(cPrec == 32 || cPrec == 9)
				{
					// Nb > 1
					space = true;
					posDeb = pos;
					chRep += String.fromCharCode(160);
					//chRep += "&nbsp;";
				}
				else space = false;
			}
			
			// Remplace la chaine d'espace par des "&nbsp;"
			if(posDeb > -1)
			{
				texte = texte.substring(0, posDeb) + chRep + texte.substring(posFin + 1);
			}
		}
		pos--;
	}
	
	if(texte.length > 0)
	{
		// Il faut aussi remplacer les espaces en d�but de chaine, qui disparraissent
		var c0 = texte.charAt(0);
		if(c0 == 32 || c0 == 9) texte = String.fromCharCode(160) + texte.substring(1);
	
		// Il faut aussi remplacer les espaces en fin de chaine, qui disparraissent
		var cDernier = texte.charAt(texte.length - 1);
		if(cDernier == 32 || cDernier == 9) texte = texte.substring(0, texte.length - 1) + String.fromCharCode(160);
	}
	
	return texte;
},

// Sur Firefox : les P vides ne doivent pas l'être, car si on fait un DEL au clavier, il est supprimé.
// Le cancel de l'evenement est bien lance, mais la suppression de la ligne se fait.
ReplacePVide : function(texte)
{
	var indPvideFind = texte.indexOf("<p></p>");
	while(indPvideFind > -1)
	{
		// Creer une phrase artificielle.
		var idMax = parseInt(Cor.IdMax);
		idMax = idMax + 1;
		Cor.IdMax = idMax;
		texte = texte.replace(new RegExp("<p></p>", "g"), "<p><span id=\"p" + idMax + "\"><br></span></p>");
		
		indPvideFind = texte.indexOf("<p></p>", indPvideFind + 7);
	}
	
	return texte;
},

// Underline cor elements
SurligneElts_Cor : function(mapMotSolution)
{
	var setId = new Set();

	var mapMotSolutions = null;
	if(mapMotSolution != null)
	{
		mapMotSolutions = new Map();
		for(var id in mapMotSolution)
		{
			mapMotSolutions.set(id, mapMotSolution[id]);
		}
	}
	else mapMotSolutions = Cor.MapMotsSolution;
	
	var doc = TextEditor.Document;
	var eltsSpan = doc.getElementsByTagName("SPAN");
	
	mapMotSolutions.forEach(function(motSolution, idSt)
	{
		if(Cor.SetId.has(idSt))
		{
			if(!Cor.SetElementsSurlignes.has(idSt))
			{
				// Type. Couleur.
				var colorSt = "";
				if(motSolution.Type == 0) colorSt = "s-rg";
				else if(motSolution.Type == 1) colorSt = "s-ve";
				else if(motSolution.Type == 2) colorSt = "s-or";
				else if(motSolution.Type == 3) colorSt = "s-bl";
				
				for(var i = 0; i < eltsSpan.length; i++)
				{
					var eltSpan = eltsSpan[i];
					var tabIdSpan = eltSpan.getAttribute("id").split("-");

					for(var u = 0; u < tabIdSpan.length; u++)
					{
						var idSpan = tabIdSpan[u];
						if(idSpan == idSt)
						{
							Util.SurligneElt(eltSpan, colorSt);
							
							Cor.SetElementsSurlignes.add(idSt);						
						}
					
					}
				
				}
			}
		}
	});
},

// Surligne un élément particulier
SurligneElt : function(node, colorSt)
{
	if(!Cor.IsIE8)
	{
		node.setAttribute("class", colorSt);
	}
	else
	{
		// Sur IE8, setStyle ne marche pas.
		var styleSt = '';
		if(colorSt == "s-rg")
		{
			node.style.color = '#ff0000';
			node.style.textDecoration = 'underline';
		}
		else if(colorSt == "s-ve")
		{
			node.style.color = '#00CC00';
			node.style.textDecoration = 'underline';
		}
		else if(colorSt == "s-bl")
		{
			node.style.color = '#0000FF';
			node.style.textDecoration = 'underline';
		}
		else if(colorSt == "s-or")
		{
			node.style.color = '#FF9D00';
			node.style.textDecoration = 'underline';
		}
		else if(colorSt == "s-ja")
		{
			node.style.backgroundColor = '#ffff00';
		}
		else if(colorSt == "u-bl")
		{
			node.style.backgroundColor = '#85cbfc';
		}
	}
},

// Surligns style elements. List of id.
SurligneElts_Style : function(setId)
{
	var doc = TextEditor.Document;
	var eltsSpan = doc.getElementsByTagName("SPAN");
		
	for(var i = 0; i < eltsSpan.length; i++)
	{
		var eltSpan = eltsSpan[i];
		var tabIdSpan = eltSpan.getAttribute("id").split("-");

		for(var u = 0; u < tabIdSpan.length; u++)
		{
			var idSpan = tabIdSpan[u];
			if(setId.has(idSpan))
			{
				if(!Cor.IsIE8)
				{
					var className = eltSpan.className;
					
					var color = "s-ja";
					
					// If it is a good suggestion, the underline in another color.
					var expressionSol = Style.StyleText.Map_ExpressionSol[idSpan];
					if(expressionSol != null && expressionSol.Good_Suggestion) color = "u-bl";
					
					if(className.length > 0) eltSpan.className = className + " " + color;
					else eltSpan.className = color;
				}
				
				//Cor.SetElementsSurlignes.add(idSt);						
			}
		
		}
	
	}

},

// Get the document height
GetDocumentHeight : function()
{
	return TextEditor.Document.body.offsetHeight;
},

GetOffSetTopElt : function(idSt)
{
	var document = TextEditor.Document;
	
	var elt = document.getElementById(idSt);
	
	if(elt)
	{
		// Position la plus haute
		return elt.offsetTop;
	}
	
	return 0;
},

// Place la scrollBar � une position
ScrollToPos : function(topPos)
{
	var wnd = TextEditor.Window;
	if(topPos > 200)
	{
		wnd.scrollTo(0, topPos - 200);
	}
	else
	{
		wnd.scrollTo(0, 0);
	}
},

// Supprime le surlignage des �l�ments pr�cdemment selectionnes
DeSurligne : function()
{
	Cor.SetElementsSurlignes.forEach(function(id)
	{
		Util.DeSurligneElt(id);
	});
	
	Cor.SetElementsSurlignes.clear();
},

// Desurligne un �l�ment.
DeSurligneElt : function(idSt)
{
	var document = TextEditor.Document;
	var elt = document.getElementById(idSt);
	
	if(elt)
	{
		// 1. Mot
		var valAtt = 's-';
		if(Cor.IsIE8) valAtt = '#';
		
		var classM = elt.getAttribute('class');
		if(Cor.IsIE8 && elt.style)
		{
			classM = elt.style.color;
			if(classM == null || (classM != null && classM.length == 0)) classM = elt.style.backgroundColor;	// Transf
		}
		
		if(classM && (classM.length > 0) && classM.indexOf(valAtt) != -1)
		{
			if(!Cor.IsIE8) elt.removeAttribute('class');
			else elt.removeAttribute('style');
			//else if(elt.style) elt.style = null;
			//else elt.style = null;
		}
		
		// 2. Expression
		
		// Expression. Il faut supprimer la balise.
		var parentNodeElt = elt.parentNode;
		
		var classM = parentNodeElt.getAttribute('class');
		if(Cor.IsIE8 && parentNodeElt.style)
		{
			classM = parentNodeElt.style.color;
			if(classM == null || (classM != null && classM.length == 0)) classM = parentNodeElt.style.backgroundColor;		// Transf
		}
		
		if(classM && (classM.length > 0) && classM.indexOf(valAtt) != -1)
		{
			var parentNode = parentNodeElt.parentNode;
			for (var w = 0; w < parentNodeElt.childNodes.length; w++) {
				parentNode.insertBefore(parentNodeElt.childNodes[w].cloneNode(true), parentNodeElt);
			}
			parentNode.removeChild(parentNodeElt);
		}
	}
},

// IndicateurRep Class
IndicateurRep : function(idMotRep, setIdSousGroupe, posStart, posEnd, numPhrase, posTexte)
{
	this.IdMotRep = idMotRep;
	this.SetIdSousGroupe = setIdSousGroupe;
	this.PosStart = posStart;
	this.PosEnd = posEnd;
	this.NumPhrase = numPhrase;
	this.PosTexte = posTexte;
},

// PosTexte
FillVectIndRep : function(idMotRep, numPhrase, posTexte)
{
	var tabIdMotRep = idMotRep.split("-");

	if(Style.StyleText != null)
	{
		for(var i = 0; i < tabIdMotRep.length; i++)
		{
			var idMotRep = tabIdMotRep[i];
			var vectInfRepetition = Style.StyleText.Map_InfSousGroupe[idMotRep];
			if(vectInfRepetition != null && vectInfRepetition.length > 0)
			{
				var indicateurRep = new Util.IndicateurRep(idMotRep, new Set(), vectInfRepetition[0].Start_Pos, vectInfRepetition[0].End_Pos, parseInt(numPhrase), parseInt(posTexte));
				for(var u = 0; u < vectInfRepetition.length; u++)
				{
					indicateurRep.SetIdSousGroupe.add(vectInfRepetition[u].IdSousGroupe);
				}
				Style.VectIndicateurRep.push(indicateurRep);
			}
		}
	}
},

// Condition pour �tre gard� : un motRep doit avoir un sousgroupe dont au moins un des mots est � l'ext�rieur de la zone.
SelectionMotRepGarder : function()
{
	// 1. Contour du bas.
	// Rel�ve tous les sousgroupes dont un des membre du contour bas est en position 0 du sous groupe
	var setIdSousGroupe1 = new Set();
	for(var i = 0; i < Style.VectIndicateurRep.length; i++)
	{
		var indicateurRep = Style.VectIndicateurRep[i];
		if(indicateurRep.PosTexte == 0)
		{
			// Ensemble des sous groupes auquel appartient MotRep
			var vectInRep = Style.StyleText.Map_InfSousGroupe[indicateurRep.IdMotRep];
			for(var u = 0; u < vectInRep.length; u++)
			{
				var infSousGroupe = vectInRep[u];
				if(infSousGroupe.PosInSousGroupe == 0) setIdSousGroupe1.add(infSousGroupe.IdSousGroupe);
			}
		}
	}
	
	// Les mots � garder : un des sous groupe auquel il appartient ne fait pas partie du set pr�c�dent.
	for(var i = 0; i < Style.VectIndicateurRep.length; i++)
	{
		var indicateurRep = Style.VectIndicateurRep[i];
		if(indicateurRep.PosTexte == 0)
		{
			// Ensemble des sous groupes auquel appartient MotRep
			var aGarder = false;
			indicateurRep.SetIdSousGroupe.forEach(function(idSousGroupe)
			{
				if(!setIdSousGroupe1.has(idSousGroupe))
				{
					aGarder = true;
				}	
			});
			
			if(aGarder) Style.VectIndicateurRepAGarder.push(indicateurRep);
		}
	}
	
	// 2. Contour du haut.
	// Rel�ve tous les sousgroupes dont un des membre du contour haut est en derni�re (n - 1) en position du sous groupe
	var setIdSousGroupe2 = new Set();
	for(var i = 0; i < Style.VectIndicateurRep.length; i++)
	{
		var indicateurRep = Style.VectIndicateurRep[i];
		if(indicateurRep.PosTexte == 2)
		{
			// Ensemble des sous groupes auquel appartient MotRep
			var vectInRep = Style.StyleText.Map_InfSousGroupe[indicateurRep.IdMotRep];
			for(var u = 0; u < vectInRep.length; u++)
			{
				var infSousGroupe = vectInRep[u];
				if(infSousGroupe.PosInSousGroupe == 2) setIdSousGroupe2.add(infSousGroupe.IdSousGroupe);
			}
		}
	}
	
	// Les mots � garder : un des sous groupe auquel il appartient ne fait pas partie du set pr�c�dent.
	for(var i = 0; i < Style.VectIndicateurRep.length; i++)
	{
		var indicateurRep = Style.VectIndicateurRep[i];
		if(indicateurRep.PosTexte == 2)
		{
			// Ensemble des sous groupes auquel appartient MotRep
			var aGarder = false;
			indicateurRep.SetIdSousGroupe.forEach(function(idSousGroupe)
			{
				if(!setIdSousGroupe2.has(idSousGroupe))
				{
					aGarder = true;
				}
			});
			
			if(aGarder) Style.VectIndicateurRepAGarder.push(indicateurRep);
		}
	}
	
	// Zone du bas.
	// Rel�ve tous les sousGroupes de la zone du milieu et de la zone du haut et tous les sousGroupes de la zone du milieu et de la zone du bas.
	/*SortedSet<String> setIdSousGroupeMilieuHaut = new TreeSet<String>();
	SortedSet<String> setIdSousGroupeMilieuBas = new TreeSet<String>();
	for(int i = 0; i < VectIndicateurRep.size(); i++)
	{
		IndicateurRep indicateurRep = VectIndicateurRep.get(i);
		if(indicateurRep.PosTexte == 1 || indicateurRep.PosTexte == 2)
		{
			for(int u = 0; u < indicateurRep.VectIdSousGroupe.size(); u++)
			{
				setIdSousGroupeMilieuHaut.add(indicateurRep.VectIdSousGroupe.get(u));
			}
		}
		if(indicateurRep.PosTexte == 1 || indicateurRep.PosTexte == 0)
		{
			for(int u = 0; u < indicateurRep.VectIdSousGroupe.size(); u++)
			{
				setIdSousGroupeMilieuBas.add(indicateurRep.VectIdSousGroupe.get(u));
			}
		}
	}
	
	for(int i = 0; i < VectIndicateurRep.size(); i++)
	{
		IndicateurRep indicateurRep = VectIndicateurRep.get(i);
		
		// S�lectionne les mots � garder dans la zone du bas.
		if(indicateurRep.PosTexte == 0)
		{
			boolean aGarder = false;
			for(int u = 0; u < indicateurRep.VectIdSousGroupe.size(); u++)
			{
				// Si un sous groue ne fait pas partie du milieu et du haut, alors on le garde.
				String idSousGroupe = indicateurRep.VectIdSousGroupe.get(u);
				if(!setIdSousGroupeMilieuHaut.contains(idSousGroupe))
				{
					aGarder = true;
					break;
				}
			}
			
			if(aGarder) VectIndicateurRepAGarder.add(indicateurRep);
		}
		
		// S�lectionne les mots � garder dans la zone du haut.
		if(indicateurRep.PosTexte == 2)
		{
			boolean aGarder = false;
			for(int u = 0; u < indicateurRep.VectIdSousGroupe.size(); u++)
			{
				// Si un sous groue ne fait pas partie du milieu et du bas, alors on le garde.
				String idSousGroupe = indicateurRep.VectIdSousGroupe.get(u);
				if(!setIdSousGroupeMilieuBas.contains(idSousGroupe))
				{
					aGarder = true;
					break;
				}
			}
			
			if(aGarder) VectIndicateurRepAGarder.add(indicateurRep);
		}
	}*/
},

ConstruitChMotRepAGarder : function()
{
	var ch = "";
	
	for(var i = 0; i < Style.VectIndicateurRepAGarder.length; i++)
	{
		var indicateurRep = Style.VectIndicateurRepAGarder[i];
		
		// S�parateur
		if(ch.length > 0) ch = ch + ":";
		// Indications
		ch = ch + indicateurRep.IdMotRep;
		// Start pos
		ch = ch + "-" + indicateurRep.PosStart;
		// End pos
		ch = ch + "-" + indicateurRep.PosEnd;
		// Num�ro de phrases
		ch = ch + "-" + indicateurRep.NumPhrase;
		// Position dans le texte
		if(indicateurRep.PosTexte == 0) ch = ch + "-" + "b";
		if(indicateurRep.PosTexte == 2) ch = ch + "-" + "h";
	}
	
	// D�truit les vecteurs avant
	Style.VectIndicateurRep = [];
	Style.VectIndicateurRepAGarder = [];
	
	return ch;
},

// Construit la liste des phrases par rapport aux paragraphes.
ConstructionListePhrases : function()
{
	var nodeBody = TextEditor.Document.body;

	for(var i = 0; i < nodeBody.childNodes.length; i++)		// Parcours des <p>
	{
		var nodeP = nodeBody.childNodes[i];
		
		var nbNodes = nodeP.childNodes.length;
		for(var u = 0; u < nbNodes; u++)	// Parcours des phrase
		{
			var nodePhrase = nodeP.childNodes[u];
			if(nodePhrase.nodeName == 'SPAN')
			{
				var id = nodePhrase.getAttribute('id');
				if(id && id.indexOf('p') != -1)
				{
					Style.VectPh.push(i + ":" + u);
				}
			}
		}
	}
},

// Construit le texte � envoyer autour de phrases modifi�es
GetTexteTransf : function()
{
	// Construit la liste des phrases par rapport aux paragraphes.
	Style.VectPh = [];
	Util.ConstructionListePhrases();
	
	var txtId = "";
	
	// 1. Parcours des phrases.
	var window = TextEditor.Window;
	var nodeBody = TextEditor.Document.body;
		
	for(var i = 0; i < nodeBody.childNodes.length; i++)		// Parcours des <p>
	{
		var nodeP = nodeBody.childNodes[i];
		
		var nbNodes = nodeP.childNodes.length;
		var u = 0;
		for(u = 0; u < nbNodes; u++)	// Parcours des phrase
		{
			var nodePhrase = nodeP.childNodes[u];
			if(nodePhrase.nodeName == 'SPAN')
			{
				var phraseSt = '';
				if(!Cor.IsIEBefore10) phraseSt = nodePhrase.textContent;
				else phraseSt = nodePhrase.innerText;
				
				var id = nodePhrase.getAttribute('id');
				// Phrase modifi�e
				var phModifie = false;
				if(id && id.indexOf('p') != -1)
				{
					phModifie = Cor.SetIdPhModifies.has(id);
				}
				
				if(phModifie)
				{
					var indFirstPhrase = u;	// Valeur par d�faut
					var indEndPhrase = u;	// Valeur par d�faut
					
					var idFirstPhrase = id;	// Valeur par d�faut
					var idEndPhrase = id;	// Valeur par d�faut
					
					// 1. Indice de la nbEcartMaxRep - 1 phrases d'avant. Remonte vers le haut.
					var cnt = 1;
					var cntPh = 0;
					while(u >= cnt && cntPh < (Style.EcartMotRep - 1))
					{
						var nodePrec = nodeP.childNodes[u - cnt];
						if(nodePrec.nodeName == 'SPAN')
						{
							var idPrec = nodePrec.getAttribute('id');
							// Phrase modifi�e
							if(idPrec && idPrec.indexOf('p') != -1)
							{
								// La phrase ne doit pas �tre une phrase de sens non propre.
								var estPhNonPropre = Cor.SetPhrasesNonPropres.has(id);
								if(estPhNonPropre == false)
								{
									indFirstPhrase = u - cnt;
									idFirstPhrase = idPrec;
									cntPh = cntPh + 1;
								}
							}
						}
						cnt = cnt + 1;
					}
					
					//alert(u);
					//alert(nbEcartMaxRep);
					//alert(idFirstPhrase);
					
					// 2. Indice de la derni�re phrase modifi�e avec des (nbEcartMaxRep - 1) phrases suivantes non modifi�es
					// Il ne faut pas que 2 ensembles s'interceptent.
					var ecartDouble = (Style.EcartMotRep - 1)*2;
					var indLastMn = u;
					var indPhN = u;
					
					while(indPhN != null)
					{
						// Sur les (nbEcartMaxRep - 1)*2 �me phrases suivantes, teste s'il y a une phrase -n.
						cntPh = 0;
						cnt = 1;
						indPhN = null;		// Indice de la phrase -n
						while(((indLastMn + cnt) < nbNodes) && (cntPh < ecartDouble))
						{
							var nodeSuiv = nodeP.childNodes[indLastMn + cnt];
							if(nodeSuiv.nodeName == 'SPAN')
							{
								var idSuiv = nodeSuiv.getAttribute('id');
								// Phrase modifi�e
								if(idSuiv && idSuiv.indexOf('p') != -1)
								{
									cntPh = cntPh + 1;
									
									phModifie = Cor.SetIdPhModifies.has(idSuiv);
									if(phModifie)
									{
										indPhN = indLastMn + cnt;
										idEndPhrase = idSuiv;
									}
								}
							}
							
							cnt = cnt + 1;
						}
						
						// Phrase n trouve
						if(indPhN != null) indLastMn = indPhN;		// Indice de la phrase du dernier n.
					
						//alert(indLastMn);
					}
					
					//alert(id);
					//alert(indLastMn);
					
					// 3. Indice de la nbEcartMaxRep - 1 phrases d'apr�s. Redescend vers le bas.
					indEndPhrase = indLastMn;
					
					cnt = 1;
					cntPh = 0;
					
					while((indLastMn + cnt) < nbNodes && cntPh < (Style.EcartMotRep - 1))
					{
						var nodeSuiv = nodeP.childNodes[indLastMn + cnt];
						
						if(nodeSuiv.nodeName == 'SPAN')
						{
							var idSuiv = nodeSuiv.getAttribute('id');
							// Phrase modifi�e
							if(idSuiv && idSuiv.indexOf('p') != -1)
							{
								// La phrase ne doit pas �tre une phrase de sens non propre.
								var estPhNonPropre = Cor.SetPhrasesNonPropres.has(idSuiv);
								if(estPhNonPropre == false)
								{
									indEndPhrase = indLastMn + cnt;
									idEndPhrase = idSuiv;
									cntPh = cntPh + 1;
								}
							}
						}
						
						cnt = cnt + 1;
					}
					
					// 4. Avec indStartPhrase et indEndPhrase, on construit le texte
					var textHTML = "";
					var indicationRep = "";
					var cntPhrase = 0;
					
					var nbPhrase = 0;
					//alert(idFirstPhrase);
					//alert(idEndPhrase);
					for(var v = indFirstPhrase; v <= indEndPhrase; v++)
					{
						var node = nodeP.childNodes[v];
						if(node.nodeName == 'SPAN')
						{
							var idn = node.getAttribute('id');
							if(idn && idn.indexOf('p') != -1) nbPhrase++;
						}
					}	
					
					// Ensemble des phrases du champs.
					for(var v = indFirstPhrase; v <= indEndPhrase; v++)
					{
						var node = nodeP.childNodes[v];
						var idn = null;
						if(node.nodeName == 'SPAN') idn = node.getAttribute('id');
						
						if(node.nodeName == 'BR') textHTML = textHTML + '<Br />';
						else if(idn && idn.indexOf('p') != -1)
						{
							if(!Cor.IsIEBefore10) textHTML = textHTML + node.textContent;
							else textHTML = textHTML + node.innerText;
							cntPhrase = cntPhrase + 1;
						}
						
						// Note les id de r�p�tition situ�s dans les contours
						for(var pu = 0; pu < node.childNodes.length; pu++)
						{
							var nodeChild = node.childNodes[pu];
							if(nodeChild.nodeName == 'SPAN')
							{
								var idChild = nodeChild.getAttribute('id');
								if(idChild)
								{
									var pos = -1;
									if(v < u) pos = 0;			// Bas
									else if(v > indLastMn) pos = 2;		// Haut
									else pos = 1;	// Milieu
														
									var numPhrase = -1;
									if(v < u) numPhrase = (cntPhrase - 1);
									else if(v > indLastMn) numPhrase = (nbPhrase - cntPhrase);
									
									// Mot simple
									if(idChild.indexOf('p') == -1/* && idChild.indexOf('-x') == -1*/)
									{
										Util.FillVectIndRep(idChild, numPhrase, pos);
									}	
									// Expression
									/*else if(idChild.indexOf('-x') != -1)
									{
										for(var pux = 0; pux < nodeChild.childNodes.length; pux++)
										{
											var nodeChildExp = nodeChild.childNodes[pux];
											if(nodeChildExp.nodeName == 'SPAN')
											{
												var idChildExp = nodeChildExp.getAttribute('id');
												if(idChildExp)
												{
													var ch = idChildExp + ";" + numPhrase + ";" + pos;
													Util.FillVectIndRep(ch);
												}
											}
										}
									}*/
									// Phrases entre parenth�ses
									else if(idChild.indexOf('-p') != -1)
									{
										for(var pux = 0; pux < nodeChild.childNodes.length; pux++)
										{
											var nodeChildPar = nodeChild.childNodes[pux];
											if(nodeChildPar.nodeName == 'SPAN')
											{
												var idChildPar = nodeChildPar.getAttribute('id');
												if(idChildPar)
												{
													// Mot simple
													if(idChildPar.indexOf('-x') == -1)
													{
														Util.FillVectIndRep(idChildPar, numPhrase, pos);
													}
													// Expressions
													/*else
													{
														for(var pux = 0; pux < nodeChildPar.childNodes.length; pux++)
														{
															var nodeChildExp = nodeChildPar.childNodes[pux];
															if(nodeChildExp.nodeName == 'SPAN')
															{
																var idChildExp = nodeChildExp.getAttribute('id');
																if(idChildExp)
																{
																	var ch = idChildExp + ";" + numPhrase + ";" + pos;
																	Util.FillVectIndRep(ch);
																}
															}
														}
													}*/
												}
											}
										}
									}
								}
							}
						}
					}
					
					// Une fois avoir relev� tout les mots de r�p�titions.
					// pour ceux du haut, supprimer si un motRep de m�me sousgroupe existe dans la zone du milieu ou la zone du haut.
					// pour ceux du bas, supprimer si un motRep de m�me sousgroupe existe dans la zone du milieu ou la zone du bas.
					Util.SelectionMotRepGarder();
					
					// Reconstitue la chaine des balises de mots de r�p�ptitions � garder
					var indicateurRepAGarder = Util.ConstruitChMotRepAGarder();
					
					textHTML = "<p>" + textHTML + "</p>";
					
					// 5. Ecriture du champs de texte
					// On met "[[[TEXT]]]" car il peut y avoir des virgules dans le texte
					var txtField = "[[[PARTTEXT]]]" + idFirstPhrase + ";" + idEndPhrase + ";" + indicateurRepAGarder + "[[[TEXT]]]" + textHTML;
					
					txtId = txtId + txtField;
					
					// Incr�mente le u. Il ne faut pas que la partie sup�rieur du suivant se confonde avec la partie inf�rieure de l'actuel.
					u = indEndPhrase;
				}
			}
		}
	}
	
	return txtId;
},

GetListIdP : function(indP)
{	
	var nodeBody = TextEditor.Document.body;
	
	var nodeP = nodeBody.childNodes[indP];
	
	// Liste des �l�ments de P.
	for(var v = 0; v < nodeP.childNodes.length; v++)
	{
		var node = nodeP.childNodes[v];
		
		if(node.nodeName == 'SPAN')
		{
			var idPhSt = node.getAttribute('id');
			// Phrase
			if(idPhSt && idPhSt.indexOf('p') != -1)
			{
				// Ensemble des �l�ments de la phrase principale
				for(var pu = 0; pu < node.childNodes.length; pu++)
				{
					var nodeChild = node.childNodes[pu];
					if(nodeChild.nodeName == 'SPAN')
					{
						var idChild = nodeChild.getAttribute('id');
						if(idChild)
						{
							// Mot simple
							if(idChild.indexOf('p') == -1 && idChild.indexOf('-x') == -1)
							{
								Style.MapIdMotsTmp.set(idChild, idPhSt);
							}	
							// Expression
							else if(idChild.indexOf('-x') != -1)
							{
								for(var pux = 0; pux < nodeChild.childNodes.length; pux++)
								{
									var nodeChildExp = nodeChild.childNodes[pux];
									if(nodeChildExp.nodeName == 'SPAN')
									{
										var idChildExp = nodeChildExp.getAttribute('id');
										if(idChildExp)
										{
											Style.MapIdMotsTmp.set(idChildExp, idPhSt);
										}
									}
								}
							}
							// Phrases entre parenth�ses
							else if(idChild.indexOf('-p') != -1)
							{
								for(var pux = 0; pux < nodeChild.childNodes.length; pux++)
								{
									var nodeChildPar = nodeChild.childNodes[pux];
									if(nodeChildPar.nodeName == 'SPAN')
									{
										var idChildPar = nodeChildPar.getAttribute('id');
										if(idChildPar)
										{
											// Mot simple
											if(idChildPar.indexOf('-x') == -1)
											{
												Style.MapIdMotsTmp.set(idChildPar, idPhSt);
											}
											// Expressions
											else
											{
												for(var pux = 0; pux < nodeChildPar.childNodes.length; pux++)
												{
													var nodeChildExp = nodeChildPar.childNodes[pux];
													if(nodeChildExp.nodeName == 'SPAN')
													{
														var idChildExp = nodeChildExp.getAttribute('id');
														if(idChildExp)
														{
															Style.MapIdMotsTmp.set(idChildExp, idPhSt);
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
},

// Retourne le num�ro de phrase selon le contour
NumPhrase : function(idPhSt, indPDebut, indPFin, contour)
{
	var nodeBody = TextEditor.Document.body;
	
	var cntPhrase = 0;
	
	// Contour du bas
	if(contour)
	{
		for(var i = indPDebut; i <= indPFin; i++)
		{
			var nodeP = nodeBody.childNodes[i];
			
			for(var v = 0; v < nodeP.childNodes.length; v++)
			{
				var node = nodeP.childNodes[v];
				if(node.nodeName == 'SPAN')
				{
					var idSt = node.getAttribute('id');
					// Phrase
					if(idSt && idSt.indexOf('p') != -1)
					{
						if(idPhSt == idSt) return cntPhrase;
						cntPhrase++;
					}
				}
			}
		}
	}
	// Contour haut
	else
	{
		for(var i = indPFin; i >= indPDebut; i--)
		{
			var nodeP = nodeBody.childNodes[i];
			for(var v = (nodeP.childNodes.length - 1); v >= 0; v--)
			{
				var node = nodeP.childNodes[v];
				if(node.nodeName == 'SPAN')
				{
					var idSt = node.getAttribute('id');
					// Phrase
					if(idSt && idSt.indexOf('p') != -1)
					{
						if(idPhSt == idSt) return cntPhrase;
						cntPhrase++;
					}
				}
			}
		}
	}
},

// Retourne les balises � garder.
// Contour : true pour bas, false pour haut.
BalisesAGarder : function(indPDebut, indPFin, contour)
{
	var ch = "";
	
	// 1. Ensemble des sous groupes dont le 1er �l�ment appartient au contour.
	var setIdSousGroupe = new Set();
	Style.MapIdMotsTmp.clear();
	
	for(var i = indPDebut; i <= indPFin; i++)
	{
		// Retourne la liste des id des mots du P
		Util.GetListIdP(i);
		
		Style.MapIdMotsTmp.forEach(function(value, idSt)
		{
			if(idSt.length > 0)
			{
				var vectInfSousGroupe = Style.StyleText.Map_InfSousGroupe[idSt];
				if(vectInfSousGroupe != null)
				{
					for(var v = 0; v < vectInfSousGroupe.length; v++)
					{
						var infSousGroupe = vectInfSousGroupe[v];
						// R�gle : 0 = au d�but, 2 = fin
						if((infSousGroupe.PosInSousGroupe == 0 && contour) ||
						   (infSousGroupe.PosInSousGroupe == 2 && !contour))
						{
							setIdSousGroupe.add(infSousGroupe.IdSousGroupe);
						}
					}
				}
			}
		});
	}
	
	// 2. Trouve tout les mots dont un sous groupe n'appartient pas � l'ensemble pr�c�dent
	for(var i = indPDebut; i <= indPFin; i++)
	{
		Style.MapIdMotsTmp.forEach(function(value, idSt)
		{
			var balAGarder = false;
			
			if(idSt.length > 0)
			{
				var vectInfSousGroupe = Style.StyleText.Map_InfSousGroupe[idSt];
				if(vectInfSousGroupe != null)
				{
					for(var v = 0; v < vectInfSousGroupe.length; v++)
					{
						var infSousGroupe = vectInfSousGroupe[v];
						if(!setIdSousGroupe.has(infSousGroupe.IdSousGroupe))
						{
							balAGarder = true;
							break;
						}
					}
				}
				
				// Balise � garder. Note son num�ro de phrase et sa position dans la phrase.
				// Format : ":" + idMotRep + "-" + PosPhrase + "-" + NumPhrase + "-" + (b ou h)
				if(balAGarder)
				{
					// S�parateur
					if(ch.length > 0) ch = ch + ":";
					// Indications
					ch = ch + idSt;
					// PosPhrase
					ch = ch + "-" + vectInfSousGroupe[0].Pos_S;
					// Num�ro de phrases
					var numPhrase = Util.NumPhrase(value, indPDebut, indPFin, contour);
					ch = ch + "-" + numPhrase;
					// Position dans le texte
					if(contour == true) ch = ch + "-" + "b";
					else ch = ch + "-" + "h";
				}
			}
		});
	}
	
	return ch;
},

// Retourne l'indice du P de contour. sensContour = true -> contour bas. sensContour = false -> contour haut. 
GetPContour : function(indP, sensContour, ecart2)
{
	var pIndParagraphsAlentour = Util.GetIndParagraphsAlentour(indP, ecart2);
	if(sensContour == true) return pIndParagraphsAlentour[0];
	else return pIndParagraphsAlentour[1];
},

// Construit le texte � envoyer autour des paragraphes modifi�es
GetTexteTransfPlugin : function()
{
	// Texte des morceaux de paragraphes
	var document = TextEditor.Document;
	var nodeBody = document.body;
	var texteTransf = "";

	// Cas particulier : on a supprim� tout le texte : il ne reste plus qu'un P avec un texte sans balise. Ex : <p>il</p>
	if(nodeBody.childNodes.length == 1)
	{
		var nodeP = nodeBody.childNodes[0];
		if(nodeP.childNodes.length == 1)
		{
			if(nodeP.childNodes[0].nodeName == "#text")
			{
				return ('[[[PARTTEXT]]]0;0;[[[TEXT]]]' + '<p>' + nodeP.innerHTML + '</p>');
			}
		}
	}
	
	for(var i = 0; i < nodeBody.childNodes.length; i++)		// Parcours des <p>
	{
		var nodeP = nodeBody.childNodes[i];
		
		// Ensemble de paragraphes modifies
		var estPModifie = Plugins.SetPModifies.has(i);
		if(estPModifie == true)
		{
			//alert(i);
			// 1. D�termine le contour bas. Le 1er P.
			var indElementPDebut = Util.GetPContour(i, true, false);
			
			// 2. Trouve le prochain eventuel P modifi� dans la limite d'un �cart de (ecartMaxRep*2 - 1) phrases;
			var indElementPFin = i;
			var PTrouve = true;
			while(PTrouve == true)
			{
				var indElementPEcart2 = Util.GetPContour(indElementPFin, false, true);
				var PModifieExiste = false;
				for(var u = indElementPFin + 1; u <= indElementPEcart2; u++)
				{
					estPModifie = Plugins.SetPModifies.has(u);
					if(estPModifie)
					{
						indElementPFin = u;
						PModifieExiste = true;
					}
				}
			
				if(PModifieExiste == false) PTrouve = false;
			}
			
			var indElementPProchainModifie = indElementPFin;
			
			// 3. D�termine le P du contour haut.
			indElementPFin = Util.GetPContour(indElementPFin, false, false);
			
			//alert(indElementPDebut + " " + indElementPFin + " " + i);
			
			// 4. Construit le texte avec PDebut et Pfin
			var texte = "";
			for(var u = indElementPDebut; u <= indElementPFin; u++)
			{
				var nodeP = nodeBody.childNodes[u];
					
				var texteNodeP = '';
				if(!Cor.IsIEBefore10) texteNodeP = nodeP.textContent;
				else texteNodeP = nodeP.innerText;
					
				texteNodeP = '<p>' + texteNodeP + '</p>';
				texte = texte + texteNodeP;
			}
			//alert(i);
			
			// 5. Construit la liste des balises de répétitions à garder dans les contours.
			// Balises à garder du contour bas.
			var txtBalisesAGarder = Util.BalisesAGarder(indElementPDebut, i - 1, true);
			//alert(txtBalisesAGarder);
			var txtBalisesAGarderChaut = Util.BalisesAGarder(indElementPProchainModifie + 1, indElementPFin, false);
			//alert(txtBalisesAGarderChaut);
			if(txtBalisesAGarderChaut.length > 0 && txtBalisesAGarder.length > 0) txtBalisesAGarder = txtBalisesAGarder + ":" + txtBalisesAGarderChaut;
			else if(txtBalisesAGarderChaut.length > 0) txtBalisesAGarder = txtBalisesAGarderChaut;
			//alert(txtBalisesAGarder);
			// On met "[[[TEXT]]]" car il peut y avoir des virgules dans le texte
			var txtField = "[[[PARTTEXT]]]" + indElementPDebut + ";" + indElementPFin + ";" + txtBalisesAGarder + "[[[TEXT]]]" + texte;
			texteTransf = texteTransf + txtField;
			//alert(txtField);
			// Incrémente le i. Il ne faut pas que la partie supérieur du suivant se confonde avec la partie inférieure de l'actuel.
			i = indElementPFin;
		}
	}

	return texteTransf;
},

// Remplace une partie de texte dans le texte total
ReplacePartText : function(idPhraseStart, idPhraseEnd, texteHTML)
{
	var document = TextEditor.Document;

	var nodePhraseStart = document.getElementById(idPhraseStart);
	var nodePhraseEnd = document.getElementById(idPhraseEnd);
	
	if(nodePhraseStart && nodePhraseEnd)
	{
		var nodeP = nodePhraseStart.parentNode;
		// 1. Insert le texte HTML dedant
		nodePhraseStart.innerHTML = texteHTML;
		// 2. Déplace l'ensemble et le met avant
		for(var i = 0; i < nodePhraseStart.childNodes.length; i++)
		{
			nodeP.insertBefore(nodePhraseStart.childNodes[i].cloneNode(true), nodePhraseStart);
		}
		
		// 3. Supprime le reste
		if(!Cor.IsIE8)
		{
			var range = document.createRange();
			range.setStartBefore(nodePhraseStart);
			range.setEndAfter(nodePhraseEnd);
													
			range.deleteContents();
		}
		else
		{
			var containerRange = document.body.createTextRange ();
			
			var textRangeStart = document.body.createTextRange ();
			textRangeStart.moveToElementText (nodePhraseStart);
			
			var textRangeEnd = document.body.createTextRange ();
			textRangeEnd.moveToElementText (nodePhraseEnd);
			
			containerRange.setEndPoint ("StartToStart", textRangeStart);
			containerRange.setEndPoint ("EndToEnd", textRangeEnd);
			containerRange.execCommand ('delete', false, null);
		}
	}
},

// Remplace une partie de texte dans le texte total
// On raisonne avec des paragraphes.
ReplacePartTextPlugin : function(indPStart, indPEnd, texteHTML)
{
	var document = TextEditor.Document;
	var nodeBody = document.body;
	
	var nodePStart = nodeBody.childNodes[indPStart];
	var nodePEnd = nodeBody.childNodes[indPEnd];

	if(nodePStart && nodePEnd)
	{
		// 1. Insert le texte HTML dedant
		nodePStart.innerHTML = texteHTML;
		
		// 2. Déplace l'ensemble et le met avant
		for(var i = 0; i < nodePStart.childNodes.length; i++)
		{
			nodeBody.insertBefore(nodePStart.childNodes[i].cloneNode(true), nodePStart);
		}

		// 3. Supprime le reste
		if(!Cor.IsIE8)
		{
			var range = document.createRange();
			range.setStartBefore(nodePStart);
			range.setEndAfter(nodePEnd);
														
			range.deleteContents();
		}
		else
		{
			var containerRange = document.body.createTextRange ();
			
			var textRangeStart = document.body.createTextRange ();
			textRangeStart.moveToElementText (nodePStart);
			
			var textRangeEnd = document.body.createTextRange ();
			textRangeEnd.moveToElementText (nodePEnd);
			
			containerRange.setEndPoint ("StartToStart", nodePStart);
			containerRange.setEndPoint ("EndToEnd", nodePEnd);
			containerRange.execCommand ('delete', false, null);
		}
	}
	
},

// Supprime les anciens id non utilisés
SuppAncienCorId_Style : function()
{
	if(Style.StyleText != null)
	{
		var setSupp = new Set();
		
		// Rep
		for(var id in Style.StyleText.Map_InfSousGroupe)
		{
			if(!Cor.SetId.has(id)) setSupp.add(id);
		}
		
		setSupp.forEach(function(id){delete Style.StyleText.Map_InfSousGroupe[id];});
		
		// Rep 2mPh
		setSupp.clear();
		for(var id in Style.StyleText.Map_InfSousGroupe2mPh)
		{
			if(!Cor.SetId.has(id)) setSupp.add(id);
		}
		
		setSupp.forEach(function(id){delete Style.StyleText.Map_InfSousGroupe2mPh[id];});
		
		// ExpressionSol
		setSupp.clear();
		for(var id in Style.StyleText.Map_ExpressionSol)
		{
			if(!Cor.SetId.has(id)) setSupp.add(id);
		}
		
		setSupp.forEach(function(id){delete Style.StyleText.Map_ExpressionSol[id];});
		
		// Sentences
		setSupp.clear();
		for(var id in Style.StyleText.Map_Sentences)
		{
			if(!Cor.SetId.has(id)) setSupp.add(id);
		}
		setSupp.forEach(function(id){delete Style.StyleText.Map_Sentences[id];});
		
		// IdSyn
		setSupp.clear();
		for(var id in Style.StyleText.MapIdSyn)
		{
			if(!Cor.SetId.has(id)) setSupp.add(id);
		}
		setSupp.forEach(function(id){delete Style.StyleText.MapIdSyn[id];});
		
		setSupp.clear();
		
		// Syst�me diff�rent : ne comporte plus de balises.
		// Il faudrait comparer avec les id dans PresentationTransfUtil.MapIdSyn
		/*for (Map.Entry<String, Vector<Vector<String>>> e : PresentationTransf.TransfText.MapSynonymes.entrySet())
		{
			if(!PresentationCorUtil.SetId.contains(e.getKey())) setSupp.add(e.getKey());
		}
				
		for(Iterator<String> it = setSupp.iterator(); it.hasNext();) PresentationTransf.TransfText.MapSynonymes.remove(it.next());
			
		setSupp.clear();*/
	}
},

// Class of synonym Id
IdSyn : function(id, synSt, niemeOccurence)
{
	this.Id = id;
	this.SynSt = synSt;
	this.NiemeOccurence = niemeOccurence;
},

// Retourne le triplet : posCursor phraseSt idPhrase
GetPosCursorInPhrase : function()
{	
	var document = TextEditor.Document;
	var window = TextEditor.Window;
	var nodeSel = null;
	var rangeSel = null;

	// IE 11 et autre que IE
	if(window.getSelection)
	{
		var selection = window.getSelection();
		rangeSel = selection.getRangeAt(0);
		nodeSel = rangeSel.startContainer;
	}
	
	if(nodeSel)
	{
		// Trouve le nodePhrase
		var nodePhrase = null;
		var nodeParentNodeSel = nodeSel.parentNode;
		
		for(var i = 0; i < 3; i++)
		{
			if(nodeParentNodeSel && nodeParentNodeSel.nodeName == 'SPAN')
			{
				var id = nodeParentNodeSel.getAttribute("id");
				if(id && id.indexOf("p") != -1)
				{
					nodePhrase = nodeParentNodeSel;
					break;
				}
			}
			nodeParentNodeSel = nodeParentNodeSel.parentNode;
		}
		
		if(nodePhrase == null) return "";
		
		// Bug de Firefox. pour le reproduire. Add char plusieurs fois, espace entre temps. Un <Br> se met � la fin.
		// Supprression au milieu. Ajout � la fin. 
		if(nodePhrase == nodeSel)
		{
			var newRange = document.createRange();
			//newRange.selectNode(nodeP);
			
			newRange.setStartBefore(nodePhrase);
			newRange.setEndAfter(nodePhrase);
			
			var result = newRange.toString().length + "-" + nodePhrase.getAttribute("id") + ":" + newRange.toString();
		
			return result;
		}
		
		//alert('a');
		var posInPar = 0;
		
		//alert(document.body.childNodes[0].nodeName);
		//alert(nodeSel.nodeName);
		
		var newRange = document.createRange();
				
		//alert(nodeP.nodeName);
		
		newRange.selectNode(nodePhrase);
		
		var phraseSt = newRange.toString();

		//newRange.setStartBefore(nodeP);
		//alert('a');
		newRange.setEndBefore(nodeSel);
		
		//alert(rangeSel.startOffset);
		//alert(nodeP.nodeValue);
		//alert(document.body.innerHTML);
		//alert(newRange.toString().length + ":" + rangeSel.endOffset);
		//var st = document.body.innerHTML;
		//st = (nodeSel.nodeName + ":" + newRange.toString().length + ":" + rangeSel.endOffset + ":" + rangeSel.startOffset);
		
		posInPhrase = (newRange.toString().length + rangeSel.startOffset);
		
		var result = posInPhrase + "-" + nodePhrase.getAttribute("id") + ":" + phraseSt;
		
		return result;
	}
},

// Retourne l'Id du synonyme sur le curseur
GetIdSynCursor : function()
{
	try{
		// 1. Retourne le mot sur le syn
		var pos = Util.GetPosCursorInPhrase();
		if(pos != null && pos.length > 0)
		{
			var ind2p = pos.indexOf(":");
			if(ind2p >= 0)
			{
				var idPos = pos.substring(0, ind2p);
				var tabSt = idPos.split("-");
				var posC = parseInt(tabSt[0]);
				var idPhrase = tabSt[1];
				
				var phraseSt = pos.substring(ind2p + 1);
			
				// Reach the synonym list
				
				Style.VectIdSyn = Style.MapIdSyn.get(idPhrase);
				if(Style.VectIdSyn != null)
				{
					for(var u = 0; u < Style.VectIdSyn.length; u++)
					{
						var idSyn = Style.VectIdSyn[u];
						var synSt = idSyn.SynSt;
						var lg = synSt.length;
						var numOccurrences = idSyn.NiemeOccurence;
						
						// Search the occurrences of synSt.
						var cnt = 0;
						var offSet = 0;
						for(i = 0; i < 100; i++)
						{
							var ind = phraseSt.indexOf(synSt, offSet);
							if(ind >= 0)
							{
								offSet = ind + 1;
								cnt++;
								
								if(cnt == numOccurrences)
								{
									// Check for the synonym.
									if((posC >= (ind + 1)) && (posC <= (ind + lg)))
									{
										Style.OffsetGSyn = posC - ind;
										Style.OffsetDSyn = ind + lg - posC;
				
										Style.IdSynActuel = idSyn;
										return idSyn.Id;
									}
								}
							}
							else break;
						}	
					}
				}
			}
		}
	}
	catch(ex){}
	
	return null;
},

// Les P sans phrases sont consid�r�s comme modifi�s.
PSansPhraseModifie : function()
{
	if(Plugins.Type == 'MSPowerPoint' || Plugins.Type == 'MSExcel' || Plugins.Type == 'MSPowerPointOSX' || Plugins.Type == 'MSExcelOSX' || Plugins.Type == 'MSExcelWeb' || Plugins.Type == 'GoogleSheets' ||
	   Plugins.Type == 'Chrome' || Plugins.Type == 'Firefox' || Plugins.Type == 'Thunderbird' || Plugins.Type == 'Integration' || Plugins.Type == 'Safari' || Plugins.Type == 'Wysiwyg')
	{
		var nodeBody = TextEditor.Document.body;
	
		for(var i = 0; i < nodeBody.childNodes.length; i++)		// Parcours des <p>
		{
			var childNode = nodeBody.childNodes[i];
			
			// P sans span.
			if(childNode.childNodes.length == 1 && childNode.childNodes[0].nodeName == '#text')
			{
				Plugins.SetPModifies.add(i);
			}
		}
	}
	
},

// Desurligne toutes les �lements surlign�s en jaune.
DesouligneStyle : function()
{
	var doc = TextEditor.Document.body;
	
	var elements = [];
	var eltsJa = doc.getElementsByClassName("s-ja");
	for(var i = 0; i < eltsJa.length; i++) elements.push(eltsJa[i]);
	var eltsUbl = doc.getElementsByClassName("u-bl");
	for(var i = 0; i < eltsUbl.length; i++) elements.push(eltsUbl[i]);
	
	var tabElements_Supp = [];
	var tabElements_SuppClass = [];
	
	for(var i = 0; i < elements.length; i++)
	{
		var element = elements[i];
		
		tabElements_SuppClass.push(element);
	}
	
	// 2. Two Id -> remove the "s-ja" className and the id.
	for(var i = 0; i < tabElements_SuppClass.length; i++)
	{
		var element = tabElements_SuppClass[i];
		
		var className = element.className;
		
		// Only s-ja
		if((className == "s-ja") || (className == "u-bl")) element.removeAttribute("class");
		// s-ja and underlined
		else 
		{
			var indU = className.indexOf("s-ja");
			if(indU == -1) indU = className.indexOf("u-bl");
			var newClassName = className.substr(0, indU - 1);
			
			element.className = newClassName;
		}
	}
},

// IHM

// Infobulle avec image
InfoBulle : function(infoLabel)
{
	var img = document.createElement("img");
	img.src = "images/rens3.png";
	//img.style.paddingRight = "5px";
	//img.style.paddingLeft = "5px";
	
	// Popup d'explication
	this.PopupExp = document.createElement("div");
	this.PopupExp.setAttribute("class", "Cor-PopupPanelExpSol");
	
	this.PopupExp.style.overflow = 'visible';
	this.PopupExp.style.position = 'absolute';
	this.PopupExp.style.zIndex = "1002";
	this.PopupExp.style.borderTop = "thin solid #dddddd";
	
	// Position. Just under the image
	var popup = this.PopupExp;
	
	this.PopupExp.style.visibility = "hidden";
	
	this.PopupExp.innerHTML = infoLabel;
	
	// Add to the body
	document.body.appendChild(this.PopupExp);
	
	var popup = this.PopupExp;
	
	img.onmouseover = function()
	{
		var rect = this.getBoundingClientRect();
		
		if(Cor.IsIE11 == false)
		{
			popup.style.left = window.scrollX + rect.left + 'px';
			popup.style.top = window.scrollY + rect.top + 50 + 'px';
		}
		else
		{
			popup.style.left = window.pageXOffset + rect.left + 'px';
			popup.style.top = window.pageYOffset + rect.top + 50 + 'px';
		}
	
		popup.style.visibility = "visible";
	}
	
	img.onmouseout = function()
	{
		popup.style.visibility = "hidden";
	}
	
	return img;
},

// Infobulle avec texte
TextInfoBulle : function(title, infoLabel)
{
	var textDiv = document.createElement("p");
	textDiv.innerHTML = title;
	textDiv.style.cursor = "pointer";
	//img.style.paddingRight = "5px";
	//img.style.paddingLeft = "5px";
	
	// Popup d'explication
	this.PopupExp = document.createElement("div");
	this.PopupExp.setAttribute("class", "Cor-PopupPanelExpSol");
	
	this.PopupExp.style.overflow = 'visible';
	this.PopupExp.style.position = 'absolute';
	this.PopupExp.style.zIndex = "300";
	
	// Position. Just under the imag
	var popup = this.PopupExp;
	
	this.PopupExp.style.visibility = "hidden";
	
	this.PopupExp.innerHTML = infoLabel;
	
	// Add to the body
	document.body.appendChild(this.PopupExp);
	
	var popup = this.PopupExp;
	
	textDiv.onmouseover = function()
	{
		var rect = this.getBoundingClientRect();
		
		if(Cor.IsIE11 == false)
		{
			popup.style.left = window.scrollX + rect.left + 'px';
			popup.style.top = window.scrollY + rect.top + 50 + 'px';
		}
		else
		{
			popup.style.left = window.pageXOffset + rect.left + 'px';
			popup.style.top = window.pageYOffset + rect.top + 50 + 'px';
		}
	
		popup.style.visibility = "visible";
	}
	
	textDiv.onmouseout = function()
	{
		popup.style.visibility = "hidden";
	}
	
	return textDiv;
},

// IHM component: represent a radio button group
PanelRb : function(text, group, textInfo)
{
	this.Node = document.createElement("table");
	this.Node.style.marginBottom = "15px";
	this.Node.style.display = "none";
	this.Node.style.cursor = "pointer";
	
	var tr = document.createElement("tr");
	this.Node.appendChild(tr);
	
	this.Counter = 0;
	
	
	// Help icon
	if(textInfo.length > 0)
	{
		var td0 = document.createElement("td");
		
		var infoBulle = new Util.InfoBulle(textInfo);
		infoBulle.setAttribute("style", "padding-right: 5px;");
		
		td0.appendChild(infoBulle);
		tr.appendChild(td0);
	}
	
	// Text
	var tdTextNb = document.createElement("td");
	var tableTextNb = document.createElement("table");
	// tableTextNb.style.width = "190px";
	var trTextNb = document.createElement("tr");
	
	var td1 = document.createElement("td");
	td1.setAttribute("align", "left");
	var divText = document.createElement("div");
	divText.setAttribute("class", "Stat-AnalyseTitre");
	divText.innerHTML = text;
	td1.appendChild(divText);
	trTextNb.appendChild(td1);
	
	// Number
	var td2 = document.createElement("td");
	td2.setAttribute("align", "left");
	this.DivNb = document.createElement("div");
	this.DivNb.setAttribute("class", "Stat-AnalyseTitre number");
	this.DivNb.innerHTML = "(0)";
	td2.appendChild(this.DivNb);
	trTextNb.appendChild(td2);
	
	tableTextNb.appendChild(trTextNb);
	tdTextNb.appendChild(tableTextNb);
	tr.appendChild(tdTextNb);
	
	// RadioButton
	var td3 = document.createElement("td");
	td3.setAttribute("align", "left");	
	this.Input = document.createElement("input");
	this.Input.setAttribute("type", "radio");
	this.Input.setAttribute("name", group);
	this.Input.setAttribute("id", text.replace(/ .*/,''));
	this.Input.setAttribute("value", "on");
	this.Input.style.cursor = "pointer";
	this.Input.disabled = true;
	td3.appendChild(this.Input);
	
	var labelTag = document.createElement("label");
	labelTag.setAttribute("for", text.replace(/ .*/,'')); 
	td3.appendChild(labelTag);

	tr.appendChild(td3);
	
	// Set value of the number
	this.SetNb = function(number)
	{
		this.Counter = number;
		
		this.DivNb.innerHTML = '(' + number + ')';
		
		if(this.Counter > 0) this.Input.disabled = false;
		else this.Input.disabled = true;
	}
	
	// Decrease of 1
	this.Decrease = function()
	{
		if(this.Counter > 0) this.SetNb(this.Counter - 1);
	}
},

// Table type component
TableType : function(nbRow, type)
{
	this.Node = document.createElement("table");
	this.Node.setAttribute("class", "Stat-GridRep");
	//this.Node.setAttribute("cellspacing", "0");

	// var tableStat = document.createElement("table");
	// tableStat.setAttribute("class", "Stat-GridRepTable");
	
	// Build the rows
	this.BuildRows = function(nbRow)
	{
		// Clear all
		this.Node.innerHTML = '';
	
		for(var i = 0; i < nbRow; i++)
		{
			var tr = document.createElement("tr");
			
			// Column 0
			var td0 = document.createElement("td");
			td0.className = "Stat-CellStyle";
			if(type == 'MainTableStat') td0.style.width = "172px";
			tr.appendChild(td0);
			
			// Column 1
			if((type != 'Tools_ConnecteurLogiques') &&
			   (type != 'Tools_FormulesPolitesse'))
			{
				var td1 = document.createElement("td");
				
				if(type == 'MainTableStat') td1.setAttribute("class", "Stat-CellStyleNbStat");
				else td1.setAttribute("class", "Stat-CellStyleNb");
				
				tr.appendChild(td1);
			}
			
			// Colum 2
			if(type == "NbSyllablePerWords" ||
			   type == 'Expression')
			{
				var td2 = document.createElement("td");
			
				if(type == 'MainTableStat') td2.setAttribute("class", "Stat-CellStyleNbStat");
				else td2.setAttribute("class", "Stat-CellStyleNb");
				
				tr.appendChild(td2);
			}
			
			// Click on tr.
			if(type == 'Rep')
			{
				tr.onclick = function(tr)
				{
					this.childNodes[0].setAttribute("class", "Stat-CellStyleSelect");
					this.childNodes[1].setAttribute("class", "Stat-CellStyleSelectNb");
				}
			}
			
			this.Node.appendChild(tr);
		}
	}
	
	// Build rows
	this.BuildRows(nbRow);
	
	// Set text in a celle
	this.SetText = function(text, row, column)
	{
		var tr = this.Node.childNodes[row];
		var td = tr.childNodes[column];
	
		td.innerHTML = text;
	}
	
	// Set a node
	this.SetNode = function(node, row, column)
	{
		var tr = this.Node.childNodes[row];
		var td = tr.childNodes[column];
	
		td.appendChild(node);
	}

	// this.Node.appendChild(tableStat);

},

// Popup de base
PopupBase : function(supclass = '')
{
	


	this.Node = document.createElement("div");
	this.Loaded = false;
	
	liste_class = 'Prem-PopupVPremium open'
	if (supclass != '') {
		liste_class = 'Prem-PopupVPremium open ' + supclass;
	}
	this.Node.setAttribute("class", liste_class);
	this.Node.style.zindex = 5;
	this.Node.style.overflow = 'visible';
	this.Node.style.position = 'absolute';
	
	//node.style.transitionProperty = 'opacity';
	//node.style.transitionDuration = '2s';
	
	// Image close
	var divImg = document.createElement("div");
	divImg.classList = "closer";
	// divImg.setAttribute("align", "right");
	// divImg.style.verticalAlign = "top";
	
	var imgClose = document.createElement("img");
	imgClose.setAttribute("src", "images/CloseCrossWhite.png");
	imgClose.style.cursor = "pointer";
	imgClose.style.marginRight = "10px";
	imgClose.style.marginTop = "10px";
	
	imgClose.addEventListener('click', function()
	{
		// Hide the window
		var popup = this.parentNode.parentNode;
		popup.style.visibility = "hidden";
		$(popup).removeClass('open');
		//document.getElementById('overlayPopup').classList.remove('open');
	});
	
	divImg.appendChild(imgClose);
	this.Node.appendChild(divImg);
	
	// Main div
	var mainDiv = document.createElement("div");
	mainDiv.classList = "maindiv";
	// mainDiv.style.paddingLeft = "20px";
	// mainDiv.style.paddingRight = "20px";
	// mainDiv.style.paddingBottom = "20px";
	// mainDiv.style.paddingTop = "15px";
	
	this.Node.appendChild(mainDiv);
	
	// Set visible
	this.SetVisible = function(visible)
	{
		if(visible == true)
		{
			// Center the popup on the screen
			var wndWidth = window.outerWidth;
			var wndHeight = window.outerHeight;
			
			if(Cor.IsTablet == true)
			{
				wndWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
				wndHeight = (window.innerHeight > 0) ? window.innerHeight : screen.height;
			}
			
			var width = 0;
			var height = 0;
			if(Cor.IsIE11 == false)
			{
				width = window.scrollX + (wndWidth / 2) - (this.Node.clientWidth / 2);
				height = window.scrollY + (wndHeight / 2) - (this.Node.clientHeight / 2)/* - 190*/;
			}
			else
			{
				width = window.pageXOffset + (wndWidth / 2) - (this.Node.clientWidth / 2);
				height = window.pageYOffset + (wndHeight / 2) - (this.Node.clientHeight / 2 + 50)/* - 190*/;
			}
		
			//var width = (wndWidth / 2);
			//var height = (wndHeight / 2);
		
			this.Node.style.left = width + 'px';
			this.Node.style.top = height + 'px';
			
			// Set visible
			this.Node.style.visibility = "visible";
			$(this.Node).addClass('open');
			//$("#overlayPopup").addClass('open');
		}
		else
		{
			$(this.Node).removeClass('open');
			this.Node.style.visibility = "hidden";
			//$("#overlayPopup").removeClass('open');
		}
	}
},

// Popup of confirmation
MessageWindowConfirmation : function(message, type)
{
	// Init
	this.Type = type;

	this.PopupBase = new Util.PopupBase();
	
	if(type == 4) this.PopupBase.Node.style.zIndex = '200';
	
	var popup = document.createElement("div");
	
	//titre
	var title = document.createElement("div");
		title.className = "titre";
		title.innerHTML = "Avertissement";
		popup.appendChild(title);

	// Red button
	var divTableButtons = document.createElement("div");
	divTableButtons.setAttribute("class", "buttons");
	// divTableButtons.setAttribute("align", "center");
	// divTableButtons.style.verticalAlign = "top";
	
	var tableButtons = document.createElement("table");
	
	var tr = document.createElement("tr");
	var td = document.createElement("td");
	
	var buttonOK = document.createElement("div");
	buttonOK.setAttribute("class", "Cor-RedButton");
	//buttonOK.style.width = "120px";
	buttonOK.style.paddingLeft = "40px";
	buttonOK.style.paddingRight = "40px";
	buttonOK.innerHTML = "OK";
	
	td.appendChild(buttonOK);
	tr.appendChild(td);
	
	tableButtons.appendChild(tr);
	
	divTableButtons.appendChild(tableButtons);
	
	// Text
	if(message.length > 0)
	{
		var divMessage = document.createElement("div");
		divMessage.className = "Prem-TexteBasePremium";
		divMessage.style.fontSize = "16px";
		divMessage.style.fontWeight = "bold";
		divMessage.style.marginBottom = "20px";
		divMessage.setAttribute("align", "center");
		divMessage.innerHTML = message;
		
		popup.appendChild(divMessage);
	}
	// Indications
	if(type == 4)
	{
		this.Img = document.createElement("img");
	
		if(Cor.IdLangue == "fr") this.Img.setAttribute("src", "images/L9.png");
		else if(Cor.IdLangue == "en") this.Img.setAttribute("src", "images/Indications_En_2.png");
		
		var title = document.createElement("div");
		title.className = "titre";
			if(Cor.IdLangue == "en") title.innerHTML = "Color key";
		else if(Cor.IdLangue == "fr") title.innerHTML = 'Indications';

		popup.appendChild(title);
		popup.appendChild(this.Img);
	}
	
	// Add the buttons
	this.PopupBase.Node.appendChild(divTableButtons);
	// popup.appendChild(divTableButtons);
	
	this.PopupBase.Node.childNodes[1].appendChild(popup);
	
	// Click button
	var popupBase = this.PopupBase;
	buttonOK.addEventListener('click', function()
	{
		// Désinscription
		if(type == 2)
		{
			Util.SendHttpRequest('Identification_Servlet',
							[['FunctionName', 'SuppressionAbonnement'],
							 ['Id', Cor.User.Identifiant]],
							 function(response)
							 {
								// Avertit l'utilisateur que son abonnement est supprimé
								var messageSupp = "<p>Votre abonnement a bien " + String.fromCharCode(233) + "t" + String.fromCharCode(233) + " supprim" + String.fromCharCode(233) + "</p>";
								messageSupp += "<p>Merci d'avoir utilis" + String.fromCharCode(233) + " Scribens.</p>";
								var popupConfSupp = new Util.MessageWindowConfirmation(messageSupp, 3);
								popupConfSupp.SetVisible(true);
							 });
		}

		// Hide the window
		popupBase.SetVisible(false);
	});
	
	// Function show
	this.SetVisible = function(visible)
	{
		//if(this.PopupBase.Node.style.visibility == "" || this.PopupBase.Node.style.visibility == "hidden")
		//{
			var popupBase = this.PopupBase;
			// For type = 4, must wait until image loading to know the width of the panel PopupBase.
			if(this.Type == 4)
			{
				if(this.PopupBase.Loaded == false)
				{
					this.Img.addEventListener("load", function()
					{
						popupBase.Loaded = true;
						popupBase.SetVisible(visible);
					});
				}
				else
				{
					//var popupBase = this.parentNode.parentNode.parentNode;
					popupBase.SetVisible(visible);
				}
			}
			// Other types
			else
			{
				this.PopupBase.SetVisible(visible);
			}
		//}
	}
	
	//popupBase.Node.style.visibility = "visible";
	document.body.appendChild(this.PopupBase.Node);
	
}


};