// server.js
// inicio aplicação node

// init projeto
var express = require('express');
var app = express();


// somente permite acesso com usuário e senha
var userName = "guest";
var userPass = process.env.PASSWORD;

var basicAuth = require('basic-auth');
app.use(function (request, response, next) {
  var user = basicAuth(request);
  if (!user || user.name !== userName || user.pass !== userPass) {
    response.set('WWW-Authenticate', 'Basic realm="site"');
    return response.status(401).send();
  }
  return next();
});


const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require('http')


const getSaldo = {
  hostname: '',
  port: 8080,
  path: '/saldo',
  method: 'GET'
}

const getDados = {
  hostname: '',
  port: 8080,
  path: '/dados',
  method: 'GET'
}

const getExtrato = {
  hostname: '',
  port: 8080,
  path: '/extrato',
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
  
  //Teste do glitch
  if (intentName == "Teste Glitch"){
    response.json({ "fulfillmentText" : "Isso aqui é um teste de api"});
  }
  
  //Consulta Saldo
  if (intentName == "ConsultaSaldo"){
  const req = http.request(getSaldo, res => {
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
  
  //Consulta Dados
  if (intentName == "ConsultaDados"){
  const req = http.request(getDados, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
    response.json({ "fulfillmentText" : "Aqui estão os dados da sua conta: "+ d});
  })
})

req.on('error', error => {
  console.error(error)
  response.json({ "fulfillmentText" : "Deu ruim " + error});
})

req.end()
  }
  
  //Consulta Dados
  if (intentName == "ConsultaExtrato"){
  const req = http.request(getExtrato, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
    response.json({ "fulfillmentText" : "Aqui esta o extrato solicitado: "+ d});
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
