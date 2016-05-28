$(document).ready(function(){

	var timer = 30;
	var check = true;
	var questions = [
			["What is the capitol of Texas?", "Houston", "Austin", "Dallas", "San Antonio", "2"],
			["The King Ranch in Texas is bigger than which state?", "Rhode Island", "Vermont", "New Jersey","Massachussetts", "1"],
			["Which airport in Texas is home to the world\'s largest parking lot", "Bush Intercontinental", "Dallas Fort Worth International", "Austin Bergstrom", "Marfa Municipal", "2"],
			["Texas was the only state to enter the united states by:", "Annexation", "Conquest", "Purchase", "Treaty", "4"],
			["90% of the world\'s recoverable supply of which element can be found under Amarillo?", "Gold", "Barium", "Helium", "Neon", "3"],
			["Which of the following presidents was born in Texas?", "Dwight D. Eisenhower", "Zachary Taylor", "George W. Bush", "James Garfield", "1"],
			["What is the official state mammal of Texas?", "Longhorn", "Armadillo", "Bison", "Cougar", "2"],
			["The first suspension bridge in the United States was built in which Texas city?", "Austin", "Galveston", "Plano", "Waco", "4"],
			["What is the only natural lake in Texas?", "Lake Conroe", "Lake Travis", "Lake Caddo", "Lake Livingston", "3"],
			["Which of these Texas cities was NOT the capitol of Texas at any point", "Houston", "Galveston", "Harrisburg", "West Columbia", "1"]
		]

	var currentQuestion = 0;
	var questionArray = questions[currentQuestion];
	var correct = 0;
	var incorrect = 0;
	var unanswered = 0;

	function decrementTimer(){
		timer--;
		$('#timerArea').html('<h3>Time remaining: ' + timer + '</h3>');
		if (timer === 0){
			unanswered++;
			clearInterval(counter);
			$('#gameArea').html("<h2>Out of time!</h2><h3>The correct answer was " + questionArray[questionArray[5]] + "</h3>");
			check = false;
			if (currentQuestion === questions.length){
				$('#finalArea').html("<h2>That's the end of the quiz</h2><h3>Correct: " + correct + "</h3><h3>Incorrect: " + incorrect + "</h3><h3>Unanswered: " + unanswered + "</h3>");
				clearInterval(counter);
				currentQuestion = 0;
				$('#finalArea').append("<button class='btn btn-info btn-block' id='restart'>Restart Quiz</button>");
			}
			else{
				setTimeout(run, 5000);
			}   
		}
	}

	$('body').on('click', '#start', run);

	$('body').on('click', '#restart', run);

	function run(){
		$('#finalArea').html("");
		check = true;
		console.log(check);
		timer = 30;
		$('#timerArea').html('<h3>Time remaining: ' + timer + '</h3>');
		counter = setInterval(decrementTimer, 1000);   
	    questionArray = questions[currentQuestion];
	    currentQuestion++;
	    console.log(questionArray);

	    $('#gameArea').html("<h2>" + questionArray[0] +"</h2>");

	    for (i = 1; i < questionArray.length-1; i++){
	    	var ansButton = $('<button>');
	    	ansButton.addClass('btn btn-default guess btn-block');
	    	ansButton.attr('guessNum', i);
	    	ansButton.html("<h3>" + questionArray[i] + "</h3>");
	    	$('#gameArea').append(ansButton);
	    }
	    
	    $('body').on('click', '.guess', function(){
	    	if (check){
		    	check = false;
		    	if (($(this).attr('guessNum')) === questionArray[5]){
		    		$('#gameArea').html("<h2>Correct!</h2>");
		    		correct++;
		    	}
		    	else{
		    		$('#gameArea').html("<h2>Incorrect!</h2><h3>The correct answer was " + questionArray[questionArray[5]] + "</h3>");
		    		incorrect++;
		    	}

		    	console.log(currentQuestion);
		    	console.log(questions.length);

		    	if (currentQuestion === questions.length){
		    		$('#finalArea').html("<h2>That's the end of the quiz</h2><h3>Correct: " + correct + "</h3><h3>Incorrect: " + incorrect + "</h3><h3>Unanswered: " + unanswered + "</h3>");
		    		clearInterval(counter);
		    		currentQuestion = 0;
					$('#finalArea').append("<button class='btn btn-info btn-block' id='restart'><h3>Restart Quiz</h3></button>");
		    	}
		    	else{
			    	clearInterval(counter);
			    	setTimeout(run, 5000);
		    	}
	    	}
	    	
	    });
	}
})