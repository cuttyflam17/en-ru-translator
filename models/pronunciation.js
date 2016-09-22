var request=require("request");
var cheerio=require("cheerio");
var sound=require("./sound");
var file=require("./file");
exports.prons=function(word,id,callback){
request({uri:"http://dictionary.cambridge.org/dictionary/english/"+word,method:"GET",encoding:"binary"},function(err,res,page){
   var $=cheerio.load(page,{decodeEntities:false});
   var voice=$("span[class='circle circle-btn sound audio_play_button uk']").attr("data-src-mp3");
   console.log("audio url saved: "+voice);
 sound(voice,id);
 setTimeout(function(){
 	file(id,function(err,res){
  	callback(res.body);
  })
 },3000);
  
})

}