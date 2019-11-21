// Define General Variables  **                                                                                                                                                                                                

var theMainSequence = []; //this is the full sequence to repeat, it changes only at new game;
var thePartialSequence = [];//this is the portion to repeat of the full sequence, it increments during the game it starts of 4 notes then adds one by one
var thePlayerSequence = []; // this is the player sequence , it increments during the game and needs to be equal to thePartialSequence to proceed with the game
var theFreqSequence = []; // this is the array of frequencies to play correspondent to theMainSequence, it is a workaround I create to come out from impasse
var thePartialFreq = []; // this is the partial growing array of frequencies 
var clickCounter = 0;// click counter
var stepCounter = 0; // step counter
var Limit = 1; // number of notes to play in the turn
var Goal = 4; // limit to reach next level, starts with 4 and increase by 4  at level reached
var Played = "note"; // this is the active user played note, it varies continuosly
var runningFunction = "--"; // display in the webpage which function is running at the moment
var FreqX = 0;
var FreqA = 392.00; // GREEN frequencies of the original Simon Game
var FreqB = 329.60; // RED frequencies of the original Simon Game
var FreqC = 261.60; // YELLOW frequencies of the original Simon Game
var FreqD = 196.00; // BLUE frequencies of the original Simon Game
var duration = 1/3; // set the duration of the note
var interval = 1/2; // set the interval between the notes
  													  
// BEGIN THE Main SEQUENCE generate a random sequence of (seqLen) symbols ABCD *                                                                                                                

function generateMainSequence() {
											runningFunction="generateMainSequence"; // returns running function in webpage
											var seqLen = Goal;											
											console.clear();
											theMainSequence = [];
							 
											for (i=1; i<=Goal; i++) {// lenght of the Main sequence (it varies with level progress)
																			let theNote = "."
																			let theFreq = 0
																			let myRnd = Math.floor(Math.random() * 100) + 1; //generate a number between 1 and 100
																			if      (1 <= myRnd && myRnd <= 25)		   {theNote = "A"; theFreq = FreqA;} //evaluate the number and assign it a value ABCD
																			else if (26 <= myRnd && myRnd <= 50)	   {theNote = "B"; theFreq = FreqB;} //evaluate the number and assign it a value ABCD
																			else if (51 <= myRnd && myRnd <=75)		{theNote = "C"; theFreq = FreqC;} //evaluate the number and assign it a value ABCD
																			else if (76<= myRnd && myRnd <= 100)	{theNote = "D"; theFreq = FreqD;} //evaluate the number and assign it a value ABCD
																			else {console.log("something goes wrong when myRnd is " + myRnd);} //say you to fuck offand check the myRnd value
											
																			console.log( "myRnd " + myRnd + " Note " + theNote + " index value " + i); //check
																			theMainSequence.push(theNote); //push theNote into theMainSequence array	
                                 								theFreqSequence.push(theFreq);	// push frequencies into theFreqSequences array, related to theMainSequence (is a workarounf)																	
																			console.log("the Main Sequence is " + theMainSequence); //check
																			console.log("the Frequencies Sequence is " + theFreqSequence);//check																		
																		   }
											document.getElementById("displaySequence").innerHTML = theMainSequence; //	display theMainSequence 														
											}
																		
// END THE Main SEQUENCE---YOU NEED TO PRESS START TO CONTINUE, START TRIGGERS tryToFollowMe --                                                                                                


// BEGIN TRY TO FOLLOW ME---displays the partial sequence to play based on theMainSequence and wait for user to repeat it-
// it does not call any function, it just ends up, the next event is triggered by playing button--                                                                                                                

function tryToFollowMe(){
								 runningFunction="tryToFollowMe";		//running function check	html					
																					 
								 console.log("here start tryToFollowMe"); //running function check in console								
							    thePartialSequence=[]; // initializes the array					
			   			 	 thePartialSequence = theMainSequence.slice(0, Limit); //define partial sequence to play, from MainSequence														
								 thePartialFreq=[];	// initializes the array of frequencies							
								 thePartialFreq = theFreqSequence.slice(0, Limit); // set the array of frequencies to the number of notes to play
  											     
  						// start iteration with generate sound function to play the sequence to repeat  											     
  								 for (i = 0; i < thePartialFreq.length; i++) {
  											     											 generateSimonSound(thePartialFreq[i], i * interval);  								 
  																		   				 changeButtonColor(thePartialFreq[i], i * interval);
  																							}	
								 displayVar();		// mass html log												
								 }

// END TRY TO FOLLOW ME **                                                                                                                                                                                                
                                                                                          
// BEGIN play your note by pressing buttons in HTML it generates the matching letter *                                                                                                                                
// this function push into an array the sequence played by user, 





