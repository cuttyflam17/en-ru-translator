﻿var express = require('express');
var request=require("request");
var fs=require("fs");
var sms=require("../models/sms");
var deleteSpace=require("../models/deleteSpace");
var newChat=require("../models/newchat");
var Pron=require("../models/pronunciation");
var date=require("../models/date.js");
var translate=require("../models/translate");
var router = express.Router();
var TOKEN="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTAzLCJwaG9uZSI6Iis5OTY3MDI3MTE4MTQyIiwicGFzc3dvcmQiOiI4ZmI4MDMyMjljMDljYTJjMTY0N2JiNTRmNzYxZTYwZiIsImlzQm90Ijp0cnVlLCJjb3VudHJ5Ijp0cnVlLCJpYXQiOjE0Nzc5MTYwNzN9.z1a5U5v9IDOByIXWnsyhpKJu0wUAkwXd8DxO2w80e78";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Translator' });
});

router.post('/',function(req,res,next){
  var ip = req.connection.remoteAddress;
var event=req.body.event;
var chatId=req.body.data.chat_id;

    var content=req.body.data.content;

if(event === "user/follow")
{
	console.log("user follows");
   var userId=req.body.data.id;
   newChat(userId,TOKEN, ip, function(err,res,body){
   	message=date()+"Я помогу Вам перевести предложения с английского на русский или наоборот. Пожалуйста, введите то, что Вы хотели бы перевести"+"\n"+" Чтобы прослушать слово на английском, пожалуйста, напишите '/listen',потом слово."+"\n"+" Перевод осуществляется сервисом «Яндекс. Переводчик»";
     console.log(message);
     var chat_id=body.data.id;
   	sms(message,chat_id,TOKEN, null, ip);
   })
}

if(event==="message/new")
{
	console.log("new message");
      var pron=deleteSpace(content).split(" ");
      
      if(pron.length===2&&pron[0].toLowerCase()==="/listen")
      {
         
          Pron.prons(pron[1],chatId,function(result,type)
          {
            console.log(result+"\n"+"chat id="+chatId);
            sms(result,chatId,TOKEN,type, ip);
          })
      }
      else if(pron[0].toLowerCase()==="/listen"&&pron.length!=2)
      {
        var errmessage="Введите как на примере:'/listen hello'";
        console.log(errmessage);
        sms(errmessage,chatId,TOKEN, null, ip);
      }
      else if(req.body.data.type != "text/plain")
      {
        sms("Неправильный ввод или такого слова в интересующем Вас языке не существует. Пожалуйста, введите текст.",chatId,TOKEN, null, ip);
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
          sms(result,chatId,TOKEN, null, ip);
 	      }) 
       }
}
res.end();
})
module.exports = router;
