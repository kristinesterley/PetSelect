

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
	for(i=0;i<matches.length;i++){
		var newButton = '<li><button class="btn waves-effect waves-light deep-orange lighten-2 btn-select" style="width:' + Math.round((matches[i].match/100)*buttonWidth) + 'px"' +
				' data-youTubeId='+ 	matches[i].youTubeId+
				' data-searchType=' + matches[i].searchType+
				' data-searchTerm='+ matches[i].searchTerm + 
				' data-searchSize=' + matches[i].searchSize +
				'> <img src="./assets/images/'+matches[i].icon+'" id="icon">'+ ' '+
				matches[i].animal+ ' ' +matches[i].match+ '%' +'</button></li>';  	
		
		$("#results").append(newButton);

	} //end for
	$("#results").append("<br><br>");
	}); //end query.once
 }//end getResults


 $(document).on('click', '.btn-select', function() {

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

 	$("#shelter-panel").remove();
 	createShelterDiv();
 	getShelters(zipcode);



 	var tempType = $(this).attr('data-searchType');
 	var tempTerm = $(this).attr('data-searchTerm');
 	var tempSize = $(this).attr('data-searchSize');
 	
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
		$("#petPix").empty();
	    createPanelDiv(tempName);
		searchObject.zipCode = zipcode;
	    findPet(searchObject);
 });          









