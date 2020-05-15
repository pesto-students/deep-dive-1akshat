
const bodyBuilder = (request, callback) => {
    const FORM_URLENCODED = 'application/json';
    if (request.method === "POST") {
        if (request.headers['content-type'] === FORM_URLENCODED) {
            let body = '';
            request.on('data', chunk => {
                body += chunk.toString();
            });
            request.on('end', () => {
                callback(body);
            });
        } else {
            callback(null);
        }
    }
    callback(null);
}

module.exports = bodyBuilder;