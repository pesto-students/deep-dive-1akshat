// This app will consume the lib/Api.js
const MongoCoat = require('./lib/api');

const mongocoat = new MongoCoat();

// This is returned as a promise
const dbObject = mongocoat.connect('mongodb://localhost:27017/', { dbName: 'video' });

dbObject
    .then(db => {
        db.createCollection('roan');
    })