const fetchBodyData = (request, callback) => {
    const FORM_URLENCODED = 'application/json';

    if (request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(body);
        });
        return body;
    } else {
        callback(null);
    }
}

module.exports = fetchBodyData;