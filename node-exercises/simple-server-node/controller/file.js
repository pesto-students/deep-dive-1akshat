const { createReadStream } = require('fs')

module.exports = function ({ request, response }) {


  const filePath = request.params && request.params.name ? request.params.name : ""
  if (!filePath) {
    throw Error('provide valid file path')
  }

  sendFile(fileStream, response)
  console.log('file controler called')
  response.json({ status: 200, result: "test called" })

}

sendFile = (fileStream, response) => {

}