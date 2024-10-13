default config file 
{
    "__server":{
       "password":"12345678" ,
       "password_attempts":3
    },
    "data_bases":[],
    "safety":{}
}
******************************************************************
{{{{{{{{{{{{{{{{{{{{{{{{{{{{{ ADMINS  SERVER }}}}}}}}}}}}}}}}}}}}
request Server

{
    "data_base":{
        "admins_server":{
            "password":"",
            "exec":{

        ---------------------------------------

        ---------------------------------------
                "re_password" : "new password"
        ---------------------------------------
                "rin_state" : true / false
        ---------------------------------------
                "create_base" : { "password":"", "read_password":"", "name":""}
        ---------------------------------------
                "delete_base" : "name data base"
        ---------------------------------------
                "formate" : "new password"
        ---------------------------------------
        
            }
        }
    }
}
}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
response Server

--------------------------------------
{
    "login":true / false,
    "type":'data_base'/'server'
}
--------------------------------------
{
    "type":"server",
    "time":100,
    "clients_and_info":{},
    "data_base_clients":{},
    "confige":{}
}
}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
******************************************************************
{{{{{{{{{{{{{{{{{{{{{{{{{{{{{ ADMINS BASE }}}}}}}}}}}}}}}}}}}}}}}
request Server

{
    "data_base":{
        "admins_base":{
            "password":"yor password",
            "base":"base name",
            "exec":{

        ---------------------------------------

        ---------------------------------------
                "re_password" : {"read_password":"new read password", "password":"new password"}
        ---------------------------------------
                "rin_state" : true / false
        ---------------------------------------
                "delete_base" : "password"
        ---------------------------------------
                "formate" : "password"
        ---------------------------------------
        
            }
        }
    }
}
}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
response Server


--------------------------------------
{
    "login":true / false,
    "type":'data_base'/'server'
}
--------------------------------------
{
    "type":"base",
    "time":120,
    "confige_base":{},
    "clients":[]
}
}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
******************************************************************
on open web socket client
{
    "data_base":{
        "set_domain":{
            "id":"islamxxxislam24135454",
            "domains":[
                {
                    "name":"islam",
                    "password":"islam"
                },
                {
                    "name":"islam1",
                    "password":"22222222"
                }
            ]
        }
    }
}
------------------------------------------------------------------
create data base 
{
    "data_base":{
        "password":"server password",
        "create_base":{
            "name":"islam",
            "password":"12345678",
            "read_password":"1111111"
        }
    }
}
------------------------------------------------------------------
set data on data_bases     Write
{
    "data_base":{
        "set":{
            "data_base":"islam",
            "data":{
                "name":"islam",
                "age":17
            }
        }
    }
}
*******************
response 

------------------------------------------------------------------
get data on data_bases     Read
{
    "data_base":{
        "get":{
            "password":"",
            "data_base":"islam"
        }
    }
}
*******************
response
{
    "data_base":{
        "get":{
            "name":"data base name"
            "data":{}
        }
    }
}
------------------------------------------------------------------
 test Ping speed  PING
 {
    "data_base":{
        "ping":"my"
    }
 }
//////////////////////////////////////////////////////////////////

________________________________________________________________________________

       <div class="info">
            <h3 style="font-family: 'font_1', sans-serif;font-weight: 100;">ISLAM-DZL</h3>
            <hr>
            <h5 style="color: yellow;font-family: 'font_2', sans-serif;">Web Socket States</h5>
            <ul dir="rtl" style="list-style-type: none; padding: 0;">
                <li><h4 class="inline">965452</h4><h5 class="inline"> : running time</h5></li>
                <li><h4 class="inline">True</h4><h5 class="inline"> : connect</h5></li>
                <li><h4 class="inline">96</h4><h5 class="inline"> : Ping</h5></li>
            </ul>            
            <hr>
            <h5 style="color: yellow;font-family: 'font_2', sans-serif;">powers</h5>
            <ul dir="rtl" style="list-style-type: none; padding: 0;">
                <li><h4 class="inline">READ</h4></li>
                <li><h4 class="inline">WRITE</h4></li>
                <li><h4 class="inline">DELETE</h4></li>
                <li><h4 class="inline">EDITE</h4></li>
            </ul>
            <hr>
            <h5 style="color: yellow;font-family: 'font_2', sans-serif;">Data Base</h5>
            <h5 style="margin: 5px;">Password</h5>
            <h4 style="margin: 0;">password</h4>
            <h5 style="margin: 5px">Read Password</h5>
            <h4 style="margin: 0;">Read _password</h4>
            <div style="margin-left: 40%;">
                <h5 style="display: inline;">Hidden</h5>
                <input dir="rtl" type="checkbox">
            </div>
            <ul dir="rtl" style="list-style-type: none; padding: 0;">
                <li><h4 class="inline">6</h4><h5 class="inline"> : Clients</h5></li>
            </ul>

            <hr>
            <h5 style="color: yellow;font-family: 'font_2', sans-serif;">Edit Data Base</h5>
                <input type="text" id="" class="intext" style="width: 90%; margin: auto; margin-bottom: 10px;" placeholder="New Password">
                <input type="text" id="" class="intext" style="width: 90%; margin: auto; margin-bottom: 5px;" placeholder="New Password Read">
                <input type="button" style="width: auto;margin-top: 10px; background-color: rgba(0, 128, 0, 0.7);" id="in2" class="buttons" value="Update Password">
                <input type="button" style="width: auto;margin-top: 10px; background-color: rgba(0, 128, 0, 0.7);" id="in2" class="buttons" value="Download JSON File">
                <input type="button" style="width: auto;margin-top: 10px; background-color: red;" id="in2" class="buttons" value="Delete Base">

        </div>
        <hr class="vr">
        <div class="controls">
            <div class="inputs">
                <div style="margin-top: 10px;">
                    <h5 style="color: yellow;display: inline;font-family: 'font_1', sans-serif;">Name base</h5>
                    <h4 style="display: inline;">MANE</h4>
                    <hr>
                    <h5 style="color: yellow;display: inline; margin: 0;font-family: 'font_2', sans-serif;">Add / Edit / Delete</h5>
                    <div>
                        <input type="text" id="" class="intext" placeholder="Key">
                        <input type="text" id="" class="intext" placeholder="Value">
                    </div>
                    <div>
                        <input type="button" value="SET" id="in1" class="buttons">
                        <input type="checkbox"><h5 style="display: inline;"> Delete</h5>
                    </div>
                </div>
                <hr>
                <h5 style="color: yellow;display: inline; margin: 0;font-family: 'font_2', sans-serif;">Add / Edit</h5>
                <div>
                    <input type="text" id="" class="intext" placeholder="Key">
                    <input type="text" id="" class="intext" placeholder="Password">
                </div>
                <div>
                    <input type="button" value="GET" id="in2" class="buttons">
                    <input type="checkbox">
                    <h5 style="display: inline;">password</h5>
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
        </div># dibase
