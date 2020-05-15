// buddy

const testController = require('./controller/test')

const Buddy = require('./lib/server');
const routes = require('./routes');

const config = {
  httpsOptions:{
  }
}

const buddyServer = new Buddy(config);

const bodyMiddleware = ()=>{
  console.log("bodyMiddleware")
}

const parser = ()=>{
  console.log("parser")
}


buddyServer.route({
  method: 'GET', 
  path: '/test',
  middlewares:[bodyMiddleware],
  handler: testController
})

buddyServer.route({
  method: 'post',
  path: '/test/user/:id',
  middlewares:[bodyMiddleware],
  handler: testController
})

buddyServer.route({
  method: 'put',
  path: '/test',
  middlewares:[bodyMiddleware],
  handler: testController
})


buddyServer.route({
  method: 'post',
  path: '/user/',
  middlewares:[bodyMiddleware],
  handler: testController
})

buddyServer.addMiddleware([parser])


buddyServer.start(8000);