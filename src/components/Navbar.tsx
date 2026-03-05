import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../pages/store/store';
import { themeStyles, config } from '../config/index';

export default function Navbar() {
  const siteConfig = config as any;
  const menuItems = siteConfig?.menuItems || [];
  const styleId = siteConfig?.styles?.navbar || '1';

  // Extraemos estado global
  const { isLoggedIn, cart, favorites } = useSelector((state: RootState) => state.shop);
  const cartItemsCount = cart[siteConfig.siteName]?.length || 0;
  const favItemsCount = favorites[siteConfig.siteName]?.length || 0;

  const IconsBlock = () => (
      <div className={themeStyles.icons}>
          <Link href="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className={themeStyles.iconBox}>
                  <span className={themeStyles.iconEmoji}>{isLoggedIn ? '🟢' : '👤'}</span>
                  <span>{isLoggedIn ? 'Mi Perfil' : 'Mi Cuenta'}</span>
              </div>
          </Link>
          {isLoggedIn && (
              <>
                <Link href="/favorites" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={themeStyles.iconBox} style={{position:'relative'}}>
                        <span className={themeStyles.iconEmoji}>❤️</span>
                        <span>Favoritos</span>
                        {favItemsCount > 0 && <div className={themeStyles.badgeCount}>{favItemsCount}</div>}
                    </div>
                </Link>
                <Link href="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={themeStyles.iconBox} style={{position:'relative'}}>
                        <span className={themeStyles.iconEmoji}>🛒</span>
                        <span>Mi Cesta</span>
                        {cartItemsCount > 0 && <div className={themeStyles.badgeCount}>{cartItemsCount}</div>}
                    </div>
                </Link>
              </>
          )}
      </div>
  );

  if (styleId === '2') {
      return (
          <header className={themeStyles.navbar_2}>
              <Link href="/" style={{ textDecoration: 'none' }}><div className={themeStyles.logo}>{siteConfig?.siteName}</div></Link>
              <div className={themeStyles.search}>
                  <input type="text" placeholder="Buscar..." />
                  <button>BUSCAR</button>
              </div>
              <div className={themeStyles.navMenu}>
                  {menuItems.map((item: any, idx: number) => <Link key={idx} href={item.path || '/'}><span>{item.label}</span></Link>)}
              </div>
              <div style={{marginTop: '20px', display:'flex', justifyContent:'center'}}><IconsBlock /></div>
          </header>
      );
  }

  return (
    <header className={themeStyles.navbar_1}>
      <div className={themeStyles.topBar}>
        <div className={themeStyles.topBarContainer}>
          <span>Llámanos: 956 34 22 11</span> <span>ENVÍO GRATIS A PARTIR DE 50€</span>
        </div>
      </div>
      <div className={themeStyles.mainHeader}>
        <Link href="/" style={{ textDecoration: 'none' }}><div className={themeStyles.logo}>{siteConfig?.siteName}</div></Link>
        <div className={themeStyles.search}>
          <input type="text" placeholder="Buscar..." /><button>BUSCAR</button>
        </div>
        <IconsBlock />
      </div>
      <div className={themeStyles.navMenu}>
        <div className={themeStyles.navMenuContainer}>
          {menuItems.map((item: any, idx: number) => <Link key={idx} href={item.path || '/'} style={{textDecoration:'none', color:'inherit'}}><span>{item.label}</span></Link>)}
        </div>
      </div>
    </header>
  );
}