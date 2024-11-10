/*
    ===============================
            ISLAM-DZL  DIBASE *** 
    ===============================
*/
const SERVER_BUTTONS = async(button)=>{
    let __Storage = await JSON.parse(localStorage.getItem('info'))
    const EXECSERVER = (key, command, pass)=>{
        socket.send(`{
                    "data_base":{
                        "admins_server":{
                            "password": "${pass ? atob(pass):atob(__Storage.server.password)}",
                            "exec":{
                                "${key}" :${command}
                            }
                        }
                    }
                }`)
    }
    switch (button) {
        case 'rin':
        EXECSERVER('rin_state', document.getElementById('server_rin').value == 'Stop Server' ? false : true)
            break;   
        case 'creat_base':
            document.getElementById('_bases').innerHTML = `
                <input type="text" id="creat_base_name" class="intext" style="width: 90%; margin: 10px 0 10px 0; height:28px;" placeholder="Name">
                <input type="text" id="creat_base_password" class="intext" style="width: 90%; margin: 10px 0 10px 0; height:28px;" placeholder="Password">
                <input type="text" id="creat_base_red_password" class="intext" style="width: 90%; margin: 10px 0 10px 0; height:28px;" placeholder="Read Password">
                <br>
                <h4 style="font-family: font_1 , sans-serif;color: yellow">type speed <input type="checkbox" id="create_data_base_type_speed"></h4>
                <input type="button" style="width: 70%; background-color: rgba(0,0,0,0.4);" class="buttons" value="Confirm"onclick="SERVER_BUTTONS('confermi_creat_base')">
                <input type="button" style="width: 70%; background-color: rgba(0,0,0,0.4);" class="buttons" value="Cansel" onclick="SERVER_BUTTONS('cansel_creat_base')">
            `
            break
        case 'cansel_creat_base':
            EXECSERVER('rin_state' , document.getElementById('server_rin').value == 'Start Server' ? false : true)
            break
        case 'confermi_creat_base':
            EXECSERVER("create_base" , `{"name":"${document.getElementById('creat_base_name').value}","password":"${document.getElementById('creat_base_password').value}","read_password":"${document.getElementById('creat_base_red_password').value}","type":"${document.getElementById('create_data_base_type_speed').checked ? 'speed': 'default'}"}`)
            break
        case (button.slice(0, 9) == 'get-info-'? button : ''):// Clients connection in database
            let base = button.slice(9, button.length)
            let clients = `
                <h3 style="margin: 0;font-family: 'font_4',sans-serif;letter-spacing: 3px;color: red;">${base}</h3>
                    <div style="background-color: rgba(0, 0, 0, 0.5);padding: 5px;margin: 5px;border-radius: 10px;">
                        <h4 style="color: yellow;margin: 5px;">Password</h4>
                        <h5 style="font-family: font_1 , sans-serif;letter-spacing: 1px; margin: 0;">${__CONFIG.safety[base].password}</h5>
                    </div>
                <div style="background-color: rgba(0, 0, 0, 0.5);padding: 5px;margin: 5px;border-radius: 10px;">
                    <h4 style="color: yellow;">Clients</h4>
                `
                if (__CONFIG) {
                    Object.keys(__CONFIG.safety[base].clients).forEach((config_client)=>{
                        let IF = Object.keys(__data_base_clients[base]).some((client)=>client == config_client)
                        if (__data_base_clients[base]) {
                            if (IF) {
                                clients += `
                                    <h5 class="cliN">${config_client}</h5>`
                            }else{
                                clients += `
                                    <h5 class="cliF">${config_client}</h5>`
                            }
                        }else{
                            clients += `
                                    <h5 class="cliF">${config_client}</h5>`
                        }
                    })
                    document.getElementById('info-base').innerHTML = clients + '</div>'
                }
            break
        case (button.slice(0, 12) == 'delete-base-'? button : ''):
            let baseD = button.slice(12, button.length)
            if (baseD == 'cansle') {
                document.getElementById('info-base').innerHTML = ''
            }else{
                document.getElementById('info-base').innerHTML = `
                <div style="display: block;" id="server_delete_base">
                    <h3 style="margin: 0;font-family: 'font_4',sans-serif;letter-spacing: 3px;color: red;">Delete</h3>
                    <input type="button" style="width: 90%; background-color: rgba(0,0,0,0.4);" class="buttons" onclick="SERVER_BUTTONS('confermi-delete-base-${baseD}')" value="Confirm">
                    <input type="button" style="width: 90%; background-color: rgba(0,0,0,0.4);" class="buttons" onclick="SERVER_BUTTONS('delete-base-cansle')" value="Cansel">
                </div>`

            }
            break
        case (button.slice(0, 14) == 'download-base-'? button : ''):
            let basew = button.slice(14, button.length)
            socket.send(JSON.stringify({
                data_base:{
                    get:{
                        password:__CONFIG.safety[basew].password,
                        data_base:basew
                    }
                }
            }))
            break
        case 're-password':
            document.getElementById('_bases').innerHTML = `
                <input type="text" id="server-re-password" class="intext" style="width: 90%; margin: 10px 0 10px 0; height:28px;" placeholder="new Password">
                <input type="button" style="width: 70%; background-color: rgba(0,0,0,0.4);" class="buttons" value="Confirm"onclick="SERVER_BUTTONS('confermi-re-password')">
                <input type="button" style="width: 70%; background-color: rgba(0,0,0,0.4);" class="buttons" value="Cansel" onclick="SERVER_BUTTONS('cansel_creat_base')">
            `
            break
        case 'confermi-re-password': 
            let new_password = document.getElementById('server-re-password').value
            EXECSERVER('re_password', `"${new_password}"`, __Storage.server.password)
            let ED__Storage = __Storage
            ED__Storage.server.password = btoa(new_password)
            localStorage.setItem('info', JSON.stringify(ED__Storage))
            break
        case 'formate':
            document.getElementById('info-base').innerHTML = `
                <div style="display: block;" id="server_delete_base">
                    <h3 style="margin: 0;font-family: 'font_4',sans-serif;letter-spacing: 3px;color: red;">Formate</h3>
                    <input type="button" style="width: 90%; background-color: rgba(0,0,0,0.4);" class="buttons" onclick="SERVER_BUTTONS('confermi-formate')" value="Confirm">
                    <input type="button" style="width: 90%; background-color: rgba(0,0,0,0.4);" class="buttons" onclick="SERVER_BUTTONS('delete-base-cansle')" value="Cansel">
                </div>`
            break
        case 'confermi-formate':
            EXECSERVER('formate',`"${atob(__Storage.server.password)}"`)
            window.alert('wait for data delete')
            socket.close()
            setTimeout(()=>{location.href = location.href},5000)
            break
        case (button.slice(0, 21) == "confermi-delete-base-" ? button : ""):
            let base_name = button.slice(21, button.length)
            EXECSERVER("delete_base", `"${base_name}"`)
            break
        default:
            break;
    }
}