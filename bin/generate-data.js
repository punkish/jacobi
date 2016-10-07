var path = require('path');

// Load Chance and instantiate it
var chance = require("chance").Chance();

var Datastore = require('nedb');
var dir_data = path.join(__dirname, '..', 'data');

var db_sensors = new Datastore({
    filename: path.join(dir_data, 'sensors.db'), 
    autoload: true
});

var db_readings = new Datastore({
    filename: path.join(dir_data, 'readings.db'),
    autoload: true
});

function generateSensors() {
    for (var i=0; i<10000; i++) {
        var sensor = {
            name : chance.name(),
            address : chance.address() + ', ' + chance.city(),
            lat : chance.latitude(),
            lon : chance.longitude()
        };
    
        db_sensors.insert(sensor, function (err, newDoc) {
            if (err) console.log(err);
        });
    }
}

function generateSensors() {
    //for (var i=0; i<100000; i++) {
        
        // Random uppercase letter
        var alpha = chance.character({alpha: true, casing: 'upper'});
        
        db_sensors.find({name: {$gt: alpha}}, function (err, docs) {
            if (err) console.log(err);
            
            console.log(docs[
                chance.integer({min: 0, max: docs.length})
            ]);
        });
        
        // var reading = {
        //     sensor_id : sensor_id,
        //     ts : chance.timestamp(),
        //     vals : [
        //         chance.integer({min: -20, max: 20}),
        //         chance.integer({min: -20, max: 20}),
        //         chance.integer({min: -20, max: 20}),
        //         chance.integer({min: -20, max: 20}),
        //         chance.integer({min: -20, max: 20})
        //     ]
        // };

        // db_sensors.insert(sensor, function (err, newDoc) {
        //     if (err) console.log(err);
        // });
    //}
}

generateSensors();