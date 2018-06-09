import React, { Component } from 'react';
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import { routes } from "routes/index.async";
import { renderRoutes } from "react-router-config";
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
          <Switch>{renderRoutes(routes)}</Switch>
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
