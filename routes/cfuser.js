const router = require("express").Router();
const User = require("../model/User");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended:false});

router.post("/info",urlencodedParser, async(req,res)=>{
    var url = "https://codeforces.com/api/user.info?handles="+req.body.username;
    try{
        var response = await fetch(url);
        var json = await response.json();
        console.log(json.result);
        res.send(json.result);
    }
    catch(err){
        res.send(err);
        console.log(err.message);
    }
});

module.exports = router;
