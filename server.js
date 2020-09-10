
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require('http')
const options = {
  hostname: 'ec2-3-136-20-161.us-east-2.compute.amazonaws.com',
  port: 8080,
  path: '/saldo',
  method: 'GET'
}

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
  const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
    response.json({ "fulfillmentText" : "Saldo da conta: "+ d});
  })
})

req.on('error', error => {
  console.error(error)
  response.json({ "fulfillmentText" : "Deu ruim " + error});
})

req.end()
  }
  
  
});


const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
