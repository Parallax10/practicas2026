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
                        // Asignamos la primera imagen o el thumbnail por defecto
                        setMainImg(data[0].images?.[0] || data[0].thumbnail);
                    }
                })
                .catch(err => console.error("Error cargando moto:", err));
        }
    }, [url]);

    if (!moto) {
        return (
            <div className={themeStyles.detailsPage} style={{ textAlign: 'center', padding: '100px 0' }}>
                <h2>Cargando información del vehículo...</h2>
            </div>
        );
    }

    // Usamos el array de imágenes si lo hay, o un array de 1 con el thumbnail
    const imageList = moto.images?.length > 0 ? moto.images : [moto.thumbnail];

    return (
        <div className={themeStyles.detailsPage}>
            <Head>
                <title>{moto.title} | El Motorista</title>
            </Head>

            {/* BREADCRUMBS */}
            <div className={themeStyles.breadcrumb}>
                <Link href="/">Inicio</Link> <span>/</span> 
                <Link href="/">Motos de Ocasión</Link> <span>/</span> 
                <Link href="/">{moto.brand}</Link> <span>/</span> 
                {moto.title}
            </div>

            <div className={themeStyles.detailsLayout}>
                {/* COLUMNA IZQUIERDA: GALERÍA DE IMÁGENES */}
                <div className={themeStyles.gallerySection}>
                    <div className={themeStyles.mainImage}>
                        <img src={mainImg} alt={moto.title} />
                    </div>
                    <div className={themeStyles.thumbnailRow}>
                        {imageList.map((img: string, idx: number) => (
                            <img 
                                key={idx} 
                                src={img} 
                                alt={`Vista ${idx + 1}`} 
                                className={mainImg === img ? themeStyles.active : ''}
                                onClick={() => setMainImg(img)}
                            />
                        ))}
                    </div>
                </div>

                {/* COLUMNA DERECHA: INFORMACIÓN Y COMPRA */}
                <div className={themeStyles.infoSection}>
                    <span className={themeStyles.brandTag}>{moto.type} • {moto.brand}</span>
                    <h1 className={themeStyles.motoTitle}>{moto.title}</h1>

                    <div className={themeStyles.priceBox}>
                        <div className={themeStyles.priceVal}>{moto.price.toLocaleString('es-ES')} €</div>
                        <span className={themeStyles.priceNote}>IVA incluido. Gastos de matriculación y transferencia no incluidos.</span>
                    </div>

                    {/* CUADRÍCULA DE ATRIBUTOS ESTILO EL MOTORISTA */}
                    <div className={themeStyles.attributesGrid}>
                        <div className={themeStyles.attrItem}>
                            <span className={themeStyles.attrLabel}>Año de matriculación</span>
                            <span className={themeStyles.attrVal}>{moto.year}</span>
                        </div>
                        <div className={themeStyles.attrItem}>
                            <span className={themeStyles.attrLabel}>Kilometraje</span>
                            <span className={themeStyles.attrVal}>{moto.kms.toLocaleString('es-ES')} km</span>
                        </div>
                        <div className={themeStyles.attrItem}>
                            <span className={themeStyles.attrLabel}>Motorización</span>
                            <span className={themeStyles.attrVal}>{moto.engine}</span>
                        </div>
                        <div className={themeStyles.attrItem}>
                            <span className={themeStyles.attrLabel}>Carnet Compatible</span>
                            <span className={themeStyles.attrVal}>{moto.license}</span>
                        </div>
                        <div className={themeStyles.attrItem}>
                            <span className={themeStyles.attrLabel}>Ubicación actual</span>
                            <span className={themeStyles.attrVal}>{moto.province}</span>
                        </div>
                        <div className={themeStyles.attrItem}>
                            <span className={themeStyles.attrLabel}>Garantía</span>
                            <span className={themeStyles.attrVal}>12 Meses Oficial</span>
                        </div>
                    </div>

                    {/* BOTONES DE ACCIÓN */}
                    <div className={themeStyles.ctaGroup}>
                        <button className={themeStyles.btnPrimary} onClick={() => alert("Formulario de contacto...")}>
                            Me Interesa
                        </button>
                        <button className={themeStyles.btnSecondary} onClick={() => alert("Simulador de cuotas...")}>
                            Calcular Financiación
                        </button>
                    </div>
                    
                    <div style={{ marginTop: '20px', fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                        <p><strong>¿Dudas con este vehículo?</strong> Llama a nuestro departamento de vehículos de ocasión o visita nuestra tienda en {moto.province} para verla en persona. Posibilidad de envío a toda la península.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}