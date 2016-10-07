var path = require('path');

// Load Chance and instantiate it
var chance = require('chance').Chance();

var Datastore = require('nedb');
var dir_data = path.join(__dirname, '..', 'data');

var db_sensors = new Datastore({
    filename: path.join(dir_data, 'sensors.db'), 
    autoload: true
});

var request = require('request');

var count = 0;
var gap_in_seconds = 3;
gap_in_seconds = gap_in_seconds * 1000;
var list_of_sensors = [];

var emitReading = function(sensor_id) {
    setInterval(function() {
        request({
            method: 'PUT', 
            uri: 'http://localhost:3000/readings/',
            json: {
                sensor_id : sensor_id,
                ts : chance.timestamp(),
                vals : [
                    chance.integer({min: -20, max: 20}),
                    chance.integer({min: -20, max: 20}),
                    chance.integer({min: -20, max: 20}),
                    chance.integer({min: -20, max: 20}),
                    chance.integer({min: -20, max: 20})
                ]
            }
        },
        function (error, response, body) {
            if(error) {
                console.log(error);
            }
            else {
                console.log(response.statusCode, body);
            }
        });
        
    }, gap_in_seconds)
};

var getRandomSensor = function (err, docs) {
    if (err) console.log(err);

    var random_sensor = docs[
        chance.integer({min: 0, max: docs.length})
    ];

    //list_of_sensors.push(random_sensor._id);
    emitReading(random_sensor._id);
};

var frob = function() {

    // get random sensor_id
    db_sensors.find({name: {

        // Random uppercase letter
        $gt: chance.character({alpha: true, casing: 'upper'})
    }}, getRandomSensor);
};

setInterval(frob, gap_in_seconds);
