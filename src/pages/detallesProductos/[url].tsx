"use client"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addToCart, toggleFavorite } from '../store/slices/shopSlice';
import { themeStyles, config } from '../../config/index';

export default function DetallesProducto() {
    const siteConfig = config as any;
    const styleId = siteConfig?.styles?.details || '1';

    const router = useRouter();
    const { url } = router.query;
    const [prod, setProd] = useState<any>(null);
    const [mainImg, setMainImg] = useState<string>('');
    const [selectedSize, setSelectedSize] = useState<string>('');

    // REDUX LOGIC
    const dispatch = useDispatch();
    const { isLoggedIn, favorites } = useSelector((state: RootState) => state.shop);
    const isFav = (favorites[siteConfig.siteName] || []).some((i: any) => i.id === prod?.id);

    const handleAddToCart = () => {
        if (!isLoggedIn) return alert("Por favor, inicia sesión para añadir al carrito.");
        if (!selectedSize) return alert("Debes seleccionar una talla antes de añadir a la cesta.");
        
        // Despachamos al carrito pero YA NO mostramos el alert() de éxito
        dispatch(addToCart({ site: siteConfig.siteName, product: { ...prod, selectedSize } }));
    };

    const handleFav = () => {
        if (!isLoggedIn) return alert("Inicia sesión para añadir a favoritos.");
        dispatch(toggleFavorite({ site: siteConfig.siteName, product: prod }));
    };

    useEffect(() => {
        if (url) {
            fetch(`/api/products?url=${url}`).then(res => res.json()).then(data => {
                if (data && data.length > 0) { setProd(data[0]); setMainImg(data[0].images?.[0] || data[0].thumbnail); }
            });
        }
    }, [url]);

    if (!prod) return <div style={{textAlign: 'center', padding: '100px'}}>Cargando artículo...</div>;
    const imageList = prod.images?.length > 0 ? prod.images : [prod.thumbnail];

    const TallasBlock = () => (
        <div className={themeStyles.sizeSelector}>
            <h4>Selecciona tu talla:</h4>
            <div className={themeStyles.sizeGrid}>
                {prod.sizes.map((talla: string) => (
                    <div key={talla} className={`${themeStyles.sizePill} ${selectedSize === talla ? themeStyles.selected : ''}`} onClick={() => setSelectedSize(talla)}>
                        {talla}
                    </div>
                ))}
            </div>
        </div>
    );

    if (styleId === '2') {
        return (
            <div className={themeStyles.detailsPage_2}>
                <Head><title>{prod.name} | {siteConfig?.siteName}</title></Head>
                <div className={themeStyles.breadcrumb_2}><Link href="/products">Volver a la tienda</Link></div>
                <div className={themeStyles.detailsGrid_2}>
                    <div className={themeStyles.gallery_2}>
                        {imageList.map((img: string, idx: number) => <img key={idx} src={img} alt={`Vista ${idx}`} />)}
                    </div>
                    <div className={themeStyles.infoBox_2}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <span style={{fontSize: '12px', color: '#888', textTransform: 'uppercase'}}>{prod.brand}</span>
                            <span style={{cursor:'pointer', fontSize:'24px'}} onClick={handleFav}>{isFav ? '❤️' : '🤍'}</span>
                        </div>
                        <h1 className={themeStyles.titleDetail}>{prod.name}</h1>
                        <div className={themeStyles.priceDetail}>{prod.price.toLocaleString('es-ES')} €</div>
                        <TallasBlock />
                        
                        {/* Botón con el evento correcto y sin alertas de éxito */}
                        <button className={themeStyles.contactBtn} onClick={handleAddToCart}>
                            Añadir a la Cesta
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ESTILO 1: RÉPLICA EL MOTORISTA
    return (
        <div className={themeStyles.detailsPage_1}>
            <Head><title>{prod.name} | {siteConfig?.siteName}</title></Head>
            <div className={themeStyles.breadcrumb_1}>
                <Link href="/">Inicio</Link> <span>/</span> <Link href="/products">{prod.category}</Link> <span>/</span> {prod.brand}
            </div>
            <div className={themeStyles.detailsGrid_1}>
                <div className={themeStyles.gallery_1}>
                    <div className={themeStyles.mainImg}><img src={mainImg} alt={prod.name} /></div>
                    {imageList.length > 1 && (
                        <div className={themeStyles.thumbs}>
                            {imageList.map((img: string, idx: number) => (
                                <img key={idx} src={img} alt="thumb" className={mainImg === img ? themeStyles.active : ''} onClick={() => setMainImg(img)} />
                            ))}
                        </div>
                    )}
                </div>
                <div className={themeStyles.infoBox_1}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                        <span className={themeStyles.stateLabel} style={{background: '#888', margin: 0}}>{prod.category}</span>
                        <span style={{cursor:'pointer', fontSize:'24px'}} onClick={handleFav}>{isFav ? '❤️' : '🤍'}</span>
                    </div>
                    
                    <h1 className={themeStyles.titleDetail} style={{fontSize: '26px'}}>{prod.name}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '5px' }}>
                        <div className={themeStyles.priceDetail}>{prod.price.toLocaleString('es-ES')} €</div>
                        {prod.oldPrice && <div style={{ textDecoration: 'line-through', color: '#999', fontSize: '20px' }}>{prod.oldPrice.toLocaleString('es-ES')} €</div>}
                    </div>
                    <span className={themeStyles.taxInfo}>IVA incluido. Envío gratis a partir de 50€.</span>
                    
                    <TallasBlock />
                    
                    {/* Botón con el evento correcto y sin alertas de éxito */}
                    <button className={themeStyles.contactBtn} onClick={handleAddToCart}>
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