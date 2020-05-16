# Instructions

Build a minimal server that makes making APIs and serving files easier. 

For inspiration, you can look at —

- [Express](https://expressjs.com/) (in Node)
- [Sinatra](http://sinatrarb.com/) (in Ruby)
- [Flask](https://flask.palletsprojects.com/en/1.1.x/) (in Python)
- [Martini](https://github.com/go-martini/martini) (in Go)
- [Rocket](https://rocket.rs/) (in Rust)

## Mandatory Features

- **Routing**
    - Should be able to respond to client requests on a particular URLs
        - Which means users have a way of attaching a URL and a function/object/"whatever you want" together.
    - Should support common HTTP methods on each URLs ( you can design the API as you like)
    - Should have support for pattern matching in the URLs, like this. You can make the pattern matching as extensive/simple as you want.

        ```python
        /user/<id>

        #  Or 
        /user/:id 

        When the url "user/5" is hit,
        id = 5 becomes available on the request instance.
        ```

- **Extensible**
    - Make sure that you have a plug-in architecture where anyone can develop library/function to modify the request or response instances.
    - Different libraries call these injectable piece of code by different names. In express.js, you call it middlewares.
    - Inspiration: [https://flask.palletsprojects.com/en/1.1.x/extensions/](https://flask.palletsprojects.com/en/1.1.x/extensions/)

- **Streams**
    - Your application should use streams **_where ever applicable_**. Remember, node request and response cycles are already streams. You don't have to do much here.

- **Static Files**
    - Serve static files easily.
    - Inspiration: [https://flask.palletsprojects.com/en/1.1.x/quickstart/#static-files](https://flask.palletsprojects.com/en/1.1.x/quickstart/#static-files)

- **Latest JavaScript**
  - Use latest ES features instead of equivalent ES5 features. 
    - _Make sure you follow this point._ You code will not be evaluated if you are using ES5 features which can be written in ES6+ easily.
    - Here's a [list](https://github.com/addyosmani/es6-equivalents-in-es5) of ES5/ES6+ equivalent features. 

## After you have built your server

- Create a Login/Signup flow. A basic flow is --
    - Make a HTML file containing a form (login and signup)
    - Ask the user to fill the form and submit it. 
    - Store the data in a JSON file and when next time the user logs in, show him/her a private route.
- The CSS is otpional and totally up to you.


## Extra Features

- A template engine such that given an HTML file as the following one—

    ```html
    <html>
    ...head
    	<body>
    		<h1>{{title}}</h1>
    	<body>
    </html>
    ```

    In this case, the server send an object which has a key called `title`

    Inspiration: [EJS](https://ejs.co/), [Jinja](https://jinja.palletsprojects.com/en/2.11.x/)

### Restrictions

- You should not be using any extra libraries.
    - Apart from `eslint`, `prettier`, `babel` or other helper utilities.
- If your library does not have tests, it won't be evaluated.
