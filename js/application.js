'use strict';

$(document).ready(function() {
  console.log('test1');
  $(".not-there").show();
  $("form").hide();
// https://evening-gorge-5099.herokuapp.com

  var serverURL = 'localhost:3000';


  $.get(
    serverURL + "/neighborhoods"
  ).done(function(data){
    data.forEach(function(neighborhood){
      console.log(neighborhood);
    //   $("#dropdownMenu").append('<li role="presentation"><a role="menuitem" tabindex="-1" id="' + neighborhood.name.toLowerCase() + '" href="#">' + neighborhood.name + '</a></li>');
    // });
  }).fail(function(err){
    console.error("Couldn't load neighborhood list");
  });



  $("#dropdownMenu1").on("click", function(event){
    console.log('test');

    $('.dropdown-toggle').dropdown();

  });

  $("#brighton").on("click", function(event){
    console.log('itworks');
    $.ajax({
        type: 'GET',
        url: serverURL + '/neighborhoods/5/bathrooms'
      }).done(function(response){
        // we got a successful response, so we know
        $('#list_contents').html();
        var bathroomContent = '';
        response.forEach(function (bathroom){
          var adHtml = '<p><b>' + bathroom.location + '</b></br>' + bathroom.address + '</br>' + bathroom.description + '</p>';r
          bathroomContent += adHtml;
        });
        $('#list_contents').html(bathroomContent);
      }).fail(function(){
        alert('failure');
      });

  });

  $("#sign_in_button").on("click", function(){
    console.log("singin button works")
    $(".not-there").hide();
    $("#list_contents").hide()
    $("form").show();
  });

});



