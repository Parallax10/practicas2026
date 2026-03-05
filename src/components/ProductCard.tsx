import React from 'react';
import Image from 'next/image';
import dynamicStyles from '../styles/dynamicTheme.module.scss';

interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className={dynamicStyles.productCard}>
      <img src={product.image} alt={product.name} width={200} height={200} style={{ objectFit: 'contain' }}/>
      <p className={dynamicStyles.brand}>{product.brand}</p>
      <h3 className={dynamicStyles.title}>{product.name}</h3>
      <p className={dynamicStyles.price}>{product.price.toFixed(2)} €</p>
      <button>Añadir al carrito</button>
    </div>
  );
}