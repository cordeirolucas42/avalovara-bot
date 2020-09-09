const fs = require('fs')
test =[1,2,3,4,5]
fs.readFile("source.txt","utf8",(err,data)=>{
    test = data.split(/\r\n|\r|\n/)
    remove = []
    for (var i in test){
        if (test[i] === ""){
            remove.push(i)
        }
    }
    // for (var i=0; i<5; i++){
    //     console.log(test[i])
    // }
    // console.log(remove)
    for (var i = remove.length-1; i > -1; i--){
        test.splice(remove[i],1)
        // console.log("removed: " + test.splice(remove[i],1))
    }
    for (var i=0; i<10; i++){
        console.log(test[i])
    }
    // console.log(test)
})

