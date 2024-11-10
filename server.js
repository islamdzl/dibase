const express = require('express')
const path = require('path')
const cors = require('cors')
const web_socket = require('./modules/web_socket.js')
const http = require('http')
const app = express()
const PORT = 2007
const system = require('./modules/system.js')
const server = http.createServer(app)
const globale_varibles = require('./modules/globale_varibles.js')
system.main()

app.use(cors({ 
    origin:'*'
}))

app.use(express.static('static'))
app.get('/fonts:font',(req,res)=>{ 
    res.sendFile(path.join(__dirname, 'FILES' ,'fonts',req.params.font))
}) 
app.get('/readme',(req,res)=>{ 
    res.sendFile(path.join(__dirname,'README.md'))
}) 

globale_varibles.__SERVER = server.listen(PORT, ()=>{
        console.log(`Server started in port : ${PORT}`)
})  
web_socket(server, globale_varibles.__SERVER)


