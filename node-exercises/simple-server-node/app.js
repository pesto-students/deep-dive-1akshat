const http = require('http');
const routes = require('./routes');
const Controller = require('./controller');
const fetchBodyData = require('./utils/fetchPostBodyData');

const proxy = http.createServer((req, res) => {
    if (req.method === 'GET') {
        const path = req.url;
        const host = req.headers.host;
        const urlPartsObj = new URL(path, `http://${host}`);
        const valid = validateRoutePath(urlPartsObj);
        try {
            if (valid) {
                let controller = new Controller();
                const controllerFunc = urlPartsObj.pathname.split('/')[1];
                write(res, 200, 'text/html', controller[controllerFunc]())
            } else {
                write(res, 404, 'text/html', '<h1> Not Found</h1> <p>The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.</p>')
            }
        } catch {
            write(200, 'text/html', `Function not defined for ${req.url}`)
        }
    } else if (req.method === 'POST') {
        fetchBodyData(req, result => {
            console.log(result);
            res.end('OK DONE');
        })
    }
})

const write = (res, responseCode, contentType, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
}

const validateRoutePath = (urlPartsObj) => {
    const validGetRoutes = routes.GET;
    if (validGetRoutes.includes(urlPartsObj.pathname)) {
        return true;
    } else {
        return false;
    }
}

proxy.listen(3000);
