/* 3.2 Tutorial 3 slide 2 -- hardware introduction*/


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');

   function Three_TwoHardwareRequirementsView () {
   		View.apply(this, arguments);
   		// _createBackground.call(this);
   		_createRequirementIcons.call(this);
   		//_createLalitaAndMaya.call(this);
   }

   Three_TwoHardwareRequirementsView.prototype = Object.create(View.prototype);
   Three_TwoHardwareRequirementsView.prototype.constructor = Three_TwoHardwareRequirementsView;

   Three_TwoHardwareRequirementsView.prototype.returnCaptionArray = function() {
   		var captionText = ["This is the hardware you'll need..."];
   		return captionText;	
   }

   Three_TwoHardwareRequirementsView.DEFAULT_OPTIONS = {};


	function getX(total_number_of_icons, current_icon_number) {
		return Math.sin(current_icon_number*(2*Math.PI/total_number_of_icons));
	}


	function getY(total_number_of_icons, current_icon_number) {
		return -Math.cos(current_icon_number*(2*Math.PI/total_number_of_icons));
	}

	function _createRequirementIcons() {


		var PhoneIcon = new ImageSurface ({
			size : [100, 100],
			content: 'animation-assets/phone_logo.svg'
		});

		var placePhoneIcon = new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.5, 0.5]
			//translate: 
		});

		placePhoneIcon.setTransform(
			Transform.translate(200*getX(5,1), 200*getY(5,1), 0)
		);

		var movePhoneIcon = new StateModifier ();

		movePhoneIcon.setTransform(
			Transform.translate(-200*getX(5,1) + 3*200*getX(5,2), -200*getY(5,1) + 200*getY(5,2) + 100, 0),
			{duration: 1000, curve: 'easeInOut'}
		);





		var LaptopIcon = new ImageSurface ({
			size : [100, 100],
			content: 'animation-assets/laptop-logo.svg'
		});


		var placeLaptopIcon = new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.5, 0.5]
		});

		placeLaptopIcon.setTransform(
			Transform.translate(200*getX(5,2), 200*getY(5,2), 0)
		);

		
		var moveLaptopIcon = new StateModifier ();

		moveLaptopIcon.setTransform(
			Transform.translate(0, 100, 0),
			{duration: 1000, curve: 'easeInOut'}
		);





		var GSMIcon = new ImageSurface ({
			size : [100, 50],
			content: 'animation-assets/modem.png'
		});


		var placeGSMIcon = new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.5, 0.5]
		});

		placeGSMIcon.setTransform(
			Transform.translate(200*getX(5,3), 200*getY(5,3), 0)
		);
		

		var moveGSMIcon = new StateModifier();

		moveGSMIcon.setTransform(
			Transform.translate(0, 100, 0),
			{duration: 1000, curve: 'easeInOut'}
		);





		var OutletIcon = new ImageSurface ({
			size : [100, 100],
			content: 'animation-assets/outlet.png'
		});


		var placeOutletIcon = new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.5, 0.5]
		});

		placeOutletIcon.setTransform(
			Transform.translate(200*getX(5,4), 200*getY(5,4), 0)
		);

		var moveOutletIcon = new StateModifier ();

		moveOutletIcon.setTransform(
			Transform.translate(-200*getX(5,4) + 3*200*getX(5,3), -200*getY(5,4) + 200*getY(5,3) + 100, 0),
			{duration: 1000, curve: 'easeInOut'}
		);



 
		this.add(placePhoneIcon).add(movePhoneIcon).add(PhoneIcon);
		this.add(placeLaptopIcon).add(moveLaptopIcon).add(LaptopIcon);
		this.add(placeGSMIcon).add(moveGSMIcon).add(GSMIcon);
		this.add(placeOutletIcon).add(moveOutletIcon).add(OutletIcon);

	}



	module.exports = Three_TwoHardwareRequirementsView;

});