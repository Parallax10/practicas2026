import React from 'react';
import { themeStyles, config } from '../config/index';

export default function Footer() {
  const siteConfig = config as any;
  // Leemos el layout en lugar del número de estilo
  const layoutType = siteConfig?.styles?.footerLayout || 'columns';

  if (layoutType === 'centered') {
      return (
          <footer className={themeStyles.footer}>
              <h2>{siteConfig?.siteName}</h2>
              <div className={themeStyles.links}>
                  <span>Contacto</span><span>Envíos</span><span>Devoluciones</span><span>Aviso Legal</span>
              </div>
              <div>© 2026 {siteConfig?.siteName}. Todos los derechos reservados.</div>
          </footer>
      );
  }

  // Layout 'columns' por defecto
  return (
    <footer className={themeStyles.footer}>
      <div className={themeStyles.container}>
        <div><h4>Sobre Nosotros</h4><ul><li>Nuestras tiendas</li><li>Contacto</li></ul></div>
        <div><h4>Guía de compra</h4><ul><li>Envíos y entregas</li><li>Devoluciones</li></ul></div>
        <div><h4>Legal</h4><ul><li>Aviso Legal</li><li>Política de Privacidad</li></ul></div>
        <div><h4>Mi cuenta</h4><ul><li>Mis pedidos</li><li>Ajustes</li></ul></div>
        <div className={themeStyles.bottomBar}>© 2026 {siteConfig?.siteName}. Todos los derechos reservados.</div>
      </div>
    </footer>
  );
}