var Twit = require('twit');
var config = require('./config');
// var moment = require('moment');
// var fs = require('fs');
// var filename = 'puns.txt';

// create new Twit with config (twitter keys)
var T = new Twit(config);

/* get tweet from query

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
T.get('search/tweets', parameters, getTweet);
*/


// @test - send tweets to console
var SendTweet = require('./sendtweet');
var sender = new SendTweet(T);
var intervalInMS = 1000*1;

sender.sendInterval(intervalInMS);

// @test - react to a following
var React = require('./react');
React(T, sender);
