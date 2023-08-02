import {obj,template} from "./fuzzer"
const temp:template = [
    "number",//float
    "number",
    "integer",
    "integer",
    "string",
    "string",
    "boolean",
    "boolean",
    {type:"enum",values:[0,5,10,15]},//number enum
    {type:"enum",values:[0,5,10,15]},
    {type:"enum",values:["ab","cd","ef","gh"]},//string enum
    {type:"enum",values:["ab","cd","ef","gh"]},
    {type:"enum",values:[1,2,"a","b"]},
    {type:"enum",values:[1,2,"a","b"]},
    {type:"range",min:0,max:25,isfloat:false},//integer range
    {type:"range",min:0,max:25,isfloat:false},
    {type:"range",min:0,max:25,isfloat:true},//float range
    {type:"range",min:0,max:25,isfloat:true},
    [
        "number",
        "string",
        "boolean"
    ],
    {
        "key1":"number",
        "key2":"string",
        "key3":"boolean"
    }
]
function fuzz(json:obj) {
    console.log(JSON.stringify(json))
}
module.exports = {fuzz,temp}