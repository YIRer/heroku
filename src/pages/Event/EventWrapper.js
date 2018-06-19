import React, { Component } from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as eventActions } from "features/Event/actions";

import Event from 'features/Event/components/Event'

export class EventWrapper extends Component {
  constructor(props){
    super(props);
    props.getTypeDefineRequest(1)
  }
  render() {
    return (
      <div>
        {
          Object.keys(this.props.data).length > 0 ? (
            <Event
              setTitle = { this.props.setTitleString }
              {...this.props}
            />
          ):null
        }
        
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.event.current
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...eventActions,
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(EventWrapper);
