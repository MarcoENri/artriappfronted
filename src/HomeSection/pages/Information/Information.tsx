import React from 'react';

export default function Information() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100vh', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Proyecto ARTRI: Solución Gamificada para la Artrosis en Adultos Mayores</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '800px' }}>
        <p>
          Este proyecto se centra en el desarrollo de dispositivos terapéuticos inteligentes para 
          mejorar la calidad de vida de adultos mayores con artrosis en las manos. Se integraron 
          nuevas tecnologías en hardware y software para optimizar su funcionalidad y seguridad.
        </p>
        <div>
          <h2>Objetivos</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>Desarrollar un dispositivo terapéutico inteligente con tecnología avanzada.</li>
            <li>Personalizar las terapias según las necesidades específicas del usuario.</li>
            <li>Implementar mejoras en software y hardware, como conexión a la nube y microelectrónica.</li>
          </ul>
        </div>
        <div>
          <h2>Metodología</h2>
          <p>
            Se empleó un diseño de investigación mixto, con una fase exploratoria mediante encuestas 
            y entrevistas, seguida de una fase experimental con pruebas de prototipos.
          </p>
        </div>
        <div>
          <h2>Impacto</h2>
          <p>
            La implementación de dispositivos gamificados ha demostrado mejorar la atención y motivación 
            de los adultos mayores, contribuyendo a la estimulación cognitiva y motriz.
          </p>
        </div>
        <div>
          <h2>Beneficiarios</h2>
          <p>
            Personas con artrosis, instituciones médicas y académicas, y la comunidad científica 
            a través de publicaciones en revistas indexadas.
          </p>
        </div>
      </div>
    </div>
  );
}
