"use client"
import { useEffect, useState } from "react";
import Head from 'next/head'; 
import { themeStyles, config } from '../config/index';
import ProductCard from '../components/ProductCard';

export default function Home() {
    const siteConfig = config as any;
    // Extraemos la disposición en texto ('sidebar' o 'topbar')
    const filterLayout = siteConfig?.styles?.filterLayout || 'sidebar';

    const [motos, setMotos] = useState<any[]>([]);
    const [marcas, setMarcas] = useState<string[]>([]);
    const [estados, setEstados] = useState<string[]>([]);
    const [motores, setMotores] = useState<string[]>([]);
    const [provincias, setProvincias] = useState<string[]>([]);
    const [carnets, setCarnets] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState<number | ''>('');
    const [maxPrice, setMaxPrice] = useState<number | ''>('');
    const [minKms, setMinKms] = useState<number | ''>('');
    const [maxKms, setMaxKms] = useState<number | ''>('');

    useEffect(() => { fetch('/api/motos').then(res => res.json()).then(setMotos); }, []);

    const handleCheck = (setState: any, state: string[], value: string) => {
        if (state.includes(value)) setState(state.filter(item => item !== value));
        else setState([...state, value]);
    };

    const motosFiltradas = motos.filter(moto => {
        if (marcas.length > 0 && !marcas.includes(moto.brand)) return false;
        if (estados.length > 0 && !estados.includes(moto.type)) return false;
        if (motores.length > 0 && !motores.includes(moto.engine)) return false;
        if (provincias.length > 0 && !provincias.includes(moto.province)) return false;
        if (carnets.length > 0 && !carnets.includes(moto.license)) return false;
        if (minPrice !== '' && moto.price < Number(minPrice)) return false;
        if (maxPrice !== '' && moto.price > Number(maxPrice)) return false;
        if (minKms !== '' && moto.kms < Number(minKms)) return false;
        if (maxKms !== '' && moto.kms > Number(maxKms)) return false;
        return true;
    });

    const getUnique = (key: string) => Array.from(new Set(motos.map(m => m[key])));

    return (
        <div>
            <Head><title>Motos | {siteConfig?.siteName}</title></Head>
            <div className={themeStyles.pageLayout} >
                
                {/* FILTROS TOPBAR */}
                {filterLayout === 'topbar' && (
                    <div className={themeStyles.topFilters}>
                        <div className={themeStyles.filterBlock}>
                            <h4>Estado</h4>
                            <select onChange={(e) => setEstados(e.target.value ? [e.target.value] : [])}>
                                <option value="">Todos</option>
                                {getUnique('type').map((est: any) => <option key={est} value={est}>{est}</option>)}
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
                            <h4>Provincia</h4>
                            <select onChange={(e) => setProvincias(e.target.value ? [e.target.value] : [])}>
                                <option value="">Todas</option>
                                {getUnique('province').map((p: any) => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                        <div className={themeStyles.filterBlock}>
                            <h4>Precio Máx</h4>
                            <input type="number" placeholder="Ej: 3000" value={maxPrice} onChange={e => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))} />
                        </div>
                        <div className={themeStyles.filterBlock}>
                            <h4>Kms Máx</h4>
                            <input type="number" placeholder="Ej: 20000" value={maxKms} onChange={e => setMaxKms(e.target.value === '' ? '' : Number(e.target.value))} />
                        </div>
                    </div>
                )}

                {/* FILTROS SIDEBAR */}
                {filterLayout === 'sidebar' && (
                    <aside className={themeStyles.sidebar}>
                        <div className={themeStyles.filterHeader}>Filtros de Motos</div>
                        <div className={themeStyles.filterBlock}>
                            <h4>ESTADO</h4>
                            <div className={themeStyles.filterList}>
                                {getUnique('type').map((est: any) => <label key={est}><input type="checkbox" onChange={() => handleCheck(setEstados, estados, est)} /> {est}</label>)}
                            </div>
                        </div>
                        <div className={themeStyles.filterBlock}>
                            <h4>MARCA</h4>
                            <div className={themeStyles.filterList}>
                                {getUnique('brand').map((marca: any) => <label key={marca}><input type="checkbox" onChange={() => handleCheck(setMarcas, marcas, marca)} /> {marca}</label>)}
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
                        <div className={themeStyles.filterBlock}>
                            <h4>KILÓMETROS</h4>
                            <div className={themeStyles.rangeInputs}>
                                <input type="number" placeholder="Mín" value={minKms} onChange={e => setMinKms(e.target.value === '' ? '' : Number(e.target.value))} />
                                <span>-</span>
                                <input type="number" placeholder="Máx" value={maxKms} onChange={e => setMaxKms(e.target.value === '' ? '' : Number(e.target.value))} />
                            </div>
                        </div>
                    </aside>
                )}

                <section style={{flex: 1}}>
                    <div style={{marginBottom: '20px', fontSize: '14px'}}>Mostrando {motosFiltradas.length} motos</div>
                    <div className={themeStyles.productGrid}>
                        {motosFiltradas.map((moto) => (
                            <ProductCard key={moto.id} product={{id: moto.id, brand: moto.brand, name: moto.title, price: moto.price, imageUrl: moto.thumbnail, type: moto.type, kms: moto.kms, year: moto.year, url: moto.url}} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}