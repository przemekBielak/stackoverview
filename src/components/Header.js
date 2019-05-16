import React from "react";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";


const getInfoQuery = gql`
  {
    info(id: "5cdd825d9dabf9c516c498fa") {
      index
      eyeColor
      email
      about
    }
  }
`;

const Header = (props) => {
    console.log(props);
    return (
        <div className="Header">
          <h1>Header</h1>
        </div>
    );
}

export default graphql(getInfoQuery)(Header);
