//create needed variables
var score = 0;
var index = 0;
var userAnswers =[];

// create object questions for the quiz game.
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

var disneyQuiz = [questions.q1, questions.q2, questions.q3, questions.q4, questions.q5];
var disneyQuiza = [questions.a1, questions.a2, questions.a3, questions.a4, questions.a5];
var disneyAnswers = ["apple","true", "a pumpkin", "Rajah", "gorrillas"];
   
//create function to show question 1
function displayQuestion(){if (index <= disneyQuiz.length-1) {

   		$("#question").html(disneyQuiz[index]);

      }
//add score together at index = 5
else {
	for (i=0; i<=userAnswers.length; i++){
		if (userAnswers[i] === disneyAnswers[i]){
			score = score + 1
		}
		//display score append html
	}
};
}
//create for loop to loop through answers array and create answer forms
function displayAnswers(){
for (i = 0; i < disneyQuiza[index].length; i++){ 
	if (disneyQuiza[index][i] === disneyQuiz[0]){
	var a = $('<label><input type = "radio" id = "answers" name = "answer" value="' + disneyQuiza[index][i] + '" /> ' + disneyQuiza[index][i] + '</label><br>')
	   console.log(a)
	}
	else {var b = $('<label><input type = "radio" name = "answer" value="' + disneyQuiza[index][i] + '" /> ' + disneyQuiza[index][i] + '</label><br>')
    }
	$("#answers").append(a,b)

}
}

//start game by calling displayquestion and displayanswer functions
displayQuestion();
displayAnswers();

//when submit button is pressed push checked form to userAnswers array and show new question
$("#submit").click(function(){
userAnswers.push($('input[name="answer"]:checked').val());
});

index++;

//reset by recalling functions
displayQuestion();
displayAnswers();

