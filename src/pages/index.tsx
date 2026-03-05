"use client"
import { useEffect, useState } from "react";
import Head from 'next/head'; 
import { themeStyles } from '../config/index';
import ProductCard from '../components/ProductCard';

export default function Home() {
    const [motos, setMotos] = useState<any[]>([]);
    
    const [marcas, setMarcas] = useState<string[]>([]);
    const [estados, setEstados] = useState<string[]>([]);
    const [motores, setMotores] = useState<string[]>([]);
    const [provincias, setProvincias] = useState<string[]>([]);
    const [carnets, setCarnets] = useState<string[]>([]);
    
    const [minPrice, setMinPrice] = useState<number | ''>('');
    const [maxPrice, setMaxPrice] = useState<number | ''>('');

    const filterStyleId = process.env.NEXT_PUBLIC_FILTER_STYLE || '1';
    const cardStyleId = process.env.NEXT_PUBLIC_CARD_STYLE || '1';

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
        return true;
    });

    const getUnique = (key: string) => Array.from(new Set(motos.map(m => m[key])));

    return (
        <div>
            <Head><title>Catálogo de Motos | El Motorista</title></Head>
            
            <div className={filterStyleId === '2' ? themeStyles.pageLayout_2 : themeStyles.pageLayout_1}>
                
                {/* ESTILO 2: FILTROS SUPERIORES */}
                {filterStyleId === '2' && (
                    <div className={themeStyles.topFilters_2}>
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
                    </div>
                )}

                {/* ESTILO 1: RÉPLICA EL MOTORISTA (SIDEBAR IZQUIERDO) */}
                {filterStyleId === '1' && (
                    <aside className={themeStyles.sidebar_1}>
                        <div className={themeStyles.filterHeader}>Filtros</div>
                        <div className={themeStyles.filterBlock}>
                            <h4>ESTADO</h4>
                            <div className={themeStyles.filterList}>
                                {getUnique('type').map((est: any) => (
                                    <label key={est}><input type="checkbox" onChange={() => handleCheck(setEstados, estados, est)} /> {est}</label>
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
                            <h4>PRECIO (€)</h4>
                            <div className={themeStyles.rangeInputs}>
                                <input type="number" placeholder="Mín" value={minPrice} onChange={e => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))} />
                                <span>-</span>
                                <input type="number" placeholder="Máx" value={maxPrice} onChange={e => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))} />
                            </div>
                        </div>
                    </aside>
                )}

                {/* GRID RESULTADOS DINÁMICO */}
                <section style={{flex: 1}}>
                    <div style={{marginBottom: '20px', fontSize: '14px', color: '#666'}}>
                        Mostrando {motosFiltradas.length} motos
                    </div>
                    <div className={cardStyleId === '2' ? themeStyles.productGrid_2 : themeStyles.productGrid_1}>
                        {motosFiltradas.map((moto) => (
                            <ProductCard 
                                key={moto.id} 
                                product={{id: moto.id, brand: moto.brand, name: moto.title, price: moto.price, imageUrl: moto.thumbnail, type: moto.type, kms: moto.kms, year: moto.year, url: moto.url}} 
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}