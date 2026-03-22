const express = require("express");
// const {v4: uuidV4} = require("uuid");
const fs = require("fs"); //Node.js in built module file System used to read files present on the server side
const app = express();

const port = 8080;
let dataFile;
let data;
try{
    dataFile = fs.readFileSync("./games.json","utf-8");  //reads the content from the specified path
    data = JSON.parse(dataFile);
}catch{
    console.log("File not found");
}

// app.use(express.json());

app.listen(port,()=>{
    console.log("Server is started");
});

app.get("/games",(req,res)=>{
    res.json(data);
    console.log(data);
});

app.get("/games/:id",(req,res)=>{
    let {id} = req.params;
    let ele = data.find((ele)=>{
        return ele.id == Number(id);
    });
    console.log(ele);
    res.json(ele);
});


// GET     /games          get all games
// GET     /games/:id      get this id game
// POST    /games          add new game
// PATCH   /games/:id      update this id game
// DELETE  /games/:id      delete this id game

app.use((req,res)=>{
    res.send("You are on wrong path bro");
});
