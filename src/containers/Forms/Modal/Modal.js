import React, { Component } from 'react';
import { Button, Form, Input, Modal } from 'antd';

const FormItem = Form.Item;

class ModalForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false
    }
  }

  handleSubmit = () => {
    console.log(this.props.form.getFieldsValue());
    this.hideModal();
  }

  showModal = () => {
    this.setState({ visible: true });
  }

  hideModal = () => {
    this.setState({ visible: false });
  }

  render() {
    const { getFieldProps } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>点击有惊喜</Button>
        <Modal title="登录" visible={this.state.visible} onOk={this.handleSubmit} onCancel={this.hideModal}>
          <Form horizontal form={this.props.form}>
            <FormItem
              {...formItemLayout}
              label="用户名"
            >
              <Input {...getFieldProps('username', {})} type="text" autoComplete="off" />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="密码"
            >
              <Input {...getFieldProps('password', {})} type="password" autoComplete="off" />
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(ModalForm);
