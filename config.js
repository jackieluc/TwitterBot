module.exports = {
      consumer_key : process.env.CKEY || require('./credentials.json').twitter.consumer_key,
      consumer_secret : process.env.CSECRET || require('./credentials.json').twitter.consumer_secret,
      access_token : process.env.ATOKEN || require('./credentials.json').twitter.access_token,
      access_token_secret : process.env.ATSECRET || require('./credentials.json').twitter.access_token_secret
}
