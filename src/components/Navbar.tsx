import React from 'react';
import Link from 'next/link';
import dynamicStyles from '../styles/dynamicTheme.module.scss';
import styles from '../styles/motorista.module.scss'; // Puedes combinar estilos estáticos y dinámicos

export default function Navbar() {
  return (
    <header className={dynamicStyles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <h2>EL MOTORISTA</h2>
        </Link>
      </div>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Buscar productos, marcas, referencias..." />
        <button>Buscar</button>
      </div>
      <nav className={styles.userMenu}>
        <Link href="/login">Mi cuenta</Link>
        <Link href="/cart">Carrito</Link>
      </nav>
    </header>
  );
}