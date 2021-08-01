const mongoose=require('mongoose');
const express=require('express');
const bodyparser=require('body-parser');
const st=require(__dirname+"/dd.js");

const _   =require('lodash');
const app=express();
app.use(express.static("public"));

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.connect('mongodb+srv://smit-admin:555admin@cluster0.12u2y.mongodb.net/tododb',{useNewUrlParser: true,useUnifiedTopology: true });
const todoSchema=mongoose.Schema({
todos:String
});
const rp=mongoose.Schema({
name:String,
lister:[todoSchema]
});
const randomParams=mongoose.model('randomParameters',rp);

app.get("/:paramss",function(req,res){
var paramss=_.capitalize(req.params.paramss);

randomParams.findOne({name:paramss},function(err,as)
{
  if(!as){ 
    const dcs=new randomParams({
      name:paramss,
     
      });
      dcs.save();
res.redirect('/'+paramss);
  }
  else
  {
    res.render("todo",{erl:as.lister,tdate:paramss});

  
  }


});


});
const lists=mongoose.model('todo',todoSchema);
app.get("/",function(req,res){
 var k=st.simp();
 console.log(st.gaad);
 lists.find(function(err,as)
 {
 console.log(as);
 res.render("todo",{erl:as,tdate:"today"});

 });
});
app.post("/",function(req,res){
   const newItem= req.body.newItem;
   const labl= req.body.btn;

 const constants=  new lists({
     todos:newItem
   });
   if(labl=='today')
   { 
   constants.save();
   res.redirect("/");
   }
   else
   {
    randomParams.findOne({name:labl},function(err,ans){
      ans.lister.push(constants);
      ans.save(); 
      res.redirect('/'+labl);
    } ); 
   
   }

  });
  app.post('/delete',function(req,res){
  const iid=req.body.checkboxx;
  const hidens=req.body.hide;
  if(hidens=='today')
  {
    lists.findByIdAndRemove({_id:iid},function(err,rs){
      if(!err)
      {
        res.redirect("/");
      }
        });
  }
  else
  {
      randomParams.findOneAndUpdate({name:hidens},{$pull:{lister:{_id:iid}}},function(err,as)
      {
          if(!err)
          {
            res.redirect('/'+hidens);
          }
      });
  }



  });

app.listen(3100,function(){
console.log("Listening on port 3100");
});

