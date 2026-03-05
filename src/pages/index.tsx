"use client"
import { useEffect } from "react";
import Head from 'next/head'; 
import { useTranslation } from 'react-i18next';
import { useAppSelector } from './store/hooks';
import { remoteLog } from './utils/logger';

// Componentes de la tienda
import Motos from "./motos";
import Products from "./products";
import Catalogues from './catalogues';

// Importamos el archivo de configuración generado por tu script de Handlebars
// Nota: Este archivo se creará automáticamente al ejecutar 'npm run dev'
import siteConfig from '../config/current_site_config.json'; 
import dynamicStyles from '../styles/dynamicTheme.module.scss';

export default function Home() {
    const { t } = useTranslation();
    const usuario = useAppSelector((state) => state.user?.nombre);
    
    // El nombre del sitio ahora viene del JSON generado
    const siteName = siteConfig.siteName || "El Motorista";

    useEffect(() => {
        const userLabel = usuario || "Invitado";
        remoteLog('info', `Usuario ${userLabel} accedió a la página de ${siteName}`);
    }, [siteName, usuario]);

    return (
        <div className={dynamicStyles.mainContainer}>
            <Head>
                <title>{`Inicio | ${siteName}`}</title>
            </Head>

            {/* Layout dinámico basado en módulos habilitados en el JSON */}
            <main className={dynamicStyles.layoutWrapper}>
                
                {siteConfig.enabledModules.includes("catalogues") && (
                    <section className={dynamicStyles.section}>
                        <Catalogues />
                    </section>
                )}

                {siteConfig.enabledModules.includes("motos") && (
                    <section className={dynamicStyles.section}>
                        <Motos />
                    </section>
                )}

                {siteConfig.enabledModules.includes("products") && (
                    <section className={dynamicStyles.section}>
                        <Products />
                    </section>
                )}
                
            </main>
        </div>
    );
}