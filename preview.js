$( document ).ready(function() {
	if ( $("#preview-banner").length ) {
		$("#advanced-options").after('<div class="btn btn-success" id="theNextButton" style="margin-left:8px;"><span class="explain-text">Next Page</span></div>');
		$("#theNextButton").after('<div class="btn btn-danger" id="theJFEButton" style="margin-left:8px;"><span class="explain-text">Turn off JFE</span></div>');
		$("#theJFEButton").after('<div class="btn btn-primary" id="theSurveyIDButton" style="margin-left:8px;"><span class="explain-text">Get Survey ID</span></div>');
	} 

	if ( $("#PreviewBanner").length ) {
		$(".Restart").after('<div class="InsetButton" id="theNextButton" style="margin-left:8px; cursor: pointer;"><span class="L"></span><span class="explain-text">Next Page</span><span class="R"></span></div>');
		$("#theNextButton").after('<div class="InsetButton" id="theSurveyIDButton" style="margin-left:8px; cursor: pointer;"><span class="L"></span><span class="explain-text">Get Survey ID</span><span class="R"></span></div>');
		$(".OptionContainerDiv").css("width","900px")
	} 
	

	$("#theNextButton").click(function() {
		theNextPage();
	});

	$("#theJFEButton").click(function() {
		jfeOff();
	});

	$("#theSurveyIDButton").click(function() {
		getSurveyID();
	});

	function theNextPage() {
	  var element = document.getElementById("preview-view");
	  if (typeof(element) != "undefined" && element != null) {
	    document.getElementById("preview-view").contentWindow.document.getElementById("NextButton").click();
	  } else {
	    document.getElementById("NextButton").click();
	  }
	}

	function jfeOff() {
		// Get URL and add ?Q_JFE=0
		var w = window.location.href + "?Q_JFE=0";
		// Reset Window URL
		window.location = w;
	}

	function getSurveyID() {
		// Get URL
		var sv = window.location.href;
		// Pull ID from URL
		sv = "SV_" + sv.split("SV_")[1];
		// Check if sv has question mark in it
		var hasQuestionMark = sv.includes("?");;
		// If Survey ID has a ?
		if(hasQuestionMark) {
			// Find position of ?
			var position = sv.indexOf("?");
			// Cut it out
			var sv = sv.slice(0,position);
		}
		// Check if sv has ampersand  in it
		var hasAmpersand = sv.includes("&");
		// If Survey ID has a &
		if(hasAmpersand) {
			// Find position of &
			var position = sv.indexOf("&");
			// Cut it out
			var sv = sv.slice(0,position);
		}		
		// Add Hidden Input with Survey ID into DOM
		$("#theSurveyIDButton").after('<textarea id="hiddenInput" style="position:absolute;z-index:-100;opacity:0">The Test</textarea>');
		// Set Hidden Input to variable
		var hiddenInput  = document.getElementById("hiddenInput");
		// Set hidden input text area value with survey ID
		hiddenInput.value = sv;
		// Select Content from Hidden Input
		hiddenInput.focus();
		hiddenInput.select();
		// Copy to clipboard
		document.execCommand("Copy");
		// Flash Copied in GUI
		$("#theSurveyIDButton").after('<p id="copyAlert" style="display:inline-block;vertical-align:13px;margin-left:8px;">Copied!</p>');
		// Remove flash alert
		$("#copyAlert").fadeOut(700);
	}

});


