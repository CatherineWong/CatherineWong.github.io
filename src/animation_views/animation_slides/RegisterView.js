/* RegisterView.js*/

define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');

	var Transitionable = require('famous/transitions/Transitionable');
	var TransitionableTransform = require('famous/transitions/TransitionableTransform');
	var Modifier = require('famous/core/Modifier');
	var SubmitInputSurface = require('famous/surfaces/SubmitInputSurface');
	var InputSurface = require('famous/surfaces/InputSurface');

   function RegisterView () {
   		View.apply(this, arguments);
   		_makeBackground.call(this);
   		//_patientRegister.call(this);

   				
   }

   RegisterView.prototype = Object.create(View.prototype);
   RegisterView.prototype.constructor = RegisterView;

   RegisterView.prototype.returnCaptionArray = function() {
   		var captionText = ["Let’s have you try to register a patient."];
   		return captionText;	
   }

   RegisterView.DEFAULT_OPTIONS = {};

   function _makeBackground() {

   		//gray surface on the left
   		var background = new Surface({
   			size : [605, 550],
   			content : 'To register Maya, you should type “R 5 Maya” into the phone below',
   			properties : {
   				color : 'black',
   				textAlign : 'left',
   				backgroundColor: 'gray'
   			}
   		});

   		var backgroundModifier = new StateModifier({
   			align : [0.5, 0.5],
   			origin : [1, 0.45],
   			transform : Transform.translate(0,8,-0.1)
   		});

   		this.add(backgroundModifier).add(background);


   		//white surface on the right
   		var background2 = new Surface({
   			size : [605, 550],
   			//content :'animation-assets/phone_logo.svg'
   			properties : {
   				color : 'black',
   				textAlign : 'left',
   				backgroundColor: 'white'
   			}
   		});

   		var backgroundModifier2 = new StateModifier({
   			align : [1, 0.5],
   			origin : [1, 0.45],
   			transform : Transform.translate(0,8,-0.1)
   		});

   		this.add(backgroundModifier2).add(background2);


   		//phone on the left
   		var surface = new ImageSurface ({
   			size : [690, 480],
   			content : 'animation-assets/phone_logo.svg',
   			properties : {
   				//backgroundColor : 'black'
   			}
   		});

   		var surfaceModifier = new StateModifier({
   			align : [0.5, 0.5],
   			origin : [0.5, 0.5],
   			transform: Transform.translate(-280, 60, 0)
   		});

   		this.add(surfaceModifier).add(surface);


   		//input surface
      var inputSurface = new InputSurface({
   			size : [100, 25],
            properties : {
               backgroundColor : 'gray'
            }
   			//value : 'hello'
		});

		var surfaceModifier2 = new StateModifier({
   			align : [0.5, 0.5],
   			origin : [0.5, 0.5],
   			transform: Transform.translate(-270, 50, 0.1)
   		});

		this.add(surfaceModifier2).add(inputSurface);


		//submit form surface
		this.submitInputSurface = new SubmitInputSurface({
			size: [50, 45],
         properties : {
            backgroundColor : 'gray'
         },
			value : 'Send'
		});

		var surfaceModifier3 = new StateModifier({
   			align : [0.5, 0.5],
   			origin : [0.5, 0.5],
   			transform: Transform.translate(-280, 123, 0.1)
   		});

		this.add(surfaceModifier3).add(this.submitInputSurface);

		var input_str;


      var laptop = new ImageSurface ({
         size : [550, 600],
         content: 'animation-assets/laptop-logo.svg'
      });

      this.placeLaptop = new StateModifier ({
         align: [0.5, 0.5],
         origin: [0.5, 0.5],
         transform: Transform.translate(300, 0, 0)
      });
      
      this.add(this.placeLaptop).add(laptop);

		//wrong or right input notification surface
		var background3 = new Surface({
   			size : [150, 50],
   			content : '',
   			properties : {
   				color : 'black',
   				textAlign : 'left'
   				//backgroundColor: 'white'
   			}
   		});

   		var backgroundModifier3 = new StateModifier({
   			align : [0.5, 0.5],
   			origin : [1, 0.45],
   			transform : Transform.translate(0, 100, 0.00001)
   		});

   		this.add(backgroundModifier3).add(background3);


   		//prompt message on the phone
   		/*var background4 = new Surface({
   			size : [105, 30],
   			content : '',
   			properties : {
   				color : 'black',
   				textAlign : 'left'
   				//backgroundColor: 'gray'
   			}
   		});

   		var backgroundModifier4 = new StateModifier({
   			align : [0.5, 0.5],
   			origin : [1, 0.45],
   			transform : Transform.translate(370, -135, 0.2)
   		});

   		this.add(backgroundModifier4).add(background4);*/

         this.new_patient = new Surface ({
            size : [380, 235],
            content : 'Congratulations! New patient registered!',
            properties : {
               color : 'black',
               textAlign : 'left',
               backgroundColor: 'white'
            }
         });

         var backgroundModifier5 = new StateModifier({
            align : [0.5, 0.5],
            origin : [1, 0.45],
            opacity : 0,
            transform : Transform.translate(490, -15, 0.2)
         });

         this.add(backgroundModifier5).add(this.new_patient);

		this.submitInputSurface.on('click', function() {
   			console.log('clicked');

            if (inputSurface.getValue() == 'R 5 Maya') {
            	console.log('value got');
            	input_str = inputSurface.getValue();
            	background3.setContent('');
               inputSurface.setValue('Message sent!');
            	//background4.setContent('R 5 Maya');
               
               backgroundModifier5.setOpacity(1);

            } else {
            	console.log('wrong value');
            	background3.setContent('Wrong input. Please Enter again');
            }
        });

   } 

   function _patientRegister() {
      var new_patient = new Surface ({
         size : [105, 30],
         content : 'Congratulations! New patient registered!',
         properties : {
               color : 'black',
               textAlign : 'left',
               backgroundColor: 'gray'
         }
      });

      var backgroundModifier5 = new StateModifier({
            align : [0.5, 0.5],
            origin : [1, 0.45],
            transform : Transform.translate(370, -135, 0.2)
      });

      this.add(backgroundModifier5).add(new_patient);
   }

   module.exports = RegisterView;

});