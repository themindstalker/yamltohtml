var express =   require("express");
var multer  =   require('multer');
var npm     = require('npm');
var app         =   express();
const fs = require('fs')
var path = require('path')
const {exec} = require('child_process');
deletExistingFile();
function deletExistingFile(){
  try{
    var filePath = 'HTML/data.html'; 
    fs.unlinkSync(filePath,);
    filePath='YAML/data.yaml';
    fs.unlinkSync(filePath);
  }
  catch(err){
    console.log(err)
  }
  
}


var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './YAML');
  },
  filename: function (req, file, callback) {
    callback(null, 'data'+path.extname(file.originalname));
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
  deletExistingFile();
    upload(req,res,function(err) {
        if(err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
         
    });
    exec('npm run redoc-bundle',function(err){
      console.log(err);
    })
    setTimeout(function(){
      const file = 'HTML/data.html';
      console.log(file)
      res.download(file,function(err){
        if(err){
          console.log(err)
        }
      });
    },5000)
    
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});