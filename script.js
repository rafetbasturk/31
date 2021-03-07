const express = require("express");
const https = require("https");
const http = require("http");
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

const api_key = process.env.API_KEY;
const api_url = 'https://geo.ipify.org/api/v1?';

app.get("/", function (req, res) {
    const urlObj = {'host': 'api.ipify.org', 'port': 80, 'path': '/'};

    http.get(urlObj, function(resp) {
        resp.on('data', function(ip) {
            const url = api_url + 'apiKey=' + api_key + '&ipAddress=' + ip;

            https.get(url, function(response) {
                let ipData = "";
                response.on("data", function(data) {
                    ipData = JSON.parse(data);
                    let ip = ipData.ip;
                    let city = ipData.location.city;
                    let region = ipData.location.region;
                    let postal = ipData.location.postalCode;
                    let timeZone = ipData.location.timezone;
                    let isp = ipData.isp;
                    let lat = ipData.location.lat;
                    let lng = ipData.location.lng;
                    res.render("index", {ipAddress: ip, location: {city, region, postal}, getTimeZone: timeZone, getIsp: isp, getLat: lat, getLng: lng});
                });
            });
        });
    });
})

app.post("/", function (req, res) {
    const ipInput = req.body.ipAddress;
    const url = api_url + 'apiKey=' + api_key + '&ipAddress=' + ipInput;

    https.get(url, function(response) {
        let ipData = "";
        response.on("data", function(data) {
            ipData = JSON.parse(data);
            let ip = ipData.ip;
            let city = ipData.location.city;
            let region = ipData.location.region;
            let postal = ipData.location.postalCode;
            let timeZone = ipData.location.timezone;
            let isp = ipData.isp;
            let lat = ipData.location.lat;
            let lng = ipData.location.lng;
            
            res.render("index", {ipAddress: ip, location: {city, region, postal}, getTimeZone: timeZone, getIsp: isp, getLat: lat, getLng: lng})
        });
    });
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000.");
})