$(document).ready(function() {
  $('#tweet-text').on("keyup", function() {
    const text = $(this).val();
    if (text.length > 140) {
      $(".counter").css('color', 'red');
    } 
    $(".counter").html(140-text.length);
  })

});