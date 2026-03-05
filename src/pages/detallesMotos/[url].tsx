"use client"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { themeStyles } from '../../config/index';

export default function DetallesMoto() {
    const router = useRouter();
    const { url } = router.query;
    const [moto, setMoto] = useState<any>(null);
    const [mainImg, setMainImg] = useState<string>('');

    useEffect(() => {
        if (url) {
            fetch(`/api/motos?url=${url}`)
                .then(res => res.json())
                .then(data => {
                    if (data && data.length > 0) {
                        setMoto(data[0]);
                        setMainImg(data[0].images?.[0] || data[0].thumbnail);
                    }
                });
        }
    }, [url]);

    if (!moto) return <div style={{textAlign: 'center', padding: '100px'}}>Cargando vehículo...</div>;

    const imageList = moto.images?.length > 0 ? moto.images : [moto.thumbnail];

    return (
        <div className={themeStyles.detailsPage}>
            <Head><title>{moto.title} | El Motorista</title></Head>

            <div className={themeStyles.breadcrumb}>
                <Link href="/">Inicio</Link> <span>/</span> <Link href="/">Motos {moto.type}</Link> <span>/</span> {moto.brand}
            </div>

            <div className={themeStyles.detailsGrid}>
                {/* COLUMNA IZQUIERDA: GALERÍA */}
                <div className={themeStyles.gallery}>
                    <div className={themeStyles.mainImg}>
                        <img src={mainImg} alt={moto.title} />
                    </div>
                    <div className={themeStyles.thumbs}>
                        {imageList.map((img: string, idx: number) => (
                            <img 
                                key={idx} src={img} alt={`Vista ${idx + 1}`} 
                                className={mainImg === img ? themeStyles.active : ''}
                                onClick={() => setMainImg(img)}
                            />
                        ))}
                    </div>
                </div>

                {/* COLUMNA DERECHA: INFO Y PRECIO */}
                <div className={themeStyles.infoBox}>
                    <span className={themeStyles.stateLabel}>{moto.type}</span>
                    <h1 className={themeStyles.titleDetail}>{moto.title}</h1>
                    
                    <div className={themeStyles.priceDetail}>{moto.price.toLocaleString('es-ES')} €</div>
                    <span className={themeStyles.taxInfo}>IVA incluido. Gastos de matriculación y transferencia no incluidos.</span>

                    <div className={themeStyles.attributes}>
                        <div><span>Año</span><strong>{moto.year}</strong></div>
                        <div><span>Kilómetros</span><strong>{moto.kms.toLocaleString('es-ES')} kms</strong></div>
                        <div><span>Motorización</span><strong>{moto.engine}</strong></div>
                        <div><span>Carnet</span><strong>{moto.license}</strong></div>
                        <div><span>Provincia</span><strong>{moto.province}</strong></div>
                        <div><span>Garantía</span><strong>12 Meses</strong></div>
                    </div>

                    <button className={themeStyles.contactBtn}>Me Interesa</button>
                    
                    <div className={themeStyles.financing}>
                        <button>Calcular Financiación</button>
                    </div>
                </div>
            </div>
        </div>
    );
}