// This app will consume the lib/Api.js
const HouseCoat = require('./lib/api');

const obj = new HouseCoat();

const schema = obj.schema({
    title: String, // String is shorthand for {type: String}
    author: String,
    body: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
})

console.log(schema);
