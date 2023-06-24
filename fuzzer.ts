export type obj = string|number|boolean|(obj|null)[]|{[key:string]:obj|null};
export type template = "string"|"integer"|"number"|"boolean"|template[]|{[key:string]:template}|{type:"range",max:number,min:number,isfloat?:boolean}|{type:"enum",values:(string|number)[]};
const baseArrayTemplate:template[] = ["string","number","boolean"];
const baseObjTemplate:{[key:string]:template} = {key1:"string",key2:"number",key3:"boolean"};
const imprt = require(process.argv[2]);
const fuzz:(json:obj|null)=>void = imprt.fuzz;
const temp:template = imprt.template;


function random(temp:template):obj|null {
    if (temp == "string") return randomString();
    else if (temp == "number") return randomNumber();
    else if (temp == "integer") return randomInteger();
    else if (temp == "boolean") return randomBoolean();
    else if (typeof temp == "object") {
        if (Array.isArray(temp)) {
            return randomArray(temp as template[])
        } else {
            if(temp.type != null) {
                if ((temp as any).type == "range") {
                    return randomRange(temp as {type:"range",max:number,min:number,isfloat?:boolean});
                } else if ((temp as any).type == "enum") {
                    return randomEnum(temp as {type:"enum",values:(string|number|boolean)[]});
                }
            }
            return randomObject(temp as {[key:string]:template})
        }
    } else { return null; }
}
function randomNumber():number {
    return Math.round((Math.random()*2-1)*100);
}
function randomInteger():number {
    return (Math.random()*2-1)*Number.MAX_SAFE_INTEGER;
}
function randomChar():string {
    return String.fromCharCode((0x23+Math.ceil(Math.random()*(0x7E-0x23))));
    //return String.fromCharCode(Math.floor(Math.random() * 65535));
}
function randomString():string {
    const len:number = 5+Math.ceil(Math.random()*20);
    var str:string = "";
    for (let i:number = 0; i < len; i++) str+=randomChar();
    return str;
}
function randomBoolean():boolean {
    return Math.round(Math.random())==1;
}
function randomArray(temp:template[]):(obj|null)[] {
    var newArry:(obj|null)[] = [];
    for (let i:number = 0; i < temp.length; i++) {
        if (temp[i] == null) newArry[i] = null;
        else newArry[i] = random(temp[i]);
    }
    return newArry;
}
function randomRange(temp:{type:"range",max:number,min:number,isfloat?:boolean}):number {
    return (temp.isfloat==true)?(temp.min+Math.random()*(temp.max-temp.min)):Math.round(temp.min+Math.random()*(temp.max-temp.min));
}
function randomEnum(temp:{type:"enum",values:(string|number|boolean)[]}):string|number|boolean {
    const vals:(string|number|boolean)[] = temp.values;
    return vals[Math.round(Math.random()*(vals.length-1))];
}
function randomObject(temp:{[key:string]:template}):obj {
    var newObj:obj = {};
    const keys = Object.keys(temp);
    for (let i:number = 0; i < keys.length; i++) {
        const key:string = keys[i];
        if (temp[key] == null) newObj[key] = null;
        else newObj[key] = random(temp[key]);
    }
    return newObj;
}

