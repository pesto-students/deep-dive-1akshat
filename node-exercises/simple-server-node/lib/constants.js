const METHODS_ARR = ['get', 'post', 'delete', 'put', ]
const METHOD_NOT_FOUND = 'Not Found \n The requested METHOD was not found on the server.'
const ROUTE_NOT_FOUND = 'Not Found \n The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again'
const PORT_MIN_RANGE = 1023
const PORT_MAX_RANGE = 65535
const APPLICATION_JSON = 'application/json';
const FORM_URLENCODED=  'application/x-www-form-urlencoded'

module.exports = {
  METHODS_ARR, METHOD_NOT_FOUND, ROUTE_NOT_FOUND , PORT_MIN_RANGE, PORT_MAX_RANGE,APPLICATION_JSON,FORM_URLENCODED
}