import React from 'react';
import { connect } from 'react-redux';

require('../../sass/generic-error.scss');

const GenericError = props => {
  if (!props.message) {
    return null;
  }

  return (
    <p className='generic-error'>
      {props.message}
    </p>
  );
}

function mapStateToProps(state) {
  return {
    message: state.errors.message,
  };
}

export default connect(mapStateToProps)(GenericError);
