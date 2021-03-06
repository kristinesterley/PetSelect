//check for navigation time API support
if (window.performance) {
  console.info("window.performance work's fine on this browser");
}

if (localStorage.getItem("retaking") == "true") {

          $('html,body').animate({
        scrollTop: $("#quiz-row").offset().top},
        0);
          localStorage.removeItem("retaking");
}

else if(performance.navigation.type == 1) {
  console.info( "This page is reloaded" );
      $('html,body').animate({
        scrollTop: $("#opening-row").offset().top},
        'slow');

}  else {
  console.info( "This page is not reloaded");
}

//Check if quiz answers and zip code is in local storage, get it if it is
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

//hide retake quiz button
$("#retake").hide();


//Scroll to quiz!
$("#start").click(function() {
    $('html,body').animate({
        scrollTop: $("#quiz-row").offset().top},
        'slow');
});


//Setting up the next/previous to display question by question
$(".divs > div").each(function(e) {
        if (e != 0)
            $(this).hide();
    });

//counter for quiz features
var counter = 0
    
    //Click through quiz 
    $(".next").click(function(){
        counter ++
        if ($(".divs div:visible").next().length != 0){
            $(".divs div:visible").next().show().prev().hide();
            $("ul.pager li:first-child a").css('color', '#222')
            console.log("divs visible " + $(".divs div:visible").next().length);
            console.log("divs: " + $(".divs").length);
            console.log("next:" + counter);



        };

        //Must add one to counter upon next click if user scrolls all the way back to the first question.  
        if (counter === 0) {
            counter ++
        }
        //When quiz is over, hide the next button.
        if (counter === 13) {
        $(".next").hide();
        console.log("hi");
        $("#quiz").css({
            "background": "transparent",
            "border": "none"})

    }

        return false;
    });


    $(".previous").click(function(){
        counter --
        if(counter < 13) {
            $(".next").show();
            $("#quiz").css({
            "background": 'rgba(253, 253, 253, .85)',
            "border": "2px solid #FF8F66"})
        }
        if ($(".divs div:visible").prev().length != 0){
            console.log("There are still elements");
            $(".divs div:visible")
                .prev()
                .show()
                .next()
                .hide();
            console.log(counter);
        }
        else {
            //Can't go previous first div
            //pager previous arrows turn red
            $("ul.pager li:first-child a").css('color', 'red')
        }
        //prevent form from submitting
        return false;
});



//store *checked* values inside of the quiz response object (to be compared to animal objects)
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



};

storeResponse();

//using regex to compare zipcode value
function checkZip(value) {
    return (/(^\d{5}$)|(^\d{5}-\d{4}$)/).test(value);
};

//When click show-match button, get results (so long as zipcode is validated.
$("#show-match").on("click", function() {

    //show retake button and remove ability to change answers 
    $(".previous").hide();
    $("#show-match").hide();
    $("#retake").show();

    //store results to local storage
    localStorage.setItem("quizResponse", JSON.stringify(quizResponse));

    //put users zipcode in a variable
    zipcode = $("#zipcode").val().trim();

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
 

    }
    else {
      console.log("not valid");
      $("#show-match").attr({ 
        'data-toggle': 'modal', 
        'data-target': '#myModal' 
      });

    };
});

//if want to restart quiz
function scrollToElement(ele) {
    $(window).scrollTop(ele.offset().top).scrollLeft(ele.offset().left);
}

$("#retake").on("click", function() {
    localStorage.setItem("retaking", 'true');
    location.reload(true);

})

