export interface AppConfig {
    themeClass: string;
    allowedPages: string[];
}

const site = process.env.NEXT_PUBLIC_APP_PROFILE;
console.log("Sitio detectado:", site);
export const getDynamicConfig = async (): Promise<AppConfig> => {
    switch (site) {
        case "LolaMoto":
            const lola = await import('./lolamoto');
            return lola.lolaMoto;
        case "Intermoto":
            const inter = await import('./interMoto');
            return inter.interMoto;
        default:
            const motorista = await import('./elMotorista');
            return motorista.ElMotorista;
}
};