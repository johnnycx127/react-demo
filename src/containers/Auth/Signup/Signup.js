import React, { Component } from 'react';
import { Button, Form, Input, Select, Radio, Checkbox, DatePicker,
  TimePicker, InputNumber, Cascader, Icon, Row, Col } from 'antd';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const noop = () => false;

class Signup extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      passBarShow: false, // 是否显示密码强度提示条
      rePassBarShow: false,
      passStrength: 'L', // 密码强度
      rePassStrength: 'L',
    }
  }

  componentDidMount = () => {
    console.log(this);
    this.props.form.setFieldsValue({
      eat: true,
      sleep: true,
      beat: true,
    });
  }

  handleReset = (e) => {
    e.preventDefault();
    this.props.form.resetFields();
    this.setState({
      passBarShow: false, // 是否显示密码强度提示条
      rePassBarShow: false
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      console.log(values);
    });
  }

  userExists = (rule, value, callback) => {
    if (!value) {
      callback();
    } else {
      setTimeout(() => {
        if (value === 'JasonWood') {
          callback([new Error('抱歉，该用户名已被占用。')]);
        } else {
          callback();
        }
      }, 800);
    }
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

  checkBirthday = (rule, value, callback) => {
    if (value && value.getTime() >= Date.now()) {
      callback(new Error('你不可能在未来出生吧!'));
    } else {
      callback();
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
    const styles = require('./Signup.scss');
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
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;

    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, min: 5, message: '用户名至少为 5 个字符' },
        { validator: this.userExists },
      ],
    });

    const emailProps = getFieldProps('email', {
      validate: [{
        rules: [
          { required: true },
        ],
        trigger: 'onBlur',
      }, {
        rules: [
          { type: 'email', message: '请输入正确的邮箱地址' },
        ],
        trigger: ['onBlur', 'onChange'],
      }],
    });

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

    const textareaProps = getFieldProps('textarea', {
      rules: [
        { required: true, message: '真的不打算写点什么吗？' },
      ],
    });

    const address = [{
      value: 'zhejiang',
      label: '浙江',
      children: [{
        value: 'hangzhou',
        label: '杭州',
      }],
    }];

    const selectProps = getFieldProps('select', {
      rules: [
        { required: true, message: '请选择您的国籍' },
      ],
    });
    const multiSelectProps = getFieldProps('multiSelect', {
      rules: [
        { required: true, message: '请选择您喜欢的颜色', type: 'array' },
      ],
    });
    const radioProps = getFieldProps('radio', {
      rules: [
        { required: true, message: '请选择您的性别' },
      ],
    });
    const birthdayProps = getFieldProps('birthday', {
      rules: [
        {
          required: true,
          type: 'date',
          message: '你的生日是什么呢？',
        }, {
          validator: this.checkBirthday,
        },
      ],
    });

    const timeProps = getFieldProps('time', {
      getValueFromEvent: (value, timeString) => timeString,
      rules: [
        { required: true, message: '请选择一个时间' },
      ],
    });

    const primeNumberProps = getFieldProps('primeNumber', {
      rules: [{ validator: this.checkPrime }],
    });

    const addressProps = getFieldProps('address', {
      rules: [{ required: true, type: 'array' }],
    });

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };

    return (
      <Form horizontal form={this.props.form}>
        <Row>
          <Col span="18">
            <FormItem
              {...formItemLayout}
              label="用户名"
              hasFeedback
              help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
            >
              <Input {...nameProps} placeholder="实时校验，输入 JasonWood 看看" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="18">
            <FormItem
              {...formItemLayout}
              label="邮箱"
              hasFeedback
            >
              <Input {...emailProps} type="email" placeholder="onBlur 与 onChange 相结合" />
            </FormItem>
          </Col>
        </Row>

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
            <FormItem
              {...formItemLayout}
              label="备注"
            >
              <Input {...textareaProps} type="textarea" placeholder="随便写" id="textarea" name="textarea" />
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="18">
            <FormItem
              {...formItemLayout}
              label="国籍"
            >
              <Select {...selectProps} placeholder="请选择国家" style={{ width: '100%' }}>
                <Option value="china">中国</Option>
                <Option value="use">美国</Option>
                <Option value="japan">日本</Option>
                <Option value="korean">韩国</Option>
                <Option value="Thailand">泰国</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="18">
            <FormItem
              {...formItemLayout}
              label="喜欢的颜色"
            >
              <Select {...multiSelectProps} multiple placeholder="请选择颜色" style={{ width: '100%' }}>
                <Option value="red">红色</Option>
                <Option value="orange">橙色</Option>
                <Option value="yellow">黄色</Option>
                <Option value="green">绿色</Option>
                <Option value="blue">蓝色</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="18">
            <FormItem
              {...formItemLayout}
              label="性别"
            >
              <RadioGroup {...radioProps}>
                <Radio value="male">男</Radio>
                <Radio value="female">女</Radio>
              </RadioGroup>
              <span><Icon type="info-circle-o" /> 暂不支持其它性别</span>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="18">
            <FormItem
              {...formItemLayout}
              label="兴趣爱好"
            >
              <Checkbox {...getFieldProps('eat', {
                valuePropName: 'checked',
              })}>吃饭饭</Checkbox>
              <Checkbox {...getFieldProps('sleep', {
                valuePropName: 'checked',
              })}>睡觉觉</Checkbox>
              <Checkbox {...getFieldProps('beat', {
                valuePropName: 'checked',
              })}>打豆豆</Checkbox>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="18">
            <FormItem
              {...formItemLayout}
              label="生日"
            >
              <DatePicker {...birthdayProps} />
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="18">
            <FormItem
              {...formItemLayout}
              label="选一个时间"
            >
              <TimePicker {...timeProps} />
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="18">
            <FormItem
              {...formItemLayout}
              label="选择地址"
            >
              <Cascader {...addressProps} options={address} />
            </FormItem>
          </Col>
        </Row>


        <FormItem
          wrapperCol={{ span: 12, offset: 7 }}
        >
          <Button type="primary" onClick={this.handleSubmit}>确定</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={this.handleReset}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(Signup);
