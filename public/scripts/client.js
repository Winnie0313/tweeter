/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  $(".abscent-content-error").hide();
  $(".long-content-error").hide();



  // handle form submission
  $("form").submit(function(event) {
    $(".abscent-content-error").hide();
    $(".long-content-error").hide();
  
    event.preventDefault();
    // get the text in the textarea
    const message = $("#tweet-text").val();
    console.log("this is: ", this);

    // form validation
    const $errIcon = $(`<i class="fa-solid fa-triangle-exclamation"></i>`);
    if (message === "" || message === null) {
      $(".abscent-content-error").slideDown("slow");
      return;
    }
    // else {
    //   $(".abscent-content-error").hide();
    // }
    if (message.length > 140) {
      $(".long-content-error").slideDown("slow");
      return;
    } 
    
    // else {
    //   $(".long-content-error").hide();
    // }

    // turn the form data to query string
    const data = $(this).serialize();
    $.post("/tweets/", data)
    .then(() => {
      loadTweets();
      console.log("tweet submitted")
    })
  })

  // render each tweet in array of tweet objects
  const renderTweets = function (tweets) {
    tweets.forEach(function(tweet) {
      const $tweet = createTweetElement(tweet);
      $('.tweet-container').append($tweet);
    })
  }

  // create article element for tweet
  const createTweetElement = function (tweet) {
    let time = timeago.format(tweet.created_at);
    let $tweet = `<article class="tweet">
      <header>
        <div>
          <i class="fa-solid fa-user-astronaut"></i>
          <span>${tweet.user.name}</span>
        </div>
        <span>${tweet.user.handle}</span>
      </header>

      <div class="tweet-text">
        <p>${tweet.content.text}</p>
      </div>

      <footer>
        <span>${time}</span>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-share"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>

    </article>`
    return $tweet;
  }

  // use jQuery to make a request to /tweets and receive the array of tweets as JSON
  const loadTweets = function () {
    $.get("/tweets/")
    .then((result) => {
      renderTweets(result);
    })
  }

  loadTweets();

})


