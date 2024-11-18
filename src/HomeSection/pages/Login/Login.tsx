import React from 'react'
import LoginForm from './components/LoginForm'
import PosterFormLogin from './components/PosterFormLogin'
import './styles/Login.css'

interface HandleLogin{
  onLogin:any
}

export default function Login({onLogin}:HandleLogin) {
  return (
    <div className='container-login-page'>
      
      <div className='login-form-page'>
      <LoginForm onLogin={onLogin}/>
      </div>
      <div className='poster'>
        <PosterFormLogin />
      </div>
    </div>
  )
}



