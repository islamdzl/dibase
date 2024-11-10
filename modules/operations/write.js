const path = require('path')
const files_manager_bases_class = require('../files_manager.class.js')
const FMB = new files_manager_bases_class(path.join(__dirname, '../../BASES')) 
const processng_data = require('./processng_data')
const { clear } = require('console')
/*
data = data_base.set
v
const write = (data, ws)=>{
    _____________________________________________
    
data = {
    name,
    data: {}
    path : []
    creat_path:  if not path creating new path => []
    clear_end: true/false
    not_save: true/false
    resend_me: true/false
        }
*/
const write = async(data, ws)=>{
    const globale_varibles = require('../globale_varibles.js')
    const type = globale_varibles.clients_databases[ws.id][data.name].type
    if (type == "WRITR") {
        let arr_client = Object.values(globale_varibles.databases_clients[data.name])
        if (! data.not_save) { // if true  == save data
            // console.log('A',  await require(`../../BASES/${data.name}.json`))
            const new_data = await processng_data.processng(data)
            if (new_data) {
                await FMB.update_file(data.name, new_data) 
            }
            // console.log('B',  await require(`../../BASES/${data.name}.json`))
        }
        for (let i = 0; i < arr_client.length; i++) {
            if (! data.resend_me && arr_client[i].client.id == ws.id) {
                if (arr_client[i + 1]) {
                    i++
                }
            }
            arr_client[i].client.send(JSON.stringify({
                    data_base: {
                        get:data
                    }
            }))
        }
    }
}
const set_speed = async(data, ws)=>{
    const globale_varibles = require('../globale_varibles.js')
    const type = globale_varibles.clients_databases[ws.id][data.name].type
    let arr_client = Object.values(globale_varibles.databases_clients[data.name])
    if (type == "WRITR") {
        if (data.cloud) {
            await cloud_group_speed(data.name, globale_varibles.groups_speeds[data.name])
        }else if(! data.not_save) {
            globale_varibles.groups_speeds[ data.name ] = await processng_data.processng_speed(data, globale_varibles.groups_speeds[ data.name ])
        }
        for (let i = 0; i < arr_client.length; i++) {
            if (! data.resend_me && arr_client[i].client.id == ws.id) {
                if (arr_client[i + 1]) {
                    i++
                }
            }
            arr_client[i].client.send(JSON.stringify({
                data_base:{
                    get_speed:data
                }
            }))
        }
    }
}
const cloud_group_speed = async( base_name, group_speed_data )=>{
    console.log('CLOUD', base_name)
    await FMB.update_file(base_name, await processng_data.processng({
        name:base_name,
        path:require('../../config/default.json').location_save_group_speed_on_database,
        clear_end:true,
        data:group_speed_data
    })) 
}
module.exports = {write, set_speed , cloud_group_speed }