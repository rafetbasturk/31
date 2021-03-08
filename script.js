const express = require("express");
const https = require("https");
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

const api_key = process.env.API_KEY;
const api_url = 'https://geo.ipify.org/api/v1?';
let url = "";

let clientData = "";
let clientIp = "";
https.get("https://api64.ipify.org?format=json", function(response) {
    response.on("data", function(data) {
        clientData = JSON.parse(data);
        clientIp = clientData.ip;
    });
});

app.get("/", function (req, res) {
    url = api_url + 'apiKey=' + api_key + '&ipAddress=' + clientIp;
    https.get(url, function(response) {
        response.on("data", function(data) {
            const ipData = JSON.parse(data);
            const ip = ipData.ip;
            const city = ipData.location.city;
            const region = ipData.location.region;
            const postal = ipData.location.postalCode;
            const timeZone = ipData.location.timezone;
            const isp = ipData.isp;
            const lat = ipData.location.lat;
            const lng = ipData.location.lng;
            
            res.render("index", {ipAddress: ip, location: {city, region, postal}, getTimeZone: timeZone, getIsp: isp, getLat: lat, getLng: lng})
        });
    })
});

app.post("/", function (req, res) {
    const inputIp = req.body.ipAddress;
    url = api_url + 'apiKey=' + api_key + '&ipAddress=' + inputIp;

    https.get(url, function(response) {
        response.on("data", function(data) {
            const ipData = JSON.parse(data);
            const ip = ipData.ip;
            const city = ipData.location.city;
            const region = ipData.location.region;
            const postal = ipData.location.postalCode;
            const timeZone = ipData.location.timezone;
            const isp = ipData.isp;
            const lat = ipData.location.lat;
            const lng = ipData.location.lng;
            
            res.render("index", {ipAddress: ip, location: {city, region, postal}, getTimeZone: timeZone, getIsp: isp, getLat: lat, getLng: lng})
        });
    });
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Server has started.");
})