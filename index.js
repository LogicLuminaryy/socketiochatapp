var express = require('express');

var http = require('http');
var socket = require('socket.io');
//app setup
var app = express();




app.get('/',(resp,res,next)=>{

    res.send("this chat app")
})

var server = app.listen(3000,()=>{

    console.log("listening to the port 3000")
})


//static files

app.use(express.static('public'));

//socket setup

var io = socket(server);
io.on('connection',function(socket){
    console.log("made socket connection")
     socket.on('chat', function(data){
        io.sockets.emit('chat',data)
     })

     socket.on('typing',function(data){

        socket.broadcast.emit('typing',data)
     })
});
