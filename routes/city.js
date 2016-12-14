var express = require('express');
var router = express.Router();

// Imports the Google Cloud client library
const Datastore = require('@google-cloud/datastore');

// Your Google Cloud Platform project ID
// const projectId = process.env.GCLOUD_PROJECT;
const projectId = 'orbis-42';
const keyFileName = process.env.GOOGLE_APPLICATION_CREDENTIALS;

// Instantiates a client
const datastore = Datastore({
    projectId: projectId,
    keyFilename: keyFileName
});

// The kind for the new entity
const kind = 'City';
/* Entity sample:
 {
 "Country": "cz",
 "City": "roztoky",
 "AccentCity": "Roztoky",
 "Region": "88",
 "Population": 5910,
 "Latitude": 50.161771,
 "Longitude": 14.392392
 }
*/

/* GET all cities */
router.get('/', function (req, res) {
    console.log("Get all cities...");
    var query = datastore.createQuery(kind);
    datastore.runQuery(query, function (err, entities, info) {
        // entities = An array of records.
        console.log("Error: " + err);
        console.log("Entities: " + entities);
        console.log("Info: " + info);
        res.send(entities);
    });
});
/* GET city(ies) by name */
router.get('/:name', function (req, res) {
    var name = req.params.name
    console.log("Get " + name + " city...");
    var query = datastore.createQuery(kind);
    query.filter('City', name);
    datastore.runQuery(query, function (err, entities, info) {
        // entities = An array of records.
        console.log("Error: " + err);
        console.log("Entities: " + entities);
        console.log("Info: " + info);
        res.send(entities);
    });
});
/* POST city */
router.post('/', function (req, res) {
    console.log("Register new city...");
    // Prepares the new entity
    const entity = {
        key: datastore.key(kind),
        data: req.body
    };

    datastore.save(entity, function(err, entity) {
        console.log("Error: " + err);
        console.log("Entity: " + entity);
    });

    res.sendStatus(202);
});

module.exports = router;
