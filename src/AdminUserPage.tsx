import React, { useEffect, useState } from 'react';
import { Table, Spin, message } from 'antd';
import axios from 'axios';
import { Apiurl } from './HomeSection/pages/constantes/apiurl'; // Ajustando la ruta

const AdminUsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Verificar el rol del usuario
  const isAdmin = localStorage.getItem('role') === 'ADMIN';

  // Si no es ADMIN, mostrar un mensaje y no cargar la tabla
  if (!isAdmin) {
    message.error('Acceso restringido. Solo los administradores pueden ver esta página.');
    return (
      <div>
        <h2>Acceso Restringido</h2>
        <p>Solo los usuarios con rol de ADMIN pueden acceder a esta página.</p>
      </div>
    );
  }

  useEffect(() => {
    // Fetch the users from the API
    axios.get(`${Apiurl}/api/v1/member`)
      .then(response => {
        setUsers(response.data); // Asumiendo que la respuesta tiene los usuarios
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false); // Ensure loading state is turned off even in case of error
      });
  }, []);

  // Definición de columnas de la tabla
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Apellido',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Correo',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Spin size="large" />
      </div>
    ); // Show a loading spinner while data is being fetched
  }

  return (
    <div>
      <Table dataSource={users} columns={columns} rowKey="id" />
    </div>
  );
};

export default AdminUsersPage;
