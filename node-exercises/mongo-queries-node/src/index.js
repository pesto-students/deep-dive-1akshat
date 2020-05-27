/* Q1 (*)
  Return the number of movies in the "movies" collection without using array.length
*/
// ISSUE
const getMoviesCount = async (db) => {
  return db.collection('movies').count();
};

/* Q2 (*)
  Return the first movie with imdb rating = 9 and year = 1974.
  Also, use mongodb projections to only get title from mongodb as opposed
  to accessing title property from the object
*/
const movieRating = async (db) => {
  return db.collection('movieDetails').findOne({ "year": 1974 }, { _id: 0, title: 1, imdb: { $elemMatch: { rating: 9 } } });
};

/* Q3 (*)
  Return the number of movies written by all these people (exactly these people in this order):
  Roberto Orci
  Alex Kurtzman
  Damon Lindelof
  Gene Roddenberry
*/
const writersIntersection = async (db) => {
  return db.collection('movieDetails').find({ writers: { $all: ['Roberto Orci', 'Alex Kurtzman', 'Damon Lindelof', 'Gene Roddenberry'] } }).count();
};

/* Q4 (*)
  Return the number of movies written by any of the writers in Q3
*/
const writersUnion = async (db) => { };

/* Q5 (*)
  Return the number of movies in which actor is "Jackie Chan"
*/
const actor = async (db) => {
  return db.collection('movieDetails').find({ writers: { $in: ['Jackie Chan'] } }).count();
};

/* Q6 (*)
  Return the number of movies in which actor "Jackie Chan" is second
  in the array "actors"
*/
const positionalActor = async (db) => { };

/* Q7 (*)
  Return the first movie with imdb rating greater than or equal to 9.0
  and less than or equal to 9.2
*/
const comparisonOperator = async (db) => {
  return db.collection('movieDetails').find({
    $and: [
      { 'imdb.rating': { $gte: 9.0 } },
      { 'imdb.rating': { $lte: 9.2 } }
    ]
  }).count();
};

/* Q8 (*)
  Return the number of movies which have an actual rating opposed to
  being "UNRATED" or having no "rated" field at all
*/
const trimUnrated = async (db) => {
  return db.collection('movieDetails').find({ $or: [{ 'rated': { $ne: "UNRATED" } }, { 'rated': { $exists: false } }] }).count()
};

/* Q9 (*)
  Return number of movies in which "tomato" field exists but "tomato.rating" does not
*/
const unratedByTomato = async (db) => {
  return db.collection('movieDetails').find({ tomato: { $exists: true, $eq: null } }).count();

};

/* Q10 (*)
  Return number of movies with higher imdb rating >= 9.0 OR
  metacritic >= 90
*/
const goodMovies = async (db) => {
  return db.collection('movieDetails').find({
    $or:
      [
        { 'imdb:rating': { $gte: 9.0 } },
        { 'metacritic': { $gte: 90 } }
      ]
  }).count();
};

/* Q11 (*)
  Return title of the movie whose plot contains the words: Master Yoda
*/
// ISSUEtrue
const regexSearch = async (db) => {
  return db.collection('movieDetails').find({ plot: { $regex: /Master Yoda/i } }, { title: 1, _id: 0 });
};

/* Q12 (*)
  Return number of movies where 'Adventure' and 'Action'
  as genres in any order
*/
// Need to Be Checked Getting 62.
const arrayAll = async (db) => {
  return db.collection('movieDetails').find({
    genres: { "$size": 2, $in: ['Adventure', 'Action'] }
  }).count();
};

/* Q13 (*)
  Return number of movies that were filmed in exactly 4 countries
*/
const fieldArraySize = async (db) => {
  return db.collection('movieDetails').find({ countries: { $size: 4 } }).count();
};

/* Q14 (*)
  Add a field called "myRating" = 88 to the movie "Iron Man 3" in movieDetails collection
*/
const addField = async (db) => {
  return db.collection('movieDetails').update(
    { title: 'Iron Man 3' },
    { $set: { myRating: Number(88) } }
  )
};

/* Q15 (*)
  Increment the metacritic rating by 5 for the movie "Gone Girl" with a single query.
  Note: Do not use find() or findOne() to look for the current metacritic rating for "Gone Girl"
*/
const incrementalUpdate = async () => { };

module.exports = {
  getMoviesCount,
  writersIntersection,
  actor,
  comparisonOperator,
  unratedByTomato,
  goodMovies,
  arrayAll,
  fieldArraySize,
  regexSearch,
  trimUnrated,
  addField,
};