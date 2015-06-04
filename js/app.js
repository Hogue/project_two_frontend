'use strict';

$(document).ready(function() {

  // hide signin form on load
  $("form").hide();

  // save url to a variable
  var serverURL = 'http://localhost:3000';
  // get all neighbhorhoods on load
  // so they can be used with a click handler later
  var neighborhood_names = [];
  $.get(
    serverURL + "/neighborhoods"
  ).done(function(res){
    // console.log(res);
    // console.log(res.neighborhoods);
    neighborhood_names = res.neighborhoods.map(function(neighborhood){
      return neighborhood.name;
    });
    // console.log(neighborhood_names);
  }).fail(function(err){
    console.error("Couldn't load neighborhood list");
  });

  $("#dropdownMenu1").on("click", function() {
    // console.log("CLICKED!");
    // console.log($(".dropdown-menu"));
    $(".dropdown-menu").html(''); //Clear the menu
    neighborhood_names.forEach(function(name){ //For each neighborhood:
      // console.log(name);
      // Make a new <li> inside the dropdown menu.
      // $(".dropdown-menu").append("<li>" + name + "</li>");
      $(".dropdown-menu").append(
        '<li role="presentation"><a role="menuitem" tabindex="-1" id="' + name.toLowerCase() + '" href="#">' + name + '</a></li>');
    });
  });



});
