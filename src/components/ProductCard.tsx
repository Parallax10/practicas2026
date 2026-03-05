import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../pages/store/store';
import { toggleFavorite } from '../pages/store/slices/shopSlice';
import { themeStyles, config } from '../config/index';

export default function ProductCard({ product }: { product: any }) {
  const siteConfig = config as any;
  const styleId = siteConfig?.styles?.cards || '1';
  const dispatch = useDispatch();
  
  const { isLoggedIn, favorites } = useSelector((state: RootState) => state.shop);
  const isFav = (favorites[siteConfig.siteName] || []).some((i: any) => i.id === product.id);

  const handleFav = (e: React.MouseEvent) => {
      e.preventDefault(); // Evita que al dar al corazón se abra la página
      if (!isLoggedIn) return alert("Inicia sesión para añadir a favoritos");
      dispatch(toggleFavorite({ site: siteConfig.siteName, product }));
  };

  const HeartButton = () => (
      <div onClick={handleFav} className={`${themeStyles.heartBtn} ${isFav ? themeStyles.isFav : ''}`}>
          {isFav ? '❤️' : '🤍'}
      </div>
  );

  // Diferenciamos si es moto o producto para la ruta y los textos
  const isMoto = product.kms !== undefined;
  const linkUrl = `/${isMoto ? 'detallesMotos' : 'detallesProductos'}/${product.url}`;
  const badgeText = isMoto ? product.type : product.category;
  const imageUrl = product.imageUrl || product.thumbnail;

  if (styleId === '2') {
      return (
        <Link href={linkUrl} className={themeStyles.card_2} style={{position:'relative'}}>
            <HeartButton />
            <div className={themeStyles.imgBox}><img src={imageUrl} alt={product.name} /></div>
            <div className={themeStyles.infoBox}>
                <div style={{fontSize: '11px', color: '#888', textTransform:'uppercase'}}>{badgeText}</div>
                <h3 className={themeStyles.title}>{product.name}</h3>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '5px' }}>
                    <div className={themeStyles.price}>{product.price.toLocaleString('es-ES')} €</div>
                    {product.oldPrice && <span style={{ textDecoration: 'line-through', color: '#aaa', fontSize: '13px' }}>{product.oldPrice} €</span>}
                </div>
                {isMoto ? (
                    <div style={{fontSize: '13px', color: '#666'}}>Año: {product.year} | {product.kms} kms</div>
                ) : (
                    <div style={{fontSize: '13px', color: '#666'}}>{product.brand}</div>
                )}
            </div>
        </Link>
      );
  }

  return (
    <Link href={linkUrl} className={themeStyles.card_1} style={{position:'relative'}}>
      <HeartButton />
      <div className={themeStyles.badgeState}>{badgeText}</div>
      <div className={themeStyles.imgBox}><img src={imageUrl} alt={product.name} /></div>
      <h3 className={themeStyles.title}>{product.name}</h3>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '5px' }}>
          <div className={themeStyles.price}>{product.price.toLocaleString('es-ES')} €</div>
          {product.oldPrice && <span style={{ textDecoration: 'line-through', color: '#aaa', fontSize: '13px' }}>{product.oldPrice} €</span>}
      </div>
      <div className={themeStyles.specs}>
          {isMoto ? `Año: ${product.year} | ${product.kms.toLocaleString('es-ES')} kms` : product.brand}
      </div>
    </Link>
  );
}