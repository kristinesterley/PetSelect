
    // var url = 'http://api.petfinder.com/pet.find?key=e1bf9c7e6dcb9f122154bef369c419db&output=full&format=json&animal=dog&size=L&location=27516&count=5';

function createAdopteeDiv(pfId, pfName, pfImage, pfGender) { //creates the adoptee divs

        var newDiv = '<div class= "col-xs-6 col-sm-4 col-md-2" id="'+pfId+'">'+
                '<div class= "adoptee-info text-center">' +
  
                    '<img class="animal-image" src='+ pfImage + ' alt='+pfName+'>'+
                    '<div class="adoptee-name">'+
                            '<p>'+pfName+'</p>'+
                    '</div>'+ 
                    '<div class= "adoptee-gender">'+
                        '<p>'+pfGender+'</p>'+
                    '</div>'+
                    '<button class="btn btn-primary" id="pfId">See More</button>'
                '</div>'+          
            '</div>';
            return newDiv;

}//end create AdopteeDiv



function findPet(animalType,animalBreed,animalSize,zipCode){


    var url = 'http://api.petfinder.com/pet.find?key=e1bf9c7e6dcb9f122154bef369c419db&output=full&format=json&breed=red-eared%20slider&location=27516&count=5';
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
            var moreUrl="";

            var petfinder = data.petfinder;
            console.log(petfinder);
            for (var i=0;i<petfinder.pets.pet.length;i++){
                var thisPet = petfinder.pets.pet[i];
                console.log(thisPet.name['$t']);

                if (thisPet.media && thisPet.media.photos){
                    image = thisPet.media.photos.photo[3]['$t'];
                }
                else {                    
                    console.log("No image")
                    image = "./assets/images/no-image-available.png"
                }

                if(thisPet.id){
                    moreUrl=thisPet.id['$t'];
                    console.log(moreUrl);

                }    
                else {

                }
                if (thisPet.name){
                    name=thisPet.name['$t'];
                    console.log(name);
                }
                else {

                }
                if (thisPet.sex){
                    gender=thisPet.sex['$t'];
                    console.log(gender);
                }
                else {

                }

                    
                var animalImage = $("<img class='animal-image'>");
                animalImage.attr("src",image);
                $('#petfinderInfo').append(createAdopteeDiv(moreUrl,name,image,gender));




            }//end for



        },
        error : function(request,error)
        {
            alert("Request: "+JSON.stringify(request));
        }
    });//end ajax

}//end function

$(document).ready(function(){ 

    findPet("Dog","*","L","27516");

});//end document ready



