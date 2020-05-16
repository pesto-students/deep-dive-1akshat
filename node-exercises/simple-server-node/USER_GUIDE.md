# Buddy http server

Buddy server is node based library having plug and play architecture which serves and handles requests 

## Usage

```
const Buddy = require('./lib/server');

 const config = {
    httpsOptions: {},
  }

  const buddyServer = new Buddy(config);

```
## Apis

```
  const buddyServer = new Buddy(config);

  buddyServer.route({
    method: 'POST',
    path: '/api/v1/login',
    middlewares: [bodyMiddleware],
    handler: loginController
  })

```
## .route({})
- Add routes to server using this method

| option       | description        | example
| :------------- | :----------------- | :---------|
|method| 'get', 'post', 'delete', 'put' |
|path | valid url route , it can handle ":" in path for routes | '/api/v1/user/:id'
|middlewares|array containing valid function| [()=>{console.log("Hello")}]
|handler|function which handles logic for route| function(){}


## .addMiddleware()
- Add app specific middlewares which runs on run request like authentication , bodyParser
- It can be both normal function or async function
- Accepts array of functions
```
  const parser = async () => {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("promise middleware"), 1000);
    });
    // wait until the promise resolves (*)
    let result = await promise;
    console.log(result);
    return result;
  }

buddyServer.addMiddleware([parser])
```

### .start(port)
- To start server

```
   buddyServer.start(8000);
```

### .close()
- To close server

```
  buddyServer.close();

```


## Test

```
npm run test
```

## ToDo 

- Error handling - make proper error handling mechanism 

- Form Data handling - this feature is not available as of now 