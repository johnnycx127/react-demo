import React, { Component } from 'react';
import { Button, Form, Input, Row, Col } from 'antd';

const FormItem = Form.Item;

const noop = () => false;

class CustomValidateForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      passBarShow: false, // 是否显示密码强度提示条
      rePassBarShow: false,
      passStrength: 'L', // 密码强度
      rePassStrength: 'L',
    }
  }

  handleSubmit = () => {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      console.log(values);
    });
  }

  getPassStrenth = (value, type) => {
    if (value) {
      let strength;
      // 密码强度的校验规则自定义，这里只是做个简单的示例
      if (value.length < 6) {
        strength = 'L';
      } else if (value.length <= 9) {
        strength = 'M';
      } else {
        strength = 'H';
      }
      if (type === 'pass') {
        this.setState({ passBarShow: true, passStrength: strength });
      } else {
        this.setState({ rePassBarShow: true, rePassStrength: strength });
      }
    } else {
      if (type === 'pass') {
        this.setState({ passBarShow: false });
      } else {
        this.setState({ rePassBarShow: false });
      }
    }
  }

  checkPass = (rule, value, callback) => {
    const form = this.props.form;
    this.getPassStrenth(value, 'pass');

    if (form.getFieldValue('pass')) {
      form.validateFields(['rePass'], { force: true });
    }
    callback();
  }

  checkPass2 = (rule, value, callback) => {
    const form = this.props.form;
    this.getPassStrenth(value, 'rePass');

    if (value && value !== form.getFieldValue('pass')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  }

  renderPassStrengthBar = (type) => {
    const styles = require('./CustomValidate.scss');
    const strength = type === 'pass' ? this.state.passStrength : this.state.rePassStrength;
    const level = {
      L: '低',
      M: '中',
      H: '高',
    };

    const strengthItemFirstStyle = {
      borderTopLeftRadius: '6px',
      borderBottomLeftRadius: '6px'
    }

    const strengthItemSecondStyle = {
      width: '20px'
    }

    const strengthItemThirdStyle = {
      borderTopRightRadius: '6px',
      borderBottomRightRadius: '6px',
      marginRight: '8px'
    }

    switch (strength) {
      case 'L':
        return (
          <div>
            <ul className={styles['ant-pwd-strength']}>
              <li className={styles['ant-pwd-strength-item']} style={{
                ...strengthItemFirstStyle,
                backgroundColor: '#FAC450'
              }}></li>
              <li className={styles['ant-pwd-strength-item']} style={strengthItemSecondStyle}></li>
              <li className={styles['ant-pwd-strength-item']} style={strengthItemThirdStyle}></li>
              <span className="ant-form-text">
                {level[strength]}
              </span>
            </ul>
          </div>
        )
      case 'M':
        return (
          <div>
            <ul className={styles['ant-pwd-strength']}>
              <li className={styles['ant-pwd-strength-item']} style={{
                ...strengthItemFirstStyle,
                backgroundColor: '#FAC450'
              }}></li>
              <li className={styles['ant-pwd-strength-item']} style={{
                ...strengthItemSecondStyle,
                backgroundColor: 'rgba(135, 208, 104, .6)',
                filter:'progid:DXImageTransform.Microsoft.gradient(startColorstr=#9987D068,endColorstr=#9987D068)'
              }}></li>
              <li className={styles['ant-pwd-strength-item']} style={strengthItemThirdStyle}></li>
              <span className="ant-form-text">
                {level[strength]}
              </span>
            </ul>
          </div>
        )
      case 'H':
        return (
          <div>
            <ul className={styles['ant-pwd-strength']}>
              <li className={styles['ant-pwd-strength-item']} style={{
                ...strengthItemFirstStyle,
                backgroundColor: '#FAC450'
              }}></li>
              <li className={styles['ant-pwd-strength-item']} style={{
                ...strengthItemSecondStyle,
                backgroundColor: 'rgba(135, 208, 104, .6)',
                filter:'progid:DXImageTransform.Microsoft.gradient(startColorstr=#9987D068,endColorstr=#9987D068)'
              }}></li>
              <li className={styles['ant-pwd-strength-item']} style={{
                ...strengthItemThirdStyle,
                backgroundColor: '#87D068'
              }}></li>
              <span className="ant-form-text">
                {level[strength]}
              </span>
            </ul>
          </div>
        )
      default:
        return null;

    }
  }

  render() {
    const { getFieldProps } = this.props.form;

    const passProps = getFieldProps('pass', {
      rules: [
        { required: true, whitespace: true, message: '请填写密码' },
        { validator: this.checkPass },
      ],
      onChange: (e) => {
        console.log('你的密码就是这样被盗的：', e.target.value);
      },
    });
    const rePassProps = getFieldProps('rePass', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请再次输入密码',
      }, {
        validator: this.checkPass2,
      }],
    });
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    return (
      <div>
        <Form horizontal form={this.props.form}>
          <Row>
            <Col span="18">
              <FormItem
                {...formItemLayout}
                label="密码"
              >
                <Input {...passProps} type="password"
                  onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                  autoComplete="off" id="pass"
                />
              </FormItem>
            </Col>
            <Col span="6">
              {this.state.passBarShow ? this.renderPassStrengthBar('pass') : null}
            </Col>
          </Row>

          <Row>
            <Col span="18">
              <FormItem
                {...formItemLayout}
                label="确认密码"
              >
                <Input {...rePassProps} type="password"
                  onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                  autoComplete="off" id="rePass"
                />
              </FormItem>
            </Col>
            <Col span="6">
              {this.state.rePassBarShow ? this.renderPassStrengthBar('rePass') : null}
            </Col>
          </Row>
          <Row>
            <Col span="18">
              <Col span="18" offset="6">
                <Button type="primary" onClick={this.handleSubmit}>提交</Button>
              </Col>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Form.create()(CustomValidateForm);
