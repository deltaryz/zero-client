const request = require("request");

// command arguments
let url = process.argv[2];
let id = process.argv[3];

// bitch at the user to specify a url
if (!url) {
  console.log("You must specify a URL!");
  process.exit(1);
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
// TODO: add some more shit!
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
      console.log("Error making request:\n", err);
      process.exit(1); // exit program since the thing failed
    }

    let response = undefined;

    // make sure the response is valid
    try {
      response = JSON.parse(body);
    } catch (err) {
      console.log("Error parsing response: \n", err);
      process.exit(1); // exit program since the thing failed
    }

    console.log("\nResponse body:\n" + response.msg);
    return true; // success!
  });
};

// initial ping before we loop
createRequest(query);

// loop every 60 sec
setInterval(function() {
  // TODO: crunch some data

  createRequest(query);
}, 60000);
