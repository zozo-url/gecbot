var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);
var fs = require('fs');
var Jimp = require('jimp');
var counter = 1;
var effects1 = [ 'saturate', 'saturate', 'red', 'green', 'blue', 'saturate'];
var effects2 = [ 'lighten', 'lighten', 'lighten', 'tint'];
var effects3 = [ 'saturate', 'saturate', 'red', 'blue', 'green', 'hue'];
var par1 = 8;
var par2 = 3;
var par3 = 5;
var tweetReady = false;

var images = ['images/gectree.jpg', 'images/gecz.png'];

var jimps = [];

//this triggers the image manipulation + creating/sending the tweet
setInterval(tweetSomething, 63200000);
// setInterval(tweetSomething, 30000);
function tweetSomething () {
    makeImage();
    tweetIt();
};

function makeImage () {
    var selectedEffect1 = effects1[Math.floor(Math.random()*6)];
    var selectedEffect2 = effects2[Math.floor(Math.random()*4)];
    var selectedEffect3 = effects3[Math.floor(Math.random()*6)];
    
    images.map((image, i) => {
        jimps.push(Jimp.read(images[i]));
    });

    Promise.all(jimps).then(data => {
        return Promise.all(jimps);
    }). then (data => {
        data[0].composite(data[1], (Math.floor(Math.random()*1100)), (Math.floor(Math.random()*1100)));
        data[0].color([  
            {apply: selectedEffect1, params: [par1]}, 
            {apply: selectedEffect2, params: [par2]},
            {apply: selectedEffect3, params: [par3]}
        ]);
        data[0].posterize(12);
        data[0].write("images/gectree.jpg");
    });
    tweetReady = true;
};

function gecTime () {
    var gec = 10;
    gec = gec * (Math.pow(10, counter));
    counter++;
    return gec;
};

function tweetIt() {
    while(tweetReady == false){};
    if (tweetReady == true){
        tweetReady == false;
    };

    var gecNumber = gecTime();
    var gecStatus = gecNumber.toString() + " gecs";
    if (gecStatus.length > 260) {
        counter = 1;
    };
    var filename = 'images/gectree.jpg';
    var params = { encoding: 'base64' };
    var b64 = fs.readFileSync(filename, params);
        
    T.post('media/upload', { media_data: b64 }, uploaded);
    
    function uploaded(err, data, response) {
        //this is where I tweet!
        var id = data.media_id_string;
        var tweet = {
            status: gecStatus,
            media_ids: [id]
        };
        T.post('statuses/update', tweet, tweeted);
        };
            
        function tweeted (err,data,response) {
            if (err) {
                console.log("something wrong :-/");
            }
            else {
                console.log(data.text);
            };
    };
};