
var MAXRESULTS=5;	//number of matches to display	
var WAIT = 2; //wait two seconds
var buttonWidth = 500; //widest that the animal match buttons can be
var matches=[];
var searchObject = {
    animal: "",
    breed: "",
    size: "",
    zipCode: ""
}

// Initialize Firebase
var config = {
	apiKey: "AIzaSyBTcXyEm3GJvwnMSW1GFKwmVNpdptrhvKU",
	authDomain: "petselect-484f0.firebaseapp.com",
	databaseURL: "https://petselect-484f0.firebaseio.com",
	storageBucket: "petselect-484f0.appspot.com",
	messagingSenderId: "77093177831"
};
firebase.initializeApp(config);
database = firebase.database();


// compare takes the quiz responses stored in obj and compares to the attributes of each animal in the database
// the results are sorted with the highest percentage match in the 0th position of the array containing the match results

function compare(obj, animals){
	matches = [];
	for(animal in animals){
		var sum = 0;

		for(prop in obj){
			var part = 1-(Math.abs(obj[prop]-animals[animal][prop]))/4;
			sum += part;
		}
		var percent = Math.round((sum/13)*100);
		matches.push({animal: animal, match:percent, searchType: animals[animal]["searchType"], searchTerm: animals[animal]["searchTerm"], searchSize: animals[animal]["searchSize"], youTubeId: animals[animal]["youTubeId"],icon: animals[animal]["icon"]});
		console.log(animal);
	}
		matches.sort(function(a,b){
		return b.match-a.match;
		});
	
}

//getResults calls compare and then creates animal buttons associated with the highest scores

function getResults(quizObject){
	var query = database.ref().orderByKey();
	query.once("value").then(function(snapshot){
	compare(quizObject, snapshot.val());
	for(i=0;i<MAXRESULTS;i++){
		var newButton = '<li class="li-select"><button class="btn waves-effect waves-light deep-orange lighten-2 btn-select" style="width:' + Math.round((matches[i].match/100)*buttonWidth) + 'px"' +

				' data-youTubeId='+ 	matches[i].youTubeId+
				' data-searchType=' + matches[i].searchType+
				' data-searchTerm='+ matches[i].searchTerm + 
				' data-searchSize=' + matches[i].searchSize +
				'> <img src="./assets/images/'+matches[i].icon+'" id="icon">'+ ' '+
				matches[i].animal+ ' ' +matches[i].match+ '%' +'</button></li>';  	
		console.log(newButton);
		$("#results").append(newButton);

	} //end for
	
	}); //end query.once
 }//end getResults

//when a user clicks one of the buttons for an animal in the high score list, clear any divs from previous button clicks,
// display an informational video about the selected animal, display a list of local animals, display pictures of animals of that type
// that are available for adoption and provide a cute weather icon and message

 $(document).on('click', '.btn-select', function() {


// make the shelter panel and populate with local area shelter info
 	$("#shelter-panel").remove();
 	createShelterDiv();
 	getShelters(zipcode);

// load the youtube player with the video for chosen animal 	

 	$('html,body').animate({
    scrollTop: $("#printedResults").offset().top},
    'slow');


 	var animalVideo = $(this).attr('data-youTubeId')

 	if (player){
		player.loadVideoById(animalVideo);		
	}
	else {			
 		playVideo(animalVideo);
 	}

 	// get and display pets available for adoption


 	var tempType = $(this).attr('data-searchType');
 	var tempTerm = $(this).attr('data-searchTerm');
 	var tempSize = $(this).attr('data-searchSize');

 	//pull aminal name off the button text and reformat it
 	var tempName = $(this).text();
 	tempName = tempName.trim();
 	tempName = tempName.slice(0,-3);
 	tempName = tempName.trim(); 
 	tempName = tempName + "s";

 	//format searchObject used for building the pet search url


 	if (tempType === "A"){
 		searchObject.animal = tempTerm;
 		searchObject.breed = "";
    	if (tempSize != ""){
 			searchObject.size = tempSize;
 		}
 		else {
 			searchObject.size = "";
 		}
	}
	else if (tempType === "B"){
		searchObject.animal = "";
		searchObject.breed = tempTerm;
		searchObject.size = "";

	}


		$("#adoptees").remove();
	    createAdopteeContainerDiv(tempName);
		searchObject.zipCode = zipcode;

		//set timeout here for a couple seconds in hope other processes are done before writing the pet results to the 
		//dynamically create div
		setTimeout(findPet(searchObject),1000*WAIT);

	    
 });          









