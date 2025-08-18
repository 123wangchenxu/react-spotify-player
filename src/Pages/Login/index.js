import './index.less'
import { Button, Form, Input, Radio } from "antd";
import { use, useState } from 'react';
import { getCode, getLogin } from '../../api/login';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/user';
export default function()
{
  const [form] = Form.useForm();
  const [countdown,setCountDown]=useState(60)
  const [mobile,setMobile]=useState('')
  const navigate=useNavigate()
  const {nickname,pic,setNickName,setPic}=useStore()
  const submitData=async()=>{
     try {
       const values = await form.validateFields(); // 校验所有字段
       console.log(values)
       const loginData=await getLogin(values.phone,values.code)
       setNickName(loginData.data.data.nickname)
       setPic(loginData.data.data.pic);
       navigate('/browse')
     } catch {
       return Error('登录失败')
     }
  }
  const waitcode=async(mobile)=>{
    const phoneRegex = /^1[3-9]\d{9}$/;
    if(!phoneRegex.test(mobile))
    {
        return;
    }
    const data=await getCode(mobile)
    let intervalId=setInterval(()=>{
      setCountDown(prev=>{
        if(prev===1)
          {
            clearInterval(intervalId)
          }
        return (prev-1)
      })
    },1000)
    setCountDown(60)
  }
  const validatePhone = () => ({
    validator(_, value) {
      const phoneRegex = /^1[3-9]\d{9}$/; // 简单的手机号正则
      if (!value) {
        return Promise.reject("请输入手机号！");
      }
      if (!phoneRegex.test(value)) {
        return Promise.reject("请输入正确的手机号！");
      }
      setMobile(value)
      return Promise.resolve("手机号正确");
    },
  });
  // 自定义验证码校验规则
  const validateCode = () => ({
    validator(_, value) {
      if (!value) {
        return Promise.reject("请输入验证码！");
      }
      if (value.length !== 6) {
        return Promise.reject("验证码必须为 6 位数字！");
      }
      return Promise.resolve();
    },
  });

  return (
    <div className="login">
      <div className="login-img">
        <img src="/执剑人.jpg" />
      </div>
      <div className="login-form">
        <div className="title">登录</div>
        <Form
          layout="horizontal"
          form={form}
          initialValues={{ layout: "horizontal" }}
        >
          <Form.Item label="手机号" name="phone" rules={[validatePhone]}>
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="验证码" name="code" rules={[validateCode]}>
            <Input
              placeholder="input placeholder"
              addonAfter={
                <Button
                  type="link"
                  onClick={() => waitcode(mobile)}
                  disabled={countdown<60 && countdown!==0}
                >
                  {countdown ===60 || countdown===0 ? "发送验证码":`${countdown}s后重试`}
                </Button>
              }
            />
          </Form.Item>
          <Form.Item>
            <Button className="form-button" onClick={()=>{
              submitData()
            }} type="primary" htmlType="submit">
              确认登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}