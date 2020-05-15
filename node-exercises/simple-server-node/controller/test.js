module.exports = function ({ request, response }) {
  console.log('OK');
  response.json({ status: 200, result: "test called" });
}