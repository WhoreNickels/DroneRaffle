var fs = require("fs");

//Instantiate random-seed module with seed from command-line
//i.e. node ./draw-raffle.js "seed here"

var seed = process.argv[2];

//Replace all characters that aren't alphanumeric to make sure there's no unexpected result from strange unicode characters in headline.
var seed_regex_replace_nonalphanumeric = seed.replace(/[^a-zA-Z0-9.]/g, "");

console.log('Seed input is:', seed_regex_replace_nonalphanumeric);

//Load entrants file into array, specify utf-8 encoding to get string data
fs.readFile("./entrants.txt", "utf-8", function(err, data) {
	//Using Windows-style carriage return, may need to be altered to \n for Unix systems
   	var entrants = data.split("\r\n");

   	//Load random-seed module with our seed
	var rand = require('random-seed').create(seed_regex_replace_nonalphanumeric);

	//Get index of the winner using the length of entrants array as the range
	var winnerIndex = rand.range(entrants.length)
	console.log('Winner is: ', entrants[winnerIndex]);
});