// src/pages/layout.tsx
import React, { ReactNode } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { themeStyles, config } from "../config/index";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const siteConfig = config as any;

  return (
    <>
      <Head>
        <title>{siteConfig?.siteName || "Cargando..."}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      {/* Usamos la clase contenedor Principal generada por Handlebars */}
      <div className={themeStyles.mainWrapper}>
        <Navbar />
        
        <div className={themeStyles.mainContent}>
            {children}
        </div>

        <Footer />
      </div>
    </>
  );
}