// Define General Variables  ******************************************************* 
var theSacredSequence = []; //this is the full sequence to repeat, it changes only at new game;
var thePartialSequence = [];//this is the portion to repeat of the full sequence, it increments during the game it starts of 4 notes then adds one by one
var thePlayerSequence = []; // this is the player sequence , it increments during the game and needs to be equal to thePartialSequence to proceed with the game
var clickCounter = 0;// step-click counter
var stepCounter = 0; // step-click counter
var Limit = 1; // number of notes to play
var Goal = 4; // limit to next level
var Played = "note"; // this is the active user played note, it varies continuosly
var stringToPlay = "ABCD"
var runningFunction = "--"; // check in webpage for running function

// BEGIN THE SACRED SEQUENCE generate a random sequence of (seqLen) symbols ABCD ******************************************************* 
function generateSacredSequence() {
																		runningFunction="generateSacredSequence"; // returns running function in webpage
																		var seqLen = Goal;											
																		console.clear();
																		theSacredSequence = [];
							 
																		for (i=1; i<=Goal; i++) {// lenght of the sacred sequence (it varies with level progress)
																		let theNote = "."
																		let myRnd = Math.floor(Math.random() * 100) + 1; //generate a number between 1 and 100
																		if      (1 <= myRnd && myRnd <= 25)		{theNote = "A";} //evaluate the number and assign it a value ABCD
																		else if (26 <= myRnd && myRnd <= 50)	{theNote = "B";} //evaluate the number and assign it a value ABCD
																		else if (51 <= myRnd && myRnd <=75)		{theNote = "C";} //evaluate the number and assign it a value ABCD
																		else if (76<= myRnd && myRnd <= 100)	{theNote = "D";} //evaluate the number and assign it a value ABCD
																		else {console.log("something goes wrong when myRnd is " + myRnd);} //say you to fuck offand check the myRnd value
																		console.log( "myRnd " + myRnd + " Note " + theNote + " index value " + i); //check
																		theSacredSequence.push(theNote); //put theNote into theSacredSequence	
																		console.log("the Sacred Sequence is " + theSacredSequence); //check
																		}
																		document.getElementById("displaySequence").innerHTML = theSacredSequence; //	display theSacredSequence 
																		//displayVar();											
																		//tryToFollowMe();
																		}
// END THE SACRED SEQUENCE---YOU NEED TO PRESS START TO CONTINUE, START TRIGGERS tryToFollowMe ---------------------------------------------------------------------------------------------------------------------------- 


// BEGIN TRY TO FOLLOW ME---displays the partial sequence to play based on theSacredSequence andwait for you to repeat it-
// it does not call any function, it just stops, the next event is triggered by playing button---------------------------------------------------------------------
function tryToFollowMe(){
												runningFunction="tryToFollowMe";		//running function check						
												console.log("here start tryToFollowMe"); //running function check in console								
												thePartialSequence=[];								
												thePartialSequence = theSacredSequence.slice(0, Limit); //define partial sequence to play, from sacredSequence														
										    	listenTo(thePartialSequence);
												console.log("now you need to play " +  Limit + " correct notes");
												console.log("repeat this notes " + thePartialSequence); //check console		
												displayVar();														
}

// END TRY TO FOLLOW ME ************************************************************

// BEGIN play your note by pressing buttons in HTML it generates the matching letter ***************************************************************************************************
// this function push into an array the sequence played by user, 

function PlayX(button) {
  											runningFunction="PlayX"; 					
 											var x = button.id // take the id value from the button you play (all the buttons point to this function) 
 											var Played = button.value; // CLICK take the value which represent the played note from the relative button in html
											playSound(Played);					
											console.log(Played); 					
 											thePlayerSequence.push(Played);//push the button value into the user array thePlayerSequence 	            
											console.log(thePlayerSequence);		               
											clickCounter ++; //keep count of the clicks 
											displayVar();
											
											checkIfCorrect(); //call the function which check il the entry is correct						
					
					}
					
// END play your note by pressing buttons in HTML it generates the corrispondxent letter ***************************************************************************************************
					
// BEGIN check if correct ..................................................................................

function checkIfCorrect(){ var index = stepCounter;							
												stepCounter ++;
												console.log("index " + index);
												console.log("limit " + Limit);
												console.log("stepcounter " + stepCounter);
												console.log(thePlayerSequence);
												console.log(thePartialSequence);
												console.log(thePlayerSequence[index]);
												console.log(thePartialSequence[index]);    							
									
												if      (thePlayerSequence[index] == thePartialSequence[index] && stepCounter == Limit && Limit == Goal) {nextLevel();}									
									
												else if (thePlayerSequence[index] == thePartialSequence[index] && stepCounter == Limit) {addAnother();}	
																																					
												else if (thePlayerSequence[index] == thePartialSequence[index]){console.log("good job");
																												 		 																												  																								  																												      }													
												else {console.log("bad job");
												resetAll();
												location.reload(); }
												}

// END check if correct ---------------------------------------------------------------------------

//BEGIN add another step----------------------------
function addAnother() {console.log("things getting harder")
											  stepCounter = 0; Limit ++; // it adds a note to the sequence to repeat
											  thePlayerSequence = []; // it resets the sequence to repeat to zero 
											  displayVar(); // check html
											  tryToFollowMe(); // calls try to follow me function
											  }  
								  
