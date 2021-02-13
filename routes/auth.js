const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
var urlencodedParser = bodyParser.urlencoded({extended:false});
const User = require("../model/User");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const getUser = require("./getUser");
const schema = Joi.object(
    {
        name: Joi.string().min(1).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
        confirm_password: Joi.string().min(6).required()
    }
)

router.get("/register",(req,res)=>{
    if(getUser(req)){
        res.redirect("/");
    }
    res.render("register",{user:undefined});
});

router.get("/login",(req,res)=>{
    if(getUser(req)){
        res.redirect("/");
    }
    res.render("auth",{user:undefined});
});

router.post("/register",urlencodedParser, async(req,res)=>{

    if(getUser(req)){
        res.redirect("/");
    }

    //validating
    const validationError = schema.validate(req.body).error;
    if(validationError){
        res.render("400",{error: validationError.details[0].message});
        return;
    }
    if(req.body.password!=req.body.confirm_password){
        res.render("400",{error: "Passwords must match"});
        return;        
    }

    //check if email already used
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist){
        res.render("400",{error: "Email is already used, use different email."});
        return;
    }

    //adding new user into the database
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try{
        const savedUser = await user.save();
        const token = jwt.sign(user.toJSON(),"CodeforcesCrawler");
        res.cookie('auth_token',token);
        res.redirect('/');
    
    }
    catch(err){
        res.status(400).send(err);
    }
});

router.post("/login",urlencodedParser,async(req,res)=>{

    if(getUser(req)){
        res.redirect("/");
    }

    //get user object with given email from db
    const user = await User.findOne({email:req.body.email});

    //checking if user doesn't exists
    if(!user){
        res.render("400",{error:"Email is incorrect!"});
        return;
    }

    if(user.password!=req.body.password){
        res.render("400",{user:undefined,error:"Password is incorrect!"});
        return;    
    }

    //Create and assign a token
    const token = jwt.sign(user.toJSON(),"CodeforcesCrawler");
    res.cookie('auth_token',token);
    res.redirect('/');

});

router.get("/logout",(req,res)=>{
    res.clearCookie("auth_token");
    res.redirect('/');
});

module.exports = router;