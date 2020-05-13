class BaseController {

    '/' = () => {
        return "200: I am / Page"
    }

    home = () => {
        return "200: I am Home Page";
    }

    blog = () => {
        return "200: I am Blog Page";
    }

    login = () => {
        return "error";
    }
}

module.exports = BaseController;