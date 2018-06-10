import React, { Component } from 'react'
import Helmet from 'react-helmet';
export class Event extends Component {
  constructor(props){
    super(props);
    props.getTypeDefineRequest(1)
    this.handleInput =  this.handleInput.bind(this);
  }
  handleInput(e){
    e.preventDefault();
    const value = e.target.value;
    this.props.setTitle(value)
  }
  renderData(){
    const { data } = this.props;
    const mapData = Object.keys(data);
    const hasData = mapData.length > 0 ;
    if(hasData){
      return (
        mapData.map((keys,index)=>{
          return(
            <p key={`${keys}_${index}`}>
              {data[keys]}
            </p>
          )
        })
      )
    }else{
      return null
    }
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>헬멧테스트</title>
        </Helmet>
        <input type="text" onChange = { (e)=>this.handleInput(e) } />
        <div>
          { this.renderData() }
        </div>
      </div>
    )
  }
}

export default Event
