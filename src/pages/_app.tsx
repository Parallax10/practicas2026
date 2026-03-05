"use client"
import { useRouter } from 'next/router';
import { useRef } from 'react'; 
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store/store';
import persistStore from 'redux-persist/lib/persistStore';
import { PersistGate } from 'redux-persist/integration/react';

// LINEA 11 CORREGIDA: Importamos desde la ruta correcta donde el script genera el index
import { config, themeStyles } from '../config/index';

import Layout from "./layout";
import "../i18n";
import "../styles/globals.scss";

// Importamos los estilos dinámicos para asegurar que se carguen en el bundle
import "../styles/dynamicTheme.module.scss"; 

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const storeRef = useRef<AppStore>(null);
  const persistorRef = useRef<any>(null);

  if (!storeRef.current) {
    const storeInstance = makeStore();
    storeRef.current = storeInstance;
    persistorRef.current = persistStore(storeInstance);
  }

  // Verificación de seguridad por si config o allowedPages son undefined
  const allowedPages = config?.allowedPages || ["*"];
  const allAllowed = allowedPages.includes("*");
  const isAllowed = allowedPages.includes(router.pathname);

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {/* Usamos el nombre de clase generado dinámicamente */}
        <div className={themeStyles?.contenedorPrincipal || 'main-container'}>
          <Layout>
            {isAllowed || allAllowed ? (
              <Component {...pageProps} />
            ) : (
              <div style={{ padding: '50px', textAlign: 'center' }}>
                <h1>Acceso no permitido</h1>
                <p>Esta página no está habilitada para el perfil actual.</p>
              </div>
            )}
          </Layout>
        </div>
      </PersistGate>
    </Provider>
  );
}