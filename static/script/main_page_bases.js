/*
    ===============================
            ISLAM-DZL  DIBASE *** 
    ===============================
*/
const DATA_BASE_BITTONS = async(button)=>{
    let __Storage = JSON.parse(await localStorage.getItem('info'))
    switch (button) {
        case 'checkbox-password':
            if (document.getElementById('checkbox-password').checked) {
                document.getElementById('data_base_password').style =`
                margin: 0;
                text-security: disc;
                -webkit-text-security: disc;
                `
                document.getElementById('data_base_read_password').style =`
                margin: 0;
                text-security: disc;
                -webkit-text-security: disc;
                `
            }else{
                document.getElementById('data_base_password').style = `margin: 0;`
                document.getElementById('data_base_read_password').style = `margin: 0;`
            }
            break;
        case 'checkbox-delete':
            if (document.getElementById('checkbox-delete').checked) {
                document.getElementById('base-set-value').style.display = 'none'
            }else{
                document.getElementById('base-set-value').style.display = 'inline'
            }
            break;
        case 'update-passwords':
            let new_password = document.getElementById('base-new-password').value
            let new_read_password = document.getElementById('base-new-read-password').value
            socket.send(JSON.stringify({
                data_base:{
                    admins_base:{
                    password:atob(__Storage.data_bases[__THIS_BASE].password),
                    base: __THIS_BASE,
                    exec:{
                        re_password : {read_password:new_read_password, password:new_password}
                    }
                }
            }
            }))
            __Storage.data_bases[__THIS_BASE].password = btoa(new_password)
            localStorage.setItem('info',JSON.stringify(__Storage))
            new_password = ''
            new_read_password = ''
            break
        case 'delete-data-base':
            let base = __THIS_BASE
            GET_LOG('data_bases')
            socket.send(JSON.stringify({
                data_base:{
                admins_base:{
                    password:atob(__Storage.data_bases[__THIS_BASE].password),
                    base:__THIS_BASE,
                    exec:{
                        delete_base : atob(__Storage.data_bases[__THIS_BASE].password)
                    }
                }
            }
            }))
            break
        default:
            break;
    }
}