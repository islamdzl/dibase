const creat_data_base = require('./operations/creat_data_base')
const path = require('path')
const files_manager_class = require('./files_manager.class.js')
const FMC = new files_manager_class(path.join(__dirname, '../config'))
const FMB = new files_manager_class(path.join(__dirname, '../BASES'))
const formateer = require('./system.js').formate
const ADMINS_SERVER = async(data, ws)=>{
    delete require.cache[require.resolve('../config/_config.json')]
    let config = require('../config/_config.json')
    let resend = require('./admins_resend')
    let globale_varibles = require('./globale_varibles')
    let ban_info = globale_varibles.ban[ws._id]
    if (! data.no_admin) {
        if (! globale_varibles.admins_ws.server[ws.id]) {
            globale_varibles.admins_ws.server[ws.id] = ws
        }
    }
    if (data.password === config.__server.password && ! ban_info.ban) {
        if (data.exec) {
            switch (true) {
                case (typeof data.exec.re_password != 'undefined'):

                    config.__server.password = data.exec.re_password
                    await FMC.update_file('_config',config)
                    .then(async()=>await resend(ws,'server'))
                    break;
                case (typeof data.exec.rin_state != 'undefined'):

                    globale_varibles.rin_state = data.exec.rin_state
                    await resend(ws,'server')
                    break;
                case (typeof data.exec.create_base != 'undefined'):
                    await creat_data_base(data.exec.create_base)
                    .then(async()=> {
                        await resend(ws,'server')
                        ws.send(`{"data_base":{"created_data_base":"${data.exec.create_base.name}"}}`)
                    })
                    .catch((err)=>{})
                    break;
                case (typeof data.exec.delete_base != 'undefined'):
                    delete config.safety[data.exec.delete_base]
                    config.data_bases = config.data_bases.filter(item => item !== data.exec.delete_base)
                    await FMC.update_file('_config', config)
                    await FMB.delete_file(data.exec.delete_base)
                    .then(async()=>{
                        await resend(ws,'server')
                        ws.send(`{"data_base":{"deleted_data_base":"${data.exec.delete_base}"}}`)
                    })
                    break
                case (typeof data.exec.formate != 'undefined'):

                    await formateer(data.exec.formate)
                    console.log('FORMATE')
                    break
                case (typeof data.exec.download != 'undefined'):

                        // not exist

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
        if (! ban_info.ban) {
            ban_info.attempts = ban_info.attempts -1
            if (ban_info.attempts == 0) {
                ban_info.ban = true
                console.log(`BANED >>> ${ws.id} ***`)
            } 
        }
    }
}

module.exports = ADMINS_SERVER