const DIBASE = require('./MODULE/DIBASE')

const domains ={
    id:"islamxxxislam24135454",
    domains:[
        {
            name:"islam",
            password:"islam"
        },
        {
            name:"leg",
            password:"password"
        }
    ] 
}
const DIB = new DIBASE('ws://localhost:2007',domains)

// DIB.help(true)
DIB.base.islam.onload = async(data)=>{
    console.log(data)
} 
DIB.base.islam.onerror = async({ base_not_access })=>{
    if (base_not_access) {
        await DIB.creat_data_base('islamdzl', {
            name:'islam',
            password:'12345678',
            read_password:'12345678r'
        })
    }
}
DIB.base.islam.onchange = ({dataA, dataB})=>{
    console.log('dataB : ',JSON.stringify(dataB))
        // DIB.base.islam.set({numbers:dataB.islam.path.your.numbers +1}, path)
}
