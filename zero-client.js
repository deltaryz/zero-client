const request = require("request");

// command arguments
let url = process.argv[2];
let id = process.argv[3];

// bitch at the user to specify a url
if (!url) {
  console.log("You must specify a URL!");
  return 1;
}

// if the user does not specify an id, set to 'test'
if (!id) {
  id = "test";
}

// automatically insert http://
if (!url.startsWith("http://")) {
  url = "http://" + url;
}

// URL query options
let query = {
  url: url,
  qs: {
    id: id // this identifies which device is connecting
  }
};

// create request
let createRequest = function(options) {
  console.log("Making request with options: ", options);
  request(options, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log("\nResponse body:\n" + body);
  });
};

// initial ping before we loop
createRequest(query);

// loop every 60 sec
setInterval(function() {
  createRequest(query);
}, 60000);
