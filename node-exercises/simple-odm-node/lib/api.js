const { MongoClient } = require('mongodb');

class MongoCoat {
    constructor() {
    }

    connect = async (url, params) => {
        if (typeof (params) === 'undefined') {
            params = {};
        }
        let databaseName;
        if (params.dbName !== undefined) {
            databaseName = params.dbName;
        } else {
            throw Error('No Db name specified');
        }
        if (url.indexOf('mongodb://') > -1) {
            // url example: 'mongodb://localhost:27017/myproject'
            return await MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
                if (err) {
                    throw err;
                } else {
                    const databaseObject = db.db(databaseName);
                    console.log(`successfully connected to the database: ${databaseName}`);
                    return databaseObject;
                }
            })
        } else {
            throw Error('Unrecognized DB connection url.');
        }
    }
}

module.exports = MongoCoat;