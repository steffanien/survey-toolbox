// Set variables to use later
var onButton = document.getElementById('turnOn');
var offButton = document.getElementById('turnOff');
var toolboxOn;

// When on function is run
function on() {
	// Set toolboxOn boolean to true
	toolboxOn = true;
	// Toggle to turn off button
	onButton.style.display = "none";
	offButton.style.display = "block";
	// Save changes
	save_options();
}

// When off function is run
function off() {
	// Set toolboxOn boolean to false
	toolboxOn = false;
	// Toggle to turn off button
	offButton.style.display = "none";
	onButton.style.display = "block";
	// Save changes
	save_options();
}

// When on function is run
function turnOn() {
	// Set toolboxOn boolean to true
	toolboxOn = true;
	// Toggle to turn off button
	onButton.style.display = "none";
	offButton.style.display = "block";
	// Save changes
	save_options();
	// Refresh Tab
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
    // Close Popup
    window.close();
}

// When off function is run
function turnOff() {
	// Set toolboxOn boolean to false
	toolboxOn = false;
	// Toggle to turn off button
	offButton.style.display = "none";
	onButton.style.display = "block";
	// Save changes
	save_options();
	// Refresh Tab
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
    // Close Popup
    window.close();
}




// When save_options function is run
function save_options() {
	// Set onOrOff variable to tooboxOn boolean
	var onOrOff = toolboxOn;
	// Save to Chrome storage 
  	chrome.storage.sync.set({
    	savedStatus: onOrOff
  	}, function() {
	});
}

// When restore_options function is run
function restore_options() {
	// Get saved Status from storage
	chrome.storage.sync.get({
    	savedStatus: ''
	}, function(items) {
		// If retrieved status is true aka "on"
		if(items.savedStatus) {
			// Run on function
			on();
		// If retrieved status is false aka "off"
		} else {
			// Run off function
			off();
		}
	});
}


// Set functions to run on button clicks
onButton.onclick = turnOn;
offButton.onclick = turnOff;

// Restore preferences on page load
document.addEventListener('DOMContentLoaded', restore_options);




