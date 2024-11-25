import { BarChartOutlined, HomeOutlined, LogoutOutlined, MenuUnfoldOutlined, PlayCircleOutlined, SettingOutlined } from '@ant-design/icons'
import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import "./styles/ArtriNavbar.css";

export default function ArtriNavbar({onLogout}:any) {
  const handleLogout = () =>{
    localStorage.removeItem('token');
    onLogout()
  }

  let newDataUser = JSON.parse(localStorage.getItem('dataUser')!!)

  const imageUrl = '/logosimplify.png';

  return (
    <div>
      
      <nav className='navbar-artri'>
        <Link to="/artri/auth/home">
          <div className="logo-artri-al">
          
          <img className="artri-logo-al" src='https://res.cloudinary.com/dymptobl2/image/upload/v1732115199/logosimplify_wwnamj.png'/>
             {/* <img className="artri-logo-al" src={imageUrl} alt="" title="Prueba"/>*/}

          </div>
        </Link>
              <ul className='item-artri'>
                  <li className='link-item-artri'><Link to = "/artri/auth/home"><HomeOutlined /></Link></li>
                  <li className='link-item-artri'><Link to = "/artri/auth/game"><PlayCircleOutlined /></Link></li>
                  <li className='link-item-artri'><Link to = "/artri/auth/repository"><MenuUnfoldOutlined /></Link></li>
                  <li className='link-item-artri'><Link to = "/artri/auth/statistics"><BarChartOutlined /></Link></li>
                  <li className='link-item-artri'><Link to = "/artri/auth/admin/stats"><SettingOutlined /></Link></li>
               <li className='link-item-artri' ><Link to='/artri/home' onClick={handleLogout}><LogoutOutlined /></Link></li>
              </ul>
           
      </nav>
        <div className="container-information-artri">
            <Outlet />
        </div>
    
    </div>

  )
}
        