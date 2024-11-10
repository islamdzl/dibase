THIS README.MD FILE TO SERVER AND MODULE

        |===============|
        |MODULE > DIBASE|
        |=================> General <===================|
        |   - VERSION  :   1.1.0         BETA           |
        |   - OWNER    :   islamdzl                     |
        |   - DEVLOPER :   islamdzl                     |
        |   - SOURSE   :   closed                       |
        |   - GITHUB   :   https://github.com/islamdzl  |
        |=================> Object Base <=======================================|
        |.get( path )                    |=> return data                        |
        |.set(data,||path,||clear_end)   |=> onchange({ dataA , dataB })        |
        |.creat_path(data,path,clear end)|=> return new data                    |
        |.clear ( true/false )           |=> clear all data on data base        |
        |.change()                       |=> onchange({ {   } , dataB })        |
        |.load      =  false/true        |=> onload( data ) false && on get data|
        |.data      = data for database  |=> {}   type : Objec/JSON             |
        |-----------------------------------------------------------------------|
        |path : ["path", "to", "set", "data"]|[ 0 ]  |=> path to location data  |
        |data : {  example : "islamdzl"}             |=> yor data object        |
        |clear_end  : true/false                     |=> to clear end object    |
        |-----------------------------------------------------------------------|
        |.onload   : Function > ( data )                                        |
        |.onchange : Function > ({ dataA:data_before, dataB:data_aftter })      |
        |.onerror  : Function > ("message error")                               |
        |================> Function Tasks <==================================================================|
        | creat_data_base('server password ',{ name, password, read_password })     >>> return  true/false   |
        | object_to_arrey( { } ) > return keys and values arrey                     >>> return {keys,values} |
        | EAObject( path , dataA , dataB ) > Edite dataA to dataB in path           >>> return { new data }  |
        | CPath( data , path , clear_end ) > Creat path on object  | clear_end      >>> return { new data }  |
        | GTPath(data , path )             > Go to locatin path                     >>> return { yor data }  |
        | IPath( data , path )             > Check in path on data                  >>> return true/false    |
        | help( true/false )               > Return this info|if true print console >>> return  string       |
        |====================================================================================================|

default config file 
{
    "__server":{
       "password":"islamdzl" ,
       "password_attempts":3
    },
    "data_bases":[],
    "safety":{}
}

{
    data_base:{

        set_speed:{

        }
        get_speed:{

        }

    }
}

==================== SET DOMAINS =======================
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
==================== GET ================================
REQUEST :
{
    "data_base":{
        "get":{
            "password":"",
            "name":"islam",
             || path : ["path/to/yor/object"],
        }
    }
}
RESPONSE :
{
    "data_base":{
        "get":{
            "path":["path/tor/object"]
            "name":"data base name"
            "data":{}
        }
    }
}
==================== SET ===============================
{
    "data_base":{
        "set":{
            "name":"islam",
            "data":{
                "developer":"islamdzl"
            },
            "path":["path","to","data","location"],
            "creat_path":["path","to","data","location"],
            "resend_me":true,
            "not_save": false,
            "clear_end":false
            "delete":["path","to","data","location"]
        }
    }
}
RESPONSE : if resend_me  => get()
==================== GET SPEED =========================
REQUEST :
{
    "data_base":{
        "get_speed":{
            "name":"islam",
            "path": []
        }
    }
}
RESPONSE :
{
    "data_base":{
        "get_speed":{
            "name":"islam",
            "path": [],
            "data":{}
        }
    }
}
==================== SET SPEED =========================
{
    "data_base":{
        "set_speed":{
            "name":"islam",
            "path": [],
            "creat_path": [],
            "cloud" : true,
            "resend_me":true,
            "not_save": false,
            "clear_end":false,
            "delete":["path","to","data","location"]
        }
    }
}
==================== CREAT DATA BASE ===================
request : 
{
    "data_base":{
        "admins_server":{
            "no_admin":false,
            "password":"",
            "exec":{
                "create_base" : { "password":"", "read_password":"", "name":"", "type":"speed/default"}
            }
        }
    }
}
response :
==================== ADMINS SERVER =====================
REQUEST:
{
    "data_base":{
        "admins_server":{
            "no_admin":false,
            "password":"",
            "exec":{
        ---------------------------------------
                "re_password" : "new password"
        ---------------------------------------
                "rin_state" : true / false
        ---------------------------------------
                "create_base" : { "password":"", "read_password":"", "name":"", "type":"speed/default"}
        ---------------------------------------
                "delete_base" : "name data base"
        ---------------------------------------
                "formate" : "new password"
        ---------------------------------------
                "download" : "file name"
        ---------------------------------------
        
            }
        }
    }
}
RESPONSE:
{
    "login":true / false,
    "type":'server'
}
==================== ADMINS BASE =======================
REQUEST:
{
    "data_base":{
        "admins_base":{
            "password":"yor password",
            "no_admin":false,
            "base":"base name",
            "exec":{
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
RESPONSE:
{
    "login":true / false,
    "type":'data_base'
}
==================== TEST PING =========================
{
    "data_base":{
        "ping":"me"
    }
}

======================= OATH ===========================
{
    "data_base":{
        "not_base":"data base name"
    }
}
