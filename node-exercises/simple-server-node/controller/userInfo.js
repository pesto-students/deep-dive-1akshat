const userInfo = ({ request, response }) => {
    response.json({ status: 200, result: 'OK' });
};

module.exports = userInfo;