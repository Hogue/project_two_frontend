'use strict';

$(document).ready(function(){

  $("#user_registration_form").hide();
  $("#user_signin_form").hide();
  // $("#add_toilet_form").hide();
  $("#toilet_button").hide();

  var serverURL = 'http://localhost:3000';

  var neighborhood_names = [];

  $.get(
    serverURL + "/neighborhoods"
  )
  .done(function(res){
    // console.log(res);
    neighborhood_names = res.map(function(neighborhood){
      return [neighborhood.name, neighborhood.id];
    });
    console.log(neighborhood_names);
    populateNeighborhoodDropdown(neighborhood_names);
  })
  .fail(function(res){
    console.error("couldn't load the neighborhoods list");
  });

  $("#dropdownMenu1").on("click", function(){
    $("#user_signin_form").hide();
    $("#user_registration_form").hide();
    $(".dropdown-menu").html('');
    neighborhood_names.forEach(function(pair){

      $(".dropdown-menu").append(
        '<li role="presentation"><a role="menuitem" tabindex="-1" data-id="' + pair[1] + '" href="#">' + pair[0] + '</a></li>');
    });
  });

  var populateNeighborhoodDropdown = function(neighborhoods){

    console.log('dropdown clicks');
    // $("#add_neighborhoods_list").html('');
    console.log('list clears');


    neighborhoods.forEach(function(neighborhood){
      var name = neighborhood[0];
      var id = neighborhood[1];
      var html = "<option value='" + id + "'>" + name + "</option> ";

      $('#add_neighborhoods_dropdown').append(html);

    });
  };

  $("#register-user").click("click", function(){
    console.log("button clicked");

    var newUser = {credentials: {
                    email: $("#register-user-email").val(),
                    password: $("#register-user-password").val()}}


    $.ajax({
      url: 'http://localhost:3000/register',
      data: newUser,
      datatype: 'json',
      method: 'POST'
    })
    .done(function(){
      console.log("new user successfully registered");
      $("#create_account_button").hide();
      $("#user_registration_form").hide();
    })
    .fail(function(){
      console.log("unable to create new user");
    });
  });

  $("#signin_button").on("click", function(){
    console.log("signing butotn workssss");

    $.ajax('http://localhost:3000/login',{
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        credentials: {
          email: $('#input_email').val(),
          password: $('#input_password').val()
        }
      }),
      dataType: "json",
      method: "POST"
    }).done(function(data, textStatus) {
      localStorage.setItem('token', data.token);
      $("#user_signin_form").hide();
      $("#create_account_button").hide();
      $("#sign_in_button").hide();
      $("#toilet_button").show();

      // $('#token').val(textStatus == 'nocontent' ? 'login failed' : data['token']);
      console.log(data);
    }).fail(function(jqxhr, textStatus, errorThrown){
      console.log(textStatus);
      console.log(errorThrown);
    });
  });

   $("#add_bathroom_button").on("click", function(event){
    console.log("add bathroom button clicked!");

    var neighborhood_id = $("#add_neighborhoods_dropdown :selected").val();

  $.ajax({
    url: 'http://localhost:3000/neighborhoods/' + neighborhood_id + '/bathrooms',
      headers: { Authorization: 'Token token=' + localStorage.token },
      contentType: 'application/json',
      data: JSON.stringify({
        bathroom: {
          location: $("#add_location").val(),
          address: $("#add_location").val(),
          description: $("#add_description").val()
        }
      }),
      dataType: "json",
      method: "POST",
      }).done(function(){
        console.log('new bathroom has been added!');
      });

     });

   // $.ajax({
   //  url: 'http://localhost:3000/neighborhoods/' + neighborhood_id + '/bathrooms',
   //    headers: { Authorization: 'Token token=' + localStorage.token },
   //    contentType: 'application/json',
   //    data:
   // })



   $("#create_account_button").on("click", function(){
    console.log("register button clicked!");
      $("#user_registration_form").show();
      $("#user_signin_form").hide();

   });

    $("#sign_in_button").on("click", function(){
    console.log("signin button clicked!");
       $("#user_signin_form").show();
       $("#user_registration_form").hide();

   });

    $("#back_to_home_logo").on("click", function(){
      console.log('bathrooms clear button clicked!');
      $("#clear_bathrooms").hide();
      $("#user_registration_form").hide();
      $("#user_signin_form").hide();

    });

    $("#toilet_button").on("click", function(){
      console.log("add toilet butotn clicked!");
      $("#add_toilet_form").show();
    });

    $("#done_adding_bathroom_button").on("click", function(){
      $("#add_toilet_form").hide();
    });

   });

