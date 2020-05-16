const fs = require('fs');


const signUp = ({ request, response }) => {
    try {
        const bodyData = request.body;
        if (bodyData.password === bodyData.rememberPassword) {
            const stringBody = JSON.stringify(bodyData);
            const writeToFile = fs.appendFileSync('db.json', stringBody);
            response.json({ status: 200, result: bodyData });
        } else {
            throw Error('Passwords not Matching');
        }
    } catch (e) {
        throw e;
    }
};

module.exports = signUp;