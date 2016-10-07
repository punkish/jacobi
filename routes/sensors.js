var express = require('express');
var router = express.Router();

var path = require('path');

var Datastore = require('nedb');
var db_sensors = new Datastore({
    filename: path.join(__dirname, '..', 'data', 'sensors.db'), 
    autoload: true
});

/* GET sensors */
router.get('/:id?', function(req, res, next) {
    if (req.headers["content-type"] === "application/json;charset=UTF-8") {
  
        // Since the content-type requested is JSON, we send back JSON
        //res.json(data);
        if (req.params.id) {
            db_sensors.find({_id: req.params.id}, function (err, doc) {
                res.json(doc)
            });
        }
        
        // send back all the sensors
        else {
            db_sensors.find({}, function (err, docs) {
              res.json(docs)
            });
        }
    }
    else {
    
    }
  
});

module.exports = router;
