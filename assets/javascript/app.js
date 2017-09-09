//create needed variables
var score = 0;
var index = 0;
var userAnswers =[];

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

//set timeout function that goes to next question and answers after 8 secs, also pushes answers to new array
function eightSeconds() {

//***when submit button is pressed push checked form to userAnswers array else push undefined
$("#submit").click(function(){
//***should run by length
	if (index > disneyQuiz.length-1){
		return
		}

else{
		userAnswers.push($('input[name="answer"]:checked').val());
	}

});

  alert("times Up!");
 
  //increment index var
  index++

  //rerun game functions
  displayQuestion()
  displayAnswers()
}

//create function to show questions for 8 seconds
function displayQuestion(){

	if (index < disneyQuiz.length-1) {

   		$("#question").html(disneyQuiz[index]);

      }
//add score together at index = 5
	else {
			for (i=0; i<userAnswers.length; i++){
					if (userAnswers[i] === disneyAnswers[i]){
							score= score + 1
							}
					}
	//$("#result").html("You Scored" + score + "/" + index < disneyQuiz.length + "!")
			}
};
//create for loop to loop through answers arrays and create answer forms
function displayAnswers(){
	$("#answers").empty()
	for (i = 0; i < disneyQuiza[index].length; i++){ 
		
		var a = $('<label><input type = "radio" id = "answers" name = "answer" value="' + disneyQuiza[index][i] + '" /> ' + disneyQuiza[index][i] + '</label><br>')

				$("#answers").append(a)
						}
setTimeout(eightSeconds, 1000 * 8);
			};



//start game by calling displayQuestion and displayAnswers functions
displayQuestion();
displayAnswers();


