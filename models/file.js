var request=require("superagent");
var fs=require("fs");
module.exports=function(id,callback){
request.post("http://files.kamp.kg")
.attach("file",__dirname+"/../sounds/"+id+".mp3").end(callback);
}
