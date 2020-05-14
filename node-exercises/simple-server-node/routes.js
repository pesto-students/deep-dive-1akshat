// This file will contain all the routes with their methods as the key and the route-string (/ (prefix)) as value

const routes = {
    '/': {
        method: 'GET',
        path: 'controller/newcontroller',
        resolver: 'index'
    },
    '/home': {
        method: 'GET',
        path: 'controller/newcontroller',
        resolver: 'home'
    },
    '/login': {
        method: 'POST',
        path: 'controller/newcontroller',
        resolver: 'login'
    }
}

module.exports = routes;

