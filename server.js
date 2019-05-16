const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const graphqlHTTP = require("express-graphql");

const schema = require("./schema/schema");
const app = express();

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

app.listen(8080, () => console.log("Serving on port 8080"));
