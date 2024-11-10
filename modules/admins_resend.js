const path = require('path')
const files_manager_bases = require('./files_manager.class.js')
const FMB = new files_manager_bases(path.join(__dirname, '../BASES'))
const resend = async(ws, type)=> {
    const config = require('../config/_config.json')
    const globale_varibles = require('./globale_varibles')

    if (type == 'server'){
        let files_size = {}
        for (let z = 0; z < config.data_bases.length; z++) {
            files_size[config.data_bases[z]] = {}
            files_size[config.data_bases[z]].default = await FMB.size_file(config.data_bases[z])
            if (globale_varibles.groups_speeds[config.data_bases[z]]) {
                files_size[config.data_bases[z]].speed = JSON.stringify(globale_varibles.groups_speeds[config.data_bases[z]]).length
            }
        }
        Object.values(globale_varibles.admins_ws.server).forEach((client)=>{
            client.send(JSON.stringify({ 
                type:"server",
                time:globale_varibles.time,
                clients_databases:{ ...globale_varibles.clients_databases, all_clients: globale_varibles.all_clients}, 
                databases_clients:globale_varibles.databases_clients,
                config:config,
                rin_state:globale_varibles.rin_state,
                files_size:files_size
            })) 
        })
        return
    }else if (type == 'error') {
        ws.send(JSON.stringify({
            type:"error",
        }))
        return
    }else{
        Object.values(globale_varibles.admins_ws.bases[type]).forEach((client)=>{
            client.send(JSON.stringify({ 
                type:"base",
                name:type,
                time:globale_varibles.time,
                config_base:config.safety[type],
                clients:globale_varibles.databases_clients[type] || {},
            }))  
        })
    }
}
module.exports = resend