var fs=require("fs");
var pron=require("./pronunciation");
var request=require("request");
module.exports=function(file,id)
{
	console.log("audio file created");
	request(file).pipe(fs.createWriteStream("./sounds/"+id+".mp4"));
}