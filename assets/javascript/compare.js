

var testObject ={
	affection: 3,
	affordable: 2,
	childFriendly: 2,
	cleanliness: 2,
	coat: 3,
	fitness: 1,
	intelligence: 1,
	lifeSpan: 2,
	noise: 1,
	outdoor: 1,
	physicalSpace: 2,
	size: 2,
	sounds: 1
}

var searchObject = {
    animal: "",
    breed: "",
    size: "",
    zipCode: "27516"
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


var matches=[];

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

var query = database.ref().orderByKey();
query.once("value").then(function(snapshot){

	compare(testObject, snapshot.val());
	for(i=0;i<matches.length;i++){
		var newButton = '<button class="btn btn-default btn-select" data-youTubeId='+ matches[i].youTubeId+
				' data-searchType=' + matches[i].searchType+
				' data-searchTerm='+ matches[i].searchTerm + 
				' data-searchSize=' + matches[i].searchSize +
				'> <img src="./assets/images/'+matches[i].icon+'" id="icon">'+ ' '+
				matches[i].animal+ ' ' +matches[i].match+ '%' +'</button>';  
		// $("#results").append("<img src=http://placehold.it/20x20>"+matches[i].animal+matches[i].match)
		$("#results").append(newButton);
	}
	$("#results").append("<br><br><br>")
});

 $(document).on('click', '.btn-select', function() {

 	var animalVideo = $(this).attr('data-youTubeId')
 	console.log(animalVideo);
 	// playvideo('_5KWaRhii2M');
 	if (player){
		player.loadVideoById(animalVideo);			
	}
	else {	
 		playVideo(animalVideo);
 	}
 	var tempType = $(this).attr('data-searchType');
 	var tempTerm = $(this).attr('data-searchTerm');
 	var tempSize = $(this).attr('data-searchSize');
 	var tempName = $(this).text();
 	console.log("type: "+tempType);

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
		console.log("searchObject");
		console.log(searchObject);

		$("#petPix").empty();
	    createPanelDiv(tempName);
	    findPet(searchObject);
 });          









