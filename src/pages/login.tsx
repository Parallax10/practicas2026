import React, { useState } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { login, logout } from './store/slices/shopSlice';
import { themeStyles } from '../config/index';

export default function Login() {
    const dispatch = useDispatch();
    const { isLoggedIn, currentUser } = useSelector((state: RootState) => state.shop);
    const [user, setUser] = useState('');

    return (
        <div className={themeStyles.authPage}>
            <Head><title>Mi Cuenta</title></Head>
            <div className={themeStyles.authBox}>
                {isLoggedIn ? (
                    <>
                        <h2>Bienvenido, {currentUser}</h2>
                        <p>Ya tienes acceso a tu carrito y favoritos.</p>
                        <button className={themeStyles.contactBtn} onClick={() => dispatch(logout())}>Cerrar Sesión</button>
                    </>
                ) : (
                    <>
                        <h2>Iniciar Sesión</h2>
                        <input type="text" placeholder="Nombre de usuario" value={user} onChange={e => setUser(e.target.value)} />
                        <input type="password" placeholder="Contraseña" />
                        <button className={themeStyles.contactBtn} onClick={() => { if(user) dispatch(login(user)); }}>Acceder</button>
                    </>
                )}
            </div>
        </div>
    );
}