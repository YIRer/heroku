import React, { Component } from 'react';
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as Routes from "routes/index.async";
import { hot } from 'react-hot-loader'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.props.title}</h1>
        </header>
        <main>
          <Switch>
            <Route path="/" exact component = { Routes.LoadableEvent }></Route>
            <Route path="*" exact component = { Routes.LoadableNoPost }></Route>
          </Switch>
        </main>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    title: state.event.title
  };
};

App = connect(mapStateToProps, null)(App)
export default hot(module)(App);
