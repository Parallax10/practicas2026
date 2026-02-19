import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react";
import styles from "../styles/navbar.module.scss";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from './store/hooks';
import { logout } from './store/slices/userSlice';
import { remoteLog } from './utils/logger';
export default function Navbar() {
    const usuario = useAppSelector((state) => state.user?.nombre);
    const { t, i18n } = useTranslation();
    const cambiarIdioma = (lenguaje) => {
        if (usuario) {
            remoteLog(`info`, `${usuario} ha cambiado el idioma a ${lenguaje}`);
        }
        else {
            remoteLog(`info`, `Usuario invitado ha cambiado el idioma a ${lenguaje}`);
        }
        i18n.changeLanguage(lenguaje);
    };
    const dispatch = useAppDispatch();
    function cerrarSesion(){
        dispatch(logout());
    }
return (
<div className={styles.cont}>
    <Link href={"http://localhost:3000/"}>
        <img className={styles.imagen} src="https://elmotorista.net/wp-content/uploads/sites/21/2023/09/logo-.png" width={130}></img>
    </Link>
    <p className={styles.text}>El Motorista</p>
    <Link href={"http://localhost:3000/catalogues"} className={styles.link}>{t("catalogo")}</Link>
    {usuario ? <div><p className={styles.text}>Hola: {usuario}</p> <button onClick={()=>cerrarSesion()}>Cerrar Sesión</button></div>
    :<Link href={"http://localhost:3000/login"} className={styles.link}>{t("inicioSesion")}</Link>}
    <button 
        onClick={() => cambiarIdioma('es')}
        className={i18n.language === 'es' ? styles.active : styles.btn}
        >
        ES
        </button>
        
        <button 
        onClick={() => cambiarIdioma('en')}
        className={i18n.language === 'en' ? styles.active : styles.btn}
        >
        EN
        </button>
</div>
);
}