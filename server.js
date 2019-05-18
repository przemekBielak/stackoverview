const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const fetch = require("node-fetch");
const fs = require("fs");

const app = express();
const PORT = 8080;

let stackQuestions = [];

app.use(bodyParser.json());
app.use(
  "/graphql/",
  graphqlHTTP({
    schema: buildSchema(`
      type Owner {
        reputation: Int
        user_id: Int
        user_type: String
        profile_image: String
        display_name: String
        link: String
      }

      type Question {
        sort: String
        tags: [String]
        owner: Owner
        is_answered: Boolean
        view_count: Int
        accepted_answer_id: Int
        answer_count: Int
        score: Int
        last_activity_date: Int
        creation_date: Int
        last_edit_date: Int
        question_id: Int
        link: String
        title: String
      }

      type RootQuery {
        questions(is_answered: Boolean): [Question]
      }

      schema {
        query: RootQuery
      }
    `),
    rootValue: {
      questions: (args) => {
        return stackQuestions.filter(x => x.is_answered === args.is_answered);
      }
    },
    graphiql: true
  })
);
app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const questionSorts = ["activity", "votes", "hot", "week", "month"];

const getStackQuestions = questions => {
  (async () => {
    for (sort of questions) {
      const res = await fetch(
        `https://api.stackexchange.com/2.2/questions?order=desc&sort=${sort}&site=stackoverflow`
      );
      const data = await res.json();
      stackQuestions.push(...data.items.map(el => {
        return {...el, "sort": sort}
      }));        
    }

    fs.writeFile(
      "./stackQuestions.json",
      JSON.stringify(stackQuestions, null, 2),
      err => {
        console.log(err);
      }
    );

    app.listen(PORT, () => console.log(`Serving on port ${PORT}`));
  })();
};

getStackQuestions(questionSorts);
