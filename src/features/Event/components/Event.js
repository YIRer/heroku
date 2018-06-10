import React, { Component } from 'react'
import Helmet from 'react-helmet';
export class Event extends Component {
  constructor(props){
    super(props);
    this.handleInput =  this.handleInput.bind(this);
  }
  handleInput(e){
    e.preventDefault();
    const value = e.target.value;
    this.props.setTitle(value)
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>헬멧테스트</title>
        </Helmet>
        <input type="text" onChange = { (e)=>this.handleInput(e) } />
      </div>
    )
  }
}

export default Event
