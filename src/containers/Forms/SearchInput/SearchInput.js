import React, { Component } from 'react';
import { Form, Input, Row, Col, Button, DatePicker } from 'antd';
const FormItem = Form.Item;

export default class SearchInputForm extends Component {
  render() {
    const styles = require('./SearchInput.scss');

    return (
      <Form horizontal className={ styles['ant-advanced-search-form'] }>
        <Row gutter={16} className={ styles.row }>
          <Col sm={8}>
            <FormItem
              label="搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Input placeholder="请输入搜索名称" size="default" />
            </FormItem>
            <FormItem
              label="较长搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <DatePicker size="default" />
            </FormItem>
            <FormItem
              label="搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Input placeholder="请输入搜索名称" size="default" />
            </FormItem>
          </Col>
          <Col sm={8}>
            <FormItem
              label="搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Input placeholder="请输入搜索名称" size="default" />
            </FormItem>
            <FormItem
              label="较长搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <DatePicker size="default" />
            </FormItem>
            <FormItem
              label="搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Input placeholder="请输入搜索名称" size="default" />
            </FormItem>
          </Col>
          <Col sm={8}>
            <FormItem
              label="搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Input placeholder="请输入搜索名称" size="default" />
            </FormItem>
            <FormItem
              label="较长搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <DatePicker size="default" />
            </FormItem>
            <FormItem
              label="搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Input placeholder="请输入搜索名称" size="default" />
            </FormItem>
          </Col>
        </Row>
        <Row className={ styles.row }>
          <Col span={12} offset={12} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button className={ styles['reset-btn'] }>清除条件</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}
