const request = require('request');

// bitch at the user to specify a url
if (!process.argv[2]) {
    console.log("You must specify a URL!");
    return 1;
}

const options = {
    url: process.argv[2],
    qs: {
    	test: "test"
    }
}

// create request
let createRequest = function() {
    request(options, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(body);
    });
}

createRequest();
