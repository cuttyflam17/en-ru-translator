var request=require("request");
var cheerio=require("cheerio");

exports.prons=function(word,callback){
request({uri:"http://dictionary.cambridge.org/dictionary/english/"+word,method:"GET",encoding:"binary"},function(err,res,page){
   var $=cheerio.load(page,{decodeEntities:false});
   var voice=$("span[class='circle circle-btn sound audio_play_button uk']").attr("data-src-mp3");
callback(voice);
})

}