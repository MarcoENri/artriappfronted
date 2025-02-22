import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input } from 'antd';
import Phrase from './Phrase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Apiurl } from "../../constantes/apiurl"; // Importar la URL base

// 🔥 Función para decodificar JWT
function decodeJWT(token: string) {
  try {
    const payloadBase64 = token.split('.')[1]; // Extrae el payload
    const payloadDecoded = atob(payloadBase64); // Decodifica de Base64
    const payloadObject = JSON.parse(payloadDecoded); // Convierte en objeto JSON
    return payloadObject;
  } catch (error) {
    console.error('Error al decodificar el token JWT:', error);
    return null;
  }
}

function LoginForm({ onLogin }: any) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async(values: any) => {
    try{
      setLoading(true)
      const response = await axios.post(`${Apiurl}/api/v1/auth/authenticate`, values);
      const token = response.data.token;
      const memberRole = response.data.memberRole.toUpperCase() // Asegurarnos de que sea 'ADMIN' en mayúsculas
      const dataUser = {
        'username' : response.data.username,
        'userId' : response.data.userId,
        'role': memberRole // Ahora incluimos el rol aquí
      }
      localStorage.setItem('dataUser', JSON.stringify(dataUser)) 
      localStorage.setItem("token", token);
      localStorage.setItem("role", memberRole) 
      onLogin()
      navigate("/artri/auth/home")
      console.log("Usuario logueado: ", dataUser, "Token: ", token)

    } catch(err) {
      console.error()
      alert("Registro no encontrado")
    } finally {
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
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Correo electronico" />
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

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            className="loginSubmit" 
            loading={loading} 
          >
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;
