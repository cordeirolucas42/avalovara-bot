var Twit = require('twit')
var EnvVar = require('dotenv')
EnvVar.config();
const fs = require('fs');

var T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

//post tweets periodicaly
try {
    var data = fs.readFileSync('source2.txt', 'utf8')
    var quotes = data.split(/\r\n|\r|\n/)
    var remove = []
    for (var i in quotes){
        if (quotes[i] === ""){
            remove.push(i)
        }
    }
    for (var i = remove.length-1; i > -1; i--){
        quotes.splice(remove[i],1)
    }
    console.log("Got " + quotes.length + " quotes sucessfully and will start tweeting periodicaly")
} catch(e) {
    console.log('Error:', e.stack)
}

var quote = quotes[Math.floor(Math.random()*quotes.length)]
// console.log("loop start")
T.post('statuses/update', { status: quote }, function(err, data, response) {
    console.log("avalovara quote tweeted successfuly at: " + data.created_at)
    console.log(data.text)
})

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