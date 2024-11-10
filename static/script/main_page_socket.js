
/*
    ===============================
            ISLAM-DZL  DIBASE *** 
    ===============================
*/
var socket = new WebSocket(`ws${location.protocol == 'http:' ? "" :"s"}://${location.host}`)
socket.onopen = ()=>{
    MAIN()
    console.info('connection on web socket server')
    console.info('web socket state : ',socket.readyState)
    socket.send(JSON.stringify({
        data_base:{
            set_domain:{
                id:String(Math.floor(Math.random()*100000000)),
                domains:[]
            }
        }
    }))
}
socket.onmessage =async(event)=>{
socket.onclose = ()=>{
    console.log('closed socket')
}
    const data = JSON.parse(event.data)
    //console.log(data)
    if (! data.data_base) {
        console.log('new message ! : ', data)
    }
    switch (true) {
        case (typeof data.login != "undefined"):
            if (data.login) {
                if (data.type == 'server') {
                    DOM_ALL.innerHTML = P_SERVER
                    _PAGE = 'server'
                    SAVE_LOG('server')
                    
                }else if (data.type == 'data_base') {
                    DOM_ALL.innerHTML = P_DATA_BASE
                    _PAGE = 'base'
                    await SAVE_LOG('bases')
                }
            }else{window.alert('Error in password')}
            break;
        case(typeof data.data_base != "undefined"):
            if (data.data_base.ping) {
                if (document.getElementById('ping')) {
                document.getElementById('ping').innerText = Date.now() - __PING 
            }
            }
            break;
        default:
            if (data.type == _PAGE) {
                _TIME = data.time

                if (data) {
                    if (document.getElementById('name_base')) {
                    document.getElementById('name_base').innerText = data.name
                }
                if (document.getElementById('clients_server')) {
                    document.getElementById('clients_server').innerText = Object.keys(data.clients_databases.all_clients).length
                }
                if (document.getElementById('data_base_clients')) {
                    document.getElementById('data_base_clients').innerText = data.config_base.clients ? Object.keys(data.config_base.clients).length : 0
                }
                if (document.getElementById('data_base_clients_on')) {
                    document.getElementById('data_base_clients_on').innerText = data.clients.length ? data.clients.length : 0
                }
                if (document.getElementById('data_base_rin_state')) {
                    document.getElementById('data_base_rin_state').innerText = data.config_base.rin_state
                }
                if (document.getElementById('data_base_password')) {
                    document.getElementById('data_base_password').innerText = data.config_base.password
                }
                if (document.getElementById('data_base_read_password')) {
                    document.getElementById('data_base_read_password').innerText = data.config_base.read_password
                }
            }
                if (data.type == 'server') {
                    __data_base_clients = data.databases_clients
                    __CONFIG = data.config
                    data.config.data_bases.length ? document.getElementById('_bases').innerHTML = '' : document.getElementById('_bases').innerHTML = '<div><h3 style="color:red; font-family: font_2;margin-top: 20%">Not data bases :(<h3>    </div>'
                    
                    data.config.data_bases.reverse().forEach((baseName)=>{
                        const process_size = (files_size)=>{
                            let size = {}
                            if (files_size >= 1024 * 1024) { // التحقق إذا كان الحجم بالبايت أكبر من أو يساوي 1 ميغابايت
                                size.type = "MB";
                                size.size = Math.floor(files_size / (1024 * 1024));
                                size.fasil = String((files_size % (1024 * 1024)) / 1024).slice(0, 3);
                            } else if (files_size >= 1024) { // التحقق إذا كان الحجم بالبايت أكبر من أو يساوي 1 كيلوبايت
                                size.type = "KB";
                                size.size = Math.floor(files_size / 1024);
                                size.fasil = String(files_size % 1024).slice(0, 3);
                            } else {
                                size.type = "B";
                                size.size = files_size;
                            }
                            return size
                        }
                        if (data.rin_state) {
                            document.getElementById('server_rin').style.backgroundColor = 'rgba(0,0,0,0.4)'
                            document.getElementById('server_rin').value = 'Stop Server'
                        }else{
                            document.getElementById('server_rin').style.backgroundColor = 'rgba(255,0,0,1)'
                            document.getElementById('server_rin').value = 'Start Server'
                        }
                        console.log(data)
                        document.getElementById('_bases').innerHTML += `
                        <div class="pannel" style="height: ${data.config.safety[baseName].type == "speed" ? 220: 150}px;background: linear-gradient(to left, ${data.config.safety[baseName].type == 'speed' ?'rgba(255, 40, 40, 0.7)': 'rgba(120, 120, 0, 0.4)'}, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)">
                            <div style="text-align: end;position: relative;display: flex;flex-wrap: wrap;">
                                <div style="width: 75%;height: auto;text-align: center;overflow-x: scroll;scrollbar-color: transparent,transparent;scrollbar-width: none;">
                                    <h4 style="margin: 0 0 0 0;padding: 5px 0 5px 10px;color: yellow;font-family: 'font_2', sans-serif;" >${baseName}</h4>
                                </div>
                                <input type="button"style="margin: auto; color:white; border:none; border-radius:5px;background-color: green;padding: 0px 5px 5px 4px;transform: translate( 5px ,0px);" onclick="SERVER_BUTTONS('get-info-${baseName}')" value=" . . . ">
                            </div>
                            <hr style="margin: 0;">
                            <div style="display: flex;flex-wrap: wrap;width: 78%;height: 135px;background-color: rgba(137, 43, 226, 0);">
                                <h5 class="tpannelr">State : </h5><h5 class="tpannelg">${data.config.safety[baseName].rin_state?'on':'off'}</h5>
                                <h5 class="tpannelr">clients : </h5><h5 class="tpannelg">${data.config.safety[baseName].rin_state ? Object.keys(data.config.safety[baseName].clients).length : 0}</h5>
                                <h5 class="tpannelr">client-on : </h5><h5 class="tpannelg">${data.databases_clients[baseName] ? Object.keys(data.databases_clients[baseName]).length : 0}</h5>
                                <h5 class="tpannelr">Size : </h5><h5 class="tpannelg">${process_size(data.files_size[baseName].default).type}${process_size(data.files_size[baseName].default).size}</h5>
                                <h5 class="tpannelr">Type : </h5><h5 class="tpannelg">${data.config.safety[baseName].type}</h5>
                                <h5 class="tpannelr">Date : </h5><h5 class="tpannelg">12/5/2024</h5>
                                <hr class="vr" style="transform: translate(0,250px);height: 400px;">
                            </div>
                            <hr style="margin: 0;height: 2px; border: none;background-color: rgba(100, 100, 100, 0.7)">
                            <div  style="display: flex;flex-wrap: wrap;width: 78%;background-color: rgba(137, 43, 226, 0);">
                                <h5 class="tpannelr">state : </h5><h5 class="tpannelg">${"avlble"}</h5>
                                <h5 class="tpannelr">D size : </h5><h5 class="tpannelg">${data.config.safety[baseName].type == "speed" ? process_size(data.files_size[baseName].speed).type + process_size(data.files_size[baseName].speed).size : ''}</h5>

                            </div>
                            <div style="transform: translate(0, -160px);width: 100%;text-align: end;">
                                <input type="button" style="margin-right: 1%; padding: 3px; font-family: 'font_1',sans-serif; color: white;background-color: rgba(0, 0, 0, 0.1); border-radius: 10px;rotate: 90deg;transform: translate(5px ,-5px);" onclick="SERVER_BUTTONS('download-base-${baseName}')" value="DLoad">
                                <br><br><br>
                                <input type="button" style="margin-right: 1%; padding: 3px; font-family: 'font_1',sans-serif; color: white;background-color: rgba(0, 0, 0, 0.1); border-radius: 10px;rotate: 90deg;transform: translate(-3px ,-7px);" onclick="SERVER_BUTTONS('delete-base-${baseName}')" value="Delete">
                                <br><br><br>
                                <input type="button" style="margin-right: 1%; padding: 3px; font-family: 'font_1',sans-serif; color: white;background-color: orange; border-radius: 10px;rotate: 90deg;transform: translate(7px ,-5px);" onclick="SERVER_BUTTONS('cloud-base-${baseName}')" value="Cloud">
                            </div>
                        </div>`
                    })
               
                }

            }
            break;
    }
}