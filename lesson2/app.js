var express  = require('express');
var utility  = require('utility');

var app = express();

app.get('/',function(req,res){
    var q =req.query.q;
    var md5value = utility.md5(q);
    res.send(md5value);
})

app.listen(3001,function (req,res) {
    console.log('app is running   at port 3001');
    
})