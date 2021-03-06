import React, { Component } from 'react'
import Helmet from 'react-helmet';
export class Event extends Component {
  constructor(props){
    super(props);
    this.handleInput =  this.handleInput.bind(this);
    this.renderData =  this.renderData.bind(this);
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

    const { data } = this.props;
    return (
      <div>
        <Helmet
          htmlAttributes={{lang:"ko"}}
          title = { "helmet test" }
          meta = {
            [
              { name: 'author', content: 'helmeTest' },
              { name: 'description' , content:`${data.body}` }
            ]
          }
        />
        <h1>{ data.title }</h1>
        <input type="text" onChange = { (e)=>this.handleInput(e) } />
        <div>
          { this.renderData() }
        </div>
      </div>
    )
  }
}

export default Event
