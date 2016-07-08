/**
 * Created by peach on 16-3-16.
 */
import React, { Component } from 'react';
import { Menu, Icon, Tooltip } from 'antd';
import { Link } from 'react-router';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      current: 'mail'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  }
  componentUnmount(){
    super.componentUnmount();

  }
  render() {

    const styles = require('./Header.less');

    return (
      <header className={ styles.header }>
        <div className={ styles.logo } ><a href="http://www.baidu.com">我是Brand</a></div>
        <Tooltip placement="bottom" title="切换菜单状态">
          <a className={ styles['sidebar-toggle'] }><Icon type="bars" /></a>
        </Tooltip>
        <Menu onClick={this.handleClick}
              style={{float:'right'}}
              selectedKeys={[this.state.current]}
              mode="horizontal">

          <Menu.Item key="mail">
            <Icon type="mail" />导航一
          </Menu.Item>
          <Menu.Item key="app" disabled>
            <Icon type="appstore" />导航二
          </Menu.Item>
          <SubMenu title={<span><Icon type="user" />用户</span>}>
            <MenuItemGroup title="权限">
              <Menu.Item key="signup">
                <Link to="/auth/signup">注册</Link>
              </Menu.Item>
              <Menu.Item key="login">登录</Menu.Item>
              <Menu.Item key="logout">退出</Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        </Menu>
      </header>
    );
  }
}
