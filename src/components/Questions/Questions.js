import React, { Component } from "react";
import "./Questions.css";

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedQuestion: 0,
      answers: []
    };
  }

  showDetails(question_id) {
    const acceptedAnswerId = this.props.questions.find(x => {
      return x.question_id === question_id;
    }).accepted_answer_id;

    console.log(acceptedAnswerId);

    const requestQuestionsBody = {
      query: `{
          answers (question_id: ${question_id}){
            answer_id
            body
        }
      }`
    };

    fetch("/graphql", {
      method: "POST",
      body: JSON.stringify(requestQuestionsBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (acceptedAnswerId === null) {
          this.setState({
            answers: data.data.answers,
            selectedQuestion: question_id
          });
        } else {
          // this.setState({
          //   answers: data.data.answers.filter(x => {
          //     x.answer_id === acceptedAnswerId;
          //   }),
          //   selectedQuestion: question_id
          // });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    let questionBody = this.props.questions.find(x => {
      return x.question_id === this.state.selectedQuestion;
    });

    if (typeof questionBody !== "undefined") {
      questionBody = questionBody.body;
    }

    return (
      <div className="questions">
        <ul>
          {this.props.questions.map(item => {
            if (item.sort === this.props.activeQuestionSort) {
              return (
                <li
                  onClick={() => {
                    this.showDetails(item.question_id);
                  }}
                >
                  <span className="questions__score">{item.score}.</span> {item.title}
                </li>
              );
            }
          })}
        </ul>
        <div className="questions__answers">
          <h2>Question</h2>
          <div
            className="questions__answers__body"
            dangerouslySetInnerHTML={{
              __html: questionBody
            }}
          />
          <h2>Answers</h2>
          {this.state.answers.map(answer => {
            return (
              <div
                className="questions__answers__body"
                dangerouslySetInnerHTML={{ __html: answer.body }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Questions;
