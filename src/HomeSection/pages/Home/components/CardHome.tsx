import React from 'react';
import { Carousel } from 'antd';
import '../styles/StyleCardHome.css'

export default function CardHome() {
  return (
    <Carousel autoplay >
      <div>
        <h3>"No te rindas, cada día es una oportunidad para mejorar".</h3>
      </div>
      <div>
        <h3>"Haz del ejercicio un hábito, no una tarea".</h3>
      </div>
      <div>
        <h3>"El dolor que sientes hoy, será tu fuerza mañana".</h3>
      </div>
    </Carousel>

  
  )
}
