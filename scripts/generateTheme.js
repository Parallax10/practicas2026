// Dentro de scripts/generateTheme.js

const indexContent = `// Archivo generado automáticamente
import siteConfig from './current_site_config.json';
export const config = siteConfig;
export { default as themeStyles } from '../styles/dynamicTheme.module.scss';
`;

fs.writeFileSync(path.join(__dirname, '../src/config/index.ts'), indexContent);