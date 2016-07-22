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
    const contentStyle = {
      width: (window.innerWidth - 240) + 'px',
      overflowY: 'scroll',
      overflowX: 'hidden',
      height: '90%',
      position: 'fixed',
      right: 0,
      top:0
    }
    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Header />
        <SideBar />

        <div className={styles.appContent} style={contentStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
