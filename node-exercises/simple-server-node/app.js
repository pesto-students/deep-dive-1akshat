// buddy
const baseController = require('./controller/base');
const signupController = require('./controller/signUp');
const loginController = require('./controller/login');
const userInfoController = require('./controller/userInfo');
const fileReader = require('./controller/file')
const { authentication } = require('./lib/middlewares');
const Buddy = require('./lib/server');
// const routes = require('./routes');
try {

  const config = {
    httpsOptions: {},
  }

  const buddyServer = new Buddy(config);

  const bodyMiddleware = () => {
    console.log("bodyMiddleware");
  }

  const parser = async () => {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("promise middleware"), 1000);
    });
    // wait until the promise resolves (*)
    let result = await promise;
    console.log(result);
    return result;
  }

  buddyServer.route({
    method: 'POST',
    path: '/api/v1/signup',
    middlewares: [bodyMiddleware],
    handler: signupController
  })

  buddyServer.route({
    method: 'GET',
    path: '/file/:name',
    handler: fileReader
  })


  buddyServer.route({
    method: 'POST',
    path: '/api/v1/login',
    middlewares: [bodyMiddleware],
    handler: loginController
  })

  buddyServer.route({
    method: 'GET',
    path: '/api/v1/user/:id',
    middlewares: [],
    handler: userInfoController
  })

  buddyServer.route({
    method: 'GET',
    path: '/get/user',
    middlewares: [authentication, bodyMiddleware],
    handler: baseController
  })

  buddyServer.route({
    method: 'GET',
    path: '/get/user/info',
    middlewares: [authentication, bodyMiddleware],
    handler: baseController
  })


  buddyServer.route({
    method: 'GET',
    path: '/get/user/:id/:name/:age',
    middlewares: [bodyMiddleware],
    handler: baseController
  })

  buddyServer.addMiddleware([parser]);
  buddyServer.start(8000);
} catch (error) {
  console.log(error);
}



process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
  //close server here
  buddyServer.close()
});

process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});

process.on('uncaughtException', (err) => {
  console.log(err);
})