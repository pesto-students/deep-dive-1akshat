const http = require('http');

const server = http.createServer((req, res) => {
    res.write('Server is Up and Running');
    res.end();
})

server.listen(3000);

