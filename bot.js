//import Twit
var Twit = require('twit');
var config = require('./config');

// create new Twit with config (consumer key, access key)
var T = new Twit(config);

// setting up a user stream (continuous stream to twitter)
var userStream = T.stream('user');

// anytime someone follows me or mentions me
userStream.on('follow', followed);
userStream.on('tweet', mentioned);

// handles when a user follows me
function followed(event) {
  var name = event.source.name;
  var twitterUsername = event.source.source_name;

  // use .@ if you want to add it to Tweets timeline
  postTweet('@' + twitterUsername + " Thanks for subscribing for puns!");
}

// how to write to json file
// // fs = file system (node)
// var fs = require('fs');
//
// // javascript string into json
// var json = JSON.stringify(tweet, null, 2);
// fs.writeFile("tweet.json", json);

function mentioned(event) {
  var replyTo = event.in_reply_to_screen_name;
  var text = event.text;
  var from = event.user.screen_name;

  if (replyTo === 'alittlepunny') {
    postTweet('@' + from + ' hmm...');
  }
}

// parameters for searching for tweets
var parameters = {
  q: 'pun since:2014-07-11',
  count: 5
}

// function that gets the tweet data and prints it to console
function getTweet(err, data, response) {
  var tweets = data.statuses;
  for(var i = 0; i < tweets.length; i++) {
    console.log(tweets[i].text);
  }
}

// get tweets
// T.get('search/tweets', parameters, getTweet);

// posts tweets
function postTweet(txt) {
  // list of tweets to send out
  var tweetList = {
    status: txt
  }

  // function that deals with the response from tweeting, ie error handling when tweet exceeds 140 characters
  function whenTweeted(err, data, response) {
    if (err) {
      console.log('Error when tweeting!');
      console.log(err);
    }
    else {
        console.log('Sending tweet... ' + tweetList.status);
    }
  }

  T.post('statuses/update', tweetList, whenTweeted);
}

// tweet every hour
// setInterval(postTweet, 1000*60*60);
