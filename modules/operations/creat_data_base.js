const path = require('path')
const files_manager_class = require('../files_manager.class.js')

const FMC = new files_manager_class(path.join(__dirname, '../../config'))
const FMB = new files_manager_class(path.join(__dirname, '../../BASES')) 
const defaultjson = require('../../config/default.json')
const creat_data_base = async(data)=>{
    let config = require('../../config/_config.json')
    return new Promise((resolve, rejects)=>{
        config.data_bases.forEach(data_bases_name => {
            if(data_bases_name == data.name) {
                rejects() 
            }
        });         
        if (! config.safety[data.name]) {
            config.data_bases.push(data.name)
            defaultjson.path_base_on_config.name = data.name
            defaultjson.path_base_on_config.password = data.password
            defaultjson.path_base_on_config.type = data.type == "speed" ?  'speed' : 'default'
            config.safety[data.name] = defaultjson.path_base_on_config
            console.log('CONFIGE'+JSON.stringify(config))
            FMC.create_file('_config', config)
            FMB.create_file(data.name)
            resolve(true)
            return
        }
        rejects() 
    })
}
module.exports = creat_data_base