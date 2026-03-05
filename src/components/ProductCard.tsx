import React from 'react';
import Link from 'next/link';
import { themeStyles } from '../config/index';

export default function ProductCard({ product }: { product: any }) {
  const styleId = process.env.NEXT_PUBLIC_CARD_STYLE || '1';

  if (styleId === '2') {
      return (
        <Link href={`/detallesMotos/${product.url}`} className={themeStyles.card_2}>
            <div className={themeStyles.imgBox}><img src={product.imageUrl} alt={product.name} /></div>
            <div className={themeStyles.infoBox}>
                <div style={{fontSize: '11px', color: '#888', textTransform:'uppercase'}}>{product.type}</div>
                <h3 className={themeStyles.title}>{product.name}</h3>
                <div className={themeStyles.price}>{product.price.toLocaleString('es-ES')} €</div>
                <div style={{fontSize: '13px', color: '#666'}}>Año: {product.year} | {product.kms} kms</div>
            </div>
        </Link>
      );
  }

  // ESTILO 1: EXACTO AL DE EL MOTORISTA
  return (
    <Link href={`/detallesMotos/${product.url}`} className={themeStyles.card_1}>
      <div className={themeStyles.badgeState}>{product.type}</div>
      <div className={themeStyles.imgBox}>
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <h3 className={themeStyles.title}>{product.name}</h3>
      <div className={themeStyles.price}>{product.price.toLocaleString('es-ES')} €</div>
      <div className={themeStyles.specs}>
        Año: {product.year} | {product.kms.toLocaleString('es-ES')} kms
      </div>
    </Link>
  );
}