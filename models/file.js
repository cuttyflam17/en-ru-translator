var request=require("superagent");
var fs=require("fs");
module.exports=function(id, ip, callback){
	console.log("token created");
	if(ip === "::ffff:77.235.20.133") {
    url = "http://77.235.20.133:3040"
  }
  else {
    url = "https://files.namba1.co";
   }
request.post(url)
.attach("file",__dirname+"/../sounds/"+id+".mp4").end(callback);
}
