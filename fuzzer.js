"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
exports.random = void 0;
console.clear();
//#region imports/typedefs
var Colors = /** @class */ (function () {
    function Colors() {
    }
    Colors.Reset = "\x1b[0m";
    Colors.Bright = "\x1b[1m";
    Colors.Underscore = "\x1b[4m";
    Colors.Reverse = "\x1b[7m";
    //static Dim       :string = "\x1b[2m";//does not work at all
    //static Blink     :string = "\x1b[5m";//does not work at all
    //static Hidden    :string = "\x1b[8m";//does not work at all
    Colors.R = "\x1b[0m";
    Colors.B = "\x1b[1m";
    Colors.U = "\x1b[4m";
    Colors.Rev = "\x1b[7m";
    Colors.FgBlack = "\x1b[30m";
    Colors.FgRed = "\x1b[31m";
    Colors.FgGreen = "\x1b[32m";
    Colors.FgYellow = "\x1b[33m"; //does not work on powershell somehow
    Colors.FgBlue = "\x1b[34m";
    Colors.FgMagenta = "\x1b[35m";
    Colors.FgCyan = "\x1b[36m";
    Colors.FgWhite = "\x1b[37m";
    Colors.FgGray = "\x1b[90m";
    Colors.Fbla = "\x1b[30m";
    Colors.Fr = "\x1b[31m";
    Colors.Fgre = "\x1b[32m";
    Colors.Fy = "\x1b[33m"; //does not work on powershell somehow
    Colors.Fblu = "\x1b[34m";
    Colors.Fm = "\x1b[35m";
    Colors.Fc = "\x1b[36m";
    Colors.Fw = "\x1b[37m";
    Colors.Fgra = "\x1b[90m";
    Colors.BgBlack = "\x1b[40m";
    Colors.BgRed = "\x1b[41m";
    Colors.BgGreen = "\x1b[42m";
    Colors.BgYellow = "\x1b[43m";
    Colors.BgBlue = "\x1b[44m";
    Colors.BgMagenta = "\x1b[45m";
    Colors.BgCyan = "\x1b[46m";
    Colors.BgWhite = "\x1b[47m";
    Colors.BgGray = "\x1b[100m";
    Colors.Bbla = "\x1b[40m";
    Colors.Br = "\x1b[41m";
    Colors.Bgre = "\x1b[42m";
    Colors.By = "\x1b[43m";
    Colors.Bblu = "\x1b[44m";
    Colors.Bm = "\x1b[45m";
    Colors.Bc = "\x1b[46m";
    Colors.Bw = "\x1b[47m";
    Colors.Bgra = "\x1b[100m";
    return Colors;
}());
var baseArrayTemplate = ["string", "number", "boolean"];
var baseObjTemplate = { key1: "string", key2: "number", key3: "boolean" };
var imprt = require(process.argv[2]);
var fuzz = imprt.fuzz;
var temp = imprt.template;
var fs = require("fs");
//#endregion imports/typedefs
//#region config
var config = JSON.parse(fs.readFileSync("config.json").toString());
var outFile = config.outFile;
if (outFile != null && (typeof outFile) != "string")
    outFile = null;
if (outFile != null) {
    try {
        fs.rmSync("out.txt");
    }
    catch (err) { }
    var Log_1 = console.log;
    console.log = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Log_1.apply(void 0, data);
                Object.values(Colors).forEach(function (value) {
                    for (var i = 0; i < data.length; i++) {
                        data[i] = data[i].toString().split(value).join("");
                    }
                });
                fs.appendFileSync("out.txt", data.join("  ") + "\n");
                return [2 /*return*/];
            });
        });
    };
}
var charSet;
if ((typeof config.charSet) != "string") {
    charSet = [];
    for (var i = 0x21; i < 0x7f; i++) {
        charSet.push(String.fromCharCode(i));
    }
}
else
    charSet = config.charSet.split("");
