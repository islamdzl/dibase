const DOM_ALL = document.getElementById('ALL')
var __THIS_BASE
var __SAVELOGE = false
var __PING
var _PAGE = 'log_server'
var _TIME = 0
var __data_base_clients
var __CONFIG
/*
    ===============================
            ISLAM-DZL  DIBASE *** 
    ===============================
    -______ other functions ______-
*/
setInterval(async()=>{

    try{
        if (socket.readyState == 1 ) {
            document.getElementById('time').innerText = ['s',_TIME]
            document.getElementById('web_socket_state').innerText = 'Connect'
            if (_PAGE == 'server' || _PAGE == 'base') {
                __PING = Date.now()
                socket.send(JSON.stringify({
                        data_base:{
                            ping:'my'    
                        }
                    }))
            }
        }else{
            document.getElementById('web_socket_state').innerText = 'Disconnect'
        }
        _TIME ++
    }catch{}
},1000)

const MAIN = async()=>{
    if ( ! localStorage.getItem('info')) { 
        localStorage.setItem('info',JSON.stringify({
            server:{},
            data_bases:{}
        }))                
        console.log('saved')
        __Storage = JSON.parse(localStorage.getItem('info'))
    }
    __Storage = JSON.parse(localStorage.getItem('info'))
    let __bases = Object.keys(__Storage.data_bases)
    if (__Storage.server.password) {
        LOG_IN('server')
    }else if (__bases.length != 0) {
        GET_LOG('data_bases')
    }else{
        DOM_ALL.innerHTML = P_LOG_SERVER
        _PAGE = 'log_server'
    }
    
}



const SAVE_LOG = async(type)=>{
    let __Storage = await JSON.parse(localStorage.getItem('info'))
    let ED__Storage = __Storage
    if (__SAVELOGE) {
        if (type == 'server') {
            ED__Storage.server = __SAVELOGE
            localStorage.setItem('info',JSON.stringify(ED__Storage))
        }else{
            ED__Storage.data_bases[__SAVELOGE.base] = {}
            ED__Storage.data_bases[__SAVELOGE.base] = __SAVELOGE[__SAVELOGE.base]
            localStorage.setItem('info', JSON.stringify(ED__Storage))
            console.log('saved')
        }
        __SAVELOGE = false
    }
    if (type.slice(0, 7) == 'delete-'){
        delete __Storage.data_bases[type.slice(7, type.length)] 
        localStorage.setItem('info', JSON.stringify(ED__Storage))
        GET_LOG('data_bases')
    }
}

const LOG_IN = async(type)=>{
    let __Storage = await JSON.parse(localStorage.getItem('info'))
    switch (type) {
        case 'server':
            let server_log_password
            try {
                server_log_password = document.getElementById('_password_log_server').value
                __SAVELOGE = {password: btoa(server_log_password)}
            }catch{}
            LOG_IN_SERVER(__Storage.server.password ? atob(__Storage.server.password) : server_log_password)
            break;
        case 'data_base':
            let base_log_password = document.getElementById('_base_log_password').value
            let base_log_name = document.getElementById('_base_log_name').value
            __THIS_BASE = base_log_name
            LOG_IN_BASE({base:base_log_name, password:base_log_password})
            __SAVELOGE = {[base_log_name]:{password: btoa(base_log_password), name:base_log_name},base:base_log_name}
            break;

        default:
                if (type.slice(0, 7) == 'log_in-') {
                    __THIS_BASE = type.slice(7, type.length)
                    LOG_IN_BASE({base:type.slice(7, type.length),password:atob(__Storage.data_bases[type.slice(7, type.length)].password)})
                }
            break;
    }
}

const GET_LOG = async(page_name)=>{
    let __Storage = await JSON.parse(localStorage.getItem('info'))
    switch (page_name) {
        case 'server':
            if (__Storage.server.password) {
                LOG_IN_SERVER(atob(__Storage.server.password))
                return
            }
            DOM_ALL.innerHTML = P_LOG_SERVER
            _PAGE = 'log_server'
            break
        case 'data_bases':
            DOM_ALL.innerHTML = P_LOG_DATA_BASE
            _PAGE = 'log_data_base'
            let __bases = Object.keys(__Storage.data_bases)
            if (__bases.length) {
                document.getElementById('_data_bases').style.display = 'block'
                document.getElementById('_bases').innerHTML = ''
                __bases.forEach(base => {
                document.getElementById('_bases').innerHTML += `
                <div style="display:flex; flex-direction: row; gap: 0px;">
                    <input type="button" class="buttons" style="width: 90%;background-color: rgba(0, 0, 0, 0.158);border-color: green; border-top-right-radius: 0px; border-bottom-right-radius: 0px;" id="${base}" value="${base}" onclick="LOG_IN('log_in-'+this.id)">
                    <input type="button" class="buttons" style="width: auto;background-color: rgba(0, 0, 0, 0.158);border-color: red;font-size: 10px; border-top-left-radius: 0px; border-bottom-left-radius: 0px;" id="${base}" value="Delete" onclick="SAVE_LOG('delete-'+this.id)">
                </div>
                `    
            });
            }else{document.getElementById('_data_bases').style.display = 'none'}
            break
            default:
                break
    }
}
const LOG_IN_BASE = ({base, password})=>{
    console.log(base)
    socket.send(JSON.stringify({
        data_base:{
                admins_base:{
                    password,
                    base,
                    exec:{
                    }
                }
            }
    }))
}
const LOG_IN_SERVER = (password)=>{
    socket.send(JSON.stringify({
        data_base:{
            admins_server:{
                password:password,
                exec:{}
            }
        }
    }))
}
