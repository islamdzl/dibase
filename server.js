const express = require('express')
const path = require('path')
const cors = require('cors')
const web_socket = require('./modules/web_socket.js')
const http = require('http')
const app = express()
const PORT = 2007
const server = http.createServer(app)

app.use(cors({ 
    origin:'*'
}))
app.use(express.static('FILES'))
app.get('/fonts:font',(req,res)=>{ 
    res.sendFile(path.join(__dirname, 'FILES' ,'fonts',req.params.font))
}) 
app.get('/readme',(req,res)=>{ 
    res.sendFile(path.join(__dirname,'README.md'))
}) 
const __SERVER = server.listen(PORT, ()=>{
     console.log(`Server started in port : ${PORT}`)
})  
web_socket(server, __SERVER)