var minStrLen = config.minStrLen;
var maxStrLen = config.maxStrLen;
if ((typeof minStrLen) != "number") {
    minStrLen = 0;
    console.log(Colors.Fgra + "invalid config." + Colors.Fr + "minStrLen" + Colors.Fgra + "." + Colors.R);
}
if (minStrLen < 0) {
    minStrLen = 0;
    console.log(Colors.Fgra + "invalid config." + Colors.Fr + "minStrLen" + Colors.Fgra + "." + Colors.R);
}
if ((typeof maxStrLen) != "number") {
    maxStrLen = minStrLen;
    console.log(Colors.Fgra + "invalid config." + Colors.Fr + "maxStrLen" + Colors.Fgra + "." + Colors.R);
}
if (maxStrLen < 0) {
    minStrLen = 0;
    console.log(Colors.Fgra + "invalid config." + Colors.Fr + "maxStrLen" + Colors.Fgra + "." + Colors.R);
}
if (maxStrLen < minStrLen) {
    maxStrLen = minStrLen;
    console.log(Colors.Fgra + "invalid config." + Colors.Fr + "maxStrLen" + Colors.Fgra + "." + Colors.R);
}
var StrLenRange = maxStrLen - minStrLen;
var minInteger;
if ((typeof config.minInteger) != "number") {
    minInteger = 0;
    console.log(Colors.Fgra + "invalid config." + Colors.Fr + "minNumber" + Colors.Fgra + "." + Colors.R);
}
else {
    minInteger = config.minInteger;
}
var maxInteger;
if ((typeof config.maxInteger) != "number") {
    maxInteger = 0;
    console.log(Colors.Fgra + "invalid config." + Colors.Fr + "maxNumber" + Colors.Fgra + "." + Colors.R);
}
else {
    maxInteger = config.maxInteger;
}
var integerRange = maxInteger - minInteger;
var minFloat;
if ((typeof config.minFloat) != "number") {
    minFloat = 0;
    console.log(Colors.Fgra + "invalid config." + Colors.Fr + "minFloat" + Colors.Fgra + "." + Colors.R);
}
else {
    minFloat = config.minFloat;
}
var maxFloat;
if ((typeof config.maxFloat) != "number") {
    maxFloat = 0;
    console.log(Colors.Fgra + "invalid config." + Colors.Fr + "maxFloat" + Colors.Fgra + "." + Colors.R);
}
else {
    maxFloat = config.maxFloat;
}
var floatRange = maxFloat - minFloat;
//#endregion config
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
exports.random = random;
function randomNumber() {
    return Math.round((minFloat + Math.random() * floatRange) * 1000) / 1000;
}
function randomInteger() {
    return Math.round((minInteger + Math.random() * integerRange));
}
function randomChar() {
    return charSet[Math.round(Math.random() * (charSet.length - 1))];
    //return String.fromCharCode((0x23+Math.ceil(Math.random()*(0x7E-0x23))));
    //return String.fromCharCode(Math.floor(Math.random() * 0xffff));
}
function randomString() {
    var len = minStrLen + Math.ceil(Math.random() * StrLenRange);
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
function objectEqual(a, b) {
    if ((a === undefined && b === null) || (a === null && b === undefined))
        return true; // if one is null and the other is undefined the folowing will return false but they are equal;
    var typeofA = (typeof a);
    if (typeofA != (typeof b))
        return false; //if the items are not the same type immediately return false
    if (typeofA == "bigint" || typeofA == "boolean" || typeofA == "number" || typeofA == "string" || typeofA == "symbol" || typeofA == "undefined")
        return a == b; //just do a direct comparison
    else if (typeofA == "object") {
        if (a == null && b == null)
            return true; //if both objects are null return false
        if ((a == null && b != null) || (b == null && a != null))
            return false; //one object is null and the other is not re
        var entriesA = Object.entries(a);
        var entriesB = Object.entries(b);
        if (entriesA.length != entriesB.length)
            return false;
        for (var i = 0; i < entriesA.length; i++) {
            if (!objectEqual(entriesA[i][0], entriesB[i][0]))
                return false;
            if (!objectEqual(entriesA[i][1], entriesB[i][1]))
                return false;
        }
    }
    return true;
}
/*function msToString(ms:number):string {
    if (ms>1000*60*60*24) return (ms/(1000*60*60*24)).toFixed(3)+" days";
    else if (ms>1000*60*60) return (ms/(1000*60*60)).toFixed(3)+" hrs";
    else if (ms>1000*60) return (ms/(1000*60)).toFixed(3)+" mins";
    else if (ms>1000) return (ms/(1000)).toFixed(3)+" s";
    else return ms+" ms";
}*/
function msToStringColor(ms) {
    if (ms > 1000 * 60 * 60 * 24)
        return Colors.Fy + (ms / (1000 * 60 * 60 * 24)).toFixed(3).padStart(6, "0") + Colors.Fgra + " days" + Colors.R;
    else if (ms > 1000 * 60 * 60)
        return Colors.Fy + (ms / (1000 * 60 * 60)).toFixed(3).padStart(6, "0") + Colors.Fgra + " hrs" + Colors.R;
    else if (ms > 1000 * 60)
        return Colors.Fy + (ms / (1000 * 60)).toFixed(3).padStart(6, "0") + Colors.Fgra + " mins" + Colors.R;
    else if (ms > 1000)
        return Colors.Fy + (ms / (1000)).toFixed(3).padStart(6, "0") + Colors.Fgra + " s" + Colors.R;
    else
        return Colors.Fy + ms.toString().padStart(6, "0") + Colors.Fgra + " ms" + Colors.R;
}
/*function ratioToPercentage(a:number,b:number) {
    return (a/b*100).toFixed(3).padStart(7,"0")+" %";
}*/
function ratioToPercentageColor(a, b) {
    return Colors.Fy + (a / b * 100).toFixed(3).padStart(7, "0") + Colors.Fgra + " %" + Colors.R;
}
function createTests() {
    //creates possible changes
    var proccessingTime = (new Date()).getTime();
    processTemplate(temp, []);
    proccessingTime = (new Date()).getTime() - proccessingTime;
    var tests = [];
    var skips = 0;
    var generationTime = (new Date()).getTime();
    for (var i = 0; i < changes.length; i++) {
        var change1 = changes[i];
        console.log(ratioToPercentageColor(i * changes.length, changes.length * (changes.length + 1)));
        console.log(Colors.Fgra + "Time elapsed: " + msToStringColor((new Date()).getTime() - generationTime) + Colors.Fgra + ".\n" + Colors.R);
        for (var j = i + 1; j < changes.length; j++) {
            var change2 = changes[j];
            //pass if they are equal, and fail if change1 is modifying the parent of change2
            var modifyingParent = true;
            for (var i_1 = 0; i_1 < change2[0].length; i_1++) {
                if (change1[0][i_1] != change2[0][i_1] && change1[0][i_1] != null)
                    modifyingParent = false;
            }
            if (modifyingParent && !objectEqual(change1, change2)) {
                skips++;
                continue;
            }
            //change1
            var rand = random(temp);
            if (change1[0].length == 0)
                rand = change1[1];
            else {
                var thing = rand;
                for (var j_1 = 0; j_1 < change1[0].length - 1; j_1++) {
                    thing = thing[change1[0][j_1]];
                }
                thing[change1[0][change1[0].length - 1]] = change1[1];
            }
            //change2
            try {
                if (change1[0].length == 0)
                    rand = change2[1];
                else {
                    var thing = rand;
                    for (var j_2 = 0; j_2 < change2[0].length - 1; j_2++) {
                        thing = thing[change2[0][j_2]];
                    }
                    thing[change2[0][change2[0].length - 1]] = change2[1];
                }
            }
            catch (err) {
                continue;
            }
            //check for duplicate entries
            var isDupe = false;
            for (var l = 0; l < tests.length; l++) {
                if (objectEqual(tests[l], rand)) {
                    isDupe = true;
                    break;
                }
            }
            if (!isDupe)
                tests.push(rand);
        }
    }
    generationTime = (new Date()).getTime() - generationTime;
    console.log("\n");
    console.log(Colors.Fgra + "Processing time: " + msToStringColor(proccessingTime) + Colors.Fgra + "." + Colors.R);
    console.log(Colors.Fgra + "Generation time: " + msToStringColor(generationTime) + Colors.Fgra + "." + Colors.R);
    console.log(Colors.Fy + tests.length + Colors.Fgra + " tests found." + Colors.R);
    console.log(Colors.Fy + skips + Colors.Fgra + " skips." + Colors.R);
    return tests;
}
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var tests, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tests = createTests();
                    console.log(tests.length);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < tests.length)) return [3 /*break*/, 4];
                    console.log((i + 1) + "/" + tests.length);
                    return [4 /*yield*/, fuzz(tests[i], i == (tests.length - 1))];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log("Ran final test.");
                    return [2 /*return*/];
            }
        });
    });
}
run();
