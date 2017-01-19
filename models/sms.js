
var request=require("request");


module.exports=function(message, chatId, token,type, ip, callback){
	type=type || "text/plain";
	if(ip === "::ffff:77.235.20.133") {
    url = "http://77.235.20.133:3000/chats/"
  }
  else
    url = "https://api.namba1.co/chats/";
	var data={
	url: url + chatId + "/write",
	method:"POST",
	headers:{
		'X-Namba-Auth-Token': token
	},
	body:{
		"type":type,
		"content":message
	},
	json: true
	}
	request(data,callback);
};