
// get current weather for zip code entered from the weatherunderground API and format the div and header for the pets to adopt panel
function createAdopteeContainerDiv(name) {
    //first get weather information for the panel header

    
    var queryURL = "https://api.wunderground.com/api/c68ecd67f5bf0bc5/conditions/q/" + zipcode + ".json";

    console.log(queryURL);

    $.ajax({ 
        url: queryURL, 
        method: "GET",
        success: function(response){

            var weatherMessage = "Everyday is a great day to adopt a pet!";
            var weatherIcon = "./assets/images/sun.png";

            if (response.current_observation){
                var weatherData = response.current_observation;
                var weatherIcon = weatherData.icon_url;    
                var city = weatherData.display_location.city;
                var weather = weatherData.weather;
                
                if(weatherData.temp_f <= 32){
                    weatherMessage = "It's "+ weatherData.temperature_string+ " in "+ city+"! Bring an animal in from the cold!";
                }
                else if(/Rain/.test(weather)){
                    weatherMessage = "It's raining in " + city + "! Bring an animal in from the rain!";
                }
                else if(/Fog/.test(weather)){
                    weatherMessage = "It's foggy in "+ city+"! An animal will brighten your day!";
                }
                else if(weather =="Overcast"){
                    weatherMessage = "It's overcast in "+city+"! An animal will brighten your day!";
                }
                else{
                    weatherMessage = "The weather in "+city+" is " +weather.toLowerCase()+"! It's a good day to adopt a pet!";
                }

            }//end if
            
            var newDiv = '<div class = "panel panel-default" id="adoptees">' +
                '<div class="panel-heading"><h4>'+name+' Near You Available for Adoption</h4>'+
                '<img src="'+weatherIcon+'" id="icon">'+ weatherMessage + '</div>'+
                '<div class = "panel-body" id="petfinderInfo">'+           
                '</div>'+
                '</div>';
            $("#petPix").append(newDiv); 

        }, // end success
        error : function(request,error)
        {
            console.log("Request: "+JSON.stringify(request));
        } // end error

    });



}

// create a div for one adoptable pet and return the div to the calling function

function createAdopteeDiv(pfId, pfName, pfImage, pfGender) { //creates the adoptee divs

        var newDiv = '<div class= "col-xs-6 col-sm-4 col-md-3">'+              
                        '<div class= "adoptee-info text-center">' +
                            '<img class="adoptee-image img-thumbnail" src='+ pfImage + ' alt='+pfName+'>'+
                            '<div class="adoptee-name">Name: '+pfName+'</div>'+
                            '<div class="adoptee-gender">Gender: '+pfGender+'</div>'+
                            '<button class="btn btn-primary deep-orange lighten-2 btn-petfinder" data-id='+pfId+'>See More</button>'+
                        '</div>'+ 
                    '</div>';
            return newDiv;
}//end create AdopteeDiv

// create a div to hold shelter information and display it

function createShelterDiv(){
           var newDiv =   '<div class="panel panel-default" id="shelter-panel">'+
                                '<div class="panel-heading">'+
                                    '<h3 class="panel-title">Local Animal Shelters</h3>'+
                                '</div>'+
                                '<div class="panel-body" id="shelter-list">'+
                                    // Panel content
                                '</div>'+
                            '</div>';
            $("#shelters").append(newDiv);                

}

//create a div for one shelter and diplay

function displayShelter(name,city,state,email,phone){

    var newDiv =    '<address>' +
                    '<strong>'+name+'</strong><br>'+
                    city + ", " + state + '<br>';
                     if (phone){
                        newDiv = newDiv + '<abbr title="Phone">P:</abbr>' + phone + '<br>';
                     }   
                     newDiv = newDiv + 
                    '<a href="mailto:'+email+'">' + email + '</a>' +
                    '</address>'


    $("#shelter-list").append(newDiv);
}

// make a call to the PetFinder API to get shelters in the area of the given zip code

