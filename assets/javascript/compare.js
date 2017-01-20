var dummyObject ={
	Affection: 0,
	Affordable: 0,
	Allergies: 0,
	ChildFriendly: 0,
	Cleanliness: 0,
	Coat: 0,
	Fitness: 0,
	Intelligence: 0,
	LifeSpan: 0,
	Noise: 0,
	Outdoor: 0,
	PhysicalSpace: 0,
	Size: 0,
	Sounds: 0
}

var catObject ={
	Affection: 3,
	Affordable: 2,
	Allergies: 4,
	ChildFriendly: 2,
	Cleanliness: 2,
	Coat: 3,
	Fitness: 1,
	Intelligence: 1,
	LifeSpan: 2,
	Noise: 1,
	Outdoor: 1,
	PhysicalSpace: 2,
	Size: 2,
	Sounds: 1
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
		var percent = (sum/14)*100;
		matches.push({animal: animal, match:percent});
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
		$("#results").append("<img src=http://placehold.it/200x200>"+matches[i].animal+matches[i].match)
	}
});

