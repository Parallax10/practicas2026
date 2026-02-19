import styles from "../styles/layout.module.scss";
import Navbar from './navbar';
import Footer from './footer';

export default function Layout({ children }) {
    const pagina=process.env.NEXT_PUBLIC_SITE_NAME ;
    const siteClass = `site-${pagina.replace(/\s+/g, '')}`;
return (
<div className={`${styles.layout} ${siteClass}`}>
    <Navbar />
    <main className={styles.content}>{children}</main>
    <Footer />
</div>
);
}
