"use strict";
exports.__esModule = true;
exports.fuzz = void 0;
var temp = {
    test1: "string",
    test2: "number",
    test3: [
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
            test4: "string",
            test5: "number",
            test6: [
                "string",
                "number"
            ]
        }
    ],
    test7: {
        test8: "string",
        test9: "number",
        test10: [
            "string",
            "number",
            [
                "string",
                "number"
            ],
            {
                test11: "string",
                test12: "number"
            }
        ],
        test13: {
            test14: "string",
            test15: "number",
            test16: [
                "string",
                "number",
                {
                    test17: "string",
                    test18: "number"
                }
            ]
        }
    }
};
function fuzz(json) {
    console.log(JSON.stringify(json, null, 4));
}
exports.fuzz = fuzz;
module.exports = {
    "fuzz": fuzz, "template": temp
};
