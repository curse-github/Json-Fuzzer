type obj = string|number|(obj|null)[]|{[key:string]:obj|null};
type template = "string"|"number"|template[]|{[key:string]:template};
const temp:template = {
    test1:"string",
    test2:"number",
    test3:[
        "string",
        "number",
        [
            "string",
            "number",
            [
                "string",
                "number"
            ]
        ],
        {
            test4:"string",
            test5:"number",
            test6:[
                "string",
                "number"
            ]
        }
    ],
    test7:{
        test8:"string",
        test9:"number",
        test10:[
            "string",
            "number",
            [
                "string",
                "number"
            ],
            {
                test11:"string",
                test12:"number"
            }
        ],
        test13:{
            test14:"string",
            test15:"number",
            test16:[
                "string",
                "number",
                {
                    test17:"string",
                    test18:"number"
                }
            ]
        },
    },
}
export function fuzz(json:obj) {
    console.log(JSON.stringify(json,null,4))
}
module.exports = {
    "fuzz":fuzz,"template":temp
}