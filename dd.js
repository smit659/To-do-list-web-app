
module.exports.simp=Ok;
exports.gaad="pkmb";
function Ok(){ 
var today=new Date();   
 var options={

   day:"numeric",
   month:"long"  ,
weekday:"long"

 };
 console.log(options);
 var dater= today.toLocaleDateString("en-US",options);
 return dater;}