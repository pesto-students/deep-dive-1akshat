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
            const client = await MongoClient.connect(url, { useUnifiedTopology: true });
            if (!client) {
                return
            }
            try {
                const databaseObject = client.db(databaseName);
                console.log(`successfully connected to the database: ${databaseName}`);
                return databaseObject;
            } catch (err) {
                throw err;
            }
        } else {
            throw Error('Unrecognized DB connection url.');
        }
    }

    createCollection = (collectionName) => {

    }
}

module.exports = MongoCoat;