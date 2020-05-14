class NewController {
    constructor() {

    }

    index() {
        return 'OK'
    }

    home(req, res) {
        // TODO: Find a method to parse to json
        const searchparams = new URLSearchParams(req['params']);
        console.log(`${searchparams.get('env')}`)
        return searchparams.keys.toString()
    }

    login(req, res) {
        return req.body
    }
}

module.exports = NewController;