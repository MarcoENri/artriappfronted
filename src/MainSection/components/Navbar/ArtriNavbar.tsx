import { 
  BarChartOutlined, 
  HomeOutlined, 
  LogoutOutlined, 
  MenuUnfoldOutlined, 
  PlayCircleOutlined, 
  SettingOutlined, 
  UserOutlined 
} from '@ant-design/icons';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import "./styles/ArtriNavbar.css";

export default function ArtriNavbar({ onLogout }: any) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    onLogout();
  };

  let dataUser = JSON.parse(localStorage.getItem('dataUser')!!);
  const userRole = dataUser?.role ?? 'GUEST'; // Si no existe, asumimos GUEST

  console.log("Rol de usuario:", userRole); // Para verificar el rol de usuario

  return (
    <div>
      <nav className='navbar-artri'>
        <Link to="/artri/auth/home">
          <div className="logo-artri-al">
            <img className="artri-logo-al" src='https://res.cloudinary.com/dymptobl2/image/upload/v1732115199/logosimplify_wwnamj.png'/>
          </div>
        </Link>
        <ul className='item-artri'>
          <li className='link-item-artri'><Link to="/artri/auth/home"><HomeOutlined /></Link></li>
          <li className='link-item-artri'><Link to="/artri/auth/game"><PlayCircleOutlined /></Link></li>
          <li className='link-item-artri'><Link to="/artri/auth/repository"><MenuUnfoldOutlined /></Link></li>

          {/* Mostrar enlace de Usuarios Registrados solo si el rol es ADMIN */}
          {userRole === 'ADMIN' && (
            <li className='link-item-artri'>
              <Link to="/artri/auth/admin/users"><UserOutlined /></Link>
            </li>
          )}

          {/* Mostrar enlace de Estadísticas para todos los usuarios */}
          <li className='link-item-artri'>
            <Link to="/artri/auth/statistics"><BarChartOutlined /></Link>
          </li>

          <li className='link-item-artri'><Link to='/artri/home' onClick={handleLogout}><LogoutOutlined /></Link></li>
        </ul>
      </nav>

      <div className="container-information-artri">
        <Outlet />
      </div>
    </div>
  );
}
