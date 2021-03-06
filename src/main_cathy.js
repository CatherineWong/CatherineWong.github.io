
/*global famous*/
// import dependencies

// TODO: switch this to use Require.js instead
var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var Surface = famous.core.Surface;
var ImageSurface = famous.surfaces.ImageSurface;
var HeaderFooterLayout = famous.views.HeaderFooterLayout;
var StateModifier = famous.modifiers.StateModifier;


// TODO: Create a get next function in main, that determines where we are and has a switch statement to explicitly run or 
// reverse run a given animation. Each animation should have: a function that returns its caption text; when added, 
// have an init method that reads in and stores these arrays and determines progress bar length (ex. init tutorial 1)

// create the main context
var mainContext = Engine.createContext();
var tutorialNames = [
	"1) Overview",
	"2) Training your Clinic",
	"3) Getting Going",
	"4) Learn More"];

var captionText = [
	[
		"1) Hi Cathy is Cathy",
		"2) Sup Cathy",
		"3) Yo Cathy",
		"4) Hello Cathy",
		"5) Nick",
		"6) NICK",
		"7) hersh",
		"8) HERSHEY",
		"9) nhershey",
		"10) DDDDOOOONNNNEEEE!"
	],
	[
		"1) Hi Cathy",
		"2) Sup Cathy",
		"3) Yo Cathy",
		"4) Hello Cathy",
		"5) DDDDOOOONNNNEEEE!"
	],
	[
		"1) Hi Cathy",
		"2) Sup Cathy",
		"3) Yo Cathy",
		"4) Hello Cathy",
		"5) Nick",
		"6) NICK",
		"7) DDDDOOOONNNNEEEE!"
	],
	[
		"1) Hi Cathy",
		"2) Sup Cathy",
		"3) Yo Cathy",
		"4) Hello Cathy",
		"5) Nick",
		"6) DDDDOOOONNNNEEEE!"
	]];


//these are style components
var sidebarWidth = 290;
sidebar_backgroundColor = '#D8D8D8';
var fontType = 'Avenir';
var headerBarHeight = 80;
var headerFontSize = '40px';
var captionFontSize = '40px';

// These two variables change often and dictate what tutorial and what caption the user is on
var captionTextIndex = 0;
var tutorialIndex = 0;

/* This first chunk of code creates the view */

//make sideBar
var sideBarContent = '<div class="button incomplete selected" onclick="selectTutorial(this)">' + tutorialNames[0] + '</div>';
for (var i = 1; i < tutorialNames.length; i++) {
	sideBarContent += '<div class="button incomplete" onclick="selectTutorial(this)">' + tutorialNames[i] + '</div>'
}
var sidebar = new Surface({
	content: '<img id="logo" src="Medic-Mobile-logo+name_300.png"> \
	<div id="tutorials"> Tutorials </div>' + sideBarContent,
	size: [sidebarWidth, undefined], 
	properties: {
		boxShadow: '1px 0px 2px #888888',
		backgroundColor: sidebar_backgroundColor,
		fontFamily: fontType,
		borderRightStyle: 'solid',
		borderRightWidth: '1px',
		borderRightColor: '#848484'
	}
});
mainContext.add(sidebar);

//make headerBar
var headerBar = new Surface ({
	size: [screen.width - sidebarWidth, headerBarHeight],
	content: tutorialNames[0],
	properties: {
		backgroundColor: 'black',
		fontFamily: fontType,
		fontSize: headerFontSize,
		lineHeight: '80px',
		textAlign: 'center',
		color: "white",
		marginLeft: sidebarWidth + 'px'
	}
})
mainContext.add(headerBar);

//make progressBar
var numSteps = captionText[tutorialIndex].length;
var stepWidth = headerBar.size[0] / numSteps;// - (0.2 * numSteps);
var content = '<div style="width:' + stepWidth + 'px;" class="completedStep"></div>';
for (var i=1; i < numSteps; i++) {
	content += '<div style="width:' + stepWidth + 'px;" class="uncompletedStep"></div>'
}
var progressBar = new Surface ({
	size: [screen.width - sidebarWidth, 20],
	content: '<div>'+content+'</div>',
	properties: {
		boxShadow: '0px 2px 2px #888888',
		/*borderBottom: 'solid',
		borderBottomWidth: '1px',
		borderBottomColor: '#848484',*/
		marginTop: headerBar.size[1] + 'px',
		marginLeft: sidebarWidth + 'px'
	}
})
mainContext.add(progressBar);

//make backArrow
var backArrow = new ImageSurface({
    size: [50, 50],
    content: 'src/back_arrow.svg',
    properties: {
		marginLeft: (sidebarWidth + 50) + 'px',
		marginTop: (headerBar.size[1]+progressBar.size[1]) + 'px'
	}
});

var placeBackArrow = new StateModifier({
  	align: [0, 0.4],
  	origin: [0.5, 0.5]
});
mainContext.add(placeBackArrow).add(backArrow);

//make nextArrow
var nextArrow = new ImageSurface({
    size: [50, 50],
    content: 'src/next_arrow.svg',
    properties: {
		marginLeft: (sidebarWidth + headerBar.size[0] - 50) + 'px',
		marginTop: (headerBar.size[1]+progressBar.size[1]) + 'px'
	}
});

