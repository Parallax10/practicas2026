"use client"
import { useEffect, useState } from "react";
import Head from 'next/head'; 
import { config, themeStyles } from '../config/index';
import Navbar from '../components/Navbar';

export default function Home() {
    const [motos, setMotos] = useState<any[]>([]);
    const siteConfig = config as any;

    useEffect(() => {
        fetch('/api/motos').then(res => res.json()).then(setMotos);
    }, []);

    return (
        <div className={themeStyles.mainContainer}>
            <Head><title>Motos Ocasión | El Motorista</title></Head>
            <Navbar />
            
            <div className={themeStyles.pageLayout}>
                {/* SIDEBAR CON TODOS LOS FILTROS */}
                <aside className={themeStyles.sidebar}>
                    <div className={themeStyles.filterBlock}>
                        <h4>ESTADO</h4>
                        <label><input type="checkbox"/> Seminuevas</label>
                        <label><input type="checkbox"/> Kilómetro 0</label>
                    </div>
                    <div className={themeStyles.filterBlock}>
                        <h4>MOTORIZACIÓN</h4>
                        <label><input type="checkbox"/> Gasolina</label>
                        <label><input type="checkbox"/> Eléctrico</label>
                    </div>
                    <div className={themeStyles.filterBlock}>
                        <h4>CARNET / LICENCIA</h4>
                        <label><input type="checkbox"/> AM (Ciclomotor)</label>
                        <label><input type="checkbox"/> A1 / B (125cc)</label>
                        <label><input type="checkbox"/> A2</label>
                    </div>
                </aside>

                {/* GRID DE PRODUCTOS (DATOS DE API MOTOS.TS) */}
                <section className={themeStyles.productGrid}>
                    {motos.map((moto) => (
                        <div key={moto.id} className={themeStyles.card}>
                            <div className={themeStyles.imgBox}>
                                <img src={moto.thumbnail} alt={moto.title} />
                            </div>
                            <div style={{fontSize: '11px', color: '#999'}}>{moto.type}</div>
                            <h3 style={{fontSize: '14px', margin: '10px 0', height: '40px'}}>{moto.title}</h3>
                            <div className={themeStyles.price}>{moto.price.toLocaleString()} €</div>
                            <button className={themeStyles.btn}>Ver Vehículo</button>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}