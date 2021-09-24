let fs=require("fs");
let path=require("path");

function treeFn(src){
    if(src==undefined){
        src=process.cwd();
    }
    let content = fs.readdirSync(src);
    console.log(src);
    let baseName=path.basename(src);
    let completePath="├──────────"+baseName;
    for(let i=0;i<content.length;i++){
        completePath = completePath + "\n\t" + "├────" + content[i];
        let subcontent=path.join(src,content[i]);
        let statsOfAPath = fs.lstatSync(subcontent);
        if(!statsOfAPath.isFile()) {
            let content1=fs.readdirSync(subcontent);
            for(let j=0;j<content1.length;j++){
                completePath=completePath+"\n\t\t"+"|---------"+content1[j];
            }
        }
    }
    console.log(completePath);
}
module.exports={
    treefxn:treeFn
}