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
      type AnswerOwner {
        reputation: Int
        user_id: Int
        user_type: String
        accept_rate: Int
        profile_image: String
        display_name: String
        link: String
      }

      type Answer {
        answerOwner: AnswerOwner
        is_accepted: Boolean
        score: Int
        last_activity_date: Int
        last_edit_date: Int
        creation_date: Int
        answer_id: Int
        question_id: Int
        body: String
      }

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
        body: String
      }

      type RootQuery {
        questions: [Question]
        answers(question_id: Int): [Answer]
      }

      schema {
        query: RootQuery
      }
    `),
    rootValue: {
      questions: args => {
        return stackQuestions;
      },
      answers: args => {
        return (async () => {
          const res = await fetch(
            `https://api.stackexchange.com/2.2/questions/${
              args.question_id
            }/answers?order=desc&sort=activity&site=stackoverflow&filter=withbody`
          );
          const data = await res.json();
          return data.items;
        })();
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
        `https://api.stackexchange.com/2.2/questions?order=desc&sort=${sort}&site=stackoverflow&filter=withbody`
      );
      const data = await res.json();
      stackQuestions.push(
        ...data.items.map(el => {
          return { ...el, sort: sort };
        })
      );
    }

    fs.writeFile(
      "./stackQuestions.json",
      JSON.stringify(stackQuestions, null, 2).replace("/&#39;/g", "'"),
      err => {
        console.log(err);
      }
    );

    app.listen(PORT, () => console.log(`Serving on port ${PORT}`));
  })();
};

getStackQuestions(questionSorts);
// app.listen(PORT, () => console.log(`Serving on port ${PORT}`));

// fs.readFile("./stackQuestions.json", "utf8", (err, data) => {
//   stackQuestions = JSON.parse(data);
// });
