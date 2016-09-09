var request=require("request");



module.exports=function(userId,token,callback)
{

  var data={
  url: "http://api.kamp.kg/chats/create",
  method:"POST",
  headers: {
			'X-Namba-Auth-Token': token
		},
		body: {
        "name":"Translator",
        "members":[userId],
        'image': ''

		},
		json: true
}
console.log("chat created");
	request(data,callback);
}