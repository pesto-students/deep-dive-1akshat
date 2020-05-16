
const { APPLICATION_JSON, FORM_URLENCODED } = require('./constants');
const fs = require('fs');

const authentication = (request, response) => {
  const routePath = request.url;
  return fs.writeFileSync('static/authPrivateRoutes.txt', routePath);
}

const execMiddlewares = async (request, response, middlewareArr) => {
  return new Promise(async (resolve, reject) => {
    try {
      // add bodyBuilder to array
      middlewareArr.push(bodyBuilder);
      for (const fn of middlewareArr) {
        await fn(request, response);
      }
      resolve({ request, response });
    } catch (error) {
      reject(error);
    }
  })
}

const transformData = (body, requestHeaders) => {

  let results = {}
  if (requestHeaders === FORM_URLENCODED) {
    const dataArr = body.split("&")
    results = dataArr.reduce((obj, ele) => {
      const dataEleArr = ele.split('=')
      obj[dataEleArr[0]] = dataEleArr[1]
      return obj
    }, {})
  }
  if (requestHeaders === APPLICATION_JSON) {
    results = JSON.parse(body)
  }

  return results
}


const bodyBuilder = (request, response) => {
  return new Promise((resolve, reject) => {
    try {

      const requestHeaders = request.headers['content-type']
      if (request.method === "post" || request.method === "put" || request.method === "delete") {
        if (requestHeaders === APPLICATION_JSON || requestHeaders === FORM_URLENCODED) {
          let body = '';
          request.on('data', chunk => {
            body += chunk.toString();
          });
          request.on('end', () => {
            const bodyData = transformData(body, requestHeaders)
            request.body = bodyData
            resolve(body);


          });
        } else {
          resolve(null);
        }
      }
      if (request.method === 'get') {
        resolve(null);
      }
    } catch (error) {
      reject(error)
    }
  })
}


module.exports = { execMiddlewares, authentication };