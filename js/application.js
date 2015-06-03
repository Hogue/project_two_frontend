'use strict'

$(document).ready(function() {
  console.log('test1');

  $("#dropdownMenu1").on("click", function(event){
    console.log('test');

    $('.dropdown-toggle').dropdown();

  });

  $("#brighton").on("click", function(event){
    console.log('itworks');
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/neighborhoods/35/bathrooms'
      }).done(function(response){
        // we got a successful response, so we know
        $('#list_contents').html();
        var bathroomContent = '';
        response.forEach(function (bathroom){
          var adHtml = '<p><b>' + bathroom.location + '</b></br>' + bathroom.address + '</br>' + bathroom.description + '</p>';
          bathroomContent += adHtml;
        });
        $('#list_contents').html(bathroomContent);
      }).fail(function(){
        alert('failure');
      });

  });

});



