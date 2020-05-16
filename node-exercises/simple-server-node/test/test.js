const Buddy = require('../lib/server');
const testController = require('../controller/test');

const config = {
    httpsOptions: {},
}
const buddyServer = new Buddy(config);


describe('port validations', () => {
    test('should throw an error if port is not valid', () => {
        expect(() => buddyServer.start(100)).toThrow(/[A-Za-z0-9]+/g);
        buddyServer.close();
    })
    test('should not throw an error if port is valid', () => {
        expect(() => buddyServer.start(8000)).not.toThrow();
        buddyServer.close();
    })
    test('should not throw an error if port is valid', () => {
        expect(() => buddyServer.start(65530)).not.toThrow();
        buddyServer.close();
    })
})

describe('method validations', () => {
    test('should not throw an error if method is valid', () => {
        buddyServer.route({
            method: 'POST',
            path: '/api/v1/signup',
            middlewares: [],
            handler: testController
        });
        expect(() => buddyServer.start(8000)).not.toThrow();
        buddyServer.close();
    })
})

describe('path validation', () => {
    test('should not throw an error if path is valid', () => {
        buddyServer.route({
            method: 'GET',
            path: '/api/v1/user/:id',
            middlewares: [],
            handler: testController
        })
        expect(() => buddyServer.start(8000)).not.toThrow();
        buddyServer.close();
    });
})

// TODO: Add more tests
describe('url pattern', () => {
    test('should detect : [pattern] and parse the params', () => {
        buddyServer.route({
            method: 'GET',
            path: '/api/v1/user/:id',
            middlewares: [],
            handler: testController
        })
        // expect().toBe(true);
    });
})
