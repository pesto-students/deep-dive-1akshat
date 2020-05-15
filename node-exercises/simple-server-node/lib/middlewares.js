const execMiddlewares = async (request, response, middlewareArr) => {
  return new Promise(async (resolve, reject) => {
    try {
      // add bodyBuilder to arra
      middlewareArr.push(bodyBuilder)

      for (const fn of middlewareArr) {
        await fn(request, response)
      }
      resolve({ request, response })
    } catch (error) {
      reject(error)
    }
  })
}

const bodyBuilder = (request, response) => {
  return new Promise((resolve, reject) => {
    const FORM_URLENCODED = 'application/json';
    if (request.method === "POST") {
      if (request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
          body += chunk.toString();
        });
        request.on('end', () => {
          request.body =  JSON.parse(body);
          resolve(body);
        });
      } else {
        resolve(null);
      }
    }
  })
}


module.exports = { execMiddlewares };