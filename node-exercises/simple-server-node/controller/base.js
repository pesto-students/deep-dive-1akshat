module.exports = function ({ request, response }) {
  console.log(request.params);
  response.json({ status: 200, result: 'OK' });
}