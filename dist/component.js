;
(function(exports){
	"use strict"
	
	var config = {};
	
	function onlineEditor(options){

		// Personalization...
		options = options || {};

		// config.editButtonClass = 'onlineEditorEditBtn';
		// config.saveAsImageButtonClass = 'onlineEditorEditBtn';
		// config.allUIElements = [];

		config = {
			saveAsImageButtonClass : 'onlineEditorEditBtn',
			allUIElements : [],
			buttonContainer : '',
			buttonContainerId : 'onlineEditorbuttonContainerId',
			imageCount : 0
		}

		this.config = config;

		this.init = init;
	}
	// Create UI Buttons Container
	function createUI_ButtonContainer() {
		var buttonContainer;

		// EDIT BUTTON
		buttonContainer = document.createElement('div');
		buttonContainer.id = config.onlineEditorbuttonContainerId;
		buttonContainer.style.position = 'fixed';
		buttonContainer.style.bottom = '10px';
		buttonContainer.style.right = '90px';
		buttonContainer.style.fontSize = '14px';
		buttonContainer.style.zIndex = '1000';

		try{
			document.body.appendChild(buttonContainer);
			config.buttonContainer = buttonContainer;
			return true;
		} catch(e) {
			console.error(e);
			console.log('Not able to append a container to the body element.');
			return false;
		}
	}

	// Create UI Edit Button
	function createUI_Edit__Button() {
		var editButton;

		// EDIT BUTTON
		editButton = document.createElement('button');
		editButton.innerText = 'Edit';
		editButton.style.position = 'relative';
		editButton.style.fontSize = '14px';
		editButton.style.display = 'inline-block';
		editButton.style.zIndex = '1000';
		editButton.addEventListener('click', editUIElements);

		config.buttonContainer.appendChild(editButton);

	}

	// Create UI Save As Image Button
	function createUI_SaveAsImage__Button() {
		var saveAsImageButton;

		// EDIT BUTTON
		saveAsImageButton = document.createElement('button');
		saveAsImageButton.id = 'onlineEditorSaveAsImageButton';
		saveAsImageButton.innerText = 'Save As Image...';
		saveAsImageButton.style.position = 'relative';
		saveAsImageButton.style.fontSize = '14px';
		saveAsImageButton.style.display = 'inline-block';
		saveAsImageButton.addEventListener('click', saveAsImage);

		config.buttonContainer.appendChild(saveAsImageButton);

	}

	// Save as Image...
	function saveAsImage(){
		html2canvas(document.body, {
		    onrendered: function(canvas) {
		        // canvas is the final rendered <canvas> element
		        console.log('Render Finished.');
		        config.imageCount += 1;
		        createImageLink(canvas);
		    }
		});
	}

	// Download Image when ready...
	function createImageLink(canvas) {
		console.log('creating image link...');
		var imageLink = document.createElement('a');
		imageLink.href = canvas.toDataURL("image/png");
		imageLink.innerHTML = 'Download Image';
		imageLink.download = (config.imageCount + '.png');

		imageLink.style.position = 'relative';
		imageLink.style.fontSize = '14px';
		imageLink.style.display = 'inline-block';
		imageLink.style.padding = '0 20px';
		config.buttonContainer.appendChild(imageLink);
	}

	function editUIElements() {
		console.log('prepare for edition mode...');
		config.allUIElements = scanUIElements();
		if(config.allUIElements){
			console.log('scanning elements...');

			for (var i = config.allUIElements.length - 1; i >= 0; i--) {
				config.allUIElements[i].setAttribute('contentEditable','true');
			}

			//alert('Edition ready! Click on texts and images to edit them. Use Saving Buttons when ready!');
			createUI_SaveAsImage__Button();

		} else {
			console.info('There was an error scanning UI elements');
		}
	}

	function scanUIElements() {
		var querySelector = (':not([id="' + config.onlineEditorbuttonContainerId + '"])'),
			allUIElements = document.body.querySelectorAll(querySelector);

			console.log(querySelector);
		if(allUIElements.length > 0){
			return allUIElements;
		} else {
			return false;
		}
	}

	// INIT PROCESS
	function init(){	
		if(createUI_ButtonContainer()){
			createUI_Edit__Button();
		}
	}

	exports.onlineEditor = onlineEditor;
})(window);
var myOnlineEditor = new onlineEditor();
myOnlineEditor.init();