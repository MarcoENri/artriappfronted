import React, { useEffect, useState } from 'react';
import { Table, Spin, message, Button, Modal, Input } from 'antd';
import axios from 'axios';
import { Apiurl } from './HomeSection/pages/constantes/apiurl'; // Ajustando la ruta

const AdminUsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [newPassword, setNewPassword] = useState<string>('');

  // Verificar el rol del usuario
  const isAdmin = localStorage.getItem('role') === 'ADMIN';

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
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get(`${Apiurl}/api/v1/member`)
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  };

  // Abrir el modal y establecer el ID del usuario seleccionado
  const showChangePasswordModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  // Cerrar el modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setNewPassword('');
  };

  // Manejar el cambio de contraseña
  const handleChangePassword = async () => {
    if (!newPassword) {
      message.error('La nueva contraseña no puede estar vacía.');
      return;
    }

    try {
      await axios.put(`${Apiurl}/api/v1/member/${selectedUserId}/change-password`, {
        newPassword,
      });
      message.success('Contraseña actualizada con éxito');
      handleCancel();
      fetchUsers(); // Refrescar la lista de usuarios
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      message.error('No se pudo cambiar la contraseña');
    }
  };

  // Columnas de la tabla con botón de acción para cambiar la contraseña
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
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: any) => (
        <Button type="primary" onClick={() => showChangePasswordModal(record.id)}>
          Cambiar Contraseña
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Table dataSource={users} columns={columns} rowKey="id" />
      
      <Modal
        title="Cambiar Contraseña"
        visible={isModalOpen}
        onOk={handleChangePassword}
        onCancel={handleCancel}
        okText="Cambiar"
        cancelText="Cancelar"
      >
        <Input.Password
          placeholder="Nueva Contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default AdminUsersPage;
