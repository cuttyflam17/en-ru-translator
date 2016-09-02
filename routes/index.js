var express = require('express');
var sms=require("../models/sms");
var deleteSpace=require("../models/deleteSpace");
var newChat=require("../models/newchat");
var date=require("../models/date.js");
var translate=require("../models/translate");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Translator' });
});
router.post('/',function(req,res,next){
var event=req.body.event;
var chatId=req.body.data.chat_id;
    var content=req.body.data.content;
if(event === "user/follow")
{
	console.log("user follows");
   var userId=req.body.data.id;
   newChat(userId,"token",function(err,res,body){
   	message=date()+"Я помогу вам перевести предложения из английского на русский или наоборот.Теперь напишите то,что вы хотели бы перевести";
     console.log(message);
     //var chat_id=body.data.membership.chat_id;
   	//sms(message,chat_id,"token");
   })
}

if(event==="message/new")
{
	console.log("new message");
      
        var a=["x"];
          a=content.match(/[a-zA-Z]/gi);

        
         
       if(a!=null)
       {
       	source="en";
       	target="ru";
       }
       else
       {
       	source="ru";
       	target="en";
       }
       
         translate(content,source,target).then(
 	     result=>{
         console.log(result);
          //sms(result,chatId,"token")
 	      }) 
       
}
res.end();
})
module.exports = router;
