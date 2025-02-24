import React from 'react';
import { Button, Divider, Form, Input, message } from 'antd';
import PhraseRegister from './PhraseRegister';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Apiurl } from "../../constantes/apiurl"; // Importar la URL base

const RegisterForm: React.FC = () => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const config = {
    rules: [{ required: true, message: 'Por favor llene el campo' }],
  };

  const registernavigate = useNavigate();

  const validateEmail = (email: string) => {
    const allowedDomains = [
      'gmail.com',
      'hotmail.com',
      'yahoo.com',
      'outlook.com',
      'sudamericano.edu.ec' // Agregar dominios personalizados como el del instituto
    ];
    
    const domain = email.split('@')[1];
    
    if (!domain || !allowedDomains.includes(domain)) {
      message.error('Solo se permiten correos de dominios como gmail.com, hotmail.com, yahoo.com, outlook.com, sudamericano.edu.ec');
      return false;
    }
    return true;
  };

  const generateRandomNickname = (): string => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `user${randomNum}`;
  };

  const onFinish = async (fieldsValue: any) => {
    const { email } = fieldsValue;
  
    if (!validateEmail(email)) {
      return; // Si el correo no es válido, no continuar con el registro
    }

    // Generar nickname automáticamente y agregar rol de usuario
    const registrationData = { 
      ...fieldsValue, 
      nickname: generateRandomNickname(), 
      role: 'USER' 
    };

    try {
      const response = await axios.post(`${Apiurl}/api/v1/auth/register`, registrationData);
      
      message.success('Registro exitoso');
      registernavigate("/artri/login");
  
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.errorMessage) {
          message.error(err.response.data.errorMessage);
        } else {
          message.error('Hubo un problema al registrar el usuario.');
        }
      } else {
        message.error('Error desconocido');
      }
    }
  };
  
  return (
    <div>
      <PhraseRegister />
      <Divider />
      <Form
        name="time_related_controls"
        {...formItemLayout}
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="name" label="Nombre" {...config}>
          <Input />
        </Form.Item>

        <Form.Item name="lastname" label="Apellido" {...config}>
          <Input />
        </Form.Item>

        <Form.Item name="age" label="Edad" {...config}>
          <Input type="number" />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="password" label="Contraseña" {...config}>
          <Input type="password" />
        </Form.Item>

        <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } }}>
          <Button type="primary" htmlType="submit">
            Registrarse
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
