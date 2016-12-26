var method = React.prototype;

var T = null;
var tweetSender = null;
var userStream = null;

function React(twit, tweetSender)
{
    if (twit !== null)
        T = twit;
    else
        console.error("Must have a valid Twit object to properly receive follows and mentions.");

    if (tweetSender !== null)
        sender = tweetSender;
    else
        console.error("Must have a valid stream object to properly react to follows or tweets.");

    // setting up a user stream (continuous stream to twitter)
    userStream = T.stream('user');

    // anytime someone follows me or mentions me
    // TODO: handle follows? good idea?
    // userStream.on('follow', followed);
    userStream.on('tweet', mentioned);
}

// TODO: FIX 'event'... unable to retrieve twitterUsername from follow...

// handles when a user follows me
function followed(event)
{
    var name = event.source.name;
    var twitterUsername = event.source.screen_name;

    // use .@ if you want to add it to Tweets timeline
    sender.postTweet('@' + twitterUsername + " Thank you for subscribing for puns!");
}

function mentioned(event)
{
    var replyTo = event.in_reply_to_screen_name;
    var text = event.text;
    var from = event.user.screen_name;

    if (replyTo === 'alittlepunny')
    {
        if (text.includes('are you a bot?') || text.includes('r u a bot?')
        || text.includes('are u a bot?') || text.includes('r you a bot?')
        || text.includes('not human?'))
            sender.postTweet('@' + from + ' Yes, I am a bot! I am made by @lucjackie !');
        else if (text.includes('who is your master?'))
            sender.postTweet('@' + from + ' My master is @lucjackie !');
    }
}


module.exports = React;
