import React, { PureComponent } from "react";
import QuestionsList from "./QuestionsList";
import QandA from "./QandA";
import "./Questions.css";

class QuestionsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedQuestion: 0,
      answers: [],
      acceptedAnswerExists: false
    };

    this.fetchAnswers = this.fetchAnswers.bind(this);
  }

  fetchAnswers(question_id) {
    this.setState({
      selectedQuestion: question_id
    });
    
    const acceptedAnswerId = this.props.questions.find(x => {
      return x.question_id === question_id;
    }).accepted_answer_id;

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
            answers: acceptedArr,
            acceptedAnswerExists: true
          });
        } else {
          this.setState({
            answers: data.data.answers,
            acceptedAnswerExists: false
          });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const question = this.props.questions.find(x => {
      return x.question_id === this.state.selectedQuestion;
    });

    return (
      <div className="questions">
        <QuestionsList
          questions={this.props.questions}
          activeQuestionSort={this.props.activeQuestionSort}
          fetchAnswers={this.fetchAnswers}
        />
        <QandA
          question={question}
          answers={this.state.answers}
          acceptedAnswerExists={this.state.acceptedAnswerExists}
        />
      </div>
    );
  }
}

export default QuestionsContainer;
