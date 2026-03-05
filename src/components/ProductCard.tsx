import React from 'react';
import { themeStyles } from '../config/index';

export interface ProductProps {
  id: string;
  brand: string;
  name: string;
  price: number;
  oldPrice?: number;
  imageUrl: string; 
}

export default function ProductCard({ product }: { product: ProductProps }) {
  return (
    <div className={themeStyles.productCard}>
      <div className={themeStyles.imageWrapper}>
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className={themeStyles.brand}>{product.brand}</div>
      <h3 className={themeStyles.name}>{product.name}</h3>
      <div className={themeStyles.priceRow}>
        <span className={themeStyles.currentPrice}>{product.price.toLocaleString('es-ES')} €</span>
        {product.oldPrice && (
          <span className={themeStyles.oldPrice}>{product.oldPrice.toLocaleString('es-ES')} €</span>
        )}
      </div>
      <button className={themeStyles.addToCartBtn}>Ver detalles</button>
    </div>
  );
}