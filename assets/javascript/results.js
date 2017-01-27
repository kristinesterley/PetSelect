
var MAXRESULTS=5;		
var WAIT = 2; //wait two seconds
var buttonWidth = 500;
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
	console.log(matches);
}


function getResults(quizObject){
	var query = database.ref().orderByKey();
	query.once("value").then(function(snapshot){
	console.log('quizObject');
	console.log(quizObject);
	compare(quizObject, snapshot.val());
	for(i=0;i<MAXRESULTS;i++){
		var newButton = '<li class="li-select"><button class="btn waves-effect waves-light green lighten-1 btn-select" style="width:' + Math.round((matches[i].match/100)*buttonWidth) + 'px"' +
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


 $(document).on('click', '.btn-select', function() {


// make the shelter panel and populate with local area shelter info
 	$("#shelter-panel").remove();
 	createShelterDiv();
 	getShelters(zipcode);

// load the youtube player with the video for chosen animal 	

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
 	console.log("temp stuff");
 	console.log(tempType + tempTerm + tempSize);
 	
 	var tempName = $(this).text();
 	tempName = tempName.trim();
 	tempName = tempName.slice(0,-3);
 	tempName = tempName.trim(); 
 	tempName = tempName + "s";


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
		console.log("searchObject in results.js");
		console.log(searchObject);

		$("#adoptees").remove();
	    createAdopteeContainerDiv(tempName);
		searchObject.zipCode = zipcode;
		setTimeout(findPet(searchObject),1000*WAIT);

	    
 });          









