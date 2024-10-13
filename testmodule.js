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
const path = ["islam"];
const me_data = {string:"sd"}; 
DIB.base.islam.onload = async(data)=>{
    // DIB.base.islam.clear(1)
    DIB.base.islam.set(me_data, path)
    // DIB.base.islam.change()
    const random = "abcdef ghijk lmnop qrstu vwxyz "
    let leps = 0
    while (true) {
        leps ++
        let R = ""
         for (let i = 0; i < 100000; i++) {
            let rt = Math.floor(Math.random()*10)+1
            for (let e = 0; e < rt; e++) {
                let rr = Math.floor(Math.random()*26)
                R += random[rr]
                
            }
        }   

        DIB.base.islam.set({[leps]: R},path)
    }
} 
DIB.base.islam.onchange = ({dataA, dataB})=>{
    console.log('dataB : ',JSON.stringify(dataB))
        // DIB.base.islam.set({numbers:dataB.islam.path.your.numbers +1}, path)
}
