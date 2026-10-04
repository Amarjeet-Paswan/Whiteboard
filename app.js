const express = require("express");
const { Server } = require("ws");
const app = express();
const ws = require('ws');
const wss = new Server({port:5000});

wss.on('connection',(socket)=>{
    console.log("New client connected to the server");
    socket.onmessage = (message)=>{
        wss.clients.forEach(client=>{
            if(client!=socket){
                client.send(message.data);
            }
        })
    }
});

app.set("view engine","ejs");

app.use(express.static("images"));
app.get("/",(req,res)=>{
    res.render("client.ejs");
});
app.get("/admin",(req,res)=>{
    res.render("admin.ejs");
});

const PORT = 3000;
app.listen(PORT,(error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log(`Server is running of port:${PORT}`);
    }
})