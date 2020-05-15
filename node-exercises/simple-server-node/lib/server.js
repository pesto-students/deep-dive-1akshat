const http = require('http');
const https = require('https');
const url = require('url')
const bodyBuilder = require('../middleware/middlewares');

const METHODS_ARR = ['get', 'post', 'delete', 'put', 'patch', 'head']


class Buddy {
  constructor({ httpsOptions = undefined }) {

    const isHttpsServer = httpsOptions && httpsOptions.key && httpsOptions.cert ? true : false

    this.app = isHttpsServer ? https.createServer(httpsOptions) : http.createServer();

    this.appMiddlewares = [];
    this.app.on('request', this.routeParser);
    // map to keep record of routes
    this.routesMap = new Map()

  }

  route = ({ method, path, handler, middlewares = [] }) => {

    // typeof handler is function 

    // check middlewares is array , either empty or has valid typeof(functions) elements

    // if(!handler || typeof(handler)==='function') throw Error('handler is not valid function')
    if (!(method && typeof (method) === 'string' && METHODS_ARR.includes(method.toLowerCase()))) throw Error('Provide valid method')

    let methodType = method.toLowerCase()

    const currentRouteObj = {}
    currentRouteObj[methodType] = {
      'handler': handler, 'routeMiddlewares': middlewares
    }

    // get previous object and merge
    let previousRouteObj = this.routesMap.get(path);
    if (previousRouteObj) {
      previousRouteObj[methodType] = currentRouteObj[methodType]
      this.routesMap.set(path, previousRouteObj)
    }
    else {
      this.routesMap.set(path, currentRouteObj)
    }
  }

  start(port) {
    if (port > 1023 && port <= 65535) {
      this.app.listen(port);
    } else {
      throw Error("Not a valid Port. Put a valid port in range of 1023 to 65535");
    }
  }

  routeParser = (request, response) => {

    const path = request.url;
    const host = request.headers.host;
    const urlPartsObj = new URL(path, `http://${host}`);
    const methodType = request.method.toLowerCase()
    let params = urlPartsObj.searchParams;

    let pathname = urlPartsObj.pathname

    let routesMapKey = this._fetchroutesMapKey(pathname)

    const routeObj = this.routesMap.get(pathname)[methodType]

    if (!routeObj) {
      this.write(response, 404, 'text/html', '<h1> Not Found</h1> <p>The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.</p>')
      return;
    }
    this.middleware(request, response, () => {

      // execute funcrtions from this.appMiddlewares 

      return this.resolveController(routeObj, request, response);
    });
  }

  resolveController = (routeObj, request, response) => {

    // routeObj.routeMiddlewares

    const data = routeObj.handler({ request, response })
    // process result snd send response
    return this.write(response, '200', {}, JSON.stringify(data))

  }

  middleware = (request, response, callback) => {
    bodyBuilder(request, result => {
      request.body = result;
      callback();
    })
  }

  write = (res, responseCode, contentType, data) => {
    res.writeHead(responseCode, { 'Content-Type': contentType });
    res.write(data);
    res.end();
  }

  validateRoutePath = (urlPartsObj) => {
    const validGetRoutes = routes.GET.map(el => Object.keys(el)[0]);
    if (validGetRoutes.includes(urlPartsObj.pathname)) {
      return true;
    } else {
      return false;
    }
  }


  addMiddleware = (middlewareArr = []) => {
    // check valid array

    this.appMiddlewares = middlewareArr;

  }

  _fetchroutesMapKey = (pathname) => {

    // TODO:
    let hasKey = this.routesMap.has(pathname)
    if (hasKey) {
      return pathname
    }

    const pathnameParts = pathname.trim().split('/')
    const keysArr = []
    const matchingKeys = []
    for (let key of this.routesMap.keys()) {
      console.log(key)
      keysArr.push(key)
      pathname.includes(key) ? matchingKeys.push(key) : null
    }
    // if true retun pathn
    console.log(matchingKeys, keysArr)

  }

}

module.exports = Buddy;
