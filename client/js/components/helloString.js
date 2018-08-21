import React from 'react';
import { connect } from 'react-redux';

import { fetchHelloString } from '../actions';

class HelloStringConnected extends React.Component {
  componentDidMount() {
    this.props.fetchHelloString();
  }

  render() {
    return (
      <p>{this.props.helloString}</p>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    helloString: state.helloString,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHelloString: () => {
      dispatch(fetchHelloString());
    }
  }
}

const HelloString = connect(
  mapStateToProps,
  mapDispatchToProps
)(HelloStringConnected);

export default HelloString;

