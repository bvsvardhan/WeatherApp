const express= require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
  const city=req.body.cityName;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=527717a6da5c2d55607f9c761e675041&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      console.log(temp);
      const weatherDescription=weatherData.weather[0].description;
      console.log(weatherDescription);

      const icon=weatherData.weather[0].icon;
      const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h3>The Weather is currently "+weatherDescription+".</h3>");
      res.write("<h1>The temperature in "+city+" is "+temp+" Celsius</h1>");
      res.write("<img src="+imageURL+">");
    res.send();
    })
  })
})





app.listen(3000,function(){
  console.log("server is running.");
})
