
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
	
	if((servletId == "Identification_Servlet") ||
	   (servletId == "Payment_Servlet"))
	{
		tomcat_Instance = "Scribens";
	}
	
	
	xmlhttpRequest.open("POST", urlWebSite + "/" + tomcat_Instance + "/" + servletId);
	//if(servletId == "Save_SetupIntent") xmlhttpRequest.open("POST", "http://localhost:8080/TestWS/" + servletId);
	
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

// Conditions on address value
Condition_Address : function(address)
{
	if(address != null)
	{
		if(address.length > 0 && address.length < 32 && !(address.indexOf("|") >= 0))
		{
			return true;
		}
	}
	
	return false;
},

// Conditions on city value
Condition_City : function(city)
{
	if(city != null)
	{
		if(city.length > 0 && city.length < 32 && !(city.indexOf("|") >= 0))
		{
			return true;
		}
	}
	
	return false;
},

// Conditions on company value
Condition_Company : function(company)
{
	if(company != null)
	{
		if(company.length >= 0 && company.length < 200 && !(company.indexOf("|") >= 0))		// Empty field company : OK
		{
			return true;
		}
	}
	
	return false;
},

// Conditions on postal code value
/*Condition_PostalCode : function(postalCode)
{
	// Postal code, only if there are letters inside.
	if(city != null)
	{
		if(city.length > 0 && city.length < 32 && !(city.indexOf("|") >= 0))
		{
			return true;
		}
	}
	
	return true;
},*/

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
		else
		{
			this.Input.disabled = true;
			
			// Hide the panelRb
			this.Node.style.display = "none";
			
			// If the parent has only one panelRb, then hide it.
			var parentNode = this.Node.parentNode;
			
			var cntPanelRbShown = 0;
			for(var i = 0; i < parentNode.childNodes.length; i++)
			{
				// PanelRb
				var childNode = parentNode.childNodes[i];
				if(childNode.style.display == "block")
				{
					if(childNode instanceof Util.PanelRb)
					{
						cntPanelRbShown++;
					}
					// Table of repetitions
					if(childNode.id == "DivWordRepetitions" ||
					// Table of registers
					   childNode.id == "TableReg")
					{
						cntPanelRbShown++;
					}
				}
			}
			
			if(cntPanelRbShown == 0)
			{
				parentNode.style.display = "none";
			}
			
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
			if(type == 'MainTableStat')
			{
				td0.style.cursor = "default";
				td0.style.width = "172px";
			}
			
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
	divImg.style.cursor = "pointer";
	
	// divImg.setAttribute("align", "right");
	// divImg.style.verticalAlign = "top";
	
	divImg.addEventListener('click', function()
	{
		// Hide the window
		var popup = this.parentNode;
		popup.style.visibility = "hidden";
		$(popup).removeClass('open');
		//document.getElementById('overlayPopup').classList.remove('open');
	});
	
	var imgClose = document.createElement("img");
	imgClose.setAttribute("src", "images/CloseCrossWhite.png");
	imgClose.style.cursor = "pointer";
	imgClose.style.marginRight = "10px";
	imgClose.style.marginTop = "10px";
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
MessageWindowConfirmation : function(message, type, titleSt)
{
	// Init
	this.Type = type;

	this.PopupBase = new Util.PopupBase();
	
	if(type == 4) this.PopupBase.Node.style.zIndex = '200';
	
	var popup = document.createElement("div");
	
	//titre
	var title = document.createElement("div");
		title.className = "titre";
		title.innerHTML = titleSt;
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
								var popupConfSupp = new Util.MessageWindowConfirmation(messageSupp, 3, "Avertissement");
								popupConfSupp.SetVisible(true);
							 });
		}
		// Confirmation désinscription
		else if(type == 3)
		{
			// Déconnexion
			Premium.Deconnexion();
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

		range.oninput = function() {
			number.innerHTML = this.value;
		}
		
		tdRange.appendChild(range);
		tdRange.appendChild(number);
		tr.appendChild(tdRange);
		
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
			td0.innerHTML = "* Prise en compte de la r" + String.fromCharCode(233) + "forme de l'orthographe de 1990."; // insere dans le html
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
		var tr1 = document.createElement("tr");
		tr1.id = "SettingsShowUPSol";
		tr1.className = "switch switch--horizontal";
		
		var td0 = document.createElement("td");
		td0.className = "Cor-LabelOption";
		if(Cor.IdLangue == "fr") td0.innerHTML = "* Affichage des corrections sur les noms propres inconnus.";
		else if(Cor.IdLangue == "en") td0.innerHTML = "Show solutions of unknown proper nouns.";
		
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
		
		// Font size of the document
		var tableFontSize = document.createElement("table");
		var trFontSize = document.createElement("tr");
		
		var tdFontSize = document.createElement("td");
		tdFontSize.style.verticalAlign = "top";
		tdFontSize.style.fontSize = "15px";
		tdFontSize.style.paddingRight = "20px";
		tdFontSize.style.paddingTop = "5px";
		
		if(Cor.IdLangue == "fr") tdFontSize.innerHTML = "* Taille de police du document";
		else if(Cor.IdLangue == "en") tdFontSize.innerHTML = "Font size of the document";
		
		trFontSize.appendChild(tdFontSize); 
		
		var tdSlide = document.createElement("td");
		tdSlide.style.verticalAlign = "top";
		tdSlide.style.paddingLeft = "40px";
		tdSlide.style.paddingTop = "5px";
		
		var range = document.createElement("input");
		range.type = "range";
		range.id = "SettingsFontSize";
		range.className = "slider-range";
		range.setAttribute("min", 15);
		range.setAttribute("max", 30);
		range.setAttribute("value", 17);
		
		var number = document.createElement("p");
		number.className = "number-range";
		number.innerHTML = range.value;

		range.oninput = function() {
			number.innerHTML = this.value;
		}

		tdSlide.appendChild(range);
		tdSlide.appendChild(number);
		
		trFontSize.appendChild(tdSlide); 
		
		tableFontSize.appendChild(trFontSize);
		div.appendChild(tableFontSize);
		
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
		
		// Button OK
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
		
		// Button cancel
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
		
		// Button "set to default". Set all values to the default values.
		var buttonSetToDefault = document.createElement("div");
		buttonSetToDefault.setAttribute("class", "Cor-RedButton");
		buttonSetToDefault.style.marginLeft = "50px";
		
		if(Cor.IdLangue == 'fr') buttonSetToDefault.innerHTML = "Rétablir les valeurs par défaut";
		else if(Cor.IdLangue == 'en') buttonSetToDefault.innerHTML = "Reset settings to default";
		
		var valueWindow = this;
		buttonSetToDefault.addEventListener('click', function()
		{
			// Set to default values
			valueWindow.FillValues(true);
		});
		
		table.appendChild(buttonSetToDefault); 
		
		divButtons.appendChild(table);
	
		//this.MainDiv.appendChild(divButtons);
		this.PopupBase.Node.appendChild(divButtons);
		// this.PopupBase.Node.childNodes[1].appendChild(divButtons);
	};
	
	// Fill values with cookies.
	// defaultValue : set to default values
	this.FillValues = function(defaultValue)
	{
		var tabSt = Cor.OptionsCorSt.split("|");
		
		// Options cor
		if(Cor.IdLangue == 'fr')
		{
			// Genres
			var eltGenre_Je = document.getElementById("Genre_Je");
			var genre_Je_value = this.GetValueOfOption("Genre_Je", tabSt);
			if(defaultValue) genre_Je_value = "0";
			this.SetValueToSelect(eltGenre_Je, genre_Je_value);	
			
			var eltGenre_Tu = document.getElementById("Genre_Tu");
			var genre_Tu_value = this.GetValueOfOption("Genre_Tu", tabSt);
			if(defaultValue) genre_Tu_value = "0";
			this.SetValueToSelect(eltGenre_Tu, genre_Tu_value);
			
			var eltGenre_Nous = document.getElementById("Genre_Nous");
			var genre_Nous_value = this.GetValueOfOption("Genre_Nous", tabSt);
			if(defaultValue) genre_Nous_value = "0";
			this.SetValueToSelect(eltGenre_Nous, genre_Nous_value);
			
			var eltGenre_Vous = document.getElementById("Genre_Vous");
			var genre_Vous_value = this.GetValueOfOption("Genre_Vous", tabSt);
			if(defaultValue) genre_Vous_value = "0";
			this.SetValueToSelect(eltGenre_Vous, genre_Vous_value);
			
			var eltGenre_On = document.getElementById("Genre_On");
			var genre_On_value = this.GetValueOfOption("Genre_On", tabSt);
			if(defaultValue) genre_On_value = "0";
			this.SetValueToSelect(eltGenre_On, genre_On_value);
			
			// Autres options
			var valueCorRef = this.GetValueOfOption("RefOrth", tabSt);
			if(defaultValue) valueCorRef = "0";
			var elt1 = document.getElementById("SettingsCorRef");
			
			if(valueCorRef == "1")
			{
				$('#SettingsCorRef .toggle-outside').addClass('left');
				$('#SettingsCorRef .toggle-outside').removeClass('right');
				elt1.childNodes[1].firstChild.checked = true;
				elt1.childNodes[3].firstChild.checked = false;
			}
			else
			{
				$('#SettingsCorRef .toggle-outside').addClass('right');
				$('#SettingsCorRef .toggle-outside').removeClass('left');
				elt1.childNodes[1].firstChild.checked = false;
				elt1.childNodes[3].firstChild.checked = true;
			}
			
			// Show unknown proper nouns solutions
			var eltShowUNSol = document.getElementById("SettingsShowUPSol");
			var valueShowUNSol = this.GetValueOfOption("ShowUPSol", tabSt);
			if(defaultValue) valueShowUNSol = "1";
			
			if(valueShowUNSol == "1")
			{
				$('#SettingsShowUPSol .toggle-outside').addClass('left');
				$('#SettingsShowUPSol .toggle-outside').removeClass('right');
				eltShowUNSol.childNodes[1].firstChild.checked = true;
				eltShowUNSol.childNodes[3].firstChild.checked = false;
			}
			else
			{
				$('#SettingsShowUPSol .toggle-outside').addClass('right');
				$('#SettingsShowUPSol .toggle-outside').removeClass('left');
				eltShowUNSol.childNodes[1].firstChild.checked = false;
				eltShowUNSol.childNodes[3].firstChild.checked = true;
			}
			
			// AutoCorrectPaste
			var elt2 = document.getElementById("SettingsAutoCorrectPaste");
			var valueAutoCorrect_AfterPaste = Cor.AutoCorrect_AfterPaste;
			if(defaultValue) valueAutoCorrect_AfterPaste = false;
			
			if(valueAutoCorrect_AfterPaste == true)
			{
				$('#SettingsAutoCorrectPaste .toggle-outside').addClass('left');
				$('#SettingsAutoCorrectPaste .toggle-outside').removeClass('right');
				elt2.childNodes[1].firstChild.checked = true;
				elt2.childNodes[3].firstChild.checked = false;
			}
			else
			{
				$('#SettingsAutoCorrectPaste .toggle-outside').addClass('right');
				$('#SettingsAutoCorrectPaste .toggle-outside').removeClass('left');
				elt2.childNodes[1].firstChild.checked = false;
				elt2.childNodes[3].firstChild.checked = true;
			}
		}
		// English
		else
		{
			// UsBr
			var eltUsBr = document.getElementById("SettingsUsBr");
			var valUsBr = this.GetValueOfOption("UsBr", tabSt);
			if(defaultValue) valUsBr = "-1";
			this.SetValueToSelect(eltUsBr, valUsBr);
			
			// Show unknown proper nouns solutions
			var eltShowUNSol = document.getElementById("SettingsShowUPSol");
			var valueShowUNSol = this.GetValueOfOption("ShowUPSol", tabSt);
			if(defaultValue) valueShowUNSol = "1";
			
			if(valueShowUNSol == "1")
			{
				$('#SettingsShowUPSol .toggle-outside').addClass('left');
				$('#SettingsShowUPSol .toggle-outside').removeClass('right');
				eltShowUNSol.childNodes[1].firstChild.checked = true;
				eltShowUNSol.childNodes[3].firstChild.checked = false;
			}
			else
			{
				$('#SettingsShowUPSol .toggle-outside').addClass('right');
				$('#SettingsShowUPSol .toggle-outside').removeClass('left');
				eltShowUNSol.childNodes[1].firstChild.checked = false;
				eltShowUNSol.childNodes[3].firstChild.checked = true;
			}
			
			// AutoCorrectPaste
			var elt2 = document.getElementById("SettingsAutoCorrectPaste");
			var valueAutoCorrect_AfterPaste = Cor.AutoCorrect_AfterPaste;
			if(defaultValue) valueAutoCorrect_AfterPaste = false;
			
			if(valueAutoCorrect_AfterPaste == true)
			{
				$('#SettingsAutoCorrectPaste .toggle-outside').addClass('left');
				$('#SettingsAutoCorrectPaste .toggle-outside').removeClass('right');
				elt2.childNodes[1].firstChild.checked = true;
				elt2.childNodes[3].firstChild.checked = false;
			}
			else
			{
				$('#SettingsAutoCorrectPaste .toggle-outside').addClass('right');
				$('#SettingsAutoCorrectPaste .toggle-outside').removeClass('left');
				elt2.childNodes[1].firstChild.checked = false;
				elt2.childNodes[3].firstChild.checked = true;
			}
		}
				
		// Font Size
		var eltFontSize = document.getElementById("SettingsFontSize");
		var valueFontSize = TextEditor.FontSize;
		if(defaultValue) valueFontSize = "17";
		eltFontSize.value = valueFontSize
		eltFontSize.nextSibling.innerHTML = valueFontSize;
		
		// Style
		tabSt = Style.OptionsStyleSt.split("|");
		
		var elt0 = document.getElementById("OptionsStyleRepMin");
		var valueRepMin = this.GetValueOfOption("RepMin", tabSt);
		if(defaultValue) valueRepMin = "3";
		elt0.value = valueRepMin;
		elt0.nextSibling.innerHTML = valueRepMin;
		
		var elt1 = document.getElementById("OptionStyleEcartRep");
		var valueGapRep = this.GetValueOfOption("GapRep", tabSt);
		if(defaultValue) valueGapRep = "3";
		this.SetValueToSelect(elt1, valueGapRep);
		
		var elt2 = document.getElementById("OptionsStyleAllWords");
		var valueAllWords = this.GetValueOfOption("AllWords", tabSt);
		if(defaultValue) valueAllWords = "0";
		this.SetValueToSelect(elt2, valueAllWords);
		
		if(Cor.IdLangue == "fr")
		{
			var elt3 = document.getElementById("OptionsStyleFamilyWords");
			var valueFamilyWords = this.GetValueOfOption("FamilyWords", tabSt);
			if(defaultValue) valueFamilyWords = "0";
			this.SetValueToSelect(elt3, valueFamilyWords);
		}
		
		// Others
		var elt0 = document.getElementById("OptionsOtherMinPhLg");
		var valueMinPhLg = this.GetValueOfOption("MinPhLg", tabSt);
		if(defaultValue) valueMinPhLg = "30";
		elt0.value = valueMinPhLg;
		elt0.nextSibling.innerHTML = valueMinPhLg;
		
		var elt1 = document.getElementById("OptionsOtherMinPhCt");
		var valueMinPhCt = this.GetValueOfOption("MinPhCt", tabSt);
		if(defaultValue) valueMinPhCt = "5";
		elt1.value = valueMinPhCt;
		elt1.nextSibling.innerHTML = valueMinPhCt;
		
		var elt2 = document.getElementById("OptionsOtherTTR");
		var valueTtr = this.GetValueOfOption("Ttr", tabSt);
		if(defaultValue)
		{
			if(Cor.IdLangue == "fr") valueTtr = "250";
			else if(Cor.IdLangue == "en") valueTtr = "300";
		}
		this.SetValueToSelect(elt2, valueTtr);
		
		var elt3 = document.getElementById("OptionsOtherTTS");
		var valueTts = this.GetValueOfOption("Tts", tabSt);
		if(defaultValue)
		{
			if(Cor.IdLangue == "fr") valueTts = "150";
			else if(Cor.IdLangue == "en") valueTtr = "130";
		}
		this.SetValueToSelect(elt3, valueTts);
		
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
			if(selectOption.value == value)
			{
				selectElt.selectedIndex = i;
				
				// Update the text.
				var nextS = selectElt.nextSibling;
				if(nextS != null) nextS.innerText = selectOption.text;
				
				return;
			}
		}
	}

	var th = this;

	// Create the main popup
	this.PopupBase = new Util.PopupBase(1);
	this.PopupBase.Node.style.zIndex = '200';
	
	this.MainDiv = document.createElement("div");
	if(Cor.IdLangue == 'fr')
	{
		this.MainDiv.style.width = "100%";
		this.MainDiv.style.height = "400px";
	}
	else if(Cor.IdLangue == 'en')
	{
		this.MainDiv.style.width = "100%";
		this.MainDiv.style.height = "295px";
	}

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
		this.FillValues(false);
	
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
			
		var optBdd_refOrth = "RefOrth:0";
		var optBdd_showUpSol = "ShowUPSol:1";
		var optBdd_USBR = "UsBr:-1";
		var optBdd_RepMin = "RepMin:3";
		var optBdd_GapRep = "GapRep:3";
		var optBdd_AllWords = "AllWords:0";
		var optBdd_FamilyWords = "FamilyWords:0";
		var optBdd_MinPhLg = "MinPhLg:30";
		var optBdd_MinPhCt = "MinPhCt:5";
		var optBdd_Ttr = "Ttr:250";
		var optBdd_Tts = "Tts:150";
		
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
				optBdd_refOrth = "RefOrth:1";
			}
			else
			{
				optionsCookiesSt += "RefOrth:0";
				Cor.OptionsCorSt += "RefOrth:0";
				optBdd_refOrth = "RefOrth:0";
			}
			
			// Show solutions of unknown proper nouns.
			var eltShowUPSol = document.getElementById("SettingsShowUPSol");
			
			if(eltShowUPSol.childNodes[1].firstChild.checked == true)
			{
				optionsCookiesSt += "|" + "ShowUPSol:1";
				Cor.OptionsCorSt += "|" + "ShowUPSol:1";
				optBdd_showUpSol = "ShowUPSol:1";
			}
			else
			{
				optionsCookiesSt += "|" + "ShowUPSol:0";
				Cor.OptionsCorSt += "|" + "ShowUPSol:0";
				optBdd_showUpSol = "ShowUPSol:0";
			}
			
			// AutoCorrect after pasting
			var elt2 = $("#SettingsAutoCorrectPaste .toggle-outside");
			
			if($(elt2).hasClass('left'))
			{
				optionsCookiesSt += "|" + "AutoCorrectPaste:1";
				Cor.AutoCorrect_AfterPaste = true;
			}
			else
			{
				optionsCookiesSt += "|" + "AutoCorrectPaste:0";
				Cor.AutoCorrect_AfterPaste = false;
			}
			
			// Font size
			var eltFontSize = document.getElementById("SettingsFontSize");
			optionsCookiesSt += "|" + "FontSize:" + eltFontSize.value;
			
			// Apply the new font size
			TextEditor.FontSize = eltFontSize.value;
			TextEditor.Document.body.style.fontSize = TextEditor.FontSize + "px";
			
			Util.SetCookie("OptionCor", optionsCookiesSt, 5000);
		}
		else if(Cor.IdLangue == "en")
		{
			// UsBr
			var eltUsBr = document.getElementById("SettingsUsBr");
			var optionsCookiesSt = "UsBr:" + eltUsBr.value;
			Cor.OptionsCorSt = "UsBr:" + eltUsBr.value;
			optBdd_USBR = "UsBr:" + eltUsBr.value;
			
			// Show solutions of unknown proper nouns.
			var eltShowUPSol = document.getElementById("SettingsShowUPSol");
			
			if(eltShowUPSol.childNodes[1].firstChild.checked == true)
			{
				optionsCookiesSt += "|" + "ShowUPSol:1";
				Cor.OptionsCorSt += "|" + "ShowUPSol:1";
				optBdd_showUpSol = "ShowUPSol:1";
			}
			else
			{
				optionsCookiesSt += "|" + "ShowUPSol:0";
				Cor.OptionsCorSt += "|" + "ShowUPSol:0";
				optBdd_showUpSol = "ShowUPSol:0";
			}
			
			// AutoCorrect after pasting
			var elt2 = document.getElementById("SettingsAutoCorrectPaste");
			
			if(elt2.childNodes[1].firstChild.checked == true)
			{
				optionsCookiesSt += "|" + "AutoCorrectPaste:1";
				Cor.AutoCorrect_AfterPaste = true;
			}
			else
			{
				optionsCookiesSt += "|" + "AutoCorrectPaste:0";
				Cor.AutoCorrect_AfterPaste = false;
			}
			
			// Font size
			var eltFontSize = document.getElementById("SettingsFontSize");
			optionsCookiesSt += "|" + "FontSize:" + eltFontSize.value;
			
			// Apply the new font size
			TextEditor.FontSize = eltFontSize.value;
			TextEditor.Document.body.style.fontSize = TextEditor.FontSize + "px";
			
			Util.SetCookie("OptionCor_En", optionsCookiesSt, 5000);
		}
		
		// Options Style
		var optionsStyle_Prec = Style.OptionsStyleSt;
		
		var optionsCookiesSt = "";
		Style.OptionsStyleSt = "";
			
		var elt0 = document.getElementById("OptionsStyleRepMin");
		optionsCookiesSt += "RepMin:" + elt0.value + "|";
		Style.OptionsStyleSt += "RepMin:" + elt0.value + "|";
		optBdd_RepMin = "RepMin:" + elt0.value;
		
		var elt1 = document.getElementById("OptionStyleEcartRep");
		optionsCookiesSt += "GapRep:" + elt1.value + "|";
		Style.OptionsStyleSt += "GapRep:" + elt1.value + "|";
		optBdd_GapRep = "GapRep:" + elt1.value;
		
		var elt2 = document.getElementById("OptionsStyleAllWords");
		optionsCookiesSt += "AllWords:" + elt2.value + "|";
		Style.OptionsStyleSt += "AllWords:" + elt2.value + "|";
		optBdd_AllWords = "AllWords:" + elt2.value;
		
		if(Cor.IdLangue == "fr")
		{
			var elt3 = document.getElementById("OptionsStyleFamilyWords");
			optionsCookiesSt += "FamilyWords:" + elt3.value;
			Style.OptionsStyleSt += "FamilyWords:" + elt3.value + "|";
			optBdd_FamilyWords = "FamilyWords:" + elt3.value;
		}
		else
		{
			optionsCookiesSt += "FamilyWords:" + "0";
			Style.OptionsStyleSt += "FamilyWords:" + "0" + "|";
			optBdd_FamilyWords = "FamilyWords:" + "0";
		}
		
		Util.SetCookie("OptionStyle", optionsCookiesSt, 5000);	
		
		// Others
		var optionsCookiesSt = "";
		
		var elt0 = document.getElementById("OptionsOtherMinPhLg");
		optionsCookiesSt += "MinPhLg:" + elt0.value + "|";
		Style.OptionsStyleSt += "MinPhLg:" + elt0.value + "|";
		var optBdd_MinPhLg = "MinPhLg:" + elt0.value;
		
		var elt1 = document.getElementById("OptionsOtherMinPhCt");
		optionsCookiesSt += "MinPhCt:" + elt1.value + "|";
		Style.OptionsStyleSt += "MinPhCt:" + elt1.value + "|";
		optBdd_MinPhCt = "MinPhCt:" + elt1.value;
		
		var elt2 = document.getElementById("OptionsOtherTTR");
		optionsCookiesSt += "Ttr:" + elt2.value + "|";
		Style.OptionsStyleSt += "Ttr:" + elt2.value + "|";
		optBdd_Ttr = "Ttr:" + elt2.value;
		
		var elt3 = document.getElementById("OptionsOtherTTS");
		optionsCookiesSt += "Tts:" + elt3.value;
		Style.OptionsStyleSt += "Tts:" + elt3.value;
		optBdd_Tts = "Tts:" + elt3.value;
		
		Util.SetCookie("OptionAutres", optionsCookiesSt, 5000);
		
		// If options changed, need to recheck all the text.
		if((optionsCor_Prec != Cor.OptionsCorSt) ||
		   (optionsStyle_Prec != Style.OptionsStyleSt))
		{
			Cor.FirstRequest = true;
		}
		
		// Save in BDD if different than previous
		var chBDD = optBdd_refOrth + "|" +
					optBdd_showUpSol + "|" +
					optBdd_USBR + "|" +
					optBdd_RepMin + "|" +
					optBdd_GapRep + "|" +
					optBdd_AllWords + "|" +
					optBdd_FamilyWords + "|" +
					optBdd_MinPhLg + "|" +
					optBdd_MinPhCt + "|" +
					optBdd_Ttr + "|" +
					optBdd_Tts;
		
		if((Cor.User.Settings == null) ||
		   (Cor.User.Settings != chBDD))
		{
			if(Cor.User.Identifiant != null && Cor.User.Identifiant.length > 0)
			{
				if(Cor.IdLangue == "fr")
				{
					Util.SendHttpRequest('Identification_Servlet',
									[['FunctionName', 'MajData'],
									 ['DataName', 'Settings'],
									 ['DataValue', chBDD],
									 ['TableName', 'abonnement_client'],
									 ['Id', Cor.User.Identifiant]],
									 null);
				}
			}
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
	
	// Français
	if(Cor.IdLangue == 'fr')
	{
		// Autres options
		var valueCookieSt = Util.GetCookie("OptionCor");
		if(valueCookieSt == null || valueCookieSt.length == 0) valueCookieSt = "AffExp:1|RefOrth:0|AutoCorrectPaste:0|ShowUPSol:1|FontSize:17";
	
		tabSt = valueCookieSt.split("|");
		
		for(var i = 0; i < tabSt.length; i++)
		{
			var fieldSt = tabSt[i];
			var tab = fieldSt.split(":");
			
			if(tab.length == 2)
			{
				var settingSt = tab[0];
				var settingValueSt = tab[1];
				
				// OptionsCor
				if(settingSt == "RefOrth" ||
				   settingSt == "ShowUPSol")
				{
					Cor.OptionsCorSt += '|' + fieldSt;
				}
				// Autocorrect when pasting
				else if(settingSt == "AutoCorrectPaste")
				{
					if(settingValueSt == '1') Cor.AutoCorrect_AfterPaste = true;
					else Cor.AutoCorrect_AfterPaste = false;
				}
				// Fontsize
				else if(settingSt == "FontSize")
				{
					TextEditor.FontSize = settingValueSt;
				}
			}
		}
	}
	// English
	else
	{
		// UsBr
		var valueCookieSt = Util.GetCookie("OptionCor_En");
		if(valueCookieSt == null || valueCookieSt.length == 0) valueCookieSt = "UsBr:-1|AutoCorrectPaste:0|ShowUPSol:1|FontSize:17";
		
		tabSt = valueCookieSt.split("|");
		
		for(var i = 0; i < tabSt.length; i++)
		{
			var fieldSt = tabSt[i];
			var tab = fieldSt.split(":");
			
			if(tab.length == 2)
			{
				var settingSt = tab[0];
				var settingValueSt = tab[1];
				
				// OptionsCor
				if(settingSt == "ShowUPSol" ||
				   settingSt == "UsBr")
				{
					Cor.OptionsCorSt += '|' + fieldSt;
				}
				// Autocorrect when pasting
				else if(settingSt == "AutoCorrectPaste")
				{
					if(settingValueSt == '1') Cor.AutoCorrect_AfterPaste = true;
					else Cor.AutoCorrect_AfterPaste = false;
				}
				// Fontsize
				else if(settingSt == "FontSize")
				{
					TextEditor.FontSize = settingValueSt;
				}
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

// Update settings BDD
UpdateSettingsBDD : function()
{
	// Load datas of BDD.
	var optBdd_refOrth = null;
	var optBdd_showUpSol = null;
	var optBdd_USBR = null;
	var optBdd_RepMin = null;
	var optBdd_GapRep = null;
	var optBdd_AllWords = null;
	var optBdd_FamilyWords = null;
	var optBdd_MinPhLg = null;
	var optBdd_MinPhCt = null;
	var optBdd_Ttr = null;
	var optBdd_Tts = null;
		
	var settings = Cor.User.Settings;
	if(settings != null && settings.length > 0)
	{
		var tabBDDSt = settings.split("|");
		
		for(var i = 0; i < tabBDDSt.length; i++)
		{
			var fieldSt = tabBDDSt[i];
			var tab = fieldSt.split(":");
			
			if(tab.length == 2)
			{
				var settingSt = tab[0];
				var settingValueSt = tab[1];
					
				if(settingSt == "RefOrth") optBdd_refOrth = fieldSt;
				else if(settingSt == "ShowUPSol") optBdd_showUpSol = fieldSt;
				else if(settingSt == "UsBr") optBdd_USBR = fieldSt;
				else if(settingSt == "RepMin") optBdd_RepMin = fieldSt;
				else if(settingSt == "GapRep") optBdd_GapRep = fieldSt;
				else if(settingSt == "AllWords") optBdd_AllWords = fieldSt;
				else if(settingSt == "FamilyWords") optBdd_FamilyWords = fieldSt;
				else if(settingSt == "MinPhLg") optBdd_MinPhLg = fieldSt;
				else if(settingSt == "MinPhCt") optBdd_MinPhCt = fieldSt;
				else if(settingSt == "Ttr") optBdd_Ttr = fieldSt;
				else if(settingSt == "Tts") optBdd_Tts = fieldSt;
			}
		}

		// OptionsCOr
		if(Cor.IdLangue == 'fr')
		{
			if(optBdd_showUpSol != null && optBdd_refOrth != null)
			{
				Cor.OptionsCorSt = "Genre_Je:0|Genre_Tu:0|Genre_Nous:0|Genre_Vous:0|Genre_On:0|" + optBdd_refOrth + "|" + optBdd_showUpSol;
			}
		}
		else if(Cor.IdLangue == 'en')
		{
			if(optBdd_showUpSol != null && optBdd_USBR != null)
			{
				Cor.OptionsCorSt = optBdd_showUpSol + "|" + optBdd_USBR;
			}
		}
		
		// Options style
		if(optBdd_RepMin != null && optBdd_GapRep != null && optBdd_AllWords != null && optBdd_FamilyWords != null && optBdd_MinPhLg != null && optBdd_MinPhCt != null && optBdd_Ttr != null && optBdd_Tts != null)
		{
			Style.OptionsStyleSt = optBdd_RepMin + "|" + optBdd_GapRep + "|" + optBdd_AllWords + "|" + optBdd_FamilyWords + "|" + optBdd_MinPhLg + "|" + optBdd_MinPhCt + "|" + optBdd_Ttr + "|" + optBdd_Tts;
		}
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
		//if(refPar != null) iframe.src += "#" + refPar;	// Problem: the enubar hides the titla chapter.
		divRule.appendChild(iframe);
		
		divRules.appendChild(divRule);
				
		// Once the iframe is loaded, defined iframe height.
		// iframe.onload = function()
		// {
		// 	$(iframe).css('height', iframe.contentDocument.body.scrollHeight);
		// }
	
		// Once the iframe is loaded, scroll to the matching anchor.
		if(refPar != null)
		{
			iframe.onload = function()
			{
				var doc = iframe.contentDocument;		// null in test mode. Not null in online mode.

				var topY = 0;

				var els = doc.getElementsByTagName("a");
				for (var i = 0, l = els.length; i < l; i++)
				{
					var el = els[i];
					if (el.name == refPar)
					{
						topY = el.offsetTop - 10;
						
						var a = 1;
						
						//var yy = el.offsetTop + 130;
						
						//window.scrollTo(0, yy);
						//window.scrollTo(0, 300);
						//return;
					}
				}
				
				window.scrollTo(0, topY);
			}
		}
	},
	
	// If a rule must be shown with a url parameter
	Show_SpecificRule_OnStart : function(ref_rule, panelRules)
	{
		// Rule can contaisn reference to the paragraph. Ex : Others/Punctuation_f.html#4
		var fileName = ref_rule;
		var refPar = '1';	// 1 by default
		
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
	
	// mainDiv.style.width = "736px";
	
	// Hide the div style
	var divStyle = document.getElementById("StyleTexte");
	divStyle.style.visibility = "hidden";
	
	// Hide the div syn stat panel
	document.getElementById("InfSup").style.display = "none";
	
	var pub3 = document.getElementById("pub3");
	if(pub3 != null) pub3.style.display = "none";
	
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
	
	// Hide the div style
	var divStyle = document.getElementById("StyleTexte");
	divStyle.style.visibility = "hidden";
	
	// Hide the div syn stat panel
	document.getElementById("InfSup").style.display = "none";
	
	var pub3 = document.getElementById("pub3");
	if(pub3 != null) pub3.style.display = "none";
	
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
		
	// Hide the div style
	var divStyle = document.getElementById("StyleTexte");
	divStyle.style.visibility = "hidden";
	
	// Hide the div syn stat panel
	document.getElementById("InfSup").style.display = "none";
	
	var pub3 = document.getElementById("pub3");
	if(pub3 != null) pub3.style.display = "none";
	
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
	
	document.getElementById('MainDiv').appendChild(this.Node);
}

};


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
	
	// Popup de paiment
	PopupPaymentI : null,
	
	// Support popup
	PopupSupportI : null,
	
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
	
	// Stripe instance
	Stripe : null,
	
	// Card
	Card : null,

	// Paiement informations: Client secret frome payment intent
	ClientSecret_PaymentIntent : null,
	
	// Paiement informations: Client secret frome setup intent
	ClientSecret_SetupIntent : null,
	
	// Subscription type of paiement
	SubscriptionType : "",

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
			Cor.User.Settings = vectResult[16];
			Cor.User.RecurringPayment = JSON.parse(vectResult[17]);
			Cor.User.PaymentByCard = JSON.parse(vectResult[18]);
			Cor.User.PaymentBySmartphone = JSON.parse(vectResult[19]);
			
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
				
				var popupMsgExpiration = new Util.MessageWindowConfirmation("Votre abonnement Premium est expir" + String.fromCharCode(233) + ".", 0, "Avertissement");
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
			
			// Met à jour les informations sur l'User
			//Premium.UpdateInformationsCompte();
			
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
				Cor.Handler_VersionPremium(false, "");
			}
			
			// Confirmation d'inscription
			if(Cor.ParameterUrl != null && (Cor.ParameterUrl.indexOf("@") >= 0)) Premium.ConfirmationInscription();

			// Update settings BDD
			Options.UpdateSettingsBDD();

			//change number of tabs option when login
			$('.Cor-TabOptions').removeClass('tabs-number-1').addClass('tabs-number-3');

			//show tabs Options_Slider on login
			$('#Options_Slider').show();

			//Show sidebar when login
			$('.sidebar').show();
			
			// Met à jour les informations sur l'User
			Premium.UpdateInformationsCompte();
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
				var messageWndConf = new Util.MessageWindowConfirmation("<p>Scribens est en cours d'utilisation par un autre utilisateur.</p>", 0, "Avertissement");
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
		
		// Hide example
		var divSample = document.getElementById("SampleText");
		if(divSample != null) divSample.style.display = 'none';

		// Show Style panel
		var divStyle = document.getElementById("StyleTexte");
		
		if(Plugins.Type == null) divStyle.style.display = "block";		// For plugin, show only after first check.
	
		// Show Panel Stat and syn.
		document.getElementById("InfSup").style.display = "block";
		
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
		
		Cor.Handler_VersionPremium(false, "");
		
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
		confirmationInscription += "<p><b>Merci. Votre inscription a " + String.fromCharCode(233) + "t" + String.fromCharCode(233) + " valid" + String.fromCharCode(233) + "e</b> !<Br><Br>";
		confirmationInscription += "Pour activer votre <b>abonnement Premium</b>, vous devez maintenant proc" + String.fromCharCode(233) + "der au <b>paiement</b> :<Br><Br>";
		confirmationInscription += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + String.fromCharCode(8226) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V" + String.fromCharCode(233) + "rifiez que l'abonnement s" + String.fromCharCode(233) + "lectionn" + String.fromCharCode(233) + " est bien celui que vous souhaitez.<Br>"; 
		confirmationInscription += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + String.fromCharCode(8226) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cochez la case des <b>CGV</b> si les conditions de vente vous conviennent.<Br>";
		confirmationInscription += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + String.fromCharCode(8226) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Choisissez le <b>mode de paiement</b>.<Br><Br>";
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
		divButtonOuvrirCompte.id = "BtnOuvrirCompte";
		divButtonOuvrirCompte.innerHTML = "Ouvrir un compte";
		//divButtonOuvrirCompte.style.
		divButtonOuvrirCompte.style.width = "280px";
		divButtonOuvrirCompte.style.textAlign = "center";
		divButtonOuvrirCompte.style.marginLeft = "75px";
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
			
			// Reinit fields.
			
			// Connexion
			document.getElementById("inputIdC").value = "";
			document.getElementById("inputMdpC").value = "";
			document.getElementById("LabelErrorId2").style.display = "none";
			
			// Subscription
			document.getElementById("inputNoO").value = "";
			document.getElementById("inputNoO").disabled = false;
			document.getElementById("inputIdO").value = "";
			document.getElementById("inputIdO").disabled = false;
			document.getElementById("inputPwdO").value = "";
			document.getElementById("inputPwdO").disabled = false;
			document.getElementById("BtnOuvrirCompte").innerHTML = "Ouvrir un compte";
			document.getElementById("Suscribe_MessageWarning").style.display = 'none';
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
		
		// Données non valide. Avertissement à l'utilisateur
		if(condUsername == false ||
		   condEmail == false ||
		   condPassword == false)
		{
			var divMessageWarning = document.getElementById("Suscribe_MessageWarning");
			document.getElementById('register_rule').style.display = 'none';
			divMessageWarning.style.display = 'block';
			divMessageWarning.innerHTML = "<p><b>Donn" + String.fromCharCode(233) + "es invalides ou manquantes</b>.</p><p><b>Remarque : </b>les champs ne doivent pas comporter</p><p>les caract" + String.fromCharCode(232) + "res \" <b>'</b> \", \"<b>|</b>\" et \"<b>,</b>\" .</p>";
		}
		// Données valides : Vérification si l'identifiant (email) existe d�j�.
		else
		{
			if(Premium.Subscribed == false)
			{
				Util.SendHttpRequest('Identification_Servlet',
								[['FunctionName', 'IdentifiantExiste'],
								 ['Email', email]], function(response){
									 
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
						var message = "<p><b>Merci. Votre compte a " + String.fromCharCode(233) + "t" + String.fromCharCode(233) + " cr" + String.fromCharCode(233) + String.fromCharCode(233) + ".</b></p><p><b>Un message vient de vous " + String.fromCharCode(234) + "tre envoy" + String.fromCharCode(233) + " pour vous permettre de valider votre inscription.</b></p><p><b>N'oubliez pas de vérifier dans votre boîte spam</b>.</p>";
						divMessageWarning.style.display = 'block';
						divMessageWarning.innerHTML = message;
						
						// Change the button "Ouvrir un compte"
						var divButtonOuvrirCompte = document.getElementById("BtnOuvrirCompte");
						divButtonOuvrirCompte.innerHTML = "Réenvoyer le message";
						
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
			// If yet sent, then resend the message
			else
			{
				// User Name
				userName = userName.replace(new RegExp(",", "g"), "");
				userName = userName.replace(new RegExp("'", "g"), "");
						
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
										  "<p>- 90 % des zones de texte sur Internet : <b>Facebook</b>, <b>Twitter</b>, <b>LinkedIn</b>, <b>LeBonCoin.fr</b>, <b>sites de blogs</b>, <b>forums</b>, <b>formulaires</b>, etc.</p>", false, true);
			table.appendChild(tr6);
			
			// Line 7
			var tr7 = this.CreateLineVPremium("<p><b>Application Android</b> pour <b>smartphones</b>.</p>" +
										      "<p>Corrigez directement vos textes depuis votre <b>clavier</b> Android. <a href='https://play.google.com/store/apps/details?id=com.bleu122.scribens&gl=FR' target='_blank'>Cliquez ici</a> pour en savoir plus.</p>", false, false);
			table.appendChild(tr7);
			
			// Line 8
			var tr8 = this.CreateLineVPremium("<p>D" + String.fromCharCode(233) + "tections de probl" + String.fromCharCode(232) + "mes dans la r" + String.fromCharCode(233) + "daction :</p>" +
									      "<p><b>R" + String.fromCharCode(233) + "p" + String.fromCharCode(233) + "titions</b>, <b>phrases longues</b>, <b>pl" + String.fromCharCode(233) + "onasmes</b>, <b>mots de registres particuliers</b> (populaire, vulgaire, etc.)</p>", false, true);
			table.appendChild(tr8);
			
			// Line 9
			var tr9 = this.CreateLineVPremium("<p>Propositions d'am" + String.fromCharCode(233) + "lioration de la r" + String.fromCharCode(233) + "daction :</p>" + 
										  "<p><b>15 types de reformulation</b>, <b>am" + String.fromCharCode(233) + "lioration de vocabulaire</b>.</p>", false, false);
			table.appendChild(tr9);
			
			// Line 10
			var tr10 = this.CreateLineVPremium("<p>Fonction pour rendre un texte <b>positif</b> ou <b>n" + String.fromCharCode(233) + "gatif</b>.</p>", false, true);
			table.appendChild(tr10);
			
			// Line 11
			var tr11 = this.CreateLineVPremium("Statistiques sur le texte : <b>nombre de mots, de phrases, de paragraphes, indice de lisibilit" + String.fromCharCode(233) + ", etc.</b>", false, false);
			table.appendChild(tr11);
			
			// Line 12
			var tr12 = this.CreateLineVPremium("Fonctions <b>copier</b>, <b>coller</b>, <b>t" + String.fromCharCode(233) + "l" + String.fromCharCode(233) + "charger</b>, <b>imprimer</b> et <b>partager</b> le texte.", false, true);
			table.appendChild(tr12);
			
			// Line 13
			var tr13 = this.CreateLineVPremium("<b>150</b> s" + String.fromCharCode(233) + "ries d'exercices d'orthographe, un dictionnaire des citations tr" + String.fromCharCode(232) + "s complet", false, false);
			table.appendChild(tr13);
			
			// Line 14
			var tr14 = this.CreateLineVPremium("Aucune publicit" + String.fromCharCode(233), false, true);
			table.appendChild(tr14);
			
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
				table.childNodes[2].childNodes[0].href = "https://addons.mozilla.org/fr/firefox/addon/scribens-correcteur";
				th.InstructionInst1 = Premium.Exp_Setup_MozillaFirefox;
				
				if(Cor.IsMozillaF == true) this.LabelActualBrowser.innerHTML = "<p>Le navigateur que vous utilisez actuellement est Mozilla Firefox.</p>";
				else this.LabelActualBrowser.innerHTML = "";
			}
			else if(index == 2)
			{
				table.childNodes[1].childNodes[0].src = "images/Plugins_logo/logo_Safari2.png";
				table.childNodes[2].childNodes[0].href = "https://www.scribens.com/download/Scribens.safariextz";
				th.InstructionInst1 = Premium.Exp_Setup_Safari;
				
				//if(Cor.IsSafari == true) this.LabelActualBrowser.innerHTML = "<p>Le navigateur que vous utilisez actuellement est Safari.</p>";
				//else this.LabelActualBrowser.innerHTML = "";
				
				// Doesn't work for the moment.
				this.LabelActualBrowser.innerHTML = "";
			}
			else if(index == 3)
			{
				table.childNodes[1].childNodes[0].src = "images/Plugins_logo/logo_edge2.png";
				table.childNodes[2].childNodes[0].href = "https://microsoftedge.microsoft.com/addons/detail/aohjlchmgmmhlganagldeekegcofalai";
				th.InstructionInst1 = Premium.Exp_Setup_MSEdge;
				
				//if(Cor.IsSafari == true) this.LabelActualBrowser.innerHTML = "<p>Le navigateur que vous utilisez actuellement est Safari.</p>";
				//else this.LabelActualBrowser.innerHTML = "";
				this.LabelActualBrowser.innerHTML = "";
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
			var tableExtWeb = this.CreateTableExtension([["images/Conf_PluginGoogleChrome.png", "images/Conf_PluginMozillaFirefox.png"], ["images/Conf_PluginSafari.png", "images/Conf_PluginMSEdge.png"]]);
			
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
			var optionMSEdge = document.createElement("option");
			optionMSEdge.innerHTML = "Microsoft Edge";
			selectPlugins1.appendChild(optionMSEdge);
			
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
				var popup = new Util.MessageWindowConfirmation(th.InstructionInst1, 0, "Instructions d'installation");
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
			// Doesn't work for the moment.
			/*else if(Cor.IsSafari == true)
			{
				selectPlugins1.selectedIndex = 2;
				
				th.SelectPluginsWeb(2, tableTestExtTt1, th);
			}*/
			
			// Separator
			var divSep = document.createElement("div");
			divSep.style.marginTop = "20px";
			divSep.style.borderTop = "2px solid #f5f3f3";
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
							var popup = new Util.MessageWindowConfirmation(msgOtherEdge, 0, "Instructions d'installation");
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
							var popup = new Util.MessageWindowConfirmation(msgOtherEdge, 0, "Instructions d'installation");
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
				var popup = new Util.MessageWindowConfirmation(th.InstructionInst2, 0, "Instructions d'installation");
				popup.PopupBase.Node.childNodes[1].childNodes[0].childNodes[0].setAttribute("align", "left");
				popup.PopupBase.Node.childNodes[1].childNodes[0].childNodes[0].style.fontWeight = "normal";
				popup.SetVisible(true);
			}	
			tdLabelInstructionsInst2.appendChild(labelInstructionsInst2);
			tableTestExtTt2.appendChild(tdLabelInstructionsInst2);
			
			divTest2.appendChild(tableTestExtTt2);
			divExtPremiums.appendChild(divTest2);
			
			// Smartphone
			
			// Separator
			var divSep = document.createElement("div");
			divSep.style.marginTop = "20px";
			divSep.style.borderTop = "2px solid #f5f3f3";
			divExtPremiums.appendChild(divSep);
			
			// Label Title
			var label3 = document.createElement("div");
			label3.style.fontWeight = "bold";
			label3.style.fontSize = "18px";
			label3.style.paddingTop = "20px";
			label3.style.paddingBottom = "20px";
			label3.innerHTML = "Corrigez directement vos textes depuis le clavier Scribens pour Smarphone Android.";
			divExtPremiums.appendChild(label3);
			
			// Image
			
			// Table extension 1
			var tableDoc = this.CreateTableExtension([["images/Conf_Android.png", ""]]);
			
			divExtPremiums.appendChild(tableDoc);
			
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
			labelTest1.innerHTML = "Testez nos applications gratuitement !";
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
			var optionAndroid = document.createElement("option");
			optionAndroid.innerHTML = "Android";
			selectPlugins1.appendChild(optionAndroid);
			
			var th = this;
			selectPlugins1.onchange = function()
			{
				var index = this.selectedIndex;
				var table = this.parentNode.parentNode;
				
				if(index == 0)
				{
					table.childNodes[1].childNodes[0].src = "images/Plugins_logo/logo_Android2.png";
					th.InstructionInst2 = Premium.Exp_Setup_Android;
					
					var aDownloadGd = table.childNodes[2].childNodes[0];
					aDownloadGd.href = "https://play.google.com/store/apps/details?id=com.bleu122.scribens&gl=FR";
					aDownloadGd.onclick = null;
				}
			};
			
			tdSelectPlugins1.appendChild(selectPlugins1);
			
			tableTestExtTt1.appendChild(tdSelectPlugins1);
			
			// Logo
			var tdImgLogo1 = document.createElement("td");
			tdImgLogo1.style.borderRight = "2px solid #ffffff";
			var imgLogo1 = document.createElement("img");
			imgLogo1.src = "images/Plugins_logo/logo_Android2.png";
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
			aDownload1.href = "https://play.google.com/store/apps/details?id=com.bleu122.scribens&gl=FR";
			aDownload1.target = "_blank";
			aDownload1.style.marginLeft = "30px";
			aDownload1.style.marginRight = "30px";
			aDownload1.style.marginTop = "15px";
			aDownload1.style.marginBottom = "15px";
			
			tdDownload1.appendChild(aDownload1);
			
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
				var popup = new Util.MessageWindowConfirmation(Premium.Exp_Setup_Android, 0, "Instructions d'installation");
				popup.PopupBase.Node.childNodes[1].childNodes[0].childNodes[0].setAttribute("align", "left");
				popup.PopupBase.Node.childNodes[1].childNodes[0].childNodes[0].style.fontWeight = "normal";
				popup.SetVisible(true);
			}	
			
			tdLabelInstructionsInst.appendChild(labelInstructionsInst);
			tableTestExtTt1.appendChild(tdLabelInstructionsInst);
			
			divTest1.appendChild(tableTestExtTt1);
			divExtPremiums.appendChild(divTest1);
			
			// Others
			
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
			label0.innerHTML = "•  D" + String.fromCharCode(233) + "tection des mots <b>r" + String.fromCharCode(233) + "p" + String.fromCharCode(233) + "tés</b> et d'<b>expressions redondantes</b>. Exemple : <i>Se <b>réunir ensemble</b>.</i> -> <i>Se <b>réunir</b>.</i>";
			label0.style.marginTop = "5px";
			label0.style.marginBottom = "15px";
			divStylePremium.appendChild(label0);
			
			// Label 1
			var label1 = document.createElement("div");
			label1.innerHTML = "•  D" + String.fromCharCode(233) + "tection des <b>phrases longues</b> et des <b>phrases comportant un trop grand nombre de virgules</b>.";
			label1.style.marginTop = "5px";
			label1.style.marginBottom = "15px";
			divStylePremium.appendChild(label1);
			
			// Label 2
			var label2 = document.createElement("div");
			label2.innerHTML = "•  D" + String.fromCharCode(233) + "tection de <b>tournures de phrases erron" + String.fromCharCode(233) + "es</b> ou <b>in" + String.fromCharCode(233) + "l" + String.fromCharCode(233) + "gantes</b> (15 types) et <b>propositions de reformulations</b>. Exemple : <i>La <b>voiture qui est belle</b> est ici.</i> -> <i>La <b>belle voiture</b> est là.</i>";
			label2.style.marginTop = "5px";
			label2.style.marginBottom = "15px";
			divStylePremium.appendChild(label2);
			
			// Label 3
			var label3 = document.createElement("div");
			label3.innerHTML = "•  Fonction d'<b>amélioration de vocabulaire</b> : proposition de remplacement de <b>mots simples</b> par des <b>mots plus complexes</b>. Exemple : <i>Il <b>a</b> une voiture.</i> -> <i>Il <b>possède</b> une voiture.</i>";
			label3.style.marginTop = "5px";
			label3.style.marginBottom = "15px";
			divStylePremium.appendChild(label3);
			
			// Label 4
			var label4 = document.createElement("div");
			label4.innerHTML = "•  Fonction pour rendre un texte <b>positif</b> ou <b>négatif</b>. Exemple : <i>Une méthode.</i> -> <i>Une <b>excellente</b> méthode.</i> <i>Il marche.</i> -> <i>Il marche <b>lourdement</b>.</i>";
			label4.style.marginTop = "5px";
			label4.style.marginBottom = "15px";
			divStylePremium.appendChild(label4);
			
			// Label 5
			var label5 = document.createElement("div");
			label5.innerHTML = "•  D" + String.fromCharCode(233) + "tection des mots et expressions appartenant " + String.fromCharCode(224) + " des <b>registres particuliers</b> : <b>vulgaire</b>, <b>p" + String.fromCharCode(233) + "joratif</b>, <b>familier</b>, <b>anglicisme</b>, etc.";
			label5.style.marginTop = "5px";
			label5.style.marginBottom = "15px";
			divStylePremium.appendChild(label5);
			
			// Label 6
			var label6 = document.createElement("div");
			label6.innerHTML = "•  Propositions de <b>synonymes</b> de mots ou d'expressions. Exemple : <i>Il lit <b>beaucoup</b>.</i> -> <i>Il lit <b>souvent</b>.</i>";
			label6.style.marginTop = "5px";
			label6.style.marginBottom = "50px";
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
			label0.innerHTML = "•  Statistiques complètes sur le texte : nombre de <b>paragraphes</b>, de <b>phrases</b>, <b>lisibilit" + String.fromCharCode(233) + "</b>, <b>temps de lecture</b>, etc.";
			label0.style.marginTop = "5px";
			label0.style.marginBottom = "10px";
			divDiversPremium.appendChild(label0);
			
			// Label 1
			var label1 = document.createElement("div");
			label1.innerHTML = "•  <b>150</b> s" + String.fromCharCode(233) + "ries d'<b>exercices</b> d'orthographe.";
			label1.style.marginTop = "5px";
			label1.style.marginBottom = "10px";
			divDiversPremium.appendChild(label1);
			
			// Label 2
			var label2 = document.createElement("div");
			label2.innerHTML = "•  Un dictionnaire des <b>citations</b> tr" + String.fromCharCode(232) + "s complet.";
			label2.style.marginTop = "5px";
			label2.style.marginBottom = "10px";
			divDiversPremium.appendChild(label2);
			
			// Label 3
			var label3 = document.createElement("div");
			label3.innerHTML = "•  R" + String.fromCharCode(233) + "glages des <b>param" + String.fromCharCode(232) + "tres</b> de la d" + String.fromCharCode(233) + "tection.";
			label3.style.marginTop = "5px";
			label3.style.marginBottom = "40px";
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
			else Cor.Handler_VersionPremium(false, "P1M");
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
			else Cor.Handler_VersionPremium(false, "P3M");
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
			else Cor.Handler_VersionPremium(false, "P1A");
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
		if(label_UserName != null)
		{
			label_UserName.innerHTML = Cor.User.UserName;
		}
		
		// Email
		var label_Email = document.getElementById("Info_Email");
		if(label_Email != null)
		{
			label_Email.innerHTML = Cor.User.Identifiant;
		}
		
		// Password
		var label_Password = document.getElementById("Info_Password");
		if(label_Password != null)
		{
			var password = Cor.User.MotDePasse;
			var passwordEt = "";
			for(var i = 0; i < password.length; i++) passwordEt += "*";
			label_Password.innerHTML = passwordEt;
		}
		
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
		
		// RecurringPayment
		var div_RecurringPayment = document.getElementById("Info_RecurringPayment");
		var label_ProcPrelevement = document.getElementById("Info_ProcPrelevement");
		if(div_RecurringPayment != null && label_ProcPrelevement != null)
		{
			var span_RecurringPayment = div_RecurringPayment.childNodes[0].childNodes[0].childNodes[3];
			
			if(Cor.ModeAbonnePremium && Cor.User.PaymentByCard)
			{
				if(Cor.User.RecurringPayment == true)
				{
					span_RecurringPayment.classList.remove('right');
					span_RecurringPayment.classList.add('left');
					
					// Set the net payment to the expiration date.
					var label_ExpirationDate = document.getElementById("Info_DateExpiration");
					if(label_ExpirationDate != null)
					{
						label_ProcPrelevement.innerHTML = label_ExpirationDate.innerHTML;
					}
				}
			}
			else
			{
				div_RecurringPayment.innerHTML = "-";
				label_ProcPrelevement.innerHTML = "-";
			}
		}
		
		// Automatic validation
		var divAccordAut = document.getElementById("AccordAut");
		if(divAccordAut != null)
		{
			if((!Cor.ModeAbonnePremium) ||
			   (Cor.ModeAbonnePremium && !Cor.User.PaymentByCard))	// Paiement with Paypal
			{
				divAccordAut.style.display = "block";
			}
		}
		
		// If payment by android, disabld the payment.
		var divPaymentContAll = document.getElementById("DivPaymentContAll");
		var divLabelPaymentByAndroid = document.getElementById("DivLabelPaymentByAndroid");
		if(divPaymentContAll != null && divLabelPaymentByAndroid != null)
		{
			if(Cor.User.PaymentBySmartphone == true && Cor.ModeAbonnePremium == true)
			{
				divPaymentContAll.style.display = "none";
				divLabelPaymentByAndroid.style.display = "block";
			}
			else
			{
				divPaymentContAll.style.display = "block";
				divLabelPaymentByAndroid.style.display = "none";
			}
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
		tdLabelUserName.style.paddingBottom = "7px";
		tdLabelUserName.innerHTML = "Nom d'utilisateur :";
		trUserName.appendChild(tdLabelUserName);
		
		var tdUserName = document.createElement("td");
		tdUserName.id = "Info_UserName";
		tdUserName.className = "info-persos";
		tdUserName.style.fontWeight = "600";
		tdUserName.style.color = "#707070";
		tdUserName.style.paddingBottom = "7px";
		trUserName.appendChild(tdUserName);
		
		tablePersonalInfo.appendChild(trUserName);
		
		// E-mail (identifiant)
		var trEmail = document.createElement("tr");
		var tdLabelEmail = document.createElement("td");
		tdLabelEmail.className = "info-labels-persos";
		tdLabelEmail.style.paddingBottom = "7px";
		tdLabelEmail.innerHTML = "E-mail :";
		trEmail.appendChild(tdLabelEmail);
		
		var tdEmail = document.createElement("td");
		tdEmail.id = "Info_Email";
		tdEmail.className = "info-persos";
		tdEmail.style.fontWeight = "600";
		tdEmail.style.color = "#707070";
		tdEmail.style.paddingBottom = "7px";
		trEmail.appendChild(tdEmail);
		
		tablePersonalInfo.appendChild(trEmail);
		
		// Password
		var trPassword = document.createElement("tr");
		
		var tdLabelPassword = document.createElement("td");	
		tdLabelPassword.className = "info-labels-persos";
		tdLabelPassword.innerHTML = "Mot de passe :";
		trPassword.appendChild(tdLabelPassword);
		
		var tdPassword = document.createElement("td");
		tdPassword.id = "Info_Password";
		tdPassword.className = "info-persos";
		tdPassword.style.fontWeight = "600";
		tdPassword.style.color = "#707070";
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
		divContactSvcClient.innerHTML = "<span class='picto-mail'></span> Contacter le service client";
		divContactSvcClient.onclick = function()
		{
			if(Premium.PopupSupportI == null) Premium.PopupSupportI = new Premium.PopupSupport();
			
			Premium.PopupSupportI.SetVisible(true);
		}
		boutonsInfo.appendChild(divContactSvcClient);
	
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
		blockInfo.firstChild.style.width = "646px";
		
		// Table of personal info
		var tableInfoAbn = document.createElement("table");
		tableInfoAbn.style.marginTop= "40px";
		
		// Type abonnement
		var trTypeAbonnement = document.createElement("tr");
		var tdLabelTypeAbonnement = document.createElement("td");
		tdLabelTypeAbonnement.className = "info-labels-persos";
		tdLabelTypeAbonnement.style.paddingBottom = "7px";
		tdLabelTypeAbonnement.innerHTML = "Type d'abonnement :";
		trTypeAbonnement.appendChild(tdLabelTypeAbonnement);
		
		var tdTypeAbonnement = document.createElement("td");
		tdTypeAbonnement.id = "Info_TypeAbonneemnt";
		tdTypeAbonnement.className = "info-persos";
		tdTypeAbonnement.style.fontWeight = "600";
		tdTypeAbonnement.style.color = "#707070";
		tdTypeAbonnement.style.paddingBottom = "7px";
		trTypeAbonnement.appendChild(tdTypeAbonnement);
		
		tableInfoAbn.appendChild(trTypeAbonnement);
		
		// Date d'expiration
		var trDateExpiration = document.createElement("tr");
		var tdLabelDateExpiration = document.createElement("td");
		tdLabelDateExpiration.className = "info-labels-persos";
		tdLabelDateExpiration.style.paddingBottom = "7px";
		tdLabelDateExpiration.innerHTML = "Date d'expiration :";
		trDateExpiration.appendChild(tdLabelDateExpiration);
		
		var tdDateExpiration = document.createElement("td");
		tdDateExpiration.id = "Info_DateExpiration";
		tdDateExpiration.className = "info-persos";
		tdDateExpiration.style.fontWeight = "600";
		tdDateExpiration.style.color = "#707070";
		tdDateExpiration.style.paddingBottom = "7px";
		trDateExpiration.appendChild(tdDateExpiration);
		
		tableInfoAbn.appendChild(trDateExpiration);
		
		// Recurring payments
		var trRecurringPayments = document.createElement("tr");
		trRecurringPayments.style.verticalAlign = "top";
			
		var tdLabelRecurringPayments = document.createElement("td");
		tdLabelRecurringPayments.className = "info-labels-persos";
		tdLabelRecurringPayments.style.paddingBottom = "8px";
		tdLabelRecurringPayments.innerHTML = "Renouvellement automatique :";
		trRecurringPayments.appendChild(tdLabelRecurringPayments);
		
		// Radio button
		var tdRadioButton = document.createElement("td");
		tdRadioButton.className = "info-persos";
		tdRadioButton.style.fontWeight = "600";
		tdRadioButton.style.color = "#707070";
		tdRadioButton.id = "Info_RecurringPayment";
		//tdRadioButton.style.paddingTop = "15px";
		var tableRadioButton = document.createElement("table");
		
		var trRadioButton = document.createElement("tr");
		
		// Label Oui
		var tdLabelOui = document.createElement("td");
		tdLabelOui.innerHTML = "Oui";
		trRadioButton.appendChild(tdLabelOui);
		
		// Span
		/*var tdRb = document.createElement("td");
		tdRb.setAttribute("class", "toggle-outside");
		tdRb.className = "switch switch--horizontal";
		tdRb.style.height = "25px";
		tdRb.style.width = "50px";
		//tdRb.style.right = "230px";
		//tdRb.style.marginRight = "270px";
		var span4 = document.createElement("span");
		span4.setAttribute("class", "toggle-inside");
		span4.style.marginTop = "-1px";
		span4.style.height = "2rem";
		span4.style.width = "2rem";
		tdRb.appendChild(span4); 
		trRadioButton.appendChild(tdRb);
		
		// label Non
		var tdLabelNon = document.createElement("td");
		tdLabelNon.innerHTML = "Non";
		trRadioButton.appendChild(tdLabelNon);*/
		
		//trRadioButton.id = "SettingsCorRef"; // donne un ID
		trRadioButton.className = "switch switch--horizontal"; // donne une classe
		trRadioButton.style.height = "0rem";
		
		var td1 = document.createElement("td");
		td1.type = "rad<io";
		var input1 = document.createElement("input");
		// input1.setAttribute("value", "yes");
		input1.id = "I1-a";
		// input1.setAttribute("checked", "checked");
		input1.type = "radio";
		input1.setAttribute("name", "I1");
		//input1.style.marginLeft = "50px";
		td1.appendChild(input1);
		input1.onclick = function fun(e) {
			if (this.checked = true){
				// Set recurring payment to true.
				Premium.Set_RecurringPayment(true, $(this).parent().parent().find('.toggle-outside'));
			}
		}
		trRadioButton.appendChild(td1);
		
		var td2 = document.createElement("label");
		td2.setAttribute("for", "I1-a");
		td2.className = "Cor-LabelOption";
		td2.style.textAlign = "left";
		//td2.style.width = "0px";
		var labelYes = "Oui";
		td2.innerHTML = labelYes;
		trRadioButton.appendChild(td2);
		
		var span3 = document.createElement("span");
		span3.setAttribute("class", "toggle-outside right");
		span3.style.height = "25px";
		span3.style.width = "50px";
		span3.style.right = "280px";
		span3.style.marginTop = "1px";
		//span3.style.marginRight = "270px";
		span3.style.cursor = "pointer";
		span3.onclick = function fun() {
			if($(this).hasClass('left'))
			{
				// Set recurring payment to true.
				Premium.Set_RecurringPayment(false, $(this));
			}
			else
			{
				// Set recurring payment to true.
				Premium.Set_RecurringPayment(true, $(this));
			}		
		}
		
		
		var span4 = document.createElement("span");
		span4.setAttribute("class", "toggle-inside");
		span4.style.marginTop = "-1px";
		span4.style.height = "2rem";
		span4.style.width = "2rem";
		span3.appendChild(span4); 
		trRadioButton.appendChild(span3);
		
		var td3 = document.createElement("td");
		var input2 = document.createElement("input");
		input2.type = "radio";
		input2.setAttribute("name", "I1");
		//input2.style.marginRight = "20px";
		// input2.setAttribute("value", "no");
		input2.id = "I1-b";
		td3.appendChild(input2);
		input2.onclick = function fun() {
			if (this.checked = true){
				// Set recurring payment to true.
				Premium.Set_RecurringPayment(false, $(this).parent().parent().find('.toggle-outside'));
			}  
		}
		trRadioButton.appendChild(td3);
		
		
		var td4 = document.createElement("label");
		td4.setAttribute("for", "I1-b");
		td4.className = "Cor-LabelOption";
		td4.style.marginLeft = "0px";
		td4.style.paddingLeft = "8rem";
		var labelNo = "Non";
		td4.innerHTML = labelNo;
		trRadioButton.appendChild(td4);

		
		//$('#SettingsCorRef .toggle-outside').addClass('left');
		
		tableRadioButton.appendChild(trRadioButton);
		
		tdRadioButton.appendChild(tableRadioButton);
		trRecurringPayments.appendChild(tdRadioButton);
		
		/*var divRadioButton = document.createElement("div");
		divRadioButton.type = "radio";
		var inputRadioButton = document.createElement("input");
		// input1.setAttribute("value", "yes");
		inputRadioButton.id = "I1-a";
		// input1.setAttribute("checked", "checked");
		inputRadioButton.type = "radio";
		inputRadioButton.setAttribute("name", "I1");
		inputRadioButton.onclick = function fun(e) {
			if (this.checked = true){
				$(this).parent().parent().find('.toggle-outside').removeClass('right');
				$(this).parent().parent().find('.toggle-outside').addClass('left');
			}  
		}
		
		divRadioButton.appendChild(inputRadioButton);
		tdRecurringPayments.appendChild(divRadioButton);*/
		
		
		
		
		//trRecurringPayments.appendChild(tdRecurringPayments);
		
		tableInfoAbn.appendChild(trRecurringPayments);
		
		// Prochain prélèvement
		var trProchPrelevement = document.createElement("tr");
		var tdLabelrochPrelevement = document.createElement("td");
		tdLabelrochPrelevement.className = "info-labels-persos";
		tdLabelrochPrelevement.style.paddingBottom = "7px";
		tdLabelrochPrelevement.innerHTML = "Prochain prélèvement :";
		trProchPrelevement.appendChild(tdLabelrochPrelevement);
		
		var tdProchPrelevement = document.createElement("td");
		tdProchPrelevement.id = "Info_ProcPrelevement";
		tdProchPrelevement.className = "info-persos";
		tdProchPrelevement.style.fontWeight = "600";
		tdProchPrelevement.style.color = "#707070";
		tdProchPrelevement.style.paddingBottom = "7px";
		tdProchPrelevement.innerHTML = "-";
		trProchPrelevement.appendChild(tdProchPrelevement);
		
		tableInfoAbn.appendChild(trProchPrelevement);
		
		
		blockInfo.firstChild.appendChild(tableInfoAbn);
		
		// Renouvellement abonnement
		var labelRenouvAbonnement = document.createElement("div");
		labelRenouvAbonnement.className = "renouvel-abo grey-border-top";
		labelRenouvAbonnement.style.marginBottom = "20px";
		labelRenouvAbonnement.innerHTML = "JE VEUX RENOUVELER MON ABONNEMENT";	
		blockInfo.firstChild.appendChild(labelRenouvAbonnement);
		
		var divPaymentContAll = document.createElement("div");
		divPaymentContAll.id = "DivPaymentContAll";
		
		// Choix de l'abonnement.
		var tableChoiceAbonnement = document.createElement("div");
		tableChoiceAbonnement.id = "tableChoixAbn";
		
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
		
		divPaymentContAll.appendChild(tableChoiceAbonnement);

		// Accord renouvellement automatique
		var tableAccordAut = document.createElement("table");
		tableAccordAut.id = "AccordAut";
		tableAccordAut.className = "grey-border-top";
		tableAccordAut.style.marginTop = "15px";
		tableAccordAut.style.marginBottom = "22px";
		tableAccordAut.style.display = "none";
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
		tdLabelReceiveInfo.style.fontWeight = "600";
		tdLabelReceiveInfo.style.color = "#707070";
		tdLabelReceiveInfo.innerHTML = "Je souhaite renouveler automatiquement mon abonnement.";
		tableAccordAut.appendChild(tdLabelReceiveInfo);
		
		divPaymentContAll.appendChild(tableAccordAut);
		
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
		tdLabelReceiveInfo.style.fontWeight = "600";
		tdLabelReceiveInfo.style.color = "#707070";
		tdLabelReceiveInfo.innerHTML = "Vous devez accepter les <a href='https://www.scribens.fr/download/CGV_Scribens.txt' target=\"_blank\">conditions g" + String.fromCharCode(233) + "n" + String.fromCharCode(233) + "rales de vente</a> pour continuer.";
		tableAccordCondGen.appendChild(tdLabelReceiveInfo);
		
		divPaymentContAll.appendChild(tableAccordCondGen);
		
		// Boutons de paiment
		
		// Paiement par carte
		var divButtonCarte = document.createElement("div");
		divButtonCarte.setAttribute("align", "center");
		divButtonCarte.style.marginLeft = "115px";
		divButtonCarte.style.marginTop = "30px";
		divButtonCarte.style.marginBottom = "5px";
		divButtonCarte.style.width = "350px";
		divButtonCarte.style.cursor = "pointer";
		divButtonCarte.className = "Cor-RedButton2" ;
		divButtonCarte.onclick = function()
		{
			var cbCGV = document.getElementById("CbCGV");
			if(cbCGV.checked == false)
			{
				if(Premium.PopupCGV == null) Premium.PopupCGV = new Util.MessageWindowConfirmation("Vous devez accepter les conditions g" + String.fromCharCode(233) + "n" + String.fromCharCode(233) + "rales pour continuer.", 0, "Avertissement");
			
				Premium.PopupCGV.SetVisible(true);
			}
			else
			{
				if(Premium.PopupPaymentI == null) Premium.PopupPaymentI = new Premium.PopupPayment();
				
				document.getElementById("TablePaiement").style.display = "none";
				document.getElementById("WaitingPanel").style.display = "block";
				document.getElementById("LabelPaymentInShort").style.display = "none";
				document.getElementById("SuccessPayment").style.display = "none";
				document.getElementById("FailurePayment").style.display = "none";
				
				Premium.PopupPaymentI.SetVisible(true);
				
				// Subscription type
				Premium.SubscriptionType = "P1M";
				
				if(document.getElementById("Radio3Mois").checked == true) Premium.SubscriptionType = "P3M";
				else if(document.getElementById("Radio1An").checked == true) Premium.SubscriptionType = "P1A";
				
				//var checkBoxRenouvAut = document.getElementById("CbRenouvAut");
				//if(checkBoxRenouvAut != null && checkBoxRenouvAut.checked == true) Premium.SubscriptionType += "_RA";
				
				// Launch the request for getitng the client secret key.
				Util.SendHttpRequest('Payment_Servlet',
						[['FunctionName', 'Get_CS_PaymentAndSetupIntent'],
						 ['typeSubscription', Premium.SubscriptionType]],
						 Premium.Get_CS_PaymentAndSetupIntent);
			}
		};
		
		divButtonCarte.innerHTML = "<span class='picto-caddie'></span> Paiement par carte";
		//divButtonCarte.innerHTML = "<img src='images/paiement/paiement-securise-cartes.png' style=\"width:40%;height:40%;margin-right:5px\"> Paiement par carte";
		//divButtonCarte.innerHTML = "Paiement par carte<img src='images/paiement/paiement-securise-cartes.png' style=\"width:40%;height:40%;margin-left:10px\">";
		
		//divButtonCarte.innerHTML = "<img src='images/paiements.jpg'></img> Payer par carte";
		
		divPaymentContAll.appendChild(divButtonCarte);
		
		// Label "OU"
		var tableOu = document.createElement("table");
		
		var tdLine1 = document.createElement("td");
		var divLine1 = document.createElement("div");
		divLine1.style.borderTop = "1px solid #ddd";
		divLine1.style.width = "273px";
		divLine1.style.paddingTop = "5px";
		tdLine1.appendChild(divLine1);
		tableOu.appendChild(tdLine1);
		
		var td2 = document.createElement("td");
		var divLabelOu = document.createElement("div");
		divLabelOu.setAttribute("align", "center");
		divLabelOu.style.marginTop = "10px";
		divLabelOu.style.marginLeft = "10px";
		divLabelOu.style.marginRight = "10px";
		divLabelOu.innerHTML = "<b>OU</b>";
		td2.appendChild(divLabelOu);
		tableOu.appendChild(td2);
		
		var tdLine3 = document.createElement("td");
		var divLine3 = document.createElement("div");
		divLine3.style.borderTop = "1px solid #ddd";
		divLine3.style.width = "273px";
		divLine3.style.paddingTop = "5px";
		tdLine3.appendChild(divLine3);
		tableOu.appendChild(tdLine3);
		
		divPaymentContAll.appendChild(tableOu);
		
		// Button PayPal
		var divButtonPayPal = document.createElement("div");
		divButtonPayPal.setAttribute("align", "center");
		divButtonPayPal.id = "IdButtonPayPal";
		divButtonPayPal.style.marginLeft = "115px";
		divButtonPayPal.style.marginTop = "15px";
		divButtonPayPal.style.marginBottom = "10px";
		divButtonPayPal.style.width = "350px";
		divButtonPayPal.style.cursor = "pointer";
		divButtonPayPal.style.backgroundColor = "#f6f6f6";
		
		divButtonPayPal.style.borderRadius = "40px";
		
		//divButtonPayPal.id = "IdButtonPayPal";
		divButtonPayPal.className = "Cor-RedButton2" ;
		divButtonPayPal.onclick = function()
		{
			var cbCGV = document.getElementById("CbCGV");
			if(cbCGV.checked == false)
			{
				if(Premium.PopupCGV == null) Premium.PopupCGV = new Util.MessageWindowConfirmation("Vous devez accepter les conditions g" + String.fromCharCode(233) + "n" + String.fromCharCode(233) + "rales pour continuer.", 0, "Avertissement");
			
				Premium.PopupCGV.SetVisible(true);
			}
		};
		
		divButtonPayPal.innerHTML = "<img src='images/paiement/PayPal_Gray.png'></img>";
		
		divPaymentContAll.appendChild(divButtonPayPal);
		
		blockInfo.firstChild.appendChild(divPaymentContAll);
		
		// Label payment by android
		var divLabelPaymentByAndroid = document.createElement("div");
		divLabelPaymentByAndroid.id = "DivLabelPaymentByAndroid";
		divLabelPaymentByAndroid.style.display = "none";
		divLabelPaymentByAndroid.style.height = "166px";
		
		divLabelPaymentByAndroid.innerHTML = "<p>Vous avez souscrit à un abonnement sous <b>Android</b>.</p><p>Veuillez effectuer votre paiement à partir de la plateforme <b>Android</b>.</p>";
		
		blockInfo.firstChild.appendChild(divLabelPaymentByAndroid);

		
		return blockInfo;
	},
	
	// Set reucrring payment.
	Set_RecurringPayment : function(recurringPayment, spanToggle)
	{
		var valueBDD = "0";
		
		if(recurringPayment == true)
		{
			spanToggle.removeClass('right');
			spanToggle.addClass('left');
			
			// Set the label of next payment
			var label_ProcPrelevement = document.getElementById("Info_ProcPrelevement");
			if(label_ProcPrelevement != null)
			{
				var label_ExpirationDate = document.getElementById("Info_DateExpiration");
				if(label_ExpirationDate != null)
				{
					label_ProcPrelevement.innerHTML = label_ExpirationDate.innerHTML;
				}
			}
			
			valueBDD = "1";
		}
		else
		{
			spanToggle.removeClass('left');
			spanToggle.addClass('right');
			
			// Empty date
			var label_ProcPrelevement = document.getElementById("Info_ProcPrelevement");
			if(label_ProcPrelevement != null)
			{
				label_ProcPrelevement.innerHTML = "-";
			}
		}
		
		// Update in database "RecurringPayment"
		Util.SendHttpRequest('Identification_Servlet',
					[['FunctionName', 'MajData'],
					 ['DataName', 'RecurringPayment'],
					 ['DataValue', valueBDD],
					 ['TableName', 'abonnement_client'],
					 ['Id', Cor.User.Identifiant]],
					 null);
	},
	
	// Get CS of payment and setup intent
	Get_CS_PaymentAndSetupIntent : function(response)
	{
		var publishableKey = response[0];
		
		// ClientSecret for payment intent
		Premium.ClientSecret_PaymentIntent = response[1];
		
		// ClientSecret for setup intent
		Premium.ClientSecret_SetupIntent = response[2];
		
		document.getElementById("TablePaiement").style.display = "block";
		document.getElementById("WaitingPanel").style.display = "none";
		document.getElementById("SuccessPayment").style.display = "none";
		document.getElementById("FailurePayment").style.display = "none";
		
	    // Mount
	  
		Premium.Stripe = Stripe(publishableKey);
		
		var elts = Premium.Stripe.elements();
		
		// Card Element
		Premium.Card = elts.create("card", {
			iconStyle: "solid",
			style: {
				base: {
					iconColor: "#b5b5b5",
					fontWeight: 400,
					fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
					fontSize: "16px",
					fontSmoothing: "antialiased",
					
					"::placeholder": {
					  color: "#b5b5b5"
					},
					":-webkit-autofill": {
					  color: "#fce883"
					}
				},
				invalid: {
					iconColor: "#E25950",
					color: "#E25950",
					borderColor: "#E25950"
				}
			}
	    });
	    Premium.Card.mount("#payment5-card");
	},
		
	// Row of a plugin
	TrPlugins : function(utilisation, instructionInst, title, imgSrc, imgSrc_Supp, linkDownload)
	{
		var trPlugin = document.createElement("tr");
		
		// Utilisation
		var tdUtilisation = document.createElement("td");
		tdUtilisation.className = "td";
		tdUtilisation.innerHTML = utilisation;
		tdUtilisation.style.borderRight = "1px solid #d6d9df";
		
		if(title != "Mozilla Firefox" &&
		  !title.startsWith("Safari"))
		{
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
					var popup = new Util.MessageWindowConfirmation("Utilisez un navigateur autre que Microsoft Edge pour t" + String.fromCharCode(233) + "l" + String.fromCharCode(233) + "charger l'extension sous LibreOffice ou OpenOffice : Google Chrome, Mozilla Firefox, Safari, Internet Explorer, etc.", 0, "Avertissement");
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
					var popup = new Util.MessageWindowConfirmation("Utilisez un navigateur autre que Microsoft Edge pour t" + String.fromCharCode(233) + "l" + String.fromCharCode(233) + "charger l'extension sous LibreOffice ou OpenOffice : Google Chrome, Mozilla Firefox, Safari, Internet Explorer, etc.", 0, "Avertissement");
					popup.SetVisible(true); 
				}
				// Normal mode
				else
				{
					var popup = new Util.MessageWindowConfirmation(instructionInst, 0, "Instructions d'installation");
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
												   "<p>- Messagerie : Gmail, Hotmail, Outlook.com, Yahoo, Orange, etc.</p>",
													Premium.Exp_Setup_MozillaFirefox,
													"Mozilla Firefox",
													"images/Plugins_logo/logo_firefox2.png",
													"",
													"https://addons.mozilla.org/fr/firefox/addon/scribens-correcteur"));
		
		// 3. Safari
		tablePlugins.appendChild(Premium.TrPlugins("<p>- R" + String.fromCharCode(233) + "seaux sociaux : Facebook, Twitter, LinkedIn, Instagram, etc.</p>" +
												   "<p>- Sites avec zones de texte : LeBonCoin.fr, blogs, forums, formulaires, etc.</p>",
													Premium.Exp_Setup_Safari,
													"Safari (<b>Mac</b>)",
													"images/Plugins_logo/logo_Safari2.png",
													"",
													"https://www.scribens.com/download/Scribens.safariextz"));
													
		// 4. Microsoft Edge
		tablePlugins.appendChild(Premium.TrPlugins("",
													Premium.Exp_Setup_MSEdge,
													"Microsoft Edge",
													"images/Plugins_logo/logo_edge2.png",
													"",
													"https://microsoftedge.microsoft.com/addons/detail/aohjlchmgmmhlganagldeekegcofalai"));
												   
		// 5. Microsoft Office 2016 for Windows and Mac
		tablePlugins.appendChild(Premium.TrPlugins("<p>Correction de documents Word et de feuilles Excel sous Microsoft Word 2016 et Microsoft Excel 2016. Windows et Mac.</p>",
													Premium.Exp_Setup_WordExcel_2016,
													"Word 2016<br>Excel 2016<br><b>Windows</b> et <b>Mac</b>",
													"images/Plugins_logo/logo_WordOnline2.png",
													"images/Plugins_logo/logo_ExcelOnline2.png",
													"https://store.office.com/en-ca/app.aspx?assetid=WA104380587"));
		
		// 6. Microsoft Office
		tablePlugins.appendChild(Premium.TrPlugins("<p>Correction de documents Word, feuilles Excel, Pr" + String.fromCharCode(233) + "sentations PowerPoint, Emails sous Outlook.</p>",
													Premium.Exp_Setup_MicrosoftOffice,
													"Microsoft Office",
													"images/Plugins_logo/logo_MSOffice2.png",
													"",
													"https://www.scribens.com/download/Scribens_MicrosoftOffice.exe"));
		
		// 7. LibreOffice Writer
		tablePlugins.appendChild(Premium.TrPlugins("<p>Correction de documents sous LibreOffice Writer.</p>",
													Premium.Exp_Setup_LibreOffice,
													"LibreOffice Writer",
													"images/Plugins_logo/logo_LibreOffice2.png",
													"",
													"http://extensions.libreoffice.org/extensions/spell-checker-and-grammar-checker-by-scribens"));
		
		// 8. OpenOffice Writer
		tablePlugins.appendChild(Premium.TrPlugins("<p>Correction de documents sous OpenOffice Writer.</p>",
												   	Premium.Exp_Setup_OpenOffice,
												   	"OpenOffice Writer",
												   	"images/Plugins_logo/logo_OpenOffice2.png",
												   	"",
												   	"http://extensions.openoffice.org/fr/node/18542"));
												   
		// 9. Google Docs
		tablePlugins.appendChild(Premium.TrPlugins("<p>Correction de documents sous Google Docs.</p>",
												   	Premium.Exp_Setup_GoogleDocs,
												   	"Google Docs",
												   	"images/Plugins_logo/logo_GoogleDocs2.png",
												   	"",
												   	"https://chrome.google.com/webstore/detail/spell-checker-and-grammar/kpopjaeamijjhcgcodlbnoelgihljjkl"));
		
		// 10. Google Sheets
		tablePlugins.appendChild(Premium.TrPlugins("<p>Correction de feuilles sous Google Sheets.</p>",
												   	Premium.Exp_Setup_GoogleSheets,
												   	"Google Sheets",
												   	"images/Plugins_logo/logo_GoogleSheets2.png",
												   	"",
												   	"https://chrome.google.com/webstore/detail/spell-checker-and-grammar/jenfkmingepgdhdbcmdlgfnhogifjcgh"));
		
		// 11. Microsoft Word Online
		tablePlugins.appendChild(Premium.TrPlugins("<p>Correction de documents sous Microsoft Word Online et Microsoft Excel Online.</p>",
												   	Premium.Exp_Setup_WordExcelOnline,
												   	"Word Online<br>Excel Online",
												   	"images/Plugins_logo/logo_WordOnline2.png",
												   	"images/Plugins_logo/logo_ExcelOnline2.png",
												   	"https://store.office.com/en-ca/app.aspx?assetid=WA104380587"));
		
		// 12. Android
		tablePlugins.appendChild(Premium.TrPlugins("<p>Correction de textes sur Smartphones Android.</p>",
												   	Premium.Exp_Setup_Android,
												   	"Android",
												   	"images/Plugins_logo/logo_Android2.png",
												   	"",
												   	"https://play.google.com/store/apps/details?id=com.bleu122.scribens&gl=FR"));
		
		// 13. Mozilla Thunderbird
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
		btnRetourVPremium.onclick = function()
		{
			window.scrollTo(0, 0);
			Cor.Handler_VersionPremium(true, "");
		}
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
		//Premium.UpdateInformationsCompte();
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
	
		if(Premium.PopupDesinscriptionI == null) Premium.PopupDesinscriptionI = new Util.MessageWindowConfirmation(message, 2, "Avertissement");
		
		Premium.PopupDesinscriptionI.SetVisible(true);
	},
	
	// Mise � jour du bouton Paypal
	MajButtonPayPal : function()
	{
		if(document.getElementById("Radio1Mois") == null) return;
		
		var htmlButtonPayPal = "";
		
		// Mise � jour du bouton PayPal	
		var typeAbonnement = "";
		
		if(document.getElementById("Radio1Mois").checked == true) typeAbonnement = "P1M";
		else if(document.getElementById("Radio3Mois").checked == true) typeAbonnement = "P3M";
		else if(document.getElementById("Radio1An").checked == true) typeAbonnement = "P1A";
		
		// Renouvelement automatique
		var renouvAuto = false;
		var checkBoxRenouvAut = document.getElementById("CbRenouvAut");
		if(checkBoxRenouvAut != null && checkBoxRenouvAut.checked == true && Cor.ModeAbonnePremium == false)
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
		
		//buttonPayPal.style.paddingTop = "15px";
		//buttonPayPal.style.paddingBottom = "15px";
			
		// Activation ou d�sactivation
		if(cb_CGV.checked == true)
		{
			$('#IdButtonPayPal').removeClass('Cor-RedButton2');
			buttonPayPal.style.backgroundColor = "#f6f6f6";
			//buttonPayPal.style.paddingTop = "15px";
			//buttonPayPal.style.paddingBottom = "15px";
			
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
			//"<input id=\"btn-acheter-icon\" class=\"Cor-RedButton2\" type=\"image\" border=\"0\" name=\"submit\" alt=\"Acheter\" value=\"Acheter\">" +
			"<input type=\"image\" src=\"images/paiement/PayPal_Gray.png\" style=\"padding-left:134px;padding-right:134px;padding-top:20px;padding-bottom:14px;outline:none;\" border=\"0\" name=\"submit\">" +
			//"<img alt=\"\" border=\"0\" width=\"1\" height=\"1\">" +
			"</form>";
		}
		else
		{
			$('#IdButtonPayPal').addClass('Cor-RedButton2');
			// En mode disable
			htmlButtonPayPal = "<img src='images/paiement/PayPal_Gray.png'></img>";/* 		
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
		
		// Show example
		var divSample = document.getElementById("SampleText");
		if(divSample != null) divSample.style.display = 'inline-block';

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
			divStyle.style.display = "none";
			
			// Hide synonym and stat panel
			document.getElementById("InfSup").style.display = "none";
		}

		// Show ads
		document.getElementById("pub1").style.display = "block";
		$(".side-pub").css('display', 'block');
		if(Cor.IdLangue == "fr")
		{
			$("#pub2").css('display', 'block');
			$("#pub3").css('display', 'block');
		}
		
		// Show  title// Non affichage de la partie "Titre".
		var titreLabel = document.getElementById("TitreLabel");
		if(titreLabel) titreLabel.style.display = "block";

		//HIDE LEFT SIDEBAR ON LOGOUT
		$('.interface .sidebar').hide();
	},
	
	// Popup de support
	PopupSupport : function()
	{
		this.PopupBase = new Util.PopupBase(1);
		
		//this.PopupBase.Node.style.top = "10px";
		//this.PopupBase.Node.setAttribute("style", "top:10px");
		this.PopupBase.Node.childNodes[1].style.paddingTop = "10px";
		
		// Create title
		var title = document.createElement("div");
		title.className = "titre";
		title.style.paddingLeft = "20px";
		title.innerHTML = "SUPPORT";
		
		this.PopupBase.Node.appendChild(title);
		
		var divMain = document.createElement("div");
		divMain.style.borderRadius = "12px";
		//divMain.style.width = "400px";
		
		// Text area
		var textArea = document.createElement("textArea");
		textArea.id = "TextSupportMessage";
		textArea.style.width = "460px";
		textArea.style.height = "300px";
		textArea.style.marginLeft = "20px";
		textArea.style.marginRight = "20px";
		textArea.style.marginTop = "45px";
		textArea.style.marginBottom = "15px";
		textArea.style.padding = "10px";
		textArea.style.resize = "none";
		//textArea.style.display = "none";
		//textArea.style.textAlign = "center";
		textArea.placeholder = "Un problème technique ? Une question sur le fonctionnement de notre site ? Tapez ici votre question. Nous traiterons votre demande au plus vite.";
		textArea.setAttribute("editable", "true");
		
		divMain.appendChild(textArea);
		
		// Buttons
		var tableButtons = document.createElement("table");
		tableButtons.id = "TableButtons";
		tableButtons.style.backgroundColor = "#f6f6f6";
		//tableButtons.style.display = "none";
		
		var trButtons = document.createElement("tr");
		
		// Send button
		var tdButtonSend = document.createElement("td");
		
		var buttonSend = document.createElement('div');
		buttonSend.className = "Cor-RedButton";
		buttonSend.style.textAlign = "center";
		buttonSend.style.width = "200px";
		buttonSend.style.margin = "20px";
		buttonSend.style.marginLeft = "30px";
		buttonSend.innerHTML = "Envoyer";
		buttonSend.onclick = function()
		{
			var eltTextArea = document.getElementById("TextSupportMessage");
			var eltErrorMissingText = document.getElementById("Error_MissingText");
			
			// Empty text -> Error message
			if(eltTextArea.value.length == 0)
			{
				eltErrorMissingText.style.display = "block";
			}
			else
			{
				// Hide and show elements for sending
				eltErrorMissingText.style.display = "none";
				
				eltTextArea.style.display = "none";
				var eltButtons = document.getElementById("TableButtons");
				eltButtons.style.display = "none";
				
				document.getElementById("TextMessageSent").style.display = "block";
				document.getElementById("DivButtonOKContainer").style.display = "block";
				
				var messageSt = eltTextArea.value;
				messageSt = messageSt.replace(/\r?\n/g, '<br>');
				messageSt = "<p>" +  messageSt + "</p>";
				
				// Send the message
				Util.SendHttpRequest('Identification_Servlet',
						[['FunctionName', 'SendSupportEmail'],
						 ['Id', Cor.User.Identifiant],
						 ['Name', Cor.User.UserName],
						 ['Message', messageSt]],
						 null);
				
			}
		}
		tdButtonSend.appendChild(buttonSend);
		
		trButtons.appendChild(tdButtonSend);
		
		// Cancel button
		var tdButtonCancel = document.createElement("td");
		
		var buttonCancel = document.createElement('div');
		buttonCancel.className = "Cor-RedButton cancel";
		buttonCancel.style.textAlign = "center";
		buttonCancel.style.width = "200px";
		buttonCancel.style.margin = "20px";
		buttonCancel.style.marginRight = "30px";
		//buttonCancel.style.marginTop = "120px";
		buttonCancel.innerHTML = "Annuler";
		
		var popupBase = this.PopupBase;
		buttonCancel.onclick = function()
		{
			popupBase.SetVisible(false);
		};
		
		tdButtonCancel.appendChild(buttonCancel);
		
		trButtons.appendChild(tdButtonCancel);
		
		
		tableButtons.appendChild(trButtons);
		divMain.appendChild(tableButtons);
		
		// Message empty text
		var divTextNoMessage = document.createElement("div");
		divTextNoMessage.id = "Error_MissingText";
		divTextNoMessage.style.display = "none";
		divTextNoMessage.style.backgroundColor = "#f6f6f6";
		//divTextNoMessage.style.align = "center";
		divTextNoMessage.style.paddingLeft = "190px";
		//divTextNoMessage.style.marginTop = "10px";
		divTextNoMessage.style.paddingBottom = "30px";
		divTextNoMessage.innerHTML = "Texte manquant";
		
		divMain.appendChild(divTextNoMessage);
		
		// Message "message envoyé"
		var divTextMessageSent = document.createElement("div");
		divTextMessageSent.id = "TextMessageSent";
		divTextMessageSent.style.display = "none";
		divTextMessageSent.style.width = "498px";
		divTextMessageSent.style.backgroundColor = "#f6f6f6";
		divTextMessageSent.style.align = "center";
		//divTextMessageSent.style.paddingLeft = "200px";
		divTextMessageSent.style.paddingTop = "80px";
		divTextMessageSent.style.paddingBottom = "30px";
		divTextMessageSent.style.textAlign = "center";
		divTextMessageSent.innerHTML = "<p>Merci pour votre message.</p><p></p><p>Nous allons traiter votre demande au plus vite.</p>";
		divMain.appendChild(divTextMessageSent);
		
		// Button "OK"
		var DivButtonOKContainer = document.createElement("div");
		DivButtonOKContainer.id = "DivButtonOKContainer";
		DivButtonOKContainer.style.display = "none";
		DivButtonOKContainer.style.backgroundColor = "#f6f6f6";
		DivButtonOKContainer.style.textAlign = "center";
		DivButtonOKContainer.style.paddingTop = "20px";
		DivButtonOKContainer.style.paddingBottom = "20px";
		
		var divButtonOK = document.createElement("div");
		divButtonOK.className = "Cor-RedButton";
		divButtonOK.style.width = "200px";
		//divButtonOK.style.margin = "20px";
		divButtonOK.style.marginLeft = "150px";
		divButtonOK.innerHTML = "OK";
		divButtonOK.onclick = function()
		{
			popupBase.SetVisible(false);
		};
		
		DivButtonOKContainer.appendChild(divButtonOK);
		divMain.appendChild(DivButtonOKContainer);
		
		this.PopupBase.Node.appendChild(divMain);
		
		// Set visible
		this.SetVisible = function(visible)
		{
			document.getElementById("TextSupportMessage").style.display = "block";
			document.getElementById("TableButtons").style.display = "block";
			document.getElementById("Error_MissingText").style.display = "none";
			document.getElementById("TextMessageSent").style.display = "none";
			document.getElementById("DivButtonOKContainer").style.display = "none";
			
			this.PopupBase.SetVisible(visible);
		}
		
	    document.body.appendChild(this.PopupBase.Node);
	},
	
	// Popup de paiement
	PopupPayment : function()
	{
		this.PopupBase = new Util.PopupBase(1);
		
		//this.PopupBase.Node.style.top = "10px";
		//this.PopupBase.Node.setAttribute("style", "top:10px");
		this.PopupBase.Node.childNodes[1].style.paddingTop = "10px";
		
		//this.MainDiv.style.height = "295px";
	
		// Create title
		var title = document.createElement("div");
		title.className = "titre";
		title.style.paddingLeft = "170px";
		title.innerHTML = "PAIEMENT PAR CARTE - PAIEMENT SÉCURISÉ<img src='images/paiement/paiement-securise-cartes.png' style='margin-left:20px'></img>";

		this.PopupBase.Node.appendChild(title);

		var divMain = document.createElement("div");
		divMain.style.width = "928px";
		//divMain.style.height = "550px";
		
		var table = document.createElement("table");
		table.id = "TablePaiement";
		table.style.display = "none";
		table.style.paddingLeft = "30px";
		table.style.paddingRight = "30px";
		table.style.paddingBottom = "30px";
		table.style.paddingTop = "50px";
		//table.setAttribute("align", "top");
		table.setAttribute("verticalAlign", "top");
			
		// Command details
		var commandDetails = Premium.Get_PanelCommandDetails();
		table.appendChild(commandDetails);
		
		// Payment details
		var divPayment = Premium.Get_DivPayment();
		table.appendChild(divPayment);
		
		divMain.appendChild(table);
		
		// Waiting panel
		var waitingPanel = document.createElement('div');
		waitingPanel.id = "WaitingPanel";
		waitingPanel.style.textAlign = "center";
		waitingPanel.style.height = "654px";
		
		var waitingImg = document.createElement('div');
		waitingImg.className = "loader";
		waitingImg.id = "loader-2";
		waitingImg.style.top = "160px";
		waitingPanel.appendChild(waitingImg);
		
		// Label : Paiement en cours.
		var labelPaymentInShort = document.createElement('div');
		labelPaymentInShort.id = "LabelPaymentInShort";
		labelPaymentInShort.style.paddingTop = "230px";
		labelPaymentInShort.style.marginLeft = "25px";
		labelPaymentInShort.style.fontSize = "22px";
		labelPaymentInShort.innerHTML = "Paiement en cours...";
		waitingPanel.appendChild(labelPaymentInShort);
		
		divMain.appendChild(waitingPanel);
		
		// Sucess payement
		var successPanel = document.createElement('div');
		successPanel.id ="SuccessPayment";
		successPanel.style.display = "none";
		successPanel.style.height = "654px";
		successPanel.style.fontSize = "30px";
		successPanel.style.textAlign = "center";
		successPanel.style.paddingTop = "100px";
		successPanel.innerHTML = "<p><b>Votre paiement a bien " + String.fromCharCode(233) + "t" + String.fromCharCode(233) + " effectu" + String.fromCharCode(233) + ".</b></p><p></p><p></p><p><b>Merci !</b></p>";
		
		// Button valider
		var buttonOK_Sucess = document.createElement('div');
		buttonOK_Sucess.className = "Cor-RedButton";
		buttonOK_Sucess.style.textAlign = "center";
		buttonOK_Sucess.style.width = "200px";
		buttonOK_Sucess.style.marginLeft = "370px";
		buttonOK_Sucess.style.marginTop = "120px";
		buttonOK_Sucess.innerHTML = "OK";
		buttonOK_Sucess.setAttribute("onclick", "location.href='https://www.scribens.fr?key=MonCompte'");
		successPanel.appendChild(buttonOK_Sucess);
		
		divMain.appendChild(successPanel);
		
		// Failure payement
		var failurePanel = document.createElement('div');
		failurePanel.id ="FailurePayment";
		failurePanel.style.display = "none";	
		failurePanel.style.height = "654px";
		failurePanel.style.fontSize = "30px";
		failurePanel.style.textAlign = "center";
		failurePanel.style.paddingTop = "100px";
		failurePanel.innerHTML = "<p><b>Le paiement a " + String.fromCharCode(233) + "chou" + String.fromCharCode(233) + ".</b></p>";
		
		// Button valider
		var buttonOK_Failure = document.createElement('div');
		buttonOK_Failure.className = "Cor-RedButton";
		buttonOK_Failure.style.textAlign = "center";
		buttonOK_Failure.style.width = "200px";
		buttonOK_Failure.style.marginLeft = "380px";
		buttonOK_Failure.style.marginTop = "150px";
		buttonOK_Failure.innerHTML = "OK";
		buttonOK_Failure.onclick = function(){Premium.PopupPaymentI.SetVisible(false)};
		
		failurePanel.appendChild(buttonOK_Failure);
		
		divMain.appendChild(failurePanel);
		
		// Set visible
		this.SetVisible = function(visible)
		{
			// Hide the wargin mesage
			if(visible) document.getElementById("Purchase_MessageWarning").style.display = "none";
			
			// MAJ product Id
			var productPurchaseElt = document.getElementById("product_purchase");
			
			var labelProduct = "<b>Produit :</b> ";
			
			// Subscription type
			if(document.getElementById("Radio1Mois").checked == true) labelProduct += "Abonnement Premium Scribens 1 mois";
			else if(document.getElementById("Radio3Mois").checked == true) labelProduct += "Abonnement Premium Scribens 3 mois";
			else if(document.getElementById("Radio1An").checked == true) labelProduct += "Abonnement Premium Scribens 1 an";
			
			// Renouvellement aut.
			var checkBoxRenouvAut = document.getElementById("CbRenouvAut");
			if(checkBoxRenouvAut != null && checkBoxRenouvAut.checked == true && Cor.ModeAbonnePremium == false) labelProduct += " Ren. Aut.";
			
			productPurchaseElt.innerHTML = labelProduct;

			this.PopupBase.SetVisible(visible);
		}
		
		this.PopupBase.Node.appendChild(divMain);
		
	    document.body.appendChild(this.PopupBase.Node);
		
		// Change the design of select elements.
		$('select').each(function(){
			var $this = $(this), numberOfOptions = $(this).children('option').length;
	   
			$this.wrap('<div class="select ' + $this.attr('class') + '"></div>');
			$this.addClass('select-hidden');
			this.parentNode.style.width = "200px";
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
				
				//var v = $this.children('option').eq(i);
				//var vx = v[0];
				//vx.style.padding = "6px 15px";
				//var xx = 1;
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
				console.log($(this).text().length * 2 + 10);
				let newHeight = '42';
				if ($(this).text().length * 2 > 42 ) {
					newHeight = $(this).text().length * 2 + 10;
				}
				$styledSelect.css('height', newHeight + 'px' );
				$styledSelect.parent().parent().css('height', newHeight + 'px' );
			});
	   
			$(document).click(function() {
				$styledSelect.removeClass('active');
				$list.hide();
			});
		});
		
		// Select by default "France" as country
		var selectElt = document.getElementById("Country");
		//selectElt.parentNode.style.width = "200px";
		selectElt.value = "France";
		selectElt.nextSibling.innerHTML = "France";
		var ul = selectElt.nextSibling.nextSibling;
		
		for(var  i = 0; i < ul.childNodes.length; i++)
		{
			var li = ul.childNodes[i];
			li.style.padding = "6px 15px";	
		}
		
		//this.PopupBase.Node.style.top = "10px";
		//this.PopupBase.Node.setAttribute("style", "top:10px");
	},
	
	// Create the panel of payment
	Get_DivPayment : function()
	{
		// Payment fields
		var divPayment = document.createElement('td');
		divPayment.className = "cell payment payment5";
		divPayment.style.width = "550px";
		//divPayment.style.marginTop = "20px";
		
		var divForm = document.createElement('form');
		var divFieldset = document.createElement('fieldset');
		
		// Mandatory fields
		var divMandatoryFields = document.createElement('div');
		divMandatoryFields.style.paddingLeft = "390px";
		divMandatoryFields.style.fontSize = "12px";
		divMandatoryFields.innerHTML = "* Champs obligatoires";
		divFieldset.appendChild(divMandatoryFields);
		
		// Name & Last name
		var tableFullname = document.createElement('table');
		
		// Name
		var tdFieldName = document.createElement('td');
		var divName = document.createElement('div');
		divName.style.marginBottom = "10px";
		divName.style.width = "200px";
		//tdFieldName.className = "field";
		
		var divLabelName = document.createElement('label');
		divLabelName.for = "payment5-name";
		divLabelName.setAttribute("data-tid", "elements_examples.form.name_label");
		divLabelName.style.marginBottom = "-10px";
		divLabelName.innerHTML = "Prénom *";
		divName.appendChild(divLabelName);
		
		var divInputName = document.createElement('input');
		divInputName.id = "Name";
		divInputName.setAttribute("data-tid", "elements_examples.form.name_placeholder");
		divInputName.className = "input";
		divInputName.type = "text";
		divInputName.placeholder = "Patrick";
		divInputName.required = "";
		divInputName.autocomplete = "given-name";
		divName.appendChild(divInputName);
		
		tdFieldName.appendChild(divName);
		tableFullname.appendChild(tdFieldName);
		
		// Last name
		var tdFieldLastName = document.createElement('td');
		var divLastName = document.createElement('div');
		divLastName.style.marginBottom = "10px";
		divLastName.style.width = "200px";
		//tdFieldLastName.className = "field";
		
		var divLabelLastName = document.createElement('label');
		divLabelLastName.for = "payment5-name";
		divLabelLastName.setAttribute("data-tid", "elements_examples.form.name_label");
		divLabelLastName.style.marginBottom = "-10px";
		divLabelLastName.innerHTML = "Nom *";
		divLastName.appendChild(divLabelLastName);
		
		var divInputLastName = document.createElement('input');
		divInputLastName.id = "LastName";
		divInputLastName.setAttribute("data-tid", "elements_examples.form.name_placeholder");
		divInputLastName.className = "input";
		divInputLastName.type = "text";
		divInputLastName.placeholder = "Dubois";
		divInputLastName.required = "";
		divInputLastName.autocomplete = "family-name";
		divLastName.appendChild(divInputLastName);
		
		tdFieldLastName.appendChild(divLastName);
		tableFullname.appendChild(tdFieldLastName);
		
		divFieldset.appendChild(tableFullname);
		
		// Adresse
		var divFieldAdresse = document.createElement('div');
		divFieldAdresse.style.marginBottom = "10px";
		
		//divFieldAdresse.className = "field";
		
		var divLabelAdresse = document.createElement('label');
		divLabelAdresse.for = "payment5-name";
		divLabelAdresse.setAttribute("data-tid", "elements_examples.form.name_label");
		divLabelAdresse.style.marginBottom = "-10px";
		divLabelAdresse.innerHTML = "Adresse *";
		divFieldAdresse.appendChild(divLabelAdresse);
		
		var divInputAdresse = document.createElement('input');
		divInputAdresse.id = "Address";
		divInputAdresse.setAttribute("data-tid", "elements_examples.form.name_placeholder");
		divInputAdresse.className = "input";
		divInputAdresse.type = "text";
		divInputAdresse.placeholder = "4 rue de la Tulipe";
		divInputAdresse.autocomplete = "off";
		divInputAdresse.required = "";
		divFieldAdresse.appendChild(divInputAdresse);
		
		divFieldset.appendChild(divFieldAdresse);
		
		// City & Postal code
		var tableCityCP = document.createElement('table');
		tableCityCP.style.marginBottom = "8px";
		
		// City
		var tdCity = document.createElement('td');
		var divFieldCity = document.createElement('div');
		divFieldCity.style.marginBottom = "10px";
		divFieldCity.style.width = "200px";
		
		var divLabelCity = document.createElement('label');
		divLabelCity.for = "payment5-name";
		divLabelCity.setAttribute("data-tid", "elements_examples.form.name_label");
		divLabelCity.style.marginBottom = "-10px";
		divLabelCity.autocomplete = "off";
		divLabelCity.innerHTML = "Ville *";
		divFieldCity.appendChild(divLabelCity);
		
		var divInputCity = document.createElement('input');
		divInputCity.id = "City";
		divInputCity.setAttribute("data-tid", "elements_examples.form.name_placeholder");
		divInputCity.className = "input";
		divInputCity.type = "text";
		divInputCity.placeholder = "Bordeaux";
		divInputCity.autocomplete = "off";
		divInputCity.required = "";
		divFieldCity.appendChild(divInputCity);
		
		tdCity.appendChild(divFieldCity);
		tableCityCP.appendChild(tdCity);
		
		// Postal code
		var tdCP = document.createElement('td');
		var divFieldCP = document.createElement('div');
		divFieldCP.style.marginBottom = "10px";
		divFieldCP.style.width = "200px";
		
		var divLabelCP = document.createElement('label');
		divLabelCP.for = "payment5-name";
		divLabelCP.setAttribute("data-tid", "elements_examples.form.name_label");
		divLabelCP.style.marginBottom = "-10px";
		divLabelCP.autocomplete = "off";
		divLabelCP.innerHTML = "Code postal";
		divFieldCP.appendChild(divLabelCP);
		
		var divInputCP = document.createElement('input');
		divInputCP.id = "PostalCode";
		divInputCP.setAttribute("data-tid", "elements_examples.form.name_placeholder");
		divInputCP.className = "input";
		divInputCP.type = "text";
		divInputCP.placeholder = "33000";
		divInputCP.required = "";
		divInputCP.autocomplete = "off";
		divFieldCP.appendChild(divInputCP);
		
		tdCP.appendChild(divFieldCP);
		tableCityCP.appendChild(tdCP);
		
		divFieldset.appendChild(tableCityCP);
		
		// Country
		var divCountry = document.createElement('div');
		//divCountry.style.marginBottom = "5px";
		
		// Label
		var divLabelCountry = document.createElement('div');
		divLabelCountry.style.fontSize = "13px";
		divLabelCountry.style.marginBottom = "10px";
		divLabelCountry.innerHTML = "Pays";
		divCountry.appendChild(divLabelCountry);
		
		// Combobox
		var divCbCountry = document.createElement('div');
		divCbCountry.className = "select";
		divCbCountry.style.width = "200px";
		var selectCountry = document.createElement('select');
		selectCountry.className = 'select-pays';
		selectCountry.style.marginBottom = "120px";
		selectCountry.id = "Country";
		
		for(var i = 0; i < Premium.ArrayPays.length; i++)
		{
			var option = document.createElement('option');
			option.innerHTML = Premium.ArrayPays[i];
			selectCountry.appendChild(option);
		}
		
		divCbCountry.appendChild(selectCountry);
		divCountry.appendChild(divCbCountry);
		
		divFieldset.appendChild(divCountry);
		
		// Company
		var divFieldCompany = document.createElement('div');
		divFieldCompany.style.marginBottom = "10px";
		divFieldCompany.style.width = "200px";
		
		var divLabelCompany = document.createElement('label');
		divLabelCompany.for = "payment5-name";
		divLabelCompany.setAttribute("data-tid", "elements_examples.form.name_label");
		divLabelCompany.style.marginBottom = "-10px";
		divLabelCompany.innerHTML = "Société";
		divFieldCompany.appendChild(divLabelCompany);
		
		var divInputCompany = document.createElement('input');
		divInputCompany.id = "Company";
		divInputCompany.setAttribute("data-tid", "elements_examples.form.name_placeholder");
		divInputCompany.className = "input";
		divInputCompany.type = "text";
		divInputCompany.placeholder = "ABC Communication";
		divInputCompany.required = "";
		divInputCompany.autocomplete = "off";
		divFieldCompany.appendChild(divInputCompany);
		
		divFieldset.appendChild(divFieldCompany);
		
		// Card
		var divFieldCard = document.createElement('div');
		
		var divLabelCard = document.createElement('label');
		divLabelCard.for = "payment5-card";
		divLabelCard.setAttribute("data-tid", "elements_examples.form.name_label");
		divLabelCard.style.marginBottom = "-10px";
		divLabelCard.innerHTML = "Carte *";
		divFieldCard.appendChild(divLabelCard);
		
		var divInputCard = document.createElement('div');
		divInputCard.id = "payment5-card";
		divInputCard.className = "input";
		divFieldCard.appendChild(divInputCard);
		
		divFieldset.appendChild(divFieldCard);
		
		// Button Purchase
		var divButtons = document.createElement('div');
		divButtons.setAttribute("align", "center");
		
		var buttonPurchase = document.createElement('div');
		buttonPurchase.className = "Cor-RedButton";
		buttonPurchase.innerHTML = "Payer";
		buttonPurchase.style.fontSize = "16px";
		buttonPurchase.style.width = "150px";
		buttonPurchase.style.textAlign = "center";
		buttonPurchase.style.marginLeft = "20px";
		buttonPurchase.style.marginRight = "20px";
		buttonPurchase.style.marginBottom = "10px";
		buttonPurchase.style.marginTop = "30px";
		
		var popupBase = this;
		buttonPurchase.onclick = function(){Premium.Purchase_Card();};
		
		divButtons.appendChild(buttonPurchase);
		
		divFieldset.appendChild(divButtons);
		
		// Warning message.
		var divPurchase_MessageWarning = document.createElement('div');
		divPurchase_MessageWarning.id = "Purchase_MessageWarning";
		divPurchase_MessageWarning.style.textAlign = "center";
		divPurchase_MessageWarning.style.marginTop = "20px";
		divPurchase_MessageWarning.style.display = "none";
		//divPurchase_MessageWarning.style.fontSize = "10px";
		divFieldset.appendChild(divPurchase_MessageWarning);
		
		divForm.appendChild(divFieldset);
		divPayment.appendChild(divForm);
		
		return divPayment;
	},
	
	// Command details
	Get_PanelCommandDetails : function()
	{
		var divCommandDetailsCont = document.createElement('td');
		divCommandDetailsCont.verticalAlign = "top";
		divCommandDetailsCont.align = "top";
		
		var divCommandDetails = document.createElement('div');
		divCommandDetails.style.border = "1px solid #b5b5b5";
		divCommandDetails.style.borderRadius = "6px";
		divCommandDetails.style.paddingLeft = "15px";
		divCommandDetails.style.paddingRight = "15px";
		divCommandDetails.style.paddingTop = "11px";
		divCommandDetails.style.marginRight = "20px";
		divCommandDetails.style.paddingBottom = "263px";
		divCommandDetails.style.width = "300px";
		divCommandDetails.style.height = "574px";
		//divCommandDetails.style.marginTop = "-10px";
		
		// Title
		var title = document.createElement('div');
		title.innerHTML = "<b><u>D" + String.fromCharCode(233) + "tails de votre commande :</u></b>";
		divCommandDetails.appendChild(title);
		
		// Product
		var product = document.createElement('div');
		product.style.marginTop = "20px";
		product.id = "product_purchase";
		product.innerHTML = "<b>Produit :</b>" + " Abonnement Premium 1 mois";
		divCommandDetails.appendChild(product);
		
		// Amount
		var amount = document.createElement('div');
		amount.style.marginTop = "20px";
		amount.innerHTML = "<b>Montant :</b>" + " 5.90 € TTC";
		divCommandDetails.appendChild(amount);
		
		
		divCommandDetailsCont.appendChild(divCommandDetails);
		
		return divCommandDetailsCont;
	},
	
	// Purchase by card
	Purchase_Card : function()
	{
		// First, test values of the form.
		
		var name = document.getElementById("Name").value;
		var lastName = document.getElementById("LastName").value;
		var addressUser = document.getElementById("Address").value;
		var cityUser = document.getElementById("City").value;
		var postalCodeUser = document.getElementById("PostalCode").value;
		var countryUser = document.getElementById("Country").value;
		var company = document.getElementById("Company").value;
		
		//countryUser = "FRANCE";
		
		// Check the datas validity
		var condName = Util.Condition_Username(name);
		var condLastName = Util.Condition_Username(lastName);
		var condAddress = Util.Condition_Address(addressUser);
		var condCity = Util.Condition_City(cityUser);
		var condCompany = Util.Condition_Company(company);
		// No condition on postal code. Depends on different countries.
		//var condPostalCode = Util.Condition_PostalCode(postalCodeUser);
		
		var divMessageWarning = document.getElementById("Purchase_MessageWarning");
			
		// Invalid datas. Warn the user.
		if(condName == false ||
		   condLastName == false ||
		   condAddress == false ||
		   condCity == false ||
		   condCompany == false)
		{
			divMessageWarning.style.display = "block";
			divMessageWarning.innerHTML = "<p style=\"font-size:5px\"><b>Donn" + String.fromCharCode(233) + "es invalides ou manquantes</b>.</p><p><b>Remarque : </b>les champs ne doivent pas comporter</p><p>les caract" + String.fromCharCode(232) + "res \" <b>'</b> \", \"<b>|</b>\" et \"<b>,</b>\" .</p>";
		}
		// Données valides : V�rification si l'identifiant (email) existe d�j�.
		else
		{
			divMessageWarning.style.display = "none";
			
			// Load
			document.getElementById("TablePaiement").style.display = "none";
			document.getElementById("WaitingPanel").style.display = "block";
			document.getElementById("LabelPaymentInShort").style.display = "block";
			document.getElementById("SuccessPayment").style.display = "none";
			document.getElementById("FailurePayment").style.display = "none";
			
			// 1. Init the paYement
			Premium.Stripe.confirmCardPayment(Premium.ClientSecret_PaymentIntent, {
			  payment_method: {
				// Card details
				card: Premium.Card,
				// Payment details
				billing_details: {
					name: name + " " + lastName,
					email: Cor.User.Identifiant,
					address: {
						line1: addressUser,
						city: cityUser,
						// Country: Don't work. Don't need because automaticaly detected with card number.
						//country: countryUser,
						postal_code: postalCodeUser
					}
				}
			  }
			})
			.then(function(result) {
			  if (result.error) {
				// Show error to your customer
				//showError(result.error.message);
				Premium.PaymentFailure();
			  } else {
				// The payment has been processed.
				
				// Save the setup intent
				Premium.Stripe.confirmCardSetup(Premium.ClientSecret_SetupIntent, {
					payment_method: {
					   card: Premium.Card,
					   billing_details: {
						   name: name + " " + lastName,
						   email: Cor.User.Identifiant,
						   address: {
						       line1: addressUser,
							   city: cityUser,
							   // Country: Don't work. Don't need because automaticaly detected with card number.
							   //country: countryUser,
							   postal_code: postalCodeUser
						   }
					   }
				    }
				})
				.then(function(result) {
					if (result.error) {
					  //changeLoadingState(false);
					  //var displayError = document.getElementById("card-errors");
					  //displayError.textContent = result.error.message;
					  var a = 1;
					} else {
					  // The PaymentMethod was successfully setup
					  // Be sure to attach the PaymentMethod to a Customer as shown by
					  // the server webhook in this sample
					  //orderComplete(stripe, setupIntent.client_secret);
					  Premium.Stripe.retrieveSetupIntent(Premium.ClientSecret_SetupIntent).then(function(result)
					  {
						 var setupIntent = result.setupIntent;
						 var setupIntentJson = JSON.stringify(setupIntent, null, 2);

						 // Inf evolution
						 var infEvolutions = false;
						 var cb_infoEvolutions = document.getElementById("Info_InfEvol");
					     if(cb_infoEvolutions != null) infEvolutions = cb_infoEvolutions.checked;
						
						 var recurringPayment = false;
						 var checkBoxRenouvAut = document.getElementById("CbRenouvAut");
						 if(checkBoxRenouvAut != null && checkBoxRenouvAut.checked == true && Cor.ModeAbonnePremium == false) recurringPayment = true;
						
						 // Send a request to udpate account informations
						 Util.SendHttpRequest('Payment_Servlet',
								[['FunctionName', 'Card_Purchase'],
								 ['id', Cor.User.Identifiant],
								 ['productId', Premium.SubscriptionType],
								 ['userName', Cor.User.UserName],
								 ['infEvolutions', infEvolutions],
								 ['recurringPayment', recurringPayment],
								 ['name', name],
								 ['lastName', lastName],
								 ['address', addressUser],
								 ['city', cityUser],
								 ['postalCode', postalCodeUser],
								 ['country', countryUser],
								 ['company', company],
								 ['setupIntentJson', setupIntentJson]],	
								 Premium.SuccessPaiementUpdateAccount);
						 	
						 /*Util.SendHttpRequest('Save_SetupIntent',
								[['setupIntentJson', setupIntentJson]],		 
								 null);*/
					  });
					}
				});
				
				
				//Premium.Stripe.retrievePaymentIntent(Premium.ClientSecret).then(function(result) {
					//var paymentIntent = result.paymentIntent;
					//var paymentIntentJson = JSON.stringify(paymentIntent, null, 2);
					
					//alert(paymentIntentJson);
					
					
				//});
			  }
			});
			
			/*Premium.Stripe.confirmCardSetup(Premium.ClientSecret, {
				payment_method: {
				   card: Premium.Card,
				   billing_details: { email: Cor.User.Identifiant }
				}
			})
			.then(function(result) {
				if (result.error) {
				  //changeLoadingState(false);
				  //var displayError = document.getElementById("card-errors");
				  //displayError.textContent = result.error.message;
				  var a = 1;
				} else {
				  // The PaymentMethod was successfully setup
				  // Be sure to attach the PaymentMethod to a Customer as shown by
				  // the server webhook in this sample
				  //orderComplete(stripe, setupIntent.client_secret);
				  Premium.Stripe.retrieveSetupIntent(Premium.ClientSecret).then(function(result) {
					var setupIntent = result.setupIntent;
					var setupIntentJson = JSON.stringify(setupIntent, null, 2);

					var a = 1;

					
				  });
				}
			});*/
			
			
		}
		
		/*Premium.Stripe.confirmCardSetup(Premium.ClientSecret, {
				payment_method: {
				   card: Premium.Card,
				   billing_details: { email: Cor.User.Identifiant }
				}
			})
			.then(function(result) {
				if (result.error) {
				  //changeLoadingState(false);
				  //var displayError = document.getElementById("card-errors");
				  //displayError.textContent = result.error.message;
				  var a = 1;
				} else {
				  // The PaymentMethod was successfully setup
				  // Be sure to attach the PaymentMethod to a Customer as shown by
				  // the server webhook in this sample
				  //orderComplete(stripe, setupIntent.client_secret);
				  Premium.Stripe.retrieveSetupIntent(Premium.ClientSecret).then(function(result) {
					var setupIntent = result.setupIntent;
					var setupIntentJson = JSON.stringify(setupIntent, null, 2);

					var a = 1;

					Util.SendHttpRequest('Save_SetupIntent',
							[['setupIntentJson', setupIntentJson]],
							 null);
				  });
				}
			});*/
	},
	
	// End after update paiement account
	SuccessPaiementUpdateAccount : function()
	{
		// Show onluy the sucess panel.
		document.getElementById("TablePaiement").style.display = "none";
		document.getElementById("WaitingPanel").style.display = "none";
		document.getElementById("SuccessPayment").style.display = "block";
		document.getElementById("FailurePayment").style.display = "none";
	},
	
	// Payment failure
	PaymentFailure : function()
	{
		// Show onluy the failure panel.
		document.getElementById("WaitingPanel").style.display = "none";
		document.getElementById("TablePaiement").style.display = "none";
		document.getElementById("SuccessPayment").style.display = "none";
		document.getElementById("FailurePayment").style.display = "block";
	},
	
	// Explanation setup Google Chrome.
	Exp_Setup_GoogleChrome : "<p><b>1.</b> Allez sur <a href='https://chrome.google.com/webstore/detail/scribens-correcteur-dorth/djpeecijcbigpoijldkimmkilekocdao?hl=fr' target='_blank'>cette page</a>.</p>" +
							 "<p><b>2.</b> Cliquez sur <b>Ajouter " + String .fromCharCode(224) + " Chrome</b> puis sur <b>Ajouter l'extension.</b>" +
							 "<p><b>3.</b> Sur une zone d'un texte d'un site, faites un <b>clic droit</b> sur l'<b>ic" + String.fromCharCode(244) + "ne Scribens</b> situ" + String.fromCharCode(233) + "e en <b>haut " + String.fromCharCode(224) + " droite</b>.</p>" +
							 "<p><b>4.</b> Cliquez de nouveau sur l'<b>ic" + String.fromCharCode(244) + "ne Scribens</b> pour obtenir des propositions sur le <b>style</b>.</p>",
	
	// Explanation setup Mozilla Firefox.
	Exp_Setup_MozillaFirefox : "<p><b>1.</b> Allez sur <a href='https://addons.mozilla.org/fr/firefox/addon/scribens-correcteur' target='_blank'>cette page</a>.</p>" +
							   "<p><b>2.</b> Cliquez sur <b>Ajouter " + String .fromCharCode(224) + " Firefox</b> puis sur <b>Ajouter</b>.</p>" +
							   "<p><b>3.</b> Sur une zone d'un texte d'un site, faites un <b>clic droit</b> sur l'<b>ic" + String.fromCharCode(244) + "ne Scribens</b> situ" + String.fromCharCode(233) + "e en <b>haut " + String.fromCharCode(224) + " droite</b>.</p>" +
							   "<p><b>4.</b> Cliquez de nouveau sur l'<b>ic" + String.fromCharCode(244) + "ne Scribens</b> pour obtenir des propositions sur le <b>style</b>.</p>",
	
	// Explanation setup Safari.
	Exp_Setup_Safari : "<p><b>1.</b> T" + String.fromCharCode(233) + "l" + String.fromCharCode(233) + "chargez le fichier d'installation <a href='https://www.scribens.com/download/Scribens.safariextz' target='_blank'>ici</a> puis ouvrez-le.</p>" +
					   "<p><b>2.</b> Cliquez sur le bouton <b>Se fier</b>.</p>" +
					   "<p><b>3.</b> Cliquez sur la zone de texte d'un site, sur le <b>bouton Scribens</b> en haut, dans la <b>barre des t" + String.fromCharCode(226) + "ches,</b> puis sur <b>Scribens - Fran" + String.fromCharCode(231) + "ais</b>.</p>",
	
	// Explanation setup Microsoft Edge.
	Exp_Setup_MSEdge : "<p><b>1.</b> Allez sur <a href='https://microsoftedge.microsoft.com/addons/detail/aohjlchmgmmhlganagldeekegcofalai' target='_blank'>cette page</a>.</p>" +
					   "<p><b>2.</b> Cliquez sur <b>Obtenir</b>.</p>" +
					   "<p><b>3.</b> Sur une zone d'un texte d'un site, faites un <b>clic droit</b> sur l'<b>ic" + String.fromCharCode(244) + "ne Scribens</b> situ" + String.fromCharCode(233) + "e en <b>haut " + String.fromCharCode(224) + " droite</b>.</p>" +
					   "<p><b>4.</b> Cliquez de nouveau sur l'<b>ic" + String.fromCharCode(244) + "ne Scribens</b> pour obtenir des propositions sur le <b>style</b>.</p>",
				
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
	
	// Explanation setup Android
	Exp_Setup_Android : "<p><b>1.</b> Depuis votre <b>smartphone Android</b>, allez dans le <b>Google Play Store</b>.</p>" +
						"<p><b>2.</b> Recherchez <b>'Scribens'</b>. Une fois sur la page de l'application, cliquez sur <b>Installer</b> puis sur <b>Ouvrir</b>.</p>" +
						"<p><b>3.</b> <b>Inscrivez-vous</b> ou <b>connectez-vous</b> à <b>votre compte</b> puis suivez les instructions pour installer le <b>clavier Android</b>.</p>" +
						"<p><b>4.</b> Dans votre <b>clavier</b>, cliquez sur l'<b>icône Scribens</b> en haut à gauche pour consulter les <b>corrections</b>.</p>",
		
	// Explanation setup Mozilla Thunderbird.
	Exp_Setup_MozillaThunderbird : "<p><b>1.</b> T" + String.fromCharCode(233) + "l" + String.fromCharCode(233) + "chargez le fichier d'installation <a href='https://www.scribens.com/download/Scribens_MozillaThunderbird.exe' target='_blank'>ici</a> puis ouvrez-le.</p>" +
								   "<p><b>2.</b> Suivez les instructions d'installation.</b>" +
								   "<p><b>3.</b> Une fois l'installation termin" + String.fromCharCode(233) + "e, lancez <b>Mozilla Thunderbird</b>.</b></p>" +
								   "<p><b>4.</b> Cliquez sur <b>Autoriser cette installation</b>, sur <b>Continuer</b>, puis sur <b>Red" + String.fromCharCode(233) + "marrer Thunderbird</b>.</p>" +
								   "<p><b>5.</b> Dans la zone de texte d'un message, faites un <b>clic droit</b> -> <b>Scribens</b> -> <b>Fran" + String.fromCharCode(231) + "ais</b></p>" +
								   "<p><b>Note :</b></p>" +
								   "<p>- Le navigateur <b>Google Chrome</b> est requis.</p>" +
								   "<p>- Si la fen" + String.fromCharCode(234) + "tre du pare-feu de Windows se lance, cliquez sur <b>Autoriser l'acc" + String.fromCharCode(232) + "s.</b>",
								   
	ArrayPays : [
		"Afrique du Sud",
		"Albanie",
		"Algérie",
		"Allemagne",
		"Andorre",
		"Angola",
		"Anguilla",
		"Antigua-et-Barbuda",
		"Antilles néerlandaises",
		"Arabie saoudite",
		"Argentine",
		"Arménie",
		"Aruba",
		"Australie",
		"Autriche",
		"Azerbaïdjan",
		"Bahamas",
		"Bahreïn",
		"Barbade",
		"Belgique",
		"Belize",
		"Bénin",
		"Bermudes",
		"Bhoutan",
		"Biélorussie",
		"Bolivie",
		"Bosnie-Herzégovine",
		"Botswana",
		"Brésil",
		"Brunéi Darussalam",
		"Bulgarie",
		"Burkina Faso",
		"Burundi",
		"Cambodge",
		"Cameroun",
		"Canada",
		"Cap-Vert",
		"Chili",
		"Chine",
		"Chypre",
		"Colombie",
		"Comores",
		"Congo-Brazzaville",
		"Congo-Kinshasa",
		"Corée du Sud",
		"Costa Rica",
		"Côte d’Ivoire",
		"Croatie",
		"Danemark",
		"Djibouti",
		"Dominique",
		"Égypte",
		"El Salvador",
		"Émirats arabes unis",
		"Équateur",
		"Érythrée",
		"Espagne",
		"Estonie",
		"État de la Cité du Vatican",
		"États fédérés de Micronésie",
		"États-Unis",
		"Éthiopie",
		"Fidji",
		"Finlande",
		"France",
		"Gabon",
		"Gambie",
		"Géorgie",
		"Gibraltar",
		"Grèce",
		"Grenade",
		"Groenland",
		"Guadeloupe",
		"Guatemala",
		"Guinée",
		"Guinée-Bissau",
		"Guyana",
		"Guyane française",
		"Honduras",
		"Hongrie",
		"Île Norfolk",
		"Îles Caïmans",
		"Îles Cook",
		"Îles Féroé",
		"Îles Malouines",
		"Îles Marshall",
		"Îles Pitcairn",
		"Îles Salomon",
		"Îles Turques-et-Caïques",
		"Îles Vierges britanniques",
		"Inde",
		"Indonésie",
		"Irlande",
		"Islande",
		"Israël",
		"Italie",
		"Jamaïque",
		"Japon",
		"Jordanie",
		"Kazakhstan",
		"Kenya",
		"Kirghizistan",
		"Kiribati",
		"Koweït",
		"La Réunion",
		"Laos",
		"Lesotho",
		"Lettonie",
		"Liechtenstein",
		"Lituanie",
		"Luxembourg",
		"Macédoine",
		"Madagascar",
		"Malaisie",
		"Malawi",
		"Maldives",
		"Mali",
		"Malte",
		"Maroc",
		"Martinique",
		"Maurice",
		"Mauritanie",
		"Mayotte",
		"Mexique",
		"Moldavie",
		"Monaco",
		"Mongolie",
		"Monténégro",
		"Montserrat",
		"Mozambique",
		"Namibie",
		"Nauru",
		"Népal",
		"Nicaragua",
		"Niger",
		"Nigéria",
		"Niue",
		"Norvège",
		"Nouvelle-Calédonie",
		"Nouvelle-Zélande",
		"Oman",
		"Ouganda",
		"Palaos",
		"Panama",
		"Papouasie-Nouvelle-Guinée",
		"Paraguay",
		"Pays-Bas",
		"Pérou",
		"Philippines",
		"Pologne",
		"Polynésie française",
		"Portugal",
		"Qatar",
		"Hong Kong",
		"République dominicaine",
		"République tchèque",
		"Roumanie",
		"Royaume-Uni",
		"Russie",
		"Rwanda",
		"Saint-Christophe-et-Niévès",
		"Saint-Marin",
		"Saint-Pierre-et-Miquelon",
		"Saint-Vincent-et-les-Grenadines",
		"Sainte-Hélène",
		"Sainte-Lucie",
		"Samoa",
		"Sao Tomé-et-Principe",
		"Sénégal",
		"Serbie",
		"Seychelles",
		"Sierra Leone",
		"Singapour",
		"Slovaquie",
		"Slovénie",
		"Somalie",
		"Sri Lanka",
		"Suède",
		"Suisse",
		"Suriname",
		"Svalbard et Jan Mayen",
		"Swaziland",
		"Tadjikistan",
		"Taïwan",
		"Tanzanie",
		"Tchad",
		"Thaïlande",
		"Togo",
		"Tonga",
		"Trinité-et-Tobago",
		"Tunisie",
		"Turkménistan",
		"Tuvalu",
		"Ukraine",
		"Uruguay",
		"Vanuatu",
		"Venezuela",
		"Vietnam",
		"Wallis-et-Futuna",
		"Yémen",
		"Zambie",
		"Zimbabwe"],
	
	};

