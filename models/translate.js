var translate = require('node-google-translate-skidz');

function translator(text,s,t)
{
var promise=new Promise(function(resolve,reject){
translate({
  text: text,
  source: s,
  target: t
}, function(result) {
  resolve(result);
});

});
return promise;
};
/*translator("я тебя люблю","ru","en").then(result=>{
	console.log(result);
})*/
module.exports=translator;