var changes:[(string|number)[],string|number|obj|(obj|null)[]|null][] = []
function processTemplate(temp:template,indexes:(string|number)[]) {
    if (temp == "string") {
        changes.push([[...indexes],null]);
        changes.push([[...indexes],randomInteger()]);
        changes.push([[...indexes],randomNumber ()]);
        changes.push([[...indexes],randomBoolean()]);
        changes.push([[...indexes],randomArray  (baseArrayTemplate)]);
        changes.push([[...indexes],randomObject (baseObjTemplate  )]);
    } else if (temp == "number") {
        changes.push([[...indexes],null]);
        changes.push([[...indexes],randomInteger()]);
        changes.push([[...indexes],randomString ()]);
        changes.push([[...indexes],randomBoolean()]);
        changes.push([[...indexes],randomArray  (baseArrayTemplate)]);
        changes.push([[...indexes],randomObject (baseObjTemplate  )]);
    } else if (temp == "integer") {
        changes.push([[...indexes],null]);
        changes.push([[...indexes],randomNumber ()]);
        changes.push([[...indexes],randomString ()]);
        changes.push([[...indexes],randomBoolean()]);
        changes.push([[...indexes],randomArray  (baseArrayTemplate)]);
        changes.push([[...indexes],randomObject (baseObjTemplate  )]);
    } else if (temp == "boolean") {
        changes.push([[...indexes],null]);
        changes.push([[...indexes],randomInteger()]);
        changes.push([[...indexes],randomNumber ()]);
        changes.push([[...indexes],randomString ()]);
        changes.push([[...indexes],randomArray  (baseArrayTemplate)]);
        changes.push([[...indexes],randomObject (baseObjTemplate  )]);
    } else if (typeof temp == "object") {
        if (Array.isArray(temp)) {
            changes.push([[...indexes],null]);
            changes.push([[...indexes],randomInteger()]);
            changes.push([[...indexes],randomNumber ()]);
            changes.push([[...indexes],randomString ()]);
            changes.push([[...indexes],randomBoolean()]);
            changes.push([[...indexes],randomObject (baseObjTemplate  )]);
            for (let i:number = 0; i < temp.length; i++) {
                processTemplate(temp[i],[...indexes,i]);
            }
            return;
        } else {
            if(temp.type != null) {
                if ((temp as any).type == "range") {
                    const range:{type:"range",max:number,min:number,isfloat?:boolean} = temp as {type:"range",max:number,min:number,isfloat?:boolean};
                    changes.push([[...indexes],null]);
                    changes.push([[...indexes],randomRange({type:"range",max:range.max,min:range.min,isfloat:(range.isfloat==true)?false:true})]);
                    changes.push([[...indexes],range.max+1]);
                    changes.push([[...indexes],range.min-1]);
                    changes.push([[...indexes],randomString ()]);
                    changes.push([[...indexes],randomBoolean()]);
                    changes.push([[...indexes],randomArray  (baseArrayTemplate)]);
                    changes.push([[...indexes],randomObject (baseObjTemplate  )]);
                    return;
                } else if ((temp as any).type == "enum") {
                    changes.push([[...indexes],null]);
                    changes.push([[...indexes],randomInteger()]);
                    changes.push([[...indexes],randomNumber ()]);
                    changes.push([[...indexes],randomString ()]);
                    changes.push([[...indexes],randomBoolean()]);
                    changes.push([[...indexes],randomArray  (baseArrayTemplate)]);
                    changes.push([[...indexes],randomObject (baseObjTemplate  )]);
                    return;
                }
            }
            changes.push([[...indexes],null]);
            changes.push([[...indexes],randomInteger()]);
            changes.push([[...indexes],randomNumber ()]);
            changes.push([[...indexes],randomString ()]);
            changes.push([[...indexes],randomBoolean()]);
            changes.push([[...indexes],randomArray  (baseArrayTemplate  )]);
            changes.push([[...indexes],randomArray  (Object.values(temp))]);//array of the values from the object
            const keys = Object.keys(temp);
            for (let i:number = 0; i < keys.length; i++) {
                const key:string = keys[i];
                processTemplate(temp[key],[...indexes,key]);
            }
            return;
        }
    } else { return null; }
}
var proccessingTime:number = (new Date()).getTime();
processTemplate(temp,[]);
proccessingTime = (new Date()).getTime()-proccessingTime;
var generationTime:number = (new Date()).getTime();
var tests:(obj|null)[] = [];
for (let i:number = 0; i < changes.length; i++) {
    const change:[(string | number)[], obj | (obj | null)[] | null] = changes[i];
    var rand:obj|null = random(temp);
    if (change[0].length == 0) {
        rand = change[1];
    } else {
        var thing:obj|null = rand;
        for (let j = 0; j < change[0].length-1; j++) { thing = thing![change[0][j]]; }
        thing![change[0][change[0].length-1]] = change[1];
    }
    tests.push(rand);
}
generationTime = (new Date()).getTime()-generationTime;

console.clear();
console.log("Processing time: "+proccessingTime/1000+"s.")
console.log(changes.length+" tests found.");
//console.log("[\n    "+changes.map((el:[(string|number)[],string|number|obj|(obj|null)[]|null])=>JSON.stringify(el)).join("\n    ")+"\n]")// print all tests
console.log("Generation time: "+generationTime/1000+"s.")
for (let i = 0; i < tests.length; i++) {
    fuzz(tests[i]);
}