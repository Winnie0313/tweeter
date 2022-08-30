/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  $(".absent-content-error").hide();
  $(".long-content-error").hide();

  // handle form submission
  $("form").submit(function(event) {
    $(".absent-content-error").hide();
    $(".long-content-error").hide();
  
    event.preventDefault();
    // get the text in the textarea
    const message = $("#tweet-text").val();

    // form validation
    if (message === "" || message === null) {
      $(".absent-content-error").slideDown("slow");
      return;
    }
    if (message.length > 140) {
      $(".long-content-error").slideDown("slow");
      return;
    }
    
    // turn the form data to query string
    const data = $(this).serialize();
    $.post("/tweets/", data)
      .then(() => {
        loadTweets();
        $("#tweet-text").val("");
        // reset the counter to 140
        $(".counter").val("140");
      });
    
    // reset the counter to 140 after sumbiting a tweet
    
  });

  // render each tweet in array of tweet objects
  const renderTweets = function(tweets) {
    $('.tweet-container').html('');
    tweets.forEach(function(tweet) {
      const $tweet = createTweetElement(tweet);
      $('.tweet-container').prepend($tweet);
    });
  };

  // create article element for tweet
  const createTweetElement = function(tweet) {
    //prevent cross-site cripting
    const safeHTML = `<p>${escape(tweet.content.text)}</p>`;

    let time = timeago.format(tweet.created_at);
    let $tweet = `<article class="tweet">
      <header>
        <div>
          <img class="tweet-avatar" src=${tweet.user.avatars} width="30" height="30">
          <span>${tweet.user.name}</span>
        </div>
        <span>${tweet.user.handle}</span>
      </header>

      <div class="tweet-text">
      ${safeHTML}
      </div>

      <footer>
        <span>${time}</span>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-share"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>

    </article>`;
    return $tweet;
  };

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // use jQuery to make a request to /tweets and receive the array of tweets as JSON
  const loadTweets = function() {
    $.get("/tweets/")
      .then((result) => {
        renderTweets(result);
      });
  };

  loadTweets();

});


