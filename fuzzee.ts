import {obj,template} from "./fuzzer"
const temp:template = {
    test1:"string",
    test2:"integer",
    test3:"number",
    test4:{type:"range",max:250,min:-250,isfloat:true},
    test5:{type:"enum",values:["string1","string2","string3","string4","string5"]},
    test6:[
        "string",
        "number",
        {type:"range",max:0,min:100},
    ],
    test7:{
        test8:"string",
        test9:{type:"enum",values:[5,10,15,20,25]},
        test10:[
            "string",
            "integer",
            "number",
            {type:"range",max:0,min:100},
            {type:"range",max:250,min:-250,isfloat:true},
            {type:"enum",values:["string1","string2","string3","string4","string5"]},
            {type:"enum",values:[5,10,15,20,25]}
        ] 
    }
}
function fuzz(json:obj) {
    console.log(JSON.stringify(json))
}
module.exports = {
    "fuzz":fuzz,"template":temp
}