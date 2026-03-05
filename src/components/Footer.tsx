import React from 'react';
import { themeStyles } from '../config/index';

export default function Footer() {
  const styleId = process.env.NEXT_PUBLIC_FOOTER_STYLE || '1';

  if (styleId === '2') {
      return (
          <footer className={themeStyles.footer_2}>
              <h2>EL MOTORISTA</h2>
              <div className={themeStyles.links}>
                  <span>Contacto</span><span>Envíos</span><span>Devoluciones</span><span>Aviso Legal</span>
              </div>
              <div>© 2026 El Motorista. Todos los derechos reservados.</div>
          </footer>
      );
  }

  // ESTILO 1: EXACTO AL DE EL MOTORISTA
  return (
    <footer className={themeStyles.footer_1}>
      <div className={themeStyles.container}>
        <div>
          <h4>Sobre Nosotros</h4>
          <ul><li>Nuestras tiendas</li><li>Trabaja con nosotros</li><li>Contacto</li></ul>
        </div>
        <div>
          <h4>Guía de compra</h4>
          <ul><li>Envíos y entregas</li><li>Devoluciones</li><li>Formas de pago</li></ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul><li>Aviso Legal</li><li>Política de Privacidad</li><li>Política de Cookies</li></ul>
        </div>
        <div>
          <h4>Mi cuenta</h4>
          <ul><li>Mis pedidos</li><li>Mis direcciones</li><li>Ajustes</li></ul>
        </div>
        <div className={themeStyles.bottomBar}>
          © 2026 El Motorista. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}