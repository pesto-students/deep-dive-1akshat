// This app will consume the lib/Api.js
const { MongoCoat } = require('./mongo-coat/lib/client');

let DB = null;
// This is returned as a promise
const client = MongoCoat.connect('mongodb://localhost:27017/video');

client.then(client => {
    DB = client;
    client.createCollection('akki');
    // client.insertOne('akki', { _id: 1, name: 'Akshat' });
});




// mongocoat.createCollection('akshat');