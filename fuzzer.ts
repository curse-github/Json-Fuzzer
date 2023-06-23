type obj = string|number|(obj|null)[]|{[key:string]:obj|null};
type template = "string"|"number"|template[]|{[key:string]:template};

const imprt = require(process.argv[2]);
const fuzz:(json:obj)=>void = imprt.fuzz;
const temp:template = imprt.template;
function randomObject(temp:{[key:string]:template}):obj {
    var newObj:obj = {};
    const keys = Object.keys(temp);
    for (let i = 0; i < keys.length; i++) {
        const key:string = keys[i];
        newObj[key] = random(temp[key]);
    }
    return newObj;
}
function randomArray(temp:template[]):(obj|null)[] {
    var newArry:(obj|null)[] = [];
    for (let i = 0; i < temp.length; i++) {
        newArry[i] = random(temp[i])
    }
    return newArry;
}
function randomNumber():number {
    return Math.ceil(Math.random()*100000);
}
function randomChar():string {
    return String.fromCharCode((0x23+Math.ceil(Math.random()*(0x7E-0x23))));
    //return String.fromCharCode(Math.floor(Math.random() * 65535));
}
function randomString():string {
    const len:number = Math.ceil(Math.random()*35);
    var str:string = "";
    for (let i = 0; i < len; i++) str+=randomChar();
    return str;
}
function random(temp:template):obj {
    if (temp == "string") return randomString();
    else if (temp == "number") return randomNumber();
    else if (typeof temp == "object") {
        if (Array.isArray(temp)) {
            return randomArray(temp as template[])
        } else {
            return randomObject(temp as {[key:string]:template})
        }
    } else { return {}; }
}
fuzz(random(temp));