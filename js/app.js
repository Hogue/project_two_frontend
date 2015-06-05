'use strict';

$(document).ready(function(){

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
  })
  .fail(function(res){
    console.error("couldn't load the neighborhoods list")
  });

  $("#dropdownMenu1").on("click", function(){

    $(".dropdown-menu").html('');
    neighborhood_names.forEach(function(pair){

      $(".dropdown-menu").append(
        '<li role="presentation"><a role="menuitem" tabindex="-1" data-id="' + pair[1] + '" href="#">' + pair[0] + '</a></li>');
    });
  });

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
      $('#token').val(textStatus == 'nocontent' ? 'login failed' : data['token']);
      console.log(data);
    }).fail(function(jqxhr, textStatus, errorThrown){
      console.log(textStatus);
      console.log(errorThrown);
    });
  });

});






