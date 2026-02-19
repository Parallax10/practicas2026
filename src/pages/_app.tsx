import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { remoteLog } from './utils/logger';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { useRef } from 'react';
import { makeStore, AppStore} from './store/store';
import "../i18n";
import "../styles/globals.scss";
import Layout from "./layout";
import persistStore from 'redux-persist/lib/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
export default function App({ Component, pageProps }: AppProps) {
  const storeRef = useRef<AppStore>(null);
  const persistorRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
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

  return (
      <Provider store={storeRef.current}>
        <PersistGate loading={null} persistor={persistorRef.current}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
  );
}