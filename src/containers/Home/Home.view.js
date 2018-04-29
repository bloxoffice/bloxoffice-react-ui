import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { HomeSelector } from './Home.redux';
import { callAction } from './Home.actions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerified: false
    };
  }

  callAction2 = () => {
    this.setState({
      isVerified: true
    });
  };

  render() {
    const { isVerified } = this.state;
    return (
      <div className="home-container">
        Home
        <button className="hoverable-btn" onClick={this.props.callAction}>call action</button>
        <button onClick={this.callAction2}>call action2</button>
      </div>
    );
  }
}

Home.propTypes = {};

const mapDispatchToProps = {
  callAction
};

export default withRouter(connect(HomeSelector, mapDispatchToProps)(Home));
