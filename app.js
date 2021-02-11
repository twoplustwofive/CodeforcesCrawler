const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const auth = require("./routes/auth");
//connect to db
mongoose.connect("mongodb+srv://CodeforcesCrawler:CodeforcesCrawler@cluster0.sjd8e.mongodb.net/<dbname>?retryWrites=true&w=majority",
    { useUnifiedTopology: true ,useNewUrlParser: true },
    ()=>{
        console.log("Connected to db!");
    }
);
//middlewares
app.use(express.json());

//route middlewares
app.use("/api/user",auth);

app.listen(3000,()=>{
    console.log("Hola, Server started!");
});