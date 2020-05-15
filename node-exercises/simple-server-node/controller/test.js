module.exports = function ({ request, response }){
  console.log('test function called')
  response.json({ status:200,result:"test called"})

}