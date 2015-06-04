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


});
