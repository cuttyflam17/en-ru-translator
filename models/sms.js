var request=require("request");


module.exports=function(message,chatId,token,type,callback){
	type=type|| "text/plain";
	var data={
	url: "http://api.kamp.kg/chats/" + chatId + "/write",
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