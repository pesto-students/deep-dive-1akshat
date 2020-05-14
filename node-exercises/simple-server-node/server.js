const http = require('http');
const bodyBuilder = require('./middleware/middlewares');

class Buddy {
    constructor(routes) {
        this.routes = routes;
        this.app = http.createServer();
        this.app.on('request', this.routeParser);
    }

    start(port) {
        //TODO: port validation  method
        this.app.listen(port);
    }

    routeParser = (request, response) => {
        console.log(request.url);
        const path = request.url;
        const host = request.headers.host;
        const urlPartsObj = new URL(path, `http://${host}`);
        request.params = urlPartsObj.searchParams;
        const routeObj = this.routes[urlPartsObj.pathname];
        if (!routeObj) {
            this.write(response, 404, 'text/html', '<h1> Not Found</h1> <p>The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.</p>')
            return;
        }
        if (routeObj.method !== request.method) {
            this.write(response, 404, 'BAD BUOY METHODS NOT SAME');
            return;
        }
        this.middleware(request, response, () => {
            this.resolveController(routeObj, request, response);
        });
    }

    resolveController = (routeObj, request, response) => {
        const Controller = require(`./${routeObj.path}`);
        const controller = new Controller();
        this.write(response, 200, 'text/json', controller[routeObj.resolver](request, response));
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

}

module.exports = Buddy;