// Once the document is loaded
document.addEventListener("DOMContentLoaded", function()
{	
	// Init
	
	// UserAgent
	Cor.UserAgent = navigator.userAgent.toLowerCase();

	if(Cor.UserAgent.indexOf("firefox") >= 0) Cor.IsMozillaF = true;
	else if(Cor.UserAgent.indexOf("chrome") && !!window.chrome && !!window.chrome.webstore) Cor.IsChrome = true;
	else if(Cor.UserAgent.indexOf("msie 1.0") >= 0 || Cor.UserAgent.indexOf("msie 2.0") >= 0 || Cor.UserAgent.indexOf("msie 3.0") >= 0 ||
			Cor.UserAgent.indexOf("msie 4.0") >= 0 || Cor.UserAgent.indexOf("msie 5.0") >= 0 || Cor.UserAgent.indexOf("msie 6.0") >= 0 ||
			Cor.UserAgent.indexOf("msie 7.0") >= 0 || Cor.UserAgent.indexOf("msie 8.0") >= 0 || Cor.UserAgent.indexOf("msie 9.0") >= 0)
	{
		Cor.IsIEBefore10 = true;
	}
	else if(Cor.UserAgent.indexOf("safari") >= 0) Cor.IsSafari = true;

	// IE autre que 11.0
	if(Cor.UserAgent.indexOf("msie") >= 0) Cor.IsIE = true;

	if(Cor.UserAgent.indexOf("msie 8.0") >= 0) Cor.IsIE8 = true;
	if(Cor.UserAgent.indexOf("msie 9.0") >= 0) Cor.IsIE9 = true;
	if(Cor.UserAgent.indexOf("msie 10.0") >= 0) Cor.IsIE10 = true;

	// IE11 : user agent change from "MSIE 10.0" to "rv:11.0"
	if(Cor.UserAgent.indexOf("mozilla/5.0") >= 0 &&
	   Cor.UserAgent.indexOf("windows nt") >= 0 &&
	   Cor.UserAgent.indexOf("trident") >= 0 &&
	   Cor.UserAgent.indexOf("rv:11.0") >= 0)
	{
		Cor.IsIE11 = true;
	}
	
	// Edge
	if(Cor.UserAgent.indexOf("Edge") >= 0 || Cor.UserAgent.indexOf("edge") >= 0) Cor.IsEdge = true;

	if(Cor.UserAgent.indexOf("OS X") >= 0 || Cor.UserAgent.indexOf("os x") >= 0 || 
	   Cor.UserAgent.indexOf("Macintosh") >= 0 || Cor.UserAgent.indexOf("macintosh") >= 0) Cor.IsMac = true;
	
	// iOS. iPhone and iPad.
	if(Cor.UserAgent.indexOf("iphone") >= 0 || Cor.UserAgent.indexOf("ipad") >= 0) Cor.IsIOS = true;
	
	var url = window.location.href;

	if(url != null)
	{
		// Language
		if(url.indexOf("scribens.com") >= 0 || url.indexOf("index_en.html") >= 0 || url.indexOf("Cor-En.html") >= 0 || url.indexOf("Cor-en-new.html") >= 0 || url.indexOf("plugin-new-en.html") >= 0 || url.indexOf("mobile_en") >= 0 || url.indexOf("tablet_en") >= 0) Cor.IdLangue = "en";
	
		// Desktop.
		if(url.indexOf("index.html") >= 0) Cor.IsDesktop = true;
	
		// Smartphone mode.
		if(url.indexOf("mobile") >= 0) Cor.IsMobile = true;
		
		// Tablet mode.
		if(Cor.UserAgent.indexOf("android") >= 0 && Cor.UserAgent.indexOf("mobile") == -1) Cor.IsTablet = true;
	}
	
	// Warn the user the website doesn't worrk anymore with IE.
	if(Cor.IsIE == true || Cor.IsIE11 == true)
	{
		var txtFr = "Bonjour. Le nouveau site de Scribens n'est pas compatible avec Internet Explorer. Veuillez utiliser un autre navigateur.";
		if(Cor.IdLangue == "en") txtFr = "Hello. The new website of Scribens is not available for Internet Explorer. Please use another browser.";
		
		alert(txtFr);
	}
	
	
	// Type Plugin
	Plugins.Type = Util.GetQueryVariable("plugin");

	// Port du dialogue client/server en Websocket
	Plugins.Port = Util.GetQueryVariable("port");
	
	// Desktop mode
	Cor.IsDesktop = (!Cor.IsTablet && !Cor.IsMobile && (Plugins.Type == null));
	
	// Tomcat Id
	// Ramdomly separate the requests to suport charges. There are 2 instances of Tomcat.
	var nb = Math.ceil(Math.random()*4);
	
	if(nb == 2) Cor.Id_Tomcat = "X2";
	else if(nb == 3) Cor.Id_Tomcat = "X4";
	else if(nb == 4) Cor.Id_Tomcat = "X6";
	
	// Mode Plugin. Lancement de la connexion avec le plugin
	if(Plugins.Type != null)
	{
		// Version du plugin
		var versionPluginSt = Util.GetQueryVariable("version");
		if(versionPluginSt != null) Plugins.VersionPlugin = parseInt(versionPluginSt);
		
		// Plugin Chrome : instances
		Plugins.IdClient = Util.GetQueryVariable("idclient");
		
		// Microsoft Office Windows for desktop.
		if(Cor.IsIE11 && (Plugins.Type == "MSWordWeb" || Plugins.Type == "MSExcelWeb")) Cor.IsMSOfficeWinForDesktop = true;
		
		// Identifiant et mot de passe dans le cas d'un plugin d'intégration.
		var website = Util.GetQueryVariable("website");
		var motDepasse = Util.GetQueryVariable("id");
		
		if(website != null && motDepasse != null)
		{
			Cor.User.Identifiant = "[WEBSITE]" + website;
			Cor.User.MotDePasse = motDepasse;
		}
		
		// Demonstration
		var type = Util.GetQueryVariable("type");
		if(type != null && type == "demo" && Plugins.Type == "Chrome") Plugins.Demo = true;
		
		//PresentationModePlugin.CreateListeLanguesTraduction();
		Plugins.InitModePluginPart1();
		Plugins.LaunchClient();
	}

	Cor.ParameterUrl = Util.GetQueryVariable("key");
	
	Cor.User = new Cor.User();
	
	// Load settings from cookies.
	Options.LoadSettings_FromCookies();
	
	// Init TextArea
	TextEditor.Init_TextArea();

	// Create the panel of solutions
	Cor.PopupPanelSol = new Cor.PopupPanelSol();

	// Create the waiting panel.
	Cor.CreateWaitingPanel();
	
	// Options
	var eltSettingsLabel = document.getElementById('settingsLabel');
	if(eltSettingsLabel != null)
	{
		eltSettingsLabel.addEventListener('click', function()
		{
			if(Cor.WindowOptions == null) Cor.WindowOptions = new Options.WindowOptions();
			
			Cor.WindowOptions.Show();
		});
	}

	// Function Check
	var eltBtnCheck = document.getElementById('check');
	eltBtnCheck.addEventListener('click', function(){Cor.Check(false);});

	// Function indication
	var eltBtnIndications = document.getElementById('indications');
	if(eltBtnIndications != null)
	{
		eltBtnIndications.addEventListener('click', function()
		{
			if(Cor.MessageIndication == null) Cor.MessageIndication = new Util.MessageWindowConfirmation("", 4, "Avertissement");
			Cor.MessageIndication.SetVisible(true);
		});
	}
	
	// Function Sample text
	var eltSampleText = document.getElementById('SampleText');
	if(eltSampleText != null)
	{
		eltSampleText.addEventListener('click', function(){
			Cor.LoadSampleText();
		});
	}
	
	// Register click handlers of buttons.
	Cor.Register_ClickHandlerBtn();
	
	// In english version, show stat and redaction tabs.
	if(Cor.IdLangue == "en")
	{
		// Initialise le mode abonne
		//Cor.InitModeAbonnePremium();
		Cor.InitModeEn();
	}
	
	// Version demo : pas plus loin.
	if(Plugins.Demo == true)
	{
		Cor.User.Identifiant = "DemoChrome";
		return;
	}
	Cor.IsTablet = true;
	// In tablet mode and French, show the button "Copy" and "Paste".
	if(Cor.IdLangue == "fr" && Cor.IsTablet == true)
	{
		$('#copy-tablet').removeClass('hidden');
		$('#paste-tablet').removeClass('hidden');
		
		$('#SampleText').addClass('hidden');
		$('#importing-files').addClass('hidden');
	}
	
	// Confirmation de mail par paramètre passé à l'URL (le mail)
	// Affiche la confirmation de mail
	if(Cor.ParameterUrl != null && Cor.ParameterUrl.length > 0)
	{
		if((Cor.ParameterUrl.indexOf("@") > 0) && (Cor.ParameterUrl.indexOf(".") > 0) &&
		   !(Cor.ParameterUrl.indexOf("@") == 0) && !(Cor.ParameterUrl.indexOf(".") == 0) &&
		   (Cor.ParameterUrl.indexOf("@") != (Cor.ParameterUrl.length - 1)) && (Cor.ParameterUrl.indexOf(".") != (Cor.ParameterUrl.length - 1)))
		{
			// R�initialisation du mot de passe.
			if(Cor.ParameterUrl.indexOf("ReinitMdp_") == 0)
			{
				Cor.User.Identifiant = Cor.ParameterUrl.substring(10);
				
				if(Premium.PopupShiftPasswordI == null) Premium.PopupShiftPasswordI = new Premium.PopupShiftPassword();
				
				Premium.PopupShiftPasswordI.SetVisible(true);
			}
			// Ne plus recevoir d'Email
			else if(Cor.ParameterUrl.indexOf("NoReceiveEmailPremium_") == 0)
			{
				Cor.User.Identifiant = Cor.ParameterUrl.substring(22);
				
				var popup = new Util.MessageWindowConfirmation("<p>Votre demande a bien " + String.fromCharCode(233) + "t" + String.fromCharCode(233) + " prise en compte.</p><p>Vous ne recevrez plus de messages.</p>", 0, "Avertissement");
				popup.SetVisible(true);
				
				Cor.ParameterUrl = null;
				
				// Met à jour la base de données.
				Util.SendHttpRequest('Identification_Servlet',
						[['FunctionName', 'MajData'],
						 ['DataName', 'InfEvolutions'],
						 ['DataValue', '0'],
						 ['TableName', 'abonnement_client'],
						 ['Id', Cor.User.Identifiant]],
						 null);
			}
			// Met � jour la base de donn�es en ajoutant un �l�ment dans la table abonnement.
			else
			{
				// Envoi de l'email de confirmation � l'utilisateur.
				Util.SendHttpRequest('Identification_Servlet',
						[['FunctionName', 'NvInscription'],
						 ['Id', Cor.ParameterUrl]],
						 function(response)
						 {
							var id = response[0];
							var password = response[1];
							
							Util.SendHttpRequest('Identification_Servlet',
									[['FunctionName', 'EstAbonne'],
									 ['Id', id],
									 ['Password', password]],
									 Premium.ResultIdentification);
							
						 });
			}
		}
		// Lien vers mon compte.
		else if(Cor.ParameterUrl == "MonCompte") Cor.MonCompte = true;
	}
		
	// Identification automatique avec les cookies.
	// Attention : on peut charger un cookie uniquement sur le site que l'on charge. Ici, il y a 2 "domaines" : www.scribens.fr et scribens.fr qui ont tout deux 2 cookies IdentificationScribens.  
	// Ici, on consid�re que le cookie IdentificationScribens est uniquement sur www.scribens.fr et non scribens.fr. Dans apache, on redirige donc scribens.fr vers www.scribens.fr
	if(Cor.IdLangue == "fr")
	{
		var valueCookieSt = Util.GetCookie("IdentificationScribens");
		if(valueCookieSt != null && valueCookieSt.length > 0)
		{
			var formerCookies = decodeURIComponent(valueCookieSt);
			var tabSt = formerCookies.split(";");
			// Old version
			if(tabSt.length == 2)
			{
				if(Cor.User.Identifiant.length == 0) Cor.User.Identifiant = tabSt[0];
				if(Cor.User.MotDePasse.length == 0) Cor.User.MotDePasse = tabSt[1];
			}
			// New version
			else
			{
				tabSt = valueCookieSt.split("|");
				if(tabSt.length == 2)
				{
					if(Cor.User.Identifiant.length == 0) Cor.User.Identifiant = tabSt[0];
					if(Cor.User.MotDePasse.length == 0) Cor.User.MotDePasse = tabSt[1];
				}
			}
		}
		
		// To delete
		//Cor.User.Identifiant = "barca34@mail.com";
		//Cor.User.MotDePasse = "geDr:78!F";
		
		//Cor.MonCompte = true;
		
		//Cor.User.Identifiant = "alban.thiebaut@live.fr";
		//Cor.User.MotDePasse = "123456";
		
		//Cor.User.Identifiant = "cc.vv@live.fr";
		//Cor.User.MotDePasse = "abcedf";
	
		// Identification
		if(Cor.User.Identifiant.length > 0 && Cor.User.MotDePasse.length > 0)
		{
			if(Cor.IsMobile == false)
			{
				Cor.CheckConnexion(Cor.User.Identifiant, Cor.User.MotDePasse);
			}
		}
		else
		{
			if(Plugins.Type != null)
			{
				Plugins.FirstIdentification = true;
				
				// Affichage de la fen�tre d'identification
				if(Premium.PopupIdentificationI == null) Premium.PopupIdentificationI = new Premium.PopupIdentification();
				
				Premium.PopupIdentificationI.SetVisible(true);
			}
			
			var pub1 = document.getElementById("pub1");
			if(pub1 != null) pub1.style.display = "block";
			
			if(Cor.IdLangue == "fr")
			{
				var pub2 = document.getElementById("pub2");
				if(pub2 != null) pub2.style.display = "block";
				
				var pub3 = document.getElementById("pub3");
				if(pub3 != null) pub3.style.display = "block";
			}
			
			// Publicite Full Page SublimSkinz.
			// On place le script SublimSkinz dans le body. Dans le passback du script, qui s'execute quand aucune pub fullpage n'est disponible, on affiche la pub haute et droite.
			/*if(Cor.IdLangue == "en" ||
			  (Cor.IdLangue == "fr" && !Cor.IsDesktop))
			{
				var pub1 = document.getElementById("pub1");
				if(pub1 != null) pub1.style.display = "block";
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
					document.body.insertBefore(scriptAdSkin, document.body.firstChild);
					//document.body.appendChild(scriptAdSkin);
				}
				else
				{
					var pub3 = document.getElementById("pub3");
					if(pub3 != null) pub3.style.display = "block";
				}
			}*/
		}
	}
	
	// En mode plugin, � la fin de l'initialisation des Panel, envoie un message au plugin
	if(Plugins.Type != null) Plugins.InitModePluginPart2();

	// Si l'User clqiue sur une publicit� Adword, il est renvoy� � la page de la version premium
	if(Cor.ParameterUrl != null && (Cor.ParameterUrl == "VersionPremium"))
	{
		Cor.Handler_VersionPremium(true, "");
	}
	
	// Redirect to Grammar Rule
	var ref_rule = Util.GetQueryVariable("rule");
	if(ref_rule != null)
	{
		Cor.Handler_Rules(ref_rule);
	}
	
	// Message try our sample.
	if(Cor.IdLangue == "en" && (Plugins.Type == null) && (Cor.IsMobile == false) && (Cor.IsTablet == false))
	{
		var valueCookieSt = Util.GetCookie("PopupEnSampleShown");
		if(valueCookieSt == null || valueCookieSt.length == 0)
		{
			Util.SetCookie("PopupEnSampleShown", "True", 5000);
			
			var msgw = new Cor.PopupMessageEnglish("<p>Welcome to Scribens</p><p>Try our sample text now!</p>", 0);		// Active later with cookies.
			msgw.SetVisible(true);	// https for not disturb in development mode.
		}
		// API message (to enable sometime)
		else
		{
			/*var valueCookieSt = Util.GetCookie("PopupEnAPIMessage");
			if(valueCookieSt == null || valueCookieSt.length == 0)
			{
				Util.SetCookie("PopupEnAPIMessage", "True", 5000);
				
				if(url.indexOf('https') == 0)
				{
					var msgw = new Cor.PopupMessageEnglish("<p>New!</p><p>Add Scribens to your website in 10 minutes with our API!</p>", 1);		// Active later with cookies.
					msgw.SetVisible(true);	// https for not disturb in development mode.
				}
			}*/
		}
	}
	
	// Pub on scribens.fr
	if(Cor.IdLangue == "fr" && (Plugins.Type == null) && (Cor.IsMobile == false) && (Cor.IsTablet == false))
	{
		//if(Cor.IsChrome == true)
		//if(!Cor.IsMozillaF && !Cor.IsEdge)
		//{
			var valueCookieSt = Util.GetCookie("PopupFrPub1");
			if(valueCookieSt == null || valueCookieSt.length == 0)
			{
				Util.SetCookie("PopupFrPub1", "True", 5000);
				
				var msgw = new Cor.PopupFrPub(1);
				msgw.SetVisible(true);
			}
		//}
	}
	
	// Windows load event.
	window.onload = function()
	{
		Cor.Window_Loaded = true;
		
		// MSEdge. Must blur before.
		if(Cor.IsEdge)
		{
			TextEditor.Document.body.blur();
			
			TextEditor.Document.body.addEventListener('focus', function(){
				if((this.innerHTML == TextEditor.TextPlaceHolder_Fr && Cor.IdLangue == "fr") ||
				   (this.innerHTML == TextEditor.TextPlaceHolder_En && Cor.IdLangue == "en"))
				{
					this.innerHTML = "<p></p>";
				}
			});
		}
	}
	
	// Window focus event
	window.onfocus =  function()
	{
		// Hide sol popups
		if(Cor.MouseOverItemSolution == false)
		{
			Cor.PopupPanelSol.SetVisible(false, false, false, true);
		}
		
		// Focus event for plugins
		if(Plugins.Type != null) Plugins.FocusMainWindow();
	}
	
	// Tablet: autocorrect by default.
	if(Cor.IsTablet == true) Cor.AutoCorrect_AfterPaste = true;
	
	// Test Mac extension
	if(Cor.IdLangue == "fr")
	{
		var pub3 = document.getElementById("pub3");
		if(pub3 != null)
		{
			pub3.style.cursor = "pointer";
			pub3.onclick = function()
			{
				if(Cor.ModeAbonnePremium == false)
				{
					//Cor.Handler_Test_Ext();	// Test extensions
					Cor.Handler_Proofreading();		// Proofreading
				}
			}
		}
	}
	
	// Import file button.
	var importButton = document.getElementById("Input_ImportFile");
	if(importButton)
	{
		importButton.onchange = function(){Cor.ImportFile();}
	}
	
	// Copy button
	var copyButton = document.getElementById("copy-clipboard");
	if(copyButton)
	{
		copyButton.onclick = function()
		{
			Cor.CopyClipboard();
			//$('#actions').addClass('hidden');
			//var elt = document.getElementById("ListActions");
			//elt.style.visibility = "hidden";
			//elt.style.display = "none";
			
		}
	}
	
	// Paste button
	var pasteButton = document.getElementById("paste-clipboard");
	if(pasteButton)
	{
		pasteButton.onclick = function(){Cor.Paste();};
	}
	
	// Print button
	var printButton = document.getElementById("print-textarea");
	if(printButton)
	{
		printButton.onclick = function(){Cor.Print();}
	}
	
	// Download button
	var downloadButton = document.getElementById("download");
	if(downloadButton)
	{
		downloadButton.onclick = function()
		{
			if(Cor.DownloadPopupI == null) Cor.DownloadPopupI = new Cor.DownloadPopup();
			
			document.querySelector('.popaction').classList.add("openpop");
			
			var downloadSelector = document.querySelector('.popaction .closer');
			if(downloadSelector)
			{
				downloadSelector.onclick = function() {document.querySelector('.popaction').classList.remove("openpop");}; 
			}
		}
	}
	
	// Share button
	var printButton = document.getElementById("print-textarea");
	if(printButton)
	{
		printButton.onclick = function(){Cor.Print();}
	}
	
	// Share button
	var shareButton = document.getElementById("share");
	if(shareButton)
	{
		shareButton.onclick = function()
		{
			if(Cor.SharePopupI == null) Cor.SharePopupI = new Cor.SharePopup();
			
			var shareCloser = document.querySelector('.popaction.share-pop .closer');
			if(shareCloser)
			{
				shareCloser.onclick = function() {document.querySelector('.popaction.share-pop').classList.remove("openpop");}; 
			}
			
			Cor.Share();
		}
	}
	
	//////////////////////////////////////////
	// Panneaux pour l'affichage des groupes
	//////////////////////////////////////////
	
	if(Cor.ModeDebug == true)
	{
		// Resize TinyMce
		var frameTx = document.getElementById("FrameTx");
		frameTx.style.height = "200px";
		
		//var tdTaInc = document.createElement("td");
		var taInc = document.createElement("textarea");
		taInc.style.width = "600px";
		taInc.style.height = "100px";
		taInc.style.fontSize = "12px";
		taInc.id = "TaInc";
		//tdTaInc.appendChild(taInc);
		var table1 = document.createElement("table");
	
		var tdTaGN = document.createElement("td");
		var taGN = document.createElement("textarea");
		taGN.style.width = "300px";
		taGN.style.height = "100px";
		taGN.style.fontSize = "12px";
		taGN.id = "TaGN";
		tdTaGN.appendChild(taGN);
		table1.appendChild(tdTaGN);
		
		var tdTaGV = document.createElement("td");
		var taGV = document.createElement("textarea");
		taGV.style.width = "300px";
		taGV.style.height = "100px";
		taGV.style.fontSize = "12px";
		taGV.id = "TaGV";
		tdTaGV.appendChild(taGV);
		table1.appendChild(tdTaGV);
	
		var table2 = document.createElement("table");
	
		var tdTaGA = document.createElement("td");
		var taGA = document.createElement("textarea");
		taGA.style.width = "300px";
		taGA.style.height = "100px";
		taGA.style.fontSize = "12px";
		taGA.id = "TaGA";
		tdTaGA.appendChild(taGA);
		table2.appendChild(tdTaGA);
		
		var tdTaSub = document.createElement("td");
		var taSub = document.createElement("textarea");
		taSub.style.width = "300px";
		taSub.style.height = "100px";
		taSub.style.fontSize = "12px";
		taSub.id = "TaSub";
		tdTaSub.appendChild(taSub);
		table2.appendChild(tdTaSub);
		
		var textAreaDiv = document.getElementById("TextArea");
		textAreaDiv.style.verticalAlign = "top";
		textAreaDiv.align = "center";
		
		textAreaDiv.appendChild(taInc);
		textAreaDiv.appendChild(table1);
		textAreaDiv.appendChild(table2);
	}
	
});
	
	

