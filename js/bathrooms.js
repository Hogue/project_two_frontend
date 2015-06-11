"use strict";

// var bathrooms = (function(){

//   var getBathrooms = function(){
//     $.get( "http://localhost:3000/neighborhoods").done(function(response){
//       _renderBathrooms(response.neighborhoods);
//     });
//   };

//   var _renderBathrooms = function(neighborhoods){



//   var templatingFunction = Handlebars.compile($('#bathroom-index').html());



//   var results = templatingFunction({
//     neighborhoods: neighborhoods
//   });
//   console.log(results);

//     $("#content").html(results);
//   };

//   return {
//     indexBathrooms: getBathrooms
//   };

// })();

  $(document).ready(function(){



  // CLICK HANDLER TO POPULATE A NEIGHBORHOOD'S BATHROOM CONTENT
  $("#neighborhoods").on('click', function(event){
  // on click we save our target's ID (neighborhood id)
  // to a variable
  var neighborhood_id = event.target.dataset.id;
  // THIS CODE RELATES TO OUR DELETE REQUEST IN APP.JS
  // this is here because of a problem when we clear the results of (#"contents") on line 71 —> after we've $('#neighborhoods').trigger('click') —> to simulate the button being clicked
  // THE PROBLEM IS
  // we lose our neighborhood is within our event.target
  // so we need a way of referencing it so we can actually clear the post when we delete it
  // otherwise, the post will stay on the page until it's refreshed and that's bush league
  // SO, we throw together an If statement, that if neighborhood_id is undefined (which it will be), then...
  if(neighborhood_id === undefined){
    neighborhood_id =  $('body').data('current-neigh');
  }
  // This is where we save the neighborhood_id to our body
  // we target the body
  // call a .data() method on it
  // and in our method we identify the data attribute that we want to insert our variable that contains our id
  $('body').data('current-neigh', neighborhood_id);
  // AJAX GET REQUEST FOR NEIGHBORHOOD DATA
  $.ajax({
    url: 'http://localhost:3000/neighborhoods/' + neighborhood_id,
    dataType: 'json',
    method: 'GET'
  })
  .done(function(neighborhood_data){
    console.log(neighborhood_data);
    // this, calls the function
    // that we've stored below
    // it's outside of our document ready
    // so it's global and can be accessed anywhere
    drawBathrooms(neighborhood_data);
  });
});



});

// here is the function we call at the end of our .done function in our ajax request
// this compiles all the neighborhood data we get back from our ajax request
// and saves it to a variable called template
// WHICH inserts our neighborhood_data into the html of our handlebars script, which was tagged with the ID of #bathrooms
function drawBathrooms(neighborhood_data){
    // this compiles all the neighborhood data we get back from our ajax request
    // and saves it to a variable called template
    // WHICH inserts our html into the handlebars script, which was tagged with the ID of #bathrooms
    var template = Handlebars.compile($('#bathrooms').html());
    // this variable takes the actual neighborhood_data that was returned in our request and runs it through the handlebars template that was saved to the variable 'template' above
    var results = template(neighborhood_data);


    // FINALLY we clear the html of our ("#content"), so anything that shouldn't be there is removed
    // LIKE RECENTLY DELETED BATHROOM LOCATIONS
    $("#content").html('');
    // THEN, we pass the variable 'results' into the html of the same div to either populate or repopulate the content
    $("#content").html(results);

  };
