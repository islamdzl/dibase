const processng = require('./processng_data')
const read = async(data, ws)=>{
    const globale_varibles = require('../globale_varibles')
    const type = globale_varibles.clients_databases[ws.id][data.name].type
    if (type == "WRITR" || type == "READR") {
        if (data.path) {
            data.data = processng.GTPath(require(`../../BASES/${data.name}.json`), data.path)
            ws.send(JSON.stringify({
                data_base:{
                    get:data
                }
            }))
            return
        }
        data.data = require(`../../BASES/${data.name}.json`)
        ws.send(JSON.stringify({
            data_base:{
                get:data
            }
        }))
    }
}
const get_speed = (data, ws)=>{
    const globale_varibles = require('../globale_varibles')
    const groups_speeds = globale_varibles.groups_speeds
    const type = globale_varibles.clients_databases[ws.id][data.name].type
    if (type == "WRITR" || type == "READR") {
        if (data.path) {
            data.data = processng.GTPath(groups_speeds[data.name], data.path)
            ws.send(JSON.stringify({
                    get_speed:data
            }))
            return
        }
        data.data = groups_speeds[data.name]
        ws.send(JSON.stringify({
            data_base:{
                get_speed:data
            }
        }))
    }
}
// ==========> LOCAL <===============

const get_from_path = ()=>{

}








module.exports = {read, get_speed}