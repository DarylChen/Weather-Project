const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res){
    
    const query = req.body.cityName;
    const appid = "e4cf0c1f1a0414cf6088b68b5a203a74";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&limit=5&appid="+ appid;

    https.get(url, function(response){
        console.log(res.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather in Toronto is " + weatherDescription + "</p>");
            res.write("The temperature in Toronto is " + temp + " degrees Celsius");
            res.write("<img src=" + imageUrl + ">");
            res.send();
        })
    })

})

app.listen(3000, function(req, res){
    console.log("Server is running on port 3000");
})