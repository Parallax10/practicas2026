"use client"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { themeStyles, config } from '../../config/index';

export default function DetallesMoto() {
    const siteConfig = config as any;
    const styleId = siteConfig?.styles?.details || '1';

    const router = useRouter();
    const { url } = router.query;
    const [moto, setMoto] = useState<any>(null);
    const [mainImg, setMainImg] = useState<string>('');

    useEffect(() => {
        if (url) {
            fetch(`/api/motos?url=${url}`).then(res => res.json()).then(data => {
                if (data && data.length > 0) { setMoto(data[0]); setMainImg(data[0].images?.[0] || data[0].thumbnail); }
            });
        }
    }, [url]);

    if (!moto) return <div style={{textAlign: 'center', padding: '100px'}}>Cargando vehículo...</div>;
    const imageList = moto.images?.length > 0 ? moto.images : [moto.thumbnail];

    if (styleId === '2') {
        return (
            <div className={themeStyles.detailsPage}>
                <Head><title>{moto.title} | {siteConfig?.siteName}</title></Head>
                <div className={themeStyles.breadcrumb}><Link href="/">Volver al catálogo</Link></div>
                <div className={themeStyles.detailsGrid}>
                    <div className={themeStyles.gallery}>
                        {imageList.map((img: string, idx: number) => <img key={idx} src={img} alt={`Vista ${idx}`} />)}
                    </div>
                    <div className={themeStyles.infoBox}>
                        <span className={themeStyles.stateLabel} style={{background:'#000', color:'#fff', padding:'5px', borderRadius:'4px'}}>{moto.type}</span>
                        <h1 className={themeStyles.titleDetail}>{moto.title}</h1>
                        <div className={themeStyles.priceDetail}>{moto.price.toLocaleString('es-ES')} €</div>
                        <div className={themeStyles.attributes}>
                            <div><span>Año</span><strong>{moto.year}</strong></div>
                            <div><span>KM</span><strong>{moto.kms}</strong></div>
                            <div><span>Motor</span><strong>{moto.engine}</strong></div>
                            <div><span>Provincia</span><strong>{moto.province}</strong></div>
                        </div>
                        <button className={themeStyles.contactBtn}>Solicitar Información</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={themeStyles.detailsPage}>
            <Head><title>{moto.title} | {siteConfig?.siteName}</title></Head>
            <div className={themeStyles.breadcrumb}>
                <Link href="/">Inicio</Link> <span>/</span> <Link href="/">Motos {moto.type}</Link> <span>/</span> {moto.brand}
            </div>
            <div className={themeStyles.detailsGrid}>
                <div className={themeStyles.gallery}>
                    <div className={themeStyles.mainImg}><img src={mainImg} alt={moto.title} /></div>
                    <div className={themeStyles.thumbs}>
                        {imageList.map((img: string, idx: number) => (
                            <img key={idx} src={img} alt="thumb" className={mainImg === img ? themeStyles.active : ''} onClick={() => setMainImg(img)} />
                        ))}
                    </div>
                </div>
                <div className={themeStyles.infoBox}>
                    <span className={themeStyles.stateLabel}>{moto.type}</span>
                    <h1 className={themeStyles.titleDetail}>{moto.title}</h1>
                    <div className={themeStyles.priceDetail}>{moto.price.toLocaleString('es-ES')} €</div>
                    <span className={themeStyles.taxInfo}>IVA incluido. Gastos de matriculación no incluidos.</span>
                    <div className={themeStyles.attributes}>
                        <div><span>Año</span><strong>{moto.year}</strong></div>
                        <div><span>Kilómetros</span><strong>{moto.kms.toLocaleString('es-ES')} kms</strong></div>
                        <div><span>Motorización</span><strong>{moto.engine}</strong></div>
                        <div><span>Carnet</span><strong>{moto.license}</strong></div>
                        <div><span>Provincia</span><strong>{moto.province}</strong></div>
                        <div><span>Garantía</span><strong>12 Meses</strong></div>
                    </div>
                    <button className={themeStyles.contactBtn}>Me Interesa</button>
                    <div className={themeStyles.financing}><button>Calcular Financiación</button></div>
                </div>
            </div>
        </div>
    );
}