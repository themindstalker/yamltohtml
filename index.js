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
    var filePath = 'data.html'; 
    fs.unlinkSync(filePath,);
    filePath='data.yaml';
    fs.unlinkSync(filePath);
  }
  catch(err){
    console.log(err)
  }
  
}


var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '.');
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
      if(err){
        console.log(err);
      }
      const file = 'data.html';
      console.log(file)
      res.download(file,function(err){
        if(err){
          console.log(err)
        }
      });
    })
    // setTimeout(function(){
    //   const file = 'data.html';
    //   console.log(file)
    //   res.download(file,function(err){
    //     if(err){
    //       console.log(err)
    //     }
    //   });
    // },2000)
    
});
const port = process.env.PORT || 8080;
app.listen(port,function(){
    console.log(`Working on port ${port}`);
});