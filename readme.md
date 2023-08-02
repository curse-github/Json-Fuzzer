A \"fuzzer\" in a json format that imports a typescript file and uses the \"fuzz\" function

# [Usage](#usage)
`ts-node .\fuzzer.ts [fuzzee file]`
```
[fuzzee file]: the file that the code below will go in, ex: "./fuzzee.ts"
```
# [Template format](#templateFormat)
|Type name|Format |Example value |Output |
|:--------|:------------------------------------------------------|:------------------------------------------------|:------------------------------------------------------------------------|
|string |`"string"` |"string" |<p> random string with a random length and characters from a charset defined each in the config|
|number |`"number"` |"number" |random float with three decimal places in the range defined in the config|
|integer |`"integer"` |"integer" |random integer in the range defined in the config |
|boolean |`"boolean"` |"boolean" |random `true` or `false` value |
|range |{<br>&nbsp;&nbsp;&nbsp;&nbsp;type:"range",<br>&nbsp;&nbsp;&nbsp;&nbsp;max:number,<br>&nbsp;&nbsp;&nbsp;&nbsp;min:number,<br>&nbsp;&nbsp;&nbsp;&nbsp;isfloat?:boolean<br>}|{<br>&nbsp;&nbsp;&nbsp;&nbsp;"type":"range",<br>&nbsp;&nbsp;&nbsp;&nbsp;"max":50,<br>&nbsp;&nbsp;&nbsp;&nbsp;"min":0,<br>&nbsp;&nbsp;&nbsp;&nbsp;"isfloat":false<br>}|random value within `min` and `max` values, either an integer or float |
|enum |{<br>&nbsp;&nbsp;&nbsp;&nbsp;type:"enum",<br>&nbsp;&nbsp;&nbsp;&nbsp;values:(string\|number\|bool)[]<br>} |{<br>&nbsp;&nbsp;&nbsp;&nbsp;"type":"enum",<br>&nbsp;&nbsp;&nbsp;&nbsp;"values":["string",50,true]<br>} |random value from the `values` array |
|array |template[] |[<br>&nbsp;&nbsp;&nbsp;&nbsp;"string",<br>&nbsp;&nbsp;&nbsp;&nbsp;"number",<br>&nbsp;&nbsp;&nbsp;&nbsp;"integer",<br>&nbsp;&nbsp;&nbsp;&nbsp;"boolean"<br>] |array filled with random values based on the templates inside |
|object |{<br>&nbsp;&nbsp;&nbsp;&nbsp;[keys:string]:template<br>} |{<br>&nbsp;&nbsp;&nbsp;&nbsp;"key1":"string",<br>&nbsp;&nbsp;&nbsp;&nbsp;"key1":"string",<br>&nbsp;&nbsp;&nbsp;&nbsp;"key1":"string"<br>}|object filled with random values based on the templates inside |
# [Fuzzee code](#fuzzeeCode)
```typescript
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
```
# [Config](#config)
|Name      |Description                              |Default value                                                                                          |
|:---------|:----------------------------------------|:------------------------------------------------------------------------------------------------------|
|outFile   |file to pipe all output to               |`out.txt`                                                                                              |
|verbose   |whether to print percentages and times   |true                                                                                                   |
|charSet   |Set of characters than can be in a string|``!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{\|}~"``|
|minStrLen |Minimum length for a string              |5                                                                                                      |
|maxStrLen |Maximum length for a string              |25                                                                                                     |
|minInteger|Minimum value for an integer             |-2147483647                                                                                            |
|maxInteger|Maximum value for an integer             |2147483647                                                                                             |
|minFloat  |Minimum value for a float                |-2147483647                                                                                            |
|maxFloat  |Maximum value for a float                |2147483647                                                                                             |