import { useRouter } from 'next/router';
import { useRef } from 'react'; 
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store/store';
import persistStore from 'redux-persist/lib/persistStore';
import { PersistGate } from 'redux-persist/integration/react';

// Importaciones dinámicas generadas
import { config, themeStyles } from '../config/index';
import ErrorPage from './404';
import Layout from "./layout";
import "../i18n";
import "../styles/globals.scss";
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

  // Casting a 'any' para evitar el error de propiedad inexistente en el tipado automático del JSON
  const siteConfig = config as any;
  const allowedPages = siteConfig?.allowedPages || ["*"];
  const isAllowed = allowedPages.includes("*") || allowedPages.includes(router.pathname);

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        <div className={themeStyles?.contenedorPrincipal}>
          <Layout>
            {isAllowed ? <Component {...pageProps} /> : <ErrorPage />}
          </Layout>
        </div>
      </PersistGate>
    </Provider>
  );
}