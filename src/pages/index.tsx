"use client"
import { remoteLog } from './utils/logger';
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import Motos  from "./motos";
import Products from "./products";
import Catalogues from './catalogues';
import { useAppSelector } from './store/hooks';
export default function ejercicios() {
    const { t } = useTranslation();
    const pagina=process.env.NEXT_PUBLIC_SITE_NAME
    const usuario = useAppSelector((state) => state.user?.nombre);
    const [contador,setContador]=useState(0)
    const [cantidad,setCantidad]=useState(0)
    const [msegundos,setMsegundos]=useState(0)
    async function aumentar1(){
        setContador(contador+1)
        if (usuario) {
            await remoteLog('info', `Usuario ${usuario} incrementó el contador a ${contador + 1}`);
        } else {
            await remoteLog('info', `Usuario Invitado incrementó el contador a ${contador + 1}`);
        }
    }
    async function reducir1(){
        setContador(contador-1)
        if (usuario) {
            await remoteLog('info', `Usuario ${usuario} redujo el contador a ${contador - 1}`);
        } else {
            await remoteLog('info', `Usuario Invitado redujo el contador a ${contador - 1}`);
        }
    }
    async function sumar1msc(){
        setMsegundos(Number(Math.random()*(1000-2000)+2000))
        setTimeout(() => {aumentar1();}, msegundos);
        if (usuario) {
            await remoteLog('info', `Usuario ${usuario} programó un incremento del contador en ${msegundos} ms`);
        } else {
            await remoteLog('info', `Usuario Invitado programó un incremento del contador en ${msegundos} ms`);
        }

    }
    console.log("pagina:", pagina);
    if(pagina==="Intermoto"){
        if (usuario) {
            remoteLog('info', `Usuario ${usuario} accedió a la página de Intermoto`);
        } else {
            remoteLog('info', `Usuario Invitado accedió a la página de Intermoto`);
        }
        return (
            <div>
                <title>Inicio | Intermoto</title>
                <Products></Products>
            </div>);
        
    }else if(pagina==="MotoSergio"){
        if (usuario) {
            remoteLog('info', `Usuario ${usuario} accedió a la página de MotoSergio`);
        } else {
            remoteLog('info', `Usuario Invitado accedió a la página de MotoSergio`);
        }
        return (
            <div>
                <title>Inicio | Moto Sergio</title>
                <Catalogues></Catalogues>
            </div>);
    }
    else if(pagina==="LolaMoto"){
        if (usuario) {
            remoteLog('info', `Usuario ${usuario} accedió a la página de Lola Moto`);
        } else {
            remoteLog('info', `Usuario Invitado accedió a la página de Lola Moto`);
        }
        return (
            <div>
                <title>Inicio | Lola Moto</title>
                <Motos></Motos>
            </div>);
    }else if(pagina==="El Motorista"){
        if (usuario) {
            remoteLog('info', `Usuario ${usuario} accedió a la página de El Motorista`);
        } else {
            remoteLog('info', `Usuario Invitado accedió a la página de El Motorista`);
        }
        return (
            <div>
                <title>Inicio | El Motorista</title>
                <p>{t("contador_texto", { valor: contador })}</p>
                <button onClick={()=>aumentar1()}>+1</button>
                <button onClick={()=>reducir1()}>-1</button>
                <br/>
                <input value={cantidad} type="number" onChange={(e)=>setCantidad(Number(e.target.value))} onKeyDown={(e) => 
                {if (e.key === "Enter")
                    {setContador(contador+cantidad)}
                }}>
                </input>
                <br/>
                <button onClick={()=> sumar1msc()}>+1 Async</button>
            </div>);
    }
}
