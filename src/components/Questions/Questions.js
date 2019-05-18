import React, { Component } from "react";
import "./Questions.css";

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: []
    };
  }

  showDetails(question_id) {
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
        this.setState({
          answers: data.data.answers
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.questions.map(item => {
            if (item.sort === this.props.activeQuestionSort) {
              return (
                <li
                  onClick={() => {
                    this.showDetails(item.question_id);
                  }}
                >
                  {item.score}. {item.title}
                </li>
              );
            }
          })}
        </ul>
        <div className="questions__answers">
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
