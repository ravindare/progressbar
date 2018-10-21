const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// define a simple route
app.get('/', (req, res) => {
	res.header('Content-type','application/json');
	res.header('status',200);
    res.json({"message": "Welcome to DataRead_NodeJS Service."});
});

// This route /read is used to get the button , bar and limit data
app.get('/read', (req, res) => {
	
	var data = {
                   "buttons": [
                                10,
                                38,
                                -13,
                                -18
                              ],
   
                    "bars": [
                                62,
                                45,
                                62
                            ],
                    "limit": 230
                };
	
	res.header('Content-type','application/json');
	res.header('status',200);
	console.log(data);
	res.json(data);	
	

});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
