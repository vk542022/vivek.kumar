const express = require('express');
const path = require('path');
const app = express()
const http = require('http').createServer(app)

const port = 3000 || process.env.PORT

app.use(express.static(path.join(__dirname , 'static')));

http.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})


app.get('/' , (req,res)=>{ 
    res.sendFile(__dirname + '/index.html')
})


// socket

const io = require('socket.io')(http)
io.on('connection' , (socket)=>{
    console.log("connected...")
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
})