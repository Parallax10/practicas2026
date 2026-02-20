import ErrorPage from './404';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react'; 
import { remoteLog } from './utils/logger';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store/store';
import "../i18n";
import "../styles/globals.scss";
import Layout from "./layout";
import persistStore from 'redux-persist/lib/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import { getDynamicConfig, AppConfig } from '../config/index'; 

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const storeRef = useRef<AppStore>(null);
  const persistorRef = useRef<any>(null);
  
  const [config, setConfig] = useState<AppConfig | null>(null);
  useEffect(() => {
    getDynamicConfig().then(res => setConfig(res));
    const handleRouteChange = (url: string) => {
      remoteLog('info', `Cambiando de pagina a ${url}`);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  if (!storeRef.current) {
    const storeInstance = makeStore();
    storeRef.current = storeInstance;
    persistorRef.current = persistStore(storeInstance);
  }

  if (!config) return null; 

  const allAllowed = config.allowedPages?.includes("*") || false;
  const isAllowed = config.allowedPages?.includes(router.pathname);

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        <div className={config.themeClass}>
          {/*configuracion del estilo*/}
          <Layout config={config}>
            {isAllowed || allAllowed ? (
              <Component {...pageProps} />
            ) : (
              <ErrorPage/>
            )}
          </Layout>
        </div>
      </PersistGate>
    </Provider>
  );
}