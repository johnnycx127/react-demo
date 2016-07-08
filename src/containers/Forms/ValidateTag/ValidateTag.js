import React, { Component } from 'react';
import { Form, Input, DatePicker, Col } from 'antd';
const FormItem = Form.Item;

export default class ValidateTagForm extends Component {
  render() {
    return (
      <Form horizontal>
        <FormItem
          label="失败校验"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          validateStatus="error"
          help="请输入数字和字母组合"
        >
          <Input defaultValue="无效选择" id="error" />
        </FormItem>

        <FormItem
          label="警告校验"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          validateStatus="warning"
        >
          <Input defaultValue="前方高能预警" id="warning" />
        </FormItem>

        <FormItem
          label="校验中"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          hasFeedback
          validateStatus="validating"
          help="信息审核中..."
        >
          <Input defaultValue="我是被校验的内容" id="validating" />
        </FormItem>

        <FormItem
          label="成功校验"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          hasFeedback
          validateStatus="success"
        >
          <Input defaultValue="我是正文" id="success" />
        </FormItem>

        <FormItem
          label="警告校验"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          hasFeedback
          validateStatus="warning"
        >
          <Input defaultValue="前方高能预警" id="warning" />
        </FormItem>

        <FormItem
          label="失败校验"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          hasFeedback
          validateStatus="error"
          help="请输入数字和字母组合"
        >
          <Input defaultValue="无效选择" id="error" />
        </FormItem>

        <FormItem
          label="行内校验"
          labelCol={{ span: 5 }}
          help
        >
          <Col span="6">
            <FormItem validateStatus="error" help="请选择正确日期">
              <DatePicker />
            </FormItem>
          </Col>
          <Col span="1">
            <p className="ant-form-split">-</p>
          </Col>
          <Col span="6">
            <FormItem>
              <DatePicker />
            </FormItem>
          </Col>
        </FormItem>
      </Form>
    )
  }
}
