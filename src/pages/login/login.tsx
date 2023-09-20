import React from 'react';
import { Form, Button, Input, message, Space, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import ParticlesBg from 'particles-bg';
import './login.less';
export default function Login(props: any) {
  const onFinish = (values: any) => {
    console.log(values);
  };

  const loginData = {
    url: 'http://172.19.80.76:5090/passport/index.php',
    appid: '6TkC2zS1Q238aXfTLEYy',
    secret: 'wklgM9HtPAzRy8Wza66B4WJT3lhsvJKoXNxL53t8Hj09ii8f64JKYjkT4Qxh',
  };

  const quickLogin = () => {
    const loginPlatformState = Date.now().toString();
    window.location.href = `${loginData.url}?state=${loginPlatformState}&appid=${loginData.appid}`;
  };

  const typeBg = [
    'color',
    'ball',
    'lines',
    'thick',
    'circle',
    'cobweb',
    'polygon',
    'square',
    'tadpole',
    'fountain',
    'random',
    'custom',
  ];

  return (
    <div style={{ height: '100%', overflow: 'hidden' }}>
      <ParticlesBg type={typeBg[Math.floor(Math.random() * 12)]} bg={true} />
      {/* 这里的type的属性值可以手动更改，可以是random，circle，lines等等*/}
      <div className="formContainer">
        <div className="logintitle">股票代码组合系统</div>
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="emmail"
            rules={[{ required: true, message: '邮箱账号不能为空' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '密码不能为空' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Row justify="space-between">
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>
              </Col>
              <Col>
                <Button
                  type="link"
                  className="login-form-button"
                  onClick={quickLogin}
                >
                  一键登录
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
