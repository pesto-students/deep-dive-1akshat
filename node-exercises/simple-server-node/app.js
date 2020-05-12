const http = require('http');
const routes = require('./routes');

const proxy = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.write(req.url);
    res.end();
})

proxy.on('request', (req, res) => {
    if (req.method === 'GET') {
        const path = req.url;
        const host = req.headers.host;
        const urlPartsObj = new URL(path, `http://${host}`);
        const valid = validateRoute(urlPartsObj);
        if (valid) {
            console.log('200 OK');
        } else {
            console.log('Not Found. The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.');
        }
    }
})

const validateRout = (urlPartsObj) => {
    const validGetRoutes = routes.GET;
    if (validGetRoutes.includes(urlPartsObj.pathname)) {
        return true;
    } else {
        return false;
    }
}



proxy.listen(3000);

