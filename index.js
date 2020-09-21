var Twit = require('twit')
var EnvVar = require('dotenv')
EnvVar.config();
const fs = require('fs');
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

var T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

client.connect();
client.query("SELECT * FROM quotes ORDER BY random() limit 1;", (err,res) => {
    if (err){
        console.log(err);
    }
    if (res.rows.length === 0){
        console.log("ALREADY TWEETED ALL QUOTES, WILL START AGAIN");
        client.query("INSERT INTO quotes SELECT * FROM tweeted; DELETE FROM tweeted;", (err,res) => {
            client.query("SELECT * FROM quotes ORDER BY random() limit 1;", (err,res) => {
                var quote = res.rows[0].quote;
                console.log(quote);
                T.post('statuses/update', { status: quote }, function(err, data, response) {
                    console.log("avalovara quote tweeted successfuly at: " + data.created_at);
                    console.log(data.text);
                    client.query("DELETE FROM quotes WHERE quote=('" + quote + "'); INSERT INTO tweeted VALUES ('" + quote + "');", (err,res) => {
                        client.end();
                    });
                });
            });
        });
    } else {
        console.log("NORMAL TWEET");
        var quote = res.rows[0].quote;
        console.log(quote);
        T.post('statuses/update', { status: quote }, function(err, data, response) {
            console.log("avalovara quote tweeted successfuly at: " + data.created_at);
            console.log(data.text);
            client.query("DELETE FROM quotes WHERE quote=('" + quote + "'); INSERT INTO tweeted VALUES ('" + quote + "');", (err,res) => {
                client.end();
            });
        });
    }
});

// try {
//     var data = fs.readFileSync('source2.txt', 'utf8')
//     var quotes = data.split(/\r\n|\r|\n/)
//     var remove = []
//     for (var i in quotes){
//         if (quotes[i] === ""){
//             remove.push(i)
//         }
//     }
//     for (var i = remove.length-1; i > -1; i--){
//         quotes.splice(remove[i],1)
//     }
//     console.log("Got " + quotes.length + " quotes sucessfully and will start tweeting periodicaly")
// } catch(e) {
//     console.log('Error:', e.stack)
// }

// var quote = quotes[Math.floor(Math.random()*quotes.length)]
// T.post('statuses/update', { status: quote }, function(err, data, response) {
//     console.log("avalovara quote tweeted successfuly at: " + data.created_at)
//     console.log(data.text)
// })