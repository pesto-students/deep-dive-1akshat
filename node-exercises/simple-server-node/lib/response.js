const response = res => {
  const json = ({ status, result }) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(result));
    res.end('');
  }
  // do not use spread operator
  return Object.assign(res, { json });
}

module.exports = response;
