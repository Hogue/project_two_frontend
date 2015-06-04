"use strict";

var bathrooms = (function(){

  var getBathrooms = function(){
    $.get( "http://localhost:3000/neighborhoods").done(function(response){
      _renderBathrooms(response.neighborhoods);
    });
  };

  var _renderBathrooms = function(neighborhoods){



  var templatingFunction = Handlebars.compile($('#bathroom-index').html());



  var results = templatingFunction({
    neighborhoods: neighborhoods
  });
  console.log(results);

    $("#content").html(results);
  };

  return {
    indexBathrooms: getBathrooms
  };

})();

$(document).ready(function(){

$("#neighborhoods").on('click', function(event){
  var bathroom_id = event.target.dataset.id;
  // alert("BATHROOOM ID IS " + bathroom_id);

  $.ajax({
    url: 'http://localhost:3000/neighborhoods/' + bathroom_id,
    dataType: 'json',
    method: 'GET'
  })
  .done(function(neighborhood_data){
    console.log(neighborhood_data);
    var template = Handlebars.compile($('#bathrooms').html());

     var results = template(neighborhood_data);

     $("#content").html(results);

  })
});

});
