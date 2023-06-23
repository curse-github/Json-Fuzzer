var imprt = require(process.argv[2]);
var fuzz = imprt.fuzz;
var temp = imprt.template;
function randomObject(temp) {
    var newObj = {};
    var keys = Object.keys(temp);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        newObj[key] = random(temp[key]);
    }
    return newObj;
}
function randomArray(temp) {
    var newArry = [];
    for (var i = 0; i < temp.length; i++) {
        newArry[i] = random(temp[i]);
    }
    return newArry;
}
function randomNumber() {
    return Math.ceil(Math.random() * 100000);
}
function randomChar() {
    return String.fromCharCode((0x23 + Math.ceil(Math.random() * (0x7E - 0x23))));
    //return String.fromCharCode(Math.floor(Math.random() * 65535));
}
function randomString() {
    var len = Math.ceil(Math.random() * 35);
    var str = "";
    for (var i = 0; i < len; i++)
        str += randomChar();
    return str;
}
function random(temp) {
    if (temp == "string")
        return randomString();
    else if (temp == "number")
        return randomNumber();
    else if (typeof temp == "object") {
        if (Array.isArray(temp)) {
            return randomArray(temp);
        }
        else {
            return randomObject(temp);
        }
    }
    else {
        return {};
    }
}
fuzz(random(temp));
