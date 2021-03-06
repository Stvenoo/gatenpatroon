import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './modules/app/app';

const Root = ({ store }) =>
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
;

Root.propTypes = {
  store: PropTypes.object,
};

export default Root;
