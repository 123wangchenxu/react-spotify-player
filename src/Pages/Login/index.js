import './index.less'
import { Button, Form, Input, Radio } from "antd";
import { useState } from 'react';
export default function()
{
      const [form] = Form.useForm();
      const [formLayout, setFormLayout] = useState("horizontal");
      const onFormLayoutChange = ({ layout }) => {
        setFormLayout(layout);
      };
    return (
      <div className="login">
        <div className="login-img">
          <img src="/执剑人.jpg" />
        </div>
        <div className="login-form">
          <div className="title">登录</div>
          <Form
            layout={formLayout}
            form={form}
            initialValues={{ layout: 'horizontal' }}
            onValuesChange={onFormLayoutChange}
            style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
          >
            <Form.Item label="手机号">
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="验证码">
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item>
              <Button className='form-button' type="primary">确认登录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
}