var express = require('express');
var request=require("request");
var fs=require("fs");
var sms=require("../models/sms");
var deleteSpace=require("../models/deleteSpace");
var newChat=require("../models/newchat");
//var file=require("../models/file");
var Pron=require("../models/pronunciation");
var date=require("../models/date.js");
var translate=require("../models/translate");
var router = express.Router();
var TOKEN="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTAzLCJwaG9uZSI6Iis5OTY3MDI3MTE4MTQyIiwicGFzc3dvcmQiOiI4ZmI4MDMyMjljMDljYTJjMTY0N2JiNTRmNzYxZTYwZiIsImlhdCI6MTQ3MzkzNjA5MX0.XPOVa9l5hgFfugfEPIZrUwv63GfquQb70K1OXOv12WU";
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
   newChat(userId,TOKEN,function(err,res,body){
   	message=date()+"Я помогу вам перевести предложения из английского на русский или наоборот.Теперь напишите то,что вы хотели бы перевести"+"\n"+"Чтобы прослушать слово на английском,напишите 'listen',потом слово.";
     console.log(message);
     var chat_id=body.data.membership.chat_id;
   	sms(message,chat_id,TOKEN);
   })
}

if(event==="message/new")
{
	console.log("new message");
      var pron=deleteSpace(content).split(" ");
      if(pron.length===2&&pron[0].toLowerCase()==="listen")
      {
         
          Pron.prons(pron[1],function(result)
          {
            console.log(result);
           /* file(result,function(err,res,body){
              console.log(body);
            })*/
            sms(fs.createReadStream(__dirname+"/hello.mp3"),chatId,TOKEN,"audio/mp4");
          })
      }
      else
      {  var a=[];

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
          sms(result,chatId,TOKEN)
 	      }) 
       }
}
res.end();
})
module.exports = router;
