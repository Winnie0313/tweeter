/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  renderTweets(data);
})

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function (tweets) {
  tweets.forEach(function(tweet) {
    const $tweet = createTweetElement(tweet);
    $('.tweet-container').append($tweet);
  })
}

const createTweetElement = function (tweet) {
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
      <span>${tweet.created_at}</span>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-share"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>

  </article>`
  return $tweet;
}

// // Test / driver code (temporary). Eventually will get this from the server.

// const $tweet = createTweetElement(tweettweet);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('.tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