function getShelters(zCode) {

    var urlShelter = 'https://api.petfinder.com/shelter.find?key=e1bf9c7e6dcb9f122154bef369c419db&format=json&count=20' + '&location=' + zCode;
    var shelterName = "";
    var shelterCity = "";
    var shelterState = "";
    var shelterEmail = "";
    var shelterPhone = "";

    $.ajax({
        type : 'GET',
        data : {},
        url : urlShelter+'&callback=?' ,
        dataType: 'json',
        success : function(data) {  


            var petfinder = data.petfinder;
            if (petfinder.shelters){
                for (var i=0;i<petfinder.shelters.shelter.length;i++){
                    var thisShelter = petfinder.shelters.shelter[i];
                    if (thisShelter.name){
                        shelterName = thisShelter.name['$t'];
                    }
                    else {
                        shelterName = "Unknown";
                    }
                    if (thisShelter.city){
                        shelterCity = thisShelter.city['$t'];
                    }
                    else {
                        shelterCity = "Unknown";
                    }
                    if (thisShelter.state){
                        shelterState = thisShelter.state['$t'];
                    }
                    else {
                        shelterState = "Unknown";
                    }
                    if (thisShelter.email){
                        shelterEmail = thisShelter.email['$t'];
                    }
                    else {
                        shelterEmail = "Unknown";
                    } 
                    if (thisShelter.phone){
                        shelterPhone = thisShelter.phone['$t'];
                    }
                    else {
                        shelterEmail = "";
                    } 

                    displayShelter(shelterName, shelterCity, shelterState, shelterEmail, shelterPhone);       

                } // end for
            } //end if
            else {
                newDiv = "None found for zip code " + zCode;
                $("#shelter-list").append(newDiv);
            }    
        }, // end success
        error : function(request,error)
        {
            console.log("Request: "+JSON.stringify(request));
        } // end error
    });//end ajax
}//end getShelters

// build the url that will be sent to the PetFinder API to get adoptable pet information

function buildPetUrl(obj){

    var urlBuild = 'https://api.petfinder.com/pet.find?key=e1bf9c7e6dcb9f122154bef369c419db&output=full&format=json&count=100'
    console.log("buildPetUrl");
    console.log(obj);
    var str = "";
    if (obj.animal) {
        str = obj.animal.replace(/_/gi,"%20");
        urlBuild = urlBuild + '&animal='+str;
    }
    else if (obj.breed){
        str = obj.breed.replace(/_/gi,"%20");
        urlBuild = urlBuild + '&breed=' + str;
    }
    if (obj.size){
        urlBuild = urlBuild + '&size='+ obj.size;
    }
        
    urlBuild = urlBuild +'&location='+obj.zipCode;
    return urlBuild;
}//end buildPetUrl


//makes ajax call to the PetFinder API to get pets of the requested type that are available for adoption

function findPet(obj){


    url = buildPetUrl(obj);
    console.log(url);

    $.ajax({
        type : 'GET',
        data : {},
        url : url+'&callback=?' ,
        dataType: 'json',
        success : function(data) {              
            // stores result
            var image="";
            var name="";
            var gender="";
            var id="";

            var petfinder = data.petfinder;

            if (petfinder.pets){ 

                for (var i=0;i<petfinder.pets.pet.length;i++){
                    var thisPet = petfinder.pets.pet[i];

                    if (thisPet.media && thisPet.media.photos){
                        if (thisPet.media.photos.photo[3]){
                            image = thisPet.media.photos.photo[3]['$t'];
                        }    
                        else if (thisPet.media.photos.photo[2]) {
                            image = thisPet.media.photos.photo[2]['$t'];
                        } 
                        else if (thisPet.media.photos.photo[1]){
                            image = thisPet.media.photos.photo[1]['$t'];
                        } 
                        else if (thisPet.media.photos.photo[0]){
                            image = thisPet.media.photos.photo[0]['$t'];
                        }                     
                    }
                    else {                    
                        image = "./assets/images/no-image-available.png"
                    }

                    if(thisPet.id){
                        id=thisPet.id['$t'];
                    }    
                    else {
                        id="";
                    }
                    if (thisPet.name){
                        name=thisPet.name['$t'];
                        name = name.substring(0,36);
                    }
                    else {
                        name = "Unknown"
                    }
                    if (thisPet.sex){
                        gender=thisPet.sex['$t'];
                    }
                    else {
                        gender = "Unknown"
                    }           
                    $('#petfinderInfo').append(createAdopteeDiv(id,name,image,gender));
                }//end for
            } //end if
            else {
                //need a pause here to make sure that the dynamically created div is in place before writing to it
                
                setTimeout(writeNoPetFinderInfo, 1000*1);
                
            }
        },
        error : function(request,error)
        {
            console.log("Request: "+JSON.stringify(request));
        }
    });//end ajax
}//end findPet


//
function writeNoPetFinderInfo() {
    var noneDiv = '<div>None found.</div>';
    $('#petfinderInfo').append(noneDiv);
}

//when user clicks button for a specific pet, open the PetFinder website on the page about that pet in another tab
 $(document).on('click', '.btn-petfinder', function() { 

    window.open('https://www.petfinder.com/petdetail/' + $(this).attr("data-id") ,'_blank' );

 });          


