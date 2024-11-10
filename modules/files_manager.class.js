const { log } = require('console')
const fs = require('fs')
const path_libary = require('path')
const { promiseHooks } = require('v8')

class main {
    constructor( folder_access ){
        this.folder_access = folder_access
    }
    create_file(file_name, data) {
        if (data) {
            return new Promise( async(resolve, reject)=>{
                await create(this.folder_access, file_name)
                await update(this.folder_access, file_name, data)
                resolve(true)
            })
        }
        return create(this.folder_access, file_name)
    }
    update_file(file_name, data) {
        return update(this.folder_access, file_name, data)
    }
    delete_file(file_name) {
        return delete_(this.folder_access, file_name)
    }
    size_file(file_name) {
        return size(this.folder_access, file_name)
    }
    clear_all( call_back ) {
        return new Promise((resolve, rejecte)=>{
            fs.readdir(`${path_libary.join(this.folder_access)}`, (err, files)=>{
                files.forEach((file)=>{
                        fs.unlink(`${path_libary.join(this.folder_access, file)}`, (err)=>{        
                        if (err) {rejecte(err); return}
                        call_back(file)
                    })
                })
                resolve(true)
            })
        })
    }
}

const create = async(path_access, file_name)=>{
    return await new Promise((resolve, rejecte)=>{
        fs.open(`${path_libary.join(path_access, file_name)}.json`, 'w', (err, file)=>{
            err? rejecte(err) : resolve(file)
            update(path_access, file_name, {})
        })
    })
}
const update = async(path_access, file_name, data)=>{
    return await new Promise((resolve, rejecte)=>{
        fs.writeFile(`${path_libary.join(path_access, file_name)}.json`, JSON.stringify(data), (err)=>{
            err ? rejecte(err) : resolve(true)
        })
    })
}
const delete_  = async(path_access, file_name)=>{
    return await new Promise((resolve, rejecte)=>{
        fs.unlink(`${path_libary.join(path_access, file_name)}.json`, (err)=>{
            err ? rejecte(err) : resolve(true)
        })
    })
}
 const size  = async(path_access, file_name)=>{
    return await new Promise((resolve, rejecte)=>{
        fs.stat(`${path_libary.join(path_access, file_name)}.json`, (err, stat)=>{
            err ? rejecte(err) : resolve(stat.size)
        })
    })
 }
module.exports = main