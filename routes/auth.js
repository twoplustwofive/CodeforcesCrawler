const router = require("express").Router();
const User = require("../model/User");
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended:false});

router.post("/register",urlencodedParser, async(req,res)=>{
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch{
        res.status(400).send(err);
    }
});

module.exports = router;
