import React, { createContext, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input } from 'antd';
import Phrase from './Phrase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Apiurl } from "../../constantes/apiurl"; // Importar la URL base


function LoginForm({onLogin}:any) {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const onFinish = async(values: any) => {
    try{
      setLoading(true)
      const response = await axios.post(`${Apiurl}/api/v1/auth/authenticate`,
      values);
      const token = response.data.token;
      const memberRole = response.data.memberRole 
      const dataUser = {
      'username' : response.data.username,
      'userId' : response.data.userId,
      }
      localStorage.setItem('dataUser', JSON.stringify(dataUser))
      localStorage.setItem("token", token);
      localStorage.setItem("role", memberRole)
      onLogin()
      navigate("/artri/auth/home")
      console.log(dataUser, token)

    }catch(err){
      console.error()
      alert("Registro no encontrado")
    } finally{
      setLoading(false)
    }
    
  };
  
  return (
    <div>
      <Phrase />
      <Divider />
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Por favor ingrese su correo' }]}
      >  
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuario" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Por favor ingrese la contraseña' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Contraseña" 
        />
      </Form.Item>
      {/* <Form.Item>

      site-form-item-icon
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
        login-form-button
      </Form.Item> */}

      <Form.Item> 
        <Button type="primary" htmlType="submit" className="loginSubmit" >
          Ingresar
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default LoginForm;