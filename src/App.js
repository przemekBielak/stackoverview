import React, { Component } from "react";
import "./App.css";
import Questions from "./components/Questions";
import HeaderContainer from "./components/Header/HeaderContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }

  componentDidMount() {
    const requestQuestionsBody = {
      query: `{
        questions (is_answered: true){
          is_answered
          title
          question_id
          accepted_answer_id
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
        <HeaderContainer />
        <Questions />
      </div>
    );
  }
}

export default App;
