
    // var url = 'http://api.petfinder.com/pet.find?key=e1bf9c7e6dcb9f122154bef369c419db&output=full&format=json&animal=dog&size=L&location=27516&count=5';

var searchObject = {
    animal: "dog",
    breed: "",
    size: "S",
    zipCode: "27516"
}

var url = 'http://api.petfinder.com/pet.find?key=e1bf9c7e6dcb9f122154bef369c419db&output=full&format=json&count=100'

function createAdopteeDiv(pfId, pfName, pfImage, pfGender) { //creates the adoptee divs

        var newDiv = '<div class= "col-xxs-12 col-xs-6 col-sm-4 col-md-3">'+
                        '<div class= "adoptee-info text-center">' +
                            '<img class="adoptee-image" src='+ pfImage + ' alt='+pfName+'>'+
                            '<div class="adoptee-name">Name: '+pfName+'</div>'+
                            '<div class="adoptee-gender">Gender: '+pfGender+'</div>'+
                            '<button class="btn btn-primary btn-petfinder" data-id='+pfId+'>See More</button>'
                        '</div>'+ 
                    '</div>';
            return newDiv;

}//end create AdopteeDiv


function buildUrl(obj){
    var str = "";
    if (obj.animal) {
        str = obj.animal.replace(/_/gi,"%20");
        url = url + '&animal='+str;
    }
    else if (obj.breed){
        str = obj.breed.replace(/_/gi,"%20");
        url = url + '&breed=' + str;
    }
    if (obj.size){
        url = url + '&size='+ obj.size;
    }
        
    url = url +'&location='+obj.zipCode;
    console.log(url);
    return url;

}//end buildUrl

function findPet(obj){


    url = buildUrl(obj);
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
            console.log(petfinder);
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
                    console.log("No image")
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
                    console.log(name);
                }
                else {
                    name = "Unknown"
                }
                if (thisPet.sex){
                    gender=thisPet.sex['$t'];
                    console.log(gender);
                }
                else {
                    gender = "Unknown"
                }
                    
                $('#petfinderInfo').append(createAdopteeDiv(id,name,image,gender));

            }//end for



        },
        error : function(request,error)
        {
            alert("Request: "+JSON.stringify(request));
        }
    });//end ajax

}//end findPet

$(document).ready(function(){ 

    findPet(searchObject);

});//end document ready

 $(document).on('click', '.btn-petfinder', function() { 

    window.open('https://www.petfinder.com/petdetail/' + $(this).attr("data-id") ,'_blank' );

 });          

