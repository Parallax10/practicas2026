// src/components/ProductCard.tsx (Recomendado crear este componente)
import React from 'react';
import { themeStyles } from '../config/index';

interface Product {
  id: string;
  brand: string;
  name: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className={themeStyles.productCard}>
      <div className={themeStyles.imageWrapper}>
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className={themeStyles.brand}>{product.brand}</div>
      <h3 className={themeStyles.name}>{product.name}</h3>
      <div className={themeStyles.priceRow}>
        <span className={themeStyles.currentPrice}>{product.price.toFixed(2)} €</span>
        {product.oldPrice && <span className={themeStyles.oldPrice}>{product.oldPrice.toFixed(2)} €</span>}
      </div>
      <button className={themeStyles.addToCartBtn}>Añadir</button>
    </div>
  );
}