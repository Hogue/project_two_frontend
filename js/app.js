'use strict';

$(document).ready(function(){

  // ******* HIDE ALL FORMS ********//
  $("#user_registration_form").hide();
  $("#user_signin_form").hide();
  $("#add_toilet_form").hide();
  $("#toilet_button").hide();


  //***** REAVEL FORMS ON CLICK *******//

  // ****** BACK TO HOME ********* //
  $("#back_to_home_logo").on("click", function(){
      console.log('bathrooms clear button clicked!');
      $("#clear_bathrooms").hide();
      $("#user_registration_form").hide();
      $("#user_signin_form").hide();
    });

  // ***** REGISTER BUTTON ********** //
  $("#create_account_button").on("click", function(){
    console.log("register button clicked!");
      $("#user_registration_form").show();
      $("#user_signin_form").hide();
   });

    // ********** SIGNIN BUTTON ************ //
    $("#sign_in_button").on("click", function(){
    console.log("signin button clicked!");
       $("#user_signin_form").show();
       $("#user_registration_form").hide();
   });

    // ********* ADD TOILET BUTTON ********* //
    $("#toilet_button").on("click", function(){
      console.log("add toilet butotn clicked!");
      $("#add_toilet_form").show();
    });

    // ****** DONE BUTTON — TOILET FORM *****//
    $("#done_adding_bathroom_button").on("click", function(){
      $("#add_toilet_form").hide();
    });

    // ** SAVE THE DATABASE URL TO A VARIABLE ***//
    var serverURL = 'http://localhost:3000';

    // CREATE A VARIALBE TO SAVE NAMES & IDS
    //FROM THE OBJECTS THAT OUR GET REQUEST RETURNS
    var neighborhood_names = [];

    // GET REQUEST — FOR NEIGHBORHOODS (this is how we get the neighborhood name and id to populate our dropdown <li> with)
    // ON DONE — map the results (res) into the var neighborhood names,
    // one by one, select the name and id of each neighborhood object
    // and save those to our array as a pair
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

    // NEIGHBORHOODS DROPDOWN MENU (BUTTON)
    // THIS POPULATES THE DROPDOWN MENU'S <ul> with <li>'s of each Neighborhood and their associated ID'
    // 1. Click Handler
    $("#dropdownMenu1").on("click", function(){
      // 2. Hide all forms that could be presently displayed
      $("#user_signin_form").hide();
      $("#user_registration_form").hide();
      // 3. Clear the html of the Neighborhoods <ul>
      // OTHERWISE, the list will keep saving the same <li>'s
      // THUS duplicating the list of Neighborhoods'
      $(".dropdown-menu").html('');
      // 4. This method takes each neighborhood's array
      // that is saved in the neighborhood_names array
      // and for each array that exists within the neighborhood_names array
      // it targets the <ul> and appends a <li> for each array
      // splitting the name and id up by their index ([0] and [1])
      neighborhood_names.forEach(function(pair){

        $(".dropdown-menu").append(
          '<li role="presentation"><a role="menuitem" tabindex="-1" data-id="' + pair[1] + '" href="#">' + pair[0] + '</a></li>');
        });
      });

    // POPULATE NEIGHBORHOOD DROPDOWN LIST
    // FOR THE ADD & DELETE TOILET FORMS
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

    // REGISTER USER
    // 1. Click Handler
    $("#register-user").click("click", function(){
      console.log("button clicked");

      // 2. create new variable that saves each email and password
      // get this information by pulling it from the ID of each
      // input field and getting that ID's value .val()
      var newUser = {credentials: {
                      email: $("#register-user-email").val(),
                      password: $("#register-user-password").val()}};

    // 3. POST REQUEST
    $.ajax({
      url: 'http://localhost:3000/register',
      data: newUser,
      datatype: 'json',
      method: 'POST'
      })
    // 4. IF SUCCESSFUL IN SAVING A NEW USER
    .done(function(){
      console.log("new user successfully registered");
      // HIDE SIGN UP FOR & SIGNUP BUTTON (on main nav)
      $("#create_account_button").hide();
      $("#user_registration_form").hide();
      })
    .fail(function(){
      console.log("unable to create new user");
      });

    });

    // USER SIGNIN
    // 1. Click Handler
    $("#signin_button").on("click", function(){
      console.log("signing butotn workssss");

      // 2. POST REQUEST
      // gather JSON into an object "credentials"
      // pull the data from the input field's IDs
      // by doing .val() on each
      $.ajax({
        url: 'http://localhost:3000/login',
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
        })
        // IF SUCCESSFUL ...
        .done(function(data, textStatus) {
        // SAVE TOKEN TO LOCAL STORE INSTEAD OF A DOM OBJECT
        // this way you won't lose the user if you reload the page
        localStorage.setItem('token', data.token);
        // HIDE ASSOCIATED FORMS AND BUTTONS
        $("#user_signin_form").hide();
        $("#create_account_button").hide();
        $("#sign_in_button").hide();
        $("#toilet_button").show();

        // ** commented code below is an example of how the token
        // could be saved to a DOM object instead of local storage
        // $('#token').val(textStatus == 'nocontent' ? 'login failed' : data['token']);
        console.log(data);
        })
        .fail(function(jqxhr, textStatus, errorThrown){
        console.log(textStatus);
        console.log(errorThrown);
        });
      });

     // ADD BATHROOMS
     // 1. Click handler
     $("#add_bathroom_button").on("click", function(event){
      console.log("add bathroom button clicked!");

      // variable that saves the value of the selected neighborhood
      // from the dropdown of neighborhoods
      var neighborhood_id = $("#add_neighborhoods_dropdown :selected").val();

     // POST REQUEST
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

  //   $("#remove_bathroom_button").on("click", function(event){
  //   console.log("remove bathroom button clicked!");

  //   var neighborhood_id = $("#add_neighborhoods_dropdown :selected").val();

  // $.ajax({
  //   url: 'http://localhost:3000/neighborhoods/' + neighborhood_id + '/bathrooms',
  //     headers: { Authorization: 'Token token=' + localStorage.token },
  //     contentType: 'application/json',
  //     data: JSON.stringify({
  //       bathroom: {
  //         location: $("#remove_location").val(),
  //         address: $("#remove_location").val(),
  //         description: $("#remove_description").val()
  //       }
  //     }),
  //     dataType: "json",
  //     method: "DELETE",
  //     }).done(function(){
  //       console.log('bathroom has been deleted!');
  //     });

  //    });

   // $.ajax({
   //  url: 'http://localhost:3000/neighborhoods/' + neighborhood_id + '/bathrooms',
   //    headers: { Authorization: 'Token token=' + localStorage.token },
   //    contentType: 'application/json',
   //    data:
   // })

});
