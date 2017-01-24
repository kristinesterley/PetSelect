

function createPanelDiv(name) {
    var newDiv = '<div class = "panel panel-default" id="adoptees">' +
        '<div class="panel-heading"><h4>'+name+' Near You Available for Adoption</h4><img src="./assets/images/sun.png" id="icon"></div>'+
        '<div class = "panel-body" id="petfinderInfo">'+           
        '</div>'+
        '</div>';
        $("#petPix").append(newDiv); 
}


function createAdopteeDiv(pfId, pfName, pfImage, pfGender) { //creates the adoptee divs

        var newDiv = '<div class= "col-xs-6 col-sm-4 col-md-3">'+              
                        '<div class= "adoptee-info text-center">' +
                            '<img class="adoptee-image" src='+ pfImage + ' alt='+pfName+'>'+
                            '<div class="adoptee-name">Name: '+pfName+'</div>'+
                            '<div class="adoptee-gender">Gender: '+pfGender+'</div>'+
                            '<button class="btn btn-primary green lighten-1 btn-petfinder" data-id='+pfId+'>See More</button>'+
                        '</div>'+ 
                    '</div>';
            return newDiv;
}//end create AdopteeDiv

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

function getShelters(zCode) {

    var urlShelter = 'http://api.petfinder.com/shelter.find?key=e1bf9c7e6dcb9f122154bef369c419db&format=json&count=4' + '&location=' + zCode;
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
            console.log("shelter data");
            console.log(data);

            var petfinder = data.petfinder;
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

            } 
        }, // end success
        error : function(request,error)
        {
            console.log("Request: "+JSON.stringify(request));
        } // end error
    });//end ajax
}//end getShelters


function buildPetUrl(obj){

    var urlBuild = 'http://api.petfinder.com/pet.find?key=e1bf9c7e6dcb9f122154bef369c419db&output=full&format=json&count=100'

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
    console.log(urlBuild);
    return urlBuild;
}//end buildPetUrl

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

            for (var i=0;i<petfinder.pets.pet.length;i++){
                var thisPet = petfinder.pets.pet[i];
                console.log(thisPet.name['$t']);

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
        },
        error : function(request,error)
        {
            console.log("Request: "+JSON.stringify(request));
        }
    });//end ajax
}//end findPet



 $(document).on('click', '.btn-petfinder', function() { 

    window.open('https://www.petfinder.com/petdetail/' + $(this).attr("data-id") ,'_blank' );

 });          

