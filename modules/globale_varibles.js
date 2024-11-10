let varibles = {
    time : 0,
    rin_state:true,
    admins_ws: {server:{},bases:{}}, //  { key : ws.id, value : ws } || { key : basename, value : { key : ws.id, value : ws }}
    databases_clients:{},
    clients_databases:{},
    all_clients:{},
    ban:{}, // on { ws._id : {ban :false, attempts: config.__server.password_attempts}} 
    groups_speeds:{}
}

setInterval(() => {
    varibles.time = varibles.time += 5
}, 5000);

module.exports = varibles 