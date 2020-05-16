module.exports = function ({ request, response }) {
  console.log(request.params);
  response.json('OK');
}