import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Films from './components/Films';
import Characters from './components/Characters';
import CharacterBio from './components/CharacterBio'
import './index.css';

const client = new ApolloClient({ uri: "http://localhost:59238" });
const Root = () => {
  return (
    <HashRouter >
      <ApolloProvider client={client}>
        <Switch >
          <Route exact path="/" component={Films} />
          <Route exact path="/characters/:id" component={Characters} />
          <Route exact path="/characterbio/:id" component={CharacterBio} />
        </Switch>
      </ApolloProvider>
    </HashRouter>
  )
}
ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);