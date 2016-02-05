$( document ).ready(function() {
	var toolboxOn;
	var url;
	var restored_URL;
	restore_options();

	function loadUp() {
		if ( $("#preview-banner").length && toolboxOn ) {
			$("#advanced-options").after('<div class="btn btn-success" id="theNextButton" style="margin-left:8px;"><span class="explain-text">Next Page</span></div>');
			$("#theNextButton").after('<div class="btn btn-danger" id="theJFEButton" style="margin-left:8px;"><span class="explain-text">Turn off JFE</span></div>');
			$("#theJFEButton").after('<div class="btn btn-primary" id="theSurveyIDButton" style="margin-left:8px;"><span class="explain-text">Get Survey ID</span></div>');
		} 

		if ( $("#PreviewBanner").length && toolboxOn ) {
			$(".Restart").after('<div class="InsetButton" id="theNextButton" style="margin-left:8px; cursor: pointer;"><span class="L"></span><span class="explain-text">Next Page</span><span class="R"></span></div>');
			$("#theNextButton").after('<div class="InsetButton" id="theJFEOnButton" style="margin-left:8px; cursor: pointer;"><span class="L"></span><span class="explain-text">Turn JFE On</span><span class="R"></span></div>');
			$("#theJFEOnButton").after('<div class="InsetButton" id="theSurveyIDButton" style="margin-left:8px; cursor: pointer;"><span class="L"></span><span class="explain-text">Get Survey ID</span><span class="R"></span></div>');
			$(".OptionContainerDiv").css("width","900px")
		} 	
		console.log("Toolbox is loaded");

		$("#theNextButton").click(function() {
			theNextPage();
		});

		$("#theJFEButton").click(function() {
			jfeOff();
		});

		$("#theJFEOnButton").click(function() {
			jfeOn();
		});

		$("#theSurveyIDButton").click(function() {
			copySurveyIDtoClipboard();
		});

	}


	function theNextPage() {
	  var element = document.getElementById("preview-view");
	  if (typeof(element) != "undefined" && element != null) {
	    document.getElementById("preview-view").contentWindow.document.getElementById("NextButton").click();
	  } else {
	    document.getElementById("NextButton").click();
	  }
	}

	function jfeOff() {
		// Get UTL
		url = window.location.href;
		save_URL();

		// Get URL and add ?Q_JFE=0
		var w = window.location.href + "?Q_JFE=0";
		// Reset Window URL
		window.location = w;
	}

	function jfeOn() {
		// Restore JFE URL
		restore_URL();
		// Wait 300 ms to give Chrome time to restore URL  before proceeding
		setTimeout(function(){ 
			// Get Non JFE URL Survey ID
			var sv = getSurveyID()
			// Check if current survey ID is in the restored URL
			var n = restored_URL.indexOf(sv);
			// If Survey IDs match
			if(n >= 0) {
				// Reset Window URL
				window.location = restored_URL;
			// If Survey IDs don't match
			} else {
				// Alert User
				alert("Error Processing Request. You will have to reopen the survey preview to turn JFE back on")
			}
		}, 300);


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
		return sv;
	}

	function copySurveyIDtoClipboard() {
		var sv = getSurveyID();	
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

	function restore_options() {
		chrome.storage.sync.get({
	    	savedStatus: ''
		}, function(items) {
			if(items.savedStatus) {
				toolboxOn = true;
				loadUp();
			} else {
				toolboxOn = false;
				loadUp();
			}
		});
	}
 
	function save_URL() {
		// Set jfeURL variable to url boolean
		var jfeURL = url;
		// Save to Chrome storage 
	  	chrome.storage.sync.set({
	    	savedURL: jfeURL
	  	}, function() {
		});
	}


	function restore_URL() {
		// Get saved Status from storage
		chrome.storage.sync.get({
	    	savedURL: ''
		}, function(items) {
			restored_URL = items.savedURL
		});
	}

	
});


