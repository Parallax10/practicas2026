"use client"
import { useEffect } from "react";
import Head from 'next/head'; 
import { useTranslation } from 'react-i18next';
// Ruta corregida: hooks.ts está en src/pages/store/hooks.ts
import { useAppSelector } from './store/hooks'; 
// Ruta corregida: logger.ts está en src/pages/utils/logger.ts
import { remoteLog } from './utils/logger'; 

// Componentes locales (están en la misma carpeta src/pages/)
import Motos from "./motos";
import Products from "./products";
import Catalogues from './catalogues';

// IMPORTACIÓN LÍNEA 14: Asegúrate de que el archivo exista en src/config/
import siteConfig from '../config/current_site_config.json'; 
// dynamicTheme.module.scss debe estar en src/styles/
import dynamicStyles from '../styles/dynamicTheme.module.scss';

export default function Home() {
    const { t } = useTranslation();
    const usuario = useAppSelector((state) => state.user?.nombre);
    
    // Verificación de seguridad para evitar errores si el JSON está vacío
    const siteName = siteConfig?.siteName || "El Motorista";
    const enabledModules = siteConfig?.enabledModules || [];

    useEffect(() => {
        const userLabel = usuario || "Invitado";
        remoteLog('info', `Usuario ${userLabel} accedió a la página de ${siteName}`);
    }, [siteName, usuario]);

    return (
        <div className={dynamicStyles.mainContainer}>
            <Head>
                <title>{`Inicio | ${siteName}`}</title>
            </Head>

            <main className={dynamicStyles.layoutWrapper}>
                {enabledModules.includes("catalogues") && <Catalogues />}
                {enabledModules.includes("motos") && <Motos />}
                {enabledModules.includes("products") && <Products />}
            </main>
        </div>
    );
}