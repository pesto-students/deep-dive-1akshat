const userInfo = ({request,response}) => {
console.log("userInfo")
response.json({status:200,result:"OK"})

};

module.exports = userInfo;