var Cor = {

// Mode debug
ModeDebug : false,
	
// Indique s'il s'agit de la 1ere requete ou non.
WriteRequest : true,
CntRequest30 : 1,

selectedItemTextPrev : "Orthographe",

TabSelectedTextPrev : 0,

AfterSucess : false,

// D�clare si le texte a �t� modifi�
TexteModified : false,

// Set if this is the first request
FirstRequest : true,

// Timer de progression.
TimerProgression : null,

// Type d'abonne
ModeAbonnePremium : false,

// Init Mode abonne
InitModeAbonne : false,

// Set if we must show the account first.
MonCompte : false,

// MaxId pour assigner des valeurs d'id aux mots et au phrases
IdMax : "0",

// Version de D�monstration.
Demo : false,

MsgIdInvalide : false,

// Indicator of window loaded
Window_Loaded : false,

// Timer qui envoie le signal d'identification � intervale r�gulier
TimerIdentification : null,

// Parametre de l'URL. Pour la confirmation des mails.
ParameterUrl : null,

// MSOffice for desktop on Windows.
IsMSOfficeWinForDesktop : false,

// UserAgent.
UserAgent : "",

// Desktop
IsDesktop : false,

// Mode smartphone
IsMobile : false,

// Mode tablet
IsTablet : false,

// D�termine si la connexion au compte est active.
Connexion : false,

// Set if it is checking
IsChecking : false,

// Informations User
User : null,

// Settings
WindowOptions : null,

// Option chain.
OptionsCorSt : 'Genre_Je:0|Genre_Tu:0|Genre_Nous:0|Genre_Vous:0|Genre_On:0|RefOrth:0|UsBr:-1',

// Option autocorrect after paste.
AutoCorrect_AfterPaste : false,

// Message indication
MessageIndication : null,

//// Cor variables.

// Id de la phrase à corriger
IdPhraseACorriger : "",

// Ensemble des solutions
MapMotsSolution : new Map(),

// Liste des Id du document
SetId : new Set(),

// Ensemble des éléments surlignés
SetElementsSurlignes : new Set(),

// Map des phrases
MapPhrases : new Map(),

// Map des phrases
VectIdPhrases : [],
VectIdPhrasesTmp : [],
	
// Ensemble des phrases modifiés
SetIdPhModifies : new Set(),

// Ensemble des phrases considérées non propres.
SetPhrasesNonPropres : new Set(),

// Ensemble des String des P
VectPSt : [],

// IHM

// Popup of solutions
PopupPanelSol : null,

// Panel of maximum character
PanelMaxCharI : null,

// Label of maximum character. Only for smartphone.
LabelMaxCharI : null,

// Set of on mouse ove rthe solution item
MouseOverItemSolution : false,

// Download popup
DownloadPopupI : null,

// Share popup
SharePopupI : null,

// Type of browsers
IsMozillaF : false,
IsChrome : false,
IsIE : false,		// IE autre que 11 
IsIEBefore10 : false,	// Set if navigator is IE before 10.
IsIE8 : false,
IsIE9 : false,
IsIE10 : false,
IsIE11 : false,
IsSafari : false,
IsEdge : false,
IsMac : false,
IsIOS : false,	// iPhone and iPad

// Langue de la page.
IdLangue : 'fr',

// Tomcat_Id
Id_Tomcat : 'Scribens',

// Check function
Check : function (isSample)
{
	// If place holder is here, then cancel.
	if((TextEditor.Document.body.innerHTML == TextEditor.TextPlaceHolder_Fr && Cor.IdLangue == "fr") ||
	   (TextEditor.Document.body.innerHTML == TextEditor.TextPlaceHolder_En && Cor.IdLangue == "en"))
	{
		return;
	}
	
	$('.sidebar').addClass("hidden");
	if(Cor.IsChecking == false)
	{
		Cor.IsChecking = true;
		
		// En mode plugin,,déduit les paragraphes modifiés gràce aux phrases modifiés.
		if(Plugins.Type != null) Plugins.DefinePModifiesWithPhModifies();
					
		Cor.SendCorRequest(isSample);

		// $("#ChoiceStatSyn").removeClass("hidden");

		// $("#DivDisplayStyle").addClass('open');
	}
},

// Send a correction request.
SendCorRequest : function(isSampleText)
{
	if(Plugins.Type != null && Cor.InitModeAbonne == false && Cor.Demo == false) return;
	
	// Désactive des composants IHM du panel cor.
	Cor.SetVisible_All(false, true);
	
	// Sauvegarde la position de la scrollBar
	//ScrollPosition = PresentationCorUtil.GetScrollPosition();
	
	var texteModified = "";
	// 1re requete : texte en entier
	if(Cor.FirstRequest == true)
	{
		if(Plugins.Type == null) texteModified = TextEditor.GetTotalContent(Cor.FirstRequest);
		else texteModified = TextEditor.GetTotalContentPlugin();
		
		//if(Plugins.Type == null) texteModified = Cor.TinyMcePanel.TinyMce.getTotalContent();
		//else texteModified = Cor.TinyMcePanel.TinyMce.getTotalContentHTML();
	}
	// Autress requetes : paragraphes modifiés entourés des (Ecart - 1) paragraphes.
	else
	{
		// Inf de debug très utile
		//SortedSet<String> set = PresentationCorUtil.SetIdPhModifies;
		if(Plugins.Type == null)
		{
			// En cas d'ajout de paragraphes, fusionne les paragraphes pour simplifier tout.
			// Creer des balises de phrases sur les textNode
			Util.HarmoniserTexte();
			
			// Ajoute par comparaison des id des phrases avant et après
			Util.SetPhrasesModifies();
		
			texteModified = Util.GetTexteTransf();
			
			//alert(texteModified);
		}
		else
		{
			// Dans le cas des plugins ou on ne peux pas faire de retour à la ligne, il peux y avoir des P vides, sans balise de phrase. Ils doivent être des P modifiés.
			// Ex : on crée 3 paragraphes -> correction -> sur la fenêtre du plugin -> suppression manuelle du 2nd paragraphe -> ajout de caractères, on a supprimé la balise de phrase.
			Util.PSansPhraseModifie();
			texteModified = Util.GetTexteTransfPlugin();
		}
	}
	
	// En dessous de 10 000, le simple panel d'attente suffit.
	var progression = false;
	if(texteModified.length < 10000 || !Cor.ModeAbonnePremium || Cor.IsMobile == true)
	{
		Cor.SetVisible_PanelWait(true, false);
	}
	// Après 10 000, on affiche le panel de progression
	else
	{
		progression = true;
		Cor.SetVisible_PanelWait(true, true);
		Cor.SetProgressBar_Value(0);
		
		// Initialisation de la progression
		Util.SendHttpRequest('Progression_Servlet',
						[['FunctionName', 'InitProgression']],
						 null);
		
		// Requete de demande de progression
		Cor.TimerProgression = setInterval(function()
		{
			Util.SendHttpRequest('Progression_Servlet',
						[['FunctionName', 'GetProgression']],
						 function(response)
						 {
							// Set the progression value.
							Cor.SetProgressBar_Value(response);
							$('.progress-bar-container .progress-bar').width(response + '%');
						 });
		}, 1000);
	
	}
	
	// TexteStat
	// At first request and each time the user click on stats radio box.
	var texteStat = "";
	if(Cor.ModeAbonnePremium == true)
	{
		if(Cor.FirstRequest == true ||
		   Stat.UpdatedStat == false ||
		  (Style.StatView == true && Cor.SetIdPhModifies.size > 0))		// Recheck in Stat View. If modified P, then recheck the stats.
		{
			texteStat = TextEditor.GetTotalContent(Cor.FirstRequest);
		}
		
		if(Cor.SetIdPhModifies.size > 0) Stat.UpdatedStat = false;
	}
	
	// Lance un timer au bout de 30min
	if(!Cor.ModeAbonnePremium)
	{
		if(Cor.WriteRequest == true)
		{
			Cor.WriteRequest = false;
			
			// Lance le timer
			setTimeout(function() {
					
				Cor.CntRequest30++;
				Cor.WriteRequest = true;	// On peut réécrire après 30min
				
			}, 1800000);
		}
	}
	
	// Launch the request
	if(Cor.User.Identifiant.indexOf("[WEBSITE]") == 0) Cor.User.MotDePasse = Cor.GenerationMotDePasseWebSite();
	
	Util.SendHttpRequest('TextSolution_Servlet',
						[['FunctionName', 'GetTextSolution'],
						 ['texteHTML', texteModified],
						 ['texteStat', texteStat],
						 ['IdMax', Cor.IdMax],
						 ['IdMaxSousGroupeRep', ((Style.StyleText == null) ? '0' : Style.StyleText.IdMaxSousGroupeRep)],
						 ['writeRequest', Cor.WriteRequest],
						 ['cntRequest30', Cor.CntRequest30],
						 ['firstRequest', Cor.FirstRequest],
						 ['progression', progression],
						 ['charPrecPh', -1],
						 ['optionsCor', Cor.OptionsCorSt],
						 ['optionsStyle', Style.OptionsStyleSt],
						 ['ensIdRepetitions', Style.GetIdRepetitions(false)],
						 ['ensIdRepetitions2mPh', Style.GetIdRepetitions(true)],
						 ['corSt', 'false'],
						 ['plugin', 'false'],
						 ['identifier', Cor.User.Identifiant],
						 ['password', Cor.User.MotDePasse],
						 ['langId', Cor.IdLangue],
						 ['isSampleText', isSampleText],
						 ['modePlugin', Plugins.Type]],
						 Cor.ApplySolution);
						 
},

// Au remplacment de la dernière solution de la phrase, on refait une vérification de la phrase
VerifierCorrectionPhrase : function(phraseSt, idPhrase, phrasePrecSt)
{
	Cor.IdPhraseACorriger = idPhrase;
	
	var cPrecPhrase = -1;
	if(phrasePrecSt.length > 0) cPrecPhrase = phrasePrecSt.charCodeAt(phrasePrecSt.length - 1);
	
	// Désactive des composants IHM du panel cor.
	Cor.SetVisible_All(false, false);
	
	phraseSt = "<p>" + phraseSt + "<p>";
	
	// Launch the request
	if(Cor.User.Identifiant.indexOf("[WEBSITE]") == 0) Cor.User.MotDePasse = Cor.GenerationMotDePasseWebSite();
	
	Util.SendHttpRequest('TextSolution_Servlet',
						[['FunctionName', 'GetTextSolution'],
						 ['texteHTML', phraseSt],
						 ['texteStat', ''],
						 ['IdMax', Cor.IdMax],
						 ['IdMaxSousGroupeRep', ((Style.StyleText == null) ? '0' : Style.StyleText.IdMaxSousGroupeRep)],
						 ['writeRequest', 'false'],
						 ['cntRequest30', '1'],
						 ['firstRequest', 'false'],
						 ['progression', 'false'],
						 ['charPrecPh', cPrecPhrase],
						 ['optionsCor', Cor.OptionsCorSt],
						 ['optionsStyle', Style.OptionsStyleSt],
						 ['ensIdRepetitions', Style.GetIdRepetitions(false)],
						 ['ensIdRepetitions2mPh', Style.GetIdRepetitions(true)],
						 ['corSt', 'true'],
						 ['plugin', 'false'],
						 ['identifier', Cor.User.Identifiant],
						 ['password', Cor.User.MotDePasse],
						 ['langId', Cor.IdLangue],
						 ['isSampleText', 'false'],
						 ['modePlugin', Plugins.Type]],
						 Cor.ApplySolution);

},

// Apply changes of the solution
ApplySolution : function(textSolution)
{
	if(Cor.ModeAbonnePremium == true || Cor.IdLangue == "en") {
		$('.sidebar').removeClass("hidden");
		$('.sidebar').show();
		if (!$('.Transf-CadreGridSyn').hasClass('open') && !$('.Stat-StatTextePanel').hasClass('open')) {
			$("#ChoiceStatSyn").removeClass("hidden");
			$('#DivDisplayStyle').show();
		}
	}
	if(textSolution.LimiteNbChar == -1)
	{
		// IdMax
		Cor.IdMax = textSolution.IdMax;
		
		// Problème de remplacement plugin. On ne vérifie pas. Le GetText le fait.
		if(Plugins.Type != null && Plugins.PbRemplacement == true)
		{
			Plugins.PbRemplacement = false;
			return;
		}
		
		// Progression. On annule le timer par sécurité.
		if(Cor.TimerProgression != null) window.clearInterval(Cor.TimerProgression);
		
		// Remplit la map des mots des solutions.
		for (var key in textSolution.SolutionCor.MapMotSolution)
		{
			Cor.MapMotsSolution.set(key, textSolution.SolutionCor.MapMotSolution[key]);
		}
		
		// Panneau de debug
		if(Cor.ModeDebug == true) Cor.FillTextAreaGroupe(textSolution);
		
		// Actives les composants IHM
		Cor.SetVisible_All(true, true);
		
		// Show the textArea.
		Cor.SetVisible_PanelWait(false, false);
		
		var allText = false;
					
		// Place le texte
		// 1re requete : place le texte en entier
		if(textSolution.VectPartText.length == 0)
		{
			// Correction normale
			if(Cor.IdPhraseACorriger.length == 0 && (Cor.FirstRequest || textSolution.IsSample))
			{
				//textSolution.TexteSolution = texteSolution.TexteSolution.replace(" ", "&nbsp;");
				
				// Comme SetTextHTML mais ne provoque pas de focus.
				// Exclusivement réservé à un bug de FF. Le setContent provoque un focus. La position du range de la sélection est mauvaise une fois le focus apparu.
				if(Plugins.Type != null && (Cor.IsMozillaF/* || Cor.IsIE || Cor.IsIE11*/))
				{
					textSolution.TexteSolution = textSolution.TexteSolution.replace("<html>\n <head></head>\n <body>\n  ", "");
					textSolution.TexteSolution = textSolution.TexteSolution.replace("\n </body>\n</html>", "");
					textSolution.TexteSolution = textSolution.TexteSolution.replace(new RegExp("\n  ", "g"), "");
					if((Plugins.Type != "MSWord") && (Plugins.Type != "MSWordOSX") && (Plugins.Type != "MSWordWeb") && (Plugins.Type != "GoogleDocs") && (Plugins.Type != "OOWriter")) textSolution.TexteSolution = Util.ReplacePVide(textSolution.TexteSolution);
					TextEditor.SetTextHTMLFirstFF(textSolution.TexteSolution);
				}
				else TextEditor.SetTextHTML(textSolution.TexteSolution);
				
				allText = true;
			}
			// Correction d'une phrase
			if(Cor.IdPhraseACorriger.length > 0)
			{
				// Formate le texte
				textSolution.TexteSolution = textSolution.TexteSolution.replace("<html>\n <head></head>\n <body>\n  <p>", "");
				textSolution.TexteSolution = textSolution.TexteSolution.replace("</p>\n  <p></p>\n </body>\n</html>", "");
				
				Util.ReplacePhraseACorriger(textSolution.TexteSolution, Cor.IdPhraseACorriger);
				
				// Remplit la map des éléments uniquement ceux de la nouvelle phrase ajoutée (et la phrase elle-même) par souci d'économie.
				var idNvPhrase = "";
				var indSpan = textSolution.TexteSolution.indexOf("span");
				if(indSpan > -1)
				{
					var indSpan2 = textSolution.TexteSolution.indexOf("\"", indSpan + 9);
					if(indSpan2 > -1) idNvPhrase = textSolution.TexteSolution.substring(indSpan + 9, indSpan2);
				}
				Util.ConstruitMapElementsPhrase(idNvPhrase);
				
				// Surligne les mots de solution
				//if(!Cor.ModeAbonnePremium || 
				//   (Cor.TabPanel.getWidgetIndex(Cor.TabPanel.getActiveWidget()) == 0))
				{
					Util.SurligneElts_Cor(textSolution.SolutionCor.MapMotSolution);
				}
				
				// Remplit la map des phrases avec la nouvelle phrase.
				Util.FillMapPhrasePh(idNvPhrase);
				// Remplace l'ancien id par le nouveau dans le vecteur des phrases
				Util.ReplaceIdVectIdPhrase(Cor.IdPhraseACorriger, idNvPhrase);
				
				Cor.IdPhraseACorriger = "";
			}
		}
		// Remplit les parties de paragraphes modifiés
		else
		{
			for(var i = 0; i < textSolution.VectPartText.length; i++)
			{
				var partText = textSolution.VectPartText[i];
				// partText.TexteHtML = "<p>" + partText.TexteHtML + "</p>"; 
				partText.TexteHtML = partText.TexteHtML.replace(new RegExp("\n  ", "g"), "");

				if(Plugins.Type == null) Util.ReplacePartText(partText.IdPhraseStart, partText.IdPhraseEnd, partText.TexteHtML);
				else
				{
					partText.TexteHtML = "<p>" + partText.TexteHtML + "</p>";
					if(Cor.IsMozillaF && (Plugins.Type != "MSWord") && (Plugins.Type != "MSWordOSX") && (Plugins.Type != "MSWordWeb") && (Plugins.Type != "GoogleDocs") && (Plugins.Type != "OOWriter")) partText.TexteHtML = Util.ReplacePVide(partText.TexteHtML);
					Util.ReplacePartTextPlugin(partText.IdPhraseStart, partText.IdPhraseEnd, partText.TexteHtML);
				}
			}
		
			allText = true;
		}
		
		// Pour IE, il faut cacher le focus du texte, car probl�mes de lignes.
		if(Plugins.Type != null && (Cor.IsIE || Cor.IsIE11))
		{
			window.focus();
		}
		
		// Remplit le set des phrases non propres
		textSolution.SetPhrasesNonPropres.forEach(function(phraseSt)
		{
			Cor.SetPhrasesNonPropres.add(phraseSt);
		});
		
		if(allText == true)
		{
			// D�surligne les mots de solution. Avant de construire le set des id, car la suprression des balises de surlignage simplifient la recherche des id.
			//if(!Cor.ModeAbonnePremium || (Cor.TabPanel.getWidgetIndex(Cor.TabPanel.getActiveWidget()) == 0))
			//{
			Util.DeSurligne();
			//}
			
			// Construit la liste des �l�ments (optimisation)
			Cor.SetId.clear();
			// Reconstruit la liste des Id en parsant le texte.
			Util.ConstruitMapElements();
			// Supprime les anciens id plus utilis�s. Optimisation pour la rapidit� et la m�moire.
			Util.SuppAncienCorId();
		
			// Underline word solutions.
			// Surligne les mots de solution
			//if(!Cor.ModeAbonnePremium || (Cor.TabPanel.getWidgetIndex(Cor.TabPanel.getActiveWidget()) == 0))
			//{
			Util.SurligneElts_Cor(null);
			//}
			
			// Scroll to Top. Ajouter du texte � TinyMce descends la scrollBar
			Util.ScrollToPos(0);
			
			// Remplit la map des phrases.
			Cor.VectIdPhrases = [];
			Util.FillMapPhrase();
		}
		
		// Vide certains set
		Cor.SetIdPhModifies.clear();
		if(Plugins.Type != null)
		{
			Plugins.SetPModifies.clear();
			Plugins.SetPIntacts.clear();
		}
		
		if(Cor.ModeAbonnePremium)
		{
			// 2. Complete le panel Style
			Style.OnSuccessStyle(textSolution.StyleText);
			
			// 3. Complete le panel Stat
			Stat.OnSuccessStat(textSolution.StatText);
			
			// If stat == null, hide the stat panel
			if(textSolution.StatText == null)
			{
				if(Cor.IsMobile == false)
				{
					// Hide the panel stat.
					Stat.PanelStat.style.display = "none";
					
					var checkBoxSyn = document.getElementById("checkBoxStat");
					checkBoxSyn.checked = false;
				}
			}
			
			// In plugin mode, show the style panel only after first check.
			if(Plugins.Type != null && Cor.FirstRequest == true)
			{
				var divStyle = document.getElementById("StyleTexte");
				divStyle.style.display = "block";
			}
		}
		
		// Hide the label of Max character (only for Smartphone)
		if(Cor.LabelMaxCharI != null) Cor.LabelMaxCharI.SetVisible(false);
		
		Cor.TexteModified = false;
		
		// Si le texte est correct, afficher un label pour le signaler.
		Util.VerificationErreurExiste();
	}
	// Limitation character exceeded
	else
	{
		// Show components
		Cor.SetVisible_All(true, true);
		
		if(Cor.IsMobile == false)
		{
			if(Cor.PanelMaxCharI == null) Cor.PanelMaxCharI = new Cor.PanelMaxChar();
			Cor.PanelMaxCharI.SetLimChar(textSolution.LimiteNbChar);
			Cor.PanelMaxCharI.SetVisible(true);
		}
		// Smartphone
		else
		{
			if(Cor.LabelMaxCharI == null) Cor.LabelMaxCharI = new Cor.LabelMaxChar();
			Cor.LabelMaxCharI.SetVisible(true);
			
			Cor.SetVisible_PanelWait(false, false);
		}
	}
	
	// FirstRequest
	Cor.FirstRequest = false;
	
	Cor.IsChecking = false;
	
},

// Load sample text
LoadSampleText : function()
{

	// Launch the request
	Util.SendHttpRequest('TextSolution_Servlet',
						[['FunctionName', 'GetTextSample'],
						 ['langId', Cor.IdLangue]],
						 function(response)
						 {
							TextEditor.SetTextHTML(response);
						
							// iPhone and iPad. Cancel any action on the keyboard because the textarea musn't editable. (auto spellcheck problem)
							if(Cor.IsIOS == true && (Cor.IsMobile == true || Cor.IsTablet == true))
							{
								TextEditor.ExplanationPasteText = false;
								TextEditor.Document.body.setAttribute("contenteditable", "false");
								TextEditor.Document.body.style.cursor = "default";
							}
							if(Cor.ModeAbonnePremium == false) {
								if($('#ChoiceStatSyn tr.active').length <= 0) {
									$('#DivDisplayStyle').addClass('open');
									$('#ChoiceStatSyn tr:first-child').addClass('active');
								}
								$("#ChoiceStatSyn").removeClass('hidden');
							}
							
							Cor.Check(true);
						 });
	
},

// Click on connexion button
Handler_Connexion : function()
{
	if(!Cor.IsChecking)
	{
		// Hide sol popups
		Cor.PopupPanelSol.SetVisible(false, false, false, true);
	
		// Connexion
		if(Cor.Connexion == false)
		{
			if(Premium.PopupIdentificationI == null) Premium.PopupIdentificationI = new Premium.PopupIdentification();
			
			Premium.PopupIdentificationI.SetVisible(true);
		}
		// D�connexion
		else
		{
			Premium.Deconnexion();
		}
	}
},

// Check the connexion
CheckConnexion : function(id, password)
{
	Util.SendHttpRequest('Identification_Servlet',
						[['FunctionName', 'EstAbonne'],
						 ['Id', id],
						 ['Password', password]],
						 Premium.ResultIdentification);

},

InitModeEn : function()
{
	// Se place en mode abonn�
	Cor.ModeAbonnePremium = true;
	Cor.InitModeAbonne = true;
	
	// Initialisation du panneau des transformations
	Style.Init();
	
	// Initialisation du panneau de statistique de gauche
	Stat.Init();
	
	// Show Style panel
	var divStyle = document.getElementById("StyleTexte");
	if(divStyle != null)
	{
		if(Plugins.Type == null) divStyle.style.display = "block";	// For plugin, show only after first check
	}
	
	// Show the pub1
	var pub1 = document.getElementById("pub1");
	if(pub1 != null)
	{
		pub1.style.display = "block";
	}
	
	//SHOW ACTIONS BUTTONS IF PREMIUM
	$('#actions').removeClass('hidden');
	
	//document.getElementById("pub3").style.visibility = "hidden";
},

// Informations g�n�rales sur le user
User : function()
{
	// UserName
	this.UserName = "";	
	// Identifiant (=Email)
	this.Identifiant = "";
	// Mot de passe (Mot de passe)
	this.MotDePasse = "";			
	// Type d'abonnement
	this.TypeAbonnement = "";
	// Date d'expiration de l'abonnement
	this.DateExpiration = "";
	// Date d'expiration du dernier d'abonnement
	this.DateExpirationDernierAbn = "";
	// Ancien Tarif
	this.AncienTarif = false;
	// InfEvolution
	this.InfEvolutions = false;
	// Settings of the user
	this.Settings = "";
	// RecurringPayment
	this.RecurringPayment = false;
	// Payment by card
	this.PaymentByCard = false;
	// Payment by Smartphone
	this.PaymentBySmartphone = false;
},

// G�n�re un mot de passe pour l'int�gration aux sites web.
GenerationMotDePasseWebSite : function()
{	
	var date = new Date();

	// Combinaison : (Hours + Day + Year + Month) * Minutes.
	var n = (date.getUTCHours() + date.getUTCDate() + date.getUTCFullYear() + date.getUTCMonth()) * date.getUTCMinutes();
	n = n * 17;
	
	return n.toString();
	
	// Combinaison : (Hours + Day + Year + Month) * Minutes en UTC.
	//Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
	//int n = (cal.get(Calendar.HOUR_OF_DAY) + cal.get(Calendar.DAY_OF_MONTH) + cal.get(Calendar.YEAR) + cal.get(Calendar.MONTH))*cal.get(Calendar.MINUTE)*17;
	
	//return String.valueOf(n);
},

// Replit les panneaux de texte avec les groupes
FillTextAreaGroupe : function(textSolution)
{
	var taInc = document.getElementById("TaInc");
	taInc.value = textSolution.SolutionCor.EnsGroupeSt.ChTypesMot;

	// Debugger
	var taGN = document.getElementById("TaGN");
	var listeGN = "GN";
	listeGN += "\n";
	
	for(var i = 0; i < textSolution.SolutionCor.EnsGroupeSt.VectGroupeNominalSt.length; i++)
	{
		listeGN += textSolution.SolutionCor.EnsGroupeSt.VectGroupeNominalSt[i];
		listeGN += "\n";
	}
		
	taGN.value = listeGN;
	
	var taGV = document.getElementById("TaGV");
	var listeGV = "GV";
	listeGV += "\n";
	
	for(var i = 0; i < textSolution.SolutionCor.EnsGroupeSt.VectGroupeVerbeSt.length; i++)
	{
		listeGV += textSolution.SolutionCor.EnsGroupeSt.VectGroupeVerbeSt[i];
		listeGV += "\n";
	}
	
	TaGV.value = listeGV;
		
	var taGA = document.getElementById("TaGA");
	var listeGA = "GA";
	listeGA += "\n";
	
	for(var i = 0; i < textSolution.SolutionCor.EnsGroupeSt.VectGroupeAdjectifSt.length; i++)
	{
		listeGA += textSolution.SolutionCor.EnsGroupeSt.VectGroupeAdjectifSt[i];
		listeGA += "\n";
	}
		
	taGA.value = listeGA;

	var taSub = document.getElementById("TaSub");
	var listeSub = "Prop";
	listeSub += "\n";
	
	for(var i = 0; i < textSolution.SolutionCor.EnsGroupeSt.VectGroupeSubSt.length; i++)
	{
		listeSub += textSolution.SolutionCor.EnsGroupeSt.VectGroupeSubSt[i];
		listeSub += "\n";
	}
		
	taSub.value = listeSub;
},

// IHM //

Register_ClickHandlerBtn : function()
{
	// Bouton orthographe
	var btnCor = document.getElementById('btnorth');
	if(btnCor != null)
	{
		btnCor.addEventListener("click", function()
		{
			Cor.Handler_Orthographe();
		});
	}

	// Bouton Dictionary
	var btnDictionnary = document.getElementById('btndict');
	if(btnDictionnary != null)
	{
		btnDictionnary.addEventListener("click", function()
		{
			Cor.Handler_Dictionnary();
		});
	}
	
	// Bouton Rules
	var btnRules = document.getElementById('btnreg');
	if(btnRules != null)
	{
		btnRules.addEventListener("click", function()
		{
			Cor.Handler_Rules(null);
		});
	}
	
	// Extension
	var btnExt = document.getElementById('btnext');
	if(btnExt != null)
	{
		btnExt.addEventListener("click", function()
		{
			Cor.Handler_ExtensionAPIEn();
		});
	}
	
	if((Cor.IdLangue == "fr") &&
	   (Plugins.Type == null))
	{
		// Bouton VersionPremium
		var btnVersionPremium = document.getElementById('btnvp');
		if(btnVersionPremium != null)
		{
			btnVersionPremium.addEventListener("click", function()
			{
				Cor.Handler_VersionPremium(false, "");
			});
		}
		
		// Bouton connexion
		var btnConnexion = document.getElementById('btncn');
		if(btnConnexion != null)
		{
			btnConnexion.addEventListener("click", function()
			{
				Cor.Handler_Connexion();
			});
		}
	}
	
	// Button of plugin test. Redirect to the page of plugin presentation.
	var btnPluginTest = document.getElementById('btnPluginTest');
	if(btnPluginTest)
	{
		btnPluginTest.addEventListener("click", function()
		{
			Cor.Handler_Test_Ext();
		});
	}
	
	// Button of plugin english. Redirect to the page of extensions presentation.
	var btnDownloadPluginEn = document.getElementById('btn-download-plugins');
	if(btnDownloadPluginEn)
	{
		btnDownloadPluginEn.addEventListener("click", function()
		{
			Cor.Handler_BtnExtensionsAPI(false);
		});
	}
	
	// Button of API english. Redirect to the page of extensions presentation.
	var btnAPIEn = document.getElementById('btn-download-api');
	if(btnAPIEn)
	{
		btnAPIEn.addEventListener("click", function()
		{
			Cor.Handler_BtnExtensionsAPI(true);
		});
	}
	
	// Bouton proofreading
	var btnProofreading = document.getElementById('btnpr');
	if(btnProofreading != null)
	{		
		btnProofreading.addEventListener("click", function()
		{
			Cor.Handler_Proofreading();
		});
	}
	
	// Mode smartphone
	var btn_paste = document.getElementById('btn_paste');
	if(btn_paste != null)
	{
		btn_paste.addEventListener("click", function()
		{
			TextEditor.Handler_Paste();
		});
	}
	var btn_copy = document.getElementById('btn_copy');
	if(btn_copy != null)
	{
		btn_copy.addEventListener("click", function()
		{
			TextEditor.Handler_Copy();
		});
	}
},

// Handler cor
Handler_Orthographe : function()
{
	//REMOVE CLASS FLEX WHEN NOT ON ORTOGRAPHE
	$('.ortho-flex').addClass('flex');

	var mainDiv = document.getElementById("MainDiv");

	//DISPLAY SIDEBAR WHEN ON GRAMMAR CHECK TABS
	if(Cor.ModeAbonnePremium == true) {
		$('.sidebar').show();
	}

	if(Cor.ModeAbonnePremium == false) {
		$('.side-pub').show();
	}
	//ADD CLASS TO BODY FOR DISTINCTION / USED IN CSS
	$('body').attr('id', 'ortographe');
	$('.menu-header .nav a').removeClass('selected');
	$('.menu-header .nav a#btnorth').addClass('selected');
	
	document.getElementById("PanelBtn").style.display = "block";
	document.getElementById("TextArea").style.display = "block";
	document.getElementById("Titre").style.display = "block";
	
	if(mainDiv.lastChild.id != null && mainDiv.lastChild.id != "PanelWait") mainDiv.removeChild(mainDiv.lastChild);
	
	mainDiv.style.width = "100%";

	// Show the div style
	var divStyle = document.getElementById("StyleTexte");
	divStyle.style.visibility = "visible";
	
	// Display the ad
	if(Cor.ModeAbonnePremium == false)
	{
		if(Cor.IdLangue == "fr") document.getElementById("InfSup").style.display = "none";
		document.getElementById("pub3").style.display = "block";
	}
	else
	{
		document.getElementById("InfSup").style.display = "block";
		var pub3 = document.getElementById("pub3");
		if(pub3 != null) pub3.style.display = "none";
	}
},

// Handler dictionary
Handler_Dictionnary : function()
{
	var mainDiv = document.getElementById("MainDiv");
	
	//REMOVE CLASS FLEX WHEN NOT ON ORTOGRAPHE
	$('.ortho-flex').removeClass('flex');

	//HIDE SIDEBAR WHEN ON OTHER TABS THAN GRAMMAR CHECK
	$('.sidebar').hide();
	$('.side-pub').hide();

	//ADD CLASS TO BODY FOR DISTINCTION / USED IN CSS
	$('body').attr('id', 'dictionnary');
	$('.menu-header .nav a').removeClass('selected');
	$('.menu-header .nav a#btndict').addClass('selected');

	// Hide sol popups
	Cor.PopupPanelSol.SetVisible(false, false, false, true);
	
	document.getElementById("PanelBtn").style.display = "none";
	document.getElementById("TextArea").style.display = "none";
	document.getElementById("Titre").style.display = "block";
	
	if(mainDiv.lastChild.id != null && mainDiv.lastChild.id != "PanelWait") mainDiv.removeChild(mainDiv.lastChild);
	
	// Hide the div style
	var divStyle = document.getElementById("StyleTexte");
	divStyle.style.visibility = "hidden";
	
	document.getElementById("InfSup").style.display = "none";
	
	var pub3 = document.getElementById("pub3");
	if(pub3 != null) pub3.style.display = "none";
	
	if(Cor.ModeAbonnePremium == false) $("#pub2").css('display', 'block');
	
	// Create the panel of dictionary then add it
	if(Dict.PanelDictI == null) Dict.PanelDictI = new Dict.PanelDict();
	
	mainDiv.appendChild(Dict.PanelDictI.Node);
},

// Handler rules
Handler_Rules : function(ref_rule)
{
	var mainDiv = document.getElementById("MainDiv");

	//REMOVE CLASS FLEX WHEN NOT ON ORTOGRAPHE
	$('.ortho-flex').removeClass('flex');

	//HIDE SIDEBAR WHEN ON OTHER TABS THAN GRAMMAR CHECK
	$('.sidebar').hide();
	$('.side-pub').hide();
	//ADD CLASS TO BODY FOR DISTINCTION / USED IN CSS
	$('body').attr('id', 'rules');
	$('.menu-header .nav a').removeClass('selected');
	$('.menu-header .nav a#btnreg').addClass('selected');
	
	// Hide sol popups
	Cor.PopupPanelSol.SetVisible(false, false, false, true);
	
	document.getElementById("PanelBtn").style.display = "none";
	document.getElementById("TextArea").style.display = "none";
	
	if(mainDiv.lastChild.id != null && mainDiv.lastChild.id != "PanelWait") mainDiv.removeChild(mainDiv.lastChild);
	
	mainDiv.style.width = "736px";
	
	// Hide the div style
	var divStyle = document.getElementById("StyleTexte");
	divStyle.style.visibility = "hidden";
	
	// Hide the div syn stat
	document.getElementById("InfSup").style.display = "none";
	
	if(Cor.ModeAbonnePremium == false)
	{
		var pub3 = document.getElementById("pub3");
		if(pub3 != null) pub3.style.display = "block";
	}
	
	if(Cor.ModeAbonnePremium == false)
	{
		$("#pub2").css('display', 'block');
	}
	
	// Create the panel then add it
	if(Rules.PanelRulesI == null) Rules.PanelRulesI = new Rules.PanelRules();
	/*else
	{
		Rules.PanelRulesI.childNodes[0].style.display = "block";
		Rules.PanelRulesI.childNodes[1].style.display = "block";
		
		if(Rules.PanelRulesI.childNodes.length > 2) Rules.PanelRulesI.removeChild(Rules.PanelRulesI.childNodes[2]);
	}*/
	
	// If a rule must be shown with a url parameter
	if(ref_rule != null)
	{
		Rules.Show_SpecificRule_OnStart(ref_rule, Rules.PanelRulesI);
	}
	
	mainDiv.appendChild(Rules.PanelRulesI);
},

// Handler of extensions. English
Handler_ExtensionAPIEn : function()
{
	var mainDiv = document.getElementById("MainDiv");

	//HIDE SIDEBAR WHEN ON OTHER TABS THAN GRAMMAR CHECK
	$('.sidebar').hide();
	$('.side-pub').hide();
	//ADD CLASS TO BODY FOR DISTINCTION / USED IN CSS
	$('body').attr('id', 'extensionapien');
	$('.menu-header .nav a').removeClass('selected');
	$('.menu-header .nav a#btnext').addClass('selected');
	
	// Hide sol popups
	Cor.PopupPanelSol.SetVisible(false, false, false, true);
	
	document.getElementById("PanelBtn").style.display = "none";
	document.getElementById("TextArea").style.display = "none";
	//document.getElementById("Titre").style.display = "none";
	//document.getElementById("pub1").style.display = "none";
	
	if(mainDiv.lastChild.id != null && mainDiv.lastChild.id != "PanelWait") mainDiv.removeChild(mainDiv.lastChild);
	
	mainDiv.style.width = "736px";
	
	// Hide the div style
	var divStyle = document.getElementById("StyleTexte");
	divStyle.style.visibility = "hidden";
	
	// Hide the div syn stat
	document.getElementById("InfSup").style.display = "none";
	
	// Create the panel then add it
	if(Premium.PanelExtensionAPIEnI == null) Premium.PanelExtensionAPIEnI = new Premium.PanelExtensionAPIEn();
	
	mainDiv.appendChild(Premium.PanelExtensionAPIEnI.Node);
},

// Handler version premium
Handler_VersionPremium : function(presentation, typeAbn)
{
	//REMOVE CLASS FLEX WHEN NOT ON ORTOGRAPHE
	$('.ortho-flex').removeClass('flex');
	
	var mainDiv = document.getElementById("MainDiv");

	//HIDE SIDEBAR WHEN ON OTHER TABS THAN GRAMMAR CHECK
	$('.sidebar').hide();
	$('.side-pub').hide();
	//ADD CLASS TO BODY FOR DISTINCTION / USED IN CSS
	$('body').attr('id', 'versionprenium');

	$('.menu-header .nav a').removeClass('selected');
	$('.navbar-nav #btnvp').addClass('selected');
	
	// Hide sol popups
	Cor.PopupPanelSol.SetVisible(false, false, false, true);
	
	document.getElementById("PanelBtn").style.display = "none";
	document.getElementById("TextArea").style.display = "none";
	
	if(mainDiv.lastChild.id != null && mainDiv.lastChild.id != "PanelWait") mainDiv.removeChild(mainDiv.lastChild);
	
	mainDiv.style.width = "100%";
	
	// Hide the div style
	var divStyle = document.getElementById("StyleTexte");
	divStyle.style.visibility = "hidden";
	
	// Hide the div syn stat
	document.getElementById("InfSup").style.display = "none";
	
	var pub3 = document.getElementById("pub3");
	if(pub3 != null) pub3.style.display = "none";
	
	if(Cor.ModeAbonnePremium == false)
	{
		//document.getElementById("pub2").style.display = "none";
	}
	
	// Create the panel then add it
	if(Cor.Connexion == false || presentation == true)
	{
		if(Premium.PresentationPremiumI == null) Premium.PresentationPremiumI = new Premium.PresentationPremium();
		
		mainDiv.appendChild(Premium.PresentationPremiumI.MainDiv);
	}
	// Panel mon compte
	else
	{
		if(!Cor.IsChecking)
		{
			if(Premium.PanelMonCompteI == null) Premium.PanelMonCompteI = new Premium.PanelMonCompte();
			
			mainDiv.appendChild(Premium.PanelMonCompteI.Node);
			
			// Update information account. DO it each time because we can change the account.
			Premium.UpdateInformationsCompte();
		}
	}
	
	// Type Abonnement selected
	if(typeAbn == "P1M") document.getElementById("Radio1Mois").checked = true;
	else if(typeAbn == "P3M") document.getElementById("Radio3Mois").checked = true;
	else if(typeAbn == "P1A") document.getElementById("Radio1An").checked = true;
},

// Handler for proofreading
Handler_Proofreading : function()
{
	var mainDiv = document.getElementById("MainDiv");

	//HIDE SIDEBAR WHEN ON OTHER TABS THAN GRAMMAR CHECK
	$('.sidebar').hide();
	$('.side-pub').hide();
	//ADD CLASS TO BODY FOR DISTINCTION / USED IN CSS
	$('body').attr('id', 'proofreading');
	
	// Hide sol popups
	Cor.PopupPanelSol.SetVisible(false, false, false, true);
	
	document.getElementById("PanelBtn").style.display = "none";
	document.getElementById("TextArea").style.display = "none";
	
	if(mainDiv.lastChild.id != null && mainDiv.lastChild.id != "PanelWait") mainDiv.removeChild(mainDiv.lastChild);
	
	mainDiv.style.width = "736px";
	
	// Hide the div style
	var divStyle = document.getElementById("StyleTexte");
	divStyle.style.visibility = "hidden";
	
	// Hide the div syn stat
	document.getElementById("InfSup").style.display = "none";
	
	var pub3 = document.getElementById("pub3");
	if(pub3 != null) pub3.style.display = "none";
	
	if(Cor.ModeAbonnePremium == false)
	{
		document.getElementById("pub2").style.display = "none";
	}
	
	// Create the panel then add it
	if(Proofreading.Presentation_ProofreadingI == null) Proofreading.Presentation_ProofreadingI = new Proofreading.Presentation_Proofreading();
	
	mainDiv.appendChild(Proofreading.Presentation_ProofreadingI.MainDiv);
},

// Handler of test extension
Handler_Test_Ext : function()
{
	Cor.Handler_VersionPremium(false, "");
	
	Premium.PresentationPremiumI.OpenDiv(1);
	
	var eltLabelMailPlugin = document.getElementById("TabPrem");
	window.scrollTo(0, eltLabelMailPlugin.offsetTop + 300);
},

// Handler of extensions
Handler_BtnExtensionsAPI : function(api)
{
	Cor.Handler_ExtensionAPIEn();
	
	if(api == false) window.scrollTo(0, 0);
	else
	{
		var eltLabelAPI = document.getElementById("LabelAPI");
		window.scrollTo(0, eltLabelAPI.offsetTop + 100);
	}
},

// Create the waiting panel.
CreateWaitingPanel : function()
{
	var elementDiv = document.createElement("div");
	elementDiv.hidden = true;
	elementDiv.id = "PanelWait";
	//if(Cor.IsMobile == true) elementDiv.style.marginBottom = "37px";
	
	// Wait panel
	this.TableWait = document.createElement("table");
	this.TableWait.setAttribute("align", "center");
	if(Cor.IsMobile == true) this.TableWait.style.paddingTop = "70px";
	else this.TableWait.style.paddingTop = "130px";
	
	this.TableWait.style.display = "block";
	if(Cor.IdLangue == "fr")
	{
		if(Cor.IsMobile == false) this.TableWait.style.width = "183px";
		else this.TableWait.style.width = "230px";
	}
	else if(Cor.IdLangue == "en") this.TableWait.style.width = "230px";
	
	// Icon
	var tdIcon = document.createElement("tr");
	
	tdIcon.setAttribute("align", "left");
	tdIcon.setAttribute("style", "vertical-align: top;");
	
	//ancien loader please wait
	/* var img = document.createElement("img");
	img.setAttribute("src", "images/progress.gif");
	img.style.marginRight = "37px";
	tdIcon.appendChild(img); */
	var loader = document.createElement("div");
	loader.id = "loader-1";
	loader.className = "loader";
	tdIcon.appendChild(loader);
	
	this.TableWait.appendChild(tdIcon);
	
	// Right Panel
	var tdLabel = document.createElement("tr");
	
	tdLabel.setAttribute("align", "left");
	tdLabel.setAttribute("style", "vertical-align: top;");
	
	var divTextWait = document.createElement("div");
	divTextWait.setAttribute("class", "Cor-LabelWait");
	if(Cor.IsMobile == true)
	{
		divTextWait.style.paddingTop = "5px";
		
	}

	var label = "Veuillez patienter...";
	if(Cor.IdLangue == "en") label = "Please wait...";
	
	divTextWait.innerHTML = label;
	
	tdLabel.appendChild(divTextWait);
	
	this.TableWait.appendChild(tdLabel);
	
	//divTable.appendChild(this.TableWait);
	elementDiv.appendChild(this.TableWait);
	
	// Panel with progress bar
	this.DivProgressBar = document.createElement("div");
	this.DivProgressBar.setAttribute("align", "center");
	this.DivProgressBar.className = "progress-bar-container";
	this.DivProgressBar.style.paddingTop = "130px";
	//this.DivProgressBar.style.display = "none";
	
	// Label
	var divTextWait = document.createElement("div");
	divTextWait.setAttribute("class", "Cor-LabelWait");
	divTextWait.style.marginBottom = "60px";
	
	var label = "Veuillez patienter...";
	if(Cor.IdLangue == "en") label = "Please wait...";
	
	divTextWait.innerHTML = label;
	
	this.DivProgressBar.appendChild(divTextWait);
	
	// Progress bar
	this.ProgressBar = document.createElement("div");
	this.ProgressBar.style.width = "350px";
	this.ProgressBar.style.height = "15px";
	this.ProgressBar.style.backgroundColor = "#f1f1f1";
	this.ProgressBar.style.borderRadius = "10px";
	this.ProgressBar.style.overflow = "hidden";
	this.ProgressBar.align = "left";
	
	// this.ProgressBar.style.borderColor = "#e6e6e6";
	// this.ProgressBar.style.borderWidth = "2px";
	// this.ProgressBar.style.borderStyle = "solid";
	
	// Div inside the progress bar
	var divInside = document.createElement("div");
	divInside.className = "progress-bar";
	
	divInside.style.width = "0px";
	divInside.style.height = "15px";
	
	this.ProgressBar.appendChild(divInside);
	
	this.DivProgressBar.appendChild(this.ProgressBar);

	elementDiv.appendChild(this.DivProgressBar);
	
	// Append to the main div
	var eltTextArea = document.getElementById('TextArea');
	
	eltTextArea.appendChild(elementDiv);
},

// Set Visible Panel Wait
SetVisible_PanelWait : function(visible, showProgressBar)
{
	// Append to the main div
	var eltTextArea = document.getElementById('MainDiv');
	
	var textArea = document.getElementById('FrameTx');
	
	var panelWait = document.getElementById("PanelWait");
	
	if(visible)
	{
		textArea.style.display = "none";
		panelWait.style.display = "block";
	}
	else
	{
		panelWait.style.display = "none";
		textArea.style.display = "block";
	}
	
	// Show progress bar or not
	if(visible == true)
	{
		if(showProgressBar)
		{
			this.TableWait.style.display = "none";
			this.DivProgressBar.style.display = "block";
		}
		else
		{
			this.TableWait.style.display = "block";
			this.DivProgressBar.style.display = "none";
		}
	}
},

// Set Visible the error label
SetVisible_ErrorLabel : function(visible)
{
	var eltErrorLabel = document.getElementById('errorLabel');
	if(eltErrorLabel != null)
	{
		if(visible == true) eltErrorLabel.style.visibility = "visible";
		else eltErrorLabel.style.visibility = "hidden";
	}
},

// Set the progress bar value
SetProgressBar_Value : function(percentage)
{
	var divInside = this.ProgressBar.firstChild;
	divInside.style.width = ((percentage/100)*300) + "px";
},

// Popup Panel of solutions
PopupPanelSol : function()
{
	////////////////////////////////////
	// Node explication of solution.  //
	////////////////////////////////////
	this.Node_ExpSol_Cor = document.createElement("div");
	this.Node_ExpSol_Cor.setAttribute("class", "Cor-PopupPanelExpSol");
	
	this.Node_ExpSol_Cor.style.overflow = 'visible';
	this.Node_ExpSol_Cor.style.position = 'absolute';
	this.Node_ExpSol_Cor.style.zIndex = '100';
	
	this.Node_ExpSol_Cor.onmouseover = function()
	{
		Cor.MouseOverItemSolution = true;
	}
	this.Node_ExpSol_Cor.onmouseout = function()
	{
		Cor.MouseOverItemSolution = false;
	}
	
	// Add to the body
	document.body.appendChild(this.Node_ExpSol_Cor);
	
	////////////////////////////////////
	// List of solutions Cor.  			  //
	////////////////////////////////////
	
	this.Node_ListSol_Cor = document.createElement("div");
	this.Node_ListSol_Cor.setAttribute("class", "Cor-PopupPanelListeSol");
	
	this.Node_ListSol_Cor.style.overflow = 'visible';
	this.Node_ListSol_Cor.style.position = 'absolute';
	this.Node_ListSol_Cor.style.zIndex = '100';
	
	this.Id_Cor = "";
	
	var divListSol = document.createElement("div");
	if(Cor.IsMobile == false) divListSol.style.fontSize = '16px';
	else divListSol.style.fontSize = '17px';
	
	this.Node_ListSol_Cor.appendChild(divListSol);
	
	// Add to the body
	document.body.appendChild(this.Node_ListSol_Cor);
	
	////////////////////////////////////
	// Function Set solutions         //
	////////////////////////////////////
	this.SetSolutions_Cor = function(vectSolution, expSol, node, id, posX, posY)
	{
		this.Id_Cor = id;
		
		// Set position
		var divTa = document.getElementById('FrameTx');
		var rect = divTa.getBoundingClientRect();
		var hGap = 24;
		if(Cor.IsMobile == true) hGap = 25;
		
		// High fontsize
		if(TextEditor.FontSize >= 20) hGap = hGap + 14;

		if(Cor.IsIE11 == false) {
			this.Node_ListSol_Cor.style.left = window.scrollX + rect.left + posX + 'px';
			this.Node_ListSol_Cor.style.top = window.scrollY + rect.top + posY + 30 + 'px';

			this.Node_ExpSol_Cor.style.left = window.scrollX + rect.left + posX + 'px';
			this.Node_ExpSol_Cor.style.top = window.scrollY + rect.top + posY + 30 + 22 + (20 * vectSolution.length) + (vectSolution.length*hGap) + 'px';
		} else {
			this.Node_ListSol_Cor.style.left = window.pageXOffset + rect.left + posX + 'px';
			this.Node_ListSol_Cor.style.top = window.pageYOffset + rect.top + posY + 30 + 'px';
		
			this.Node_ExpSol_Cor.style.left = window.pageXOffset + rect.left + posX + 'px';
			this.Node_ExpSol_Cor.style.top = window.pageYOffset + rect.top + posY + 30 + 22 + (20 * vectSolution.length) + (vectSolution.length*hGap) + 'px';
		}
		
		// High font size of ExpSol
		if(TextEditor.FontSize < 20) this.Node_ExpSol_Cor.style.fontSize = '10pt';
		else this.Node_ExpSol_Cor.style.fontSize = '17px';
		
		// Set explication.
		this.Node_ExpSol_Cor.innerHTML = expSol;
		
		// Set solutions. Max 5 solutions
		var divListSol = this.Node_ListSol_Cor.childNodes[0];
		
		// Clear elements.
		divListSol.innerHTML = '';
		
		var cntSol = 0;
		while(cntSol < vectSolution.length && cntSol < 5)
		{
			var solution = vectSolution[cntSol];
		
			var divSol = document.createElement("div");
			divSol.dataset.Sol = solution.Left;
			
			var div = document.createElement("div");
		
			div.innerHTML = solution.Right;
			div.setAttribute("class", "Cor-ListSolTr");
			
			// High Font size
			if(TextEditor.FontSize >= 20) div.style.fontSize = '19px';
			
			div.onmouseover = function()
			{
				Cor.MouseOverItemSolution = true;
			}
			div.onmouseout = function()
			{
				Cor.MouseOverItemSolution = false;
			}
			
			divSol.appendChild(div);
			
			// Click event
			divSol.onclick = function()
			{
				TextEditor.ReplaceWord(this.dataset.Sol, node, id, false, false);
			
				// Hide the popups
				Cor.PopupPanelSol.SetVisible(false, false, false, true);
			
				Cor.TexteModified = true;
				Stat.CheckedStat = false;
			}
			
			divListSol.appendChild(divSol);
			
			cntSol++;
		}
		
		// Show the popup
		this.SetVisible(true, true, false, false);
		
		// If no solution, hide the list sol panel.
		if(vectSolution.length == 0) this.Node_ListSol_Cor.hidden = true;
	}
	
	//////////////////////////////////////////
	// Node explication of style solution.  //
	//////////////////////////////////////////
	
	this.Node_ExpSol_Style = document.createElement("div");
	this.Node_ExpSol_Style.setAttribute("class", "Cor-PopupPanelExpSol");
	
	this.Node_ExpSol_Style.style.overflow = 'visible';
	this.Node_ExpSol_Style.style.position = 'absolute';
	this.Node_ExpSol_Style.style.zIndex = '100';
	// this.Node_ExpSol_Style.style.marginTop = "25px";
	// this.Node_ExpSol_Style.style.paddingBottom = "auto";
		
	this.Node_ExpSol_Style.onmouseover = function()
	{
		Cor.MouseOverItemSolution = true;
	}
	this.Node_ExpSol_Style.onmouseout = function()
	{
		Cor.MouseOverItemSolution = false;
	}
	
	// Add to the body
	document.body.appendChild(this.Node_ExpSol_Style);
	
	//////////////////////////////
	// List of style solutions. //
	//////////////////////////////
	/// 

	this.Node_ListSol_Style = document.createElement("div");
	this.Node_ListSol_Style.setAttribute("class", "Cor-PopupPanelListeSol");
	
	this.Node_ListSol_Style.style.overflow = 'visible';
	this.Node_ListSol_Style.style.position = 'absolute';
	this.Node_ListSol_Style.style.zIndex = '100';
	
	var divListSol = document.createElement("div");
	if(Cor.IsMobile == false) divListSol.style.fontSize = '16px';
	else divListSol.style.fontSize = '17px';
	
	this.Node_ListSol_Style.appendChild(divListSol);
	
	this.Id_Style = "";
	
	// Add to the body
	document.body.appendChild(this.Node_ListSol_Style);

	
	////////////////////////////////////
	// Function Set style solutions   //
	////////////////////////////////////
	this.SetSolutions_Style = function(vectSolution, type, expSol, node, id, posX, posY)
	{
		this.Id_Style = id;
		
		// Set position
		var divTa = document.getElementById('FrameTx');
	
		var rect = divTa.getBoundingClientRect();
		
		// The style popup is under the cor popup.
		var offSet = 0;
		// if(this.Node_ExpSol_Cor.hidden == false)
		// {
		// 	var topSt = this.Node_ExpSol_Cor.style.top;
		// 	offSet = parseInt(topSt.substr(0, topSt.length - 2)) + this.Node_ExpSol_Cor.clientHeight + 1;
		// }
		
		var hGap = 24;
		if(Cor.IsMobile == true) hGap = 25;
		
		// High fontsize
		if(TextEditor.FontSize >= 20) hGap = hGap + 4;
		
		var heightSol = vectSolution.length;
		if(vectSolution.length > 10) heightSol = 10;
		
		this.Node_ListSol_Style.classList.add("class", "second-infobulle");
		this.Node_ExpSol_Style.classList.add("class", "second-infobulle");
		if(Cor.IsIE11 == false)
		{
			this.Node_ListSol_Style.style.left = window.scrollX + rect.left + posX + 'px';
			
			if(offSet == 0) this.Node_ListSol_Style.style.top = window.scrollY + rect.top + posY + 30 + 'px';
			else this.Node_ListSol_Style.style.top = offSet + 'px';
		
			this.Node_ExpSol_Style.style.left = window.scrollX + rect.left + posX + 'px';
			
			if(offSet == 0) this.Node_ExpSol_Style.style.top = window.scrollY + rect.top + (posY + 30 + 11 + (heightSol*hGap)) + 'px';
			else
			{
				if(heightSol > 0) this.Node_ExpSol_Style.style.top = offSet + (11 + (heightSol*hGap)) + 'px';
				else this.Node_ExpSol_Style.style.top = offSet+ 'px';
			}
		}
		else
		{
			this.Node_ListSol_Style.style.left = window.pageXOffset + rect.left + posX + 'px';
			
			if(offSet == 0) this.Node_ListSol_Style.style.top = window.pageYOffset + rect.top + posY + 30 + 'px';
			else this.Node_ListSol_Style.style.top = offSet + 'px';
		
			this.Node_ExpSol_Style.style.left = window.pageXOffset + rect.left + posX + 'px';
			
			if(offSet == 0) this.Node_ExpSol_Style.style.top = window.pageYOffset + rect.top + (posY + 30 + 11 + (heightSol*hGap)) + 'px';
			else
			{
				if(heightSol > 0) this.Node_ExpSol_Style.style.top = offSet + (11 + (heightSol*hGap)) + 'px';
				else this.Node_ExpSol_Style.style.top = offSet + 'px';
			}
		}
		
		// High fontsize
		if(TextEditor.FontSize < 20) this.Node_ExpSol_Style.style.fontSize = '10pt';
		else this.Node_ExpSol_Style.style.fontSize = "17px";
		
		// Set solutions. Max 5 solutions
		var divListSol = this.Node_ListSol_Style.childNodes[0];
		
		// Clear elements.
		divListSol.innerHTML = '';
		
		if(vectSolution.length > 6)
		{
			divListSol.style.maxHeight = ((hGap + 19) * 6) + "px";
			//divListSol.style.maxHeight = "245px";
			divListSol.style.overflowY = "scroll";
		}
		else
		{
			divListSol.style.overflowY = "hidden";
		}
		
		var cntSol = 0;
		var instensitySolutions = false;
		
		if(vectSolution.length > 0)
		{
			while(cntSol < vectSolution.length)
			{
				var solution = vectSolution[cntSol];
			
				var divSol = document.createElement("div");
				divSol.dataset.Sol = solution.SolutionSt;
				
				var div = document.createElement("div");
			
				// High Font size
				if(TextEditor.FontSize >= 20) div.style.fontSize = '19px';
			
				div.innerHTML = solution.SolutionAffSt;
				
				var attributeSt = solution.AttributesSt;
				if(attributeSt == null)
				{
					if(type == 'Sentence') div.setAttribute("class", "Cor-ListSolTr_HighIntensity");	// Not necessary but logic.
					else div.setAttribute("class", "Cor-ListSolTr");
				}
				else
				{
					var fields = attributeSt.split(';');
					
					var fieldIntensity = fields[1];
					var indPv = fieldIntensity.indexOf(":");
					var intensity = fieldIntensity.substring(indPv + 1);
					var fieldNbOccurrences = fields[2];
					indPv = fieldNbOccurrences.indexOf(":");
					var nbOccurrences = parseInt(fieldNbOccurrences.substring(indPv + 1));
					
					// Vocabulary enhancement. Color by intensity.
					if(type == 'Vocabulary_enhancement')
					{
						if(intensity == '0') div.setAttribute("class", "Cor-ListSolTr_WeakIntensity");
						else if(intensity == '1' || intensity == '-1') div.setAttribute("class", "Cor-ListSolTr");
						else if(intensity == '2')
						{
							div.setAttribute("class", "Cor-ListSolTr_HighIntensity");
							instensitySolutions = true;
						}
					}
					// Repetitions. Color by nb occurrences.
					else if(type == 'WordRepetition' ||
					       (type.indexOf('Register_') == 0))
					{
						if(nbOccurrences > 0) div.setAttribute("class", "Cor-ListSolTr_HighIntensity");
						else div.setAttribute("class", "Cor-ListSolTr");
					}
					else div.setAttribute("class", "Cor-ListSolTr");
				}
				
				div.onmouseover = function()
				{
					Cor.MouseOverItemSolution = true;
				}
				div.onmouseout = function()
				{
					Cor.MouseOverItemSolution = false;
				}
				
				divSol.appendChild(div);
				
				// Click event
				divSol.onclick = function()
				{
					//TextEditor.ReplaceWord_Style(this.dataset.Sol);
					TextEditor.ReplaceWord(this.dataset.Sol, node, id, false, false);
				
					// Hide the popups
					Cor.PopupPanelSol.SetVisible(false, false, false, true);
				
					Cor.TexteModified = true;
					Stat.CheckedStat = false;
				}
				
				divListSol.appendChild(divSol);
				
				cntSol++;
			}
		}
		else
		{
			/*var labelNoSol = "Aucune suggestion";
			if(Cor.IdLangue == "en") labelNoSol = "No suggestion";
			
			var divSol = document.createElement("div");
			//divSol.innerHTML = labelNoSol;
			
			var div = document.createElement("div");
			
			div.innerHTML = labelNoSol;
			//div.setAttribute("class", "Cor-ListSolTr");
			
			divSol.appendChild(div);
				
			divListSol.appendChild(divSol);*/
			
		}
		
		// Set explication.
		this.Node_ExpSol_Style.innerHTML = expSol;
		
		if(instensitySolutions == true) this.Node_ExpSol_Style.innerHTML += Style.TexteComplementColorIntensity_EN;
		
		// Show the popup
		this.SetVisible(true, false, true, false);
		
		// If no solution, hide the list sol panel.
		if(vectSolution.length == 0) this.Node_ListSol_Style.hidden = true;
	}
	
	// Show or hide
	this.SetVisible = function(visible, cor, style, all)
	{
		if(cor == true && visible == true){
			$(this.Node_ExpSol_Cor).addClass('open');
			$(this.Node_ListSol_Cor).addClass('open');
		} else if(cor == true && visible == false) {
			$(this.Node_ExpSol_Cor).removeClass('open');
			$(this.Node_ListSol_Cor).removeClass('open');
		}
		if(cor == true || all == true)
		{
			this.Node_ExpSol_Cor.hidden = !visible;
			this.Node_ListSol_Cor.hidden = !visible;
		}
	
		if(style == true || all == true)
		{
			this.Node_ExpSol_Style.hidden = !visible;
			this.Node_ListSol_Style.hidden = !visible;
			this.Node_ListSol_Style.childNodes[0].scrollTop = "0px";
		}
	}
	
},

// Panel fo max character.
PanelMaxChar : function()
{
	this.PopupBase = new Util.PopupBase(0);
	
	// Title
	this.PopupBase.Node.style.padding = "5px";
	
	this.DivMessage = document.createElement("div");
	this.DivMessage.className = "Prem-TexteBasePremium";
	this.DivMessage.style.fontSize = "16px";
	this.DivMessage.style.fontWeight = "bold";
	this.DivMessage.align = "center";
	
	this.PopupBase.Node.childNodes[1].appendChild(this.DivMessage);
	
	// Button OK
	var divButton = document.createElement('div');
	divButton.setAttribute("align", "center");
	
	var tableButtons = document.createElement('table');
	tableButtons.style.marginTop = "40px";
	
	var tdButtonOK = document.createElement('td');
	var buttonOK = document.createElement('div');
	buttonOK.className = "Cor-RedButton";
	buttonOK.innerHTML = "OK";
	buttonOK.style.fontSize = "16px";
	buttonOK.style.width = "127px";
	buttonOK.style.textAlign = "center";
	buttonOK.style.marginLeft = "auto";
	buttonOK.style.marginRight = "auto";
	
	var th = this;
	buttonOK.onclick = function()
	{
		th.SetVisible(false);
		
		Cor.SetVisible_PanelWait(false, false);
		
		Cor.IsChecking = false;
		
		// Bug: When iframe is set to display = "none", and then set to display = "block", scrollbar disappears.
		// We must do a refresh on the text. In normal mode, refresh is made by underline elements, but here, we use a timer.
		
		//textArea.innerHTML = textArea.innerHTML + 'e';
		//textArea.contentDocument.body.style.display = "none";
		//textArea.contentDocument.body.style.display = "block";
		//var elt = document.getElementsByName('body');
		//elt[0].style.display = "block";
		//textArea.style.display = "initial";
		//textArea.style.width = "99%";
		//textArea.style.width = "100%";
		//textArea.style.border = "4px";
		
		// Refresh
		var textArea = document.getElementById('FrameTx');
		
		textArea.contentDocument.body.style.display = "none";
		setTimeout(function()
		{		
			var textArea = document.getElementById('FrameTx');
			textArea.contentDocument.body.style.display = "block";
		}, 10);
		
	}
	
	tdButtonOK.appendChild(buttonOK);
	tableButtons.appendChild(tdButtonOK);
	
	// Button discover Premium.
	var tdButtonVPremium = document.createElement('td');
	var buttonVPremium = document.createElement('div');
	buttonVPremium.className = "Cor-RedButton";
	buttonVPremium.innerHTML = "D" + String.fromCharCode(233) + "couvrir la version Premium >";
	//buttonVPremium.setAttribute("align", "center");
	buttonVPremium.style.fontSize = "16px";
	//buttonVPremium.style.width = "120px";
	buttonVPremium.style.marginLeft = "10px";
	buttonVPremium.style.textAlign = "center";
	buttonVPremium.style.display = "none";
	buttonVPremium.onclick = function()
	{
		th.SetVisible(false);
		
		Cor.SetVisible_PanelWait(false, false);
		
		Cor.IsChecking = false;
		
		Cor.Handler_VersionPremium(true, "");
	}
	
	tdButtonVPremium.appendChild(buttonVPremium);
		
	tableButtons.appendChild(tdButtonVPremium);
	
	divButton.appendChild(tableButtons);
	
	this.PopupBase.Node.childNodes[1].appendChild(divButton);

	// Update the message
	this.SetLimChar = function(limChar)
	{
		if(limChar == 200000) limChar = "200 000";
		var texteHTML = "<p>Le nombre de caract" + String.fromCharCode(232) + "res " + String.fromCharCode(224) + " traiter " + "ne doit pas exc" + String.fromCharCode(233) + "der " + limChar + ".</p>";
		
		if(Cor.ModeAbonnePremium == false) texteHTML = "<p>Merci d'utiliser Scribens. Votre texte d" + String.fromCharCode(233) + "passe le nombre de caract" + String.fromCharCode(232) + "res permis.</p>";
		
		// Demo.
		if(Cor.Demo && limChar == 200) texteHTML = "<p>La version de d" + String.fromCharCode(233) + "monstration est limit" + String.fromCharCode(233) + "e " + String.fromCharCode(224) + " " + limChar + " caract" + String.fromCharCode(232) + "res.</p>";
		
		// Informations commerciales suppl�mentaires.
		if(Cor.ModeAbonnePremium == false)
		{
			texteHTML += "<p>&nbsp;</p><p>Si vous souhaitez avoir une limite sup" + String.fromCharCode(233) + "rieure de caract" + String.fromCharCode(232) + "res (200 000) et b" + String.fromCharCode(233) + "n" + String.fromCharCode(233) + "ficier de toutes les autres fonctionnalit" + String.fromCharCode(233) + "s de Scribens, souscrivez d" + String.fromCharCode(232) + "s maintenant " + String.fromCharCode(224) + " la version Premium.</p>";
		}
		
		// English
		if(Cor.IdLangue == "en")
		{
			if(limChar == 20000) limChar = "20,000";	// just for ,
			texteHTML = "<p>Your text can't exceed the maximum number of " + limChar + " characters.</p>";
		}
		
		this.DivMessage.innerHTML = texteHTML;
		
		// Show the button doiscover Premium
		if((Cor.ModeAbonnePremium == false) && (Cor.IdLangue == "fr"))
		{
			buttonVPremium.style.display = "block";
		}
		else buttonVPremium.style.display = "none";
	}
	
	// Set visible
	this.SetVisible = function(visible)
	{
		this.PopupBase.SetVisible(visible);
	}
	
	document.body.appendChild(this.PopupBase.Node);
},

// Label of maximum character
LabelMaxChar : function()
{
	this.DivMessage = document.createElement("div");
	this.DivMessage.className = "Prem-TexteBasePremium";
	this.DivMessage.style.fontSize = "14px";
	this.DivMessage.style.fontWeight = "bold";
	this.DivMessage.style.display = "none";
	this.DivMessage.align = "center";
	
	// Show the message
	this.SetVisible = function(visible)
	{
		if(Cor.IdLangue == "fr")
		{
			this.DivMessage.innerHTML = "<p>Merci d'utiliser Scribens. Votre texte d" + String.fromCharCode(233) + "passe le nombre de caract" + String.fromCharCode(232) + "res permis.</p>";
		}
		else if(Cor.IdLangue == "en")
		{
			this.DivMessage.innerHTML = "<p>Your text can't exceed the maximum number of characters.</p>";
		}
		
		if(visible) this.DivMessage.style.display = "block";
		else this.DivMessage.style.display = "none";
	}
	
	var maindiv = document.getElementById("MainDiv");
	maindiv.appendChild(this.DivMessage);
},

// Popup of English sample
PopupMessageEnglish : function(text, type)
{
	this.PopupBase = new Util.PopupBase();
	
	var popup = document.createElement("div");
	
	// Message
	var divMessage = document.createElement("div");
	divMessage.className = "Prem-TexteBasePremium";
	divMessage.style.fontSize = "36px";
	divMessage.style.fontWeight = "bold";
	divMessage.style.marginBottom = "30px";
	divMessage.setAttribute("align", "center");
	divMessage.innerHTML = text;
	
	popup.appendChild(divMessage);
	
	// Red button
	var divTableButtons = document.createElement("div");
	divTableButtons.setAttribute("align", "center");
	divTableButtons.style.marginTop = "50px";
	divTableButtons.style.verticalAlign = "top";
	
	var tableButtons = document.createElement("table");
	var th = this;
	
	// Button OK
	var tdButtonOk = document.createElement("td");
	
	var buttonOK = document.createElement("div");
	buttonOK.setAttribute("class", "Cor-RedButton");
	buttonOK.style.width = "160px";
	buttonOK.style.textAlign = "center";
	buttonOK.style.marginLeft = "auto";
	buttonOK.style.marginRight = "auto";
	buttonOK.innerHTML = "OK";
	buttonOK.onclick = function()
	{
		// Show sample
		if(type == 0)
		{
			Cor.LoadSampleText();
		}
		// API
		else if(type == 1)
		{
			Cor.Handler_BtnExtensionsAPI(true);
		}
		
		th.SetVisible(false);
	}
	tdButtonOk.appendChild(buttonOK);
	tableButtons.appendChild(tdButtonOk);
	
	// Button Cancel
	var tdButtonCancel = document.createElement("td");
	
	var buttonCancel = document.createElement("div");
	buttonCancel.setAttribute("class", "Cor-RedButton");
	buttonCancel.style.width = "160px";
	buttonCancel.style.textAlign = "center";
	buttonCancel.style.marginLeft = "auto";
	buttonCancel.style.marginRight = "auto";
	buttonCancel.innerHTML = "Cancel";
	buttonCancel.onclick = function()
	{
		th.SetVisible(false);
	}
	tdButtonCancel.appendChild(buttonCancel);
	tableButtons.appendChild(tdButtonCancel);
	
	divTableButtons.appendChild(tableButtons);
	
	// Add the buttons
	popup.appendChild(divTableButtons);
	
	this.PopupBase.Node.childNodes[1].appendChild(popup);
	
	// Function show
	this.SetVisible = function(visible)
	{
		this.PopupBase.SetVisible(visible);
	}
	
	//popupBase.Node.style.visibility = "visible";
	document.body.appendChild(this.PopupBase.Node);
},

// Popup of French pub
PopupFrPub : function(type)
{
	this.PopupBase = new Util.PopupBase();
	
	var popup = document.createElement("div");
	popup.setAttribute("align", "center");
	
	// Title
	var title = document.createElement("div");
	title.className = "titre";
	title.style.fontSize = "20px";
	title.innerHTML = "Nouveau !";
	popup.appendChild(title);
	
	// Chrome extension
	if(type == 0)
	{
		// Message
		var divMessage = document.createElement("div");
		divMessage.className = "Prem-TexteBasePremium";
		divMessage.style.width = "500px";
		divMessage.style.fontSize = "17px";
		divMessage.style.fontWeight = "bold";
		divMessage.style.marginTop = "10px";
		divMessage.style.marginBottom = "45px";
		//divMessage.setAttribute("textAlign", "left");
		divMessage.innerHTML = "<p>Avec la nouvelle extension Google Chrome de Scribens, <br>vous pouvez désormais corriger vos textes en temps réel.</p><p></p><p>Pour l'installer, rendez-vous sur le chrome web store.</p>";
		
		popup.appendChild(divMessage);
		
		// Image
		var linkImg = document.createElement("a");
		linkImg.href = "https://chrome.google.com/webstore/detail/scribens-correcteur-dorth/djpeecijcbigpoijldkimmkilekocdao?hl=fr";
		linkImg.target = "_blank";
		var img = document.createElement("img");
		img.src = "images/pub/LinkPubFrExt.png";
		img.style.marginBottom = "50px";
		img.style.cursor = "pointer";
		linkImg.appendChild(img);
		popup.appendChild(linkImg);
		
		// Red button
		var divTableButtons = document.createElement("div");
		divTableButtons.setAttribute("align", "center");
		divTableButtons.style.verticalAlign = "top";
		
		var tableButtons = document.createElement("table");
		var th = this;
		
		// Button OK
		var buttonOK = document.createElement("div");
		buttonOK.setAttribute("class", "Cor-RedButton");
		buttonOK.style.width = "200px";
		buttonOK.style.paddingLeft = "40px";
		buttonOK.style.paddingRight = "40px";
		buttonOK.innerHTML = "FERMER";
		buttonOK.onclick = function()
		{
			th.SetVisible(false);
		}
		divTableButtons.appendChild(buttonOK);
		
		// Add the buttons
		popup.appendChild(divTableButtons);
	}
	// Scribens keyboard
	else if(type == 1)
	{
		this.PopupBase.Node.childNodes[1].style.padding = "70px";
		this.PopupBase.Node.childNodes[1].style.paddingLeft = "0px";
		this.PopupBase.Node.childNodes[1].style.paddingRight = "0px";
		this.PopupBase.Node.childNodes[1].style.paddingBottom = "0px";
		
		//this.PopupBase.Node.style.top = "100px";
		
		// Image
		var linkImg = document.createElement("a");
		linkImg.href = "https://play.google.com/store/apps/details?id=com.bleu122.scribens";
		linkImg.target = "_blank";
		var img = document.createElement("img");
		img.src = "images/pub/website_smartphone.gif";
		img.style.cursor = "pointer";
		linkImg.appendChild(img);
		popup.appendChild(linkImg);
	}
			
	this.PopupBase.Node.childNodes[1].appendChild(popup);
	
	// Function show
	this.SetVisible = function(visible)
	{
		this.PopupBase.SetVisible(visible);
		this.PopupBase.Node.style.top = "200px";
	}
	
	//popupBase.Node.style.visibility = "visible";
	document.body.appendChild(this.PopupBase.Node);
},


// Show or hide components of IHM
SetVisible_All : function(visible, stylePanel)
{
	
	// Hide popups
	if(visible == false)
	{
		if(Cor.PopupPanelSol != null) Cor.PopupPanelSol.SetVisible(false, false, false, true);
		
		// Hide the error label
		Cor.SetVisible_ErrorLabel(false);
	}
	
	// Hide the div style
	if(Cor.ModeAbonnePremium == true && stylePanel == true)
	{
		var divStyle = document.getElementById("StyleTexte");
		if(divStyle != null)
		{
			//if(visible == true) divStyle.style.visibility = "visible";
			//else divStyle.style.visibility = "hidden";
			
			if(visible == true)
			{
				//divStyle.style.display = "block";
				divStyle.style.visibility = "visible";
				document.getElementById("InfSup").style.display = "block";
			}
			else
			{
				//divStyle.style.display = "none";
				divStyle.style.visibility = "hidden";
				document.getElementById("InfSup").style.display = "none";
			}
		}
	}

},

// Import file
ImportFile : function()
{
	var inputFile = document.getElementById("Input_ImportFile");
	
	var nameFile = "";
    if ('files' in inputFile)
	{
		var file = inputFile.files[0];
		
		// Control of file type
		var fileType = file.type;
		var fileName = file.name;

		if((fileType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") ||	// Word (.docx)
		   (fileName.endsWith(".odt")) ||	// OpenOffice/LibreOffice
		   (fileType == "application/pdf") ||		// Pdf
		   (fileType == "application/vnd.openxmlformats-officedocument.presentationml.presentation") ||	// PowerPoint (.pptx)
		   (fileType == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") ||	// Excel (.xlsx)
		   (fileType == "text/plain") ||	// Text files
		   (fileType == "text/html"))
		{
			// Send the file to the server in order to calculate the devis.
			var xmlhttpRequest = new XMLHttpRequest();
			
			var urlWebSite = "https://www.scribens.fr";
			if(Cor.IdLangue == "en") urlWebSite = "https://www.scribens.com";
	
			xmlhttpRequest.open("POST", urlWebSite + "/Scribens/ImportDoc_Servlet", true);
			//xmlhttpRequest.open("POST", "http://localhost:8080/Scribens/ImportDoc_Servlet", true);

			xmlhttpRequest.onreadystatechange = function ()	 //Call a function when the state changes.
			{
				if (xmlhttpRequest.readyState == 4 && xmlhttpRequest.status == 200)
				{
					var response = xmlhttpRequest.response;
					if(response != null)
					{
						response = JSON.parse(response);
						
						if(response.indexOf("TEXT_LENGTH_LIMIT_EXCEEDED") != 0)
						{
							TextEditor.SetTextHTML(response);

							// iPhone and iPad. Cancel any action on the keyboard because the textarea musn't editable. (auto spellcheck problem)
							if(Cor.IsIOS == true && (Cor.IsMobile == true || Cor.IsTablet == true))
							{
								TextEditor.ExplanationPasteText = false;
								TextEditor.Document.body.setAttribute("contenteditable", "false");
								TextEditor.Document.body.style.cursor = "default";
							}
							
							Cor.Check(false);
						}
						// Text length limit exceeded.
						else
						{
							var labelMaxChar = response.substring(27);
						
							// Show components
							Cor.SetVisible_All(true, true);
							
							if(Cor.IsMobile == false)
							{
								if(Cor.PanelMaxCharI == null) Cor.PanelMaxCharI = new Cor.PanelMaxChar();
								Cor.PanelMaxCharI.SetLimChar(labelMaxChar);
								Cor.PanelMaxCharI.SetVisible(true);
							}
							// Smartphone
							else
							{
								if(Cor.LabelMaxCharI == null) Cor.LabelMaxCharI = new Cor.LabelMaxChar();
								Cor.LabelMaxCharI.SetVisible(true);
								
								Cor.SetVisible_PanelWait(false, false);
							}
						}
					}
					else Cor.SetVisible_PanelWait(false, false);
				}
				else Cor.SetVisible_PanelWait(false, false);
			};
			
			var formData = new FormData();
			formData.append("pf_file", file);
			
			if(Cor.IdLangue == "fr") formData.append(Cor.ModeAbonnePremium, "");
			else formData.append(false, "");
			
			formData.append(Cor.IdLangue, "");
			
			Cor.SetVisible_PanelWait(true, false);
		
			xmlhttpRequest.send(formData);
		}
		// File type not accepted
		else
		{
			if(Cor.IdLangue == "fr") alert("Le type de fichier n'est pas valide. Les fichiers autoris" + String.fromCharCode(233) + "s sont : docx, xlsx, pptx, odt, pdf, txt, html.");
			else if(Cor.IdLangue == "en") alert('This file type is not allowed. The supported files are: docx, xlsx, pptx, odt, pdf, txt, html.');
		}
       
	}
},

// Paste text
Paste : function()
{
	// Get the content of the clipboard. The browser asks an authorisation. execCommand doesn't work.
	navigator.clipboard.readText().then(text => {
		//alert(text);
		
		var textPaste = text.replace(/\r?\n/g, '<br>');
		textPaste = "<p>" +  textPaste + "</p>";
		
		TextEditor.Document.body.innerHTML = textPaste;
	});
},

// Copy to clipboard
CopyClipboard : function()
{
	// var inputVal = document.getElementById('hidden-input');
	var copyText = document.getElementById("FrameTx").contentWindow.document.body.innerHTML;
	
	// Dont copy placeholder
	if((copyText == TextEditor.TextPlaceHolder_Fr && Cor.IdLangue == "fr") ||
	   (copyText == TextEditor.TextPlaceHolder_En && Cor.IdLangue == "en"))
	{
		return;
	}
	
	var StrippedString = copyText.replace(/<br>/g,"\r\n");
	StrippedString = StrippedString.replace(/\//g, ",");
	StrippedString = StrippedString.replace(/<,p><p>/g,"\r\n");
	StrippedString = StrippedString.replace(/(<([^>]+)>)/ig,"");
	// inputVal.value = StrippedString;
	// inputVal.select();
	// document.execCommand('copy');

	// Safari 3.0+ "[object HTMLElementConstructor]" 
	var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
	// Internet Explorer 6-11
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;
	
	if (isIE || isEdge || isSafari) {
		var aux = document.createElement("div");
		aux.setAttribute("contentEditable", true);
		aux.innerHTML = StrippedString;
		document.body.appendChild(aux);
		window.getSelection().selectAllChildren(aux);
		document.execCommand("copy");
		document.body.removeChild(aux);
	} else {
		navigator.clipboard.writeText(StrippedString).then(function () {
		}, function () {
		  alert('Votre navigateur n\'a pas accepté la copie dans le presse-papiers.');
		});
	}
},

// Print
Print : function()
{
	var inputText = document.getElementById("FrameTx").contentWindow.document.body.innerHTML; 
	childWindow = window.open('','childWindow','location=yes, menubar=yes, toolbar=yes');
	//childWindow.document.open();
	childWindow.document.write('<html><head></head><body>');
	childWindow.document.write(inputText.replace(/\n/gi,'<br>'));
	childWindow.document.write('</body></html>');
	childWindow.document.close();
	childWindow.focus();
	childWindow.print();
	//childWindow.close();
},

// Download popup
DownloadPopup : function()
{
	var divPremPopupVPremium = document.createElement('div');
	divPremPopupVPremium.setAttribute("class", "Prem-PopupVPremium popaction");
	
	// Div closer
	var divCloser = document.createElement('div');
	divCloser.setAttribute("class", "closer");
	var imgCloser = document.createElement('img');
	imgCloser.src = "images/CloseCrossWhite.png";
	imgCloser.style = "cursor: pointer; margin-right: 10px; margin-top: 10px;";
	divCloser.appendChild(imgCloser);
	divPremPopupVPremium.appendChild(divCloser);
	
	// Main div
	var mainDiv1 = document.createElement('div');
	mainDiv1.id = "checkboxs";
	mainDiv1.setAttribute("class", "maindiv");
	
	// Div téléchargement
	var div1 = document.createElement('div');
	var divLabelTel = document.createElement('div');
	divLabelTel.setAttribute("class", "titre");
	if(Cor.IdLangue == "fr") divLabelTel.innerHTML = "Téléchargement";
	else if(Cor.IdLangue == "en") divLabelTel.innerHTML = "Download";
	div1.appendChild(divLabelTel);
	mainDiv1.appendChild(div1);
	
	// pChoose
	var pChoose = document.createElement('p');
	pChoose.style = "margin-bottom:20px;";
	if(Cor.IdLangue == "fr") pChoose.innerHTML = "Veuillez choisir le format de téléchargement :";
	else if(Cor.IdLangue == "en") pChoose.innerHTML = "Choose the file format:";
	mainDiv1.appendChild(pChoose);
	
	// Form
	var formType = document.createElement('form');
	formType.setAttribute("class", "wrapp-checkbox");
	
	// Item 1
	var divItem1 = document.createElement('div');
	divItem1.setAttribute("class", "item");
	/*var divInput1 = document.createElement('input');
	divInput1.type = "radio";
	divInput1.name = "gStyle";
	divInput1.id = "txt";
	divInput1.value = "txt";
	divInput1.style = "cursor: pointer;";
	var label1 = document.createElement('label');
	label1.setAttribute("for", "txt");
	divInput1.appendChild(label1);
	divItem1.appendChild(divInput1);
	
	var pLabel1 = document.createElement('p');
	pLabel1.setAttribute("class", "label-checkbox");
	pLabel1.innerHTML = "txt (simple)";
	divItem1.appendChild(pLabel1);*/
	
	divItem1.innerHTML = "<input type='radio' name='gStyle' id='txt' value='txt' style='cursor: pointer;'><label for='txt'></label>" + 
						 "<p class='label-checkbox'>txt (simple)</p>";
	
	
	formType.appendChild(divItem1);
	
	// Txt selected by default
	divItem1.childNodes[0].checked = true;
	var labelCheckBox = divItem1.childNodes[2];
	labelCheckBox.style.cursor = "pointer";
	//labelCheckBox.setAttribute("userSelect", "none");
	labelCheckBox.onclick = function(){divItem1.childNodes[0].checked = true;};
	
	// Item 2
	var divItem2 = document.createElement('div');
	divItem2.setAttribute("class", "item");
	/*var divInput2 = document.createElement('input');
	divInput2.type = "radio";
	divInput2.name = "gStyle";
	divInput2.id = "doc";
	divInput2.value = "doc";
	divInput2.style = "cursor: pointer;";
	var label2 = document.createElement('label');
	label2.setAttribute("for", "doc");
	divInput2.appendChild(label2);
	divItem2.appendChild(divInput2);
	
	var pLabel2 = document.createElement('p');
	pLabel2.setAttribute("class", "label-checkbox");
	pLabel2.innerHTML = "doc (Word)";
	divItem2.appendChild(pLabel2);*/
	
	divItem2.innerHTML = "<input type='radio' name='gStyle' id='doc' value='doc' style='cursor: pointer;'><label for='doc'></label>" + 
						 "<p class='label-checkbox'>doc (Word)</p>";
	
	formType.appendChild(divItem2);
	
	labelCheckBox = divItem2.childNodes[2];
	labelCheckBox.style.cursor = "pointer";
	labelCheckBox.onclick = function(){divItem2.childNodes[0].checked = true;};
	
	// Item 3
	var divItem3 = document.createElement('div');
	divItem3.setAttribute("class", "item");
	/*var divInput3 = document.createElement('input');
	divInput3.type = "radio";
	divInput3.name = "gStyle";
	divInput3.id = "odt";
	divInput3.value = "odt";
	divInput3.style = "cursor: pointer;";
	var label3 = document.createElement('label');
	label3.setAttribute("for", "odt");
	divInput3.appendChild(label3);
	divItem3.appendChild(divInput3);
	
	var pLabel3 = document.createElement('p');
	pLabel3.setAttribute("class", "label-checkbox");
	pLabel3.innerHTML = "odt (Open Office/Libre Office)";
	divItem3.appendChild(pLabel3);*/
	
	divItem3.innerHTML = "<input type='radio' name='gStyle' id='odt' value='odt' style='cursor: pointer;'><label for='odt'></label>" + 
						 "<p class='label-checkbox'>odt (Open Office/Libre Office)</p>";
	
	formType.appendChild(divItem3);
	
	labelCheckBox = divItem3.childNodes[2];
	labelCheckBox.style.cursor = "pointer";
	labelCheckBox.onclick = function(){divItem3.childNodes[0].checked = true;};
	
	mainDiv1.appendChild(formType);
	
	divPremPopupVPremium.appendChild(mainDiv1);
	
	// Buttons
	var divButtons = document.createElement('div');
	divButtons.setAttribute("class", "buttons");
	var table = document.createElement('table');
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	var divB = document.createElement('div');
	divB.setAttribute("class", "Cor-RedButton");
	divB.id = "download-txt";
	divB.style = "padding-left: 40px; padding-right: 40px;";
	if(Cor.IdLangue == "fr") divB.innerHTML = "Télécharger";
	else if(Cor.IdLangue == "en") divB.innerHTML = "Download";
	td.appendChild(divB);
	tr.appendChild(td);
	table.appendChild(tr);
	divButtons.appendChild(table);
	
	divPremPopupVPremium.appendChild(divButtons);
	
	document.body.appendChild(divPremPopupVPremium);
},

// Download
Download : function()
{
	// Content
	var htmlString= document.getElementById("FrameTx").contentWindow.document.body.innerHTML;
	var stripedHtml_txt = htmlString.replace(/<br>/g, "\r\n");
	stripedHtml_txt = stripedHtml_txt.replace(/<[^>]+>/g, '');
	var stripedHtml = htmlString.replace(/<[^>]+>/g, '');

	// Specify format name
	var format = document.querySelector('input[name=gStyle]:checked').value;
	
	if(format == 'odt'){
		Cor.DownloadOdt('scribens.odt', stripedHtml_txt);
	} else if (format == 'doc'){
		Cor.DownloadDoc('scribens.doc', 'FrameTx');
	}else if (format == 'txt'){
		Cor.DownloadTxt('scribens.txt', stripedHtml_txt);
	} else {
		Cor.DownloadTxt('scribens.txt', stripedHtml_txt);
	}
	document.querySelector('.popaction').classList.remove("openpop"); 
},

// Download .txt
DownloadTxt : function(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
},

// Download .odt
DownloadOdt : function(filename, text) {
	var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Scribens</title></head><body>";
	var postHtml = "</body></html>";				
	var html = preHtml+text+postHtml;
	var blob = new Blob(['\ufeff', html], {
		type: 'application/msword'
	});
	// Specify link url
	var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
	// Create download link element
	var downloadLink = document.createElement("a");
	document.body.appendChild(downloadLink);
	if(navigator.msSaveOrOpenBlob ){
		navigator.msSaveOrOpenBlob(blob, filename);
	}else{
		// Create a link to the file
		downloadLink.href = url;
		// Setting the file name
		downloadLink.download = filename;
		//triggering the function
		downloadLink.click();
	}
},

// Download docx
DownloadDoc : function(filename, elId) {
	var elHtml = document.getElementById(elId).contentWindow.document.body.innerHTML;
	// var link = document.createElement('a');
	// link.setAttribute('download', filename);
	// link.setAttribute('href', 'data:' + 'text/doc' + ' content="text/html;' + ';charset=Windows-1252,' + encodeURIComponent(elHtml));
	// document.body.appendChild(link);
	// link.click(); 
	// document.body.removeChild(link);
	var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='UTF-8'><title>Export HTML To Doc</title></head><body>";
	var postHtml = "</body></html>";				
	var html = preHtml+elHtml+postHtml;
	var blob = new Blob(['\ufeff', html], {
		type: 'application/msword'
	});
	// Specify link url
	var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
	// Create download link element
	var downloadLink = document.createElement("a");
	document.body.appendChild(downloadLink);
	if(navigator.msSaveOrOpenBlob ){
		navigator.msSaveOrOpenBlob(blob, filename);
	}else{
		// Create a link to the file
		downloadLink.href = url;
		// Setting the file name
		downloadLink.download = filename;
		//triggering the function
		downloadLink.click();
	}
},

SharePopup : function()
{
	var divPremPopupVPremium = document.createElement('div');
	divPremPopupVPremium.setAttribute("class", "Prem-PopupVPremium popaction share-pop");
	
	// Div closer
	var divCloser = document.createElement('div');
	divCloser.setAttribute("class", "closer");
	var imgCloser = document.createElement('img');
	imgCloser.src = "images/CloseCrossWhite.png";
	imgCloser.style = "cursor: pointer; margin-right: 10px; margin-top: 10px;";
	divCloser.appendChild(imgCloser);
	divPremPopupVPremium.appendChild(divCloser);
	
	// Main div
	var mainDiv1 = document.createElement('div');
	mainDiv1.setAttribute("class", "maindiv");
	
	// Title
	var div1 = document.createElement('div');
	var divLabelTel = document.createElement('div');
	divLabelTel.setAttribute("class", "titre");
	if(Cor.IdLangue == "fr") divLabelTel.innerHTML = "Partager";
	else if(Cor.IdLangue == "en") divLabelTel.innerHTML = "Share";
	div1.appendChild(divLabelTel);
	mainDiv1.appendChild(div1);
	
	// Text description
	var pDesc = document.createElement('p');
	pDesc.style.marginBottom = "25px";
	pDesc.style.textAlign = "center";
	if(Cor.IdLangue == "fr") pDesc.innerHTML = "Choisissez une des applications suivantes :"
	else if(Cor.IdLangue == "en") pDesc.innerHTML = "Choose how you want to share:"
	mainDiv1.appendChild(pDesc);	
			
	// Message apps
	
	var ulMessageApp = document.createElement('ul');
	ulMessageApp.setAttribute("class", "social-share");
	
	// Outlook
	var liShareOutlook = document.createElement('li');
	liShareOutlook.id = "share-outlook";
	var divShareOutlook = document.createElement('div');
	divShareOutlook.setAttribute("class", "icon share-outlook");
	var imgShareOutlook = document.createElement('img');
	imgShareOutlook.src = "images/icone/outlook.svg";
	imgShareOutlook.alt = "";
	divShareOutlook.appendChild(imgShareOutlook);
	var labelShareOutlook = document.createTextNode(" Outlook");
	divShareOutlook.appendChild(labelShareOutlook);
	var pShareOutlook = document.createElement('p');
	if(Cor.IdLangue == "fr") pShareOutlook.innerHTML = "La taille d'exportation est limitée à 1500 caractères.";
	else if(Cor.IdLangue == "en") pShareOutlook.innerHTML = "Sorry, the limit for sharing is 1500 characters.";
	divShareOutlook.appendChild(pShareOutlook);
	liShareOutlook.appendChild(divShareOutlook);
	ulMessageApp.appendChild(liShareOutlook);
	
	// Gmail
	var liShareGmail = document.createElement('li');
	liShareGmail.id = "share-gmail";
	var divShareGmail = document.createElement('div');
	divShareGmail.setAttribute("class", "icon share-gmail");
	var imgShareGmail = document.createElement('img');
	imgShareGmail.src = "images/icone/gmail.svg";
	imgShareGmail.alt = "";
	divShareGmail.appendChild(imgShareGmail);
	var labelShareGmail = document.createTextNode(" Gmail");
	divShareGmail.appendChild(labelShareGmail);
	var pShareGmail = document.createElement('p');
	if(Cor.IdLangue == "fr") pShareGmail.innerHTML = "La taille d'exportation est limitée à 5500 caractères.";
	else if(Cor.IdLangue == "en") pShareGmail.innerHTML = "Sorry, the limit for sharing is 5500 characters.";
	divShareGmail.appendChild(pShareGmail);
	liShareGmail.appendChild(divShareGmail);
	ulMessageApp.appendChild(liShareGmail);
	
	// Yahoo
	var liShareYahoo = document.createElement('li');
	liShareYahoo.id = "share-yahoo";
	var divShareYahoo = document.createElement('div');
	divShareYahoo.setAttribute("class", "icon share-yahoo");
	var imgShareYahoo = document.createElement('img');
	imgShareYahoo.src = "images/icone/yahoo.svg";
	imgShareYahoo.alt = "";
	divShareYahoo.appendChild(imgShareYahoo);
	var labelShareYahoo = document.createTextNode(" Yahoo");
	divShareYahoo.appendChild(labelShareYahoo);
	var pShareYahoo = document.createElement('p');
	if(Cor.IdLangue == "fr") pShareYahoo.innerHTML = "La taille d'exportation est limitée à 2000 caractères.";
	else if(Cor.IdLangue == "en") pShareYahoo.innerHTML = "Sorry, the limit for sharing is 2000 characters.";
	divShareYahoo.appendChild(pShareYahoo);
	liShareYahoo.appendChild(divShareYahoo);
	ulMessageApp.appendChild(liShareYahoo);
	
	mainDiv1.appendChild(ulMessageApp);
	
	// Social networks
	
	var ulSocialNetworks = document.createElement('ul');
	ulSocialNetworks.setAttribute("class", "social-share");
	
	// Twitter
	var liShareTwitter = document.createElement('li');
	liShareTwitter.id = "share-twitter";
	var divShareTwitter = document.createElement('div');
	divShareTwitter.setAttribute("class", "icon share-twitter");
	var imgShareTwitter = document.createElement('img');
	imgShareTwitter.src = "images/icone/twitter.svg";
	imgShareTwitter.alt = "";
	divShareTwitter.appendChild(imgShareTwitter);
	var labelShareTwitter = document.createTextNode(" Twitter");
	divShareTwitter.appendChild(labelShareTwitter);
	var pShareTwitter = document.createElement('p');
	if(Cor.IdLangue == "fr") pShareTwitter.innerHTML = "La taille d'exportation est limitée à 280 caractères.";
	else if(Cor.IdLangue == "en") pShareTwitter.innerHTML = "Sorry, the limit for sharing is 280 characters.";
	divShareTwitter.appendChild(pShareTwitter);
	liShareTwitter.appendChild(divShareTwitter);
	ulSocialNetworks.appendChild(liShareTwitter);
	
	// LinkedIn
	var liShareLinkedIn = document.createElement('li');
	liShareLinkedIn.id = "share-linkedin";
	var divShareLinkedIn = document.createElement('div');
	divShareLinkedIn.setAttribute("class", "icon share-linkedin");
	var imgShareLinkedIn = document.createElement('img');
	imgShareLinkedIn.src = "images/icone/linkedin.svg";
	imgShareLinkedIn.alt = "";
	divShareLinkedIn.appendChild(imgShareLinkedIn);
	var labelShareLinkedIn = document.createTextNode(" LinkedIn");
	divShareLinkedIn.appendChild(labelShareLinkedIn);
	var pShareLinkedIn = document.createElement('p');
	if(Cor.IdLangue == "fr") pShareLinkedIn.innerHTML = "La taille d'exportation est limitée à 5000 caractères.";
	else if(Cor.IdLangue == "en") pShareLinkedIn.innerHTML = "Sorry, the limit for sharing is 5000 characters.";
	divShareLinkedIn.appendChild(pShareLinkedIn);
	liShareLinkedIn.appendChild(divShareLinkedIn);
	ulSocialNetworks.appendChild(liShareLinkedIn);
	
	mainDiv1.appendChild(ulSocialNetworks);
	
	divPremPopupVPremium.appendChild(mainDiv1);
	
	document.body.appendChild(divPremPopupVPremium);
},

// Share
Share : function()
{
	// Content
	var htmlString = document.getElementById("FrameTx").contentWindow.document.body.innerHTML;
	var compareString = htmlString.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, " ");

	if (document.getElementsByClassName('sidebar')[0].style.length) {
		var stripedHtml_txt = htmlString.replace(/<br>/g, "%0A");
	} else {
		var stripedHtml_txt = htmlString.replace(/<\/p><p>/g, "%0A").replace(/<br>/g, "%0A");
		// var stripedHtml_txt = htmlString.replace(/<\/p><p>/g, "<br>");
	}
	// console.log(decodeURIComponent(stripedHtml_txt));
	// 
	var stripedHtml = encodeURIComponent(stripedHtml_txt.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, " ")).replace(/%250A/g, '%0A');
	
	console.log(stripedHtml);
	
	// Outlook
	if (compareString.length > 1500) {
		$('.share-outlook').addClass('disabled');
		document.getElementById("share-outlook").onclick = function() {};
	} else {
		$('.share-outlook').removeClass('disabled');
		document.getElementById("share-outlook").onclick = function() {
			var link = 'http://outlook.live.com/mail/0/deeplink/compose?body=' + stripedHtml;
			window.open(link, '_blank');
		}; 
	}
	
	// Gmail
	if (compareString.length > 5500) {
		$('.share-gmail').addClass('disabled');
		document.getElementById("share-gmail").onclick = function() {};
	} else {
		$('.share-gmail').removeClass('disabled');
		document.getElementById("share-gmail").onclick = function() {
			var link = 'https://mail.google.com/mail/?view=cm&body=' + stripedHtml;
			window.open(link, '_blank');
		}; 
	}
	
	// Yahoo
	if (compareString.length > 2000) {
		$('.share-yahoo').addClass('disabled');
		document.getElementById("share-yahoo").onclick = function() {};
	} else {
		$('.share-yahoo').removeClass('disabled');
		document.getElementById("share-yahoo").onclick = function() {	
			var link = 'http://compose.mail.yahoo.com/?body=' + stripedHtml;
			window.open(link, '_blank');
		}; 
	}

	// Twitter
	if (compareString.length > 280) {
		$('.share-twitter').addClass('disabled');
		document.getElementById("share-twitter").onclick = function() {};
	} else {
		$('.share-twitter').removeClass('disabled');
		document.getElementById("share-twitter").onclick = function() {
			var link = 'https://twitter.com/intent/tweet?text=' + stripedHtml;
			window.open(link, '_blank');
		}; 
	}
	
	// LinkedIn
	if (compareString.length > 5000) {
		$('.share-linkedin').addClass('disabled');
		document.getElementById("share-linkedin").onclick = function() {};
	} else {
		$('.share-linkedin').removeClass('disabled');
		document.getElementById("share-linkedin").onclick = function() {
			var link = 'https://www.linkedin.com/messaging/thread/new/?body=' + stripedHtml;
			window.open(link, '_blank');
		}; 
	}
	
	document.querySelector('.popaction.share-pop').classList.add("openpop"); 

}


}

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
		
		textHtml += '</p><p>';
	}
	
	if(textHtml.endsWith('<br>')) textHtml = textHtml.substring(0, textHtml.length - 4);
	
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
							}
							//else {
							//	$('.Cor-PopupPanelExpSol.open').css('top', pos_Y + $('.Cor-PopupPanelListeSol.open').outerHeight() + 15 );
							//}
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
	else if(Cor.IsIOS == true && (Cor.IsMobile == true || Cor.IsTablet == true)) cssLink.href = "Css/TextEditor_tablet_ios.css";
	
	cssLink.rel = "stylesheet"; 
	cssLink.type = "text/css";
	
	// On load of the text area, put the placeholder.
	cssLink.onload = function(){
		if(!(Cor.IsIOS == true && (Cor.IsMobile == true || Cor.IsTablet == true)))
		{
			// Init the document with an empty paragraph.
			if(Plugins.Type == null)
			{
				if(Cor.IdLangue == "fr") TextEditor.Document.body.innerHTML = TextEditor.TextPlaceHolder_Fr;
				else if(Cor.IdLangue == "en") TextEditor.Document.body.innerHTML = TextEditor.TextPlaceHolder_En;
			}
			// Plugin mode
			else
			{
				TextEditor.Document.body.innerHTML = "<p></p>";
			}
		}
		// iPhone and iPad. Ask to the user to paste
		else
		{
			if(Cor.IdLangue == 'fr') TextEditor.Document.body.innerHTML = "<p>Collez votre texte ici.</p>";
			else if(Cor.IdLangue == 'en') TextEditor.Document.body.innerHTML = "<p>Paste your text here.</p>";
		}
	};

	TextEditor.Document.childNodes[0].childNodes[0].appendChild(cssLink);
	
	// Set Paste event. Plain Text.
	var elementFocusable = TextEditor.Document;
	if(Cor.IsIE || Cor.IsIE10 || Cor.IsIE11 || Cor.IsEdge) elementFocusable = TextEditor.Document.body;
	
	// Functions for placeholder text to disappear
	if(!Cor.IsEdge)
	{
		body.addEventListener('focus', function(){
			if((this.innerHTML == TextEditor.TextPlaceHolder_Fr && Cor.IdLangue == "fr") ||
			   (this.innerHTML == TextEditor.TextPlaceHolder_En && Cor.IdLangue == "en"))
			{
				this.innerHTML = "<p></p>";
			}
		});
	}

	// Functions for placeholder text to appear if the text is empty
	body.addEventListener('blur', function() {
		if ((this.innerHTML == "<p></p>" || this.innerHTML == "<p><br></p>") && Cor.IdLangue == "fr") {
			this.innerHTML = TextEditor.TextPlaceHolder_Fr;
		} else if ((this.innerHTML == "<p></p>" || this.innerHTML == "<p><br></p>") && Cor.IdLangue == "en") {
			this.innerHTML = TextEditor.TextPlaceHolder_En;
		}
	});
	
	// On paste
	elementFocusable.onpaste = function(event)
	{
		if(!(Cor.IsIOS == false && (Cor.IsMobile == true || Cor.IsTablet == true)))
		{
			// Cancel event
			event.preventDefault();
			
			// Bloque l'�venement paste en mode plugin
			if(Plugins.Type == null)
			{
				// Problem of paste with placeholder. If focus at the palceholder, then problem.
				if((TextEditor.Document.body.innerHTML == TextEditor.TextPlaceHolder_Fr && Cor.IdLangue == "fr") ||
				   (TextEditor.Document.body.innerHTML == TextEditor.TextPlaceHolder_En && Cor.IdLangue == "en"))
				{
					TextEditor.Document.body.innerHTML = "<p></p>";
				}
			
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
		
		// If placeholder here, then remove it.
		if((TextEditor.Document.body.innerHTML == TextEditor.TextPlaceHolder_Fr && Cor.IdLangue == "fr") ||
	       (TextEditor.Document.body.innerHTML == TextEditor.TextPlaceHolder_En && Cor.IdLangue == "en"))
		{
			TextEditor.Document.body.innerHTML = "<p></p>";
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
},

TextPlaceHolder_Fr : "<p>Tapez ou collez votre texte ici...</p>",
TextPlaceHolder_En : "<p>Type or paste your text here...</p>",

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

var Proofreading = {

// Panel of proofreading presentation
Presentation_ProofreadingI : null,

// Id Request
IdRequest : "",

// Paid
Paid : false,

// Panel of proofreading presentation
Presentation_Proofreading : function()
{
	this.MainDiv = document.createElement('div');
	this.MainDiv.style.borderStyle = "solid";
	this.MainDiv.style.borderColor = "#d0d0d0";
	this.MainDiv.style.borderWidth = "1px";
	this.MainDiv.style.padding = "10px";
	this.MainDiv.style.paddingTop = "30px";
	this.MainDiv.setAttribute("align", "center");
	
	// Title
	var labelTitle = document.createElement('div');
	labelTitle.className = "Prem-TexteBasePremium";
	labelTitle.innerHTML = "Vous souhaitez faire corriger votre texte par un professionnel ?";
	labelTitle.style.fontSize = "26px";
	labelTitle.style.color = "#2E2E2E";
	labelTitle.style.marginBottom = "10px";
	this.MainDiv.appendChild(labelTitle);
	
	// Label 1
	var label1 = document.createElement('div');
	label1.className = "Prem-TexteBasePremium";
	label1.innerHTML = "Nos professionnels sont " + String.fromCharCode(224) + " votre disposition pour vous garantir un texte sans aucune faute.";
	label1.style.fontSize = "18px";
	label1.style.color = "#2E2E2E";
	label1.style.marginBottom = "10px";
	this.MainDiv.appendChild(label1);
	
	// Ic�nes
	var tableIcons = document.createElement('table');
	tableIcons.style.marginTop = "40px";
	tableIcons.style.paddingBottom = "20px";
	//tableIcons.style.borderBottom = "1px solid #AEAEAE";
	
	// Proofreaders
	var tdProofreaders = document.createElement('td');
	tdProofreaders.align = "center";
	tdProofreaders.width = "200px";
	
	var imgProofreaders = document.createElement('img');
	imgProofreaders.src = "images/icone/Proofreader.png";
	imgProofreaders.style.marginBottom = "10px";
	tdProofreaders.appendChild(imgProofreaders);
	
	var labelProofreader = document.createElement('div');
	labelProofreader.className = "Prem-TexteBasePremium";
	labelProofreader.style.fontSize = "18px";
	labelProofreader.style.color = "#2E2E2E";
	labelProofreader.style.marginBottom = "10px";
	labelProofreader.innerHTML = "Nos correcteurs ont une longue exp" + String.fromCharCode(233) + "rience en relecture. Ils disposent tous du <a href='https://www.certificat-voltaire.fr' target='_blank'>certificat Voltaire</a> niveau Expert.";
	tdProofreaders.appendChild(labelProofreader);
	
	tableIcons.appendChild(tdProofreaders);
	
	// Quick Time
	var tdQuickTime = document.createElement('td');
	tdQuickTime.align = "center";
	tdQuickTime.width = "200px";
	
	var imgQuickTime = document.createElement('img');
	imgQuickTime.src = "images/icone/Quick.png";
	imgQuickTime.style.marginBottom = "10px";
	tdQuickTime.appendChild(imgQuickTime);
	
	var labelQuickTime = document.createElement('div');
	labelQuickTime.className = "Prem-TexteBasePremium";
	labelQuickTime.style.fontSize = "18px";
	labelQuickTime.style.color = "#2E2E2E";
	labelQuickTime.style.marginBottom = "10px";
	labelQuickTime.style.marginLeft = "20px";
	labelQuickTime.style.marginRight = "20px";
	labelQuickTime.innerHTML = "<p>Simple, rapide et efficace.</p>";
	tdQuickTime.appendChild(labelQuickTime);
	
	tableIcons.appendChild(tdQuickTime);
	
	// Security
	var tdSecurity = document.createElement('td');
	tdSecurity.align = "center";
	tdSecurity.width = "200px";
	
	var imgSecurity = document.createElement('img');
	imgSecurity.src = "images/icone/Security.png";
	imgSecurity.style.marginBottom = "10px";
	tdSecurity.appendChild(imgSecurity);
	
	var labelSecurity = document.createElement('div');
	labelSecurity.className = "Prem-TexteBasePremium";
	labelSecurity.style.fontSize = "18px";
	labelSecurity.style.color = "#2E2E2E";
	labelSecurity.style.marginBottom = "10px";
	labelSecurity.innerHTML = "Le transfert de vos textes est prot" + String.fromCharCode(233) + "g" + String.fromCharCode(233) + " gr" + String.fromCharCode(226) + "ce " + String.fromCharCode(224) + " une connexion SSL s" + String.fromCharCode(233) + "curis" + String.fromCharCode(233) + "e (protocole https). Apr" + String.fromCharCode(232) + "s correction, les textes sont automatiquement supprim" + String.fromCharCode(233) + "s sur nos serveurs.";
	tdSecurity.appendChild(labelSecurity);
	
	tableIcons.appendChild(tdSecurity);
	
	this.MainDiv.appendChild(tableIcons);
	
	// Bouton de devis
	var labelDevis = document.createElement('div');
	labelDevis.style.color = "#348EBF";
	labelDevis.style.fontSize = "24px";
	labelDevis.style.paddingTop = "10px";
	labelDevis.style.marginBottom = "20px";
	labelDevis.align = "left";
	labelDevis.style.borderTop = "1px solid #AEAEAE";
	labelDevis.innerHTML = "Obtenez un devis instantan" + String.fromCharCode(233);
	this.MainDiv.appendChild(labelDevis);
	
	/*var buttonDevis = document.createElement('div');
	buttonDevis.className = "Cor-RedButton";
	buttonDevis.innerHTML = "Demander imm" + String.fromCharCode(233) + "diatement un devis";
	//buttonDevis.setAttribute("align", "center");
	buttonDevis.style.marginTop = "40px";
	buttonDevis.style.marginBottom = "40px";
	buttonDevis.style.fontSize = "20px";
	buttonDevis.style.width = "400px";
	buttonDevis.style.textAlign = "center";
	this.MainDiv.appendChild(buttonDevis);*/
	
	// Fichier .docx
	var tableSendFile = document.createElement('table');
	tableSendFile.style.marginBottom = "20px";
	
	var tdSendFileDocX = document.createElement('td');
	var sendFileDocX = document.createElement('div');
	sendFileDocX.style.marginTop = "20px";
	sendFileDocX.style.marginRight = "50px";
	// sendFileDocX.innerHTML = "<b>Envoyez votre document :</b><br><br>Types de fichiers accept" + String.fromCharCode(233) + "s :<br>- Word (<b>.docx</b>)<br>- Open Office/Libre Office (<b>.odt</b>)<br>- Fichiers <b>.pdf</b><br>- PowerPoint (<b>.pptx</b>)<br>- Excel (<b>.xlsx</b>)<br>- Fichiers texte (<b>.txt</b>)";
	// Pdf type deleted
	sendFileDocX.innerHTML = "<b>Envoyez votre document :</b><br><br>Types de fichiers accept" + String.fromCharCode(233) + "s :<br>- Word (<b>.docx</b>)<br>- Open Office/Libre Office (<b>.odt</b>)<br>- PowerPoint (<b>.pptx</b>)<br>- Excel (<b>.xlsx</b>)<br>- Fichiers texte (<b>.txt</b>)";
	
	tdSendFileDocX.appendChild(sendFileDocX);
	tableSendFile.appendChild(tdSendFileDocX);
	
	// Upload file
	var tdUploadFile = document.createElement('td');
	var divUploadFile = document.createElement('div');
	// Input
	var uploadFile = document.createElement('input');
	uploadFile.type = "file";
	uploadFile.style.width = "350px";
	uploadFile.id = "pf_InputFile";
	uploadFile.title = "";
	uploadFile.onchange = function(){Proofreading.CheckFile();}
	divUploadFile.appendChild(uploadFile);
	// Error type file label
	var labelErrorTypeFile = document.createElement('div');
	labelErrorTypeFile.id = "pf_ErrorTypeFile";
	labelErrorTypeFile.className = "Prem-TexteBasePremium";
	labelErrorTypeFile.style.fontSize = "16px";
	labelErrorTypeFile.style.fonwtWeight = "bold";
	labelErrorTypeFile.style.color = "#2E2E2E";
	labelErrorTypeFile.style.marginTop = "10px";
	labelErrorTypeFile.style.visibility = "hidden";
	labelErrorTypeFile.innerHTML = "Le type de fichier n'est pas valide.";
	divUploadFile.appendChild(labelErrorTypeFile);
	tdUploadFile.appendChild(divUploadFile);
	tableSendFile.appendChild(tdUploadFile);
	
	this.MainDiv.appendChild(tableSendFile);
	
	// Panel wait
	var panelWait = document.createElement('div');
	panelWait.id = "pf_PanelWait";
	panelWait.style.display = "none";
	
	var imgWait = document.createElement('img');
	imgWait.src = "images/progress.gif";
	imgWait.style.marginTop = "50px";
	imgWait.style.marginBottom = "50px";
	panelWait.appendChild(imgWait);
	
	// Label wait
	var divTextWait = document.createElement("div");
	divTextWait.style.fontSize = "18px";
	divTextWait.style.marginBottom = "20px";
	divTextWait.innerHTML = "Veuillez patienter...";
	panelWait.appendChild(divTextWait);
	
	this.MainDiv.appendChild(panelWait);
	
	// Word number.
	var tableWordNumber = document.createElement("table");
	tableWordNumber.id = "pf_TableWordNumber";
	tableWordNumber.style.fontSize = "14px";
	tableWordNumber.style.display = "none";
	tableWordNumber.style.paddingBottom = "15px";
	//tableWordNumber.align = "left";
	var tdLabelWordNumber = document.createElement("td");
	tdLabelWordNumber.innerHTML = "<b>Nombre de mots approximatif :&nbsp;</b>";
	tableWordNumber.appendChild(tdLabelWordNumber);
	var tdWordNumber = document.createElement("td");
	tdWordNumber.id = "pf_WordNumber";
	tableWordNumber.appendChild(tdWordNumber);
	this.MainDiv.appendChild(tableWordNumber);
	
	// Table devis
	var tableDevis = document.createElement("table");
	tableDevis.id = "pf_TableDevis";
	tableDevis.style.display = "none";
	tableDevis.style.border = "1px solid #AEAEAE";
	tableDevis.style.fontSize = "14px";
	tableDevis.style.textAlign = "center";
	
	// 1. Titles
	var trTitles = document.createElement("tr");
	trTitles.style.fontWeight = "bold";
	
	// Type de correction
	var tdCorrectionType = document.createElement("td");
	tdCorrectionType.style.borderBottom = "1px solid #AEAEAE";
	tdCorrectionType.style.borderRight = "1px solid #AEAEAE";
	tdCorrectionType.style.padding = "5px";
	tdCorrectionType.innerHTML = "Type de prestation";
	trTitles.appendChild(tdCorrectionType);
	
	// Delivery date
	var tdDateLivraison = document.createElement("td");
	tdDateLivraison.style.borderBottom = "1px solid #AEAEAE";
	tdDateLivraison.style.borderRight = "1px solid #AEAEAE";
	tdDateLivraison.style.padding = "5px";
	tdDateLivraison.innerHTML = "Date de livraison estim" + String.fromCharCode(233) + "e";
	trTitles.appendChild(tdDateLivraison);
	
	// Unit Price
	var tdUnitPrice = document.createElement("td");
	tdUnitPrice.style.borderBottom = "1px solid #AEAEAE";
	tdUnitPrice.style.borderRight = "1px solid #AEAEAE";
	tdUnitPrice.style.padding = "5px";
	tdUnitPrice.innerHTML = "Prix unitaire TTC par mot";
	trTitles.appendChild(tdUnitPrice);
	
	// Total price
	var tdTotalPrice = document.createElement("td");
	tdTotalPrice.style.borderBottom = "1px solid #AEAEAE";
	tdTotalPrice.style.padding = "5px";
	tdTotalPrice.innerHTML = "Prix total TTC";
	trTitles.appendChild(tdTotalPrice);
	
	tableDevis.appendChild(trTitles);
	
	// 2. Correction type simple
	
	var trCorrectionTypeSimple = document.createElement("tr");
	
	// Type de correction
	var tableCorrectionTypeSimple = document.createElement("table");
	tableCorrectionTypeSimple.style.paddingBottom = "15px";
	tableCorrectionTypeSimple.style.borderBottom = "1px solid #AEAEAE";
	tableCorrectionTypeSimple.style.borderRight = "1px solid #AEAEAE";
	
	var tdRadioBox0 = document.createElement("td");
	var radioBox0 = document.createElement("input");
	radioBox0.id = "pf_RbCorType_simple";
	radioBox0.style.cursor = "pointer";
	radioBox0.checked = true;
	radioBox0.name = "CorrectionType";
	radioBox0.style.margin = "20px";
	radioBox0.type = "radio";
	radioBox0.onclick = function()
	{
		var price = document.getElementById('pf_TotalPrice_simple').Price;
		// Maj Paypal button with the price.
		Proofreading.MajButtonPaypal(price, Proofreading.IdRequest, "Simple");
	}
	tdRadioBox0.appendChild(radioBox0);
	tableCorrectionTypeSimple.appendChild(tdRadioBox0);
	
	var tdCorrectionType = document.createElement("td");
	tdCorrectionType.style.textAlign = "left";
	tdCorrectionType.innerHTML = "<b>Correction standard</b><br>Orthographe, grammaire, ponctuation, typographie, syntaxe, remarques.";
	tableCorrectionTypeSimple.appendChild(tdCorrectionType);
	
	trCorrectionTypeSimple.appendChild(tableCorrectionTypeSimple);
	
	// Delivery date
	var tdDateLivraison_simple = document.createElement("td");
	tdDateLivraison_simple.id = "pf_DateLivraison_simple";
	tdDateLivraison_simple.style.borderBottom = "1px solid #AEAEAE";
	tdDateLivraison_simple.style.borderRight = "1px solid #AEAEAE";
	tdDateLivraison_simple.style.paddingLeft = "5px";
	tdDateLivraison_simple.style.paddingRight = "5px";
	trCorrectionTypeSimple.appendChild(tdDateLivraison_simple);
	
	// Unit Price
	var tdUnitPrice_simple = document.createElement("td");
	tdUnitPrice_simple.id = "pf_UnitPrice_simple";
	tdUnitPrice_simple.style.borderBottom = "1px solid #AEAEAE";
	tdUnitPrice_simple.style.borderRight = "1px solid #AEAEAE";
	trCorrectionTypeSimple.appendChild(tdUnitPrice_simple);
	
	// Total price
	var tdTotalPrice_simple = document.createElement("td");
	tdTotalPrice_simple.id = "pf_TotalPrice_simple";
	tdTotalPrice_simple.style.borderBottom = "1px solid #AEAEAE";
	trCorrectionTypeSimple.appendChild(tdTotalPrice_simple);
	
	tableDevis.appendChild(trCorrectionTypeSimple);
	
	// 3. Correction type advanced
	
	var trCorrectionTypeAdvanced = document.createElement("tr");
	
	// Type de correction
	var tableCorrectionTypeAdvanced = document.createElement("table");
	tableCorrectionTypeAdvanced.style.paddingBottom = "15px";
	tableCorrectionTypeAdvanced.style.borderRight = "1px solid #AEAEAE";
	var tdRadioBox1 = document.createElement("td");
	var radioBox1 = document.createElement("input");
	radioBox1.id = "pf_RbCorType_advanced";
	radioBox1.type = "radio";
	radioBox1.style.cursor = "pointer";
	radioBox1.style.margin = "20px";
	radioBox1.name = "CorrectionType";
	radioBox1.onclick = function()
	{
		var price = document.getElementById('pf_TotalPrice_advanced').Price;
		// Maj Paypal button with the price.
		Proofreading.MajButtonPaypal(price, Proofreading.IdRequest, "Advanced");
	}
	tdRadioBox1.appendChild(radioBox1);
	tableCorrectionTypeAdvanced.appendChild(tdRadioBox1);
	
	// Type de correction
	var tdCorrectionType = document.createElement("td");
	tdCorrectionType.style.textAlign = "left";
	tdCorrectionType.innerHTML = "<b>Correction avanc" + String.fromCharCode(233) + "e</b><br>Correction standard, reformulations, r" + String.fromCharCode(233) + String.fromCharCode(233) + "criture, remarques.";
	tableCorrectionTypeAdvanced.appendChild(tdCorrectionType);
	
	trCorrectionTypeAdvanced.appendChild(tableCorrectionTypeAdvanced);
	
	// Delivery date
	var tdDateLivraison_advanced = document.createElement("td");
	tdDateLivraison_advanced.id = "pf_DateLivraison_advanced";
	tdDateLivraison_advanced.style.borderRight = "1px solid #AEAEAE";
	tdDateLivraison_advanced.style.paddingLeft = "5px";
	tdDateLivraison_advanced.style.paddingRight = "5px";
	trCorrectionTypeAdvanced.appendChild(tdDateLivraison_advanced);
	
	// Unit Price
	var tdUnitPrice_advanced = document.createElement("td");
	tdUnitPrice_advanced.id = "pf_UnitPrice_advanced";
	tdUnitPrice_advanced.style.borderRight = "1px solid #AEAEAE";
	trCorrectionTypeAdvanced.appendChild(tdUnitPrice_advanced);
	
	// Total price
	var tdTotalPrice_advanced = document.createElement("td");
	tdTotalPrice_advanced.id = "pf_TotalPrice_advanced";
	trCorrectionTypeAdvanced.appendChild(tdTotalPrice_advanced);
	
	tableDevis.appendChild(trCorrectionTypeAdvanced);
	
	this.MainDiv.appendChild(tableDevis);
	
	// Important remarks
	var divRemarks = document.createElement('div');
	divRemarks.id = "pf_ImportantRemarks";
	divRemarks.align = "left";
	divRemarks.style.fontSize = "13px";
	divRemarks.style.display = "none";
	divRemarks.style.paddingTop = "20px";
	var labelImportantRemarks = document.createElement('div');
	labelImportantRemarks.innerHTML = "Remarques importantes :";
	labelImportantRemarks.style.fontWeight = "bold";
	labelImportantRemarks.style.paddingBottom = "10px";
	divRemarks.appendChild(labelImportantRemarks);
	
	// No reformulation
	var labelNoReformation = document.createElement('div');
	labelNoReformation.innerHTML = "- La correction standard ne prend pas en compte la reformulation de phrases.";
	divRemarks.appendChild(labelNoReformation);
	
	// Two much mistakes
	var labeltooMuchMistakes = document.createElement('div');
	labeltooMuchMistakes.innerHTML = "- Si le texte comporte un nombre de fautes exceptionnellement " + String.fromCharCode(233) + "lev" + String.fromCharCode(233) + " ou est tr" + String.fromCharCode(232) + "s mal " + String.fromCharCode(233) + "crit, il sera refus" + String.fromCharCode(233) + ".";
	divRemarks.appendChild(labeltooMuchMistakes);
	
	// Refund if mistakes
	var labelRefundMistakes = document.createElement('div');
	labelRefundMistakes.innerHTML = "- Si le client d" + String.fromCharCode(233) + "tecte la moindre erreur sur le document corrig" + String.fromCharCode(233) + ", il pourra " + String.fromCharCode(234) + "tre imm" + String.fromCharCode(233) + "diatement rembours" + String.fromCharCode(233) + ".";
	divRemarks.appendChild(labelRefundMistakes);
	
	// Delay range
	var labelRangeDelay = document.createElement('div');
	labelRangeDelay.innerHTML = "- La livraison du texte pourrait " + String.fromCharCode(234) + "tre report" + String.fromCharCode(233) + "e en cas d'indisponibilit" + String.fromCharCode(233) + " exceptionnelle d'un correcteur (Ex : raison de sant" + String.fromCharCode(233) + ").";
	divRemarks.appendChild(labelRangeDelay);
	
	this.MainDiv.appendChild(divRemarks);
	
	
	// Message of busy proofreaders
	var labelBusyProofreader = document.createElement('div');
	labelBusyProofreader.className = "Prem-TexteBasePremium";
	labelBusyProofreader.id = "pf-labelBusyProofreader";
	labelBusyProofreader.style.fontSize = "24px";
	labelBusyProofreader.style.marginTop = "20px";
	labelBusyProofreader.style.marginBottom = "20px";
	labelBusyProofreader.style.display = "none";
	labelBusyProofreader.innerHTML = "D" + String.fromCharCode(233) + "sol" + String.fromCharCode(233) + ", en raison d'une forte demande, tous nos correcteurs sont actuellement occup" + String.fromCharCode(233) + "s.";
	this.MainDiv.appendChild(labelBusyProofreader);
	
	// Commande
	var labelCommande = document.createElement('div');
	labelCommande.className = "Prem-TexteBasePremium";
	labelCommande.style.fontSize = "24px";
	labelCommande.style.color = "#348EBF";
	labelCommande.style.paddingTop = "10px";
	labelCommande.style.marginTop = "30px";
	labelCommande.style.marginBottom = "20px";
	labelCommande.style.borderTop = "1px solid #AEAEAE";
	labelCommande.align = "left";
	//labelCommande.style.display = "block";
	labelCommande.innerHTML = "Commander";
	this.MainDiv.appendChild(labelCommande);
	
	// Table register
	var tableRegister = document.createElement('table');
	tableRegister.id = "pf_tableRegister";
	tableRegister.style.border = "1px solid #AEAEAE";
	tableRegister.style.padding = "10px";
	tableRegister.style.fontSize = "16px";
	
	// Name
	var trName = document.createElement('tr');
	var tdLabelName = document.createElement('td');
	tdLabelName.style.padding = "5px";
	var labelName = document.createElement('div');
	labelName.style.color = "#2E2E2E";
	labelName.style.paddingRight = "20px";
	labelName.style.fontWeight = "bold";
	labelName.innerHTML = "Pr" + String.fromCharCode(233) + "nom* :";
	tdLabelName.appendChild(labelName);
	trName.appendChild(tdLabelName);
	var tdInputName = document.createElement('td');
	tdInputName.style.padding = "5px";
	var inputName = document.createElement('input');
	inputName.id = "pf_InputName";
	inputName.style.width = "160px";
	inputName.disabled = "true";
	//inputName.style.marginBottom = "10px";
	tdInputName.appendChild(inputName);
	trName.appendChild(tdInputName);
	tableRegister.appendChild(trName);
	
	// Surname
	var trSurname = document.createElement('tr');
	var tdLabelSurname = document.createElement('td');
	tdLabelSurname.style.padding = "5px";
	var labelSurname = document.createElement('div');
	labelSurname.style.color = "#2E2E2E";
	labelSurname.style.paddingRight = "20px";
	labelSurname.style.fontWeight = "bold";
	//labelSurname.style.paddingBottom = "10px";
	labelSurname.innerHTML = "Nom* :";
	tdLabelSurname.appendChild(labelSurname);
	trSurname.appendChild(tdLabelSurname);
	var tdInputSurname = document.createElement('td');
	tdInputSurname.style.padding = "5px";
	var inputSurname = document.createElement('input');
	inputSurname.id = "pf_InputSurname";
	inputSurname.style.width = "160px";
	inputSurname.disabled = "true";
	tdInputSurname.appendChild(inputSurname);
	trSurname.appendChild(tdInputSurname);
	tableRegister.appendChild(trSurname);
	
	// Email
	var trEmail = document.createElement('tr');
	var tdLabelEmail = document.createElement('td');
	tdLabelEmail.style.padding = "5px";
	var labelEmail = document.createElement('div');
	labelEmail.style.color = "#2E2E2E";
	labelEmail.style.paddingRight = "20px";
	labelEmail.style.fontWeight = "bold";
	labelEmail.innerHTML = "E-mail* :";
	tdLabelEmail.appendChild(labelEmail);
	trEmail.appendChild(tdLabelEmail);
	var tdInputEmail = document.createElement('td');
	tdInputEmail.style.padding = "5px";
	var inputEmail = document.createElement('input');
	inputEmail.id = "pf_InputEmail";
	inputEmail.style.width = "160px";
	inputEmail.disabled = "true";
	tdInputEmail.appendChild(inputEmail);
	trEmail.appendChild(tdInputEmail);
	tableRegister.appendChild(trEmail);
	
	// Comments
	var trComments = document.createElement('tr');
	var tdLabelComments = document.createElement('td');
	tdLabelComments.style.padding = "5px";
	tdLabelComments.style.verticalAlign = "top";
	var labelComments = document.createElement('div');
	labelComments.style.color = "#2E2E2E";
	labelComments.style.paddingRight = "20px";
	labelComments.style.fontWeight = "bold";
	labelComments.align = "top";
	labelComments.innerHTML = "Pr" + String.fromCharCode(233) + "cisions particuli" + String.fromCharCode(232)  + "res<br>" + String.fromCharCode(224) + " apporter au correcteur :";
	tdLabelComments.appendChild(labelComments);
	trComments.appendChild(tdLabelComments);
	var tdTxComments = document.createElement('td');
	tdTxComments.style.padding = "5px";
	var txComments = document.createElement('textArea');
	txComments.id = "pf_TxComments";
	txComments.style.width = "220px";
	txComments.style.height = "200px";
	txComments.disabled = "true";
	tdTxComments.appendChild(txComments);
	trComments.appendChild(tdTxComments);
	tableRegister.appendChild(trComments);
	
	// Message error input
	var trRens = document.createElement('tr');
	var tdLabelError = document.createElement('td');
	var labelErrorInput = document.createElement('div');
	labelErrorInput.id = "pf_MessageErrorInput";
	labelErrorInput.style.fontSize = "13px";
	labelErrorInput.style.fontWeight = "bold";
	labelErrorInput.style.display = "none";
	tdLabelError.appendChild(labelErrorInput);
	trRens.appendChild(tdLabelError);
	
	var tdLabelChObligatoires = document.createElement('td');
	var labelChObligatoires = document.createElement('div');
	labelChObligatoires.id = "pf_MessageErrorInput";
	labelChObligatoires.style.fontSize = "13px";
	labelChObligatoires.style.fontWeight = "bold";
	labelChObligatoires.innerHTML = "* Champs obligatoires";
	tdLabelChObligatoires.appendChild(labelChObligatoires);
	trRens.appendChild(tdLabelChObligatoires);
	
	tableRegister.appendChild(trRens);
	
	// Champs obligatoires
	
	
	this.MainDiv.appendChild(tableRegister);
	
	// Paypal button
	var divPaypalButton = document.createElement('div');
	divPaypalButton.id = "pf_PaypalButton";
	divPaypalButton.style.paddingTop = "20px";
	
	// Check of all the information has been submited
	divPaypalButton.onclick = function(event)
	{
		// Ceck type of correction.
		var corType = "Simple";
		var rbCorType_Advanced = document.getElementById("pf_RbCorType_advanced");
		if(rbCorType_Advanced.checked == true) corType = "Advanced";
	
		// Check controls.
		var inputName = document.getElementById("pf_InputName");
		var name = inputName.value;
		var inputSurname = document.getElementById("pf_InputSurname");
		var surname = inputSurname.value;
		var condSurnameName = Util.Condition_SurnameName(surname, name);
		
		var inputEmail = document.getElementById("pf_InputEmail");
		var email = inputEmail.value;
		var condEmail = Util.Condition_Email(email);
		
		var txComments = document.getElementById("pf_TxComments");
		var comments = txComments.value;
		var condComments = Util.Condition_Comments(comments);
		
		var labelErrorInput = document.getElementById("pf_MessageErrorInput");
				
		if((condSurnameName == true) &&
		   (condEmail == true) &&
		   (condComments == true))
		{
			if(Proofreading.Paid == false)
			{
				Proofreading.Paid = true;
			
				labelErrorInput.style.display = "none";
				
				// Replace carriage returns by <br>
				comments = comments.replace(/(\r\n|\n|\r)/g, "<br>");
			
				// Send a request to register the command
				Util.SendHttpRequest('Proofreader_Servlet',
								[['FunctionName', 'RegisterCommand'],
								 ['IdRequest', Proofreading.IdRequest],
								 ['CorrectionType', corType],
								 ['EmailClient', email],
								 ['NameClient', name],
								 ['SurnameClient', surname],
								 ['Comments', comments]],
								 null);
				
				// Paypal Button
				
				
			}
			// Yet paid
			else
			{
				labelErrorInput.innerHTML = "Vous avez d"  + String.fromCharCode(233) + "j" + String.fromCharCode(224) + " effectu" + String.fromCharCode(233) + "<br>cette commande.";
				labelErrorInput.style.display = "";
			
				event.preventDefault();
			}
		}
		// Show the error message
		else
		{
			labelErrorInput.innerHTML = "Donn" + String.fromCharCode(233) + "es invalides ou manquantes.<br>Remarque : </b>les champs ne doivent<br>pas comporter les caract" + String.fromCharCode(232) + "res :<br>\" <b>'</b> \", \"<b>|</b>\" et \"<b>,</b>\" .";
			labelErrorInput.style.display = "";
			
			event.preventDefault();
		}
	}
	
	this.MainDiv.appendChild(divPaypalButton);
	
	// Command button
	/*var commandButton = document.createElement('div');
	commandButton.className = "Cor-RedButton";
	commandButton.innerHTML = "Commander";
	//buttonDevis.setAttribute("align", "center");
	commandButton.style.marginTop = "30px";
	commandButton.style.marginBottom = "40px";
	commandButton.style.fontSize = "20px";
	commandButton.style.width = "200px";
	commandButton.style.textAlign = "center";
	commandButton.onclick = function(){Proofreading.Command();}
	this.MainDiv.appendChild(commandButton);*/
	
	
},

// Maj button Paypal
MajButtonPaypal : function(price, requestId, corType)
{
	var test = false;
	var sandBoxSt = "";
	if(test == true) sandBoxSt = ".sandbox";
	
	var corTypeSt = "Relecture professionnelle - Correction standard";
	if(corType == "Advanced") corTypeSt = "Relecture professionnelle - Correction avanc" + String.fromCharCode(233) + "e";
	
	var vCustom = "IdRequestPf:" + requestId;
	
	// TVA. HT price = TTC Price / 1.20
	price = (price/1.20);
	
	var htmlPayPalButton = "<form action=\"https://www" + sandBoxSt + ".paypal.com/cgi-bin/webscr\" method=\"post\" target=\"_blank\">" +
		"<input type=\"hidden\" name=\"cmd\" value=\"_xclick\">" +
		"<input type=\"hidden\" name=\"charset\" value=\"utf-8\">" + 
		"<input type=\"hidden\" name=\"business\" value=\"ELE75PZAJ5PT4\">" +
		"<input type=\"hidden\" name=\"item_name\" value=\"" + corTypeSt + "\">" + 
		"<input type=\"hidden\" name=\"amount\" value=" + price + ">" +
		"<input type=\"hidden\" name=\"tax_rate\" value=20.00>" +		// TVA
		"<input type=\"hidden\" name=\"currency_code\" value=\"EUR\">" +
		"<input type=\"hidden\" name=\"custom\" value=\"" + vCustom + "\">" +
		"<input type=\"image\" src=\"https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_buynowCC_LG.gif\" border=\"0\" name=\"submit\" alt=\"PayPal - la solution de paiement en ligne la plus simple et la plus s�curis�e !\">" +
		"<img alt=\"\" border=\"0\" src=\"https://www.paypalobjects.com/fr_FR/i/scr/pixel.gif\" width=\"1\" height=\"1\">" +
		"</form>";

	var divPaypalButton = document.getElementById("pf_PaypalButton");
		
	divPaypalButton.innerHTML = htmlPayPalButton;

},

// Check the file to upload
CheckFile : function()
{
	var inputFile = document.getElementById("pf_InputFile");
	var nameFile = "";
    if ('files' in inputFile)
	{
		var file = inputFile.files[0];
		
		// Control of file type
		var fileType = file.type;
		var fileName = file.name;
		var labelErrorTypeFile = document.getElementById("pf_ErrorTypeFile");
		
		if((fileType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") ||	// Word (.docx)
		   (fileName.endsWith(".odt")) ||	// OpenOffice/LibreOffice
		   /*(fileType == "application/pdf") ||*/		// Pdf
		   (fileType == "application/vnd.openxmlformats-officedocument.presentationml.presentation") ||	// PowerPoint (.pptx)
		   (fileType == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") ||	// Excel (.xlsx)
		   (fileType == "text/plain"))	// Text files
		{
			// Hide the error label.
			labelErrorTypeFile.style.visibility = "hidden";
			
			// Hide the word number panel
			var divWordNumberTable = document.getElementById("pf_TableWordNumber");
			divWordNumberTable.style.display = "none";
			
			// Hide the devis panel.
			var divTableDevis = document.getElementById("pf_TableDevis");
			divTableDevis.style.display = "none";
			
			// Show the panel wait.
			var divPanelWait = document.getElementById("pf_PanelWait");
			divPanelWait.style.display = "";
			
			// Send the file to the server in order to calculate the devis.
			var xmlhttpRequest = new XMLHttpRequest();
			xmlhttpRequest.open("POST", "https://www.scribens.fr/Scribens/Proofreader_Servlet", true);
			//xmlhttpRequest.open("POST", "http://localhost:8080/Scribens/Proofreader_Servlet", true);
			//xmlhttpRequest.setRequestHeader('Accept-Language', 'en-US');
			//xmlhttpRequest.open("POST", "http://localhost:8080/TestDyn2/Proofreader_Servlet", true);
			//xmlhttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
			//xmlhttpRequest.setRequestHeader("Content-Type", "multipart\/form-data;");
			xmlhttpRequest.onreadystatechange = function ()	 //Call a function when the state changes.
			{
				if (xmlhttpRequest.readyState == 4 && xmlhttpRequest.status == 200)
				{
					if(xmlhttpRequest.response != null)
					{
						Proofreading.FillTableDevis(JSON.parse(xmlhttpRequest.response));
					}
				}
			};
	
			var formData = new FormData();
			formData.append("pf_file", file);
			// Difference in seconds of UTC and now to show the livraison time in the timezone of the client.
			var dateNow = new Date();
			formData.append(dateNow.getTimezoneOffset(), "");
			xmlhttpRequest.send(formData);
		}
		// File type not accepted
		else
		{
			labelErrorTypeFile.style.visibility = "visible";
		}
       
	}

},

// Fill the table of devis;
FillTableDevis : function(devis)
{
	Proofreading.IdRequest = devis.IdRequest;
	
	// Word number
	var tdWordNumber = document.getElementById("pf_WordNumber");
	tdWordNumber.innerHTML = devis.Word_Number;
	
	// Livraison date simple
	var livraisonDateSt_simple = "-";
	var livraisonDate_label_simple = devis.LivraisonDate_label_simple;
	if(livraisonDate_label_simple != null) livraisonDateSt_simple = livraisonDate_label_simple;
	
	var tdLivraisonDate_simple = document.getElementById("pf_DateLivraison_simple");
	tdLivraisonDate_simple.innerHTML = livraisonDateSt_simple;
	
	// Unit price
	var tdUnitPrice_simple = document.getElementById("pf_UnitPrice_simple");
	tdUnitPrice_simple.innerHTML = devis.Price_per_word_simple + " " + String.fromCharCode(8364);
	
	// Total price
	var tdTotalPrice_simple = document.getElementById("pf_TotalPrice_simple");
	tdTotalPrice_simple.Price = devis.Total_Price_simple;
	tdTotalPrice_simple.innerHTML = devis.Total_Price_simple + " " + String.fromCharCode(8364);
	
	// Livraison date advanced
	var livraisonDateSt_advanced = "-";
	var livraisonDate_label_advanced = devis.LivraisonDate_label_advanced;
	if(livraisonDate_label_advanced != null) livraisonDateSt_advanced = livraisonDate_label_advanced;
	
	var tdLivraisonDate_advanced = document.getElementById("pf_DateLivraison_advanced");
	tdLivraisonDate_advanced.innerHTML = livraisonDateSt_advanced;
	
	// Unit price
	var tdUnitPrice_advanced = document.getElementById("pf_UnitPrice_advanced");
	tdUnitPrice_advanced.innerHTML = devis.Price_per_word_advanced + " " + String.fromCharCode(8364);
	
	// Total price
	var tdTotalPrice_advanced = document.getElementById("pf_TotalPrice_advanced");
	tdTotalPrice_advanced.Price = devis.Total_Price_advanced;
	tdTotalPrice_advanced.innerHTML = devis.Total_Price_advanced + " " + String.fromCharCode(8364);
	
	// Show the table.
	var divPanelWait = document.getElementById("pf_PanelWait");
	divPanelWait.style.display = "none";
	
	// Show the word number panel
	var divWordNumberTable = document.getElementById("pf_TableWordNumber");
	divWordNumberTable.style.display = "";
	
	var divTableDevis = document.getElementById("pf_TableDevis");
	divTableDevis.style.display = "";
	
	// Test if proofreaderId are not busy.
	var divLabelBusyProofreader = document.getElementById("pf-labelBusyProofreader");
	var importantRemarks = document.getElementById("pf_ImportantRemarks");
	
	if(devis.ProofreaderId.length > 0)
	{
		divLabelBusyProofreader.style.display = "none";
		
		// Show important remarks
		importantRemarks.style.display = "";
				
		Proofreading.Paid = false;
		
		// Enable field in the formular
		var divTableRegister = document.getElementById("pf_tableRegister");
		for(var i = 0; i < divTableRegister.childNodes.length; i++)
		{
			var tr = divTableRegister.childNodes[i];
			tr.childNodes[1].firstChild.disabled = false;
		}
		
		// Maj Paypal button with the price.
		Proofreading.MajButtonPaypal(devis.Total_Price_simple, Proofreading.IdRequest, "Simple");
	}
	// Proofreaders are all busy.
	else
	{
		divLabelBusyProofreader.style.display = "";
		
		// Show important remarks
		importantRemarks.style.display = "none";
	}
}

};
