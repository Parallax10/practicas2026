import { useEffect } from "react";
import Head from 'next/head'; 
import { useAppSelector } from './store/hooks';
import { remoteLog } from './utils/logger';
import Motos from "./motos";
import Products from "./products";
import Catalogues from './catalogues';
import { config, themeStyles } from '../config/index';

export default function Home() {
    const usuario = useAppSelector((state) => state.user?.nombre);
    const siteConfig = config as any;

    useEffect(() => {
        remoteLog('info', `Acceso al sitio: ${siteConfig.siteName} por ${usuario || "Invitado"}`);
    }, [usuario, siteConfig.siteName]);

    return (
        <div className={themeStyles.contenedorPrincipal}>
            <Head>
                <title>{`Inicio | ${siteConfig.siteName}`}</title>
            </Head>

            <main className={themeStyles.layoutWrapper}>
                {siteConfig.enabledModules.includes("catalogues") && <Catalogues />}
                {siteConfig.enabledModules.includes("motos") && <Motos />}
                {siteConfig.enabledModules.includes("products") && <Products />}
            </main>
        </div>
    );
}