// initialize twit, moment, config, file system, filename
var Twit = require('twit');
var moment = require('moment');
var config = require('./config');
var fs = require('fs');
var readline = require('readline');
var filename = 'puns.txt';

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


// posts tweets
function postTweet(tweetMsg) {
  // list of tweets to send out
  var tweet = {
    status: tweetMsg
  }

  // function that deals with the response from tweeting, ie error handling when tweet exceeds 140 characters
  function whenTweeted(err, data, response) {
    if (err) {
      console.log('Error when sending tweet number ' + lineCount);
      console.log(err);
    }
    else {
        console.log('Sending tweet number ' + lineCount + ' ... ' + tweetList.status);
    }
  }

  T.post('statuses/update', tweetList, whenTweeted);
}

// get the list of puns in an array
var punArray = fs.readFileSync(filename).toString().split("\n");
var lineCount = 0;

// send puns to twitter every hour
function sendPuns() {
  var interval = setInterval(function() {

    // run while within 7AM - 10PM
    if (moment().hour() < 23 && moment().hour() > 7) {
        // last line is empty
        if (lineCount < punArray.length - 1) {
          postTweet(punArray[lineCount] + " #puns");

          //write to file to let programmer know where the program is pointing to the current tweet
          fs.writeFile('currentTweet.json', JSON.stringify(punArray[lineCount] + ' ' + lineCount++, null, 2));
        }
        // clean up
        if(lineCount >= punArray.length - 1) {
          clearInterval(interval);
        }
    }
  }, 36000000);
}

// @test
function sendPunsTest() {
  var interval = setInterval(function() {

    if (moment().hour() < 24 && moment().hour() >= 0) {
        if (lineCount < punArray.length - 1 ) {

          console.log('Sending tweet number: ' + lineCount + ' - ' + punArray[lineCount]);
          fs.writeFile('currentTweet.json', JSON.stringify(punArray[lineCount] + ' ' + lineCount++, null, 2));
        }

        // clean up
        if(lineCount >= punArray.length - 1) {
          console.log('Exceeded pun list, add more puns to the list!');
          clearInterval(interval);
        }
    }
  }, 1000*1);
}

// sendPuns();

// @test
sendPunsTest();
