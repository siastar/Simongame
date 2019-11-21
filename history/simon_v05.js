// Define General Variables  **                                                                                                                                                                                                

var theSacredSequence = []; //this is the full sequence to repeat, it changes only at new game;
var thePartialSequence = [];//this is the portion to repeat of the full sequence, it increments during the game it starts of 4 notes then adds one by one
var thePlayerSequence = []; // this is the player sequence , it increments during the game and needs to be equal to thePartialSequence to proceed with the game
var theFreqSequence = []; // this is the array of frequencies to play correspondent to theSacredSequence, it is a workaround I create to come out from impasse
var clickCounter = 0;// click counter
var stepCounter = 0; // step counter
var Limit = 1; // number of notes to play in the turn
var Goal = 4; // limit to reach next level
var Played = "note"; // this is the active user played note, it varies continuosly
var stringToPlay = "ABCD" // a default value for var
var runningFunction = "--"; // check in webpage for running function
var FreqA = 392.00; // frequencies of the original Simon Game
var FreqB = 329.60; // frequencies of the original Simon Game
var FreqC = 261.60; // frequencies of the original Simon Game
var FreqD = 196.00; // frequencies of the original Simon Game


// BEGIN THE SACRED SEQUENCE generate a random sequence of (seqLen) symbols ABCD *                                                                                                                
function generateSacredSequence() {
																		runningFunction="generateSacredSequence"; // returns running function in webpage
																		var seqLen = Goal;											
																		console.clear();
																		theSacredSequence = [];
							 
																		for (i=1; i<=Goal; i++) {// lenght of the sacred sequence (it varies with level progress)
																		let theNote = "."
																		let theFreq = 0
																		let myRnd = Math.floor(Math.random() * 100) + 1; //generate a number between 1 and 100
																		if      (1 <= myRnd && myRnd <= 25)		   {theNote = "A"; theFreq = FreqA;} //evaluate the number and assign it a value ABCD
																		else if (26 <= myRnd && myRnd <= 50)	   {theNote = "B"; theFreq = FreqB;} //evaluate the number and assign it a value ABCD
																		else if (51 <= myRnd && myRnd <=75)		{theNote = "C"; theFreq = FreqC;} //evaluate the number and assign it a value ABCD
																		else if (76<= myRnd && myRnd <= 100)	{theNote = "D"; theFreq = FreqD} //evaluate the number and assign it a value ABCD
																		else {console.log("something goes wrong when myRnd is " + myRnd);} //say you to fuck offand check the myRnd value
																		console.log( "myRnd " + myRnd + " Note " + theNote + " index value " + i); //check
																		theSacredSequence.push(theNote); //put theNote into theSacredSequence	
                                                         theFreqSequence.push(theFreq);	// put frequencies into theFreqSequences, related to theSacredSequence (is a workarounf)																	
																		console.log("the Sacred Sequence is " + theSacredSequence); //check
																		console.log("the Frequencies Sequence is " + theFreqSequence);																		
																		}
																		document.getElementById("displaySequence").innerHTML = theSacredSequence; //	display theSacredSequence 
																		//displayVar();											
																		//tryToFollowMe();
																		}
// END THE SACRED SEQUENCE---YOU NEED TO PRESS START TO CONTINUE, START TRIGGERS tryToFollowMe --                                                                                                


// BEGIN TRY TO FOLLOW ME---displays the partial sequence to play based on theSacredSequence and wait for user to repeat it-
// it does not call any function, it just ends up, the next event is triggered by playing button--                                                                                                                
function tryToFollowMe(){
												runningFunction="tryToFollowMe";		//running function check						
												console.log("here start tryToFollowMe"); //running function check in console								
												thePartialSequence=[];								
												thePartialSequence = theSacredSequence.slice(0, Limit); //define partial sequence to play, from sacredSequence														
										    	//listenTo(thePartialSequence);
												console.log("now you need to play " +  Limit + " correct notes");
												console.log("repeat this notes " + thePartialSequence); //check console		
												displayVar();														
}

// END TRY TO FOLLOW ME **                                                                                                                                                                                                

// BEGIN play your note by pressing buttons in HTML it generates the matching letter *                                                                                                                                
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
					
// END play your note by pressing buttons in HTML it generates the corrispondxent letter *                                                                                                                
					
// BEGIN check if correct                                                                                                                                                                                                                

function checkIfCorrect(){ var index = stepCounter;							
												stepCounter ++;
												console.log("index " + index);
												console.log("limit " + Limit);
												console.log("stepcounter " + stepCounter);
												console.log(thePlayerSequence);
												console.log(thePartialSequence);
												console.log(thePlayerSequence[index]);
												console.log(thePartialSequence[index]);    							
									
												if      (thePlayerSequence[index] == thePartialSequence[index] && stepCounter == Limit && Limit == Goal) {nextLevel();} // check if the level is complete and it calls nextLevel function																		
												else if (thePlayerSequence[index] == thePartialSequence[index] && stepCounter == Limit) {addAnother();}	// check if the lpartial sequence has been completed and adds a new note to play																											
												else if (thePlayerSequence[index] == thePartialSequence[index]){console.log("good job");}	//check if the just played note is correct																										 		 																												  																								  																												      }													
												else {console.log("bad job");
															resetAll(); // calls the resetAll functiion which reset the game and starts over
															location.reload(); }//reload the page (refresh)
												}

