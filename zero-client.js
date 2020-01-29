const request = require("request"); // we use this to report our data to the server
const shell = require("shelljs"); // we use this to easily get info from the system

// check and make sure we have our dependencies
if (!shell.which("mpstat")) {
  console.log("mpstat not found - you need the sysstat package installed");
  process.exit(1);
}

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

// create request
let createRequest = function() {
  // URL query options
  // these will be changed with every 'tick'
  // TODO: add some more shit!

  // gather variables
  let cpustring = shell.exec("mpstat | grep 'all'");
  let cpu = 100.0 - parseFloat(cpustring.substr(cpustring.length - 7));
  console.log("Current CPU usage: " + cpu);

  let query = {
    url: url,
    qs: {
      id: id, // this identifies which device is connecting
      cpu: cpu
    }
  };

  console.log("Making request with options: ", query);
  request(query, (err, _res, body) => {
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
createRequest();
// tick every 60 sec
setInterval(function() {
  createRequest();
}, 60000);
