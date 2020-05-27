## Instructions

This folder is a node package. You can run `npm install` to install required packages, and do the exercises.

### Do Mongo Restore

There is a folder called `dump` which contains a dump of a collection. You have to work with this collection while solving the queries.

- Use `mongorestore` to restore the dump into your running `mongod`. A new database called `video` will be created with a few collections.

### References of mongorestore
- https://docs.mongodb.com/manual/reference/program/mongorestore/
- https://dba.stackexchange.com/questions/113017/how-restore-a-specific-database-from-backup-using-mongorestore-command


## What to do?
- Pass all tests by implementing functions in `/src/index.js`.
- **Use your own Mongo ODM to implement your queries.**
  - It may be that a particular query may not be easy / or possible in your ODM. In that case, feel free to use the underlying mongo driver.
- You are also free to alter the code in `src` or delete them.

### Questions

In the `movieDetails` collection, write an update command that will remove the "tomato.consensus" field for all documents matching the following criteria:

    - The number of imdb votes is less than 10,000
    - The year for the movie is between 2010 and 2013 inclusive
    - The tomato.consensus field is null

## Important Note
- If some query is not returning the correct result, move on to the next query rather than wasting time debugging that particular query.