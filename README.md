THIS README.MD FILE TO SERVER AND MODULE

    |=================> General <===================|
    |   - VERSION  :   2.0.0         BETA           |
    |   - OWNER    :   islamdzl                     |
    |   - DEVLOPER :   islamdzl                     |
    |   - SOURSE   :   closed                       |
    |   - GITHUB   :   https://github.com/islamdzl  |
    |=================> Object Base <======================================================|
    |>               Functions                  <|>            Actions          <|> Await <|
    |.get (path)                                 |=> return data                 |   yes   | 
    |.set (data,||path,||clear_end)              |=> onchange({ dataA , dataB }) |   yes   |
    |.creat_paths ([path, path])                 |=> onchange({ dataA , dataB }) |   yes   |
    |.clear ( true/false )                       |=> clear all data on data base |   yes   |
    |.change ()                                  |=> onchange({ {   } , dataB }) |   no    |
    |--------------------> speed                 |                               |         |
    |.get_speed (data,||path,||clear_end)        |=> onchange({ dataA , dataB }) |   yes   |
    |.set_speed (data,||path,||clear_end)        |=> onchange({ dataA , dataB }) |   yes   |
    |.clear_speed (data,||path,||clear_end)      |=> onchange({ dataA , dataB }) |   yes   |
    |.cloud_speed (data,||path,||clear_end)      |=> onchange({ dataA , dataB }) |   yes   |
    |.creat_paths_speed ([path, path])           |=> onchange({ dataA , dataB }) |   yes   |
    |.exec_speed ((null)=>{ </code> })           |=> onchange({ dataA , dataB }) |   yes   |
    |.speedr ()                                  |=> onspeedr({ {   } , dataB }) |   no    |
    |--------------------------------------------------------------------------------------|
    |.AOC        = refriching for onchange       |=> true/false                            |
    |.AOS        = refriching for onspeedr       |=> true/false                            |
    |.data       = data for database             |=> {}   type : Objec/JSON                |
    |.data_speed = data speed for database       |=> {}   type : Objec/JSON                |
    |.password   = password for database         |=> "password-reader/writer"              |
    |.type       = type for database             |=> "speed"/"default"                     |
    |.load       = false and on load data = true |=> true/false                            |
    |--------------------------------------------------------------------------------------|
    |path : ["path", "to", "set", "data"]        |=> path to location data                 |
    |data : {  example : "islamdzl"}             |=> yor data object                       |
    |clear_end  : true/false                     |=> to clear end object                   |
    |------------------------> more              |                                         |
    |not_save   : true/false                     |=> save data on database                 |
    |resend_me  : true/false                     |=> await resend me data                  |
    |--------------------------------------------------------------------------------------|
    |.onerror  : Function > ("message error")    |=> message error for database         |
    |.onchange : Function > ({ dataA:data_before, dataB:data_aftter }) | for default    |
    |.onspeedr : Function > ({ dataA:data_before, dataB:data_aftter }) | for speed      |
    |================> Function Tasks On File Processing Data <=========================================================|
    | processing     ( dataA , dataB )   default processing for data                  >>> return { new data }           |
    | processng_speed( data  , dataA )   speed processing for data                    >>> return { new data }           |
    | ECObject( path , dataA , dataB ) > Edite dataA to dataB in path and clear       >>> return { new data }           |
    | EAObject( path , dataA , dataB ) > Edite dataA to dataB in path                 >>> return { new data }           |
    | CPath( data , path , clear_end ) > Creat path on object  | clear_end            >>> return { new data }           |
    | GTPath          ( data , path )             > Go to locatin path                >>> return { yor data }           |
    | IPath           ( data , path )             > Check in path on data             >>> return true/false             |
    | creat_path ( data , path , clear_end )      > creat_path on object              >>> return { new data }           |
    | delete_         ( data , path )             > delete path on data               >>> return { new data }           |
    | creat_data_base (socket , password , data)  > creat new data base               >>> return null                   |
    | delete_data_base(socket , password , name)  > delete data base                  >>> return null                   |
    | object_to_arrey ( data , path )             > convert to 2 array [keys, values] >>> return { keys:[], values:[] } |
    | help( true/false )               > Return this info|if true print console       >>> return  string                |
    |===================================================================================================================|

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
