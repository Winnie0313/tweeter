/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {



  // handle form submission
  $("form").submit(function(event) {
    event.preventDefault();
    // get the text in the textarea
    const message = $("#tweet-text").val();
    console.log("this is: ", this);
    if (message === "" || message === null) {
      alert('Content is not present!')
      return;
    } 
    
    if (message.length > 140) {
      alert('Content is too long!');
      return;
    }
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


