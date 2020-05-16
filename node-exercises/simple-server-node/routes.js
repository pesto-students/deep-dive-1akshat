// This file will contain all the routes with their methods as the key and the route-string (/ (prefix)) as value

const routes = {
    '/': {
        method: 'GET',
        path: 'controller/newcontroller',
        handler: 'index'
    },
    '/home': {
        method: 'GET',
        path: 'controller/newcontroller',
        handler: 'home'
    },
    '/login': {
        method: 'POST',
        path: 'controller/newcontroller',
        handler: 'login'
    }
}

module.exports = routes;

