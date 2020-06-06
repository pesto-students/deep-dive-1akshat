const { MongoClient } = require('mongodb');

class MongoCoat {

  constructor(url, client) {
    // Here i want the dbClient to do all the queries
    this.client = client;
    this.db = this.client.db();
  }

  static connect = async (url, params) => {
    if (typeof (params) === 'undefined') {
      params = {};
    }
    if (url.indexOf('mongodb://') > -1) {
      // url example: 'mongodb://localhost:27017/myproject'
      const client = await MongoClient.connect(url, { useUnifiedTopology: true });
      if (!client) {
        return
      }
      try {
        console.log(`successfully connected to the database..`);
        return new MongoCoat(url, client);
      } catch (err) {
        throw err;
      }
    } else {
      throw Error('Unrecognized DB connection url.');
    }
  }

  // this.db needs to set in contructor

  createCollection = async (collectionName) => {
    return await this.db.createCollection(collectionName);
  };

  insertOne = async (collectionName, doc) => {
    const collection = this.db.collection(collectionName);
    return await collection.insertOne(doc);
  };

}

module.exports = { MongoCoat };