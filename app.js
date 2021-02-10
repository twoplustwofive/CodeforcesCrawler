const express = require("express");
const app = express();

//import routes
const authRoute = require("./routes/auth");


//import middlewares
app.use("/api/user",authRoute);

app.get("/",(req,res)=>{
    res.send("hello");
});

app.listen(3000,()=>{
    console.log("Hola, Server started!");
});