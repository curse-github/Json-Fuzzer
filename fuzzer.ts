console.clear();
//#region imports/typedefs
class Colors {
    static Reset     :string = "\x1b[0m";
    static Bright    :string = "\x1b[1m";
    static Underscore:string = "\x1b[4m";
    static Reverse   :string = "\x1b[7m";
    //static Dim       :string = "\x1b[2m";//does not work at all
    //static Blink     :string = "\x1b[5m";//does not work at all
    //static Hidden    :string = "\x1b[8m";//does not work at all
    static R  :string = "\x1b[0m";
    static B  :string = "\x1b[1m";
    static U  :string = "\x1b[4m";
    static Rev:string = "\x1b[7m";

    static FgBlack  :string = "\x1b[30m";
    static FgRed    :string = "\x1b[31m";
    static FgGreen  :string = "\x1b[32m";
    static FgYellow :string = "\x1b[33m";//does not work on powershell somehow
    static FgBlue   :string = "\x1b[34m";
    static FgMagenta:string = "\x1b[35m";
    static FgCyan   :string = "\x1b[36m";
    static FgWhite  :string = "\x1b[37m";
    static FgGray   :string = "\x1b[90m";
    static Fbla:string = "\x1b[30m";
    static Fr  :string = "\x1b[31m";
    static Fgre:string = "\x1b[32m";
    static Fy  :string = "\x1b[33m";//does not work on powershell somehow
    static Fblu:string = "\x1b[34m";
    static Fm  :string = "\x1b[35m";
    static Fc  :string = "\x1b[36m";
    static Fw  :string = "\x1b[37m";
    static Fgra:string = "\x1b[90m";

    static BgBlack  :string = "\x1b[40m" ;
    static BgRed    :string = "\x1b[41m" ;
    static BgGreen  :string = "\x1b[42m" ;
    static BgYellow :string = "\x1b[43m" ;
    static BgBlue   :string = "\x1b[44m" ;
    static BgMagenta:string = "\x1b[45m" ;
    static BgCyan   :string = "\x1b[46m" ;
    static BgWhite  :string = "\x1b[47m" ;
    static BgGray   :string = "\x1b[100m";
    static Bbla:string = "\x1b[40m" ;
    static Br  :string = "\x1b[41m" ;
    static Bgre:string = "\x1b[42m" ;
    static By  :string = "\x1b[43m" ;
    static Bblu:string = "\x1b[44m" ;
    static Bm  :string = "\x1b[45m" ;
    static Bc  :string = "\x1b[46m" ;
    static Bw  :string = "\x1b[47m" ;
    static Bgra:string = "\x1b[100m";
}

export type obj = string|number|boolean|(obj)[]|{[key:string]:obj};
export type objAnd<T> = T|string|number|boolean|(objAnd<T>)[]|{[key:string]:objAnd<T>};
export type nullableObj = objAnd<null>;
export type template = "string"|"integer"|"number"|"boolean"|template[]|{[key:string]:template}|{type:"range",max:number,min:number,isfloat?:boolean}|{type:"enum",values:(string|number)[]};
const baseArrayTemplate:template[] = ["string","number","boolean"];
const baseObjTemplate:{[key:string]:template} = {key1:"string",key2:"number",key3:"boolean"};

const imprt = require(process.argv[2]);
const fuzz:(json:nullableObj,final:boolean)=>void = imprt.fuzz;
const temp:template = imprt.template;

import * as fs from "fs"
//#endregion imports/typedefs

//#region config
const config:any = JSON.parse(fs.readFileSync("config.json").toString());
var outFile:string|null = config.outFile;
if (outFile!=null&&(typeof outFile)!="string") outFile=null;
if (outFile != null) {
    try { fs.rmSync("out.txt"); } catch (err:any) { }
    const Log:(...data: any[])=>void = console.log;
    console.log = async(...data: any[])=>{
        Log(...data);
        Object.values(Colors).forEach((value:string)=>{
            for (let i = 0; i < data.length; i++) {
                data[i]=data[i].toString().split(value).join("");
            }
        });
        fs.appendFileSync("out.txt",data.join("  ")+"\n");
    };
}
var charSet:string[];
if ((typeof config.charSet) != "string") {
    charSet=[];
    for (let i = 0x21; i < 0x7f; i++) {
        charSet.push(String.fromCharCode(i))
    }
} else charSet=config.charSet.split("")

