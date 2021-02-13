const express = require("express");
const app = express();
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const cfuser = require("./routes/cfuser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const getUser = require("./routes/getUser");
//connect to db
mongoose.connect("mongodb+srv://CodeforcesCrawler:CodeforcesCrawler@cluster0.sjd8e.mongodb.net/<dbname>?retryWrites=true&w=majority",
    { useUnifiedTopology: true ,useNewUrlParser: true },
    ()=>{
        console.log("Connected to db!");
    }
);
 
//setting ejs as view engine
app.set("view engine","ejs");

//middlewares
app.use(express.json());

//cookie
app.use(cookieParser());

//route middlewares
app.use("/auth",auth);
app.use("/cfuser",cfuser);

app.get("/",(req,res)=>{
    res.render("home",{user:getUser(req)});
});

app.listen(3000,()=>{
    console.log("Hola, Server started!");
});