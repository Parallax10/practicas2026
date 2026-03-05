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
    
    const [minPrice, setMinPrice] = useState<number | ''>('');
    const [maxPrice, setMaxPrice] = useState<number | ''>('');
    const [minKms, setMinKms] = useState<number | ''>('');
    const [maxKms, setMaxKms] = useState<number | ''>('');

    useEffect(() => {
        fetch('/api/motos').then(res => res.json()).then(setMotos);
    }, []);

    const handleCheck = (setState: any, state: string[], value: string) => {
        if (state.includes(value)) setState(state.filter(item => item !== value));
        else setState([...state, value]);
    };

    const motosFiltradas = motos.filter(moto => {
        if (marcas.length > 0 && !marcas.includes(moto.brand)) return false;
        if (estados.length > 0 && !estados.includes(moto.type)) return false;
        if (motores.length > 0 && !motores.includes(moto.engine)) return false;
        if (provincias.length > 0 && !provincias.includes(moto.province)) return false;
        
        if (minPrice !== '' && moto.price < Number(minPrice)) return false;
        if (maxPrice !== '' && moto.price > Number(maxPrice)) return false;
        
        if (minKms !== '' && moto.kms < Number(minKms)) return false;
        if (maxKms !== '' && moto.kms > Number(maxKms)) return false;

        return true;
    });

    const marcasUnicas = Array.from(new Set(motos.map(m => m.brand)));
    const provinciasUnicas = Array.from(new Set(motos.map(m => m.province)));

    return (
        <div>
            <Head><title>Motos de Ocasión | El Motorista</title></Head>
            
            <div className={themeStyles.pageLayout}>
                {/* SIDEBAR FILTROS */}
                <aside className={themeStyles.sidebar}>
                    <div className={themeStyles.filterBlock}>
                        <h4>ESTADO</h4>
                        <div className={themeStyles.filterList}>
                            {['KM 0', 'Seminueva', 'Ocasión'].map(est => (
                                <label key={est}>
                                    <input type="checkbox" onChange={() => handleCheck(setEstados, estados, est)} /> {est}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className={themeStyles.filterBlock}>
                        <h4>MARCA</h4>
                        <div className={themeStyles.filterList}>
                            {marcasUnicas.map((marca: any) => (
                                <label key={marca}>
                                    <input type="checkbox" onChange={() => handleCheck(setMarcas, marcas, marca)} /> {marca}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className={themeStyles.filterBlock}>
                        <h4>MOTORIZACIÓN</h4>
                        <div className={themeStyles.filterList}>
                            {['Gasolina', 'Eléctrico'].map(mot => (
                                <label key={mot}>
                                    <input type="checkbox" onChange={() => handleCheck(setMotores, motores, mot)} /> {mot}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className={themeStyles.filterBlock}>
                        <h4>PROVINCIA</h4>
                        <div className={themeStyles.filterList}>
                            {provinciasUnicas.map((prov: any) => (
                                <label key={prov}>
                                    <input type="checkbox" onChange={() => handleCheck(setProvincias, provincias, prov)} /> {prov}
                                </label>
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
                    <div className={themeStyles.filterBlock}>
                        <h4>KILÓMETROS</h4>
                        <div className={themeStyles.rangeInputs}>
                            <input type="number" placeholder="Mín" value={minKms} onChange={e => setMinKms(e.target.value === '' ? '' : Number(e.target.value))} />
                            <span>-</span>
                            <input type="number" placeholder="Máx" value={maxKms} onChange={e => setMaxKms(e.target.value === '' ? '' : Number(e.target.value))} />
                        </div>
                    </div>
                </aside>

                {/* GRID DE RESULTADOS */}
                <section style={{flex: 1}}>
                    <div style={{marginBottom: '20px', fontSize: '14px', color: '#666'}}>
                        Mostrando {motosFiltradas.length} vehículos
                    </div>
                    <div className={themeStyles.productGrid}>
                        {motosFiltradas.map((moto) => (
                            <ProductCard 
                                key={moto.id} 
                                product={{
                                    id: moto.id, brand: moto.brand, name: moto.title, price: moto.price, 
                                    imageUrl: moto.thumbnail, type: moto.type, kms: moto.kms, year: moto.year, url: moto.url
                                }} 
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}