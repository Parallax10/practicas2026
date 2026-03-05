import React from 'react';
import Link from 'next/link';
import { themeStyles, config } from '../config/index';

export default function Navbar() {
  const siteConfig = config as any;
  // Extraemos los items del JSON. Si no hay, dejamos un array vacío
  const menuItems = siteConfig?.menuItems || []; 

  return (
    <header className={themeStyles.navbar}>
      <div className={themeStyles.topBar}>
        <div className={themeStyles.topBarContainer}>
          <span>Llámanos: 956 34 22 11</span>
          <span>ENVÍO GRATIS A PARTIR DE 50€ (Solo Península)</span>
          <span>Nuestras Tiendas</span>
        </div>
      </div>
      <div className={themeStyles.mainHeader}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div className={themeStyles.logo}>EL MOTORISTA</div>
        </Link>
        <div className={themeStyles.search}>
          <input type="text" placeholder="Buscar por marca, modelo, artículo..." />
          <button>BUSCAR</button>
        </div>
        <div className={themeStyles.icons}>
          <div className={themeStyles.iconBox}>
            <span className={themeStyles.iconEmoji}>👤</span>
            <span>Mi Cuenta</span>
          </div>
          <div className={themeStyles.iconBox}>
            <span className={themeStyles.iconEmoji}>🛒</span>
            <span>Mi Cesta</span>
          </div>
        </div>
      </div>
      
      {/* MENÚ DINÁMICO */}
      <div className={themeStyles.navMenu}>
        <div className={themeStyles.navMenuContainer}>
          {menuItems.map((item: string, index: number) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </div>
    </header>
  );
}