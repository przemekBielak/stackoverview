import React from "react";
import "./Questions.css";

const QuestionsList = props => (
  <div>
    <ul>
      {props.questions.map(item => {
        if (item.sort === props.activeQuestionSort) {
          return (
            <li
              onClick={() => {
                props.fetchAnswers(item.question_id);
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

export default QuestionsList;
