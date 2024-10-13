const fs = require('fs')
const { resolve } = require('path')
const path = './DATA/'

const create = async(file_name)=>{
    return await new Promise((resolve, rejecte)=>{
        fs.open(path + file_name + '.json', 'w', (err, file)=>{
            err? rejecte(err) : resolve(file)
            update({file_name, data:{}})
        })
    })
}
const update = async({file_name, data})=>{
    return await new Promise((resolve, rejecte)=>{
        fs.writeFile(path + file_name + '.json', JSON.stringify(data), (err)=>{
            err ? rejecte(err) : resolve(true)
        })
    })
}
const clear  = async(file_name)=>{
    return await new Promise((resolve, rejecte)=>{
            if (file_name == 'all') {
            fs.readdir(path, (err, files)=>{
                if (err) rejecte(err)
                files.forEach(file =>{
                    fs.unlink(path + file, (err)=>{
                        if (err) rejecte(err)
                    })
                })
                resolve(true)
            })
        }else{
            fs.unlink(path + file_name + '.json', (err)=>{
                err ? rejecte(err) : resolve(true)
            })
        }
    })
 }
 const size  = async(file_name)=>{
    return await new Promise((resolve, rejecte)=>{
        fs.stat(path + file_name + '.json', (err, stat)=>{
            err ? rejecte(err) : resolve(stat.size)
        })
    })
 }
module.exports = {update, create ,clear ,size}