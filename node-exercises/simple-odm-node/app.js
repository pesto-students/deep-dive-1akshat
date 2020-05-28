// This app will consume the lib/Api.js
const MongoCoat = require('./lib/api');

const mc = new MongoCoat();

const dbObject = mc.connect('mongodb://localhost:27017/', { dbName: 'video' });