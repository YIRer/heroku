import React, { Component } from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as eventActions } from "features/Event/actions";

import Event from 'features/Event/components/Event'

export class EventWrapper extends Component {
  render() {
    return (
      <div>
        <Event
          setTitle = { this.props.setTitleString }
        />
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...eventActions,
    },
    dispatch
  )
});

export default connect(null, mapDispatchToProps)(EventWrapper);
