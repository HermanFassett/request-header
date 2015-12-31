var http = require('http');
var path = require('path');
var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+"/index.html"));
});

app.get('/api/whoami', function(req, res) {
  var obj = {
    "ipaddress": req.headers["x-forwarded-for"],
    "language": req.headers["accept-language"].split(",")[0],
    "software": req.headers["user-agent"].split("(")[1].split(")")[0]
  }
  res.json(obj);
});
app.listen(process.env.PORT || 3000);
