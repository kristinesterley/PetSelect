$(document).ready(function(){
    var url = 'http://api.petfinder.com/pet.find?key=e1bf9c7e6dcb9f122154bef369c419db&output=full&format=json&animal=dog&size=L&location=27516&count=5';
    $.ajax({
        type : 'GET',
        data : {},
        url : url+'&callback=?' ,
        dataType: 'json',
        success : function(data) {              
            // stores result
            var result = '';

            var petfinder = data.petfinder;
            console.log(petfinder);
            for (var i=0;i<petfinder.pets.pet.length;i++){
                console.log(petfinder.pets.pet[i].name['$t']);
                var image = petfinder.pets.pet[i].media.photos.photo[3]['$t'];
                var animalImage = $("<img>");
                animalImage.attr("src",image);


                $('#petfinderInfo').append(animalImage);
                // $('#petfinderInfo').html("<img src="+image+">");
            }

            // console.log(petfinder.pets.pet.name['$t']);


            // var infoHTML = '<ul>';
            // infoHTML += '<li>';
            // infoHTML += '<strong>Name</strong><br>';
            // infoHTML += petfinder.name['$t'];
            // infoHTML += '</li>';

            // infoHTML += '</li>';

            // infoHTML += '</ul>';
            // // return infoHTML;
            // $('#petfinderInfo').html(infoHTML);

            // // $('#petfinderInfo').html(petfinder.pet.description['$t']);
            // // 

        },
        error : function(request,error)
        {
            alert("Request: "+JSON.stringify(request));
        }
    });
});

         //   infoHTML += petfinder.description['$t'];