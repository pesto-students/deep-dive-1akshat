# Instructions

You have to create a simple ODM (Object document mapper) that makes it easy to perform queries on your MongoDB instance.

Try to use ES6 (and above) features as much as possible.

## Mandatory Features
- A way to create a schema (with type check) that is enforced before saving documents.
  - Simple
- Have validations like `required`, and `unique` etc.
- Simplified query interface.
  - For example, if I have a `users` collection, then somewhere in my code, I should be able to do `User.all()` to get all users. The API does not have to be exactly as mentioned, but the functionality should exist.
- Have a simple `pre` and `post` save hook. That is, I can attach handlers before a document is getting saved, and similarly for after a document has been saved.

## Extra Features
- An API for custom validators

## Post completion
- Build a very simple ToDo web application using your **using your ODM**.
  - You can use `express` as a server. Or better yet, you can use your own `simple-server` lib developed in Week 3 to serve your application.
  - The frontend has to be in `React`.
- The application should have:
  - A login/logout flow.
  - Save the user's complete todo history and show them day-wise (or any other criteria)
    - Save the time of completion of each todo etc.
  - Show a graph of number of todos created vs number of todos completed on a weekly/biweekly/monthly basis.
    - You can use your own graphing lib created in Week 4. Otherwise, you are free to use other libs as well.

## Related Projects in other languages
- Python
  - [PyMODM](https://github.com/mongodb/pymodm)
  - [HumbleDB](https://humbledb.readthedocs.io/en/latest/)
  - [mongoengine](http://mongoengine.org/)
  - [micromongo](https://pythonhosted.org/micromongo/)
- Java
  - [Morphia](https://www.baeldung.com/mongodb-morphia)
- Rust
  - [wither](https://github.com/thedodd/wither)
- JavaScript
  - [mongoose](https://mongoosejs.com/)
  - [HumbleJS](https://humblejs.readthedocs.io/en/latest/)
  - [monogram](https://www.npmjs.com/package/monogram)
  - [mongo-odm](https://www.npmjs.com/package/mongo-odm)
  - [camo](https://github.com/scottwrobinson/camo)

## Restrictions
- You should not be using any extra libraries.
    - Apart from `eslint`, `prettier`, `babel` or other helper utilities.
- If your library does not have tests, it won't be evaluated.
