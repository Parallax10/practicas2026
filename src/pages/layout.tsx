import styles from "../styles/layout.module.scss";
import Navbar from './navbar';
import Footer from './footer';


export default  function Layout({ children, config }) {
    const pagina = process.env.NEXT_PUBLIC_SITE_NAME;

    return (
        <div className={`${styles.layout} ${config?.themeClass || ''}`}>
            <Navbar />
            <main className={styles.content}>{children}</main>
            <Footer />
        </div>
    );
}