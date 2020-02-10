import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { withRedux } from '../../lib/redux'
import './login.less'
import api from '../../api'
import router from 'next/router';
import routerlist from '../../lib/routerlist'


const validUserNameFunction = (rule, value: string, callback) => {
  if (value.length < 5 || value.length > 16) {
    callback('用户名长度在5-16字符之间');
  }
  callback(); // 校验通过
}
const validPasswordFunction = (rule, value, callback) => {
  if (value.length < 5 || value.length > 16) {
    callback('密码长度在5-16字符之间');
  }
  callback(); // 校验通过
}

const LoginPage = (props) => {
  const form = props.form;
  const { getFieldDecorator } = form;
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        api.auth.login(values).then((res) => {
          if (res && res.code == 0) {
            router.push(routerlist.index);
          }
        });
      }
    });
  };
  return (
    <Form onSubmit={handleSubmit} className="login_container">
      <Form.Item className="form_item">
        {getFieldDecorator('username', {
          rules: [{ required: true, message: '请输入用户名' }, { validator: validUserNameFunction }],
          validateTrigger: 'onSubmit'
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="用户名"
          />,
        )}
      </Form.Item>
      <Form.Item className="form_item">
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码' }, { validator: validPasswordFunction }],
          validateTrigger: 'onSubmit'
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="密码"
          />,
        )}
      </Form.Item>
      <Form.Item className="form_item">
        {/* {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Checkbox>记住密码</Checkbox>)} */}
        {/* <a className="login-form-forgot" href="">
          忘记密码
        </a> */}
        <Button type="primary" htmlType="submit" className="button">
          登录
        </Button>
        {/* Or <a href="">注册</a> */}
      </Form.Item>
    </Form>
  );
}

LoginPage.getInitialProps = ({ reduxStore }) => {
  // Tick the time once, so we'll have a
  // valid time before first render
  const { dispatch } = reduxStore
  dispatch({
    type: 'TICK',
    light: typeof window === 'object',
    lastUpdate: Date.now(),
  })
  return {}
}

export default withRedux(Form.create({ name: 'login' })(LoginPage))