function keyPress(event){  //event.target.preventDefault();
									console.log("a key was pressed");
								
    							 	var keyCode = event.charCode || event.keyCode;  // Get the Unicode value
    								var keyPressed = String.fromCharCode(keyCode);  // Convert the value into a character
    								console.log("You pressed " + keyPressed + " and its charCode is " + keyCode);
    								
    								if      (keyCode == 113) { Played = "A"; Freq = FreqA; userDidHisThing(Freq,Played);} // keyboard q
    								else if (keyCode == 119) { Played = "B"; Freq = FreqB; userDidHisThing(Freq,Played);} // keyboard w
    								else if (keyCode == 101 || keyCode == 97) { Played = "C"; Freq = FreqC; userDidHisThing(Freq,Played);} // keyboard e a
    								else if (keyCode == 114 || keyCode == 115) { Played = "D"; Freq = FreqD; userDidHisThing(Freq,Played);} // keyboard r s
    								
    								else{console.log("You pressed " + keyPressed + " and its charCode is " + keyCode);}
    													
									//if (key == q) {console.log("yuppie");} 
									//else {console.log("ciaone");}								
								}




function PlayX(button) {
  								runningFunction="PlayX"; 					
 							   var x = button.id // take the id value from the button you play (all the buttons point to this function)                                                                                 
 							   var Played = button.value; // CLICK take the value which represent the played note from the relative button in html                                                                
							   var Freq = Played;
											
							   switch(Freq) { // assigns the frequency to play according to the pressed button
						  							case "A": Freq = FreqA; break; //GREEN G4
 													case "B": Freq = FreqB; break; //RED E4
											      case "C": Freq = FreqC; break; //YELLOW C4
													case "D": Freq = FreqD; break; //BLUE G3
													default: console.log("playSound stuff");													
												  }  
								userDidHisThing(Freq, Played);			  
								}
															
// END play your note by pressing buttons in HTML it generates the corrispondxent letter *                                                                                                                


// BEGIN userDidHisThing - this starts after user clicked button or press key.
// this function can be called by PlayX(button) or keyPress()			

function userDidHisThing(Freq, Played) {
													generateUserSound(Freq, interval); // calls the sound generator function providing the frequency to play (Freq) and a standard interval value																								// the interval value is the space between 2 notes, is not related to this function but to the tryToFollowMe function																								// this is a workaround to avoid to use 2 different functions to generate the sound																																																		
 								   				thePlayerSequence.push(Played);//push the button value into the user array thePlayerSequence 	                                                                            									         
								   				clickCounter ++; //keep count of the clicks 
								   				displayVar(); // check in html											
								   				checkIfCorrect(); //call the function which check il the entry is correct				
								   				changeUserButtonColor(Freq);																	
													}			
			
// BEGIN userDidHisThing - this starts after user clicked button or press key.
			
			
			
			
			
//BEGIN generateSound - it generates the sound as requested by tryToFolloeMe() and PlayX()    
                                                                                                
// audio API https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
// the 2 function are quite identical but I needed to separate them for player and for Simon because otherwise there was a delay in play button for user
// still gotta figure out why that's happen. more info at https://modernweb.com/audio-synthesis-in-javascript/

function generateUserSound(frequency, time) { 						// generates the sound for the user													
															var context = new AudioContext(); // define the audio context to execute the song
   		 												var o = context.createOscillator(); // creates an oscillator to produce the sound
    														var g = context.createGain(); // what the fuck
    																						
    														time = 0; // this resolves the player delay issue btw
    														o.connect(g); // connects the oscillator to what the fuck
    														g.connect(context.destination); 
    														g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration + time );// this seems a kind of hack
    														o.frequency.value = frequency;
															o.type = "square";																							
															console.log("user freq " + frequency);
    														console.log("user time " + time);    																					  
    														o.start(time);    																				
 														  }


function generateSimonSound(frequency, time) { 				// generates the sound for Simon | is called by tryToFollowMe															
															 var context = new AudioContext(); // define the audio context to execute the song
  			  			 									 var o = context.createOscillator(); // creates an oscillator to produce the sound
    														 var g = context.createGain(); // what the fuck    																		  																												
    					  									 o.connect(g); // connects the oscillator to what the fuck
    														 g.connect(context.destination); 
    														 g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration + time ); //this seems a kind of hack
    														 o.frequency.value = frequency;
    														 FreqX = frequency;
    														 o.type = "square";
															 console.log("Simon freq " + frequency + " Simon Time " + time);
    														 o.start(time);    		 																		  						
 															 }
    																		   																																									
//END generateSound - it generates the sound as requested by listenToMySong() and PlayX()                                                                                                                             

//BEGIN changeButtonColor       it changes the color of button when Simon plays it sequence, the functionis separated by the function whichplay
// the sequence, it is just synchronized so it runs along the sequence player but is not triggered by this
// the function tryToFollowMe triggers separately change button color anf playsequence                                                                                                                                                                                                       

// the function triggers the reset button color too, which is delayed of 1000/3 ms so it starts right after the sound is played


