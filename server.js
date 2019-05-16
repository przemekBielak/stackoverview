const fetch = require("node-fetch");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

fetch(
  "https://api.stackexchange.com/2.2/questions?order=desc&sort=hot&site=stackoverflow"
)
  .then(res => res.json())
  .then(data => {
    data.items.forEach(item =>
      console.log(`Title: ${item.title}, Link: ${item.link}`)
    );
  })
  .catch(err => {
    throw new console.error(err);
  });

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(8080, () => console.log("Serving on port 8080"));
