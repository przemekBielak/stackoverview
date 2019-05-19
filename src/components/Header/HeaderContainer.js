import React, { PureComponent } from "react";
import Header from "./Header";

class HeaderContainer extends PureComponent {
  constructor(props) {
    super(props);
  }

  handleShowActivity = () => {
    this.props.setActiveQuestionSort("activity");
  };

  handleShowVotes = () => {
    this.props.setActiveQuestionSort("votes");
  };

  handleShowHot = () => {
    this.props.setActiveQuestionSort("hot");
  };

  handleShowWeek = () => {
    this.props.setActiveQuestionSort("week");
  };

  handleShowMonth = () => {
    this.props.setActiveQuestionSort("month");
  };


  render() {
    return (
      <div>
        <Header
          handleShowActivity={this.handleShowActivity}
          handleShowVotes={this.handleShowVotes}
          handleShowHot={this.handleShowHot}
          handleShowWeek={this.handleShowWeek}
          handleShowMonth={this.handleShowMonth}
        />
      </div>
    );
  }
}

export default HeaderContainer;
