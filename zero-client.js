const request = require("request");

let url = process.argv[2];

// bitch at the user to specify a url
if (!url) {
  console.log("You must specify a URL!");
  return 1;
}

// automatically insert http://
if (!url.startsWith("http://")) {
  url = "http://" + url;
}

const options = {
  url: url,
  qs: {
    test: "test"
  }
};

// create request
let createRequest = function() {
  console.log("Making request with options:\n");
  console.log(options);
  request(options, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log("\nResponse body:\n" + body);
  });
};

createRequest();
