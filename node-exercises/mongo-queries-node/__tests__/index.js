import { getDb, getDbClient } from '../src/database';
import {
  getMoviesCount,
  movieRating,
  writersIntersection,
  writersUnion,
  actor,
  positionalActor,
  comparisonOperator,
  trimUnrated,
  unratedByTomato,
  goodMovies,
  regexSearch,
  arrayAll,
  fieldArraySize,
  addField,
  incrementalUpdate,
} from '../src';

describe('Mongo Queries', () => {
  let db;

  beforeAll(async () => {
    db = await getDb();
  });

  afterAll(async () => {
    const client = await getDbClient();
    return client.close();
  });

  describe('Read', () => {
    // 1
    describe('getMoviesCount', () => {
      test('should return number of documents in movies collection', async () => {
        expect(await getMoviesCount(db)).toBe(3365);
      });
    });

    // 2
    describe('movieRating', () => {
      test('should return title of the movie with rating 9.2 and year 1974', async () => {
        expect(await movieRating(db)).toEqual({ title: 'The Godfather: Part II' });
      });
    });

    // 3
    describe('writersIntersection', () => {
      test('should return number of movie in specific writers', async () => {
        expect(await writersIntersection(db)).toBe(1);
      });
    });

    // 4
    describe('writersUnion', () => {
      test('should return number of movie in specific writers', async () => {
        expect(await writersUnion(db)).toBe(8);
      });
    });

    // 5
    describe('actor', () => {
      test('should return number of movie in which is Jackie Chan', async () => {
        expect(await actor(db)).toBe(2);
      });
    });

    // 6
    describe('positionalActor', () => {
      test('should return number of movie in which Jackie Chan is positioned 2nd in actors array', async () => {
        expect(await positionalActor(db)).toBe(1);
      });
    });

    // 7
    describe('comparisonOperator', () => {
      test('should return number of movies where imdb rating >= 9.0 and <=9.2', async () => {
        expect(await comparisonOperator(db)).toBe(8);
      });
    });

    // 8
    describe('trimUnrated', () => {
      test('should return number of movies which are not rated "UNRATED" or no "rated" field at all', async () => {
        expect(await trimUnrated(db)).toBe(2263);
      });
    });

    // 9
    describe('unratedByTomato', () => {
      test('should return number of movies in which tomato field exists but is equal to null', async () => {
        expect(await unratedByTomato(db)).toBe(14);
      });
    });

    // 10
    describe('goodMovies', () => {
      test('should return number of movies with higher imdb rating >= 9.0 OR metacritic >= 90', async () => {
        expect(await goodMovies(db)).toBe(27);
      });
    });

    // 11
    describe('regexSearch', () => {
      test('should return title of the movie whose plot contains the words: Master Yoda', async () => {
        expect(await regexSearch(db)).toEqual({
          title: 'Star Wars: Episode V - The Empire Strikes Back',
        });
      });
    });

    // 12
    describe('arrayAll', () => {
      test('should return number of movies where "Adventure" and "Action" as genres in any order', async () => {
        expect(await arrayAll(db)).toBe(97);
      });
    });

    // 13
    describe('fieldArraySize', () => {
      test('should return number of movies that were filmed in exactly 4 countries', async () => {
        expect(await fieldArraySize(db)).toBe(25);
      });
    });
  });

  // ======== UPDATE =========== //

  describe('Update', () => {
    // 14
    describe('addField', () => {
      test('should add the field "myRating" to the movie "Iron Man 3" in movieDetails collection', async () => {
        await addField(db);
        const updatedMovie = await db.collection('movieDetails').findOne({ title: 'Iron Man 3' });
        expect(updatedMovie.myRating).toBe(88);
      });
    });

    // 15
    describe('incrementalUpdate', () => {
      test('should add the field "metacritic" to the movie "Gone Girl" in movieDetails collection', async () => {
        const originalMovie = await db.collection('movieDetails').findOne({ title: 'Gone Girl' });
        const originalMovieRating = originalMovie.metacritic;
        await incrementalUpdate(db);
        const updatedMovie = await db.collection('movieDetails').findOne({ title: 'Gone Girl' });
        const updatedMovieRating = updatedMovie.metacritic;

        expect(updatedMovieRating - originalMovieRating).toBe(5);
      });
    });
  });
});
