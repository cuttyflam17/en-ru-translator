var request=require("request");

module.exports=function(mp3,callback)
{
	var formData={
		my_field:"my_field",
		my_buffer:new Buffer(10),
		my_file:request("http://dictionary.cambridge.org/media/english/uk_pron/u/ukh/ukhef/ukheft_029.mp3"),
	 custom_file: {
  
    options: {
      "Content-Type": 'audio/mp3'
    }
  }	
	}
var data=
{
	url:"http://files.kamp.kg/",
    method:"POST",
    headers:
    {
    	"Content-Type":"multipart/form-data"
    },
   formData:formData
    
}
request(data,callback)
}