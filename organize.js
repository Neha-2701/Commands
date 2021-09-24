let fs = require("fs");
let path = require("path");

let types = {
    media: ["mp4", "mkv", "mp3","m4a"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}
function organizeFn(srcpath){
    if(srcpath== undefined) srcpath=process.cwd();
    let organizedpath=path.join(srcpath,"organizedFile");
    if(fs.existsSync(organizedpath)==false) fs.mkdirSync(organizedpath);
    let allfiles=fs.readdirSync(srcpath);
    console.log(allfiles);
    for(let i=0;i<allfiles.length;i++){
        let fullOriginalPath=path.join(srcpath,allfiles[i]);
        let folderName=getExtName(allfiles[i]);
        if(fs.lstatSync(fullOriginalPath).isFile()==true){
            let folderName=getExtName(allfiles[i]);
            console.log(folderName);
            copyFileFun(folderName,fullOriginalPath,organizedpath,srcpath);
        }
    }
}
function copyFileFun(folderName,fullOriginalPath,srcpath){
    let folderPath=path.join(srcpath,folderName);
    if(fs.existsSync(folderPath)==false) 
        fs.mkdirSync(folderPath);
    let originalFileName=path.basename(fullOriginalPath);
    let destFilePath=path.join(folderPath,originalFileName);
    fs.copyFileSync(fullOriginalPath,destFilePath);
    
    
}
function getExtName(fileName){
    let extName=path.extname(fileName);
    extName=extName.slice(1);
    for(let key in types){
        for(let i=0;i<types[key].length;i++){
            if(types[key][i]==extName) return key;
        }
    }
    return "others";
}

module.exports={
    organizefxn:organizeFn
}