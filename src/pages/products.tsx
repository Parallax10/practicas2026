"use client"
import { useEffect, useState } from "react";
import Head from 'next/head'; 
import Link from 'next/link';
import { themeStyles } from '../config/index';

export default function Products() {
    const [products, setProducts] = useState<any[]>([]);
    
    // Filtros específicos de tienda
    const [categorias, setCategorias] = useState<string[]>([]);
    const [marcas, setMarcas] = useState<string[]>([]);
    const [tallas, setTallas] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState<number | ''>('');
    const [maxPrice, setMaxPrice] = useState<number | ''>('');

    useEffect(() => {
        fetch('/api/products').then(res => res.json()).then(setProducts);
    }, []);

    const handleCheck = (setState: any, state: string[], value: string) => {
        if (state.includes(value)) setState(state.filter(item => item !== value));
        else setState([...state, value]);
    };

    const filtrados = products.filter(p => {
        if (categorias.length > 0 && !categorias.includes(p.category)) return false;
        if (marcas.length > 0 && !marcas.includes(p.brand)) return false;
        // Filtro de tallas: si el producto tiene al menos una de las tallas seleccionadas
        if (tallas.length > 0 && !tallas.some(t => p.sizes.includes(t))) return false;
        
        if (minPrice !== '' && p.price < Number(minPrice)) return false;
        if (maxPrice !== '' && p.price > Number(maxPrice)) return false;

        return true;
    });

    const getUnique = (key: string) => Array.from(new Set(products.map(p => p[key])));
    // Extraer todas las tallas únicas de todos los productos
    const todasLasTallas = Array.from(new Set(products.flatMap(p => p.sizes)));

    return (
        <div>
            <Head><title>Equipación y Accesorios | El Motorista</title></Head>
            
            <div className={themeStyles.pageLayout}>
                {/* SIDEBAR FILTROS */}
                <aside className={themeStyles.sidebar}>
                    <div className={themeStyles.filterHeader}>Filtros de Tienda</div>

                    <div className={themeStyles.filterBlock}>
                        <h4>CATEGORÍA</h4>
                        <div className={themeStyles.filterList}>
                            {getUnique('category').map((cat: any) => (
                                <label key={cat}><input type="checkbox" onChange={() => handleCheck(setCategorias, categorias, cat)} /> {cat}</label>
                            ))}
                        </div>
                    </div>
                    <div className={themeStyles.filterBlock}>
                        <h4>MARCA</h4>
                        <div className={themeStyles.filterList}>
                            {getUnique('brand').map((marca: any) => (
                                <label key={marca}><input type="checkbox" onChange={() => handleCheck(setMarcas, marcas, marca)} /> {marca}</label>
                            ))}
                        </div>
                    </div>
                    <div className={themeStyles.filterBlock}>
                        <h4>TALLA</h4>
                        <div className={themeStyles.filterList} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                            {todasLasTallas.map((talla: any) => (
                                <label key={talla}><input type="checkbox" onChange={() => handleCheck(setTallas, tallas, talla)} /> {talla}</label>
                            ))}
                        </div>
                    </div>
                    <div className={themeStyles.filterBlock}>
                        <h4>PRECIO (€)</h4>
                        <div className={themeStyles.rangeInputs}>
                            <input type="number" placeholder="Mín" value={minPrice} onChange={e => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))} />
                            <span>-</span>
                            <input type="number" placeholder="Máx" value={maxPrice} onChange={e => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))} />
                        </div>
                    </div>
                </aside>

                {/* GRID RESULTADOS (StoreCard inline) */}
                <section style={{flex: 1}}>
                    <div style={{marginBottom: '20px', fontSize: '14px', color: '#666'}}>
                        Mostrando {filtrados.length} artículos
                    </div>
                    <div className={themeStyles.productGrid}>
                        {filtrados.map((prod) => (
                            <Link key={prod.id} href={`/detallesProductos/${prod.url}`} className={themeStyles.storeCard}>
                                {prod.oldPrice && <div className={themeStyles.discountBadge}>Oferta</div>}
                                <div className={themeStyles.storeImg}>
                                    <img src={prod.thumbnail} alt={prod.name} />
                                </div>
                                <div className={themeStyles.storeBrand}>{prod.brand}</div>
                                <h3 className={themeStyles.storeTitle}>{prod.name}</h3>
                                <div className={themeStyles.storePriceBox}>
                                    <span className={themeStyles.currentPrice}>{prod.price.toLocaleString('es-ES')} €</span>
                                    {prod.oldPrice && <span className={themeStyles.oldPrice}>{prod.oldPrice.toLocaleString('es-ES')} €</span>}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}