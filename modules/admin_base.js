const path = require('path')
const files_manager_class = require('./files_manager.class.js')
const FMC = new files_manager_class(path.join(__dirname, '../config'))
const FMB = new files_manager_class(path.join(__dirname, '../BASES'))

const ADMINS_BASE = async(data, ws)=>{
    delete require.cache[require.resolve('../config/_config.json')]
    let config = require('../config/_config.json')
    let resend = require('./admins_resend')
    let globale_varibles = require('./globale_varibles')
    let ban_info = globale_varibles.ban[ws._id]


    if (! data.no_admin) {
        if (! globale_varibles.admins_ws.bases[data.base]) {
            globale_varibles.admins_ws.bases[data.base] = {}
        }
        if (! globale_varibles.admins_ws.bases[data.base][ws.id]) {
            globale_varibles.admins_ws.bases[data.base][ws.id] = ws
        }
    }
    console.log(data)
    if (data.password === config.safety[data.base].password && ! ban_info.ban) {
        if (data.exec) {
            switch (true) {
                case (typeof data.exec.re_password != 'undefined'):
                    config.safety[data.base].password = data.exec.re_password.password
                    config.safety[data.base].read_password = data.exec.re_password.read_password
                    await FMC.update_file('_config', config)
                    .then(()=>resend(ws, data.base))                    
                    break;
                case (typeof data.exec.rin_state != 'undefined'):
                    if (data.exec.rin_state == config.safety[data.base].rin_state) {
                        return
                    }
                    config.safety[data.base].rin_state = data.exec.rin_state
                    await FMC.update_file('_config', config)
                    .then(()=>resend(ws, data.base))
                    break;
                case (typeof data.exec.delete_base != 'undefined'):
                    if (config.safety[data.base]) {
                        if (data.exec.delete_base === config.safety[data.base].password) {
                            delete config.safety[data.base]
                            config.data_bases = config.data_bases.filter(item => item !== data.base)
                            await FMC.update_file('_config', config)
                            await FMB.delete_file(data.base)
                            .then(()=>resend(ws, data.base))
                        }
                    }
                    break; 
                case (typeof data.exec.formate != 'undefined'):
                    if (data.password === config.safety[data.base].password) {
                        if (data.exec.formate === config.safety[data.base].password) {
                            config.safety[data.base] = 
                            await FMC.update_file(data.base, config)
                            .then(()=>resend(ws, data.base))
                        }
                    }
                    break; 
                default:
                    if (config.safety[data.base]) {
                        if (data.password == config.safety[data.base].password) {
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
                        resend(ws, data.base)
                    }
                    break;
            }
        }else{}
    }
}
module.exports = ADMINS_BASE