const WebSocket = require('ws')
const system = require('./system')
const creat_data_base = require('./operations/creat_data_base')
const admins_server = require('./admin_server')
const admins_base = require('./admin_base')

const main = (server, __SERVER)=>{
    const wss = new WebSocket.Server({server})

    wss.on('connection' , async(ws)=>{
        system.client_add(ws)
        ws.on('message' , async(message)=>{
            var data = {}
            try{
                data = JSON.parse(message.toString('utf-8')).data_base
            }catch{
                ws.send('Error Parsing yor data')
                return
            }
            console.log('new message : ', data)

            // try{
                switch (true) {
                    case (typeof data.set_speed     != 'undefined'):
                        system.set_speed(data.set_speed, ws)
                        break;
                    case (typeof data.get_speed     != 'undefined'):
                        system.get_speed(data.get_speed, ws)
                        break;
                    case (typeof data.set_domain    != 'undefined'):
                        system.set_domains(data.set_domain, ws)
                        break
                    case (typeof data.set           != 'undefined'):
                        system.set(data.set, ws)
                        break
                    case (typeof data.get           != 'undefined'):
                        system.get(data.get, ws)
                        break
                    case (typeof data.admins_base   != 'undefined'):
                        admins_base(data.admins_base, ws)
                        break;
                    case (typeof data.admins_server != 'undefined'):
                        admins_server(data.admins_server, ws)
                        break
                    case (typeof data.create_base   != 'undefined'):
                        if (require('../config/_config.json').__server.password === data.password) {
                            creat_data_base(data.create_base)
                        }
                        break
                    case (typeof data.ping          != 'undefined'):
                        ws.send(JSON.stringify({data_base:{ping:data.ping}}))
                        break
                    default:
                        break;
                }
            // }catch{
            //     console.log('skap process !!!')
            // }
        })
        ws.on('close' , ()=> {
            system.client_exit(ws)
        })
    })



} 



module.exports = main

