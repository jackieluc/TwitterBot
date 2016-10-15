/**
*   Author: Jackie Luc
*   Github: jackieluc
*
*   Opens and reads a file that consists of a list of puns and stores it in an array. Sends a tweet from the array every hour if the time is within 7AM - 10PM.
*/
var T = require('Twit');
var moment = require('moment');
var fs = require('fs');
var filename = "";

var lineCount = 0;
var punArray = [];

var method = SendTweet.prototype;

function SendTweet(twit) {
  T = twit;
  filename = "puns.txt";
  punArray = fs.readFileSync(filename).toString().split("\n");

  if (punArray.length < 1) {
    console.log('There is no content in your file!');
  }
}

// method that sends the tweet in intervals of an hour between 7AM - 10PM MST
method.sendTweet = function() {
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
};

/* original tweet method

// send puns to twitter every hour
method.sendPun() function() {
  var interval = setInterval(function() {

    // run while within 7AM - 10PM
    if (moment().hour() < 23 && moment().hour() > 7) {
        // last line is empty
        if (lineCount < punArray.length - 1) {
          postTweet(punArray[lineCount] + " #puns");

          // write to file to let programmer know the most recent weet that has been posted (for debugging)
          fs.writeFile('currentTweet.json', JSON.stringify(punArray[lineCount] + ' ' + lineCount++, null, 2));
        }
        // clean up
        if(lineCount >= punArray.length - 1) {
          clearInterval(interval);
        }
    }
  }, 36000000);
}
*/

module.exports = SendTweet;
