import React, { PureComponent } from "react";
import "./App.css";
import QuestionsContainer from "./components/Questions/QuestionsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeQuestionSort: "month",
      questions: []
    };

    this.setActiveQuestionSort = this.setActiveQuestionSort.bind(this);
  }

  setActiveQuestionSort(sort) {
    this.setState({ activeQuestionSort: sort });
  }

  componentDidMount() {
    const requestQuestionsBody = {
      query: `{
        questions {
          title
          question_id
          accepted_answer_id
          sort
          score
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
          questions: data.data.questions
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <HeaderContainer setActiveQuestionSort={this.setActiveQuestionSort} />
        <QuestionsContainer
          questions={this.state.questions}
          activeQuestionSort={this.state.activeQuestionSort}
        />
      </div>
    );
  }
}

export default App;
