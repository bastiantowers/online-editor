(function(exports){
	"use strict"
	
	var config = {};
	
	function onlineEditor(options){

		// Personalization...
		options = options || {};

		config.editButtonClass = 'onlineEditorEditBtn';
		config.allUIElements = [];

		this.config = config;
	}

	// Create UI Edit Button
	function createUIEditButton() {
		var editButton;

		// EDIT BUTTON
		editButton = document.createElement('button');
		editButton.innerText = 'Edit';
		editButton.style.position = 'fixed';
		editButton.style.bottom = '10px';
		editButton.style.right = '10px';
		editButton.style.fontSize = '14px';
		editButton.style.zIndex = '1000';
		editButton.addEventListener('click', editUIElements);
		editButton.className = config.editButtonClass;

		document.body.appendChild(editButton);

	}

	function editUIElements() {
		console.log('prepare for edition mode...');
		config.allUIElements = scanUIElements();
		if(config.allUIElements){
			console.log('scanning elements...');

			for (var i = config.allUIElements.length - 1; i >= 0; i--) {
				config.allUIElements[i].setAttribute('contentEditable','true');
			}

			alert('Edition ready! Click on texts and images to edit them. Use Saving Buttons when ready!');

		} else {
			console.info('There was an error scanning UI elements');
		}
	}

	function scanUIElements() {
		var querySelector = (':not([class="' + config.editButtonClass + '"])'),
			allUIElements = document.body.querySelectorAll(querySelector);

		if(allUIElements.length > 0){
			return allUIElements;
		} else {
			return false;
		}
	}

	// INIT PROCESS
	createUIEditButton();

	exports.onlineEditor = onlineEditor;
})(window)


var myOnlineEditor = new onlineEditor();