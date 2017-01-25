var zipCode = 55401;
var queryURL = "http://api.wunderground.com/api/c68ecd67f5bf0bc5/conditions/q/" + zipCode + ".json";

$.ajax({ url: queryURL, method: "GET" }).done(function(response){
	$("#weather").append("<img src=" +response.current_observation.icon_url +">");
	var city = response.current_observation.display_location.city;
	var weather = response.current_observation.weather;
	if(response.current_observation.temp_f <= 32){
		$("#weather").append("It's "+ response.current_observation.temperature_string+ " in "+ city+"! Bring an animal in from the cold!");
	}
	else if(/Rain/.test(weather)){
		$("#weather").append("It's raining in " + city + "! Bring an animal in from the rain!");
	}
	else if(/Fog/.test(weather)){
		$("#weather").append("It's foggy in "+ city+"! An animal will brighten your day!")
	}
	else if(weather =="Overcast"){
		$("#weather").append("It's overcast in "+city+"! An animal will brighten your day!")
	}
	else{
		$("#weather").append("The weather in "+city+" is " +weather.toLowerCase()+"! It's a good day to adopt a pet!");
	}

});
