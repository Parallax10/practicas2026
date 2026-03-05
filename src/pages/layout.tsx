import React, { ReactNode } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { config } from "../config/index";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const siteConfig = config as any;

  return (
    <>
      <Head>
        <title>{siteConfig?.siteName || "El Motorista"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
            {children}
        </main>
        <Footer />
      </div>
    </>
  );
}