function changeButtonColor(frequency, time) {	
															setTimeout(function(){
										     										   if (frequency == FreqA) {console.log("GREEN BUTTON"); document.getElementById("playA").style.background='black'; resetButtonColor(); 	}												  						
 																   		 		   else if (frequency == FreqB) {console.log("RED BUTTON"); document.getElementById("playB").style.background='black'; resetButtonColor(); 	}
 										                      				   else if (frequency == FreqC) {console.log("YELLOW BUTTON"); document.getElementById("playC").style.background='black';resetButtonColor(); 	}
 									                         			 		else if (frequency == FreqD) {console.log("BLUE BUTTON"); document.getElementById("playD").style.background='black';resetButtonColor(); 	}
 									                         			 		else{console.log("Buttons color stuff");}
 									                        					},i * 500)//synchronization parameters																		  
								   					  }
//END changeButtonColor                                                                                                                                                                                                            


//BEGIN changeUserButtonColor
 
 function changeUserButtonColor(frequency) {
										     	  		  if (frequency == FreqA) {console.log("GREEN BUTTON"); document.getElementById("playA").style.background='black'; resetButtonColor(); 	}												  						
 														  else if (frequency == FreqB) {console.log("RED BUTTON"); document.getElementById("playB").style.background='black'; resetButtonColor(); 	}
 										              else if (frequency == FreqC) {console.log("YELLOW BUTTON"); document.getElementById("playC").style.background='black';resetButtonColor(); 	}
 									                 else if (frequency == FreqD) {console.log("BLUE BUTTON"); document.getElementById("playD").style.background='black';resetButtonColor(); 	}
 									                 else{console.log("Buttons color stuff");}
 									   				 }                  
//END changeUserButtonColor




//BEGIN resetButtonColoR                                                                                                                                                                                                                                

function resetButtonColor(){
	 									setTimeout(function(){
																	document.getElementById("playA").style.background="green";
																	document.getElementById("playB").style.background="red";														
																	document.getElementById("playC").style.background="yellow";
																	document.getElementById("playD").style.background="blue";
																	},1000/3)
									}

//END resetButtonColoR                                                                                                                                                                                                                                

// BEGIN check if correct                                                                                                                                                                                                                

function checkIfCorrect(){ var index = stepCounter;							
												   stepCounter ++;
								   																
												   if      (thePlayerSequence[index] == thePartialSequence[index] && stepCounter == Limit && Limit == Goal) {nextLevel();} // check if the level is complete and it calls nextLevel function																		
												   else if (thePlayerSequence[index] == thePartialSequence[index] && stepCounter == Limit) {addAnother();}	// check if the lpartial sequence has been completed and adds a new note to play																											
												   else if (thePlayerSequence[index] == thePartialSequence[index]){console.log("good job");}	//check if the just played note is correct																										 		 																												  																								  																												      }													
												   else    {console.log("bad job");
															  resetAll(); // calls the resetAll functiion which reset the game and starts over
															  location.reload(); }//reload the page (refresh)
												}

// END check if correct -                                                                                                                                                                                                                                                

//BEGIN add another step-                                                                                                                                                                                                                

function addAnother() {//console.log("things getting harder")
											  stepCounter = 0; Limit ++; // it adds a note to the sequence to repeat
											  thePlayerSequence = []; // it resets the sequence to repeat to zero 
											  displayVar(); // check html
											  setTimeout(tryToFollowMe,2000); // calls tryToFollowMe function after 2000 ms user finisced to play, the delay is necessary
											  }                                                    // because otherwise the Simon Sound overlaps with the last played user note. this required 2 fucking days
											                                                       // to be worked out https://javascript.info/settimeout-setinterval
											   
								  
//END addanother step                                                                                                                                                                                                                

//BEGIN NEXTLEVEL..   reset all the arrays, the limit and step  value and rise Goal of 4 in order to start a new level                                                                                                                                                                                                             

function nextLevel(){ alert("LEVEL COMPLETE !!!")
										  Goal = Goal + 4; // it rise the level of the new sequence of 4 elements
										  Limit = 1; // it brings back limit value to 1 
										  stepCounter = 0;	// it resets stepCounter (not sure this is correct, probably it should continue because it is some kind of points)							 
										  theMainSequence = []; 
										  thePartialSequence = [];
										  thePlayerSequence = [];						   						  
										  theFreqSequence = [];
										  thePartialFreq = [];
										  displayVar();// check html     
										  generateMainSequence();//function call after game reset
    				                }
					
// END NEXTLEVEL.                                                                                                                                                                                                                                                                

//BEGIN resetAll..... ah ah you're dead -- .reset all game vars and start a new game from 0 .                                                                                                                                                                

function resetAll(){alert(' GAME OVER !!')
									  theMainSequence = []; //this is the full sequence to repeat, it changes only at new game;
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

function displayVar(){
											document.getElementById("clickCounter").innerHTML = clickCounter;
										   document.getElementById("thePartialSequence").innerHTML = thePartialSequence;
										   document.getElementById("Goal").innerHTML = Goal;
										   document.getElementById("thePlayerSequence").innerHTML = thePlayerSequence;
										   document.getElementById("Limit").innerHTML = Limit;
										   document.getElementById("runningFunction").innerHTML = runningFunction;
										   document.getElementById("stepCounter").innerHTML = stepCounter;
							           }

// END DISPLAY VAR                                                                                                                                                                                                                 



