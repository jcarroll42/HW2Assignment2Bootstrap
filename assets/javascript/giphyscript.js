$(document).ready(function(){

	// Initial array of animals
	var animals = ['snake', 'cat', 'dog', 'lion', 'pig', 'wolf', 'chicken', 'cow'];

	// displayAnimals function renders gifs to page
	function displayAnimals(){

		var animalType = $(this).attr('data-animal');

		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalType + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                var results = response.data;
                
                $('#gifView').empty();

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $('<div class="gif col-lg-6">')
                    var rating = results[i].rating;
                    var p = $('<p>').text("Rating: " + rating);
                    var animalImage = $('<img>');
                    
                    animalImage.addClass('animalImage')
                    animalImage.attr('src', results[i].images.fixed_height_still.url);
                    animalImage.attr('data-still', results[i].images.fixed_height_still.url);
                    animalImage.attr('data-animate', results[i].images.fixed_height.url);
                    animalImage.attr('data-state', 'still');

                    gifDiv.append(p);
                    gifDiv.append(animalImage);

                    $('#gifView').prepend(gifDiv);
                }

            });
        }
		

	// Renders the buttons
	function renderButtons(){ 

		// Deletes the buttons prior to adding new buttons
		$('#buttonsView').empty();

		// Loops through the array of animals
		for (var i = 0; i < animals.length; i++){
		    var a = $('<button>') 
		    a.addClass('gifButton btn btn-info'); 
		    a.attr('data-animal', animals[i]);
		    a.text(animals[i]);
		    $('#buttonsView').append(a);
		}
	}

	//Listener for addAnimal button to add a new animal
	$('#addAnimal').on('click', function(){
		var newAnimal = $('#animal-input').val().trim();

		// The animal from the textbox is then added to our array
		animals.push(newAnimal);
		
		// renderButtons is called to render out the buttons including the new addition
		renderButtons();

		$('#animal-input').val("");

		return false;
	})

	// Displays animal gifs for particular clicked button
	$(document).on('click', '.gifButton', displayAnimals);

	// renders buttons the first time
	renderButtons();

	//listener function on gifs to make them play/stop
	$(document).on('click', '.animalImage', function(){
		var state = $(this).data('state');
	    console.log(state);

	    if (state === "still"){
	            var animate = $(this).attr('data-animate');
	            $(this).attr('src', animate);
	            $(this).data('state', 'animate');
	        }
	        else{
	            var still = $(this).attr('data-still');
	            $(this).attr('src', still);
	            $(this).attr('data-state', 'still');
	        }

	});

})