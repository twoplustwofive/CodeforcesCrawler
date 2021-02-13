const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");


module.exports = (req)=>{
    const token = req.cookies.auth_token;
    // console.log(token);
    if(token===undefined){
        return undefined;
    }
    
    const decoded_token = jwt.verify(token,"CodeforcesCrawler");
    return decoded_token;
}