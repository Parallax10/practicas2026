import styles from "../styles/footer.module.scss";
export default function Footer({ config }) {
return (
<footer className={`${styles.foot} ${config?.themeClass || ''}`}>
    <p className={styles.texto}>Copyright © 2025 Desarrollada por Sofgesa S.L</p>
</footer>
);
}