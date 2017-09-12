
//create needed variables
var score = 0;
var index = 0;
var userAnswers = [];
var seconds = 8;
var intervalId;

// create object questions for the Trivia game.
var questions = {
        q1: ["What fruit put Snow White in a deep sleep?"],
        a1: ["Orange", "Apple", "Pear", "Plum"],
        q2: ["Mufasa was the name of Simba's father in Lion King"],
        a2: ["True","False"],
        q3: ["What is turned into a carriage to take Cinderella to the royal ball?"],
        a3: ["A Pumpkin","A Shoe", "A Chair", "A Toilet"],
        q4: ["What is the name of Jasmine's pet tiger in Aladdin"],
        a4: ["Abu", "Rajah", "Jafar", "Genie"],
        q5: ["Tarzan was raised by..."],
        a5: ["Elephants","Tigers", "Gorrillas", "Wolves"],
        q6: ["Finish the lyrics:'Wouldn't you think I'm the girl, the girl who has everything? Look at this trove, treasures untold...'"],
        a6: ["Wonders from all over the world.","How many wonders can one cavern hold?", "Wouldn't you think my collections complete?", "There's so much to be known."],
        q7: ["In Pocahontas, what did Pocahontas see in her dream that made her believe that a change was coming?"],
        a7: ["A strange cloud formation", "A hawk circling her village","A spinning arrow", "A boat"],
        q8: ["What does the matchmaker criticize Mulan for?"],
        a8: ["Being too skinny.", "Bad posture", "No manners", "Being too tall"],
        q9: ["Gaston tells Belle they'll have about how many kids together?"],
        a9: ["Ten or twelve", "Six or seven","One or two", "Five"],
       q10: ["Name the animated science fiction comedy-drama about a Hawaiin girl and her unusual pet."],
       a10: ["Tangled", "The Princess and the Frog","Lilo and Stitch", "Moana"]
};

//create necessary arrays
var disneyQuiz = [questions.q1, questions.q2, questions.q3, questions.q4, questions.q5, questions.q6, questions.q7, questions.q8, questions.q9, questions.q10];
var disneyQuiza =[questions.a1, questions.a2, questions.a3, questions.a4, questions.a5, questions.a6, questions.a7, questions.a8, questions.a9, questions.a10];
var disneyAnswers = ["Apple","True", "A Pumpkin", "Rajah", "Gorrillas","How many wonders can one cavern hold?","A spinning arrow", "Being too skinny.", "Six or seven", "Lilo and Stitch"];

//create functions for timer that throws an alert pushes undefined to userAnsers array a changes to next question and answers after 8 secs

//decrementing interval function
function decint() {
    
    intervalId = setInterval(decrement, 1000);
}

//The decrement function.
function decrement() {

    //decrease seconds per timer
    seconds--;

    //display seconds
    $("#update").html("Time Left: " + seconds)

	if(seconds === -1) {
    	
    	stop()

    	//throw alert and push undefined to user answers array
		$("#update").html("Times Up! The answer: " + "<br>" + disneyAnswers[index]);
		$("#question").empty()
		$("#answers").empty()
		$("#submit").hide()
		userAnswers.push(undefined);

		//to delay next question so user can read message
    	setTimeout(twoSeconds, 1000 * 2);
    }
}

//creating stop function
function stop() {

	clearInterval(intervalId)

	seconds = 8
}

//timer to control displaying correct or right answer for 3 seconds and then clearing and showing new question and answers
function threeSeconds() {

	//clear user answer feedback 
	$("#update").empty()

	//increment index var
    index++

	//rerun game functions
 	displayQuestion()
  	displayAnswers()
}

//function to delay next question and answer if timer goes to zero
function twoSeconds() {

	//clear user answer feedback 
	$("#update").empty()

	//increment index var
    index++

	//rerun game functions
 	displayQuestion()
  	displayAnswers()
}

//create function to show questions 
function displayQuestion() {

	//display seconds
    $("#update").html("Time Left: " + seconds)

	//stop at 5 add score together at index = 5 and show score
	if (index === disneyQuiz.length) {

		$("#update").empty()

		$("#results").html("You Scored " + score + "/" + disneyQuiz.length + "!")

		//adding in replay functionality
		$("#submit").hide()

		//replay functionality
		$("#replay").show()
		$("#replay").click(function() {

			//set index back to zero for game reset
			index=0;

			//reset score
			score = 0;

			//empty results
			$("#results").empty()

			$("#replay").hide();

			//rerun start game functions
			displayQuestion();
			displayAnswers();
		})
	}

	if (index < disneyQuiz.length) {

   		$("#question").html(disneyQuiz[index]);
    }
};

//create for loop to loop through answers arrays and create answer forms to show for 8 seconds
function displayAnswers() {

	//stop at 5 add score together at index = 5
	if(index === disneyQuiza.length) {
		
		console.log(score)
	}

	if (index < disneyQuiza.length) {
		
		$("#answers").empty()

		for (i = 0; i < disneyQuiza[index].length; i++) { 
		
			var a = $('<label><input type = "radio" id = "answers" name = "answer" value="' + disneyQuiza[index][i] + '" /> ' + disneyQuiza[index][i] + '</label><br>')

			$("#answers").append(a)
		}

	 $("#submit").show()

		//show decrement count down
		decint()  
	}
};

//when submit button is pressed push checked form to userAnswers array
$("#submit").click(function() {
    
    stop()

	//push user input to answers array
	userAnswers.push($('input[name="answer"]:checked').val());

	//clear button, question and answers out 
	$("#question").empty()

	$("#answers").empty()

	$("#submit").hide()

	//show correct message if the user answered right
	if (userAnswers[index] === disneyAnswers[index]) {
	
		//display "correct" message
		$("#update").html("Correct!!")

		//increment scrore
		score ++
		
		//set time after correct message to move on to next trivia
		setTimeout(threeSeconds, 1000 * 3);  
  	}

  	//show correct answer if user answered wrong
  	else if (userAnswers[index] != disneyAnswers[index]) {

  		//use timer to display "correct" message then remove and show next question and answer
		$("#update").html("Nope!! The answer:" + "<br>" + disneyAnswers[index])

		//set time after answer displayed to move on to next trivia
		setTimeout(threeSeconds, 1000 * 3);  
  	}
});


$("#submit").hide()

$("#replay").hide();

//play button functionality
$("#play").on("click",function() {

	//hide button
	$("#play").hide()

	//start game by calling displayQuestion and displayAnswers functions
	displayQuestion();
	displayAnswers();

});



