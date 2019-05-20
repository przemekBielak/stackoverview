import React from "react";
import "./Questions.css";

const showAnswerLabel = acceptedAnswerExists => {
  if (acceptedAnswerExists) {
    return <h3>Accepted Answer</h3>;
  } else {
    return null;
  }
};

const QandA = props => {
  if (props.question !== undefined) {
    return (
      <div className="questions__answers">
        <h2>Question</h2>
        <div
          className="questions__answers__body"
          dangerouslySetInnerHTML={{
            __html: props.question.body
          }}
        />
        <h2>Answers</h2>
        {props.answers.map(answer => {
          return (
            <div>
              {showAnswerLabel(props.acceptedAnswerExists)}
              <div
                className="questions__answers__body"
                dangerouslySetInnerHTML={{ __html: answer.body }}
              />
            </div>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
};

export default QandA;
