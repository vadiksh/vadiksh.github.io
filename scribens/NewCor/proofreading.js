
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
	
	// Icônes
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
		"<input type=\"image\" src=\"https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_buynowCC_LG.gif\" border=\"0\" name=\"submit\" alt=\"PayPal - la solution de paiement en ligne la plus simple et la plus sécurisée !\">" +
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