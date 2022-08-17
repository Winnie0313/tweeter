$(document).ready(function() {
  $("article").hover(function() {
    $(this).toggleClass('article-with-shadow');
  })

  $(".fa-flag").hover(function() {
    $(this).toggleClass('footer-icon-hover');
  })

  $(".fa-share").hover(function() {
    $(this).toggleClass('footer-icon-hover');
  })

  $(".fa-heart").hover(function() {
    $(this).toggleClass('footer-icon-hover');
  })
})
