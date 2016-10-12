//import Twit
var Twit = require('twit');
var config = require('./config');

// create new Twit with config (consumer key, access key)
var T = new Twit(config);

// parameters for searching for tweets
var parameters = {
  q: 'pun since:2014-07-11',
  count: 5
}

// list of tweets to send out
var tweetList = {
  status: 'first test from bot #coding'
}

// function that gets the tweet data and prints it to console
function getTweet(err, data, response) {
  var tweets = data.statuses;
  for(var i = 0; i < tweets.length; i++) {
    console.log(tweets[i].text);
  }
}

// function that deals with the response from tweeting, ie error handling when tweet exceeds 140 characters
function whenTweeted(err, data, response) {
  if (err) {
    console.log("Error when tweeting!");
    console.log(err);
  }
  else {
      console.log("Sending tweet...");
  }
}

// get tweets
// T.get('search/tweets', parameters, getTweet);

// posts tweets
T.post('statuses/update', tweetList, whenTweeted);
