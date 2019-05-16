import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Header from './components/Header'
import "./App.css";

const client = new ApolloClient({
  uri: "/graphql"
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Header />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
