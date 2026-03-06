import themeStyles from '../styles/dynamicTheme.module.scss';
import fullConfig from '../../theme.json'; 

const rawSiteName = process.env.NEXT_PUBLIC_SITE_NAME || 'El Motorista';
const siteName = rawSiteName.replace(/^["']|["']$/g, '').trim();

export const config = (fullConfig as any)[siteName];
export { themeStyles };