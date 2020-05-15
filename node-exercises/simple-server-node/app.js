// buddy
const testController = require('./controller/test')
const Buddy = require('./lib/server');
// const routes = require('./routes');

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
  method: 'GET',
  path: '/get/user',
  middlewares: [],
  handler: testController
})

buddyServer.route({
  method: 'GET',
  path: '/get/user/:id',
  middlewares: [bodyMiddleware],
  handler: testController
})

buddyServer.route({
  method: 'GET',
  path: '/get/user/:id/:name/:age',
  middlewares: [bodyMiddleware],
  handler: testController
})

buddyServer.route({
  method: 'post',
  path: '/user',
  middlewares: [bodyMiddleware],
  handler: testController
})

buddyServer.route({
  method: 'put',
  path: '/test',
  middlewares: [bodyMiddleware],
  handler: testController
})


buddyServer.addMiddleware([parser]);
buddyServer.start(8000);