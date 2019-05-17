const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const graphqlHTTP = require("express-graphql");
const fetch = require("node-fetch");
const fs = require('fs');
const schema = require("./schema/schema");

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(
  "/graphql/",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);
app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const questionSorts = ["activity", "votes", "hot", "week", "month"];

let stackData = {};

(async () => {
  for (sort of questionSorts) {
    const res = await fetch(
      `https://api.stackexchange.com/2.2/questions?order=desc&sort=${sort}&site=stackoverflow`
    );
    const data = await res.json();

    stackData[sort] = data.items;
  }

  fs.writeFile('./stackdata.json', JSON.stringify(stackData, null, 2), (err) => {
    console.log(err);
  })

  // app.listen(PORT, () => console.log(`Serving on port ${PORT}`));
})();
