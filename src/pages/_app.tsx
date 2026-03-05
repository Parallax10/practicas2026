import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { setHydratedState } from './store/slices/shopSlice';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { config } from '../config/index';
import Layout from './layout';
import '../styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const siteConfig = config as any;
    const [authorized, setAuthorized] = useState(false);

    // NUEVO: Recuperar el estado al cargar la página por primera vez
    useEffect(() => {
        const savedState = localStorage.getItem('miTiendaState');
        if (savedState) {
            store.dispatch(setHydratedState(JSON.parse(savedState)));
        }
    }, []);

    // CONTROL DE ACCESO (Permisos por Tienda)
    useEffect(() => {
        const path = router.pathname;
        const allowedPages = siteConfig?.allowedPages || ['*'];
        const commonPages = ['/login', '/cart', '/favorites', '/_error', '/404'];

        if (allowedPages[0] === '*' || commonPages.includes(path)) {
            setAuthorized(true);
            return;
        }

        const isAllowed = allowedPages.some((p: string) => {
            if (p.includes('[url]')) {
                const base = p.split('/[url]')[0];
                return path.startsWith(base);
            }
            return p === path;
        });

        if (!isAllowed) {
            setAuthorized(false);
            const fallback = allowedPages[0].replace('/[url]', '');
            router.push(fallback);
        } else {
            setAuthorized(true);
        }
    }, [router.pathname, siteConfig]);

    return (
        <Provider store={store}>
            <Layout>
                {authorized && <Component {...pageProps} />}
            </Layout>
        </Provider>
    );
}