var minStrLen:number = config.minStrLen;
var maxStrLen:number = config.maxStrLen;
if ((typeof minStrLen) != "number") { minStrLen=0;        console.log(Colors.Fgra+"invalid config."+Colors.Fr+"minStrLen"+Colors.Fgra+"."+Colors.R); }
if (minStrLen<0)                    { minStrLen=0;        console.log(Colors.Fgra+"invalid config."+Colors.Fr+"minStrLen"+Colors.Fgra+"."+Colors.R); }
if ((typeof maxStrLen) != "number") { maxStrLen=minStrLen;console.log(Colors.Fgra+"invalid config."+Colors.Fr+"maxStrLen"+Colors.Fgra+"."+Colors.R); }
if (maxStrLen<0)                    { minStrLen=0;        console.log(Colors.Fgra+"invalid config."+Colors.Fr+"maxStrLen"+Colors.Fgra+"."+Colors.R); }
if (maxStrLen<minStrLen) { maxStrLen=minStrLen;console.log(Colors.Fgra+"invalid config."+Colors.Fr+"maxStrLen"+Colors.Fgra+"."+Colors.R); }
const StrLenRange:number=maxStrLen-minStrLen;


var minInteger:number; if ((typeof config.minInteger) != "number") { minInteger=0;console.log(Colors.Fgra+"invalid config."+Colors.Fr+"minNumber"+Colors.Fgra+"."+Colors.R); } else { minInteger=config.minInteger; }
var maxInteger:number; if ((typeof config.maxInteger) != "number") { maxInteger=0;console.log(Colors.Fgra+"invalid config."+Colors.Fr+"maxNumber"+Colors.Fgra+"."+Colors.R); } else { maxInteger=config.maxInteger; }
const integerRange:number=maxInteger-minInteger;
var minFloat:number; if ((typeof config.minFloat) != "number") { minFloat=0;console.log(Colors.Fgra+"invalid config."+Colors.Fr+"minFloat"+Colors.Fgra+"."+Colors.R); } else { minFloat=config.minFloat; }
var maxFloat:number; if ((typeof config.maxFloat) != "number") { maxFloat=0;console.log(Colors.Fgra+"invalid config."+Colors.Fr+"maxFloat"+Colors.Fgra+"."+Colors.R); } else { maxFloat=config.maxFloat; }
const floatRange:number=maxFloat-minFloat;
//#endregion config

