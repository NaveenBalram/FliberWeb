import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Notifications from 'react-notify-toast';
import * as styles from './App.module.scss';
import Header from './components/Header/Header'

class App extends PureComponent {
  render() {
    const { Routes } = this.props;
    return (
      <div className={styles.app}>
        <div className={styles.mainContent}>
          <Notifications
            options={{
              colors: {
                error: { backgroundColor: '#FF0000', color: '#FFFFFF' },
              },
            }}
          />
          <Header location={window.location} />
          <Routes />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  Routes: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
  }).isRequired,
};

export default connect(null, null)(App);
