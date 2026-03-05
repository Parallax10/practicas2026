import React from 'react';
import Link from 'next/link';
import { themeStyles } from '../config/index';

export interface ProductProps {
  id: string;
  brand: string;
  name: string;
  price: number;
  imageUrl: string; 
  type: string;
  kms: number;
  year: number;
  url: string;
}

export default function ProductCard({ product }: { product: ProductProps }) {
  return (
    <Link href={`/detallesMotos/${product.url}`} className={themeStyles.card}>
      <div className={themeStyles.badge}>{product.type}</div>
      <div className={themeStyles.imgBox}>
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className={themeStyles.motoInfo}>
        <span>{product.brand}</span>
        <span>{product.year} • {product.kms} km</span>
      </div>
      <h3 className={themeStyles.title}>{product.name}</h3>
      <div className={themeStyles.price}>{product.price.toLocaleString('es-ES')} €</div>
    </Link>
  );
}