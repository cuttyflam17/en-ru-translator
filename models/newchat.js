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
        "name":"en-ru ru-en translator",
        "members":[userId],
        'image': 'YzU2OWM3YWY0YzcyZmYxZWEyODcyYmJlOTJhM2VkMjE2MDFjMDRhZWNhZDk3ODFiYzk0NDVkNjQzMDI0YjBlZjkyNWNhZWMxODkwYmZlYTRkNjY5NjQwYjNhNGY4MDUxNmJlYjg3OGQ0MTQxNWZiODNmZDBhOGViZDFlNTg3M2Q3OTc4ZTYwM2E5ODg0NDlkZDRmOGY0OWQyMzI1MmJkMjQ1ZTY1ODQxY2E5MTE5ODM0Y2Y3YjM4ZTNjMzY5NWJmNGFlNDQ5NDdmYzE3NDI5NTY2ZmMyZmE4NWRmZjNjZjU='

		},
		json: true
}
console.log("chat created");
	request(data,callback);
}