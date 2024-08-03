const express = require("express")
const colors = require("colors")
const dotenv = require("dotenv").config()
const morgan = require("morgan")
const path = require("path");
const products=require("./utility/productdata.json");
const rootroute =require("./routes/rootroutes.js");
const productroute= require("./routes/productroutes.js")

const app = express();
const PORT = 8080 ;

 
app.use(morgan("dev"));
app.use(express.json());       //whenever app.use it means u are writing middlewares

app.use(express.static(path.resolve(__dirname,'./public')))
// localhost : 8000
const data = [
    {
        name:"a",
        age:1
    },
    {
        name:"b",
        age:2
    },
    {
        name:"c",
        age:3
    },
    {
        name:"d",
        age:4
    },
    {
        name:"e",
        age:5
    }
]
app.get('/',(req,res)=>{
    res.send("<h1>Hello world written on root</h1>")
    console.log("latte pe chale")
});
app.get('/users',(req,res)=>{
    res.send(data);
    console.log("changed console message")
});
app.get('/users/greaterthan20',(req,res)=>{
    const greaterthan20=data.filter((user)=>user.age>20)
    res.send(greaterthan20)
    console.log("hi")
    
})

app.get('/home',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./public","page.html"));
});

app.get('/stopwatch',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./public","stopwatch.html"));
    console.log("stopwatch page opened")
});
// app.get('/products',(req,res)=>{
    //     res.send(products)
    // })
    
app.use('/',rootroute)
app.use('/products',productroute)


//server creation
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`.yellow)
})