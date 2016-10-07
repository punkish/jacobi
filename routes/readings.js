var express = require('express');
var app = express();
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var path = require('path');

var Datastore = require('nedb');
var db_readings = new Datastore({
    filename: path.join(__dirname, '..', 'data', 'readings.db'), 
    autoload: true
});

module.exports = function(io) {
    
    /*
     * http://stackoverflow.com/questions/15425446/how-to-put-a-json-object-with-an-array-using-curl
     * 
     * curl -H 'Content-Type: application/json' -X PUT -d '{…}'
     * 
     */
    router.put('/', jsonParser, function(req, res, next) {
        if (!req.body) return res.sendStatus(400);
    
        db_readings.insert(req.body, function (err, newDoc) {
            io.emit("reading", {id: newDoc._id});
            res.send('Success PUTting data! id: ' + newDoc._id);
        });
    });

    return router;
}