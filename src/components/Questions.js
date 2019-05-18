import React, { Component } from "react";

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showDetails(question_id) {
    console.log(question_id);
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
      </div>
    );
  }
}

export default Questions;
