/*
     SET & GET 
       DATA
    ===================================
       response get => send to client
       response set => write to system
*/
// =====================> PABLIC <====================================
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< processng <= Speed
const processng_speed = async(data ,dataA)=>{
    switch (true) {
        case (typeof data.creat_path != 'undefined'):
        let new_data
        data.creat_path.forEach(( arr_path )=>{
            new_data = creat_path(dataA, arr_path, data.clear_end)
        })
        return new_data
        break;
        case (typeof data.path != 'undefined'):
            if (! data.data) {
                data.data = null
            }
            return data.clear_end ? ECObject(data.path, dataA, data.data) : EAObject(data.path, dataA, data.data)
            break;
        case (typeof data.delete != 'undefined'):
            return delete_(dataA, data.delete)
            break
        case (typeof data.data != 'undefined'):
            return data.clear_end ? ECObject([], dataA, data.data) : EAObject([], dataA, data.data)
            break;
        default:
            return dataA
            break;
    }
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< processng <= Default

const processng = async(dataA, dataB)=>{
    switch (true) {
        case (typeof dataB.creat_path != 'undefined'):
            let new_data
            dataB.creat_path.forEach(( arr_path )=>{
                new_data = creat_path(dataA, arr_path, dataB.clear_end)
            })
            return new_data
            break;
        case (typeof dataB.path != 'undefined'):
            if (! dataB.data) {
                dataB.data = null
            }
            return dataB.clear_end ? ECObject(dataB.path, dataA, dataB.data) : EAObject(dataB.path, dataA, dataB.data)
            break;
        case (typeof dataB.delete != 'undefined'):
            return delete_(dataA, dataB.delete)
            break
        case (typeof dataB.data != 'undefined'):
            return dataB.clear_end ? ECObject([], dataA, dataB.data) : EAObject([], dataA, dataB.data)
            break;
        default:
            return dataA
            break;
    }
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ECObject

const ECObject = (arr, dataA, dataB ,force) => {
    if (! force) {
        if (! dataB) {return dataA}
        if (arr.length == 0) {return dataB}
    }
    let current = dataA;
    for (let i = 0; i < arr.length - 1; i++) {
        const key = arr[i];
        if (typeof current[key] !== 'object' || current[key] === null) {
            current[key] = typeof arr[i + 1] === 'number' ? [] : {};
        }
        current = current[key];
    }
    const lastKey = arr[arr.length - 1];
    if (typeof lastKey === 'number') {
        current[lastKey] = [dataB];
    } else {
        current[lastKey] = dataB;
    }
    return dataA;
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< EAObject

const EAObject = (arr, dataA, dataB) => {
    if (! dataB) {return dataA}
    if (arr.length == 0) {return places(dataA, dataB)}
    let current = dataA;
    for (let i = 0; i < arr.length - 1; i++) {
        const key = arr[i];
        if (typeof current[key] !== 'object' || current[key] === null) {
            current[key] = typeof arr[i + 1] === 'number' ? [] : {};
        }
        current = current[key];
    }
    const lastKey = arr[arr.length - 1];
    if (typeof current[lastKey] === 'object' && current[lastKey] !== null) {
        current[lastKey] = Object.assign(current[lastKey], dataB);
    } else {
        current[lastKey] = dataB;
    }
    return dataA;
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< creat_path

const creat_path = (data, path, clear_end) => {
    path.reduce((acc, key, index) => {
        if (index === path.length - 1) {
            acc[key] = clear_end ? {} : (acc[key] || {});
        } else {
            acc[key] = acc[key] || {};
        }
        return acc[key];
    }, data);
    return data;
};
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< IPath

const IPath = (data, path)=>{
    for (let i = 0; i < path.length; i++) { 
        if (! data[path[i]]) {
            return false
        }
        data = data[path[i]]
    }
    return true
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< GTPath

const GTPath = (data, path)=>{
    if (!IPath(data, path)) {
        return
    }
    path.forEach((p)=>{
        data = data[p]
    })
    return data
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< delete

const delete_ = (dataA, path)=>{
    return ECObject(path, dataA, {} , true)
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< places

const places = (data1, data2)=>{
    const keys = Object.keys(data1)
    const values = Object.values(data1)
    for (let i = 0; i < keys.length; i++) {
        data2[keys[i]] = values[i]
    }
    return data2
}
// §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§

const object_to_arrey = (object)=>{
    return {keys:new Object.keys(object), values: new Object.values(object)}
}
const creat_data_base = (socket, password, data)=>{
    socket.send(JSON.stringify({
        data_base:{
            admins_server:{
                no_admin:true,
                password,
                exec:{
                    create_base : data
                }
            }
        }
    }))
}
const delete_data_base = (socket, password, data)=>{
    socket.send(JSON.stringify({
        data_base:{
            admins_server:{
                no_admin:true,
                password,
                exec:{
                    delete_base: data
                }
            }
        }
    }))
}
const log = (P, message)=>{
    console[P]('DIBASE :',message)
}
const help = (bool)=>{
    const info = `
    |===============|
    |MODULE > DIBASE|
    |=================> General <===================|
    |   - VERSION  :   2.0.0         BETA           |
    |   - OWNER    :   islamdzl                     |
    |   - DEVLOPER :   islamdzl                     |
    |   - SOURSE   :   closed                       |
    |   - GITHUB   :   https://github.com/islamdzl  |
    |=================> Object Base <===========================================================================================
    |.get( path )                           |=> return data                        | 
    |.set(data,||path,||clear_end)          |=> onchange({ dataA , dataB })        |
    |.get_speed(data,{ params })            |=> onspeeder({ dataA , dataB })       |  params = {}
    |.set_speed(data,{ params })            |=> onspeeder({ dataA , dataB })       |  params = { path, clear_end, creat_path ,}
    |.creat_path(data,path,clear end)       |=> return new data                    |
    |.clear ( true/false )                  |=> clear all data on data base        |
    |.change()                              |=> onchange({ {   } , dataB })        |
    |.load      =  false/true               |=> onload( data ) false && on get data|
    |.data      = data for database         |=> {}   type : Objec/JSON             |
    |------------------------------------------------------------------------------|
    |path : ["path", "to", "set", "data"]|[ 0 ]  |=> path to location data         |
    |data : {  example : "islamdzl"}             |=> yor data object               |
    |clear_end  : true/false                     |=> to clear end object           |
    |------------------------------------------------------------------------------|
    |.onload   : Function > ( data )                                               |
    |.onchange : Function > ({ dataA:data_before, dataB:data_aftter })             |
    |.onerror  : Function > ("message error")                                      |
    |================> Function Tasks <==================================================================|
    | creat_data_base('server password ',{ name, password, read_password })     >>> return  true/false   |
    | object_to_arrey( { } ) > return keys and values arrey                     >>> return {keys,values} |
    | EAObject( path , dataA , dataB ) > Edite dataA to dataB in path           >>> return { new data }  |
    | CPath( data , path , clear_end ) > Creat path on object  | clear_end      >>> return { new data }  |
    | GTPath(data , path )             > Go to locatin path                     >>> return { yor data }  |
    | IPath( data , path )             > Check in path on data                  >>> return true/false    |
    | help( true/false )               > Return this info|if true print console >>> return  string       |
    |====================================================================================================|
    `
    if (bool) {
        this.log('info',info)
        return
    }
    return info
}
module.exports = {
    processng,
    processng_speed,
    ECObject,
    EAObject, 
    creat_path,
    IPath,
    GTPath,
    delete_,
    creat_data_base,
    delete_data_base,
    object_to_arrey,
    help,
    log
}