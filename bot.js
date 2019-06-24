var Twit = require('twit')
// var exec = require('child_process').exec
var config = require('./config')
var T = new Twit(config)
var fs = require('fs')

var counter = 1;

var Jimp = require('jimp');

// setInterval(tweetIt, 86400000);
setInterval(tweetIt, 3000);

function gecTime () {
    var gec = 10;
    gec = gec * (Math.pow(10, counter));
    counter++;
    return gec
}

function tweetIt() {
    var gecNumber = gecTime();
    var gecStatus = gecNumber.toString() + " gecs";
    var filename = 'images/gectree.jpg'
    var params = { encoding: 'base64' }
    var b64 = fs.readFileSync(filename, params)
        
    T.post('media/upload', { media_data: b64 }, uploaded)
    
    function uploaded(err, data, response) {
        //this is where I tweet!
        var id = data.media_id_string
        var tweet = {
            status: gecStatus,
            media_ids: [id]
        }
    T.post('statuses/update', tweet, tweeted)
    }
            
    function tweeted (err,data,response) {
        if (err) {
            console.log("something wrong :-/");
        }
        else {
            console.log(data.text);
        }
    }
}