//END addanother step

//BEGIN NEXTLEVEL..........................................................................

function nextLevel(){ Goal = Goal + 4; // it rise the level of the new sequence of 4 elements
											 Limit = 1; // it brings back limit value to 1 
											 stepCounter = 0;	// it resets stepCounter (not sure this is correct, probably it should continue because it is some kind of points)							 
											 theSacredSequence = []; //this is the full sequence to repeat, it changes only at new game;
										    thePartialSequence = [];//this is the portion to repeat of the full sequence, it increments during the game it starts of 4 notes then adds one by one
										    thePlayerSequence = []; // this is the player sequence , it increments during the game and needs to be equal to thePartialSequence to proceed with the game						   						  
											 displayVar();// check html     
										    generateSacredSequence();//function call after game reset
    				                }
					

// END NEXTLEVEL...............................................................

//BEGIN resetAll......reset all game vars and start a new game from 0 .....................

function resetAll(){theSacredSequence = []; //this is the full sequence to repeat, it changes only at new game;
									  thePartialSequence = [];//this is the portion to repeat of the full sequence, it increments during the game it starts of 4 notes then adds one by one
									  thePlayerSequence = []; // this is the player sequence , it increments during the game and needs to be equal to thePartialSequence to proceed with the game
									  clickCounter = 0;// step-click counter
									  stepCounter = 0; // step-click counter
									  Limit = 1; // number of notes to play
									  Goal = 4; // limit to next level
									  Played = "note"; // this is the active user played note, it varies continuosly
									  runningFunction = "--"; // check in webpage for running function
									 }
//END resetAll......................................::::.............

 //BEGIN PLAY A NOTE - Original SIMON Notes are     
//    G-note (blue, lower right);        G+ E
//    C-note (yellow, lower left);       C  G    
//    E-note (red, upper right).             
//    G-note (green, upper left, an octave higher than blue)
//

function playSound(Played) { var Sound; //Played comes 
														 var Freq = Played;
														 switch(Freq) { 
						  								 case "A": Freq = 392.0; break; //GREEN G4
 													    case "B": Freq = 329.6; break; //RED E4
											      		 case "C": Freq = 261.6; break; //YELLOW C4
													    case "D": Freq = 196.0; break; //BLUE G3
													    default: console.log("playSound stuff");													
												      }  
								                   // one context per document
			                      					 var context = new (window.AudioContext || window.webkitAudioContext)();
							                       var osc = context.createOscillator(); // instantiate an oscillator
														 osc.type = 'sine'; // this is the default - also square, sawtooth, triangle
														 osc.frequency.value = Freq; // Hz
														 osc.connect(context.destination); // connect it to the destination
														 osc.start(); // start the oscillator
														 osc.stop(context.currentTime + 0.25); // stop n seconds after the current time							   				  
    														
														}

//END PLAY A NOTE-------------------------------------------------------


//BEGIN listenTo(ThePartialSequence);-------https://modernweb.com/audio-synthesis-in-javascript/---------------------------

function listenTo(thePartialSequence){	stringToPlay = thePartialSequence.toString(); //turn the array into a string of letters										
																			console.log(stringToPlay);
																			// dunno just copied, iI will figure it out later maybe a object																			
																	    
																	      var audio = new (window.AudioContext || window.webkitAudioContext)();
																			position = 0,
        																	scale = {A: 392.00, // GREEN G4  
		      																				 B: 329.60, // RED E4
																							 C: 261.60, // YELLOW C4 
																							 D: 196.00},// BLUE G3
																			song=stringToPlay;														
																			
																			setInterval(play, 500 / 1);

        																	function createOscillator(freq) {
        																																	var osc = audio.createOscillator();
        																																	osc.frequency.value = freq;
        																																	osc.type = "sine";
        																																	osc.connect(audio.destination);
        																																	osc.start(0);

        																	setTimeout(function() {
            																											 osc.stop(0);
            																											 osc.disconnect(audio.destination);
        																												}, 500 / 1)
    																		}

       																	function play() {sleep(2000).then(() =>{console.log("sleeping....");} )
        																									var note = song.charAt(position);
            																								freq = scale[note];
        																									position += 1;
        																									createOscillator(freq);
        																									//if(position >= song.length) {console.log("audio stuff");}
        																									//if(freq) {createOscillator(freq);}
    																										}
															};
																													
//END listenTo(ThePartialSequence);-------------------------------------------------------------------------------------------------


//BEGIN SLEEP  https://flaviocopes.com/javascript-sleep/

const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}


// END SLEEP



// BEGIN DISPLAY VAR this function just monitores variables in html, it works like a mass console.log 
function displayVar(){ document.getElementById("clickCounter").innerHTML = clickCounter;
							  document.getElementById("thePartialSequence").innerHTML = thePartialSequence;
							  document.getElementById("Goal").innerHTML = Goal;
							  document.getElementById("thePlayerSequence").innerHTML = thePlayerSequence;
							  document.getElementById("Limit").innerHTML = Limit;
							  document.getElementById("runningFunction").innerHTML = runningFunction;
							  document.getElementById("stepCounter").innerHTML = stepCounter;
							}



// END DISPLAY VAR ------------------------------------------------------------------------

