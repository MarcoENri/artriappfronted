import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import ArtriNavbar from '../../../MainSection/components/Navbar/ArtriNavbar'
import "./Navbar.css"


export const Navbar=()=> {
  return (
    <div>
      
      <nav className='navbar'>
        <Link to="/">
          <div className="logo">
              <img className="artri-logo" src='/src/assets/logosimplify.png'/>
              <p className='artri-name'>ARTRI</p>
          </div>
        </Link>
              <ul className='item'>
                  <li className='link-item'><Link to = "/artri/home">Inicio</Link></li>
                  <li className='link-item'><Link to = "/artri/info">Informacion</Link></li>
                  <li className='link-item'><Link to = "/artri/contacts">Contacto</Link></li>
              </ul>
        <Link to="artri/login">
          <div className="login-container">
              <img className="login"src='/src/assets/login.svg'/>
          </div>
        </Link>      
      </nav>
        <div className="container-information">
            <Outlet />
        </div>
    
    </div>


  )
}


        