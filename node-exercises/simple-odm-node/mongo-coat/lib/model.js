const { MongoCoat } = require('./client');

class Model {
  constructor(collectionName, schema = {}) {
    this.collectionName = collectionName;
    this.schema = schema;
  }

}

module.exports = { Model };