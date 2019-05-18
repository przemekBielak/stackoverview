import React, { Component } from "react";
import Header from "./Header";

class HeaderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleShowActivity = () => {
    console.log("clicked");
  };

  render() {
    return (
      <div>
        <Header handleShowActivity={this.handleShowActivity} />
      </div>
    );
  }
}

export default HeaderContainer;
