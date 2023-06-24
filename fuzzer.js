"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var baseArrayTemplate = ["string", "number", "boolean"];
var baseObjTemplate = { key1: "string", key2: "number", key3: "boolean" };
var imprt = require(process.argv[2]);
var fuzz = imprt.fuzz;
var temp = imprt.template;
function random(temp) {
    if (temp == "string")
        return randomString();
    else if (temp == "number")
        return randomNumber();
    else if (temp == "integer")
        return randomInteger();
    else if (temp == "boolean")
        return randomBoolean();
    else if (typeof temp == "object") {
        if (Array.isArray(temp)) {
            return randomArray(temp);
        }
        else {
            if (temp.type != null) {
                if (temp.type == "range") {
                    return randomRange(temp);
                }
                else if (temp.type == "enum") {
                    return randomEnum(temp);
                }
            }
            return randomObject(temp);
        }
    }
    else {
        return null;
    }
}
function randomNumber() {
    return Math.round((Math.random() * 2 - 1) * 100);
}
function randomInteger() {
    return (Math.random() * 2 - 1) * Number.MAX_SAFE_INTEGER;
}
function randomChar() {
    return String.fromCharCode((0x23 + Math.ceil(Math.random() * (0x7E - 0x23))));
    //return String.fromCharCode(Math.floor(Math.random() * 65535));
}
function randomString() {
    var len = 5 + Math.ceil(Math.random() * 20);
    var str = "";
    for (var i = 0; i < len; i++)
        str += randomChar();
    return str;
}
function randomBoolean() {
    return Math.round(Math.random()) == 1;
}
function randomArray(temp) {
    var newArry = [];
    for (var i = 0; i < temp.length; i++) {
        if (temp[i] == null)
            newArry[i] = null;
        else
            newArry[i] = random(temp[i]);
    }
    return newArry;
}
function randomRange(temp) {
    return (temp.isfloat == true) ? (temp.min + Math.random() * (temp.max - temp.min)) : Math.round(temp.min + Math.random() * (temp.max - temp.min));
}
function randomEnum(temp) {
    var vals = temp.values;
    return vals[Math.round(Math.random() * (vals.length - 1))];
}
function randomObject(temp) {
    var newObj = {};
    var keys = Object.keys(temp);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (temp[key] == null)
            newObj[key] = null;
        else
            newObj[key] = random(temp[key]);
    }
    return newObj;
}
var changes = [];
function processTemplate(temp, indexes) {
    if (temp == "string") {
        changes.push([__spreadArray([], indexes, true), null]);
        changes.push([__spreadArray([], indexes, true), randomInteger()]);
        changes.push([__spreadArray([], indexes, true), randomNumber()]);
        changes.push([__spreadArray([], indexes, true), randomBoolean()]);
        changes.push([__spreadArray([], indexes, true), randomArray(baseArrayTemplate)]);
        changes.push([__spreadArray([], indexes, true), randomObject(baseObjTemplate)]);
    }
    else if (temp == "number") {
        changes.push([__spreadArray([], indexes, true), null]);
        changes.push([__spreadArray([], indexes, true), randomInteger()]);
        changes.push([__spreadArray([], indexes, true), randomString()]);
        changes.push([__spreadArray([], indexes, true), randomBoolean()]);
        changes.push([__spreadArray([], indexes, true), randomArray(baseArrayTemplate)]);
        changes.push([__spreadArray([], indexes, true), randomObject(baseObjTemplate)]);
    }
    else if (temp == "integer") {
        changes.push([__spreadArray([], indexes, true), null]);
        changes.push([__spreadArray([], indexes, true), randomNumber()]);
        changes.push([__spreadArray([], indexes, true), randomString()]);
        changes.push([__spreadArray([], indexes, true), randomBoolean()]);
        changes.push([__spreadArray([], indexes, true), randomArray(baseArrayTemplate)]);
        changes.push([__spreadArray([], indexes, true), randomObject(baseObjTemplate)]);
    }
    else if (temp == "boolean") {
        changes.push([__spreadArray([], indexes, true), null]);
        changes.push([__spreadArray([], indexes, true), randomInteger()]);
        changes.push([__spreadArray([], indexes, true), randomNumber()]);
        changes.push([__spreadArray([], indexes, true), randomString()]);
        changes.push([__spreadArray([], indexes, true), randomArray(baseArrayTemplate)]);
        changes.push([__spreadArray([], indexes, true), randomObject(baseObjTemplate)]);
    }
    else if (typeof temp == "object") {
        if (Array.isArray(temp)) {
            changes.push([__spreadArray([], indexes, true), null]);
            changes.push([__spreadArray([], indexes, true), randomInteger()]);
            changes.push([__spreadArray([], indexes, true), randomNumber()]);
            changes.push([__spreadArray([], indexes, true), randomString()]);
            changes.push([__spreadArray([], indexes, true), randomBoolean()]);
            changes.push([__spreadArray([], indexes, true), randomObject(baseObjTemplate)]);
            for (var i = 0; i < temp.length; i++) {
                processTemplate(temp[i], __spreadArray(__spreadArray([], indexes, true), [i], false));
            }
            return;
        }
        else {
            if (temp.type != null) {
                if (temp.type == "range") {
                    var range = temp;
                    changes.push([__spreadArray([], indexes, true), null]);
                    changes.push([__spreadArray([], indexes, true), randomRange({ type: "range", max: range.max, min: range.min, isfloat: (range.isfloat == true) ? false : true })]);
                    changes.push([__spreadArray([], indexes, true), range.max + 1]);
                    changes.push([__spreadArray([], indexes, true), range.min - 1]);
                    changes.push([__spreadArray([], indexes, true), randomString()]);
                    changes.push([__spreadArray([], indexes, true), randomBoolean()]);
                    changes.push([__spreadArray([], indexes, true), randomArray(baseArrayTemplate)]);
                    changes.push([__spreadArray([], indexes, true), randomObject(baseObjTemplate)]);
                    return;
                }
                else if (temp.type == "enum") {
                    changes.push([__spreadArray([], indexes, true), null]);
                    changes.push([__spreadArray([], indexes, true), randomInteger()]);
                    changes.push([__spreadArray([], indexes, true), randomNumber()]);
                    changes.push([__spreadArray([], indexes, true), randomString()]);
                    changes.push([__spreadArray([], indexes, true), randomBoolean()]);
                    changes.push([__spreadArray([], indexes, true), randomArray(baseArrayTemplate)]);
                    changes.push([__spreadArray([], indexes, true), randomObject(baseObjTemplate)]);
                    return;
                }
            }
            changes.push([__spreadArray([], indexes, true), null]);
            changes.push([__spreadArray([], indexes, true), randomInteger()]);
            changes.push([__spreadArray([], indexes, true), randomNumber()]);
            changes.push([__spreadArray([], indexes, true), randomString()]);
            changes.push([__spreadArray([], indexes, true), randomBoolean()]);
            changes.push([__spreadArray([], indexes, true), randomArray(baseArrayTemplate)]);
            changes.push([__spreadArray([], indexes, true), randomArray(Object.values(temp))]); //array of the values from the object
            var keys = Object.keys(temp);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                processTemplate(temp[key], __spreadArray(__spreadArray([], indexes, true), [key], false));
            }
            return;
        }
    }
    else {
        return null;
    }
}
var proccessingTime = (new Date()).getTime();
processTemplate(temp, []);
proccessingTime = (new Date()).getTime() - proccessingTime;
var generationTime = (new Date()).getTime();
var tests = [];
for (var i = 0; i < changes.length; i++) {
    var change = changes[i];
    var rand = random(temp);
    if (change[0].length == 0) {
        rand = change[1];
    }
    else {
        var thing = rand;
        for (var j = 0; j < change[0].length - 1; j++) {
            thing = thing[change[0][j]];
        }
        thing[change[0][change[0].length - 1]] = change[1];
    }
    tests.push(rand);
}
generationTime = (new Date()).getTime() - generationTime;
console.clear();
console.log("Processing time: " + proccessingTime / 1000 + "s.");
console.log(changes.length + " tests found.");
//console.log("[\n    "+changes.map((el:[(string|number)[],string|number|obj|(obj|null)[]|null])=>JSON.stringify(el)).join("\n    ")+"\n]")// print all tests
console.log("Generation time: " + generationTime / 1000 + "s.");
for (var i = 0; i < tests.length; i++) {
    fuzz(tests[i]);
}
