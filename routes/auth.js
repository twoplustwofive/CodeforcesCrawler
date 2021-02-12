const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
var urlencodedParser = bodyParser.urlencoded({extended:false});
const User = require("../model/User")

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
    catch(err){
        res.status(400).send(err);
    }
});

router.get("/accounts",(req,res)=>{
    res.render("accounts");
});

module.exports = router;