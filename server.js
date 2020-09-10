
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

var http = require ('http');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));




app.use(express.static("public"));

app.get("/",function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});


app.post("/Dialogflow", function(request, response){
  var intentName = request.body.queryResult.intent.displayName;
  
  if (intentName == "Teste Glitch"){
    response.json({ "fulfillmentText" : "Isso aqui é um teste de api"});
  }
  
  if (intentName == "ConsultaSaldo"){
  response.json({ "fulfillmentText" : "Ping 1"});
  var url = 'http://ec2-3-135-220-214.us-east-2.compute.amazonaws.com:8080/greeting';
  app.get(url, function(res){
  response.json({ "fulfillmentText" : "Ping 2"});
    var body = '';
    res.on('data', function(chunk){
      body += chunk;
    });
    res.on('end', function(){
     var respose_jquery = JSON.parse(body);
    response.json({ "fulfillmentText" : respose_jquery});
    });
  }).on('error', function(e){
    response.json({ "fulfillmentText" : "Deu ruim"});
  });  
  }
  
  
});


const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
