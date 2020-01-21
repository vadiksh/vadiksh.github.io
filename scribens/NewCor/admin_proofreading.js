
document.addEventListener("DOMContentLoaded", function()
{
	Admin_Proofreading.Init_page();
});

var Admin_Proofreading = {

// Connected
Connected : false,

// Is Uploading a document
IsUploading : false,

// Is Denying the document
IsDenying : false,

// Id
Proofreader_Id : "",

// Init page
Init_page : function()
{
	var divConnexion = document.getElementById("pf_Connexion");
	
	// Connexion table
	var tableConnexion = document.createElement("table");
	
	var trId = document.createElement("tr");
	var tdLabelId = document.createElement("td");
	tdLabelId.innerHTML = "Id:";
	trId.appendChild(tdLabelId);
	var tdInputId = document.createElement("td");
	var inputId = document.createElement("input");
	inputId.id = "pf_Id";
	tdInputId.appendChild(inputId);
	trId.appendChild(tdInputId);
	tableConnexion.appendChild(trId);
	
	var trMdp = document.createElement("tr");
	var tdLabelMdp = document.createElement("td");
	tdLabelMdp.innerHTML = "Password:";
	tdLabelMdp.style.paddingRight = "20px";
	trMdp.appendChild(tdLabelMdp);
	var tdInputMdp = document.createElement("td");
	var inputMdp = document.createElement("input");
	inputMdp.id = "pf_Mdp";
	inputMdp.type = "password";
	tdInputMdp.appendChild(inputMdp);
	trMdp.appendChild(tdInputMdp);
	tableConnexion.appendChild(trMdp);
	
	divConnexion.appendChild(tableConnexion);
	
	// Connexion button
	var buttonConnexion = document.createElement("button");
	buttonConnexion.style.marginTop = "10px";
	buttonConnexion.innerHTML = "Connexion";
	buttonConnexion.onclick = function(){Admin_Proofreading.Check_Connexion();}
	divConnexion.appendChild(buttonConnexion);
	
	// Error connexion label
	var labelErrorConnexion = document.createElement("div");
	labelErrorConnexion.innerHTML = "Wrong identification";
	labelErrorConnexion.style.display = "none";
	labelErrorConnexion.style.marginTop = "10px";
	labelErrorConnexion.id = "pf_labelErrorConnexion";
	divConnexion.appendChild(labelErrorConnexion);
	
	// Vacation date
	Admin_Proofreading.CreatePart_VacationDate();
	
	// Planning
	Admin_Proofreading.CreatePart_Planning();
	
	// Historics docs
	Admin_Proofreading.CreatePart_Historic();
	
},

// Return list box with start hours
Lb_Hours : function()
{
	var listBox = document.createElement("select");
	
	var option = document.createElement("option");
	option.innerHTML = "unavailable";
	listBox.appendChild(option);
	
	for(var i = 0; i < 24; i++)
	{
		var option = document.createElement("option");
		option.innerHTML = i;
		listBox.appendChild(option);
	}
	
	return listBox;
},

// Planning
CreatePart_Planning : function()
{
	// Planning
	var div_planning = document.getElementById("pf_Week_Planning");
	div_planning.style.display = "none";
	
	// Title
	var divTitleGeneralPlanning = document.createElement("div");
	divTitleGeneralPlanning.innerHTML = "Week planning";
	divTitleGeneralPlanning.style.fontSize = "20px";
	divTitleGeneralPlanning.style.marginBottom = "20px";
	div_planning.appendChild(divTitleGeneralPlanning);
	
	var table = document.createElement("table");
	var td0 = document.createElement("td");
	var tableGeneralPlanning = document.createElement("table");
	tableGeneralPlanning.id = "Table_Week_Planning";
	tableGeneralPlanning.style.textAlign = "center";
	
	var trDays = document.createElement("tr");
	for(var i = 0; i < 7; i++)
	{
		var tdDay = document.createElement("td");
		tdDay.style.padding = "5px";
		if(i == 0) tdDay.innerHTML = "Monday";
		else if(i == 1) tdDay.innerHTML = "Tuesday";
		else if(i == 2) tdDay.innerHTML = "Wednesday";
		else if(i == 3) tdDay.innerHTML = "Thursday";
		else if(i == 4) tdDay.innerHTML = "Friday";
		else if(i == 5) tdDay.innerHTML = "Saturday";
		else if(i == 6) tdDay.innerHTML = "Sunday";
		
		trDays.appendChild(tdDay);
	}
	tableGeneralPlanning.appendChild(trDays);
	
	var trStartHours = document.createElement("tr");
	for(var i = 0; i < 7; i++)
	{
		var tdStartHour = document.createElement("td");
		tdStartHour.style.padding = "5px";
		tdStartHour.appendChild(Admin_Proofreading.Lb_Hours());
		
		trStartHours.appendChild(tdStartHour);
	}
	tableGeneralPlanning.appendChild(trStartHours);
	
	var trEndHours = document.createElement("tr");
	for(var i = 0; i < 7; i++)
	{
		var tdEndHour = document.createElement("td");
		tdEndHour.style.padding = "5px";
		tdEndHour.appendChild(Admin_Proofreading.Lb_Hours());
		
		trEndHours.appendChild(tdEndHour);
	}
	tableGeneralPlanning.appendChild(trEndHours);
	
	td0.appendChild(tableGeneralPlanning);
	table.appendChild(td0);
	
	// Button confirm
	var td1 = document.createElement("td");
	var buttonConfirm = document.createElement("button");
	//buttonConfirm.style.marginTop = "20px";
	buttonConfirm.style.marginLeft = "40px";
	buttonConfirm.innerHTML = "Confirm modifications";
	buttonConfirm.onclick = function(){Admin_Proofreading.Apply_Modif_WeekPlanning();}
	td1.appendChild(buttonConfirm);
	table.appendChild(td1);
	
	div_planning.appendChild(table);
},

// Vacation date
CreatePart_VacationDate : function()
{
	// Vacation date
	var div_vacationDate = document.getElementById("pf_Vacation_Date");
	div_vacationDate.style.display = "none";
	
	// Title
	var divTitleVacationDate = document.createElement("div");
	divTitleVacationDate.innerHTML = "Vacation date";
	divTitleVacationDate.style.fontSize = "20px";
	divTitleVacationDate.style.marginBottom = "20px";
	div_vacationDate.appendChild(divTitleVacationDate);

	// Vacation date
	var table = document.createElement("table");
	table.style.textAlign = "center";
	
	// Table vacation date
	var tdTableVacationDate = document.createElement("td");
	var tableVacationDate = document.createElement("table");
	tableVacationDate.style.textAlign = "center";
	
	// Titles
	var trTitles = document.createElement("tr");
	
	var tdTitle0 = document.createElement("td");
	tdTitle0.innerHTML = "Date";
	trTitles.appendChild(tdTitle0);
	
	var tdTitle1 = document.createElement("tr");
	//tdTitle1.style.marginRight = "40px";
	tdTitle1.innerHTML = "Availability (in hour)";
	trTitles.appendChild(tdTitle1);
	//trTitles.style.marginRight = "40px";
	
	tableVacationDate.appendChild(trTitles);
	
	// Content
	var tr2 = document.createElement("tr");
	
	// Table date
	var tdTableDate = document.createElement("td");
	var tableDate = document.createElement("table");
	tableDate.style.textAlign = "center";
	//tableDate.style.marginRight = "40px";
	
	var trTitleDate = document.createElement("tr");
	
	var tdTitleDate0 = document.createElement("td");
	tdTitleDate0.innerHTML = "Day";
	trTitleDate.appendChild(tdTitleDate0);
	
	var tdTitleDate1 = document.createElement("td");
	tdTitleDate1.innerHTML = "Month";
	trTitleDate.appendChild(tdTitleDate1);
	
	var tdTitleDate2 = document.createElement("td");
	tdTitleDate2.innerHTML = "Year";
	trTitleDate.appendChild(tdTitleDate2);
	
	tableDate.appendChild(trTitleDate);
	
	var trContentDate = document.createElement("tr");
	trContentDate.id = "Vacation_Date";
	
	var tdSelectDay = document.createElement("td");
	var selectDay = document.createElement("select");
	for(var i = 1; i <= 31; i++)
	{
		var optionDay = document.createElement("option");
		if(i < 10) optionDay.innerHTML = "0" + i;
		else optionDay.innerHTML = i;
		selectDay.appendChild(optionDay);
	}
	tdSelectDay.appendChild(selectDay);
	trContentDate.appendChild(tdSelectDay);
		
	var tdSelectMonth = document.createElement("td");
	var selectMonth = document.createElement("select");
	for(var i = 1; i <= 12; i++)
	{
		var optionMonth = document.createElement("option");
		if(i < 10) optionMonth.innerHTML = "0" + i;
		else optionMonth.innerHTML = i;
		selectMonth.appendChild(optionMonth);
	}
	tdSelectMonth.appendChild(selectMonth);
	trContentDate.appendChild(tdSelectMonth);
	
	var tdSelectYear = document.createElement("td");
	var selectYear = document.createElement("select");
	for(var i = 2016; i <= 2050; i++)
	{
		var optionYear = document.createElement("option");
		optionYear.innerHTML = i;
		selectYear.appendChild(optionYear);
	}
	tdSelectYear.appendChild(selectYear);
	trContentDate.appendChild(tdSelectYear);	
	
	tableDate.appendChild(trContentDate);
	tdTableDate.appendChild(tableDate);
	tr2.appendChild(tdTableDate);
	
	// Availability
	var tdAvailability = document.createElement("td");
	tdAvailability.id = "Availability_Vacation_Date";
	
	var selectLb_start = Admin_Proofreading.Lb_Hours();
	tdAvailability.appendChild(selectLb_start);
	var selectLb_end = Admin_Proofreading.Lb_Hours();
	selectLb_end.style.marginLeft = "15px";
	tdAvailability.appendChild(selectLb_end);
	
	tr2.appendChild(tdAvailability);
	
	tableVacationDate.appendChild(tr2);
	tdTableVacationDate.appendChild(tableVacationDate);
	table.appendChild(tdTableVacationDate);
	
	// Button confirm
	var tdButton = document.createElement("td");
	var button = document.createElement("button");
	button.style.marginLeft = "40px";
	button.innerHTML = "Confirm modifications";
	button.onclick = function(){Admin_Proofreading.Add_VacationDate()};
	tdButton.appendChild(button);
	table.appendChild(tdButton);
	
	div_vacationDate.appendChild(table);
},

// Create historic docs
CreatePart_Historic : function()
{
	// Historic docs
	var docs_Historic = document.getElementById("pf_Docs_Historic");
	docs_Historic.style.display = "none";
	
	var buttonHistoric = document.createElement("button");
	buttonHistoric.style.marginBottom = "30px";
	buttonHistoric.innerHTML = "Consult historic";
	
	buttonHistoric.onclick = function()
	{
		Admin_Proofreading.Get_Proofreader_Docs_Historic(Admin_Proofreading.Proofreader_Id);
	}
	docs_Historic.appendChild(buttonHistoric);
	
	var table_Historic = document.createElement("table");
	table_Historic.id = "pf_Table_Docs_Historic";
	docs_Historic.appendChild(table_Historic);
},

// Check connexion
Check_Connexion : function()
{
	var input_Id = document.getElementById("pf_Id");
	var input_Mdp = document.getElementById("pf_Mdp");

	var id = input_Id.value;
	var mpd = input_Mdp.value;
	
	Admin_Proofreading.Proofreader_Id = id;
	
	input_Id.value = "";
	input_Mdp.value = "";
	
	var xmlhttpRequest = new XMLHttpRequest();
	xmlhttpRequest.open("POST", "https://www.scribens.fr/Scribens/Proofreader_Servlet");
	//xmlhttpRequest.open("POST", "http://localhost:8080/Scribens/Proofreader_Servlet");
	
	//var urlWebSite = "https://www.scribens.fr";
	
	//xmlhttpRequest.open("POST", urlWebSite + "/Scribens/" + servletId);
	xmlhttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
	xmlhttpRequest.onreadystatechange = function ()	 //Call a function when the state changes.
	{
		if (xmlhttpRequest.readyState == 4 && xmlhttpRequest.status == 200)
		{
			if(xmlhttpRequest.response != null)
			{
				var labelErrorConnexion = document.getElementById("pf_labelErrorConnexion");

				if(JSON.parse(xmlhttpRequest.response) == true)
				{
					Admin_Proofreading.Connected = true;
					
					labelErrorConnexion.style.display = "none";
					
					document.getElementById("pf_Docs_Historic").style.display = "block";
					
					document.getElementById("pf_Vacation_Date").style.display = "block";
					
					document.getElementById("pf_Week_Planning").style.display = "block";
					
					// Load week planning.
					Admin_Proofreading.Load_Week_Planning(id);
					
					// Send every 10s a request to get proofreader docs periodically
					Admin_Proofreading.Get_Proofreader_Docs(id);
					
					var timer = setInterval(function()
					{
						if(Admin_Proofreading.IsUploading == false && Admin_Proofreading.IsDenying == false)
						{
							Admin_Proofreading.Get_Proofreader_Docs(id);
						}
					}, 10000);

				}
				else
				{
					labelErrorConnexion.style.display = "block";
				}
			}
		}
	};

	var request = 'FunctionName=' + encodeURIComponent('Connexion_Proofreader') + '&&' +
				  'Id=' + encodeURIComponent(id) + '&&' +
				  'Password=' + encodeURIComponent(mpd);
	
	xmlhttpRequest.send(request);
	
},

// Send a request to get proofreader docs periodically
Get_Proofreader_Docs : function(proofreader_Id)
{
	// Send the request
	var xmlhttpRequest = new XMLHttpRequest();
	xmlhttpRequest.open("POST", "https://www.scribens.fr/Scribens/Proofreader_Servlet");
	//xmlhttpRequest.open("POST", "http://localhost:8080/Scribens/Proofreader_Servlet");
	
	//var urlWebSite = "https://www.scribens.fr";
	
	//xmlhttpRequest.open("POST", urlWebSite + "/Scribens/" + servletId);
	xmlhttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
	xmlhttpRequest.onreadystatechange = function ()	 //Call a function when the state changes.
	{
		if (xmlhttpRequest.readyState == 4 && xmlhttpRequest.status == 200)
		{
			if(xmlhttpRequest.response != null)
			{
				Admin_Proofreading.Show_DatasDocs(JSON.parse(xmlhttpRequest.response));
			}
		}
	};

	var request = 'FunctionName=' + encodeURIComponent('Get_Proofreader_Docs') + '&&' +
				  'Id=' + encodeURIComponent(proofreader_Id);
	
	xmlhttpRequest.send(request);
},

// Show datas actual docs
Show_DatasDocs : function(datasDocs)
{
	var docs = document.getElementById("pf_Docs");
	docs.innerHTML = "";
	
	var hasDocsNotChecked = false;
	for(var i = 0; i < datasDocs.length; i++)
	{
		var datasDoc = datasDocs[i];
		if(datasDoc.Checked == false)
		{
			hasDocsNotChecked = true;
			break;
		}
	}
	
	if(datasDocs.length > 0 && hasDocsNotChecked == true)
	{
		var tableDocs = document.createElement("table");
		tableDocs.style.border = "1px solid #AEAEAE";
		tableDocs.style.fontSize = "16px";
		
		// Description
		var trDesc = document.createElement("tr");
		trDesc.align = "center";
		
		// Filename
		var tdDescFileName = document.createElement("td");
		tdDescFileName.style.borderRight = "1px solid #AEAEAE";
		tdDescFileName.style.paddingLeft = "10px";
		tdDescFileName.style.paddingRight = "10px";
		tdDescFileName.style.fontWeight = "bold";
		tdDescFileName.innerHTML = "File name";
		trDesc.appendChild(tdDescFileName);
		
		// Words
		var tdDescWords = document.createElement("td");
		tdDescWords.style.borderRight = "1px solid #AEAEAE";
		tdDescWords.style.fontWeight = "bold";
		tdDescWords.style.paddingLeft = "10px";
		tdDescWords.style.paddingRight = "10px";
		tdDescWords.innerHTML = "Words";
		trDesc.appendChild(tdDescWords);
		
		// Correction type
		var tdType = document.createElement("td");
		tdType.style.borderRight = "1px solid #AEAEAE";
		tdType.style.fontWeight = "bold";
		tdType.style.paddingLeft = "10px";
		tdType.style.paddingRight = "10px";
		tdType.innerHTML = "Correction type";
		trDesc.appendChild(tdType);
		
		// Price
		var tdPrice = document.createElement("td");
		tdPrice.style.borderRight = "1px solid #AEAEAE";
		tdPrice.style.fontWeight = "bold";
		tdPrice.style.paddingLeft = "10px";
		tdPrice.style.paddingRight = "10px";
		tdPrice.innerHTML = "Price (TTC)";
		trDesc.appendChild(tdPrice);
		
		// Livraison date
		var tdDescLivraisonDate = document.createElement("td");
		tdDescLivraisonDate.style.borderRight = "1px solid #AEAEAE";
		tdDescLivraisonDate.style.fontWeight = "bold";
		tdDescLivraisonDate.style.paddingLeft = "10px";
		tdDescLivraisonDate.style.paddingRight = "10px";
		tdDescLivraisonDate.innerHTML = "Delivery date (Paris - 1H)";
		trDesc.appendChild(tdDescLivraisonDate);
		
		// Download
		/*var tdDescDownload = document.createElement("td");
		tdDescDownload.style.borderRight = "1px solid #AEAEAE";
		tdDescDownload.style.fontWeight = "bold";
		tdDescDownload.style.paddingLeft = "10px";
		tdDescDownload.style.paddingRight = "10px";
		tdDescDownload.innerHTML = "Download";
		trDesc.appendChild(tdDescDownload);*/
		
		// Send
		var tdDescSend = document.createElement("td");
		tdDescSend.style.borderRight = "1px solid #AEAEAE";
		tdDescSend.style.fontWeight = "bold";
		tdDescSend.style.paddingLeft = "10px";
		tdDescSend.style.paddingRight = "10px";
		tdDescSend.innerHTML = "Send";
		trDesc.appendChild(tdDescSend);
		
		tableDocs.appendChild(trDesc);
		
		// Deny
		var tdDescDeny = document.createElement("td");
		tdDescDeny.style.fontWeight = "bold";
		tdDescDeny.style.paddingLeft = "10px";
		tdDescDeny.style.paddingRight = "10px";
		tdDescDeny.innerHTML = "Deny";
		trDesc.appendChild(tdDescDeny);
		
		tableDocs.appendChild(trDesc);
		
		for(var i = 0; i < datasDocs.length; i++)
		{
			var datasDoc = datasDocs[i];
			
			if(datasDoc.Checked == true || (datasDoc.Denied != null && datasDoc.Denied.length > 0)) continue;
			
			var trDoc = document.createElement("tr");
			trDoc.align = "center";
			
			// Id
			trDoc.IdDoc = datasDoc.Id;
			
			// Filename
			var tdFileName = document.createElement("td");
			tdFileName.style.borderRight = "1px solid #AEAEAE";
			tdFileName.style.borderTop = "1px solid #AEAEAE";
			tdFileName.style.padding = "10px";
			tdFileName.innerHTML = datasDoc.FileName;
			trDoc.appendChild(tdFileName);
			
			// Words
			var tdWordNumber = document.createElement("td");
			tdWordNumber.style.borderRight = "1px solid #AEAEAE";
			tdWordNumber.style.borderTop = "1px solid #AEAEAE";
			tdWordNumber.style.padding = "10px";
			tdWordNumber.innerHTML = datasDoc.WordNumber;
			trDoc.appendChild(tdWordNumber);
			
			// Correction type
			var tdType = document.createElement("td");
			tdType.style.borderRight = "1px solid #AEAEAE";
			tdType.style.borderTop = "1px solid #AEAEAE";
			tdType.style.padding = "10px";
			tdType.innerHTML = datasDoc.CorrectionType;
			trDoc.appendChild(tdType);
			
			// Price
			var tdPrice = document.createElement("td");
			tdPrice.style.borderRight = "1px solid #AEAEAE";
			tdPrice.style.borderTop = "1px solid #AEAEAE";
			tdPrice.style.padding = "10px";
			tdPrice.innerHTML = datasDoc.Price + " " + String.fromCharCode(8364);
			trDoc.appendChild(tdPrice);
			
			// Livraison date
			var tdLivraisonDate = document.createElement("td");
			tdLivraisonDate.style.borderRight = "1px solid #AEAEAE";
			tdLivraisonDate.style.borderTop = "1px solid #AEAEAE";
			tdLivraisonDate.style.padding = "10px";
			tdLivraisonDate.innerHTML = Admin_Proofreading.GetReadingFormatDate(datasDoc.LivraisonDate);
			trDoc.appendChild(tdLivraisonDate);
			
			// Download
			/*var tdDownload = document.createElement("td");
			tdDownload.style.borderRight = "1px solid #AEAEAE";
			tdDownload.style.borderTop = "1px solid #AEAEAE";
			tdDownload.style.padding = "10px";
			tdDownload.innerHTML = "Download";
			trDoc.appendChild(tdDownload);*/
			
			// Send
			var tdSend = document.createElement("td");
			tdSend.style.borderRight = "1px solid #AEAEAE";
			tdSend.style.borderTop = "1px solid #AEAEAE";
			tdSend.style.padding = "10px";
			
			var tableSend = document.createElement("table");
			
			var tdInputFile = document.createElement("td");
			var inputFile = document.createElement("input");
			inputFile.style.paddingRight = "20px";
			inputFile.type = "file";
			inputFile.onclick = function()
			{
				Admin_Proofreading.IsUploading = true;
			}
			tdInputFile.appendChild(inputFile);
			tableSend.appendChild(tdInputFile);
			
			var tdSendFile = document.createElement("td");
			var buttonSendFile = document.createElement("button");
			buttonSendFile.innerHTML = "Send to customer";
			buttonSendFile.onclick = function()
			{
				var tr = this.parentNode.parentNode.parentNode.parentNode;
				Admin_Proofreading.SendFile_ToClient(this, this.parentNode.parentNode.childNodes[0].childNodes[0], tr.IdDoc, tr.childNodes[0].innerHTML);
			}
			tdSendFile.appendChild(buttonSendFile);
			tableSend.appendChild(tdSendFile);
			
			tdSend.appendChild(tableSend);
			trDoc.appendChild(tdSend);
			
			// Deny
			var tdDeny = document.createElement("td");
			tdDeny.style.borderTop = "1px solid #AEAEAE";
			
			var buttonDeny = document.createElement("button");
			buttonDeny.style.marginLeft = "20px";
			buttonDeny.style.marginRight = "20px";
			buttonDeny.innerHTML = "Deny";
			buttonDeny.onclick = function()
			{
				var divDenyReason = this.parentNode.childNodes[1];
				divDenyReason.style.display = "block";
				
				divDenyReason.childNodes[1].childNodes[0].childNodes[0].childNodes[0].checked = true;	// Checked when creating the object doesn't work.
				
				Admin_Proofreading.IsDenying = true;
			}
			
			tdDeny.appendChild(buttonDeny);
			
			// Deny reasons
			var divDenyReason = document.createElement("div");
			divDenyReason.style.display = "none";
			
			var titleDenyReason = document.createElement("div");
			titleDenyReason.style.marginTop = "10px";
			titleDenyReason.style.marginBottom = "10px";
			titleDenyReason.innerHTML = "Deny reason:";
			divDenyReason.appendChild(titleDenyReason);
			
			var table = document.createElement("table");
			table.style.marginBottom = "10px";
			
			// 1st reason: very bad written text
			var tr0 = document.createElement("tr");
			
			var td00 = document.createElement("td");
			
			var input0 = document.createElement("input");
			input0.setAttribute("type", "radio");
			input0.setAttribute("name", "gReasonDeny" + trDoc.IdDoc);
			input0.setAttribute("value", "on");
			input0.style.cursor = "pointer";
			input0.checked = true;
			td00.appendChild(input0);
			tr0.appendChild(td00);
			
			var td01 = document.createElement("td");
			td01.innerHTML = "Very bad written document";
			tr0.appendChild(td01);
			
			table.appendChild(tr0);
			
			var tr1 = document.createElement("tr");
			
			var td10 = document.createElement("td");
			
			var input1 = document.createElement("input");
			input1.setAttribute("type", "radio");
			input1.setAttribute("name", "gReasonDeny" + trDoc.IdDoc);
			input1.setAttribute("value", "on");
			input1.style.cursor = "pointer";
			td10.appendChild(input1);
			tr1.appendChild(td10);
			
			var td11 = document.createElement("td");
			td11.innerHTML = "Deontology charter";
			tr1.appendChild(td11);
			
			table.appendChild(tr1);
			
			divDenyReason.appendChild(table);
			
			var buttonApply = document.createElement("button");
			buttonApply.marginBottom = "10px";
			buttonApply.onclick = function()
			{
				var tr = this.parentNode.parentNode.parentNode;
				Admin_Proofreading.DenyDocument(tr.IdDoc, this.parentNode.childNodes[1]);
			}
			
			buttonApply.innerHTML = "Apply";
			divDenyReason.appendChild(buttonApply);
			
			tdDeny.appendChild(divDenyReason);
			
			trDoc.appendChild(tdDeny);
		
			tableDocs.appendChild(trDoc);
		}
		
		docs.appendChild(tableDocs);
	}
	// Message no document
	else
	{
		var messageNoDocument = document.createElement("div");
		messageNoDocument.innerHTML = "No document";
		docs.appendChild(messageNoDocument);
	}

},

// Get historic of corrected document
Get_Proofreader_Docs_Historic : function(proofreader_Id)
{
	// Send the request
	var xmlhttpRequest = new XMLHttpRequest();
	xmlhttpRequest.open("POST", "https://www.scribens.fr/Scribens/Proofreader_Servlet");
	//xmlhttpRequest.open("POST", "http://localhost:8080/Scribens/Proofreader_Servlet");
	
	//var urlWebSite = "https://www.scribens.fr";
	
	//xmlhttpRequest.open("POST", urlWebSite + "/Scribens/" + servletId);
	xmlhttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
	xmlhttpRequest.onreadystatechange = function ()	 //Call a function when the state changes.
	{
		if (xmlhttpRequest.readyState == 4 && xmlhttpRequest.status == 200)
		{
			if(xmlhttpRequest.response != null)
			{
				Admin_Proofreading.Show_DatasDocs_Historic(JSON.parse(xmlhttpRequest.response));
			}
		}
	};

	var request = 'FunctionName=' + encodeURIComponent('Get_Proofreader_Docs') + '&&' +
				  'Id=' + encodeURIComponent(proofreader_Id);
	
	xmlhttpRequest.send(request);
},

// Show datas docs
Show_DatasDocs_Historic : function(datasDocs)
{
	var docs = document.getElementById("pf_Table_Docs_Historic");
	docs.innerHTML = "";
	
	var hasDocsChecked = false;
	for(var i = 0; i < datasDocs.length; i++)
	{
		var datasDoc = datasDocs[i];
		if(datasDoc.Checked == true || (datasDoc.Denied != null || datasDoc.Denied.length > 0))
		{
			hasDocsChecked = true;
			break;
		}
	}
	
	if(datasDocs.length > 0 && hasDocsChecked == true)
	{
		var tableDocs = document.createElement("table");
		tableDocs.style.border = "1px solid #AEAEAE";
		tableDocs.style.fontSize = "16px";
		
		// Description
		var trDesc = document.createElement("tr");
		trDesc.align = "center";
		
		// Filename
		var tdDescFileName = document.createElement("td");
		tdDescFileName.style.borderRight = "1px solid #AEAEAE";
		tdDescFileName.style.paddingLeft = "10px";
		tdDescFileName.style.paddingRight = "10px";
		tdDescFileName.style.fontWeight = "bold";
		tdDescFileName.innerHTML = "File name";
		trDesc.appendChild(tdDescFileName);
		
		// Words
		var tdDescWords = document.createElement("td");
		tdDescWords.style.borderRight = "1px solid #AEAEAE";
		tdDescWords.style.fontWeight = "bold";
		tdDescWords.style.paddingLeft = "10px";
		tdDescWords.style.paddingRight = "10px";
		tdDescWords.innerHTML = "Words";
		trDesc.appendChild(tdDescWords);
		
		// Correction type
		var tdType = document.createElement("td");
		tdType.style.borderRight = "1px solid #AEAEAE";
		tdType.style.fontWeight = "bold";
		tdType.style.paddingLeft = "10px";
		tdType.style.paddingRight = "10px";
		tdType.innerHTML = "Correction type";
		trDesc.appendChild(tdType);
		
		// Price
		var tdPrice = document.createElement("td");
		tdPrice.style.borderRight = "1px solid #AEAEAE";
		tdPrice.style.fontWeight = "bold";
		tdPrice.style.paddingLeft = "10px";
		tdPrice.style.paddingRight = "10px";
		tdPrice.innerHTML = "Price (TTC)";
		trDesc.appendChild(tdPrice);
		
		// Request date
		var tdDescRequestDate = document.createElement("td");
		tdDescRequestDate.style.borderRight = "1px solid #AEAEAE";
		tdDescRequestDate.style.fontWeight = "bold";
		tdDescRequestDate.style.paddingLeft = "10px";
		tdDescRequestDate.style.paddingRight = "10px";
		tdDescRequestDate.innerHTML = "Request date (Paris - 1H)";
		trDesc.appendChild(tdDescRequestDate);
		
		// Livraison date
		var tdDescLivraisonDate = document.createElement("td");
		tdDescLivraisonDate.style.borderRight = "1px solid #AEAEAE";
		tdDescLivraisonDate.style.fontWeight = "bold";
		tdDescLivraisonDate.style.paddingLeft = "10px";
		tdDescLivraisonDate.style.paddingRight = "10px";
		tdDescLivraisonDate.innerHTML = "Delivery date (Paris - 1H)";
		trDesc.appendChild(tdDescLivraisonDate);
		
		// Denied
		var tdDescLivraisonDate = document.createElement("td");
		tdDescLivraisonDate.style.fontWeight = "bold";
		tdDescLivraisonDate.style.paddingLeft = "10px";
		tdDescLivraisonDate.innerHTML = "Denied";
		trDesc.appendChild(tdDescLivraisonDate);
		
		tableDocs.appendChild(trDesc);
		
		for(var i = 0; i < datasDocs.length; i++)
		{
			var datasDoc = datasDocs[i];
			
			if(datasDoc.Checked == false && (datasDoc.Denied == null || datasDoc.Denied.length == 0)) continue;
			
			var trDoc = document.createElement("tr");
			trDoc.align = "center";
			
			// Id
			trDoc.IdDoc = datasDoc.Id;
		
			// Filename
			var tdFileName = document.createElement("td");
			tdFileName.style.borderRight = "1px solid #AEAEAE";
			tdFileName.style.borderTop = "1px solid #AEAEAE";
			tdFileName.style.padding = "10px";
			tdFileName.innerHTML = datasDoc.FileName;
			trDoc.appendChild(tdFileName);
			
			// Words number
			var tdWordNumber = document.createElement("td");
			tdWordNumber.style.borderRight = "1px solid #AEAEAE";
			tdWordNumber.style.borderTop = "1px solid #AEAEAE";
			tdWordNumber.style.padding = "10px";
			tdWordNumber.innerHTML = datasDoc.WordNumber;
			trDoc.appendChild(tdWordNumber);
			
			// Correction type
			var tdType = document.createElement("td");
			tdType.style.borderRight = "1px solid #AEAEAE";
			tdType.style.borderTop = "1px solid #AEAEAE";
			tdType.style.padding = "10px";
			tdType.innerHTML = datasDoc.CorrectionType;
			trDoc.appendChild(tdType);
			
			// Price
			var tdPrice = document.createElement("td");
			tdPrice.style.borderRight = "1px solid #AEAEAE";
			tdPrice.style.borderTop = "1px solid #AEAEAE";
			tdPrice.style.padding = "10px";
			tdPrice.innerHTML = datasDoc.Price + " " + String.fromCharCode(8364);
			trDoc.appendChild(tdPrice);
			
			// Request date
			var tdRequestDate = document.createElement("td");
			tdRequestDate.style.borderRight = "1px solid #AEAEAE";
			tdRequestDate.style.borderTop = "1px solid #AEAEAE";
			tdRequestDate.style.padding = "10px";
			tdRequestDate.innerHTML = Admin_Proofreading.GetReadingFormatDate(datasDoc.RequestDate);
			trDoc.appendChild(tdRequestDate);
			
			// Livraison date
			var tdLivraisonDate = document.createElement("td");
			tdLivraisonDate.style.borderRight = "1px solid #AEAEAE";
			tdLivraisonDate.style.borderTop = "1px solid #AEAEAE";
			tdLivraisonDate.style.padding = "10px";
			tdLivraisonDate.innerHTML = Admin_Proofreading.GetReadingFormatDate(datasDoc.LivraisonDate);
			trDoc.appendChild(tdLivraisonDate);
			
			// Denied
			var tdDenied = document.createElement("td");
			tdDenied.style.borderTop = "1px solid #AEAEAE";
			tdDenied.style.padding = "10px";
			var denied = "";
			if(datasDoc.Denied != null && datasDoc.Denied.length > 0) denied = 'Reason: ' + datasDoc.Denied;
			tdDenied.innerHTML = denied;
			trDoc.appendChild(tdDenied);
		
			tableDocs.appendChild(trDoc);
		}
		
		docs.appendChild(tableDocs);
	}
	// Message no document
	else
	{
		var messageNoDocument = document.createElement("div");
		messageNoDocument.innerHTML = "No document";
		docs.appendChild(messageNoDocument);
	}

},

// Deny document
DenyDocument : function(idDoc, tableReason)
{
	var reason = "bad_written";
	if(tableReason.childNodes[1].childNodes[0].childNodes[0].checked == true) reason = "conduct_charter";
	
	// Send the request
	var xmlhttpRequest = new XMLHttpRequest();
	xmlhttpRequest.open("POST", "https://www.scribens.fr/Scribens/Proofreader_Servlet");
	//xmlhttpRequest.open("POST", "http://localhost:8080/Scribens/Proofreader_Servlet");
	
	//var urlWebSite = "https://www.scribens.fr";
	
	//xmlhttpRequest.open("POST", urlWebSite + "/Scribens/" + servletId);
	xmlhttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
	
	var request = 'FunctionName=' + encodeURIComponent('Deny_Document') + '&&' +
				  'IdDoc=' + encodeURIComponent(idDoc) + '&&' +
				  'Reason=' +  encodeURIComponent(reason);
	
	xmlhttpRequest.send(request);
	
	Admin_Proofreading.IsDenying = false;
	
	alert('Deny has been changed.');
},

// Add a vacation date.
Add_VacationDate : function()
{
	var tableDate = document.getElementById("Vacation_Date");
	
	var day = tableDate.childNodes[0].childNodes[0].value;
	var month = tableDate.childNodes[1].childNodes[0].value;
	var year = tableDate.childNodes[2].childNodes[0].value;
	
	var tableAvaibilityVacationDate = document.getElementById("Availability_Vacation_Date");
	var select_Start = tableAvaibilityVacationDate.childNodes[0];
	var select_End = tableAvaibilityVacationDate.childNodes[1];
	
	// Error if unavailable and not available.
	if((select_Start.value == 'unavailable' && select_End.value != 'unavailable') ||
	   (select_Start.value != 'unavailable' && select_End.value == 'unavailable'))
	{
		alert('Datas are not valid.');
		return;
	}
	
	// Error if value Start is lower than value End.
	if(select_Start.value != 'unavailable' && select_End.value != 'unavailable')
	{
		if(parseInt(select_Start.value) >= parseInt(select_End.value))
		{
			alert('Datas are not valid. End hour must be greater than start hour.');
			return;
		}
	}
	
	var availabilityRange = select_Start.value + "-" + select_End.value;
	availabilityRange = availabilityRange.replace("unavailable-unavailable", "-1");

	// Send the request
	var xmlhttpRequest = new XMLHttpRequest();
	xmlhttpRequest.open("POST", "https://www.scribens.fr/Scribens/Proofreader_Servlet");
	//xmlhttpRequest.open("POST", "http://localhost:8080/Scribens/Proofreader_Servlet");
	xmlhttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
	
	var request = 'FunctionName=' + encodeURIComponent('Add_Vacation_Date') + '&&' +
				  'Id=' + encodeURIComponent(Admin_Proofreading.Proofreader_Id) + '&&' +
				  'Date=' + year + "-" + month + "-" + day + '&&' +
				  'Availability=' + availabilityRange;
	
	xmlhttpRequest.send(request);
	
	alert('The vacation date has been correctly added.');
},

// Load week planning.
Load_Week_Planning : function(proofreader_Id)
{
	// Send the request
	var xmlhttpRequest = new XMLHttpRequest();
	xmlhttpRequest.open("POST", "https://www.scribens.fr/Scribens/Proofreader_Servlet");
	//xmlhttpRequest.open("POST", "http://localhost:8080/Scribens/Proofreader_Servlet");
	
	//var urlWebSite = "https://www.scribens.fr";
	
	//xmlhttpRequest.open("POST", urlWebSite + "/Scribens/" + servletId);
	xmlhttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
	xmlhttpRequest.onreadystatechange = function ()	 //Call a function when the state changes.
	{
		if (xmlhttpRequest.readyState == 4 && xmlhttpRequest.status == 200)
		{
			if(xmlhttpRequest.response != null)
			{
				Admin_Proofreading.Show_WeekPlanning(JSON.parse(xmlhttpRequest.response));
			}
		}
	};

	var request = 'FunctionName=' + encodeURIComponent('Get_Week_Planning') + '&&' +
				  'Id=' + encodeURIComponent(proofreader_Id);
	
	xmlhttpRequest.send(request);
},

// Show week planning
Show_WeekPlanning : function(response)
{
	var tabSt = response.split(":");
	
	var table_Week_Planning = document.getElementById("Table_Week_Planning");
	
	for(var i = 0; i < tabSt.length; i++)
	{
		var hours = tabSt[i].split("-");
		
		// Start hour
		var select_StartHour = table_Week_Planning.childNodes[1].childNodes[i].childNodes[0];
		
		for(var u = 0; u < select_StartHour.childNodes.length; u++)
		{
			var option = select_StartHour.childNodes[u];
			if((option.value == hours[0] && tabSt[i] != -1) ||
			   (option.value == "unavailable" && (tabSt[i] == -1)))
			{
				select_StartHour.selectedIndex = u;
				break;
			}
			
		}
		
		// End hour
		var select_EndHour = table_Week_Planning.childNodes[2].childNodes[i].childNodes[0];
		
		for(var u = 0; u < select_EndHour.childNodes.length; u++)
		{
			var option = select_EndHour.childNodes[u];
			if((option.value == hours[1] && tabSt[i] != -1) ||
			   (option.value == "unavailable" && (tabSt[i] == -1)))
			{
				select_EndHour.selectedIndex = u;
				break;
			}
		}
	}

},

// Apply modofication on week planning
Apply_Modif_WeekPlanning : function()
{
	var chWeekPlanning = "";

	var table_Week_Planning = document.getElementById("Table_Week_Planning");
	
	for(var i = 0; i < 7; i++)
	{
		var select_Start = table_Week_Planning.childNodes[1].childNodes[i].childNodes[0];
		var select_End = table_Week_Planning.childNodes[2].childNodes[i].childNodes[0];
	
		// Error if unavailable and not available.
		if((select_Start.value == 'unavailable' && select_End.value != 'unavailable') ||
		   (select_Start.value != 'unavailable' && select_End.value == 'unavailable'))
		{
			alert('Datas are not valid.');
			return;
		}
		
		// Error if value Start is lower than value End.
		if(select_Start.value != 'unavailable' && select_End.value != 'unavailable')
		{
			if(parseInt(select_Start.value) >= parseInt(select_End.value))
			{
				alert('Datas are not valid. End hour must be greater than start hour.');
				return;
			}
		}

		chWeekPlanning += select_Start.value + "-" + select_End.value;
		
		if(i < 6) chWeekPlanning += ":";
	}
	
	for(var i = 0; i < 7; i++) chWeekPlanning = chWeekPlanning.replace("unavailable-unavailable", "-1");
	
	// Error if if all unavailable.
	if(chWeekPlanning == '-1:-1:-1:-1:-1:-1:-1')
	{
		alert('Datas are not valid.');
		return;
	}
	
	// Send the request
	var xmlhttpRequest = new XMLHttpRequest();
	xmlhttpRequest.open("POST", "https://www.scribens.fr/Scribens/Proofreader_Servlet");
	//xmlhttpRequest.open("POST", "http://localhost:8080/Scribens/Proofreader_Servlet");
	
	//var urlWebSite = "https://www.scribens.fr";
	
	//xmlhttpRequest.open("POST", urlWebSite + "/Scribens/" + servletId);
	xmlhttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
	var request = 'FunctionName=' + encodeURIComponent('Apply_Modifications_WeekPlanning') + '&&' +
				  'Id=' + encodeURIComponent(Admin_Proofreading.Proofreader_Id) + '&&' +
				  'WeekPlanning=' + encodeURIComponent(chWeekPlanning);
				  
	xmlhttpRequest.send(request);
	
	// Message
	alert('Week availability has been correctly changed.');
},

// Send file to the client
SendFile_ToClient : function(buttonSend, inputFile, idDoc, fileNameOrg)
{
	if(inputFile.files.length == 0)
	{
		alert('No file is loaded');
		return;
	}
	
	Admin_Proofreading.IsUploading = false;

	if ('files' in inputFile)
	{
		var file = inputFile.files[0];
		
		// Control of file type
		var fileType = file.type;
		var fileName = file.name;
		var labelErrorTypeFile = document.getElementById("pf_ErrorTypeFile");
		
		if((fileType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") ||	// Word (.docx)
		   (fileName.endsWith(".odt")) ||	// OpenOffice/LibreOffice
		   (fileType == "application/pdf") ||		// Pdf
		   (fileType == "application/vnd.openxmlformats-officedocument.presentationml.presentation") ||	// PowerPoint (.pptx)
		   (fileType == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") ||	// Excel (.xlsx)
		   (fileType == "text/plain"))	// Text files
		{
			// The result file name must be : Name + "_Scribens" + "_Id".
			if(Admin_Proofreading.Check_FileName(file.name, fileNameOrg))
			{
				buttonSend.disabled = true;
				inputFile.disabled = true;
			
				// Send the file to the server in order to calculate the devis.
				var xmlhttpRequest = new XMLHttpRequest();
				xmlhttpRequest.open("POST", "https://www.scribens.fr/Scribens/Proofreader_Servlet", true);
				//xmlhttpRequest.open("POST", "http://localhost:8080/Scribens/Proofreader_Servlet", true);
				
				var formData = new FormData();
				formData.append("SendToClient", "_");
				formData.append(idDoc, "_");
				formData.append("pf_file", file);
				xmlhttpRequest.send(formData);
				
				alert('The file has been sent to the client. Thank you!');
			}
			// Wrong file name.
			else alert('Wrong file name: the checked file name must be: original name + "_Scribens" + "_Id"');
		}
		// File type not accepted
		else
		{
			alert('The file has not a valid type.');
			return;
		}
       
	}
},

// The result file name must be : Name + "_Scribens" + "_Id".
Check_FileName : function(fileName, fileNameOrg)
{
	var indLastSl = fileNameOrg.lastIndexOf("_");

	var resultFileName = fileNameOrg.substring(0, indLastSl) + "_Scribens" + fileNameOrg.substring(indLastSl, fileNameOrg.length);
	
	if(resultFileName == fileName)
	{
		return true;
	}

	return false;
},

// Transforme la date de livraison en une date plus lisible.
GetReadingFormatDate : function(livraisonDate)
{
	var readingFormatDateSt = "";

	var tabSt = livraisonDate.split(" ");
	
	// Day
	var dayMin = tabSt[0];
	if(dayMin == "Mon") readingFormatDateSt = "Lundi";
	if(dayMin == "Tue") readingFormatDateSt = "Mardi";
	if(dayMin == "Wed") readingFormatDateSt = "Mercredi";
	if(dayMin == "Thu") readingFormatDateSt = "Jeudi";
	if(dayMin == "Fri") readingFormatDateSt = "Vendredi";
	if(dayMin == "Sat") readingFormatDateSt = "Samedi";
	if(dayMin == "Sun") readingFormatDateSt = "Dimanche";

	readingFormatDateSt += " ";
	
	// Day number
	readingFormatDateSt += tabSt[2] + " ";
	
	// Month
	var month = "";
	var monthMin = tabSt[1]
	if(monthMin == "Jan") readingFormatDateSt += "janvier";
	if(monthMin == "Feb") readingFormatDateSt += "f" + String.fromCharCode(233) + "vrier";
	if(monthMin == "Mar") readingFormatDateSt += "mars";
	if(monthMin == "Apr") readingFormatDateSt += "avril";
	if(monthMin == "Jun") readingFormatDateSt += "juin";
	if(monthMin == "Jul") readingFormatDateSt += "juillet";
	if(monthMin == "Aug") readingFormatDateSt += "ao" + String.fromCharCode(150) + "t";
	if(monthMin == "Sep") readingFormatDateSt += "septembre";
	if(monthMin == "Oct") readingFormatDateSt += "octobre";
	if(monthMin == "Nov") readingFormatDateSt += "novembre";
	if(monthMin == "Dec") readingFormatDateSt += "d" + String.fromCharCode(233) + "cembre";

	readingFormatDateSt += " ";
	
	// Year
	readingFormatDateSt += tabSt[5] + " ";
	
	// Time
	readingFormatDateSt += "-" + " " + tabSt[3];
	
	return readingFormatDateSt;
},



}
