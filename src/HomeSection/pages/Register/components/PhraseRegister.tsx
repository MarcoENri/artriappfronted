import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/PhraseRegister.css'

export default function PhraseRegister() {
  return (
    <div>
        <h1>Registrate</h1>
        <div className='go-login'>
            <h3>
            ¿Ya tienes una cuenta?
            </h3>
            <h3 style={{marginLeft:'10px'}}>
                <Link to="/artri/login">Inicia Sesión</Link>
            </h3>

        </div>
    </div>
  )
}
