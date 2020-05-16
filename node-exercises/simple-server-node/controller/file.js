const { createReadStream } = require('fs')
const staticDir = 'static/'

module.exports = function ({ request, response }) {
  try {
    const fileName = request.params && request.params.name ? request.params.name : ""
    const filePath = `${staticDir}${fileName}`
    if (!filePath) {
      throw Error('provide valid file path')
    }
    const fileStream = new createReadStream(filePath)
    sendFile(fileStream, response)
  } catch (error) {
    throw error
  }
}

sendFile = async (fileStream, response) => {

  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  response.setHeader('Transfer-Encoding', 'chunked');


  try {
    
  for await (const fileChunk of fileStream) {
    response.write(fileChunk);
  }
  response.end();
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'text/html' });
    response.write(JSON.stringify(error.code));
    response.end();
  }

}