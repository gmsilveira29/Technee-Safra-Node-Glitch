
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const rp = require('request-promise-native');

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


      function get_products(agent){
      var url = 'https://705861b5.ngrok.io/products';
      var options = {
      uri: url,
      json: true
    };
    return rp.get( options )
      .then( body => {
        agent.add("Got a response: "+body.product_name);
      })
      .error( err => {
        agent.add("Got an error: ");
    });
}
    response.json({ "fulfillmentText" : "Isso aqui é um teste de api"});
  }
  
});


const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
