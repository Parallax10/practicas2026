import React from 'react';
import { themeStyles } from '../config/index';

export default function Navbar() {
  return (
    <nav className={themeStyles.navbar}>
      <div className={themeStyles.topBar}>ENVÍO GRATIS EN EQUIPACIÓN A PARTIR DE 50€</div>
      <div className={`${themeStyles.headerMain} ${themeStyles.container}`}>
        <div className={themeStyles.logo}>EL MOTORISTA</div>
        <div className={themeStyles.search}>
          <input type="text" placeholder="Buscar por marca, modelo o categoría..." />
          <button>BUSCAR</button>
        </div>
      </div>
      <div className={themeStyles.navLinks}>
        <span>MOTOS</span><span>EQUIPACIÓN</span><span>RECAMBIOS</span><span>ACCESORIOS</span><span>OUTLET</span>
      </div>
    </nav>
  );
}