const router = require("express").Router();
const User = require("../model/User");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended:false});
const getUser = require("./getUser");
router.post("/info",urlencodedParser, async(req,res)=>{
    var url = "https://codeforces.com/api/user.info?handles="+req.body.username;
    try{
        var response = await fetch(url);
        var json = await response.json();
        if(response.status!="200"){
            res.render("400",{error:"No profile with username "+req.body.username,user:getUser(req)});
            return;
        }
        console.log(response.status);
        console.log(json.result[0].firstName);
        res.render("cfuserprofile",{user:getUser(req),data:json.result[0]});
        return;
    }
    catch(err){
        res.send("error");
        console.log(err.message);
    }
});

module.exports = router;
