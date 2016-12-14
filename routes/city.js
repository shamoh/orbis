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
const kind = 'Task';
// The name/ID for the new entity
const name = 'sampletask1';
// The Cloud Datastore key for the new entity
// const taskKey = datastore.key([kind, name]);
const taskKey = datastore.key(name);

// Prepares the new entity
const task = {
  key: taskKey,
  data: {
    description: 'Buy milk'
  }
};

/* GET cities listing. */
router.get('/', function(req, res) {
  // Saves the entity
  console.log(`Saving ${task.key.name}: ${task.data.description}`);
  datastore.save(task, function(err, entity) {
    console.log("Error: " + err);
    console.log("Entity: " + entity);
  });
  res.send('respond with a resource');
});

module.exports = router;
