"use client"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { themeStyles } from '../../config/index';

export default function DetallesProducto() {
    const router = useRouter();
    const { url } = router.query;
    const [prod, setProd] = useState<any>(null);
    const [mainImg, setMainImg] = useState<string>('');
    const [selectedSize, setSelectedSize] = useState<string>('');

    useEffect(() => {
        if (url) {
            fetch(`/api/products?url=${url}`)
                .then(res => res.json())
                .then(data => {
                    if (data && data.length > 0) {
                        setProd(data[0]);
                        setMainImg(data[0].images?.[0] || data[0].thumbnail);
                    }
                });
        }
    }, [url]);

    if (!prod) return <div style={{textAlign: 'center', padding: '100px'}}>Cargando artículo...</div>;

    const imageList = prod.images?.length > 0 ? prod.images : [prod.thumbnail];

    return (
        <div className={themeStyles.detailsPage}>
            <Head><title>{prod.name} | El Motorista</title></Head>

            <div className={themeStyles.breadcrumb}>
                <Link href="/">Inicio</Link> <span>/</span> <Link href="/products">{prod.category}</Link> <span>/</span> {prod.brand}
            </div>

            <div className={themeStyles.detailsGrid}>
                {/* COLUMNA IZQUIERDA: GALERÍA */}
                <div className={themeStyles.gallery}>
                    <div className={themeStyles.mainImg}>
                        <img src={mainImg} alt={prod.name} />
                    </div>
                    {imageList.length > 1 && (
                        <div className={themeStyles.thumbs}>
                            {imageList.map((img: string, idx: number) => (
                                <img 
                                    key={idx} src={img} alt={`Vista ${idx + 1}`} 
                                    className={mainImg === img ? themeStyles.active : ''}
                                    onClick={() => setMainImg(img)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* COLUMNA DERECHA: INFO, TALLAS Y COMPRA */}
                <div className={themeStyles.infoBox}>
                    <span className={themeStyles.stateLabel} style={{background: '#888'}}>{prod.category}</span>
                    <h1 className={themeStyles.titleDetail} style={{fontSize: '26px'}}>{prod.name}</h1>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '5px' }}>
                        <div className={themeStyles.priceDetail}>{prod.price.toLocaleString('es-ES')} €</div>
                        {prod.oldPrice && <div style={{ textDecoration: 'line-through', color: '#999', fontSize: '20px' }}>{prod.oldPrice.toLocaleString('es-ES')} €</div>}
                    </div>
                    <span className={themeStyles.taxInfo}>IVA incluido. Envío gratis a partir de 50€.</span>

                    {/* SELECTOR DE TALLAS */}
                    <div className={themeStyles.sizeSelector}>
                        <h4>Selecciona tu talla:</h4>
                        <div className={themeStyles.sizeGrid}>
                            {prod.sizes.map((talla: string) => (
                                <div 
                                    key={talla} 
                                    className={`${themeStyles.sizePill} ${selectedSize === talla ? themeStyles.selected : ''}`}
                                    onClick={() => setSelectedSize(talla)}
                                >
                                    {talla}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button 
                        className={themeStyles.contactBtn} 
                        onClick={() => selectedSize ? alert(`Añadido a la cesta: ${prod.name} (Talla ${selectedSize})`) : alert("Por favor, selecciona una talla primero.")}
                    >
                        Añadir a la Cesta
                    </button>
                    
                    <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px', fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                        <p><strong>Devoluciones gratuitas</strong> en Península durante los primeros 30 días.</p>
                        <p>Entrega estimada en 24/48 horas laborables.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}