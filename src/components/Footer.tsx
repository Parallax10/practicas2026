import React from 'react';
import { themeStyles } from '../config/index';

export default function Footer() {
  return (
    <footer className={themeStyles.footer}>
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