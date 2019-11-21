// Define General Variables  **                                                                                                                                                                                                

var theSacredSequence = []; //this is the full sequence to repeat, it changes only at new game;
var thePartialSequence = [];//this is the portion to repeat of the full sequence, it increments during the game it starts of 4 notes then adds one by one
var thePlayerSequence = []; // this is the player sequence , it increments during the game and needs to be equal to thePartialSequence to proceed with the game
var theFreqSequence = []; // this is the array of frequencies to play correspondent to theSacredSequence, it is a workaround I create to come out from impasse
var thePartialFreq = []; // this is the partial growing array of frequencies 
var clickCounter = 0;// click counter
var stepCounter = 0; // step counter
var Limit = 1; // number of notes to play in the turn
var Goal = 4; // limit to reach next level
var Played = "note"; // this is the active user played note, it varies continuosly
var stringToPlay = "ABCD" // a default value for var -- not used
var runningFunction = "--"; // check in webpage for running function
var Freq = 0;
var FreqA = 392.00; // frequencies of the original Simon Game
var FreqB = 329.60; // frequencies of the original Simon Game
var FreqC = 261.60; // frequencies of the original Simon Game
var FreqD = 196.00; // frequencies of the original Simon Game
var duration = 1/3; // set the duration of the note
var interval = 1/2; // set the interval between the notes
  													  

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
																		theSacredSequence.push(theNote); //push theNote into theSacredSequence array	
                                                         theFreqSequence.push(theFreq);	// push frequencies into theFreqSequences array, related to theSacredSequence (is a workarounf)																	
																		console.log("the Sacred Sequence is " + theSacredSequence); //check
																		console.log("the Frequencies Sequence is " + theFreqSequence);//check																		
																		}
																		document.getElementById("displaySequence").innerHTML = theSacredSequence; //	display theSacredSequence 														
																		}
																		
// END THE SACRED SEQUENCE---YOU NEED TO PRESS START TO CONTINUE, START TRIGGERS tryToFollowMe --                                                                                                


// BEGIN TRY TO FOLLOW ME---displays the partial sequence to play based on theSacredSequence and wait for user to repeat it-
// it does not call any function, it just ends up, the next event is triggered by playing button--                                                                                                                

function tryToFollowMe(){
												runningFunction="tryToFollowMe";		//running function check						
												console.log("here start tryToFollowMe"); //running function check in console								
												thePartialSequence=[]; // initializes the array					
												thePartialSequence = theSacredSequence.slice(0, Limit); //define partial sequence to play, from sacredSequence														
										    	thePartialFreq=[];	// initializes the array of frequencies							
												thePartialFreq = theFreqSequence.slice(0, Limit); // set the array of frequencies to the number of notes to play
  											   // start iteration with generate sound function
  											   for (var i = 0; i < thePartialFreq.length; i++) {generateSound(thePartialFreq[i], i * interval);}
								
												console.log("now you need to play " +  Limit + " correct notes");
												console.log("repeat this notes " + thePartialSequence); //check console		
												displayVar();		// mass console log												
												}

// END TRY TO FOLLOW ME **                                                                                                                                                                                                

                                                                                              

// BEGIN play your note by pressing buttons in HTML it generates the matching letter *                                                                                                                                
// this function push into an array the sequence played by user, 

function PlayX(button) {
  											runningFunction="PlayX"; 					
 											var x = button.id // take the id value from the button you play (all the buttons point to this function)                                                                                 
 											var Played = button.value; // CLICK take the value which represent the played note from the relative button in html                                                                
											var Freq = Played;
											
											switch(Freq) { 
						  												  case "A": Freq = FreqA; break; //GREEN G4
 													    	   			  case "B": Freq = FreqB; break; //RED E4
											      		 				  case "C": Freq = FreqC; break; //YELLOW C4
													                  case "D": Freq = FreqD; break; //BLUE G3
													                  default: console.log("playSound stuff");													
												                     }  
											
											generateSound(Freq, interval); // calls tge sound generator function
											
											console.log(Played); 					
 											thePlayerSequence.push(Played);//push the button value into the user array thePlayerSequence 	                                                                            
											console.log(thePlayerSequence);		               
											clickCounter ++; //keep count of the clicks 
											displayVar();
											
											checkIfCorrect(); //call the function which check il the entry is correct				
										}
															
// END play your note by pressing buttons in HTML it generates the corrispondxent letter *                                                                                                                
			
//BEGIN generateSound - it generates the sound as requested by tryToFolloeMe() and PlayX()                                                                                                    
// gotta figure out this, just copied and adapted from https://stackoverflow.com/questions/46175892/audiocontext-how-to-play-the-notes-in-a-sequence

function generateSound(frequency, time) { 																			
																					var context = new AudioContext(); // define the audio context to execute the song
    																				var o = context.createOscillator(); // creates an oscillator to produce the sound
    																				var g = context.createGain(); // what the fuck
    																				if (time = 0) {time = interval;}
    																				o.connect(g); // connects the oscillator to what the fuck
    																				g.connect(context.destination); 
    																				g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration + time );
    																				o.frequency.value = frequency;
    																				o.start(time);
 															  						}

//END generateSound - it generates the sound as requested by listenToMySong() and PlayX()      

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







                                                                                                                                                                                                                        
 /*//BEGIN PLAY A NOTE - Original SIMON Notes are displayed below with the colors                                                                                                                    

function playSound(Played) { var Sound = 0;  //Played value comes from PlayX function
														 var Freq = Played;
														 switch(Freq) { 
						  															 case "A": Freq = FreqA; break; //GREEN G4
 													    							 case "B": Freq = FreqB; break; //RED E4
											      		 							 case "C": Freq = FreqC; break; //YELLOW C4
													                          case "D": Freq = FreqD; break; //BLUE G3
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

//END PLAY A NOTE-*/                                                                                                                                                                                                                



//BEGIN listenToMySong;-        creates the array to play and sends it to the soung generator function                                                                                                    
/*
function listenToMySong() {
														thePartialFreq=[];	// initializes the array of frequencies							
														thePartialFreq = theFreqSequence.slice(0, Limit); // set the array of frequencies to the number of notes to play
  													   for (var i = 0; i < thePartialFreq.length; i++) {generateSound(thePartialFreq[i], i * interval);}
  																																				
														}
*/
//END listenToMySong;-        creates the array to play and sends it to the soung generator function                                                                                                    