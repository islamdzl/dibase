/*
    ============================
            ISLAMDZL ***
    ============================
 */
const P_DATA_BASE = `
<div class="info">
    <h3 style="font-family: 'font_1', sans-serif;font-weight: 100;">DIBASE-DZL</h3>
    <hr>
    <h5 style="color: yellow;font-family: 'font_2', sans-serif;">Web Socket States</h5>
    <ul dir="rtl" style="list-style-type: none; padding: 0;">
        <li><h4 class="inline" id="time"></h4><h5 class="inline"> : running time</h5></li>
        <li><h4 class="inline" id="web_socket_state"></h4><h5 class="inline"> : connect</h5></li>
        <li><h4 class="inline" id="ping"></h4><h5 class="inline"> : Ping</h5></li>
    </ul>            
    <hr>
    <h5 style="color: yellow;font-family: 'font_2', sans-serif;">Data Base</h5>
    <ul dir="rtl" style="list-style-type: none; padding: 0;">
        <li><h4 class="inline" id="data_base_rin_state">On</h4><h5 class="inline"> : State</h5></li>
        <li><h4 class="inline" id="data_base_clients">6</h4><h5 class="inline"> : All Clients</h5></li>
        <li><h4 class="inline" id="data_base_clients_on">3</h4><h5 class="inline"> : Clients On</h5></li>
    </ul>
    <h5 style="margin: 5px;font-family: 'font_1', sans-serif;">Password</h5>
    <h4 style="margin: 0;text-security: disc;-webkit-text-security: disc;" id="data_base_password"></h4>
    <h5 style="margin: 5px;font-family: 'font_1', sans-serif;">Read Password</h5>
    <h4 style="margin: 0;text-security: disc;-webkit-text-security: disc;" id="data_base_read_password"></h4>
    <div style="margin-left: 40%;">
        <h5 style="display: inline;">Hidden</h5>
        <input dir="rtl" type="checkbox" checked="true" id="checkbox-password" onclick="DATA_BASE_BITTONS('checkbox-password')">
    </div>

    <hr>
    <h5 style="color: yellow;font-family: 'font_2', sans-serif;">Edit Data Base</h5>
        <input type="text" id="base-new-password" class="intext" style="width: 90%; margin: auto; margin-bottom: 10px;" placeholder="New Password">
        <input type="text" id="base-new-read-password" class="intext" style="width: 90%; margin: auto; margin-bottom: 5px;" placeholder="New Password Read">
        <input type="button" style="width: auto;margin-top: 10px; background-color: rgba(0, 128, 0, 0.7);" class="buttons" onclick="DATA_BASE_BITTONS('update-passwords')" value="Update Password">
        <input type="button" style="width: auto;margin-top: 10px; background-color: rgba(0, 128, 0, 0.7);" class="buttons" onclick="DATA_BASE_BITTONS('download-json-file')" value="Download JSON File">
        <div style="display:inline">
            <input type="button" style="width: auto;margin-top: 10px; background-color: red;" id="in2" class="buttons" onclick="document.getElementById('delete-base-check').checked == true ? DATA_BASE_BITTONS('delete-data-base') :console.log('pleas enter check box')" value="Delete Base">
            <input type="checkbox" id="delete-base-check">
        </div>
</div>
<hr class="vr">
<div class="controls">
    <div class="inputs">
        <div style="margin-top: 10px;">
            <h5 style="color: yellow;display: inline;font-family: 'font_1', sans-serif;">Name base</h5>
            <h4 style="display: inline;" id="name_base"></h4>
            <hr>
            <h5 style="color: yellow;display: inline; margin: 0;font-family: 'font_2', sans-serif;">Add / Edit / Delete</h5>
            <div>
                <input type="text" id="base-set-key" class="intext" placeholder="Key">
                <input type="text" id="base-set-value" class="intext" placeholder="Value">
            </div>
            <div>
                <input type="button" value="SET" id="in1" class="buttons">
                <input type="checkbox" id="checkbox-delete" onclick="DATA_BASE_BITTONS('checkbox-delete')" ><h5 style="display: inline;"> Delete</h5>
            </div>
        </div>
        <hr>
        <h5 style="color: yellow;display: inline; margin: 0;font-family: 'font_2', sans-serif;">Get</h5>
        <div>
            <input type="text" id="" class="intext" placeholder="Key">
        </div>
        <div>
            <input type="button" value="GET" id="in2" class="buttons">
        </div>
    </div>
    <div>
        <hr>
        <h5 style="color: yellow;margin: 0;font-family: 'font_2', sans-serif;">Console</h5>
        <input type="button" value="scroll" class="clear" id="scroll">
        <input type="button" value="clear" class="clear" id="clear">
        <hr style="border: none;height: 2px; background-color: rgb(92, 39, 48);">
    </div>
    <div class="console" dir="ltr">
        <h1 style="font-family: 'font_1', sans-serif;font-weight: 100;">ISLAM-DZL</h1>
        <h5>islam szefgeqrg er qrzeg qrzge z gqezr gqrezg qzse ze</h5>
        <h5>islam szefgeqrg er qrzeg qrzge z gqezr gqrezg qzse ze</h5>

        <h5>islam</h5>
    </div>
</div>`
const P_SERVER = `
<div class="server_data">
    <h2 style=" font-family: 'font_4', sans-serif; letter-spacing: 3px; color: green;display: inline;margin: 0;font-size: 30px;">Dibase-<h2 style="font-family: 'font_4', sans-serif;letter-spacing: 3px;animation: dzl 4s linear infinite;display: inline-block;font-size: 30px;color: green;margin:15px 0 10px 0;">DZL</h2></h2>
    <hr>    
    <div id="_bases">
    </div>

</div>
<div class="server_info">
    <input type="button" style="width: 90%;background-color: rgba(0,0,0,0.4);" class="buttons" onclick="SERVER_BUTTONS('rin')" id="server_rin" value="Stop Server">
    <input type="button" style="width: 90%;background-color: rgba(0,0,0,0.4);" class="buttons" onclick="SERVER_BUTTONS('creat_base')" value="Create Base">
    <input type="button" style="width: 90%;background-color: rgba(0,0,0,0.4);" class="buttons" onclick="SERVER_BUTTONS('re-password')" value="re password">
    <input type="button" style="width: 90%;background-color: rgba(0,0,0,0.4);" class="buttons" onclick="SERVER_BUTTONS('formate')" value="formate">
    <hr style="border-color: rgb(92, 39, 48);">
    <div style="display: flex;flex-wrap: wrap;">
        <h5 class="tpannelr" style="color: yellow;">Ping : </h5><h5 class="tpannelg" id="ping">12</h5>
        <h5 class="tpannelr" style="color: yellow;">Time : </h5><h5 class="tpannelg" id="time"></h5>
        <h5 class="tpannelr" style="color: yellow;">Clients : </h5><h5 class="tpannelg" id="clients_server">00</h5>
        <h5 class="tpannelr" style="color: yellow;">socet:</h5><h5 class="tpannelg"id="web_socket_state"></h5>
    </div>
    <hr>
    <div id="info-base">
    <h3 style="margin: 0;font-family: 'font_4',sans-serif;letter-spacing: 3px;color: red;"></h3>
    <div style="display: none;" id="server_delete_base">

    </div>
    `
