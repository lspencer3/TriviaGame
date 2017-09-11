//create needed variables
var score = 0;
var index = 0;
var userAnswers = [];
var seconds = 8;
var intervalId;

// create object questions for the Trivia game.
var questions = {
        q1: ["What Fruit put Snow White in a Deep Sleep?"],
        a1: ["orange", "apple", "pear", "plum"],
        q2: ["Mufasa was the Name of Simba's Father"],
        a2: ["true","false"],
        q3: ["What is Turned into a Carriage to take Cinderella to the Royal Ball?"],
        a3: ["a pumpkin","a shoe", "a chair"],
        q4: ["What is the Name of Jasmine's Pet Tiger"],
        a4: ["Abu", "Rajah", "Jafar"],
        q5: ["Tarzan was Raised by..."],
        a5: ["elephants","tigers", "gorrillas"],
};

//create necessary arrays
var disneyQuiz = [questions.q1, questions.q2, questions.q3, questions.q4, questions.q5];
var disneyQuiza = [questions.a1, questions.a2, questions.a3, questions.a4, questions.a5];
var disneyAnswers = ["apple","true", "a pumpkin", "Rajah", "gorrillas"];

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
    $("#update").html(seconds)

	if(seconds === -1) {
    	
    	stop()

    	//throw alert and push undefined to user answers array
		$("#update").html("Times Up! Next Question");
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
    $("#update").html(seconds)

	//stop at 5 add score together at index = 5 and show score
	if (index === disneyQuiz.length) {

		$("#update").empty()

		$("#results").html("You Scored " + score + "/" + disneyQuiz.length + "!")

		//adding in replay functionality
		$("#submit").hide()
		$('<input/>', {
    		type: 'button',
    		id: "replay",
		})

		$("#replay").append("#submit")

		$("#Replay").html("Replay")

		$("#replay").click(function(){

			//set index back to zero for game reset
			index=0;

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
		$("#update").html("Nope!! The answer was " + disneyAnswers[index])

		//set time after answer displayed to move on to next trivia
		setTimeout(threeSeconds, 1000 * 3);  
  	}
});

//play button functionality
$("#play").on("click",function(){

	//start game by calling displayQuestion and displayAnswers functions
	displayQuestion();
	displayAnswers();

});

