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
       "password":"12345678" ,
       "password_attempts":3
    },
    "data_bases":[],
    "safety":{}
}
_______________________________________________________
___________________{ ADMINS SERVER }___________________
request Server

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
                "create_base" : { "password":"", "read_password":"", "name":""}
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
____________________________________________________
response Server

{
    "login":true / false,
    "type":'data_base'/'server'
}

{
    "type":"server",
    "time":100,
    "clients_and_info":{},
    "data_base_clients":{},
    "confige":{}
}
____________________________________________________
___________________{ ADMINS BASE }__________________
request Server

{
    "data_base":{
        "admins_base":{
            "password":"yor password",
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
response Server

{
    "login":true / false,
    "type":'data_base'/'server'
}

{
    "type":"base",
    "time":120,
    "confige_base":{},
    "clients":[]
}
____________________________________________________
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
____________________________________________________
set data on data_bases     Write
{
    "data_base":{
        "set":{
            "data_base":"islam",
            "data":{
                "name":"islam",
                "age":17
            },
             || path : ["path/to/yor/object"],
             || "clear_end": true/false
        }
    }
}
____________
response 

____________________________________________________
get data on data_bases     Read
{
    "data_base":{
        "get":{
            "password":"",
            "name":"islam",
             || path : ["path/to/yor/object"],
             || "clear_end": true/false
        }
    }
}

response 
{
    "data_base":{
        "get":{
            "name":"data base name"
            "data":{}
        }
    }
}

{
    "data_base":{
        "get":{
            "path":["path/tor/object"]
            "name":"data base name"
            "data":{}
        }
    }
}
____________________________________________________
====================================================
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
____________________________________________________
 test Ping speed  PING
 {
    "data_base":{
        "ping":"my"
    }
 }
____________________________________________________
{
    "data_base":{
        "not_base":"data base name"
    }
}
____________________________________________________
