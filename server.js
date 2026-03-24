const express = require("express");
const {v4: uuidV4} = require("uuid");
const fs = require("fs"); //Node.js in built module file System used to read files present on the server side
const app = express();

const port = 8080;
let filedata;
let data;

try{
    filedata = fs.readFileSync("games.json","utf-8");  //reads the content from the specified path
    data = JSON.parse(filedata);
}catch{
    console.log("File not found");
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
        return ele.id == id;
    });
    console.log(ele);
    res.json(ele);
});

app.post("/games",(req,res)=>{
    let newgame = req.body;
    newgame.id = uuidV4();
    data.push(newgame);

    write(data);
    console.log(data);

    res.send("data successfully added");
});

app.patch("/games/:id",(req,res)=>{
    let {id} = req.params;
    let updatedata = req.body;

    let found = data.find((el)=>{
        return el.id == id;
    });

    Object.assign(found,updatedata);
    console.log(data);
    write(data);
    res.json(data);
});

app.delete("/games/:id",(req,res)=>{
    let {id} = req.params;

    data = data.filter((el)=>{
        return el.id != id;
    });

    write(data);
    res.json(data);

});

// GET     /games          get all games
// GET     /games/:id      get this id game
// POST    /games          add new game
// PATCH   /games/:id      update this id game
// DELETE  /games/:id      delete this id game

app.use((req,res)=>{
    res.send("You are on wrong path bro");
});

function write(input){
    try{
        fs.writeFileSync("games.json",JSON.stringify(input),"utf-8");
    }catch{
        console.log("Error file Not found");
    } 
}