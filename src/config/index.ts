export interface AppConfig {
    themeClass: string;
    allowedPages: string[];
}

const PROFILE_NAME = process.env.NEXT_PUBLIC_APP_PROFILE || "El Motorista";

export const getDynamicConfig = async (): Promise<AppConfig> => {
    switch (PROFILE_NAME) {
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