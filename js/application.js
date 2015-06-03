'use strict'

$(document).ready(function() {
  console.log('test1')

  $("#dropdownMenu1").on("click", function(event){
    console.log('test')

    $('.dropdown-toggle').dropdown()

  });

  $("#Allston").on("click", function(event){
    console.log('itworks')
  });

});



