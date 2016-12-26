var method = SendTweet.prototype;

var T = null;
var moment = require('moment');
var fs = require('fs');
var filename = null;
var lastKnownTweet = require('./currentTweet.json');

var currentPunLine = 0;
var punArray = [];

function SendTweet(twit)
{
    if (twit !== null)
        T = twit;
    else
        console.error("Must have a valid Twit object to properly send tweets.");

    filename = "puns.txt";
    punArray = fs.readFileSync(filename).toString().split("\n");

    if (punArray.length < 1)
        console.error('There is no content in your file!');
}

// method that sends the tweet in intervals of 5 hours between 7AM and 10PM MST
method.sendInterval = function(intervalInMS)
{
    var tweetInterval = setInterval(function()
    {
        // check if there was a last known tweet... this ensures that the bot does not restart from the first pun in the list
        if (lastKnownTweet.lineNum > currentPunLine)
        {
            currentPunLine = lastKnownTweet.lineNum;
            console.log('Starting where we last left off on tweet number: ' + currentPunLine);
        }

        // check if it is between 7AM and 10PM MST
        if (moment().hour() < 22 && moment().hour() > 7)
        {
            // if (currentPunLine < punArray.length - 1 )
            if (currentPunLine == 0 )
            {
                // post the tweet
                this.postTweet(punArray[currentPunLine] + ' #puns #punny');

                console.log('Sending tweet number: ' + currentPunLine + ' - ' + punArray[currentPunLine]);

                // write to file to know when the last known tweet is
                var obj = {tweet: punArray[currentPunLine], lineNum: currentPunLine++};
                fs.writeFile('currentTweet.json', JSON.stringify(obj));
            }
            // clean up
            if(currentPunLine >= punArray.length - 1)
            {
                console.error('Exceeded pun list, add more puns to the list!');
                clearInterval(tweetInterval);
            }
        }
    }, intervalInMS);
};

// posts a tweet
postTweet = function(tweetMsg)
{
    // list of tweets to send out
    var tweet = { status: tweetMsg }

    // function that deals with the response from tweeting, ie error handling when tweet exceeds 140 characters
    function whenTweeted(err, data, response)
    {
        if (err)
        {
            console.error('Error when sending tweet number: ' + currentPunLine);
            console.error(err);
        }
        else
            console.log('Sending tweet: ' + tweet.status);
    }

    T.post('statuses/update', tweet, whenTweeted);
}

/* original tweet method

// send puns to twitter every hour
method.sendPun() function() {
    var interval = setInterval(function() {
        // run while within 7AM - 10PM
        if (moment().hour() < 23 && moment().hour() > 7) {
            // last line is empty
            if (currentPunLine < punArray.length - 1) {
                postTweet(punArray[currentPunLine] + " #puns");

                // write to file to let programmer know the most recent weet that has been posted (for debugging)
                fs.writeFile('currentTweet.json', JSON.stringify(punArray[currentPunLine] + ' ' + currentPunLine++, null, 2));
            }

            // clean up
            if(currentPunLine >= punArray.length - 1) {
                clearInterval(interval);
            }
        }
    }, 36000000);
}
*/

module.exports = SendTweet;
