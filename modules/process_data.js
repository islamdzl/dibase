/*
     SET & GET 
       DATA
    ===================================
       response get => send to client
       response set => write to system
*/
const file_system = require('./file_system')
const set = async({dataA, dataB, paths:{ path ,setpath} , wss, base_name, clear_end, wsid})=>{
    wss.forEach(client=>{
        if (client.id == wsid) {
            return
        }
        client.send(JSON.stringify({
            data_base:{
                get:{
                    name:base_name,
                    data:dataB,
                    clear_end,
                    setpath,
                    path
                }
                }
        }))
    })
    if (setpath) {
        return creatpath(dataA, setpath,clear_end)
    }else{
        return clear_end ? ECObject(path, dataA, dataB):EAObject(path, dataA, dataB)
    }
}
const get = async({dataA, path})=>{
    let datap = dataA
    if (! IPath(dataA, path)) {
        return
    }
    path.forEach(ob => {
        datap = datap[ob]
    }); 
    return datap
}
const ECObject = (arr, dataA, dataB) => {
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

const EAObject = (arr, dataA, dataB) => {
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

const creatpath = (data, path, clear_end) => {
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
const IPath = (data, path)=>{
    for (let i = 0; i < path.length; i++) { 
        if (! data[path[i]]) {
            return false
        }
        data = data[path[i]]
    }
    return true
}
/*
const GTPath = (data, path)=>{
    if (!IPath(data, path)) {
        return
    }
    path.forEach((p)=>{
        data = data[p]
    })
    return data
}


*/
module.exports = {get, set}