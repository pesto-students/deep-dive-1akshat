const http = require('http');
const https = require('https');
const url = require('url')
const Response = require('./response')
const Request = require('./request')

const { execMiddlewares } = require('./middlewares');

const METHODS_ARR = ['get', 'post', 'delete', 'put', 'patch', 'head']


class Buddy {
  constructor({ httpsOptions = undefined }) {

    const isHttpsServer = httpsOptions && httpsOptions.key && httpsOptions.cert ? true : false

    this.app = isHttpsServer ? https.createServer(httpsOptions) : http.createServer();

    this.appMiddlewares = [];
    this.app.on('request', this.requestHandler);
    this.app.on('connection', this.onConnection);

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

  requestHandler = (req, res) => {

    const request = Request(req)
    const response = Response(res)

    const path = request.url;
    const host = request.headers.host;
    const urlPartsObj = new URL(path, `http://${host}`);
    const methodType = request.method.toLowerCase();
    let pathname = urlPartsObj.pathname;
    // This is an array.
    let search = new URLSearchParams(urlPartsObj.search);
    let searchParams = {};
    for (let params of search) {
      searchParams[params[0]] = params[1];
    }

    // add searchParams to request
  
    let routesMapKey = this.fetchRoutesMapKey(pathname, methodType);
  
    const routeObj = this.routesMap.get(routesMapKey)[methodType]

    if (!routeObj) {
      this.write(response, 404, 'text/html', '<h1> Not Found</h1> <p>The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.</p>')
      return;
    }

    this.middlewares(request, response, routeObj.routeMiddlewares)
      .then(({ request, response }) => {
        return this.resolveController(request, response, routeObj.handler);
      })
      .catch(error => { throw Error(error) })
  }

  resolveController = (request, response, handler, ) => {
    handler({ request, response })
  }

  middlewares = (request, response, routeMiddlewares) => {
    return new Promise((resolve, reject) => {
      const middlewaresArr = [...this.appMiddlewares, ...routeMiddlewares] // need to check for deep objects
      execMiddlewares(request, response, middlewaresArr)
        .then(({ request, response }) => resolve({ request, response }))
        .catch(error => { reject(error) })
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

  // This function parses the url to find the patterns and return the params. Supported Pattern (: [colon])
  fetchRoutesMapKey = (requestedPath, methodType) => {
    let hasKey = this.routesMap.has(requestedPath);
    if (hasKey) {
      return requestedPath;
    }
    const validRoutes = this.routesMap.keys();
    for (let actualRoutePath of validRoutes) {
      // Ref: https://stackoverflow.com/questions/54245919/pattern-match-in-nodejs-rest-url
      let regexP = actualRoutePath.replace(/:\w+/g, `([^/]+)`);
      regexP = new RegExp(`^${regexP}$`);
      const valid = regexP.test(requestedPath);
      if (valid) {
        let actualRoutePathSplit = actualRoutePath.split('/');
        let indexOfParams = [];
        actualRoutePathSplit.forEach((el, index) => {
          if (el.startsWith(':')) {
            const obj = {
              index: index,
              param: el.split(':')[1],
            }
            indexOfParams.push(obj);
          }
        })
        let requestedPathSplit = requestedPath.split('/');
        indexOfParams.forEach(el => {
          const paramValue = requestedPathSplit[el.index];
          el.paramValue = paramValue;
          delete (el.index);
        })
        let params = {};
        indexOfParams.map(el => {
          params[el.param] = el.paramValue;
        });
        return params;
      }
    }
  }

  onConnection = (connection) => {
    console.log("on connection")
  }
}

module.exports = Buddy;
