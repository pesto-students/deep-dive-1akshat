// buddy

const Buddy = require('./server');
const routes = require('./routes');

app = new Buddy(routes);
app.start(8000);