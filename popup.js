var onButton = document.getElementById('turnOn');
var offButton = document.getElementById('turnOff');
var toolboxOn;

function on() {
	toolboxOn = true;
	onButton.style.display = "none";
	offButton.style.display = "block";
	save_options();
}

function off() {
	toolboxOn = false;
	offButton.style.display = "none";
	onButton.style.display = "block";
	save_options();
}

function save_options() {
	var onOrOff = toolboxOn;
  	chrome.storage.sync.set({
    	savedStatus: onOrOff
  	}, function() {

	});
}

function restore_options() {
	chrome.storage.sync.get({
    	savedStatus: ''
	}, function(items) {
		if(items.savedStatus) {
			on();
		} else {
			off();
		}
	});
}


// Set onclick events
onButton.onclick = on;
offButton.onclick = off;

// Set onload event to restore preferences
document.addEventListener('DOMContentLoaded', restore_options);




