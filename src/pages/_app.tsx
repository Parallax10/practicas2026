import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { makeStore } from './store/store';
import { config, themeStyles } from '../config/index';
import Layout from "./layout";
import ErrorPage from './404';
import "../styles/globals.scss";
import styles from "../styles/dynamicTheme.module.scss"; 

const store = makeStore();

export default function App({ Component, pageProps }: AppProps) {
  const siteConfig = config as any;
  const allowedPages = siteConfig?.allowedPages || ["*"];
  const isAllowed = allowedPages.includes("*");

  return (
    <Provider store={store}>
        <div className={themeStyles.contenedorPrincipal}>
          <Layout>
            {isAllowed ? <Component {...pageProps} /> : <ErrorPage />}
          </Layout>
        </div>
    </Provider>
  );
}