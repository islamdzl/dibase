const path = require('path')
const files_manager_bases = require('./files_manager.class.js')
const FMC = new files_manager_bases(path.join(__dirname, '../config'))
const writr = require('./operations/write')
const readr = require('./operations/reade')

// ===================================> pabluc <===========================
const delete_client = ()=>{
    
}
const get_speed = async(data, ws)=>{
    const type = await verify_client(data, ws)
    await readr.get_speed(data, ws,)
}
const set_speed = async(data, ws)=>{
    const type = await verify_client(data, ws)
    await writr.set_speed(data, ws)
}
const set = async(data, ws)=>{
    const type = await verify_client(data, ws)
    await writr.write(data, ws,)
}
const get = async(data, ws)=>{
    const type = await verify_client(data, ws)
    await readr.read(data, ws)
}
// ===================================> pabluc <===========================
const verify_client = async(data, ws)=>{
    const system = require('./system')
    let globale_varibles = require('./globale_varibles')
    let config = require('./../config/_config.json')
    if (! config.safety[data.name] || ! globale_varibles.clients_databases[ws.id] && ! ws['not_database' + data.name]) {
        ws.send(`{"data_base":{"not_base":"${data.name}"}}`)
        ws['not_database' + data.name] = true
        return undefined
    }
    let type = globale_varibles.clients_databases[ws.id][data.name].type
    if ((typeof type != 'string') || ! (typeof data.password != 'string')) {
        await system.set_type_domain(data, ws)
        type = globale_varibles.clients_databases[ws.id][data.name].type
        if (! type) {
            return 
        }
    }
}
// ============================> Domains set <===========================================

const set_domains = (data, ws)=>{
    let globale_varibles = require('./globale_varibles')
    console.log('set domain', data.id)
    ws.id = data.id
    data.domains.forEach((domain)=>{
        if (! globale_varibles.clients_databases[ws.id]) {
            globale_varibles.clients_databases[ws.id] = {}
        }
        if (! globale_varibles.databases_clients[domain.name]) { 
            globale_varibles.databases_clients[domain.name] = {}
        }                       // WRITR / READR
        globale_varibles.clients_databases[data.id][domain.name] = {client: ws, password:domain.password, type: undefined}
        globale_varibles.databases_clients[domain.name][data.id] = {client: ws, password:domain.password, type: undefined}
    })
}

const set_type_domain = async(data, ws)=>{
    let globale_varibles = require('./globale_varibles')
    let config = require('../config/_config.json')
    let base = data.password ? data : globale_varibles.clients_databases[ws.id][data.name]
    if (base.password === config.safety[data.name].password || base.password === config.safety[data.name].read_password) {
        let type = base.password === config.safety[data.name].password ? "WRITR" : base.password === config.safety[data.name].read_password ? "READR" : undefined
        if (! type) {
            // ws.send() not data base
            console.log('not database get')
            return false
        }
        if (! Object.keys(config.safety[data.name].clients).filter((id)=> id == ws.id).length) {
            config.safety[data.name].clients[ws.id] = {id: ws.id, _id: ws._id, type:type}
            FMC.update_file('_config', config)
        }
        globale_varibles.clients_databases[ws.id][data.name].type = type
        globale_varibles.databases_clients[data.name][ws.id].type = type
        console.log(ws.id, data.name, type)
    }
}

// ============================> Group speed <===========================================

const add_to_group_speed = (base_speed_name, add_void )=>{
    let default_config = require('../config/default.json')
    let globale_varibles = require('./globale_varibles')
    if (require(`../BASES/${base_speed_name}.json`)[default_config.location_save_group_speed_on_database] && ! add_void) {
        globale_varibles.groups_speeds[base_speed_name] = require(`../BASES/${base_speed_name}.json`)._cloud_group_speed
        return
    } // _cloud_group_speed
    globale_varibles.groups_speeds[base_speed_name] = {}
}