var placeNextArrow = new StateModifier({
  	align: [0, 0.4],
  	origin: [0.5, 0.5]
});
mainContext.add(placeNextArrow).add(nextArrow);

// make caption
var caption = new Surface ({
	size: [screen.width - sidebarWidth, 80],
	content: captionText[tutorialIndex][captionTextIndex],
	properties: {
		fontFamily: fontType,
		fontSize: captionFontSize,
		lineHeight: '80px',
		textAlign: 'center',
		marginLeft: sidebarWidth + 'px'
	}
})
var placeCaption = new StateModifier({
  	align: [0, 1],
  	origin: [0, 1]
});
mainContext.add(placeCaption).add(caption);


/* This second chunk of code manages functionality */

//this function is used in multiple places to manage the events that happen when one changes tutorials
function changeTutorial() {
	captionTextIndex = 0;
	var numSteps = captionText[tutorialIndex].length;;
	var stepWidth = headerBar.size[0] / numSteps;// / numSteps - (0.4 * numSteps);
	var content = '<div style="width:' + stepWidth + 'px;" class="completedStep"></div>';
	for (var i=1; i < numSteps; i++) {
		content += '<div style="width:' + stepWidth + 'px;" class="uncompletedStep"></div>'
	}
	progressBar.setContent('<div>'+content+'</div>');
	caption.setContent(captionText[tutorialIndex][captionTextIndex]);
	headerBar.setContent(tutorialNames[tutorialIndex]);
}

//This function handles the event when a user clicks on a tutorial on the sideBar
//the me parameter is the button that is clicked
function selectTutorial(me) {
	var buttons = document.getElementsByClassName("button");
    for (var i = 0; i < buttons.length; i++){
    	buttons[i].className = buttons[i].className.replace('selected', '');
    	if (buttons[i] == me) {
    		tutorialIndex = i;
    	}
    }
    me.className = me.className + " selected";
    changeTutorial();
}

//this function manages what happens when you click the nextArrow
//clicking next at the end of a tutorial goes to the BEGINNING of the NEXT tutorial
nextArrow.on('click', function() {
	loadNextTutorialAnimation();
  	if (captionTextIndex + 1 < captionText[tutorialIndex].length) {
  		captionTextIndex++;
  		caption.setContent(captionText[tutorialIndex][captionTextIndex]);
  		var uncompletedBars = document.getElementsByClassName('uncompletedStep');  
  		uncompletedBars[0].className = 'completedStep';
  	}
  	else if (tutorialIndex + 1 == captionText.length){
		var completedTutorial = document.getElementsByClassName('button selected');
  		completedTutorial[0].className = 'button completed';
	}
  	else {
  		var completedTutorial = document.getElementsByClassName('button selected');
  		var buttonBefore = completedTutorial[0];
  		completedTutorial[0].className = 'button completed';
  		var buttons = document.getElementsByClassName("button");
  		for (var i = 0; i < buttons.length; i++){
  			if (buttons[i] == buttonBefore) {
  				buttons[i + 1].className = buttons[i+1].className + ' selected';
  			}
	    }
	    tutorialIndex++;
  		changeTutorial();
  	}
  	
});

//this function manages what happens when you click the backArrow
//clicking back at the beginning of a tutorial goes to the BEGINNING of the PREVIOUS tutorial
backArrow.on('click', function() {
	loadPreviousTutorialAnimation();
  	if (captionTextIndex > 0) {
  		captionTextIndex--;
  		caption.setContent(captionText[tutorialIndex][captionTextIndex]);
  		var completedBars = document.getElementsByClassName('completedStep');  
  		completedBars[completedBars.length - 1].className = 'uncompletedStep';
  	}
  	else if (tutorialIndex >  0){
  		var completedTutorial = document.getElementsByClassName('button selected');
  		var buttonAfter = completedTutorial[0];
  		completedTutorial[0].className = completedTutorial[0].className.replace('selected','');
  		var buttons = document.getElementsByClassName("button");
  		for (var i = 0; i < buttons.length; i++){
  			if (buttons[i] == buttonAfter) {
  				buttons[i - 1].className = buttons[i - 1].className + ' selected';
  			}
	    }
	    tutorialIndex--;
  		changeTutorial();
  	}
});


/** Define the animations for the tutorials: add each tutorial animation below the next**/
// This function handles advancement through the tutorial animations
function loadNextTutorialAnimation() {
	runAnimation1_1();
}

// This function handles back progress through the tutorials
function loadPreviousTutorialAnimation() {
	reverseAnimation1_1();
}

/** Tutorial #1 **/

// Animation 1.1
var surface = new Surface({
	  size: [100, 100],
	  properties: {
	    color: 'white',
	    textAlign: 'center',
	    backgroundColor: '#FA5C4F'
	  }
	});
var stateModifier = new StateModifier();

function runAnimation1_1() {
	mainContext.add(stateModifier).add(surface);
		stateModifier.setTransform(
		  Transform.translate(100, 300, 0),
		  { duration : 1000, curve: 'easeInOut' }
		);
}

function reverseAnimation1_1() {
	stateModifier.halt();
	stateModifier.setTransform(
		  Transform.translate(-100, -300, 0),
		  { duration : 1000, curve: 'easeInOut' }
		);
	// remove the surface: TODO: use a completion callback to remove
	//surface.render = function() {return null;}
}

