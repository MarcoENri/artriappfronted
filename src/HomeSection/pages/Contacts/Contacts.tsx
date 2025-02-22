import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './Contacts.css'; 

const Contacts: React.FC = () => {
  return (
    <div className="contacts">
      <h2>Información de Contacto</h2>
      <div className="contact-item">
        <FontAwesomeIcon icon={faPhone} />
        <span>(593-7) 283 8323 / 284 3619 / 0996976449</span>
      </div>
      <div className="contact-item">
        <FontAwesomeIcon icon={faEnvelope} />
        <span>info@sudamericano.edu.ec</span>
      </div>
      <div className="contact-item">
        <FontAwesomeIcon icon={faEnvelope} />
        <span>relpublicaits@sudamericano.edu.ec</span>
      </div>
      <div className="contact-item">
        <FontAwesomeIcon icon={faMapMarkerAlt} />
        <span>Simón Bolívar y Manuel Vega Esq. Cuenca EC</span>
      </div>
      <div className="contact-item">
        <FontAwesomeIcon icon={faMapMarkerAlt} />
        <span>Edificio Huayna Cápac: Jaime Roldós 4-85 (07) 2809 169</span>
      </div>
    </div>
  );
}

export default Contacts;
