import styles from "../styles/layout.module.scss";
import Navbar from './navbar';
import Footer from './footer';
import { getDynamicConfig } from "../config";

export default async function Layout({ children }) {
    
    const pagina = process.env.NEXT_PUBLIC_SITE_NAME;
    const config = await getDynamicConfig();

    return (
        <div className={`${styles.layout} ${config.themeClass}`}>
            <Navbar />
            <main className={styles.content}>{children}</main>
            <Footer />
        </div>
    );
}