"use client"
import { useEffect, useState } from "react";
import Head from 'next/head'; 
import { themeStyles, config } from '../config/index';
import ProductCard from '../components/ProductCard';

export default function Products() {
    const siteConfig = config as any;
    const filterStyleId = siteConfig?.styles?.filters || '1';
    const cardStyleId = siteConfig?.styles?.cards || '1';

    const [products, setProducts] = useState<any[]>([]);
    const [categorias, setCategorias] = useState<string[]>([]);
    const [marcas, setMarcas] = useState<string[]>([]);
    const [tallas, setTallas] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState<number | ''>('');
    const [maxPrice, setMaxPrice] = useState<number | ''>('');

    useEffect(() => { fetch('/api/products').then(res => res.json()).then(setProducts); }, []);

    const handleCheck = (setState: any, state: string[], value: string) => {
        if (state.includes(value)) setState(state.filter(item => item !== value));
        else setState([...state, value]);
    };

    const filtrados = products.filter(p => {
        if (categorias.length > 0 && !categorias.includes(p.category)) return false;
        if (marcas.length > 0 && !marcas.includes(p.brand)) return false;
        if (tallas.length > 0 && !tallas.some(t => p.sizes.includes(t))) return false;
        if (minPrice !== '' && p.price < Number(minPrice)) return false;
        if (maxPrice !== '' && p.price > Number(maxPrice)) return false;
        return true;
    });

    const getUnique = (key: string) => Array.from(new Set(products.map(p => p[key])));
    const todasLasTallas = Array.from(new Set(products.flatMap(p => p.sizes)));

    return (
        <div>
            <Head><title>Tienda | {siteConfig?.siteName}</title></Head>
            <div className={filterStyleId === '2' ? themeStyles.pageLayout_2 : themeStyles.pageLayout_1}>
                
                {filterStyleId === '2' && (
                    <div className={themeStyles.topFilters_2}>
                        <div className={themeStyles.filterBlock}>
                            <h4>Categoría</h4>
                            <select onChange={(e) => setCategorias(e.target.value ? [e.target.value] : [])}>
                                <option value="">Todas</option>
                                {getUnique('category').map((cat: any) => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div className={themeStyles.filterBlock}>
                            <h4>Marca</h4>
                            <select onChange={(e) => setMarcas(e.target.value ? [e.target.value] : [])}>
                                <option value="">Todas</option>
                                {getUnique('brand').map((marca: any) => <option key={marca} value={marca}>{marca}</option>)}
                            </select>
                        </div>
                        <div className={themeStyles.filterBlock}>
                            <h4>Precio Máx</h4>
                            <input type="number" placeholder="Ej: 3000" value={maxPrice} onChange={e => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))} />
                        </div>
                    </div>
                )}

                {filterStyleId === '1' && (
                    <aside className={themeStyles.sidebar_1}>
                        <div className={themeStyles.filterHeader}>Filtros de Tienda</div>
                        <div className={themeStyles.filterBlock}>
                            <h4>CATEGORÍA</h4>
                            <div className={themeStyles.filterList}>
                                {getUnique('category').map((cat: any) => <label key={cat}><input type="checkbox" onChange={() => handleCheck(setCategorias, categorias, cat)} /> {cat}</label>)}
                            </div>
                        </div>
                        <div className={themeStyles.filterBlock}>
                            <h4>MARCA</h4>
                            <div className={themeStyles.filterList}>
                                {getUnique('brand').map((marca: any) => <label key={marca}><input type="checkbox" onChange={() => handleCheck(setMarcas, marcas, marca)} /> {marca}</label>)}
                            </div>
                        </div>
                        <div className={themeStyles.filterBlock}>
                            <h4>TALLA</h4>
                            <div className={themeStyles.filterList} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                {todasLasTallas.map((talla: any) => <label key={talla}><input type="checkbox" onChange={() => handleCheck(setTallas, tallas, talla)} /> {talla}</label>)}
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
                )}

                <section style={{flex: 1}}>
                    <div style={{marginBottom: '20px', fontSize: '14px', color: '#666'}}>Mostrando {filtrados.length} artículos</div>
                    
                    <div className={cardStyleId === '2' ? themeStyles.productGrid_2 : themeStyles.productGrid_1}>
                        {filtrados.map((prod) => (
                            <ProductCard key={prod.id} product={{...prod, imageUrl: prod.thumbnail, name: prod.name}} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}