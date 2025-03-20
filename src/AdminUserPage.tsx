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
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

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

  const fetchUsers = async () => {
    try {
      const usersResponse = await axios.get(`${Apiurl}/api/v1/member`);
      const statisticsResponse = await axios.get(`${Apiurl}/api/v1/statistics`);

      const usersWithStats = usersResponse.data.map((user: any) => {
        const userStats = statisticsResponse.data.find((stat: any) => stat.memberId === user.id);
        return {
          ...user,
          score: userStats ? userStats.score : 'N/A',
          date: userStats ? new Date(userStats.date).toLocaleString() : 'N/A',
        };
      });

      setUsers(usersWithStats);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users or statistics:', error);
      setLoading(false);
    }
  };

  const showChangePasswordModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setNewPassword('');
  };

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
      fetchUsers();
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      message.error('No se pudo cambiar la contraseña');
    }
  };

  const handleDelete = async (userId: number) => {
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado correctamente

    try {
      await axios.delete(`${Apiurl}/api/v1/member/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success('Usuario eliminado con éxito');
      fetchUsers(); // Refrescar la lista de usuarios
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      message.error('No se pudo eliminar el usuario');
    }
  };

  const showDeleteConfirm = (userId: number) => {
    Modal.confirm({
      title: '¿Estás seguro de que deseas eliminar este usuario?',
      onOk: () => handleDelete(userId),
      okText: 'Sí',
      cancelText: 'Cancelar',
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
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
      title: 'Puntaje',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Fecha Última Actividad',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: any) => (
        <>
          <Button type="primary" onClick={() => showChangePasswordModal(record.id)}>
            Cambiar Contraseña
          </Button>
          <Button
            type="default"
            onClick={() => showDeleteConfirm(record.id)}
            loading={isDeleting}
            style={{ marginLeft: 10, color: 'red', borderColor: 'red' }}
          >
            Eliminar
          </Button>
        </>
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
