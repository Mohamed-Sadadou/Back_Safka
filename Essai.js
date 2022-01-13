
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 7000

function createdate() {
  var date = Date.now();
  var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('');
};


const storage = multer.diskStorage({
  destination:function(req,file,cb){
       cb(null,__dirname+"/upload");
  },
  filename:function(req,file,cb){
       cb(null,createdate()+'-'+file.originalname);
  }
})

const fileFilter = (req, file, cb )=>{

  if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/png'){
    cb(null,true);
  }else{
    cb(new Error('Format non supporter'),false);
  }


}

const upload = multer({
  storage : storage,
  limits:{
    fileSize: 1024*1024*5
  },
  fileFilter:fileFilter
})

app.post('/test',upload.array('img', 10),(req,res,next)=>{
console.log(req.files);
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})