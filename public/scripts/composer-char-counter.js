$(document).ready(function() {
  $('#tweet-text').on("keyup", function() {
    const text = $(this).val();
    if (text.length > 140) {
      $(".counter").css('color', 'red');
    } else {
      $(".counter").css('color', 'black');
    }
    $(".counter").html(140 - text.length);
  });

});