export function random(temp:template):nullableObj {
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
    return Math.round((minFloat+Math.random()*floatRange)*1000)/1000;
}
function randomInteger():number {
    return Math.round((minInteger+Math.random()*integerRange));
}
function randomChar():string {
    return charSet[Math.round(Math.random()*(charSet.length-1))]
    //return String.fromCharCode((0x23+Math.ceil(Math.random()*(0x7E-0x23))));
    //return String.fromCharCode(Math.floor(Math.random() * 0xffff));
}
function randomString():string {
    const len:number = minStrLen+Math.ceil(Math.random()*StrLenRange);
    var str:string = "";
    for (let i:number = 0; i < len; i++) str+=randomChar();
    return str;
}
function randomBoolean():boolean {
    return Math.round(Math.random())==1;
}
function randomArray(temp:template[]):nullableObj[] {
    var newArry:nullableObj[] = [];
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
function randomObject(temp:{[key:string]:template}):nullableObj {
    var newObj:nullableObj = {};
    const keys = Object.keys(temp);
    for (let i:number = 0; i < keys.length; i++) {
        const key:string = keys[i];
        if (temp[key] == null) newObj[key] = null;
        else newObj[key] = random(temp[key]);
    }
    return newObj;
}

var changes:[(string|number)[],nullableObj][] = []
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
                processTemplate((temp as any)[key],[...indexes,key]);
            }
            return;
        }
    } else { return null; }
}
function objectEqual(a:nullableObj,b:nullableObj):boolean {
    if ((a===undefined&&b===null)||(a===null&&b===undefined)) return true;// if one is null and the other is undefined the folowing will return false but they are equal;
    const typeofA:string = (typeof a);
    if (typeofA != (typeof b)) return false;//if the items are not the same type immediately return false
    if (typeofA=="bigint"||typeofA=="boolean"||typeofA=="number"||typeofA=="string"||typeofA=="symbol"||typeofA=="undefined") return a==b;//just do a direct comparison
    else if (typeofA == "object") {
        if (a==null&&b==null) return true;//if both objects are null return false
        if ((a==null&&b!=null)||(b==null&&a!=null)) return false;//one object is null and the other is not re
        var entriesA=Object.entries(a!);
        var entriesB=Object.entries(b!);
        if (entriesA.length!=entriesB.length) return false;
        for (let i = 0; i < entriesA.length; i++) {
            if (!objectEqual(entriesA[i][0],entriesB[i][0])) return false;
            if (!objectEqual(entriesA[i][1],entriesB[i][1])) return false;
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
function msToStringColor(ms:number):string {
    if (ms>1000*60*60*24) return Colors.Fy+(ms/(1000*60*60*24)).toFixed(3).padStart(6,"0")+Colors.Fgra+" days"+Colors.R;
    else if (ms>1000*60*60) return Colors.Fy+(ms/(1000*60*60)).toFixed(3).padStart(6,"0")+Colors.Fgra+" hrs"+Colors.R;
    else if (ms>1000*60) return Colors.Fy+(ms/(1000*60)).toFixed(3).padStart(6,"0")+Colors.Fgra+" mins"+Colors.R;
    else if (ms>1000) return Colors.Fy+(ms/(1000)).toFixed(3).padStart(6,"0")+Colors.Fgra+" s"+Colors.R;
    else return Colors.Fy+ms.toString().padStart(6,"0")+Colors.Fgra+" ms"+Colors.R;
}
/*function ratioToPercentage(a:number,b:number) {
    return (a/b*100).toFixed(3).padStart(7,"0")+" %";
}*/
function ratioToPercentageColor(a:number,b:number) {
    return Colors.Fy+(a/b*100).toFixed(3).padStart(7,"0")+Colors.Fgra+" %"+Colors.R;
}


function createTests() {
    //creates possible changes
    var proccessingTime:number = (new Date()).getTime();
    processTemplate(temp,[]);
    proccessingTime = (new Date()).getTime()-proccessingTime;

    var tests:nullableObj[] = [];
    var skips:number = 0;

    var generationTime:number = (new Date()).getTime();
    for (let i = 0; i < changes.length; i++) {
        const change1:[(string | number)[], nullableObj] = changes[i];

        console.log(ratioToPercentageColor(i*changes.length, changes.length*(changes.length+1)));
        console.log(Colors.Fgra+"Time elapsed: "+msToStringColor((new Date()).getTime()-generationTime)+Colors.Fgra+".\n"+Colors.R);
        for (let j = i+1; j < changes.length; j++) {
            const change2:[(string | number)[], nullableObj] = changes[j];

            //pass if they are equal, and fail if change1 is modifying the parent of change2
            var modifyingParent:boolean = true;
            for (let i = 0; i < change2[0].length; i++) {
                if (change1[0][i]!=change2[0][i]&&change1[0][i]!=null) modifyingParent=false;
            }
            if (modifyingParent&&!objectEqual(change1,change2)) { skips++; continue; }

            //change1
            var rand:nullableObj = random(temp);
            if (change1[0].length == 0) rand = change1[1];
            else {
                var thing:nullableObj = rand;
                for (let j = 0; j < change1[0].length-1; j++) { thing = (thing! as any)[change1[0][j]]; }
                (thing! as any)[change1[0][change1[0].length-1]] = change1[1];
            }

            //change2
            try {
                if (change1[0].length == 0) rand = change2[1];
                else {
                    var thing:nullableObj = rand;
                    for (let j = 0; j < change2[0].length-1; j++) { thing = (thing! as any)[change2[0][j]]; }
                    (thing! as any)[change2[0][change2[0].length-1]] = change2[1];
                }
            } catch (err:any) { continue; }

            //check for duplicate entries
            var isDupe:boolean = false;
            for (let l = 0; l < tests.length; l++) {
                if (objectEqual(tests[l],rand)) { isDupe=true;break; }
            }
            if (!isDupe) tests.push(rand);
        }
    }
    generationTime = (new Date()).getTime()-generationTime;

    console.log("\n");
    console.log(Colors.Fgra+"Processing time: "+msToStringColor(proccessingTime)+Colors.Fgra+"."+Colors.R);
    console.log(Colors.Fgra+"Generation time: "+msToStringColor(generationTime)+Colors.Fgra+"."+Colors.R);
    console.log(Colors.Fy+tests.length+Colors.Fgra+" tests found."+Colors.R);
    console.log(Colors.Fy+skips+Colors.Fgra+" skips."+Colors.R);
    
    return tests;
}


async function run() {
    const tests:nullableObj[] = createTests();
    console.log(tests.length);
    for (let i = 0; i < tests.length; i++) {
        console.log((i+1)+"/"+tests.length);
        await fuzz(tests[i],i==(tests.length-1));
    }
    console.log("Ran final test.");
}
run()