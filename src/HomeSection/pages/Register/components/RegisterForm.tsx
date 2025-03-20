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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      message.error('Ingrese un correo electrónico válido.');
      return false;
    }
    return true;
  };

  const onFinish = async (fieldsValue: any) => {
    const { email } = fieldsValue;
  
    if (!validateEmail(email)) {
      return; // Si el correo no es válido, no continuar con el registro
    }

    // Agregar rol de usuario
    const registrationData = { 
      ...fieldsValue, 
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
