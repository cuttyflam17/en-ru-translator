var request=require("request");
var cheerio=require("cheerio");
var sound=require("./sound");
var file=require("./file");
exports.prons=function(word,id, ip, callback){
request({uri:"http://dictionary.cambridge.org/dictionary/english/"+word,method:"GET",encoding:"binary"},function(err,res,page){
   var $=cheerio.load(page,{decodeEntities:false});
   var voice=$("span[class='circle circle-btn sound audio_play_button uk']").attr("data-src-mp3");
   if(voice===undefined)
   {
   	
   	callback("Неправильный ввод или такого слова на английском не существует.","");
   }
   else{
   console.log("audio url saved: "+voice);
 sound(voice,id);
 setTimeout(function(){
 	file(id, ip, function(err,res){
  	callback(res.body.file,"audio/mp4");
  })
 },3000);
  }
})

}