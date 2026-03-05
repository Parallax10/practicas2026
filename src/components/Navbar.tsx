import React from 'react';
import Link from 'next/link';
import { themeStyles, config } from '../config/index';

export default function Navbar() {
  const siteConfig = config as any;
  const menuItems = siteConfig?.menuItems || ["Motos Nuevas", "Motos Ocasión", "Equipación", "Accesorios", "Recambios"];
  const styleId = process.env.NEXT_PUBLIC_NAVBAR_STYLE || '1';

  if (styleId === '2') {
      return (
          <header className={themeStyles.navbar_2}>
              <Link href="/" style={{ textDecoration: 'none' }}><div className={themeStyles.logo}>EL MOTORISTA</div></Link>
              <div className={themeStyles.search}>
                  <input type="text" placeholder="Buscar por marca, modelo, artículo..." />
                  <button>BUSCAR</button>
              </div>
              <div className={themeStyles.navMenu}>
                  {menuItems.map((i: string) => <span key={i}>{i}</span>)}
              </div>
          </header>
      );
  }

  // ESTILO 1: EXACTO AL DE EL MOTORISTA
  return (
    <header className={themeStyles.navbar_1}>
      <div className={themeStyles.topBar}>
        <div className={themeStyles.topBarContainer}>
          <span>Llámanos: 956 34 22 11</span>
          <span>ENVÍO GRATIS A PARTIR DE 50€ (Solo Península)</span>
          <span>Nuestras Tiendas</span>
        </div>
      </div>
      <div className={themeStyles.mainHeader}>
        <Link href="/" style={{ textDecoration: 'none' }}><div className={themeStyles.logo}>EL MOTORISTA</div></Link>
        <div className={themeStyles.search}>
          <input type="text" placeholder="Buscar por marca, modelo, artículo..." />
          <button>BUSCAR</button>
        </div>
        <div className={themeStyles.icons}>
          <div className={themeStyles.iconBox}><span className={themeStyles.iconEmoji}>👤</span><span>Mi Cuenta</span></div>
          <div className={themeStyles.iconBox}><span className={themeStyles.iconEmoji}>🛒</span><span>Mi Cesta</span></div>
        </div>
      </div>
      <div className={themeStyles.navMenu}>
        <div className={themeStyles.navMenuContainer}>
          {menuItems.map((item: string, index: number) => <span key={index}>{item}</span>)}
        </div>
      </div>
    </header>
  );
}