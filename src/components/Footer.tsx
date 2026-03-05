// src/components/Footer.tsx
import React from 'react';
import { themeStyles } from '../config/index';

export default function Footer() {
  return (
    <footer className={themeStyles.footer}>
      <div className={themeStyles.container}>
        
        {/* Newsletter replicada */}
        <div className={themeStyles.newsletter}>
          <h3>Únete a nuestra Newsletter y consigue un 5% dto.</h3>
          <div className={themeStyles.inputGroup}>
            <input type="email" placeholder="Introduce tu email" />
            <button>Suscribirse</button>
          </div>
        </div>

        {/* Columnas Estilo El Motorista */}
        <div className={themeStyles.footerColumn}>
          <h4>Información</h4>
          <ul>
            <li>Sobre nosotros</li>
            <li>Tiendas</li>
            <li>Contacto</li>
            <li>Trabaja con nosotros</li>
          </ul>
        </div>

        <div className={themeStyles.footerColumn}>
          <h4>Guía de Compra</h4>
          <ul>
            <li>Envíos y Entregas</li>
            <li>Devoluciones</li>
            <li>Formas de Pago</li>
            <li>Preguntas Frecuentes</li>
          </ul>
        </div>

        <div className={themeStyles.footerColumn}>
          <h4>Legal</h4>
          <ul>
            <li>Aviso Legal</li>
            <li>Política de Privacidad</li>
            <li>Política de Cookies</li>
            <li>Condiciones Generales</li>
          </ul>
        </div>

        <div className={themeStyles.footerColumn}>
          <h4>Mi Cuenta</h4>
          <ul>
            <li>Iniciar Sesión</li>
            <li>Historial de pedidos</li>
            <li>Mi Cesta</li>
          </ul>
        </div>

        {/* Bottom Bar */}
        <div className={themeStyles.bottomBar}>
          <div className={themeStyles.container}>
            <p>© 2026 El Motorista. Todos los derechos reservados. Desarrollado para Prácticas.</p>
            <p>Aceptamos: VISA, Mastercard, PayPal, Bizum.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}