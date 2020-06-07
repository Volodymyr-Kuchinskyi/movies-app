import React from 'react';
import { Form, Input, Button } from 'antd';

interface LoginProps {
  onLoginSubmit: (values: any) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSubmit }) => {
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form name="basic" onFinish={onLoginSubmit} onFinishFailed={onFinishFailed}>
      <Form.Item
        label="Username"
        name="login"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
};
