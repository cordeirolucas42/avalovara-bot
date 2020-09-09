var Twit = require('twit')
var EnvVar = require('dotenv')
EnvVar.config();



var T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

//post tweets periodicaly
var test = 'o salto do peixe do avalovara'.split(" ")
var test = ""
var count = 0
var intervalID = setInterval(() => {
    T.post('statuses/update', { status: test[count] }, function(err, data, response) {
        console.log(data)
    })
    if (count == test.length -1){
        clearInterval(intervalID)
    } else {
        count += 1
    }
}, 3600000);

//follow twitter account and retweet when the tweet involves some specific word
// var users = ["721774492620582912"];
// var stream = T.stream('statuses/filter', {follow: users});
// stream.on('tweet', function (tweet) {
//     if (users.indexOf(tweet.user.id_str) > -1) {
//         console.log(tweet.user.name + ": " + tweet.text);
//         if (tweet.text.includes("avalovara")){
//             T.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
//                 console.log(data)
//             })
//         }
//     }
// })

//search tweets in the last 7 days for specific words and users
// T.get('search/tweets', { q: 'avalovara from:erosinbetween', count: 100}, function(err, data, response) {
//     for (var i in data.statuses){
//         console.log(data.statuses[i].text)
//     }
// })