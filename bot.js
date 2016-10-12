//import Twit
var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);

var parameters = {
  q: 'banana since:2011-07-11',
  count: 3
}

function getData(err, data, response) {
  var tweets = data.statuses;
  for(var i = 0; i < tweets.length; i++) {
    console.log(tweets[i].text);
  }
}

T.get('search/tweets', parameters, getData);
