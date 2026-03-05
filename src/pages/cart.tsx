import React from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { removeFromCart } from './store/slices/shopSlice';
import { themeStyles, config } from '../config/index';

export default function Cart() {
    const dispatch = useDispatch();
    const siteConfig = config as any;
    const { cart, isLoggedIn } = useSelector((state: RootState) => state.shop);
    const items = cart[siteConfig.siteName] || [];

    if (!isLoggedIn) return <div style={{textAlign:'center', padding:'100px'}}>Por favor, inicia sesión para ver tu cesta.</div>;

    const total = items.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className={themeStyles.detailsPage_1}>
            <Head><title>Mi Cesta | {siteConfig?.siteName}</title></Head>
            <h1 className={themeStyles.titleDetail}>Mi Cesta de Compra</h1>
            {items.length === 0 ? <p>Tu cesta está vacía. Añade productos de la tienda.</p> : (
                <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
                    {items.map((item, idx) => (
                        <div key={idx} style={{display:'flex', justifyContent:'space-between', padding:'20px', background:'#fff', border:'1px solid #ddd', borderRadius:'8px', alignItems:'center'}}>
                            <div style={{display:'flex', gap:'20px', alignItems:'center'}}>
                                <img src={item.thumbnail} alt={item.name} style={{width:'80px', height:'80px', objectFit:'contain'}} />
                                <div><h3 style={{margin:0}}>{item.name}</h3><span style={{color:'#888'}}>Talla: {item.selectedSize}</span></div>
                            </div>
                            <div style={{display:'flex', gap:'20px', alignItems:'center'}}>
                                <strong style={{fontSize:'20px'}}>{item.price} €</strong>
                                <button onClick={() => dispatch(removeFromCart({site: siteConfig.siteName, id: item.id}))} style={{background:'red', color:'#fff', border:'none', padding:'10px', borderRadius:'4px', cursor:'pointer'}}>X</button>
                            </div>
                        </div>
                    ))}
                    <div style={{textAlign:'right', marginTop:'20px'}}>
                        <h2>Total: {total.toFixed(2)} €</h2>
                        <button className={themeStyles.contactBtn} style={{width:'auto', padding:'15px 40px'}}>Finalizar Compra</button>
                    </div>
                </div>
            )}
        </div>
    );
}