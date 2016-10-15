// initialize twit, moment, config, file system, filename
var Twit = require('twit');
// var moment = require('moment');
var config = require('./config');
// var fs = require('fs');
// var filename = 'puns.txt';

// create new Twit with config (twitter keys)
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

// @test
var TweetSender = require('./tweetsender');
var tweetSender = new TweetSender(T);
tweetSender.sendTweet();
