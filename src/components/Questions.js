import React, { Component } from "react";

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.questions.map(item => {
          if (item.sort === this.props.activeQuestionSort) {
            return (
              <p>
                {item.score}. {item.title}
              </p>
            );
          }
        })}
      </div>
    );
  }
}

export default Questions;