// END check if correct -                                                                                                                                                                                                                                                

//BEGIN add another step-                                                                                                                                                                                                                
function addAnother() {console.log("things getting harder")
											  stepCounter = 0; Limit ++; // it adds a note to the sequence to repeat
											  thePlayerSequence = []; // it resets the sequence to repeat to zero 
											  displayVar(); // check html
											  tryToFollowMe(); // calls try to follow me function
											  }  
								  
//END addanother step                                                                                                                                                                                                                

//BEGIN NEXTLEVEL..                                                                                                                                                                                                                

function nextLevel(){ Goal = Goal + 4; // it rise the level of the new sequence of 4 elements
											 Limit = 1; // it brings back limit value to 1 
											 stepCounter = 0;	// it resets stepCounter (not sure this is correct, probably it should continue because it is some kind of points)							 
											 theSacredSequence = []; //this is the full sequence to repeat, it changes only at new game;
										    thePartialSequence = [];//this is the portion to repeat of the full sequence, it increments during the game it starts of 4 notes then adds one by one
										    thePlayerSequence = []; // this is the player sequence , it increments during the game and needs to be equal to thePartialSequence to proceed with the game						   						  
											 displayVar();// check html     
										    generateSacredSequence();//function call after game reset
    				                }
					

// END NEXTLEVEL.                                                                                                                                                                                                                                                                

//BEGIN resetAll......reset all game vars and start a new game from 0 .                                                                                                                                                                

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
//END resetAll.                                                                                                                                                                                                                                                

 //BEGIN PLAY A NOTE - Original SIMON Notes are displayed below with the colors                                                                                                                    


function playSound(Played) { var Sound = 0;  //Played value comes from PlayX function
														 var Freq = Played;
														 switch(Freq) { 
						  															 case "A": Freq = 392.0; break; //GREEN G4
 													    							 case "B": Freq = 329.6; break; //RED E4
											      		 							 case "C": Freq = 261.6; break; //YELLOW C4
													                          case "D": Freq = 196.0; break; //BLUE G3
													                          default: console.log("playSound stuff");													
												                             }  
								                   
								                   // one context per document

			                      				    var context = new (window.AudioContext || window.webkitAudioContext)();// define the audio context 
							                       var osc = context.createOscillator(); // instantiate an oscillator
														 osc.type = 'sine'; // this is the default - also square, sawtooth, triangle
														 osc.frequency.value = Freq; // frequency value expressed in Hertz
														 osc.connect(context.destination); // connect it to the destination (window))
														 osc.start(); // start the oscillator
														 osc.stop(context.currentTime + 0.25); // stop oscillator n seconds after the current time							   				  
    														
				 										}

//END PLAY A NOTE-                                                                                                                                                                                                                


//BEGIN listenTo(ThePartialSequence);-------this solution is a mix of two different examples 
//                                                                                                                                                                                                                        
// https://modernweb.com/audio-synthesis-in-javascript/-                                                                                                                                
//https://stackoverflow.com/questions/46175892/audiocontext-how-to-play-the-notes-in-a-sequence-                                                                
/*
function listenTo(thePartialSequence){	
																			var context = new AudioContext();
																			//var notes = thePartialSequence;
																			var duration = 1/3; //length of the single played note
																			var interval = 1/2; // length of the interval between notes, includes the length of the note itself 
																			index=0;
																			var A = 392.00, B = 329.60, C = 261.60, D = 196.00;
																			
			



																			function play(frequency, time) {     //this is a subfunction, it generates the actual sound
    																																	    var o = context.createOscillator(); // creates the oscillator
    																																       var g = context.createGain(); // gain (gotta figure out iy))
    																																	    o.connect(g); 
    																																	    g.connect(context.destination);
    																																	    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration + time); // gotta figure out this
    																																	    o.frequency.value = frequency;
    																																	    o.start(time);
 															 																			   }

  																			  for (var i = 0; i < song.length; i++) {play(notes[i], i * interval);}
																			}

																													
//END listenTo(ThePartialSequence);                                                                                                                                                                                                


//BEGIN SLEEP  https://flaviocopes.com/javascript-sleep/       this function is not used at the moment                                                                                                                                                         

const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}


// END SLEEP                                                                                                                                                                                                                                

*/



// BEGIN DISPLAY VAR this function just monitores variables in html, it works like a mass console.log                                                                                                 

function displayVar(){ document.getElementById("clickCounter").innerHTML = clickCounter;
							  document.getElementById("thePartialSequence").innerHTML = thePartialSequence;
							  document.getElementById("Goal").innerHTML = Goal;
							  document.getElementById("thePlayerSequence").innerHTML = thePlayerSequence;
							  document.getElementById("Limit").innerHTML = Limit;
							  document.getElementById("runningFunction").innerHTML = runningFunction;
							  document.getElementById("stepCounter").innerHTML = stepCounter;
							}



// END DISPLAY VAR                                                                                                                                                                                                                 
