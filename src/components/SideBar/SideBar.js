/**
 * Created by peach on 16-3-16.
 */
import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class SideBar extends Component {
  render() {

    const styles = require('./SideBar.less');

    return (
      <Menu className={ styles.sidebar }
            style={{width:240}}
            defaultOpenKeys={['sub1']}
            mode="inline">
        <SubMenu key="sub1" title={<span><Icon type="setting" /><span>页面列表</span></span>}>
          <Menu.Item key="1">
            <Link  to="/">主页</Link>
          </Menu.Item>
          <SubMenu key="sub2" title="表单">
            <Menu.Item key="2">
              <Link  to="/forms/inputinline">表单行内Input</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/forms/simple">简单表单</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/forms/control">表单控制</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/forms/inputgroup">输入组合表单</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/forms/otherinput">剩余输入组件表单</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/forms/validatetag">校验表单样式列表</Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="/forms/searchinput">搜索输入表单</Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to="/forms/validate">表单校验</Link>
            </Menu.Item>
            <Menu.Item key="10">
              <Link to="/forms/customvalidate">自定义表单校验</Link>
            </Menu.Item>
            <Menu.Item key="11">
              <Link to="/forms/modal">模态窗表单</Link>
            </Menu.Item>
            <Menu.Item key="12">
              <Link to="/forms/dynamicadd">动态添加/删除表单</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="20">
            <Link  to="/afdadfadf">404 Not Found</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
