import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from '../../actions/auth';
import { push } from 'react-router-redux';
import config from '../../config';
import { Header, SideBar } from 'components';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleLogout = (event) => {
    event.preventDefault();
  };

  render() {
    // const {user} = this.props;
    const user = { name: '123'};
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Header />
        <SideBar />
        <div className={styles.appContent} style={{ width: (window.innerWidth - 240) + 'px' }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
