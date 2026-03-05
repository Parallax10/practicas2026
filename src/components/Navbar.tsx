import React from 'react';
import { themeStyles } from '../config/index';

export default function Navbar() {
  return (
    <nav className={themeStyles.navbar}>
      <div className={themeStyles.topBar}>
        <div className={themeStyles.container}>Envío gratis a partir de 50€ | Tel: 900 000 000</div>
      </div>
      <div className={`${themeStyles.mainHeader} ${themeStyles.container}`}>
        <div className={themeStyles.logo}>EL MOTORISTA</div>
        <div className={themeStyles.searchContainer}>
          <input type="text" placeholder="¿Qué estás buscando?" />
          <button>BUSCAR</button>
        </div>
      </div>
      <div className={themeStyles.menuBar}>
        <span>MOTOS</span><span>EQUIPACIÓN</span><span>RECAMBIOS</span><span>OUTLET</span>
      </div>
    </nav>
  );
}