import React from 'react'
import PosterFormLogin from '../Login/components/PosterFormLogin'
import RegisterForm from './components/RegisterForm'
import './styles/Register.css'

export default function Register() {
  return (
    <div className='page-register'>
        <div className='register-container'>
            <RegisterForm />
        </div>
        <div className="poster-register">
            <PosterFormLogin />
        </div>
    </div>
  )
}
