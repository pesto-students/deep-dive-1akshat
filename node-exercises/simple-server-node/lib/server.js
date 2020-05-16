const http = require('http');
const https = require('https');
const Response = require('./response');
const Request = require('./request');
const { execMiddlewares } = require('./middlewares');
const { METHODS_ARR, METHOD_NOT_FOUND, ROUTE_NOT_FOUND, PORT_MIN_RANGE, PORT_MAX_RANGE } = require('./constants');

class Buddy {
  constructor({ httpsOptions = undefined }) {
    const isHttpsServer = httpsOptions && httpsOptions.key && httpsOptions.cert ? true : false;
    this.app = isHttpsServer ? https.createServer(httpsOptions) : http.createServer();

    this.appMiddlewares = [];
    this.app.on('request', this.requestHandler);
    this.app.on('connection', this.onConnection);

    // map to keep record of routes
    this.routesMap = new Map();
  }

  checkRouteArgs = ({ method, path, handler, middlewares }) => {
    if (!(middlewares instanceof Array)) {
      throw Error('middlewares is not Array');
    }
    if (!handler || !(handler instanceof Function)) {
      throw Error('handler is not valid function');
    }
    if (!(method && typeof method === 'string' && METHODS_ARR.includes(method.toLowerCase()))) {
      throw Error('Provide valid method');
    }
    if (!path || !(typeof (path) === 'string')) {
      throw Error('route path is not valid');
    }
  };

  route = ({ method, path, handler, middlewares = [] }) => {
    try {
      this.checkRouteArgs({ method, path, handler, middlewares });
      let methodType = method.toLowerCase();
      const currentRouteObj = {};
      currentRouteObj[methodType] = {
        handler: handler,
        routeMiddlewares: middlewares
      };
      let previousRouteObj = this.routesMap.get(path);
      if (previousRouteObj) {
        previousRouteObj[methodType] = currentRouteObj[methodType];
        this.routesMap.set(path, previousRouteObj);
      } else {
        this.routesMap.set(path, currentRouteObj);
      }
    } catch (error) {
      throw Error(error);
    }
  };

  start(port) {
    if (port > PORT_MIN_RANGE && port <= PORT_MAX_RANGE) {
      console.log(`listening on port ${port}`);
      this.app.listen(port);
    } else {
      throw Error('Not a valid Port. Put a valid port in range of 1023 to 65535');
    }
  }

  close() {
    this.app.close();
  }

  requestHandler = (req, res) => {
    try {
      const request = Request(req);
      const response = Response(res);

      const path = request.url;
      const host = request.headers.host;
      const urlPartsObj = new URL(path, `http://${host}`);
      const methodType = request.method.toLowerCase();
      // Overriding method property
      request.method = methodType;
      const pathname = urlPartsObj.pathname;

      const searchParams = {};
      for (const params of urlPartsObj.searchParams) {
        searchParams[params[0]] = params[1];
      }

      let { extraParams = {}, routesMapKey = '' } = this.fetchRoutesMapKey(pathname, methodType);
      const finalParams = { ...searchParams, ...extraParams };
      // add params to request
      request.params = finalParams;
      // get route details from map
      const routeObjFromMap = this.routesMap.get(routesMapKey);
      if (!routeObjFromMap) {
        this.write(response, 404, 'text/html', ROUTE_NOT_FOUND);
        return;
      }
      const routeObj = routeObjFromMap[methodType];
      if (routeObj) {
        this.middlewares(request, response, routeObj.routeMiddlewares)
          .then(({ request, response }) => {
            return this.resolveHandler(request, response, routeObj.handler);
          })
          .catch((error) => {
            throw Error(error);
          });
      } else {
        this.write(response, 404, 'text/html', METHOD_NOT_FOUND);
        return;
      }
    } catch (error) {
      throw error;
    }
  };

  resolveHandler = (request, response, handler) => {
    handler({ request, response });
  };

  middlewares = (request, response, routeMiddlewares) => {
    return new Promise((resolve, reject) => {
      const middlewaresArr = [...this.appMiddlewares, ...routeMiddlewares]; // need to check for deep objects
      execMiddlewares(request, response, middlewaresArr)
        .then(({ request, response }) => resolve({ request, response }))
        .catch((error) => {
          reject(error);
        });
    });
  };

  write = (res, responseCode, contentType, data) => {
    res.writeHead(responseCode, { 'Content-Type': contentType });
    res.write(data);
    res.end();
  };

  addMiddleware = (middlewareArr = []) => {
    // check valid array
    this.appMiddlewares = middlewareArr;
  };

  // This function parses the url to find the patterns and return the params. Supported Pattern (: [colon])
  fetchRoutesMapKey = (requestedPath) => {
    let hasKey = this.routesMap.has(requestedPath);
    if (hasKey) {
      return {
        extraParams: {}, routesMapKey: requestedPath
      };
    }
    const validRoutes = this.routesMap.keys();
    for (let actualRoutePath of validRoutes) {
      let regexP = actualRoutePath.replace(/:\w+/g, `([^/]+)`);
      regexP = new RegExp(`^${regexP}$`);
      const valid = regexP.test(requestedPath);
      let actualRoutePathSplit = actualRoutePath.split('/');
      let indexOfParams = [];
      actualRoutePathSplit.forEach((el, index) => {
        if (el.startsWith(':')) {
          const obj = {
            index: index,
            param: el.split(':')[1]
          };
          indexOfParams.push(obj);
        }
      });
      if (valid) {
        let requestedPathSplit = requestedPath.split('/');
        indexOfParams.forEach((el) => {
          const paramValue = requestedPathSplit[el.index];
          el.paramValue = paramValue;
          delete el.index;
        });
        let params = {};
        indexOfParams.map((el) => {
          params[el.param] = el.paramValue;
        });
        return {
          extraParams: params,
          routesMapKey: actualRoutePath
        };
      } else {
        continue;
      }
    }
    return {};
  };

  onConnection = (connection) => {
    console.log('on connection');
  };
}

module.exports = Buddy;
