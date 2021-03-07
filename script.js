const express = require("express");
const https = require("https");
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

const api_key = process.env.API_KEY;
const api_url = 'https://geo.ipify.org/api/v1?';

app.get("/", function (req, res) {
    let localIp = "";
    fetch("http://api.ipify.org/?format=json").then(res => res.json()).then(data => localIp = data.ip);
    const url = api_url + 'apiKey=' + api_key + '&ipAddress=' + localIp;

    https.get(url, function(response) {
        let ipData = "";
        response.on("data", function(data) {
            ipData = JSON.parse(data);
            const ip = ipData.ip;
            const city = ipData.location.city;
            const region = ipData.location.region;
            const postal = ipData.location.postalCode;
            const timeZone = ipData.location.timezone;
            const isp = ipData.isp;
            const lat = ipData.location.lat;
            const lng = ipData.location.lng;
            res.render("index", {ipAddress: ip, location: {city, region, postal}, getTimeZone: timeZone, getIsp: isp, getLat: lat, getLng: lng});
        });
    });
})

app.post("/", function (req, res) {
    const inputIp = req.body.ipAddress;
    const url = api_url + 'apiKey=' + api_key + '&ipAddress=' + inputIp;

    https.get(url, function(response) {
        let ipData = "";
        response.on("data", function(data) {
            ipData = JSON.parse(data);
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