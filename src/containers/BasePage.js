import React, { Component } from 'react'; // eslint-disable-line
// import PropTypes from 'prop-types';

import { initGA, logPageView } from 'utils/googleAnalytics';

class BasePage extends Component {

  componentDidMount() {
    if (this.props.pathname) {
      initGA();
      logPageView(this.props.pathname);
    }
  }

}

BasePage.propTypes = {};

export default BasePage;
