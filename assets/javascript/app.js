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

    $(".next").click(function(){
        if ($(".divs div:visible").next().length != 0){
            $(".divs div:visible").next().show().prev().hide();
            $("ul.pager li:first-child a").css('color', '#222')
            

        }
        return false;
    });

    $(".previous").click(function(){
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
  lifespan: 0,
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

  $('#Q11 input').on('change', function() {
   lifespan = $('input[name=lifespan]:checked', '#Q11').val(); 
   quizResponse.lifespan = parseInt(lifespan);
  });

  $('#Q12 input').on('change', function() {
   childFriendly = $('input[name=child-friendly]:checked', '#Q12').val(); 
   quizResponse.childFriendly = parseInt(childFriendly);
  });

  $('#Q13 input').on('change', function() {
   affordable = $('input[name=affordable]:checked', '#Q13').val(); 
   quizResponse.affordable = parseInt(affordable); 
  });

  $('#Q14 input').on('change', function() {
   sounds = $('input[name=sounds]:checked', '#Q14').val(); 
   quizResponse.sounds = parseInt(sounds);
  });

};

storeResponse();

$("#submit").on("click", function() {
  console.log(quizResponse);
});

//Scroll to results
$("#submit").click(function() {
    $('html,body').animate({
        scrollTop: $("#results").offset().top},
        'slow');
});