const Web_Socket = require('ws')
const processng = require('./processng')

class DIBASE {
    constructor(url ,user_data){
        this.url = url
        this.user_data = user_data
        this.base = {}
        this.wait_change_data_state = false
        this.server_password = undefined
        this.module_data = {
            created_data_base:{},
            deleted_data_base:{},
        }
        this.socket = new Web_Socket(url)
        this.sender = ( data )=>{
            this.socket.send(JSON.stringify({
                data_base:{
                    [data.type]:{
                        ... data
                    }
                }
            }))
        }
        this.socket.onerror = (err)=>{
            processng.log('error','Error connecting on server DIBASE')
            return
        }
        this.socket.onopen = ()=>{
            this.socket.send(JSON.stringify({
                data_base:{
                    set_domain:{
                        id:this.user_data.id,
                        domains:this.user_data.domains
                    }
                }
            }))
            user_data.domains.forEach(({name, password})=>{
                this.socket.send(JSON.stringify({
                    data_base:{
                        get:{
                            password:password,
                            name:name,
                            code_request:0
                        }
                    }
                }))
            })
            processng.log('log','Open Data Base Server!')
            this.onconnect()
        }
        this.socket.onmessage = async(message)=>{
            const data = JSON.parse(message.data).data_base
            this.cach_message = data
            // console.log(">> message : ",data)
                switch (true) {
                    case(typeof data.get_speed != 'undefined'):
                        if (data.get_speed.code_request) {
                            this.base[data.get_speed.name].wait_data[data.get_speed.code_request.path]  (data.get_speed.code_request.code)
                        }
                        const new_data_speed = await processng.processng_speed(data.get_speed, this.base[data.get_speed.name].data_speed)
                        if (this.base[data.get_speed.name].AOS) this.base[data.get_speed.name].onspeedr({dataA:this.base[data.get_speed.name].data_speed, dataB: new_data_speed})
                        this.base[data.get_speed.name].data_speed = new_data_speed
                        break
                    case(typeof data.get != 'undefined'):
                        if (data.get.code_request) {
                            this.base[data.get.name].wait_data[data.get.code_request.path]              (data.get.code_request.code)
                        }
                        const new_data_default = await processng.processng(this.base[data.get.name].data, data.get)
                        if (this.base[data.get.name].AOC) this.base[data.get.name].onchange({dataA:this.base[data.get.name].data, dataB: new_data_default})
                        this.base[data.get.name].data = new_data_default
                        if (this.base[data.get.name].load == false && this.base[data.get.name].type === "speed")  {
                            this.base[data.get.name].get_speed()
                            this.base[data.get.name].load = true
                        }
                        break
                    case (typeof data.data_base.not_base != 'undefined'):
                        processng.log('error', `not database : ${data.data_base.not_base}`)
                        this.base[data.data_base.not_base].onerror({not_base:`not database : ${data.data_base.not_base}`})
                        break 
                    case (typeof data.data_base.deleted_data_base != 'undefined'):
                        break
                    case (typeof data.data_base.created_data_base != 'undefined'):
                        break
                    case (typeof data.ping != 'undefined'):
                        this.ping.test_out(Date.now() - this.ping.ping_test_date_a)
                        break
                    default:
                        console.log('not switch', data)
                    break
                }
            if (data.type == 'server' && !data.login) {
                processng.log('error',`Error in server password!`)
            }
        }
        this.user_data.domains.forEach(({name, password, type}) => {
            const random_code = (path)=>{
                return {
                    code: String(Math.floor(Math.random()* 100000000)), 
                    path
                }
            }
            const coty_default = {
            wait_data: {
                    set_speed        : ()=>{},
                    get_speed        : ()=>{},
                    clear_speed      : ()=>{},
                    cloud_speed      : ()=>{},
                    creat_paths_speed: ()=>{},
                    set              : ()=>{},
                    get              : ()=>{},
                    clear            : ()=>{},
                    creat_paths      : ()=>{},
            },
            AOC: true,
            AOS: true,
            data:{},
            password,
            type: type == 'speed' || type == 'SPEED' ? 'speed' : 'default',
            load: false,
            // =========================> FUNCTIONS FOR DEFAULTE <====================
                set:async (data, path, clear_end, resend_me)=>{
                    if (! (resend_me || this.wait_change_data_state)) {
                        resend_me = undefined
                        if (this.base[data.get.name].AOC) this.base[name].onchange({dataA: this.base[name].data, dataB:processng.processng(this.base[name].data, data)})
                        this.sender({type:"set", name, data, path, clear_end})
                        return
                    }
                    const code_request = random_code('set')
                    this.sender({type:"set", name, data, path, clear_end, resend_me, code_request})
                    if (this.wait_change_data_state) {
                        return new Promise((resolve)=>{
                            coty_default.wait_data.set = ( code )=>{if (code == code_request.code) {resolve(code); return}}
                        })
                    }
                },
                get:async(path)=>{
                    const code_request = random_code('get')
                    this.sender({type:"get", name, path, code_request})
                    if (this.wait_change_data_state) {                        
                        return new Promise((resolve)=>{
                            coty_default.wait_data.get = ( code )=>{if (code == code_request.code) {resolve(code); return}}
                        })
                    }
                },
                clear:(t)=>{
                    if (! t) return
                    const code_request = random_code('clear')
                    this.sender({type:"set", name, data:{}, clear_end:true, code_request})
                    if (this.wait_change_data_state) {
                        return new Promise((resolve)=>{
                            coty_default.wait_data.clear = ( code )=>{if (code == code_request.code) {resolve(code); return}}
                        })
                    }
                },                
                creat_paths:async(paths, clear_end)=>{
                    const code_request = random_code('creat_paths')
                    this.sender({type:"set", name, creat_path:paths, clear_end, code_request})
                    if (this.wait_change_data_state) {
                        return new Promise((resolve)=>{
                            coty_default.wait_data.creat_paths = ( code )=>{if (code == code_request.code) {resolve(code); return}}
                        })  
                    }
                },
                exec_default: async(fun)=>{
                    this.base[name].AOC = false
                    await fun()
                    this.base[name].AOC = true
                },
                exec: async(fun)=>{
                    this.base[name].AOC = false
                    this.base[name].AOS = false
                    await fun()
                    this.base[name].AOC = true
                    this.base[name].AOS = true
                },
                change:()=>{
                    this.base[name].onchange({dataA:{},dataB:this.base[name].data})
                },
                speedr:()=>{
                    this.base[name].onspeedr({dataA:{},dataB:this.base[name].data_speed})
                },
                onchange : ()=>{},
                onspeedr : ()=>{},
                onerror  : ()=>{}
            }
        // =========================> FUNCTIONS FOR SPEED  <====================
            const coty_speed = {
                data_speed:{},
                set_speed: async(data, path, clear_end, resend_me)=>{
                    if (! (resend_me || this.wait_change_data_state)) {
                        this.sender({type:"set_speed", name, data, path, clear_end})
                        return
                    }
                    const code_request = random_code('set_speed')
                    this.sender({type:"set_speed", name, data, path, clear_end, resend_me, code_request})
                    if (this.wait_change_data_state) {
                        return new Promise((resolve)=>{
                            coty_default.wait_data.set_speed = ( code )=>{if(code == code_request.code){resolve(code); return}}
                        })
                    }
                },
                get_speed: (path)=>{
                    const code_request = random_code('get_speed')
                    this.sender({type:"get_speed", name, path, code_request})
                    if (this.wait_change_data_state) {
                        return new Promise((resolve)=>{
                            coty_default.wait_data.get_speed = ( code )=>{if (code == code_request.code) {resolve(code); return}}
                        }) 
                    }
                },
                clear_speed:(t)=>{
                    if (! t) return
                    const code_request = random_code('clear_speed')
                    this.sender({type:"set_speed", name, data:{}, clear_end:true, code_request})
                    if (this.wait_change_data_state) {
                        return new Promise((resolve)=>{
                            coty_default.wait_data.clear_speed = ( code )=>{if (code == code_request.code) {return resolve(code)}}
                        })
                    }
                },
                cloud_speed:()=>{
                    const code_request = random_code('cloud_speed')
                    this.sender({type:"set_speed", name, cloud: true, code_request})
                    if (this.wait_change_data_state) {
                        return new Promise((resolve)=>{
                            coty_default.wait_data.cloud_speed = ( code )=>{if (code == code_request.code) {resolve(code); return}}
                        })
                    }
                },
                creat_paths_speed:async(paths, clear_end)=>{
                    const code_request = random_code('creat_paths_speed')
                    this.sender({type:"set_speed", name, creat_path:paths, clear_end, code_request})
                    if (this.wait_change_data_state) {
                        return new Promise((resolve)=>{
                            coty_default.wait_data.creat_paths_speed = ( code )=>{if (code == code_request.code) {resolve(code); return}}
                        })
                    }
                },
                exec_speed: async(fun)=>{
                    this.base[name].AOS = false
                    await fun()
                    this.base[name].AOS = true
                },
            }
            // =========================> OBJECT <====================
            this.base[name] = type == 'speed' || type == 'SPEED' ? {... coty_default, ... coty_speed} : coty_default
        }); 
    }
    // constructor is ended ! =============================
    ping = {
        ping_test_date_a: undefined,
        test:()=>{
            this.ping_test_date_a = Date.now()
            this.socket.send(JSON.stringify({data_base:{ping:this.user_data.id}}))
        },
        test_out:()=>{},
    }
    onconnect  () {}
    onerror    () {}
    go_to_path (data, path) {
        return processng.GTPath(data, path)
    }
    creat_data_base(server_password, {base_name, password, read_password, type}) {
        if (this.server_password) server_password = this.server_password
        processng.creat_data_base(this.socket, server_password, {read_password:read_password,password:password, name:base_name, type:type})
        return new Promise((resolve)=>{
            let interval = setInterval(() => {
                if (this.module_data.created_data_base[base_name]) {
                    resolve(true)
                    clearInterval(interval)
                    return
                }
            }, 100);
        })
    }
    delete_data_base(server_password, {base_name}) {
        if (this.server_password) server_password = this.server_password
        processng.delete_data_base(this.socket, server_password, base_name)
        return new Promise((resolve)=>{
            let interval = setInterval(() => {
                if (this.module_data.deleted_data_base[base_name]) {
                    resolve(true)
                    clearInterval(interval)
                    return
                }
            }, 100);
        })
    }
}
module.exports = DIBASE