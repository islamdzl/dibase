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
const delete_data_base = (socket, password, name)=>{
    socket.send(JSON.stringify({
        data_base:{
            admins_server:{
                no_admin:true,
                password,
                exec:{
                    delete_base: name
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
    |=================> General <===================|
    |   - VERSION  :   2.0.0         BETA           |
    |   - OWNER    :   islamdzl                     |
    |   - DEVLOPER :   islamdzl                     |
    |   - SOURSE   :   closed                       |
    |   - GITHUB   :   https://github.com/islamdzl  |
    |=================> Object Base <======================================================|
    |>               Functions                  <|>            Actions          <|> Await <|
    |.get (path)                                 |=> return data                 |   yes   | 
    |.set (data,||path,||clear_end)              |=> onchange({ dataA , dataB }) |   yes   |
    |.creat_paths ([path, path])                 |=> onchange({ dataA , dataB }) |   yes   |
    |.clear ( true/false )                       |=> clear all data on data base |   yes   |
    |.change ()                                  |=> onchange({ {   } , dataB }) |   no    |
    |--------------------> speed                 |                               |         |
    |.get_speed (data,||path,||clear_end)        |=> onchange({ dataA , dataB }) |   yes   |
    |.set_speed (data,||path,||clear_end)        |=> onchange({ dataA , dataB }) |   yes   |
    |.clear_speed (data,||path,||clear_end)      |=> onchange({ dataA , dataB }) |   yes   |
    |.cloud_speed (data,||path,||clear_end)      |=> onchange({ dataA , dataB }) |   yes   |
    |.creat_paths_speed ([path, path])           |=> onchange({ dataA , dataB }) |   yes   |
    |.exec_speed ((null)=>{ </code> })           |=> onchange({ dataA , dataB }) |   yes   |
    |.speedr ()                                  |=> onspeedr({ {   } , dataB }) |   no    |
    |--------------------------------------------------------------------------------------|
    |.AOC        = refriching for onchange       |=> true/false                            |
    |.AOS        = refriching for onspeedr       |=> true/false                            |
    |.data       = data for database             |=> {}   type : Objec/JSON                |
    |.data_speed = data speed for database       |=> {}   type : Objec/JSON                |
    |.password   = password for database         |=> "password-reader/writer"              |
    |.type       = type for database             |=> "speed"/"default"                     |
    |.load       = false and on load data = true |=> true/false                            |
    |--------------------------------------------------------------------------------------|
    |path : ["path", "to", "set", "data"]        |=> path to location data                 |
    |data : {  example : "islamdzl"}             |=> yor data object                       |
    |clear_end  : true/false                     |=> to clear end object                   |
    |------------------------> more              |                                         |
    |not_save   : true/false                     |=> save data on database                 |
    |resend_me  : true/false                     |=> await resend me data                  |
    |--------------------------------------------------------------------------------------|
    |.onerror  : Function > ("message error")    |=> message error for database         |
    |.onchange : Function > ({ dataA:data_before, dataB:data_aftter }) | for default    |
    |.onspeedr : Function > ({ dataA:data_before, dataB:data_aftter }) | for speed      |
    |================> Function Tasks On File Processing Data <=========================================================|
    | processing     ( dataA , dataB )   default processing for data                  >>> return { new data }           |
    | processng_speed( data  , dataA )   speed processing for data                    >>> return { new data }           |
    | ECObject( path , dataA , dataB ) > Edite dataA to dataB in path and clear       >>> return { new data }           |
    | EAObject( path , dataA , dataB ) > Edite dataA to dataB in path                 >>> return { new data }           |
    | CPath( data , path , clear_end ) > Creat path on object  | clear_end            >>> return { new data }           |
    | GTPath          ( data , path )             > Go to locatin path                >>> return { yor data }           |
    | IPath           ( data , path )             > Check in path on data             >>> return true/false             |
    | creat_path ( data , path , clear_end )      > creat_path on object              >>> return { new data }           |
    | delete_         ( data , path )             > delete path on data               >>> return { new data }           |
    | creat_data_base (socket , password , data)  > creat new data base               >>> return null                   |
    | delete_data_base(socket , password , name)  > delete data base                  >>> return null                   |
    | object_to_arrey ( data , path )             > convert to 2 array [keys, values] >>> return { keys:[], values:[] } |
    | help( true/false )               > Return this info|if true print console       >>> return  string                |
    |===================================================================================================================|
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