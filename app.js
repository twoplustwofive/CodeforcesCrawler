const express = require("express");
const app = express();
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const cfuser = require("./routes/cfuser");


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

//route middlewares
app.use("/api/user",auth);
app.use("/cfuser",cfuser);

app.get("/",(req,res)=>{
    res.render("home");
});

app.listen(3000,()=>{
    console.log("Hola, Server started!");
});