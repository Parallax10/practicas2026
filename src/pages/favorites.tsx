import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { themeStyles, config } from '../config/index';
import ProductCard from '../components/ProductCard';

export default function Favorites() {
    const siteConfig = config as any;
    const { favorites, isLoggedIn } = useSelector((state: RootState) => state.shop);
    const items = favorites[siteConfig.siteName] || [];

    if (!isLoggedIn) return <div style={{textAlign:'center', padding:'100px'}}>Por favor, inicia sesión para ver tus favoritos.</div>;

    return (
        <div className={themeStyles.pageLayout_1} style={{flexDirection:'column'}}>
            <Head><title>Mis Favoritos | {siteConfig?.siteName}</title></Head>
            <h1 className={themeStyles.titleDetail}>Mis Favoritos</h1>
            {items.length === 0 ? <p>No tienes artículos en favoritos.</p> : (
                <div className={themeStyles.productGrid_1}>
                    {items.map(item => <ProductCard key={item.id} product={item} />)}
                </div>
            )}
        </div>
    );
}