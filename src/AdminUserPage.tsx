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
  const [userStatistics, setUserStatistics] = useState<{ [key: number]: any }>({});
  const [statistics, setStatistics] = useState<any[]>([]);

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
    fetchStatistics();
  }, []);

  const fetchUsers = () => {
    axios.get(`${Apiurl}/api/v1/member`)
      .then(response => {
        setUsers(response.data);
        setLoading(false);
        fetchUserStatistics(response.data); // Obtener estadísticas después de recibir los usuarios
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  };

  const fetchUserStatistics = (users: any[]) => {
    users.forEach(user => {
      axios.get(`${Apiurl}/api/v1/statistics/member/${user.id}`)
        .then(response => {
          setUserStatistics(prevStats => ({
            ...prevStats,
            [user.id]: response.data,
          }));
        })
        .catch(error => {
          console.error(`Error fetching statistics for user ${user.id}:`, error);
        });
    });
  };

  const fetchStatistics = () => {
    axios.get(`${Apiurl}/api/v1/statistics`)
      .then(response => {
        setStatistics(response.data);
      })
      .catch(error => {
        console.error("Error al obtener las estadísticas:", error);
      });
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
        }
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

      
      <Table
        dataSource={statistics}
        columns={[
          
          {
            title: 'Usuario',
            dataIndex: 'memberId',
            key: 'memberId',
          },
          {
            title: 'Puntaje',
            dataIndex: 'score',
            key: 'score',
          },
          {
            title: 'Fecha',
            dataIndex: 'date',
            key: 'date',
            render: (text) => new Date(text).toLocaleString(),
          },
        ]}
        rowKey="id"
      />
    </div>
  );
};

export default AdminUsersPage;
