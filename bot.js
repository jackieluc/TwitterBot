//import Twit
var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);


//
// var T = new Twit({
//   consumer_key:         'Joj0S4v0ps5Su4GivZQoYvZBU',
//   consumer_secret:      'TgCIkfdurs7UdYqLs56bSR930ik2W5o5PzyxtvbJ6BpSyeVvss',
//   access_token:         '779099965222072320-bvThonisp8zi3mp9QoUTKnRX0e1xhxQ',
//   access_token_secret:  'cCF9gtdT5vb5uuwh139inHG8X8ZvdS9Ddg64dZsilQTA2',
//   timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
// });