const P_LOG_SERVER = `
<div class="log">
    <h1 style="font-family: font_3, sans-serif;color: green;">Server</h1>
    <input type="text" id="_password_log_server" class="intext" style="width: 75%;height: 7%;font-size: 20px;margin-top: 10%;" placeholder="Password">
    <input type="button" style="background-color: rgba(0,0,0,0.4);border-color: rgb(47, 0, 255);margin-top: 20%;width: 40%;height: 35px;" class="buttons" onclick="LOG_IN('server')" value="Log in">`
const P_LOG_DATA_BASE = `
<div class="log">
    <h1 style="font-family: font_3, sans-serif;color: green;margin: 10px auto 10px auto;">Data Base</h1>
    <div style="display: flex;flex-wrap: nowrap;height: 100%;">
        <div style="height: 100%;margin-top: 30px;">
            <input type="text" id="_base_log_name" class="intext" style="width: 75%;height: 7%;font-size: 20px;" placeholder="Data Base">
            <input type="text" id="_base_log_password" class="intext" style="width: 75%;height: 7%;font-size: 20px;margin-top: 10%;" placeholder="Password">
            <input type="button" style="background-color: rgba(0,0,0,0.4);border-color: rgb(47, 0, 255);margin-top: 20%;width: 40%;height: 35px;" class="buttons" onclick="LOG_IN('data_base')" value="Log in">    
        </div>
        <div style="height: 100%;min-width: 40%;align-items: center;background-color: rgba(0,0,0,0.2);margin-right: 10px;border-radius: 15px;overflow: hidden;" id="_data_bases">
            <h4 style="margin: 15px auto 5px auto;color: yellow;">Data Bases</h4>
            <hr>
            <div style="display:flex;flex-direction: column;width: 100%;height: 65%;align-items: center;overflow-y: scroll;scrollbar-color: red transparent;" id="_bases">
            </div>
        </div>
    </div>
</div>`