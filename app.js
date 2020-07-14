const express=require('express');
const app=express();
const mongoose=require('mongoose');
const body_parser=require('body-parser');
mongoose.connect("mongodb://localhost/filter",{useNewUrlParser:true,useUnifiedTopology:true});

app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());
app.set('views','views');
app.set('view engine','ejs');
var Schema=mongoose.Schema
 var UserSchema=new Schema({
        talent_name:{type:String},
        position:{type:String},
        industry:{type:String,required:true},
       
     top_skill:{type:String,required:true},
    availability:{type:String,required:true},
     start_time:{type:String,required:true},
     location:{type:String,required:true},
     salary:{type:Number,required:true},
     maxexp:{type:Number,required:true},
     min_exp:{type:Number,required:true},
     hiring:{type:String,required:true},
     seniority_level:{type:String,required:true},
    });
const user=mongoose.model('user',UserSchema);
app.get('/',function(req,res){
    res.render("filter");
});
app.post('/filter',function(req,res){
   console.log(req.body.industry); user.find({$or:[{position:req.body.position},{industry:req.body.industry},{talent_name:req.body.talent_name},{availability:req.body.availability},{top_skill:req.body.top_skill},{location:req.body.location},{salary:req.body.salary},{maxexp:req.body.maxexp},{min_exp:req.body.min_exp},{hiring:req.body.hiring},{seniority_level:req.body.seniority_level},{start_time:req.body.start_time}]},{"_id":0},function(err,result){
        if(err)
            {
                console.log(err);
            }
         else if(!result)
         {
             res.send("not found");
         }
        else{
            res.send(result);
         console.log(result);
}
    })
});
     app.listen(3000,()=>{
    console.log("Listening to port 3000");
});