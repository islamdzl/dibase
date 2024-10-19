
/* 
            data_base_clients : {
                ALL:[ws.id, ws.id, ws.id],
                databasename:[{ws.id, ws},{ws.id, ws}...]
            }

            clients_and_info[ws.id] = {R:{ basename:true },W:{}}
*/
const WebSocket = require('ws')
const file_system = require('./file_system')
const prcess_data = require('./process_data')
const {exec} = require('child_process')
const path = require('path')
const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream');
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
const main = (server, __SERVER)=>{
    const wss = new WebSocket.Server({server})
    wss.on('connection' , async(ws)=>{
        console.log('new client')
        ws.on('message' , async(message)=>{
            // delete require.cache[require.resolve('../DATA/_confige.json')]
            const confige = require('../DATA/_confige.json')
            var data = {}
            try{
                data = JSON.parse(message.toString('utf-8')).data_base
            }catch{
                ws.send('Error Parsing yor data')
                return
            }
            // console.log('new message : ', data)
            if (!ws._id) {
                ws._id = String(Math.floor(Math.random()*100000000))
            }
            if (!ws_block[ws._id]) {
                ws_block[ws._id] = {band :false, attempts: confige.__server.password_attempts}
            }
            // try{
                let CAIS = clients_and_info[ws.id]
                switch (true) {
                    case (typeof data.set != 'undefined'):
                        if (! confige.safety[data.set.data_base]) {
                            return
                        }
                        if (__RIN && confige.safety[data.set.data_base].rin_state && CAIS.W[data.set.data_base] == true) {
                            if (data.set.path || data.set.setpath) {
                                let DATA_ = await prcess_data.set({dataA:require('../DATA/' + data.set.data_base),dataB:data.set.data,paths:{path:data.set.path, setpath:data.set.setpath}, wss:data_base_clients[data.set.data_base],base_name:data.set.data_base,clear_end:data.set.clear_end, wsid:ws.id})
                                await file_system.update({file_name:data.set.data_base,data:DATA_})
                                return
                            }
                                data_base_clients[data.set.data_base].forEach((client)=>{
                                    console.log('Send To >>', client.id)
                                    if (true) {
                                        client.send(JSON.stringify({data_base:{get:{name:data.set.data_base,data:data.set.data}}}));
                                    } 
                                })
                                await file_system.update({file_name:data.set.data_base, data:data.set.data})
                        }
                    break;
                    case (typeof data.get != 'undefined'):
                        if (! confige.safety[data.get.name]) {
                            ws.send(`"{data_base":{"not_base":"${data.get.name}"}}`)
                            return
                        }
                        if (__RIN && confige.safety[data.get.name].rin_state && CAIS.W[data.get.name] == true || CAIS.R[data.get.name] == true) {
                            if (data.get.path) {
                                let DATA_ = await prcess_data.get({dataA:require('../DATA/' + data.get.name),path:data.get.path})
                                ws.send(JSON.stringify({
                                    data_base:{
                                        get:{
                                            name:data.get.name,
                                            data:DATA_
                                        }
                                    }
                                }))
                                return
                            }
                            delete require.cache[require.resolve('../DATA/' + data.get.name)]
                            let all_data = await require('../DATA/' + data.get.name)
                            ws.send(JSON.stringify({
                                data_base:{
                                    get:{
                                        name:data.get.name,
                                        data:all_data
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
                        let domain_bases = []
                        if (ws.diclar) {
                            return
                        }
                        if (!clients_and_info[ws.id]) {
                            clients_and_info[ws.id] = {R:{},W:{},domains:[]}
                        }
                        data.set_domain.domains.forEach(async(element)=>{
                            if (confige.safety[element.name]) {
                                    if (element.password == confige.safety[element.name].password || element.password == confige.safety[element.name].read_password) {
                                        domain_bases.unshift(element.name)
                                    let add_client = confige.safety[element.name].clients.some(client => client == ws.id)
                                    if (! add_client) {
                                        let EDconfige = confige
                                        EDconfige.safety[element.name].clients.unshift(ws.id)
                                        await file_system.update({file_name:'_confige',data:EDconfige})
                                    }
                                    if (!data_base_clients[element.name]) {
                                        data_base_clients[element.name] = []
                                    }
                                    if (element.password == confige.safety[element.name].password) {
                                        clients_and_info[ws.id].R[element.name] = true
                                        clients_and_info[ws.id].W[element.name] = true
                                    }else{
                                        clients_and_info[ws.id].R[element.name] = true
                                    }
                                    /* 
                                    data_base_clients : {
                                        ALL:[ws.id, ws.id, ws.id],
                                        ws.id : databasename:database
                                    }
                                    */
                                    data_base_clients[element.name].unshift(ws)  
                                }
                            }
                        })
                        clients_and_info[ws.id].domains = domain_bases
                        if (!data_base_clients['ALL']) {
                            data_base_clients['ALL'] = []
                        }
                        data_base_clients['ALL'].unshift(ws.id) // add ws.id in data_base_clients 'ALL'
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
            // }catch{
            //     console.log('skap process !!!')
            // }
        })
        ws.on('close' , ()=> {
            ws.diclar = false
            clients_and_info[ws.id].domains.forEach((base_name)=>{
                data_base_clients[base_name] = data_base_clients[base_name].filter((item)=>item.id !== ws.id)
            }) 
            data_base_clients['ALL'] = data_base_clients['ALL'].filter((item)=>item !== ws.id)
            delete clients_and_info[ws.id]
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
        delete require.cache[require.resolve('../DATA/_confige.json')]
        let confige = require('../DATA/_confige.json')
        if (! data.no_admin) {
            if (! admins_ws.server.some((client)=>client.id == ws.id)) {
                admins_ws.server.unshift(ws)
            }
        }
        if ( ! clients_err_password[ws.id]) { 
            clients_err_password[ws.id]= {attempts:0,band:false}       
        }
        if (data.password == confige.__server.password && ! clients_err_password[ws.id].band) {
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
                        .then(async()=> {
                            await resend(ws,'server')
                            ws.send('{"creat_base":"'+data.exec.create_base.name+'"}')
                        })
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
                        console.log('FORMATE')
                        __SERVER.close(()=>{
                            exec('node server.js',(err, stdout, stderr)=>{
                                if (err) {
                                    console.log('ERR reboot')
                                    return
                                }
                                console.log('RE boote')
                                    console.log(stdout)
                                    console.log(stderr)
                                }) 
                            })
                        break
                    case (typeof data.exec.download != 'undefined'):
                        const zipDirectory = (sourceDir, outPath)=>{
                            const output = fs.createWriteStream(outPath);
                            const archive = zlib.createGzip();
                            
                            const stream = fs.createReadStream(sourceDir);
                        
                            pipeline(stream, archive, output, (err) => {
                                if (err) {
                                    console.error('Failed to compress directory:', err);
                                } else {
                                    console.log('Directory compressed successfully');
                                }
                            });
                        }
                        let sourceDir = `../DATA/${data.exec.download}.json`;
                        const outPath = `../TEMPS/${data.exec.download}.zip`;
                        if (data.exec.download == 'module') {
                            sourceDir = '../MODULE'
                        }
                        zipDirectory(sourceDir, outPath);
                        ws.send(JSON.stringify({
                            data_base:{
                                file:{
                                    name:data.exec.download,
                                    data:fs.readFile(outPath)
                                }
                            }
                        }))
                        break
                    default:
                        ws.send(JSON.stringify({
                            login:true,
                            type:'server'
                        }))
                        await resend(ws, 'server')
                        break;
                }
            }
        }else{
            ws.send(JSON.stringify({
                login:false,
                type:'server'
            }))
            clients_err_password[ws.id].attempts = clients_err_password[ws.id].attempts + 1
            if (confige.__server.password_attempts <= clients_err_password[ws.id].attempts) {
                clients_err_password[ws.id].band = true
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
    }else if (type == 'error') {
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

