
/* 
            data_base_clients : {
                ALL:[ws.id, ws.id, ws.id],
                databasename:[{ws.id, ws},{ws.id, ws}...]
            }
*/
const WebSocket = require('ws')
const file_system = require('./file_system')
var clients_and_info = {}
var data_base_clients = {} // {"database name":[{'ws.id':ws}]}
var clients_err_password = {}
var ws_block = {}
var __RIN = true
var admins_ws ={server:[],bases:{}}
var time = 0
setInterval(() => {
    time = time + 5
}, 5000);
const main = (server)=>{
    const wss = new WebSocket.Server({server})

    wss.on('connection' , async(ws)=>{
        console.log('new client')
        ws.on('message' , async(message)=>{
            const data = JSON.parse(message.toString('utf-8')).data_base
            const confige = require('../DATA/_confige.json')
            // console.log('new message : ', data)
            if (!ws._id) {
                ws._id = String(Math.floor(Math.random()*100000000))
            }
            if (!ws_block[ws._id]) {
                ws_block[ws._id] = {band :false, attempts: confige.__server.password_attempts}
            }
            try{
                switch (true) {
                    case (typeof data.set != 'undefined'):
                        let CAIS = clients_and_info[ws.id]
                        if (__RIN && confige.safety[data.set.data_base].rin_state && CAIS[data.set.data_base] == confige.safety[data.set.data_base].password && data_base_clients[data.set.data_base]) {
                                data_base_clients[data.set.data_base].forEach((client)=>{
                                    console.log('send To >>', client.id)
                                    if (client.id != ws.id) {
                                        client.send(JSON.stringify({_data_base:{name:data.set.data_base,data:data.set.data}}));
                                    } 
                                })
                                file_system.update({file_name:data.set.data_base, data:data.set.data})
                        }
                    break;
                    case (typeof data.get != 'undefined'):
                        let CAIG = clients_and_info[ws.id]
                        if (__RIN && confige.safety[data.get.data_base].rin_state  &&  CAIG[data.get.data_base] == confige.safety[data.get.data_base].password || CAIG[data.get.data_base] == confige.safety[data.get.data_base].read_password) {
                            if (confige.safety[data.get.data_base]) {
                                ws.send(JSON.stringify({
                                    data_base:{
                                        get:{
                                            name:data.get.data_base,
                                            data:require('../DATA/' + data.get.data_base)
                                        }
                                    }
                                }))
                            }
                        }
                        if (confige.safety[data.get.data_base] && data.get.password == confige.safety[data.get.data_base].password) {
                            ws.send(JSON.stringify({
                                data_base:{
                                    get:{
                                        name:data.get.data_base,
                                        data:require('../DATA/' + data.get.data_base)
                                    }
                                }
                            }))
                        }
                        break;
                    case (typeof data.admins_server != 'undefined'):
                        await ADMINS_SERVER(data.admins_server, ws)
                        break;
                    case (typeof data.admins_base != 'undefined'):
                        await ADMINS_BASE(data.admins_base, ws)
                        break;
                    case (typeof data.set_domain != 'undefined'):
                        ws.id = data.set_domain.id
                        console.log('id : ',data.set_domain.id)
                        let _DOMINS = {}
                        if (ws.diclar) {
                            return
                        }
                        data.set_domain.domains.forEach(async(element)=>{
                            if (confige.safety[element.name]) {
                                    if (element.password == confige.safety[element.name].password || element.password == confige.safety[element.name].read_password) {
                                    let add_client = confige.safety[element.name].clients.some(client => client == ws.id)
                                    console.log(!add_client)
                                    if (! add_client) {
                                        console.log('ssssssssss')
                                        let EDconfige = confige
                                        EDconfige.safety[element.name].clients.unshift(ws.id)
                                        await file_system.update({file_name:'_confige',data:EDconfige})
                                    }else{console.log('error in add domain to ws client')}
                                    _DOMINS[element.name] = element.password
                                    if (!data_base_clients[element.name]) {
                                        data_base_clients[element.name] = []
                                    }
                                    /* 
                                    data_base_clients : {
                                        ALL:[ws.id, ws.id, ws.id],
                                        databasename:[]
                                    }
                                    */
                                data_base_clients[element.name].unshift(ws)  
                                }
                            }
                        })
                        if (!data_base_clients['ALL']) {
                            data_base_clients['ALL'] = []
                        }
                        data_base_clients['ALL'].unshift(ws.id) // add ws.id in data_base_clients 'ALL'
                        clients_and_info[data.set_domain.id] = _DOMINS
                        ws.diclar = true
                        break
                    case (typeof data.create_base != 'undefined'):
                        if (data.password === confige.__server.password) {
                            await creat_data_base(data.create_base)
                            resend(ws,'server')
                        }
                        break
                    case (typeof data.ping != 'undefined'):
                        ws.send(JSON.stringify({data_base:{ping:data.ping}}))
                        break
                    default:
                        break;
                }
            }catch{}
        })
        ws.on('close' , ()=> {
            ws.diclar = false
            try{
                let keys = Object.keys(clients_and_info[ws.id])
                keys.forEach((base_name)=>{
                    data_base_clients[base_name] = data_base_clients[base_name].filter((item)=>item.id !== ws.id)
                }) 
                delete clients_and_info[ws.id]
                data_base_clients['ALL'] = data_base_clients['ALL'].filter((item)=>item !== ws.id)
            }catch{}
            console.log('client disconnect : ' ,ws.id)
        })
    })
    const ADMINS_BASE = async(data, ws)=>{
        let confige = require('../DATA/_confige.json')
        let EDconfige = confige
        if (! admins_ws.bases[data.base]) {
            admins_ws.bases[data.base] = []
        }
        if (! admins_ws.bases[data.base].some((client)=> client.id == ws.id)) {
            admins_ws.bases[data.base].unshift(ws)
        }
        switch (true) {
            case (typeof data.exec.re_password != 'undefined'):
                if (data.password === confige.safety[data.base].password){
                    EDconfige.safety[data.base].password = data.exec.re_password.password
                    EDconfige.safety[data.base].read_password = data.exec.re_password.read_password
                    await file_system.update({file_name:'_confige',data:EDconfige})
                    .then(()=>resend(ws, data.base))
                }
                
                break;
            case (typeof data.exec.rin_state != 'undefined'):
                if (data.exec.rin_state == confige.safety[data.base].rin_state) {
                    return
                }
                if (data.password === confige.safety[data.base].password) {
                    EDconfige.safety[data.base].rin_state = data.exec.rin_state
                    await file_system.update({file_name:'_confige',data:EDconfige})
                    .then(()=>resend(ws, data.base))
                }
                break;
            case (typeof data.exec.delete_base != 'undefined'):
                if (confige.safety[data.base]) {
                    if (data.password === confige.safety[data.base].password) {
                        if (data.exec.delete_base === confige.safety[data.base].password) {
                            delete EDconfige.safety[data.base]
                            delete data_base_clients[data.base]
                            EDconfige.data_bases = confige.data_bases.filter(item => item !== data.base)
                            await file_system.update({file_name:'_confige',data:confige})
                            await file_system.clear(data.base)
                            .then(()=>resend(ws, data.base))
                        }
                    }
                }
                break; 
            case (typeof data.exec.formate != 'undefined'):
                if (data.password === confige.safety[data.base].password) {
                    if (data.exec.formate === confige.safety[data.base].password) {
                        await file_system.update({file_name:data.base,data:{}})
                        .then(()=>resend(ws, data.base))
                    }
                }
                break; 
            default:
                if (confige.safety[data.base]) {
                    if (data.password == confige.safety[data.base].password) {
                        ws.send(JSON.stringify({
                            login:true,
                            type:'data_base'
                        }))
                        resend(ws, data.base)
                    }else{
                        ws.send(JSON.stringify({
                            login:false,
                            type:'data_base'
                        }))
                    }
                }else{
                    ws.send(JSON.stringify({
                        login:false,
                        type:'data_base'
                    }))
                }
                break;
        }
    }
    const ADMINS_SERVER = async(data, ws)=>{
        let confige = require('../DATA/_confige.json')
        if (! admins_ws.server.some((client)=>client.id == ws.id)) {
            admins_ws.server.unshift(ws)
        }
        if (typeof clients_err_password[ws] !== 'object') { 
            clients_err_password[ws]= {attempts:0,band:false}       
        }
        if (data.password === confige.__server.password && ! clients_err_password[ws].band) {
            if (data.exec) {
                    let EDconfige = confige
                    switch (true) {
                    case (typeof data.exec.re_password != 'undefined'):
                        EDconfige.__server.password = data.exec.re_password
                        await file_system.update({file_name:'_confige',data:confige})
                        .then(async()=>await resend(ws,'server'))
                        break;
                    case (typeof data.exec.rin_state != 'undefined'):
                        __RIN = data.exec.rin_state
                        await resend(ws,'server')
                        break;
                    case (typeof data.exec.create_base != 'undefined'):
                        await creat_data_base(data.exec.create_base)
                        .then(async()=>await resend(ws,'server'))
                        break;
                    case (typeof data.exec.delete_base != 'undefined'):
                        delete EDconfige.safety[data.exec.delete_base]
                        EDconfige.data_bases = confige.data_bases.filter(item => item !== data.exec.delete_base)
                        await file_system.update({file_name:'_confige',data:confige})
                        await file_system.clear(data.exec.delete_base)
                        .then(async()=>await resend(ws,'server'))
                        break
                    case (typeof data.exec.formate != 'undefined'):
                        await formate(data.exec.formate)
                        .then(async()=>await resend(ws,'server'))
                        
                        break
                    default:
                        ws.send(JSON.stringify({
                            login:true,
                            type:'server'
                        }))
                        await resend(ws, 'server')
                        break;
                }
            }else{
                admins_ws.unshift(ws) 
                ws.send(JSON.stringify({
                    login:false
                }))
            }
        }else{
            ws.send(JSON.stringify({
                login:false,
                type:'server'
            }))
            clients_err_password[ws].attempts = clients_err_password[ws].attempts + 1
            if (confige.__server.password_attempts <= clients_err_password[ws].attempts) {
                clients_err_password[ws].band = true
                console.log('BAN ***')
            }
        }
    }

} 
const resend = async(ws, type)=> {
    let confige = require('../DATA/_confige.json')
    if (type == 'server'){
        let files_size = {}
        for (let z = 0; z < confige.data_bases.length; z++) {
            files_size[confige.data_bases[z]] = await file_system.size(confige.data_bases[z])
        }
        admins_ws.server.forEach((client)=>{
            client.send(JSON.stringify({ 
                type:"server",
                time:time,
                clients_and_info:clients_and_info,
                data_base_clients:data_base_clients,
                confige:confige,
                rin:__RIN,
                files_size:files_size
            })) 
        })
    }if (type == 'error') {
        ws.send(JSON.stringify({
            type:"error",
        }))
    }else{
        admins_ws.bases[type].forEach((client)=>{
            client.send(JSON.stringify({ 
                type:"base",
                time:time,
                confige_base:confige.safety[type],
                clients:data_base_clients[type] || [],
            }))  
        })
    }
}
const creat_data_base = async(data)=>{ // < create base parametr
    let confige = require('../DATA/_confige.json')
    let L = false
    confige.data_bases.forEach(data_bases_name => {
        if(data_bases_name == data.name) {
            L = true
            return false
        }
    });         
    if (!L || !confige.data_bases) {
        confige.data_bases.push(data.name)
        confige.safety[data.name] = {
            password:data.password,
            read_password:data.read_password,
            name:data.name,
            rin_state:true,
            clients:[]
        }
        await file_system.update({file_name:'_confige', data:confige})
        return await file_system.create(data.name)
    }
}
const formate = async(password)=>{
    difolte_confige = {
        __server:{
            password:"12345678" ,
            password_attempts:3
        },
        data_bases:[],
        safety:{}
    }
    if (password != '') {
        difolte_confige .__server.password = password
    }
    await file_system.clear('all')
    await file_system.create('_confige')
    await file_system.update({file_name:'_confige',data:difolte_confige})
    .then(()=>{
        return true
    })
    


}
module.exports = main

