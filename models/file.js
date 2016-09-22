var request=require("superagent");
var fs=require("fs");
module.exports=function(id,callback){
	console.log("token created");
request.post("http://files.kamp.kg")
.attach("file",__dirname+"/../sounds/"+id+".mp4").end(callback);
}
