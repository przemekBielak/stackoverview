import React, { Component } from "react";
import "./Questions.css";

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedQuestion: 0,
      answers: []
    };

    this.fetchAnswers = this.fetchAnswers.bind(this);
  }

  fetchAnswers(question_id) {
    const acceptedAnswerId = this.props.questions.find(x => {
      return x.question_id === question_id;
    }).accepted_answer_id;

    this.setState({
      selectedQuestion: question_id
    });

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
        const accepted = data.data.answers.find(x => {
          return x.answer_id === acceptedAnswerId;
        });

        if (accepted !== undefined) {
          const acceptedArr = [];
          acceptedArr.push(accepted);
          this.setState({
            answers: acceptedArr
          });
        } else {
          this.setState({
            answers: data.data.answers
          });
        }
      })
      .catch(err => console.log(err));
  }

  showQuestionsList(questions, activeQuestionSort, fetchAnswers) {
    return (
      <div>
        <ul>
          {questions.map(item => {
            if (item.sort === activeQuestionSort) {
              return (
                <li
                  onClick={() => {
                    fetchAnswers(item.question_id);
                  }}
                >
                  <span className="questions__score">{item.score}.</span>
                  {item.title}
                </li>
              );
            }
          })}
        </ul>
      </div>
    );
  }

  showQandA(question, answers) {
    if (question !== undefined) {
      return (
        <div className="questions__answers">
          <h2>Question</h2>
          <div
            className="questions__answers__body"
            dangerouslySetInnerHTML={{
              __html: question.body
            }}
          />
          <h2>Answers</h2>
          {answers.map(answer => {
            return (
              <div
                className="questions__answers__body"
                dangerouslySetInnerHTML={{ __html: answer.body }}
              />
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const question = this.props.questions.find(x => {
      return x.question_id === this.state.selectedQuestion;
    });

    return (
      <div className="questions">
        {this.showQuestionsList(
          this.props.questions,
          this.props.activeQuestionSort,
          this.fetchAnswers
        )}
        {this.showQandA(question, this.state.answers)}
      </div>
    );
  }
}

export default Questions;
