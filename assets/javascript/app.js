
//Check if stuff is in local storage, get it if it is
if(localStorage["quizResponse"]){
  quizResponse = JSON.parse(localStorage["quizResponse"]);
  console.log(quizResponse);
  //select the corresponding radio buttons
  $("input[name=affection]").val([quizResponse.affection]);
  $("input[name=affordable]").val([quizResponse.affordable]);
  $("input[name=child-friendly]").val([quizResponse.childFriendly]);
  $("input[name=cleanliness]").val([quizResponse.cleanliness]);
  $("input[name=coat]").val([quizResponse.coat]);
  $("input[name=fitness]").val([quizResponse.fitness]);
  $("input[name=intelligence]").val([quizResponse.intelligence]);
  $("input[name=lifeSpan]").val([quizResponse.lifeSpan]);
  $("input[name=noise]").val([quizResponse.noise]);
  $("input[name=outdoor]").val([quizResponse.outdoor]);
  $("input[name=physical-space]").val([quizResponse.physicalSpace]);
  $("input[name=size]").val([quizResponse.size]);
  $("input[name=sounds]").val([quizResponse.sounds]);
}
else{
  var quizResponse = {
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
}
if(localStorage["zipcode"]){
  zipcode = localStorage["zipcode"];
  console.log(zipcode);
  $("#zipcode").val(zipcode);
}


//Scroll to quiz!
$("#start").click(function() {
    $('html,body').animate({
        scrollTop: $("#quiz").offset().top},
        'slow');
});


//Setting up the next/previous to display question by question
$(".divs > div").each(function(e) {
        if (e != 0)
            $(this).hide();
    });

var counter = 0

    $(".next").click(function(){
        counter ++
        if ($(".divs div:visible").next().length != 0){
            $(".divs div:visible").next().show().prev().hide();
            $("ul.pager li:first-child a").css('color', '#222')
            console.log("divs visible " + $(".divs div:visible").next().length);
            console.log("divs: " + $(".divs").length);



        };

        if (counter === 13) {
        $(".next").hide();
        console.log("hi");
    }

        return false;
    });


    $(".previous").click(function(){
        counter --
        if(counter < 13) {
            $(".next").show();
        }
        if ($(".divs div:visible").prev().length != 0){
            console.log("There are still elements");
            $(".divs div:visible")
                .prev()
                .show()
                .next()
                .hide();
            
        }
        else {
            //Can't go previous first div
            console.log("Can't go previous first div");
            $("ul.pager li:first-child a").css('color', 'red')
            //$(".divs div:visible").hide();
            //$(".divs div:last").show();
        }
        return false;
});

//store *checked* values inside of the quiz response object (to be compared to animal objects)
var quizResponse = {
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


var storeResponse = function() {
  $('#Q1 input').on('change', function() {
    //take input from selected radio button and store in variable to be converted into an integer.
   outdoor = $('input[name=outdoor]:checked', '#Q1').val(); 
   quizResponse.outdoor = parseInt(outdoor);
   console.log("outdoor " + outdoor);
  });

  $('#Q2 input').on('change', function() {
   fitness = $('input[name=fitness]:checked', '#Q2').val();
   quizResponse.fitness = parseInt(fitness); 
  });

  $('#Q3 input').on('change', function() {
   affection = $('input[name=affection]:checked', '#Q3').val();
   quizResponse.affection = parseInt(affection); 
  });

  $('#Q4 input').on('change', function() {
   intelligence = $('input[name=intelligence]:checked', '#Q4').val(); 
   quizResponse.intelligence = parseInt(intelligence);
  });

  $('#Q5 input').on('change', function() {
   noise = $('input[name=noise]:checked', '#Q5').val();
   quizResponse.noise = parseInt(noise);
  });

  $('#Q6 input').on('change', function() {
   coat = $('input[name=coat]:checked', '#Q6').val(); 
   quizResponse.coat = parseInt(coat);
  });

  $('#Q7 input').on('change', function() {
   cleanliness = $('input[name=cleanliness]:checked', '#Q7').val(); 
   quizResponse.cleanliness = parseInt(cleanliness);
  });

  $('#Q8 input').on('change', function() {
   size = $('input[name=size]:checked', '#Q8').val();
   quizResponse.size = parseInt(size); 
  });

  $('#Q9 input').on('change', function() {
   physicalSpace = $('input[name=physical-space]:checked', '#Q9').val();
   quizResponse.physicalSpace = parseInt(physicalSpace);
  });

  $('#Q10 input').on('change', function() {
   lifeSpan = $('input[name=lifeSpan]:checked', '#Q10').val(); 
   quizResponse.lifeSpan = parseInt(lifeSpan);
  });

  $('#Q11 input').on('change', function() {
   childFriendly = $('input[name=child-friendly]:checked', '#Q11').val(); 
   quizResponse.childFriendly = parseInt(childFriendly);
  });

  $('#Q12 input').on('change', function() {
   affordable = $('input[name=affordable]:checked', '#Q12').val(); 
   quizResponse.affordable = parseInt(affordable); 
  });

  $('#Q13 input').on('change', function() {
   sounds = $('input[name=sounds]:checked', '#Q13').val(); 
   quizResponse.sounds = parseInt(sounds);
  });
//add responses to local storage

console.log(quizResponse);

};

storeResponse();

//using regex to compare zipcode value
function checkZip(value) {
    return (/(^\d{5}$)|(^\d{5}-\d{4}$)/).test(value);
};

//When click show-match button, get results (so long as zipcode is validated.
$("#show-match").on("click", function() {
  //storeResponse();


    zipcode = $("#zipcode").val().trim();
    //store results to local storage
    localStorage.setItem("quizResponse", JSON.stringify(quizResponse));
    //Validate zipcode
    if (checkZip(zipcode) === true) {

      //Scroll to results
      $('html,body').animate({
          scrollTop: $("#results").offset().top},
          'slow');
      //disable modal
      $("#show-match").attr({
        'data-toggle': 'n/a',
        'data-target': 'n/a'

      });
      //store zip code in local storage
      localStorage.setItem("zipcode", zipcode);
      // get matches for pets based on users quiz answers      
      getResults(quizResponse);
      // clear out previous results if any


    }
    else {
    console.log("not valid");
    $("#show-match").attr({ 
      'data-toggle': 'modal', 
      'data-target': '#myModal' 
      });

    };
});

