const { Dir } = require('fs')
const DIBASE = require('./MODULE/DIBASE')

const domains = {
    id:"islamxxxisladmsssdddd",
    domains:[
        {
            name:"islam",
            password:"islam",
            type:'speed'
        }
    ] 
}
const DIB = new DIBASE('ws://localhost:2007',domains)
DIB.wait_change_data_state = true
const paths = [['a1','a2','a3','a4','a5'],['b1','b2','b3','b4','b5'],['c1','c2','c3','c4','c5']]
// DIB.help(true)
const database = DIB.base[domains.domains[0].name]
DIB.server_password = "islamdzl"
database.onspeedr = async({dataA, dataB})=>{
    console.log('DATAB', JSON.stringify(dataB))

}

database.onchange = async({dataA, dataB})=>{
    // console.log('dataB : ',JSON.stringify(dataB))
    // await database.set({N: dataB.path.to.numbers.N + 1}, ['path', 'to', 'numbers'])
    // console.log(dataB.path.to.numbers)
}      
database.onerror = async({ base_not})=>{
    if (base_not) {

    }
}
DIB.onconnect = async()=>{
    // DIB.creat_data_base(undefined, {base_name:'islamdzl', password:'islam',read_password:'islamr',type:'speed'})
    
    // database.get_speed()
    // database.cloud_speed()
    // database.creat_paths_speed(paths)
    // database.clear_speed(1)
    // await database.clear_speed(1)
    // await database.get_speed()
    // console.log(await database.clear(true))
    // console.log(await database.creat_paths([['path', 'to', 'numbers']]))
    // console.log(await database.set({N: 0}, ['path', 'to', 'numbers']))
    // console.log(await database.set({go: true}, []))
    
    database.exec(async()=>{
        await database.clear(1)
        await database.creat_paths_speed([['path', 'to', 'numbers']])
        await database.set_speed({N:0}, ['path', 'to', 'numbers'])
        await database.cloud_speed(1)
        await database.creat_paths([['path', 'to', 'numbers'],['path']])
    })

    console.log('writeng')
}

