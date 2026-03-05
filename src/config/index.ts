// src/config/index.ts

// 1. Importamos el JSON generado que contiene los datos del perfil
import siteConfig from './current_site_config.json';

// 2. Exportamos 'config' para que _app.tsx y otros componentes lo encuentren
export const config = siteConfig;

// 3. Exportamos 'themeStyles' apuntando al SCSS generado por Handlebars
export { default as themeStyles } from '../styles/dynamicTheme.module.scss';