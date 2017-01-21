var dummyObject ={
	affection: 0,
	affordable: 0,
	childFriendly: 0,
	cleanliness: 0,
	coat: 0,
	fitness: 0,
	intelligence: 0,
	lifeSpan: 0,
	noise: 0,
	outdoor: 0,
	physicalSpace: 0,
	size: 0,
	sounds: 0
}

var catObject ={
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

database = firebase.database();
var matches=[];

function compare(obj, animals){
	matches = [];
	for(animal in animals){
		var sum = 0;
		//console.log("animal", animals[animal]);
		for(prop in obj){
			var part = 1-(Math.abs(obj[prop]-animals[animal][prop]))/4;
			//console.log(prop+" "+obj[prop]+", "+animals[animal][prop]);
			sum += part;
		}
		var percent = (sum/13)*100;
		matches.push({animal: animal, match:percent, searchType: animals[animal]["searchType"], searchTerm: animals[animal]["searchTerm"], searchSize: animals[animal]["searchSize"], youTubeId: animals[animal]["youTubeId"]});
	}
		matches.sort(function(a,b){
		return b.match-a.match;
		});
	console.log(matches);
}

var query = database.ref().orderByKey();
query.once("value").then(function(snapshot){
	console.log("snapshot",snapshot.val());
	compare(dummyObject, snapshot.val());
	compare(catObject, snapshot.val());
	for(i=0;i<matches.length;i++){
		$("#results").append("<img src=http://placehold.it/20x20>"+matches[i].animal+matches[i].match)
	}
});

