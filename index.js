// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/whoami", function (req, res) {
  var ip = req.ip;
  var language = req.header("accept-language");
  var software = req.header("user-agent");
  res.json({ ipaddress: ip, language: language, software: software });
});

app.post("/api/shorturl", (req, res) => {
  const originalUrl = req.body.url;
  const urlObject = urlParser.parse(originalUrl);

  // Validate hostname using DNS
  dns.lookup(urlObject.hostname, (err) => {
    if (err) {
      return res.json({ error: "invalid url" });
    }

    // Store URL
    const shortUrl = id++;
    urls.push({ original_url: originalUrl, short_url: shortUrl });

    res.json({ original_url: originalUrl, short_url: shortUrl });
  });
});

app.get("/api/shorturl/:short_url", (req, res) => {
  const short_url = parseInt(req.params.short_url);
  const found = urls.find((entry) => entry.short_url === short_url);

  if (found) {
    res.redirect(found.original_url);
  } else {
    res.json({ error: "No short URL found for the given input" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
