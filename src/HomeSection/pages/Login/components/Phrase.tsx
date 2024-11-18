import React from 'react'
import { Link } from 'react-router-dom'

export default function Phrase() {
  return (
    <div className='header-text'>
    <h1>Empieza una nueva aventura...</h1>
    <div className='register'>
    <h3>¿No tienes una cuenta?</h3>
    <h3 style={{marginLeft:'10px'}}><Link to="/artri/register">Registrate</Link></h3>
    </div>
    </div>
  )
}
