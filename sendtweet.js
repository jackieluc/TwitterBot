var T = null;
var moment = require('moment');
var fs = require('fs');
var filename = null;

var lineCount = 0;
var punArray = [];

var method = SendTweet.prototype;

function SendTweet(twit) {
    if (twit !== null)    T = twit;
    else                  console.error("Must have a valid Twit object to properly send tweets.");

    filename = "puns.txt";
    punArray = fs.readFileSync(filename).toString().split("\n");

    if (punArray.length < 1)    console.error('There is no content in your file!');
}

// method that sends the tweet in intervals of an hour between 7AM - 10PM MST
method.sendInterval = function(interval) {
    var tweetInterval = setInterval(function() {
        if (moment().hour() < 24 && moment().hour() >= 0) {
            if (lineCount < punArray.length - 1 ) {

                console.log('Sending tweet number: ' + lineCount + ' - ' + punArray[lineCount]);
                fs.writeFile('currentTweet.json', JSON.stringify(punArray[lineCount] + ' ' + lineCount++, null, 2));
            }

          // clean up
          if(lineCount >= punArray.length - 1) {
              console.error('Exceeded pun list, add more puns to the list!');
              clearInterval(tweetInterval);
          }
      }
  }, interval);
};

// posts tweets
function postTweet(tweetMsg) {
  // list of tweets to send out
    var tweet = { status: tweetMsg }

  // function that deals with the response from tweeting, ie error handling when tweet exceeds 140 characters
    function whenTweeted(err, data, response) {
        if (err) {
            console.error('Error when sending tweet number: ' + lineCount);
            console.error(err);
        }
        else {
            console.log('Sending tweet number ' + lineCount + ' ... ' + tweetList.status);
        }
    }

    T.post('statuses/update', tweetList, whenTweeted);
}

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