const cloud_group_speed = async(base_name, _data)=>{
    let group_speed_data = require('./globale_varibles').groups_speeds[base_name]
    if (_data) {
        await writr.cloud_group_speed(base_name, _data)
        return
    }
    await writr.cloud_group_speed(base_name, group_speed_data)
}

const remove_from_group_speed = (base_speed_name)=>{
    let globale_varibles = require('./globale_varibles')
    delete globale_varibles.groups_speeds[base_speed_name]
}

// ============================> Others Finctions <===========================================

const formate = async(password)=>{
    const files_manager =  require('./files_manager.class')
    const globale_varibles =  require('./globale_varibles')
    const FMC = new files_manager(path.join(__dirname, '../config'))
    const FMB = new files_manager(path.join(__dirname, '../BASES'))
    const { exec } = require('child_process')
    let   default_config = require('../config/default.json')
    if (password) {
        default_config.config.__server.password = password
    }
    return new Promise(async(resolve)=>{
        await FMB.clear_all((filename)=>{
            console.log('deleted file', filename)
        })
        await FMC.delete_file('_config')
        await FMC.create_file('_config')
        await FMC.update_file('_config', default_config.config)
        .then(()=>{
        resolve(true)
        })
        globale_varibles.__SERVER.close(()=>{
            setTimeout(()=>{
                exec(`node ${path.join(__dirname, '../server.js')}`, (error, stdout, stderr)=>{
                    console.log(stdout)
                    console.log('RE boote')
                    if (error) {
                        console.log('ERR reboot')
                        return
                    }
                    console.log(stderr)
                }) 
            }, 100)
        })
    })
}

const client_exit = ( ws )=>{
    const globale_varibles =  require('./globale_varibles')
    if (ws.id && globale_varibles.clients_databases[ws.id]) {
        const client_bases = Object.keys(globale_varibles.clients_databases[ws.id])
        client_bases.forEach(( base_name )=>{
            delete globale_varibles.databases_clients[base_name][ws.id]
            if (globale_varibles.admins_ws.bases[base_name]) {
                if (globale_varibles.admins_ws.bases[base_name][ws.id]) {
                    delete globale_varibles.admins_ws.bases[base_name][ws.id]
                }
            }
        })
        delete globale_varibles.clients_databases[ws.id]
        if (globale_varibles.admins_ws.server[ws.id]) {
            delete globale_varibles.admins_ws.server[ws.id]
        }    
    }
    delete globale_varibles.all_clients[ws._id]
}
const client_add    = (ws)=>{
    const config = require('../config/_config.json')
    let GB = require('./globale_varibles')
    ws._id = String(Math.floor(Math.random()*100000000))
    if (! GB.ban[ws._id]) {
        GB.ban[ws._id] = {ban :false, attempts: config.__server.password_attempts}
        GB.all_clients[ws._id] = ws
    }
}
const fix_length = (string, length, char, margin)=>{
    let ruselt = margin ? " " : ""
    for (let i = 0; i < length; i++) {
        ruselt += string[i] ? string[i] : char
    }
    ruselt += margin ? " " : ""
    return ruselt
}
// ============================> Main Function <===========================================

const main = async()=>{
    try{ require('../config/_config.json')}catch{ await FMC.create_file('_config', require('../config/default.json').config)}
    const globale_varibles =  require('./globale_varibles')
    let config = require('../config/_config.json')
    let bases_keys = Object.keys(config.safety)
        for (let i = 0; i < bases_keys.length; i++) {
            let key = bases_keys[i]
            let BASE = config.safety[key]
        if (BASE.type === "speed") {
            add_to_group_speed(key)
            console.log('Aded', fix_length(key, 10, ' '), 'to group speed')
        }
    }

}
// ================================> End <================================================
module.exports = {
        set_speed, 
        get_speed, 
        set,
        get,
        client_add, 
        delete_client, 
        set_domains, 
        set_type_domain,
        main,
        cloud_group_speed,
        client_exit,
        verify_client,
        formate
    }
