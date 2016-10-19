var method = React.prototype;

var T = null;
var tweetSender = null;
var userStream = null;

function React(twit, tweetSender) {
    if (twit !== null)    T = twit;
    else                  console.error("Must have a valid Twit object to properly receive follows and mentions.");

    if (tweetSender !== null)    sender = tweetSender;
    else                         console.error("Must have a valid stream object to properly react to follows or tweets.");

    // setting up a user stream (continuous stream to twitter)
    userStream = T.stream('user');

    // anytime someone follows me or mentions me
    userStream.on('follow', followed);
    userStream.on('tweet', mentioned);
}

// TODO: FIX 'event'... unable to retrieve twitterUsername from follow...

// handles when a user follows me
function followed(event) {
    var name = event.source.name;
    var twitterUsername = event.source.source_name;

    // use .@ if you want to add it to Tweets timeline
    sender.postTweet('@' + twitterUsername + " Thanks for subscribing for puns!");
}

function mentioned(event) {
    var replyTo = event.in_reply_to_screen_name;
    var text = event.text;
    var from = event.user.screen_name;

    if (replyTo === 'alittlepunny') {
        sender.postTweet('@' + from + ' hmm...');
    }
}


module.exports = React;
